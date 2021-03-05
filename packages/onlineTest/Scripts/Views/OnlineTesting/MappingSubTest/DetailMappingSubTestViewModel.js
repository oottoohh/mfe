var viewModel = kendo.observable({
    createBy: "",
    lastModifiedBy: "",
    createOn: "",
    lastModifiedOn: "",

    SubTestMappingCode: "",
    SubTestMappingName: "",
    TestToolCode: "",
    TestToolName: "",
    DisplayStatus: true,

    SubTestCombinedGrid: new kendo.data.DataSource({
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
        pageSize: 10
    }),

    hideForm: function (e) {
        hideForm(e);
    },
    showForm: function (e) {
        showForm(e);
    },
    save: function (e) {
        save(e);
    },
    cancel: function (e) {
        confirmMessageCancel();
        $('.swal-button--cancel').on('click', function () {
        });
        $('.swal-button--danger').on('click', function () {
            window.location.href = DOMAIN_URL + "Views/OnlineTesting/MappingSubTest/MappingSubTest.html";
        });
    }
});

hideForm = function (e) {
    $('.box1').attr('hidden', true);
    $('.arrow2').removeAttr('hidden', 'hidden');
    $('.arrow1').attr('hidden', true);
}

showForm = function (e) {
    $('.box1').removeAttr('hidden', 'hidden');
    $('.arrow2').attr('hidden', true);
    $('.arrow1').removeAttr('hidden', 'hidden');
}

save = function (e) {
    var createBy = viewModel.createBy;
    var lastModifiedBy = viewModel.lastModifiedBy;
    var createOn = viewModel.createOn;
    var lastModifiedOn = viewModel.lastModifiedOn;
    var SubTestMappingCode = viewModel.SubTestMappingCode;
    var SubTestMappingName = viewModel.SubTestMappingName;
    var TestToolCode = viewModel.TestToolCode;
    var TestToolName = viewModel.TestToolName;
    var DisplayStatus = viewModel.DisplayStatus;
   
    if (SubTestMappingCode == '' || SubTestMappingName == '' || TestToolCode == '' || TestToolName == '' || DisplayStatus == '') {
        LoadingMask.hide();
        swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
    } else {
        confirmMessageAdd();
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            $.ajax({
                type: "POST",
                url: SERVICE_URL + "api/MappingTestTool/Save",
                headers: { "Authorization-Token": Cookie.load() },
                data: {
                    TestToolCode: TestToolCode,
                    CompanyId: CompanyId,
                    MappingTestToolDesc: MappingTestToolDesc,
                    DisplayStatus: viewModel.isDisplay,
                },
                success: function (response) {
                    if (response.Acknowledge < 1) {
                        LoadingMask.hide();
                        swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                    } else {
                        LoadingMask.hide();
                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                        $('.swal-button--confirm').on('click', function () {
                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/MappingSubTest/MappingSubTest.html";
                        })
                    }
                },
                error: function (xhr, status, error) {
                    MessageBox.show("Error", "Error");
                    LoadingMask.hide();
                }
            });
        });
        $('.swal-button--cancel').on('click', function () {
        });
    }
}