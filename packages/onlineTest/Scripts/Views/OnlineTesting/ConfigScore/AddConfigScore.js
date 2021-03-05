$(document).ready(function () {
    loadLogin();
    dropDownRangeScore();
    dropDownTestTypeScore();
    //dropDownTestAddToolConfScore();
    kendo.bind($('body'), viewModel);
});
loadLogin = function () {
    var ConfigScore = GetParameterByName('ConfigScore');
    if (ConfigScore == '' || ConfigScore == null || ConfigScore == undefined) {
        viewModel.set('title', 'Add Config Score');
        $.ajax({
            type: "POST",
            url: SERVICE_URL + "api/UserDetail/GetCompany",
            headers: { "Authorization-Token": Cookie.load() },
            success: function (response) {
                if (response.Acknowledge < 1) {
                    swal('Failed', 'Please reload the page', 'warning', { closeOnClickOutside: false });
                    Cookie.remove();
                    Cookie.load();
                } else {

                    localStorage.setItem('CompanyID', response.CompanyId);
                    viewModel.set('Company', response.CompanyId);
                    var data = response.CompanyId;
                    var List = {
                        sender: {
                            _selectedValue: data,
                        }
                    };
                    dropDownCompany();
                    //onchangeCompany(List);
                }
                //console.log(response);
            }, error: function (x, e) {
            }
        });
    } else {
        loadData(ConfigScore);
    }

   
}

dropDownCompany = function () {
    $("#CompanyName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModels.CompetencyCompany,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onchangeCompany
    });
}

dropDownTestTypeScore = function () {    
    $("#TestTypeNameScore").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestTypeList,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onChangeTestTypeConfScore
    });
    $('#TestTypeNameScore').data('kendoComboBox').value("");
}
dropDownTestToolConfScore = function () {
    $("#TestToolNameScore").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolConfScoreList,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onchangeTestToolList
    });    
    $("#TestToolNameScore").data('kendoComboBox').value("");
}
onChangeTestTypeConfScore = function (source) {    
    var check_value = source.sender._selectedValue;
    viewModel.set('TestTypeCode', check_value);
    $('#TestToolNameScore').data("kendoComboBox").value("");
    dropDownTestAddToolConfScore();
}

onchangeTestToolList = function (data) {
    var check = data.sender._selectedValue;
    viewModel.set("TestToolConfScore", check);
    viewModels.set('TestToolConfScore', check);
}

onchangeCompany = function (data) {
    var check = data.sender._selectedValue;
    viewModel.set("Company", check);
    viewModels.set('CompanyID', check);
    $('#TestToolNameScore').data("kendoComboBox").value(""); 
    $('#TestToolNameScore').data("kendoComboBox").setDataSource(); 
    dropDownTestTypeByCompany();
}

dropDownCompetency = function () {    
    $('#AddCompetencyCompany').kendoComboBox({
        //bind: true,
        placeholder: "Select Type...",
        dataSource: viewModels.CompetencyCompany,
        dataTextField: 'Value',
        dataValueField: 'Value'
    });
}
dropDownRangeScore = function () {
    $('#RangeScore').kendoComboBox({
        //bind: true,
        placeholder: "Select Type...",
        dataSource: viewModels.CompetencyRangeScore,
        dataTextField: 'Value',
        dataValueField: 'Value'
    });
}
loadData = function (data) {
    $('#ConfigScoreCode').css('background', '#e4e2e2');
    $('#TestTypeNameScore').css('background', '#e4e2e2');
    viewModel.set('title', 'Edit Config Score');
    LoadingMask.show();
    $('#TestTypeNameScore').css('background', '#e4e2e2');
    $('#TestToolNameScore').css('background', '#e4e2e2');
    $('#CompanyName').css('background', '#e4e2e2');
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + 'api/ConfigScore/Detail',
        headers: { "Authorization-Token": Cookie.load() },
        data: { ConfigScoreCode: data },
        dataType: 'json',
        success: function (response) {
            debugger
            var data = response.ConfigScoreDetail;
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
                viewModel.set('ConfigScoreCode', data.ConfigScoreCode)
                viewModel.set('CompanyName', data.CompanyName);
                viewModel.set('TestTypeNameScore', data.TestTypeName);
                viewModel.set('TestTypeCode', data.TestTypeCode);
                viewModel.set('ConfigRangeScoreFrom', data.RangeFrom);
                viewModel.set('ConfigRangeScoreTo', data.RangeTo);
                viewModel.set('DisplayStatus', data.DisplayStatus);
                viewModel.set('TestToolNameScore', data.TestToolName);
                viewModel.set('TestToolConfScore', data.TestToolCode);
                viewModel.set('Company', data.CompanyId)
                var combobox = $("#TestToolNameScore").data("kendoComboBox");
                combobox.value();
                combobox.enable(false);
                var combobox1 = $("#TestTypeNameScore").data("kendoComboBox");
                combobox1.value();
                combobox1.enable(false);
                var combobox2 = $("#CompanyName").data("kendoComboBox");
                combobox2.value();
                combobox2.enable(false);
            }
        }, error: function (x, e) {
            //console.log(e);
        }
    });
}

function dropDownTestAddToolConfScore() {
    debugger
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByMappingTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestTypeCode: viewModel.TestTypeCode == undefined ? "" : viewModel.TestTypeCode,
            CompanyCode : viewModel.Company
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolConfScore', []);
                viewModel.set('TestTypeNameScore', "");
                viewModel.set('TestToolNameScore', "");
                $("#TestToolNameScore").kendoComboBox({ enabled: false });
                $('#TestToolNameScore').data('kendoComboBox').value("");                
            }
            else {
                var combobox1 = $("#TestTypeNameScore").data("kendoComboBox");
                combobox1.value();
                combobox1.enable(true);
                var combobox2 = $("#TestToolNameScore").data("kendoComboBox");
                combobox2.value();
                combobox2.enable(true);               
                viewModel.set('TestToolConfScoreList', response.Data);
                dropDownTestToolConfScore();
            }
        }
    });
}

function dropDownTestTypeByCompany() {
    debugger
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestTypeByCompany",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestTypeCode: viewModel.TestTypeCode == undefined ? "" : viewModel.TestTypeCode,
            CompanyCode: viewModel.Company
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Type Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestTypeList', []);
                viewModel.set('TestTypeNameScore', "");
                viewModel.set('TestToolNameScore', "");
                $("#TestTypeNameScore").kendoComboBox({ enabled: false });
                $('#TestToolNameScore').kendoComboBox({ enabled: false });
                $('#TestTypeNameScore').data('kendoComboBox').value("");
                $('#TestToolNameScore').data('kendoComboBox').value("");
            }
            else {
                var combobox1 = $("#TestTypeNameScore").data("kendoComboBox");
                combobox1.value();
                combobox1.enable(true);                
                var combobox2 = $("#TestToolNameScore").data("kendoComboBox");
                combobox2.value();
                combobox2.enable(true);
                viewModel.set('TestTypeList', response.Data);
                dropDownTestTypeScore();
            }
        }
    });
}

