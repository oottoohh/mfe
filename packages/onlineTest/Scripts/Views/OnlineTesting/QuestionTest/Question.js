$(document).ready(function () {
    $('#btnAddQuestion').on('click', function () {
        kendoWindow();
    });
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                headers: { "Authorization-Token": Cookie.load() },
                url:
                function () {
                    return SERVICE_URL + 'api/Question/Inquiry'
                },
                dataType: 'json',
                pageSize: 20
            },
        },
        batch: true,
        schema: {
            model: {
                id: "QuestionAnswerCode",
                fields: {
                    TesTool: { type: "text" },
                    SubTest: { type: "text" },
                    Question: { type: "text" },
                    DisplayStatus: { type: "boolean" },
                    QuestionCategory: { type: "text" }
                }
            }
        }
    });
    renderGrid();
    kendo.bind($("body"), viewModel);
});
kendoWindow = function () {
    //$("#dialog").reload();
    $("#dialog").kendoWindow({
        minWidth: 1000,
        height: 275,
        top: 192.3

    });
    var dialog = $("#dialog").data("kendoWindow");

    dialog.center();
    dialog.title("Pop Up Select Category");
    dialog.content(' <div class="btn-popup-page">' +
           '<a href="#" class="k-button k-primary btn-popup" value="1" onClick="PageLoad(this)">Normal</a><br /><br />' +
           '<a href="#" class="k-button k-primary btn-popup" value="2" onClick="PageLoad(this)">Working Memory</a><br /><br />' +
           '<a href="#" class="k-button k-primary btn-popup" value="3" onClick="PageLoad(this)">Verbal Memory</a><br />' +
       '</div><br/><br/><div class="btn-page-back"><a href="#" class="k-button k-default btn-form" onClick="CloseWindow()">Back</a></div>');
}

function CloseWindow() {
    $("#dialog").data("kendoWindow").close();
    location.reload();
}

function PageLoad(data) {
    var checkPage = $(data).attr('value');
    //alert(checkPage);
    if (checkPage == 1) {
        var domain = DOMAIN_URL + 'Views/OnlineTesting/QuestionTest/QuestionTest.html';
        $(data).attr('href', domain);
        localStorage.setItem('QuestionCategory', 'NORMAL');
    }
    else if (checkPage == 2) {
        var domain = DOMAIN_URL + 'Views/OnlineTesting/QuestionTest/QuestionTest.html';
        $(data).attr('href', domain);
        localStorage.setItem('QuestionCategory', 'WORKINGMEMORY');
    }
    else {
        var domain = DOMAIN_URL + 'Views/OnlineTesting/QuestionTest/QuestionTest.html';
        $(data).attr('href', domain);
        localStorage.setItem('QuestionCategory', 'VERBALMEMORY');
    }
}
renderGrid = function () {
    console.log(viewModel.TestToolGrid);
    $("#gridTable").kendoGrid({
        resizable: true,
        dataSource: viewModel.TestToolGrid,
        columns: [
            {
                field: "QuestionAnswerCode", title: "Action", width: "130px", sortable: false,
                template: function (dataItem) {
                    //console.log(dataItem);
                    return "<a class='k-button k-grid-edit' style='min-width:16px' href='QuestionTest.html?act=edit&QuestionTest=" + dataItem.QuestionCategory + "&QuestionAnswerCode=" + dataItem.QuestionAnswerCode + "'><span class='k-icon k-edit'></span></a>" +
                            "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataItem.QuestionAnswerCode + " href='#' onclick='DeleteRow(this)'><span class='fas fa-trash-alt'></span></a>";
                }
            },
            { field: "TesTool", title: "Test Tool", encoded: false },
            { field: "SubTest", title: "Sub Test", encoded: false },
            {
                field: "Question", title: "Question", encoded: false,
                template: function (dataQuestion) {
                    var desc = dataQuestion.Question;
                    var story = desc.substr(0, 20);
                    story = story + '...';
                    return "<div>" + story + "</div>";
                }
            },
            {
                field: "DisplayStatus", title: "Status",
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
        sortable: {
            refresh: true,
        },
        columnMenu: true,
        pageable: {
            refresh: true,
            pageSizes: [25, 50, 100],
            buttonCount: 5
        }
    });
}

DeleteRow = function (data) {
    var id = $(data).attr('id');
    //alert(id);
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/Question/Delete',
            data: {
                QuestionCode: id
            },
            headers: { "Authorization-Token": Cookie.load() },
            success: function (response) {
                console.log(response);
                if (response.Acknowledge > 0) {
                    LoadingMask.hide();
                    swal("good", "record has been deleted", "success", { closeOnClickOutside: false });
                    viewModel.TestToolGrid.page(1);

                }
                else {
                    swal("error", response.message, "warning", { closeOnClickOutside: false });
                    LoadingMask.hide();
                }

            },
            error: function (xhr, status, error) {
                messagebox.show("error", error);
                LoadingMask.hide();
            }
        });
    });
}