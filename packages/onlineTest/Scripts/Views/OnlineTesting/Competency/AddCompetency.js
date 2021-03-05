$(document).ready(function () {
    var CompetencyCode = GetParameterByName('CompetencyCode');
    loadData(CompetencyCode);
    kendo.bind($('body'), viewModel);
});
loadData = function (data) {
    if (data == '' || data == null || data == undefined) {
        viewModel.set('title', 'Add Competency');
    } else {
        viewModel.set('title', 'Edit Competency');
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/ReportCompetency/Detail', 
            headers: { "Authorization-Token": Cookie.load() },
            data: { CompCode: data },
            dataType: 'json',
            success: function (response) {
                var data = response.Competency;
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
                    viewModel.set('CompetencyCode', data.CompetencyCode);
                    viewModel.set('CompetencyName', data.ComptencyName);
                    viewModel.set('CompetencyDesc', data.CompetencyDesc);
                    viewModel.set('DisplayStatus', data.DisplayStatus);
                    viewModel.set('CompetencyConfig', data.ConfigMaxLength)
                }
            }, error: function (x, e) {
                //console.log(e);
            }
        });
    }
}