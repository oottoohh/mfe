var viewModel = kendo.observable({
    title: '',
    createBy: '',
    createOn: '',
    lastModifiedBy: '',
    lastModifiedOn: '',
    CompetencyCode: '',
    CompetencyConfig: '',
    CompetencyName: '',
    CompetencyDesc: '',
    AddCompetencyCompany: '',
    CompetencyRangeScore: '',
    ConfigScoreCode:'',
    TestTypeList: '',
    TestToolConfScore: '',
    TestTypeNameScore: '',
    TestToolNameScore: '',
    ConfigScoreCompanyList:[],
    Company:'',
    DisplayStatus: true,
    cancel: function () {
        confirmMessageCancel();
        $('.swal-button--danger').on('click', function () {
            window.location.href = DOMAIN_URL + 'Views/OnlineTesting/ConfigScore/ConfigScore.html';
        });
    },
    save: function () {
        save();
    }
});
save = function () { 
    var ConfigScoreCode = viewModel.ConfigScoreCode;
    var TestTypeNameScore = viewModel.TestTypeNameScore.length == undefined ? viewModel.TestTypeNameScore : viewModel.TestTypeNameScore == undefined ? viewModel.TestTypeNameScore.Code : viewModel.TestTypeNameScore;
    var TestToolNameScore = viewModel.TestToolNameScore.Code == undefined ? viewModel.TestToolNameScore : viewModel.TestToolNameScore.Code;
    var DisplayStatus = viewModel.DisplayStatus;
    var Company = viewModel.Company;
    var ConfigRangeScoreFrom = viewModel.ConfigRangeScoreFrom;
    var ConfigRangeScoreTo = viewModel.ConfigRangeScoreTo;
    if (TestTypeNameScore == '' || TestToolNameScore == '' || Company == '' || ConfigRangeScoreFrom == '' || ConfigRangeScoreTo == '') {
        if (ConfigRangeScoreFrom == 0) {
            swal('Failed', 'Invalid! Score cannot be less than 1', 'warning', { closeOnClickOutside: false });
        } else {
            swal('Failed', 'Please fill mandatory', 'warning', { closeOnClickOutside: false });
        }
    } else {
        if (ConfigRangeScoreFrom > ConfigRangeScoreTo || ConfigRangeScoreFrom == ConfigRangeScoreTo) {
            swal('Invalid', 'Score must be filled from smallest to largest numbers', 'warning', { closeOnClickOutside: false });
        } else if (!Number.isInteger(ConfigRangeScoreFrom) || !Number.isInteger(ConfigRangeScoreTo) ) {
            swal('Invalid', 'Score value can not be decimal', 'warning', { closeOnClickOutside: false });
        }
        else {
            if (viewModel.ConfigScoreCode == '') {
                confirmMessageAdd(); 
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: 'POST',
                        data: {                                  
                            TestTypeCode: TestTypeNameScore,
                            TestToolCode: TestToolNameScore,
                            DisplayStatus: DisplayStatus,
                            CompanyId: Company,
                            RangeFrom: ConfigRangeScoreFrom,
                            RangeTo: ConfigRangeScoreTo,
                            isConfirm: false
                        },
                        url: SERVICE_URL + 'api/ConfigScore/Add',
                        headers: { "Authorization-Token": Cookie.load() },
                        dataType: 'json',
                        success: function (response) {
                            if (response.Acknowledge < 1) {
                                if (response.isExist) { // ketika data nya duplicate
                                    LoadingMask.hide();                                    
                                    saveDuplicate(response.Message);
                                } else {
                                    LoadingMask.hide();
                                    swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                                }                                
                            } else {
                                LoadingMask.hide();
                                swal('Good', 'Config Score has been Saved', 'success', { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/ConfigScore/ConfigScore.html';
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
                debugger
                confirmMessageAdd();
                var editTestToolCode = viewModel.TestToolConfScore;
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: 'POST',
                        data: {
                            ConfigScoreCode: ConfigScoreCode,
                            TestTypeCode: viewModel.TestTypeCode,
                            TestToolCode: editTestToolCode,
                            DisplayStatus: DisplayStatus,
                            CompanyId: Company,
                            RangeFrom: ConfigRangeScoreFrom,
                            RangeTo: ConfigRangeScoreTo,
                            isConfirm: false
                        },
                        url: SERVICE_URL + 'api/ConfigScore/Edit',
                        headers: { "Authorization-Token": Cookie.load() },
                        dataType: 'json',
                        success: function (response) {
                            if (response.Acknowledge < 1) {
                                if (response.isExist) { // ketika data nya duplicate
                                    LoadingMask.hide();
                                    saveDuplicate(response.Message);
                                } else {
                                    LoadingMask.hide();
                                    swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                                }  
                            } else {
                                LoadingMask.hide();
                                swal('Good', 'Config Score has been Edited', 'success', { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/ConfigScore/ConfigScore.html';
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
}
saveDuplicate = function (msg) {
    debugger
    var ConfigScoreCode = viewModel.ConfigScoreCode;
    var TestTypeNameScore = viewModel.TestTypeNameScore.Code == undefined ? viewModel.TestTypeNameScore : viewModel.TestTypeNameScore.Code;
    var TestToolNameScore = viewModel.TestToolNameScore.Code == undefined ? viewModel.TestToolNameScore : viewModel.TestToolNameScore.Code;
    var DisplayStatus = viewModel.DisplayStatus;
    var Company = viewModel.Company;
    var ConfigRangeScoreFrom = viewModel.ConfigRangeScoreFrom;
    var ConfigRangeScoreTo = viewModel.ConfigRangeScoreTo;
    if (TestTypeNameScore == '' || TestToolNameScore == '' || Company == '' || ConfigRangeScoreFrom == '' || ConfigRangeScoreTo == '') {
        swal('Failed', 'Please fill mandatory!!!', 'warning', { closeOnClickOutside: false });
    } else {
        if (ConfigRangeScoreFrom > ConfigRangeScoreTo) {
            swal('Invalid', 'Score must be filled from smallest to largest numbers', 'warning', { closeOnClickOutside: false });
        } else if (!Number.isInteger(ConfigRangeScoreFrom) && !Number.isInteger(ConfigRangeScoreTo)) {
            swal('Invalid', 'Score value can not be decimal', 'warning', { closeOnClickOutside: false });
        }
        else {
            if (viewModel.ConfigScoreCode == '') {
                confirmDuplicateConfScore(msg);
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: 'POST',
                        data: {
                            TestTypeCode: TestTypeNameScore,
                            TestToolCode: TestToolNameScore,
                            DisplayStatus: DisplayStatus,
                            CompanyId: Company,
                            RangeFrom: ConfigRangeScoreFrom,
                            RangeTo: ConfigRangeScoreTo,
                            isConfirm: true
                        },
                        url: SERVICE_URL + 'api/ConfigScore/Add',
                        headers: { "Authorization-Token": Cookie.load() },
                        dataType: 'json',
                        success: function (response) {
                            if (response.Acknowledge < 1) {
                                LoadingMask.hide();
                                swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                            } else {
                                LoadingMask.hide();
                                swal('Good', 'Config Score has been Saved', 'success', { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/ConfigScore/ConfigScore.html';
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
                debugger
                confirmDuplicateConfScore(msg);
                var editTestToolCode, editTestTypeNameScore;
                if (viewModel.TestToolNameScore.Code == undefined) {
                    tempTestToolCode = $.grep(viewModel.TestToolConfScoreList, function (i, n) {
                        return viewModel.TestToolNameScore == i.Value;
                    });
                    if (tempTestToolCode == 0) {
                        editTestToolCode = $.grep(viewModel.TestToolConfScoreList, function (i, n) {
                            return viewModel.TestToolNameScore == i.Code;
                        })[0].Code;
                    } else {
                        var editTestToolCode = tempTestToolCode[0].Code
                    }
                } else {
                    editTestToolCode = viewModel.TestToolNameScore.Code;
                }
                if (viewModel.TestTypeNameScore.Code == undefined) {
                    editTestTypeNameScore = $.grep(viewModels.TestTypeList._data, function (i, n) {
                        return viewModel.TestTypeNameScore == i.Value;
                    })[0].Code;
                } else {
                    editTestTypeNameScore = viewModel.TestTypeNameScore.Code;
                }
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: 'POST',
                        data: {
                            ConfigScoreCode: ConfigScoreCode,
                            TestTypeCode: editTestTypeNameScore,
                            TestToolCode: editTestToolCode,
                            DisplayStatus: DisplayStatus,
                            CompanyId: Company,
                            RangeFrom: ConfigRangeScoreFrom,
                            RangeTo: ConfigRangeScoreTo,
                            isConfirm: true
                        },
                        url: SERVICE_URL + 'api/ConfigScore/Edit',
                        headers: { "Authorization-Token": Cookie.load() },
                        dataType: 'json',
                        success: function (response) {
                            if (response.Acknowledge < 1) {
                                LoadingMask.hide();
                                swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                            } else {
                                LoadingMask.hide();
                                swal('Good', 'Config Score has been Edited', 'success', { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/ConfigScore/ConfigScore.html';
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
}