//add change
var modeGrid = new kendo.data.Model.define({
    id: "CutOffCode",
    fields: {
        Company: { type: "text" },
        CompanyID: { type: "number" },
        TestType: { type: "text" },
        TestTool: { type: "text" },
        DisplayStatus: { type: "boolean" },
    }
});

var viewModel = kendo.observable({
    Company: "",
    TestTypeName:"",
    CompanyID: '',
    CompanyList: [],
    TestToolConfScore: '',
    DisplayStatus: "Active",
    TestTypeName: "",
    TestTypeCode: "",
    TestToolName: "",
    TestToolCode: "",
    DisplayStatsList: [        
        { Code: "Active", Value: "Active" },
        { Code: "Inactive", Value: "Inactive" },
        { Code: "All", Value: "All" }
    ],
    TestToolGrid: new kendo.data.DataSource({
        batch: true,
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + 'api/ConfigScore/Inquiry',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.CompanyId = viewModel.Company;
                request.TestToolName = viewModel.TestToolName == "" ? viewModel.TestToolConfScore : viewModel.TestToolName;
                request.TestTypeName = viewModel.TestTypeName == "" ? viewModel.TestTypeCode : viewModel.TestTypeName;
                request.DisplayStatus = viewModel.DisplayStatus == "Active" ? true : false;
                request.IsAll = viewModel.DisplayStatus == "All" ? true : false;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "ConfigScoreDatas",
            //model: modeGrid,
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 100
    }),
    search: function (e) {
        viewModel.TestToolGrid.page(1);
    },
    AddSubSet: function (e) {
        AddSubSet(e);
    },
    clear: function () {
        clear();
    }
});
DeleteRow = function (data) {
    var id = $(data).attr('id');
    var dt = viewModel.TestToolGrid._data;
    if (dt.length > 0) {
        for (a = 0; a < dt.length; a++) {
            if (dt[a].ConfigScoreCode == id) {
                if (dt[a].DisplayStatus == true) {
                    swal("Error", `Config score cannot be deleted due to its active status`, "warning", { closeOnClickOutside: false });
                    return;
                } else {
                    confirmMessageDelete();
                    $('.swal-button--defeat').on('click', function () {
                        LoadingMask.show();
                        $.ajax({
                            type: 'POST',
                            url: SERVICE_URL + 'api/ConfigScore/Delete',
                            headers: { "Authorization-Token": Cookie.load() },
                            data: {
                                ConfigScoreCode: id
                            },
                            success: function (response) {
                                if (response.Acknowledge == 1) {
                                    LoadingMask.hide();
                                    swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                    //viewModel.set("Company", 1);
                                    viewModel.TestToolGrid.page(1);
                                }
                                else {
                                    LoadingMask.hide();
                                    swal("Error", response.Message, "warning", { closeOnClickOutside: false });
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
        }
    }

    //confirmMessageDelete();
    //$('.swal-button--defeat').on('click', function () {
    //    LoadingMask.show();
    //    $.ajax({
    //        type: 'POST',
    //        url: SERVICE_URL + 'api/CutOff/Delete',
    //        headers: { "Authorization-Token": Cookie.load() },
    //        data: {
    //            CutOffCode: id
    //        },
    //        success: function (response) {
    //            if (response.Acknowledge == 1) {
    //                LoadingMask.hide();
    //                swal("Good", "Record Has Been Deleted", "success");
    //                //viewModel.set("Company", 1);
    //                viewModel.TestToolGrid.page(1);
    //            }
    //            else {
    //                LoadingMask.hide();
    //                swal("Error", response.Message, "warning");
    //            }
    //        },
    //        error: function (xhr, status, error) {
    //            MessageBox.show("Error", error);
    //            LoadingMask.hide();
    //        }
    //    });
    //});
}
AddConfigScore = function (e) {
    debugger
    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/ConfigScore/AddConfigScore.html';
}
clear = function () {
    //viewModel.set('Company', '');
    viewModel.set('Company', '');
    viewModel.set('TestTypeConfScore', '');
    viewModel.set('TestTypeCode', '')
    viewModel.set('TestToolConfScore', '');
    $('#DisplayStatsList').data('kendoComboBox').value('');
}