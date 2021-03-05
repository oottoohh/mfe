var modeGrid = new kendo.data.Model.define({
    id: "CompetencyCode",
    fields: {
        CompetencyScoreCode: { type: "string", editable: false },
        CompanyName: { type: "string", editable: false },
        RangeScoreName: { type: "string", editable: false },
        DisplayStatus: { type: "boolean", editable: false }

    }
});
var viewModel = kendo.observable({
    Competency: '',
    CompetencyCode: '',
    DisplayStatus:true,
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
                url: SERVICE_URL + "api/CompetencyScore/Inquiry",
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {

                var request = new Object();
                //request.UserLogin = Cookie.getUser();
                //request.CompanySource = GetCompanySource();
                request.pageNo = data.page;
                request.pageSize = data.pageSize;
                request.CompanyId = viewModel.CompetencyCompany == undefined ? "" : viewModel.CompetencyCompany.id;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "CompetencyScoreDatas",
            model: modeGrid,
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 50
    }),
    search: function () {
        viewModel.ApplicationGrid.page(1);
    },
    clear: function () {
        clear();
    },
    addCompetencyScore: function () {
        window.location.href = DOMAIN_URL + 'Views/OnlineTesting/CompetencyScore/AddCompetencyScore.html';
    }
});
clear = function () {
    viewModel.set('Competency', '');
    viewModel.set('CompetencyCode', '');
    viewModel.set('DisplayStatus', true);
    viewModel.set('CompetencyCompany', '');
}
DeleteRow = function (data) {
    var id = $(data).attr('id');
    debugger
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/CompetencyScore/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: { CompetencyScoreCode:id},
            dataType: 'json',
            success: function (response) {
                if (response.Acknowledge < 1) {
                    LoadingMask.hide();
                    swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                } else {
                    LoadingMask.hide();
                    swal('Good', 'Record has been Deleted', 'success', { closeOnClickOutside: false });
                    $('.swal-button--confirm').on('click', function () {
                        viewModel.ApplicationGrid.page(1);
                    });
                }
            },
            error: function (x, e) {
                alert('error ajax');
            }
        });
    });
    //alert(id);
}