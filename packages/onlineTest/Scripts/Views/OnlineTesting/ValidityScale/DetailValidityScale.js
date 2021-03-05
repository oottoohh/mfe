$(document).ready(function () {
    cekButtonAddMapping();
    getURL();
    dropDownTestType();
    dropDownTestTool();
    dropDownSubTest();
    //renderGrid();
    kendo.bind($("body"), viewModel);
    renderGridListQuestionAnswer1();
    renderGridListQuestionAnswer2();
    //onClose1();
});

cekButtonAddMapping = function () {
    $('#addMapping').attr('hidden', false);
    $('#checkAddMapping').attr('hidden', false);
    $('#updateMapping').attr('hidden', true);
    $('#checkUpdateMapping').attr('hidden', true);
}

dropDownTestType = function () {
    $("#TestTypeName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModels.CategoryTestTypeByTest,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            viewModel.set('TestType', e.item.context.innerHTML);
            viewModel.set('TestTypeName', e.item.context.innerHTML);
            onChangeTestType(e);
            //viewModels.set('TestToolCode', '');
        }
    });
}

onChangeTestType = function (source) {
    var check_value = source.sender._selectedValue;
    viewModels.set('TestTypeCode', check_value);
    viewModel.set('TestTypeCode', check_value);
    TestToolInByTestEditVS();
}

dropDownTestTool = function () {
    $("#TestTool").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolList,
        dataTextField: "Value",
        dataValueField: "Code",
        //change: onChangeTestTool,
        select: function (e) {
            var id = viewModel.TestToolList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.TestToolList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.TestToolCode !== "") {
                viewModel.set('TestToolCode', id);
                viewModel.set('TestToolName', name);
                viewModel.set('TestTool', name);
                SubTestByTestToolAddVS();
            } else {
                viewModel.set('TestTool', name);
                viewModel.set('TestToolCode', id);
                viewModels.set('TestToolCode', '');
                viewModel.set('TestToolName', name);
                viewModel.set('TestTool', name);
                SubTestByTestToolAddVS();
            }
            //viewModel.set('TestTool', e.item.context.innerHTML);
            //viewModels.set('TestToolCode', '');
            //viewModel.DetailBySubTest.set('SubTestCode', '');
            //viewModels.set('SubTestCode', '');
            //onChangeTestTool(e);
        }
    });
}

//onChangeTestTool = function (source) {
//    var check_value = source.sender._selectedValue;
//    viewModels.set('TestToolCode', check_value);
//    SubTestByTestToolVS();
//}

onChangeSubTest = function (source) {
    var check_value = source.sender._selectedValue;
    SubTestByTestToolEditVS(check_value);
    //viewModel.DetailBySubTest.set('SubTestCode', check_value);
    //for (dbmq = 0; dbmq < viewModel.DetailByMappingQuestion.length; dbmq++) {
    //    viewModel.DetailByMappingQuestion[dbmq].set('SubTestCode1', check_value);
    //    viewModel.DetailByMappingQuestion[dbmq].set('SubTestCode2', check_value);
    //}
}

dropDownSubTest = function () {
    $('#SubTest').kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.SubTestList,
        dataTextField: "Value",
        dataValueField: "Code",
        //change: onChangeSubTestCode,
        select: function (e) {
            var id = viewModel.SubTestList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.SubTestList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.SubTestCode !== "") {
                viewModel.set('SubTestCd', id);
                viewModel.set('SubTestCode', id);
                viewModel.set('SubTestName', name);
                viewModel.set('SubTest', name);
            } else {
                viewModel.set('SubTestCd', id);
                viewModel.set('SubTestCode', id);
                viewModel.set('SubTestName', name);
                viewModel.set('SubTest', name);
            }
            //onChangeSubTestCode(e);
            //viewModel.set('SubTest', e.item.context.innerHTML)
            //viewModel.DetailBySubTest.set('SubTestCode', '');
        }
    });
}

onChangeSubTestCode = function () {
    viewModel.set('SubTestCode', e.sender._selectedValue);
    viewModel.set('SubTestCd', e.sender._selectedValue);
}

dropDownTestToolDialog = function () {
    $("#TestToolName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolList,
        dataTextField: "Value",
        dataValueField: "Code",
        //change: onChangeTestTool,
        select: function (e) {
            viewModel.set('TestTool', e.item.context.innerHTML);
            viewModels.set('TestToolCode', '');
            viewModel.DetailBySubTest.set('SubTestCode', '');
            viewModels.set('SubTestCode', '');
            onChangeTestTool(e);
        }
    });
}

onChangeTestToolDialog = function (source) {
    var check_value = source.sender._selectedValue;
    viewModels.set('TestToolCode', check_value);
    SubTestByTestToolEditVS();
}

dropDownTestToolDialog2 = function () {
    $("#TestToolName2").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolList,
        dataTextField: "Value",
        dataValueField: "Code",
        //change: onChangeTestTool,
        select: function (e) {
            viewModel.set('TestTool', e.item.context.innerHTML);
            viewModels.set('TestToolCode', '');
            viewModel.DetailBySubTest.set('SubTestCode', '');
            viewModels.set('SubTestCode', '');
            onChangeTestTool(e);
        }
    });
}

dropDownSubTestDialog = function () {
    $('#SubTestName').kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.SubTestList,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onChangeSubTestDialog,
        select: function (e) {
            viewModel.set('SubTest', e.item.context.innerHTML)
            viewModel.DetailBySubTest.set('SubTestCode', '');
        }
    });
}

onChangeSubTestDialog = function (source) {
    var check_value = source.sender._selectedValue;
    viewModel.DetailBySubTest.set('SubTestCode', check_value);
    for (dbmq = 0; dbmq < viewModel.DetailByMappingQuestion.length; dbmq++) {
        viewModel.DetailByMappingQuestion[dbmq].set('SubTestCode1', check_value);
        viewModel.DetailByMappingQuestion[dbmq].set('SubTestCode2', check_value);
    }
}

dropDownSubTestDialog2 = function () {
    $('#SubTestName2').kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.SubTestList,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onChangeSubTestDialog,
        select: function (e) {
            viewModel.set('SubTest', e.item.context.innerHTML)
            viewModel.DetailBySubTest.set('SubTestCode', '');
            for (dbmq = 0; dbmq < viewModel.DetailByMappingQuestion.length; dbmq++) {
                viewModel.DetailByMappingQuestion[dbmq].set('SubTestCode1', '');
                viewModel.DetailByMappingQuestion[dbmq].set('SubTestCode2', '');
                viewModel.DetailByMappingQuestion[dbmq].set('SubTestName1', '');
                viewModel.DetailByMappingQuestion[dbmq].set('SubTestName2', '');
            }
        }
    });
}

onChangeSubTestDialog2 = function (source) {
    var check_value = source.sender._selectedValue;
    viewModel.DetailBySubTest.set('SubTestCode', check_value);
    for (dbmq = 0; dbmq < viewModel.DetailByMappingQuestion.length; dbmq++) {
        viewModel.DetailByMappingQuestion[dbmq].set('SubTestCode1', check_value);
        viewModel.DetailByMappingQuestion[dbmq].set('SubTestCode2', check_value);
    }
}

onLoadDataItem1 = function () {
    var value = JSON.parse(localStorage.getItem("ByMappingQuestion"));
    for (i = 0; i < value.length; i++) {
        //viewmodel.set('questionanswercode1', viewmodel.detailbymappingquestion[i].questionanswercode1);
        viewModel.set('QuestionAnswerCode1', value[i].QuestionAnswerCode1);
    }
}

onLoadDataItem2 = function () {
    var value = JSON.parse(localStorage.getItem("ByMappingQuestion"));
    for (i = 0; i < value.length; i++) {
        //viewModel.set('QuestionAnswerCode2', viewModel.DetailByMappingQuestion[i].QuestionAnswerCode2);
        viewModel.set('QuestionAnswerCode2', value[i].QuestionAnswerCode2);
    }
}

searchItem1 = function (data) {
    var edit = $(data).attr('edit');
    var TestToolCode = viewModel.TestToolCode;
    var TestToolName = viewModel.TestToolName;
    //var QuestionAnswerList = viewModel.QuestionAnswerList;

    if (edit == 'true') {
        viewModel.set('TestToolCode', TestToolCode);
        viewModel.set('TestToolName', TestToolName);
        viewModel.DetailByMappingQuestion[0].set("SubTestCode1", SubTestCode1);
        viewModel.DetailByMappingQuestion[0].set("QuestionAnswerCode1", QuestionAnswerCode1);
        viewModel.set("DisplayStatus", DisplayStatus);
        viewModels.set('TestToolCode', TestToolCode);
        TestToolInByTestEditVS();
    } else {
        viewModel.set("TestToolName", TestToolName);
        viewModel.set("TestToolCode", TestToolCode);
        SubTestByTestToolEditVS();
        viewModel.QuestionAnswerList.data([]);
        dropDownTestToolDialog();
    }
    var edit = GetParameterByName('act');
    renderGridListQuestionAnswer1();
    var dialog = $("#dialog");
    dialog.kendoWindow({
        minWidth: "200px",
        height: 375,
        top: 192.3,
        title: "Search",
        visible: false,
        actions: [
            //"Minimize",
            //"Maximize",
            "Close"
        ],
        open: onOpen1,
        close: onClose1

    });
    var dialogs = dialog.data("kendoWindow").open();
    $('.list-data').removeAttr('hidden');
    dialogs.center();
}

renderGridListQuestionAnswer1 = function () {
    var edit = GetParameterByName('act');
    var dataSource = '';
    var dataSourceClone = '';

    dataSources = viewModel.byQuestionList.length;
    if (dataSources > 0) {
        dataSource = viewModel.byQuestionList;
    } else {
        dataSource = edit == 'edit' ? viewModel.QuestionAnswerList : [];
    }
    dataSourceClone = dataSource.length > 0 ? JSON.parse(JSON.stringify(dataSource)) : [];

    $("#gridTable").kendoGrid({
        width: 350,
        dataSource: {
            data: dataSourceClone,
            pageSize: 5,
        },
        columns: [
            {
                field: "IsDisplay", type: "boolean", width: 70, sortable: false, editable: "false",
                title: "<center>Action</center>",
                template: function (dataItem) {
                    var TestTool = dataItem.TesTool
                    var SubTestCode = dataItem.SubTestCode;
                    var SubTestName = dataItem.SubTest;
                    var QuestionAnswerCode = dataItem.QuestionAnswerCode;
                    var Question = dataItem.Question;
                    var DisplayStatus = dataItem.DisplayStatus;
                    var IsDisplay = dataItem.IsDisplay;
                    if (IsDisplay == true) {
                        return "<center><input id='" + QuestionAnswerCode + "' name='radioQnA' class='checkone' qnaCode='" + QuestionAnswerCode + "' TestTool='" + TestTool +
                            "' SubTestCode='" + SubTestCode + "' SubTestName='" + SubTestName + "' Question='" + Question + "' DisplayStatus='" + DisplayStatus +
                            "' type='radio' " + (IsDisplay == 'true' ? "checked" : "") + " checked='true' onclick='lockon1(this)'/></center >"
                    } else {
                        return "<center><input id='" + QuestionAnswerCode + "' name='radioQnA' class='checkone' qnaCode='" + QuestionAnswerCode + "' TestTool='" + TestTool +
                            "' SubTestCode='" + SubTestCode + "' SubTestName='" + SubTestName + "' Question='" + Question + "' DisplayStatus='" + DisplayStatus +
                            "' type='radio' " + (IsDisplay == 'true' ? "checked" : "") + " onclick='lockoff1(this)'/></center >"
                    }
                }
            },
            { field: "TesTool", title: "<center>Test Tool</center>" },
            { field: "SubTest", title: "<center>Sub Test</center>" },
            { field: "QuestionAnswerCode", title: "<center>Q & A Code</center>" },
            { field: "Question", title: "<center>Question</center>" },
            {
                field: "DisplayStatus", title: "<center>Status</center>",
                template: function (dataRole) {
                    if (dataRole.DisplayStatus == true) {
                        return "<span>Active</span>";
                    } else {
                        return "<span>Inactive</span>";
                    }
                }
            }
        ],
        editable: false,
        sortable: true,
        dataBound: function (e) {
            var gridDataView = $("#gridTable").data().kendoGrid.dataSource.view();
            for (i = 0; i < gridDataView.length; i++) {
                var check = $.grep(viewModel.ArrayChecked, function (e) {
                    return e == gridDataView[i].QuestionID
                })
                if (check.length > 0) {
                    $("#gridQ tr td input").eq(i).prop("checked", true);
                }
            }
        },
        pageable: {
            refresh: true,
            pageSizes: [25, 50, 100],
            buttonCount: 5
        }
    })
}

searchItem2 = function (data) {
    var edit = $(data).attr('edit');
    var TestToolCode = viewModel.TestToolCode;
    var TestToolName = viewModel.TestToolName;
    //var QuestionAnswerList = viewModel.QuestionAnswerList;

    if (edit == 'true') {
        viewModel.set('TestToolCodeo', TestToolCode);
        viewModel.set('TestToolName', TestToolName);
        viewModel.DetailByMappingQuestion[0].set("SubTestCode1", SubTestCode1);
        viewModel.DetailByMappingQuestion[0].set("QuestionAnswerCode1", QuestionAnswerCode1);
        viewModel.set("DisplayStatus", DisplayStatus);
        viewModels.set('TestToolCode', TestToolCode);
        TestToolInByTestEditVS();
    } else {
        viewModel.set("TestToolName", TestToolName);
        viewModel.set("TestToolCode", TestToolCode);
        viewModel.QuestionAnswerList.data([]);
        dropDownSubTestDialog2();
    }
    var edit = GetParameterByName('act');
    renderGridListQuestionAnswer2();
    var dialog2 = $("#dialog2");
    dialog2.kendoWindow({
        minWidth: "200px",
        height: 375,
        top: 192.3,
        title: "Search",
        visible: false,
        actions: [
            //"Minimize",
            //"Maximize",
            "Close"
        ],
        open: onOpen2,
        close: onClose2

    });
    var dialogs = dialog2.data("kendoWindow").open();
    $('.list-data2').removeAttr('hidden');
    dialogs.center();
}

renderGridListQuestionAnswer2 = function () {
    var edit = GetParameterByName('act');
    var dataSource = '';
    var dataSourceClone = '';

    dataSources = viewModel.byQuestionList.length;
    if (dataSources > 0) {
        dataSource = viewModel.byQuestionList;
    } else {
        dataSource = edit == 'edit' ? viewModel.QuestionAnswerList : [];
    }
    dataSourceClone = dataSource.length > 0 ? JSON.parse(JSON.stringify(dataSource)) : [];

    $("#gridTable2").kendoGrid({
        width: 350,
        dataSource: {
            data: dataSourceClone,
            pageSize: 5,
        },
        columns: [
            {
                field: "IsDisplay", type: "boolean", width: 70, sortable: false, editable: "false",
                title: "<center>Action</center>",
                template: function (dataItem) {
                    var TestTool = dataItem.TesTool
                    var SubTestCode = dataItem.SubTestCode;
                    var SubTestName = dataItem.SubTest;
                    var QuestionAnswerCode = dataItem.QuestionAnswerCode;
                    var Question = dataItem.Question;
                    var DisplayStatus = dataItem.DisplayStatus;
                    var IsDisplay = dataItem.IsDisplay;
                    if (IsDisplay == true) {
                        return "<center><input id='" + QuestionAnswerCode + "' name='radioQnA' class='checkone' qnaCode='" + QuestionAnswerCode + "' TestTool='" + TestTool +
                            "' SubTestCode='" + SubTestCode + "' SubTestName='" + SubTestName + "' Question='" + Question + "' DisplayStatus='" + DisplayStatus +
                            "' type='radio' " + (IsDisplay == 'true' ? "checked" : "") + " checked='true' onclick='lockon2(this)' /></center >"
                    } else {
                        return "<center><input id='" + QuestionAnswerCode + "' name='radioQnA' class='checkone' qnaCode='" + QuestionAnswerCode + "' TestTool='" + TestTool +
                            "' SubTestCode='" + SubTestCode + "' SubTestName='" + SubTestName + "' Question='" + Question + "' DisplayStatus='" + DisplayStatus +
                            "' type='radio' " + (IsDisplay == 'true' ? "checked" : "") + " onclick='lockoff2(this)' /></center >"
                    }
                }
            },
            { field: "TesTool", title: "<center>Test Tool</center>" },
            { field: "SubTest", title: "<center>Sub Test</center>" },
            { field: "QuestionAnswerCode", title: "<center>Q & A Code</center>" },
            { field: "Question", title: "<center>Question</center>" },
            {
                field: "DisplayStatus", title: "<center>Status</center>",
                template: function (dataRole) {
                    if (dataRole.DisplayStatus == true) {
                        return "<span>Active</span>";
                    } else {
                        return "<span>Inactive</span>";
                    }
                }
            }
        ],
        editable: false,
        sortable: true,
        dataBound: function (e) {
            var gridDataView = $("#gridTable2").data().kendoGrid.dataSource.view();
            for (i = 0; i < gridDataView.length; i++) {
                var check = $.grep(viewModel.ArrayChecked, function (e) {
                    return e == gridDataView[i].QuestionID
                })
                if (check.length > 0) {
                    $("#gridQ tr td input").eq(i).prop("checked", true);
                }
            }
        },
        pageable: {
            refresh: true,
            pageSizes: [25, 50, 100],
            buttonCount: 5
        }
    })
}

CancelItem1 = function () {
    var dialog = $("#dialog").data('kendoWindow');
    dialog.close();
}

CancelItem2 = function () {
    var dialog = $("#dialog2").data('kendoWindow');
    dialog.close();
}

renderGrid = function (arrMappingQuestion) {
    $("#grid").kendoGrid({
        resizable: true,
        dataSource: arrMappingQuestion,
        columns: [
            {
                field: "id",
                title: "<center>Action</center>",
                width: "80px", sortable: false,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' id='" + dataItem.Id +
                        "' questionAnswerCode1='" + dataItem.QuestionAnswerCode1 +
                        "' questionAnswerCode2='" + dataItem.QuestionAnswerCode2 +
                        "' subTestCode1='" + dataItem.SubTestCode1 +
                        "' subTestName1='" + dataItem.SubTestName1 +
                        "' subTestCode2='" + dataItem.SubTestCode2 +
                        "' subTestName2='" + dataItem.SubTestName2 +
                        "' style='min-width:16px' href='#' onclick='editMappingQuestion(this)'><span class='fas fa-pencil-alt'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.Id + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                }
            },
            { field: "QuestionAnswerCode1", title: "<center>Item 1</center>" },
            { field: "QuestionAnswerCode2", title: "<center>Item 2</center>" }
        ],
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: [25, 50, 100],
            buttonCount: 5
        }
    })
}

editMappingQuestion = function (data) {
    var id = $(data).attr('id');
    var QuestionAnswerCode1 = $(data).attr('questionAnswerCode1');
    var QuestionAnswerCode2 = $(data).attr('questionAnswerCode2');
    viewModel.set('MappingQuestionCode', id);
    $('#addMapping').attr('hidden', true);
    $('#checkAddMapping').attr('hidden', true);
    $('#updateMapping').attr('hidden', false);
    $('#checkUpdateMapping').attr('hidden', false);
    //if (viewModel.QuestionAnswerCode1 == "" && viewModel.QuestionAnswerCode2 == "") {
        if (viewModel.DetailByMappingQuestion.length > 0) {
            for (a = 0; a < viewModel.DetailByMappingQuestion.length; a++) {
                if (QuestionAnswerCode1 == viewModel.DetailByMappingQuestion[a].QuestionAnswerCode1 && QuestionAnswerCode2 == viewModel.DetailByMappingQuestion[a].QuestionAnswerCode2) {
                    viewModel.set('QuestionAnswerCode1', viewModel.DetailByMappingQuestion[a].QuestionAnswerCode1);
                    viewModel.set('QuestionAnswerCode2', viewModel.DetailByMappingQuestion[a].QuestionAnswerCode2);
                    viewModel.set('SubTestCode1', viewModel.DetailByMappingQuestion[a].SubTestCode1);
                    viewModel.set('SubTestName1', viewModel.DetailByMappingQuestion[a].SubTestName1);
                    viewModel.set('SubTestCode2', viewModel.DetailByMappingQuestion[a].SubTestCode2);
                    viewModel.set('SubTestName2', viewModel.DetailByMappingQuestion[a].SubTestName2);
                }
            }
        }
    //}
}

lockoff1 = function (data) {
    var id = $(data).attr('id');
    //var QuestionAnswerCode = $(data).attr('QuestionAnswerCode');
    var List = viewModel.ArrayChecked;
    for (i = 0; i < viewModel.ArrayChecked.length; i++) {
        if (viewModel.ArrayChecked[i].QuestionAnswerCode == id) {
            viewModel.ArrayChecked[i].IsDisplay = true;
        }
    }
    $('#C' + id).removeAttr('disabled');
    $('#D' + id).removeAttr('disabled');
    //$('#' + id).removeAttr('onclick');
    //$('#' + id).attr('onclick', 'lockon(this)');
    //TempItem1();
}

lockon1 = function (data) {
    var id = $(data).attr('id');
    var QuestionAnswerCode = $(data).attr('QuestionAnswerCode');
    var List = viewModel.ArrayChecked;
    for (i = 0; i < List.length; i++) {
        if (List[i].QuestionAnswerCode == id) {
            viewModel.ArrayChecked[i].set("IsDisplay", false);
        }
    }
    $('#C' + id).attr('disabled', 'disabled');
    $('#D' + id).attr('disabled', 'disabled');
    $('#C' + id).val("");
    $('#D' + id).val("");
    $('#' + id).removeAttr('onclick');
    $('#' + id).attr('onclick', 'lockoff(this)');
}

lockoff2 = function (data) {
    var id = $(data).attr('id');
    //var QuestionAnswerCode = $(data).attr('QuestionAnswerCode');
    var List = viewModel.ArrayChecked;
    for (i = 0; i < viewModel.ArrayChecked.length; i++) {
        if (viewModel.ArrayChecked[i].QuestionAnswerCode == id) {
            viewModel.ArrayChecked[i].IsDisplay = true;
        }
    }
    $('#C' + id).removeAttr('disabled');
    $('#D' + id).removeAttr('disabled');
    //$('#' + id).removeAttr('onclick');
    //$('#' + id).attr('onclick', 'lockon(this)');
    //TempItem2();
}

lockon2 = function (data) {
    var id = $(data).attr('id');
    var QuestionAnswerCode = $(data).attr('QuestionAnswerCode');
    var List = viewModel.ArrayChecked;
    for (i = 0; i < List.length; i++) {
        if (List[i].QuestionAnswerCode == id) {
            viewModel.ArrayChecked[i].set("IsDisplay", false);
        }
    }
    $('#C' + id).attr('disabled', 'disabled');
    $('#D' + id).attr('disabled', 'disabled');
    $('#C' + id).val("");
    $('#D' + id).val("");
    $('#' + id).removeAttr('onclick');
    $('#' + id).attr('onclick', 'lockoff(this)');
}

Display = function (data) {
    $('#isDisplay').removeAttr('onchange');
    $('#isDisplay').attr('onchange', 'DisplayChecked(this)');
    viewModel.set('DisplayStatus', false);
}

DisplayChecked = function (data) {
    $('#isDisplay').removeAttr('onchange');
    $('#isDisplay').attr('onchange', 'Display(this)');
    viewModel.set('DisplayStatus', true);
}

onClose1 = function () {
    $("#dialog").fadeIn();
}

onOpen1 = function () {
    $("#dialog").fadeIn();
}

onClose2 = function () {
    $("#dialog2").fadeIn();
}

onOpen2 = function () {
    $("#dialog2").fadeIn();
}

selectAll = function () {
    viewModel.ArrayChecked = [];
    var isAllChecked = false;
    if ($(':input.checkone:checked').length == $(':input.checkone').length) {
        isAllChecked = true;
    }
    if (!isAllChecked) {
        $(':input.checkone').each(function () {
            this.checked = true;
            var question = viewModel.ArrayChecked.indexOf(this.name);
            var qna = $(this).attr('qna');
            if (!(question > -1)) {
                viewModel.ArrayChecked.push(qna);
            }
        })
    } else {
        $(':input.checkone').each(function () {
            this.checked = false;
            var question = viewModel.ArrayChecked.indexOf(this.name);
            if (~question) {
                viewModel.ArrayChecked.splice(question, 1);
            }
        })
    }
}

$(document).on('click', 'input.checkone', function (e) {
    var checked = $(this).prop("checked");
    //var gridDataView = $("#grid").data().kendoGrid.dataSource.view();
    //var gridData = $("#grid").data().kendoGrid.dataSource.data();
    var idx = $(this).attr('qnaCode');
    var question = $(this).attr('Question');
    var testTool = $(this).attr('TestTool');
    var subTestCode = $(this).attr('SubTestCode');
    var subTestName = $(this).attr('SubTestName');
    var displayStatus = $(this).attr('DisplayStatus');
    if (checked) {
        var position = viewModel.ArrayChecked.indexOf(idx);
        if (!(position > -1)) {
            viewModel.ArrayChecked.push({
                "TestTool": testTool,
                "SubTestCode": subTestCode,
                "SubTestName": subTestName,
                "QuestionAnswerCode": idx,
                "Question": question,
                "DisplayStatus": displayStatus
            });
        }
    } else {
        for (var i = 0; i < viewModel.ArrayChecked.length; i++) {
            if (idx == viewModel.ArrayChecked[i].QuestionAnswerCode) {
                viewModel.ArrayChecked.splice(i, 1);
            }
        }
    }
});