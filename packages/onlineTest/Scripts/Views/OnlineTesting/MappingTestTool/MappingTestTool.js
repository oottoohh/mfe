$(document).ready(function () {
    renderGrid();
    dropDownCompany();
    kendo.bind($("body"), viewModel);
});

dropDownCompany = function () {
    $("#CompanyName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModels.CompanyAIHO,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onchangeCompany
    });
}

onchangeCompany = function (data) {
    var check = data.sender._selectedValue;
    viewModel.set("CompanyName", check);
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByCompany",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CompanyId: check
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolList', response.Data);
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
            } else {
                viewModel.set('TestToolList', response.Data);
                viewModel.set('TestToolName', response.Data[0].Value);
                viewModel.set('TestToolCode', response.Data[0].Code);
                dropDownTestTool();
            }
        }
    });
}

dropDownTestTool = function () {
    $("#TestToolName").kendoComboBox({
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolList,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onchangeTestTool
    });
}

onchangeTestTool = function (data) {
    var check = data.sender._selectedValue;
    viewModel.set("TestToolCode", check);
}

//add change
renderGrid = function () {
    $("#grid").kendoGrid({
        resizable: true,
        columns: [
            {
                field: "MappingTestToolCode", title: "<center>Action</center>", width: "130px", sortable: false,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='DetailMappingTestTool.html?act=edit&MappingTestToolCode=" + dataItem.MappingTestToolCode + "'><span class='k-icon k-edit'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.MappingTestToolCode + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                }
            },
            { field: "CompanyName", title: "<center>Company</center>", encoded: false },
            { field: "TestToolName", title: "<center>Test Tool</center>", encoded: false },
            { field: "MappingTestToolDesc", title: "<center>Description</center>", encoded: false },
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