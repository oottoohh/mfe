var modeGrid = new kendo.data.Model.define({
    id: "MapPositionCode",
    fields: {
        MapPositionCode: { type: "text" },
        Position: { type: "text" },
        CutOffName: { type: "text" },
        DisplayStatus: { type: "boolean" },
    }
});
var viewModel = kendo.observable({
    CompanyId: '',
    //nanti akan di buat dinamis sesuai dengan user company yang login 
    Company: "",
    CoName: "",
    PositionName: "",
    Position: '',
    PositionCode: "",
    CutOffCode: "",
    DisplayStatus: true,
    TestToolName: "",
    TestTypeName: "",
    CompanyList: [],
    CutOffList: [],
    PositionList: [],
    TestToolGrid: new kendo.data.DataSource({
        batch: true,
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + 'api/MappingPosition/Inquiry',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.CompanyId = viewModel.Company;
                request.PositionCode = viewModel.PositionName;
                request.CutOffCode = viewModel.CoName;
                request.DisplayStatus = viewModel.DisplayStatus;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "Datas",
            model: modeGrid,
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 25
    }),
    search: function (e) {
        viewModel.TestToolGrid.page(1);
    },
    clear: function (e) {
        clear(e);
    },
    AddMapping: function (e) {
        AddMapping(e);
    },
});
clear = function () {
    viewModel.set('PositionName', '');
    viewModel.set('PositionCode', '');
    viewModel.set('CoName', '');
    viewModel.set('CutOffCode', '');
    viewModel.set('DisplayStatus', true);
}
AddMapping = function () {
    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/MappingPosition/AddMappingPosition.html';
}