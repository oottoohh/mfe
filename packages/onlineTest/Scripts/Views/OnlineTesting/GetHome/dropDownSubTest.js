$(document).ready(function () {
    dropDownTestTool();
    dropDownSubTest();
});

dropDownTestTool = function () {
    $("#TestToolName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModels.CategoryDataTestTool,
        dataTextField: "Value",
        dataValueField: "Value",
        change: onChangeSubTest,
    });
}

onChangeSubTest = function (data) {
    var valName = data.sender.dataSource._pristineData.find(x => x.Value === data.sender._selectedValue).Code;
    viewModel.set("GroupEvent", data.sender._prev);
    viewModel.set("TestToolCode", valName);
    viewModels.set("TestToolCode", valName);
    SubTestByTestTool();
}

dropDownSubTest = function () {
    $("#SubTestName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.SubTestList,
        dataTextField: "Value",
        dataValueField: "Value"
    });
}
