var viewModels = kendo.observable({
    TestTypeCode: "",
    TestToolCode: "",
    SubTestCode: "",
    ReportCode: '',
    CategoryDataSubTest: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + 'api/ReportMapCompetency/SubTest',
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
            data: "Datas"
        }
    }),
    CategoryNarrativeSubTest: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + 'api/Narrative/SubTest',
                dataType: 'json'
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.TestToolCode = viewModel.TestToolCode == undefined ? "" : viewModel.TestToolCode.Code;
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
    CategoryNarrativeType: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + 'api/Dropdown/NarrativeType',
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
    
    CategoryDataReport: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + 'api/GroupNarrative/ReportType',
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
            data: "Datas"
        }
    }),
    CategoryCompetency: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/Competency",
                dataType:'json'
            },
            parameterMap: function () {
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
            data: 'Data'
        }
    }),
    CategoryCompetencyList: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/ReportCompetency/List",
                dataType:'json'
            },
            parameterMap: function () {
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
            data: 'Datas'
        }
    }),
    CategoryMappingReportList: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/MappingReportTypeAll",
                dataType: 'json'
            },
            parameterMap: function () {
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
            data: 'Data'
        }
    }),
    TestToolByMappingRpt: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/TestToolByMappingReportType",
                dataType: 'json'
            },
            parameterMap: function () {

                var request = new Object();
                request.MappingReportTypeCode = viewModel.MappingReport == undefined ? "" : viewModel.MappingReport.Code;
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: 'Data'
        }
    }),
    SubtestByTestTool: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/SubTestByTestTool",
                dataType: 'json'
            },
            parameterMap: function () {
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
            data: 'Data'
        }
    }),
    ReportTypeList: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/ReportType",
                dataType: 'json'
            },
            parameterMap: function () {
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
            data: 'Data'
        }
    }),
    TemplateLayoutList: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/MappingReportTypeInitial",
                dataType: 'json'
            },
            parameterMap: function () {
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
            data: 'Data'
        }
    }),
    CategoryMapCompetency: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/ReportMapCompetency/Competency",
                dataType:'json'
            },
            parameterMap: function () {
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
            data: 'Datas'
        }
    }),
    CategoryCandidate: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/ConfigLayout/GetCandidateInfo",
                dataType: 'json'
            },
            parameterMap: function () {
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
            data: 'Datas'
        }
    }),
    CategoryVacancy: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/ResultReport/Vacancy",
                dataType: 'json'
            },
            parameterMap: function () {
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
            data: 'Data'
        }
    }),
    CategoryPosition: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/ResultReport/Position",
                dataType: 'json'
            },
            parameterMap: function () {
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
            data: 'Data'
        }
    }),
    CategoryUniversity: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/ResultReport/University",
                dataType: 'json'
            },
            parameterMap: function () {
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
            data: 'Data'
        }
    }),
    CategoryResult: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/ResultReport/Result",
                dataType: 'json'
            },
            parameterMap: function () {
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
            data: 'Data'
        }
    }),
    CompetencyCompany: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/Company",
                dataType: 'json'
            },
            parameterMap: function () {
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
            data: 'Data'
        }
    }),

    CategoryCompany: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/ResultReport/Company",
                dataType: 'json'
            },
            parameterMap: function () {
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
            data: 'Data'
        }
    }),
    CompetencyRangeScore: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/RangeScore",
                dataType: 'json'
            },
            parameterMap: function () {
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
            data: 'Data'
        }
    }),
    TestTypeList: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/TestTypeByCompany",
                dataType: 'json'
            },
            parameterMap: function () {
                
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                request.CompanyCode = viewModel.Company;
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: 'Data'
        }
    }),
    TestToolList: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/TestTool",
                dataType: 'json'
            },
            parameterMap: function () {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                request.TestTypeCode = viewModel.TestTypeCode;
                request.CompanyCode = viewModel.CompanyCode;
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: 'Data'
        }
    }),
    CategoryReportResult: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/ResultReport/ReportType",
                dataType: 'json'
            },
            parameterMap: function () {
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
            data: 'Data'
        }
    }),
    TestToolConfScore: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/TestToolByTestType",
                dataType: 'json'
            },
            parameterMap: function () {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                request.TestTypeCode = viewModels.TestTypeCode;
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: 'Data'
        }
    }),
    CategoryDataGrupNarr: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + 'api/GroupNarrative/List',
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
        data: "Datas"
    }
    }),
    CategoryDataNarrType: new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + 'api/Dropdown/NarrativeType',
                dataType: 'json',
                async: false
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
listSubTestByReport = function (count) {
    var TypeReport = viewModels.ReportCode;
    $.ajax({
        type: 'POST',
        headers: { "Authorization-Token": Cookie.load() },
        url: SERVICE_URL + 'api/GroupNarrative/SubTest',
        data: {
            TypeReport: TypeReport
        },
        dataType: 'json',
        success: function (response) {
            //alert(count);
            //console.log(response.Datas);
            if (response.Acknowledge < 1) {
                swal('Failed', 'Sub Test Not Found!!!', 'warning', { closeOnClickOutside: false });
                viewModel.set('SubTestLists', response.Datas);
                viewModel.set('ReportType', '');
            } else {
                if (response.Datas.length < 1) {
                    swal('Failed', 'Sub Test Not Found!!!', 'warning', { closeOnClickOutside: false });
                    viewModel.set('SubTestLists', response.Datas);
                    viewModel.set('ReportType', '');
                } else {
                    
                    viewModel.set('SubTestLists', response.Datas);
                    //$('.k-state-hover').attr('hidden', true);
                    if (count == undefined) {
                        dropDownSubTest();
                    } else {
                        onloadDropDownSubTest(count);
                    }
                }
                
            }
        },
        error: function (x, e) {
            alert('error ajax');
        }
    });
}

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
Display = function (data) {
    //alert(false);
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayChecked(this)');
    viewModel.set('DisplayStatus', false);
}
DisplayChecked = function (data) {
    //alert(true);
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'Display(this)');
    viewModel.set('DisplayStatus', true);
}
Standalone = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'StandaloneChecked(this)');
    viewModel.set('Standalone', true);
}
StandaloneChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'Standalone(this)');
    viewModel.set('Standalone', false);
}