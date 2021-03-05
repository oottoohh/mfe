$(document).ready(function () {
    dropDownTestType();
    kendoTab();
    kendoEditor();
    kendo.bind($("body"), viewModel);
    getURL();
});

dropDownTestType = function () {
    //console.log(viewModel.CategoryDataSource);
    $("#TestTypeName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModels.CategoryDataSource,
        dataTextField: "Value",
        dataValueField: "Code"
    });
}

Display = function (data) {
    $(data).removeAttr('onchange');
    $(data).attr('onchange', 'DisplayChecked(this)');
    viewModel.set('isDisplay', false);
}

DisplayChecked = function (data) {
    $(data).removeAttr('onchange');
    $(data).attr('onchange', 'Display(this)');
    viewModel.set('isDisplay', true);
}

DisplayConfig = function (data) {
    $(data).removeAttr('onchange');
    $(data).attr('onchange', 'DisplayConfigs(this)');
    viewModel.set('configIQ', false);
}

DisplayConfigs = function (data) {
    $(data).removeAttr('onchange');
    $(data).attr('onchange', 'DisplayConfig(this)');
    viewModel.set('configIQ', true);
}

kendoTab = function () {
    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });
}

kendoEditor = function () {
    $(".editor").kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });
}