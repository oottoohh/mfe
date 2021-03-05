$(document).ready(function () {
    dropDownTestTool();
    renderGridMapping();
    kendo.bind($("body"), viewModel);
});

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
    renderGridMapping();
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
        dataSource: viewModel.SubTestCombinedGrid,
        columns: [
            { field: "SubTestName", title: "<center>Sub Test</center>", width: "200px", encoded: false },
            {
                field: "Combined", title: "<center>Combined</center>", type: "boolean", editable: "false",
                width: "30px", encoded: false, sortable: false,
                template: function (dataItem) {
                    var ID = dataItem.ApplicantId;
                    if (ReportType == "ALL") {
                        return "<input id='Checkbox' name='" + ID + "' applicant='" + ID + "' class='checkone' type='checkbox'/>";
                    } else if (isInArray(ReportType, dataItem.ReportType)) {
                        return "<input id='Checkbox' name='" + ID + "' applicant='" + ID + "' class='checkone' type='checkbox'/>";
                    } else {
                        return "";
                    }
                }
            },
        ],
        //editable: true,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: [10, 50, 100],
            buttonCount: 5
        }
    });
}