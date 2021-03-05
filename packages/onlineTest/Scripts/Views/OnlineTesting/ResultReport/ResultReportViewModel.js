var ModelApplicant = kendo.data.Model.define({
    id: "ApplicantId",
    fields: {
        IsCheck: { type: "boolean", editable: true },
        ApplicantId: { type: "string", editable: true },
        ApplicationId: { type: "string", editable: false },
        ApplicantName: { type: "string", editable: false },
        Gender: { type: "string", editable: false },
        DateOfBirth: { type: "string", editable: false },
        University: { type: "string", editable: false },
        Company: { type: "string", editable: false },
        Vacancy: { type: "string", editable: false },
        Position: { type: "string", editable: false },
        TestDate: { type: "string", editable: false },
        ResultStatus: { type: "string", editable: false },
    }
});
var viewModel = kendo.observable({
    CompleteTestDate:'',
    Company: '',
    GroupEventId: '',
    Position: '',
    StartDate: '',
    EndDate: '',
    University: '',
    Result: '',
    ReportType: '',
    ReportCode: '',
    PassFail:'',
    ArrayChecked: [],
    EventList: [],
    ApplicantList: new kendo.data.DataSource
        ({
            transport:
            {
                read:
                {
                    type: "POST",
                    url: SERVICE_URL + "api/ResultReport/Inquiry",
                    headers: { "Authorization-Token": Cookie.load() },
                },
                parameterMap: function (data, operation) {
                    LoadingMask.hide();                    
                    debugger
                    var date = kendo.toString($("#completeDate").data("kendoDatePicker").value(), 'yyyy-MM-dd') == null ? "" : kendo.toString($("#completeDate").data("kendoDatePicker").value(), 'yyyy-MM-dd');                 

                    if (viewModel.StartDate == '') {
                        //StartDate = tahun+'-01-01';
                        StartDate = '';
                    } else {
                        StartDate = kendo.toString(kendo.parseDate(new Date(viewModel.StartDate)), 'yyyy-MM-dd');
                    }
                    if (viewModel.EndDate == '') {
                        //EndDate = tahun + '-12-31';
                        EndDate = '';
                    } else {
                        EndDate = kendo.toString(kendo.parseDate(new Date(viewModel.EndDate)), 'yyyy-MM-dd');
                    }

                    //alert(Convert);
                    var request = new Object();
                        request.PageNo = data.page;
                        request.PageSize = data.pageSize;
                        request.sortInfo = data.sort;
                        request.GroupEventId = viewModel.GroupEventId,
                        request.EventId = viewModel.EventId,
                        request.PositionId = viewModel.Position,
                        request.TestDate = date,
                        request.PassFail = viewModel.PassFail,
                        request.CompanyId = viewModel.Company
                        return request;
                }
            },
            schema:
            {
                data: "Datas",
                model: ModelApplicant,
                total: "Total"
            },
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            pageSize: 10
        }),
    Search: new kendo.data.DataSource
        ({
            transport:
            {
                read:
                {
                    type: "POST",
                    url: SERVICE_URL + "api/ResultReport/Search",
                    headers: { "Authorization-Token": Cookie.load() },
                },
                parameterMap: function (data, operation) {
                    LoadingMask.hide();
                    debugger
                    var date = kendo.toString($("#completeDate").data("kendoDatePicker").value(), 'dd-MM-yyyy') == null ? "" : kendo.toString($("#completeDate").data("kendoDatePicker").value(), 'dd-MM-yyyy');

                    var request = new Object();
                    request.PageNo = data.page;
                    request.PageSize = data.pageSize;
                    //request.sortInfo = data.sort;
                    request.GroupEventId = viewModel.GroupEventId,
                        request.EventId = viewModel.EventId,
                        request.PositionId = viewModel.Position,
                        request.TestDate = date,
                        request.PassFail = parseInt(viewModel.PassFail) == 1 ? true : false,
                        request.CompanyId = viewModel.Company
                    return request;
                }
            },
            schema:
            {
                data: "Datas",
                model: ModelApplicant,
                total: "Total"
            },
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            pageSize: 10
        }),
    search: function (e) {
        //LoadingMask.show();
        debugger
        viewModel.Search.page(1);
        viewModel.getMappingResultReport.read();
        viewModel.set('ArrayChecked', []);
        $('#ReportType').data('kendoComboBox').value("");
       $('.downloadProfPositionFalse').show();
        $('#content-profPosition').hide();
    },
    clear: function () {
        clear();
    },
    exportPDF: function (e) {
        exportPDF(e);
    },
    previewPDF: function (e) {
        previewPDF(e);
    },
    exportExcel: function (e) {
        exportExcel(e);
    },
    groubEventList: new kendo.data.DataSource({
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
    getReportResultPassFail: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/ReportResultPassFail",
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
    getMappingResultReport: new kendo.data.DataSource({
        
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/ResultReport/GetMappingReportType",
                dataType: 'json'
            },
            parameterMap: function (data, op) {
                var date = kendo.toString($("#completeDate").data("kendoDatePicker").value(), 'dd-MM-yyyy') == null ? "" : kendo.toString($("#completeDate").data("kendoDatePicker").value(), 'dd-MM-yyyy');                 
                var request = new Object();
                debugger
                request.UserLogin = Cookie.getUser();
                //request.PageNo = data.page;
                //request.PageSize = data.pageSize;
                //request.sortInfo = data.sort;
                request.GroupEventId = viewModel.GroupEventId,
                request.EventId = viewModel.EventId,
                request.PositionId = viewModel.Position,
                request.TestDate = date,
                request.PassFail = viewModel.PassFail,
                request.CompanyId = viewModel.Company
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: 'Datas'
        }
    }),

});
getPositionByEventCompany = function () {
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/PositionByEventCompany",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            EventId: viewModel.EventId,
            CompanyId: viewModel.Company
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Event Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('EventId', '');
                viewModel.set('EventName', '');
                viewModel.set('GroupEventId', '');
                viewModel.set('GroupEventName', '');
                viewModel.set('CategoryPosition', '');
            }
            else {
                viewModel.set('CategoryPosition', response.Data);
                dropDwonPosition();
            }
        }
    })
}

getEventbyGroubEvent = function () {
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
clear = function () {
    viewModel.set('Company', '');
    viewModel.set('EventId', '');
    viewModel.set('EventName', "");
    viewModel.set('Position', '');
    viewModel.set('PassFail', '');
    viewModel.set('passFailresult', '');
    viewModel.set('EndDate', '');
    viewModel.set('GroupEventId', '');
    viewModel.set('getReportResultPassFail', "");
    viewModel.set('ReportType', "");
    $('#content-profPosition').hide();
    $('#ProfPosition').data('kendoComboBox').value("Default Position");
    $('#ReportType').data('kendoComboBox').value("");
    $('#passFailresult').data('kendoComboBox').value("");
    $('#groubEvent').data('kendoComboBox').value("");
    $('#eventName').data('kendoComboBox').value("");
    kendo.toString($("#completeDate").data("kendoDatePicker").value(""), 'dd-MM-yyyy')
}
exportPDF = function (e) {
    var MappingReportType = viewModel.ReportType;
    var ProfilingPositionId = viewModel.ProfPosition;
    var filename;
    //console.log(viewModel.ArrayChecked);
    var lengthArray = viewModel.ArrayChecked.length;
    var dataList = '';
    var fileFormat = '';
    if (lengthArray > 0 && lengthArray <= 1) {
        dataList = viewModel.ArrayChecked[0];
        var newDate = new Date();
        var ResultDate = parseInt(newDate.getMonth() + '' + newDate.getDate() + '' + newDate.getFullYear());
        filename = viewModel.ReportTypeName + "-" + viewModel.reportName + "-" + viewModel.positionName+'-'+ResultDate+".pdf";
    }
    else if (lengthArray > 1) {
        dataList = viewModel.ArrayChecked[0];
        for (i = 1; i < lengthArray; i++) {
            //var koma = ',';
            dataList = dataList + ',' + viewModel.ArrayChecked[i];
            fileFormat = "zip";
            filename = unique_name_report(MappingReportType, fileFormat);
        }
    } else {

    }
    debugger
    //console.log(dataList);
    //alert("haiii");
    //debugger;
    if (MappingReportType == '' || MappingReportType == undefined) {
        swal('Failed', 'Please select the "Mapping Report Type" first', 'warning', { closeOnClickOutside: false });
    }
    else if (lengthArray < 1) {
        swal('Failed', 'Please select the "Applicant Name', 'warning', { closeOnClickOutside: false });
    }
    else {
        var url;
        
        if (ProfilingPositionId !== "0") {
            url = "api/ResultReport/Export?Id=" + dataList + "&MappingReportTypeCode=" + MappingReportType + "&ProfilingPositionId=" + ProfilingPositionId;
        } else {
            url = "api/ResultReport/Export?Id=" + dataList + "&MappingReportTypeCode=" + MappingReportType;
        }
        LoadingMask.show();
        var download_url = SERVICE_URL + url;
        var req = new XMLHttpRequest();
        req.open('GET', download_url, true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        req.setRequestHeader('Authorization-Token', Cookie.load());
        req.responseType = 'blob';

        req.onload = function () {
            if (req.status == 200) {
                LoadingMask.hide();
                
                var blob = new Blob([req.response], { type: 'application/zip' });
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                LoadingMask.hide();
                swal("error", "Can`t download report.", "warning", { closeOnClickOutside: false });
            }
        }
        req.send();
        
    }
}
previewPDF = function (e) {
    var MappingReportType = viewModel.ReportType;
    var ProfilingPositionId = viewModel.ProfPosition;
    var filename;
    var lengthArray = viewModel.ArrayChecked.length;
    var dataList = viewModel.ArrayChecked[0];
    var fileFormat = '';
    if (MappingReportType == '' || MappingReportType == undefined) {
        swal('Failed', 'Please select the "Mapping Report Type" first', 'warning', { closeOnClickOutside: false });
    }
    else if (lengthArray < 1) {
        swal('Failed', 'Please select the "Applicant Name', 'warning', { closeOnClickOutside: false });
    }
    else if (lengthArray > 1) {
        swal('Sorry', 'Can not preview multiple Applicant Name', 'warning', { closeOnClickOutside: false });
    }
    else {
        var url;
        if (ProfilingPositionId !== "0") {
            url = "api/ResultReport/preview?Id=" + dataList + "&MappingReportTypeCode=" + MappingReportType + "&ProfilingPositionId=" + ProfilingPositionId;
        } else {
            url = "api/ResultReport/preview?Id=" + dataList + "&MappingReportTypeCode=" + MappingReportType;
        }
        LoadingMask.show();
        var download_url = SERVICE_URL + url;
        var req = new XMLHttpRequest();
        req.open('GET', download_url, true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        req.setRequestHeader('Authorization-Token', Cookie.load());
        req.responseType = 'json';

        req.onload = function () {
            if (req.status == 200) {
                LoadingMask.hide();
                window.open(req.response.Url,'_blank');
                
            } else {
                LoadingMask.hide();
                swal("error", "Can`t preview the report.", "warning", { closeOnClickOutside: false });
            }
        }
        req.send();
    }
}
exportExcel = function (e) {
    var ReportType = viewModel.ReportCode;
    //console.log(viewModel.ArrayChecked);
    var lengthArray = viewModel.ArrayChecked.length;
    var dataList = '';
    if (lengthArray > 0 && lengthArray <= 1) {
        dataList = viewModel.ArrayChecked[0];
    }
    else if (lengthArray > 1) {
        dataList = viewModel.ArrayChecked[0];
        for (i = 1; i < lengthArray; i++) {
            //var koma = ',';
            dataList = dataList + ',' + viewModel.ArrayChecked[i];
        }
    } else {
        dataList = "";
    }

    //if (ReportType == '' || ReportType == undefined) {
    //    swal('Failed', 'Please select the "Report Type" first', 'warning');
    //}
    //else
    if (lengthArray < 1) {
        swal('Failed', 'Please select the "Applicant Name', 'warning', { closeOnClickOutside: false });
    } else {
        LoadingMask.show();
        var download_url = SERVICE_URL + "api/ResultReport/ExportExcel?ReportTypeCode=ALL&ApplicantId=" + dataList;

        var req = new XMLHttpRequest();
        req.open('GET', download_url, true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        req.setRequestHeader('Authorization-Token', Cookie.load());
        req.responseType = 'blob';

        req.onload = function () {
            if (req.status == 200) {

                var filename = unique_name_report("RAW-SCORE", 'xlsx');

                //the actual download
                var blob = new Blob([req.response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = filename;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                swal("error", "Can`t download report.", "warning", { closeOnClickOutside: false });
            }
        }
        req.send();
        LoadingMask.hide();
    }
}
unique_name_report = function (report_name, type_file) {

    if (report_name == 'RO19000002') {
        report_name = "Ability";
    }
    if (report_name == 'RO19000003') {
        report_name = "Personality";
    }
    if (report_name == 'RO19000001') {
        report_name = "Competency";
    }

    var newDate = new Date();
    var temp_name = '' + parseInt(newDate.getMonth() + 1) + '' + newDate.getDate() + '' + newDate.getFullYear() + '' + newDate.getTime();
    return (temp_name + '-' + report_name + '-Report.' + type_file);
}