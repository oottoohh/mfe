$(document).ready(function () {
    $('.datepicker').kendoDatePicker({
        format:'MM/dd/yyyy'
    });
    $('.datepicker').find('span').find('input').attr('readonly', 'readonly');
    dropDownCompany();
    dropdownGroubEvent();
    dropDownEvent();
    dropPassFailResult();
    dropDownReport();
    kendoGrid();
    kendo.bind($("body"), viewModel);
});
dropDownCompany = function () {
    $('#Company').kendoComboBox({
        autoBind: true,
        placeholder: "Select Company..",
        dataSource: viewModels.CompetencyCompany,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onchangeCompany
    });
}
dropdownGroubEvent = function () {
    $('#groubEvent').kendoComboBox({
        autoBind: true,
        placeholder: "Select Group Event..",
        dataSource: viewModel.groubEventList,
        dataTextField: "Value",
        dataValueField: "Id",
        change: onchangeGroubEvent
    });
}
dropDownEvent = function () {
    $('#eventName').kendoComboBox({
        autoBind: true,
        placeholder: "Select Event..",
        dataSource: viewModel.EventList,
        dataTextField: "Value",
        dataValueField: "Id",
        change: onchangeEvent
    });
}
dropDwonPosition = function () {
    $('#Position').kendoComboBox({
        autoBind: true,
        placeholder: "Select Position..",
        dataSource: viewModel.CategoryPosition,
        dataTextField: "Value",
        dataValueField: "Id",
        change: changePosition
    });
}
dropPassFailResult = function () {
    $('#passFailresult').kendoComboBox({
        autoBind: true,
        placeholder: "Please Choose One..",
        dataSource: viewModel.getReportResultPassFail,
        dataTextField: "Value",
        dataValueField: "Id",
        change: onchangePassFail
    });
}

dropDownReport = function () {
    $('#ReportType').kendoComboBox({
        autoBind: true,
        placeholder: "Select Report..",
        dataSource: viewModel.getMappingResultReport,
        dataTextField: "Value",
        dataValueField: "Code",
        change: changeReport,
    });
    $('#ReportType').data('kendoComboBox').value("");
}
dropDownProfPosition = function () {
    $('#ProfPosition').kendoComboBox({
        autoBind: true,
        placeholder: "Select Report..",
        dataSource: viewModel.getProfPosition,
        dataTextField: "Value",
        dataValueField: "Code",
        change: changeProfPosition
    });
    $('#ProfPosition').data('kendoComboBox').value("Position Applied");
    viewModel.set("ProfPosition", "0");
}
onchangeCompany = function (e) {
    var CompanyName = e.sender._prev;
    viewModel.set('CompanyName', CompanyName);
    getPositionByEventCompany();
}
onchangeEvent = function (e) {
    var EventId = e.sender._selectedValue;
    viewModel.set('EventId', EventId);
}
onchangeGroubEvent = function (e) {
    var GroupEventId = e.sender._selectedValue;
    
    viewModel.set('GroupEventId', GroupEventId);
    getEventbyGroubEvent()
}
onchangePassFail = function (e) {
    var PassFail = e.sender._selectedValue;
    viewModel.set('PassFail', PassFail);
}
changePosition = function (e) {
    var positionName = e.sender._prev;
    viewModel.set('positionName', positionName);
}
changeReport = function (data) {
    debugger
    var ReportCode = data.sender._selectedValue;
    viewModel.set('ReportTypeName', data.sender._prev);
    var IsProfiling = $.grep(viewModel.getMappingResultReport._data, function (element, index) {
        return element.Code == ReportCode
    })[0].IsProfiling;    
    viewModel.set('IsProfiling', IsProfiling)
    if (IsProfiling) {
        var getProfPosition = $.grep(viewModel.getMappingResultReport._data, function (element, index) {
            return element.Code == ReportCode
        })[0].ProfilingPositions.toJSON();
        viewModel.set('getProfPosition', getProfPosition)
        $('.downloadProfPositionFalse').hide();
        $('#content-profPosition').show();
        dropDownProfPosition();
    } else {
        $('.downloadProfPositionFalse').show();
        $('#content-profPosition').hide();
    }
}
changeProfPosition = function (data) {
    debugger
    var ProfPosition = data.sender._selectedValue;
    viewModel.set('ProfPosition', ProfPosition);
}
kendoGrid = function () {
    var ReportType = viewModel.ReportCode;
    if (ReportType==undefined || ReportType=="" || ReportType=='') {
        ReportType = "ALL";
    }
    LoadingMask.show();
    $("#grid").kendoGrid({
        width: 350,
        resizable: true,
        dataSource: viewModel.Search,
        columns: [
            {
                field: "Id", type: "boolean", editable: "false", title: "Action", width: 20,
                title: "<center><a class='k-grid-display' style='min-width:16px' href='#' onclick='selectAll(this)'><span class='k-icon k-i-tick'></span>Action</a></center>", width: 70, sortable: false, //<input class='k-grid-display' type='checkbox' href='#' onclick='selectAll(this)'/>
                template: function (dataItem) {
                    var ID = dataItem.Id;

                    if (ReportType == "ALL") {
                        return "<input id='Checkbox' name='" + ID + "' applicant='" + ID + "' reportName='"+dataItem.FullName+"' class='checkone' type='checkbox'/>";
                    }else if (isInArray(ReportType, dataItem.ReportType)) {
                        return "<input id='Checkbox' name='" + ID + "' applicant='" + ID + "' reportName='" + dataItem.FullName +"' class='checkone' type='checkbox'/>";
                    } else {
                        return "";
                    }

                    //if (dataItem.IsCheck) {
                    //    return "<input id='Checkbox' name='" + ID + "' applicant='" + ID + "' class='checkone' type='checkbox'/>";
                    //} else {
                    //    return "";
                    //}
                }
            },
            { field: 'GroupEventName', title: 'Group Event', width: 200 },
            { field: 'EventName', title: 'Event Name', width: 70 },
            { field: 'CompanyName', title: 'Company', width: 200 },
            { field: 'Position', title: 'Position', width: 100 },
            { field: 'FullName', title: 'Full Name', width: 200 },
            { field: 'Gender', title: 'Gender', width: 200 },
            { field: 'Email', title: 'Email', width: 100 },
            { field: 'CompleteDate', title: 'Complete Date', width: 100 },
            { field: 'Result', title: 'Result Status', width: 100 },
        ],
        //editable: true,
        sortable: true,
        dataBound: function (e) {
            var gridDataView = $("#grid").data().kendoGrid.dataSource.view();
            for (var i = 0; i < gridDataView.length; i++) {
                var check = $.grep(viewModel.ArrayChecked, function (e) { return e == gridDataView[i].ActivityID });
                if (check.length > 0) {
                    $("#gridMember tr td input").eq(i).prop("checked", true);
                }
                //var panelApplicationId = gridDataView[i].isChecked;
                //if (ShouldBeChecked(panelApplicationId)) {
                //    $("#gridSearch tr td input").eq(i).prop("checked", true);
                //}
            }
        },
        pageable: {
            refresh: true,
            pageSizes: [25,50,100],
            buttonCount: 5
        }
    });
    //LoadingMask.hide();
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

selectAll = function (e) {
    viewModel.ArrayChecked = [];
    var isAllChecked = false;
    if ($(':input.checkone:checked').length == $(':input.checkone').length) {
        isAllChecked = true;
    }
    if (!isAllChecked) {
        $(':input.checkone').each(function () {
            debugger
            this.checked = true;
            var position = viewModel.ArrayChecked.indexOf(this.name);
            var applicant = $(this).attr('applicant');
            //var check = $.grep(viewModel.ArrayChecked, function (e) { return e == this.name });
            if (!(position > -1)) {
                viewModel.ArrayChecked.push(applicant);
            }
        })
    }
    else {
        $(':input.checkone').each(function () {
            this.checked = false;
            var position = viewModel.ArrayChecked.indexOf(this.name);
            if (~position) {
                viewModel.ArrayChecked.splice(position, 1);
            }
        })
    }
}
$(document).on('click', 'input.checkone', function (e) {
    var checked = $(this).prop("checked");
    var gridDataView = $("#grid").data().kendoGrid.dataSource.view();
    var idx = $(this).attr('name');
    var applicant = $(this).attr('applicant');
    var gridData = $("#grid").data().kendoGrid.dataSource.data();
    //alert(applicant);
    if (checked) {
        var position = viewModel.ArrayChecked.indexOf(idx);
        if (!(position > -1)) {
            viewModel.ArrayChecked.push(applicant);
            viewModel.set('reportName', $(this).attr('reportName'));
        }
    }
    else {
        for (var i = 0; i < viewModel.ArrayChecked.length; i++) {
            if (idx == viewModel.ArrayChecked[i]) {
                //alert('ini');
                viewModel.ArrayChecked.splice(i, 1);
            }
        }
    }
});