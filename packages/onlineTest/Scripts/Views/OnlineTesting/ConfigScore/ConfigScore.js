$(document).ready(function () {
    loadLogin();    
    dropDownDisplayStats();
    dropDownTestTypeScore();
    renderGrid();
    kendo.bind($("body"), viewModel);
});
loadLogin = function () {
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
                //viewModel.set('Company', response.CompanyId);
                var data = response.CompanyId;
                var List = {
                    sender: {
                        _selectedValue: data,
                    }
                };
                dropDownCompany();                
                onchangeCompany(List);
            }
            //console.log(response);
        }, error: function (x, e) {
        }
    });
}
dropDownTestTypeScore = function () {    
    $("#TestTypeConfScore").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestTypeList,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onchangeTestTypeList
    });
}
dropDownTestToolConfScore = function () {
    $("#TestToolConfScore").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolConfScore,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onchangeTestToolList
    });
    $("#TestToolConfScore").data('kendoComboBox').value("")
}
dropDownCompany = function () {
    $("#Company").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModels.CompetencyCompany,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onchangeCompany
    });
}
onchangeTestTypeList = function (data) {
    debugger
    var check = data.sender._selectedValue;
    viewModel.set("TestTypeConfScore", check);
    viewModel.set('TestTypeCode', check);
    TestToolConfScore();
    
}
onchangeTestToolList = function (data) {
    debugger
    var check = data.sender._selectedValue;
    viewModel.set("TestToolConfScore", check);
    viewModels.set('TestToolConfScore', check);
}

dropDownDisplayStats = function () {
    $("#DisplayStatsList").kendoComboBox({
        autoBind: true,
        placeholder: "Select Display Status..",
        dataSource: viewModel.DisplayStatsList,
        dataTextField: "Value",
        dataValueField: "Value",
        select: function (e) {
            viewModel.set('DisplayStatus', e.item.context.innerHTML);
        },
    });
    debugger
}
onchangeCompany = function (data) {
    var check = data.sender._selectedValue;
    viewModel.set("Company", check);
    viewModels.set('CompanyID', check);
    dropDownTestTypeByCompany();
}
dropDownCO = function () {
    $("#CoName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.CutOffList,
        dataTextField: "Value",
        dataValueField: "Value",
        change: onChangeCO
    });
}
onChangeCO = function (data) {
    var check = data.sender._selectedValue;
    viewModel.set('CoCode', check);
}
//add change
renderGrid = function () {
    $("#grid").kendoGrid({
        resizable: true,
        dataSource: viewModel.TestToolGrid,
        columns: [
            {
                field: "CutOffCode", title: "<center>Action</center>", width: "85px", sortable: false,
                template: function (dataItem) {
                    debugger
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='AddConfigScore.html?act=edit&ConfigScore=" + dataItem.ConfigScoreCode + "'><span class='k-icon k-edit'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.ConfigScoreCode + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                }
            },
            { field: "CompanyName", title: "<center>Company</center>", encoded: false },
            { field: "TestType", title: "<center>Test Type</center>", encoded: false },
            { field: "TestTool", title: "<center>Test Tool</center>", encoded: false },
            { field: "RangeScore", title: "<center>Range Score</center>", encoded: false },
            {
                field: "DisplayStatus", title: "<center>Status</center>",
                template: function (dataRole) {
                    if (dataRole.DisplayStatus == true) {
                        return "<span>Active</span>";
                    } else {
                        return "<span>Inactive</span>";
                    }
                }
            }
        ],
        //editable: true,
        sortable: true,
        columnMenu: true,
        pageable: {
            refresh: true,
            pageSizes: [25, 50, 100],
            buttonCount: 5
        }
    });
}

function TestToolConfScore() {
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestToolByMappingTestType",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestTypeCode: viewModel.TestTypeCode,
            CompanyCode: viewModel.Company
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Test Tool Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('TestToolConfScore', []);
                viewModel.set('TestTypeConfScore', "");
                viewModel.set('TestToolConfScore', "");
                $("#TestToolConfScore").kendoComboBox({ enabled: false });
                $('#TestToolConfScore').data('kendoComboBox').value(""); 
            }
            else {
                debugger
                var combobox1 = $("#TestTypeConfScore").data("kendoComboBox");
                combobox1.value();
                combobox1.enable(true);
                var combobox2 = $("#TestToolConfScore").data("kendoComboBox");
                combobox2.value();
                combobox2.enable(true);
                viewModel.set('TestToolConfScoreList', response.Data);
                viewModel.set('TestToolConfScore', response.Data);
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
                viewModel.set('TestTypeConfScore', "");
                viewModel.set('TestTypeConfScore', "");
                $("#TestTypeConfScore").kendoComboBox({ enabled: false });
                $('#TestToolConfScore').kendoComboBox({ enabled: false });
                $('#TestTypeConfScore').data('kendoComboBox').value("");
                $('#TestToolConfScore').data('kendoComboBox').value("");
            }
            else {
                var combobox1 = $("#TestTypeConfScore").data("kendoComboBox");
                combobox1.value();
                combobox1.enable(true);
                var combobox2 = $("#TestToolConfScore").data("kendoComboBox");
                combobox2.value();
                combobox2.enable(true);
                viewModel.set('TestTypeList', response.Data);
                dropDownTestTypeScore();
            }
        }
    });
}
