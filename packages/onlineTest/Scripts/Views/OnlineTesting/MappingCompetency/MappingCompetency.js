$(document).ready(function () {

    dropDownCompetency();
    dropDownSubTest();
    renderGrid();
    kendo.bind($("body"), viewModel);
});
dropDownCompetency = function () {
    $('#Competency').kendoComboBox({
        placeholder: 'Select Type...',
        dataSource: viewModels.CategoryMapCompetency,
        dataTextField: 'Value',
        dataValueField: 'Value',
    });
}
dropDownSubTest = function () {
    $('#MappingSubTest').kendoComboBox({
        placeholder: 'Select Type...',
        dataSource: viewModels.CategoryDataSubTest,
        dataTextField: 'Value',
        dataValueField: 'Value',
    });
}
renderGrid = function () {
    //console.log(viewModel.TestTypeGrid);
    $("#grid").kendoGrid({
        resizable: true,
        columns: [
            {
                field: "MappingCode", title: "Action", width: 85,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='AddMappingCompetency.html?act=edit&MapCode=" + dataItem.MappingCode + "'><span class='k-icon k-edit'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.MappingCode + " href='#' onclick='DeleteRow(this)'><span class='k-icon k-delete'></span></a>";

                }
            },
            //{field:"MappingCode", title:"Code", width:100},
            { field: "CompetencyName", title: "Competency Name", encoded: false, width: 200 },
            { field: "SYM", title: "SYM", encoded: false, width: 45 },
            { field: "SubTest", title: "Sub Test", encoded: false, width: 200 },
            {
                field: "Weight", title: "Weight", encoded: false, width: 100
            },
            {
                field: "Status", title: "Status", encoded: false, width: 100,
                template: function (dataStatus) {
                    var Status = dataStatus.Status;
                    if (Status == true) {
                        return "<span>Active<span>";
                    } else {
                        return "<span>Inactive<span>";
                    }
                }
            }
        ],
        sortable: true,
        columnMenu: true,
        pageable: {
            refresh: true,
            pageSizes: [25, 50, 100],
            buttonCount: 5
        }
    });
}