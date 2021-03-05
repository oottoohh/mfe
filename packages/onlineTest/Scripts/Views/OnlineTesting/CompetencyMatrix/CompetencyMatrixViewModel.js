var modeGrid = new kendo.data.Model.define({
    id: "MappingCode",
    fields: {
        MappingCode: { type: "string", editable: false },
        CompetencyName: { type: "string", editable: false },
        SYM: { type: "string", editable: false },
        SubTest: { type: "string", editable: false },
        Weight: { type: "string", editable: false },
        Status: { type: "boolean", editable: false },
    }
});

var viewModel = kendo.observable({
    CompanyList: [],
    CompanyId: "",
    CompanyName: "",
    CompetencyMatrixList: [],
    CompetencyMatrixCode: '',
    CompetencyMatrixName: '',
    DisplayStatus: true,

    CompetencyMatrixGrid: new kendo.data.DataSource({
        batch: true,
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + 'api/CompetencyMatrix/Inquiry',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.CompanyId = viewModel.CompanyId;
                request.CompetencyMatrixCode = viewModel.CompetencyMatrixCode;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "CompetencyMatrixDatas",
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 10
    }),
    search: function () {
        if (viewModel.CompanyName == "") {
            viewModel.set("CompanyId", "")
        }
        if (viewModel.CompetencyMatrixName == "") {
            viewModel.set("CompetencyMatrixCode", "")
        }
        viewModel.CompetencyMatrixGrid.page(1);
    },
    clear: function () {
        clear();
    },
    addMatrix: function () {
        window.location.href = DOMAIN_URL + 'Views/OnlineTesting/CompetencyMatrix/AddCompetencyMatrix.html';
    }
});

clear = function () {
    viewModel.set('CompanyId', '');
    viewModel.set('CompanyName', '');
    viewModel.set('CompetencyMatrixCode', '');
    viewModel.set('CompetencyMatrixName', '');
    viewModel.set('DisplayStatus', true);
}

DeleteRow = function (data) {
    var id = $(data).attr('id');
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/CompetencyMatrix/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                CompetencyMatrixCode: id
            },
            success: function (response) {
                if (response.Acknowledge >= 1) {
                    LoadingMask.hide();
                    swal("Good", response.Message, "success", { closeOnClickOutside: false });
                    viewModel.CompetencyMatrixGrid.page(1);
                }
                else {
                    LoadingMask.hide();
                    swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                }
            },
            error: function (xhr, status, error) {
                MessageBox.show("Error", error);
                LoadingMask.hide();
            }
        });
    });
}