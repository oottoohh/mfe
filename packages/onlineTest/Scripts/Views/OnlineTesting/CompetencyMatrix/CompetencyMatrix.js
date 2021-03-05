$(document).ready(function () {
    CompanyLoad();
    dropDownCompetencyMatrix();
    kendo.bind($("body"), viewModel);
    renderGrid();
});

CompanyLoad = function () {
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Company",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Data.length < 1) {
                LoadingMask.hide();
                swal("Failed!!!", "Company Not Found", "warning", { closeOnClickOutside: false });
                return;
            } else {
                LoadingMask.hide();
                viewModel.set('CompanyList', response.Data);
                viewModel.set('CompanyName', "");
                dropDownCompany();
            }
        }
    });
}

dropDownCompany = function () {
    $("#CompanyId").kendoComboBox({
        autoBind: true,
        placeholder: "Select Company..",
        dataSource: viewModel.CompanyList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.CompanyList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.CompanyList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.CompanyId !== "") {
                viewModel.set('CompanyId', id);
                viewModel.set('CompanyName', name);
                CompetencyMatrixByCompany();
            } else {
                viewModel.set('CompanyId', id);
                viewModel.set('CompanyName', name);
                CompetencyMatrixByCompany();
            }
        }
    });
}

dropDownCompetencyMatrix = function () {
    $('#CompetencyMatrixCode').kendoComboBox({
        placeholder: 'Select Type...',
        dataSource: viewModel.CompetencyMatrixList,
        dataTextField: 'Value',
        dataValueField: 'Code',
        select: function (e) {
            var id = viewModel.CompetencyMatrixList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.CompetencyMatrixList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.CompetencyMatrixCode !== "") {
                viewModel.set('CompetencyMatrixCode', id);
                viewModel.set('CompetencyMatrixName', name);
            } else {
                viewModel.set('CompetencyMatrixCode', id);
                viewModel.set('CompetencyMatrixName', name);
            }
        }
    });
}

renderGrid = function () {
    $("#grid").kendoGrid({
        resizable: true,
        dataSource: viewModel.CompetencyMatrixGrid,
        columns: [
            {
                field: "CompetencyMatrixCode", title: "<center>Action</center>", width: 30,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='AddCompetencyMatrix.html?act=edit&CompMatrix=" + dataItem.CompetencyMatrixCode + "'><span class='fas fa-pencil-alt'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.CompetencyMatrixCode + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                }
            },
            { field: "CompanyName", title: "<center>Company</center>", encoded: false, width: 100 },
            { field: "CompetencyMatrixName", title: "<center>Competency Matrix Name</center>", encoded: false, width: 200 },
            {
                field: "DisplayStatus", title: "<center>Status</center>", encoded: false, width: 40,
                template: function (dataItem) {
                    var DisplayStatus = dataItem.DisplayStatus;
                    if (DisplayStatus == true) {
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
            pageSizes: [10, 50, 100],
            buttonCount: 5
        }
    });
}