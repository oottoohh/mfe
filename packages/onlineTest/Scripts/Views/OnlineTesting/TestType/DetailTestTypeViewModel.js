var viewModel = kendo.observable({
    createBy: "",
    lastModifiedBy: "",
    createOn: "",
    lastModifiedOn: "",
    TestTypeName: "",
    TestTypeCode: "",
    description: "",
    IsByTest: false,
    //byTest: false,
    //bySubTest:false,
    isDisplay: true,
    hideForm: function (e) {
        hideForm(e);
    },
    showForm: function (e) {
        showForm(e);
    },
    edit: function (e) {
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
    //LoadingMask.show();
    var isValidate = true;
    var createBy = viewModel.createBy;
    var lastModifiedBy = viewModel.lastModifiedBy;
    var createOn = viewModel.createOn;
    var lastModifiedOn = viewModel.lastModifiedOn;
    var TestTypeName = viewModel.TestTypeName;
    var TestTypeCode = viewModel.TestTypeCode;
    var description = viewModel.description;
    var IsByTest = viewModel.IsByTest;
    var Checked = viewModel.isDisplay;
    var byTest = viewModel.byTest;
    var bySubTest = viewModel.bySubTest;
    if (document.getElementById('isByTest').checked) {
        byTest = true;
        IsByTest = true;
    }
    else {
        byTest = false;
    }
    if (document.getElementById('isBySubTest').checked) {
        bySubTest = true;
        IsByTest = false;
    }
    else {
        bySubTest = false;
    }
    //console.log('Test Type Name=' + TestTypeName + '&Display Status=' + Checked + '&Description=' + description + '&By Sub Test=' + bySubTest + '&By Test=' + byTest);
    if (TestTypeCode == '' || TestTypeName == '' || (bySubTest == false && byTest == false)) {
        LoadingMask.hide();
        swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
    }
    else {
        confirmMessageEdit();
        //alert(Checked);
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            $.ajax({
                type: "POST",
                url: SERVICE_URL + "api/TestType/Edit",
                headers: { "Authorization-Token": Cookie.load() },
                data: {
                    TestTypeCode: TestTypeCode,
                    TestTypeName: TestTypeName,
                    TestTypeDesc: description,
                    IsByTest: IsByTest,
                    DisplayStatus: Checked,
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
        //LoadingMask.hide();
    }
}
getURL = function (e) {
    var url = $(location).attr('search');
    var isDisplay = viewModel.isDisplay;
    var chek = document.getElementById('displayStatus');
    //console.log(isDisplay);
    //console.log(url);
    //?act=edit&TestTypeCode=TTY19000001
    var check = url.substring(23, 100);
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/TestType/Detail",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestTypeCode: check },
        success: function (response) {
            //console.log(response);
            TestTypeName = response.TestTypeDetail.TestTypeName;
            TestTypeCode = response.TestTypeDetail.TestTypeCode;
            TestTypeDesc = response.TestTypeDetail.TestTypeDesc;
            CreateBy = response.TestTypeDetail.CreateBy;
            CreatedTime = response.TestTypeDetail.CreatedTime;
            DisplayStatus = response.TestTypeDetail.DisplayStatus;
            IsByTest = response.TestTypeDetail.IsByTest;
            ModifBy = response.TestTypeDetail.ModifBy;
            ModifiedTime = response.TestTypeDetail.ModifiedTime;
            viewModel.set("createBy", CreateBy);
            viewModel.set("lastModifiedBy", ModifBy);
            viewModel.set("createOn", CreatedTime);
            viewModel.set("lastModifiedOn", ModifiedTime);
            viewModel.set("isDisplay", DisplayStatus);
            viewModel.set("TestTypeName", TestTypeName);
            viewModel.set("TestTypeCode", TestTypeCode);
            viewModel.set("description", TestTypeDesc);
            viewModel.set("IsByTest", IsByTest);
            //console.log(IsByTest);
            if (IsByTest == true) {
                $('#isByTest').val(IsByTest);
                $('#isByTest').attr('checked', 'checked');
            }
            else {
                $('#isBySubTest').val(IsByTest);
                $('#isBySubTest').attr('checked', 'checked');
            }
            //if (DisplayStatus == true) {

            //    
            //}
        }
    });
    //alert(check);
}