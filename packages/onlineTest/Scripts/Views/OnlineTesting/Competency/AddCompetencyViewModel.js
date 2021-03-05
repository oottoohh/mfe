var viewModel = kendo.observable({
    title:'',
    createBy:'',
    createOn: '',
    lastModifiedBy:'',
    lastModifiedOn: '',
    CompetencyCode: '',
    CompetencyConfig:'',
    CompetencyName: '',
    CompetencyDesc:'',
    DisplayStatus: true,
    cancel: function () {
        confirmMessageCancel();
        $('.swal-button--danger').on('click', function () {
            window.location.href = DOMAIN_URL + 'Views/OnlineTesting/Competency/Competency.html'; 
        });
    },
    save: function () {
        save();
    }
});
save = function () {
    debugger
    var CompetencyName = viewModel.CompetencyName;
    var CompetencyDesc = viewModel.CompetencyDesc;
    var CompetencyConfig = $('#CompetencyConfig').val();
    if (CompetencyName == '' || CompetencyDesc == '' || CompetencyConfig == "") {
        swal('Failed', 'Please fill mandatory!!!', 'warning', { closeOnClickOutside: false });
    } else {
        if (Number.isInteger(parseFloat(CompetencyConfig)) && parseFloat(CompetencyConfig) >= 1) {
            if (viewModel.CompetencyCode == '') {
                confirmMessageAdd();
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: 'POST',
                        data: {
                            CompName: CompetencyName,
                            CompDesc: CompetencyDesc,
                            ConfigMaxLength: CompetencyConfig,
                            DisplayStatus: viewModel.DisplayStatus
                        },
                        url: SERVICE_URL + 'api/ReportCompetency/Add',
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
                                    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/Competency/Competency.html';
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
                            CompCode: viewModel.CompetencyCode,
                            CompName: CompetencyName,
                            CompDesc: CompetencyDesc,
                            DisplayStatus: viewModel.DisplayStatus,
                            ConfigMaxLength: CompetencyConfig
                        },
                        url: SERVICE_URL + 'api/ReportCompetency/Edit',
                        headers: { "Authorization-Token": Cookie.load() },
                        dataType: 'json',
                        success: function (response) {
                            if (response.Acknowledge < 1) {
                                LoadingMask.hide();
                                swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                            } else {
                                LoadingMask.hide();
                                swal('Good', 'Record has been Edited', 'success', { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/Competency/Competency.html';
                                });
                            }
                        },
                        error: function (x, e) {
                            alert('error ajax');
                        }
                    });
                });
            }
        } else {
            if (Number.isInteger(parseFloat(CompetencyConfig)) && parseFloat(CompetencyConfig) <= 0) {
                swal('Failed', 'Config max length value cannot be less than 1', 'warning', { closeOnClickOutside: false });
            } else {
                swal('Failed', 'Config max length value cannot be decimal', 'warning', { closeOnClickOutside: false });
            }
            
        }
        
    }
}