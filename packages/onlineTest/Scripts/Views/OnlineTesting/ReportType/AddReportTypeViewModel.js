var viewModel = kendo.observable({
    title:'',
    createBy:'',
    createOn: '',
    lastModifiedBy:'',
    lastModifiedOn: '',
    ReportTypeCode: '',
    ReportTypeName:'',
    ReportTypeDesc: '',
    DisplayStatus: true,
    cancel: function () {
        confirmMessageCancel();
        $('.swal-button--danger').on('click', function () {
            window.location.href = DOMAIN_URL + 'Views/OnlineTesting/ReportType/ReportType.html';
        });
    },
    save: function () {
        save();
    }
});
save = function () {
    debugger
    var ReportTypeName = viewModel.ReportTypeName;
    var ReportTypeDesc = viewModel.ReportTypeDesc;
    var DisplayStatus = viewModel.DisplayStatus;
    var ReportTypeCode = viewModel.ReportTypeCode;
    if (ReportTypeName == '' || ReportTypeDesc == '') {
        swal('Failed', 'Please fill mandatory!!!', 'warning', { closeOnClickOutside: false });
    } else {        
        if (ReportTypeCode == '') {
                confirmMessageAdd();
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: 'POST',
                        data: {
                            ReportTypeName: ReportTypeName,
                            Description: ReportTypeDesc,
                            DisplayStatus: DisplayStatus
                        },
                        url: SERVICE_URL + 'api/ReportType/Add',
                        headers: { "Authorization-Token": Cookie.load() },
                        dataType: 'json',
                        success: function (response) {
                            if (response.Acknowledge < 1) {
                                LoadingMask.hide();
                                swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                            } else {
                                LoadingMask.hide();
                                swal('Good', 'Record has been Saved', 'success', { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/ReportType/ReportType.html';
                                });
                            }
                        },
                        error: function (x, e) {
                            //console.log(e);
                            alert('error ajax');
                        }
                    });
                });
            } else {
                confirmMessageAdd();
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: 'POST',
                        data: {
                            ReportTypeCode: ReportTypeCode,
                            ReportTypeName: ReportTypeName,
                            Description: ReportTypeDesc,
                            DisplayStatus: DisplayStatus
                        },
                        url: SERVICE_URL + 'api/ReportType/Edit',
                        headers: { "Authorization-Token": Cookie.load() },
                        dataType: 'json',
                        success: function (response) {
                            if (response.Acknowledge < 1) {
                                LoadingMask.hide();
                                swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                            } else {
                                LoadingMask.hide();
                                swal('Good', 'Report type has been Edited', 'success', { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/ReportType/ReportType.html';
                                });
                            }
                        },
                        error: function (x, e) {
                            alert('error ajax');
                        }
                    });
                });
            }        
    }
}