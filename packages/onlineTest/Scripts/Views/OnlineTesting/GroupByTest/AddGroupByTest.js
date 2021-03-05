$(document).ready(function () {
    var branchProfileID = GetParameterByName('SubSetCode');
    dropDownTestType();
    dropDownTestTool();
    LoadData(branchProfileID);


    $("#gridSubTest").width(400);
    kendo.bind($("body"), viewModel);
});

LoadData = function (branchProfileID) {
    var data = branchProfileID;
    if (data == '') {
        //console.log('Add Data');

        renderGrid();
        //ListGrid();
    } else {
        $.ajax({
            type: "POST",
            url: SERVICE_URL + "api/SubSet/DetailByTest",
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                SubSetCode: data,
            },
            success: function (response) {
                if (response.Acknowledge < 1) {
                    swal('Failed', 'Data is Empty', 'warning', { closeOnClickOutside: false });
                }
                else {
                    viewModel.ApplicantList.data(response.Details.Questions);
                    viewModel.set('arrSubTest', response.Details.SubTestList);
                    viewModel.set("createBy", response.Details.CreateBy);
                    viewModel.set("lastModifiedBy", response.Details.ModifBy);
                    viewModel.set("createOn", response.Details.CreatedTime);
                    viewModel.set("lastModifiedOn", response.Details.ModifiedTime);
                    viewModel.set("SubSetCode", response.Details.SubSetCode);
                    viewModel.set("SubSetName", response.Details.SubSetName);
                    viewModel.set("DisplayStatus", response.Details.DisplayStatus);
                    viewModel.set("TestTypeName", response.Details.TestTypeCode);
                    viewModel.set("TestToolCode", response.Details.TestToolCode);
                    viewModel.set("SubTestCode", response.Details.SubTestCode);
                    viewModels.set('TestTypeCode', response.Details.TestTypeCode);
                    viewModels.set('TestToolCode', response.Details.TestToolCode);
                    viewModel.set('listTest', response.Details.Questions);
                    renderGrids();
                    TestToolInByTest();
                    //ListGrid();
                }
            },
            error: function (xhr, status, error) {
                //alert("Error");
                MessageBox.show("Error", "Error");
                LoadingMask.hide();
            }
        });
    }
}
dropDownTestType = function () {
    //console.log(viewModels.CategoryDataSource);
    $("#TestTypeName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModels.CategoryTestTypeByTest,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onChangeTestType,
        select: function (e) {
            viewModel.set('TestType', e.item.context.innerHTML);
            viewModels.set('TestToolCode', '');
        }
    });
}
onChangeTestType = function (source) {
    var check_value = source.sender._selectedValue;
    viewModels.set('TestTypeCode', check_value);
    TestToolInByTest();
}
dropDownTestTool = function () {
    $("#TestToolName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolList,
        dataTextField: "Value",
        dataValueField: "Code",
        change: testtool,
        select: function (e) {
            viewModel.set('TestTool', e.item.context.innerHTML);
            viewModel.set('TestToolCode', e.sender._selectedValue);
        }
    });
}
testtool = function (data) {
    //console.log(data);
    //viewModel.set('TestTool', e.item.context.innerHTML);
    viewModel.set('TestToolCode', data.sender._selectedValue);
}
renderGrid = function () {
    //var dataSource = '';
    //var edit = GetParameterByName('act');
    //if (GetParameterByName('act') == 'edit') {
    //    dataSource = viewModel.listTest;
    //} else {
    //    dataSource = viewModel.ApplicantList;
    //}
    //console.log("renderGrid -> dataSource", dataSource)
    $("#grid").kendoGrid({
        resizable: true,
        dataSource: viewModel.ApplicantList,
        columns: [
            {
                field: "No", title: "<center>View</center>", width: "60px", sortable: false,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' target='_blank' style='min-width:16px' href='PreviewGroupByTest.html?act=preview&QuestionCode=" + dataItem.QuestionCode + "'><span class='k-icon k-i-search'></span></a>"
                }
            },
            {
                field: "NumberToDisplay", title: "<center>Number To Display</center>", width: "130px",
                template: function (dataItem) {
                    //console.log(dataItem);
                    return "<input type='number' class='k-textbox' QuestionCode=" + dataItem.QuestionCode + " SubTestCode=" + dataItem.SubTestCode + " id='check" + dataItem.No + "' name='check" + dataItem.No + "' value='" + dataItem.NumberToDisplay + "'  style='width:100%;' onchange='onchangeByTest(this)'/>"
                }
            },
            { field: "SubTestName", title: "<center>Sub Test Name</center>", width: "250px;", encoded: false },
            { field: "QuestionCode", title: "<center>Question Code</center>", width: "250px;", encoded: false },
            { field: "QuestionName", title: "<center>Question</center>", encoded: false },
        ],
        editable: false,
        sortable: true,
        navigatable: false,
        pageable: {
            refresh: false,
            pageSizes: [20, 50, 100],
            buttonCount: 5
        },
    });
    //console.log(grid);
}
renderGrids = function () {
    //debugger;
    console.log(viewModel.listTest);
    $("#grid").kendoGrid({
        resizable: true,
        dataSource:viewModel.listTest,
        columns: [
            {
                field: "No", title: "<center>View</center>", width: "60px", sortable: false,
                template: function (dataItem) {
                    return "<a class='k-button k-grid-edit' target='_blank' style='min-width:16px' href='PreviewGroupByTest.html?act=preview&QuestionCode=" + dataItem.QuestionCode + "'><span class='k-icon k-i-search'></span></a>"
                }
            },
            {
                field: "NumberToDisplay", title: "<center>Number</center>", width: "90px",
                template: function (dataItem) {
                    return "<input type='number' class='k-textbox' QuestionCode=" + dataItem.QuestionCode + " SubTestCode=" + dataItem.SubTestCode + " id='check" + dataItem.No + "' name='check" + dataItem.No + "' value='" + dataItem.NumberToDisplay + "' data-bind='value:NumberToDisplay' style='width:100%;' onchange='onchangeByTest(this)'/>"
                }
            },
            { field: "SubTestName", title: "<center>Sub Test Name</center>", width: "250px;", encoded: false },
            { field: "QuestionCode", title: "<center>Question Code</center>", width: "250px;", encoded: false },
            { field: "QuestionName", title: "<center>Question</center>", encoded: false },
        ],
        editable: true,
        sortable: true,
        navigatable: false,
        pageable: {
            refresh: false,
            pageSizes: [20, 50, 100],
            buttonCount: 5
        },
    });
}
onchangeByTest = function (data) {
    var QuestionCode = $(data).attr('QuestionCode');
    var SubTestCode = $(data).attr('SubTestCode');
    var grid = $('#grid').data("kendoGrid");
    var value = $(data).val();
    var val = 0;
    for (i = 0; i < grid._data.length; i++) {
        var NumberToDisplay = grid._data[i].NumberToDisplay;
        if (value == 0) {
            viewModel.set('isStatus', true);
        }
        else if (value < 0) {
            viewModel.set('isStatus', false);
            swal('Failed!!!', 'Your Number is Duplicate / Your number less than 0', 'warning', { closeOnClickOutside: false });
            //alert("Exist");
            break;
        }
        else if (NumberToDisplay == value) {
            viewModel.set('isStatus', false);
            swal('Failed!!!', 'Your Number is Duplicate / Your number less than 0', 'warning', { closeOnClickOutside: false });
            //alert("Exist");
            break;
        } else {
            //alert("Good");
            viewModel.set('isStatus', true);
        }
        if (grid._data[i].QuestionCode == QuestionCode) {
            val = parseInt(value);
            grid._data[i].set("NumberToDisplay", val);
        }

    }
    listSubTest(SubTestCode, QuestionCode, value);
    //Score = SubTestList[i].QuestionTotal;
    //val = parseInt(Score);
    //viewModel.set('arrSubTest[' + i + '].QuestionTotal', val + 1);

}
listSubTest = function (SubTestCode, QuestionCode, value) {
    var grids = $('#grid').data("kendoGrid");
    var vall = parseInt(value);
    var list = [];
    for (k = 0; k < grids._data.length; k++) {
        if (grids._data[k].SubTestCode == SubTestCode) {
            if (grids._data[k].NumberToDisplay != 0) {
                list.push({
                    SubTestCode: grids._data[k].SubTestCode,
                    Score: grids._data[k].NumberToDisplay
                });
            }
        }

    }

    var total = list.length;
    var SubTestList = viewModel.arrSubTest;
    for (l = 0; l < SubTestList.length; l++) {
        if (SubTestList[l].SubTestCode == SubTestCode) {
            //debugger;
            viewModel.set('arrSubTest[' + l + '].QuestionTotal', total);
        }
    }
    //console.log(viewModel.isStatus);
    ListGrid();
}
onload = function () {
    var TestTypeCode = viewModel.TestTypeName;
    var TestToolCode = viewModel.TestToolCode;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + 'api/subset/GetQuestionByTest',
        headers: { "Authorization-Token": Cookie.load() },
        dataType: 'json',
        data: {
            TestTypeCode: TestTypeCode,
            TestToolCode: TestToolCode,
            PageNo: 1,
            PageSize: 10,
        },
        success: function (response) {
            if (response.Acknowledge < 1) {
            } else {
                var data = [];
                for (i = 0; i < response.SubTestList.length; i++) {
                    data.push({
                        SubTestCode: response.SubTestList[i].SubTestCode,
                        SubTestName: response.SubTestList[i].SubTestName,
                        QuestionTotal: 0
                    });
                }
                //console.log(data);
                viewModel.set('arrSubTest', data);
            }
            //renderGrid();
            ListGrid();
            //var array = response.Questions;
            //var SubTestCode = [];
            //var SubTestName = [];
            //var arrList = [];
            //for (i = 0; i < array.length; i++) {
            //    SubTestCode[i] = array[i].SubTestCode;
            //    SubTestName[i] = array[i].SubTestName;
            //    arrList[i] = {
            //        "SubTestCode": SubTestCode[i],
            //        "SubTestName": SubTestName[i]
            //    };
            //}
            //renderGrid();

            //var grouped = groupBy(arrList, pet => pet.SubTestCode);
            //console.log(arrList);
            //var dataSource= new kendo.data.DataSource({
            //    data: arrList,
            //    group: [
            //        { field:"SubTestCode", name:SubTestName}
            //    ],
            //});
            //dataSource.fetch(function () {
            //    var view = dataSource.view();
            //    console.log(view);

            //    var food = view[0]; console.log(food.value);

            //    console.log(vegetables.value);
            //});


            //console.log(arrList);


            //result = arrList.reduce(function (r, a) {
            //    r[a.SubTestCode] = r[a.SubTestCode] || "SubTestCode";
            //    return r;
            //}, Object.create(null));

            //console.log([0].result);
            //var group= _.mapObject(_.groupBy(arrList,'SubTestCode'),
            //    clist => clist.map(arrList => _.omit(arrList, 'SubTestCode')));
            //console.log(group);
        },
        error: function (x, e) {
            //alert("Load Question By Test", x);
            MessageBox.show("Error", "Load Question By Test " + x);
        }
    });

}
ListGrid = function () {
    //console.log(viewModel.arrSubTest);
    $("#gridSubTest").kendoGrid({
        resizable: true,
        dataSource: viewModel.arrSubTest,
        columns: [
            { field: "SubTestName", title: "<center>Sub Test Name</center>", width: "250px;", encoded: false },
            {
                field: "QuestionTotal", title: "<center>Total Question</center>", width: "90px"
            }
        ],
        editable: false,
        sortable: true,
        navigatable: true,
        //pageable: {
        //    refresh: true,
        //    pageSizes: true,
        //    buttonCount: 5
        //},
    });
}

Display = function (data) {
    $('#displayStatus').removeAttr('onchange');
    $('#displayStatus').attr('onchange', 'DisplayChecked(this)');
    viewModel.set('DisplayStatus', false);
}

DisplayChecked = function (data) {
    $('#displayStatus').removeAttr('onchange');
    $('#displayStatus').attr('onchange', 'Display(this)');
    viewModel.set('DisplayStatus', true);
}