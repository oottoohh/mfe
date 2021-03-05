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
                    return SERVICE_URL + 'api/TestTool/Inquiry'
                },
                dataType: 'json',
                pageSize: 25
            },
        },
        batch: true,
        //pageSize: 10,
        //TestToolDatas
        schema: {
            model: {
                id: "TestToolCode",
                fields: {
                    //TestTypeCode: { editable: false, nullable: true },
                    TestToolCode: { type: "text" },
                    TestToolName: { type: "text" },
                    TestTypeCode: { type: "text" },
                    TestTypeName: { type: "text" },
                    TestToolDesc: { type: "text" },
                    NormScoreLength: { type: "number" },
                    IsConfigIQ:{type:"boolean"},
                    DisplayStatus: { type: "boolean" }
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
        dataSource: viewModels.CategoryDataSource,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onChangeTestType,
        select: function (e) {
            viewModel.set('TestType', e.item.context.innerHTML);
            viewModels.set('TestToolCode', '');
        }
    });
}
onChangeTestType = function (source) {
    var check_value = source.sender._selectedValue;
    viewModels.set('TestTypeCode', check_value);
    TestToolInByTest();
}
dropDownTestTool = function () {
    $("#TestToolName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            viewModel.set('TestTool', e.item.context.innerHTML);
        }
    });
}

renderGrid = function () {
    //console.log(viewModel.TestToolGrid);
    $("#grid").kendoGrid({
        resizable: true,
        dataSource: viewModel.TestToolGrid,
        columns: [
            {
                field: "TestToolCode", title: "<center>Action</center>", width: "130px", sortable: false,
                template: function (dataItem) {
                    //console.log(dataItem.TestToolCode);
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='DetailTestTool.html?act=edit&TestToolCode=" + dataItem.TestToolCode + "'><span class='k-icon k-edit'></span></a>" +
                            "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.TestToolCode + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
               }
            },
            { field: "TestTypeName", title: "<center>Test Type Name</center>" },
            { field: "TestToolName", title: "<center>Test Tool Name</center>" },
            { field: "TestToolDesc", title: "<center>Description</center>", encoded:false },
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

