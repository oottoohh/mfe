$(document).ready(function () {
    renderGrid();
    kendo.bind($("body"), viewModel);
});
renderGrid = function () {
    //console.log(viewModel.TestToolGrid);
    $("#grid").kendoGrid({
        resizable: true,
        dataSource: viewModel.TestToolGrid,
        columns: [
            {
                field: "SubSetCode", title: "<center>Action</center>", width: "130px", sortable: false,
                template: function (dataItem) {
                    //console.log(dataItem.TestToolCode);
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='AddGroupBySubTest.html?act=edit&SubSetCode=" + dataItem.SubSetCode + "'><span class='k-icon k-edit'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.SubSetCode + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                }
            },
            { field: "SubSetName", title: "<center>Sub Set</center>", encoded: false },
            { field: "TestType", title: "<center>Test Type</center>", encoded: false },
            { field: "TestTool", title: "<center>Test Tool</center>", encoded: false },
            { field: "SubTes", title: "<center>Sub Test</center>", encoded: false },
            { field: "QuestionDisplay", title: "<center>Display Question</center>",
                sortable: {
                    compare: function(a,b){
                        return parseInt(a.QuestionDisplay)-parseInt(b.QuestionDisplay)
                    }
                }
            },
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