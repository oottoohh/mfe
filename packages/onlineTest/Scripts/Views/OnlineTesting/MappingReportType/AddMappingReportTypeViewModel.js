var viewModel = kendo.observable({
    title:'',
    createBy:'',
    createOn: '',
    lastModifiedBy:'',
    lastModifiedOn: '',
    MappingReportTypeCode: '',
    MappingReportTypeName: '',
    ReportTypeList: '',
    TemplateLayoutList: '',
    TestToolMapReport:[],
    DisplayStatus: true,
    cancel: function () {
        confirmMessageCancel();
        $('.swal-button--danger').on('click', function () {
            window.location.href = DOMAIN_URL + 'Views/OnlineTesting/MappingReportType/MappingReportType.html';
        });
    },
    save: function () {
        save();
    }
});
save = function () {
    debugger
    var MappingReportTypeCode = viewModel.MappingReportTypeCode;
    var MappingReportTypeName = viewModel.MappingReportTypeName;
    var TestTools = $("#TestToolMapReport").data("kendoMultiSelect").value();
    var ReportTypeCode = $('#ReportTypeList').data("kendoComboBox").value();
    var checkReportTypeExist = $.grep(viewModels.ReportTypeList._data, function (element, index) {
        return element.Code == ReportTypeCode
    });
    var TemplateLayoutCode = $('#TemplateLayout').data("kendoComboBox").value();
    if (MappingReportTypeName == '' || ReportTypeCode == '' || TestTools == 0) {
        swal('Failed', 'Please fill mandatory!!!', 'warning', { closeOnClickOutside: false });        
    } else if (ReportTypeCode == '' || TestTools == 0) {
        $("#TestToolMapReport").data("kendoMultiSelect").value([]);
        swal('Failed', 'Please fill mandatory!!!', 'warning', { closeOnClickOutside: false });
    }
    else {
        if (MappingReportTypeCode == '') {
                confirmMessageAdd();
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: 'POST',
                        data: {
                            MappingReportTypeName: MappingReportTypeName,
                            TestTools: TestTools,
                            ReportTypeCode: ReportTypeCode,
                            DisplayStatus: viewModel.DisplayStatus,
                            TemplateCode: TemplateLayoutCode
                        },
                        url: SERVICE_URL + 'api/MappingReportType/Save',
                        headers: { "Authorization-Token": Cookie.load() },
                        dataType: 'json',
                        success: function (response) {
                            if (response.Acknowledge < 1) {
                                LoadingMask.hide();
                                swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                            } else {
                                LoadingMask.hide();
                                swal('Good', response.Message, 'success', { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/MappingReportType/MappingReportType.html';
                                });
                            }
                        },
                        error: function (x, e) {
                            //console.log(e);
                            alert('error ajax');
                        }
                    });
                });
            } else {
                confirmMessageAdd();
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: 'POST',
                        data: {
                            MappingReportTypeCode: MappingReportTypeCode,
                            MappingReportTypeName: MappingReportTypeName,
                            TestTools: TestTools,
                            ReportTypeCode: checkReportTypeExist.length == 0 ? viewModel.ReportTypeList : ReportTypeCode,
                            DisplayStatus: viewModel.DisplayStatus,
                            TemplateCode: TemplateLayoutCode
                        },
                        url: SERVICE_URL + 'api/MappingReportType/Edit',
                        headers: { "Authorization-Token": Cookie.load() },
                        dataType: 'json',
                        success: function (response) {
                            if (response.Acknowledge < 1) {
                                LoadingMask.hide();
                                swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                            } else {
                                LoadingMask.hide();
                                swal('Good', 'Mapping Report has been Edited', 'success', { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/MappingReportType/MappingReportType.html';
                                });
                            }
                        },
                        error: function (x, e) {
                            alert('error ajax');
                        }
                    });
                });
            }
    }
}