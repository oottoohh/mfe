var ModelApplicant = kendo.data.Model.define({
    id: "No",
    fields: {
        No: { type: "number", editable: false },
        QuestionCode: { type: "string", editable: false },
        QuestionName: { type: "string", editable: false },
        NumberToDisplay: { type: "number", editable: true },
    }
});
var viewModel = kendo.observable({
    createBy: "",
    lastModifiedBy: "",
    createOn: "",
    lastModifiedOn: "",
    SubSetCode: "",
    SubSetName: "",
    DisplayStatus: true,
    TestTypeName: "",
    TestTypeCode: "",
    TestToolName: "",
    TestTool: "",
    TestType: "",
    SubTest: "",
    NumberToDisplay: 0,
    isStatus: true,
    TestToolCode: "",
    TestToolList: [],
    SubTestList: [],
    ListTable: [],
    listBySub: [],
    SubTestName: "",
    SubTestCode: "",
    ApplicantList: new kendo.data.DataSource
        ({
            transport:
            {
                read:
                {
                    type: "POST",
                    url: SERVICE_URL + "api/subset/GetQuestionBySubTest",
                    headers: { "Authorization-Token": Cookie.load() },
                },
                parameterMap: function (data, operation) {
                    var request = new Object();
                    request.PageNo = data.page;
                    request.PageSize = data.pageSize;
                    request.TestTypeCode = viewModel.TestTypeName;
                    request.TestToolCode = viewModel.TestToolCode;
                    request.SubTestCode = viewModel.SubTestCode;
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
            pageSize: 25
        }),
    search: function () {
        viewModel.ApplicantList.page(1);
        renderGrid();
    },
    save: function () {
        save();
    },
    cancel: function () {
        confirmMessageCancel();
        $('.swal-button--cancel').on('click', function () {

        });

        $('.swal-button--danger').on('click', function () {
            //window.location.reload(true);
            window.location.href = DOMAIN_URL + "Views/OnlineTesting/GroupBySubTest/GroupBySubTest.html";
        });
    }

});
save = function () {
    //console.log(viewModel);
    var ListTable = [];
    var SubSetName = viewModel.SubSetName;
    var TestTypeCode = viewModel.TestTypeName;
    var TestToolCode = viewModel.TestToolCode;
    var SubTestCode = viewModel.SubTestCode;
    var applicant = [];
    var grid = $('#SubTestGridList').data("kendoGrid");
    //var valid = true;
    //console.log(viewModel.ApplicantList);
    for (i = 0; i < grid._data.length; i++) {
        if (grid._data[i].NumberToDisplay != 0) {
            applicant.push({
                No: grid._data[i].No,
                QuestionCode: grid._data[i].QuestionCode,
                QuestionName: grid._data[i].QuestionName,
                NumberToDisplay: grid._data[i].NumberToDisplay
            });

        }
    }
    //console.log(applicant.length);


    //var checkDuplcate = applicant.sort();
    //var valid = true;
    //for (j = 0; j < checkDuplcate.length - 1; j++) {
    //    if (checkDuplcate[j + 1].NumberToDisplay == checkDuplcate[j].NumberToDisplay) {
    //        valid = false;
    //        break;
    //    } else {
    //        valid = true;
    //    }
    //}
    //var no = 1;
    //debugger;
    //alert(valid);
    if (viewModel.isStatus == false) {
        swal('Failed!!!', 'Your Number is Duplicate / Your number less than 0', 'warning', { closeOnClickOutside: false });
    }
    else if (applicant.length < 2) {
        swal('Incompleted Data', 'Sub Set must more than 2 datas', 'warning', { closeOnClickOutside: false });
    }
    else {
        if (viewModel.SubSetCode == '') {
            if (SubSetName == '' || TestTypeCode == '' || TestToolCode == '' || SubTestCode == '') {
                swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
            }
            else {
                confirmMessageAdd();
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: "POST",
                        url: SERVICE_URL + "api/subset/AddBySubTest",
                        headers: { "Authorization-Token": Cookie.load() },
                        data: {
                            SubSetName: SubSetName,
                            TestTypeCode: TestTypeCode,
                            TestToolCode: TestToolCode,
                            SubTestCode: SubTestCode,
                            DisplayStatus: viewModel.DisplayStatus,
                            Questions: applicant
                        },
                        success: function (response) {
                            if (response.Acknowledge < 1) {
                                LoadingMask.hide();
                                swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                            } else {
                                LoadingMask.hide();
                                swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + "Views/OnlineTesting/GroupBySubTest/GroupBySubTest.html";
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
            if (SubSetName == '' || TestTypeCode == '' || TestToolCode == '' || SubTestCode == '' || applicant.length < 2) {
                swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
            }
            else {
                confirmMessageAdd();
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: "POST",
                        url: SERVICE_URL + "api/subset/EditBySubTest",
                        headers: { "Authorization-Token": Cookie.load() },
                        data: {
                            SubSetCode: viewModel.SubSetCode,
                            SubSetName: SubSetName,
                            TestTypeCode: TestTypeCode,
                            TestToolCode: TestToolCode,
                            SubTestCode: SubTestCode,
                            DisplayStatus: viewModel.DisplayStatus,
                            Questions: applicant
                        },
                        success: function (response) {
                            if (response.Acknowledge < 1) {
                                LoadingMask.hide();
                                swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                            } else {
                                LoadingMask.hide();
                                swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + "Views/OnlineTesting/GroupBySubTest/GroupBySubTest.html";
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
//for (i = 0; i < Question.length; i++) {
//    NumberDisplay[i] = Question[i].NumberToDisplay;
//    if (NumberDisplay[i] == 0) {
//        swal('Incompleted Data', 'Number Display ' + no + ' Doesnt nol!!!', 'warning');
//        $('.swal-button--confirm').on('click', function () {
//            return NumberDisplay[i];
//        });
//    } else {
//        if (SubSetName == '' || SubSetName == undefined || TestTypeCode == '' || TestTypeCode == undefined || TestToolCode == '' || TestToolCode == undefined || SubTestCode == '' || SubTestCode == undefined) {
//            swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning');
//            $('.swal-button--confirm').on('click', function () {
//                return NumberDisplay[i];
//            });
//        }
//        else {
//            confirmMessageAdd();
//            $('.swal-button--defeat').on('click', function () {
//                LoadingMask.show();
//                $.ajax({
//                    type: "POST",
//                    url: SERVICE_URL + "api/subset/AddBySubTest",
//                    headers: { "Authorization-Token": Cookie.load() },
//                    data: {
//                        SubSetName: SubSetName,
//                        TestTypeCode: TestTypeCode,
//                        TestToolCode: TestToolCode,
//                        SubTestCode: SubTestCode,
//                        DisplayStatus: viewModel.DisplayStatus,
//                        Questions: Questions
//                    },
//                    success: function (response) {
//                        swal("Good", "Record Has Been Saved", "success");
//                        $('.swal-button--confirm').on('click', function () {
//                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/TestTool/TestTool.html";
//                        });
//                        //
//                        LoadingMask.hide();
//                    },
//                    error: function (xhr, status, error) {
//                        alert("Error");
//                        LoadingMask.hide();
//                    }
//                });
//                $('.swal-button--cancel').on('click', function () {
//                    return NumberDisplay[i];
//                });
//            });
//        }
//    }

//    no++;
//}