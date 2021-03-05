//add change
var modeGrid = new kendo.data.Model.define({
    id: "MappingTestToolCode",
    fields: {
        CompanyName: { type: "text" },
        TestToolName: { type: "text" },
        MappingTestToolDesc: {type: "text"},
        DisplayStatus: { type: "boolean" },
    }
});

var viewModel = kendo.observable({
    CompanyId: "",
    CompanyName: "",
    CompanyList:[],
    TestToolName: "",
    TestToolCode: "",
    TestToolList: [],
    MappingTestToolCode: "",
    MappingTestToolDesc: "",
    DisplayStatus: true,
    MappingTestToolGrid: new kendo.data.DataSource({
        batch: true,
        requestStart: function (e) {
            LoadingMask.show();
        },
        requestEnd: function (e) {
            LoadingMask.hide();
        },
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + 'api/MappingTestTool/Inquiry',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.CompanyId = viewModel.CompanyName;
                request.TestToolCode = viewModel.TestToolCode;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "MappingTestToolDatas",
            model: modeGrid,
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 25
    }),
    search: function (e) {
        viewModel.MappingTestToolGrid.page(1);
    },
    AddMappingTestTool: function (e) {
        AddMappingTestTool(e);
    },
    clear: function () {
        clear();
    }
});

DeleteRow = function (data) {
    var id = $(data).attr('id');
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/MappingTestTool/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                MappingTestToolCode: id
            },
            success: function (response) {
                if (response.Acknowledge == 1) {
                    LoadingMask.hide();
                    swal("Good", response.Message, "success", { closeOnClickOutside: false });
                    viewModel.MappingTestToolGrid.page(1);
                } else {
                    LoadingMask.hide();
                    swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                }
            },
            error: function (xhr, status, error) {
                MessageBox.show("Error", error);
                LoadingMask.hide();
            }
        });
    });
}

clear = function () {
    viewModel.set('CompanyId', '');
    viewModel.set('CompanyName', '');
    viewModel.set('TestToolCode', '');
    viewModel.set('TestToolName', '');
    viewModel.set('DisplayStatus', true);
}

AddMappingTestTool = function (e) {
    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/MappingTestTool/AddMappingTestTool.html';
}