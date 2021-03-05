$(document).ready(function () {
    dropDownCompetency();
    RenderGrid();
    kendo.bind($("body"), viewModel);
});
dropDownCompetency = function () {
    $('#CompetencyCompany').kendoComboBox({
        //bind: true,
        placeholder: "Select Type...",
        dataSource: viewModels.CompetencyCompany,
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
                field: "CompetencyScoreCode", title: "<center>Action</center>", width: "90px", sortable: false,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='AddCompetencyScore.html?act=edit&CompetencyCode=" + dataItem.CompetencyScoreCode + "'><span class='k-icon k-edit'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id='" + dataItem.CompetencyScoreCode + "' onclick='DeleteRow(this)' href='#' ><span class='k-icon k-delete'></span></a>";
                }
            },
            { field: "CompanyName", title: "<center>Company</center>" },
            { field: "RangeScoreName", title: "<center>Range Score</center>" },
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