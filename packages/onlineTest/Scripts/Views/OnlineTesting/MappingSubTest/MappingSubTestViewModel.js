var viewModel = kendo.observable({
    TestToolCode:"",
    TestToolName: "",
    SubTestList:[],
    SubTestCode: "",
    SubTestName: "",
    DisplayStatus: true,

    MappingSubTestGrid: new kendo.data.DataSource({
        batch: true,
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + 'api/MappingSubTest/Inquiry',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.TestToolCode = viewModel.TestToolCode;
                request.SubTestCode = viewModel.SubTestCode;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "MappingSubTestData",
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 10
    }),
    addMappingSubTest: function (e) {
        addMappingSubTest(e)
    },
    search: function (e) {
        if (viewModel.TestToolName == "") {
            viewModel.set("TestToolCode", "");
            viewModel.MappingSubTestGrid.page(1);
        } else if (viewModel.SubTestName == "") {
            viewModel.set("SubTestCd", "");
            viewModel.set("SubTestCode", "");
            viewModel.MappingSubTestGrid.page(1);
        } else {
            viewModel.MappingSubTestGrid.page(1);
        }
    },
    clear: function (e) {
        clear();
    }
});

clear = function () {
    viewModel.set('TestToolCode', '');
    viewModel.set('TestToolName', '');
    viewModel.set('SubTestCode', '');
    viewModel.set('SubTestName', '');
    viewModel.set('DisplayStatus', true);
}

addMappingSubTest = function (e) {
    var domain = DOMAIN_URL + 'Views/OnlineTesting/MappingSubTest/AddMappingSubTest.html';
    $('#addMappingSubTest').attr('href', domain);
}

DeleteRow = function (source) {
    var check = $(source).attr('id');
    confirmMessageDeleteMapSubTest();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/MappingSubTest/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                MappingSubTestCode: check
            },
            success: function (response) {
                if (response.Acknowledge == 1) {
                    swal("Good", response.Message, "success", { closeOnClickOutside: false });
                    viewModel.MappingSubTestGrid.page(1);
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

