commandTooltip = function () {
	$("#gridTooltip").kendoTooltip({
		filter: ".k-button",
		position: "top",
		content: function (e) {
			if ($(e.target).hasClass("k-add")) {
				return "Add";
			}
			else if ($(e.target).hasClass("k-grid-edit")) {
				return "Edit";
			}
			else if ($(e.target).hasClass("k-grid-erase")) {
				return "Delete";
			}
			else if ($(e.target).hasClass("k-grid-display")) {
				return "Display";
			}
			else if ($(e.target).hasClass("k-grid-reactive")) {
				return "Activate";
			}
			else if ($(e.target).hasClass("k-grid-copy")) {
			    return "Copy and Create New";
			}
		},
		showAfter: 500,
		show: function (e) {
			var hideToolTip = setTimeout(function () {
				$("#gridTooltip").data("kendoTooltip").hide();
				clearTimeout(hideToolTip);
			}, 5000);
		}
	});
}

makeGuid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r =
	Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8; return v.toString(16);
    });
}

editorCostCategory = function (container, options) {
    var guid = makeGuid();
    $("<input id='" + guid + "' name='" + guid + "' required data-text-field='CostCategoryName' data-value-field='RecruitmentCostCategoryId' data-bind='value:" + options.field + "' validationMessage='required'/>")
		.appendTo(container)
		.kendoDropDownList({
		    autoBind: false,
		    optionLabel: "Select",
		    dataSource: viewModel.listCostCategory,
		    change: function (e) {
		        options.model.RecruitmentCostCategoryId = e.sender.value();
		        options.model.CostCategoryName = e.sender.text();
		        $("#gridRecruitmentCost").data("kendoGrid").refresh();
		    }
		});
}

editorTime = function (container, options) {
    var guid = makeGuid();
    if (options.model.uid != null && options.model.uid != "") {
        guid = options.model.uid;
    }
    $("<input id='date" + guid + "' name='" + guid + "'  data-bind='value: " + options.field + "' />")
       .appendTo(container)
       .kendoTimePicker({
           format: 'HH:mm'
       });
}