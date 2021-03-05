var modeGrid = new kendo.data.Model.define({
    id: "GroupNarrativeCode",
    fields: {
        GroupNarrativeCode: { type: "string", editable: false },
        GroupNarrativeName: { type: "string", editable: false },
        Report: { type: "string", editable: false },
        MappingSubTest: { type: "string", editable: false },
        Status: { type: "boolean", editable: false }

    }
});
var viewModel = kendo.observable({
    NarrativeGroupTitle: '',
    ReportType: '',
    ReportTypeName: '',
    GroupNarrative: '',
    MappingSubTest: '',
    CompanyList:[],
    DisplayStatus: true,
    ListSubTest: [],
    CompanyList:"",
    ApplicationGrid: new kendo.data.DataSource({
        batch: false,
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + "api/GroupNarrative/Inquiry",
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                debugger
                LoadingMask.hide();
                var request = new Object();
                //request.UserLogin = Cookie.getUser();
                //request.CompanySource = GetCompanySource();

                request.pageNo = data.page;
                request.pageSize = data.pageSize;
                request.GroupNarrativeName = viewModel.NarrativeGroupTitle;
                request.TypeReport = $("#MappingReport").data("kendoComboBox").value();
                request.CompanyId = viewModel.CompanyList;
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
    search: function () {
        debugger
        viewModel.ApplicationGrid.page(1);
    },
    clear: function () {
        clear();
    },
    addGroup: function () {
        window.location.href = DOMAIN_URL + 'Views/OnlineTesting/GroupNarrative/AddGroupNarrative.html';
    },
});
clear = function () {
    viewModel.set('ReportType', '');
    viewModel.set('ReportTypeName', '');
    viewModel.set('GroupNarrative', '');
    viewModel.set('MappingSubTest', '');
    viewModel.set('DisplayStatus', true);
    viewModel.set('CompanyList', '');
    viewModel.set('MappingReport', '');
    viewModel.set('NarrativeGroupTitle', '');
    
}
DeleteRow = function (data) {
    var id = $(data).attr('id');
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/GroupNarrative/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                GroupNarrativeCode: id
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