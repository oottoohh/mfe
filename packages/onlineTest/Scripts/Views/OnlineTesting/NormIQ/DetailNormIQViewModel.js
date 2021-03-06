﻿var viewModel = kendo.observable({
    createBy: "",
    lastModifiedBy: "",
    createOn: new Date(),
    lastModifiedOn: "",
    NormIQCode: "",
    NormIQName: "",
    StDev: "",
    Mean: "",
    Display: false,
    TestType: "",
    TestTool: "",
    hideForm: function (e) {
        hideForm(e);
    },
    showForm: function (e) {
        showForm(e);
    },
    hideTab: function (e) {
        hideTab(e);
    },
    showTab: function (e) {
        showTab(e);
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
            window.location.href = DOMAIN_URL + "Views/CBT/NormIQ/NormIQ.html";
        });

    },
});

hideForm = function (e) {
    $('.box1').attr('hidden', true);
    //document.getElementById('boox').style.transitionDelay = "4s";
    $('.arrow2').removeAttr('hidden', 'hidden');
    $('.arrow1').attr('hidden', true);
}

showForm = function (e) {
    $('.box1').removeAttr('hidden', 'hidden');
    $('.arrow2').attr('hidden', true);
    $('.arrow1').removeAttr('hidden', 'hidden');
}

hideTab = function (e) {
    $('.column-new-tab-question-x').attr('hidden', true);
    $('.arrowTabs').removeAttr('hidden', 'hidden');
    $('.arrowTab').attr('hidden', true);
}

showTab = function (e) {
    $('.column-new-tab-question-x').removeAttr('hidden', 'hidden');
    $('.arrowTabs').attr('hidden', true);
    $('.arrowTab').removeAttr('hidden', 'hidden');
}

save = function () {
    LoadingMask.show();
    var createBy = viewModel.createBy;
    lastModifiedBy = viewModel.lastModifiedBy;
    createOn = viewModel.createOn;
    lastModifiedOn = viewModel.lastModifiedOn;
    NormIQCode = viewModel.NormIQCode;
    NormIQName = viewModel.NormIQName;
    StDev = viewModel.StDev;
    Mean = viewModel.Mean;
    Display = viewModel.Display;
    TestType = viewModel.TestType;
    TestTool = viewModel.TestTool;
    if (document.getElementById('isDisplay').checked) {
        Display = true;
    }
    //console.log('Test Type=' + TestType + '&Test Tool=' + TestTool + '&Display=' + Display);
    if (NormIQCode == '' || NormIQName == '' || TestType == '' || TestTool == '' || StDev == '' || Mean == '') {
        LoadingMask.hide();
        swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
    }
    else {
        //alert("Horrayy!!!!!");
        MessageBox.show("Info", "Horrayy!!!!!");
        LoadingMask.hide();
    }
}