var modelTestToolGrid = new kendo.data.Model.define({
    id: "TestToolCode",
    fields: {
        TestToolName: { type: "string", editable: false },
        TestToolDesc: { type: "string", editable: false },
        field: { type: "boolean", editable: false }
    },
});

var viewModel = kendo.observable({
    title: "Input",
    TestToolName: "",
    TestTypeName: "",
    TestType: '',
    TestTool:'',
    DisplayStatus: true,
    //IsDisplay:true,
    TestToolList:[],
    TestToolGrid: new kendo.data.DataSource({
        batch: true,
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + 'api/TestTool/Inquiry',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                //console.log(data);
                if (document.getElementById('display_status').cheked) {
                    viewModel.set("DisplayStatus", false);
                }
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.TestTypeName = viewModel.TestType;
                request.TestToolName = viewModel.TestTool;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "TestToolDatas",
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 25
    }),
    addToolType: function (e) {
        addToolType(e);
    },
    search: function (e) {
        viewModel.TestToolGrid.page(1);
    },
    clear: function () {
        clear();
    }
});
clear = function () {
    viewModel.set('TestToolName', '');
    viewModel.set('TestTypeName', '');
    viewModel.set('TestTool', '');
    viewModel.set('TestType', '');
    viewModel.set('DisplayStatus', true);
}
addToolType = function (e) {
    var domain = DOMAIN_URL + 'Views/OnlineTesting/TestTool/AddTestTool.html';
    $('#addTestTool').attr('href', domain);
}

DeleteRow = function (data) {
    var ids = $(data).attr('id');
    //alert(ids);
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/TestTool/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                TestToolCode: ids
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