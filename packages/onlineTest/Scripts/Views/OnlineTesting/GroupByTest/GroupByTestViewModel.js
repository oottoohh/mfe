var viewModel = kendo.observable({
    TestTypeName: "",
    TestTypeCode: "",
    TestToolName: "",
    TestToolCode: "",
    SubTestName: "",
    SubTestCode: "",
    DisplayStatus: true,
    SubSetName: "",
    SubSetCode: "",
    SubSet: new kendo.data.DataSource({
        batch: true,
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + 'api/SubSet/InquiryByTest',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.TestTypeName = viewModel.TestTypeName;
                request.TestToolName = viewModel.TestToolName;
                //request.SubTestName = viewModel.SubTestCode;
                request.SubSetName = viewModel.SubSetName;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "SubSets",
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 25
    }),
    search: function (e) {
        viewModel.SubSet.page(1);
    },
    AddSubSet: function (e) {
        AddSubSet(e);
    },
    clear: function () {
        clear();
    }
});
clear = function () {
    viewModel.set('TestTypeName', '');
    viewModel.set('TestTypeCode', '');
    viewModel.set('TestToolName', '');
    viewModel.set('TestToolCode', '');
    viewModel.set('SubTestName', '');
    viewModel.set('SubTestCode', '');
    viewModel.set('SubSetName', '');
    viewModel.set('DisplayStatus', true);
}
DeleteRow = function (data) {
    var ids = $(data).attr('id');
    //alert(ids);
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/SubSet/DeleteByTest',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                SubSetCode: ids
            },
            success: function (response) {
                if (response.Acknowledge == 1) {
                    LoadingMask.hide();
                    swal("Good", response.Message, "success", { closeOnClickOutside: false });
                    viewModel.SubSet.page(1);
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
AddSubSet = function (e) {
    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/GroupByTest/AddGroupByTest.html';
}