var viewModel = kendo.observable({
    createBy: "",
    lastModifiedBy: "",
    createOn: "",
    lastModifiedOn: "",
    TestTypeName: "",
    TestTypeCode: "",
    description: "",
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
            //window.location.reload(true);
            window.location.href = DOMAIN_URL + "Views/OnlineTesting/TestType/TestType.html";
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
    var TestTypeName = viewModel.TestTypeName;
    var TestTypeCode = viewModel.TestTypeCode;
    var description = viewModel.description;
    var Checked = false;
    var byTest = false;
    var bySubTest = false;
    var IsByTest = false;
    if (document.getElementById('isByTest').checked) {
        byTest = true;
        IsByTest = true;
    }
    if (document.getElementById('isBySubTest').checked) {
        bySubTest = true;
        IsByTest = false;
    }
    //console.log(viewModel);
    //console.log('Test Type Name=' + TestTypeName + '&Display Status=' + Checked + '&Description=' + description + '&By Sub Test=' + bySubTest + '&By Test=' + byTest);
    if (TestTypeName == '' || (bySubTest == false && byTest == false)) {
        LoadingMask.hide();
        swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
    }
    else {
        //alert(IsByTest);
        //alert("Horray....");

        confirmMessageAdd();
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            $.ajax({
                type: "POST",
                url: SERVICE_URL + "api/TestType/Save",
                headers: { "Authorization-Token": Cookie.load() },
                data: {
                    TestTypeName: TestTypeName,
                    TestTypeDesc: description,
                    IsByTest: IsByTest,
                    DisplayStatus: viewModel.isDisplay,
                },
                success: function (response) {
                    if (response.Acknowledge < 1) {
                        LoadingMask.hide();
                        swal('Failed!!!', response.Message, 'warning', { closeOnClickOutside: false });
                    } else {
                        LoadingMask.hide();
                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                        $('.swal-button--confirm').on('click', function () {
                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/TestType/TestType.html";
                        });
                    }
                },
                error: function (xhr, status, error) {
                    //alert("Error");
                    MessageBox.show("Error", "Error");
                    LoadingMask.hide();
                }
            });
        });

        $('.swal-button--cancel').on('click', function () {

        });

    }
}