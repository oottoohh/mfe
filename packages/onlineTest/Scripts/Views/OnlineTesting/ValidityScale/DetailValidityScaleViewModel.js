var ModelValidity = kendo.data.Model.define({
    id: "ValidityScaleCode",
    fields: {
        DisplayStatus: { type: "boolean", editable: false },
        IsDisplay: { type: "boolean", editable: false },
        Question: { type: "string", editable: false },
        QuestionAnswerCode: { type: "string", editable: false },
        QuestionCategory: { type: "string", editable: false },
        SubTest: { type: "string", editable: false },
        SubTestCode: { type: "string", editable: false },
        TestToolName: { type: "string", editable: false }
    }
});

var viewModel = kendo.observable({
    createBy: "",
    lastModifiedBy: "",
    createOn: "",
    lastModifiedOn: "",
    ValidityScaleCode: "",
    ValidityScaleName: "",
    TestType: "",
    TestTypeCode: "",
    TestTypeName: "",
    TestToolList: [],
    TestTool: "",
    TestToolCode: "",
    TestToolName: "",
    DisplayStatus: true,
    IsBySubTest: true,
    IsByMappingQuestion: false,
    SubTestList: [],
    SubTest: "",
    SubTestCode: "",
    SubTestName: "",
    SubTestCode1: "",
    SubTestCode2: "",
    SubTestName1: "",
    SubTestName2: "",
    QuestionCategory: "",
    QuestionAnswerCode1: "",
    QuestionAnswerCode2: "",
    QuestionAnswerCode: "",
    Question: "",
    IsDisplay: false,
    byQuestionList: [],
    mappingList: [],
    ArrayChecked: [],
    dataItem1: [],
    dataItem2: [],
    arrMappingQuestion: [],
    idMap: 1,
    deletedRowMap: false,
    DetailBySubTest: {
        SubTestCode: "",
        SubTestName: ""
    },
    MappingQuestionCode: 0,
    DetailByMappingQuestion: [],

    QuestionAnswerList: new kendo.data.DataSource({
        batch: true,
        requestStart: function (e) {
            LoadingMask.show();
        },
        requestEnd: function (e) {
            LoadingMask.hide();
        },
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + "api/Question/Inquiry",
                headers: { "Authorization-Token": Cookie.load() },
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.TestToolName = viewModel.TestToolName;
                request.SubTestName = viewModel.SubTest;
                request.Question = viewModel.Question;
                request.DisplayStatus = viewModel.DisplayStatus;
                return request;
            }
        },
        schema: {
            data: "QuestionAnswerDatas",
            model: ModelValidity,
            total: "Total",
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 25
    }),
    hideForm: function (e) {
        hideForm(e);
    },
    showForm: function (e) {
        showForm(e);
    },
    clear: function (e) {
        clear(e);
    },
    save: function (e) {
        save(e);
    },
    cancel: function (e) {
        confirmMessageCancel();
        $('.swal-button--cancel').on('click', function () {
        });
        $('.swal-button--danger').on('click', function () {
            //window.location.reload(true);
            window.location.href = DOMAIN_URL + "Views/OnlineTesting/ValidityScale/ValidityScale.html";
        });
    },
});

getURL = function () {
    var url = $(location).attr('search');
    var check = url.substring(28, 100);
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/ValidityScale/Detail",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            ValidityScaleCode: check
        },
        success: function (response) {
            var data = response.ValidityScale;
            viewModel.set("createBy", data.CreateBy);
            viewModel.set("lastModifiedBy", data.ModifBy);
            viewModel.set("createOn", data.CreatedTime);
            viewModel.set("lastModifiedOn", data.ModifiedTime);
            viewModel.set("ValidityScaleCode", data.ValidityScaleCode);
            viewModel.set("ValidityScaleName", data.ValidityScaleName);
            viewModel.set("TestTypeCode", data.TestTypeCode);
            viewModels.set("TestTypeCode", data.TestTypeCode);
            viewModel.set("TestTypeName", data.TestTypeName);
            viewModel.set("TestType", data.TestTypeName);
            viewModel.set("TestToolCode", data.TestToolCode);
            viewModels.set("TestToolCode", data.TestToolCode);
            viewModel.set("TestToolName", data.TestToolName);
            //dropDownTestType();
            TestToolInByTestEditVS();
            //dropDownTestTool();
            viewModel.set("DisplayStatus", data.DisplayStatus);
            viewModel.set("IsByMappingQuestion", data.IsByMappingQuestion);
            if (data.IsByMappingQuestion == true) {
                $("#IsByMappingQuestion").prop("checked", true);
                //viewModel.set("IsBySubTest", false)
                //document.getElementById('IsByMappingQuestion').checked
            } else {
                $("#IsBySubTest").prop("checked", true);
                //viewModel.set("IsBySubTest", true)
                //document.getElementById('IsBySubTest').checked
            }
            viewModel.set("DetailBySubTest", data.DetailBySubTest);
            viewModel.DetailBySubTest.set("SubTestCode", data.DetailBySubTest.SubTestCode);
            viewModel.DetailBySubTest.set("SubTestName", data.DetailBySubTest.SubTestName);
            viewModel.set("SubTest", data.DetailBySubTest.SubTestName);
            viewModel.set("SubTestCode", data.DetailBySubTest.SubTestCode);
            viewModels.set("SubTestCode", data.DetailBySubTest.SubTestCode);
            viewModel.set("SubTestName", data.DetailBySubTest.SubTestName)
            //dropDownSubTest();
            viewModel.set("DetailByMappingQuestion", data.DetailByMappingQuestion);
            LoadingMask.hide();
            renderGrid(data.DetailByMappingQuestion);
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

Search1 = function (e) {
    viewModel.QuestionAnswerList.page(1);
    var grid = $("#gridTable").data('kendoGrid');
    grid.setDataSource(viewModel.QuestionAnswerList);
    grid.dataSource.one('change', function () {
        viewModel.set('ArrayChecked', grid._data);
        //viewModel.ApplicantList.data());
    });
}

Search2 = function (e) {
    viewModel.QuestionAnswerList.page(1);
    var grid = $("#gridTable2").data('kendoGrid');
    grid.setDataSource(viewModel.QuestionAnswerList);
    grid.dataSource.one('change', function () {
        viewModel.set('ArrayChecked', grid._data);
        //viewModel.ApplicantList.data());
    });
}

clear = function (e) {
    viewModel.set('SubTest', "");
    viewModel.set('SubTestName', "");
    viewModel.set('SubTestCode', "");
    viewModel.set('Question', "");
    viewModel.set('DisplayStatus', true);
}

TempItem1 = function () {
    var valid = true;
    var displayNotif = true;
    var displayCount = 0;
    var listItem1 = [];
    var mappingList = [];
    var tempOrder = 0;
    var arrCheckedQuestion1 = []

    if (viewModel.ArrayChecked.length == 0) {
        swal('Failed', 'Please select at least one Question & Answer!', 'warning', { closeOnClickOutside: false });
        return;
    } else {
        for (var i = 0; i < viewModel.ArrayChecked.length; i++) {
            if (viewModel.ArrayChecked[i].IsDisplay == true) {
                arrCheckedQuestion1.push({
                    QuestionAnswerCode: viewModel.ArrayChecked[i].QuestionAnswerCode,
                    SubTestCode: viewModel.ArrayChecked[i].SubTestCode,
                    SubTestName: viewModel.ArrayChecked[i].SubTest
                })
            }
        }
        if (arrCheckedQuestion1.length > 1) {
            swal('Warning', 'Please select only one Question & Answer!', 'warning', { closeOnClickOutside: false });
            return;
        } else {
            viewModel.set("QuestionAnswerCode1", arrCheckedQuestion1[0].QuestionAnswerCode)
            viewModel.set("SubTestCode1", arrCheckedQuestion1[0].SubTestCode);
            viewModel.set("SubTestName1", arrCheckedQuestion1[0].SubTestName);
        }
    }

    // close window
    $("#dialog").data("kendoWindow").close();
    //onLoadDataItem1();
}

TempItem2 = function () {
    var valid = true;
    var displayNotif = true;
    var displayCount = 0;
    var listItem2 = []
    var mappingList = [];
    var tempOrder = 0;
    var arrCheckedQuestion2 = [];

    if (viewModel.ArrayChecked.length == 0) {
        swal('Failed', 'Please select at least one Question & Answer!', 'warning', { closeOnClickOutside: false });
        return;
    } else {
        for (var i = 0; i < viewModel.ArrayChecked.length; i++) {
            if (viewModel.ArrayChecked[i].IsDisplay == true) {
                arrCheckedQuestion2.push({
                    QuestionAnswerCode: viewModel.ArrayChecked[i].QuestionAnswerCode,
                    SubTestCode: viewModel.ArrayChecked[i].SubTestCode,
                    SubTestName: viewModel.ArrayChecked[i].SubTest
                })
            }
        }
        if (arrCheckedQuestion2.length > 1) {
            swal('Warning', 'Please select only one Question & Answer!', 'warning', { closeOnClickOutside: false });
            return;
        } else {
            viewModel.set("QuestionAnswerCode2", arrCheckedQuestion2[0].QuestionAnswerCode)
            viewModel.set("SubTestCode2", arrCheckedQuestion2[0].SubTestCode);
            viewModel.set("SubTestName2", arrCheckedQuestion2[0].SubTestName);
        }
    }

    //var dataItems = $.merge(viewModel.dataItem1, listItem2);
    //localStorage.setItem("ByMappingQuestion", JSON.stringify(dataItems));
    //debugger

    // assign to qna list (save)
    //viewModel.set('DetailByMappingQuestion', listItem2);

    // close window
    $("#dialog2").data("kendoWindow").close();
    //onLoadDataItem2();
}

addMapping = function () {
    //var value = JSON.parse(localStorage.getItem("ByMappingQuestion"));
    //renderGrid(value);
    var questionAnswerCodeList = [];
    var arrMappingQuestion = viewModel.DetailByMappingQuestion;
    var idMap = arrMappingQuestion.length;

    if (viewModel.QuestionAnswerCode1 == "" || viewModel.QuestionAnswerCode2 == "") {
        swal('Incompleted Data', 'Please complete the mapping by filling out item 1 and item 2 !', 'warning', { closeOnClickOutside: false });
        return
    }

    arrMappingQuestion.push({
        Id: idMap,
        SubTestCode1: viewModel.SubTestCode1,
        SubTestCode2: viewModel.SubTestCode2,
        SubTestName1: viewModel.SubTestName1,
        SubTestName2: viewModel.SubTestName2,
        QuestionAnswerCode1: viewModel.QuestionAnswerCode1,
        QuestionAnswerCode2: viewModel.QuestionAnswerCode2
    })
    idMap++;
    //viewModel.set('idMap', idMap);

    viewModel.set("DetailByMappingQuestion", arrMappingQuestion)
    renderGrid(arrMappingQuestion);
    viewModel.set("QuestionAnswerCode1", "");
    viewModel.set("QuestionAnswerCode2", "");
}

updateMapping = function (data) {
    var QuestionAnswerCode1 = $(data).attr('questionAnswerCode1');
    var QuestionAnswerCode2 = $(data).attr('questionAnswerCode2');
    var arrEditMappingQuestion = viewModel.DetailByMappingQuestion;
    if (viewModel.DetailByMappingQuestion.length > 0) {
        for (a = 0; a < viewModel.DetailByMappingQuestion.length; a++) {
            if (viewModel.DetailByMappingQuestion[a].Id == viewModel.MappingQuestionCode) {
                viewModel.DetailByMappingQuestion[a].set('SubTestCode1', viewModel.SubTestCode1);
                viewModel.DetailByMappingQuestion[a].set('SubTestCode2', viewModel.SubTestCode2);
                viewModel.DetailByMappingQuestion[a].set('SubTestName1', viewModel.SubTestName1);
                viewModel.DetailByMappingQuestion[a].set('SubTestName2', viewModel.SubTestName2);
                viewModel.DetailByMappingQuestion[a].set('QuestionAnswerCode1', viewModel.QuestionAnswerCode1);
                viewModel.DetailByMappingQuestion[a].set('QuestionAnswerCode2', viewModel.QuestionAnswerCode2);
            }
        }
    }
    renderGrid(viewModel.DetailByMappingQuestion);
    viewModel.set("QuestionAnswerCode1", "");
    viewModel.set("QuestionAnswerCode2", "");
    cekButtonAddMapping();
}

DeleteRow = function (data) {
    var id = $(data).attr('id');
    var detailByMappingQuestion = viewModel.DetailByMappingQuestion;

    if (detailByMappingQuestion.length > 1) {
        var row = data.parentNode.parentNode;
        row.parentNode.removeChild(row);
        for (a = 0; a < detailByMappingQuestion.length; a++) {
            if (detailByMappingQuestion[a].Id == id) {
                var maps = detailByMappingQuestion.filter(function (obj) {
                    return obj.Id != id
                })
            }
        }
        viewModel.set("deletedRowMap", true);
        viewModel.set("DetailByMappingQuestion", maps);
        renderGrid(maps);
    } else {
        viewModel.set("DetailByMappingQuestion", []);
        renderGrid(viewModel.DetailByMappingQuestion);
    }
}

save = function () {
    var createBy = viewModel.createBy;
    var lastModifiedBy = viewModel.lastModifiedBy;
    var createOn = viewModel.createOn;
    var lastModifiedOn = viewModel.lastModifiedOn;

    var ValidityScaleCode = viewModel.ValidityScaleCode;
    var ValidityScaleName = viewModel.ValidityScaleName;
    var TestTypeCode = viewModel.TestTypeCode;
    var TestTypeName = viewModel.TestTypeName;
    var TestType = viewModel.TestType;
    var TestToolCode = viewModel.TestToolCode;
    var TestToolName = viewModel.TestToolName;
    var TestTool = viewModel.TestTool;
    var DisplayStatus = viewModel.DisplayStatus;

    if (viewModel.IsByMappingQuestion == true) {
        viewModel.set('IsBySubTest', false);
        document.getElementById('IsByMappingQuestion').checked
    }

    //IsBySubTest
    var SubTest = viewModel.SubTest;
    var SubTestCode = viewModel.SubTestCode;
    var SubTestName = viewModel.SubTestName;

    //IsByMappingQuestion
    var dataMappingQuestion = [];
    if (viewModel.DetailByMappingQuestion.length > 0) {
        for (a = 0; a < viewModel.DetailByMappingQuestion.length; a++) {
            dataMappingQuestion.push({
                SubTestCode1: viewModel.DetailByMappingQuestion[a].SubTestCode1,
                SubTestCode2: viewModel.DetailByMappingQuestion[a].SubTestCode2,
                SubTestName1: viewModel.DetailByMappingQuestion[a].SubTestName1,
                SubTestName2: viewModel.DetailByMappingQuestion[a].SubTestName2,
                QuestionAnswerCode1: viewModel.DetailByMappingQuestion[a].QuestionAnswerCode1,
                QuestionAnswerCode2: viewModel.DetailByMappingQuestion[a].QuestionAnswerCode2
            })
        }
    }

    if (document.getElementById('IsBySubTest').checked) {
        viewModel.set("IsBySubTest", true);
        viewModel.DetailBySubTest.set("SubTestCode", viewModel.SubTestCode);
        viewModel.DetailBySubTest.set("SubTestName", viewModel.SubTest);
        viewModel.set("IsByMappingQuestion", false);
    } else if (document.getElementById('IsByMappingQuestion').checked) {
        viewModel.set("IsByMappingQuestion", true);
        viewModel.set("IsBySubTest", false);
        viewModel.set("TestToolName", TestToolName);
    }

    if (ValidityScaleCode == '' || ValidityScaleName == '' || TestTypeName == '' || TestToolName == '' || (viewModel.IsBySubTest == false && viewModel.IsByMappingQuestion == false)) {
        LoadingMask.hide();
        swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
    } else if (viewModel.IsBySubTest == true) {
        if (viewModel.DetailBySubTest.SubTestCode == "" || viewModel.DetailBySubTest.SubTestName == "" || SubTestName == "") {
            LoadingMask.hide();
            swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
        } else {
            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/ValidityScale/Edit",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        ValidityScaleCode: ValidityScaleCode,
                        TestTypeCode: TestTypeCode,
                        TestToolCode: TestToolCode,
                        ValidityScaleName: ValidityScaleName,
                        IsByMappingQuestion: viewModel.IsByMappingQuestion,
                        DetailBySubTest: {
                            SubTestCode: viewModel.DetailBySubTest.SubTestCode,
                            SubTestName: viewModel.DetailBySubTest.SubTestName,
                        },
                        DetailByMappingQuestion: [],
                        DisplayStatus: DisplayStatus
                    },
                    success: function (response) {
                        if (response.Acknowledge == 1) {
                            LoadingMask.hide();
                            swal("Good", response.Message, "success", { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + "Views/OnlineTesting/ValidityScale/ValidityScale.html";
                            });
                        } else {
                            LoadingMask.hide();
                            swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                        }
                    },
                    error: function (xhr, status, error) {
                        MessageBox.show("Error", "Error" + xhr);
                    },
                });
            });
        }
    } else if (viewModel.IsByMappingQuestion == true) {
        if (viewModel.DetailByMappingQuestion.length == 0) {
            LoadingMask.hide();
            swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
        } else {
            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/ValidityScale/Edit",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        ValidityScaleCode: ValidityScaleCode,
                        TestTypeCode: TestTypeCode,
                        TestToolCode: TestToolCode,
                        ValidityScaleName: ValidityScaleName,
                        IsByMappingQuestion: viewModel.IsByMappingQuestion,
                        DetailBySubTest: {
                            SubTestCode: "",
                            SubTestName: "",
                        },
                        DetailByMappingQuestion: dataMappingQuestion,
                        DisplayStatus: DisplayStatus
                    },
                    success: function (response) {
                        if (response.Acknowledge < 1) {
                            LoadingMask.hide();
                            swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                        } else {
                            LoadingMask.hide();
                            swal("Good", response.Message, "success", { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + "Views/OnlineTesting/ValidityScale/ValidityScale.html";
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        MessageBox.show("Error", "Error" + xhr);
                        LoadingMask.hide();
                    }
                });
            });
        }
    }
    //else {
    //    confirmMessageAdd();
    //    MessageBox.show("Error", "Error");
    //}
    //$('.swal-button--cancel').on('click', function () {
    //});
}
