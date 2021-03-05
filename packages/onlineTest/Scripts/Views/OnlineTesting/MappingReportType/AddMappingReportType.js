$(document).ready(function () {
    var MappingReportTypeCode = GetParameterByName('MappingReportTypeCode');
    loadData(MappingReportTypeCode);
    dropdownMultiSelectTestTool();
    dropDownReportTypeList();
    dropDownTemplateLayoutList();
    kendo.bind($('body'), viewModel);
    
});
dropdownMultiSelectTestTool = function (){
    $("#TestToolMapReport").kendoMultiSelect({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModels.TestToolList,
    });
}
dropDownReportTypeList = function () {
    $('#ReportTypeList').kendoComboBox({
        //bind: true,
        placeholder: "Select Type...",
        dataSource: viewModels.ReportTypeList,
        dataTextField: 'Value',
        dataValueField: 'Code'
    });
}
dropDownTemplateLayoutList = function () {
    $('#TemplateLayout').kendoComboBox({
        //bind: true,
        placeholder: "Select Type...",
        dataSource: viewModels.TemplateLayoutList,
        dataTextField: 'Value',
        dataValueField: 'Code'
    });
}
loadData = function (data) {
    if (data == '' || data == null || data == undefined) {
        viewModel.set('title', 'Add Mapping Report Type');
    } else {
        viewModel.set('title', 'Edit Mapping Report Type');
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/MappingReportType/Detail',
            headers: { "Authorization-Token": Cookie.load() },
            data: { MappingReportTypeCode: data },
            dataType: 'json',
            success: function (response) {
                var data = response.MappingReportType;
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
                    viewModel.set('MappingReportTypeName', data.MappingReportTypeName);
                    viewModel.set('MappingReportTypeCode', data.MappingReportTypeCode);
                    viewModel.set('DisplayStatus', data.DisplayStatus);
                    viewModel.set('ReportTypeList', data.ReportTypeCode);
                    $("#TestToolMapReport").data("kendoMultiSelect").value(data.TestTools);
                    $('#ReportTypeList').data("kendoComboBox").value(data.ReportTypeName);
                    $('#TemplateLayout').data("kendoComboBox").value(data.TemplateName);
                    
                }
            }, error: function (x, e) {
                //console.log(e);
            }
        });
    }
}