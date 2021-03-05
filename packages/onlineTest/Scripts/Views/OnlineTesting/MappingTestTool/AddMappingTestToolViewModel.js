var viewModel = kendo.observable({
    createBy: "",
    lastModifiedBy: "",
    createOn: "",
    lastModifiedOn: "",
    //
    MappingTestToolCode: "",
    CompanyId: "",
    CompanyName: "",
    TestToolCode: "",
    TestToolName: "",
    MappingTestToolDesc: "",
    isDisplay: true,
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
            window.location.href = DOMAIN_URL + "Views/OnlineTesting/MappingTestTool/MappingTestTool.html";
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
    var isValidate = true;
    var createBy = viewModel.createBy;
    var lastModifiedBy = viewModel.lastModifiedBy;
    var createOn = viewModel.createOn;
    var lastModifiedOn = viewModel.lastModifiedOn;
    var MappingTestToolCode = viewModel.MappingTestToolCode;
    var CompanyId = viewModel.CompanyId;
    var CompanyName = viewModel.CompanyName;
    var TestToolCode = viewModel.TestToolCode;
    var TestToolName = viewModel.TestToolName;
    var MappingTestToolDesc = viewModel.MappingTestToolDesc;
   
    if (CompanyName == '' || TestToolName == '' ) {
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
                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                        $('.swal-button--confirm').on('click', function () {
                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/MappingTestTool/MappingTestTool.html";
                        })
                        LoadingMask.hide();
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