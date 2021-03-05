var ModelApplicant = kendo.data.Model.define({
    id: "No",
    fields: {
        No: { type: "number", editable: false },
        SubTestName: { type: "string", editable: false },
        SubTestCode: { type: "string", editable: false },
    }
});

var viewModel = kendo.observable({
    createBy: "",
    lastModifiedBy: "",
    createOn: "",
    lastModifiedOn: "",

    NormScoreIQCode: "",
    NormScoreIQName: "",
    CompanyList: [],
    CompanyId: "",
    CompanyName: "",
    GradeList: [],
    GradeId: "",
    GradeName: "",
    TestToolCode: "",
    TestToolName: "",
    DisplayStatus: true,
    IsConfirm: false,
    
    DetailVariableStdDevMean: [],
    SubTestList: [],
    SubTestCode: "",
    SubTestName: "",

    StandardDeviasi: "",
    Mean: "",
    deletedRow: false,

    ApplicantList: new kendo.data.DataSource ({
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + "api/NormScoreIQ/GetNormScore",
                headers: { "Authorization-Token": Cookie.load() },
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.TestTypeCode = viewModel.TestTypeName;
                request.TestToolCode = viewModel.TestToolName;
                return request;
            }
        },
        schema: {
            data: "NormScores",
            model: ModelApplicant,
            total: "Total"
        },
        serverPaging: true,
        serverFiltering: true,
    }),

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
            window.location.href = DOMAIN_URL + "Views/OnlineTesting/NormIQ/NormIQ.html";
        });
    },
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

hideTab = function (e) {
    $('#column-new-tab-question-x').attr('hidden', true);
    $('.arrowTabs').removeAttr('hidden', 'hidden');
    $('.arrowTab').attr('hidden', true);
}

showTab = function (e) {
    $('#column-new-tab-question-x').removeAttr('hidden', 'hidden');
    $('.arrowTabs').attr('hidden', true);
    $('.arrowTab').removeAttr('hidden', 'hidden');
}

addSubTest = function () {
    var arrDetailVariableStdDevMean = viewModel.DetailVariableStdDevMean;
    var multiSelectedValues = $("#SubTestCode").data("kendoMultiSelect").value();

    if (viewModel.TestToolName == "") {
        swal('Incompleted Data', 'Please choose Test Tool and Sub Test', 'warning', { closeOnClickOutside: false });
        return
    } else {
        for (c = 0; c < arrDetailVariableStdDevMean.length; c++) {
            for (d = 0; d < multiSelectedValues.length; d++) {
                if (multiSelectedValues[d] == arrDetailVariableStdDevMean[c].Name) {
                    swal('Invalid', 'Sub Test has been selected', 'warning', { closeOnClickOutside: false });
                    return
                }
            }
        }
        for (a = 0; a < viewModel.SubTestList.length; a++) {
            for (b = 0; b < multiSelectedValues.length; b++) {
                if (viewModel.SubTestList[a].Value == multiSelectedValues[b]) {
                    arrDetailVariableStdDevMean.push({
                        Code: viewModel.SubTestList[a].Code,
                        DisplayStatus: true,
                        IsIQ: false,
                        IsParent: viewModel.SubTestList[a].IsParent,
                        Mean: "",
                        Name: viewModel.SubTestList[a].Value,
                        StandardDeviasi: ""
                    })
                }
            }
        }
    }

    viewModel.set("DetailVariableStdDevMean", arrDetailVariableStdDevMean)
    kendoGrid(arrDetailVariableStdDevMean);
    $("#SubTestCode").data("kendoMultiSelect").value([]);
}

save = function () {
    var NormScoreIQCode = viewModel.NormScoreIQCode;
    var NormScoreIQName = viewModel.NormScoreIQName;
    var CompanyId = viewModel.CompanyId;
    var CompanyName = viewModel.CompanyName;
    var GradeId = viewModel.GradeId;
    var GradeName = viewModel.GradeName;
    var TestToolCode = viewModel.TestToolCode;
    var TestToolName = viewModel.TestToolName;
    var DisplayStatus = viewModel.DisplayStatus;
    var IsConfirm = viewModel.IsConfirm;

    var arrDetail = [];

    if (viewModel.DetailVariableStdDevMean.length > 0) {
        for (a = 0; a < viewModel.DetailVariableStdDevMean.length; a++) {
            arrDetail.push({
                Code: viewModel.DetailVariableStdDevMean[a].Code,
                StandardDeviasi: viewModel.DetailVariableStdDevMean[a].StandardDeviasi,
                Mean: viewModel.DetailVariableStdDevMean[a].Mean,
                IsIQ: viewModel.DetailVariableStdDevMean[a].IsIQ,
                IsParent: viewModel.DetailVariableStdDevMean[a].IsParent
            })
        }
    }

    if (NormScoreIQCode == '') {
        //add
        if (NormScoreIQName == '' || CompanyName == '' || GradeName == '' || TestToolName == '' || arrDetail.length == 0) {
            swal('Incompleted Data', 'Please Fill Mandatory Field !', 'warning', { closeOnClickOutside: false });
            return;
        } else {
            //validasi std dev & mean tidak boleh kosong
            if (arrDetail.length > 0) {
                for (b = 0; b < arrDetail.length; b++) {
                    if (arrDetail[b].StandardDeviasi == "" || arrDetail[b].StandardDeviasi == undefined || 
                        arrDetail[b].Mean == "" || arrDetail[b].Mean == undefined ) {
                        swal('Incompleted Data', 'Std Dev & Mean cannot be empty !', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
            //validasi std dev & mean harus lebih dari 0
            if (arrDetail.length > 0) {
                for (b = 0; b < arrDetail.length; b++) {
                    if (Number(arrDetail[b].StandardDeviasi) <= 0 || Number(arrDetail[b].Mean) <= 0) {
                        swal('Incompleted Data', 'Std Dev & Mean cannot be less than 1 !', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/NormScoreIQ/Save",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        NormScoreName: NormScoreIQName,
                        CompanyId: CompanyId,
                        GradeId: GradeId,
                        TestToolCode: TestToolCode,
                        IsConfirm: IsConfirm,
                        DisplayStatus: DisplayStatus,
                        Detail: arrDetail
                    },
                    success: function (response) {
                        if (response.Acknowledge == 1) {
                            LoadingMask.hide();
                            swal("Good", response.Message, "success", { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + "Views/OnlineTesting/NormIQ/NormIQ.html";
                            });
                        } else {
                            LoadingMask.hide();
                            if (response.IsExist == true) {
                                if (viewModel.IsConfirm == false) {
                                    confirmMessageNormScore()
                                    $('.swal-button--defeat').on('click', function () {
                                        viewModel.set("IsConfirm", true);
                                        saveReplace();
                                    })
                                }
                            } else {
                                LoadingMask.hide();
                                swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                            }
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
    else {
        //edit
        if (NormScoreIQCode == '' || NormScoreIQCode == undefined || NormScoreIQName == '' ||
            CompanyName == '' || GradeName == '' || TestToolName == '' || arrDetail.length == 0) {
            swal('Incompleted Data', 'Please Fill Mandatory Field !', 'warning', { closeOnClickOutside: false });
            return;
        } else {
            //validasi std dev & mean tidak boleh kosong
            if (arrDetail.length > 0) {
                for (b = 0; b < arrDetail.length; b++) {
                    if (arrDetail[b].StandardDeviasi == "" || arrDetail[b].StandardDeviasi == undefined ||
                        arrDetail[b].Mean == "" || arrDetail[b].Mean == undefined) {
                        swal('Incompleted Data', 'Std Dev & Mean cannot be empty !', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
            //validasi std dev & mean harus lebih dari 0
            if (arrDetail.length > 0) {
                for (b = 0; b < arrDetail.length; b++) {
                    if (Number(arrDetail[b].StandardDeviasi) <= 0 || Number(arrDetail[b].Mean) <= 0) {
                        swal('Incompleted Data', 'Std Dev & Mean cannot be less than 1 !', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/NormScoreIQ/Edit",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        NormScoreCode: NormScoreIQCode,
                        NormScoreName: NormScoreIQName,
                        CompanyId: CompanyId,
                        GradeId: GradeId,
                        TestToolCode: TestToolCode,
                        IsConfirm: IsConfirm,
                        DisplayStatus: DisplayStatus,
                        Detail: arrDetail
                    },
                    success: function (response) {
                        if (response.Acknowledge == 1) {
                            LoadingMask.hide();
                            swal("Good", response.Message, "success", { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + "Views/OnlineTesting/NormIQ/NormIQ.html";
                            });
                        } else {
                            LoadingMask.hide();
                            if (response.IsExist == true) {
                                if (viewModel.IsConfirm == false) {
                                    confirmMessageNormScore()
                                    $('.swal-button--defeat').on('click', function () {
                                        viewModel.set("IsConfirm", true);
                                        saveEditReplace();
                                    })
                                }
                            } else {
                                LoadingMask.hide();
                                swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                            }
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

saveReplace = function () {
    var NormScoreIQCode = viewModel.NormScoreIQCode;
    var NormScoreIQName = viewModel.NormScoreIQName;
    var CompanyId = viewModel.CompanyId;
    var CompanyName = viewModel.CompanyName;
    var GradeId = viewModel.GradeId;
    var GradeName = viewModel.GradeName;
    var TestToolCode = viewModel.TestToolCode;
    var TestToolName = viewModel.TestToolName;
    var DisplayStatus = viewModel.DisplayStatus;
    var IsConfirm = viewModel.IsConfirm;

    var arrDetail = [];

    if (viewModel.DetailVariableStdDevMean.length > 0) {
        for (a = 0; a < viewModel.DetailVariableStdDevMean.length; a++) {
            arrDetail.push({
                Code: viewModel.DetailVariableStdDevMean[a].Code,
                StandardDeviasi: viewModel.DetailVariableStdDevMean[a].StandardDeviasi,
                Mean: viewModel.DetailVariableStdDevMean[a].Mean,
                IsIQ: viewModel.DetailVariableStdDevMean[a].IsIQ,
                IsParent: viewModel.DetailVariableStdDevMean[a].IsParent
            })
        }
    }

    LoadingMask.show();
    $.ajax({
        type: "POST",
        url: SERVICE_URL + "api/NormScoreIQ/Save",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            NormScoreName: NormScoreIQName,
            CompanyId: CompanyId,
            GradeId: GradeId,
            TestToolCode: TestToolCode,
            IsConfirm: IsConfirm,
            DisplayStatus: DisplayStatus,
            Detail: arrDetail
        },
        success: function (response) {
            if (response.Acknowledge == 1) {
                LoadingMask.hide();
                swal("Good", response.Message, "success", { closeOnClickOutside: false });
                $('.swal-button--confirm').on('click', function () {
                    window.location.href = DOMAIN_URL + "Views/OnlineTesting/NormIQ/NormIQ.html";
                });
            } else {
                LoadingMask.hide();
                if (response.IsExist == true) {
                    if (viewModel.IsConfirm == false) {
                        confirmMessageNormScore()
                        $('.swal-button--defeat').on('click', function () {
                            viewModel.set("IsConfirm", true);
                            saveReplace();
                        })
                    }
                } else {
                    LoadingMask.hide();
                    swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                }
            }
        },
        error: function (xhr, status, error) {
            MessageBox.show("Error", "Error");
            LoadingMask.hide();
        }
    });
}

saveEditReplace = function () {
    var NormScoreIQCode = viewModel.NormScoreIQCode;
    var NormScoreIQName = viewModel.NormScoreIQName;
    var CompanyId = viewModel.CompanyId;
    var CompanyName = viewModel.CompanyName;
    var GradeId = viewModel.GradeId;
    var GradeName = viewModel.GradeName;
    var TestToolCode = viewModel.TestToolCode;
    var TestToolName = viewModel.TestToolName;
    var DisplayStatus = viewModel.DisplayStatus;
    var IsConfirm = viewModel.IsConfirm;

    var arrDetail = [];

    if (viewModel.DetailVariableStdDevMean.length > 0) {
        for (a = 0; a < viewModel.DetailVariableStdDevMean.length; a++) {
            arrDetail.push({
                Code: viewModel.DetailVariableStdDevMean[a].Code,
                StandardDeviasi: viewModel.DetailVariableStdDevMean[a].StandardDeviasi,
                Mean: viewModel.DetailVariableStdDevMean[a].Mean,
                IsIQ: viewModel.DetailVariableStdDevMean[a].IsIQ,
                IsParent: viewModel.DetailVariableStdDevMean[a].IsParent
            })
        }
    }

    LoadingMask.show();
    $.ajax({
        type: "POST",
        url: SERVICE_URL + "api/NormScoreIQ/Edit",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            NormScoreName: NormScoreIQName,
            CompanyId: CompanyId,
            GradeId: GradeId,
            TestToolCode: TestToolCode,
            IsConfirm: IsConfirm,
            DisplayStatus: DisplayStatus,
            Detail: arrDetail
        },
        success: function (response) {
            if (response.Acknowledge == 1) {
                LoadingMask.hide();
                swal("Good", response.Message, "success", { closeOnClickOutside: false });
                $('.swal-button--confirm').on('click', function () {
                    window.location.href = DOMAIN_URL + "Views/OnlineTesting/NormIQ/NormIQ.html";
                });
            } else {
                LoadingMask.hide();
                if (response.IsExist == true) {
                    if (viewModel.IsConfirm == false) {
                        confirmMessageNormScore()
                        $('.swal-button--defeat').on('click', function () {
                            viewModel.set("IsConfirm", true);
                            saveEditReplace();
                        })
                    }
                } else {
                    LoadingMask.hide();
                    swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                }
            }
        },
        error: function (xhr, status, error) {
            MessageBox.show("Error", "Error");
            LoadingMask.hide();
        }
    });
}