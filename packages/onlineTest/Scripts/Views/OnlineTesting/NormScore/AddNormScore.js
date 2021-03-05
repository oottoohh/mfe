$(document).ready(function () {
    var branchProfileID = GetParameterByName('NormScore');
    LoadData(branchProfileID);
    kendo.bind($("body"), viewModel);
});

LoadData = function (data) {
    if (data != '') {
        var edit = GetParameterByName('act');
        $.ajax({
            type: "POST",
            url: SERVICE_URL + "api/NormScore/Detail",
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                NormScoreCode: data
            },
            success: function (response) {
                if (response.Acknowledge < 1) {
                }
                else {
                    var No = 1;
                    var arrNormScore = [];
                    for (a = 0; a < response.NormScoreDetail.NormScores.length; a++) {
                        arrNormScore.push({
                            No: No,
                            Scores: response.NormScoreDetail.NormScores[a].Scores,
                            SubTest: response.NormScoreDetail.NormScores[a].SubTest,
                            SubTestCode: response.NormScoreDetail.NormScores[a].SubTestCode,
                            isValidityScale: response.NormScoreDetail.NormScores[a].isValidityScale,
                            IsParent: response.NormScoreDetail.NormScores[a].IsParent
                        });
                        No++;
                    }
                    viewModel.set('lenghtHeader', response.NormScoreDetail.NormScores[0].Scores.length);
                    viewModel.set('createBy', response.NormScoreDetail.CreateBy);
                    viewModel.set('lastModifiedBy', response.NormScoreDetail.ModifBy);
                    viewModel.set('createOn', response.NormScoreDetail.CreatedTime);
                    viewModel.set('lastModifiedOn', response.NormScoreDetail.ModifiedTime);

                    if (edit == 'editNew') {
                        viewModel.set('NormScoreCode', '');
                    } else {
                        viewModel.set('NormScoreCode', response.NormScoreDetail.NormScoreCode);
                        $("#TestTypeName").kendoComboBox({ enable: false });
                        $("#TestToolName").kendoComboBox({ enable: false });
                    }
                    viewModel.set('NormScoreName', response.NormScoreDetail.NormScoreName);
                    viewModel.set('CompanyId', response.NormScoreDetail.CompanyId);
                    viewModel.set('CompanyName', response.NormScoreDetail.CompanyName);
                    viewModel.set('GradeId', response.NormScoreDetail.GradeId);
                    viewModel.set('GradeName', response.NormScoreDetail.GradeName);
                    viewModel.set('TestTypeCode', response.NormScoreDetail.TestTypeCode);
                    viewModel.set('TestTypeName', response.NormScoreDetail.TestTypeName);
                    viewModel.set('DisplayStatus', response.NormScoreDetail.DisplayStatus);
                    viewModel.set('TestToolCode', response.NormScoreDetail.TestToolCode);
                    viewModel.set('TestToolName', response.NormScoreDetail.TestToolName);
                    viewModel.set('TestTool', response.NormScoreDetail.TestToolName);

                    viewModel.ApplicantList.data(arrNormScore);
                    viewModel.listNormScore.data(arrNormScore);

                    CompanyLoad();
                    GradeLoad();
                    dropDownTestType();
                    dropDownTestTool();
                    TestTypeByCompanyNormScoreEdit();
                    //kendoGrids();
                    //if (viewModel.IsByTest == true) {
                    //    kendoGrids();
                    //} else {
                    //    kendoGridEditTanpaKolomVS()
                    //}
                }
            },
            error: function (xhr, status, error) {
                MessageBox.show("Error", "Error");
            }
        });
    } else {
        CompanyLoad();
        GradeLoad();
        dropDownTestType();
        dropDownTestTool();
        kendoGrid();
    }
}

CompanyLoad = function () {
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Company",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Data.length < 1) {
                LoadingMask.hide();
                swal("Failed!!!", "Company Not Found", "warning", { closeOnClickOutside: false });
                return;
            } else {
                LoadingMask.hide();
                if (viewModel.CompanyId !== "") {
                    viewModel.set('CompanyList', response.Data);
                    viewModel.set('CompanyId', viewModel.CompanyId);
                    viewModel.set('CompanyName', viewModel.CompanyName);
                    dropDownCompany();
                } else {
                    viewModel.set('CompanyList', response.Data);
                    viewModel.set('CompanyName', "");
                    dropDownCompany();
                }
            }
        }
    });
}

GradeLoad = function () {
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Grade",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Data.length < 1) {
                LoadingMask.hide();
                swal("Failed!!!", "Grade Not Found", "warning", { closeOnClickOutside: false });
                return;
            } else {
                LoadingMask.hide();
                if (viewModel.GradeId !== "") {
                    viewModel.set('GradeList', response.Data);
                    viewModel.set('GradeId', viewModel.GradeId);
                    viewModel.set('GradeName', viewModel.GradeName);
                    dropDownGrade();
                } else {
                    viewModel.set('GradeList', response.Data);
                    viewModel.set('GradeName', "");
                    dropDownGrade();
                }
            }
        }
    });
}

dropDownCompany = function () {
    $("#CompanyId").kendoComboBox({
        autoBind: true,
        placeholder: "Select Company..",
        dataSource: viewModel.CompanyList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.CompanyList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.CompanyList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.CompanyId !== "") {
                viewModel.set('CompanyId', id);
                viewModel.set('CompanyName', name);
                TestTypeByCompanyNormScore();
            } else {
                viewModel.set('CompanyId', id);
                viewModel.set('CompanyName', name);
                TestTypeByCompanyNormScore();
            }
        }
    });
}

dropDownGrade = function () {
    $("#GradeId").kendoComboBox({
        autoBind: true,
        placeholder: "Select Grade..",
        dataSource: viewModel.GradeList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.GradeList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.GradeList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.GradeId !== "") {
                viewModel.set('GradeId', id);
                viewModel.set('GradeName', name);
            } else {
                viewModel.set('GradeId', id);
                viewModel.set('GradeName', name);
            }
        }
    });
}

dropDownTestType = function () {
    $("#TestTypeCode").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestTypeList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.TestTypeList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.TestTypeList.find(x => x.Value === e.item.context.innerHTML).Value;
            var IsByTest = viewModel.TestTypeList.find(x => x.Value === e.item.context.innerHTML).IsByTest;
            if (viewModel.TestTypeCode !== "") {
                viewModel.set('TestTypeCode', id);
                viewModel.set('TestTypeName', name);
                viewModel.set('IsByTest', IsByTest)
                TestToolByTestTypeNormScoreAdd();
            } else {
                viewModel.set('TestTypeCode', id);
                viewModel.set('TestTypeName', name);
                viewModel.set('IsByTest', IsByTest)
                TestToolByTestTypeNormScoreAdd();
            }
        }
    });
}

dropDownTestTool = function () {
    $("#TestToolCode").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.TestToolList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.TestToolList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.TestToolCode !== "") {
                viewModel.set('TestToolCode', id);
                viewModel.set('TestToolName', name);
                viewModel.set('TestTool', name);
                headerFunction();
            } else {
                viewModel.set('TestToolCode', id);
                viewModel.set('TestToolName', name);
                viewModel.set('TestTool', name);
                headerFunction();
            }
        }
    });
}

kendoGrid = function () {
    $("#NormScoreFill").kendoGrid({
        width: '',
        resizable: true,
        dataSource:viewModel.ApplicantList,
        columns: [
            { field: "SubTest", title: "<center>Sub Test/Score</center>", width: 300 },
            {
                field: "isValidityScale", title: "<center>Validity Scale</center>", width: 100,
                template: function (dataItem) {
                    if (dataItem.isValidityScale == true) {
                        return "<span>Yes</span>";
                    } else {
                        return "<span>No</span>";
                    }
                }
            },
            {
                field: "Scores", width: 5000,
                headerTemplate: function () {
                    var lenghtHeader = viewModel.lenghtHeaders;
                    //var lenghtHeader = 0;
                    var html = [];
                    var no = 0
                    if (lenghtHeader < 1) {
                        html.push('<span>Score</span>');
                    } else {
                        for (is = 0; is < lenghtHeader + 1; is++) {
                            html.push('<span class="k-textbox" style="width:45px;border:1px solid black;">' + no + '</span>');
                            no++
                        }
                    }
                    return html.join(' ');
                },
                template: function (dataItem) {
                    if (dataItem.Scores == undefined) {
                        return '<input type="number" id="" name="" value="0" class="k-textbox" style="width:45px;" onchange="ValueScore(this)"/>';
                    } else {
                        var html = [];
                        for (i = 0; i < dataItem.Scores.length; i++) {
                            html.push('<input type="number" id="' + dataItem.Scores[i].No + '" name="' + dataItem.No + '" value=' + dataItem.Scores[i].Value + ' class="k-textbox" style="width:45px;" onchange="ValueScore(this)"/>');
                        }
                        return html.join(' ');
                    }
                },
            },
        ],
        //editable: true,
        sortable: false,
        scrollable: true,
        reorderable: true,
        groupable: false,
        resizeable: true,
        columnMenu: false,
        pageSizes: true,
        pageable: {
            refresh: false,
            pageSizes: [10,20,50],
            numeric: false,
            previousNext:false
        }
    });
}

kendoGridTanpaKolomVS = function () {
    $("#NormScoreFill").kendoGrid({
        width: '',
        resizable: true,
        dataSource: viewModel.ApplicantList,
        columns: [
            { field: "SubTest", title: "<center>Sub Test/Score</center>", width: 300 },
            {
                field: "Scores", width: 5000,
                headerTemplate: function () {
                    var lenghtHeader = viewModel.lenghtHeaders;
                    //var lenghtHeader = 0;
                    var html = [];
                    var no = 0
                    if (lenghtHeader < 1) {
                        html.push('<span>Score</span>');
                    } else {
                        for (is = 0; is < lenghtHeader + 1; is++) {
                            html.push('<span class="k-textbox" style="width:45px;border:1px solid black;">' + no + '</span>');
                            no++
                        }
                    }
                    return html.join(' ');
                },
                template: function (dataItem) {
                    if (dataItem.Scores == undefined) {
                        return '<input type="number" id="" name="" value="0" class="k-textbox" style="width:45px;" onchange="ValueScore(this)"/>';
                    } else {
                        var html = [];
                        for (i = 0; i < dataItem.Scores.length; i++) {
                            html.push('<input type="number" id="' + dataItem.Scores[i].No + '" name="' + dataItem.No + '" value=' + dataItem.Scores[i].Value + ' class="k-textbox" style="width:45px;" onchange="ValueScore(this)"/>');
                        }
                        return html.join(' ');
                    }
                },
            },
        ],
        //editable: true,
        sortable: false,
        scrollable: true,
        reorderable: true,
        groupable: false,
        resizeable: true,
        columnMenu: false,
        pageSizes: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 20, 50],
            numeric: false,
            previousNext: false
        }
    });
}

kendoGrids = function () {
    $("#NormScoreFill").kendoGrid({
        width: 'auto',
        resizable: true,
        dataSource: viewModel.listNormScore._data,
        columns: [
            { field: "SubTest", title: "<center>Sub Test/Score</center>", width: 100 },
            {
                field: "isValidityScale", title: "<center>Validity Scale</center>", width: 100,
                template: function (dataItem) {
                    if (dataItem.isValidityScale == true) {
                        return "<span>Yes</span>";
                    } else {
                        return "<span>No</span>";
                    }
                }
            },
            {
                field: "Scores", width: 5000,
                headerTemplate: function () {
                    var lenghtHeader = viewModel.lenghtHeader;
                    //var lenghtHeader = 0;
                    var html = [];
                    var no = 0;
                    for (is = 0; is < lenghtHeader; is++) {
                        html.push('<span class="k-textbox" style="width:45px;border:1px solid black;">' + no + '</span>');
                        no++
                    }
                    return html.join(' ');
                },
                template: function (dataItem) {
                    if (dataItem.Scores == undefined) {
                        return '<input type="number" id="" name="" value="0" class="k-textbox" style="width:45px;" onchange="ValueScore(this)"/>';
                    } else {
                        var html = [];
                        for (i = 0; i < dataItem.Scores.length; i++) {
                            html.push('<input type="number" id="' + dataItem.Scores[i].No + '" name="' + dataItem.No + '" value=' + dataItem.Scores[i].Value + ' class="k-textbox" style="width:45px;" onchange="ValueScore(this)"/>');
                        }
                        return html.join(' ');
                    }
                },
            },
        ],
        //editable: true,
        sortable: false,
        scrollable: true,
        reorderable: true,
        groupable: false,
        resizeable: true,
        columnMenu: false,
        pageable: {
            refresh: false,
            pageSizes: [10, 20, 50],
            numeric: false,
            previousNext: false
        }
    });
}

kendoGridEditTanpaKolomVS = function () {
    $("#NormScoreFill").kendoGrid({
        width: 'auto',
        resizable: true,
        dataSource: viewModel.listNormScore._data,
        columns: [
            { field: "SubTest", title: "<center>Sub Test/Score</center>", width: 100 },
            {
                field: "Scores", width: 5000,
                headerTemplate: function () {
                    var lenghtHeader = viewModel.lenghtHeader;
                    //var lenghtHeader = 0;
                    var html = [];
                    var no = 0;
                    for (is = 0; is < lenghtHeader; is++) {
                        html.push('<span class="k-textbox" style="width:45px;border:1px solid black;">' + no + '</span>');
                        no++
                    }
                    return html.join(' ');
                },
                template: function (dataItem) {
                    if (dataItem.Scores == undefined) {
                        return '<input type="number" id="" name="" value="0" class="k-textbox" style="width:45px;" onchange="ValueScore(this)"/>';
                    } else {
                        var html = [];
                        for (i = 0; i < dataItem.Scores.length; i++) {
                            html.push('<input type="number" id="' + dataItem.Scores[i].No + '" name="' + dataItem.No + '" value=' + dataItem.Scores[i].Value + ' class="k-textbox" style="width:45px;" onchange="ValueScore(this)"/>');
                        }
                        return html.join(' ');
                    }
                },
            },
        ],
        //editable: true,
        sortable: false,
        scrollable: true,
        reorderable: true,
        groupable: false,
        resizeable: true,
        columnMenu: false,
        pageable: {
            refresh: false,
            pageSizes: [10, 20, 50],
            numeric: false,
            previousNext: false
        }
    });
}

ValueScore = function (data) {
    var id = $(data).attr('id');
    var name = $(data).attr('name');
    var value = $(data).val();
    var Val = parseFloat(value);
    var dataa = viewModel.ApplicantList._data;
    var grid = $("#NormScoreFill").data("kendoGrid");
    var dataItem = grid._data[name - 1];
    var data = dataItem.Scores[id];
    if (value < 1) {
        swal('Notification', 'Your Number less than 1', 'warning', { closeOnClickOutside: false });
        return;
    } else {
        data.set("Value", Val);
        for (a = 0; a < dataa.length; a++) {
            if (dataa[a].No == name) {
                if (dataa[a].Scores.length > 0) {
                    for (b = 0; b < dataa[a].Scores.length; b++) {
                        if (dataa[a].Scores[b].No == id) {
                            dataa[a].Scores[b].set('Value', Val);
                        }
                    }
                }
            }
        }
    }
    //if (id >= 1) {
    //    if (value < dataItem.Scores[id - 1].Value) {
    //        swal('Failed!!!', 'Your number less than before', 'warning');
    //        viewModel.set('isStatus', false);
    //    }
    //    else {
    //        viewModel.set('isStatus', true);
    //    }
    //} else {
    //    viewModel.set('isStatus', true);
    //}
}

headerFunction= function () {
    $.ajax({
        type: "POST",
        url: SERVICE_URL + "api/NormScore/GetNormScore",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestTypeCode: viewModel.TestTypeCode,
            TestToolCode: viewModel.TestToolCode
        },
        success: function (response) {
            if (response.Acknowledge == 1) {
                viewModel.set('lenghtHeaders', response.NormScores[0].NormScoreLength);
                var coloumns = [];
                var no = 1;
                for (si = 0; si < response.NormScores[0].NormScoreLength; si++) {
                    coloumns.push({
                        title: '' + no
                    });
                    no++;
                }
                var grid = $("#NormScoreFill").data('kendoGrid');
                if (grid == undefined) {
                    if (viewModel.IsByTest == true) {
                        kendoGrid();
                    } else {
                        kendoGridTanpaKolomVS()
                    }
                } else {
                    grid.destroy();
                    $('#NormScoreFill').empty();
                    if (viewModel.IsByTest == true) {
                        kendoGrid();
                    } else {
                        kendoGridTanpaKolomVS()
                    }
                }
                //grid.destroy();
            }
        },
        error: function (xhr, status, error) {
            MessageBox.show("Error", "Error");
            LoadingMask.hide();
        }
    });
}

Display = function (data) {
    //$(data).val(false);
    //var id = $(data).attr('id');
    $('#isDisplay').removeAttr('onchange');
    $('#isDisplay').attr('onchange', 'DisplayChecked(this)');
    //var nilai = $(data).val();
    viewModel.set('DisplayStatus', false);
}

DisplayChecked = function (data) {
    //$(data).val(true);
    //var id = $(data).attr('id');
    $('#isDisplay').removeAttr('onchange');
    $('#isDisplay').attr('onchange', 'Display(this)');
    //var nilai = $(data).val();
    viewModel.set('DisplayStatus', true);
}