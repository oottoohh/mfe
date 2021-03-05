var ModelApplicant = kendo.data.Model.define({
    id: "No",
    fields: {
        No: { type: "number", editable: false },
        SubTestCode: { type: "string", editable: false },
        SubTestName: { type: "string", editable: false },
        QuestionCode: { type: "string", editable: false },
        QuestionName: { type: "string", editable: false },
        NumberToDisplay: { type: "number", editable: true },
    }
});
var ModelSubTestList = kendo.data.Model.define({
    id: "SubTestCode",
    fields: {
        SubTestCode: { type: "string", editable: false },
        SubTestName: { type: "string", editable: false },
        NumberToSubTest: { type: "number", editable: true },
    }
});
var viewModel = kendo.observable({
    createBy: "",
    lastModifiedBy: "",
    createOn: "",
    lastModifiedOn: "",
    TestTypeName: "",
    TestTypeCode: "",
    TestToolName: "",
    TestToolCode: "",
    SubSetCode: "",
    SubSetName: "",
    TestTool: "",
    TestType: "",
    TestToolList: [],
    ListTable: [],
    arrSubTest: [],
    isStatus: true,
    ListofSubTest: new kendo.data.DataSource({
        schema: { model: ModelSubTestList }
    }),
    listTest: [],
    NumberToDisplay: 0,
    DisplayStatus: true,
    ApplicantList: new kendo.data.DataSource
        ({
            transport:
            {
                read:
                {
                    type: "POST",
                    url: SERVICE_URL + "api/subset/GetQuestionByTest",
                    headers: { "Authorization-Token": Cookie.load() },
                },
                parameterMap: function (data, operation) {
                    var request = new Object();
                    request.PageNo = data.page;
                    request.PageSize = data.pageSize;
                    request.TestTypeCode = viewModel.TestTypeName;
                    request.TestToolCode = viewModel.TestToolCode;
                    return request;
                }
            },
            schema:
            {
                data: "Questions",
                model: ModelApplicant,
                total: "Total"
            },
            serverPaging: true,
            serverFiltering: true,
            pageSize: 20
        }),
    search: function (e) {
        viewModel.ApplicantList.page(1);
        renderGrid();
        //onload();
    },
    save: function (e) {
        save(e);
    },
    cancel: function () {
        confirmMessageCancel();
        $('.swal-button--cancel').on('click', function () {

        });

        $('.swal-button--danger').on('click', function () {
            //window.location.reload(true);
            window.location.href = DOMAIN_URL + "Views/OnlineTesting/GroupByTest/GroupByTest.html";
        });
    }
});

save = function (e) {
    //console.log(viewModel);
    var SubSetName = viewModel.SubSetName;
    var TestTypeCode = viewModel.TestTypeName;
    var TestToolCode = viewModel.TestToolCode;
    var DisplayStatus = viewModel.DisplayStatus;
    var Questions = [];
    var applicant = [];
    var grid = $('#grid').data("kendoGrid");
    for (i = 0; i < grid._data.length; i++) {
        if (grid._data[i].NumberToDisplay != 0) {
            applicant.push({
                No: grid._data[i].No,
                SubTestCode: grid._data[i].SubTestCode,
                SubTestName: grid._data[i].SubTestName,
                QuestionCode: grid._data[i].QuestionCode,
                QuestionName: grid._data[i].QuestionName,
                NumberToDisplay: grid._data[i].NumberToDisplay
            });
        }

    }
    if (SubSetName == '' || SubSetName == undefined || TestTypeCode == '' || TestTypeCode == undefined || TestToolCode == '' || TestToolCode == undefined) {
        swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
    } else {
        if (applicant.length < 2) {
            swal('Incompleted Data', 'Sub Set must more than 2 datas', 'warning', { closeOnClickOutside: false });
        } else {
            if (viewModel.SubSetCode == '') {
                if (viewModel.isStatus == false) {
                    swal('Failed!!!', 'Your Number is Duplicate / Your number less than 0', 'warning', { closeOnClickOutside: false });
                }
                else {
                    confirmMessageAdd();
                    $('.swal-button--defeat').on('click', function () {
                        LoadingMask.show();
                        $.ajax({
                            type: "POST",
                            url: SERVICE_URL + "api/subset/AddByTest",
                            headers: { "Authorization-Token": Cookie.load() },
                            data: {
                                SubSetName: SubSetName,
                                TestTypeCode: TestTypeCode,
                                TestToolCode: TestToolCode,
                                DisplayStatus: DisplayStatus,
                                Questions: applicant
                            },
                            success: function (response) {
                                if (response.Acknowledge < 1) {
                                    LoadingMask.hide();
                                    swal('Failed!!!', response.Message, 'warning', { closeOnClickOutside: false });
                                } else {
                                    LoadingMask.hide();
                                    swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                    $('.swal-button--confirm').on('click', function () {
                                        window.location.href = DOMAIN_URL + "Views/OnlineTesting/GroupByTest/GroupByTest.html";
                                    });
                                }
                            },
                            error: function (xhr, status, error) {
                                //alert("Error");
                                MessageBox.show("Error", "Error");
                                LoadingMask.hide();
                            }
                        });
                    });
                }
            }
            else {
                if (SubSetName == '' || SubSetName == undefined || TestTypeCode == '' || TestTypeCode == undefined || TestToolCode == '' || TestToolCode == undefined) {
                    swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
                }
                else {
                    if (viewModel.isStatus == false) {
                        swal('Failed!!!', 'Your Number is Duplicate / Your number less than 0', 'warning', { closeOnClickOutside: false });
                    }
                    else {
                        confirmMessageAdd();
                        $('.swal-button--defeat').on('click', function () {
                            LoadingMask.show();
                            $.ajax({
                                type: "POST",
                                url: SERVICE_URL + "api/subset/EditByTest",
                                headers: { "Authorization-Token": Cookie.load() },
                                data: {
                                    SubSetCode: viewModel.SubSetCode,
                                    SubSetName: SubSetName,
                                    TestTypeCode: TestTypeCode,
                                    TestToolCode: TestToolCode,
                                    DisplayStatus: DisplayStatus,
                                    Questions: applicant
                                },
                                success: function (response) {
                                    if (response.Acknowledge < 1) {
                                        LoadingMask.hide();
                                        swal('Failed!!!', response.Message, 'warning', { closeOnClickOutside: false });
                                    } else {
                                        LoadingMask.hide();
                                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                        $('.swal-button--confirm').on('click', function () {
                                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/GroupByTest/GroupByTest.html";
                                        });
                                    }
                                },
                                error: function (xhr, status, error) {
                                    //alert("Error");
                                    MessageBox.show("Error", "Error");
                                    LoadingMask.hide();
                                }
                            });
                        });
                    }
                }
            }
        }
    }

}