$(document).ready(function () {
    var ReportTypeCode = GetParameterByName('ReportTypeCode');
    loadData(ReportTypeCode);
    kendo.bind($('body'), viewModel);
});
loadData = function (data) {
    if (data == '' || data == null || data == undefined) {
        viewModel.set('title', 'Add Report Type');
    } else {
        viewModel.set('title', 'Edit Report Type');
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/ReportType/Detail',
            headers: { "Authorization-Token": Cookie.load() },
            data: { ReportTypeCode: data },
            dataType: 'json',
            success: function (response) {
                var data = response.ReportTypeDetail;
                if (response.Acknowledge < 1) {
                    LoadingMask.hide();
                    swal('Failed', 'Error to load record!!!', 'warning', { closeOnClickOutside: false });
                } else {
                    LoadingMask.hide();
                    viewModel.set('createBy', data.CreateBy);
                    viewModel.set('createOn', data.CreatedTime);
                    viewModel.set('lastModifiedBy', data.ModifBy);
                    viewModel.set('lastModifiedOn', data.ModifiedTime);
                    //Batas Default 
                    viewModel.set('ReportTypeCode', data.ReportTypeCode);
                    viewModel.set('ReportTypeName', data.ReportTypeName);
                    viewModel.set('ReportTypeDesc', data.Description);
                    viewModel.set('DisplayStatus', data.DisplayStatus);
                }
            }, error: function (x, e) {
                //console.log(e);
            }
        });
    }
}