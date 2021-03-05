var viewModel = kendo.observable({
    title:'',
    createBy:'',
    createOn: '',
    lastModifiedBy:'',
    lastModifiedOn: '',
    CompetencyCode: '',
    CompetencyConfig:'',
    CompetencyName: '',
    CompetencyDesc: '',
    AddCompetencyCompany: '',
    CompetencyRangeScore:'',
    DisplayStatus: true,
    cancel: function () {
        confirmMessageCancel();
        $('.swal-button--danger').on('click', function () {
            window.location.href = DOMAIN_URL + 'Views/OnlineTesting/CompetencyScore/CompetencyScore.html';
        });
    },
    save: function () {
        save();
    }
});
save = function () {
    var CompanyId = viewModel.AddCompetencyCompany;
    var CompetencyCode = viewModel.CompetencyCode;
    var DisplayStatus = viewModel.DisplayStatus;
    var RangeScoreCode = viewModel.AddRangeScore;
    if (CompanyId == '' || RangeScoreCode == '' || CompanyId == undefined || RangeScoreCode == undefined) {
        swal('Failed', 'Please fill mandatory!!!', 'warning', { closeOnClickOutside: false });
    } else {
        if (viewModel.CompetencyCode == '') {
            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: 'POST',
                    data: {
                        CompanyId: CompanyId,
                        RangeScoreCode: RangeScoreCode.Code,
                        DisplayStatus: DisplayStatus
                    },
                    url: SERVICE_URL + 'api/CompetencyScore/Save',
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
                                window.location.href = DOMAIN_URL + 'Views/OnlineTesting/CompetencyScore/CompetencyScore.html';
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
                        CompanyId: CompanyId[0].Code == undefined ? CompanyId : CompanyId[0].Code,
                        CompetencyScoreCode: CompetencyCode,
                        RangeScoreCode: RangeScoreCode[0] == undefined ? RangeScoreCode.Code : RangeScoreCode[0].Code,
                        DisplayStatus: DisplayStatus
                    },
                    url: SERVICE_URL + 'api/CompetencyScore/Edit',
                    headers: { "Authorization-Token": Cookie.load() },
                    dataType: 'json',
                    success: function (response) {
                        if (response.Acknowledge < 1) { kn
                            LoadingMask.hide();
                            swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                        } else {
                            LoadingMask.hide();
                            swal('Good', 'Record has been Edited', 'success', { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + 'Views/OnlineTesting/CompetencyScore/CompetencyScore.html';
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