var viewModel = kendo.observable({
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
    TestToolCode:"",
    TestToolName: "",
    TestTool:"",
    DisplayStatus: true,

    NormScoreInquiry: new kendo.data.DataSource({
        batch: true,
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + 'api/NormScore/Inquiry',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.TestTypeName = viewModel.TestTypeName;
                request.TestToolName = viewModel.TestToolName;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.CompanyId = viewModel.CompanyId;
                request.GradeId = viewModel.GradeId;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "NormScoreDatas",
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 25
    }),
    search: function (e) {
        if (viewModel.CompanyId == "") {
            viewModel.set('CompanyName', "")
        }
        if (viewModel.GradeId == "") {
            viewModel.set('GradeName', "")
        }
        if (viewModel.TestTypeCode == "") {
            viewModel.set('TestTypeName', "")
        }
        if (viewModel.TestToolCode == "") {
            viewModel.set('TestToolName', "")
        }
        viewModel.NormScoreInquiry.page(1);
    },
    hideForm: function (e) {
        hideForm(e);
    },
    showForm: function (e) {
        showForm(e);
    },
    addNormScore: function (e) {
        addNormScore(e);
    },
    clear: function () {
        clear();
    }
});

clear = function () {
    viewModel.set('CompanyId', '');
    viewModel.set('CompanyName', '');
    viewModel.set('GradeId', '');
    viewModel.set('GradeName', '');
    viewModel.set('TestTypeList', []);
    viewModel.set('TestTypeCode', '');
    viewModel.set('TestTypeName', '');
    viewModel.set('TestToolList', []);
    viewModel.set('TestToolCode', '');
    viewModel.set('TestToolName', '');
    viewModel.set('DisplayStatus', true);
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

addNormScore = function (e) {
    var domain = DOMAIN_URL + 'Views/OnlineTesting/NormScore/AddNormScore.html';
    $('#addNormScore').attr('href', domain);
}