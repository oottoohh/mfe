//add change
var modeGrid = new kendo.data.Model.define({
    id: "CutOffCode",
    fields: {
        CutOffCode: { type: "text" },
        CutOffName: { type: "text" },
        Company: { type: "text" },
        CompanyID: { type: "number" },
        TestType: { type: "text" },
        TestTool: { type: "text" },
        SubTest: { type: "text" },
        DisplayStatus: { type: "boolean" },
    }
});

var viewModel = kendo.observable({
    role_name: '',
    CompanyID: '',
    CompanyName: "",
    CompanyList: [],
    GradeID: "",
    GradeName: '',
    GradeList:[],
    CutOffCode:"",
    CutOffName: "",
    CutOffList:[],
    TestToolCode: "",
    TestToolName: "",
    TestToolList: [],
    SubTestCode:"",
    SubTestName: "",
    SubTestList: [],
    DisplayStatus: true,

    TestToolGrid: new kendo.data.DataSource({
        batch: true,
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + 'api/CutOff/Inquiry',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.CompanyID = viewModel.CompanyID;
                request.GradeID = viewModel.GradeID;
                request.CutOffName = viewModel.CutOffName;
                request.TestTool = viewModel.TestToolName;
                request.SubTestName = viewModel.SubTestName;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "CutOffDatas",
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 25
    }),
    search: function (e) {
        if (viewModel.CompanyName == '') {
            viewModel.set('CompanyID', '')
        }
        if (viewModel.GradeName == '') {
            viewModel.set('GradeID', '')
        }
        if (viewModel.CutOffName == '') {
            viewModel.set('CutOffCode', '')
        }
        if (viewModel.TestToolName == '') {
            viewModel.set('TestToolCode', '')
        }
        if (viewModel.SubTestName == '') {
            viewModel.set('SubTestCode', '')
        }
        viewModel.TestToolGrid.page(1);
    },
    clear: function () {
        clear();
    },
    AddCutOff: function (e) {
        window.location.href = DOMAIN_URL + 'Views/OnlineTesting/CutOff/AddCutOff.html';
    }
});

DeleteRow = function (data) {
    var id = $(data).attr('id');
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/CutOff/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                CutOffCode: id
            },
            success: function (response) {
                if (response.Acknowledge == 1) {
                    LoadingMask.hide();
                    swal("Good", response.Message, "success");
                    viewModel.TestToolGrid.page(1);
                } else {
                    LoadingMask.hide();
                    swal("Failed!!!", response.Message, "warning");
                }
            },
            error: function (xhr, status, error) {
                MessageBox.show("Error", error);
                LoadingMask.hide();
            }
        });
    });
}

clear = function () {
    viewModel.set('CompanyID', '');
    viewModel.set('CompanyName', '');
    viewModel.set('GradeID', '');
    viewModel.set('GradeName', '');
    viewModel.set('CutOffCode', '');
    viewModel.set('CutOffName', '');
    viewModel.set('TestToolCode', '');
    viewModel.set('TestToolName', '');
    viewModel.set('SubTestCode', '');
    viewModel.set('SubTestName', '');
    viewModel.set('DisplayStatus', true);
}