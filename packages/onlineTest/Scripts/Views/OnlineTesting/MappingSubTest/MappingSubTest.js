$(document).ready(function () {
    LoadingMask.show();
    kendo.bind($("body"), viewModel);
    renderGrid();
    dropDownTestTool();
    dropDownSubTest();
    LoadingMask.hide();
});

dropDownTestTool = function () {
    $("#TestToolName").kendoComboBox({
        placeholder: "Select Type..",
        dataSource: viewModels.CategoryDataTestTool,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            viewModel.set('TestToolName', e.item.context.innerHTML);
            onchangeTestTool(e);
        }
    });
}

onchangeTestTool = function (data) {
    var check = data.sender._selectedValue;
    viewModel.set('TestToolCode', check);
    SubTestByTestToolMapSubTest();
}

dropDownSubTest = function () {
    $('#SubTestName').kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.SubTestList,
        dataTextField: "Value",
        dataValueField: "Value",
        select: function (e) {
            var id = viewModel.SubTestList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.SubTestList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.SubTestCode !== "") {
                viewModel.set('SubTestCd', id);
                viewModel.set('SubTestCode', id);
                viewModel.set('SubTestName', name);
            } else {
                viewModel.set('SubTestCd', id);
                viewModel.set('SubTestCode', id);
                viewModel.set('SubTestName', name);
            }
        }
    })
}

renderGrid = function () {
    $("#grid").kendoGrid({
        resizable: true,
        dataSource: viewModel.MappingSubTestGrid,
        columns: [
            {
                field: "MappingSubTestCode", title: "<center>Action</center>", width: "30px", sortable: false,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='AddMappingSubTest.html?act=edit&MappingSubTestCode=" + dataItem.MappingSubTestCode+"'><span class='k-icon k-edit'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.MappingSubTestCode + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                }
            },
            { field: "MappingSubTestName", title: "<center>Sub Test Mapping Name</center>", width: "150px", encoded: false },
            { field: "TestToolName", title: "<center>Test Tool</center>", width: "50px", encoded: false },
            { field: "SubTest", title: "<center>Sub Test</center>", width: "75px", encoded: false },
            {
                field: "DisplayStatus", title: "<center>Status</center>", width: "35px",
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
            pageSizes: [10, 50, 100],
            buttonCount: 5
        }
    });
}
