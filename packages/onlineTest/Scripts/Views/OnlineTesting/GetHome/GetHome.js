var viewModels = kendo.observable({
    TestTypeCode: "",
    TestToolCode: "",
    SubTestCode: "",
    Position: '',
    COName: '',
    TestToolList: [],
    SubTestList: [],
    Key: "AT19000001",
    CompanyID: '',
    TestTypeByQuestionCategory: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url:
                    function () {
                        return SERVICE_URL + 'api/Dropdown/TestTypeByQuestionCategory'
                    },
                dataType: 'json'
            },
            parameterMap: function (data, operation) {
                var QC = localStorage.getItem("QuestionCategory");
                var request = new Object();
                request.QuestionCategoryCode = QC;
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: "Data"
        }
    }),
    CategoryDataSource: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url:
                    function () {
                        return SERVICE_URL + 'api/Dropdown/TestType'
                    },
                dataType: 'json'
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: "Data"
        }
    }),
    CategoryTestTypeBySubTest: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url:
                    function () {
                        return SERVICE_URL + 'api/Dropdown/TestTypeBySubTest'
                    },
                dataType: 'json'
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: "Data"
        }
    }),
    CategoryTestTypeByTest: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url:
                    function () {
                        return SERVICE_URL + 'api/Dropdown/TestTypeByTest'
                    },
                dataType: 'json'
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: "Data"
        }
    }),
    CategoryTestTypeByNormIQ: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url:
                    function () {
                        return SERVICE_URL + 'api/Dropdown/TestTypeIQ'
                    },
                dataType: 'json'
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: "Data"
        }
    }),
    CategoryDataTestTool: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url:
                    function () {
                        return SERVICE_URL + 'api/Dropdown/TestTool'
                    },
                dataType: 'json'
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: "Data"
        }
    }),
    CategoryDataSubTest: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + 'api/Dropdown/SubTest',
                dataType: 'json'
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: "Data"
        }
    }),
    CategoryQuestion: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + 'api/Dropdown/QuestionCategory',
                dataType: 'json'
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: "Data"
        }
    }),
    CategoryAnswer: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + 'api/Dropdown/AnswerType',
                async: true,
                cache: false,
                dataType: 'json'
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: "Data"
        }
    }),
    CategoryCompanies: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + 'api/Dropdown/Company',
                dataType: 'json'
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: "Data"
        }
    }),
    CategoryGrade: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + 'api/Dropdown/Grade',
                dataType: 'json'
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: "Data"
        }
    }),
    CategoryPosition: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + 'api/Dropdown/Position',
                dataType: 'json'
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: "Data"
        }
    }),
    CompanyAIHO: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + 'api/Dropdown/CompanyAIHO',
                dataType: 'json'
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: "Data"
        }
    }),
});

CompetencyMatrixByCompany = function () {
    var CompanyId = viewModel.CompanyId;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/CompetencyMatrix",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CompanyCode: CompanyId
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Competency Matrix Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('CompetencyMatrixCode', '');
                viewModel.set('CompetencyMatrixName', '');
            }
            else {
                if (viewModel.CompetencyMatrixCode == '') {
                    viewModel.set('CompetencyMatrixList', response.Data);
                    viewModel.set("CompetencyMatrixCode", response.Data[0].Code);
                    viewModel.set('CompetencyMatrixName', response.Data[0].Value);
                    dropDownCompetencyMatrix();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModel.CompetencyMatrixCode) {
                            viewModel.set('CompetencyMatrixList', response.Data);
                            viewModel.set("CompetencyMatrixCode", response.Data[jk].Code);
                            viewModel.set('CompetencyMatrixName', response.Data[jk].Value);
                            dropDownCompetencyMatrix();
                            break;
                        }
                        else {
                            viewModel.set('CompetencyMatrixList', response.Data);
                            viewModel.set("CompetencyMatrixCode", response.Data[0].Code);
                            viewModel.set('CompetencyMatrixName', response.Data[0].Value);
                            dropDownCompetencyMatrix();
                        }
                    }
                }
            }
        }
    });
}

TestTypeByMappingSubTest = function () {
    LoadingMask.show();
    var CompanyCode = viewModel.CompanyID
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestTypeByMappingSubTest",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CompanyCode: CompanyCode
        },
        success: function (response) {
            LoadingMask.hide();
            if (response.Data.length == 0) {
                swal("Failed", "Test Type Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestTypeName', '');
                viewModel.set('TestTypeCode', '');
            }
            else {
                if (viewModel.TestTypeCode == '') {
                    viewModel.set('TestTypeList', response.Data);
                    viewModel.set('TestTypeCode', response.Data[0].Code);
                    viewModel.set("TestTypeName", response.Data[0].Value);
                    dropDownTestType();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModel.TestTypeCode) {
                            viewModel.set('TestTypeList', response.Data);
                            viewModel.set('TestTypeCode', response.Data[jk].Code);
                            viewModel.set("TestTypeName", response.Data[jk].Value);
                            dropDownTestType();
                            break;
                        } else {
                            viewModel.set('TestTypeList', response.Data);
                            viewModel.set('TestTypeCode', response.Data[0].Code);
                            viewModel.set("TestTypeName", response.Data[0].Value);
                            dropDownTestType();
                            //TestToolByMappingTestType();
                            break;
                        }
                    }
                }

            }
        }
    });
}
TestTypeByMappingTest = function () {
    LoadingMask.show();
    var CompanyCode = viewModel.CompanyID
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestTypeByMappingTest",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CompanyCode: CompanyCode
        },
        success: function (response) {
            LoadingMask.hide();
            if (response.Data.length == 0) {
                swal("Failed", "Test Type Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestTypeName', '');
                viewModel.set('TestTypeCode', '');
            }
            else {
                if (viewModels.TestTypeCode == '') {
                    viewModel.set('TestTypeTestList', response.Data);
                    viewModel.set('TestTypeCode', response.Data[0].Code);
                    viewModel.set("TestTypeName", response.Data[0].Value);
                    dropDownTestTypes();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.TestTypeCode) {
                            viewModel.set('TestTypeTestList', response.Data);
                            viewModel.set('TestTypeCode', response.Data[jk].Code);
                            viewModel.set("TestTypeName", response.Data[jk].Value);
                            var data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            //dropDownTestTool();
                            break;
                        } else {
                            viewModel.set('TestTypeTestList', response.Data);
                            viewModel.set('TestTypeCode', response.Data[0].Code);
                            viewModel.set("TestTypeName", response.Data[0].Value);
                            var data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            //break;
                        }
                    }
                    dropDownTestTypes();
                    //kendoGrid();
                }

            }
        }
    });
}
TestTypeByCompanyNormScore = function () {
    var CompanyId = viewModel.CompanyId;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestTypeByCompany",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CompanyCode: CompanyId
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Type Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestTypeCode', '');
                viewModel.set('TestTypeName', '');
            }
            else {
                if (viewModel.TestTypeCode == '') {
                    viewModel.set('TestTypeList', response.Data);
                    viewModel.set("TestTypeCode", response.Data[0].Code);
                    viewModel.set('TestTypeName', response.Data[0].Value);
                    viewModel.set('IsByTest', response.Data[0].IsByTest)
                    dropDownTestType();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModel.TestTypeCode) {
                            viewModel.set('TestTypeList', response.Data);
                            viewModel.set("TestTypeCode", response.Data[jk].Code);
                            viewModel.set('TestTypeName', response.Data[jk].Value);
                            viewModel.set('IsByTest', response.Data[jk].IsByTest)
                            dropDownTestType();
                            break;
                        }
                        else {
                            viewModel.set('TestTypeList', response.Data);
                            viewModel.set("TestTypeCode", response.Data[0].Code);
                            viewModel.set('TestTypeName', response.Data[0].Value);
                            viewModel.set('IsByTest', response.Data[0].IsByTest)
                            dropDownTestType();
                        }
                    }
                }
                TestToolByTestTypeNormScoreAdd()
            }
        }
    });
}
TestTypeByCompanyNormScoreEdit = function () {
    var CompanyId = viewModel.CompanyId;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestTypeByCompany",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CompanyCode: CompanyId
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Type Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestTypeCode', '');
                viewModel.set('TestTypeName', '');
            }
            else {
                if (viewModel.TestTypeCode == '') {
                    viewModel.set('TestTypeList', response.Data);
                    viewModel.set("TestTypeCode", response.Data[0].Code);
                    viewModel.set('TestTypeName', response.Data[0].Value);
                    viewModel.set('IsByTest', response.Data[0].IsByTest)
                    dropDownTestType();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModel.TestTypeCode) {
                            viewModel.set('TestTypeList', response.Data);
                            viewModel.set("TestTypeCode", response.Data[jk].Code);
                            viewModel.set('TestTypeName', response.Data[jk].Value);
                            viewModel.set('IsByTest', response.Data[jk].IsByTest)
                            dropDownTestType();
                            break;
                        }
                        else {
                            viewModel.set('TestTypeList', response.Data);
                            viewModel.set("TestTypeCode", viewModel.TestTypeCode);
                            viewModel.set('TestTypeName', viewModel.TestTypeName);
                            viewModel.set('IsByTest', viewModel.IsByTest)
                            dropDownTestType();
                        }
                    }
                }
                if (viewModel.IsByTest == true) {
                    kendoGrids();
                } else {
                    kendoGridEditTanpaKolomVS()
                }

                TestToolByTestTypeNormScoreEdit()
            }
        }
    });
}

TestToolByMappingTestType = function () {
    var CompanyCode = viewModel.CompanyID;
    var TestTypeCode = viewModel.TestTypeCode;
    LoadingMask.show()
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByMappingTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestTypeCode: TestTypeCode,
            CompanyCode: CompanyCode
        },
        success: function (response) {
            LoadingMask.hide()
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                //viewModel.set('TestTypeName', '');
                //viewModel.set('TestTypeCode', '');
            }
            else {
                if (viewModel.TestToolName == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set("TestToolCode", response.Data[0].Code);
                    viewModel.set('TestToolName', response.Data[0].Name);
                    dropDownTestTool();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Value == viewModel.TestToolName) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[jk].Code);
                            viewModel.set('TestToolName', response.Data[jk].Value);
                            viewModel.set("TestTool", response.Data[jk].Value);
                            viewModel.set("detailSubTest", true);
                            dropDownTestTool();
                            //Search();
                            for (a = 0; a < viewModel.listBySubTest.length; a++) {
                                if (viewModel.listBySubTest[a].TestToolName == response.Data[jk].Value) {
                                    if (viewModel.listDetailSubTest.length == 0) {
                                        viewModel.listDetailSubTest.push({
                                            TestTypeCode: viewModel.listBySubTest[a].TestTypeCode,
                                            TestTypeName: viewModel.listBySubTest[a].TestTypeName,
                                            TestToolCode: viewModel.listBySubTest[a].TestToolCode,
                                            TestToolName: viewModel.listBySubTest[a].TestToolName,
                                            SubTestCode: viewModel.listBySubTest[a].SubTestCode,
                                            SubTestName: viewModel.listBySubTest[a].SubTestName,
                                            IsByTest: false,
                                            IsDisplay: viewModel.listBySubTest[a].IsDisplay,
                                            CutOffScore: viewModel.listBySubTest[a].CutOffScore,
                                            DisplayOrder: viewModel.listBySubTest[a].DisplayOrder,
                                            length: viewModel.listBySubTest[a].length,
                                            DisplayOrderTestTool: viewModel.listBySubTest[a].DisplayOrderTestTool
                                        })
                                    } else {
                                        viewModel.listDetailSubTest = [];
                                        for (a = 0; a < viewModel.listBySubTest.length; a++) {
                                            if (viewModel.listBySubTest[a].TestToolName == response.Data[jk].Value) {
                                                viewModel.listDetailSubTest.push({
                                                    TestTypeCode: viewModel.listBySubTest[a].TestTypeCode,
                                                    TestTypeName: viewModel.listBySubTest[a].TestTypeName,
                                                    TestToolCode: viewModel.listBySubTest[a].TestToolCode,
                                                    TestToolName: viewModel.listBySubTest[a].TestToolName,
                                                    SubTestCode: viewModel.listBySubTest[a].SubTestCode,
                                                    SubTestName: viewModel.listBySubTest[a].SubTestName,
                                                    IsByTest: false,
                                                    IsDisplay: viewModel.listBySubTest[a].IsDisplay,
                                                    CutOffScore: viewModel.listBySubTest[a].CutOffScore,
                                                    DisplayOrder: viewModel.listBySubTest[a].DisplayOrder,
                                                    length: viewModel.listBySubTest[a].length,
                                                    DisplayOrderTestTool: viewModel.listBySubTest[a].DisplayOrderTestTool
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                            //viewModel.listDetailSubTest;
                            //renderGrid();
                            break;
                        } else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[0].Code);
                            viewModel.set('TestToolName', response.Data[0].Value);
                            viewModel.set("TestTool", response.Data[0].Value);
                            dropDownTestTool();
                            //break;
                        }
                    }
                }
            }
        }
    });
}
TestToolByMappingTestTypes = function () {
    var CompanyCode = viewModel.CompanyID;
    var TestTypeCode = viewModel.TestTypeCode;
    LoadingMask.show()
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByMappingTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestTypeCode: TestTypeCode,
            CompanyCode: CompanyCode
        },
        success: function (response) {
            LoadingMask.hide()
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                //viewModel.set('TestTypeName', '');
                //viewModel.set('TestTypeCode', '');
            }
            else {
                if (viewModel.TestToolName == '') {
                    viewModel.set('TestToolListTest', response.Data);
                    viewModel.set("TestToolCode", response.Data[0].Code);
                    viewModel.set('TestToolName', response.Data[0].Name);
                    dropDownTestTools();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Value == viewModel.TestToolName) {
                            viewModel.set('TestToolListTest', response.Data);
                            viewModel.set("TestToolCode", response.Data[jk].Code);
                            viewModel.set('TestToolName', response.Data[jk].Value);
                            viewModel.set("TestTool", response.Data[jk].Value);
                            viewModel.set("detailTest", true);
                            dropDownTestTools();
                            //SearchTest();
                            for (a = 0; a < viewModel.listByTest.length; a++) {
                                if (viewModel.listByTest[a].TestToolName == response.Data[jk].Value) {
                                    if (viewModel.listDetailTest.length == 0) {
                                        viewModel.listDetailTest.push({
                                            TestTypeCode: viewModel.listByTest[a].TestTypeCode,
                                            TestTypeName: viewModel.listByTest[a].TestTypeName,
                                            TestToolCode: viewModel.listByTest[a].TestToolCode,
                                            TestToolName: viewModel.listByTest[a].TestToolName,
                                            SubTestCode: viewModel.listByTest[a].SubTestCode,
                                            SubTestName: viewModel.listByTest[a].SubTestName,
                                            IsByTest: true,
                                            IsDisplay: true,
                                            CutOffScore: viewModel.listByTest[a].CutOffScore,
                                            DisplayOrder: viewModel.listByTest[a].DisplayOrder,
                                            length: viewModel.listByTest[a].length,
                                            DisplayOrderTestTool: viewModel.listByTest[a].DisplayOrderTestTool
                                        })
                                    } else {
                                        viewModel.listDetailTest = [];
                                        for (a = 0; a < viewModel.listByTest.length; a++) {
                                            if (viewModel.listByTest[a].TestToolName == response.Data[jk].Value) {
                                                viewModel.listDetailTest.push({
                                                    TestTypeCode: viewModel.listByTest[a].TestTypeCode,
                                                    TestTypeName: viewModel.listByTest[a].TestTypeName,
                                                    TestToolCode: viewModel.listByTest[a].TestToolCode,
                                                    TestToolName: viewModel.listByTest[a].TestToolName,
                                                    SubTestCode: viewModel.listByTest[a].SubTestCode,
                                                    SubTestName: viewModel.listByTest[a].SubTestName,
                                                    IsByTest: true,
                                                    IsDisplay: true,
                                                    CutOffScore: viewModel.listByTest[a].CutOffScore,
                                                    DisplayOrder: viewModel.listByTest[a].DisplayOrder,
                                                    length: viewModel.listByTest[a].length,
                                                    DisplayOrderTestTool: viewModel.listByTest[a].DisplayOrderTestTool
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                            //viewModel.listDetailTest;
                            //renderByTest();
                            break;
                        } else {
                            viewModel.set('TestToolListTest', response.Data);
                            viewModel.set("TestToolCode", response.Data[0].Code);
                            viewModel.set('TestToolName', response.Data[0].Value);
                            viewModel.set("TestTool", response.Data[0].Value);
                            dropDownTestTools();
                        }
                    }
                }
            }
        }
    });
}
TestToolList = function () {
    var TestTypeCode = viewModels.TestTypeCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestTypeCode: TestTypeCode },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestTypeName', '');
                viewModel.set('TestTypeCode', '');
            }
            else {
                if (viewModels.TestToolCode == '') {

                    viewModel.set('TestToolList', response.Data);
                    viewModel.set('TestToolName', response.Data[0].Code);
                    var data = response.Data[0].Code;
                    var Nilai = response.Data[0].Value;
                    viewModel.set("TestToolCode", Nilai);
                    dropDownTestTool();
                    headerFunction();
                    //kendoGrid();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[jk].Code);
                            var data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            viewModel.set("TestToolCode", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            //dropDownTestTool();
                            break;
                        } else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[0].Code);
                            var data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            viewModel.set("TestToolCode", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            //break;
                        }
                    }
                    dropDownTestTool();
                    //kendoGrid();
                }

            }
        }
    });
}
TestToolListGroupBySubTest = function () {
    var TestTypeCode = viewModels.TestTypeCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestTypeCode: TestTypeCode },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestTypeName', '');
                viewModel.set('TestTypeCode', '');
            }
            else {
                if (viewModels.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set("TestToolCode", response.Data[0].Code);
                    viewModel.set('TestToolName', response.Data[0].Value);
                    var data = response.Data[0].Code;
                    var Nilai = response.Data[0].Value;
                    dropDownTestTool();
                    SubTestByTestToolGroupBySubTest();
                    headerFunction();
                    //kendoGrid();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[jk].Code);
                            viewModel.set('TestToolName', response.Data[jk].Value);
                            var data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            //dropDownTestTool();
                            break;
                        } else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[0].Code);
                            viewModel.set('TestToolName', response.Data[0].Value);
                            var data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            //break;
                        }
                    }
                    dropDownTestTool();
                    //kendoGrid();
                }

            }
        }
    });
}
TestToolBySubLast = function () {
    var TestTypeCode = viewModels.TestTypeCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestTypeCode: TestTypeCode },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestTypeName', '');
                viewModel.set('TestTypeCode', '');
            }
            else {
                if (viewModels.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set('TestToolName', response.Data[0].Code);
                    var data = response.Data[0].Code;
                    var Nilai = response.Data[0].Value;
                    viewModel.set("TestToolCode", Nilai);
                    var List = {
                        sender: {
                            _selectedValue: data,
                        }
                    };
                    dropDownTestTool();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[jk].Code);
                            var data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            viewModel.set("TestToolCode", Nilai);
                            viewModel.set("TestTool", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            dropDownTestTool();
                            break;
                        } else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[0].Code);
                            var data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            viewModel.set("TestToolCode", Nilai);
                            viewModel.set("TestTool", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            dropDownTestTool();
                        }
                    }
                }

            }
        }
    });
}
TestToolByQuestionCategory = function () {
    debugger
    var TestTypeCode = viewModel.TestTypeCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByQuestionCategory",
        headers: { "Authorization-Token": Cookie.load() },
        data: { Key: TestTypeCode, QuestionCategoryCode: localStorage.getItem("QuestionCategory")},
        success: function (response) {
            debugger
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestTypeName', '');
                viewModel.set('TestTypeCode', '');
            }
            else {
                debugger
                if (viewModel.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    
                    dropDownTestTool();
                    //onChangeSubTest(List);
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModel.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            dropDownTestTool();
                            //onChangeSubTest(List);
                            break;
                        }
                        else {
                            viewModel.set('TestToolList', response.Data);
                            dropDownTestTool();
                            //onChangeSubTest(List);
                            //break;
                        }
                    }
                }

            }
        }
    });
}

TestToolByTestType = function () {
    var TestTypeCode = viewModel.TestTypeCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestTypeCode: TestTypeCode },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestTypeName', '');
                viewModel.set('TestTypeCode', '');
            }
            else {
                if (viewModel.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set("TestToolCode", response.Data[0].Code);
                    viewModel.set('TestToolName', response.Data[0].Value);
                    var data = response.Data[0].Code;
                    var Nilai = response.Data[0].Value;
                    var List = {
                        sender: {
                            _selectedValue: data,
                        }
                    };
                    dropDownTestTool();
                    SubTestByTestTool();
                    onChangeSubTest(List);
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModel.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[jk].Code);
                            viewModel.set('TestToolName', response.Data[jk].Value);
                            var data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            viewModel.set("TestTool", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            dropDownTestTool();
                            SubTestByTestTool();
                            onChangeSubTest(List);
                            break;
                        }
                        else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[0].Code);
                            viewModel.set('TestToolName', response.Data[0].Value);
                            var data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            viewModel.set("TestTool", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            dropDownTestTool();
                            SubTestByTestTool();
                            onChangeSubTest(List);
                            //break;
                        }
                    }
                }

            }
        }
    });
}
TestToolByCompanyCompetencyMatrix = function () {
    var CompanyId = viewModel.CompanyId;
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByCompany",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CompanyId: CompanyId
        },
        success: function (response) {
            if (response.Data.length == 0) {
                LoadingMask.hide();
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolList', []);
                for (a = 0; a < viewModel.Competencies.length; a++) {
                    if (viewModel.Competencies[a].SubTests.length > 0) {
                        for (b = 0; b < viewModel.Competencies[a].SubTests.length; b++) {
                            if (viewModel.Competencies[a].SubTests[b].TestToolCode == '') {
                                viewModel.Competencies[a].SubTests[b].set('TestToolCode', '');
                                dropDownTestTool();
                            } else {
                                viewModel.Competencies[a].SubTests[b].set('TestToolCode', '');
                                $('#TestToolName' + b + a).data("kendoComboBox").value('')
                                viewModel.Competencies[a].SubTests[b].set('SubTestCode', '');
                                $('#SubTestName' + b + a).data("kendoComboBox").value('')
                                viewModel.set('SubTestList', [])
                                dropDownTestTool();
                                dropDownSubTest()
                            }
                        }
                    }
                }
            }
            else {
                LoadingMask.hide();
                viewModel.set('TestToolList', response.Data);
                for (a = 0; a < viewModel.Competencies.length; a++) {
                    if (viewModel.Competencies[a].SubTests.length > 0) {
                        for (b = 0; b < viewModel.Competencies[a].SubTests.length; b++) {
                            if (viewModel.Competencies[a].SubTests[b].TestToolCode == '') {
                                viewModel.Competencies[a].SubTests[b].set('TestToolCode', '');
                                //SubTestMappingByTestToolCompetencyMatrix(a, b);
                                dropDownTestTool(b, a);
                            } else {
                                for (ttc = 0; ttc < response.Data.length; ttc++) {
                                    if (response.Data[ttc].Code == viewModel.Competencies[a].SubTests[b].TestToolCode) {
                                        viewModel.Competencies[a].SubTests[b].set('TestToolCode', response.Data[ttc].Code);
                                        //SubTestMappingByTestToolCompetencyMatrix(a, b);
                                        dropDownTestTool(b, a);
                                    } else {
                                        viewModel.Competencies[a].SubTests[b].set('TestToolCode', '');
                                        $('#TestToolName' + b + a).data("kendoComboBox").value('')
                                        viewModel.Competencies[a].SubTests[b].set('SubTestCode', '');
                                        $('#SubTestName' + b + a).data("kendoComboBox").value('')
                                        viewModel.set('SubTestList', [])
                                        //SubTestMappingByTestToolCompetencyMatrix(b, a);
                                        dropDownTestTool(b, a);
                                        dropDownSubTest(b, a)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}
TestToolByCompanyCompetencyMatrixEdit = function (count, competencies) {
    var CompanyId = viewModel.CompanyId;
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByCompany",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CompanyId: CompanyId
        },
        success: function (response) {
            if (response.Data.length == 0) {
                LoadingMask.hide();
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
            }
            else {
                LoadingMask.hide();
                viewModel.set('TestToolList', response.Data);
                if (viewModel.Competencies[competencies].SubTests[count].TestToolCode == '') {
                    viewModel.Competencies[competencies].SubTests[count].set('TestToolCode', '');
                    dropDownTestTool();
                } else {
                    for (ttc = 0; ttc < response.Data.length; ttc++) {
                        var testtoolvalue = $.grep(viewModel.TestToolList, function (n, i) {
                            return n.Code == viewModel.Competencies[competencies].SubTests[count].TestToolCode
                        });
                        if (response.Data[ttc].Code == viewModel.Competencies[competencies].SubTests[count].TestToolCode) {
                            viewModel.Competencies[competencies].SubTests[count].set('TestToolCode', response.Data[ttc].Code);
                            SubTestMappingByTestToolCompetencyMatrixEdit(count, competencies);
                            dropDownTestTool(count, competencies);
                            $("#TestToolName" + count + competencies).data("kendoComboBox").value(testtoolvalue[0].Value)
                            break;
                        } else {
                            //viewModel.Competencies[competencies].SubTests[count].set('TestToolCode', response.Data[0].Code);
                            SubTestMappingByTestToolCompetencyMatrixEdit(count, competencies);
                            dropDownTestTool(count, competencies);
                            //$("#TestToolName" + count + competencies).data("kendoComboBox").value(testtoolvalue[0].Value)
                            $("#TestToolName" + count + competencies).data("kendoComboBox").value(viewModel.Competencies[competencies].SubTests[count].TestToolName)
                            break;
                        }
                    }
                }
            }
        }
    });
}
TestToolIQByCompany = function () {
    var CompanyId = viewModel.CompanyId;
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolIQByCompany",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CompanyId: CompanyId
        },
        success: function (response) {
            if (response.Data.length == 0) {
                LoadingMask.hide();
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
            }
            else {
                LoadingMask.hide();
                if (viewModel.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set("TestToolCode", response.Data[0].Code);
                    viewModel.set('TestToolName', response.Data[0].Value);
                    dropDownTestTool();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModel.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[jk].Code);
                            viewModel.set('TestToolName', response.Data[jk].Value);
                            dropDownTestTool();
                            break;
                        }
                        else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[0].Code);
                            viewModel.set('TestToolName', response.Data[0].Value);
                            dropDownTestTool();
                        }
                    }
                }
            }
        }
    });
}
TestToolIQByCompanyAdd = function () {
    var CompanyId = viewModel.CompanyId;
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolIQByCompany",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CompanyId: CompanyId
        },
        success: function (response) {
            if (response.Data.length == 0) {
                LoadingMask.hide();
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                SubTestMappingByTestToolIQ();
            }
            else {
                LoadingMask.hide();
                if (viewModel.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set("TestToolCode", response.Data[0].Code);
                    viewModel.set('TestToolName', response.Data[0].Value);
                    dropDownTestTool();
                    SubTestMappingByTestToolIQ();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModel.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[jk].Code);
                            viewModel.set('TestToolName', response.Data[jk].Value);
                            dropDownTestTool();
                            SubTestMappingByTestToolIQ();
                            break;
                        }
                        else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[0].Code);
                            viewModel.set('TestToolName', response.Data[0].Value);
                            dropDownTestTool();
                            SubTestMappingByTestToolIQ();
                        }
                    }
                }
            }
        }
    });
}
TestToolIQByCompanyEdit = function () {
    var CompanyId = viewModel.CompanyId;
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolIQByCompany",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CompanyId: CompanyId
        },
        success: function (response) {
            if (response.Data.length == 0) {
                LoadingMask.hide();
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                SubTestMappingByTestToolIQ();
            }
            else {
                LoadingMask.hide();
                if (viewModel.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set("TestToolCode", response.Data[0].Code);
                    viewModel.set('TestToolName', response.Data[0].Value);
                    dropDownTestTool();
                    SubTestMappingByTestToolIQ();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModel.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[jk].Code);
                            viewModel.set('TestToolName', response.Data[jk].Value);
                            dropDownTestTool();
                            SubTestMappingByTestToolIQ();
                            break;
                        }
                        else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", viewModel.TestToolCode);
                            viewModel.set('TestToolName', viewModel.TestToolName);
                            dropDownTestTool();
                            SubTestMappingByTestToolIQ();
                            break;
                        }
                    }
                }
            }
        }
    });
}
TestToolByTestTypeNormScore = function () {
    var TestTypeCode = viewModel.TestTypeCode;
    var CompanyId = viewModel.CompanyId;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByMappingTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestTypeCode: TestTypeCode,
            CompanyCode: CompanyId
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestTool', '');
            }
            else {
                if (viewModel.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set("TestToolCode", response.Data[0].Code);
                    viewModel.set('TestToolName', response.Data[0].Value);
                    viewModel.set('TestTool', response.Data[0].Value);
                    dropDownTestTool();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModel.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[jk].Code);
                            viewModel.set('TestToolName', response.Data[jk].Value);
                            viewModel.set("TestTool", response.Data[jk].Value);
                            dropDownTestTool();
                            break;
                        }
                        else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[0].Code);
                            viewModel.set('TestToolName', response.Data[0].Value);
                            viewModel.set("TestTool", response.Data[0].Value);
                            dropDownTestTool();
                            break;
                        }
                    }
                }
            }
        }
    });
}
TestToolByTestTypeNormScoreAdd = function () {
    var TestTypeCode = viewModel.TestTypeCode;
    var CompanyId = viewModel.CompanyId;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByMappingTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestTypeCode: TestTypeCode,
            CompanyCode: CompanyId
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestTool', '');
            }
            else {
                if (viewModel.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set("TestToolCode", response.Data[0].Code);
                    viewModel.set('TestToolName', response.Data[0].Value);
                    viewModel.set('TestTool', response.Data[0].Value);
                    dropDownTestTool();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModel.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[jk].Code);
                            viewModel.set('TestToolName', response.Data[jk].Value);
                            viewModel.set("TestTool", response.Data[jk].Value);
                            dropDownTestTool();
                            break;
                        }
                        else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[0].Code);
                            viewModel.set('TestToolName', response.Data[0].Value);
                            viewModel.set("TestTool", response.Data[0].Value);
                            dropDownTestTool();
                            break;
                        }
                    }
                }
                headerFunction();
            }
        }
    });
}
TestToolByTestTypeNormScoreEdit = function () {
    var TestTypeCode = viewModel.TestTypeCode;
    var CompanyId = viewModel.CompanyId;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByMappingTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestTypeCode: TestTypeCode,
            CompanyCode: CompanyId
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestTool', '');
            }
            else {
                if (viewModel.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set("TestToolCode", response.Data[0].Code);
                    viewModel.set('TestToolName', response.Data[0].Value);
                    viewModel.set('TestTool', response.Data[0].Value);
                    dropDownTestTool();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModel.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[jk].Code);
                            viewModel.set('TestToolName', response.Data[jk].Value);
                            viewModel.set("TestTool", response.Data[jk].Value);
                            dropDownTestTool();
                            break;
                        }
                        else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", viewModel.TestToolCode);
                            viewModel.set('TestToolName', viewModel.TestToolName);
                            viewModel.set("TestTool", viewModel.TestToolName);
                            dropDownTestTool();
                            break;
                        }
                    }
                }
                //headerFunction();
            }
        }
    });
}
TestToolByTestTypeQA = function () {
    var TestTypeCode = viewModel.TestTypeCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestTypeCode: TestTypeCode },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestTypeName', '');
                viewModel.set('TestTypeCode', '');
            }
            else {
                if (viewModel.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set("TestToolCode", response.Data[0].Code);
                    viewModel.set('TestToolName', response.Data[0].Value);
                    var data = response.Data[0].Code;
                    var Nilai = response.Data[0].Value;
                    var List = {
                        sender: {
                            _selectedValue: data,
                        }
                    };
                    dropDownTestTool();
                    SubTestByTestTool();
                    //onChangeSubTest(List);
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModel.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[jk].Code);
                            viewModel.set('TestToolName', response.Data[jk].Value);
                            var data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            viewModel.set("TestTool", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            dropDownTestTool();
                            SubTestByTestTool();
                            //onChangeSubTest(List);
                            break;
                        } else if (response.Data[jk].Code !== viewModel.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", viewModel.TestToolCode);
                            viewModel.set('TestToolName', viewModel.TestToolName);
                            dropDownTestTool();
                            SubTestByTestTool();
                            //onChangeSubTest(List);
                            break;
                        } else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set("TestToolCode", response.Data[0].Code);
                            viewModel.set('TestToolName', response.Data[0].Value);
                            var data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            viewModel.set("TestTool", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            dropDownTestTool();
                            SubTestByTestTool();
                            //onChangeSubTest(List);
                            //break;
                        }
                    }
                }

            }
        }
    });
}
TestToolInByTest = function () {
    var TestTypeCode = viewModels.TestTypeCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestTypeCode: TestTypeCode },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                //viewModel.set('TestTypeName', '');
                //viewModel.set('TestTypeCode', '');
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
            }
            else {
                if (viewModels.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set('TestToolName', response.Data[0].Code);
                    var data = response.Data[0].Code;
                    var Nilai = response.Data[0].Value;
                    viewModel.set("TestToolCode", data);
                    viewModel.set("TestTool", Nilai);
                    var List = {
                        sender: {
                            _selectedValue: data,
                        }
                    };
                    dropDownTestTool();
                    //dropDownTestToolDialog();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[jk].Code);
                            var data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            viewModel.set("TestToolCode", data);
                            viewModel.set("TestTool", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            dropDownTestTool(data);
                            //dropDownTestToolDialog(data);
                            break;
                        } else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[0].Code);
                            var data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            viewModel.set("TestToolCode", data);
                            viewModel.set("TestTool", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            dropDownTestTool(data);
                            //dropDownTestToolDialog(data);
                            //break;
                        }
                    }
                }

            }
        }
    });
}
TestToolInByTestAddVS = function () {
    var TestTypeCode = viewModels.TestTypeCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestTypeCode: TestTypeCode
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                //viewModel.set('TestTypeName', '');
                //viewModel.set('TestTypeCode', '');
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('SubTestCd', '');
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTest', '');
                viewModel.set('SubTestName', '');
            }
            else {
                if (viewModels.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set('TestToolName', response.Data[0].Value);
                    var data = response.Data[0].Code;
                    var Nilai = response.Data[0].Value;
                    viewModel.set("TestToolCode", data);
                    viewModel.set("TestTool", Nilai);
                    var List = {
                        sender: {
                            _selectedValue: data,
                        }
                    };
                    SubTestByTestToolAddVS();
                    dropDownTestTool();
                    dropDownTestToolDialog();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[jk].Value);
                            var data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            viewModel.set("TestToolCode", data);
                            viewModel.set("TestTool", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            }
                            SubTestByTestToolAddVS();
                            dropDownTestTool(data);
                            dropDownTestToolDialog(data);
                            break;
                        } else if (response.Data[jk].Code !== viewModels.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolCode', viewModel.TestToolCode);
                            viewModel.set('TestToolName', viewModel.TestToolName);
                            SubTestByTestToolAddVS();
                            dropDownTestTool(viewModel.TestToolCode);
                            dropDownTestToolDialog(viewModel.TestToolCode);
                        } else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[0].Value);
                            var data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            viewModel.set("TestToolCode", data);
                            viewModel.set("TestTool", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            SubTestByTestToolAddVS();
                            dropDownTestTool(data);
                            dropDownTestToolDialog(data);
                            //break;
                        }
                    }
                }
            }
        }
    });
}
TestToolInByTestEditVS = function () {
    var TestTypeCode = viewModels.TestTypeCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestTypeCode: TestTypeCode
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                //viewModel.set('TestTypeName', '');
                //viewModel.set('TestTypeCode', '');
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('SubTestCd', '');
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTest', '');
                viewModel.set('SubTestName', '');
            }
            else {
                if (viewModels.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set('TestToolName', response.Data[0].Value);
                    var data = response.Data[0].Code;
                    var Nilai = response.Data[0].Value;
                    viewModel.set("TestToolCode", data);
                    viewModel.set("TestTool", Nilai);
                    var List = {
                        sender: {
                            _selectedValue: data,
                        }
                    };
                    SubTestByTestToolEditVS();
                    dropDownTestTool();
                    dropDownTestToolDialog();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[jk].Value);
                            var data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            viewModel.set("TestToolCode", data);
                            viewModel.set("TestTool", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            }
                            SubTestByTestToolEditVS();
                            dropDownTestTool(data);
                            dropDownTestToolDialog(data);
                            break;
                        } else if (response.Data[jk].Code !== viewModels.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolCode', viewModel.TestToolCode);
                            viewModel.set('TestToolName', viewModel.TestToolName);
                            SubTestByTestToolEditVS();
                            dropDownTestTool(viewModel.TestToolCode);
                            dropDownTestToolDialog(viewModel.TestToolCode);
                        } else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[0].Value);
                            var data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            viewModel.set("TestToolCode", data);
                            viewModel.set("TestTool", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            SubTestByTestToolEditVS();
                            dropDownTestTool(data);
                            dropDownTestToolDialog(data);
                            //break;
                        }
                    }
                }
            }
        }
    });
}
TestToolInByTests = function () {
    var TestTypeCode = viewModels.TestTypeCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestTypeCode: TestTypeCode },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestTypeName', '');
                viewModel.set('TestTypeCode', '');
            }
            else {
                if (viewModels.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set('TestToolName', response.Data[0].Code);
                    var data = response.Data[0].Code;
                    var Nilai = response.Data[0].Value;
                    viewModel.set("TestToolCode", data);
                    viewModel.set("TestTool", Nilai);
                    var List = {
                        sender: {
                            _selectedValue: data,
                        }
                    };
                    dropDownTestTools();
                } else {
                    viewModel.set('TestToolList', []);
                    var data = '';
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[jk].Code);
                            data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            viewModel.set("TestToolCode", data);
                            viewModel.set("TestTool", Nilai);
                            dropDownTestTools(data);
                            break;
                        } else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[0].Code);
                            data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            viewModel.set("TestToolCode", data);
                            viewModel.set("TestTool", Nilai);
                            dropDownTestTools(data);
                            //break;
                        }
                    }
                }
            }
        }
    });
}
TestToolInBySub = function () {
    var TestTypeCode = viewModels.TestTypeCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestTypeCode: TestTypeCode },
        success: function (response) {

            viewModel.set('TestToolList', []);
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestTypeName', '');
                viewModel.set('TestTypeCode', '');
            }
            else {
                if (viewModels.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set('TestToolName', response.Data[0].Code);
                    var data = response.Data[0].Code;
                    var Nilai = response.Data[0].Value;
                    viewModel.set("TestToolCode", data);
                    viewModel.set("TestTool", Nilai);
                    var List = {
                        sender: {
                            _selectedValue: data,
                        }
                    };
                    dropDownTestTool();
                    onChangeSubTest(List);
                }
                else {
                    viewModel.set('TestToolList', []);
                    var data = '';
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[jk].Code);
                            data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            viewModel.set("TestToolCode", data);
                            viewModel.set("TestTool", Nilai);
                            loadDropDownTest(data);
                            break;
                        } else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[0].Code);
                            data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            viewModel.set("TestToolCode", data);
                            viewModel.set("TestTool", Nilai);
                            loadDropDownTest(data);
                            //break;
                        }
                    }

                }

            }
        }
    });
}
TestToolInBySub2 = function () {
    var TestTypeCode = viewModels.TestTypeCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestTypeCode: TestTypeCode },
        success: function (response) {

            viewModel.set('TestToolList', []);
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestTypeName', '');
                viewModel.set('TestTypeCode', '');
            }
            else {
                if (viewModels.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set('TestToolName', response.Data[0].Code);
                    var data = response.Data[0].Code;
                    var Nilai = response.Data[0].Value;
                    viewModel.set("TestToolCode", data);
                    viewModel.set("TestTool", Nilai);
                    var List = {
                        sender: {
                            _selectedValue: data,
                        }
                    };
                    dropDownTestTool();
                    onChangeSubTest(List);
                }
                else {
                    viewModel.set('TestToolList', []);
                    var data = '';
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[jk].Code);
                            data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            viewModel.set("TestToolCode", data);
                            viewModel.set("TestTool", Nilai);
                            loadDropDownTest(data);
                            break;
                        } else if (response.Data[jk].Code !== viewModels.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', viewModel.TestToolName);
                            viewModel.set("TestToolCode", viewModel.TestToolCode);
                            data = response.Data[jk].Code;
                            loadDropDownTest(data);
                        }
                        else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[0].Code);
                            data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            viewModel.set("TestToolCode", data);
                            viewModel.set("TestTool", Nilai);
                            loadDropDownTest(data);
                            //break;
                        }
                    }

                }

            }
        }
    });
}

loadDropDownTest = function () {
    var List = {
        sender: {
            _selectedValue: viewModel.TestToolName,
        }
    };
    dropDownTestTool();
    onChangeSubTest(List);
}
TestToolNormIQ = function () {
    var TestTypeCode = viewModels.TestTypeCode;
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestTypeCode: TestTypeCode },
        success: function (response) {
            if (response.Data.length == 0) {
                LoadingMask.hide();
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestTypeName', '');
                viewModel.set('TestTypeCode', '');
            }
            else {
                LoadingMask.hide();
                if (viewModels.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set('TestToolName', response.Data[0].Code);
                    var data = response.Data[0].Code;
                    var Nilai = response.Data[0].Value;
                    viewModel.set("TestToolCode", Nilai);
                    var List = {
                        sender: {
                            _selectedValue: data,
                        }
                    };
                    dropDownTestTool();
                    kendoGrid();
                }
                else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[jk].Code);
                            var data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            viewModel.set("TestToolCode", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            dropDownTestTool();
                            break;
                        } else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[0].Code);
                            var data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            viewModel.set("TestToolCode", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                }
                            };
                            dropDownTestTool();
                            //break;
                        }
                    }

                }

            }
        }
    });
}

SubTestByTestTool = function () {
    debugger
    var TestToolCode = viewModel.TestToolCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/SubTestByTestTool",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestToolCode: TestToolCode
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Sub Test Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('SubTestList', null);
                //viewModel.set('TestTypeName', ''); viewModel.set('TestTypeCode', '');
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTestName', '');
            } else if (TestToolCode == '') {
                //swal("Failed", "Sub Test Not Found!!!", "warning");
                viewModel.set('SubTestList', null);
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTestName', '');
            } else {
                for (jk = 0; jk < response.Data.length; jk++) {
                    if (response.Data[jk].Code == viewModels.SubTestCode) {
                        //alert("disni");
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTestName", response.Data[jk].Value);
                        viewModel.set("SubTestCode", response.Data[jk].Code);
                        viewModel.set("SubTestCd", response.Data[jk].Code);
                        dropDownSubTest();
                        break
                    } else {
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTestName", response.Data[0].Value);
                        viewModel.set("SubTestCode", response.Data[0].Code);
                        viewModel.set("SubTestCd", response.Data[0].Code);
                        dropDownSubTest();
                    }
                }

            }
        }
    });
}
SubTestByTestToolCutOff = function () {
    var TestToolCode = viewModel.TestToolCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/SubTestByTestTool",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestToolCode: TestToolCode
        },
        success: function (response) {
            if (response.Data.length == 0) {
                LoadingMask.hide();
                swal("Failed", "Sub Test Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTestName', '');
            }
            else {
                LoadingMask.hide();
                if (viewModel.SubTestCode == '') {
                    viewModel.set('SubTestList', response.Data);
                    viewModel.set("SubTestCode", response.Data[0].Code);
                    viewModel.set('SubTestName', response.Data[0].Value);
                    dropDownSubTest();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModel.SubTestCode) {
                            viewModel.set('SubTestList', response.Data);
                            viewModel.set("SubTestCode", response.Data[jk].Code);
                            viewModel.set('SubTestName', response.Data[jk].Value);
                            dropDownSubTest();
                            break;
                        }
                        else {
                            viewModel.set('SubTestList', response.Data);
                            viewModel.set("SubTestCode", response.Data[0].Code);
                            viewModel.set('SubTestName', response.Data[0].Value);
                            dropDownSubTest();
                        }
                    }
                }
            }
        }
    });
}
SubTestMappingByTestToolCompetencyMatrix = function (count, competencies) {
    var TestToolCode = viewModel.Competencies[competencies].SubTests[count].TestToolCode;
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/SubTestMappingByTestTool",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestToolCode: TestToolCode
        },
        success: function (response) {
            if (response.Data.length == 0) {
                LoadingMask.hide();
                swal("Failed", "Sub Test Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('SubTestList', []);
                $('#SubTestName' + count + competencies).data('kendoComboBox').value("")
                dropDownSubTest(count, competencies);
            }
            else {
                LoadingMask.hide();
                if (viewModel.SubTestList.length > 0) {
                    for (a = 0; a < viewModel.SubTestList.length; a++) {
                        if (TestToolCode !== viewModel.SubTestList[a].TestToolCode) {
                            viewModel.SubTestList.push({
                                TestToolCode: TestToolCode,
                                data: response.Data
                            });
                        }
                    }
                } else {
                    viewModel.SubTestList.push({
                        TestToolCode: TestToolCode,
                        data: response.Data
                    });
                }

                if (viewModel.Competencies[competencies].SubTests[count].SubTestCode == '') {
                    //viewModel.Competencies[competencies].SubTests[count].set('SubTestCode', response.Data[0].Code);
                    dropDownSubTest(count, competencies);
                } else {
                    for (stc = 0; stc < response.Data.length; stc++) {
                        if (response.Data[stc].Code == viewModel.Competencies[competencies].SubTests[count].SubTestCode) {
                            //viewModel.Competencies[competencies].SubTests[count].set('SubTestCode', response.Data[stc].Code);
                            dropDownSubTest(count, competencies);
                        } else {
                            //viewModel.Competencies[competencies].SubTests[count].set('SubTestCode', response.Data[0].Code);
                            dropDownSubTest(count, competencies);
                        }
                    }
                }
            }
        }
    });
}
SubTestMappingByTestToolCompetencyMatrixEdit = function (count, competencies) {
    var TestToolCode = viewModel.Competencies[competencies].SubTests[count].TestToolCode;
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/SubTestMappingByTestTool",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestToolCode: TestToolCode
        },
        success: function (response) {
            if (response.Data.length == 0) {
                LoadingMask.hide();
                swal("Failed", "Sub Test Not Found!!!", "warning", { closeOnClickOutside: false });
            }
            else {
                LoadingMask.hide();
                if (viewModel.SubTestList.length > 0) {
                    for (a = 0; a < viewModel.SubTestList.length; a++) {
                        if (TestToolCode !== viewModel.SubTestList[a].TestToolCode) {
                            viewModel.SubTestList.push({
                                TestToolCode: TestToolCode,
                                data: response.Data
                            });
                        }
                    }
                } else {
                    viewModel.SubTestList.push({
                        TestToolCode: TestToolCode,
                        data: response.Data
                    });
                }

                if (viewModel.Competencies[competencies].SubTests[count].SubTestCode == '') {
                    viewModel.Competencies[competencies].SubTests[count].set('SubTestCode', response.Data[0].Code);
                    dropDownSubTest(count, competencies);
                } else {
                    for (subtest = 0; subtest < viewModel.SubTestList.length; subtest++) {
                        var subtestvalue = $.grep(viewModel.SubTestList[subtest].data, function (n, i) {
                            return n.Code == viewModel.Competencies[competencies].SubTests[count].SubTestCode
                        });
                    }
                    for (stc = 0; stc < response.Data.length; stc++) {
                        if (response.Data[stc].Code == viewModel.Competencies[competencies].SubTests[count].SubTestCode) {
                            viewModel.Competencies[competencies].SubTests[count].set('SubTestCode', response.Data[stc].Code);
                            dropDownSubTest(count, competencies);
                            $("#SubTestName" + count + competencies).data("kendoComboBox").value(subtestvalue[0].Value)
                            break;
                        } else {
                            //viewModel.Competencies[competencies].SubTests[count].set('SubTestCode', subtestvalue[0].Code);
                            dropDownSubTest(count, competencies);
                            $("#SubTestName" + count + competencies).data("kendoComboBox").value(viewModel.Competencies[competencies].SubTests[count].SubTestName)
                            break;
                        }
                    }
                }
            }
        }
    });
}
SubTestMappingByTestToolIQ = function () {
    var TestToolCode = viewModel.TestToolCode;
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/SubTestMappingByTestTool",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestToolCode: TestToolCode
        },
        success: function (response) {
            if (response.Data.length == 0) {
                LoadingMask.hide();
                swal("Failed", "Sub Test Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('SubTestList', null);
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTestName', '');
            }
            else {
                LoadingMask.hide();
                for (jk = 0; jk < response.Data.length; jk++) {
                    if (response.Data[jk].Code == viewModel.SubTestCode) {
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTestCd", response.Data[jk].Code);
                        viewModel.set("SubTestCode", response.Data[jk].Code);
                        viewModel.set("SubTestName", response.Data[jk].Value);
                        dropDownSubTest();
                        break;
                    } else {
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTestCd", response.Data[0].Code);
                        viewModel.set("SubTestCode", response.Data[0].Code);
                        viewModel.set("SubTestName", response.Data[0].Value);
                        dropDownSubTest();
                        break;
                    }
                }
            }
        }
    });
}
SubTestByTestToolMapSubTest = function () {
    var TestToolCode = viewModel.TestToolCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/SubTestByTestTool",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestToolCode: TestToolCode
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Sub Test Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('SubTestList', null);
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTestName', '');
            }
            //else if (TestToolCode == '') {
            //    viewModel.set('SubTestList', null);
            //    viewModel.set('TestToolName', '');
            //    viewModel.set('TestToolCode', '');
            //    viewModel.set('SubTestCode', '');
            //    viewModel.set('SubTestName', '');
            //}
            else {
                for (jk = 0; jk < response.Data.length; jk++) {
                    if (response.Data[jk].Code == viewModel.SubTestCode) {
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTestName", response.Data[jk].Value);
                        viewModel.set("SubTestCode", response.Data[jk].Code);
                        viewModel.set("SubTestCd", response.Data[jk].Code);
                        dropDownSubTest();
                        break
                    } else {
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTestName", response.Data[0].Value);
                        viewModel.set("SubTestCode", response.Data[0].Code);
                        viewModel.set("SubTestCd", response.Data[0].Code);
                        dropDownSubTest();
                    }
                }

            }
        }
    });
}
SubTestByTestToolMapSubTestAdd = function () {
    var TestToolCode = viewModel.TestToolCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/MappingSubTest/GetSubTest",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestToolCode: TestToolCode
        },
        success: function (response) {
            if (response.SubTestList.length == 0) {
                swal("Failed", "Sub Test Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('SubTestList', null);
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTestName', '');
            }
            else {
                for (jk = 0; jk < response.SubTestList.length; jk++) {
                    if (response.SubTestList[jk].Code == viewModel.SubTestCode) {
                        viewModel.set('SubTestList', response.SubTestList);
                        renderGridMapping();
                        break;
                    } else {
                        viewModel.set('SubTestList', response.SubTestList);
                        renderGridMapping();
                        break;
                    }
                }

            }
        }
    });
}
SubTestByTestToolGroupBySubTest = function () {
    var TestToolCode = viewModel.TestToolCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/SubTestByTestTool",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestToolCode: TestToolCode
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Sub Test Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('SubTestList', null);
                //viewModel.set('TestTypeName', ''); viewModel.set('TestTypeCode', '');
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTestName', '');
            } else if (TestToolCode == '') {
                //swal("Failed", "Sub Test Not Found!!!", "warning");
                viewModel.set('SubTestList', null);
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTestName', '');
            } else {
                for (jk = 0; jk < response.Data.length; jk++) {
                    if (response.Data[jk].Code == viewModels.SubTestCode) {
                        //alert("disni");
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTestCode", response.Data[jk].Code);
                        viewModel.set("SubTestName", response.Data[jk].Value);
                        viewModel.set("SubTestCd", response.Data[jk].Code);
                        dropDownSubTest();
                        break
                    } else {
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTestCode", response.Data[0].Code);
                        viewModel.set("SubTestName", response.Data[0].Value);
                        viewModel.set("SubTestCd", response.Data[0].Code);
                        dropDownSubTest();
                    }
                }

            }
        }
    });
}
SubTestByTestToolAddVS = function () {
    var TestToolCode = viewModel.TestToolCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/SubTestByTestTool",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestToolCode: TestToolCode
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Sub Test Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('SubTestList', null);
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTestName', '');
            } else {
                if (viewModel.SubTestCode == '') {
                    viewModel.set('SubTestList', response.Data);
                    var data = response.Data[0].Code;
                    var Nilai = response.Data[0].Value;
                    viewModel.set("SubTestCd", data);
                    viewModel.set('SubTestCode', data);
                    viewModel.set("SubTest", Nilai);
                    viewModel.set("SubTestName", Nilai);
                    dropDownSubTest();
                    dropDownSubTestDialog();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.SubTestCode) {
                            viewModel.set('SubTestList', response.Data);
                            var data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            viewModel.set('SubTestCode', data);
                            viewModel.set('SubTestName', Nilai);
                            viewModel.set('SubTest', Nilai);
                            viewModel.set("SubTestCd", data);
                            //viewModel.DetailByMappingQuestion[0].set("SubTestCode1", data);
                            var List = {
                                sender: {
                                    _selectedValue: data
                                }
                            }
                            dropDownSubTest(data);
                            dropDownSubTestDialog(data);
                            break;
                        } else {
                            viewModel.set('SubTestList', response.Data);
                            var data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            viewModel.set('SubTestCode', data);
                            viewModel.set('SubTestName', Nilai);
                            viewModel.set('SubTest', Nilai);
                            viewModel.set("SubTestCd", data);
                            var List = {
                                sender: {
                                    _selectedValue: data
                                }
                            }
                            dropDownSubTest(data);
                            dropDownSubTestDialog(data);
                        }
                    }
                }
            }
        }
    });
}
SubTestByTestToolEditVS = function () {
    var TestToolCode = viewModel.TestToolCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/SubTestByTestTool",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestToolCode: TestToolCode
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Sub Test Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('SubTestList', null);
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTestName', '');
            } else {
                if (viewModel.SubTestCode == '') {
                    viewModel.set('SubTestList', response.Data);
                    var data = response.Data[0].Code;
                    var Nilai = response.Data[0].Value;
                    viewModel.set("SubTestCd", data);
                    viewModel.set('SubTestCode', data);
                    viewModel.set("SubTest", Nilai);
                    viewModel.set("SubTestName", Nilai);
                    dropDownSubTest();
                    dropDownSubTestDialog();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.SubTestCode) {
                            viewModel.set('SubTestList', response.Data);
                            var data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            viewModel.set('SubTestCode', data);
                            viewModel.set('SubTestName', Nilai);
                            viewModel.set('SubTest', Nilai);
                            viewModel.set("SubTestCd", data);
                            //viewModel.DetailByMappingQuestion[0].set("SubTestCode1", data);
                            var List = {
                                sender: {
                                    _selectedValue: data
                                }
                            }
                            dropDownSubTest(data);
                            dropDownSubTestDialog(data);
                            break;
                        } else {
                            viewModel.set('SubTestList', response.Data);
                            var data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            viewModel.set("SubTestCd", viewModel.SubTestCode);
                            viewModel.set('SubTestCode', viewModel.SubTestCode);
                            viewModel.set('SubTest', viewModel.SubTestName);
                            viewModel.set('SubTestName', viewModel.SubTestName);
                            var List = {
                                sender: {
                                    _selectedValue: data
                                }
                            }
                            dropDownSubTest(data);
                            dropDownSubTestDialog(data);
                            break;
                        }
                    }
                }
            }
        }
    });
}
SubTestByCategory = function (x) {
    
    var TestToolCode = x == undefined ? viewModels.TestToolCode : x;
    var QuestionCategory = localStorage.getItem('QuestionCategory');
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/SubTestByQuestionCategory",
        headers: { "Authorization-Token": Cookie.load() },
        async: true,
        cache: false,
        data: {
            QuestionCategoryCode: QuestionCategory,
            Key: TestToolCode
        },
        success: function (response) {
            if (response.Data.length == 0 && response.Acknowledge == 0) {
                // swal("Failed", "Sub Test Not Found!!!", "warning");
                viewModel.set('SubTestList', null);
                viewModel.set("SubTestName", '');
                viewModel.set("SubTestCode", '');
                viewModel.set("SubTestCd", '');
                dropDownSubTest();
                //viewModel.set('TestTypeName', ''); viewModel.set('TestTypeCode', '');
                //viewModel.set('TestToolName', ''); viewModel.set('TestToolCode', ''); viewModel.set('SubTestCode', ''); viewModel.set('SubTestName', '');
            }
                // else if (TestToolCode == '') {
                //  swal("Failed", "Sub Test Not Found!!!", "warning");
                //     viewModel.set('SubTestList', null); viewModel.set('TestToolName', ''); viewModel.set('TestToolCode', ''); viewModel.set('SubTestCode', ''); viewModel.set('SubTestName', '');
                // }
            else {
                for (jk = 0; jk < response.Data.length; jk++) {
                    if (response.Data[jk].Code == viewModels.SubTestCode) {
                        //alert("disni");
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTestName", response.Data[jk].Value);
                        viewModel.set("SubTestCode", response.Data[jk].Code);
                        viewModel.set("SubTestCd", response.Data[jk].Code);
                        dropDownSubTest();
                        break
                    } else {
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTestName", response.Data[0].Value);
                        viewModel.set("SubTestCode", response.Data[0].Code);
                        viewModel.set("SubTestCd", response.Data[0].Code);
                        dropDownSubTest();
                    }
                }
            }
        }
    });
}
SubTestInBySub = function () {
    var TestToolCode = viewModels.TestToolCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/SubTestByTestTool",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestToolCode: TestToolCode },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Sub Test Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestTypeName', '');
                viewModel.set('TestTypeCode', '');
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTestName', '');
            }
            else {
                for (jk = 0; jk < response.Data.length; jk++) {
                    if (response.Data[jk].Code != viewModels.SubTestCode) {
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTest", response.Data[jk].Value);
                        viewModel.set("SubTestName", response.Data[jk].Code);
                        viewModel.set("SubTestCode", response.Data[jk].Code);
                        dropDownSubTest();
                        //break;
                    } else {
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTest", response.Data[jk].Value);
                        viewModel.set("SubTestName", response.Data[jk].Code);
                        viewModel.set("SubTestCode", response.Data[jk].Code);
                        dropDownSubTest();
                        break;
                        //
                        //break;
                    }
                }
                dropDownSubTest();
            }
        }
    });
}
SubTestByQuestion = function (x) {
    var TestToolCode = x == undefined ? viewModels.TestToolCode : x;
    var QuestionCategory = localStorage.getItem('QuestionCategory');
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Question/Subtest",
        headers: { "Authorization-Token": Cookie.load() },
        async: true,
        cache: false,
        data: {
            QuestionCategory: QuestionCategory,
            TestToolCode: TestToolCode
        },
        success: function (response) {
            if (response.Data.length == 0 && response.Acknowledge == 0) {
                // swal("Failed", "Sub Test Not Found!!!", "warning");
                viewModel.set('SubTestList', null);
                viewModel.set("SubTestName", '');
                viewModel.set("SubTestCode", '');
                viewModel.set("SubTestCd", '');
                dropDownSubTest();
                //viewModel.set('TestTypeName', ''); viewModel.set('TestTypeCode', '');
                //viewModel.set('TestToolName', ''); viewModel.set('TestToolCode', ''); viewModel.set('SubTestCode', ''); viewModel.set('SubTestName', '');
            }
                // else if (TestToolCode == '') {
                //  swal("Failed", "Sub Test Not Found!!!", "warning");
                //     viewModel.set('SubTestList', null); viewModel.set('TestToolName', ''); viewModel.set('TestToolCode', ''); viewModel.set('SubTestCode', ''); viewModel.set('SubTestName', '');
                // }
            else {
                for (jk = 0; jk < response.Data.length; jk++) {
                    if (response.Data[jk].Code == viewModels.SubTestCode) {
                        //alert("disni");
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTestName", response.Data[jk].Value);
                        viewModel.set("SubTestCode", response.Data[jk].Code);
                        viewModel.set("SubTestCd", response.Data[jk].Code);
                        dropDownSubTest();
                        break
                    } else {
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTestName", response.Data[0].Value);
                        viewModel.set("SubTestCode", response.Data[0].Code);
                        viewModel.set("SubTestCd", response.Data[0].Code);
                        dropDownSubTest();
                    }
                }
            }
        }
    });
}

AnswerLayout = function () {
    var Key = viewModels.Key;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/AnswerLayout",
        headers: { "Authorization-Token": Cookie.load() },
        data: { Key: Key },
        success: function (response) {
            viewModel.set('AnswerLayoutList', response.Data);
            if (viewModels.Key == "AT19000001") {
                viewModel.set("typeLayout", response.Data[0].Code);
                dropDownAnswerLayout();
            }
            else {
                viewModel.set("typeLayout", response.Data[0].Code);
                kendoImageLayout();
            }
        }
    });
}
AnswerLayoutChangeNormal = function () {
    var Key = viewModels.Key;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/AnswerLayout",
        headers: { "Authorization-Token": Cookie.load() },
        data: { Key: Key },
        success: function (response) {
            viewModel.set('AnswerLayoutList', response.Data);
            if (viewModels.Key == "AT19000001") {
                dropDownAnswerLayout();
            }
            else {
                kendoImageLayout();
            }
        }
    });
}

CompanyChange = function () {
    var CompanyID = viewModels.CompanyID;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Company",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Data.length < 1) {
                swal("Failed", "Company Not Found!!!", "warning", { closeOnClickOutside: false });
            }
            else {
                viewModel.set('CompanyList', response.Data);
                viewModel.set('Company', response.Data[0].Value);
                viewModel.set('CompanyId', response.Data[0].Code);
                dropDownCompany();
                //CutOffChange(CompanyID);
            }
        }
    });
}

InquiryTestType = function () {
    var TestTypeCode = viewModels.TestTypeCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestTypeCode: TestTypeCode },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('TestTypeName', '');
                viewModel.set('TestTypeCode', '');
            } else if (TestTypeCode == '') {
                viewModel.set('TestToolName', ''); viewModel.set('TestToolCode', ''); viewModel.set('TestTypeName', ''); viewModel.set('TestTypeCode', '');
            }
            else {
                if (viewModels.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set('TestToolName', response.Data[0].Value);
                    dropDownTestTool();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[jk].Value);
                            dropDownTestTool();
                            break;
                        } else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[0].Value);

                        }
                    }
                    dropDownTestTool();
                }

            }
        }
    });
}
InquirySubTestByTestType = function () {
    var TestTypeCode = viewModels.TestTypeCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestTypeCode: TestTypeCode },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', ''); viewModel.set('TestToolCode', '');
                //viewModel.set('TestTypeName', ''); viewModel.set('TestTypeCode', '');
                viewModel.set('SubTestName', ''); viewModel.set('SubTestCode', '');
            } else if (TestTypeCode == '') {
                viewModel.set('TestToolName', ''); viewModel.set('TestToolCode', '');
                viewModel.set('SubTestName', ''); viewModel.set('SubTestCode', '');
            }
            else {
                if (viewModels.TestToolCode == '') {
                    viewModel.set('TestToolList', response.Data);
                    viewModel.set('TestToolName', response.Data[0].Value);
                    var data = response.Data[0].Code;
                    var Nilai = response.Data[0].Value;
                    viewModel.set("TestToolCode", Nilai);
                    var List = {
                        sender: {
                            _selectedValue: data,
                            _prev: Nilai
                        }
                    };
                    dropDownTestTool();
                    onChangeSubTest(List);
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.TestToolCode) {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[jk].Value);
                            var data = response.Data[jk].Code;
                            var Nilai = response.Data[jk].Value;
                            viewModel.set("TestToolCode", Nilai);
                            viewModel.set("TestTool", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                    _prev: Nilai
                                }
                            };
                            dropDownTestTool();
                            onChangeSubTest(List);
                            break;
                        } else {
                            viewModel.set('TestToolList', response.Data);
                            viewModel.set('TestToolName', response.Data[0].Value);
                            var data = response.Data[0].Code;
                            var Nilai = response.Data[0].Value;
                            viewModel.set("TestToolCode", Nilai);
                            viewModel.set("TestTool", Nilai);
                            var List = {
                                sender: {
                                    _selectedValue: data,
                                    _prev: Nilai
                                }
                            };
                        }
                    }
                    dropDownTestTool();
                    onChangeSubTest(List);
                }

            }
        }
    });
}
InquirySubTestByTestTool = function () {
    var TestToolCode = viewModels.TestToolCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/SubTestByTestTool",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestToolCode: TestToolCode },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Sub Test Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                //viewModel.set('TestTypeName', '');
                //viewModel.set('TestTypeCode', '');
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTestName', '');
            }
            else if (TestToolCode == '') {
                viewModel.set('SubTestCode', ''); viewModel.set('SubTestName', ''); viewModel.set('TestToolName', ''); viewModel.set('TestToolCode', '');
            }
            else {
                for (jk = 0; jk < response.Data.length; jk++) {
                    if (response.Data[jk].Code == viewModels.SubTestCode) {
                        //alert("disni");
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTestName", response.Data[jk].Value);
                        dropDownSubTest();
                        break
                    } else {
                        viewModel.set('SubTestList', response.Data);
                        viewModel.set("SubTestName", response.Data[0].Value);
                    }
                }
                dropDownSubTest();
            }
        }
    });
}

CutOffChange = function (CompanyID) {
    var CompanyID = CompanyID;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/CutOffByCompany",
        headers: { "Authorization-Token": Cookie.load() },
        data: { CompanyId: CompanyID },
        success: function (response) {
            if (response.Data.length == 0) {
                viewModel.set('CutOffCode', '');
                viewModel.set('CoName', '');
                viewModel.set('CutOffList', []);
                swal("Failed", "Cut Off Not Found!!!", "warning", { closeOnClickOutside: false });
            }
            else {
                viewModel.set('CutOffList', response.Data);
                viewModel.set('CoName', response.Data[0].Value);
                viewModel.set('CutOffCode', response.Data[0].Code);
                onChangeCutName();
            }
        }
    });
}
CutOffChanges = function (CompanyID) {
    var CompanyID = viewModels.CompanyID;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/CutOffByCompany",
        headers: { "Authorization-Token": Cookie.load() },
        data: { CompanyId: CompanyID },
        success: function (response) {
            if (response.Data.length == 0) {
                viewModel.set('CutOffCode', '');
                viewModel.set('CoName', '');
                viewModel.set('CutOffList', []);
                swal("Failed", "Cut Off Not Found!!!", "warning", { closeOnClickOutside: false });
            }
            else {
                viewModel.set('CutOffList', response.Data);
                onChangeCutName();
            }
        }
    });
}
CutOffByCompanyGrade = function () {
    var CompanyID = viewModel.CompanyID;
    var GradeID = viewModel.GradeID;
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/CutOffByCompanyGrade",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            CompanyId: CompanyID,
            GradeId: GradeID
        },
        success: function (response) {
            if (response.Data.length == 0) {
                LoadingMask.hide();
                swal("Failed", "Cut Off Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('CutOffCode', '');
                viewModel.set('CutOffName', '');
            }
            else {
                LoadingMask.hide();
                if (viewModel.CutOffCode == '') {
                    viewModel.set('CutOffList', response.Data);
                    viewModel.set("CutOffCode", response.Data[0].Code);
                    viewModel.set('CutOffName', response.Data[0].Value);
                    dropDownCutOff();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModel.CutOffCode) {
                            viewModel.set('CutOffList', response.Data);
                            viewModel.set("CutOffCode", response.Data[jk].Code);
                            viewModel.set('CutOffName', response.Data[jk].Value);
                            dropDownCutOff();
                            break;
                        }
                        else {
                            viewModel.set('CutOffList', response.Data);
                            viewModel.set("CutOffCode", response.Data[0].Code);
                            viewModel.set('CutOffName', response.Data[0].Value);
                            dropDownCutOff();
                        }
                    }
                }
            }
        }
    });
}

PositionChange = function () {
    var CompanyID = viewModels.CompanyID;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Position",
        headers: { "Authorization-Token": Cookie.load() },
        data: { CompanyId: CompanyID },
        success: function (response) {
            if (response.Acknowledge == 0 || response.Data.length < 1) {
                viewModel.set('Position', '');
                viewModel.set('PositionCode', '');
                viewModel.set('PositionList', []);
                dropDownPosition();
                swal("Failed", "Position Not Found!!!", "warning", { closeOnClickOutside: false });
            }
            else {
                if (viewModels.Position == '') {
                    viewModel.set('PositionList', response.Data);
                    viewModel.set('PositionName', response.Data[0].Code);
                    viewModel.set('Position', response.Data[0].Code);
                    viewModel.set('PositionCode', response.Data[0].Value);
                    dropDownPosition();
                } else {
                    for (jk = 0; jk < response.Data.length; jk++) {
                        if (response.Data[jk].Code == viewModels.Position) {
                            viewModel.set('PositionList', response.Data);
                            viewModel.set('PositionName', response.Data[jk].Code);
                            viewModel.set('Position', response.Data[jk].Code);
                            viewModel.set('PositionCode', response.Data[jk].Value);
                            dropDownPosition();
                            break;
                        } else {
                            viewModel.set('PositionList', response.Data);
                            viewModel.set('PositionName', response.Data[0].Code);
                            viewModel.set('Position', response.Data[0].Code);
                            viewModel.set('PositionCode', response.Data[0].Value);
                            dropDownPosition();
                        }
                    }
                }
            }

        }
    });
}

DisplayPreface = function (data) {
    $(data).removeAttr('onchange');
    $(data).attr('onchange', 'DisplayPrefaces(this)');
    viewModel.set('WorkingMemory.WorkingMemoryPrefaceDisplay', false);
}
DisplayPrefaces = function (data) {
    $(data).removeAttr('onchange');
    $(data).attr('onchange', 'DisplayPreface(this)');
    viewModel.set('WorkingMemory.WorkingMemoryPrefaceDisplay', true);
}

getCompany = function () {
    LoadingMask.show();
    $.ajax({
        type: "POST",
        url: SERVICE_URL + "api/UserDetail/GetCompany",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Acknowledge < 1) {
                LoadingMask.hide();
                swal('Failed', 'Please reload the page', 'warning', { closeOnClickOutside: false });
            } else {
                LoadingMask.hide();
                localStorage.setItem('CompanyID', response.CompanyId);
                //viewModel.set('Company', response.CompanyId);
            }
        }, error: function (x, e) {

        }
    });
}