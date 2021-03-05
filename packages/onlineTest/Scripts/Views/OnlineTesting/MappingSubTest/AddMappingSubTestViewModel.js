var viewModel = kendo.observable({
    createBy: "",
    lastModifiedBy: "",
    createOn: "",
    lastModifiedOn: "",

    MappingSubTestCode: "",
    MappingSubTestName: "",
    TestToolCode: "",
    TestToolName: "",
    DisplayStatus: true,

    SubTestList: [],
    arrSubTestList: [],
    SubTestCode: "",
    SubTestName: "",
    IsCombined: false,

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
    var MappingSubTestCode = viewModel.MappingSubTestCode;
    var MappingSubTestName = viewModel.MappingSubTestName;
    var TestToolCode = viewModel.TestToolCode;
    var TestToolName = viewModel.TestToolName;
    var SubTestList = viewModel.SubTestList;
    var SubTestCode = viewModel.SubTestMappingCode;
    var SubTestName = viewModel.SubTestMappingName;
    var IsCombined = viewModel.IsCombined;
    var DisplayStatus = viewModel.DisplayStatus;
    var arrSubTestList = [];

    for (j = 0; j < SubTestList.length; j++) {
        if (SubTestList[j].IsCombined == true) {
            arrSubTestList.push(
                SubTestList[j].SubTestCode,
            )
        }
    }
    //var arrMapping = $.merge(arrSubTestList, arrSubTestList)

    if (MappingSubTestCode == '') {
        //add mapping sub test
        if (MappingSubTestName == '' || TestToolCode == '' || TestToolName == '' || arrSubTestList.length == 0) {
            LoadingMask.hide();
            swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
        } else {
            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/MappingSubTest/Save",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        MappingSubTestName: MappingSubTestName,
                        TestToolCode: TestToolCode,
                        DisplayStatus: DisplayStatus,
                        SubTestList: arrSubTestList,
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
        }
    } else {
        //edit mapping sub test
        if (MappingSubTestCode == '' || MappingSubTestName == '' || TestToolCode == '' || TestToolName == '' || arrSubTestList.length == 0) {
            LoadingMask.hide();
            swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
        } else {
            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/MappingSubTest/Edit",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        MappingSubTestCode: MappingSubTestCode,
                        MappingSubTestName: MappingSubTestName,
                        TestToolCode: TestToolCode,
                        DisplayStatus: DisplayStatus,
                        SubTestList: arrSubTestList,
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
        }
    }
}