$(document).ready(function () {
    var CompetencyCode = GetParameterByName('CompetencyCode');
    dropDownCompetency();
    dropDownRangeScore();
    loadData(CompetencyCode);
    kendo.bind($('body'), viewModel);
});
dropDownCompetency = function () {
    
    $('#AddCompetencyCompany').kendoComboBox({
        //bind: true,
        placeholder: "Select Type...",
        dataSource: viewModels.CompetencyCompany,
        dataTextField: 'Value',
        dataValueField: 'Code'
    });
}
dropDownRangeScore = function () {
    $('#RangeScore').kendoComboBox({
        //bind: true,a
        placeholder: "Select Type...",
        dataSource: viewModels.CompetencyRangeScore, 
        dataTextField: 'Value',
        dataValueField: 'Value'
    });
}
loadData = function (data) {
    $('#CompetencyCode').css('background', '#e4e2e2');
    if (data == '' || data == null || data == undefined) {
        viewModel.set('title', 'Add Competency');
    } else {
        viewModel.set('title', 'Edit Competency');
        $('#CompetencyCode').css('background', '#e4e2e2');
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/CompetencyScore/Detail',
            headers: { "Authorization-Token": Cookie.load() },
            data: { CompetencyScoreCode: data },
            dataType: 'json',
            success: function (response) {
                var data = response.CompetencyScoreDetail;
                if (response.Acknowledge < 1) {
                    LoadingMask.hide();
                    swal('Failed', 'Error to load record!!!', 'warning', { closeOnClickOutside: false });
                } else {
                                        
                    LoadingMask.hide();
                    var dtRangeScore = [{ Value: data.RangeScoreName, Code: data.RangeScoreCode }]
                    var dtCompany = [{ Code: data.CompanyId, Value: data.CompanyName }]
                    viewModel.set('createBy', data.CreateBy);
                    viewModel.set('createOn', data.CreatedTime);
                    viewModel.set('lastModifiedBy', data.ModifBy);
                    viewModel.set('lastModifiedOn', data.ModifiedTime);
                    //Batas Default 
                    viewModel.set('CompetencyCode', data.CompetencyScoreCode);
                    viewModel.set('AddCompetencyCompany', dtCompany);
                    viewModel.set('AddRangeScore', dtRangeScore);
                    viewModel.set('DisplayStatus', data.DisplayStatus);                    
                }
            }, error: function (x, e) {
                //console.log(e);
            }
        });
    }
}