$(document).ready(function () {
    LoadingMask.show();
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url:
                    function () {
                        return SERVICE_URL + 'api/subtest/inquiry'
                    },
                dataType: 'json',
                pageSize: 20
            },
        },
        batch: true,
        schema: {
            model: { 
                id: "SubTestCode",
                fields: {
                    SubTestCode: { type: "text" },
                    TestToolName: { type: "text" },
                    SubTestName: { type: "text" },
                    SubTestDesc: { type: "text" },
                    QuestionCategory: { type: "text" },
                    DisplayStatus: { type: "boolean" },
                }
            }
        }
    });
    renderGrid();
    kendo.bind($("body"), viewModel);
    LoadingMask.hide();
});
kendoWindow = function () {
    //$("#dialog").reload();
    $("#dialog").kendoWindow({
        minWidth: 1000,
        height: 280,
        top: 192.3

    });
    var dialog = $("#dialog").data("kendoWindow");

    dialog.center();
    dialog.title("Pop Up Select Category");
    dialog.content(' <div class="btn-popup-page">' +
           '<a href="#" class="k-button k-primary btn-popup" value="NORMAL" onClick="PageLoad(this)">Normal</a><br /><br />' +
           '<a href="#" class="k-button k-primary btn-popup" value="WORKINGMEMORY" onClick="PageLoad(this)">Working Memory</a><br /><br />' +
           '<a href="#" class="k-button k-primary btn-popup" value="VERBALMEMORY" onClick="PageLoad(this)">Verbal Memory</a><br />' +
       '</div><br/><br/><div class="btn-page-back"><a href="#" class="k-button k-default btn-form" onClick="CloseWindow()">Back</a></div>');
}
function CloseWindow() {
    $("#dialog").data("kendoWindow").close();
    location.reload();
}
function PageLoad(data) {
    var checkPage = $(data).attr('value');
    //alert(checkPage);
    localStorage.setItem('QuestionCategory', checkPage);
    if (checkPage == 'NORMAL') {
        var domain = DOMAIN_URL + 'Views/OnlineTesting/SubTest/SubTestSampleNormal.html';
        $(data).attr('href', domain);
        
        //alert("Welcome to Page Sample Normal");
    }
    else if (checkPage == 'WORKINGMEMORY') {
        var domain = DOMAIN_URL + 'Views/OnlineTesting/SubTest/SubTestSampleNormal.html';
        $(data).attr('href', domain);
        
    }
    else {
        var domain = DOMAIN_URL + 'Views/OnlineTesting/SubTest/SubTestSampleNormal.html';
        $(data).attr('href', domain);
    }
}
//End Pop Up Add Sub Test 
renderGrid = function () {
    //console.log(viewModel);
    $("#grid").kendoGrid({
        resizable: true,
        dataSource: viewModel.eventGrid,
        columns: [
            {
                field: "SubTestCode", title: "<center>Action</center>", width: "130px", sortable: false,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='SubTestSampleNormal.html?act=edit&QuestionCategory="+dataItem.QuestionCategory+"&SubTestCode=" + dataItem.SubTestCode + "'><span class='k-icon k-edit'></span></a>" +
                            "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.SubTestCode + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                }
            },
            { field: "TestToolName", title: "<center>Test Tool</center>", encoded: false },
            { field: "SubTestName", title: "<center>Sub Test</center>", encoded: false },
            { field: "SubTestDesc", title: "<center>Description</center>", encoded: false },
            { field: "QuestionCategory", title: "<center>Category</center>", encoded: false },
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
        pageable: {
            refresh: true,
            pageSizes: [25, 50, 100],
            buttonCount: 5
        }
    });
}
