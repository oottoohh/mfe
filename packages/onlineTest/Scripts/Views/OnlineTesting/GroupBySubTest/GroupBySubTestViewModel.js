var ModelApplicant = kendo.data.Model.define({
    id: "SubSetCode",
    fields: {
        //TestTypeCode: { editable: false, nullable: true },
        SubSetName: { type: "text" },
        QuestionDisplay: { type: "text" },
        SubTes: { type: "text" },
        TestType: { type: "text" },
        TestTool: { type: "text" },
        DisplayStatus: { type: "boolean" },
    }
});
var viewModel = kendo.observable({
    TestTypeName: "",
    TestTypeCode: "",
    SubTestName: "",
    SubTestCode: "",
    DisplayStatus: true,
    TestToolName: "",
    TestToolCode: "",
    SubSetName: "",
    ApplicantList: new kendo.data.DataSource
        ({
            transport:
            {
                read:
                {
                    type: "POST",
                    url: SERVICE_URL + "api/SubSet/InquiryBySubTest",
                    headers: { "Authorization-Token": Cookie.load() },
                },
                parameterMap: function (data, operation) {
                    var request = new Object();
                    request.TestTypeName = viewModel.TestTypeName;
                    request.TestToolName = viewModel.TestToolName;
                    request.SubTestName = viewModel.SubTestName;
                    request.SubSetName = viewModel.SubSetName;
                    request.DisplayStatus = viewModel.DisplayStatus;
                    request.PageNo = data.page;
                    request.PageSize = data.pageSize;
                    request.sortInfo = data.sort;
                    return request;
                }
            },
            schema:
            {
                data: "SubTestDatas",
                model: ModelApplicant,
                total: "Total",

            },
            serverPaging: true,
            serverFiltering: true,
            pageSize: 20
        }),
    search: function (e) {
        viewModel.ApplicantList.page(1);
    },
    AddSubSet: function (e) {
        AddSubSet(e);
    },
    clear: function () {
        clear();
    }
});
clear = function () {
    viewModel.set('TestTypeName', '');
    viewModel.set('TestTypeCode', '');
    viewModel.set('SubTestName', '');
    viewModel.set('SubTestCode', '');
    viewModel.set('TestToolName', '');
    viewModel.set('TestToolCode', '');
    viewModel.set('SubSetName', '');
    viewModel.set('DisplayStatus', true);
}
DeleteRow = function (data) {
    var ids = $(data).attr('id');
    //alert(ids);
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/subset/DeleteBySubTest',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                SubSetCode: ids
            },
            success: function (response) {
                if (response.Acknowledge == 1) {
                    swal("Good", response.Message, "success", { closeOnClickOutside: false });
                    viewModel.ApplicantList.page(1);
                }
                else {
                    swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                }
                LoadingMask.hide();
            },
            error: function (xhr, status, error) {
                MessageBox.show("Error", error);
                LoadingMask.hide();
            }
        });
    });
}
AddSubSet = function (e) {
    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/GroupBySubTest/AddGroupBySubTest.html';
}
