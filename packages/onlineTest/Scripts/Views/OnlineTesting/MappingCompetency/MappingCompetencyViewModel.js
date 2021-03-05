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
    Competency: '',
    CompetencyName: '',
    MappingSubTest: '',
    MappingSubTestName: '',
    SubTestName: '',
    DisplayStatus: true,
    CompetencyGrid: new kendo.data.DataSource({
        batch: true,
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + 'api/ReportMapCompetency/Inquiry',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.CompetencyName = viewModel.CompetencyName;
                request.SubTestName = viewModel.SubTestName;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "Data",
            model: modeGrid,
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 50
    }),
    search: function () {
        viewModel.CompetencyGrid.page(1);
    },
    clear: function () {
        clear();
    },
    addMapping: function () {
        window.location.href = DOMAIN_URL + 'Views/OnlineTesting/MappingCompetency/AddMappingCompetency.html';
    }
});
clear = function () {
    viewModel.set('CompetencyName', '');
    viewModel.set('SubTestName', '');
    viewModel.set('DisplayStatus', true);
}
DeleteRow = function (data) {
    var id = $(data).attr('id');
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/ReportMapCompetency/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                MapCompCode: id
            },
            success: function (response) {
                if (response.Acknowledge >= 1) {
                    LoadingMask.hide();
                    swal("Good", "Record Has Been Deleted", "success", { closeOnClickOutside: false });
                    viewModel.CompetencyGrid.page(1);
                }
                else {
                    LoadingMask.hide();
                    swal("Error", response.Message, "warning", { closeOnClickOutside: false });
                }
            },
            error: function (xhr, status, error) {
                MessageBox.show("Error", error);
                LoadingMask.hide();
            }
        });
    });
}