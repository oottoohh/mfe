$(document).ready(function () {
    LoadingMask.show();
    dropDownGroup();
    dropDownReport();
    dropDownSubTest();
    dropDownCompany();
    RenderGrid();
    kendo.bind($("body"), viewModel);
});
dropDownReport = function () {
    $('#ReportType').kendoComboBox({
        placeholder: 'Select Report',
        dataSource: viewModels.CategoryDataReport,
        dataTextField: 'Value',
        dataValueField: 'Code',
        change: onChange
    });
}
onChange = function (data) {
    //console.log(data);
    viewModel.set('MappingSubTest', '');
    var Value = data.sender._prev;
    var Code = data.sender._selectedValue
    viewModel.set('ReportType', Value);
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + 'api/GroupNarrative/SubTest',
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TypeReport: Code
        },
        success: function (response) {
            //console.log(response);
            if (response.Acknowledge > 0) {
                viewModel.set('ListSubTest', response.Datas);
                viewModel.set('MappingSubTest', response.Datas[0].Value);
                dropDownSubTest();
            }
            else {
                swal('Failed', 'Subtest not found!!!', 'warning', { closeOnClickOutside: false });
                viewModel.set('ReportType', '');
                viewModel.set('MappingSubTest', '');
            }

        }, error: function (x, e) {
            alert('error ajax');
        }
    });
}
dropDownGroup = function () {
    $('#GroupNarrative').kendoComboBox({
        placeholder: 'Select Group Narrative',
        dataSource: viewModels.CategoryDataGrupNarr,
        dataTextField: 'Value',
        dataValueField: 'Value',
    });
}
dropDownSubTest = function () {
    $('#MappingReport').kendoComboBox({
        placeholder: 'Select Mapping Report Type ...',
        dataSource: viewModels.CategoryMappingReportList,
        dataTextField: 'Value',
        dataValueField: 'Code',
    });
}
RenderGrid = function () {
    $("#grid").kendoGrid({
        dataSource: viewModel.ApplicationGrid,
        resizable: true,
        columns: [
            {
                field: "GroupNarrativeCode", title: "<center>Action</center>", width: "90px", sortable: false,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='AddGroupNarrative.html?act=edit&GroupNarrativeCode=" + dataItem.GroupNarrativeCode + "'><span class='k-icon k-edit'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id='" + dataItem.GroupNarrativeCode + "' onclick='DeleteRow(this)' href='#' ><span class='k-icon k-delete'></span></a>";
                }
            },
            { field: "CompanyName", title: "<center>Company</center>" },
            { field: "Report", title: "<center>Mapping Report</center>" },
            { field: "GroupNarrativeName", title: "<center>Title</center>" },            
            {
                field: "Status", title: "<center>Status</center>",
                template: function (dataDisplay) {
                    var Status = dataDisplay.Status;
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
dropDownCompany = function (data) {
    $('#CompanyList').kendoComboBox({
        placeholder: 'Select Company ...',
        dataSource: viewModels.CompetencyCompany,
        dataTextField: 'Value',
        dataValueField: 'Code'
        
    });
}
getCompany = function () {
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Company",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Data.length < 1) {
                swal("Failed", "Company Not Found!!!", "warning");
            }
            else {
                viewModel.set('CompanyList', response.Data);
                dropDownCompany();
            }

        }
    });
}
