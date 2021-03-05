var viewModel = kendo.observable({
    TestTypeName: "",
    TestToolCode: "",
    ValidityScale:"",
    DisplayStatus: true,
    addValidityScale: function (e) {
        addValidityScale(e);
    },
    ValidityScaleGrid: new kendo.data.DataSource({
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
                url: SERVICE_URL + 'api/ValidityScale/Inquiry',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.TestTypeCode = viewModel.TestTypeName;
                request.TestToolCode = viewModel.TestToolCode;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "ValidityScaleDatas",
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 25
    }),
    search: function (e) {
        viewModel.ValidityScaleGrid.page(1);
    },
    clear: function (e) {
        clear(e);
    },
});

addValidityScale = function (e) {
    //alert(e);
    var domain = DOMAIN_URL + 'Views/OnlineTesting/ValidityScale/AddValidityScale.html';
    $('#addValidityScale').attr('href', domain);
}

DeleteRow = function (id) {
    var ids = $(id).attr('id');
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/ValidityScale/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                ValidityScaleCode: ids
            },
            success: function (response) {
                if (response.Acknowledge == 1) {
                    swal("Good", response.Message, "success", { closeOnClickOutside: false });
                    viewModel.ValidityScaleGrid.page(1);
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

clear = function (e) {
    viewModel.set('TestTypeName', "");
    viewModel.set('TestToolName', "");
    viewModel.set('TestToolCode', "");
    viewModel.set('DisplayStatus', true);
}