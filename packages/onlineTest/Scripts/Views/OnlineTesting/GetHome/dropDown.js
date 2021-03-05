$(document).ready(function () {
    dropDownTestType();
    dropDownTestTypeGroupBySubTest();
    //dropDownTestTool();
    //dropDownSubTest();
});
dropDownTestType = function () {
    $("#TestTypeName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModels.CategoryTestTypeByNormIQ,
        //dataSource: viewModels.CategoryTestTypeBySubTest,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            viewModel.set('TestTypeName', e.item.context.innerHTML);
            viewModel.set('TestToolName', '');
            onChangeTestType(e);
        },
        //change: onChangeTestType,
    });
}
onChangeTestType = function (source) {
    var check_value = source.sender._selectedValue;
    viewModel.set('TestTypeCode', check_value);
    viewModels.set('TestTypeCode', check_value);
    TestToolListGroupBySubTest();
    //dropDownTestTool();
    //viewModel.set('TestTypeName', source.sender._prev);
    //viewModels.set('TestTypeCode', check_value);
    //InquirySubTestByTestType();
}
dropDownTestTool = function () {
    //viewModels.CategoryTestToolByTestTypeNormIQ, _data = [];
    $("#TestToolName").kendoComboBox({
        //autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolList,
        //dataSource: viewModels.CategoryTestToolByTestTypeNormIQ,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            viewModel.set('TestToolName', e.item.context.innerHTML);
            viewModel.set('SubTestName', '');
            onChangeTestTool(e);
        },
        //change: onChangeSubTest
    });
}

onChangeTestTool = function (source) {
    var check_value = source.sender._selectedValue;
    viewModel.set('TestToolCode', check_value);
    SubTestByTestToolGroupBySubTest();
    //dropDownSubTest();
    //viewModel.set('TestTypeName', source.sender._prev);
    //InquirySubTestByTestType();
}

dropDownSubTest = function () {
    //viewModels.CategorySubTestByTestToolNormIQ._data = [];
    $('#SubTestName').kendoComboBox({
        placeholder: "Select Type..",
        dataSource: viewModel.SubTestList,
        //dataSource: viewModels.CategorySubTestByTestToolNormIQ,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onChangeSubTest,
        select: function (e) {
            viewModel.set('SubTestName', e.sender._selectedValue);
        }
    });
}

onChangeSubTest = function (datas) {
    var check_value = datas.sender._selectedValue;
    viewModel.set('SubTestCode', check_value);
    //viewModel.set('TestToolName', datas.sender._prev);
    //viewModels.set('TestToolCode', check_value);
    //InquirySubTestByTestTool();
}
dropDownTestTypeGroupBySubTest = function () {
    $("#TestTypeNameGroupBySubTest").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModels.CategoryTestTypeBySubTest,
        //dataSource: viewModels.CategoryTestTypeBySubTest,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            viewModel.set('TestTypeName', e.item.context.innerHTML);
            viewModel.set('TestToolName', '');
            onChangeTestType(e);
        },
        //change: onChangeTestType,
    });
}
onChangeTestTypeGroupBySubTest = function (source) {
    var check_value = source.sender._selectedValue;
    viewModel.set('TestTypeCode', check_value);
    viewModels.set('TestTypeCode', check_value);
    TestToolListGroupBySubTest();
    //dropDownTestTool();
    //viewModel.set('TestTypeName', source.sender._prev);
    //viewModels.set('TestTypeCode', check_value);
    //InquirySubTestByTestType();
}
//dropDownSubTest = function () {
//    $('#SubTestName').kendoComboBox({
//        autoBind: true,
//        placeholder: "Select Type..",
//        dataSource: viewModel.SubTestList,
//        dataTextField: "Value",
//        dataValueField: "Value",
//        select: function (e) {
//            //console.log(e.item.context.innerHTML);
//            viewModel.set('SubTestName', e.item.context.innerHTML);
//        }
//    });
//}