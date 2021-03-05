var viewModel = kendo.observable({
    CompanyId: "",
    createBy: "",
    lastModifiedBy: "",
    createOn: "",
    lastModifiedOn: "",
    MPCode: "",
    COName: "",
    CONama: "",
    Company: "",
    Position: "",
    PositionCode: "",
    PositionList: [],
    CutOffList: [],
    CompanyList: [],
    DisplayStatus: true,
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
            window.location.href = DOMAIN_URL + "Views/OnlineTesting/MappingPosition/MappingPosition.html";
        });

    }
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

save = function (e) {
    var MPCode = viewModel.MPCode;
    var Company = viewModel.Company;
    var COName = viewModel.COName;
    var Position = viewModel.Position;
    var isDisplay = viewModel.DisplayStatus;
    if (MPCode == '') {
        if (COName == '' || COName == undefined || Position == '' || Position == undefined) {
            swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
        }
        else {
            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/MappingPosition/Add",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        CompanyId: viewModel.Company,
                        CutOffCode: COName,
                        PositionCode: Position,
                        DisplayStatus: isDisplay
                    },
                    success: function (response) {
                        if (response.Acknowledge < 1) {
                            LoadingMask.hide();
                            swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                        } else {
                            LoadingMask.hide();
                            swal("Good", response.Message, "success", { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + "Views/OnlineTesting/MappingPosition/MappingPosition.html";
                            });
                            //

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
    else {
        if (COName == '' || COName == undefined || Position == '' || Position == undefined) {
            swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
        }
        else {
            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/MappingPosition/Edit",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        MapPositionCode: MPCode,
                        //CompanyId: viewModel.Company,
                        PositionCode: Position,
                        CutOffCode: COName,
                        DisplayStatus: isDisplay
                    },
                    success: function (response) {
                        if (response.Acknowledge < 1) {
                            LoadingMask.hide();
                            swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                        } else {
                            LoadingMask.hide();
                            swal("Good", response.Message, "success", { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + "Views/OnlineTesting/MappingPosition/MappingPosition.html";
                            });
                            //

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

}