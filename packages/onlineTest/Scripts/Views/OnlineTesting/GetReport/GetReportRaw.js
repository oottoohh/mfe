var viewModels = kendo.observable({
    EventId: "",
    TestToolCode: "",

    CategoryGroupEvent: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/GroupEvent",
                dataType: 'json'
            },
            parameterMap: function () {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Id",
                field: "Value"
            },
            data: 'Data'
        }
    }),
    CategoryCompany: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/Company",
                dataType: 'json'
            },
            parameterMap: function () {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: 'Data'
        }
    }),
    CategoryReportType: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/CandidateReportType",
                dataType: 'json'
            },
            parameterMap: function () {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: 'Data'
        }
    }),
    CategoryPassFail: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/PassFail",
                dataType: 'json'
            },
            parameterMap: function () {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Id",
                field: "Value"
            },
            data: 'Data'
        }
    }),
});

EventByGroupEvent = function () {
    var GroupEventId = viewModel.GroupEventId;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/EventByGroupEvent",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            GroupEventId: GroupEventId
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Event Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('EventId', '');
                viewModel.set('EventName', '');
                viewModel.set('GroupEventId', '');
                viewModel.set('GroupEventName', '');
            }
            else {
                if (viewModel.EventId == '') {
                    viewModel.set('EventList', response.Data);
                    viewModel.set('EventId', response.Data[0].Id);
                    viewModels.set('EventId', response.Data[0].Id);
                    viewModel.set('EventName', response.Data[0].Value);
                    CompleteTestDateByEvent();
                    dropDownEvent();
                } else {
                    for (a = 0; a < response.Data.length; a++) {
                        if (response.Data[a].Id == viewModel.EventId) {
                            viewModel.set('EventList', response.Data);
                            viewModel.set('EventId', response.Data[a].Id);
                            viewModel.set('EventName', response.Data[a].Value);
                            dropDownEvent();
                            break;
                        } else {
                            if (viewModel.CompanyId == "") {
                                viewModel.set('EventList', response.Data);
                                viewModel.set('EventId', response.Data[0].Id);
                                viewModel.set('EventName', response.Data[0].Value);
                                dropDownEvent();
                            } else {
                                viewModel.set('EventList', response.Data);
                                viewModel.set('EventId', response.Data[0].Id);
                                viewModel.set('EventName', response.Data[0].Value);
                                dropDownEvent();
                                CompleteTestDateByEvent();
                                PositionByEventCompany();
                                break;
                            }
                        }
                    }
                    //dropDownEvent();
                }
            }
        }
    })
}
PositionByEventCompany = function () {
    var EventId = viewModel.EventId;
    var CompanyId = viewModel.CompanyId;
    if (EventId == "" || CompanyId == "") {
        viewModel.set('PositionId', '');
        viewModel.set('PositionName', '');
        dropDownPosition();
    }
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/PositionByEventCompany",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            EventId: EventId,
            CompanyId: CompanyId
        },
        success: function (response) {
            debugger
            if (response.Data.length == 0) {
                swal("Failed", "Position Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('PositionId', '');
                viewModel.set('PositionName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestToolName', '');
                $("#PositionId").data("kendoComboBox").setDataSource();
            }
            else {
                if (viewModel.PositionId == '') {
                    viewModel.set('PositionList', response.Data);
                    viewModel.set('PositionId', response.Data[0].Id);
                    viewModel.set('PositionName', response.Data[0].Value);
                    CompleteTestDateByEvent();                    
                    dropDownPosition();
                } else {
                    for (a = 0; a < response.Data.length; a++) {
                        if (response.Data[a].Id == viewModel.PositionId) {
                            viewModel.set('PositionList', response.Data);
                            viewModel.set('PositionId', response.Data[a].Id);
                            viewModel.set('PositionName', response.Data[a].Value);
                            dropDownPosition();
                            break;
                        } else if (response.Data[a].Id !== viewModel.PositionId) {
                            viewModel.set('PositionList', response.Data);
                            viewModel.set('PositionId', viewModel.PositionId);
                            viewModel.set('PositionName', viewModel.PositionName);
                            dropDownPosition();
                        } else {
                            viewModel.set('PositionList', response.Data);
                            viewModel.set('PositionId', response.Data[0].Id);
                            viewModel.set('PositionName', response.Data[0].Value);
                            dropDownPosition();
                        }
                    }
                    //dropDownPosition();
                }
            }
        }
    })
}
CompleteTestDateByEvent = function () {
    var EventId = viewModel.EventId;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/CandidateReport/EventDate",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            EventId: EventId
        },
        success: function (response) {
            if (response.Acknowledge == 1) {
                if (response.Data == []) {
                    swal("Failed", "Event Date Not Found!!!", "warning", { closeOnClickOutside: false });
                    viewModel.set('CompleteTestDate', '');
                } else {
                    if (viewModel.CompleteTestDate == '') {
                        viewModel.set('CompleteTestDateList', response.Data);
                        var EventDateStart = kendo.parseDate(new Date(response.Data.StartDate));
                        var EventDateEnd = kendo.parseDate(new Date(response.Data.EndDate));
                        viewModel.set('EventDateStart', EventDateStart);
                        viewModel.set('EventDateEnd', EventDateEnd);
                        //swal("Info", "This event starts on " + EventDateStart + " until " + EventDateEnd +
                        //    ". Please choose Complete Test Date within this time period", "info");
                    } else {
                        for (a = 0; a < response.Data.length; a++) {
                            if (response.Data[a].Id == viewModel.EventId) {
                                viewModel.set('CompleteTestDateList', response.Data);
                                var EventDateStart = kendo.parseDate(new Date(response.Data.StartDate));
                                var EventDateEnd = kendo.parseDate(new Date(response.Data.EndDate));
                                viewModel.set('EventDateStart', EventDateStart);
                                viewModel.set('EventDateEnd', EventDateEnd);
                                //swal("Info", "This event starts on " + EventDateStart + " until " + EventDateEnd +
                                //    ". Please choose Complete Test Date within this time period", "info");
                            } else {
                                viewModel.set('CompleteTestDateList', response.Data);
                                var EventDateStart = kendo.parseDate(new Date(response.Data.StartDate));
                                var EventDateEnd = kendo.parseDate(new Date(response.Data.EndDate));
                                viewModel.set('EventDateStart', EventDateStart);
                                viewModel.set('EventDateEnd', EventDateEnd);
                                //swal("Info", "This event starts on " + EventDateStart + " until " + EventDateEnd +
                                //    ". Please choose Complete Test Date within this time period", "info");
                            }
                        }
                    }
                }
            } else {
                swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                LoadingMask.hide();
            }
        }
    })
}
TestToolByCompanyPosition = function () {
    var CompanyId = viewModel.CompanyId;
    var PositionId = viewModel.PositionId;
    var EventId = viewModel.EventId;
    var GroupEventId = viewModel.GroupEventId;
    var TestDate = kendo.toString(kendo.parseDate(new Date(viewModel.CompleteTestDate)), 'dd-MM-yyyy');
    if (CompanyId == "" || PositionId == "") {
        viewModel.set('TestToolCode', '');
        viewModel.set('TestToolName', '');
        dropDownTestTool();
    }
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/CandidateReport/GetTestTool",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CompanyId: CompanyId,
            PositionId: PositionId,
            EventId: EventId,
            TestDate: TestDate,
            GroupEventId: GroupEventId
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolCode', '');
                viewModel.set('TestToolName', '');
            }
            else {
                if (viewModel.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set('TestToolCode', response.Data[0].Code);
                    viewModel.set('TestToolName', response.Data[0].Value);
                    dropDownTestTool();
                } else {
                    for (a = 0; a < response.Data.length; a++) {
                        if (response.Data[a].Code == viewModel.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolCode', response.Data[a].Code);
                            viewModel.set('TestToolName', response.Data[a].Value);
                            dropDownTestTool();
                        } else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolCode', response.Data[0].Code);
                            viewModel.set('TestToolName', response.Data[0].Value);
                            dropDownTestTool();
                        }
                    }
                    //dropDownTestTool();
                }
            }
        }
    })
}

hideForm = function (e) {
    $('.box1').attr('hidden', true);
    $('.arrow2').removeAttr('hidden', 'hidden');
    $('.arrow1').attr('hidden', true);
}
showForm = function (e) {
    $('.box1').removeAttr('hidden', 'hidden');
    $('.arrow2').attr('hidden', true);
    $('.arrow1').removeAttr('hidden', 'hidden');
}
Display = function (data) {
    //alert(false);
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayChecked(this)');
    viewModel.set('DisplayStatus', false);
}
DisplayChecked = function (data) {
    //alert(true);
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'Display(this)');
    viewModel.set('DisplayStatus', true);
}
Standalone = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'StandaloneChecked(this)');
    viewModel.set('Standalone', true);
}
StandaloneChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'Standalone(this)');
    viewModel.set('Standalone', false);
}