$(document).ready(function () {
    dropDownTestType();
    dropDownTestTool();
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url:
                    function () {
                        return SERVICE_URL + 'api/SubSet/InquiryByTest'
                    },
                dataType: 'json'
            },
        },
        batch: true,
        //pageSize: 10,
        //TestToolDatas
        schema: {
            model: {
                id: "SubSetCode",
                fields: {
                    SubSetName: { type: "text" },
                    TestType: { type: "text" },
                    TestTypeCode: { type: "text" },
                    TestTool: { type: "text" },
                    TestToolCode: { type: "text" },
                    SubTest: { type: "text" },
                    DisplayQuestion: { type: "number" },
                    DisplayStatus: { type: "boolean" },
                }
            }
        }
    });
    renderGrid();
    kendo.bind($("body"), viewModel);
});

dropDownTestType = function () {
    //console.log(viewModels.CategoryDataSource);
    $("#TestTypeName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModels.CategoryTestTypeByTest,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onChangeTestType,
        //select: function (e) {
        //    console.log(e);
        //    viewModel.set('TestTypeName', e.item.context.innerHTML);
        //}
    });
}
onChangeTestType = function (source) {
    var check_value = source.sender._selectedValue;
    viewModel.set('TestTypeName', source.sender._prev);
    viewModels.set('TestTypeCode', check_value);
    InquiryTestType();

}
dropDownTestTool = function () {
    $("#TestToolName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolList,
        dataTextField: "Value",
        dataValueField: "Value",
        //change: onChangeSubTest,
        select: function (e) {
            //console.log(e.item.context.innerHTML);
            viewModel.set('TestToolName', e.item.context.innerHTML);
        }
    });
}
//onChangeSubTest = function (datas) {
//    //console.log(datas);
//    var check_value = datas.sender._selectedValue;
//    viewModels.set('TestToolCode', check_value);

//    SubTestByTestTool();
//}

//dropDownSubTest = function () {
//    $('#SubTestName').kendoComboBox({
//        autoBind: true,
//        placeholder: "Select Type..",
//        dataSource: viewModel.SubTestList,
//        dataTextField: "Value",
//        dataValueField: "Code",
//        select: function (e) {
//            console.log(e.item.context.innerHTML);
//            viewModel.set('SubTestCode', e.item.context.innerHTML);
//        }
//    });
//}
renderGrid = function () {
    //console.log(viewModel.TestToolGrid);
    $("#grid").kendoGrid({
        resizable: true,
        dataSource: viewModel.SubSet,
        columns: [
            {
                field: "SubSetCode", title: "<center>Action</center>", width: "130px", sortable: false,
                template: function (dataItem) {
                    //console.log(dataItem.TestToolCode);
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='AddGroupByTest.html?act=edit&SubSetCode=" + dataItem.SubSetCode + "'><span class='k-icon k-edit'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.SubSetCode + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                }
            },
            { field: "SubSetName", title: "<center>Sub Set</center>", encoded: false },
            { field: "TestType", title: "<center>Test Type</center>", encoded: false },
            { field: "TestTool", title: "<center>Test Tool</center>", encoded: false },
            { field: "SubTest", title: "<center>Sub Test</center>", encoded: false },
            { field: "DisplayQuestion", title: "<center>Display Question</center>" },
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
        //editable: true,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: [25, 50, 100],
            buttonCount: 5
        }
    });
}