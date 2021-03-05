$(document).ready(function () {
    dropDownCompetency();
    RenderGrid();
    kendo.bind($("body"), viewModel);
});
dropDownCompetency = function () {
    $('#Competency').kendoComboBox({
        //bind: true,
        placeholder: "Select Type...",
        dataSource: viewModels.CategoryCompetencyList,
        dataTextField: 'Value',
        dataValueField:'Value'
    });
}
RenderGrid = function () {
    $("#grid").kendoGrid({
        dataSource: viewModel.ApplicationGrid, 
        resizable: true,
        columns: [
            {
                field: "CompetencyCode", title: "<center>Action</center>", width: "90px", sortable: false,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='AddCompetency.html?act=edit&CompetencyCode=" + dataItem.CompetencyCode + "'><span class='k-icon k-edit'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id='" + dataItem.CompetencyCode + "' onclick='DeleteRow(this)' href='#' ><span class='k-icon k-delete'></span></a>";
                }
            },
        { field: "CompetencyName", title: "<center>Competency</center>" },
        { field: "CompetencyDesc", title: "<center>Definition</center>" },
        {
            field: "DisplayStatus", title: "<center>Status</center>",
            template: function (dataDisplay) {
                var Status = dataDisplay.DisplayStatus;
                if (Status == true) {
                    return "<span>Active</span>";
                } else {
                    return "<span>Inactive</span>";
                }
            }
        },
        ],
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: [25, 50, 100]
        }
    });
}