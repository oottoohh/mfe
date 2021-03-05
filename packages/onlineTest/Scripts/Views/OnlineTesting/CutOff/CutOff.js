$(document).ready(function () {
    LoadingMask.show();
    var role_name = Cookies.get("role_name")
    viewModel.set('role_name', role_name)
    if (role_name == 'AFFCO') {
        $('#AddCutOff').hide()
    }
    CompanyLoad();
    GradeLoad();
    TestToolLoad();
    kendo.bind($("body"), viewModel);
    renderGrid();
    //LoadingMask.hide();
});

CompanyLoad = function () {
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Company",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            LoadingMask.hide();
            if (response.Data.length < 1) {
                swal("Failed!!!", "Company Not Found", "warning", { closeOnClickOutside: false });
            }
            else {
                viewModel.set('CompanyList', response.Data);
                viewModel.set('CompanyName', "");
                dropDownCompany();
            }
        }
    });
}

dropDownCompany = function () {
    $("#CompanyID").kendoComboBox({
        autoBind: true,
        placeholder: "Select Company..",
        dataSource: viewModel.CompanyList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.CompanyList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.CompanyList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.CompanyID !== "") {
                viewModel.set('CompanyID', id);
                viewModel.set('CompanyName', name);
            } else {
                viewModel.set('CompanyID', id);
                viewModel.set('CompanyName', name);
            }
            if (viewModel.CompanyID !== '' && viewModel.GradeID !== '') {
                //case jika user pilih grade kemudian company
                CutOffByCompanyGrade();
            } else if (viewModel.CompanyID == '' && viewModel.GradeID == '') {
                swal("Info", "Please select Company and Grade!", "warning", { closeOnClickOutside: false });
            }
        }
    });
}

GradeLoad = function () {
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Grade",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            //LoadingMask.hide();
            if (response.Data.length < 1) {
                swal("Failed!!!", "Grade Not Found", "warning", { closeOnClickOutside: false });
            }
            else {
                viewModel.set('GradeList', response.Data);
                viewModel.set('GradeName', "");
                dropDownGrade();
            }
        }
    });
}

dropDownGrade = function () {
    $("#GradeID").kendoComboBox({
        autoBind: true,
        placeholder: "Select Grade..",
        dataSource: viewModel.GradeList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.GradeList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.GradeList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.GradeID !== "") {
                viewModel.set('GradeID', id);
                viewModel.set('GradeName', name);
            } else {
                viewModel.set('GradeID', id);
                viewModel.set('GradeName', name);
            }
            if (viewModel.CompanyID !== '' && viewModel.GradeID !== '') {
                CutOffByCompanyGrade();
            } else {
                swal("Info", "Please select Company and Grade!", "warning", { closeOnClickOutside: false });
            }
        }
    });
}

dropDownCutOff = function () {
    $("#CutOffCode").kendoComboBox({
        autoBind: true,
        placeholder: "Select Cut Off..",
        dataSource: viewModel.CutOffList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.CutOffList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.CutOffList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.CutOffCode !== "") {
                viewModel.set('CutOffCode', id);
                viewModel.set('CutOffName', name);
            } else {
                viewModel.set('CutOffCode', id);
                viewModel.set('CutOffName', name);
            }
        }
    });
}

TestToolLoad = function () {
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/TestTool",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            //LoadingMask.hide();
            if (response.Data.length < 1) {
                swal("Failed!!!", "Test Tool Not Found", "warning", { closeOnClickOutside: false });
            }
            else {
                viewModel.set('TestToolList', response.Data);
                viewModel.set('TestToolName', "");
                dropDownTestTool();
            }
        }
    });
}

dropDownTestTool = function () {
    $("#TestToolCode").kendoComboBox({
        autoBind: true,
        placeholder: "Select Test Tool..",
        dataSource: viewModel.TestToolList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.TestToolList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.TestToolList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.TestToolCode !== "") {
                viewModel.set('TestToolCode', id);
                viewModel.set('TestToolName', name);
                SubTestByTestTool()
            } else {
                viewModel.set('TestToolCode', id);
                viewModel.set('TestToolName', name);
                SubTestByTestTool()
            }
        }
    });
}

dropDownSubTest = function () {
    $("#SubTestCode").kendoComboBox({
        autoBind: true,
        placeholder: "Select Sub Test..",
        dataSource: viewModel.SubTestList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.SubTestList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.SubTestList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.SubTestCode !== "") {
                viewModel.set('SubTestCode', id);
                viewModel.set('SubTestName', name);
            } else {
                viewModel.set('CutOffCode', id);
                viewModel.set('SubTestName', name);
            }
        }
    });
}

renderGrid = function () {
    $("#grid").kendoGrid({
        resizable: true,
        dataSource: viewModel.TestToolGrid,
        columns: [
            {
                field: "CutOffCode", title: "<center>Action</center>", width: "85px", sortable: false,
                template: function (dataItem) {
                    if (viewModel.role_name == 'AFFCO') {
                        return "<center><a class='k-button k-grid-edit' style='min-width:16px' id=" + dataItem.CutOffCode + " IsEditable=" + dataItem.IsEditable + " onclick='ValidateIsEditable(this)'><span class='k-icon k-edit'></span></a></center>"
                    } else {
                        return "<a class='k-button k-grid-edit' style='min-width:16px' id=" + dataItem.CutOffCode + " IsEditable=" + dataItem.IsEditable + " onclick='ValidateIsEditable(this)'><span class='k-icon k-edit'></span></a>" +
                            "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.CutOffCode + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                    }
                }
            },
            { field: "Company", title: "<center>Company</center>", encoded: false },
            { field: "Grade", title: "<center>Grade</center>", encoded: false },
            { field: "CutOffName", title: "<center>Cut Off Name</center>", encoded: false },
            { field: "TestTool", title: "<center>Test Tool</center>", encoded: false },
            { field: "SubTest", title: "<center>Sub Test</center>", encoded: false },
            {
                field: "IsGeneral", title: "<center>General</center>",
                template: function (dataRole) {
                    if (dataRole.IsGeneral == true) {
                        return "<center><span>Yes</span></center>";
                    } else {
                        return "<center><span>No</span></center>";
                    }
                }
            },
            {
                field: "DisplayStatus", title: "<center>Status</center>",
                template: function (dataRole) {
                    if (dataRole.DisplayStatus == true) {
                        return "<center><span>Active</span></center>";
                    } else {
                        return "<center><span>Inactive</span></center>";
                    }
                }
            }
        ],
        sortable: {
            refresh: true
        },
        columnMenu: true,
        pageable: {
            refresh: true,
            pageSizes: [25, 50, 100],
            buttonCount: 5
        }
    });
}

ValidateIsEditable = function (data) {
    var id = $(data).attr('id');
    var IsEditable = $(data).attr('IsEditable');

    if (IsEditable == "true") {
        //edit
        window.location.href = DOMAIN_URL + 'Views/OnlineTesting/CutOff/AddCutOff.html?act=edit&CutOffCode=' + id;
    } else {
        //edit new
        confirmMessageEditNewIQ();
        $('.swal-button--defeat').on('click', function () {
            window.location.href = DOMAIN_URL + 'Views/OnlineTesting/CutOff/AddCutOff.html?act=editNew&CutOffCode=' + id;
        })
    }
}

//loadLogin = function () {
//    $.ajax({
//        type: "POST",
//        url: SERVICE_URL + "api/UserDetail/GetCompany",
//        headers: { "Authorization-Token": Cookie.load() },
//        success: function (response) {
//            if (response.Acknowledge < 1) {
//                swal('Failed', 'Please reload the page', 'warning', { closeOnClickOutside: false });
//                Cookie.remove();
//                Cookie.load();
//            } else {
//                localStorage.setItem('CompanyID', response.CompanyId);
//                viewModel.set('Company', response.CompanyId);
//                var data = response.CompanyId;
//                var List = {
//                    sender: {
//                        _selectedValue: data,
//                    }
//                };
//                dropDownCompany();
//                onchangeCompany(List);
//            }
//        }, error: function (x, e) {
//        }
//    });
//}

//dropDownCompany = function () {
//    $("#Company").kendoComboBox({
//        autoBind: true,
//        placeholder: "Select Type..",
//        dataSource: viewModels.CategoryCompanies,
//        dataTextField: "Value",
//        dataValueField: "Code",
//        //change: onchangeCompany
//        select: function (e) {

//        }
//    });
//}

//onchangeCompany = function (data) {
//    var check = data.sender._selectedValue;
//    viewModel.set("Company", check);
//    viewModels.set('CompanyID', check);
//    $.ajax({
//        type: 'POST',
//        url: SERVICE_URL + "api/Dropdown/CutOff",
//        headers: { "Authorization-Token": Cookie.load() },
//        data: {
//            CompanyId: check
//        },
//        success: function (response) {
//            if (response.Data.length == 0) {
//                viewModel.set('CoName', '');
//                viewModel.set('CutOffCode', '');
//                viewModel.set('CutOffList', '');
//                dropDownCO();
//                //swal("Failed", "Cut Off Not Found!!!", "warning");
//            }
//            else {
//                viewModel.set('CutOffList', response.Data);
//                viewModel.set('CoName', response.Data[0].Value);
//                viewModel.set('CoCode', response.Data[0].Code);
//                dropDownCO();
//                renderGrid();
//            }
//        }
//    });
//}
