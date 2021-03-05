//add change
var modelArticle = new kendo.data.Model.define({
    id: "SubTestCode",
    fields: {
        SubTestCode: { type: "string", editable: false },
        TestTypeCode: { type: "string", editable: false },
        TestToolCode: { type: "string", editable: false },
        SubTestName: { type: "string", editable: false },
        CutOffScore: { type: "number", editable: true },
        DisplayOrder: { type: "number", editable: true },
        IsDisplay: { type: "boolean", editable: true },
    }
});

var viewModel = kendo.observable({
    role_name: "",
    act: "",
    createBy: "",
    lastModifiedBy: "",
    createOn: "",
    lastModifiedOn: "",

    CutOffCode: "",
    CutOffName: "",
    NameOnly: "",
    NameNumbering: "",
    CompanyID: localStorage.getItem("CompanyID"),
    CompanyName: "",
    CompanyList: [],
    GeneralStatus: true,
    GradeID: "",
    GradeName: "",
    DisplayStatus: true,

    TestTypeCode: "",
    TestTypeName: "",
    TestTypeList: [],
    TestTypes: "",
    TestTypeTestList: [],

    TestToolCode: "",
    TestToolName: "",
    TestToolList: [],
    TestTool: "",
    TestTools: "",
    TestToolListTest:[],

    SubTestName: "",
    IsConfigIQ: false,
    CutOffIQCheckBox: false,
    CutOffIQ: "",
    CutOffIQList: [],
    NormScoreIQCode: "",
    NormScoreIQName: "",

    ArrayChecked: [],
    ArrayCheckedTest: [],
    ArrayCheckedTestValidityScale: [],
    ArrayCheckedTemp: [],
    ArrayMapComp: [],
    arrCompetency: [],

    listBySubTest: [],
    listByTest: [],
    bySubList: [],
    byTestSubTestList: [],
    byTestValidityScaleList: [],

    CutOffScore: 0,
    DisplayOrder: 0,
    selectedDisplayOrder: 0,
    DisplayOrderTestTool: 1,

    detailTest: false,
    listDetailTest: [],
    listDetailTestVS: [],
    detailSubTest: false,
    listDetailSubTest: [],
    arrSubTestAffco: [],
    arrCutOffIQScore: [],

    deletedRow: false,
    deletedRowTest: false,

    ApplicantList: new kendo.data.DataSource ({
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + "api/CutOff/SetupBySubTest",
                headers: { "Authorization-Token": Cookie.load() },
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.CompanyId = viewModel.CompanyID;
                request.GradeId = viewModel.GradeID;
                request.TestTypeCode = viewModel.TestTypeCode;
                request.TestToolCode = viewModel.TestToolCode;
                return request;
            }
        },
        schema: {
            data: "SetupList",
            model: modelArticle,
            total: "Total"
        },
        serverPaging: false,
        serverFiltering: false,
        pageSize: 10
    }),
    ApplicantList2: function (TestTypeCode, TestToolCode) {
        return new kendo.data.DataSource({
            transport: {
                read: {
                    type: "POST",
                    url: SERVICE_URL + "api/CutOff/SetupBySubTest",
                    headers: { "Authorization-Token": Cookie.load() },
                },
                parameterMap: function (data, operation) {
                    var request = new Object();
                    request.CompanyId = viewModel.CompanyID;
                    request.GradeId = viewModel.GradeID;
                    request.TestTypeCode = TestTypeCode;
                    request.TestToolCode = TestToolCode;
                    return request;
                }
            },
            schema: {
                data: "SetupList",
                model: modelArticle,
                total: "Total"
            },
            serverPaging: false,
            serverFiltering: false,
            //pageSize: 10
        })
    },
    ByTestList: new kendo.data.DataSource ({
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + "api/CutOff/SetupByTest",
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
            data: "SetupList",
            model: modelArticle,
            total: "Total"
        },
        serverPaging: false,
        serverFiltering: false,
        pageSize: 10
    }),
    ByTestList2: function (TestTypeCode, TestToolCode) {
        return new kendo.data.DataSource({
            transport: {
                read: {
                    type: "POST",
                    url: SERVICE_URL + "api/CutOff/SetupByTest",
                    headers: { "Authorization-Token": Cookie.load() },
                },
                parameterMap: function (data, operation) {
                    var request = new Object();
                    request.TestTypeCode = TestTypeCode;
                    request.TestToolCode = TestToolCode;
                    return request;
                }
            },
            schema: {
                data: "SetupList",
                model: modelArticle,
                total: "Total"
            },
            serverPaging: false,
            serverFiltering: false,
            //pageSize: 10
        })
    },
    ValidityScaleList: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + "api/CutOff/SetupByTest",
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
            data: "ValidityScaleList",
            model: modelArticle,
            total: "Total"
        },
        serverPaging: false,
        serverFiltering: false,
        pageSize: 10
    }),
    ValidityScaleList2: function (TestTypeCode, TestToolCode) {
        return new kendo.data.DataSource({
            transport: {
                read: {
                    type: "POST",
                    url: SERVICE_URL + "api/CutOff/SetupByTest",
                    headers: { "Authorization-Token": Cookie.load() },
                },
                parameterMap: function (data, operation) {
                    var request = new Object();
                    request.TestTypeCode = TestTypeCode;
                    request.TestToolCode = TestToolCode;
                    return request;
                }
            },
            schema: {
                data: "ValidityScaleList",
                model: modelArticle,
                total: "Total"
            },
            serverPaging: false,
            serverFiltering: false,
            //pageSize: 10
        })
    },
    CutOffDetail: [],
    CutOffDetails: [],

    Competencies: [],
    arrSelectedCompetencyMatrix: [],

    IsConfirm: false,

    CheckCompetency: function (e) {
        CheckCompetency(e);
    },
    DeleteCompetency: function () {
        DeleteCompetency();
    },
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
            window.location.href = DOMAIN_URL + "Views/OnlineTesting/CutOff/CutOff.html";
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

Search = function () {
    LoadingMask.show();
    //viewModel.ApplicantList.page(1);
    var grid = $("#gridTable").data('kendoGrid');
    grid.setDataSource(viewModel.ApplicantList2(viewModel.TestTypeCode, viewModel.TestToolCode));
    grid.dataSource.one('change', function (e) {
        viewModel.set('ArrayChecked', e.items);
    });
    checkConfigIQ();
}
SearchTest = function (e) {
    LoadingMask.show();
    //viewModel.ByTestList.page(1);
    var grid = $("#gridByTest").data('kendoGrid');
    grid.setDataSource(viewModel.ByTestList2(viewModel.TestTypeCode, viewModel.TestToolCode));
    grid.dataSource.one('change', function (e) {
        viewModel.set('ArrayCheckedTest', e.items);
    })
    var gridValidityScale = $("#gridCutOffValidityScale").data('kendoGrid');
    gridValidityScale.setDataSource(viewModel.ValidityScaleList2(viewModel.TestTypeCode, viewModel.TestToolCode));
    gridValidityScale.dataSource.one('change', function (e) {
        viewModel.set('ArrayCheckedTestValidityScale', e.items);
    })
    LoadingMask.hide();
}

checkConfigIQ = function (edit) {
    var edit = edit
    LoadingMask.show();
    $.ajax({
        type: "POST",
        url: SERVICE_URL + "api/CutOff/SetupBySubTest",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CompanyId: viewModel.CompanyID,
            GradeId: viewModel.GradeID,
            TestTypeCode: viewModel.TestTypeCode,
            TestToolCode: viewModel.TestToolCode
        },
        success: function (response) {
            LoadingMask.hide();
            if (edit !== "true") {
                viewModel.set('NormScoreIQCode', response.NormScoreIQCode)
                viewModel.set('NormScoreIQName', response.NormScoreIQName)
            }
            if (response.IsConfigIQ == true) {
                viewModel.set('IsConfigIQ', true)
                if (viewModel.detailSubTest == false) {
                    //add
                    if (viewModel.CutOffIQList.length > 0) {
                        for (a = 0; a < viewModel.CutOffIQList.length; a++) {
                            if (viewModel.TestTypeCode == viewModel.CutOffIQList[a].TestTypeCode) {
                                if (viewModel.TestToolCode !== viewModel.CutOffIQList[a].TestToolCode) {
                                    viewModel.CutOffIQList.push({
                                        TestTypeCode: viewModel.TestTypeCode,
                                        TestToolCode: viewModel.TestToolCode,
                                        CutOffIQCheckBox: false,
                                        CutOffIQ: "",
                                    })
                                }
                            } else {
                                viewModel.CutOffIQList.push({
                                    TestTypeCode: viewModel.TestTypeCode,
                                    TestToolCode: viewModel.TestToolCode,
                                    CutOffIQCheckBox: false,
                                    CutOffIQ: "",
                                })
                            }
                        }
                    } else {
                        viewModel.CutOffIQList.push({
                            TestTypeCode: viewModel.TestTypeCode,
                            TestToolCode: viewModel.TestToolCode,
                            CutOffIQCheckBox: false,
                            CutOffIQ: "",
                        })
                    }
                    viewModel.set('CutOffIQCheckBox', false)
                    viewModel.set('CutOffIQ', "")
                }
                else {
                    //detail
                    if (viewModel.bySubList.length > 0) {
                        for (a = 0; a < viewModel.bySubList.length; a++) {
                            if (viewModel.TestTypeCode == viewModel.bySubList[a].TestTypeCode &&
                                viewModel.TestToolCode == viewModel.bySubList[a].TestToolCode) {
                                if (viewModel.role_name == 'AFFCO') {
                                    if (viewModel.arrCutOffIQScore.length > 0) {
                                        for (aa = 0; aa < viewModel.arrCutOffIQScore.length; aa++) {
                                            if (viewModel.arrCutOffIQScore[aa].TestTypeCode == viewModel.TestTypeCode && viewModel.arrCutOffIQScore[aa].TestToolCode == viewModel.TestToolCode) {
                                                if (viewModel.bySubList[a].CutOffIQCheckBox == true) {
                                                    $('#cutOffIQCheckBox').val(true);
                                                    $('#cutOffIQCheckBox').prop('checked', true);
                                                    $('#cutOffIQCheckBox').removeAttr('onchange');
                                                    $('#cutOffIQCheckBox').attr('onchange', 'CutOffIQCheckBox(this)');
                                                    var numerictextbox = $("#CutOffIQ").data("kendoNumericTextBox");
                                                    numerictextbox.enable(true);
                                                    numerictextbox.value(viewModel.bySubList[a].CutOffIQ);
                                                    $("#cutOffIQCheckBox").prop("disabled", false);
                                                    if (viewModel.NormScoreIQName == "") {
                                                        jQuery("label[id='NormScoreIQName']").html("Not Found");
                                                    } else {
                                                        jQuery("label[id='NormScoreIQName']").html(viewModel.NormScoreIQName);
                                                    }
                                                } else {
                                                    $('#cutOffIQCheckBox').val(false);
                                                    $('#cutOffIQCheckBox').prop('checked', false);
                                                    $('#cutOffIQCheckBox').removeAttr('onchange');
                                                    $('#cutOffIQCheckBox').attr('onchange', 'CutOffIQCheckBoxChecked(this)');
                                                    var numerictextbox = $("#CutOffIQ").data("kendoNumericTextBox");
                                                    numerictextbox.enable(false);
                                                    numerictextbox.value("");
                                                    $("#cutOffIQCheckBox").prop("disabled", false);
                                                    jQuery("label[id='NormScoreIQName']").html("Not Found");
                                                }
                                            } else {
                                                if (viewModel.bySubList[a].CutOffIQCheckBox == true) {
                                                    $('#cutOffIQCheckBox').val(true);
                                                    $('#cutOffIQCheckBox').prop('checked', true);
                                                    $('#cutOffIQCheckBox').removeAttr('onchange');
                                                    $('#cutOffIQCheckBox').attr('onchange', 'CutOffIQCheckBox(this)');
                                                    var numerictextbox = $("#CutOffIQ").data("kendoNumericTextBox");
                                                    numerictextbox.enable(true);
                                                    numerictextbox.value(viewModel.bySubList[a].CutOffIQ);
                                                    $("#cutOffIQCheckBox").prop("disabled", true);
                                                    if (viewModel.NormScoreIQName == "") {
                                                        jQuery("label[id='NormScoreIQName']").html("Not Found");
                                                    } else {
                                                        jQuery("label[id='NormScoreIQName']").html(viewModel.NormScoreIQName);
                                                    }
                                                } else {
                                                    $('#cutOffIQCheckBox').val(false);
                                                    $('#cutOffIQCheckBox').prop('checked', false);
                                                    $('#cutOffIQCheckBox').removeAttr('onchange');
                                                    $('#cutOffIQCheckBox').attr('onchange', 'CutOffIQCheckBoxChecked(this)');
                                                    var numerictextbox = $("#CutOffIQ").data("kendoNumericTextBox");
                                                    numerictextbox.enable(false);
                                                    numerictextbox.value("");
                                                    $("#cutOffIQCheckBox").prop("disabled", false);
                                                    jQuery("label[id='NormScoreIQName']").html("Not Found");
                                                }
                                            }
                                        }
                                    } else {
                                        if (viewModel.bySubList[a].CutOffIQCheckBox == true) {
                                            $('#cutOffIQCheckBox').val(true);
                                            $('#cutOffIQCheckBox').prop('checked', true);
                                            $('#cutOffIQCheckBox').removeAttr('onchange');
                                            $('#cutOffIQCheckBox').attr('onchange', 'CutOffIQCheckBox(this)');
                                            var numerictextbox = $("#CutOffIQ").data("kendoNumericTextBox");
                                            numerictextbox.enable(true);
                                            numerictextbox.value(viewModel.bySubList[a].CutOffIQ);
                                            $("#cutOffIQCheckBox").prop("disabled", true);
                                            if (viewModel.NormScoreIQName == "") {
                                                jQuery("label[id='NormScoreIQName']").html("Not Found");
                                            } else {
                                                jQuery("label[id='NormScoreIQName']").html(viewModel.NormScoreIQName);
                                            }
                                        } else {
                                            $('#cutOffIQCheckBox').val(false);
                                            $('#cutOffIQCheckBox').prop('checked', false);
                                            $('#cutOffIQCheckBox').removeAttr('onchange');
                                            $('#cutOffIQCheckBox').attr('onchange', 'CutOffIQCheckBoxChecked(this)');
                                            var numerictextbox = $("#CutOffIQ").data("kendoNumericTextBox");
                                            numerictextbox.enable(false);
                                            numerictextbox.value("");
                                            $("#cutOffIQCheckBox").prop("disabled", false);
                                            jQuery("label[id='NormScoreIQName']").html("Not Found");
                                        }
                                    }
                                } else {
                                    if (viewModel.bySubList[a].CutOffIQCheckBox == true) {
                                        $('#cutOffIQCheckBox').val(true);
                                        $('#cutOffIQCheckBox').prop('checked', true);
                                        $('#cutOffIQCheckBox').removeAttr('onchange');
                                        $('#cutOffIQCheckBox').attr('onchange', 'CutOffIQCheckBox(this)');
                                        var numerictextbox = $("#CutOffIQ").data("kendoNumericTextBox");
                                        numerictextbox.enable(true);
                                        numerictextbox.value(viewModel.bySubList[a].CutOffIQ);
                                        if (viewModel.NormScoreIQName == "") {
                                            jQuery("label[id='NormScoreIQName']").html("Not Found");
                                        } else {
                                            jQuery("label[id='NormScoreIQName']").html(viewModel.NormScoreIQName);
                                        }
                                        $('#NormScoreIQField').show()
                                        $('#NormScoreIQName').show()
                                    } else {
                                        $('#cutOffIQCheckBox').val(false);
                                        $('#cutOffIQCheckBox').prop('checked', false);
                                        $('#cutOffIQCheckBox').removeAttr('onchange');
                                        $('#cutOffIQCheckBox').attr('onchange', 'CutOffIQCheckBoxChecked(this)');
                                        var numerictextbox = $("#CutOffIQ").data("kendoNumericTextBox");
                                        numerictextbox.enable(false);
                                        numerictextbox.value("");
                                        jQuery("label[id='NormScoreIQName']").html("Not Found");
                                        $('#NormScoreIQField').hide()
                                        $('#NormScoreIQName').hide()
                                    }
                                }
                            }
                        }
                    }
                }
                $("#cutOffIQField").show();
            } else {
                viewModel.set('IsConfigIQ', false)
                $("#cutOffIQField").hide();
            }

            for (b = 0; b < viewModel.CutOffIQList.length; b++) {
                if (viewModel.detailSubTest == false) {
                    //add
                    if (viewModel.CutOffIQList[b].TestTypeCode == viewModel.TestTypeCode) {
                        if (viewModel.CutOffIQList[b].TestToolCode == viewModel.TestToolCode) {
                            if (viewModel.CutOffIQList[b].CutOffIQCheckBox == false) {
                                $('#cutOffIQCheckBox').prop('checked', false);
                                $('#cutOffIQCheckBox').removeAttr('onchange');
                                $('#cutOffIQCheckBox').attr('onchange', 'CutOffIQCheckBoxChecked(this)');

                                var numerictextbox = $("#CutOffIQ").data("kendoNumericTextBox");
                                numerictextbox.enable(false);
                                numerictextbox.value("");
                                jQuery("label[id='NormScoreIQName']").html("Not Found");
                            }
                        } else {
                            if (viewModel.CutOffIQList[b].CutOffIQCheckBox == false) {
                                $('#cutOffIQCheckBox').prop('checked', false);
                                $('#cutOffIQCheckBox').removeAttr('onchange');
                                $('#cutOffIQCheckBox').attr('onchange', 'CutOffIQCheckBoxChecked(this)');

                                var numerictextbox = $("#CutOffIQ").data("kendoNumericTextBox");
                                numerictextbox.enable(false);
                                numerictextbox.value("");
                                jQuery("label[id='NormScoreIQName']").html("Not Found");
                            }
                        }
                    }
                }
                else {
                    //detail
                    //if (viewModel.CutOffIQList[b].TestTypeCode == viewModel.TestTypeCode && viewModel.CutOffIQList[b].TestToolCode == viewModel.TestToolCode) {
                    //    $('#cutOffIQCheckBox').val(viewModel.CutOffIQList[b].CutOffIQCheckBox);
                    //    var numerictextbox = $("#CutOffIQ").data("kendoNumericTextBox");
                    //    numerictextbox.value(viewModel.CutOffIQList[b].CutOffIQ);
                    //}
                }
            }
        },
        error: function (xhr, status, error) {
            MessageBox.show("Error", "Error");
            LoadingMask.hide();
        }
    });
    
}

checkConfigScoreSubTest = function () {
    var CutOffCode = viewModel.CutOffCode
    var CompanyID = viewModel.CompanyID
    var GradeID = viewModel.GradeID
    var TestTypeCode = viewModel.TestTypeCode
    var TestToolCode = viewModel.TestToolCode
    var SubTestList = []

    for (c = 0; c < viewModel.ArrayChecked.length; c++) {
        if (viewModel.ArrayChecked[c].HasParent == true && viewModel.ArrayChecked[c].HasChild == false) {
            if (viewModel.ArrayChecked[c].IsDisplay == false) {
                var ParentWithoutChildCode = viewModel.ArrayChecked[c].ParentCode
                break;
            }
        }
    }

    for (i = 0; i < viewModel.ArrayChecked.length; i++) {
        if (Number.isInteger(viewModel.ArrayChecked[i].CutOffScore) == false) {
            swal('Invalid!', 'Cut Off Score value cannot be decimal', 'warning', { closeOnClickOutside: false });
            return;
        }
        //if (viewModel.ArrayChecked[i].SubTestCode == ParentCode) {
        //    if (viewModel.ArrayChecked[i].CutOffScore >= 0) {
        //        viewModel.set('ArrayChecked[' + i + '].IsDisplay', true)
        //    }
        //} else
        if (viewModel.ArrayChecked[i].SubTestCode == ParentWithoutChildCode) {
            if (viewModel.ArrayChecked[i].CutOffScore == 0) {
                viewModel.set('ArrayChecked[' + i + '].IsDisplay', false)
            }
        }
        if (viewModel.ArrayChecked[i].IsDisplay == true) {
            var CutOffIQCheckBox = viewModel.ArrayChecked[i].CutOffIQCheckBox
            var NormScoreIQCode = viewModel.ArrayChecked[i].NormScoreIQCode
            SubTestList.push({
                SubTestCode: viewModel.ArrayChecked[i].SubTestCode,
                CutOffScore: viewModel.ArrayChecked[i].CutOffScore,
                HasParent: viewModel.ArrayChecked[i].HasParent,
                HasChild: viewModel.ArrayChecked[i].HasChild
            })
        }
    }
    var DetailTestTool = {
        TestTypeCode: TestTypeCode,
        TestToolCode: TestToolCode,
        SubTestList: SubTestList,
        CutOffIQCheckBox: CutOffIQCheckBox,
        NormScoreIQCode: NormScoreIQCode
    }

    LoadingMask.show();
    $.ajax({
        type: "POST",
        url: SERVICE_URL + "api/CutOff/ValidateSetupBySubTest",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CutOffCode: CutOffCode,
            GradeID: GradeID,
            CompanyID: CompanyID,
            DetailTestTool: DetailTestTool
        },
        success: function (response) {
            if (response.Acknowledge < 1) {
                LoadingMask.hide();
                swal("Failed!", response.Message, "warning", { closeOnClickOutside: false });
                return;
            } else {
                LoadingMask.hide();
                TempSubTest()
            }
        },
        error: function (xhr, status, error) {
            MessageBox.show("Error", "Error");
            LoadingMask.hide();
        }
    });
}
checkConfigScoreTest = function () {
    var CutOffCode = viewModel.CutOffCode
    var CompanyID = viewModel.CompanyID
    var GradeID = viewModel.GradeID
    var TestTypeCode = viewModel.TestTypeCode
    var TestToolCode = viewModel.TestToolCode
    var SubTestList = []

    for (i = 0; i < viewModel.ArrayCheckedTest.length; i++) {
        if (Number.isInteger(viewModel.ArrayCheckedTest[i].CutOffScore) == false) {
            swal('Invalid!', 'Cut Off Score value cannot be decimal', 'warning', { closeOnClickOutside: false });
            return;
        }
        SubTestList.push({
            SubTestCode: viewModel.ArrayCheckedTest[i].SubTestCode,
            CutOffScore: viewModel.ArrayCheckedTest[i].CutOffScore
        })
    }
    var DetailTestTool = {
        TestTypeCode: TestTypeCode,
        TestToolCode: TestToolCode,
        SubTestList: SubTestList
    }

    LoadingMask.show();
    $.ajax({
        type: "POST",
        url: SERVICE_URL + "api/CutOff/ValidateSetupByTest",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CutOffCode: CutOffCode,
            GradeID: GradeID,
            CompanyID: CompanyID,
            DetailTestTool: DetailTestTool
        },
        success: function (response) {
            if (response.Acknowledge < 1) {
                LoadingMask.hide();
                swal("Failed!", response.Message, "warning", { closeOnClickOutside: false });
                return;
            } else {
                LoadingMask.hide();
                TempTest()
            }
        },
        error: function (xhr, status, error) {
            MessageBox.show("Error", "Error");
            LoadingMask.hide();
        }
    });
}

TempSubTest = function () {
    // SAfe locally subtest
    var arrBySub = [];
    var arrSemuaSubTestTool = [];
    var tempDisplay = [];
    var updatedList = [];
    var delData = [];

    for (iq = 0; iq < viewModel.CutOffIQList.length; iq++) {
        if (viewModel.CutOffIQList[iq].CutOffIQCheckBox == true) {
            //check CutOffIQ value >=0
            if (viewModel.CutOffIQList[iq].CutOffIQ < 0) {
                swal('Invalid!', 'Cut Off IQ value must be integer', 'warning', { closeOnClickOutside: false });
                return;
            }
            //check CutOffIQ value isn't decimal
            if (Number.isInteger(parseFloat(viewModel.CutOffIQList[iq].CutOffIQ)) == false) {
                swal('Invalid!', 'Cut Off IQ value cannot be decimal', 'warning', { closeOnClickOutside: false });
                return;
            }
            //check CutOffIQ centang, subtest yg memuat NormIQ harus di tick display
            //for (hasiq = 0; hasiq < viewModel.ArrayChecked.length; hasiq++) {
            //    if (viewModel.ArrayChecked[hasiq].HasIQ == true) {
            //        if (viewModel.CutOffIQList[iq].TestTypeCode == viewModel.TestTypeCode && viewModel.CutOffIQList[iq].TestToolCode == viewModel.TestToolCode) {
            //            if (viewModel.CutOffIQList[iq].CutOffIQCheckBox == true) {
            //                if (viewModel.ArrayChecked[hasiq].IsDisplay == false) {
            //                    swal('Failed!', 'You have to display all sub-tests that relates to Norm IQ to proceed', 'warning', { closeOnClickOutside: false });
            //                    return;
            //                }
            //            }
            //        }
            //    }
            //}
            if (viewModel.CutOffIQList[iq].TestTypeCode == viewModel.TestTypeCode && viewModel.CutOffIQList[iq].TestToolCode == viewModel.TestToolCode) {
                viewModel.set('CutOffIQ', viewModel.CutOffIQList[iq].CutOffIQ)
                viewModel.set('CutOffIQCheckBox', viewModel.CutOffIQList[iq].CutOffIQCheckBox)
            }
        } else {
            viewModel.set('NormScoreIQCode', "")
        }
    }

    if (viewModel.detailSubTest == false) {
        //add sub test
        for (i = 0; i < viewModel.ArrayChecked.length; i++) {
            if (viewModel.ArrayChecked[i].IsDisplay == true) {
                //validasi cut off score & display order
                for (m = 0; m < viewModel.ArrayChecked.length; m++) {
                    //check parent display, child must be displayed too
                    if (viewModel.ArrayChecked[m].HasChild == true) {
                        var ParentCode = viewModel.ArrayChecked[m].SubTestCode
                        var ChildList = []
                        if (viewModel.ArrayChecked[m].CutOffScore > 0) {
                            viewModel.set('ArrayChecked[' + m + '].IsDisplay', true)
                            for (child = 0; child < viewModel.ArrayChecked.length; child++) {
                                if (viewModel.ArrayChecked[child].ParentCode == ParentCode) {
                                    if (viewModel.ArrayChecked[child].IsDisplay == false) {
                                        ChildList.push(viewModel.ArrayChecked[child].SubTestName)
                                    }
                                }
                            }
                            if (ChildList.length > 0) {
                                swal('Invalid!', 'Subtest ' + ChildList + ' should be displayed to proceed', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                        }
                    }

                    if (viewModel.ArrayChecked[m].IsDisplay == true) {
                        //if (viewModel.ArrayChecked[m].CutOffScore <= 0 && ((viewModel.ArrayChecked[m].HasChild == true && viewModel.ArrayChecked[m].HasParent == false) || (viewModel.ArrayChecked[m].HasChild == false && viewModel.ArrayChecked[m].HasParent == false))) {
                        //    swal('Invalid!', 'Cut Off Score should be in a range of ' + viewModel.ArrayChecked[m].TestToolName + ' config score', 'warning', { closeOnClickOutside: false });
                        //    return;
                        //}
                        if (Number.isInteger(viewModel.ArrayChecked[m].CutOffScore) == false) {
                            swal('Invalid!', 'Cut Off Score value cannot be decimal', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                        //cek display order 0, null, minus, mulai dari 1 
                        if (viewModel.ArrayChecked[m].HasParent == true && viewModel.ArrayChecked[m].HasChild == false) {           //CHILD
                            if (viewModel.ArrayChecked[m].DisplayOrder <= 0 || viewModel.ArrayChecked[m].DisplayOrder == '' ||
                                viewModel.ArrayChecked[m].DisplayOrder == null || viewModel.ArrayChecked[m].DisplayOrder < 1) {
                                swal('Invalid!', 'Display Order value cannot be less than 1', 'warning', { closeOnClickOutside: false });
                                return;
                            } 
                        } else if (viewModel.ArrayChecked[m].HasParent == false && viewModel.ArrayChecked[m].HasChild == false) {   //BUKAN CHILD/PARENT
                            if (viewModel.ArrayChecked[m].DisplayOrder <= 0 || viewModel.ArrayChecked[m].DisplayOrder == '' ||
                                viewModel.ArrayChecked[m].DisplayOrder == null || viewModel.ArrayChecked[m].DisplayOrder < 1) {
                                swal('Invalid!', 'Display Order value cannot be less than 1', 'warning', { closeOnClickOutside: false });
                                return;
                            } 
                        }
                        //cek display order desimal
                        if ((viewModel.ArrayChecked[m].HasParent == true && viewModel.ArrayChecked[m].HasChild == false) ||
                            (viewModel.ArrayChecked[m].HasParent == false && viewModel.ArrayChecked[m].HasChild == false)) {
                            if (Number.isInteger(viewModel.ArrayChecked[m].DisplayOrder) == false) {
                                swal('Invalid!', 'Display Order value cannot be decimal', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                        }
                        //check 1 child dicentang, child lain dengan parent yg sama juga harus dicentang
                        if (viewModel.ArrayChecked[m].HasParent == true) {
                            var ParentCode = viewModel.ArrayChecked[m].ParentCode
                            var ChildList = []
                            for (child = 0; child < viewModel.ArrayChecked.length; child++) {
                                if (viewModel.ArrayChecked[child].ParentCode == ParentCode) {
                                    if (viewModel.ArrayChecked[child].IsDisplay == false) {
                                        ChildList.push(viewModel.ArrayChecked[child].SubTestName)
                                    }
                                }
                            }
                            if (ChildList.length > 0) {
                                swal('Invalid!', 'Subtest ' + ChildList + ' should be displayed to proceed', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                        }
                        if (viewModel.ArrayChecked[m].CutOffIQ < 0) {
                            swal('Invalid!', 'Cut Off IQ value must be integer', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                    }
                }
                //add subtest jika sebelumnya sudah ada list subtest
                if (viewModel.CutOffDetail.length > 0) {
                    for (b = 0; b < viewModel.CutOffDetail.length; b++) {
                        if (viewModel.CutOffDetail[b].item.length > 0) {
                            //cek subtest belum pernah ditambahkan dalam list bysubtest
                            if (viewModel.CutOffDetail[b].item[b].TestTypeName == viewModel.TestTypeName &&
                                viewModel.CutOffDetail[b].item[b].TestToolName == viewModel.TestToolName 
                                //viewModel.CutOffDetail[b].item[b].SubTestName == viewModel.ArrayChecked[i].SubTestName &&
                                //viewModel.CutOffDetail[b].item[b].IsDisplay == viewModel.ArrayChecked[i].IsDisplay &&
                                //viewModel.CutOffDetail[b].item[b].CutOffScore == viewModel.ArrayChecked[i].CutOffScore &&
                                //viewModel.CutOffDetail[b].item[b].DisplayOrder == viewModel.ArrayChecked[i].DisplayOrder
                            ) {
                                swal('Failed', 'Sub Test is already added', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                            else if (viewModel.CutOffDetail[b].item[b].TestTypeCode !== viewModel.ArrayChecked[i].TestTypeCode ||
                                viewModel.CutOffDetail[b].item[b].TestToolCode !== viewModel.ArrayChecked[i].TestToolCode) {
                                if (viewModel.ArrayChecked[i].IsDisplay == true) {
                                    if (tempDisplay.length !== 0) {
                                        tempDisplay = [];
                                    }
                                    for (k = 0; k < viewModel.ArrayChecked.length; k++) {
                                        if (viewModel.ArrayChecked[k].IsDisplay == true) {
                                            if ((viewModel.ArrayChecked[k].HasParent == true && viewModel.ArrayChecked[k].HasChild == false) ||
                                                (viewModel.ArrayChecked[k].HasParent == false && viewModel.ArrayChecked[k].HasChild == false)) {
                                                tempDisplay.push(viewModel.ArrayChecked[k]);
                                            }
                                        }
                                    }
                                    //cek display order maksimum sejumlah subtest yang ditick untuk di Display
                                    for (l = 0; l < tempDisplay.length; l++) {
                                        if ((tempDisplay[l].HasParent == true && tempDisplay[l].HasChild == false) ||
                                            (tempDisplay[l].HasParent == false && tempDisplay[l].HasChild == false)) {
                                            if (tempDisplay[l].DisplayOrder > tempDisplay.length) {
                                                swal('Invalid!', 'Display order is not valid. Please set display order with ordered number', 'warning', { closeOnClickOutside: false });
                                                return;
                                            }
                                        }
                                    }
                                    //cek display order duplikat
                                    if (tempDisplay.length > 1) {
                                        for (t = 0; t < tempDisplay.length; t++) {
                                            var repeatedDisplayOrder = [];
                                            for (var t in tempDisplay) {
                                                if ((tempDisplay[t].HasParent == true && tempDisplay[t].HasChild == false) ||
                                                    (tempDisplay[t].HasParent == false && tempDisplay[t].HasChild == false)) {
                                                    var exists_displayOrder_len = $.map(tempDisplay, function (n, i) {
                                                        if (n.DisplayOrder == tempDisplay[t].DisplayOrder) {
                                                            return i;
                                                        }
                                                    }).length;
                                                    if (exists_displayOrder_len > 1) {
                                                        repeatedDisplayOrder.push(tempDisplay[t].SubTestCode);
                                                    }
                                                }
                                            }
                                        }
                                        if (repeatedDisplayOrder.length > 0) {
                                            swal('Invalid!', 'Duplicate Display Order', 'warning', { closeOnClickOutside: false });
                                            return;
                                        } else {
                                            for (i = 0; i < viewModel.ArrayChecked.length; i++) {
                                                //array subtest yg didisplay
                                                if (viewModel.ArrayChecked[i].IsDisplay == true) {
                                                    arrBySub.push({
                                                        CutOffScore: viewModel.ArrayChecked[i].CutOffScore,
                                                        DisplayOrder: viewModel.ArrayChecked[i].DisplayOrder,
                                                        HasChild: viewModel.ArrayChecked[i].HasChild,
                                                        HasIQ: viewModel.ArrayChecked[i].HasIQ,
                                                        HasParent: viewModel.ArrayChecked[i].HasParent,
                                                        IsDisplay: viewModel.ArrayChecked[i].IsDisplay,
                                                        ParentCode: viewModel.ArrayChecked[i].ParentCode,
                                                        ParentName: viewModel.ArrayChecked[i].ParentName,
                                                        SubTestCode: viewModel.ArrayChecked[i].SubTestCode,
                                                        SubTestName: viewModel.ArrayChecked[i].SubTestName,
                                                        TestToolCode: viewModel.ArrayChecked[i].TestToolCode,
                                                        TestToolName: viewModel.ArrayChecked[i].TestToolName,
                                                        TestTypeCode: viewModel.ArrayChecked[i].TestTypeCode,
                                                        TestTypeName: viewModel.ArrayChecked[i].TestTypeName,
                                                        DisplayOrderTestTool: viewModel.ArrayChecked[i].DisplayOrderTestTool || 0,
                                                        IsConfigIQ: viewModel.IsConfigIQ,
                                                        CutOffIQCheckBox: viewModel.CutOffIQCheckBox,
                                                        CutOffIQ: viewModel.CutOffIQ,
                                                        NormScoreIQCode: viewModel.ArrayChecked[i].NormScoreIQCode
                                                    });
                                                }
                                                //array semua subtest yg memuat subtest display
                                                arrSemuaSubTestTool.push({
                                                    CutOffScore: viewModel.ArrayChecked[i].CutOffScore,
                                                    DisplayOrder: viewModel.ArrayChecked[i].DisplayOrder,
                                                    HasChild: viewModel.ArrayChecked[i].HasChild,
                                                    HasIQ: viewModel.ArrayChecked[i].HasIQ,
                                                    HasParent: viewModel.ArrayChecked[i].HasParent,
                                                    IsDisplay: viewModel.ArrayChecked[i].IsDisplay,
                                                    ParentCode: viewModel.ArrayChecked[i].ParentCode,
                                                    ParentName: viewModel.ArrayChecked[i].ParentName,
                                                    SubTestCode: viewModel.ArrayChecked[i].SubTestCode,
                                                    SubTestName: viewModel.ArrayChecked[i].SubTestName,
                                                    TestToolCode: viewModel.ArrayChecked[i].TestToolCode,
                                                    TestToolName: viewModel.ArrayChecked[i].TestToolName,
                                                    TestTypeCode: viewModel.ArrayChecked[i].TestTypeCode,
                                                    TestTypeName: viewModel.ArrayChecked[i].TestTypeName,
                                                    DisplayOrderTestTool: viewModel.ArrayChecked[i].DisplayOrderTestTool || 0,
                                                    IsConfigIQ: viewModel.IsConfigIQ,
                                                    CutOffIQCheckBox: viewModel.CutOffIQCheckBox,
                                                    CutOffIQ: viewModel.CutOffIQ,
                                                    NormScoreIQCode: viewModel.ArrayChecked[i].NormScoreIQCode
                                                });
                                            }
                                            if (viewModel.bySubList.length > 0) {
                                                viewModel.bySubList = $.merge(viewModel.bySubList, arrSemuaSubTestTool);
                                            }
                                        }
                                    } else {
                                        //jika hanya pilih 1 subtest (tidak perlu validasi duplikasi display order)
                                        for (i = 0; i < viewModel.ArrayChecked.length; i++) {
                                            //array subtest yg didisplay
                                            if (viewModel.ArrayChecked[i].IsDisplay == true) {
                                                arrBySub.push({
                                                    CutOffScore: viewModel.ArrayChecked[i].CutOffScore,
                                                    DisplayOrder: viewModel.ArrayChecked[i].DisplayOrder,
                                                    HasChild: viewModel.ArrayChecked[i].HasChild,
                                                    HasIQ: viewModel.ArrayChecked[i].HasIQ,
                                                    HasParent: viewModel.ArrayChecked[i].HasParent,
                                                    IsDisplay: viewModel.ArrayChecked[i].IsDisplay,
                                                    ParentCode: viewModel.ArrayChecked[i].ParentCode,
                                                    ParentName: viewModel.ArrayChecked[i].ParentName,
                                                    SubTestCode: viewModel.ArrayChecked[i].SubTestCode,
                                                    SubTestName: viewModel.ArrayChecked[i].SubTestName,
                                                    TestToolCode: viewModel.ArrayChecked[i].TestToolCode,
                                                    TestToolName: viewModel.ArrayChecked[i].TestToolName,
                                                    TestTypeCode: viewModel.ArrayChecked[i].TestTypeCode,
                                                    TestTypeName: viewModel.ArrayChecked[i].TestTypeName,
                                                    DisplayOrderTestTool: viewModel.ArrayChecked[i].DisplayOrderTestTool || 0,
                                                    IsConfigIQ: viewModel.IsConfigIQ,
                                                    CutOffIQCheckBox: viewModel.CutOffIQCheckBox,
                                                    CutOffIQ: viewModel.CutOffIQ,
                                                    NormScoreIQCode: viewModel.ArrayChecked[i].NormScoreIQCode
                                                });
                                            }
                                            //array semua subtest yg memuat subtest display
                                            arrSemuaSubTestTool.push({
                                                CutOffScore: viewModel.ArrayChecked[i].CutOffScore,
                                                DisplayOrder: viewModel.ArrayChecked[i].DisplayOrder,
                                                HasChild: viewModel.ArrayChecked[i].HasChild,
                                                HasIQ: viewModel.ArrayChecked[i].HasIQ,
                                                HasParent: viewModel.ArrayChecked[i].HasParent,
                                                IsDisplay: viewModel.ArrayChecked[i].IsDisplay,
                                                ParentCode: viewModel.ArrayChecked[i].ParentCode,
                                                ParentName: viewModel.ArrayChecked[i].ParentName,
                                                SubTestCode: viewModel.ArrayChecked[i].SubTestCode,
                                                SubTestName: viewModel.ArrayChecked[i].SubTestName,
                                                TestToolCode: viewModel.ArrayChecked[i].TestToolCode,
                                                TestToolName: viewModel.ArrayChecked[i].TestToolName,
                                                TestTypeCode: viewModel.ArrayChecked[i].TestTypeCode,
                                                TestTypeName: viewModel.ArrayChecked[i].TestTypeName,
                                                DisplayOrderTestTool: viewModel.ArrayChecked[i].DisplayOrderTestTool || 0,
                                                IsConfigIQ: viewModel.IsConfigIQ,
                                                CutOffIQCheckBox: viewModel.CutOffIQCheckBox,
                                                CutOffIQ: viewModel.CutOffIQ,
                                                NormScoreIQCode: viewModel.ArrayChecked[i].NormScoreIQCode
                                            });
                                        }
                                        if (viewModel.bySubList.length > 0) {
                                            viewModel.bySubList = $.merge(viewModel.bySubList, arrSemuaSubTestTool);
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    //add subtest baru
                    if (viewModel.ArrayChecked[i].IsDisplay == true) {
                        if (tempDisplay.length !== 0) {
                            tempDisplay = [];
                        }
                        for (k = 0; k < viewModel.ArrayChecked.length; k++) {
                            if (viewModel.ArrayChecked[k].IsDisplay == true) {
                                if ((viewModel.ArrayChecked[k].HasParent == true && viewModel.ArrayChecked[k].HasChild == false) ||
                                    (viewModel.ArrayChecked[k].HasParent == false && viewModel.ArrayChecked[k].HasChild == false)
                                    ) {
                                    tempDisplay.push(viewModel.ArrayChecked[k]);
                                }
                            }
                        }
                        //cek display order maksimum sejumlah subtest yang ditick untuk di Display
                        for (l = 0; l < tempDisplay.length; l++) {
                            if ((tempDisplay[l].HasParent == true && tempDisplay[l].HasChild == false) ||
                                (tempDisplay[l].HasParent == false && tempDisplay[l].HasChild == false)) {
                                if (tempDisplay[l].DisplayOrder > tempDisplay.length) {
                                    swal('Invalid!', 'Display order is not valid. Please set display order with ordered number', 'warning', { closeOnClickOutside: false });
                                    return;
                                }
                            }
                        }
                        if (tempDisplay.length > 1) {
                            //cek display order duplikat (add >1 subtest baru)
                            for (t = 0; t < tempDisplay.length; t++) {
                                var repeatedDisplayOrder = [];
                                for (var t in tempDisplay) {
                                    if ((tempDisplay[t].HasParent == true && tempDisplay[t].HasChild == false) ||
                                        (tempDisplay[t].HasParent == false && tempDisplay[t].HasChild == false)) {
                                        var exists_displayOrder_len = $.map(tempDisplay, function (n, i) {
                                            if (n.DisplayOrder == tempDisplay[t].DisplayOrder) {
                                                return i;
                                            }
                                        }).length;
                                        if (exists_displayOrder_len > 1) {
                                            repeatedDisplayOrder.push(tempDisplay[t].SubTestCode);
                                        }
                                    }
                                }
                            }

                            if (repeatedDisplayOrder.length > 0) {
                                swal('Invalid!', 'Duplicate Display Order', 'warning', { closeOnClickOutside: false });
                                return;
                            } else {
                                for (i = 0; i < viewModel.ArrayChecked.length; i++) {
                                    //array subtest yg didisplay
                                    if (viewModel.ArrayChecked[i].IsDisplay == true) {
                                        arrBySub.push({
                                            CutOffScore: viewModel.ArrayChecked[i].CutOffScore,
                                            DisplayOrder: viewModel.ArrayChecked[i].DisplayOrder,
                                            HasChild: viewModel.ArrayChecked[i].HasChild,
                                            HasIQ: viewModel.ArrayChecked[i].HasIQ,
                                            HasParent: viewModel.ArrayChecked[i].HasParent,
                                            IsDisplay: viewModel.ArrayChecked[i].IsDisplay,
                                            ParentCode: viewModel.ArrayChecked[i].ParentCode,
                                            ParentName: viewModel.ArrayChecked[i].ParentName,
                                            SubTestCode: viewModel.ArrayChecked[i].SubTestCode,
                                            SubTestName: viewModel.ArrayChecked[i].SubTestName,
                                            TestToolCode: viewModel.ArrayChecked[i].TestToolCode,
                                            TestToolName: viewModel.ArrayChecked[i].TestToolName,
                                            TestTypeCode: viewModel.ArrayChecked[i].TestTypeCode,
                                            TestTypeName: viewModel.ArrayChecked[i].TestTypeName,
                                            DisplayOrderTestTool: viewModel.ArrayChecked[i].DisplayOrderTestTool || 0,
                                            IsConfigIQ: viewModel.IsConfigIQ,
                                            CutOffIQCheckBox: viewModel.CutOffIQCheckBox,
                                            CutOffIQ: viewModel.CutOffIQ,
                                            NormScoreIQCode: viewModel.ArrayChecked[i].NormScoreIQCode
                                        });
                                    }
                                    //array semua subtest yg memuat subtest display
                                    arrSemuaSubTestTool.push({
                                        CutOffScore: viewModel.ArrayChecked[i].CutOffScore,
                                        DisplayOrder: viewModel.ArrayChecked[i].DisplayOrder,
                                        HasChild: viewModel.ArrayChecked[i].HasChild,
                                        HasIQ: viewModel.ArrayChecked[i].HasIQ,
                                        HasParent: viewModel.ArrayChecked[i].HasParent,
                                        IsDisplay: viewModel.ArrayChecked[i].IsDisplay,
                                        ParentCode: viewModel.ArrayChecked[i].ParentCode,
                                        ParentName: viewModel.ArrayChecked[i].ParentName,
                                        SubTestCode: viewModel.ArrayChecked[i].SubTestCode,
                                        SubTestName: viewModel.ArrayChecked[i].SubTestName,
                                        TestToolCode: viewModel.ArrayChecked[i].TestToolCode,
                                        TestToolName: viewModel.ArrayChecked[i].TestToolName,
                                        TestTypeCode: viewModel.ArrayChecked[i].TestTypeCode,
                                        TestTypeName: viewModel.ArrayChecked[i].TestTypeName,
                                        DisplayOrderTestTool: viewModel.ArrayChecked[i].DisplayOrderTestTool || 0,
                                        IsConfigIQ: viewModel.IsConfigIQ,
                                        CutOffIQCheckBox: viewModel.CutOffIQCheckBox,
                                        CutOffIQ: viewModel.CutOffIQ,
                                        NormScoreIQCode: viewModel.ArrayChecked[i].NormScoreIQCode
                                    });
                                    viewModel.set('bySubList', arrSemuaSubTestTool);
                                }
                            }
                        } else {
                            //add 1 subtest baru
                            for (i = 0; i < viewModel.ArrayChecked.length; i++) {
                                //array subtest yg didisplay
                                if (viewModel.ArrayChecked[i].IsDisplay == true) {
                                    arrBySub.push({
                                        CutOffScore: viewModel.ArrayChecked[i].CutOffScore,
                                        DisplayOrder: viewModel.ArrayChecked[i].DisplayOrder,
                                        HasChild: viewModel.ArrayChecked[i].HasChild,
                                        HasIQ: viewModel.ArrayChecked[i].HasIQ,
                                        HasParent: viewModel.ArrayChecked[i].HasParent,
                                        IsDisplay: viewModel.ArrayChecked[i].IsDisplay,
                                        ParentCode: viewModel.ArrayChecked[i].ParentCode,
                                        ParentName: viewModel.ArrayChecked[i].ParentName,
                                        SubTestCode: viewModel.ArrayChecked[i].SubTestCode,
                                        SubTestName: viewModel.ArrayChecked[i].SubTestName,
                                        TestToolCode: viewModel.ArrayChecked[i].TestToolCode,
                                        TestToolName: viewModel.ArrayChecked[i].TestToolName,
                                        TestTypeCode: viewModel.ArrayChecked[i].TestTypeCode,
                                        TestTypeName: viewModel.ArrayChecked[i].TestTypeName,
                                        DisplayOrderTestTool: viewModel.ArrayChecked[i].DisplayOrderTestTool || 0,
                                        IsConfigIQ: viewModel.IsConfigIQ,
                                        CutOffIQCheckBox: viewModel.CutOffIQCheckBox,
                                        CutOffIQ: viewModel.CutOffIQ,
                                        NormScoreIQCode: viewModel.ArrayChecked[i].NormScoreIQCode
                                    });
                                }
                                //array semua subtest yg memuat subtest display
                                arrSemuaSubTestTool.push({
                                    CutOffScore: viewModel.ArrayChecked[i].CutOffScore,
                                    DisplayOrder: viewModel.ArrayChecked[i].DisplayOrder,
                                    HasChild: viewModel.ArrayChecked[i].HasChild,
                                    HasIQ: viewModel.ArrayChecked[i].HasIQ,
                                    HasParent: viewModel.ArrayChecked[i].HasParent,
                                    IsDisplay: viewModel.ArrayChecked[i].IsDisplay,
                                    ParentCode: viewModel.ArrayChecked[i].ParentCode,
                                    ParentName: viewModel.ArrayChecked[i].ParentName,
                                    SubTestCode: viewModel.ArrayChecked[i].SubTestCode,
                                    SubTestName: viewModel.ArrayChecked[i].SubTestName,
                                    TestToolCode: viewModel.ArrayChecked[i].TestToolCode,
                                    TestToolName: viewModel.ArrayChecked[i].TestToolName,
                                    TestTypeCode: viewModel.ArrayChecked[i].TestTypeCode,
                                    TestTypeName: viewModel.ArrayChecked[i].TestTypeName,
                                    DisplayOrderTestTool: viewModel.ArrayChecked[i].DisplayOrderTestTool || 0,
                                    IsConfigIQ: viewModel.IsConfigIQ,
                                    CutOffIQCheckBox: viewModel.CutOffIQCheckBox,
                                    CutOffIQ: viewModel.CutOffIQ,
                                    NormScoreIQCode: viewModel.ArrayChecked[i].NormScoreIQCode
                                });
                                viewModel.set('bySubList', arrSemuaSubTestTool);
                            }
                        }
                    }
                }
            }
        }
    }
    else {
        //detail sub test
        for (z = 0; z < viewModel.listDetailSubTest.length; z++) {
            //check parent display, child must be displayed too
            if (viewModel.listDetailSubTest[z].HasChild == true) {
                var ParentCode = viewModel.listDetailSubTest[z].SubTestCode
                var ChildList = []
                if (viewModel.listDetailSubTest[z].CutOffScore > 0) {
                    viewModel.set('listDetailSubTest[' + z + '].IsDisplay', true)
                    for (child = 0; child < viewModel.listDetailSubTest.length; child++) {
                        if (viewModel.listDetailSubTest[child].ParentCode == ParentCode) {
                            if (viewModel.listDetailSubTest[child].IsDisplay == false) {
                                ChildList.push(viewModel.listDetailSubTest[child].SubTestName)
                            }
                        }
                    }
                    if (ChildList.length > 0) {
                        swal('Invalid!', 'Subtest ' + ChildList + ' should be displayed to proceed', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
            if (viewModel.listDetailSubTest[z].IsDisplay == true) {
                //validasi cut off score & display order
                for (n = 0; n < viewModel.listDetailSubTest.length; n++) {
                    if (viewModel.listDetailSubTest[n].IsDisplay == true) {
                        //if (viewModel.listDetailSubTest[n].CutOffScore <= 0 && ((viewModel.listDetailSubTest[n].HasChild == true && viewModel.listDetailSubTest[n].HasParent == false) || (viewModel.listDetailSubTest[n].HasChild == false && viewModel.listDetailSubTest[n].HasParent == false))) {
                        //    swal('Invalid!', 'Cut Off Score should be in a range of ' + viewModel.listDetailSubTest[n].TestToolName + ' config score', 'warning', { closeOnClickOutside: false });
                        //    return;
                        //}
                        if (Number.isInteger(viewModel.listDetailSubTest[n].CutOffScore) == false) {
                            swal('Invalid!', 'Cut Off Score value cannot be decimal', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                        //cek display order 0, null, minus, mulai dari 1
                        if (viewModel.listDetailSubTest[n].HasParent == true && viewModel.listDetailSubTest[n].HasChild == false) {             //CHILD
                            if (viewModel.listDetailSubTest[n].DisplayOrder <= 0 || viewModel.listDetailSubTest[n].DisplayOrder == '' ||
                                viewModel.listDetailSubTest[n].DisplayOrder == null || viewModel.listDetailSubTest[n].DisplayOrder < 1) {
                                swal('Invalid!', 'Display Order value cannot be less than 1', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                        } else if (viewModel.listDetailSubTest[n].HasParent == false && viewModel.listDetailSubTest[n].HasChild == false) {     //BUKAN CHILD/PARENT
                            if (viewModel.listDetailSubTest[n].DisplayOrder <= 0 || viewModel.listDetailSubTest[n].DisplayOrder == '' ||
                                viewModel.listDetailSubTest[n].DisplayOrder == null || viewModel.listDetailSubTest[n].DisplayOrder < 1) {
                                swal('Invalid!', 'Display Order value cannot be less than 1', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                        }
                        //cek display order desimal
                        if ((viewModel.listDetailSubTest[n].HasParent == true && viewModel.listDetailSubTest[n].HasChild == false) ||
                            (viewModel.listDetailSubTest[n].HasParent == false && viewModel.listDetailSubTest[n].HasChild == false)) {
                            if (Number.isInteger(viewModel.listDetailSubTest[n].DisplayOrder) == false) {
                                swal('Invalid!', 'Display Order value cannot be decimal', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                        }
                        //check 1 child dicentang, child lain dengan parent yg sama juga harus dicentang
                        if (viewModel.listDetailSubTest[n].HasParent == true) {
                            var ParentCode = viewModel.listDetailSubTest[n].ParentCode
                            var ChildList = []
                            for (child = 0; child < viewModel.listDetailSubTest.length; child++) {
                                if (viewModel.listDetailSubTest[child].ParentCode == ParentCode) {
                                    if (viewModel.listDetailSubTest[child].IsDisplay == false) {
                                        ChildList.push(viewModel.listDetailSubTest[child].SubTestName)
                                    }
                                }
                            }
                            if (ChildList.length > 0) {
                                swal('Invalid!', 'Subtest ' + ChildList + ' should be displayed to proceed', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                        }
                        //check CutOffIQ < 0
                        if (viewModel.listDetailSubTest[n].CutOffIQ < 0) {
                            swal('Invalid!', 'Cut Off IQ value must be integer', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                    }
                }
                //edit tambah subtest
                if (viewModel.CutOffDetail.length > 0) {
                    for (b = 0; b < viewModel.CutOffDetail.length; b++) {
                        if (viewModel.CutOffDetail[b].item.length > 0) {
                            var updatedListAwal = viewModel.listDetailSubTest.filter(function (obj) {
                                return obj.IsDisplay !== false
                            });
                            if (updatedList.length !== 0) {
                                updatedList = [];
                            }
                            for (ula = 0; ula < updatedListAwal.length; ula++) {
                                if ((updatedListAwal[ula].HasParent == true && updatedListAwal[ula].HasChild == false) ||
                                    (updatedListAwal[ula].HasParent == false && updatedListAwal[ula].HasChild == false)) {
                                    updatedList.push(updatedListAwal[ula])
                                }
                            }
                            //cek display order maksimum sejumlah subtest yang ditick untuk di Display
                            for (l = 0; l < updatedList.length; l++) {
                                if ((updatedList[l].HasParent == true && updatedList[l].HasChild == false) ||
                                    (updatedList[l].HasParent == false && updatedList[l].HasChild == false)) {
                                    if (updatedList[l].DisplayOrder > updatedList.length) {
                                        swal('Invalid!', 'Display order is not valid. Please set display order with ordered number', 'warning', { closeOnClickOutside: false });
                                        return;
                                    }
                                }
                            }
                            //cek duplikasi display order
                            if (updatedListAwal.length > 1) {
                                var updatedListSameSubTest = updatedListAwal.filter(function (obj) {
                                    return obj.TestToolCode == viewModel.TestToolCode;
                                });
                                var repeatedDisplayOrder = [];
                                for (t = 0; t < updatedListSameSubTest.length; t++) {
                                    if ((updatedListSameSubTest[t].HasParent == true && updatedListSameSubTest[t].HasChild == false) ||
                                        (updatedListSameSubTest[t].HasParent == false && updatedListSameSubTest[t].HasChild == false)) {
                                        var exists_displayOrder_len = $.map(updatedListSameSubTest, function (n, i) {
                                            if (n.DisplayOrder == updatedListSameSubTest[t].DisplayOrder) {
                                                return i;
                                            }
                                        }).length;
                                        if (exists_displayOrder_len > 1) {
                                            repeatedDisplayOrder.push(updatedListSameSubTest[t].SubTestCode);
                                        }
                                    }
                                }
                                if (repeatedDisplayOrder.length > 0) {
                                    swal('Invalid!', 'Duplicate Display Order', 'warning', { closeOnClickOutside: false });
                                    return;
                                } else {
                                    var valueSubTested = updatedList;
                                    break;
                                }
                            } else {
                                //jika hanya pilih 1 subtest (tidak perlu validasi duplikasi display order)
                                var valueSubTested = updatedList;
                                break;
                            }
                        }
                    }
                }
            } else {
                //edit kurangi data
                var delDataAwal = viewModel.listDetailSubTest.filter(function (obj) {
                    return obj.IsDisplay !== false;
                });
                for (dda = 0; dda < delDataAwal.length; dda++) {
                    if ((delDataAwal[dda].HasParent == true && delDataAwal[dda].HasChild == false) ||
                        (delDataAwal[dda].HasParent == false && delDataAwal[dda].HasChild == false)) {
                        delData.push(delDataAwal[dda])
                    }
                }
                if (viewModel.selectedDisplayOrder > delData.length) {
                    swal('Invalid!', 'Display order is not valid. Please set display order with ordered number', 'warning', { closeOnClickOutside: false });
                        return;
                }
                localStorage.setItem("BySubTest", JSON.stringify(delDataAwal));
                valueSubTested = JSON.parse(localStorage.getItem("BySubTest"));
                viewModel.set('selectedDisplayOrder', 0)
            }
        }
    }    

    if (viewModel.detailSubTest == true) {
        //edit subtest
        if (viewModel.CutOffDetail.length > 0) {
            for (a = 0; a < viewModel.CutOffDetail.length; a++) {
                if (viewModel.CutOffDetail[a].id == viewModel.TestToolCode) {
                    viewModel.set("CutOffDetail[" + a + "].item", updatedListAwal);
                }
            }
        }
        gridListCutOff(viewModel.CutOffDetail);
        var arrListBySubTest = []
        for (b = 0; b < viewModel.bySubList.length; b++) {
            if (viewModel.bySubList[b].IsDisplay == true) {
                arrListBySubTest.push({
                    CutOffScore: viewModel.bySubList[b].CutOffScore,
                    DisplayOrder: viewModel.bySubList[b].DisplayOrder,
                    HasChild: viewModel.bySubList[b].HasChild,
                    HasIQ: viewModel.bySubList[b].HasIQ,
                    HasParent: viewModel.bySubList[b].HasParent,
                    IsDisplay: viewModel.bySubList[b].IsDisplay,
                    ParentCode: viewModel.bySubList[b].ParentCode,
                    ParentName: viewModel.bySubList[b].ParentName,
                    SubTestCode: viewModel.bySubList[b].SubTestCode,
                    SubTestName: viewModel.bySubList[b].SubTestName,
                    TestToolCode: viewModel.bySubList[b].TestToolCode,
                    TestToolName: viewModel.bySubList[b].TestToolName,
                    TestTypeCode: viewModel.bySubList[b].TestTypeCode,
                    TestTypeName: viewModel.bySubList[b].TestTypeName,
                    IsByTest: viewModel.bySubList[b].IsByTest,
                    length: viewModel.bySubList[b].length,
                    DisplayOrderTestTool: viewModel.bySubList[b].DisplayOrderTestTool || 0,
                    IsConfigIQ: viewModel.IsConfigIQ,
                    CutOffIQCheckBox: viewModel.bySubList[b].CutOffIQCheckBox,
                    CutOffIQ: viewModel.bySubList[b].CutOffIQ,
                    NormScoreIQCode: viewModel.bySubList[b].NormScoreIQCode
                })
            }
        }
        viewModel.set('listBySubTest', arrListBySubTest);
    }
    else {
        //add subtest
        listSubTested = $.merge(viewModel.listBySubTest, arrBySub);
        localStorage.setItem("BySubTest", JSON.stringify(listSubTested));
        var getData = localStorage.getItem("BySubTest");
        // assign to sublist (save)
        viewModel.set('listBySubTest', listSubTested);
        onLoadData();
    }

    // close window
    $("#dialog").data("kendoWindow").close();
}
TempTest = function () {
    // local safe test
    var tempDisplay = [];
    var tempDisplayVS = [];
    var arrBySub = [];
    var arrByVS = [];
    var updatedVSList = [];

    if (viewModel.detailTest == false) {
        //SUBTEST BY TEST
        for (i = 0; i < viewModel.ArrayCheckedTest.length; i++) {
            //validasi cut off score
            for (j = 0; j < viewModel.ArrayCheckedTest.length; j++) {
                if (viewModel.ArrayCheckedTest[j].CutOffScore < 0) {
                    swal('Invalid!', 'Cut Off Score can not be less than 0', 'warning', { closeOnClickOutside: false });
                    return;
                }
                if (Number.isInteger(viewModel.ArrayCheckedTest[j].CutOffScore) == false) {
                    swal('Invalid!', 'Cut Off Score value cannot be decimal', 'warning', { closeOnClickOutside: false });
                    return;
                }
            }
            //add subtest jika sebelumnya sudah ada list subtest
            if (viewModel.CutOffDetails.length > 0) {
                for (b = 0; b < viewModel.CutOffDetails.length; b++) {
                    if (viewModel.CutOffDetails[b].item.length > 0) {
                        //cek subtest belum pernah ditambahkan dalam list bytest
                        if (viewModel.CutOffDetails[b].item[b].TestTypeName == viewModel.TestTypeName &&
                            viewModel.CutOffDetails[b].item[b].TestToolName == viewModel.TestToolName
                            //viewModel.CutOffDetails[b].item[b].SubTestName == viewModel.ArrayCheckedTest[i].SubTestName &&
                            //viewModel.CutOffDetails[b].item[b].IsDisplay == viewModel.ArrayCheckedTest[i].IsDisplay &&
                            //viewModel.CutOffDetails[b].item[b].CutOffScore == viewModel.ArrayCheckedTest[i].CutOffScore
                        ) {
                            swal('Failed', 'Test is already added', 'warning', { closeOnClickOutside: false });
                            return;
                        } else if (viewModel.CutOffDetails[b].item[b].TestTypeCode !== viewModel.ArrayCheckedTest[i].TestTypeCode ||
                            viewModel.CutOffDetails[b].item[b].TestToolCode !== viewModel.ArrayCheckedTest[i].TestToolCode) {
                            if (tempDisplay.length !== 0) {
                                tempDisplay = [];
                            }
                            for (k = 0; k < viewModel.ArrayCheckedTest.length; k++) {
                                    tempDisplay.push(viewModel.ArrayCheckedTest[k]);
                            }
                            for (i = 0; i < viewModel.ArrayCheckedTest.length; i++) {
                                //array subtest yg didisplay
                                arrBySub.push({
                                    TestTypeCode: viewModel.ArrayCheckedTest[i].TestTypeCode,
                                    TestTypeName: viewModel.ArrayCheckedTest[i].TestTypeName,
                                    TestToolCode: viewModel.ArrayCheckedTest[i].TestToolCode,
                                    TestToolName: viewModel.ArrayCheckedTest[i].TestToolName,
                                    SubTestCode: viewModel.ArrayCheckedTest[i].SubTestCode,
                                    SubTestName: viewModel.ArrayCheckedTest[i].SubTestName,
                                    IsByTest: true,
                                    IsDisplay: true,
                                    CutOffScore: viewModel.ArrayCheckedTest[i].CutOffScore,
                                    length: viewModel.ArrayCheckedTest[i].length,
                                    DisplayOrderTestTool: viewModel.DisplayOrderTestTool
                                });
                            }
                            if (viewModel.byTestSubTestList.length > 0) {
                                viewModel.byTestSubTestList = $.merge(viewModel.byTestSubTestList, arrBySub);
                            }
                        } else {
                            var updatedList = viewModel.ArrayCheckedTest;
                            localStorage.setItem("ByTest", JSON.stringify(updatedList));
                            var valueTested = JSON.parse(localStorage.getItem("ByTest"));
                            gridListCutOffs(valueTested);
                            break;
                        }
                    }
                }
            }
            else {
                //add subtest baru
                if (tempDisplay.length !== 0) {
                    tempDisplay = [];
                }
                for (k = 0; k < viewModel.ArrayCheckedTest.length; k++) {
                    tempDisplay.push(viewModel.ArrayCheckedTest[k]);
                }
                for (i = 0; i < viewModel.ArrayCheckedTest.length; i++) {
                    //array subtest yg didisplay
                    arrBySub.push({
                        TestTypeCode: viewModel.ArrayCheckedTest[i].TestTypeCode,
                        TestTypeName: viewModel.ArrayCheckedTest[i].TestTypeName,
                        TestToolCode: viewModel.ArrayCheckedTest[i].TestToolCode,
                        TestToolName: viewModel.ArrayCheckedTest[i].TestToolName,
                        SubTestCode: viewModel.ArrayCheckedTest[i].SubTestCode,
                        SubTestName: viewModel.ArrayCheckedTest[i].SubTestName,
                        IsByTest: true,
                        IsDisplay: true,
                        CutOffScore: viewModel.ArrayCheckedTest[i].CutOffScore,
                        length: viewModel.ArrayCheckedTest[i].length,
                        DisplayOrderTestTool: viewModel.DisplayOrderTestTool
                    });
                }
                viewModel.set('byTestSubTestList', arrBySub);
            }
        }

        //VALIDITYSCALE
        if (viewModel.ArrayCheckedTestValidityScale.length > 0) {
            for (i = 0; i < viewModel.ArrayCheckedTestValidityScale.length; i++) {
                //validasi cut off score
                for (j = 0; j < viewModel.ArrayCheckedTestValidityScale.length; j++) {
                    if (viewModel.ArrayCheckedTestValidityScale[j].CutOffScore < 0) {
                        swal('Invalid!', 'Cut off score can not be less than 0', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    if (Number.isInteger(viewModel.ArrayCheckedTestValidityScale[j].CutOffScore) == false) {
                        swal('Invalid!', 'Cut off score of validity scale value cannot be decimal', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
                //add subtest jika sebelumnya sudah ada list subtest
                if (viewModel.CutOffDetails.length > 0) {
                    for (b = 0; b < viewModel.CutOffDetails.length; b++) {
                        if (viewModel.CutOffDetails[b].item.length > 0) {
                            //cek subtest belum pernah ditambahkan dalam list bytest
                            if (viewModel.CutOffDetails[b].item[b].TestTypeName == viewModel.TestTypeName &&
                                viewModel.CutOffDetails[b].item[b].TestToolName == viewModel.TestToolName
                                //viewModel.CutOffDetails[b].item[b].ValidtyScaleName == viewModel.ArrayCheckedTestValidityScale[i].ValidtyScaleName &&
                                //viewModel.CutOffDetails[b].item[b].IsDisplay == viewModel.ArrayCheckedTestValidityScale[i].IsDisplay &&
                                //viewModel.CutOffDetails[b].item[b].CutOffScore == viewModel.ArrayCheckedTestValidityScale[i].CutOffScore
                            ) {
                                swal('Failed', 'Test is already added', 'warning', { closeOnClickOutside: false });
                                return;
                            } else if (viewModel.CutOffDetails[b].item[b].TestTypeCode !== viewModel.ArrayCheckedTestValidityScale[i].TestTypeCode ||
                                viewModel.CutOffDetails[b].item[b].TestToolCode !== viewModel.ArrayCheckedTestValidityScale[i].TestToolCode) {
                                if (tempDisplayVS.length !== 0) {
                                    tempDisplayVS = [];
                                }
                                for (k = 0; k < viewModel.ArrayCheckedTestValidityScale.length; k++) {
                                    tempDisplayVS.push(viewModel.ArrayCheckedTestValidityScale[k]);
                                }
                                for (i = 0; i < viewModel.ArrayCheckedTestValidityScale.length; i++) {
                                    //array subtest yg didisplay
                                    arrByVS.push({
                                        TestTypeCode: viewModel.ArrayCheckedTestValidityScale[i].TestTypeCode,
                                        TestTypeName: viewModel.ArrayCheckedTestValidityScale[i].TestTypeName,
                                        TestToolCode: viewModel.ArrayCheckedTestValidityScale[i].TestToolCode,
                                        TestToolName: viewModel.ArrayCheckedTestValidityScale[i].TestToolName,
                                        ValidityScaleCode: viewModel.ArrayCheckedTestValidityScale[i].ValidityScaleCode,
                                        ValidityScaleName: viewModel.ArrayCheckedTestValidityScale[i].ValidityScaleName,
                                        CutOffScore: viewModel.ArrayCheckedTestValidityScale[i].CutOffScore,
                                        DisplayOrderTestTool: viewModel.DisplayOrderTestTool
                                    });
                                }
                                if (viewModel.byTestValidityScaleList.length > 0) {
                                    viewModel.byTestValidityScaleList = $.merge(viewModel.byTestValidityScaleList, arrByVS);
                                } else {
                                    viewModel.byTestValidityScaleList = arrByVS
                                }
                            } else {
                                var updatedList = viewModel.ArrayCheckedTestValidityScale;
                                localStorage.setItem("ByTest", JSON.stringify(updatedList));
                                var valueTested = JSON.parse(localStorage.getItem("ByTest"));
                                gridListCutOffs(valueTested);
                                break;
                            }
                        }
                    }
                }
                else {
                    //add subtest baru
                    if (tempDisplayVS.length !== 0) {
                        tempDisplayVS = [];
                    }
                    for (k = 0; k < viewModel.ArrayCheckedTestValidityScale.length; k++) {
                        tempDisplayVS.push(viewModel.ArrayCheckedTestValidityScale[k]);
                    }
                    for (i = 0; i < viewModel.ArrayCheckedTestValidityScale.length; i++) {
                        //array subtest yg didisplay
                        arrByVS.push({
                            TestTypeCode: viewModel.ArrayCheckedTestValidityScale[i].TestTypeCode,
                            TestTypeName: viewModel.ArrayCheckedTestValidityScale[i].TestTypeName,
                            TestToolCode: viewModel.ArrayCheckedTestValidityScale[i].TestToolCode,
                            TestToolName: viewModel.ArrayCheckedTestValidityScale[i].TestToolName,
                            ValidityScaleCode: viewModel.ArrayCheckedTestValidityScale[i].ValidityScaleCode,
                            ValidityScaleName: viewModel.ArrayCheckedTestValidityScale[i].ValidityScaleName,
                            CutOffScore: viewModel.ArrayCheckedTestValidityScale[i].CutOffScore,
                            DisplayOrderTestTool: viewModel.DisplayOrderTestTool
                        });
                    }
                    viewModel.set('byTestValidityScaleList', arrByVS);
                }
            }
                    }
    }
    else {
        //detail sub test by test
        for (z = 0; z < viewModel.listDetailTest.length; z++) {
            //validasi cut off score
            for (n = 0; n < viewModel.listDetailTest.length; n++) {
                if (viewModel.listDetailTest[n].CutOffScore < 0) {
                    swal('Invalid!', 'Cut Off Score can not be less than 0', 'warning', { closeOnClickOutside: false });
                    return;
                }
                if (Number.isInteger(viewModel.listDetailTest[n].CutOffScore) == false) {
                    swal('Invalid!', 'Cut off score value cannot be decimal', 'warning', { closeOnClickOutside: false });
                    return;
                }
            }
            //edit subtest
            var updatedList = viewModel.listDetailTest
        }
        //detail validity scale by test
        if (viewModel.listDetailTestVS.length > 0) {
            for (z = 0; z < viewModel.listDetailTestVS.length; z++) {
                //validasi cut off score
                for (n = 0; n < viewModel.listDetailTestVS.length; n++) {
                    if (viewModel.listDetailTestVS[n].CutOffScore < 0) {
                        swal('Invalid!', 'Cut Off Score can not be less than 0', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    if (Number.isInteger(viewModel.listDetailTestVS[n].CutOffScore) == false) {
                        swal('Invalid!', 'Cut off score of validity scale value cannot be decimal', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
                //edit subtest
                updatedVSList = viewModel.listDetailTestVS
            }
        }
    }

    //once valid, process
    if (viewModel.detailTest == true) {
        //edit subtest
        if (updatedVSList.length > 0) {
            var updatedSubTestVSList = $.merge(updatedList, updatedVSList)
        } else {
            updatedSubTestVSList = updatedList
        }
        if (viewModel.CutOffDetails.length > 0) {
            for (a = 0; a < viewModel.CutOffDetails.length; a++) {
                if (viewModel.CutOffDetails[a].id == viewModel.TestToolCode) {
                    viewModel.set("CutOffDetails[" + a + "].item", updatedSubTestVSList);
                }
            }
        }
        gridListCutOffs(viewModel.CutOffDetails);
        var arrListByTest = [];
        var arrListVSByTest = [];
        for (b = 0; b < viewModel.byTestSubTestList.length; b++) {
            arrListByTest.push({
                TestTypeCode: viewModel.byTestSubTestList[b].TestTypeCode,
                TestTypeName: viewModel.byTestSubTestList[b].TestTypeName,
                TestToolCode: viewModel.byTestSubTestList[b].TestToolCode,
                TestToolName: viewModel.byTestSubTestList[b].TestToolName,
                SubTestCode: viewModel.byTestSubTestList[b].SubTestCode,
                SubTestName: viewModel.byTestSubTestList[b].SubTestName,
                CutOffScore: viewModel.byTestSubTestList[b].CutOffScore,
                DisplayOrder: viewModel.byTestSubTestList[b].DisplayOrder,
                DisplayOrderTestTool: viewModel.byTestSubTestList[b].DisplayOrderTestTool
            })
        }
        for (b = 0; b < viewModel.byTestValidityScaleList.length; b++) {
            arrListVSByTest.push({
                TestTypeCode: viewModel.byTestValidityScaleList[b].TestTypeCode,
                TestTypeName: viewModel.byTestValidityScaleList[b].TestTypeName,
                TestToolCode: viewModel.byTestValidityScaleList[b].TestToolCode,
                TestToolName: viewModel.byTestValidityScaleList[b].TestToolName,
                ValidityScaleCode: viewModel.byTestValidityScaleList[b].ValidityScaleCode,
                ValidityScaleName: viewModel.byTestValidityScaleList[b].ValidityScaleName,
                CutOffScore: viewModel.byTestValidityScaleList[b].CutOffScore,
                DisplayOrder: viewModel.byTestValidityScaleList[b].DisplayOrder,
                DisplayOrderTestTool: viewModel.byTestValidityScaleList[b].DisplayOrderTestTool
            })
        }
        var arrListSubTestVSByTest = $.merge(arrListByTest, arrListVSByTest)
        viewModel.set('listByTest', arrListSubTestVSByTest);
    }
    else {
        //add subtest by test
        var subVS = $.merge(arrBySub, arrByVS);
        var listTested = $.merge(viewModel.listByTest, subVS);
        localStorage.setItem("ByTest", JSON.stringify(listTested));
        var getData = localStorage.getItem("ByTest");
        // assign to subset
        viewModel.set('listByTest ', listTested);
        onLoads();
    }

    // close window
    $("#dialogByTest").data("kendoWindow").close();
}

CheckCompetency = function () {
    var BySubTestList = viewModel.CutOffDetail
    var ByTestList = viewModel.CutOffDetails;
    var arrSelectedCompetencyMatrix = viewModel.arrSelectedCompetencyMatrix;
    var arrBySubTest = [];
    var arrByTest = [];
    var nilaiSubTest = BySubTestList.length;
    var nilaiTest = ByTestList.length;

    if ((nilaiSubTest == null || nilaiSubTest == undefined || nilaiSubTest == 0) && (nilaiTest == null || nilaiTest == undefined || nilaiTest == 0)) {
        swal('Failed', 'Please select Sub Test or Test !', 'warning', { closeOnClickOutside: false });
        return;
    }

    if (nilaiSubTest > 0) {
        for (a = 0; a < nilaiSubTest; a++) {
            for (b = 0; b < BySubTestList[a].item.length; b++) {
                arrBySubTest.push(BySubTestList[a].item[b].SubTestCode);
            }
        }
    }
    if (nilaiTest > 0) {
        for (a = 0; a < nilaiTest; a++) {
            for (b = 0; b < ByTestList[a].item.length; b++) {
                if (ByTestList[a].item[b].SubTestCode) {
                    arrByTest.push(ByTestList[a].item[b].SubTestCode);
                }
            }
        }
    }

    if (arrBySubTest.length > 0 || arrByTest.length > 0) {
        var arrMergeBySubTestByTest = $.merge(arrBySubTest, arrByTest)
    }

    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/CutOff/CheckCompetency",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CompanyId: viewModel.CompanyID,
            SubTestCode: arrMergeBySubTestByTest
        },
        success: function (response) {
            if (response.Acknowledge < 1) {
                swal("Error", response.Message, "warning", { closeOnClickOutside: false });
            } else {
                if (response.CompetencyMatrixes.length == 0) {
                    swal("Failed!", "No competency matrix found", "warning", { closeOnClickOutside: false });
                } else {
                    viewModel.set("arrCompetency", response.CompetencyMatrixes);
                    showWindowCompetency();
                }
            }
        }
    });

    var coll = document.getElementsByClassName("collapsible");
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}
DeleteCompetency = function () {
    viewModel.arrSelectedCompetencyMatrix[0].set('Competencies', [])
    competenciesGrid()
    $('#gridCompetency').hide()
    $('#btnDeleteCompetency').hide()
}

showWindowCompetency = function () {
    var dialog = $("#dialogCheckCompetency");
    dialog.kendoWindow({
        minWidth: "500px",
        //height: 375,
        //top: 70,
        //left: "25%",
        title: "Please select one competency matrix",
        visible: false,
        actions: [
            "Close"
        ],
        open: onOpen,
        close: onClose

    });
    var dialogs = dialog.data("kendoWindow").center().open();
    //dialogs.center();
    $('.list-dataCompetency').removeAttr('hidden');

    for (c = 0; c < viewModel.arrCompetency.length; c++) {
        $('#dialogCheckCompetency > div.list-dataCompetency > div#isiCompetency input#isCheckCompetency' + c).length == 0 ?
            $('#dialogCheckCompetency > div.list-dataCompetency div#isiCompetency').append(
                '<input id="isCheckCompetency' + c + '" class="checkone" type="radio" name="checkCompetency" competencyMatrix="' + c + '" onchange="selectedCheckCompetency(this)" />'
            ) : null
        if (viewModel.arrSelectedCompetencyMatrix.length > 0) {
            if (viewModel.arrCompetency[c].CompetencyMatrixCode == viewModel.arrSelectedCompetencyMatrix[0].CompetencyMatrixCode) {
                viewModel.arrCompetency[c].set("IsDisplay", true)
                $("#isCheckCompetency" + c).prop('checked', true);
            } else {
                viewModel.arrCompetency[c].set("IsDisplay", false)
                $("#isCheckCompetency" + c).prop('checked', false);
            }
        }

        $('#dialogCheckCompetency > div.list-dataCompetency > div#isiCompetency button#competencyMatrixName' + c).length == 0 ?
            $('#dialogCheckCompetency > div.list-dataCompetency div#isiCompetency').append(
                '<button class="collapsible" id="competencyMatrixName' + c + '" competencyMatrix="' + c + '" >Competency Matrix A</button >'
            ) : null

        $('#competencyMatrixName' + c).html(viewModel.arrCompetency[c].CompetencyMatrixName);

        for (child = 0; child < viewModel.arrCompetency[c].Competencies.length; child++) {
            $('#dialogCheckCompetency > div.list-dataCompetency > div#isiCompetency div#content' + c).length == 0 ?
                $('#dialogCheckCompetency > div.list-dataCompetency > div#isiCompetency').append(
                    '<div class="content" id="content' + c + '">'+
                        '<ul class="form-content">' +
                            '<li>' +
                                '<label id="childCompetencyName' + child + c + '" competency="' + c + '">Competency 1</label>' +
                            '</li>' +
                        '</ul>'+
                    '</div>' +
                '<br/><br/>') : null

            $('#dialogCheckCompetency > div.list-dataCompetency > div#isiCompetency > div#content' + c + ' > ul.form-content > li label#childCompetencyName' + child + c).length == 0 ?
                $('#dialogCheckCompetency > div.list-dataCompetency > div#isiCompetency > div#content' + c + ' ul.form-content').append(
                    '<li>' +
                        '<label id="childCompetencyName' + child + c + '" competency="' + c + '">Competency 1</label>' +
                    '</li>'
                ) : null

            $("#childCompetencyName" + child + c).html(viewModel.arrCompetency[c].Competencies[child].CompetencyName);
        }
    }

    var coll = document.getElementsByClassName("collapsible");
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}

TempCheckCompetency = function () {
    var arrSelectedCompetencyMatrix = []
    var listCompetencyMatrix = viewModel.arrCompetency

    for (compMatrix = 0; compMatrix < listCompetencyMatrix.length; compMatrix++) {
        if (listCompetencyMatrix[compMatrix].IsDisplay == true) {
            arrSelectedCompetencyMatrix.push({
                CompetencyMatrixCode: listCompetencyMatrix[compMatrix].CompetencyMatrixCode,
                CompetencyMatrixName: listCompetencyMatrix[compMatrix].CompetencyMatrixName,
                Competencies: listCompetencyMatrix[compMatrix].Competencies,
                IsDisplay: listCompetencyMatrix[compMatrix].IsDisplay,
            })
        }
    }
    viewModel.set('arrSelectedCompetencyMatrix', arrSelectedCompetencyMatrix)

    // close window
    $("#dialogCheckCompetency").data("kendoWindow").close();
    competenciesGrid();
    $('#gridCompetency').show()
    $('#btnDeleteCompetency').show()
}

save = function (e) {
    var CutOffCode = viewModel.CutOffCode;
    var CutOffName = viewModel.CutOffName;
    var NameOnly = viewModel.NameOnly;
    var NameNumbering = viewModel.NameNumbering;
    var CompanyID = viewModel.CompanyID;
    var CompanyName = viewModel.CompanyName;
    var GradeID = viewModel.GradeID;
    var GradeName = viewModel.GradeName;
    var GeneralStatus = viewModel.GeneralStatus;
    var DisplayStatus = viewModel.DisplayStatus;
    var IsConfirm = viewModel.IsConfirm;

    var BySubTestList = viewModel.CutOffDetail;
    var ByTestList = viewModel.CutOffDetails;
    var arrSelectedCompetencyMatrix = viewModel.arrSelectedCompetencyMatrix;
    var ListBySubTest = []
    var ListByTest = []
    var arrComp = [];
    var arrBySubTest = [];
    var arrByTest = [];
    var arrByTestVS = [];
    var nilaiSubTest = BySubTestList.length;
    var nilaiTest = ByTestList.length;

    if ((nilaiSubTest == null || nilaiSubTest == undefined || nilaiSubTest == 0) && (nilaiTest == null || nilaiTest == undefined || nilaiTest == 0)) {
        swal('Failed!', 'Please select Sub Test or Test', 'warning', { closeOnClickOutside: false });
        return;
    }
    else {
        if (BySubTestList.length > 0) {
            for (a = 0; a < BySubTestList.length; a++) {
                if (BySubTestList[a].item.length > 0) {
                    if (arrBySubTest.length !== 0) {
                        arrBySubTest = []
                    }
                    for (b = 0; b < BySubTestList[a].item.length; b++) {
                        var TestTypeCode = BySubTestList[a].item[b].TestTypeCode
                        var TestToolCode = BySubTestList[a].item[b].TestToolCode
                        var IsConfigIQ = BySubTestList[a].item[b].IsConfigIQ
                        var ConfigScoreIQ = BySubTestList[a].item[b].CutOffIQ
                        var CutOffIQCheckBox = BySubTestList[a].item[b].CutOffIQCheckBox
                        var NormScoreIQCode = BySubTestList[a].item[b].NormScoreIQCode
                        var DisplayOrderTestTool = BySubTestList[a].item[b].DisplayOrderTestTool
                        arrBySubTest.push({
                            SubTestCode: BySubTestList[a].item[b].SubTestCode,
                            SubTestName: BySubTestList[a].item[b].SubTestName,
                            CutOffScore: BySubTestList[a].item[b].CutOffScore,
                            DisplayOrder: BySubTestList[a].item[b].DisplayOrder,
                            HasParent: BySubTestList[a].item[b].HasParent,
                            HasChild: BySubTestList[a].item[b].HasChild
                        });
                    }
                }
                ListBySubTest.push({
                    TestTypeCode: TestTypeCode,
                    TestToolCode: TestToolCode,
                    IsConfigIQ: IsConfigIQ,
                    CutOffIQCheckBox: CutOffIQCheckBox,
                    NormScoreIQCode: NormScoreIQCode,
                    ConfigScoreIQ: ConfigScoreIQ,
                    DisplayOrderTestTool: DisplayOrderTestTool,
                    SubTestList: arrBySubTest
                })
            }
        }
        if (ByTestList.length > 0) {
            for (a = 0; a < ByTestList.length; a++) {
                if (ByTestList[a].item.length > 0) {
                    if (arrByTest.length !== 0) {
                        arrByTest = []
                    }
                    if (arrByTestVS.length !== 0) {
                        arrByTestVS = []
                    }
                    for (b = 0; b < ByTestList[a].item.length; b++) {
                        var TestTypeCode = ByTestList[a].item[b].TestTypeCode
                        var TestToolCode = ByTestList[a].item[b].TestToolCode
                        var DisplayOrderTestTool = ByTestList[a].item[b].DisplayOrderTestTool
                        if (ByTestList[a].item[b].SubTestCode) {
                            arrByTest.push({
                                SubTestName: ByTestList[a].item[b].SubTestName,
                                SubTestCode: ByTestList[a].item[b].SubTestCode,
                                CutOffScore: ByTestList[a].item[b].CutOffScore,
                            });
                        }
                        if (ByTestList[a].item[b].ValidityScaleCode) {
                            var hasVS = true;
                            arrByTestVS.push({
                                ValidityScaleCode: ByTestList[a].item[b].ValidityScaleCode,
                                ValidityScaleName: ByTestList[a].item[b].ValidityScaleName,
                                CutOffScore: ByTestList[a].item[b].CutOffScore,
                            });
                        }
                    }
                }
                if (hasVS == true) {
                    ListByTest.push({
                        TestTypeCode: TestTypeCode,
                        TestToolCode: TestToolCode,
                        DisplayOrderTestTool: DisplayOrderTestTool,
                        SubTestList: arrByTest,
                        ValidityScaleList: arrByTestVS
                    })
                } else {
                    ListByTest.push({
                        TestTypeCode: TestTypeCode,
                        TestToolCode: TestToolCode,
                        DisplayOrderTestTool: DisplayOrderTestTool,
                        SubTestList: arrByTest,
                        ValidityScaleList: []
                    })
                }
            }
        } 
        //var arrSubTests = $.merge(arrBySubTest, arrByTest)
    }

    if (arrSelectedCompetencyMatrix.length > 0) {
        for (comp = 0; comp < arrSelectedCompetencyMatrix.length; comp++) {
            if (arrSelectedCompetencyMatrix[comp].Competencies.length > 0) {
                for (c = 0; c < arrSelectedCompetencyMatrix[comp].Competencies.length; c++) {
                    if (arrSelectedCompetencyMatrix[comp].Competencies[c].CutOffScore < 0) {
                        swal('Invalid!', 'Competency cut off score value must be integer', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    if (Number.isInteger(arrSelectedCompetencyMatrix[comp].Competencies[c].CutOffScore) == false) {
                        swal('Invalid!', 'Competency cut off score value cannot be decimal', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    arrComp.push({
                        CompetencyCode: arrSelectedCompetencyMatrix[comp].Competencies[c].CompetencyCode,
                        CompetencyName: arrSelectedCompetencyMatrix[comp].Competencies[c].CompetencyName,
                        CutOffScore: arrSelectedCompetencyMatrix[comp].Competencies[c].CutOffScore,
                    })
                }
                var CompetencyMatrix = {
                    CompetencyMatrixCode: arrSelectedCompetencyMatrix[comp].CompetencyMatrixCode,
                    Competencies: arrComp
                }
            } else {
                CompetencyMatrix = {}
            }
        }
    }
    else {
        CompetencyMatrix = {}
    }

    if (CutOffCode == '') {
        //ADD
        if (NameOnly == '' || CompanyName == '' || GradeName == '') {
            swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
        }
        else {
            var CutOffHeader = {
                CutOffCode: CutOffCode,
                CompanyID: CompanyID,
                GradeID: GradeID,
                CutOffName: NameOnly,
                IsGeneral: GeneralStatus,
                DisplayStatus: DisplayStatus
            }
            if (BySubTestList.length > 0) {
                for (a = 0; a < BySubTestList.length; a++) {
                    for (b = 0; b < BySubTestList[a].item.length; b++) {
                        if (BySubTestList[a].item[b].DisplayOrderTestTool > BySubTestList.length) {
                            swal('Failed!', 'Please set Display Order with the right number', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                        if (isNaN(BySubTestList[a].item[b].DisplayOrderTestTool) == true) {
                            swal('Invalid!', 'Display Order value cannot be null', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                        if (Number.isInteger(BySubTestList[a].item[b].DisplayOrderTestTool) == false) {
                            swal('Invalid!', 'Display Order value cannot be decimal', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                    }
                }
            }
            if (ByTestList.length > 0) {
                for (a = 0; a < ByTestList.length; a++) {
                    for (b = 0; b < ByTestList[a].item.length; b++) {
                        if (ByTestList[a].item[b].DisplayOrderTestTool > ByTestList.length) {
                            swal('Failed!', 'Please set Display Order with the right number', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                        if (isNaN(ByTestList[a].item[b].DisplayOrderTestTool) == true) {
                            swal('Invalid!', 'Display Order value cannot be null', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                        if (Number.isInteger(ByTestList[a].item[b].DisplayOrderTestTool) == false) {
                            swal('Invalid!', 'Display Order value cannot be decimal', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                    }
                }
            }

            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/CutOff/Save",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        CutOffHeader: CutOffHeader,
                        CompetencyMatrix: CompetencyMatrix,
                        ListBySubTest: ListBySubTest,
                        ListByTest: ListByTest,
                        IsConfirm: IsConfirm
                    },
                    success: function (response) {
                        if (response.Acknowledge < 1) {
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
                                swal("Failed!", response.Message, "warning", { closeOnClickOutside: false });
                            }
                        } else {
                            LoadingMask.hide();
                            swal("Good", response.Message, "success", { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + "Views/OnlineTesting/CutOff/CutOff.html";
                            });
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
        if (viewModel.act == 'editNew') {
            //EDIT NEW
            if (NameOnly == '' || CompanyName == '' || GradeName == '') {
                swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
            }
            else {
                var CutOffHeader = {
                    CutOffCode: CutOffCode,
                    CompanyID: CompanyID,
                    GradeID: GradeID,
                    CutOffName: NameOnly,
                    IsGeneral: GeneralStatus,
                    DisplayStatus: DisplayStatus
                }
                if (BySubTestList.length > 0) {
                    for (a = 0; a < BySubTestList.length; a++) {
                        for (b = 0; b < BySubTestList[a].item.length; b++) {
                            if (BySubTestList[a].item[b].DisplayOrderTestTool > BySubTestList.length) {
                                swal('Failed!', 'Please set Display Order with the right number', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                            if (isNaN(BySubTestList[a].item[b].DisplayOrderTestTool) == true) {
                                swal('Invalid!', 'Display Order value cannot be null', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                            if (Number.isInteger(BySubTestList[a].item[b].DisplayOrderTestTool) == false) {
                                swal('Invalid!', 'Display Order value cannot be decimal', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                        }
                    }
                }
                if (ByTestList.length > 0) {
                    for (a = 0; a < ByTestList.length; a++) {
                        for (b = 0; b < ByTestList[a].item.length; b++) {
                            if (ByTestList[a].item[b].DisplayOrderTestTool > ByTestList.length) {
                                swal('Failed!', 'Please set Display Order with the right number', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                            if (isNaN(ByTestList[a].item[b].DisplayOrderTestTool) == true) {
                                swal('Invalid!', 'Display Order value cannot be null', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                            if (Number.isInteger(ByTestList[a].item[b].DisplayOrderTestTool) == false) {
                                swal('Invalid!', 'Display Order value cannot be decimal', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                        }
                    }
                }

                confirmMessageAdd();
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: "POST",
                        url: SERVICE_URL + "api/CutOff/Save",
                        headers: { "Authorization-Token": Cookie.load() },
                        data: {
                            CutOffHeader: CutOffHeader,
                            CompetencyMatrix: CompetencyMatrix,
                            ListBySubTest: ListBySubTest,
                            ListByTest: ListByTest,
                            IsConfirm: IsConfirm
                        },
                        success: function (response) {
                            if (response.Acknowledge < 1) {
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
                                    swal("Failed!", response.Message, "warning", { closeOnClickOutside: false });
                                }
                            } else {
                                LoadingMask.hide();
                                swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + "Views/OnlineTesting/CutOff/CutOff.html";
                                });
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
            //EDIT 
            if (CutOffCode == '' || NameOnly == '' || CompanyName == '' || GradeName == '') {
                swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
            }
            else {
                var CutOffHeader = {
                    CutOffCode: CutOffCode,
                    GradeID: GradeID,
                    CompanyID: CompanyID,
                    CutOffName: NameOnly,
                    IsGeneral: GeneralStatus,
                    DisplayStatus: DisplayStatus
                }
                if (BySubTestList.length > 0) {
                    for (a = 0; a < BySubTestList.length; a++) {
                        for (b = 0; b < BySubTestList[a].item.length; b++) {
                            if (BySubTestList[a].item[b].DisplayOrderTestTool > BySubTestList.length) {
                                swal('Failed!', 'Please set Display Order with the right number', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                            if (isNaN(BySubTestList[a].item[b].DisplayOrderTestTool) == true) {
                                swal('Invalid!', 'Display Order value cannot be null', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                            if (Number.isInteger(BySubTestList[a].item[b].DisplayOrderTestTool) == false) {
                                swal('Invalid!', 'Display Order value cannot be decimal', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                        }
                    }
                }
                if (ByTestList.length > 0) {
                    for (a = 0; a < ByTestList.length; a++) {
                        for (b = 0; b < ByTestList[a].item.length; b++) {
                            if (ByTestList[a].item[b].DisplayOrderTestTool > ByTestList.length) {
                                swal('Failed!', 'Please set Display Order with the right number', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                            if (isNaN(ByTestList[a].item[b].DisplayOrderTestTool) == true) {
                                swal('Invalid!', 'Display Order value cannot be null', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                            if (Number.isInteger(ByTestList[a].item[b].DisplayOrderTestTool) == false) {
                                swal('Invalid!', 'Display Order value cannot be decimal', 'warning', { closeOnClickOutside: false });
                                return;
                            }
                        }
                    }
                }

                confirmMessageAdd();
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: "POST",
                        url: SERVICE_URL + "api/CutOff/Edit",
                        headers: { "Authorization-Token": Cookie.load() },
                        data: {
                            CutOffHeader: CutOffHeader,
                            CompetencyMatrix: CompetencyMatrix,
                            ListBySubTest: ListBySubTest,
                            ListByTest: ListByTest,
                            IsConfirm: IsConfirm
                        },
                        success: function (response) {
                            if (response.Acknowledge < 1) {
                                LoadingMask.hide();
                                if (response.IsExist == true) {
                                    if (viewModel.IsConfirm == false) {
                                        confirmMessageNormScore()
                                        $('.swal-button--defeat').on('click', function () {
                                            viewModel.set("IsConfirm", true);
                                            editReplace();
                                        })
                                    }
                                } else {
                                    swal("Failed!", response.Message, "warning", { closeOnClickOutside: false });
                                }
                            } else {
                                LoadingMask.hide();
                                swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + "Views/OnlineTesting/CutOff/CutOff.html";
                                });
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
}
saveReplace = function () {
    var CutOffCode = viewModel.CutOffCode;
    var CutOffName = viewModel.CutOffName;
    var NameOnly = viewModel.NameOnly;
    var NameNumbering = viewModel.NameNumbering;
    var CompanyID = viewModel.CompanyID;
    var CompanyName = viewModel.CompanyName;
    var GradeID = viewModel.GradeID;
    var GradeName = viewModel.GradeName;
    var GeneralStatus = viewModel.GeneralStatus;
    var DisplayStatus = viewModel.DisplayStatus;
    var IsConfirm = viewModel.IsConfirm;

    var BySubTestList = viewModel.CutOffDetail;
    var ByTestList = viewModel.CutOffDetails;
    var arrSelectedCompetencyMatrix = viewModel.arrSelectedCompetencyMatrix;
    var ListBySubTest = []
    var ListByTest = []
    var arrComp = [];
    var arrBySubTest = [];
    var arrByTest = [];
    var arrByTestVS = [];
    var nilaiSubTest = BySubTestList.length;
    var nilaiTest = ByTestList.length;

    if ((nilaiSubTest == null || nilaiSubTest == undefined || nilaiSubTest == 0) && (nilaiTest == null || nilaiTest == undefined || nilaiTest == 0)) {
        swal('Failed!', 'Please select Sub Test or Test', 'warning', { closeOnClickOutside: false });
        return;
    }
    else {
        if (BySubTestList.length > 0) {
            for (a = 0; a < BySubTestList.length; a++) {
                if (BySubTestList[a].item.length > 0) {
                    if (arrBySubTest.length !== 0) {
                        arrBySubTest = []
                    }
                    for (b = 0; b < BySubTestList[a].item.length; b++) {
                        var TestTypeCode = BySubTestList[a].item[b].TestTypeCode
                        var TestToolCode = BySubTestList[a].item[b].TestToolCode
                        var IsConfigIQ = BySubTestList[a].item[b].IsConfigIQ
                        var ConfigScoreIQ = BySubTestList[a].item[b].CutOffIQ
                        var CutOffIQCheckBox = BySubTestList[a].item[b].CutOffIQCheckBox
                        var NormScoreIQCode = BySubTestList[a].item[b].NormScoreIQCode
                        var DisplayOrderTestTool = BySubTestList[a].item[b].DisplayOrderTestTool
                        arrBySubTest.push({
                            SubTestCode: BySubTestList[a].item[b].SubTestCode,
                            SubTestName: BySubTestList[a].item[b].SubTestName,
                            CutOffScore: BySubTestList[a].item[b].CutOffScore,
                            DisplayOrder: BySubTestList[a].item[b].DisplayOrder,
                            HasParent: BySubTestList[a].item[b].HasParent,
                            HasChild: BySubTestList[a].item[b].HasChild
                        });
                    }
                }
                ListBySubTest.push({
                    TestTypeCode: TestTypeCode,
                    TestToolCode: TestToolCode,
                    IsConfigIQ: IsConfigIQ,
                    CutOffIQCheckBox: CutOffIQCheckBox,
                    NormScoreIQCode: NormScoreIQCode,
                    ConfigScoreIQ: ConfigScoreIQ,
                    DisplayOrderTestTool: DisplayOrderTestTool,
                    SubTestList: arrBySubTest
                })
            }
        }
        if (ByTestList.length > 0) {
            for (a = 0; a < ByTestList.length; a++) {
                if (ByTestList[a].item.length > 0) {
                    if (arrByTest.length !== 0) {
                        arrByTest = []
                    }
                    if (arrByTestVS.length !== 0) {
                        arrByTestVS = []
                    }
                    for (b = 0; b < ByTestList[a].item.length; b++) {
                        var TestTypeCode = ByTestList[a].item[b].TestTypeCode
                        var TestToolCode = ByTestList[a].item[b].TestToolCode
                        var DisplayOrderTestTool = ByTestList[a].item[b].DisplayOrderTestTool
                        if (ByTestList[a].item[b].SubTestCode) {
                            arrByTest.push({
                                SubTestName: ByTestList[a].item[b].SubTestName,
                                SubTestCode: ByTestList[a].item[b].SubTestCode,
                                CutOffScore: ByTestList[a].item[b].CutOffScore,
                            });
                        }
                        if (ByTestList[a].item[b].ValidityScaleCode) {
                            arrByTestVS.push({
                                ValidityScaleCode: ByTestList[a].item[b].ValidityScaleCode,
                                ValidityScaleName: ByTestList[a].item[b].ValidityScaleName,
                                CutOffScore: ByTestList[a].item[b].CutOffScore,
                            });
                        }
                    }
                }
                ListByTest.push({
                    TestTypeCode: TestTypeCode,
                    TestToolCode: TestToolCode,
                    DisplayOrderTestTool: DisplayOrderTestTool,
                    SubTestList: arrByTest,
                    ValidityScaleList: arrByTestVS
                })
            }
        }
        //var arrSubTests = $.merge(arrBySubTest, arrByTest)
    }

    if (arrSelectedCompetencyMatrix.length > 0) {
        for (comp = 0; comp < arrSelectedCompetencyMatrix.length; comp++) {
            if (arrSelectedCompetencyMatrix[comp].Competencies.length > 0) {
                for (c = 0; c < arrSelectedCompetencyMatrix[comp].Competencies.length; c++) {
                    if (arrSelectedCompetencyMatrix[comp].Competencies[c].CutOffScore < 0) {
                        swal('Invalid!', 'Competency cut off score value must be integer', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    if (Number.isInteger(arrSelectedCompetencyMatrix[comp].Competencies[c].CutOffScore) == false) {
                        swal('Invalid!', 'Competency cut off score value cannot be decimal', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    arrComp.push({
                        CompetencyCode: arrSelectedCompetencyMatrix[comp].Competencies[c].CompetencyCode,
                        CompetencyName: arrSelectedCompetencyMatrix[comp].Competencies[c].CompetencyName,
                        CutOffScore: arrSelectedCompetencyMatrix[comp].Competencies[c].CutOffScore,
                    })
                }
                var CompetencyMatrix = {
                    CompetencyMatrixCode: arrSelectedCompetencyMatrix[comp].CompetencyMatrixCode,
                    Competencies: arrComp
                }
            } else {
                CompetencyMatrix = {}
            }
        }
    }
    else {
        CompetencyMatrix = {}
    }

    if (NameOnly == '' || CompanyName == '' || GradeName == '') {
        swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
    } else {
        var CutOffHeader = {
            CutOffCode: CutOffCode,
            CompanyID: CompanyID,
            GradeID: GradeID,
            CutOffName: NameOnly,
            IsGeneral: GeneralStatus,
            DisplayStatus: DisplayStatus
        }
        if (BySubTestList.length > 0) {
            for (a = 0; a < BySubTestList.length; a++) {
                for (b = 0; b < BySubTestList[a].item.length; b++) {
                    if (BySubTestList[a].item[b].DisplayOrderTestTool > BySubTestList.length) {
                        swal('Failed!', 'Please set Display Order with the right number', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    if (isNaN(BySubTestList[a].item[b].DisplayOrderTestTool) == true) {
                        swal('Invalid!', 'Display Order value cannot be null', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    if (Number.isInteger(BySubTestList[a].item[b].DisplayOrderTestTool) == false) {
                        swal('Invalid!', 'Display Order value cannot be decimal', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
        }
        if (ByTestList.length > 0) {
            for (a = 0; a < ByTestList.length; a++) {
                for (b = 0; b < ByTestList[a].item.length; b++) {
                    if (ByTestList[a].item[b].DisplayOrderTestTool > ByTestList.length) {
                        swal('Failed!', 'Please set Display Order with the right number', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    if (isNaN(ByTestList[a].item[b].DisplayOrderTestTool) == true) {
                        swal('Invalid!', 'Display Order value cannot be null', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    if (Number.isInteger(ByTestList[a].item[b].DisplayOrderTestTool) == false) {
                        swal('Invalid!', 'Display Order value cannot be decimal', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
        }

        confirmMessageAdd();
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            $.ajax({
                type: "POST",
                url: SERVICE_URL + "api/CutOff/Save",
                headers: { "Authorization-Token": Cookie.load() },
                data: {
                    CutOffHeader: CutOffHeader,
                    CompetencyMatrix: CompetencyMatrix,
                    ListBySubTest: ListBySubTest,
                    ListByTest: ListByTest,
                    IsConfirm: IsConfirm
                },
                success: function (response) {
                    if (response.Acknowledge < 1) {
                        LoadingMask.hide();
                        swal("Failed!", response.Message, "warning", { closeOnClickOutside: false });
                    } else {
                        LoadingMask.hide();
                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                        $('.swal-button--confirm').on('click', function () {
                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/CutOff/CutOff.html";
                        });
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
editReplace = function () {
    var CutOffCode = viewModel.CutOffCode;
    var CutOffName = viewModel.CutOffName;
    var NameOnly = viewModel.NameOnly;
    var NameNumbering = viewModel.NameNumbering;
    var CompanyID = viewModel.CompanyID;
    var CompanyName = viewModel.CompanyName;
    var GradeID = viewModel.GradeID;
    var GradeName = viewModel.GradeName;
    var GeneralStatus = viewModel.GeneralStatus;
    var DisplayStatus = viewModel.DisplayStatus;
    var IsConfirm = viewModel.IsConfirm;

    var BySubTestList = viewModel.CutOffDetail;
    var ByTestList = viewModel.CutOffDetails;
    var arrSelectedCompetencyMatrix = viewModel.arrSelectedCompetencyMatrix;
    var ListBySubTest = []
    var ListByTest = []
    var arrComp = [];
    var arrBySubTest = [];
    var arrByTest = [];
    var arrByTestVS = [];
    var nilaiSubTest = BySubTestList.length;
    var nilaiTest = ByTestList.length;

    if ((nilaiSubTest == null || nilaiSubTest == undefined || nilaiSubTest == 0) && (nilaiTest == null || nilaiTest == undefined || nilaiTest == 0)) {
        swal('Failed!', 'Please select Sub Test or Test', 'warning', { closeOnClickOutside: false });
        return;
    }
    else {
        if (BySubTestList.length > 0) {
            for (a = 0; a < BySubTestList.length; a++) {
                if (BySubTestList[a].item.length > 0) {
                    if (arrBySubTest.length !== 0) {
                        arrBySubTest = []
                    }
                    for (b = 0; b < BySubTestList[a].item.length; b++) {
                        var TestTypeCode = BySubTestList[a].item[b].TestTypeCode
                        var TestToolCode = BySubTestList[a].item[b].TestToolCode
                        var IsConfigIQ = BySubTestList[a].item[b].IsConfigIQ
                        var ConfigScoreIQ = BySubTestList[a].item[b].CutOffIQ
                        var CutOffIQCheckBox = BySubTestList[a].item[b].CutOffIQCheckBox
                        var NormScoreIQCode = BySubTestList[a].item[b].NormScoreIQCode
                        var DisplayOrderTestTool = BySubTestList[a].item[b].DisplayOrderTestTool
                        arrBySubTest.push({
                            SubTestCode: BySubTestList[a].item[b].SubTestCode,
                            SubTestName: BySubTestList[a].item[b].SubTestName,
                            CutOffScore: BySubTestList[a].item[b].CutOffScore,
                            DisplayOrder: BySubTestList[a].item[b].DisplayOrder,
                            HasParent: BySubTestList[a].item[b].HasParent,
                            HasChild: BySubTestList[a].item[b].HasChild
                        });
                    }
                }
                ListBySubTest.push({
                    TestTypeCode: TestTypeCode,
                    TestToolCode: TestToolCode,
                    IsConfigIQ: IsConfigIQ,
                    CutOffIQCheckBox: CutOffIQCheckBox,
                    NormScoreIQCode: NormScoreIQCode,
                    ConfigScoreIQ: ConfigScoreIQ,
                    DisplayOrderTestTool: DisplayOrderTestTool,
                    SubTestList: arrBySubTest
                })
            }
        }
        if (ByTestList.length > 0) {
            for (a = 0; a < ByTestList.length; a++) {
                if (ByTestList[a].item.length > 0) {
                    if (arrByTest.length !== 0) {
                        arrByTest = []
                    }
                    if (arrByTestVS.length !== 0) {
                        arrByTestVS = []
                    }
                    for (b = 0; b < ByTestList[a].item.length; b++) {
                        var TestTypeCode = ByTestList[a].item[b].TestTypeCode
                        var TestToolCode = ByTestList[a].item[b].TestToolCode
                        var DisplayOrderTestTool = ByTestList[a].item[b].DisplayOrderTestTool
                        if (ByTestList[a].item[b].SubTestCode) {
                            arrByTest.push({
                                SubTestName: ByTestList[a].item[b].SubTestName,
                                SubTestCode: ByTestList[a].item[b].SubTestCode,
                                CutOffScore: ByTestList[a].item[b].CutOffScore,
                            });
                        }
                        if (ByTestList[a].item[b].ValidityScaleCode) {
                            arrByTestVS.push({
                                ValidityScaleCode: ByTestList[a].item[b].ValidityScaleCode,
                                ValidityScaleName: ByTestList[a].item[b].ValidityScaleName,
                                CutOffScore: ByTestList[a].item[b].CutOffScore,
                            });
                        }
                    }
                }
                ListByTest.push({
                    TestTypeCode: TestTypeCode,
                    TestToolCode: TestToolCode,
                    DisplayOrderTestTool: DisplayOrderTestTool,
                    SubTestList: arrByTest,
                    ValidityScaleList: arrByTestVS
                })
            }
        }
        //var arrSubTests = $.merge(arrBySubTest, arrByTest)
    }

    if (arrSelectedCompetencyMatrix.length > 0) {
        for (comp = 0; comp < arrSelectedCompetencyMatrix.length; comp++) {
            if (arrSelectedCompetencyMatrix[comp].Competencies.length > 0) {
                for (c = 0; c < arrSelectedCompetencyMatrix[comp].Competencies.length; c++) {
                    if (arrSelectedCompetencyMatrix[comp].Competencies[c].CutOffScore < 0) {
                        swal('Invalid!', 'Competency cut off score value must be integer', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    if (Number.isInteger(arrSelectedCompetencyMatrix[comp].Competencies[c].CutOffScore) == false) {
                        swal('Invalid!', 'Competency cut off score value cannot be decimal', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    arrComp.push({
                        CompetencyCode: arrSelectedCompetencyMatrix[comp].Competencies[c].CompetencyCode,
                        CompetencyName: arrSelectedCompetencyMatrix[comp].Competencies[c].CompetencyName,
                        CutOffScore: arrSelectedCompetencyMatrix[comp].Competencies[c].CutOffScore,
                    })
                }
                var CompetencyMatrix = {
                    CompetencyMatrixCode: arrSelectedCompetencyMatrix[comp].CompetencyMatrixCode,
                    Competencies: arrComp
                }
            } else {
                CompetencyMatrix = {}
            }
        }
    }
    else {
        CompetencyMatrix = {}
    }

    if (CutOffCode == '' || NameOnly == '' || CompanyName == '' || GradeName == '') {
        swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
        return;
    }
    else {
        var CutOffHeader = {
            CutOffCode: CutOffCode,
            GradeID: GradeID,
            CompanyID: CompanyID,
            CutOffName: NameOnly,
            IsGeneral: GeneralStatus,
            DisplayStatus: DisplayStatus
        }
        if (BySubTestList.length > 0) {
            for (a = 0; a < BySubTestList.length; a++) {
                for (b = 0; b < BySubTestList[a].item.length; b++) {
                    if (BySubTestList[a].item[b].DisplayOrderTestTool > BySubTestList.length) {
                        swal('Failed!', 'Please set Display Order with the right number', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    if (isNaN(BySubTestList[a].item[b].DisplayOrderTestTool) == true) {
                        swal('Invalid!', 'Display Order value cannot be null', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    if (Number.isInteger(BySubTestList[a].item[b].DisplayOrderTestTool) == false) {
                        swal('Invalid!', 'Display Order value cannot be decimal', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
        }
        if (ByTestList.length > 0) {
            for (a = 0; a < ByTestList.length; a++) {
                for (b = 0; b < ByTestList[a].item.length; b++) {
                    if (ByTestList[a].item[b].DisplayOrderTestTool > ByTestList.length) {
                        swal('Failed!', 'Please set Display Order with the right number', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    if (isNaN(ByTestList[a].item[b].DisplayOrderTestTool) == true) {
                        swal('Invalid!', 'Display Order value cannot be null', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    if (Number.isInteger(ByTestList[a].item[b].DisplayOrderTestTool) == false) {
                        swal('Invalid!', 'Display Order value cannot be decimal', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
        }

        confirmMessageAdd();
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            $.ajax({
                type: "POST",
                url: SERVICE_URL + "api/CutOff/Edit",
                headers: { "Authorization-Token": Cookie.load() },
                data: {
                    CutOffHeader: CutOffHeader,
                    CompetencyMatrix: CompetencyMatrix,
                    ListBySubTest: ListBySubTest,
                    ListByTest: ListByTest,
                    IsConfirm: IsConfirm
                },
                success: function (response) {
                    if (response.Acknowledge < 1) {
                        LoadingMask.hide();
                        swal("Failed!", response.Message, "warning", { closeOnClickOutside: false });
                    } else {
                        LoadingMask.hide();
                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                        $('.swal-button--confirm').on('click', function () {
                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/CutOff/CutOff.html";
                        });
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