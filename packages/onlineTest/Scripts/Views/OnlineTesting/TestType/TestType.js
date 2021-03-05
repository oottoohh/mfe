$(document).ready(function () {
   
    //onLoadTestTypeName();
    dropDownTestType();
        dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    type: "POST",
                    headers: { "Authorization-Token": Cookie.load() },
                    url:
                    function () {
                        return SERVICE_URL + 'api/TestType/Inquiry'
                    },
                    dataType: 'json',
                    pageSize: 25
                },
            },
            batch: true,
            //pageSize: 10,
            schema: {
                model: {
                    id: "TestTypeCode",
                    fields: {
                        TestTypeName: { type: "text" },
                        TestTypeDesc: { type: "text"},
                        DisplayStatus:{type: "boolean"},
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
        dataValueField: "Value"
    });
}

renderGrid = function () {
    //console.log(viewModel.TestTypeGrid);
    $("#grid").kendoGrid({
        resizable: false,
        dataSource: viewModel.TestTypeGrid,
        columns: [
            {
                field: "TestTypeCode", title: "Action", width: "130px",sortable:false,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='DetailTypeTest.html?act=edit&TestTypeCode=" + dataItem.TestTypeCode + "'><span class='k-icon k-edit'></span></a>" +
                            "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.TestTypeCode + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                    
                }
            },
            { field: "TestTypeName", title: "Test Type Name"},
            { field: "TestTypeDesc", title: "Description", encoded: false },
            {
                field: "DisplayStatus", title: "Status",
                template: function (dataRole) {
                    //console.log(dataRole);
                    if (dataRole.DisplayStatus == true) {
                        return "<span>Active</span>";
                    } else {
                        return "<span>Inactive</span>";
                    }
                }
            }
        ],
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: [25, 50, 100],
            buttonCount: 5
        }
    });
}
