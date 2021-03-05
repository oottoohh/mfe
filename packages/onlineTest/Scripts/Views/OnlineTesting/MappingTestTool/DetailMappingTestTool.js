$(document).ready(function () {
    dropDownCompany();
    dropDownTestTool();
    getURL();
    kendo.bind($("body"), viewModel);
});

dropDownCompany = function () {
    $("#CompanyName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModels.CompanyAIHO,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            viewModel.set('CompanyName', e.item.context.innerHTML);
            onchangeCompany(e)
        }
    });
}

onchangeCompany = function (data) {
    var check = data.sender._selectedValue;
    viewModel.set('CompanyId', check);
}

dropDownTestTool = function (e) {
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
}

Display = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayChecked(this)');
    viewModel.set('isDisplay', false);
}

DisplayChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'Display(this)');
    viewModel.set('isDisplay', true);
}

