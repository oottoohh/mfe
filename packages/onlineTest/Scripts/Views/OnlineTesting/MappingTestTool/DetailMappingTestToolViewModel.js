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
    
    if (MappingTestToolCode == '' || CompanyName == '' || TestToolName == '') {
        LoadingMask.hide();
        swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
    } else {
        confirmMessageEdit();
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            $.ajax({
                type: "POST",
                url: SERVICE_URL + "api/MappingTestTool/Edit",
                headers: { "Authorization-Token": Cookie.load() },
                data: {
                    MappingTestToolCode: MappingTestToolCode,
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
                        });
                        LoadingMask.hide();
                    }
                },
                error: function (xhr, status, error) {
                    MessageBox.show("Error", "Error");
                    LoadingMask.hide();
                }
            });
        });
    }
}

getURL = function (e) {
    var url = $(location).attr('search');
    var isDisplay = viewModel.isDisplay;
    var chek = document.getElementById('displayStatus');
    var check = url.substring(30, 100);
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/MappingTestTool/Detail",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            MappingTestToolCode: check
        },
        success: function (response) {
            //
            MappingTestToolCode = response.MappingTestTool.MappingTestToolCode;
            CompanyId = response.MappingTestTool.CompanyId;
            CompanyName = response.MappingTestTool.CompanyName;
            TestToolCode = response.MappingTestTool.TestToolCode;
            TestToolName = response.MappingTestTool.TestToolName;
            MappingTestToolDesc = response.MappingTestTool.MappingTestToolDesc;
            DisplayStatus = response.MappingTestTool.DisplayStatus;
            //
            CreateBy = response.MappingTestTool.CreateBy;
            CreatedTime = response.MappingTestTool.CreatedTime;
            ModifBy = response.MappingTestTool.ModifBy;
            ModifiedTime = response.MappingTestTool.ModifiedTime;
            //
            viewModel.set("createBy", CreateBy);
            viewModel.set("lastModifiedBy", ModifBy);
            viewModel.set("createOn", CreatedTime);
            viewModel.set("lastModifiedOn", ModifiedTime);
            //
            viewModel.set("MappingTestToolCode", MappingTestToolCode);
            viewModel.set("CompanyId", CompanyId);
            viewModel.set("CompanyName", CompanyName);
            viewModel.set("TestToolCode", TestToolCode);
            viewModel.set("TestToolName", TestToolName);
            viewModel.set("MappingTestToolDesc", MappingTestToolDesc);
            viewModel.set("isDisplay", DisplayStatus);
        }
    });
}