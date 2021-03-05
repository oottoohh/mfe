var modeGrid = new kendo.data.Model.define({
    id: "NarrativeCode",
    fields: {
        NarrativeCode: { type: "string", editable: false },
        SubTestName: { type: "string", editable: false },
        Score: { type: "string", editable: false },
        Narrative: { type: "string", editable: false },
        Status: { type: "boolean", editable: false },
        IsStandAlone: { type: "boolean", editable: false }

    }
});
var viewModel = kendo.observable({
    SubTest: '',
    NarrativeType: '',
    MappingReportTypeCode: '',
    TestToolNarrative:'',
    DisplayStatus: true,
    ApplicationGrid: new kendo.data.DataSource({
        batch: true,
        requestStart: function (e) {
            LoadingMask.show();
        },
        requestEnd: function (e) {
            LoadingMask.hide();
        },
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + "api/Narrative/Inquiry",
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.pageSize = data.pageSize;
                request.MappingReportTypeCode = $('#MappingReport').data('kendoComboBox').value();;
                request.NarrativeType = viewModel.NarrativeType;
                request.TestToolCode = viewModel.TestToolNarrative;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.sortInfo = data.sort;

                return request;
            }
        },
        schema: {
            data: "Datas",
            model: modeGrid,
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 10
    }),
    addNarrative: function () {
        addNarrative();
    },
    search: function () {
        viewModel.ApplicationGrid.page(1);
    },
    clear: function () {
        viewModel.set('NarrativeType', '');
        viewModel.set('MappingReport', '');
        viewModel.set('TestToolNarrative', '');
        viewModel.set('DisplayStatus', true);
    }
});

addNarrative = function () {
    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/Narrative/AddNarrative.html';
}
DeleteRow = function (data) {
    var id = $(data).attr('id');
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/Narrative/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                NarrativeCode: id
            },
            success: function (response) {
                if (response.Acknowledge >= 1) {
                    LoadingMask.hide();
                    swal("Good", "Record Has Been Deleted", "success", { closeOnClickOutside: false });
                    viewModel.ApplicationGrid.page(1);
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