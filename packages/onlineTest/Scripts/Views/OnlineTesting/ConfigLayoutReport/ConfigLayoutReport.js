$(document).ready(function () {
    LoadingMask.show();
    CompanyLoad();
    MappingReportTypeLoad();
    StatusLoad();
    kendo.bind($("body"), viewModel);
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
                swal("Failed!", "Company Not Found", "warning", { closeOnClickOutside: false });
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
            } else {
                viewModel.set('CompanyId', id);
                viewModel.set('CompanyName', name);
            }
        }
    });
}

MappingReportTypeLoad = function () {
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/MappingReportType",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Data.length < 1) {
                LoadingMask.hide();
                swal("Failed!", "Mapping Report Type Not Found", "warning", { closeOnClickOutside: false });
                return;
            } else {
                LoadingMask.hide();
                viewModel.set('MappingReportTypeList', response.Data);
                viewModel.set('MappingReportTypeName', "");
                dropDownMappingReportType();
            }
        }
    });
}
dropDownMappingReportType = function () {
    $('#MappingReportTypeCode').kendoComboBox({
        placeholder: 'Select Type...',
        dataSource: viewModel.MappingReportTypeList,
        dataTextField: 'Value',
        dataValueField: 'Code',
        select: function (e) {
            var id = viewModel.MappingReportTypeList.find(x => x.Value === e.item.context.innerHTML) == undefined ?
                viewModel.MappingReportTypeList.find(x => x.Value === e.item.context.innerText).Code : viewModel.MappingReportTypeList.find(x => x.Value === e.item.context.innerHTML).Code
            var name = viewModel.MappingReportTypeList.find(x => x.Value === e.item.context.innerHTML) == undefined ?
                viewModel.MappingReportTypeList.find(x => x.Value === e.item.context.innerText).Value : viewModel.MappingReportTypeList.find(x => x.Value === e.item.context.innerHTML).Value
            if (viewModel.MappingReportTypeCode !== "") {
                viewModel.set('MappingReportTypeCode', id);
                viewModel.set('MappingReportTypeName', name);
            } else {
                viewModel.set('MappingReportTypeCode', id);
                viewModel.set('MappingReportTypeName', name);
            }
        }
    });
}

StatusLoad = function () {
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/DisplayStatus",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Data.length < 1) {
                swal("Failed!", "Status Not Found", "warning", { closeOnClickOutside: false });
                return;
            } else {
                viewModel.set('StatusList', response.Data);
                viewModel.set('StatusId', response.Data[1].Code);
                viewModel.set('StatusName', response.Data[1].Value);
                dropDownStatus();
                renderGrid();
            }
        }
    });
}
dropDownStatus = function () {
    $('#StatusId').kendoComboBox({
        placeholder: 'Select Type...',
        dataSource: viewModel.StatusList,
        dataTextField: 'Value',
        dataValueField: 'Code',
        select: function (e) {
            var id = viewModel.StatusList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.StatusList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.StatusId !== "") {
                viewModel.set('StatusId', id);
                viewModel.set('StatusName', name);
            } else {
                viewModel.set('StatusId', id);
                viewModel.set('StatusName', name);
            }
        }
    });
}

renderGrid = function () {
    $("#gridInquiryConfigLayout").kendoGrid({
        resizable: true,
        dataSource: viewModel.ConfigLayoutReportGrid,
        columns: [
            {
                field: "ConfigLayoutCode", title: "<center>Action</center>", width: 30,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='AddConfigLayoutReport.html?act=edit&ConfigLayoutReport=" + dataItem.ConfigLayoutCode + "'><span class='fas fa-pencil-alt'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.ConfigLayoutCode + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                }
            },
            { field: "CompanyName", title: "<center>Company</center>", encoded: false, width: 100 },
            { field: "MappingReportTypeName", title: "<center>Mapping Report</center>", encoded: false, width: 200 },
            {
                field: "DisplayStatus", title: "<center>Status</center>", encoded: false, width: 40,
                template: function (dataItem) {
                    var DisplayStatus = dataItem.DisplayStatus;
                    if (DisplayStatus == true) {
                        return "<center><span>Active<span></center>";
                    } else {
                        return "<center><span>Inactive<span></center>";
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