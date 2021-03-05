$(document).ready(function () {
    dropDownTestType();
    dropDownTestTool();
    dropDownSubTest();
    var branchProfileID = GetParameterByName('SubSetCode');
    LoadData(branchProfileID);
    kendo.bind($("body"), viewModel);
});
LoadData = function (branchProfileID) {
    var data = branchProfileID;
    if (data == '') {
        //console.log('Add Data');
    } else {
        $.ajax({
            type: "POST",
            url: SERVICE_URL + "api/SubSet/DetailBySubTest",
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                SubSetCode: data,
            },
            success: function (response) {
                if (response.Acknowledge < 1) {
                    swal('Failed', 'Data is Empty', 'warning', { closeOnClickOutside: false });
                }
                else {
                    viewModel.set("createBy", response.Details.CreateBy);
                    viewModel.set("lastModifiedBy", response.Details.ModifBy);
                    viewModel.set("createOn", response.Details.CreatedTime);
                    viewModel.set("lastModifiedOn", response.Details.ModifiedTime);
                    viewModel.set("SubSetCode", response.Details.SubSetCode);
                    viewModel.set("SubSetName", response.Details.SubSetName);
                    viewModel.set("DisplayStatus", response.Details.DisplayStatus);
                    viewModel.set("TestTypeName", response.Details.TestTypeCode);
                    viewModel.set("TestTypeCode", response.Details.TestTypeCode);
                    viewModel.set("TestToolCode", response.Details.TestToolCode);
                    viewModel.set("TestToolName", response.Details.TestToolCode);
                    viewModel.set("SubTestCode", response.Details.SubTestCode);
                    viewModel.set("SubTestName", response.Details.SubTestCode);
                    viewModels.set('TestTypeCode', response.Details.TestTypeCode);
                    viewModels.set('TestToolCode', response.Details.TestToolCode);
                    viewModels.set('SubTestCode', response.Details.SubTestCode);
                    TestToolInBySub2();
                    viewModel.ApplicantList.data(response.Details.Questions);
                    viewModel.set('listBySub', response.Details.Questions);
                    renderGrids();
                }
            },
            error: function (xhr, status, error) {
                //alert("Error");
                MessageBox.show("Error", "Error");
                LoadingMask.hide();
            }
        });
    }
}
dropDownTestType = function () {
    //console.log(viewModels.CategoryDataSource);
    $("#TestTypeName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModels.CategoryTestTypeBySubTest,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onChangeTestType,
        select: function (e) {
            viewModel.set('TestType', e.item.context.innerHTML);
            viewModel.set('TestToolCode', '');
            viewModel.set('SubTestCode', '');
        }
    });
}
onChangeTestType = function (source) {
    var check_value = source.sender._selectedValue;
    viewModels.set('TestTypeCode', check_value);
    TestToolInBySub();
}
dropDownTestTool = function () {
    //console.log(viewModel.TestToolList);
    $("#TestToolName").kendoComboBox({
        //autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolList,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onChangeSubTest,
        select: function (e) {
            viewModel.set('TestTool', e.item.context.innerHTML);
            viewModel.set('TestToolCode', e.sender._selectedValue);
            //viewModel.set('SubTestCode', '');
        }
    });
}
onChangeSubTest = function (datas) {
    //console.log(datas);
    viewModel.set('TestToolCode', datas.sender._selectedValue);
    var check_value = datas.sender._selectedValue;
    viewModels.set('TestToolCode', check_value);
    SubTestInBySub();
}

dropDownSubTest = function () {
    //console.log(viewModel.SubTestList);
    $('#SubTestName').kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.SubTestList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            viewModel.set('SubTest', e.item.context.innerHTML);
        },
        change: onchangeSub
    });
}
onchangeSub = function (data) {
    viewModel.set('SubTestCode', data.sender._selectedValue);
}
renderGrid = function () {
    // console.log("renderGrid -> viewModel.ApplicantList", viewModel.ApplicantList)
    $("#SubTestGridList").kendoGrid({
        width: 350,
        dataSource: viewModel.ApplicantList,
        resizable: true,
        columns: [
            {
                field: "No", title: "<center>View</center>", width: "5%", sortable: false, editable: false,
                template: function (dataItem) {
                    //console.log(dataItem);
                    return "<a class='k-button k-grid-edit' style='min-width:16px' id='" + dataItem.QuestionCode + "' onclick='Preview(this)' href='#'><span class='k-icon k-i-search'></span></a>";
                }
            },
            {
                field: "NumberToDisplay", title: "<center>Number To Display</center>", width: "10%",
                template: function (dataItem) {
                    //console.log(dataItem);
                    return "<input type='number' class='k-textbox' QuestionCode=" + dataItem.QuestionCode + " id='check" + dataItem.No + "' name='check" + dataItem.No + "' value='" + dataItem.NumberToDisplay + "' style='width:100%;' onchange='onchangeBySubTest(this)'/>"
                }
            },
            { field: "QuestionCode", title: "Question Code", encoded: false },
            { field: "QuestionName", title: "<center>Question</center>", encoded: false },
        ],
        editable: true,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: [25, 50, 100],
            buttonCount: 5
        }
    });
}

renderGrids = function () {
    $("#SubTestGridList").kendoGrid({
        width: 350,
        resizable: true,
        dataSource: viewModel.listBySub,
        columns: [
            {
                field: "No", title: "<center>View</center>", width: "5%", sortable: false, editable: false,
                template: function (dataItem) {
                    //console.log(dataItem);
                    return "<a class='k-button k-grid-edit' style='min-width:16px' id='" + dataItem.QuestionCode + "' onclick='Preview(this)' href='#'><span class='k-icon k-i-search'></span></a>";
                }
            },
            {
                field: "NumberToDisplay", title: "<center>Number To Display</center>", width: "10%",
                template: function (dataItem) {
                    //console.log(dataItem);
                    return "<input type='number' class='k-textbox' QuestionCode=" + dataItem.QuestionCode + " id='check" + dataItem.No + "' name='check" + dataItem.No + "' value='" + dataItem.NumberToDisplay + "' style='width:100%;' onchange='onchangeBySubTest(this)'/>";
                }
            },
            { field: "QuestionCode", title: "Question Code", encoded: false },
            { field: "QuestionName", title: "<center>Question</center>", encoded: false },
        ],
        editable: false,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: [25, 50, 100],
            buttonCount: 5
        }
    });
}
Preview = function (data) {
    var id = $(data).attr('id');
    window.open(DOMAIN_URL + 'Views/OnlineTesting/GroupBySubTest/PreviewGroupBySubTest.html?act=preview&QuestionCode=' + id, '_blank');
}
onchangeBySubTest = function (data) {

    var QuestionCode = $(data).attr('QuestionCode');
    var grid = $('#SubTestGridList').data("kendoGrid");
    var value = $(data).val();
    //alert(value);
    //console.log(QuestionCode);
    var val = 0;
    for (i = 0; i < grid._data.length; i++) {
        var NumberToDisplay = grid._data[i].NumberToDisplay;
        if (value == 0) {
            viewModel.set('isStatus', true);
        }
        else if (value < 0) {
            viewModel.set('isStatus', false);
            //alert("Exist");
            swal('Failed!!!', 'Your Number is Duplicate / Your number less than 0', 'warning', { closeOnClickOutside: false });
            break;
        }
        else if (value == NumberToDisplay) {
            viewModel.set('isStatus', false);
            //alert("Exist");
            swal('Failed!!!', 'Your Number is Duplicate / Your number less than 0', 'warning', { closeOnClickOutside: false });
            break;
        }
        else {
            //alert("Good");
            viewModel.set('isStatus', true);
        }
        if (grid._data[i].QuestionCode == QuestionCode) {
            val = parseInt(value);
            grid._data[i].set("NumberToDisplay", val);
            //debugger;
        }
    }
    //console.log(viewModel.isStatus);
}
Display = function (data) {
    $('#displayStatus').removeAttr('onchange');
    $('#displayStatus').attr('onchange', 'DisplayChecked(this)');
    viewModel.set('DisplayStatus', false);
}

DisplayChecked = function (data) {
    $('#displayStatus').removeAttr('onchange');
    $('#displayStatus').attr('onchange', 'Display(this)');
    viewModel.set('DisplayStatus', true);
}