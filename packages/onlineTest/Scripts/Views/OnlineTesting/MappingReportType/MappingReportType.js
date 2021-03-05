$(document).ready(function () {
    dropDownMappingReportList();
    dropDownDisplayStats();
    RenderGrid();
    kendo.bind($("body"), viewModel);
    $('#DisplayStatsList').data('kendoComboBox').select(1)
});
dropDownDisplayStats = function () {
    $("#DisplayStatsList").kendoComboBox({
        autoBind: true,
        placeholder: "Select Display Status..",
        dataSource: viewModel.DisplayStatsList,
        dataTextField: "Value",
        dataValueField: "Code",
        change: function (e) {
            debugger
            viewModel.set('DisplayStatus', e.sender._selectedValue);
        },
    });
    
}
dropDownMappingReportList = function () {
    $('#MappingReportList').kendoComboBox({
        //bind: true,
        placeholder: "Select Type...",
        dataSource: viewModels.CategoryMappingReportList,
        dataTextField: 'Value',
        dataValueField: 'Code'
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
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='AddMappingReportType.html?act=edit&MappingReportTypeCode=" + dataItem.MappingReportTypeCode + "'><span class='k-icon k-edit'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id='" + dataItem.MappingReportTypeCode + "' onclick='DeleteRow(this)' href='#' ><span class='k-icon k-delete'></span></a>";
                }
            },
            { field: "MappingReportTypeName", title: "<center>Mapping Report Name</center>" },
            { field: "TestTool", title: "<center>Test Tool</center>" },
            { field: "ReportTypeName", title: "<center>Report Type</center>" },
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
            pageSizes: [10, 15, 25]
        }
    });
}