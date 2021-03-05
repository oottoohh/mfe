var viewModel = kendo.observable({
    title: '',
    createBy: '',
    createOn: '',
    lastModifiedBy: '',
    lastModifiedOn: '',
    GroupCode: '',
    GroupName: '',
    ReportType: '',
    Block: true,
    DisplayStatus: true,
    SubTestLists: [{ SubTestCode: '' }],
    TestToolLists:[],
    SubTestList: [],
    MappingListData:[],
    save: function () { save(); },
    SubTestByTestTool: function () { SubTestByTestTool(); },
    cancel: function () {
        confirmMessageCancel();
        $('.swal-button--danger').on('click', function () {
            window.location.href = DOMAIN_URL + 'Views/OnlineTesting/GroupNarrative/GroupNarrative.html';
        });
    }
});
save = function () {
    if (viewModel.TitleGroupNarrative == '' || viewModel.CompanyList.Value == '' || viewModel.MappingReport.Value == '') {
        swal('Failed', 'Please Fill Mandatory!!!', 'warning', { closeOnClickOutside: false });        
    } else {
        if (viewModel.MappingListData.length < 2) {
            swal('Failed', 'Mapping subtest must be more than 2 item', 'warning', { closeOnClickOutside: false });
        } else {
            if (viewModel.GroupCode == '') {
                confirmMessageAdd();
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: 'POST',
                        data: {
                            GroupName: viewModel.TitleGroupNarrative,
                            CompanyId: viewModel.CompanyList.Code,
                            ReportType: $("#MappingReport").data("kendoComboBox").value(),
                            DisplayStatus: viewModel.DisplayStatus,
                            SubTestList: viewModel.MappingListData.toJSON()
                        },
                        url: SERVICE_URL + 'api/GroupNarrative/Save',
                        headers: { "Authorization-Token": Cookie.load() },
                        dataType: 'json',
                        success: function (response) {
                            if (response.Acknowledge < 1) {
                                LoadingMask.hide();
                                swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                            } else {
                                LoadingMask.hide();
                                swal('Good', 'Group Narrative has been Saved', 'success', { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + 'Views/OnlineTesting/GroupNarrative/GroupNarrative.html';
                                });
                            }
                        },
                        error: function (x, e) {
                            alert('error ajax');
                        }
                    });
                });
            } else {
                if (viewModel.MappingListData.length < 2) {
                    swal('Failed', 'Mapping sub test must be more than 2', 'warning', { closeOnClickOutside: false });
                } else {
                    confirmMessageAdd();
                    $('.swal-button--defeat').on('click', function () {
                        LoadingMask.show();
                        $.ajax({
                            type: 'POST',
                            data: {
                                GroupNarrativeCode: viewModel.GroupCode,
                                GroupName: viewModel.TitleGroupNarrative,
                                CompanyId: viewModel.CompanyList[0] == undefined ? viewModel.CompanyList.Code : viewModel.CompanyList[0].Code,
                                ReportType: $("#MappingReport").data("kendoComboBox").value(),
                                DisplayStatus: viewModel.DisplayStatus,
                                SubTestList: viewModel.MappingListData.toJSON()
                            },
                            url: SERVICE_URL + 'api/GroupNarrative/Edit',
                            headers: { "Authorization-Token": Cookie.load() },
                            dataType: 'json',
                            success: function (response) {
                                if (response.Acknowledge < 1) {
                                    LoadingMask.hide();
                                    swal('Failed', response.Message, 'warning', { closeOnClickOutside: false });
                                } else {
                                    LoadingMask.hide();
                                    swal('Good', 'Group Narrative has been Edited', 'success', { closeOnClickOutside: false });
                                    $('.swal-button--confirm').on('click', function () {
                                        window.location.href = DOMAIN_URL + 'Views/OnlineTesting/GroupNarrative/GroupNarrative.html';
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
    }
}
