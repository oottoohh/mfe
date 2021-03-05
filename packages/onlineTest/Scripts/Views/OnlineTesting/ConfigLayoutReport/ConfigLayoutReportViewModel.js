var modeGrid = new kendo.data.Model.define({
    id: "MappingCode",
    fields: {
        MappingCode: { type: "string", editable: false },
        CompetencyName: { type: "string", editable: false },
        SYM: { type: "string", editable: false },
        SubTest: { type: "string", editable: false },
        Weight: { type: "string", editable: false },
        Status: { type: "boolean", editable: false },
    }
});

var viewModel = kendo.observable({
    CompanyList: [],
    CompanyId: "",
    CompanyName: "",
    MappingReportTypeList: [],
    MappingReportTypeCode: '',
    MappingReportTypeName: '',
    StatusList: [],
    StatusId: '',
    StatusName: '',

    ConfigLayoutReportGrid: new kendo.data.DataSource({
        batch: true,
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + 'api/ConfigLayoutReport/Inquiry',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.CompanyId = viewModel.CompanyId;
                request.MappingReportTypeCode = viewModel.MappingReportTypeCode;
                request.DisplayStatus = viewModel.StatusId;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "ConfigLayoutReportData",
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 10
    }),
    search: function () {
        if (viewModel.CompanyName == "") {
            viewModel.set("CompanyId", "")
        }
        if (viewModel.MappingReportTypeName == "") {
            viewModel.set("MappingReportTypeCode", "")
        }
        viewModel.ConfigLayoutReportGrid.page(1);
    },
    clear: function () {
        clear();
    },
    addConfigLayoutReport: function () {
        window.location.href = DOMAIN_URL + 'Views/OnlineTesting/ConfigLayoutReport/AddConfigLayoutReport.html';
    }
});

clear = function () {
    viewModel.set('CompanyId', '');
    viewModel.set('CompanyName', '');
    viewModel.set('MappingReportTypeCode', '');
    viewModel.set('MappingReportTypeName', '');
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
            }
        }
    });
    //viewModel.set('StatusId', '');
    //viewModel.set('StatusName', '');
}

DeleteRow = function (data) {
    var id = $(data).attr('id');
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/ConfigLayoutReport/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                ConfigLayoutCode: id
            },
            success: function (response) {
                if (response.Acknowledge >= 1) {
                    LoadingMask.hide();
                    swal("Good", response.Message, "success", { closeOnClickOutside: false });
                    viewModel.ConfigLayoutReportGrid.page(1);
                }
                else {
                    LoadingMask.hide();
                    swal("Failed!", response.Message, "warning", { closeOnClickOutside: false });
                }
            },
            error: function (xhr, status, error) {
                MessageBox.show("Error", error);
                LoadingMask.hide();
            }
        });
    });
}