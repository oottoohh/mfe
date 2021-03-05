var viewModel = kendo.observable({
    TestToolName: "",
    TestTypeName: "",
    TestToolCode: "",
    QuestionCode: "",
    Question: "",
    SubTestList: [],
    DisplayStatus: true,
    SubTestName: "",
    clear: function (e) {
        clear(e);
    },
    TestToolGrid: new kendo.data.DataSource({
        batch: true,
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + 'api/Question/Inquiry',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.TestToolName = viewModel.TestToolName;
                request.SubTestName = viewModel.SubTestName;
                request.Question = viewModel.Question;
                request.DisplayStatus = viewModel.DisplayStatus;
                return request;
            }
        },
        schema: {
            data: "QuestionAnswerDatas",
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 25
    }),
    search: function (e) {
        viewModel.TestToolGrid.page(1);
    },
});

clear = function (e) {
    viewModel.set('TestToolName', "");
    viewModel.set('Question', "");
    viewModel.set('SubTestName', "");
    viewModel.set('DisplayStatus', true);
}