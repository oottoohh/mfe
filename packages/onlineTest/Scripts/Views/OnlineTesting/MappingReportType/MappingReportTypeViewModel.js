var modeGrid = new kendo.data.Model.define({
    id: "CompetencyCode",
    fields: {
        MappingReportTypeCode: { type: "string", editable: false },
        MappingReportTypeDatas: { type: "string", editable: false },
        DisplayStatus: { type: "boolean", editable: false }

    }
});
var viewModel = kendo.observable({
    DisplayStatsList: [
        { Code: 0, Value: "All" },
        { Code: 1, Value: "Active" },
        { Code: 2, Value: "Inactive" }       
    ],
    getStatusDisplay:'',
    MappingReportList:'',
    MappingReportTypeCode: '',
    MappingReportTypeDatas: '',
    DisplayStatus:1,
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
                url: SERVICE_URL + "api/MappingReportType/Inquiry",
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                debugger
                var request = new Object();
                //request.UserLogin = Cookie.getUser();
                //request.CompanySource = GetCompanySource();
                request.pageNo = data.page;
                request.pageSize = data.pageSize;
                request.MappingReportTypeCode = viewModel.MappingReportList;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "MappingReportTypeDatas",
            model: modeGrid,
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 10
    }),
    search: function () {
        viewModel.ApplicationGrid.page(1);
    },
    clear: function () {
        clear();
    },
    addCompetency: function () {
        window.location.href = DOMAIN_URL + 'Views/OnlineTesting/MappingReportType/AddMappingReportType.html';
    }
});
clear = function () {
    viewModel.set('MappingReportList', '');
    viewModel.set('DisplayStatus', 1);
    $('#MappingReportList').data('kendoComboBox').value("")
    $('#DisplayStatsList').data('kendoComboBox').select(1)
}
DeleteRow = function (data) {
    var id = $(data).attr('id');
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/MappingReportType/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: { MappingReportTypeCode:id},
            dataType: 'json',
            success: function (response) {
                if (response.Acknowledge < 1) {
                    LoadingMask.hide();
                    swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                } else {
                    LoadingMask.hide();
                    swal('Good', 'Mapping report type has been Deleted', 'success', { closeOnClickOutside: false });
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