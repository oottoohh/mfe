$(document).ready(function () {
    dropDownTestTool();
    $("#gridMapping").width(500);
    kendo.bind($("body"), viewModel);
    var MappingSubTestCode = GetParameterByName('MappingSubTestCode');
    LoadData(MappingSubTestCode);
});

LoadData = function (data) {
    if (data !== '') {
        $("#TestToolName").kendoComboBox({ enable: false });
        $.ajax({
            type: "POST",
            url: SERVICE_URL + "api/MappingSubTest/Detail",
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                MappingSubTestCode: data
            },
            success: function (response) {
                if (response.Acknowledge < 1) {
                    LoadingMask.hide();
                    swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                } else {
                    viewModel.set('createBy', response.SubTestList.CreateBy);
                    viewModel.set('lastModifiedBy', response.SubTestList.ModifBy);
                    viewModel.set('createOn', response.SubTestList.CreatedTime);
                    viewModel.set('lastModifiedOn', response.SubTestList.ModifiedTime);
                    viewModel.set('MappingSubTestCode', response.SubTestList.MappingSubTestCode);
                    viewModel.set('MappingSubTestName', response.SubTestList.MappingSubTestName);
                    viewModel.set('TestToolCode', response.SubTestList.TestToolCode);
                    viewModel.set('TestToolName', response.SubTestList.TestToolName);
                    viewModel.set('DisplayStatus', response.SubTestList.DisplayStatus);
                    viewModel.set('SubTestList', response.SubTestList.SubTestList);
                    renderGridMapping();
                }
            },
            error: function (xhr, status, error) {
                MessageBox.show("Error", "Error");
            }
        });
    } else {
        renderGridMapping();
        $("#TestToolName").data("kendoComboBox").enable(true);
    }
}

dropDownTestTool = function () {
    $("#TestToolName").kendoComboBox({
        placeholder: "Select Type..",
        dataSource: viewModels.CategoryDataTestTool,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            viewModel.set('TestToolName', e.item.context.innerHTML);
            onchangeTestTool(e);
        }
    });
}

onchangeTestTool = function (data) {
    var check = data.sender._selectedValue;
    viewModel.set('TestToolCode', check);
    SubTestByTestToolMapSubTestAdd();
}

Display = function (data) {
    var id = $(data).attr('id');
    $('#'+id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayChecked(this)');
    viewModel.set('isDisplay', false);
}

DisplayChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'Display(this)');
    viewModel.set('isDisplay', true);
}

renderGridMapping = function () {
    $("#gridMapping").kendoGrid({
        resizable: true,
        dataSource: viewModel.SubTestList,
        columns: [
            { field: "SubTestName", title: "<center>Sub Test</center>", width: "60px", encoded: false },
            {
                field: "IsCombined", title: "<center>Combined</center>", type: "boolean", editable: "false",
                width: "17px", encoded: false, sortable: false,
                template: function (dataItem) {
                    var SubTestCode = dataItem.SubTestCode;
                    var SubTestName = dataItem.SubTestName;
                    var IsCombined = dataItem.IsCombined;
                    if (IsCombined == true) {
                        return "<center><input id='" + SubTestCode + "' name='" + SubTestCode + "' SubTestCode='" + SubTestCode + "' SubTestName='" + SubTestName +
                            "' class='checkone' type='checkbox' " + (IsCombined == 'true' ? "checked" : "") + " checked='true' onclick='combinedOn(this)'/></center>";
                    } else {
                        return "<center><input id='" + SubTestCode + "' name='" + SubTestCode + "' SubTestCode='" + SubTestCode + "' SubTestName='" + SubTestName +
                            "' class='checkone' type='checkbox' " + (IsCombined == 'true' ? "checked" : "") + " onclick='combinedOff(this)'/></center>";
                    }
                }
            },
        ],
        sortable: true,
    });
}

combinedOff = function (data) {
    //untuk check
    var id = $(data).attr('id');
    var SubTestCode = $(data).attr('SubTestCode');
    var SubTestList = viewModel.SubTestList;

    for (i = 0; i < SubTestList.length; i++) {
        if (SubTestList[i].SubTestCode == SubTestCode) {
            viewModel.set("SubTestList[" + i + "].IsCombined", true);

        }
    }

    $('#C' + id).removeAttr('disabled');
    $('#D' + id).removeAttr('disabled');
    $('#' + id).removeAttr('onclick');
    $('#' + id).attr('onclick', 'combinedOn(this)');
}
combinedOn = function (data) {
    //untuk unchecked
    var id = $(data).attr('id');
    var SubTestCode = $(data).attr('SubTestCode');
    var SubTestList = viewModel.SubTestList;

    for (i = 0; i < SubTestList.length; i++) {
        if (SubTestList[i].SubTestCode == SubTestCode) {
            viewModel.set("SubTestList[" + i + "].IsCombined", false);
        }
    }

    $('#C' + id).attr('disabled', 'disabled');
    $('#D' + id).attr('disabled', 'disabled');
    $('#C' + id).val("");
    $('#D' + id).val("");
    $('#' + id).removeAttr('onclick');
    $('#' + id).attr('onclick', 'combinedOff(this)');
}