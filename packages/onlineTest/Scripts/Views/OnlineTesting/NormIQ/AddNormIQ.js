$(document).ready(function () {
    LoadingMask.show();
    var branchProfileID = GetParameterByName('NormScoreIQ');
    LoadData(branchProfileID);
    kendo.bind($("body"), viewModel);
    $("#gridSubTestNormIQ").width(500);
    kendoGrid();
    $('#SubTestCode').kendoMultiSelect({
        dataSource: viewModel.SubTestList,
        dataTextField: "Value",
        dataValueField: "Value",
        select: function (e) {
            var id = viewModel.SubTestList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.SubTestList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.SubTestCode !== "") {
                viewModel.set('SubTestCd', id);
                viewModel.set('SubTestCode', id);
                viewModel.set('SubTestName', name);
            } else {
                viewModel.set('SubTestCd', id);
                viewModel.set('SubTestCode', id);
                viewModel.set('SubTestName', name);
            }
        }
    })
    //LoadingMask.hide();
});

LoadData = function (data) {
    if (data !== '') {
        var edit = GetParameterByName('act');
        LoadingMask.show();
        $.ajax({
            type: "POST",
            url: SERVICE_URL + "api/NormScoreIQ/Detail",
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                NormScoreCode: data
            },
            success: function (response) {
                if (response.Acknowledge < 1) {
                    LoadingMask.hide();
                }
                else {
                    viewModel.set('createBy', response.NormScoreIQDetail.CreateBy);
                    viewModel.set('lastModifiedBy', response.NormScoreIQDetail.ModifBy);
                    viewModel.set('createOn', response.NormScoreIQDetail.CreatedTime);
                    viewModel.set('lastModifiedOn', response.NormScoreIQDetail.ModifiedTime);

                    if (edit == 'editNew') {
                        viewModel.set('NormScoreIQCode', '');
                        viewModel.set('NormScoreIQName', '');
                    } else {
                        viewModel.set('NormScoreIQCode', response.NormScoreIQDetail.NormScoreIQCode);
                        viewModel.set('NormScoreIQName', response.NormScoreIQDetail.NormScoreIQName);
                    }
                    viewModel.set('CompanyId', response.NormScoreIQDetail.CompanyId);
                    viewModel.set('CompanyName', response.NormScoreIQDetail.CompanyName);
                    viewModel.set('GradeId', response.NormScoreIQDetail.GradeId);
                    viewModel.set('GradeName', response.NormScoreIQDetail.GradeName);
                    viewModel.set('TestToolCode', response.NormScoreIQDetail.TestToolCode);
                    viewModels.set('TestToolCode', response.NormScoreIQDetail.TestToolCode);
                    viewModel.set('TestToolName', response.NormScoreIQDetail.TestToolName);
                    var arrDetail = [];
                    if (response.NormScoreIQDetail.Detail.length > 0) {
                        for (a = 0; a < response.NormScoreIQDetail.Detail.length; a++) {
                            arrDetail.push(response.NormScoreIQDetail.Detail[a])
                        }
                    }
                    viewModel.set('DetailVariableStdDevMean', arrDetail);
                    viewModel.set('DisplayStatus', response.NormScoreIQDetail.DisplayStatus);

                    CompanyLoad();
                    GradeLoad();
                    TestToolIQByCompanyEdit();
                    kendoGrid(arrDetail);
                    LoadingMask.hide();
                }
            },
            error: function (xhr, status, error) {
                MessageBox.show("Error", "Error");
            }
        });
    } else {
        LoadingMask.show();
        CompanyLoad();
        GradeLoad();
        dropDownTestTool();
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
            }
            else {
                viewModel.set('CompanyList', response.Data);
                if (viewModel.CompanyName !== "") {
                    viewModel.set('CompanyName', viewModel.CompanyName);
                } else {
                    viewModel.set('CompanyName', "");
                }
                LoadingMask.hide();
                dropDownCompany();
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
            }
            else {
                viewModel.set('GradeList', response.Data);
                if (viewModel.GradeName !== "") {
                    viewModel.set('GradeName', viewModel.GradeName);
                } else {
                    viewModel.set('GradeName', "");
                }
                LoadingMask.hide();
                dropDownGrade();
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
                viewModel.set('DetailVariableStdDevMean', []);
                kendoGrid(viewModel.DetailVariableStdDevMean)
                TestToolIQByCompanyAdd();
            } else {
                viewModel.set('CompanyId', id);
                viewModel.set('CompanyName', name);
                TestToolIQByCompanyAdd();
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
                viewModel.set('DetailVariableStdDevMean', []);
                kendoGrid(viewModel.DetailVariableStdDevMean)
                SubTestMappingByTestToolIQ();
            } else {
                viewModel.set('TestToolCode', id);
                viewModel.set('TestToolName', name);
                SubTestMappingByTestToolIQ();
            }
        }
    });
}

dropDownSubTest = function () {
    $("#SubTestCode").data("kendoMultiSelect").value([]);
    var dataSource = new kendo.data.DataSource({
        data: viewModel.SubTestList
    })
    var SubTestCode = $("#SubTestCode").data("kendoMultiSelect");
    SubTestCode.setDataSource(dataSource);
}

kendoGrid = function (arrSubTestNormIQ) {
    if (arrSubTestNormIQ == undefined || arrSubTestNormIQ == "" || arrSubTestNormIQ.length == 0) {
        var arrSubTestNormIQ = [];
        arrSubTestNormIQ.push({
            Code: "IQ",
            DisplayStatus: true,
            IsIQ: true,
            IsParent: false,
            Mean: "",
            Name: "IQ",
            StandardDeviasi: ""
        })
        viewModel.set("DetailVariableStdDevMean", arrSubTestNormIQ);
    } else {
        viewModel.set("DetailVariableStdDevMean", arrSubTestNormIQ);
    }
    $("#gridSubTestNormIQ").kendoGrid({
        resizable: true,
        dataSource: viewModel.DetailVariableStdDevMean,
        columns: [
            {
                field: "Code", title: "<center>Action</center>", width: "38px", sortable: false,
                template: function (dataItem) {
                    if (dataItem.Code !== "" && dataItem.Code !== "IQ") {
                        return "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.Code + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                    } else {
                        return "<label></label>";
                    }

                }
            },
            { field: "Name", title: "<center>Variable</center>", width: "200px" },
            {
                field: "StandardDeviasi", title: "<center>Std Dev</center>", width: "70px",
                template: function (dataItem) {
                    return "<input type='text' class='k-textbox' style='width:100%; text-align:center;' id='" + dataItem.Code +"' value='" + dataItem.StandardDeviasi + "' onchange='changeStandardDeviasi(this)'/>";
                }
            },
            {
                field: "Mean", title: "<center>Mean</center>", width: "70px",
                template: function (dataItem) {
                    return "<input type='text' class='k-textbox' style='width:100%; text-align:center;' id='" + dataItem.Code +"' value='" + dataItem.Mean + "' onchange='changeMean(this)'/>";
                }
            },
        ],
        sortable: true,
    });
}

changeStandardDeviasi = function (data) {
    var id = $(data).attr('id');
    var input = $(data).val().replace(",", ".")
    if (input == "") {
        input = 0
    }
    var standardDeviasi = parseFloat(input).toFixed(2);
    //var standardDeviasi = parseFloat($(data).val()).toFixed(2);
    if (viewModel.DetailVariableStdDevMean.length > 0) {
        for (a = 0; a < viewModel.DetailVariableStdDevMean.length; a++) {
            if (viewModel.DetailVariableStdDevMean[a].Code == id) {
                viewModel.DetailVariableStdDevMean[a].set('StandardDeviasi', standardDeviasi)
            }
        }
    }
}

changeMean = function (data) {
    var id = $(data).attr('id');
    var input = $(data).val().replace(",", ".")
    if (input == "") {
        input = 0
    }
    var mean = parseFloat(input).toFixed(2);
    //var mean = parseFloat($(data).val()).toFixed(2);
    if (viewModel.DetailVariableStdDevMean.length > 0) {
        for (a = 0; a < viewModel.DetailVariableStdDevMean.length; a++) {
            if (viewModel.DetailVariableStdDevMean[a].Code == id) {
                viewModel.DetailVariableStdDevMean[a].set('Mean', mean)
            }
        }
    }
}

kendoGrids = function () {
    $("#gridSubTestNormIQ").kendoGrid({
        resizable: true,
        dataSource: viewModel.listGrid,
        columns: [
            { field: "SubTestName", title: "<center>Sub Test<span class='mandatory'>*</span></center>", width: "200px" },
            {
                field: "SubTestCode", type: "boolean", editable: "false", title: "Checkbox", width: "200px",
                title: "<center><a class='k-grid-display' style='min-width:16px' href='#' onclick='selectAll(this)'><span class='k-icon k-i-tick'></span>Accumulate</a></center>", width: "200px", sortable: false, //<input class='k-grid-display' type='checkbox' href='#' onclick='selectAll(this)'/>
                template: function (dataItem) {
                    var ID
                    ID = dataItem.No;
                    var SubTest = dataItem.SubTestName;
                    var SubTestCode = dataItem.SubTestCode;
                    console.log(dataItem.IsAccumulate);
                    if (dataItem.IsAccumulate == true) {
                        return "<input id='Checkbox' name='" + ID + "' SubTest='" + SubTest + "' SubTestCode='" + SubTestCode + "' class='checkone' type='checkbox' " + (dataItem.IsAccumulate == 'true' ? "checked" : "") + " checked/>";
                    }
                    else {
                        return "<input id='Checkbox' name='" + ID + "' SubTest='" + SubTest + "' SubTestCode='" + SubTestCode + "' class='checkone' type='checkbox' " + (dataItem.IsAccumulate == 'true' ? "checked" : "") + "/>";
                    }

                }
            }
        ],
        //editable: true,
        sortable: true,
        dataBound: function (e) {
            var gridDataView = $(".NormScoreFill").data().kendoGrid.dataSource.view();
            for (var i = 0; i < gridDataView.length; i++) {
                var check = $.grep(viewModel.ArrayChecked, function (e) { return e == gridDataView[i].ActivityID });
                if (check.length > 0) {
                    $("#gridMember tr td input").eq(i).prop("checked", true);
                }
                //var panelApplicationId = gridDataView[i].isChecked;
                //if (ShouldBeChecked(panelApplicationId)) {
                //    $("#gridSearch tr td input").eq(i).prop("checked", true);
                //}
            }
        },
        //pageable: {
        //    refresh: true,
        //    pageSizes: true,
        //    buttonCount: 5
        //}
    });
}

DeleteRow = function (data) {
    var id = $(data).attr('id');
    var DetailVariableStdDevMean = viewModel.DetailVariableStdDevMean;

    if (DetailVariableStdDevMean.length > 1) {
        var row = data.parentNode.parentNode;
        row.parentNode.removeChild(row);
        for (a = 0; a < DetailVariableStdDevMean.length; a++) {
            if (DetailVariableStdDevMean[a].Code == id) {
                var maps = DetailVariableStdDevMean.filter(function (obj) {
                    return obj.Code !== id
                })
            }
        }
        viewModel.set("deletedRow", true);
        viewModel.set("DetailVariableStdDevMean", maps);
        kendoGrid(maps);
    } else {
        viewModel.set("DetailVariableStdDevMean", []);
        renderGrid(viewModel.DetailVariableStdDevMean);
    }
}

Display = function (data) {
    $('#display_status').removeAttr('onchange');
    $('#display_status').attr('onchange', 'DisplayChecked(this)');
    viewModel.set('DisplayStatus', false);
}

DisplayChecked = function (data) {
    var id = $(data).attr('id');
    $('#display_status').removeAttr('onchange');
    $('#display_status').attr('onchange', 'Display(this)');
    viewModel.set('DisplayStatus', true);
}

