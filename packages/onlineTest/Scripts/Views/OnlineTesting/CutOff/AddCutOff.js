//add change
$(document).ready(function () {
    LoadingMask.show();
    var role_name = Cookies.get("role_name")
    viewModel.set('role_name', role_name)
    $('.numeric').kendoNumericTextBox({
        format: "#.#",
        decimals: 0
    });
    if (role_name == 'AFFCO') {
        $('#btnDeleteCompetency').hide()
    }
    var branchProfileID = GetParameterByName('CutOffCode');
    var editOrEditNew = GetParameterByName('act');
    LoadData(branchProfileID, editOrEditNew);
    loadPage();
    $('#NormScoreIQField').hide()
    $('#NormScoreIQName').hide()
    gridListCutOff();
    gridListCutOffs();
    onClose();
    kendo.bind($("body"), viewModel);
    $("#gridCompetency").width(500);
});

LoadData = function (branchProfileID, editOrEditNew) {
    var data = branchProfileID;
    var editOrEditNew = editOrEditNew;
    viewModel.set("act", editOrEditNew)
    if (data != '') {
        LoadingMask.show();
        $.ajax({
            type: "POST",
            url: SERVICE_URL + "api/CutOff/Detail",
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                CutOffCode: data
            },
            success: function (response) {
                //LoadingMask.hide();
                var data = response;
                if (viewModel.role_name == 'AFFCO') {
                    $('#btnSubTest').hide()
                    $('#btnSubTest').prop("disabled", true)
                    $('#btnTest').hide()
                    $('#btnTest').prop("disabled", true)
                    $('#btnCheckCompetency').hide()
                    $("#NameOnly").prop("disabled", true);
                    $("#CompanyID").prop("disabled", true);
                    $("#GradeID").prop("disabled", true);
                    $("#generalStatus").prop("disabled", true);
                    $("#displayStatus").prop("disabled", true);
                    $('#btnDeleteCompetency').hide()
                }

                //CUT OFF HEADER
                viewModel.set('createBy', response.CutOffDetailData.CutOffHeader.CreateBy);
                viewModel.set('lastModifiedBy', response.CutOffDetailData.CutOffHeader.ModifBy);
                viewModel.set('createOn', response.CutOffDetailData.CutOffHeader.CreatedTime);
                viewModel.set('lastModifiedOn', response.CutOffDetailData.CutOffHeader.ModifiedTime);
                viewModel.set('CutOffCode', response.CutOffDetailData.CutOffHeader.CutOffCode);
                viewModel.set('NameNumbering', response.CutOffDetailData.CutOffHeader.NameNumbering);
                if (editOrEditNew == 'editNew') {
                    viewModel.set('NameOnly', response.CutOffDetailData.CutOffHeader.NameOnly);
                    $("#NameOnly").prop("disabled", true);
                } else {
                    viewModel.set('NameOnly', response.CutOffDetailData.CutOffHeader.NameOnly);
                }
                viewModel.set('CompanyID', response.CutOffDetailData.CutOffHeader.CompanyID);
                CompanyLoadDetail(response.CutOffDetailData.CutOffHeader.CompanyID);
                viewModel.set('GradeID', response.CutOffDetailData.CutOffHeader.GradeID);
                GradeLoadDetail(response.CutOffDetailData.CutOffHeader.GradeID);
                //$("#CompanyID").kendoComboBox({ enable: false });
                viewModel.set('GeneralStatus', response.CutOffDetailData.CutOffHeader.IsGeneral);
                viewModel.set('DisplayStatus', response.CutOffDetailData.CutOffHeader.DisplayStatus);
                if (response.CutOffDetailData.CutOffHeader.IsGeneral == true) {
                    $('#generalStatus').removeAttr('onchange');
                    $('#generalStatus').attr('onchange', 'General(this)');
                } else {
                    $('#generalStatus').removeAttr('onchange');
                    $('#generalStatus').attr('onchange', 'GeneralChecked(this)');
                }
                if (response.CutOffDetailData.CutOffHeader.DisplayStatus == true) {
                    $('#displayStatus').removeAttr('onchange');
                    $('#displayStatus').attr('onchange', 'Display(this)');
                } else {
                    $('#displayStatus').removeAttr('onchange');
                    $('#displayStatus').attr('onchange', 'DisplayChecked(this)');
                }

                var arrSelectedCompetencyMatrix = []
                var arrCompetency = []
                if (response.CutOffDetailData.CompetencyMatrix !== undefined) {
                    for (comp = 0; comp < response.CutOffDetailData.CompetencyMatrix.Competencies.length; comp++) {
                        arrCompetency.push({
                            CompetencyCode: response.CutOffDetailData.CompetencyMatrix.Competencies[comp].CompetencyCode,
                            CompetencyName: response.CutOffDetailData.CompetencyMatrix.Competencies[comp].CompetencyName,
                            CutOffScore: response.CutOffDetailData.CompetencyMatrix.Competencies[comp].CutOffScore,
                        })
                    }
                    arrSelectedCompetencyMatrix.push({
                        Competencies: arrCompetency,
                        CompetencyMatrixCode: response.CutOffDetailData.CompetencyMatrix.CompetencyMatrixCode,
                        IsDisplay: response.CutOffDetailData.CompetencyMatrix.IsDisplay
                    })
                    viewModel.set('arrSelectedCompetencyMatrix', arrSelectedCompetencyMatrix);
                    competenciesGrid();
                    if (viewModel.role_name == 'AFFCO') {
                        $('#btnDeleteCompetency').hide()
                    } else {
                        $('#btnDeleteCompetency').show()
                    }
                } else {
                    $('#btnDeleteCompetency').hide()
                }

                for (kk = 0; kk < response.CutOffDetailData.ListBySubTest.length; kk++) {
                    for (ss = 0; ss < response.CutOffDetailData.ListBySubTest[kk].SubTestList.length; ss++) {
                        viewModel.ArrayChecked.push({
                            CutOffScore: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].CutOffScore,
                            DisplayOrder: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].DisplayOrder,
                            HasChild: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].HasChild,
                            HasIQ: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].HasIQ,
                            HasParent: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].HasParent,
                            IsDisplay: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].IsDisplay,
                            ParentCode: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].ParentCode,
                            ParentName: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].ParentName,
                            SubTestCode: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].SubTestCode,
                            SubTestName: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].SubTestName,
                            CutOffIQ: response.CutOffDetailData.ListBySubTest[kk].ConfigScoreIQ,
                            DisplayOrderTestTool: response.CutOffDetailData.ListBySubTest[kk].DisplayOrderTestTool,
                            IsConfigIQ: response.CutOffDetailData.ListBySubTest[kk].IsConfigIQ,
                            CutOffIQCheckBox: response.CutOffDetailData.ListBySubTest[kk].CutOffIQCheckBox,
                            NormScoreIQCode: response.CutOffDetailData.ListBySubTest[kk].NormScoreIQCode,
                            NormScoreIQName: response.CutOffDetailData.ListBySubTest[kk].NormScoreIQName,
                            TestToolCode: response.CutOffDetailData.ListBySubTest[kk].TestToolCode,
                            TestToolName: response.CutOffDetailData.ListBySubTest[kk].TestToolName,
                            TestTypeCode: response.CutOffDetailData.ListBySubTest[kk].TestTypeCode,
                            TestTypeName: response.CutOffDetailData.ListBySubTest[kk].TestTypeName,
                        })
                    }
                }

                for (kk = 0; kk < response.CutOffDetailData.ListBySubTest.length; kk++) {
                    for (ss = 0; ss < response.CutOffDetailData.ListBySubTest[kk].SubTestList.length; ss++) {
                        viewModel.bySubList.push({
                            CutOffScore: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].CutOffScore,
                            DisplayOrder: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].DisplayOrder,
                            HasChild: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].HasChild,
                            HasIQ: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].HasIQ,
                            HasParent: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].HasParent,
                            IsDisplay: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].IsDisplay,
                            ParentCode: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].ParentCode,
                            ParentName: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].ParentName,
                            SubTestCode: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].SubTestCode,
                            SubTestName: response.CutOffDetailData.ListBySubTest[kk].SubTestList[ss].SubTestName,
                            CutOffIQ: response.CutOffDetailData.ListBySubTest[kk].ConfigScoreIQ,
                            DisplayOrderTestTool: response.CutOffDetailData.ListBySubTest[kk].DisplayOrderTestTool,
                            IsConfigIQ: response.CutOffDetailData.ListBySubTest[kk].IsConfigIQ,
                            CutOffIQCheckBox: response.CutOffDetailData.ListBySubTest[kk].CutOffIQCheckBox,
                            NormScoreIQCode: response.CutOffDetailData.ListBySubTest[kk].NormScoreIQCode,
                            NormScoreIQName: response.CutOffDetailData.ListBySubTest[kk].NormScoreIQName,
                            TestToolCode: response.CutOffDetailData.ListBySubTest[kk].TestToolCode,
                            TestToolName: response.CutOffDetailData.ListBySubTest[kk].TestToolName,
                            TestTypeCode: response.CutOffDetailData.ListBySubTest[kk].TestTypeCode,
                            TestTypeName: response.CutOffDetailData.ListBySubTest[kk].TestTypeName,
                        })
                    }
                }

                for (aa = 0; aa < response.CutOffDetailData.ListBySubTest.length; aa++) {
                    for (bb = 0; bb < response.CutOffDetailData.ListBySubTest[aa].SubTestList.length; bb++) {
                        if (response.CutOffDetailData.ListBySubTest[aa].SubTestList[bb].IsDisplay == true) {
                            viewModel.CutOffDetail.push({
                                CutOffScore: response.CutOffDetailData.ListBySubTest[aa].SubTestList[bb].CutOffScore,
                                DisplayOrder: response.CutOffDetailData.ListBySubTest[aa].SubTestList[bb].DisplayOrder,
                                HasChild: response.CutOffDetailData.ListBySubTest[aa].SubTestList[bb].HasChild,
                                HasIQ: response.CutOffDetailData.ListBySubTest[aa].SubTestList[bb].HasIQ,
                                HasParent: response.CutOffDetailData.ListBySubTest[aa].SubTestList[bb].HasParent,
                                IsDisplay: response.CutOffDetailData.ListBySubTest[aa].SubTestList[bb].IsDisplay,
                                ParentCode: response.CutOffDetailData.ListBySubTest[aa].SubTestList[bb].ParentCode,
                                ParentName: response.CutOffDetailData.ListBySubTest[aa].SubTestList[bb].ParentName,
                                SubTestCode: response.CutOffDetailData.ListBySubTest[aa].SubTestList[bb].SubTestCode,
                                SubTestName: response.CutOffDetailData.ListBySubTest[aa].SubTestList[bb].SubTestName,
                                CutOffIQ: response.CutOffDetailData.ListBySubTest[aa].ConfigScoreIQ,
                                DisplayOrderTestTool: response.CutOffDetailData.ListBySubTest[aa].DisplayOrderTestTool,
                                IsConfigIQ: response.CutOffDetailData.ListBySubTest[aa].IsConfigIQ,
                                CutOffIQCheckBox: response.CutOffDetailData.ListBySubTest[aa].CutOffIQCheckBox,
                                NormScoreIQCode: response.CutOffDetailData.ListBySubTest[aa].NormScoreIQCode,
                                NormScoreIQName: response.CutOffDetailData.ListBySubTest[aa].NormScoreIQName,
                                TestToolCode: response.CutOffDetailData.ListBySubTest[aa].TestToolCode,
                                TestToolName: response.CutOffDetailData.ListBySubTest[aa].TestToolName,
                                TestTypeCode: response.CutOffDetailData.ListBySubTest[aa].TestTypeCode,
                                TestTypeName: response.CutOffDetailData.ListBySubTest[aa].TestTypeName,
                            })
                        }
                    }
                }

                for (bt = 0; bt < response.CutOffDetailData.ListByTest.length; bt++) {
                    for (t = 0; t < response.CutOffDetailData.ListByTest[bt].SubTestList.length; t++) {
                        viewModel.ArrayCheckedTest.push({
                            CutOffScore: response.CutOffDetailData.ListByTest[bt].SubTestList[t].CutOffScore,
                            SubTestCode: response.CutOffDetailData.ListByTest[bt].SubTestList[t].SubTestCode,
                            SubTestName: response.CutOffDetailData.ListByTest[bt].SubTestList[t].SubTestName,
                            TestToolCode: response.CutOffDetailData.ListByTest[bt].TestToolCode,
                            TestToolName: response.CutOffDetailData.ListByTest[bt].TestToolName,
                            TestTypeCode: response.CutOffDetailData.ListByTest[bt].TestTypeCode,
                            TestTypeName: response.CutOffDetailData.ListByTest[bt].TestTypeName,
                            DisplayOrderTestTool: response.CutOffDetailData.ListByTest[bt].DisplayOrderTestTool,
                        })
                    }
                }

                for (bt = 0; bt < response.CutOffDetailData.ListByTest.length; bt++) {
                    for (t = 0; t < response.CutOffDetailData.ListByTest[bt].SubTestList.length; t++) {
                        viewModel.byTestSubTestList.push({
                            CutOffScore: response.CutOffDetailData.ListByTest[bt].SubTestList[t].CutOffScore,
                            SubTestCode: response.CutOffDetailData.ListByTest[bt].SubTestList[t].SubTestCode,
                            SubTestName: response.CutOffDetailData.ListByTest[bt].SubTestList[t].SubTestName,
                            TestToolCode: response.CutOffDetailData.ListByTest[bt].TestToolCode,
                            TestToolName: response.CutOffDetailData.ListByTest[bt].TestToolName,
                            TestTypeCode: response.CutOffDetailData.ListByTest[bt].TestTypeCode,
                            TestTypeName: response.CutOffDetailData.ListByTest[bt].TestTypeName,
                            DisplayOrderTestTool: response.CutOffDetailData.ListByTest[bt].DisplayOrderTestTool,
                        })
                    }
                }

                for (bt = 0; bt < response.CutOffDetailData.ListByTest.length; bt++) {
                    for (vs = 0; vs < response.CutOffDetailData.ListByTest[bt].ValidityScaleList.length; vs++) {
                        viewModel.ArrayCheckedTestValidityScale.push({
                            CutOffScore: response.CutOffDetailData.ListByTest[bt].ValidityScaleList[vs].CutOffScore,
                            ValidityScaleCode: response.CutOffDetailData.ListByTest[bt].ValidityScaleList[vs].ValidityScaleCode,
                            ValidityScaleName: response.CutOffDetailData.ListByTest[bt].ValidityScaleList[vs].ValidityScaleName,
                            TestToolCode: response.CutOffDetailData.ListByTest[bt].TestToolCode,
                            TestToolName: response.CutOffDetailData.ListByTest[bt].TestToolName,
                            TestTypeCode: response.CutOffDetailData.ListByTest[bt].TestTypeCode,
                            TestTypeName: response.CutOffDetailData.ListByTest[bt].TestTypeName,
                            DisplayOrderTestTool: response.CutOffDetailData.ListByTest[bt].DisplayOrderTestTool,
                        })
                    }
                }

                for (bt = 0; bt < response.CutOffDetailData.ListByTest.length; bt++) {
                    for (vs = 0; vs < response.CutOffDetailData.ListByTest[bt].ValidityScaleList.length; vs++) {
                        viewModel.byTestValidityScaleList.push({
                            CutOffScore: response.CutOffDetailData.ListByTest[bt].ValidityScaleList[vs].CutOffScore,
                            ValidityScaleCode: response.CutOffDetailData.ListByTest[bt].ValidityScaleList[vs].ValidityScaleCode,
                            ValidityScaleName: response.CutOffDetailData.ListByTest[bt].ValidityScaleList[vs].ValidityScaleName,
                            TestToolCode: response.CutOffDetailData.ListByTest[bt].TestToolCode,
                            TestToolName: response.CutOffDetailData.ListByTest[bt].TestToolName,
                            TestTypeCode: response.CutOffDetailData.ListByTest[bt].TestTypeCode,
                            TestTypeName: response.CutOffDetailData.ListByTest[bt].TestTypeName,
                            DisplayOrderTestTool: response.CutOffDetailData.ListByTest[bt].DisplayOrderTestTool,
                        })
                    }
                }

                var arrTest = []
                var arrVS = []
                for (bt = 0; bt < response.CutOffDetailData.ListByTest.length; bt++) {
                    for (t = 0; t < response.CutOffDetailData.ListByTest[bt].SubTestList.length; t++) {
                        arrTest.push({
                            CutOffScore: response.CutOffDetailData.ListByTest[bt].SubTestList[t].CutOffScore,
                            SubTestCode: response.CutOffDetailData.ListByTest[bt].SubTestList[t].SubTestCode,
                            SubTestName: response.CutOffDetailData.ListByTest[bt].SubTestList[t].SubTestName,
                            TestToolCode: response.CutOffDetailData.ListByTest[bt].TestToolCode,
                            TestToolName: response.CutOffDetailData.ListByTest[bt].TestToolName,
                            TestTypeCode: response.CutOffDetailData.ListByTest[bt].TestTypeCode,
                            TestTypeName: response.CutOffDetailData.ListByTest[bt].TestTypeName,
                            DisplayOrderTestTool: response.CutOffDetailData.ListByTest[bt].DisplayOrderTestTool,
                        })
                    }
                    for (vs = 0; vs < response.CutOffDetailData.ListByTest[bt].ValidityScaleList.length; vs++) {
                        arrVS.push({
                            CutOffScore: response.CutOffDetailData.ListByTest[bt].ValidityScaleList[vs].CutOffScore,
                            ValidityScaleCode: response.CutOffDetailData.ListByTest[bt].ValidityScaleList[vs].ValidityScaleCode,
                            ValidityScaleName: response.CutOffDetailData.ListByTest[bt].ValidityScaleList[vs].ValidityScaleName,
                            TestToolCode: response.CutOffDetailData.ListByTest[bt].TestToolCode,
                            TestToolName: response.CutOffDetailData.ListByTest[bt].TestToolName,
                            TestTypeCode: response.CutOffDetailData.ListByTest[bt].TestTypeCode,
                            TestTypeName: response.CutOffDetailData.ListByTest[bt].TestTypeName,
                            DisplayOrderTestTool: response.CutOffDetailData.ListByTest[bt].DisplayOrderTestTool,
                        })
                    }
                }
                var arrTestVS = $.merge(arrTest, arrVS)
                viewModel.set("CutOffDetails", arrTestVS)
                
                if (viewModel.CutOffDetail.length > 0) {
                    var listSubTested = $.merge(viewModel.listBySubTest, viewModel.CutOffDetail);
                    localStorage.setItem("BySubTest", JSON.stringify(listSubTested));
                    var valueSubTested = JSON.parse(localStorage.getItem("BySubTest"));
                    gridListCutOff(valueSubTested)
                }
                if (viewModel.CutOffDetails.length > 0) {
                    var listTested = $.merge(viewModel.listByTest, viewModel.CutOffDetails);
                    localStorage.setItem("ByTest", JSON.stringify(listTested));
                    var valueTested = JSON.parse(localStorage.getItem("ByTest"));
                    gridListCutOffs(valueTested)
                }
                
                //var coll = document.getElementsByClassName("collapsible");
                //for (i = 0; i < coll.length; i++) {
                //    coll[i].addEventListener("click", function () {
                //        this.classList.toggle("active");
                //        var content = this.nextElementSibling;
                //        if (content.style.maxHeight) {
                //            content.style.maxHeight = null;
                //        } else {
                //            content.style.maxHeight = content.scrollHeight + "px";
                //        }
                //    });
                //}
                competenciesGrid();
            },
            error: function (xhr, status, error) {
                MessageBox.show("Error", "Error");
            }
        });
    }
    else {
        LoadingMask.show();
        CompanyLoad();
        GradeLoad();
        $('#btnDeleteCompetency').hide()
    }
}
loadPage = function () {
    if (viewModel.CutOffDetail.length == 0 || viewModel.CutOffDetails.length == 0) {
        var dataInstruction = { "title": '', "description": '', "disclaimer": '' };
        $.indexedDB('LocalStore').objectStore("CutOff", { "autoIncrement": false }).add(dataInstruction, "BySubTest").then(function (val) {
            dataInstruction.id = val;
            console.info(val);
        }, console.error);
    } else {
        var dataInstruction = { "title": '', "description": '', "disclaimer": '' };
        $.indexedDB('LocalStore').objectStore("CutOff", { "autoIncrement": false }).add(dataInstruction, "BySubTest").then(function (val) {
            dataInstruction.id = val;
            console.info(val);
        }, console.error);

        var request = indexedDB.open('LocalStore');
        request.onsuccess = function (event) {
            var db = request.result;
            var transaction = db.transaction(["CutOff"], "readwrite");
            transaction.oncomplete = function (event) {
            };
            transaction.onerror = function (event) {
            };
            var objectStore = transaction.objectStore('CutOff');
            var objectStoreRequest = objectStore.delete('BySubTest');
            var objectStoreRequests = objectStore.delete('ByTest');
            objectStoreRequest.onsuccess = function () {
            }
            objectStoreRequests.onsuccess = function () {
            }
            request.onerror = function (event) {
                console.info, console.error
            }
        }
    }
}

CompanyLoad = function () {
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Company",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            LoadingMask.hide();
            if (response.Data.length < 1) {
                swal("Failed!", "Company Not Found", "warning", { closeOnClickOutside: false });
            }
            else {
                viewModel.set('CompanyList', response.Data);
                viewModel.set('CompanyName', "");
                dropDownCompany();
            }
        }
    });
}
CompanyLoadDetail = function (selectedCompany) {
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Company",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            LoadingMask.hide();
            if (response.Data.length < 1) {
                swal("Failed!", "Company Not Found", "warning", { closeOnClickOutside: false });
            }
            else {
                viewModel.set('CompanyList', response.Data);
                if (viewModel.CompanyID !== "") {
                    viewModel.set('CompanyName', selectedCompany);
                }
                dropDownCompany();
            }
        }
    });
}
dropDownCompany = function () {
    $("#CompanyID").kendoComboBox({
        autoBind: true,
        placeholder: "Select Company..",
        dataSource: viewModel.CompanyList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.CompanyList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.CompanyList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.CompanyID !== "") {
                viewModel.set('CompanyID', id);
                viewModel.set('CompanyName', name);
            } else {
                viewModel.set('CompanyID', id);
                viewModel.set('CompanyName', name);
            }
            TestTypeByMappingSubTest();
            TestTypeByMappingTest();
        }
    });
}

GradeLoad = function () {
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Grade",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Data.length < 1) {
                swal("Failed!", "Grade Not Found", "warning", { closeOnClickOutside: false });
            }
            else {
                viewModel.set('GradeList', response.Data);
                viewModel.set('GradeName', "");
                dropDownGrade();
            }
        }
    });
}
GradeLoadDetail = function (selectedGrade) {
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Grade",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Data.length < 1) {
                swal("Failed!", "Grade Not Found", "warning", { closeOnClickOutside: false });
            }
            else {
                viewModel.set('GradeList', response.Data);
                if (viewModel.GradeID !== "") {
                    viewModel.set('GradeName', selectedGrade);
                }
                TestTypeByMappingSubTest();
                TestTypeByMappingTest();
                dropDownGrade();
            }
        }
    });
}
dropDownGrade = function () {
    $("#GradeID").kendoComboBox({
        autoBind: true,
        placeholder: "Select Grade..",
        dataSource: viewModel.GradeList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.GradeList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.GradeList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.GradeID !== "") {
                viewModel.set('GradeID', id);
                viewModel.set('GradeName', name);
            } else {
                viewModel.set('GradeID', id);
                viewModel.set('GradeName', name);
            }
        }
    });
}

dropDownTestType = function () {
    $("#TestTypeName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestTypeList,
        dataTextField: "Value",
        dataValueField: "Value",
        //change: onChangeTestType,
        select: function (e) {
            var id = viewModel.TestTypeList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.TestTypeList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.TestTypeCode !== "") {
                viewModel.set('TestTypeCode', id);
                viewModel.set('TestTypeName', name);
                TestToolByMappingTestType();
            } else {
                viewModel.set('TestTypeCode', id);
                viewModel.set('TestTypeName', name);
                TestToolByMappingTestType();
            }
            //viewModel.set('TestTypeName', e.item.context.innerHTML);
        }
    });
}
onChangeTestType = function (source) {
    if (data.sender._selectedValue !== data.sender._prev) {
        var check_value = source.sender._selectedValue;
        viewModels.set('TestTypeCode', check_value);
    }
    //TestToolByMappingTestType();
}

dropDownTestTool = function () {
    $("#TestToolName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.TestToolList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.TestToolList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.TestToolCode !== "") {
                viewModel.set('TestToolCode', id);
                viewModel.set('TestToolName', name);
            } else {
                viewModel.set('TestToolCode', id);
                viewModel.set('TestToolName', name);
            }
        }
    });
}
onChangeTestTool = function (source) {
    var check_value = source.sender._selectedValue;
    viewModel.set('TestToolCode', check_value)
}

dropDownTestTypes = function () {
    $("#TestTypes").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestTypeTestList,
        dataTextField: "Value",
        dataValueField: "Value",
        select: function (e) {
            var id = viewModel.TestTypeTestList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.TestTypeTestList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.TestTypeCode !== "") {
                viewModel.set('TestTypeCode', id);
                viewModel.set('TestTypeName', name);
                TestToolByMappingTestTypes();
            } else {
                viewModel.set('TestTypeCode', id);
                viewModel.set('TestTypeName', name);
                TestToolByMappingTestTypes();
            }
            //viewModel.set('TestTypeName', e.item.context.innerHTML);
        }
    });
}
onChangeTestTypes = function (source) {
    if (data.sender._selectedValue !== data.sender._prev) {
        var check_value = source.sender._selectedValue;
        viewModels.set('TestTypeCode', check_value);
    }
    //var check_value = source.sender._selectedValue;
    //viewModels.set('TestTypeCode', check_value);
    //TestToolByMappingTestTypes();
}

dropDownTestTools = function () {
    $("#TestTools").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolListTest,
        dataTextField: "Value",
        dataValueField: "Code",
        //change: onChangeTestTools,
        select: function (e) {
            var id = viewModel.TestToolListTest.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.TestToolListTest.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.TestToolCode !== "") {
                viewModel.set('TestToolCode', id);
                viewModel.set('TestToolName', name);
            } else {
                viewModel.set('TestToolCode', id);
                viewModel.set('TestToolName', name);
            }
        }
    });
}
onChangeTestTools = function (source) {
    var check_value = source.sender._selectedValue;
    viewModel.set('TestToolCode', check_value)
}

onLoads = function () {
    var value = JSON.parse(localStorage.getItem("ByTest"));
    gridListCutOffs(value);
}

CancelbySub = function () {
    var dialog = $("#dialog").data('kendoWindow');
    //$('#theForm')[0].reset()
    //checkConfigScoreSubTest()
    dialog.close();
}
CancelbyTest = function () {
    var dialog = $("#dialogByTest").data('kendoWindow');
    dialog.refresh();
    dialog.close();
}
CancelCheckCompetency = function () {
    var dialog = $("#dialogCheckCompetency").data('kendoWindow');
    dialog.refresh();
    dialog.close();
}

renderGrid = function () {
    var dataSource = "";
    var dataSourceClone = '';

    if (viewModel.detailSubTest == true) {
        dataSource = viewModel.listDetailSubTest;
    } else {
        dataSource = viewModel.ApplicantList;
    }
    
    if (dataSource.length > 0) {
        dataSourceClone = JSON.parse(JSON.stringify(dataSource));
    } else {
        dataSourceClone = []
    }

    $("#gridTable").kendoGrid({
        width: 350,
        dataSource: {
            data: dataSourceClone,
            //pageSize: 10,
        },
        columns: [
            { field: "SubTestName", title: "<center>Sub Test</center>", width: "50%"},
            {
                field: "IsDisplay", type: "boolean", editable: "false", width: "10%",
                title: "<center>Display</center>", sortable: false, //<input class='k-grid-display' type='checkbox' href='#' onclick='selectAll(this)'/>
                template: function (dataItem) {
                    var ID = dataItem.SubTestCode;
                    var SubTestCode = dataItem.SubTestCode;
                    var TestTypeCode = dataItem.TestTypeCode;
                    var TestToolCode = dataItem.TestToolCode;
                    var SubTestName = dataItem.SubTestName;
                    if (dataItem.HasParent == true && dataItem.HasChild == false) { //child
                        if (dataItem.IsDisplay == true) {
                            if (viewModel.role_name == 'AFFCO') {
                                if (viewModel.arrSubTestAffco.length > 0) {
                                    for (arr = 0; arr < viewModel.arrSubTestAffco.length; arr++) {
                                        if (SubTestCode == viewModel.arrSubTestAffco[arr]) {
                                            return "<center><input id='" + ID + "' name='" + ID + "' SubTestName='" + SubTestName + "' TestToolCode='" + TestToolCode + "' TestTypeCode='" + TestTypeCode + "' SubTestCode='" + SubTestCode + "' class='checkone' type='checkbox' " + (dataItem.IsDisplay == 'true' ? "checked" : "") + " checked='true' onclick='lockon(this)'/></center>"
                                        }
                                    }
                                }
                                return "<center><input id='" + ID + "' name='" + ID + "' SubTestName='" + SubTestName + "' TestToolCode='" + TestToolCode + "' TestTypeCode='" + TestTypeCode + "' SubTestCode='" + SubTestCode + "' class='checkone' type='checkbox' " + (dataItem.IsDisplay == 'true' ? "checked" : "") + " checked='true' onclick='lockon(this)' disabled='disabled'/></center>"
                            } else {
                                return "<center><input id='" + ID + "' name='" + ID + "' SubTestName='" + SubTestName + "' TestToolCode='" + TestToolCode + "' TestTypeCode='" + TestTypeCode + "' SubTestCode='" + SubTestCode + "' class='checkone' type='checkbox' " + (dataItem.IsDisplay == 'true' ? "checked" : "") + " checked='true' onclick='lockon(this)'/></center>"
                            }
                        } else {
                            return "<center><input id='" + ID + "' name='" + ID + "' SubTestName='" + SubTestName + "' TestToolCode='" + TestToolCode + "' TestTypeCode='" + TestTypeCode + "' SubTestCode='" + SubTestCode + "' class='checkone' type='checkbox' " + (dataItem.IsDisplay == 'true' ? "checked" : "") + " onclick='lockoff(this)'/></center>"
                        }
                    } else if (dataItem.HasParent == false && dataItem.HasChild == false) {
                        if (dataItem.IsDisplay == true) {
                            if (viewModel.role_name == 'AFFCO') {
                                if (viewModel.arrSubTestAffco.length > 0) {
                                    for (arr = 0; arr < viewModel.arrSubTestAffco.length; arr++) {
                                        if (SubTestCode == viewModel.arrSubTestAffco[arr]) {
                                            return "<center><input id='" + ID + "' name='" + ID + "' SubTestName='" + SubTestName + "' TestToolCode='" + TestToolCode + "' TestTypeCode='" + TestTypeCode + "' SubTestCode='" + SubTestCode + "' class='checkone' type='checkbox' " + (dataItem.IsDisplay == 'true' ? "checked" : "") + " checked='true' onclick='lockon(this)'/></center>"
                                        }
                                    }
                                }
                                return "<center><input id='" + ID + "' name='" + ID + "' SubTestName='" + SubTestName + "' TestToolCode='" + TestToolCode + "' TestTypeCode='" + TestTypeCode + "' SubTestCode='" + SubTestCode + "' class='checkone' type='checkbox' " + (dataItem.IsDisplay == 'true' ? "checked" : "") + " checked='true' onclick='lockon(this)' disabled='disabled'/></center>"
                            } else {
                                return "<center><input id='" + ID + "' name='" + ID + "' SubTestName='" + SubTestName + "' TestToolCode='" + TestToolCode + "' TestTypeCode='" + TestTypeCode + "' SubTestCode='" + SubTestCode + "' class='checkone' type='checkbox' " + (dataItem.IsDisplay == 'true' ? "checked" : "") + " checked='true' onclick='lockon(this)'/></center>"
                            }
                        } else {
                            return "<center><input id='" + ID + "' name='" + ID + "' SubTestName='" + SubTestName + "' TestToolCode='" + TestToolCode + "' TestTypeCode='" + TestTypeCode + "' SubTestCode='" + SubTestCode + "' class='checkone' type='checkbox' " + (dataItem.IsDisplay == 'true' ? "checked" : "") + " onclick='lockoff(this)'/></center>"
                        }
                    } else if (dataItem.HasParent == false && dataItem.HasChild == true) { //parent
                        return "<label></label>"
                    }
                }
            },
            {
                field: "DisplayOrder", title: "<center>Display Order</center>", width: "20%",
                template: function (dataRole) {
                    if (dataRole.HasParent == true && dataRole.HasChild == false) { //child
                        if (dataRole.IsDisplay == true) {
                            return "<center><input type='number' data-role='numerictextbox' class='k-textbox numeric' IsDisplay='true' id='D" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.DisplayOrder + "' style='width:50%; text-align:center;' onchange='dataDisplay(this)'/></center>"
                        } else {
                            if (dataRole.DisplayOrder == 0) {
                                return "<center><input type='number' data-role='numerictextbox' class='k-textbox numeric' IsDisplay='false' id='D" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.DisplayOrder + "' style='width:50%; text-align:center;' disabled='disabled' onchange='dataDisplay(this)'/></center>"
                            } else {
                                dataRole.set('DisplayOrder', 0);
                                return "<center><input type='number' data-role='numerictextbox' class='k-textbox numeric' IsDisplay='false' id='D" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.DisplayOrder + "' style='width:50%; text-align:center;' disabled='disabled' onchange='dataDisplay(this)'/></center>"
                            }
                        }
                    } else if (dataRole.HasParent == false && dataRole.HasChild == false) {
                        if (dataRole.IsDisplay == true) {
                            return "<center><input type='number' data-role='numerictextbox' class='k-textbox numeric' IsDisplay='true' id='D" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.DisplayOrder + "' style='width:50%; text-align:center;' onchange='dataDisplay(this)'/></center>"
                        } else {
                            if (dataRole.DisplayOrder == 0) {
                                return "<center><input type='number' data-role='numerictextbox' class='k-textbox numeric' IsDisplay='false' id='D" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.DisplayOrder + "' style='width:50%; text-align:center;' disabled='disabled' onchange='dataDisplay(this)'/></center>"
                            } else {
                                dataRole.set('DisplayOrder', 0);
                                return "<center><input type='number' data-role='numerictextbox' class='k-textbox numeric' IsDisplay='false' id='D" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.DisplayOrder + "' style='width:50%; text-align:center;' disabled='disabled' onchange='dataDisplay(this)'/></center>"
                            }
                        }
                    } else if (dataRole.HasParent == false && dataRole.HasChild == true) { //parent
                        return "<label></label>"
                    }
                }
            },
            {
                //field: "CutOffScore", title: "<center>Cut Off<span class='mandatory'>*</span></center>", width: "40px",
                field: "CutOffScore", title: "<center>Cut Off</center>", width: "20%",
                template: function (dataRole) {
                    if (dataRole.HasParent == true && dataRole.HasChild == false) { //child
                        return "<label></label>"
                    } else if (dataRole.HasParent == false && dataRole.HasChild == false) {
                        if (dataRole.IsDisplay == true) {
                            if(viewModel.role_name == 'AFFCO'){
                                if(viewModel.arrSubTestAffco.length > 0){
                                    for(saffco = 0; saffco < viewModel.arrSubTestAffco.length; saffco++){
                                        if(viewModel.arrSubTestAffco[saffco] == dataRole.SubTestCode){
                                            return "<center><input type='number' class='k-textbox' data-role='numerictextbox' IsDisplay='true' id='C" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.CutOffScore + "' style='width:50%; text-align:center;' disabled='disabled' onchange='dataCutOff(this)'/></center>"
                                        } 
                                        //else {
                                        //    return "<center><input type='number' class='k-textbox' data-role='numerictextbox' IsDisplay='true' id='C" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.CutOffScore + "' style='width:50%; text-align:center;' onchange='dataCutOff(this)'/></center>"
                                        //}
                                    }
                                    return "<center><input type='number' class='k-textbox' data-role='numerictextbox' IsDisplay='true' id='C" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.CutOffScore + "' style='width:50%; text-align:center;' onchange='dataCutOff(this)'/></center>"
                                } else {
                                    return "<center><input type='number' class='k-textbox' data-role='numerictextbox' IsDisplay='true' id='C" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.CutOffScore + "' style='width:50%; text-align:center;' onchange='dataCutOff(this)'/></center>"
                                }
                            } else {
                                return "<center><input type='number' class='k-textbox' data-role='numerictextbox' IsDisplay='true' id='C" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.CutOffScore + "' style='width:50%; text-align:center;' onchange='dataCutOff(this)'/></center>"
                            }
                        } else {
                            return "<center><input type='number' class='k-textbox' data-role='numerictextbox' IsDisplay='false' id='C" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.CutOffScore + "' style='width:50%; text-align:center;' disabled='disabled' onchange='dataCutOff(this)'/></center>"
                        }
                    } else if (dataRole.HasParent == false && dataRole.HasChild == true) { //parent
                        if (dataRole.IsDisplay == true) {
                            if(viewModel.role_name == 'AFFCO'){
                                if(viewModel.arrSubTestAffco.length > 0){
                                    for(saffco = 0; saffco < viewModel.arrSubTestAffco.length; saffco++){
                                        if(viewModel.arrSubTestAffco[saffco] == dataRole.SubTestCode){
                                            return "<center><input type='number' class='k-textbox' data-role='numerictextbox' IsDisplay='true' id='C" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.CutOffScore + "' style='width:50%; text-align:center;' disabled='disabled' onchange='dataCutOff(this)'/></center>"
                                        } else {
                                            return "<center><input type='number' class='k-textbox' data-role='numerictextbox' IsDisplay='true' id='C" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.CutOffScore + "' style='width:50%; text-align:center;' onchange='dataCutOff(this)'/></center>"
                                        }
                                    }
                                } else {
                                    return "<center><input type='number' class='k-textbox' data-role='numerictextbox' IsDisplay='true' id='C" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.CutOffScore + "' style='width:50%; text-align:center;' onchange='dataCutOff(this)'/></center>"
                                }
                            } else {
                                return "<center><input type='number' class='k-textbox' data-role='numerictextbox' IsDisplay='true' id='C" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.CutOffScore + "' style='width:50%; text-align:center;' onchange='dataCutOff(this)'/></center>"
                            }
                        } else {
                            return "<center><input type='number' class='k-textbox' data-role='numerictextbox' IsDisplay='false' id='C" + dataRole.SubTestCode + "' name='check" + dataRole.SubTestCode + "' value='" + dataRole.CutOffScore + "' style='width:50%; text-align:center;' onchange='dataCutOff(this)'/></center>"
                        }
                    }
                }
            }
        ],
        editable: false,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        }
        //dataBound: function (e) {
        //    var gridDataView = $("#gridTable").data().kendoGrid.dataSource.view();
        //    for (var i = 0; i < gridDataView.length; i++) {
        //        var check = $.grep(viewModel.ArrayChecked, function (e) { return e == gridDataView[i].ActivityID });
        //        if (check.length > 0) {
        //            $("#gridMember tr td input").eq(i).prop("checked", true);
        //        }
        //    }
        //},
    });
}
renderByTest = function () {
    var dataSource = '';
    var dataSourceClone = '';

    if (viewModel.detailTest == true) {
        dataSource = viewModel.listDetailTest;
    } else {
        dataSource = viewModel.ByTestList;
    }

    if (dataSource.length > 0) {
        dataSourceClone = JSON.parse(JSON.stringify(dataSource));
    } else {
        dataSourceClone = [];
    }

    $("#gridByTest").kendoGrid({
        width: 350,
        dataSource: {
            data: dataSourceClone, //data ajax request
            pageSize: 5,
        },
        columns: [
            { field: "SubTestName", title: "<center>Sub Test</center>", width: "200px" },
            {
                field: "CutOffScore", title: "<center>Cut Off Score<span class='mandatory'>*</span></center>", width: "40px",
                template: function (dataRole) {
                    if (viewModel.role_name == 'AFFCO') {
                        if (dataRole.CutOffScore == 0) {
                            return "<input type='number' class='k-textbox' data-role='numerictextbox' id='" + dataRole.SubTestCode + "' name='Cut" + dataRole.SubTestCode + "' value='" + dataRole.CutOffScore + "'  style='width:100%;' onchange='dataCutOff(this)' disabled='disabled'/>"
                        } else {
                            return "<input type='number' class='k-textbox' data-role='numerictextbox' id='" + dataRole.SubTestCode + "' name='Cut" + dataRole.SubTestCode + "' value='" + dataRole.CutOffScore + "'  style='width:100%;' onchange='dataCutOff(this)'/>"
                        }
                    } else {
                        return "<input type='number' class='k-textbox' data-role='numerictextbox' id='" + dataRole.SubTestCode + "' name='Cut" + dataRole.SubTestCode + "' value='" + dataRole.CutOffScore + "'  style='width:100%;' onchange='dataCutOff(this)'/>"
                    }
                }
            }
        ],
        editable: false,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        }
    });
}
renderGridCutOffValidityScale = function () {
    var dataSource = '';
    var dataSourceClone = '';

    if (viewModel.detailTest == true) {
        dataSource = viewModel.listDetailTestVS;
    } else {
        dataSource = viewModel.ValidityScaleList;
    }

    if (dataSource.length > 0) {
        dataSourceClone = JSON.parse(JSON.stringify(dataSource));
    } else {
        dataSourceClone = [];
    }

    $("#gridCutOffValidityScale").kendoGrid({
        width: 350,
        dataSource: {
            data: dataSourceClone,
            pageSize: 5,
        },
        columns: [
            { field: "ValidityScaleName", title: "<center>Validity Scale</center>", width: "200px" },
            {
                field: "CutOffScore", title: "<center>Min. Reconfirm Score<span class='mandatory'>*</span></center>", width: "40px",
                template: function (dataRole) {
                    if (viewModel.role_name == 'AFFCO') {
                        return "<input type='number' class='k-textbox' id='" + dataRole.ValidityScaleCode + "' name='Cut" + dataRole.ValidityScaleCode + "' value='" + dataRole.CutOffScore + "'  style='width:100%;' onchange='dataCutOffValidityScale(this)' disabled='disabled'/>"
                    } else {
                        return "<input type='number' class='k-textbox' id='" + dataRole.ValidityScaleCode + "' name='Cut" + dataRole.ValidityScaleCode + "' value='" + dataRole.CutOffScore + "'  style='width:100%;' onchange='dataCutOffValidityScale(this)'/>"
                    }
                }
            }
        ],
        editable: true,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        }
    });
}

addSubTest = function (data) {
    $("#searchButtonSubTest").show();
    $("#cutOffIQField").hide();
    if (viewModel.CompanyID == "" || viewModel.CompanyName == "") {
        swal("Failed!", "You have to select the company to continue", "warning", { closeOnClickOutside: false });
        return;
    }
    if (viewModel.GradeID == "" || viewModel.GradeName == "") {
        swal("Failed!", "You have to select the grade to continue", "warning", { closeOnClickOutside: false });
        return;
    }
    var edit = $(data).attr('edit');
    var TestTypeCode = $(data).attr('testTypeCode');
    var TestTypeName = $(data).attr('testTypeName');
    var TestToolCode = $(data).attr('testToolCode');
    var TestToolName = $(data).attr('testToolName');
    if (edit == 'true') {
        viewModel.set('TestTypeCode', TestTypeCode);
        viewModel.set('TestTypeName', TestTypeName);
        viewModel.set('TestToolCode', TestToolCode);
        viewModel.set('TestToolName', TestToolName);
        viewModel.set('TestTool', TestToolName);
        viewModels.set('TestTypeCode', TestTypeCode);
        $("#TestTypeName").kendoComboBox({ enable: false });
        $("#TestToolName").kendoComboBox({ enable: false });
        $("#searchButtonSubTest").hide();
        if (viewModel.listDetailSubTest.length !== 0) {
            viewModel.set('listDetailSubTest', [])
        }
        if (viewModel.ArrayChecked.length !== 0) {
            viewModel.set('ArrayChecked', [])
        }
        if (viewModel.bySubList.length > 0) {
            for (a = 0; a < viewModel.bySubList.length; a++) {
                var NormScoreIQCode = viewModel.bySubList[a].NormScoreIQCode
                var NormScoreIQName = viewModel.bySubList[a].NormScoreIQName
                if (TestTypeCode == viewModel.bySubList[a].TestTypeCode &&
                    TestToolCode == viewModel.bySubList[a].TestToolCode) {
                    viewModel.listDetailSubTest.push({
                        CutOffScore: viewModel.bySubList[a].CutOffScore,
                        DisplayOrder: viewModel.bySubList[a].DisplayOrder,
                        HasChild: viewModel.bySubList[a].HasChild,
                        HasIQ: viewModel.bySubList[a].HasIQ,
                        HasParent: viewModel.bySubList[a].HasParent,
                        IsDisplay: viewModel.bySubList[a].IsDisplay,
                        ParentCode: viewModel.bySubList[a].ParentCode,
                        ParentName: viewModel.bySubList[a].ParentName,
                        SubTestCode: viewModel.bySubList[a].SubTestCode,
                        SubTestName: viewModel.bySubList[a].SubTestName,
                        TestToolCode: viewModel.bySubList[a].TestToolCode,
                        TestToolName: viewModel.bySubList[a].TestToolName,
                        TestTypeCode: viewModel.bySubList[a].TestTypeCode,
                        TestTypeName: viewModel.bySubList[a].TestTypeName,
                        DisplayOrderTestTool: viewModel.bySubList[a].DisplayOrderTestTool,
                        CutOffIQCheckBox: viewModel.bySubList[a].CutOffIQCheckBox,
                        CutOffIQ: viewModel.bySubList[a].CutOffIQ,
                        NormScoreIQCode: viewModel.bySubList[a].NormScoreIQCode,
                        NormScoreIQName: viewModel.bySubList[a].NormScoreIQName
                    })
                    viewModel.ArrayChecked.push({
                        CutOffScore: viewModel.bySubList[a].CutOffScore,
                        DisplayOrder: viewModel.bySubList[a].DisplayOrder,
                        HasChild: viewModel.bySubList[a].HasChild,
                        HasIQ: viewModel.bySubList[a].HasIQ,
                        HasParent: viewModel.bySubList[a].HasParent,
                        IsDisplay: viewModel.bySubList[a].IsDisplay,
                        ParentCode: viewModel.bySubList[a].ParentCode,
                        ParentName: viewModel.bySubList[a].ParentName,
                        SubTestCode: viewModel.bySubList[a].SubTestCode,
                        SubTestName: viewModel.bySubList[a].SubTestName,
                        TestToolCode: viewModel.bySubList[a].TestToolCode,
                        TestToolName: viewModel.bySubList[a].TestToolName,
                        TestTypeCode: viewModel.bySubList[a].TestTypeCode,
                        TestTypeName: viewModel.bySubList[a].TestTypeName,
                        DisplayOrderTestTool: viewModel.bySubList[a].DisplayOrderTestTool,
                        CutOffIQCheckBox: viewModel.bySubList[a].CutOffIQCheckBox,
                        CutOffIQ: viewModel.bySubList[a].CutOffIQ,
                        NormScoreIQCode: viewModel.bySubList[a].NormScoreIQCode,
                        NormScoreIQName: viewModel.bySubList[a].NormScoreIQName
                    })
                }
                //if(viewModel.role_name == 'AFFCO'){
                //    if(viewModel.arrSubTestAffco.length > 0){
                //        for(saffco = 0; saffco < viewModel.arrSubTestAffco.length; saffco++){
                //            if(viewModel.arrSubTestAffco[saffco] == viewModel.bySubList[a].SubTestCode){
                //                $('#C' + viewModel.bySubList[a].SubTestCode).prop('disabled', true)
                //            }
                //        }
                //    }
                //}
            }
        }
        viewModel.set('detailSubTest', true);
        viewModel.set('NormScoreIQCode', NormScoreIQCode)
        viewModel.set('NormScoreIQName', NormScoreIQName)
        checkConfigIQ(edit);
        //$('#NormScoreIQName').val(NormScoreIQName)
        TestTypeByMappingSubTest();
        dropDownTestType();
    } else {
        viewModel.set("TestTypeName", "");
        viewModel.set("TestToolName", "");
        $("#TestTypeName").data("kendoComboBox").enable(true);
        $("#TestToolName").data("kendoComboBox").enable(true);
        viewModel.set('detailSubTest', false);
        viewModel.ApplicantList.data([]);
    }
    renderGrid();
    var dialog = $("#dialog");
    dialog.kendoWindow({
        minWidth: "330px",
        height: 375,
        top: 192.3,
        title: "Add By Sub Test",
        visible: false,
        actions: [
            //"Minimize",
            //"Maximize",
            "Close"
        ],
        open: onOpen,
        close: onClose

    });
    var dialogs = dialog.data("kendoWindow").open();
    $('.list-data').removeAttr('hidden');
    dialogs.center();
}
addTest = function (data) {
    $("#searchButtonTest").show();
    if (viewModel.CompanyID == "" || viewModel.CompanyName == "") {
        swal("Failed!!!", "You have to select the company to continue", "warning", { closeOnClickOutside: false });
        return;
    }
    if (viewModel.GradeID == "" || viewModel.GradeName == "") {
        swal("Failed!", "You have to select the grade to continue", "warning", { closeOnClickOutside: false });
        return;
    }
    var edit = $(data).attr('edit');
    var TestTypeCode = $(data).attr('testTypeCode');
    var TestTypeName = $(data).attr('testTypeName');
    var TestToolCode = $(data).attr('testToolCode');
    var TestToolName = $(data).attr('testToolName');
    if (edit == 'true') {
        viewModel.set('TestTypeCode', TestTypeCode);
        viewModel.set('TestTypeName', TestTypeName);
        viewModel.set('TestToolCode', TestToolCode);
        viewModel.set('TestToolName', TestToolName);
        viewModel.set('TestTool', TestToolName);
        viewModels.set('TestTypeCode', TestTypeCode);
        //viewModels.set('TestToolCode', TestToolCode);
        $("#TestTypes").kendoComboBox({ enable: false });
        $("#TestTools").kendoComboBox({ enable: false });
        $("#searchButtonTest").hide();
        if (viewModel.listDetailTest.length !== 0) {
            viewModel.set('listDetailTest', [])
        }
        if (viewModel.listDetailTestVS.length !== 0) {
            viewModel.set('listDetailTestVS', [])
        }
        if (viewModel.byTestSubTestList.length > 0) {
            for (a = 0; a < viewModel.byTestSubTestList.length; a++) {
                if (TestTypeCode == viewModel.byTestSubTestList[a].TestTypeCode &&
                    TestToolCode == viewModel.byTestSubTestList[a].TestToolCode) {
                    viewModel.listDetailTest.push({
                        TestTypeCode: viewModel.byTestSubTestList[a].TestTypeCode,
                        TestTypeName: viewModel.byTestSubTestList[a].TestTypeName,
                        TestToolCode: viewModel.byTestSubTestList[a].TestToolCode,
                        TestToolName: viewModel.byTestSubTestList[a].TestToolName,
                        SubTestCode: viewModel.byTestSubTestList[a].SubTestCode,
                        SubTestName: viewModel.byTestSubTestList[a].SubTestName,
                        IsDisplay: true,
                        CutOffScore: viewModel.byTestSubTestList[a].CutOffScore,
                        DisplayOrderTestTool: viewModel.byTestSubTestList[a].DisplayOrderTestTool
                    })
                }
            }
        }
        if (viewModel.byTestValidityScaleList.length > 0) {
            for (a = 0; a < viewModel.byTestValidityScaleList.length; a++) {
                if (TestTypeCode == viewModel.byTestValidityScaleList[a].TestTypeCode &&
                    TestToolCode == viewModel.byTestValidityScaleList[a].TestToolCode) {
                    viewModel.listDetailTestVS.push({
                        TestTypeCode: viewModel.byTestValidityScaleList[a].TestTypeCode,
                        TestTypeName: viewModel.byTestValidityScaleList[a].TestTypeName,
                        TestToolCode: viewModel.byTestValidityScaleList[a].TestToolCode,
                        TestToolName: viewModel.byTestValidityScaleList[a].TestToolName,
                        ValidityScaleCode: viewModel.byTestValidityScaleList[a].ValidityScaleCode,
                        ValidityScaleName: viewModel.byTestValidityScaleList[a].ValidityScaleName,
                        IsDisplay: true,
                        CutOffScore: viewModel.byTestValidityScaleList[a].CutOffScore,
                        DisplayOrderTestTool: viewModel.byTestValidityScaleList[a].DisplayOrderTestTool
                    })
                }
            }
        }

        //if (viewModel.listByTest.length > 0) {
        //    for (a = 0; a < viewModel.listByTest.length; a++) {
        //        if (TestTypeCode == viewModel.listByTest[a].TestTypeCode &&
        //            TestToolCode == viewModel.listByTest[a].TestToolCode) {
        //            if (viewModel.listByTest[a].SubTestCode) {
        //                viewModel.listDetailTest.push({
        //                    TestTypeCode: viewModel.listByTest[a].TestTypeCode,
        //                    TestTypeName: viewModel.listByTest[a].TestTypeName,
        //                    TestToolCode: viewModel.listByTest[a].TestToolCode,
        //                    TestToolName: viewModel.listByTest[a].TestToolName,
        //                    SubTestCode: viewModel.listByTest[a].SubTestCode,
        //                    SubTestName: viewModel.listByTest[a].SubTestName,
        //                    ValidityScaleCode: viewModel.listByTest[a].ValidityScaleCode,
        //                    ValidityScaleName: viewModel.listByTest[a].ValidityScaleName,
        //                    IsDisplay: true,
        //                    CutOffScore: viewModel.listByTest[a].CutOffScore,
        //                    DisplayOrderTestTool: viewModel.listByTest[a].DisplayOrderTestTool
        //                })
        //            }
        //            if (viewModel.listByTest[a].ValidityScaleCode) {
        //                viewModel.listDetailTestVS.push({
        //                    TestTypeCode: viewModel.listByTest[a].TestTypeCode,
        //                    TestTypeName: viewModel.listByTest[a].TestTypeName,
        //                    TestToolCode: viewModel.listByTest[a].TestToolCode,
        //                    TestToolName: viewModel.listByTest[a].TestToolName,
        //                    ValidityScaleCode: viewModel.listByTest[a].ValidityScaleCode,
        //                    ValidityScaleName: viewModel.listByTest[a].ValidityScaleName,
        //                    IsDisplay: true,
        //                    CutOffScore: viewModel.listByTest[a].CutOffScore,
        //                    DisplayOrderTestTool: viewModel.listByTest[a].DisplayOrderTestTool
        //                })
        //            }
        //        }
        //    }
        //}
        viewModel.set('detailTest', true);
        TestTypeByMappingTest();
        dropDownTestTypes();
    } else {
        viewModel.set("TestTypeName", "");
        viewModel.set("TestToolName", "");
        $("#TestTypes").data("kendoComboBox").enable(true);
        $("#TestTools").data("kendoComboBox").enable(true);
        viewModel.set('detailTest', false);
        viewModel.ByTestList.data([]);
        viewModel.TestTypeTestList;
        dropDownTestTypes();
    }
    renderByTest();
    renderGridCutOffValidityScale();
    var dialog = $("#dialogByTest");
    dialog.kendoWindow({
        minWidth: "330px",
        height: 600,
        top: 192.3,
        title: "Add By Test",
        visible: false,
        actions: [
            //"Minimize",
            //"Maximize",
            "Close"
        ],
        open: onOpen,
        close: onClose

    });
    var dialogs = dialog.data("kendoWindow").open();
    $('.list-dataByTest').removeAttr('hidden');
    dialogs.center();
}

Ok = function () {
    //alert("Ok!!");
    MessageBox.show("Info", "Ok!!");
}
Cancel = function (e) {
    window.location.reload();
}

function onClose() {
    $("#dialog").fadeIn();
    //viewModel.set('ArrayChecked', []);
}
function onOpen() {
    $("#dialog").fadeIn();
}

onLoadData = function () {
    var value = JSON.parse(localStorage.getItem("BySubTest"));
    gridListCutOff(value); 
}

lockoff = function (data) {
    //checked
    var id = $(data).attr('id');
    var SubTestCode = $(data).attr('SubTestCode');
    var List = viewModel.ArrayChecked;
    var arrSubTestAffco = viewModel.arrSubTestAffco;
    if (viewModel.role_name == 'AFFCO') {
        //arrSubTestAffco.push(SubTestCode)
        $('#C' + id).prop("disabled", true)
    } else {
        $('#C' + id).removeAttr('disabled');
        $('#C' + idChildLain).removeAttr('disabled');
    }

    //CHECK JIKA 1 CHILD SUDAH DICENTANG MAKA CHILD LAINNYA KECENTANG OTOMATIS
    for (c = 0; c < List.length; c++) {
        if (List[c].HasParent == true && List[c].HasChild == false) {
            if (List[c].SubTestCode == SubTestCode) {
                var ParentCode = List[c].ParentCode
                arrSubTestAffco.push(ParentCode)
            }
            if (List[c].ParentCode == ParentCode) {
                var idChildLain = List[c].SubTestCode
                arrSubTestAffco.push(idChildLain)
                if (List[c].IsDisplay == false) {
                    viewModel.set("ArrayChecked[" + c + "].IsDisplay", true);
                    if (viewModel.listDetailSubTest.length > 0) {
                        viewModel.set("listDetailSubTest[" + c + "].IsDisplay", true);
                    }
                    if (viewModel.bySubList.length > 0) {
                        for (b = 0; b < viewModel.bySubList.length; b++) {
                            if (viewModel.bySubList[b].SubTestCode == idChildLain) {
                                viewModel.set("bySubList[" + b + "].IsDisplay", true);
                            }
                        }
                    }
                    if (viewModel.listBySubTest.length > 0) {
                        for (lbst = 0; lbst < viewModel.listBySubTest.length; lbst++) {
                            if (viewModel.listBySubTest[lbst].SubTestCode == idChildLain) {
                                viewModel.set("listBySubTest[" + lbst + "].IsDisplay", true);
                            }
                        }
                    }
                    if (viewModel.CutOffDetail.length > 0) {
                        for (m = 0; m < viewModel.CutOffDetail.length; m++) {
                            if (viewModel.CutOffDetail[m].item.length > 0) {
                                for (n = 0; n < viewModel.CutOffDetail[m].item.length; n++) {
                                    if (viewModel.CutOffDetail[m].item[n].SubTestCode == idChildLain) {
                                        viewModel.set("CutOffDetail[" + m + "].item[" + c + "].IsDisplay", true);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (viewModel.role_name == 'AFFCO') {
                $('#C' + ParentCode).prop("disabled", true)
            }
        } else if(List[c].HasParent == false && List[c].HasChild == false){
            if (List[c].SubTestCode == SubTestCode){
                arrSubTestAffco.push(SubTestCode)
            }
        }
    }

                
    for (i = 0; i < List.length; i++) {
        if (List[i].SubTestCode == ParentCode) {
            if (List[i].CutOffScore >= 0) {
                viewModel.set('ArrayChecked[' + i + '].IsDisplay', true)
            }
        } else if (List[i].SubTestCode == SubTestCode) {
            viewModel.set("ArrayChecked[" + i + "].IsDisplay", true);
        }
    }
    if (viewModel.listDetailSubTest.length > 0) {
        for (i = 0; i < viewModel.listDetailSubTest.length; i++) {
            if (viewModel.listDetailSubTest[i].SubTestCode == ParentCode) {
                if (viewModel.listDetailSubTest[i].CutOffScore >= 0) {
                    viewModel.set("listDetailSubTest[" + i + "].IsDisplay", true);
                }
            } else if (viewModel.listDetailSubTest[i].SubTestCode == SubTestCode) {
                viewModel.set("listDetailSubTest[" + i + "].IsDisplay", true);
            }
        }
    }
    if (viewModel.bySubList.length > 0) {
        for (i = 0; i < viewModel.bySubList.length; i++) {
            if (viewModel.bySubList[i].SubTestCode == ParentCode) {
                if (viewModel.bySubList[i].CutOffScore >= 0) {
                    viewModel.set("bySubList[" + i + "].IsDisplay", true);
                }
            } else if (viewModel.bySubList[i].SubTestCode == SubTestCode) {
                viewModel.set("bySubList[" + i + "].IsDisplay", true);
            }
        }
    }
    if (viewModel.listBySubTest.length > 0) {
        for (i = 0; i < viewModel.listBySubTest.length; i++) {
            if (viewModel.listBySubTest[i].SubTestCode == ParentCode) {
                if (viewModel.listBySubTest[i].CutOffScore >= 0) {
                    viewModel.set("listBySubTest[" + i + "].IsDisplay", true);
                }
            } else if (viewModel.listBySubTest[i].SubTestCode == SubTestCode) {
                viewModel.set("listBySubTest[" + i + "].IsDisplay", true);
            }
        }
    }
    if (viewModel.CutOffDetail.length > 0) {
        for (k = 0; k < viewModel.CutOffDetail.length; k++) {
            if (viewModel.CutOffDetail[k].item.length > 0) {
                for (l = 0; l < viewModel.CutOffDetail[k].item.length; l++) {
                    if (viewModel.CutOffDetail[k].item[l].SubTestCode == ParentCode) {
                        if (viewModel.CutOffDetail[k].item[l].CutOffScore >= 0) {
                            viewModel.CutOffDetail[k].item[l].set("IsDisplay", false);
                        }
                    } else if (viewModel.CutOffDetail[k].item[l].SubTestCode == SubTestCode) {
                        viewModel.CutOffDetail[k].item[l].set("IsDisplay", false);
                    }
                }
            }
        }
    }

    viewModel.set('selectedDisplayOrder', 0)
    $('#' + id).prop('checked', true);
    $('#' + idChildLain).prop('checked', true);
    $('#D' + id).removeAttr('disabled');
    $('#D' + idChildLain).removeAttr('disabled');
    $('#' + id).removeAttr('onclick');
    $('#' + id).attr('onclick', 'lockon(this)');
}
lockon = function (data) {
    //unchecked
    var id = $(data).attr('id');
    var SubTestCode = $(data).attr('SubTestCode');
    var List = viewModel.ArrayChecked;
    var arrSubTestAffco = viewModel.arrSubTestAffco;
    if (viewModel.role_name == 'AFFCO') {
        if (arrSubTestAffco.length > 0) {
            for (arr = 0; arr < viewModel.arrSubTestAffco.length; arr++) {
                if (SubTestCode == viewModel.arrSubTestAffco[arr]) {
                    var data = viewModel.arrSubTestAffco.filter(function (obj) {
                        return obj !== SubTestCode
                    })
                }
            }
            viewModel.set('arrSubTestAffco', data)
        }
    }

    //UNCHECK, JIKA 1 CHILD SUDAH DI-UNCHECKED MAKA CHILD LAINNYA KE-UNCHECKED OTOMATIS
    for (c = 0; c < List.length; c++) {
        if (List[c].HasParent == true && List[c].HasChild == false) {
            if (List[c].SubTestCode == SubTestCode) {
                var ParentCode = List[c].ParentCode
            }
            if (List[c].ParentCode == ParentCode) {
                var idChildLain = List[c].SubTestCode
                if (List[c].IsDisplay == true) {
                    viewModel.set("ArrayChecked[" + c + "].IsDisplay", false);
                    if (viewModel.listDetailSubTest.length > 0) {
                        viewModel.set("listDetailSubTest[" + c + "].IsDisplay", false);
                    }
                    if (viewModel.bySubList.length > 0) {
                        for (b = 0; b < viewModel.bySubList.length; b++) {
                            if (viewModel.bySubList[b].SubTestCode == idChildLain) {
                                viewModel.set("bySubList[" + b + "].IsDisplay", false);
                            }
                        }
                    }
                    if (viewModel.listBySubTest.length > 0) {
                        for (lbst = 0; lbst < viewModel.listBySubTest.length; lbst++) {
                            if (viewModel.listBySubTest[lbst].SubTestCode == idChildLain) {
                                viewModel.set("listBySubTest[" + lbst + "].IsDisplay", false);
                            }
                        }
                    }
                    if (viewModel.CutOffDetail.length > 0) {
                        for (m = 0; m < viewModel.CutOffDetail.length; m++) {
                            if (viewModel.CutOffDetail[m].item.length > 0) {
                                for (n = 0; n < viewModel.CutOffDetail[m].item.length; n++) {
                                    if (viewModel.CutOffDetail[m].item[n].SubTestCode == idChildLain) {
                                        viewModel.set("CutOffDetail[" + m + "].item[" + c + "].IsDisplay", false);
                                        viewModel.set("CutOffDetail[" + m + "].item[" + c + "].DisplayOrder", 0);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    for (i = 0; i < List.length; i++) {
        if (List[i].SubTestCode == SubTestCode) {
            viewModel.set("ArrayChecked[" + i + "].IsDisplay", false);
            viewModel.set("ArrayChecked[" + i + "].DisplayOrder", 0);
            viewModel.set("ArrayChecked[" + i + "].CutOffScore", 0);
        }
    }
    if (viewModel.listDetailSubTest.length > 0) {
        for (i = 0; i < viewModel.listDetailSubTest.length; i++) {
            if (viewModel.listDetailSubTest[i].SubTestCode == SubTestCode) {
                viewModel.set("listDetailSubTest[" + i + "].IsDisplay", false);
                viewModel.set("listDetailSubTest[" + i + "].DisplayOrder", 0);
                viewModel.set("listDetailSubTest[" + i + "].CutOffScore", 0);
            }
        }
    }
    if (viewModel.bySubList.length > 0) {
        for (i = 0; i < viewModel.bySubList.length; i++) {
            if (viewModel.bySubList[i].SubTestCode == SubTestCode) {
                viewModel.set("bySubList[" + i + "].IsDisplay", false);
                viewModel.set("bySubList[" + i + "].DisplayOrder", 0);
                viewModel.set("bySubList[" + i + "].CutOffScore", 0);
            }
        }
    }
    if (viewModel.listBySubTest.length > 0) {
        for (i = 0; i < viewModel.listBySubTest.length; i++) {
            if (viewModel.listBySubTest[i].SubTestCode == SubTestCode) {
                viewModel.set("listBySubTest[" + i + "].IsDisplay", false);
                viewModel.set("listBySubTest[" + i + "].DisplayOrder", 0);
                viewModel.set("listBySubTest[" + i + "].CutOffScore", 0);
            }
        }
    }
    if (viewModel.CutOffDetail.length > 0) {
        for (k = 0; k < viewModel.CutOffDetail.length; k++) {
            if (viewModel.CutOffDetail[k].item.length > 0) {
                for (l = 0; l < viewModel.CutOffDetail[k].item.length; l++) {
                    if (viewModel.CutOffDetail[k].item[l].SubTestCode == SubTestCode) {
                        viewModel.CutOffDetail[k].item[l].set("IsDisplay", false);
                        viewModel.CutOffDetail[k].item[l].set("DisplayOrder", 0);
                        viewModel.CutOffDetail[k].item[l].set("CutOffScore", 0);
                    }
                }
            }
        }
    }

    viewModel.set('selectedDisplayOrder', 0)
    $('#' + id).prop('checked', false);
    $('#' + idChildLain).prop('checked', false);
    $('#C' + id).attr('disabled', 'disabled');
    $('#C' + idChildLain).attr('disabled', 'disabled');
    $('#D' + id).attr('disabled', 'disabled');
    $('#D' + idChildLain).attr('disabled', 'disabled');
    $('#C' + id).val(0);
    $('#C' + idChildLain).val(0);
    $('#D' + id).val(0);
    $('#D' + idChildLain).val(0);
    $('#' + id).removeAttr('onclick');
    $('#' + id).attr('onclick', 'lockoff(this)');
}

selectedCheckCompetency = function (data) {
    var index = $(data).attr('competencyMatrix')
    var listCompetencyMatrix = viewModel.arrCompetency

    for (compMatrix = 0; compMatrix < listCompetencyMatrix.length; compMatrix++) {
        if (compMatrix == index) {
            viewModel.arrCompetency[index].set('IsDisplay', true);
        } else {
            viewModel.arrCompetency[compMatrix].set('IsDisplay', false);
        }
    }
}

dataCutOff = function (cut) {
    var id = $(cut).attr('id');                     //untuk bytest
    var SubTestCode = id.substring(1);              //untuk bysubtest
    var CutOffScore = parseFloat($(cut).val());
    var IsDisplay = $(cut).attr('IsDisplay');
    var List = viewModel.ArrayChecked;

    if (isNaN(CutOffScore) == true) {
        CutOffScore = 0
    }
    if (IsDisplay == "true") {
        IsDisplay = true;
    } else {
        IsDisplay = false;
    }

    //JIKA CHILDS DICENTANG, MAKA CUTOFFSCORE PARENT BERAPAPUN TETAP DIANGGAP ISDISPLAY TRUE
    for (c = 0; c < List.length; c++) {
        if (List[c].HasParent == true && List[c].HasChild == false) {
            if (List[c].IsDisplay == true) {
                var ParentCode = List[c].ParentCode
                break;
            } 
        }
    }

    //bysubtest
    for (i = 0; i < List.length; i++) {
        if (SubTestCode == ParentCode && List[i].SubTestCode == ParentCode) {
            if (List[i].CutOffScore >= 0) {
                viewModel.set('ArrayChecked[' + i + '].CutOffScore', CutOffScore)
                viewModel.set('ArrayChecked[' + i + '].IsDisplay', true)
            }
        } else if (List[i].SubTestCode == SubTestCode) {
            viewModel.set("ArrayChecked[" + i + "].CutOffScore", CutOffScore);
            viewModel.set("ArrayChecked[" + i + "].IsDisplay", IsDisplay);
        }
    }
    for (i = 0; i < viewModel.listDetailSubTest.length; i++) {
        if (viewModel.listDetailSubTest[i].SubTestCode == SubTestCode) {
            viewModel.set("listDetailSubTest[" + i + "].CutOffScore", CutOffScore);
            viewModel.set("listDetailSubTest[" + i + "].IsDisplay", IsDisplay);
        }
    }
    if (viewModel.CutOffDetail.length > 0) {
        for (a = 0; a < viewModel.CutOffDetail.length; a++) {
            if (viewModel.CutOffDetail[a].item.length > 0) {
                for (b = 0; b < viewModel.CutOffDetail[a].item.length; b++) {
                    if (viewModel.CutOffDetail[a].item[b].SubTestCode == SubTestCode) {
                        viewModel.set("CutOffDetail[" + a + "].item[" + b + "].CutOffScore", CutOffScore);
                        viewModel.set("CutOffDetail[" + a + "].item[" + b + "].IsDisplay", IsDisplay);
                    }
                }
            }
        }
    }
    for (i = 0; i < viewModel.bySubList.length; i++) {
        if (viewModel.bySubList[i].SubTestCode == SubTestCode) {
            viewModel.set("bySubList[" + i + "].CutOffScore", CutOffScore);
            viewModel.set("bySubList[" + i + "].IsDisplay", IsDisplay);
        }
    }
    if (viewModel.listBySubTest.length > 0) {
        for (i = 0; i < viewModel.listBySubTest.length; i++) {
            if (viewModel.listBySubTest[i].SubTestCode == SubTestCode) {
                viewModel.set("listBySubTest[" + i + "].CutOffScore", CutOffScore);
                viewModel.set("listBySubTest[" + i + "].IsDisplay", IsDisplay);
            }
        }
    }
    //bytest
    for (i = 0; i < viewModel.ArrayCheckedTest.length; i++) {
        if (viewModel.ArrayCheckedTest[i].SubTestCode == id) {
            viewModel.set("ArrayCheckedTest[" + i + "].CutOffScore", CutOffScore);
        }
    }
    if (viewModel.detailTest == true) {
        for (i = 0; i < viewModel.listDetailTest.length; i++) {
            if (viewModel.listDetailTest[i].SubTestCode == id) {
                viewModel.set("listDetailTest[" + i + "].CutOffScore", CutOffScore);
            }
        }
    }
    if (viewModel.CutOffDetails.length > 0) {
        for (a = 0; a < viewModel.CutOffDetails.length; a++) {
            if (viewModel.CutOffDetails[a].item.length > 0) {
                for (b = 0; b < viewModel.CutOffDetails[a].item.length; b++) {
                    if (viewModel.CutOffDetails[a].item[b].SubTestCode == id) {
                        viewModel.set("CutOffDetails[" + a + "].item[" + b + "].CutOffScore", CutOffScore);
                    }
                }
            }
        }
    }
    if (viewModel.byTestSubTestList.length > 0) {
        for (k = 0; k < viewModel.byTestSubTestList.length; k++) {
            if (viewModel.byTestSubTestList[k].SubTestCode == id) {
                viewModel.set("byTestSubTestList[" + k + "].CutOffScore", CutOffScore);
            }
        }
    }
    if (viewModel.listByTest.length > 0) {
        for (i = 0; i < viewModel.listByTest.length; i++) {
            if (viewModel.listByTest[i].SubTestCode == id) {
                viewModel.set("listByTest[" + i + "].CutOffScore", CutOffScore);
            }
        }
    }
    $('#' + id).val(CutOffScore);
}
dataCutOffValidityScale = function (cut) {
    var id = $(cut).attr('id');
    var CutOffScore = parseFloat($(cut).val());
    var IsDisplay = $(cut).attr('IsDisplay');
    if (IsDisplay == "true") {
        IsDisplay = true;
    } else {
        IsDisplay = false;
    }
    //bytest
    for (i = 0; i < viewModel.ArrayCheckedTestValidityScale.length; i++) {
        if (viewModel.ArrayCheckedTestValidityScale[i].ValidityScaleCode == id) {
            viewModel.set("ArrayCheckedTestValidityScale[" + i + "].CutOffScore", CutOffScore);
        }
    }
    if (viewModel.detailTest == true) {
        for (i = 0; i < viewModel.listDetailTestVS.length; i++) {
            if (viewModel.listDetailTestVS[i].ValidityScaleCode == id) {
                viewModel.set("listDetailTestVS[" + i + "].CutOffScore", CutOffScore);
            }
        }
    }
    if (viewModel.CutOffDetails.length > 0) {
        for (a = 0; a < viewModel.CutOffDetails.length; a++) {
            if (viewModel.CutOffDetails[a].item.length > 0) {
                for (b = 0; b < viewModel.CutOffDetails[a].item.length; b++) {
                    if (viewModel.CutOffDetails[a].item[b].ValidityScaleCode == id) {
                        viewModel.set("CutOffDetails[" + a + "].item[" + b + "].CutOffScore", CutOffScore);
                    }
                }
            }
        }
    }
    if (viewModel.byTestValidityScaleList.length > 0) {
        for (k = 0; k < viewModel.byTestValidityScaleList.length; k++) {
            if (viewModel.byTestValidityScaleList[k].ValidityScaleCode == id) {
                viewModel.set("byTestValidityScaleList[" + k + "].CutOffScore", CutOffScore);
            }
        }
    }
    if (viewModel.listByTest.length > 0) {
        for (i = 0; i < viewModel.listByTest.length; i++) {
            if (viewModel.listByTest[i].ValidityScaleCode == id) {
                viewModel.set("listByTest[" + i + "].CutOffScore", CutOffScore);
            }
        }
    }
}

dataDisplay = function (dis) {
    var id = $(dis).attr('id');
    var SubTestCode = id.substring(1);
    var DisplayOrder = parseFloat($(dis).val());
    var IsDisplay = $(dis).attr('IsDisplay');
    viewModel.set('selectedDisplayOrder', DisplayOrder);

    if (IsDisplay == "true") {
        IsDisplay = true;
    } else {
        IsDisplay = false;
    }
    
    var List = viewModel.ArrayChecked;
    for (i = 0; i < List.length; i++) {
        if (List[i].SubTestCode == SubTestCode) {
            viewModel.set("ArrayChecked[" + i + "].DisplayOrder", DisplayOrder);
        }
    }
    if (viewModel.CutOffDetail.length > 0) {
        for (a = 0; a < viewModel.CutOffDetail.length; a++) {
            if (viewModel.CutOffDetail[a].item.length > 0) {
                for (b = 0; b < viewModel.CutOffDetail[a].item.length; b++) {
                    if (viewModel.CutOffDetail[a].item[b].SubTestCode == SubTestCode) {
                        viewModel.set("CutOffDetail[" + a + "].item[" + b + "].DisplayOrder", DisplayOrder);
                    }
                }
            }
        }
    }
    if (viewModel.listDetailSubTest.length > 0) {
        for (j = 0; j < viewModel.listDetailSubTest.length; j++) {
            if (viewModel.listDetailSubTest[j].SubTestCode == SubTestCode) {
                viewModel.set("listDetailSubTest[" + j + "].DisplayOrder", DisplayOrder);
            }
        }
    }
    if (viewModel.bySubList.length > 0) {
        for (k = 0; k < viewModel.bySubList.length; k++) {
            if (viewModel.bySubList[k].SubTestCode == SubTestCode) {
                viewModel.set("bySubList[" + k + "].DisplayOrder", DisplayOrder);
            }
        }
    }
}
dataDisplayTTO = function (dis) {
    var id = $(dis).attr('id');
    var TestToolCode = id.substring(1);
    var displayOrderTestTool = parseFloat($(dis).val());
    var IsDisplay = $(dis).attr('IsDisplay');
    var BySubTestList = viewModel.CutOffDetail;
    var ByTestList = viewModel.CutOffDetails;

    if (IsDisplay == "true") {
        IsDisplay = true;
    } else {
        IsDisplay = false;
    }

    //by subtest
    for (i = 0; i < viewModel.ArrayChecked.length; i++) {
        if (viewModel.ArrayChecked[i].TestToolCode == TestToolCode) {
            viewModel.set("ArrayChecked[" + i + "].DisplayOrderTestTool", displayOrderTestTool);
        }
    }
    if (BySubTestList.length > 0) {
        for (a = 0; a < BySubTestList.length; a++) {
            if (BySubTestList[a].id == TestToolCode) {
                for (b = 0; b < BySubTestList[a].item.length; b++) {
                    if (BySubTestList[a].item[b].TestToolCode == TestToolCode) {
                        BySubTestList[a].item[b].set("DisplayOrderTestTool", displayOrderTestTool)
                    }
                }
            }
        }
    }
    if (viewModel.bySubList.length > 0) {
        for (d = 0; d < viewModel.bySubList.length; d++) {
            if (viewModel.bySubList[d].TestToolCode == TestToolCode) {
                if (viewModel.bySubList[d].IsDisplay == true) {
                    viewModel.set("bySubList[" + d + "].DisplayOrderTestTool", displayOrderTestTool);
                }
            }
        }
    }
    if (viewModel.listBySubTest.length > 0) {
        for (e = 0; e < viewModel.listBySubTest.length; e++) {
            if (viewModel.listBySubTest[e].TestToolCode == TestToolCode) {
                viewModel.set("listBySubTest[" + a + "].DisplayOrderTestTool", displayOrderTestTool);
            }
        }
    }

    //by test
    if (ByTestList.length > 0) {
        for (f = 0; f < ByTestList.length; f++) {
            if (ByTestList[f].id == TestToolCode) {
                for (c = 0; c < ByTestList[f].item.length; c++) {
                    ByTestList[f].set("item[" + c + "].DisplayOrderTestTool", displayOrderTestTool)
                }
            }
        }
    }
}

gridListCutOff = function (CutOffDetail) {
    if (viewModel.deletedRow == false) {
        if (CutOffDetail == undefined) {
            var groups = [];
            viewModel.set("CutOffDetail", groups);
        } else if (viewModel.detailSubTest == true) {
            viewModel.set("CutOffDetail", CutOffDetail);
            groups = viewModel.CutOffDetail;
        } else {
            if (CutOffDetail.length > 0) {
                var group_to_values = CutOffDetail.reduce(function (obj, item) {
                    obj[item.TestToolCode] = obj[item.TestToolCode] || [];
                    obj[item.TestToolCode].push(item);
                    return obj;
                }, {});
                var groups = Object.keys(group_to_values).map(function (key) {
                    return {
                        id: key,
                        item: group_to_values[key],
                    };
                });
            } else {
                var groups = CutOffDetail;
            }
            viewModel.set("CutOffDetail", groups);
        }
        //viewModel.set("CutOffDetail", groups);
    } else if (viewModel.deletedRow == true) {
        viewModel.set("CutOffDetail", CutOffDetail);
        groups = viewModel.CutOffDetail;
        viewModel.set('deletedRow', false)
    }
    $("#gridLocal").kendoGrid({
        width: 350,
        dataSource: groups,
        columns: [
            {
                //field: "type",
                title: "<center>Action</center>",
                width: "100px", sortable: false,
                template: function (dataItem) {
                    if (dataItem.item.length > 0) {
                        for (i = 0; i < dataItem.item.length; i++) {
                            if (viewModel.role_name == 'AFFCO') {
                                return "<center><a class='k-button k-grid-edit' style='min-width:16px' edit='true' testTypeName='" + dataItem.item[i].TestTypeName +
                                    "' testTypeCode='" + dataItem.item[i].TestTypeCode + "' testToolName='" + dataItem.item[i].TestToolName +
                                    "' testToolCode='" + dataItem.item[i].TestToolCode + "' href='#' onclick='addSubTest(this)'><span class='k-icon k-edit'></span></a></center>"
                            } else {
                                return "<a class='k-button k-grid-edit' style='min-width:16px' edit='true' testTypeName='" + dataItem.item[i].TestTypeName +
                                    "' testTypeCode='" + dataItem.item[i].TestTypeCode + "' testToolName='" + dataItem.item[i].TestToolName +
                                    "' testToolCode='" + dataItem.item[i].TestToolCode + "' href='#' onclick='addSubTest(this)'><span class='k-icon k-edit'></span></a>" +
                                    "<a class='k-button k-grid-erase' style='min-width:16px' code='SubTest' id=" + dataItem.id + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                            }
                        }
                    }
                }
            },
            {
                field: "TestTypeName",
                title: "<center>Test Type</center>",
                width: "200px", encoded: false,
                template: function (dataItem) {
                    var testType = [];
                    if (dataItem.item.length > 0) {
                        return dataItem.item[0].TestTypeName;
                    }
                }
            },
            {
                field: "TestToolName",
                title: "<center>Test Tool</center>",
                width: "200px", encoded: false,
                template: function (dataItem) {
                    if (dataItem.item.length > 0) {
                        return dataItem.item[0].TestToolName;
                    }
                }
            },
            {
                field: "SubTestName",
                title: "<center>Sub Test</center>",
                width: "200px",
                encoded: false,
                template: function (dataItem) {
                    var subTest = [];
                    if (dataItem.item.length > 0) {
                        for (i = 0; i < dataItem.item.length; i++) {
                            if (dataItem.item[i].IsDisplay == true) {
                                subTest.push('<span>' + dataItem.item[i].SubTestName + '</span>');
                            }
                        }
                        return subTest.join();
                    }
                }
            },
            {
                field: "DisplayOrder",
                title: "<center>Display Order</center>",
                width: "100px",
                template: function (dataItem) {
                    if (dataItem.item.length > 0) {
                        if (viewModel.role_name == 'AFFCO') {
                            return "<center><input type='number' class='k-textbox' IsDisplay='true' id='D" + dataItem.id + "' name='check" + dataItem.id + "' value='" + dataItem.item[0].DisplayOrderTestTool +
                                "' style='width:50%; text-align:center;' onchange='dataDisplayTTO(this)' disabled='disabled'/></center>"
                        } else {
                            return "<center><input type='number' class='k-textbox' IsDisplay='true' id='D" + dataItem.id + "' name='check" + dataItem.id + "' value='" + dataItem.item[0].DisplayOrderTestTool +
                                "' style='width:50%; text-align:center;' onchange='dataDisplayTTO(this)'/></center>"
                        }
                    }
                }
            }
        ],
        editable: false,
        sortable: true,
    });
}
gridListCutOffs = function (CutOffDetails) {
    if (viewModel.deletedRowTest == false) {
        if (CutOffDetails == undefined) {
            var groups = [];
            viewModel.set("CutOffDetails", groups);
        } else if (viewModel.detailTest == true) {
            viewModel.set("CutOffDetails", CutOffDetails);
            groups = viewModel.CutOffDetails;
        } else {
            if (CutOffDetails.length > 0) {
                var group_to_values = CutOffDetails.reduce(function (obj, item) {
                    obj[item.TestToolCode] = obj[item.TestToolCode] || [];
                    obj[item.TestToolCode].push(item);
                    return obj;
                }, {});
                var groups = Object.keys(group_to_values).map(function (key) {
                    return {
                        id: key,
                        item: group_to_values[key]
                    };
                })
            } else {
                var groups = CutOffDetails;
            }
            viewModel.set("CutOffDetails", groups);
        }
        //viewModel.set("CutOffDetails", groups);
    } else if (viewModel.deletedRowTest == true) {
        viewModel.set("CutOffDetails", CutOffDetails);
        groups = viewModel.CutOffDetails;
        viewModel.set('deletedRowTest', false);
    }
    $("#gridLocals").kendoGrid({
        width: 350,
        dataSource: groups,
        columns: [
            {
                //field: "Type",
                title: "<center>Action</center>",
                width: "100px", sortable: false,
                template: function (dataItem) {
                    if (dataItem.item.length > 0) {
                        for (i = 0; i < dataItem.item.length; i++) {
                            if (viewModel.role_name == 'AFFCO') {
                                return "<center><a class='k-button k-grid-edit' style='min-width:16px' edit='true' testTypeName='" + dataItem.item[i].TestTypeName +
                                    "' testTypeCode='" + dataItem.item[i].TestTypeCode + "' testToolName='" + dataItem.item[i].TestToolName +
                                    "' testToolCode='" + dataItem.item[i].TestToolCode + "' href='#' onclick='addTest(this)'><span class='k-icon k-edit'></span></a></center>"
                            } else {
                                return "<a class='k-button k-grid-edit' style='min-width:16px' edit='true' testTypeName='" + dataItem.item[i].TestTypeName +
                                    "' testTypeCode='" + dataItem.item[i].TestTypeCode + "' testToolName='" + dataItem.item[i].TestToolName +
                                    "' testToolCode='" + dataItem.item[i].TestToolCode + "' href='#' onclick='addTest(this)'><span class='k-icon k-edit'></span></a>" +
                                    "<a class='k-button k-grid-erase' style='min-width:16px' code='Test' id=" + dataItem.id +
                                    " href='#' onclick='DeleteRowTest(this)'><span class='fas fa-trash-alt'></span></a>";
                            }
                        }
                    }
                }
            },
            {
                field: "TestTypeName",
                title: "<center>Test Type</center>",
                width: "200px", encoded: false,
                template: function (dataItem) {
                    if (dataItem.item.length > 0) {
                        return dataItem.item[0].TestTypeName;
                    }
                }
            },
            {
                field: "TestToolName",
                title: "<center>Test Tool</center>",
                width: "200px", encoded: false,
                template: function (dataItem) {
                    if (dataItem.item.length > 0) {
                        return dataItem.item[0].TestToolName;
                    }
                }
            },
            {
                field: "SubTestName",
                title: "<center>Sub Test</center>",
                width: "200px", encoded: false,
                template: function (dataItem) {
                    var subTest = [];
                    if (dataItem.item.length > 0) {
                        for (i = 0; i < dataItem.item.length; i++) {
                            if (dataItem.item[i].SubTestName) {
                                subTest.push('<span>' + dataItem.item[i].SubTestName + '</span>');
                            }
                            if (dataItem.item[i].ValidityScaleName) {
                                subTest.push('<span>' + dataItem.item[i].ValidityScaleName + '</span>');
                            }
                        }
                        return subTest.join();
                    }
                }
            },
            {
                field: "DisplayOrder",
                title: "<center>Display Order</center>",
                width: "100px",
                template: function (dataItem) {
                    if (dataItem.item.length > 0) {
                        if (viewModel.role_name == 'AFFCO') {
                            return "<center><input type='number' class='k-textbox' IsDisplay='true' id='D" + dataItem.id + "' name='check" + dataItem.id + "' value='" + dataItem.item[0].DisplayOrderTestTool +
                                "' style='width:50%; text-align:center;' onchange='dataDisplayTTO(this)' disabled='disabled'/></center>"
                        } else {
                            return "<center><input type='number' class='k-textbox' IsDisplay='true' id='D" + dataItem.id + "' name='check" + dataItem.id + "' value='" + dataItem.item[0].DisplayOrderTestTool +
                                "' style='width:50%; text-align:center;' onchange='dataDisplayTTO(this)'/></center>"
                        }
                    } 
                }
            }
        ],
        editable: false,
        sortable: true,
    });
}

competenciesGrid = function () {
    $("#gridCompetency").kendoGrid({
        dataSource: viewModel.arrSelectedCompetencyMatrix[0].Competencies,
        columns: [
            {
                field: "CompetencyName", title: "<center>Competency Name</center>", width: "200px", editable: false, encoded: false,
            },
            {
                field: "CutOffScore", title: "<center>Cut Off Score</center>", width: "100px",
                template: function (dataItem) {
                    var idComp = dataItem.CompetencyCode
                    var score = dataItem.CutOffScore
                    return '<input type="number" class="k-textbox" id="CutOffScore' + idComp + '" name="CutOffScore' + idComp + '" idComp="' + idComp + '" value=' + score + ' onchange="ScoreValue(this)"/>';
                }
            }
        ],
        editable: false,
        sortable: true,
    });
}
ScoreValue = function (data) {
    var idComp = $(data).attr('idComp');
    var value = parseFloat($(data).val());
    var arrSelectedCompetencyMatrix = viewModel.arrSelectedCompetencyMatrix;

    for (i = 0; i < arrSelectedCompetencyMatrix[0].Competencies.length; i++) {
        if (idComp == arrSelectedCompetencyMatrix[0].Competencies[i].CompetencyCode) {
            viewModel.arrSelectedCompetencyMatrix[0].Competencies[i].set('CutOffScore', value)
        }
    }
}

$(document).on('click', 'input.checkComp', function (e) {
    var checked = $(this).prop("checked");
    var gridDataView = $("#gridComptency").data().kendoGrid.dataSource.view();
    var idx = $(this).attr('name');
    var nama = $(this).attr('nama');
    $('#cScore' + idx).removeAttr('disabled');
    var CutOffScore = null;
    var gridData = $("#gridComptency").data().kendoGrid.dataSource.data();
    //alert(checked);
    if (checked) {
        var position = viewModel.ArrayMapComp.indexOf(idx);
        if (!(position > -1)) {
            viewModel.ArrayMapComp.push({ "MapCompetencyCode": idx, "MapCompetencyName": nama, "CutOffScore": CutOffScore });
        }
    }
    else {
        $('#cScore' + idx).attr('disabled', true);
        for (var i = 0; i < viewModel.ArrayMapComp.length; i++) {
            if (idx == viewModel.ArrayMapComp[i].MapCompetencyCode) {
                viewModel.ArrayMapComp.splice(i, 1);
            }
        }
    }
});

DeleteRow = function (data) {
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        var id = $(data).attr('id');
        var code = $(data).attr('code');
        var groups = viewModel.CutOffDetail;
        var checkedList = viewModel.ArrayChecked;
        var BySubTestList = viewModel.listBySubTest;
        $('#btnTest').removeAttr('disabled');
        if (groups.length > 1) {
            var row = data.parentNode.parentNode;
            row.parentNode.removeChild(row);
            for (a = 0; a < groups.length; a++) {
                for (c = 0; c < checkedList.length; c++) {
                    if (checkedList[c].TestToolCode == groups[a].id) {
                        if (checkedList[c].IsDisplay == true) {
                            checkedList[c].set("IsDisplay", false);
                        }
                    }
                }
            }
            for (b = 0; b < BySubTestList.length; b++) {
                if (BySubTestList[b].TestToolCode == id) {
                    var groups = viewModel.CutOffDetail.filter(function (obj) {
                        return obj.id !== id
                    })
                    var filteredList = viewModel.listBySubTest.filter(function (obj) {
                        return obj.TestToolCode !== id
                    })
                }
            }
            for (s = 0; s < viewModel.bySubList.length; s++) {
                if (viewModel.bySubList[s].TestToolCode == id) {
                    var filteredBySubList = viewModel.bySubList.filter(function (obj) {
                        return obj.TestToolCode != id
                    })
                }
            }
            viewModel.set('deletedRow', true);
            viewModel.set('listBySubTest', filteredList);
            viewModel.set('bySubList', filteredBySubList);
            $('#checkBtnSub').removeAttr('hidden');
            gridListCutOff(groups);
        } else {
            for (a = 0; a < groups.length; a++) {
                if (groups[a].item[a].IsDisplay == true) {
                    if (BySubTestList[a].TestToolCode == groups[a].id) {
                        groups[a].item[a].set("IsDisplay", false);
                    }
                }
            }
            viewModel.set("CutOffDetail", []);
            viewModel.set("bySubList",[])
            viewModel.set("listBySubTest", []);
            //viewModel.set("ArrayChecked", []);
            $('#checkBtnSub').removeAttr('hidden');
            gridListCutOff(viewModel.CutOffDetail);
        }
    })
}
DeleteRowTest = function (data) {
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        var id = $(data).attr('id');
        var code = $(data).attr('code');
        var filteredListSubTest = []
        var filteredListVS = []
        //var grid = $("#gridByTest").data("kendoGrid");
        var groups = viewModel.CutOffDetails;
        var checkedList = viewModel.ArrayCheckedTest;
        var ByTestList = viewModel.listByTest;
        $('#btnSubTest').removeAttr('disabled');
        if (groups.length > 1) {
            var row = data.parentNode.parentNode;
            row.parentNode.removeChild(row);
            for (a = 0; a < groups.length; a++) {
                if (checkedList[a].IsDisplay == true) {
                    if (checkedList[a].TestToolCode == groups[a].id) {
                        checkedList[a].set("IsDisplay", false);
                    }
                }
            }
            for (b = 0; b < ByTestList.length; b++) {
                if (ByTestList[b].TestToolCode == id) {
                    var groups = viewModel.CutOffDetails.filter(function (obj) {
                        return obj.id !== id
                    })
                    var filteredList = viewModel.listByTest.filter(function (obj) {
                        return obj.TestToolCode !== id
                    })
                }
            }
            for (st = 0; st < filteredList.length; st++) {
                if (filteredList[st].SubTestCode) {
                    filteredListSubTest.push(filteredList[st])
                } else if (filteredList[st].ValidityScaleCode) {
                    filteredListVS.push(filteredList[st])
                }
            }
            viewModel.set('deletedRowTest', true);
            viewModel.set('listByTest', filteredList);
            viewModel.set('byTestSubTestList', filteredListSubTest);
            viewModel.set('byTestValidityScaleList', filteredListVS);
            viewModel.set('subsetByTestList', filteredList);
            $('#checkBtnTest').removeAttr('hidden');
            gridListCutOffs(groups);
        } else {
            for (a = 0; a < groups.length; a++) {
                if (groups[a].item[a].IsDisplay == true) {
                    if (viewModel.listByTest[a].TestToolCode == groups[a].id) {
                        groups[a].item[a].set("IsDisplay", false);
                    }
                }
            }
            viewModel.set("CutOffDetails", []);
            viewModel.set("subsetByTestList", []);
            viewModel.set("listByTest", []);
            $('#checkBtnTest').removeAttr('hidden');
            gridListCutOffs(viewModel.CutOffDetails);
        }
    })
}
DeleteCompetency = function (data) {
    var id = $(data).attr('id');
    var arrSelectedCompetencyMatrixCompetencies = viewModel.arrSelectedCompetencyMatrix[0].Competencies

    if (arrSelectedCompetencyMatrixCompetencies.length > 1) {
        var row = data.parentNode.parentNode;
        row.parentNode.removeChild(row);
        for (a = 0; a < arrSelectedCompetencyMatrixCompetencies.length; a++) {
            if (arrSelectedCompetencyMatrixCompetencies[a].CompetencyCode == id) {
                var maps = arrSelectedCompetencyMatrixCompetencies.filter(function (obj) {
                    return obj.CompetencyCode != id
                })
            }
        }
        viewModel.set('arrSelectedCompetencyMatrix[0].Competencies', maps)
        competenciesGrid()
    } else {
        viewModel.set('arrSelectedCompetencyMatrix[0].Competencies', [])
        competenciesGrid()
    }
}

Display = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayChecked(this)');
    viewModel.set('DisplayStatus', false);
}
DisplayChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'Display(this)');
    viewModel.set('DisplayStatus', true);
}

General = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'GeneralChecked(this)');
    viewModel.set('GeneralStatus', false);
}
GeneralChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'General(this)');
    viewModel.set('GeneralStatus', true);
}

CutOffIQCheckBox = function (data) {
    $('#cutOffIQCheckBox').removeAttr('onchange');
    $('#cutOffIQCheckBox').attr('onchange', 'CutOffIQCheckBoxChecked(this)');
    var arrCutOffIQScore = viewModel.arrCutOffIQScore;

    jQuery("label[id='NormScoreIQName']").html("Not Found");

    if (viewModel.role_name == 'AFFCO') {
        if (arrCutOffIQScore.length > 0) {
            for (arr = 0; arr < arrCutOffIQScore.length; arr++) {
                if (SubTestCode == arrCutOffIQScore[arr]) {
                    var data = arrCutOffIQScore.filter(function (obj) {
                        return obj.TestTypeCode !== viewModel.TestTypeCode && obj.TestToolCode !== viewModel.TestToolCode
                    })
                }
            }
            viewModel.set('arrCutOffIQScore', data)
        }
    }
    for (a = 0; a < viewModel.CutOffIQList.length; a++) {
        if (viewModel.CutOffIQList[a].TestTypeCode == viewModel.TestTypeCode && viewModel.CutOffIQList[a].TestToolCode == viewModel.TestToolCode) {
            viewModel.set('CutOffIQList[' + a + '].CutOffIQCheckBox', false);
            viewModel.set('CutOffIQList[' + a + '].CutOffIQ', "");
        }
    }
    for (i = 0; i < viewModel.ArrayChecked.length; i++) {
        if (viewModel.ArrayChecked[i].TestTypeCode == viewModel.TestTypeCode && viewModel.ArrayChecked[i].TestToolCode == viewModel.TestToolCode) {
            viewModel.set("ArrayChecked[" + i + "].CutOffIQCheckBox", false);
            viewModel.set("ArrayChecked[" + i + "].CutOffIQ", "");
            viewModel.set("ArrayChecked[" + i + "].NormScoreIQCode", "");
        }
    }
    if (viewModel.listDetailSubTest.length > 0) {
        for (i = 0; i < viewModel.listDetailSubTest.length; i++) {
            if (viewModel.listDetailSubTest[i].TestTypeCode == viewModel.TestTypeCode && viewModel.listDetailSubTest[i].TestToolCode == viewModel.TestToolCode) {
                viewModel.set("listDetailSubTest[" + i + "].CutOffIQCheckBox", false);
                viewModel.set("listDetailSubTest[" + i + "].CutOffIQ", "");
                viewModel.set("listDetailSubTest[" + i + "].NormScoreIQCode", "");
            }
        }
    }
    if (viewModel.bySubList.length > 0) {
        for (i = 0; i < viewModel.bySubList.length; i++) {
            if (viewModel.bySubList[i].TestTypeCode == viewModel.TestTypeCode && viewModel.bySubList[i].TestToolCode == viewModel.TestToolCode) {
                viewModel.set("bySubList[" + i + "].CutOffIQCheckBox", false);
                viewModel.set("bySubList[" + i + "].CutOffIQ", "");
                viewModel.set("bySubList[" + i + "].NormScoreIQCode", "");
                viewModel.set("bySubList[" + i + "].NormScoreIQName", "");
            }
        }
    }
    if (viewModel.listBySubTest.length > 0) {
        for (i = 0; i < viewModel.listBySubTest.length; i++) {
            if (viewModel.listBySubTest[i].TestTypeCode == viewModel.TestTypeCode && viewModel.listBySubTest[i].TestToolCode == viewModel.TestToolCode) {
                viewModel.set("listBySubTest[" + i + "].CutOffIQCheckBox", false);
                viewModel.set("listBySubTest[" + i + "].CutOffIQ", "");
                viewModel.set("listBySubTest[" + i + "].NormScoreIQCode", "");
                viewModel.set("listBySubTest[" + i + "].NormScoreIQName", "");
            }
        }
    }

    viewModel.set('CutOffIQCheckBox', false)
    viewModel.set('CutOffIQ', "")
    var numerictextbox = $("#CutOffIQ").data("kendoNumericTextBox");
    numerictextbox.enable(false);
    numerictextbox.value("");
    $('#NormScoreIQField').hide()
    $('#NormScoreIQName').hide()
}
CutOffIQCheckBoxChecked = function (data) {
    $('#cutOffIQCheckBox').removeAttr('onchange');
    $('#cutOffIQCheckBox').attr('onchange', 'CutOffIQCheckBox(this)');
    var arrCutOffIQScore = viewModel.arrCutOffIQScore;
    var NormScoreIQCode = viewModel.NormScoreIQCode;
    var NormScoreIQName = viewModel.NormScoreIQName;

    if (NormScoreIQName == "") {
        jQuery("label[id='NormScoreIQName']").html("Not Found");
    } else {
        jQuery("label[id='NormScoreIQName']").html(NormScoreIQName);
    }

    if (viewModel.role_name == 'AFFCO') {
        arrCutOffIQScore.push({
            TestTypeCode: viewModel.TestTypeCode,
            TestToolCode: viewModel.TestToolCode
        })
    }
    for (a = 0; a < viewModel.CutOffIQList.length; a++) {
        if (viewModel.CutOffIQList[a].TestTypeCode == viewModel.TestTypeCode && viewModel.CutOffIQList[a].TestToolCode == viewModel.TestToolCode) {
            viewModel.CutOffIQList[a].set('CutOffIQCheckBox', true);
            viewModel.CutOffIQList[a].set('CutOffIQ', 0);
        }
    }
    for (i = 0; i < viewModel.ArrayChecked.length; i++) {
        if (viewModel.ArrayChecked[i].TestTypeCode == viewModel.TestTypeCode && viewModel.ArrayChecked[i].TestToolCode == viewModel.TestToolCode) {
            viewModel.set("ArrayChecked[" + i + "].CutOffIQCheckBox", true);
            viewModel.set("ArrayChecked[" + i + "].CutOffIQ", 0);
            viewModel.set("ArrayChecked[" + i + "].NormScoreIQCode", NormScoreIQCode);

        }
    }
    if (viewModel.listDetailSubTest.length > 0) {
        for (i = 0; i < viewModel.listDetailSubTest.length; i++) {
            if (viewModel.listDetailSubTest[i].TestTypeCode == viewModel.TestTypeCode && viewModel.listDetailSubTest[i].TestToolCode == viewModel.TestToolCode) {
                viewModel.set("listDetailSubTest[" + i + "].CutOffIQCheckBox", true);
                viewModel.set("listDetailSubTest[" + i + "].CutOffIQ", 0);
                viewModel.set("listDetailSubTest[" + i + "].NormScoreIQCode", NormScoreIQCode);
            }
        }
    }
    if (viewModel.bySubList.length > 0) {
        for (i = 0; i < viewModel.bySubList.length; i++) {
            if (viewModel.bySubList[i].TestTypeCode == viewModel.TestTypeCode && viewModel.bySubList[i].TestToolCode == viewModel.TestToolCode) {
                viewModel.set("bySubList[" + i + "].CutOffIQCheckBox", true);
                viewModel.set("bySubList[" + i + "].CutOffIQ", 0);
                viewModel.set("bySubList[" + i + "].NormScoreIQCode", NormScoreIQCode);
                viewModel.set("bySubList[" + i + "].NormScoreIQName", NormScoreIQName);
            }
        }
    }
    if (viewModel.listBySubTest.length > 0) {
        for (i = 0; i < viewModel.listBySubTest.length; i++) {
            if (viewModel.listBySubTest[i].TestTypeCode == viewModel.TestTypeCode && viewModel.listBySubTest[i].TestToolCode == viewModel.TestToolCode) {
                viewModel.set("listBySubTest[" + i + "].CutOffIQCheckBox", true);
                viewModel.set("listBySubTest[" + i + "].CutOffIQ", 0);
                viewModel.set("listBySubTest[" + i + "].NormScoreIQCode", NormScoreIQCode);
                viewModel.set("listBySubTest[" + i + "].NormScoreIQName", NormScoreIQName);
            }
        }
    }

    viewModel.set('CutOffIQCheckBox', true)
    viewModel.set('CutOffIQ', 0)
    var numerictextbox = $("#CutOffIQ").data("kendoNumericTextBox");
    numerictextbox.enable(true);
    numerictextbox.value(0);
    $('#NormScoreIQField').show()
    $('#NormScoreIQName').show()
}
changeCutOffIQ = function (data) {
    //var value = parseFloat($("#CutOffIQ").data("kendoNumericTextBox").value())
    var value = parseFloat($(data).val())
    if (value !== 0) {
        if (viewModel.CutOffIQList.length > 0) {
            for (a = 0; a < viewModel.CutOffIQList.length; a++) {
                if (viewModel.CutOffIQList[a].TestTypeCode == viewModel.TestTypeCode && viewModel.CutOffIQList[a].TestToolCode == viewModel.TestToolCode) {
                    viewModel.CutOffIQList[a].set('CutOffIQ', value);
                    viewModel.set('CutOffIQ', value)
                    var numerictextbox = $("#CutOffIQ").data("kendoNumericTextBox");
                    numerictextbox.value(value);
                }
            }
        }
        for (i = 0; i < viewModel.ArrayChecked.length; i++) {
            if (viewModel.ArrayChecked[i].TestTypeCode == viewModel.TestTypeCode && viewModel.ArrayChecked[i].TestToolCode == viewModel.TestToolCode) {
                viewModel.set("ArrayChecked[" + i + "].CutOffIQ", value);
            }
        }
        if (viewModel.CutOffDetail.length > 0) {
            for (a = 0; a < viewModel.CutOffDetail.length; a++) {
                if (viewModel.CutOffDetail[a].item.length > 0) {
                    for (b = 0; b < viewModel.CutOffDetail[a].item.length; b++) {
                        if (viewModel.CutOffDetail[a].item[b].TestTypeCode == viewModel.TestTypeCode && viewModel.CutOffDetail[a].item[b].TestToolCode == viewModel.TestToolCode) {
                            viewModel.set("CutOffDetail[" + a + "].item[" + b + "].CutOffIQ", value);
                        }
                    }
                }
            }
        }
        if (viewModel.listDetailSubTest.length > 0) {
            for (j = 0; j < viewModel.listDetailSubTest.length; j++) {
                if (viewModel.listDetailSubTest[j].TestTypeCode == viewModel.TestTypeCode && viewModel.listDetailSubTest[j].TestToolCode == viewModel.TestToolCode) {
                    viewModel.set("listDetailSubTest[" + j + "].CutOffIQ", value);
                }
            }
        }
        if (viewModel.bySubList.length > 0) {
            for (k = 0; k < viewModel.bySubList.length; k++) {
                if (viewModel.bySubList[k].TestTypeCode == viewModel.TestTypeCode && viewModel.bySubList[k].TestToolCode == viewModel.TestToolCode) {
                    viewModel.set("bySubList[" + k + "].CutOffIQ", value);
                }
            }
        }
    }
}