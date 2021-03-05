$(document).ready(function () {
    CompanyLoad();
    GradeLoad();
    kendo.bind($("body"), viewModel);
    kendoGrid();
});

CompanyLoad = function () {
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Company",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Data.length < 1) {
                LoadingMask.hide();
                swal("Failed!!!", "Company Not Found", "warning", { closeOnClickOutside: false });
                return;
            } else {
                LoadingMask.hide();
                viewModel.set('CompanyList', response.Data);
                viewModel.set('CompanyName', "");
                dropDownCompany();
            }
        }
    });
}

GradeLoad = function () {
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Grade",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Data.length < 1) {
                LoadingMask.hide();
                swal("Failed!!!", "Grade Not Found", "warning", { closeOnClickOutside: false });
                return;
            } else {
                LoadingMask.hide();
                viewModel.set('GradeList', response.Data);
                viewModel.set('GradeName', "");
                dropDownGrade();
            }
        }
    });
}

dropDownCompany = function () {
    $("#CompanyId").kendoComboBox({
        autoBind: true,
        placeholder: "Select Company..",
        dataSource: viewModel.CompanyList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.CompanyList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.CompanyList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.CompanyId !== "") {
                viewModel.set('CompanyId', id);
                viewModel.set('CompanyName', name);
                TestTypeByCompanyNormScore();
            } else {
                viewModel.set('CompanyId', id);
                viewModel.set('CompanyName', name);
                TestTypeByCompanyNormScore();
            }
        }
    });
}

dropDownGrade = function () {
    $("#GradeId").kendoComboBox({
        autoBind: true,
        placeholder: "Select Grade..",
        dataSource: viewModel.GradeList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.GradeList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.GradeList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.GradeId !== "") {
                viewModel.set('GradeId', id);
                viewModel.set('GradeName', name);
            } else {
                viewModel.set('GradeId', id);
                viewModel.set('GradeName', name);
            }
        }
    });
}

dropDownTestType = function () {
    $("#TestTypeCode").kendoComboBox({
        autoBind: true,
        placeholder: "Select Test Type..",
        dataSource: viewModel.TestTypeList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.TestTypeList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.TestTypeList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.TestTypeCode !== "") {
                viewModel.set('TestTypeCode', id);
                viewModel.set('TestTypeName', name);
                TestToolByTestTypeNormScore();
            } else {
                viewModel.set('TestTypeCode', id);
                viewModel.set('TestTypeName', name);
                TestToolByTestTypeNormScore();
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
                viewModel.set('TestTool', name);
            } else {
                viewModel.set('TestToolCode', id);
                viewModel.set('TestToolName', name);
                viewModel.set('TestTool', name);
            }
        }
    });
}

kendoGrid = function () {
    $("#gridNormScore").kendoGrid({
        width: 300,
        resizable: true,
        dataSource: viewModel.NormScoreInquiry,
        columns: [
            {
                field: "NormScoreCode", title: "<center>Action</center>", width: "90px", sortable: false,
                template: function (dataItem) {
                    //return "<a class='k-button k-grid-edit' style='min-width:16px' href='AddNormScore.html?act=edit&NormScoreCode=" + dataItem.NormScoreCode + "'><span class='k-icon k-edit'></span></a>" +
                    return "<a class='k-button k-grid-edit' style='min-width:16px' id=" + dataItem.NormScoreCode +
                        " isEditable=" + dataItem.IsEditable + " onclick='ValidateEditNew(this)'><span class='k-icon k-edit'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.NormScoreCode +
                        " isEditable=" + dataItem.IsEditable + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                }
            },
            { field: "NormScoreName", title: "<center>Norm Score Name</center>", width: "250px", encoded: false },
            { field: "CompanyName", title: "<center>Company</center>", width: "175px", encoded: false },
            { field: "GradeName", title: "<center>Grade</center>", width: "80px", encoded: false },
            { field: "TestType", title: "<center>Test Type</center>", width: "125px", encoded: false },
            { field: "TestTool", title: "<center>Test Tool</center>", width: "125px", encoded: false },
            { field: "CreatedOnString", title: "<center>Created On</center>", width: "125px", encoded:false },
            { field: "ModifiedOnString", title: "<center>Modified On</center>", width: "125px", encoded:false },
            {
                field: "DisplayStatus", title: "<center>Status</center>", width: "90px",
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
        pageable: {
            refresh: true,
            pageSizes: [25, 50, 100],
            buttonCount: 5
        }
    });
}

DeleteRow = function (data) {
    var ids = $(data).attr('id');
    var isEditable = $(data).attr('isEditable');
    if (isEditable == 'false') {
        swal("Failed!!!", "You cannot delete this data. This data has been used as scoring", "warning", { closeOnClickOutside: false });
    } else {
        confirmMessageDeleteMapSubTest();
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            $.ajax({
                type: 'POST',
                url: SERVICE_URL + 'api/NormScore/Delete',
                headers: { "Authorization-Token": Cookie.load() },
                data: {
                    NormScoreCode: ids
                },
                success: function (response) {
                    if (response.Acknowledge == 1) {
                        LoadingMask.hide();
                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                        viewModel.NormScoreInquiry.page(1);
                    } else {
                        LoadingMask.hide();
                        swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                        return;
                    }
                },
                error: function (xhr, status, error) {
                    MessageBox.show("Error", error);
                    LoadingMask.hide();
                }
            });
        });
    }
}

ValidateEditNew = function (data) {
    var id = $(data).attr('id');
    var isEditable = $(data).attr('isEditable');

    if (isEditable == "true") {
        //edit
        window.location.href = DOMAIN_URL + 'Views/OnlineTesting/NormScore/AddNormScore.html?act=edit&NormScore=' + id;
    } else {
        //edit new
        confirmMessageEditNewIQ();
        $('.swal-button--defeat').on('click', function () {
            window.location.href = DOMAIN_URL + 'Views/OnlineTesting/NormScore/AddNormScore.html?act=editNew&NormScore=' + id;
        })
    }
}