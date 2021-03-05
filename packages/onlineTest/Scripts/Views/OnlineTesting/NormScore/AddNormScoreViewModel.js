var ModelApplicant = kendo.data.Model.define({
    id: "No",
    fields: {
        No: { type: "number", editable: false },
        SubTestCode: { type: "string", editable: false },
        SubTest: { type: "string", editable: false },
        isValidityScale: { type: "boolean", editable: false },
        TestTypeCode: { type: "string", editable: false },
        TestType: { type: "string", editable: false },
        TestToolCode: { type: "string", editable: false },
        TestTool: { type: "string", editable: false },
        NormScoreLength: { type: "number", editable: false },
        Scores: [
            {
                No: {type:"number", editable: true },
                Value: { type: "number", editable: true }
            }
        ]
    }
});

var viewModel = kendo.observable({
    createBy: "",
    lastModifiedBy: "",
    createOn:"",
    lastModifiedOn: "",

    NormScoreCode: "",
    NormScoreName: "",
    CompanyList: [],
    CompanyId: "",
    CompanyName: "",
    GradeList: [],
    GradeId: "",
    GradeName: "",
    TestTypeList: [],
    TestTypeCode: "",
    TestTypeName: "",
    TestToolList: [],
    TestToolCode: "",
    TestToolName: "",
    TestTool: "",
    DisplayStatus: true,
    isConfirm: false,
    isParent: false,

    GridLength: 0,
    lenghtHeader: 0,
    lenghtHeaders: 0,
    NormScores: {
        No: "",
        SubTestCode: "",
        SubTest: "",
        Scores: [],
        isValidityScale: false
    },
    Score: 0,
    Scores:{No:0},
    listNormScore: new kendo.data.DataSource({
        schema: { model: ModelApplicant }
    }),

    ApplicantList: new kendo.data.DataSource ({
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + "api/NormScore/GetNormScore",
                headers: { "Authorization-Token": Cookie.load() },
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.TestTypeCode = viewModel.TestTypeCode;
                request.TestToolCode = viewModel.TestToolCode;
                return request;
            }
        },
        schema: {
            data: "NormScores",
            model: ModelApplicant,
            total: "Total",
        },
        serverPaging: true,
        serverFiltering: true,
        pageSize: 10
    }),
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
            window.location.href = DOMAIN_URL + "Views/OnlineTesting/NormScore/NormScore.html";
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

save = function () {
    var TestTypeCode = viewModel.TestTypeCode;
    var TestToolCode = viewModel.TestToolCode;
    var DisplayStatus = viewModel.DisplayStatus;
    var NormScoreName = viewModel.NormScoreName;
    var CompanyId = viewModel.CompanyId;
    var GradeId = viewModel.GradeId;
    var isConfirm = viewModel.isConfirm;
    var checkScoreValue = [];

    if (viewModel.NormScoreCode == '') {
        var applicant = [];
        var Scores = [];
        var Scoress = [];
        var Score = [];
        var Scor = [];
        var normScores = [];
        
        // for norms score
        for (i = 0; i < viewModel.ApplicantList._data.length; i++) {
            var scoreData = [];
            for (k = 0; k < viewModel.ApplicantList._data[i].Scores.length; k++) {
                scoreData[k] = {
                    No: viewModel.ApplicantList._data[i].Scores[k].No,
                    Value: viewModel.ApplicantList._data[i].Scores[k].Value
                };
                if (viewModel.ApplicantList._data[i].Scores[k].Value !== 0) {
                    checkScoreValue.push(viewModel.ApplicantList._data[i].Scores[k].Value);
                }
                if (viewModel.ApplicantList._data[i].Scores[k].Value == 0) {
                    swal('Invalid!', 'Norm score value cannot be less than 1', 'warning', { closeOnClickOutside: false });
                    return;
                }
            }
            normScores[i] = scoreData;
            applicant.push({
                No: viewModel.ApplicantList._data[i].No,
                SubTestCode: viewModel.ApplicantList._data[i].SubTestCode,
                SubTest: viewModel.ApplicantList._data[i].SubTest,
                Scores: normScores[i],
                isValidityScale: viewModel.ApplicantList._data[i].isValidityScale,
                IsParent: viewModel.ApplicantList._data[i].IsParent
            });
        }
        var valid = true;
        var lengthDatas = applicant.length;
        //for (data = 0; data < lengthDatas; data++) {
        //    for (list = 0; list < applicant[data].Scores.length-1; list++) {
        //        if (applicant[data].Scores[list + 1].Value != 0 && applicant[data].Scores[list + 1].Value < applicant[data].Scores[list].Value) {
        //            valid = false;
        //            break;
        //        }
        //        else if (applicant[data].Scores[list].Value < 0) {
        //            valid = false;
        //            break;
        //        }
        //        else if (list > 0 && applicant[data].Scores[list].Value != 0) {
        //            if (applicant[data].Scores[list - 1].Value == 0) {
        //                valid = false;
        //                break;
        //            }
        //        }
        //    }
        //}
        var lengthDatas = applicant.length;
        for (data = 0; data < lengthDatas; data++) {
            for (list = 0; list < applicant[data].Scores.length - 1; list++) {
                if (applicant[data].Scores[list + 1].Value != 0 && applicant[data].Scores[list + 1].Value < applicant[data].Scores[list].Value) {
                    valid = false;
                    break;
                }
                else if (applicant[data].Scores[list].Value < 0) {
                    valid = false;
                    break;
                }
            }
        }
        var numberss = 1;
        for (sp = 0; sp < lengthDatas; sp++) {
            for (psp = 1 ; psp < applicant[sp].Scores.length; psp++) {
                if (applicant[sp].Scores[psp].Value != 0) {
                    numberss = psp;
                    for (df = psp; df < applicant[sp].Scores.length; df++) {
                        if (df == numberss) {
                            if (applicant[sp].Scores[df].Value != 0) {
                                if (applicant[sp].Scores[df - 1].Value < 1) {
                                    valid = false;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (NormScoreName == '' || CompanyId == '' || GradeId == '') {
            swal('Invalid!', 'Please fill mandatory field!!!', 'warning', { closeOnClickOutside: false });
            return;
        }
        if (TestTypeCode == '' || TestToolCode == '') {
            swal('Failed!', 'Please select test type & test tool to proceed', 'warning', { closeOnClickOutside: false });
            return;
        }
        if (checkScoreValue.length == 0) {
            swal('Failed!', 'Please input subtest score to proceed', 'warning', { closeOnClickOutside: false });
        } else {
            if (checkScoreValue.length > 0) {
                for (a = 0; a < checkScoreValue.length; a++) {
                    if (checkScoreValue[a] < 1) {
                        swal('Invalid!', 'Norm score value cannot be less than 1', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
            if (valid == false) {
                swal('Invalid!', 'Your norm score value cannot be less than 1 and must be ordered from the smallest to largest value', 'warning', { closeOnClickOutside: false });
            } else {
                confirmMessageAdd();
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: "POST",
                        url: SERVICE_URL + "api/NormScore/Add",
                        headers: { "Authorization-Token": Cookie.load() },
                        data: {
                            TestTypeCode: TestTypeCode,
                            TestToolCode: TestToolCode,
                            DisplayStatus: DisplayStatus,
                            NormScoreName: NormScoreName,
                            CompanyId: CompanyId,
                            GradeId: GradeId,
                            NormScores: applicant,
                            isConfirm: isConfirm
                        },
                        success: function (response) {
                            if (response.Acknowledge == 1) {
                                LoadingMask.hide();
                                swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                viewModel.NormScores = [];
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + "Views/OnlineTesting/NormScore/NormScore.html";
                                });
                            } else if (response.isExist == true) {
                                LoadingMask.hide();
                                if (viewModel.isConfirm == false) {
                                    confirmMessageNormScore();
                                    $('.swal-button--defeat').on('click', function () {
                                        viewModel.set("isConfirm", true);
                                        saveReplace();
                                    })
                                }
                            } else {
                                LoadingMask.hide();
                                swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                            }
                        },
                        error: function (xhr, status, error) {
                            MessageBox.show("Error", "Error"+xhr);
                        },
                    });
                    return false;
                });
            }
        }
    }
    else {
        var applicant = [];
        var Scores = [];
        var Scoress = [];
        var Score = [];
        var Scor = [];
        var normScores = [];

        // for norms score
        for (i = 0; i < viewModel.listNormScore._data.length; i++) {
            var scoreData = [];
            for (k = 0; k < viewModel.listNormScore._data[i].Scores.length; k++) {
                scoreData[k] = {
                    No: viewModel.listNormScore._data[i].Scores[k].No,
                    Value: viewModel.listNormScore._data[i].Scores[k].Value
                };
                if (viewModel.listNormScore._data[i].Scores[k].Value !== 0) {
                    checkScoreValue.push(viewModel.listNormScore._data[i].Scores[k].Value);
                }
                if (viewModel.ApplicantList._data[i].Scores[k].Value == 0) {
                    swal('Invalid!', 'Norm score value cannot be less than 1', 'warning', { closeOnClickOutside: false });
                    return;
                }
            }
            normScores[i] = scoreData;
            applicant.push({
                No: viewModel.ApplicantList._data[i].No,
                SubTestCode: viewModel.ApplicantList._data[i].SubTestCode,
                SubTest: viewModel.ApplicantList._data[i].SubTest,
                Scores: normScores[i],
                isValidityScale: viewModel.ApplicantList._data[i].isValidityScale,
                IsParent: viewModel.ApplicantList._data[i].IsParent
            });
        }

        var valid = true;
        var lengthDatas = applicant.length;
        for (data = 0; data < lengthDatas; data++) {
            for (list = 0; list < applicant[data].Scores.length - 1; list++) {
                if (applicant[data].Scores[list + 1].Value != 0 && applicant[data].Scores[list + 1].Value < applicant[data].Scores[list].Value) {
                    valid = false;
                    break;
                } else if (applicant[data].Scores[list].Value < 0) {
                    valid = false;
                    break;
                }
            }
        }

        var numberss = 1;
        for (sp = 0; sp < lengthDatas; sp++) {
            for (psp = 1 ; psp < applicant[sp].Scores.length; psp++) {
                if (applicant[sp].Scores[psp].Value != 0) {
                    numberss = psp;
                    for (df = psp; df < applicant[sp].Scores.length; df++) {
                        if (df == numberss) {
                            if (applicant[sp].Scores[df].Value != 0) {
                                if (applicant[sp].Scores[df - 1].Value == 0) {
                                    valid = false;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (NormScoreName == '' || CompanyId == '' || GradeId == '') {
            swal('Invalid!', 'Please fill mandatory field!!!', 'warning', { closeOnClickOutside: false });
            return;
        }
        if (TestTypeCode == '' || TestToolCode == '') {
            swal('Failed!', 'Please select test type & test tool to proceed', 'warning', { closeOnClickOutside: false });
        }
        if (checkScoreValue.length == 0) {
            swal('Failed!', 'Please input subtest score to proceed', 'warning', { closeOnClickOutside: false });
        } else {
            if (checkScoreValue.length > 0) {
                for (a = 0; a < checkScoreValue.length; a++) {
                    if (checkScoreValue[a] < 1) {
                        swal('Invalid!', 'Norm score value cannot be less than 1', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
            if (valid == false) {
                swal('Invalid!', 'Your norm score value cannot be less than 1 and must be ordered from the smallest to largest value', 'warning', { closeOnClickOutside: false });
            } else {
                confirmMessageAdd();
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: "POST",
                        url: SERVICE_URL + "api/NormScore/Edit",
                        headers: { "Authorization-Token": Cookie.load() },
                        data: {
                            NormScoreCode: viewModel.NormScoreCode,
                            TestTypeCode: TestTypeCode,
                            TestToolCode: TestToolCode,
                            DisplayStatus: DisplayStatus,
                            NormScoreName: NormScoreName,
                            CompanyId: CompanyId,
                            GradeId: GradeId,
                            NormScores: applicant,
                        },
                        success: function (response) {
                            if (response.Acknowledge == 1) {
                                LoadingMask.hide();
                                swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                viewModel.NormScores = [];
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + "Views/OnlineTesting/NormScore/NormScore.html";
                                });
                            } else if (response.isExist == true) {
                                LoadingMask.hide();
                                if (viewModel.isConfirm == false) {
                                    confirmMessageNormScore();
                                    $('.swal-button--defeat').on('click', function () {
                                        viewModel.set("isConfirm", true);
                                        saveEditReplace();
                                    })
                                }
                            } else {
                                LoadingMask.hide();
                                swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                            }
                        },
                        error: function (xhr, status, error) {
                            MessageBox.show("Error", "Error"+xhr);
                        },
                    });
                    return false;
                });
            }
        }
    }
}

saveReplace = function () {
    var TestTypeCode = viewModel.TestTypeCode;
    var TestToolCode = viewModel.TestToolCode;
    var DisplayStatus = viewModel.DisplayStatus;
    var NormScoreName = viewModel.NormScoreName;
    var CompanyId = viewModel.CompanyId;
    var GradeId = viewModel.GradeId;
    var isConfirm = viewModel.isConfirm;
    var checkScoreValue = [];

    if (viewModel.NormScoreCode == '') {
        var applicant = [];
        var Scores = [];
        var Scoress = [];
        var Score = [];
        var Scor = [];
        var normScores = [];
        
        // for norms score
        for (i = 0; i < viewModel.ApplicantList._data.length; i++) {
            var scoreData = [];
            for (k = 0; k < viewModel.ApplicantList._data[i].Scores.length; k++) {
                scoreData[k] = {
                    No: viewModel.ApplicantList._data[i].Scores[k].No,
                    Value: viewModel.ApplicantList._data[i].Scores[k].Value
                };
                if (viewModel.ApplicantList._data[i].Scores[k].Value !== 0) {
                    checkScoreValue.push(viewModel.ApplicantList._data[i].Scores[k].Value);
                }
                if (viewModel.ApplicantList._data[i].Scores[k].Value == 0) {
                    swal('Invalid!', 'Norm score value cannot be less than 1', 'warning', { closeOnClickOutside: false });
                    return;
                }
            }
            normScores[i] = scoreData;
            applicant.push({
                No: viewModel.ApplicantList._data[i].No,
                SubTestCode: viewModel.ApplicantList._data[i].SubTestCode,
                SubTest: viewModel.ApplicantList._data[i].SubTest,
                Scores: normScores[i],
                isValidityScale: viewModel.ApplicantList._data[i].isValidityScale,
                IsParent: viewModel.ApplicantList._data[i].IsParent
            });
        }

        var valid = true;
        var lengthDatas = applicant.length;
        var lengthDatas = applicant.length;

        for (data = 0; data < lengthDatas; data++) {
            for (list = 0; list < applicant[data].Scores.length - 1; list++) {
                if (applicant[data].Scores[list + 1].Value != 0 && applicant[data].Scores[list + 1].Value < applicant[data].Scores[list].Value) {
                    valid = false;
                    break;
                }
                else if (applicant[data].Scores[list].Value < 0) {
                    valid = false;
                    break;
                }
            }
        }

        var numberss = 1;
        for (sp = 0; sp < lengthDatas; sp++) {
            for (psp = 1 ; psp < applicant[sp].Scores.length; psp++) {
                if (applicant[sp].Scores[psp].Value != 0) {
                    numberss = psp;
                    for (df = psp; df < applicant[sp].Scores.length; df++) {
                        if (df == numberss) {
                            if (applicant[sp].Scores[df].Value != 0) {
                                if (applicant[sp].Scores[df - 1].Value == 0) {
                                    valid = false;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (TestTypeCode == '' || TestToolCode == '') {
            swal('Failed!', 'Please select test type & test tool to proceed', 'warning', { closeOnClickOutside: false });
        }
        if (checkScoreValue.length == 0) {
            swal('Failed!', 'Please input subtest score to proceed', 'warning', { closeOnClickOutside: false });
        } else {
            if (checkScoreValue.length > 0) {
                for (a = 0; a < checkScoreValue.length; a++) {
                    if (checkScoreValue[a] < 1) {
                        swal('Invalid!', 'Norm score value cannot be less than 1', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
            if (valid == false) {
                swal('Invalid!', 'Your norm score value cannot be less than 1 and must be ordered from the smallest to largest value', 'warning', { closeOnClickOutside: false });
            } else {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/NormScore/Add",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        TestTypeCode: TestTypeCode,
                        TestToolCode: TestToolCode,
                        DisplayStatus: DisplayStatus,
                        NormScoreName: NormScoreName,
                        CompanyId: CompanyId,
                        GradeId: GradeId,
                        NormScores: applicant,
                        isConfirm: isConfirm
                    },
                    success: function (response) {
                        if (response.Acknowledge == 1) {
                            LoadingMask.hide();
                            swal("Good", response.Message, "success", {closeOnClickOutside: false});
                            viewModel.NormScores = [];
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + "Views/OnlineTesting/NormScore/NormScore.html";
                            });
                        } else {
                            LoadingMask.hide();
                            swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                        }
                    },
                    error: function (xhr, status, error) {
                        MessageBox.show("Error", "Error"+xhr);
                    },
                });
            }
        }
    }
}

saveEditReplace = function () {
    var TestTypeCode = viewModel.TestTypeCode;
    var TestToolCode = viewModel.TestToolCode;
    var DisplayStatus = viewModel.DisplayStatus;
    var NormScoreName = viewModel.NormScoreName;
    var CompanyId = viewModel.CompanyId;
    var GradeId = viewModel.GradeId;
    var isConfirm = viewModel.isConfirm;
    var checkScoreValue = [];

    var applicant = [];
    var Scores = [];
    var Scoress = [];
    var Score = [];
    var Scor = [];
    var normScores = [];

    // for norms score
    for (i = 0; i < viewModel.listNormScore._data.length; i++) {
        var scoreData = [];
        for (k = 0; k < viewModel.listNormScore._data[i].Scores.length; k++) {
            scoreData[k] = {
                No: viewModel.listNormScore._data[i].Scores[k].No,
                Value: viewModel.listNormScore._data[i].Scores[k].Value
            };
            if (viewModel.listNormScore._data[i].Scores[k].Value !== 0) {
                checkScoreValue.push(viewModel.listNormScore._data[i].Scores[k].Value);
            }
            if (viewModel.ApplicantList._data[i].Scores[k].Value == 0) {
                swal('Invalid!', 'Norm score value cannot be less than 1', 'warning', { closeOnClickOutside: false });
                return;
            }
        }
        normScores[i] = scoreData;
        applicant.push({
            No: viewModel.ApplicantList._data[i].No,
            SubTestCode: viewModel.ApplicantList._data[i].SubTestCode,
            SubTest: viewModel.ApplicantList._data[i].SubTest,
            Scores: normScores[i],
            isValidityScale: viewModel.ApplicantList._data[i].isValidityScale,
            IsParent: viewModel.ApplicantList._data[i].IsParent
        });
    }

    var valid = true;
    var lengthDatas = applicant.length;
    for (data = 0; data < lengthDatas; data++) {
        for (list = 0; list < applicant[data].Scores.length - 1; list++) {
            if (applicant[data].Scores[list + 1].Value != 0 && applicant[data].Scores[list + 1].Value < applicant[data].Scores[list].Value) {
                valid = false;
                break;
            } else if (applicant[data].Scores[list].Value < 0) {
                valid = false;
                break;
            }
        }
    }

    var numberss = 1;
    for (sp = 0; sp < lengthDatas; sp++) {
        for (psp = 1 ; psp < applicant[sp].Scores.length; psp++) {
            if (applicant[sp].Scores[psp].Value != 0) {
                numberss = psp;
                for (df = psp; df < applicant[sp].Scores.length; df++) {
                    if (df == numberss) {
                        if (applicant[sp].Scores[df].Value != 0) {
                            if (applicant[sp].Scores[df - 1].Value == 0) {
                                valid = false;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    if (TestTypeCode == '' || TestToolCode == '') {
        swal('Failed!', 'Please select test type & test tool to proceed', 'warning', { closeOnClickOutside: false });
    }
    if (checkScoreValue.length == 0) {
        swal('Failed!', 'Please input subtest score to proceed', 'warning', { closeOnClickOutside: false });
    } else {
        if (checkScoreValue.length > 0) {
            for (a = 0; a < checkScoreValue.length; a++) {
                if (checkScoreValue[a] < 1) {
                    swal('Invalid!', 'Norm score value cannot be less than 1', 'warning', { closeOnClickOutside: false });
                    return;
                }
            }
        }
        if (valid == false) {
            swal('Invalid!', 'Your norm score value cannot be less than 1 and must be ordered from the smallest to largest value', 'warning', { closeOnClickOutside: false });
        } else {
            LoadingMask.show();
            $.ajax({
                type: "POST",
                url: SERVICE_URL + "api/NormScore/Edit",
                headers: { "Authorization-Token": Cookie.load() },
                data: {
                    NormScoreCode: viewModel.NormScoreCode,
                    TestTypeCode: TestTypeCode,
                    TestToolCode: TestToolCode,
                    DisplayStatus: DisplayStatus,
                    NormScoreName: NormScoreName,
                    CompanyId: CompanyId,
                    GradeId: GradeId,
                    NormScores: applicant,
                },
                success: function (response) {
                    if (response.Acknowledge == 1) {
                        LoadingMask.hide();
                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                        viewModel.NormScores = [];
                        $('.swal-button--confirm').on('click', function () {
                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/NormScore/NormScore.html";
                        });
                    } else {
                        LoadingMask.hide();
                        swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                    }
                },
                error: function (xhr, status, error) {
                    MessageBox.show("Error", "Error"+xhr);
                },
            });
            return false;
        }
    }
}