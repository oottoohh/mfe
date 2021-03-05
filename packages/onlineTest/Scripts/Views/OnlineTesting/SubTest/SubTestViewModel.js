var viewModel = kendo.observable({
    TestToolName: "",
    TestToolCode:"",
    SubTestName: "",
    DisplayStatus: true,
    SubTestList:[],
    eventGrid: new kendo.data.DataSource({
        batch: true,
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + 'api/subtest/inquiry',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.TestToolName = viewModel.TestToolName;
                request.SubTestName = viewModel.SubTestName;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.sortInfo = data.sort;
                return request;
            }
        }, 
        schema: {
            data: "SubTestDatas",
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 25
    }),
    search: function (e) {
        search(e);
    },
    clear: function (e) {
        clear();
    },
    cancel: function (e) {

        confirmMessageCancel();
        $('.swal-button--cancel').on('click', function () {

        });

        $('.swal-button--danger').on('click', function () {
            //window.location.reload(true);
            window.location.href = DOMAIN_URL + "Views/OnlineTesting/NormIQ/NormIQ.html";
        });

    },
});
clear = function () {
    viewModel.set('TestToolName', '');
    viewModel.set('TestToolCode', '');
    viewModel.set('SubTestName', '');
    viewModel.set('DisplayStatus', true);
}
search = function (e) {
    viewModel.eventGrid.page(1);
}

DeleteRow = function (source) {
    //alert(id);
    confirmMessageDelete();
    var check = $(source).attr('id');
    //alert(check);
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/subtest/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                SubTestCode: check
            },
            success: function (response) {
                if (response.Acknowledge == 1) {
                    swal("Good", response.Message, "success", { closeOnClickOutside: false });
                    viewModel.eventGrid.page(1);
                } else {
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

