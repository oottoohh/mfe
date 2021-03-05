$(document).ready(function () {
    dropdown();
    RenderGrid();
    kendo.bind($("body"), viewModel);
});
dropdown = function () {
    $("#TestToolNarrative").kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModels.TestToolList,
    });
    $("#NarrativeType").kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModels.CategoryNarrativeType,
        change: checkTypeNarrative
    });
    $("#MappingReport").kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModels.CategoryMappingReportList
    });
}


checkTypeNarrative = function (e) {
    var type = e.sender._selectedValue;
    if (type == "SUBTEST") {
        $("#MappingReport").data("kendoComboBox").value("");
        $("#TestToolNarrative").data("kendoComboBox").value("");
        viewModel.set("TestToolNarrative", "");
        var comboboxMappingReport = $("#MappingReport").data("kendoComboBox");
        comboboxMappingReport.value();
        comboboxMappingReport.enable(false);
        var comboboxTestToolNarrative = $("#TestToolNarrative").data("kendoComboBox");
        comboboxTestToolNarrative.value();
        comboboxTestToolNarrative.enable(true);
    } else {
        $("#MappingReport").data("kendoComboBox").value("");
        $("#TestToolNarrative").data("kendoComboBox").value("");
        viewModel.set("TestToolNarrative", "");
        var comboboxMappingReport = $("#MappingReport").data("kendoComboBox");
        comboboxMappingReport.value();
        comboboxMappingReport.enable(true);
        var comboboxTestToolNarrative = $("#TestToolNarrative").data("kendoComboBox");
        comboboxTestToolNarrative.value();
        comboboxTestToolNarrative.enable(false);
    }
}

RenderGrid = function () {
    $("#grid").kendoGrid({
        dataSource: viewModel.ApplicationGrid,
        resizable: true,
        columns: [
            {
                field: "NarrativeCode", title: "<center>Action</center>", width: "90px", sortable: false,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='AddNarrative.html?act=edit&NarrativeCode=" + dataItem.NarrativeCode + "&TypeEdit=" + dataItem.NarrativeTypeCode+"'><span class='k-icon k-edit'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id='" + dataItem.NarrativeCode + "' href='#' onclick='DeleteRow(this)'><span class='k-icon k-delete'></span></a>";
                }
            },
            { field: "NarrativeTypeName", title: "<center>Narrative Type</center>" },
            { field: "MappingReportTypeName", title: "<center>Mapping Report</center>" },
            { field: "TestToolName", title: "<center>Test Tool</center>" },
            { field: "Title", title: "<center>Title</center>" },
            { field: "LastModified", title: "<center>Last Modified</center>" },
            {
                field: "DisplayStatus", title: "<center>Status</center>",
                template: function (dataStatus) {
                    var Status = dataStatus.DisplayStatus;
                    if (Status == true) {
                        return "<span>Active</span>";
                    } else {
                        return "<span>Inactive</span>";
                    }
                }
            }
        ],
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: [25, 50, 100]
        }
    });
}
kendoWindow = function () {
    //$("#dialog").reload();    
    var strListType = [];
    for (var idx = 0; idx < viewModels.CategoryNarrativeType._data.length; idx++) {        
        var str = `<a href="#" class="k-button k-primary btn-popup" value="` + viewModels.CategoryNarrativeType._data[idx].Code + `" onClick="PageLoad(this)">` + viewModels.CategoryNarrativeType._data[idx].Value + `</a><br /><br />`
        strListType.push(str);
    }
    $("#dialog").kendoWindow({
        minWidth: 1000,
        height: 280,
        top: 192.3,
        close: CloseWindow
    });
    var dialog = $("#dialog").data("kendoWindow");
    dialog.center();
    dialog.title("Pop Up Select Category");
    dialog.content('<div class="btn-popup-page">' + strListType.join("")+'</div><br/><br/><div class="btn-page-back"><a href="#" class="k-button k-default btn-form" onClick="CloseWindow()">Back</a></div>');
}

function CloseWindow() {
    $("#dialog").fadeIn();
    location.reload();
}

function PageLoad(data) {
    
    var Type = $(data).attr('value');
    
    if (Type == 'subtest') {
        var domain = DOMAIN_URL + 'Views/OnlineTesting/Narrative/AddNarrative.html?Type=' + Type;
        $(data).attr('href', domain);

        //alert("Welcome to Page Sample Normal");
    }
    else if (Type == 'iq') {
        var domain = DOMAIN_URL + 'Views/OnlineTesting/Narrative/AddNarrative.html?Type=' + Type;
        $(data).attr('href', domain);

    }
    else {
        var domain = DOMAIN_URL + 'Views/OnlineTesting/Narrative/AddNarrative.html?Type=' + Type;
        $(data).attr('href', domain);
    }
}
