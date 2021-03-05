var modelTestTypeGrid = new kendo.data.Model.define({
    id:"TestTypeCode",
    fields: {
        TestTypeName: { type: "string", editable: false, encoded:false},
        TestTypeDesc: { type: "string", editable: false, encoded: false },
        field: { type: "boolean", editable: false }
    },
});

var viewModel = kendo.observable({
    filterGeneral:"",
    title: "Input",
    TestTypeName: "",
    TestTypeCode:"",
    DisplayStatus: true,
    
    addTestType: function (e) {
        addTestType(e);
    },
    //Seacrh Inquiry
    TestTypeGrid: new kendo.data.DataSource({
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
                url: SERVICE_URL + 'api/TestType/Inquiry',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                //console.log(data.sort);
                if (document.getElementById('display_status').cheked) {
                    viewModel.set("DisplayStatus", false);
                }
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.TestTypeName = viewModel.TestTypeName;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.sortInfo = data.sort;
                //console.log(request.TestTypeName);
                return request;
            }
        },
        schema: {
            data: "TestTypeDatas",
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 25
    }),
    search: function (e) {
        viewModel.TestTypeGrid.page(1);
    },
    clear: function () {
        clear();
    }
});

var modelTestType = new kendo.data.Model.define({
  
    id: "TestTypeCode",
    fields: {
        TestTypeCode: { type: "string", editable: false },
        TestTypeName: { type: "string", editable: false }
    }
});

addTestType = function (e) {
    //alert(e);
    var domain = DOMAIN_URL + 'Views/OnlineTesting/TestType/AddTypeTest.html';
    $('#addTestType').attr('href', domain);
}

//Delete Data Di dala Grid
DeleteRow = function (id) {
    //console.log(id);

    var ids = $(id).attr('id');
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/TestType/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                TestTypeCode: ids
            },
            success: function (response) {
                if (response.Acknowledge == 1) {
                    swal("Good", "Record Has Been Deleted", "success");
                    viewModel.TestTypeGrid.page(1);
                }
                else {
                    swal("Error", response.Message, "warning" );
                }
                LoadingMask.hide();
            },
            error: function (xhr, status, error) {
                MessageBox.show("Error", error);
                LoadingMask.hide();
            }
        });
    });
}
clear = function () {
    viewModel.set('TestTypeName', '');
    viewModel.set('TestTypeCode', '');
    viewModel.set('DisplayStatus', true);
}
// End Delete Data Di dala Grid