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
                        return SERVICE_URL + 'api/ValidityScale/Inquiry'
                    },
                dataType: 'json',
                pageSize: 25
            },
        },
        batch: true,
        //pageSize: 10,
        schema: {
            model: {
                id: "ValidityScaleCode",
                fields: {
                    TestTypeCode: { type: "text" },
                    TestTypeName: { type: "text" },
                    TestToolCode: { type: "text" },
                    TestToolName: { type: "text" },
                    ValidityScale: { type: "text" },
                    DisplayStatus: { type: "boolean" }
                }
            }
        }
    });
    renderGrid();
    kendo.bind($("body"), viewModel);
});

dropDownTestType = function () {
    $("#TestTypeName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModels.CategoryTestTypeByTest,
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
        change: onChangeTestTool,
        select: function (e) {
            viewModel.set('TestTool', e.item.context.innerHTML);
        }
    });
}

onChangeTestTool = function (source) {
    var check_value = source.sender._selectedValue;
    viewModel.set("TestToolCode", check_value)
}

renderGrid = function () {
    $("#grid").kendoGrid({
        resizable: true,
        columns: [
            {
                field: "ValidityScaleCode", title: "<center>Action</center>", width: "130px", sortable: false,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='DetailValidityScale.html?act=edit&ValidityScaleCode=" + dataItem.ValidityScaleCode + "'><span class='k-icon k-edit'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.ValidityScaleCode + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                }
            },
            { field: "TestTypeName", title: "<center>Test Type Name</center>" },
            { field: "TestToolName", title: "<center>Test Tool Name</center>" },
            { field: "ValidityScaleName", title: "<center>Validity Scale</center>", encoded: false },
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

