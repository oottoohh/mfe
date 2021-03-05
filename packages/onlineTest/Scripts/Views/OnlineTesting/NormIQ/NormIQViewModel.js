var ModelApplicant = kendo.data.Model.define({
    id: "NormScoreIQCode",
    fields: {
        NormScoreIQCode: { type: "string", editable: false },
        NormScoreIQName: { type: "string", editable: false },
        TestType: { type: "string", editable: false },
        TestTool: { type: "string", editable: false },
        SubTest: { type: "string", editable: false },
        StandartDeviasi: { type: "string", editable: false },
        Mean: { type: "string", editable: false },
        DisplayStatus: { type: "boolean", editable: false },
    }
});

var viewModel = kendo.observable({
    CompanyList: [],
    CompanyId: "",
    CompanyName: "",
    GradeList: [],
    GradeId: "",
    GradeName: "",
    TestToolList: [],
    TestToolCode: "",
    TestToolName: "",
    DisplayStatus: true,

    NormScoreIQList: new kendo.data.DataSource ({
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + "api/NormScoreIQ/Inquiry",
                headers: { "Authorization-Token": Cookie.load() },
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.CompanyId = viewModel.CompanyId;
                request.GradeId = viewModel.GradeId;
                request.TestToolCode = viewModel.TestToolCode;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "NormScoreIQDatas",
            model: ModelApplicant,
            total: "Total"
        },
        serverPaging: true,
        serverFiltering: true,
        pageSize: 25
    }),
    search: function (e) {
        viewModel.NormScoreIQList.page(1);
    },
    hideForm: function (e) {
        hideForm(e);
    },
    showForm: function (e) {
        showForm(e);
    },
    addNormIQ: function (e) {
        addNormIQ(e);
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
    viewModel.set('TestToolCode', '');
    viewModel.set('TestToolName', '');
    viewModel.set('DisplayStatus', true);
}

hideForm = function (e) {
    $('.box1').attr('hidden', true);
    //document.getElementById('boox').style.transitionDelay = "4s";
    $('.arrow2').removeAttr('hidden', 'hidden');
    $('.arrow1').attr('hidden', true);
}

showForm = function (e) {
    $('.box1').removeAttr('hidden', 'hidden');
    $('.arrow2').attr('hidden', true);
    $('.arrow1').removeAttr('hidden', 'hidden');
}

addNormIQ = function (e) {
    var domain = DOMAIN_URL + 'Views/OnlineTesting/NormIQ/AddNormIQ.html';
    $('#addNormIQ').attr('href', domain);
}