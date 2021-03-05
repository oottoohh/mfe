$(document).ready(function () {
    //dropDownCompany();
    loadLogin();
    //CompanyChange();
    kendo.bind($("body"), viewModel);

});
loadLogin = function () {
    $.ajax({
        type: "POST",
        url: SERVICE_URL + "api/UserDetail/GetCompany",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            //console.log(response);
            if (response.Acknowledge < 1) {
                swal('Failed', 'Please reload the page', 'warning', { closeOnClickOutside: false });
                Cookie.remove();
                Cookie.load();
            } else {
                localStorage.setItem('CompanyID', response.CompanyId);
                viewModel.set('Company', response.CompanyId);
                var data = response.CompanyId;
                var List = {
                    sender: {
                        _selectedValue: data,
                    }
                };
                dropDownCompany();
                onchangeCompany(List);
                renderGrid();
            }
            //
        }, error: function (x, e) {

        }
    });
}
dropDownCompany = function () {
    //console.log(viewModel.CompanyList);
    $("#CompanyName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModels.CategoryCompanies,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onchangeCompany
    });
}

onchangeCompany = function (data) {
    //console.log(data);
    var check = data.sender._selectedValue;
    viewModel.set("Company", check);
    viewModels.set('CompanyID', check);
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/CutOff",
        headers: { "Authorization-Token": Cookie.load() },
        data: { CompanyId: check },
        success: function (response) {
            if (response.Data.length == 0) {
                viewModel.set('COName', '');
                viewModel.set('CutOffCode', '');
                viewModel.set('CutOffList', '');
                PositionChange();
                dropDownCO();
                swal("Failed", "Cut Off Not Found!!!", "warning", { closeOnClickOutside: false });

            }
            else {
                viewModel.set('CutOffList', response.Data);
                viewModel.set('CoName', response.Data[0].Code);
                PositionChange();
                dropDownCO();

            }

        }
    });

}

dropDownCO = function (e) {
    $("#CoName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.CutOffList,
        dataTextField: "Value",
        dataValueField: "Code"
    });
}
dropDownPosition = function () {
    $("#PositionName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.PositionList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            viewModel.set('PositionCode', e.item.context.innerHTML);
        }
    });
}
renderGrid = function () {
    $("#grid").kendoGrid({
        resizable: true,
        dataSource: viewModel.TestToolGrid,
        columns: [
            {
                field: "MapPositionCode", title: "<center>Action</center>", width: "130px", sortable: false,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='AddMappingPosition.html?act=edit&MapPositionCode=" + dataItem.MapPositionCode + "'><span class='k-icon k-edit'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.MapPositionCode + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                }
            },
            { field: "CompanyName", title: "<center>Company</center>" },
            { field: "Position", title: "<center>Position</center>" },
            { field: "CutOffName", title: "<center>CO Name</center>", encoded: false },
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

DeleteRow = function (data) {
    var ids = $(data).attr('id');
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/MappingPosition/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                MappingCode: ids
            },
            success: function (response) {
                if (response.Acknowledge == 1) {
                    swal("Good", response.Message, "success", { closeOnClickOutside: false });
                    viewModel.TestToolGrid.page(1);
                }
                else {
                    swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                }
                LoadingMask.hide();
            },
            error: function (xhr, status, error) {
                MessageBox.show("Error", error);
                LoadingMask.hide();
            }
        });
    });
}