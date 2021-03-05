var viewModel = kendo.observable({
    title: '',
    createBy: '',
    lastModifiedBy: '',
    createOn: '',
    lastModifiedOn: '',
    Code: '',
    SubTestName: '',
    DisplayStatus: true,
    Standalone: false,
    NarrativeTitle: '',
    ListNarrativeSubTest:[],
    cancel: function () {
        confirmMessageCancel();
        $('.swal-button--danger').on('click', function () {
            window.location.href = DOMAIN_URL + 'Views/OnlineTesting/Narrative/Narrative.html';
        });
    },
    save: function () {
        save();
    },
    CategoryMappingReportListIQ: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/MappingReportTypeIQ",
                dataType: 'json'
            },
            parameterMap: function () {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: 'Data'
        }
    }),
    CategoryMappingReportListValidityScale: new kendo.data.DataSource({
        transport: {
            read: {
                type: 'POST',
                headers: { "Authorization-Token": Cookie.load() },
                url: SERVICE_URL + "api/Dropdown/MappingReportTypeValidityScale",
                dataType: 'json'
            },
            parameterMap: function () {
                var request = new Object();
                request.UserLogin = Cookie.getUser();
                return request;
            }
        },
        schema: {
            model: {
                id: "Code",
                field: "Value"
            },
            data: 'Data'
        }
    }),
});
save = function () {    
    
    var ListNarrativeSubTest = [];
    var valid = true;
    
    var TestToolCode = viewModel.TestToolNarrative == undefined ? "" : viewModel.TestToolNarrative.Code;
    var MappingReportType = viewModel.MappingReport == undefined ? "" : viewModel.MappingReport;
    var SubTestCode = viewModel.SubTestName;    
    var TypeNarrative = $.grep(viewModels.CategoryDataNarrType._data, function (element, index) {
        return element.Value == viewModel.TypeNarrative;
    });
    var NarrativeTitle = viewModel.NarrativeTitle;
    ListNarrativeSubTest = viewModel.ListNarrativeSubTest.toJSON();
    
    if (NarrativeTitle == '' || TypeNarrative == '' || valid == false) {
        swal('Failed', 'Please Fill Mandatory!!!', 'warning', { closeOnClickOutside: false });        
    } else {
        if (viewModel.Code == '' || viewModel.Code == undefined || viewModel.Code == null) {
            confirmMessageAdd();
            var sendData;
            if (TypeNarrative[0].Code == "SUBTEST") {
                sendData = {
                    TestToolCode: TestToolCode,
                    SubTestCode: SubTestCode,
                    Title: NarrativeTitle,
                    NarrativeTypeCode: TypeNarrative[0].Code,
                    DisplayStatus: viewModel.DisplayStatus,
                    ListNarrativeSubTest: ListNarrativeSubTest
                };
            } else if (TypeNarrative[0].Code == "IQ") {
                sendData = {
                    MappingReportTypeCode: $("#MappingReport").data("kendoMultiSelect").value(),
                    Title: NarrativeTitle,
                    NarrativeTypeCode: TypeNarrative[0].Code,
                    DisplayStatus: viewModel.DisplayStatus,
                    ListNarrativeIQ: ListNarrativeSubTest
                };
            } else {
                var ListNarrativeValidityScale = [
                    {
                        "Score": "Pass",
                        "Narrative": $("#NarrativeValidityScale1").val()
                    },
                    {
                        "Score": "Reconfirm",
                        "Narrative": $("#NarrativeValidityScale2").val()
                    }
                ]
                sendData = {
                    MappingReportTypeCode: $("#MappingReport").data("kendoMultiSelect").value(),
                    Title: NarrativeTitle,
                    NarrativeTypeCode: TypeNarrative[0].Code,
                    DisplayStatus: viewModel.DisplayStatus,
                    ListNarrativeValidityScale: ListNarrativeValidityScale
                };
            }
            
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/Narrative/Save",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: sendData,
                    success: function (response) {
                        //console.log(response);
                        if (response.Acknowledge < 1) {
                            LoadingMask.hide();
                            swal("Failed", response.Message != 0 ? response.Message : 'Data not been save!!!', "warning", { closeOnClickOutside: false });
                        }
                        else {
                            LoadingMask.hide();
                            swal("Good", "Narrative Has Been Saved", "success", { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + "Views/OnlineTesting/Narrative/Narrative.html";
                            });
                        }

                    },
                    error: function (xhr, status, error) {
                        alert("Error");
                        LoadingMask.hide();
                    }
                });
            });
        } else {
            var sendData;
            if (TypeNarrative[0].Code == "SUBTEST") {
                sendData = {
                    NarrativeCode: viewModel.Code,
                    TestToolCode: TestToolCode,
                    SubTestCode: SubTestCode,
                    Title: NarrativeTitle,
                    NarrativeTypeCode: TypeNarrative[0].Code,
                    DisplayStatus: viewModel.DisplayStatus,
                    ListNarrativeSubTest: ListNarrativeSubTest
                };
            } else {
                var MappingReportTypeCode = viewModel.MappingReport
                if (TypeNarrative[0].Code == "IQ") {
                    sendData = {
                        NarrativeCode: viewModel.Code,
                        MappingReportTypeCode: $("#MappingReport").data("kendoMultiSelect").value(),
                        Title: NarrativeTitle,
                        NarrativeTypeCode: TypeNarrative[0].Code,
                        DisplayStatus: viewModel.DisplayStatus,
                        ListNarrativeIQ: ListNarrativeSubTest
                    };
                } else {
                    var ListNarrativeValidityScale = [
                        {
                            "Score": "Pass",
                            "Narrative": $("#NarrativeValidityScale1").val()
                        },
                        {
                            "Score": "Reconfirm",
                            "Narrative": $("#NarrativeValidityScale2").val()
                        }
                    ]
                    sendData = {
                        NarrativeCode: viewModel.Code,
                        MappingReportTypeCode: $("#MappingReport").data("kendoMultiSelect").value(),
                        Title: NarrativeTitle,
                        NarrativeTypeCode: TypeNarrative[0].Code,
                        DisplayStatus: viewModel.DisplayStatus,
                        ListNarrativeValidityScale: ListNarrativeValidityScale
                    };
                }

            }
            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/Narrative/Edit",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: sendData,
                    success: function (response) {
                        //console.log(response);
                        if (response.Acknowledge < 1) {
                            LoadingMask.hide();
                            swal("Failed", response.Message, "warning", { closeOnClickOutside: false });
                        }
                        else {
                            LoadingMask.hide();
                            swal("Good", "Narrative Has Been Edited", "success", { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + "Views/OnlineTesting/Narrative/Narrative.html";
                            });
                        }

                    },
                    error: function (xhr, status, error) {
                        alert("Error");
                        LoadingMask.hide();
                    }
                });
            });
        }
    }
}