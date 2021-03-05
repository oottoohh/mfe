var viewModel = kendo.observable({
    ConfigLayoutCode: "",
    CompanyList: [],
    CompanyId: "",
    CompanyName: "",
    MappingReportTypeList: [],
    MappingReportTypeCode: '',
    MappingReportTypeName: '',
    DisplayStatus: true,

    TitleCover: "",
    ConfigLayoutCoverValueList: [],
    ConfigLayoutCoverValueCode: "",
    ConfigLayoutCoverValueName: "",
    Cover: {
        Title: "",
        Values: [],
        Disclaimer: ""
    },
    SelectedCoverValueList: [],
    DisclaimerText: "",

    TitleContent: "",

    TitleCandidateInformation: "",
    DisplayStatusCandidateInformation: true,
    CandidateInformationFieldName: "",
    CandidateInformationValueList: [],
    CandidateInformationValueCode: "",
    CandidateInformationValueName: "",
    Fields: [{
        FieldName: "",
        ValueCode: ""
    }],

    TitlePsychogram: "",
    DisplayStatusPsychogram: true,

    TitlePsychogramAbility: "",
    DisplayStatusPsychogramAbility: true,

    TitlePsychogramPersonality: "",
    DisplayStatusPsychogramPersonality: true,

    TitleNarrativesGroupNarratives: "",
    DisplayStatusNarrativesGroupNarratives: true,

    DisplayStatusSubTestNarrative: true,
    IsAllNarrativeSubTestNarrative: true,
    IsNotAllNarrativeSubTestNarrative: false,
    IsHighestScoreSubTestNarrative: false,
    IsLowestScoreSubTestNarrative: false,

    DisplayStatusSubTestNarrativeShort: true,
    IsAllNarrativeSubTestNarrativeShort: true,
    IsNotAllNarrativeSubTestNarrativeShort: false,
    IsHighestScoreSubTestNarrativeShort: false,
    IsLowestScoreSubTestNarrativeShort: false,

    DisplayStatusSubTestNarrativeLong: true,
    IsAllNarrativeSubTestNarrativeLong: true,
    IsNotAllNarrativeSubTestNarrativeLong: false,
    IsHighestScoreSubTestNarrativeLong: false,
    IsLowestScoreSubTestNarrativeLong: false,

    DisplayStatusSubTestCuttingNarrative: true,
    IsAllNarrativeSubTestCuttingNarrative: true,
    IsNotAllNarrativeSubTestCuttingNarrative: false,
    IsHighestScoreSubTestCuttingNarrative: false,
    IsLowestScoreSubTestCuttingNarrative: false,

    DisplayStatusSubTestCuttingNarrativeShort: true,
    IsAllNarrativeSubTestCuttingNarrativeShort: true,
    IsNotAllNarrativeSubTestCuttingNarrativeShort: false,
    IsHighestScoreSubTestCuttingNarrativeShort: false,
    IsLowestScoreSubTestCuttingNarrativeShort: false,

    DisplayStatusSubTestCuttingNarrativeLong: true,
    IsAllNarrativeSubTestCuttingNarrativeLong: true,
    IsNotAllNarrativeSubTestCuttingNarrativeLong: false,
    IsHighestScoreSubTestCuttingNarrativeLong: false,
    IsLowestScoreSubTestCuttingNarrativeLong: false,

    DisplayStatusIQNarrative: true,
    DisplayStatusValidityScaleNarrative: true,
    DisplayStatusGroupNarrative: true,
    NarrativeSequence: [],

    TitleStrengthArea: "",
    DisplayStatusStrengthArea: true,

    TitleDevelopmentArea: "",
    DisplayStatusDevelopmentArea: true,

    hideTabCover: function (e) {
        hideTabCover(e);
    },
    showTabCover: function (e) {
        showTabCover(e);
    },
    hideTabContent: function (e) {
        hideTabContent(e);
    },
    showTabContent: function (e) {
        showTabContent(e);
    },
    hideTabCandidateInformation: function (e) {
        hideTabCandidateInformation(e);
    },
    showTabCandidateInformation: function (e) {
        showTabCandidateInformation(e);
    },
    save: function () {
        save();
    },
    cancel: function (e) {
        confirmMessageCancel();
        $('.swal-button--cancel').on('click', function () {
        });
        $('.swal-button--danger').on('click', function () {
            window.location.href = DOMAIN_URL + "Views/OnlineTesting/ConfigLayoutReport/ConfigLayoutReport.html";
        });
    }
});

hideTabCover = function (e) {
    $('#coverBox').attr('hidden', true);
    $('.arrowCover2').removeAttr('hidden', 'hidden');
    $('.arrowCover1').attr('hidden', true);
}
showTabCover = function (e) {
    $('#coverBox').removeAttr('hidden', 'hidden');
    $('.arrowCover2').attr('hidden', true);
    $('.arrowCover1').removeAttr('hidden', 'hidden');
}

hideTabContent = function (e) {
    $('#contentBox').attr('hidden', true);
    $('.arrowContent2').removeAttr('hidden', 'hidden');
    $('.arrowContent1').attr('hidden', true);
}
showTabContent = function (e) {
    $('#contentBox').removeAttr('hidden', 'hidden');
    $('.arrowContent2').attr('hidden', true);
    $('.arrowContent1').removeAttr('hidden', 'hidden');
}

hideTabCandidateInformation = function (e) {
    $('#CandidateInformationBox').attr('hidden', true);
    $('.arrowCandidateInformation2').removeAttr('hidden', 'hidden');
    $('.arrowCandidateInformation1').attr('hidden', true);
}
showTabCandidateInformation = function (e) {
    $('#CandidateInformationBox').removeAttr('hidden', 'hidden');
    $('.arrowCandidateInformation2').attr('hidden', true);
    $('.arrowCandidateInformation1').removeAttr('hidden', 'hidden');
}

save = function () {
    var valTitlePsychogramAbility = $('#TitlePsychogramAbility').val()
    var valTitlePsychogramPersonality = $('#TitlePsychogramPersonality').val()
    var valTitleNarrativesGroupNarratives = $('#TitleNarrativesGroupNarratives').val()
    var valTitleStrengthArea = $('#TitleStrengthArea').val()
    var valTitleDevelopmentArea = $('#TitleDevelopmentArea').val()

    var valHighestScoreTotalDisplaySubTestNarrative = parseInt($('#HighestScoreTotalDisplaySubTestNarrative').val() == "" ? 0 : $('#HighestScoreTotalDisplaySubTestNarrative').val())
    var valLowestScoreTotalDisplaySubTestNarrative = parseInt($('#LowestScoreTotalDisplaySubTestNarrative').val() == "" ? 0 : $('#LowestScoreTotalDisplaySubTestNarrative').val())
    var valHighestScoreTotalDisplaySubTestNarrativeShort = parseInt($('#HighestScoreTotalDisplaySubTestNarrativeShort').val() == "" ? 0 : $('#HighestScoreTotalDisplaySubTestNarrativeShort').val())
    var valLowestScoreTotalDisplaySubTestNarrativeShort = parseInt($('#LowestScoreTotalDisplaySubTestNarrativeShort').val() == "" ? 0 : $('#LowestScoreTotalDisplaySubTestNarrativeShort').val())
    var valHighestScoreTotalDisplaySubTestNarrativeLong = parseInt($('#HighestScoreTotalDisplaySubTestNarrativeLong').val() == "" ? 0 : $('#HighestScoreTotalDisplaySubTestNarrativeLong').val())
    var valLowestScoreTotalDisplaySubTestNarrativeLong = parseInt($('#LowestScoreTotalDisplaySubTestNarrativeLong').val() == "" ? 0 : $('#LowestScoreTotalDisplaySubTestNarrativeLong').val())

    var valHighestScoreTotalDisplaySubTestCuttingNarrative = parseInt($('#HighestScoreTotalDisplaySubTestCuttingNarrative').val() == "" ? 0 : $('#HighestScoreTotalDisplaySubTestCuttingNarrative').val())
    var valLowestScoreTotalDisplaySubTestCuttingNarrative = parseInt($('#LowestScoreTotalDisplaySubTestCuttingNarrative').val() == "" ? 0 : $('#LowestScoreTotalDisplaySubTestCuttingNarrative').val())
    var valHighestScoreTotalDisplaySubTestCuttingNarrativeShort = parseInt($('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort').val() == "" ? 0 : $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort').val())
    var valLowestScoreTotalDisplaySubTestCuttingNarrativeShort = parseInt($('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort').val() == "" ? 0 : $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort').val())
    var valHighestScoreTotalDisplaySubTestCuttingNarrativeLong = parseInt($('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong').val() == "" ? 0 : $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong').val())
    var valLowestScoreTotalDisplaySubTestCuttingNarrativeLong = parseInt($('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong').val() == "" ? 0 : $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong').val())

    var ConfigLayoutCode = viewModel.ConfigLayoutCode
    var CompanyId = viewModel.CompanyId
    var MappingReportTypeCode = viewModel.MappingReportTypeCode
    var DisplayStatus = viewModel.DisplayStatus

    var TitleCover = viewModel.TitleCover
    var Value = viewModel.Cover.Values
    var DisclaimerText = viewModel.DisclaimerText

    var TitleContent = viewModel.TitleContent

    var TitleCandidateInformation = viewModel.TitleCandidateInformation
    var DisplayStatusCandidateInformation = viewModel.DisplayStatusCandidateInformation
    var Fields = viewModel.Fields

    var TitlePsychogram = viewModel.TitlePsychogram
    var DisplayStatusPsychogram = viewModel.DisplayStatusPsychogram
    var TitlePsychogramAbility = valTitlePsychogramAbility
    var DisplayStatusPsychogramAbility = viewModel.DisplayStatusPsychogramAbility
    var TitlePsychogramPersonality = valTitlePsychogramPersonality
    var DisplayStatusPsychogramPersonality = viewModel.DisplayStatusPsychogramPersonality

    var TitleNarrativesGroupNarratives = valTitleNarrativesGroupNarratives
    var DisplayStatusNarrativesGroupNarratives = viewModel.DisplayStatusNarrativesGroupNarratives

    var TitleStrengthArea = valTitleStrengthArea
    var DisplayStatusStrengthArea = viewModel.DisplayStatusStrengthArea

    var TitleDevelopmentArea = valTitleDevelopmentArea
    var DisplayStatusDevelopmentArea = viewModel.DisplayStatusDevelopmentArea

    if (viewModel.Cover.Values.length > 0) {
        var CoverValues = []
        for (cv = 0; cv < viewModel.Cover.Values.length; cv++) {
            CoverValues.push(viewModel.Cover.Values[cv])
        }
    }
    var Cover = {
        Title: TitleCover,
        Values: CoverValues,
        Disclaimer: DisclaimerText
    }

    //CANDIDATE INFORMATION
    if (Fields.length > 0) {
        var CandidateInformationFields = []
        for (cif = 0; cif < Fields.length; cif++) {
            var cifname =  $('#CandidateInformationFieldName' + cif).val()
            CandidateInformationFields.push({
                FieldName: cifname,
                ValueCode: Fields[cif].ValueCode
            })
        }
    }
    var CandidateInformation = {
        Title: TitleCandidateInformation,
        Fields: CandidateInformationFields,
        IsDisplay: DisplayStatusCandidateInformation
    }

    //PSYCHOGRAM
    var Psychogram = []
    if (viewModel.HasPsychogram == true) {
        if (viewModel.IsProfiling == true) {
            if (viewModel.HasPsychogramAbility == true) {
                Psychogram.push({
                    Title: TitlePsychogramAbility,
                    IsDisplay: DisplayStatusPsychogramAbility
                })
                //if (viewModel.DisplayStatusPsychogramAbility == true) {
                //    Psychogram.push({
                //        Title: TitlePsychogramAbility,
                //        IsDisplay: DisplayStatusPsychogramAbility
                //    })
                //} else {
                //    Psychogram.push({
                //        Title: TitlePsychogramAbility,
                //        IsDisplay: false
                //    })
                //}
            }
            if (viewModel.HasPsychogramPersonality == true) {
                Psychogram.push({
                    Title: TitlePsychogramPersonality,
                    IsDisplay: DisplayStatusPsychogramPersonality
                })
                //if (viewModel.DisplayStatusPsychogramPersonality == true) {
                //    Psychogram.push({
                //        Title: TitlePsychogramPersonality,
                //        IsDisplay: DisplayStatusPsychogramPersonality
                //    })
                //} else {
                //    Psychogram.push({
                //        Title: TitlePsychogramPersonality,
                //        IsDisplay: false
                //    })
                //}
            }
        } else {
            //PSYCHOGRAM AJA
            Psychogram.push({
                Title: TitlePsychogram,
                IsDisplay: DisplayStatusPsychogram
            })
            //if (viewModel.DisplayStatusPsychogram == true) {
            //    Psychogram.push({
            //        Title: TitlePsychogram,
            //        IsDisplay: DisplayStatusPsychogram
            //    })
            //} else {
            //    Psychogram.push({
            //        Title: TitlePsychogram,
            //        IsDisplay: false
            //    })
            //}
        }
    }

    //NARRATIVES & GROUP NARRATIVES
    var Narrative = []
    if (viewModel.IsProfiling == true) {
        for (tti = 0; tti < viewModel.TestToolInfosLength; tti++) {
            if (viewModel.TestToolInfosLength <= 1) {
                if (($('#NarrativesGroupNarratives > .form-content ul').children()).length > 0) {
                    var NarrativeSequence = []
                    var ulLength = ($('#NarrativesGroupNarratives > .form-content ul').children()).length
                    for (ul = 0; ul < ulLength; ul++) {
                        if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).css('display') == "block") {
                            NarrativeSequence.push($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('data-type'))
                        }
                    }
                }

                if (viewModel.HasSubTestNarrative == true) {
                    //if (viewModel.DisplayStatusSubTestNarrative == true) {
                    //    Narrative.push({
                    //        Title: TitleNarrativesGroupNarratives,
                    //        IsDisplaySubTestNarrative: viewModel.DisplayStatusSubTestNarrative,
                    //        IsDisplayIQNarrative: viewModel.DisplayStatusIQNarrative,
                    //        IsDisplayValidityScaleNarrative: viewModel.DisplayStatusValidityScaleNarrative,
                    //        IsDisplayGroupNarrative: viewModel.DisplayStatusGroupNarrative,
                    //        IsAllNarrative: viewModel.IsAllNarrativeSubTestNarrative == "on" ? true : viewModel.IsAllNarrativeSubTestNarrative == true ? true : false,
                    //        IsHighestScore: viewModel.IsHighestScoreSubTestNarrative,
                    //        IsLowestScore: viewModel.IsLowestScoreSubTestNarrative,
                    //        HighestScoreTotalDisplay: valHighestScoreTotalDisplaySubTestNarrative,
                    //        LowestScoreTotalDisplay: valLowestScoreTotalDisplaySubTestNarrative,
                    //        IsDisplay: DisplayStatusNarrativesGroupNarratives,
                    //        NarrativeSequence: NarrativeSequence
                    //    })
                    //} else
                    if (viewModel.HasSubTestNarrativeShort == true) {
                        Narrative.push({
                            Title: TitleNarrativesGroupNarratives,
                            IsDisplaySubTestNarrative: viewModel.DisplayStatusSubTestNarrativeShort,
                            IsDisplayIQNarrative: viewModel.DisplayStatusIQNarrative,
                            IsDisplayValidityScaleNarrative: viewModel.DisplayStatusValidityScaleNarrative,
                            IsDisplayGroupNarrative: viewModel.DisplayStatusGroupNarrative,
                            IsAllNarrative: viewModel.IsAllNarrativeSubTestNarrativeShort == "on" ? true : viewModel.IsAllNarrativeSubTestNarrativeShort == true ? true : false,
                            IsHighestScore: viewModel.IsHighestScoreSubTestNarrativeShort,
                            IsLowestScore: viewModel.IsLowestScoreSubTestNarrativeShort,
                            HighestScoreTotalDisplay: valHighestScoreTotalDisplaySubTestNarrativeShort,
                            LowestScoreTotalDisplay: valLowestScoreTotalDisplaySubTestNarrativeShort,
                            IsDisplay: DisplayStatusNarrativesGroupNarratives,
                            NarrativeSequence: NarrativeSequence
                        })
                    } else if (viewModel.HasSubTestNarrativeLong == true) {
                        Narrative.push({
                            Title: TitleNarrativesGroupNarratives,
                            IsDisplaySubTestNarrative: viewModel.DisplayStatusSubTestNarrativeLong,
                            IsDisplayIQNarrative: viewModel.DisplayStatusIQNarrative,
                            IsDisplayValidityScaleNarrative: viewModel.DisplayStatusValidityScaleNarrative,
                            IsDisplayGroupNarrative: viewModel.DisplayStatusGroupNarrative,
                            IsAllNarrative: viewModel.IsAllNarrativeSubTestNarrativeLong == "on" ? true : viewModel.IsAllNarrativeSubTestNarrativeLong == true ? true : false,
                            IsHighestScore: viewModel.IsHighestScoreSubTestNarrativeLong,
                            IsLowestScore: viewModel.IsLowestScoreSubTestNarrativeLong,
                            HighestScoreTotalDisplay: valHighestScoreTotalDisplaySubTestNarrativeLong,
                            LowestScoreTotalDisplay: valLowestScoreTotalDisplaySubTestNarrativeLong,
                            IsDisplay: DisplayStatusNarrativesGroupNarratives,
                            NarrativeSequence: NarrativeSequence
                        })
                    }
                } else if (viewModel.HasSubTestCuttingNarrative == true) {
                    //if (viewModel.DisplayStatusSubTestCuttingNarrative == true) {
                    //    Narrative.push({
                    //        Title: TitleNarrativesGroupNarratives,
                    //        IsDisplaySubTestNarrative: viewModel.DisplayStatusSubTestCuttingNarrative,
                    //        IsDisplayIQNarrative: viewModel.DisplayStatusIQNarrative,
                    //        IsDisplayValidityScaleNarrative: viewModel.DisplayStatusValidityScaleNarrative,
                    //        IsDisplayGroupNarrative: viewModel.DisplayStatusGroupNarrative,
                    //        IsAllNarrative: viewModel.IsAllNarrativeSubTestCuttingNarrative == "on" ? true : viewModel.IsAllNarrativeSubTestCuttingNarrative == true ? true : false,
                    //        IsHighestScore: viewModel.IsHighestScoreSubTestCuttingNarrative,
                    //        IsLowestScore: viewModel.IsLowestScoreSubTestCuttingNarrative,
                    //        HighestScoreTotalDisplay: valHighestScoreTotalDisplaySubTestCuttingNarrative,
                    //        LowestScoreTotalDisplay: valLowestScoreTotalDisplaySubTestCuttingNarrative,
                    //        IsDisplay: DisplayStatusNarrativesGroupNarratives,
                    //        NarrativeSequence: NarrativeSequence
                    //    })
                    //} else
                    if (viewModel.HasSubTestCuttingNarrativeShort == true) {
                        Narrative.push({
                            Title: TitleNarrativesGroupNarratives,
                            IsDisplaySubTestNarrative: viewModel.DisplayStatusSubTestCuttingNarrativeShort,
                            IsDisplayIQNarrative: viewModel.DisplayStatusIQNarrative,
                            IsDisplayValidityScaleNarrative: viewModel.DisplayStatusValidityScaleNarrative,
                            IsDisplayGroupNarrative: viewModel.DisplayStatusGroupNarrative,
                            IsAllNarrative: viewModel.IsAllNarrativeSubTestCuttingNarrativeShort == "on" ? true : viewModel.IsAllNarrativeSubTestCuttingNarrativeShort == true ? true : false,
                            IsHighestScore: viewModel.IsHighestScoreSubTestCuttingNarrativeShort,
                            IsLowestScore: viewModel.IsLowestScoreSubTestCuttingNarrativeShort,
                            HighestScoreTotalDisplay: valHighestScoreTotalDisplaySubTestCuttingNarrativeShort,
                            LowestScoreTotalDisplay: valLowestScoreTotalDisplaySubTestCuttingNarrativeShort,
                            IsDisplay: DisplayStatusNarrativesGroupNarratives,
                            NarrativeSequence: NarrativeSequence
                        })
                    } else if (viewModel.HasSubTestCuttingNarrativeLong == true) {
                        Narrative.push({
                            Title: TitleNarrativesGroupNarratives,
                            IsDisplaySubTestNarrative: viewModel.DisplayStatusSubTestCuttingNarrativeLong,
                            IsDisplayIQNarrative: viewModel.DisplayStatusIQNarrative,
                            IsDisplayValidityScaleNarrative: viewModel.DisplayStatusValidityScaleNarrative,
                            IsDisplayGroupNarrative: viewModel.DisplayStatusGroupNarrative,
                            IsAllNarrative: viewModel.IsAllNarrativeSubTestCuttingNarrativeLong == "on" ? true : viewModel.IsAllNarrativeSubTestCuttingNarrativeLong == true ? true : false,
                            IsHighestScore: viewModel.IsHighestScoreSubTestCuttingNarrativeLong,
                            IsLowestScore: viewModel.IsLowestScoreSubTestCuttingNarrativeLong,
                            HighestScoreTotalDisplay: valHighestScoreTotalDisplaySubTestCuttingNarrativeLong,
                            LowestScoreTotalDisplay: valLowestScoreTotalDisplaySubTestCuttingNarrativeLong,
                            IsDisplay: DisplayStatusNarrativesGroupNarratives,
                            NarrativeSequence: NarrativeSequence
                        })
                    }
                } else {
                    Narrative.push({
                        Title: TitleNarrativesGroupNarratives,
                        IsDisplaySubTestNarrative: false,
                        IsDisplayIQNarrative: viewModel.DisplayStatusIQNarrative,
                        IsDisplayValidityScaleNarrative: viewModel.DisplayStatusValidityScaleNarrative,
                        IsDisplayGroupNarrative: viewModel.DisplayStatusGroupNarrative,
                        IsAllNarrative: false,
                        IsHighestScore: false,
                        IsLowestScore: false,
                        HighestScoreTotalDisplay: 0,
                        LowestScoreTotalDisplay: 0,
                        IsDisplay: DisplayStatusNarrativesGroupNarratives,
                        NarrativeSequence: NarrativeSequence
                    })
                }
            }
            else {
                if (($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length > 0) {
                    var NarrativeSequence = []
                    var ulLength = ($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length
                    for (ul = 0; ul < ulLength; ul++) {
                        if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).css('display') == "block") {
                            NarrativeSequence.push($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).attr('data-type'))
                        }
                    }
                }

                var valttiHighestScoreTotalDisplaySubTestNarrative = parseInt($('#HighestScoreTotalDisplaySubTestNarrative' + tti).val() == "" ? 0 : $('#HighestScoreTotalDisplaySubTestNarrative' + tti).val())
                var valttiLowestScoreTotalDisplaySubTestNarrative = parseInt($('#LowestScoreTotalDisplaySubTestNarrative' + tti).val() == "" ? 0 : $('#LowestScoreTotalDisplaySubTestNarrative' + tti).val())
                var valttiHighestScoreTotalDisplaySubTestNarrativeShort = parseInt($('#HighestScoreTotalDisplaySubTestNarrativeShort' + tti).val() == "" ? 0 : $('#HighestScoreTotalDisplaySubTestNarrativeShort' + tti).val())
                var valttiLowestScoreTotalDisplaySubTestNarrativeShort = parseInt($('#LowestScoreTotalDisplaySubTestNarrativeShort' + tti).val() == "" ? 0 : $('#LowestScoreTotalDisplaySubTestNarrativeShort' + tti).val())
                var valttiHighestScoreTotalDisplaySubTestNarrativeLong = parseInt($('#HighestScoreTotalDisplaySubTestNarrativeLong' + tti).val() == "" ? 0 : $('#HighestScoreTotalDisplaySubTestNarrativeLong' + tti).val())
                var valttiLowestScoreTotalDisplaySubTestNarrativeLong = parseInt($('#LowestScoreTotalDisplaySubTestNarrativeLong' + tti).val() == "" ? 0 : $('#LowestScoreTotalDisplaySubTestNarrativeLong' + tti).val())

                var valttiHighestScoreTotalDisplaySubTestCuttingNarrative = parseInt($('#HighestScoreTotalDisplaySubTestCuttingNarrative' + tti).val() == "" ? 0 : $('#HighestScoreTotalDisplaySubTestCuttingNarrative' + tti).val())
                var valttiLowestScoreTotalDisplaySubTestCuttingNarrative = parseInt($('#LowestScoreTotalDisplaySubTestCuttingNarrative' + tti).val() == "" ? 0 : $('#LowestScoreTotalDisplaySubTestCuttingNarrative' + tti).val())
                var valttiHighestScoreTotalDisplaySubTestCuttingNarrativeShort = parseInt($('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).val() == "" ? 0 : $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).val())
                var valttiLowestScoreTotalDisplaySubTestCuttingNarrativeShort = parseInt($('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).val() == "" ? 0 : $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).val())
                var valttiHighestScoreTotalDisplaySubTestCuttingNarrativeLong = parseInt($('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).val() == "" ? 0 : $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).val())
                var valttiLowestScoreTotalDisplaySubTestCuttingNarrativeLong = parseInt($('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).val() == "" ? 0 : $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).val())

                if (viewModel.get('HasSubTestNarrative' + tti) == true) {
                    //if (viewModel.get('DisplayStatusSubTestNarrative' + tti) == true) {
                    //    Narrative.push({
                    //        Title: $('#TitleNarrativesGroupNarratives' + tti).val(),
                    //        IsDisplaySubTestNarrative: viewModel.get('DisplayStatusSubTestNarrative' + tti),
                    //        IsDisplayIQNarrative: viewModel.get('DisplayStatusIQNarrative' + tti),
                    //        IsDisplayValidityScaleNarrative: viewModel.get('DisplayStatusValidityScaleNarrative' + tti),
                    //        IsDisplayGroupNarrative: viewModel.get('DisplayStatusGroupNarrative' + tti),
                    //        IsAllNarrative: viewModel.get('IsAllNarrativeSubTestNarrative' + tti) == "on" ? true : viewModel.get('IsAllNarrativeSubTestNarrative' + tti) == true ? true : false,
                    //        IsHighestScore: viewModel.get('IsHighestScoreSubTestNarrative' + tti),
                    //        IsLowestScore: viewModel.get('IsLowestScoreSubTestNarrative' + tti),
                    //        HighestScoreTotalDisplay: valttiHighestScoreTotalDisplaySubTestNarrative,
                    //        LowestScoreTotalDisplay: valttiLowestScoreTotalDisplaySubTestNarrative,
                    //        IsDisplay: viewModel.get('DisplayStatusNarrativesGroupNarratives' + tti),
                    //        NarrativeSequence: NarrativeSequence
                    //    })
                    //} else
                    if (viewModel.get('HasSubTestNarrativeShort' + tti) == true) {
                        Narrative.push({
                            Title: $('#TitleNarrativesGroupNarratives' + tti).val(),
                            IsDisplaySubTestNarrative: viewModel.get('DisplayStatusSubTestNarrativeShort' + tti),
                            IsDisplayIQNarrative: viewModel.get('DisplayStatusIQNarrative' + tti),
                            IsDisplayValidityScaleNarrative: viewModel.get('DisplayStatusValidityScaleNarrative' + tti),
                            IsDisplayGroupNarrative: viewModel.get('DisplayStatusGroupNarrative' + tti),
                            IsAllNarrative: viewModel.get('IsAllNarrativeSubTestNarrativeShort' + tti) == "on" ? true : viewModel.get('IsAllNarrativeSubTestNarrativeShort' + tti) == true ? true : false,
                            IsHighestScore: viewModel.get('IsHighestScoreSubTestNarrativeShort' + tti),
                            IsLowestScore: viewModel.get('IsLowestScoreSubTestNarrativeShort' + tti),
                            HighestScoreTotalDisplay: valttiHighestScoreTotalDisplaySubTestNarrativeShort,
                            LowestScoreTotalDisplay: valttiLowestScoreTotalDisplaySubTestNarrativeShort,
                            IsDisplay: viewModel.get('DisplayStatusNarrativesGroupNarratives' + tti),
                            NarrativeSequence: NarrativeSequence
                        })
                    } else if (viewModel.get('HasSubTestNarrativeLong' + tti) == true) {
                        Narrative.push({
                            Title: $('#TitleNarrativesGroupNarratives' + tti).val(),
                            IsDisplaySubTestNarrative: viewModel.get('DisplayStatusSubTestNarrativeLong' + tti),
                            IsDisplayIQNarrative: viewModel.get('DisplayStatusIQNarrative' + tti),
                            IsDisplayValidityScaleNarrative: viewModel.get('DisplayStatusValidityScaleNarrative' + tti),
                            IsDisplayGroupNarrative: viewModel.get('DisplayStatusGroupNarrative' + tti),
                            IsAllNarrative: viewModel.get('IsAllNarrativeSubTestNarrativeLong' + tti) == "on" ? true : viewModel.get('IsAllNarrativeSubTestNarrativeLong' + tti) == true ? true : false,
                            IsHighestScore: viewModel.get('IsHighestScoreSubTestNarrativeLong' + tti),
                            IsLowestScore: viewModel.get('IsLowestScoreSubTestNarrativeLong' + tti),
                            HighestScoreTotalDisplay: valttiHighestScoreTotalDisplaySubTestNarrativeLong,
                            LowestScoreTotalDisplay: valttiLowestScoreTotalDisplaySubTestNarrativeLong,
                            IsDisplay: viewModel.get('DisplayStatusNarrativesGroupNarratives' + tti),
                            NarrativeSequence: NarrativeSequence
                        })
                    }
                } else if (viewModel.get('HasSubTestCuttingNarrative' + tti) == true) {
                    //if (viewModel.get('DisplayStatusSubTestCuttingNarrative' + tti) == true) {
                    //    Narrative.push({
                    //        Title: $('#TitleNarrativesGroupNarratives' + tti).val(),
                    //        IsDisplaySubTestNarrative: viewModel.get('DisplayStatusSubTestCuttingNarrative' + tti),
                    //        IsDisplayIQNarrative: viewModel.get('DisplayStatusIQNarrative' + tti),
                    //        IsDisplayValidityScaleNarrative: viewModel.get('DisplayStatusValidityScaleNarrative' + tti),
                    //        IsDisplayGroupNarrative: viewModel.get('DisplayStatusGroupNarrative' + tti),
                    //        IsAllNarrative: viewModel.get('IsAllNarrativeSubTestCuttingNarrative' + tti) == "on" ? true : viewModel.get('IsAllNarrativeSubTestCuttingNarrative' + tti) == true ? true : false,
                    //        IsHighestScore: viewModel.get('IsHighestScoreSubTestCuttingNarrative' + tti),
                    //        IsLowestScore: viewModel.get('IsLowestScoreSubTestCuttingNarrative' + tti),
                    //        HighestScoreTotalDisplay: valttiHighestScoreTotalDisplaySubTestCuttingNarrative,
                    //        LowestScoreTotalDisplay: valttiLowestScoreTotalDisplaySubTestCuttingNarrative,
                    //        IsDisplay: viewModel.get('DisplayStatusNarrativesGroupNarratives' + tti),
                    //        NarrativeSequence: NarrativeSequence
                    //    })
                    //} else
                    if (viewModel.get('HasSubTestCuttingNarrativeShort' + tti) == true) {
                        Narrative.push({
                            Title: $('#TitleNarrativesGroupNarratives' + tti).val(),
                            IsDisplaySubTestNarrative: viewModel.get('DisplayStatusSubTestCuttingNarrativeShort' + tti),
                            IsDisplayIQNarrative: viewModel.get('DisplayStatusIQNarrative' + tti),
                            IsDisplayValidityScaleNarrative: viewModel.get('DisplayStatusValidityScaleNarrative' + tti),
                            IsDisplayGroupNarrative: viewModel.get('DisplayStatusGroupNarrative' + tti),
                            IsAllNarrative: viewModel.get('IsAllNarrativeSubTestCuttingNarrativeShort' + tti) == "on" ? true : viewModel.get('IsAllNarrativeSubTestCuttingNarrativeShort' + tti) == true ? true : false,
                            IsHighestScore: viewModel.get('IsHighestScoreSubTestCuttingNarrativeShort' + tti),
                            IsLowestScore: viewModel.get('IsLowestScoreSubTestCuttingNarrativeShort' + tti),
                            HighestScoreTotalDisplay: valttiHighestScoreTotalDisplaySubTestCuttingNarrativeShort,
                            LowestScoreTotalDisplay: valttiLowestScoreTotalDisplaySubTestCuttingNarrativeShort,
                            IsDisplay: viewModel.get('DisplayStatusNarrativesGroupNarratives' + tti),
                            NarrativeSequence: NarrativeSequence
                        })
                    } else if (viewModel.get('HasSubTestCuttingNarrativeLong' + tti) == true) {
                        Narrative.push({
                            Title: $('#TitleNarrativesGroupNarratives' + tti).val(),
                            IsDisplaySubTestNarrative: viewModel.get('DisplayStatusSubTestCuttingNarrativeLong' + tti),
                            IsDisplayIQNarrative: viewModel.get('DisplayStatusIQNarrative' + tti),
                            IsDisplayValidityScaleNarrative: viewModel.get('DisplayStatusValidityScaleNarrative' + tti),
                            IsDisplayGroupNarrative: viewModel.get('DisplayStatusGroupNarrative' + tti),
                            IsAllNarrative: viewModel.get('IsAllNarrativeSubTestCuttingNarrativeLong' + tti) == "on" ? true : viewModel.get('IsAllNarrativeSubTestCuttingNarrativeLong' + tti) == true ? true : false,
                            IsHighestScore: viewModel.get('IsHighestScoreSubTestCuttingNarrativeLong' + tti),
                            IsLowestScore: viewModel.get('IsLowestScoreSubTestCuttingNarrativeLong' + tti),
                            HighestScoreTotalDisplay: valttiHighestScoreTotalDisplaySubTestCuttingNarrativeLong,
                            LowestScoreTotalDisplay: valttiLowestScoreTotalDisplaySubTestCuttingNarrativeLong,
                            IsDisplay: viewModel.get('DisplayStatusNarrativesGroupNarratives' + tti),
                            NarrativeSequence: NarrativeSequence
                        })
                    }
                }
                else {
                    Narrative.push({
                        Title: $('#TitleNarrativesGroupNarratives' + tti).val(),
                        IsDisplaySubTestNarrative: false,
                        IsDisplayIQNarrative: viewModel.get('DisplayStatusIQNarrative' + tti),
                        IsDisplayValidityScaleNarrative: viewModel.get('DisplayStatusValidityScaleNarrative' + tti),
                        IsDisplayGroupNarrative: viewModel.get('DisplayStatusGroupNarrative' + tti),
                        IsAllNarrative: false,
                        IsHighestScore: false,
                        IsLowestScore: false,
                        HighestScoreTotalDisplay: 0,
                        LowestScoreTotalDisplay: 0,
                        IsDisplay: viewModel.get('DisplayStatusNarrativesGroupNarratives' + tti),
                        NarrativeSequence: NarrativeSequence
                    })
                }
            }
        }
    }
    else {
        if (($('#NarrativesGroupNarratives > .form-content ul').children()).length > 0) {
            var NarrativeSequence = []
            var ulLength = ($('#NarrativesGroupNarratives > .form-content ul').children()).length
            for (ul = 0; ul < ulLength; ul++) {
                if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).css('display') == "block") {
                    NarrativeSequence.push($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('data-type'))
                }
            }
        }

        if (viewModel.HasSubTestNarrative == true) {
            //if (viewModel.DisplayStatusSubTestNarrative == true) {
            //    Narrative.push({
            //        Title: TitleNarrativesGroupNarratives,
            //        IsDisplaySubTestNarrative: viewModel.DisplayStatusSubTestNarrative,
            //        IsDisplayIQNarrative: viewModel.DisplayStatusIQNarrative,
            //        IsDisplayValidityScaleNarrative: viewModel.DisplayStatusValidityScaleNarrative,
            //        IsDisplayGroupNarrative: viewModel.DisplayStatusGroupNarrative,
            //        IsAllNarrative: viewModel.IsAllNarrativeSubTestNarrative == "on" ? true : viewModel.IsAllNarrativeSubTestNarrative == true ? true : false,
            //        IsHighestScore: viewModel.IsHighestScoreSubTestNarrative,
            //        IsLowestScore: viewModel.IsLowestScoreSubTestNarrative,
            //        HighestScoreTotalDisplay: valHighestScoreTotalDisplaySubTestNarrative,
            //        LowestScoreTotalDisplay: valLowestScoreTotalDisplaySubTestNarrative,
            //        IsDisplay: DisplayStatusNarrativesGroupNarratives,
            //        NarrativeSequence: NarrativeSequence
            //    })
            //} else
            if (viewModel.HasSubTestNarrativeShort == true) {
                Narrative.push({
                    Title: TitleNarrativesGroupNarratives,
                    IsDisplaySubTestNarrative: viewModel.DisplayStatusSubTestNarrativeShort,
                    IsDisplayIQNarrative: viewModel.DisplayStatusIQNarrative,
                    IsDisplayValidityScaleNarrative: viewModel.DisplayStatusValidityScaleNarrative,
                    IsDisplayGroupNarrative: viewModel.DisplayStatusGroupNarrative,
                    IsAllNarrative: viewModel.IsAllNarrativeSubTestNarrativeShort == "on" ? true : viewModel.IsAllNarrativeSubTestNarrativeShort == true ? true : false,
                    IsHighestScore: viewModel.IsHighestScoreSubTestNarrativeShort,
                    IsLowestScore: viewModel.IsLowestScoreSubTestNarrativeShort,
                    HighestScoreTotalDisplay: valHighestScoreTotalDisplaySubTestNarrativeShort,
                    LowestScoreTotalDisplay: valLowestScoreTotalDisplaySubTestNarrativeShort,
                    IsDisplay: DisplayStatusNarrativesGroupNarratives,
                    NarrativeSequence: NarrativeSequence
                })
            } else if (viewModel.HasSubTestNarrativeLong == true) {
                Narrative.push({
                    Title: TitleNarrativesGroupNarratives,
                    IsDisplaySubTestNarrative: viewModel.DisplayStatusSubTestNarrativeLong,
                    IsDisplayIQNarrative: viewModel.DisplayStatusIQNarrative,
                    IsDisplayValidityScaleNarrative: viewModel.DisplayStatusValidityScaleNarrative,
                    IsDisplayGroupNarrative: viewModel.DisplayStatusGroupNarrative,
                    IsAllNarrative: viewModel.IsAllNarrativeSubTestNarrativeLong == "on" ? true : viewModel.IsAllNarrativeSubTestNarrativeLong == true ? true : false,
                    IsHighestScore: viewModel.IsHighestScoreSubTestNarrativeLong,
                    IsLowestScore: viewModel.IsLowestScoreSubTestNarrativeLong,
                    HighestScoreTotalDisplay: valHighestScoreTotalDisplaySubTestNarrativeLong,
                    LowestScoreTotalDisplay: valLowestScoreTotalDisplaySubTestNarrativeLong,
                    IsDisplay: DisplayStatusNarrativesGroupNarratives,
                    NarrativeSequence: NarrativeSequence
                })
            }
        } else if (viewModel.HasSubTestCuttingNarrative == true) {
            //if (viewModel.DisplayStatusSubTestCuttingNarrative == true) {
            //    Narrative.push({
            //        Title: TitleNarrativesGroupNarratives,
            //        IsDisplaySubTestNarrative: viewModel.DisplayStatusSubTestCuttingNarrative,
            //        IsDisplayIQNarrative: viewModel.DisplayStatusIQNarrative,
            //        IsDisplayValidityScaleNarrative: viewModel.DisplayStatusValidityScaleNarrative,
            //        IsDisplayGroupNarrative: viewModel.DisplayStatusGroupNarrative,
            //        IsAllNarrative: viewModel.IsAllNarrativeSubTestCuttingNarrative == "on" ? true : viewModel.IsAllNarrativeSubTestCuttingNarrative == true ? true : false,
            //        IsHighestScore: viewModel.IsHighestScoreSubTestCuttingNarrative,
            //        IsLowestScore: viewModel.IsLowestScoreSubTestCuttingNarrative,
            //        HighestScoreTotalDisplay: valHighestScoreTotalDisplaySubTestCuttingNarrative,
            //        LowestScoreTotalDisplay: valLowestScoreTotalDisplaySubTestCuttingNarrative,
            //        IsDisplay: DisplayStatusNarrativesGroupNarratives,
            //        NarrativeSequence: NarrativeSequence
            //    })
            //} else
            if (viewModel.HasSubTestCuttingNarrativeShort == true) {
                Narrative.push({
                    Title: TitleNarrativesGroupNarratives,
                    IsDisplaySubTestNarrative: viewModel.DisplayStatusSubTestCuttingNarrativeShort,
                    IsDisplayIQNarrative: viewModel.DisplayStatusIQNarrative,
                    IsDisplayValidityScaleNarrative: viewModel.DisplayStatusValidityScaleNarrative,
                    IsDisplayGroupNarrative: viewModel.DisplayStatusGroupNarrative,
                    IsAllNarrative: viewModel.IsAllNarrativeSubTestCuttingNarrativeShort == "on" ? true : viewModel.IsAllNarrativeSubTestCuttingNarrativeShort == true ? true : false,
                    IsHighestScore: viewModel.IsHighestScoreSubTestCuttingNarrativeShort,
                    IsLowestScore: viewModel.IsLowestScoreSubTestCuttingNarrativeShort,
                    HighestScoreTotalDisplay: valHighestScoreTotalDisplaySubTestCuttingNarrativeShort,
                    LowestScoreTotalDisplay: valLowestScoreTotalDisplaySubTestCuttingNarrativeShort,
                    IsDisplay: DisplayStatusNarrativesGroupNarratives,
                    NarrativeSequence: NarrativeSequence
                })
            } else if (viewModel.HasSubTestCuttingNarrativeLong == true) {
                Narrative.push({
                    Title: TitleNarrativesGroupNarratives,
                    IsDisplaySubTestNarrative: viewModel.DisplayStatusSubTestCuttingNarrativeLong,
                    IsDisplayIQNarrative: viewModel.DisplayStatusIQNarrative,
                    IsDisplayValidityScaleNarrative: viewModel.DisplayStatusValidityScaleNarrative,
                    IsDisplayGroupNarrative: viewModel.DisplayStatusGroupNarrative,
                    IsAllNarrative: viewModel.IsAllNarrativeSubTestCuttingNarrativeLong == "on" ? true : viewModel.IsAllNarrativeSubTestCuttingNarrativeLong == true ? true : false,
                    IsHighestScore: viewModel.IsHighestScoreSubTestCuttingNarrativeLong,
                    IsLowestScore: viewModel.IsLowestScoreSubTestCuttingNarrativeLong,
                    HighestScoreTotalDisplay: valHighestScoreTotalDisplaySubTestCuttingNarrativeLong,
                    LowestScoreTotalDisplay: valLowestScoreTotalDisplaySubTestCuttingNarrativeLong, 
                    IsDisplay: DisplayStatusNarrativesGroupNarratives,
                    NarrativeSequence: NarrativeSequence
                })
            }
        } else {
            Narrative.push({
                Title: TitleNarrativesGroupNarratives,
                IsDisplaySubTestNarrative: false,
                IsDisplayIQNarrative: viewModel.DisplayStatusIQNarrative,
                IsDisplayValidityScaleNarrative: viewModel.DisplayStatusValidityScaleNarrative,
                IsDisplayGroupNarrative: viewModel.DisplayStatusGroupNarrative,
                IsAllNarrative: false,
                IsHighestScore: false,
                IsLowestScore: false,
                HighestScoreTotalDisplay: 0,
                LowestScoreTotalDisplay: 0,
                IsDisplay: DisplayStatusNarrativesGroupNarratives,
                NarrativeSequence: NarrativeSequence
            })
        }
    }

    //STRENGTH AREA
    var StrengthArea = {
        Title: TitleStrengthArea,
        IsDisplay: DisplayStatusStrengthArea
    }

    //DEVELOPMENT AREA
    var DevelopmentArea = {
        Title: TitleDevelopmentArea,
        IsDisplay: DisplayStatusDevelopmentArea
    }

    var Content = {
        Title: TitleContent,
        CandidateInformation: CandidateInformation,
        Psychogram: Psychogram,
        Narrative: Narrative,
        StrengthArea: StrengthArea,
        DevelopmentArea: DevelopmentArea
    }

    if (ConfigLayoutCode == '') {
        //HEADER
        if (CompanyId == '' || MappingReportTypeCode == '') {
            swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
            return;
        }
        //COVER
        if (TitleCover == '' || Cover.Values.length == 0 || DisclaimerText == '') {
            swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
            return;
        }
        if (CoverValues.length > 0) {
            for (cv = 0; cv < CoverValues.length; cv++) {
                if (CoverValues[cv] == '' || CoverValues[cv] == []) {
                    swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
                    return;
                }
            }
        }
        //CONTENT
        if (Content.Title == '') {
            swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
            return;
        }
        //CANDIDATE INFORMATION
        if (CandidateInformation.Title == '') {
            swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
            return;
        }
        if (CandidateInformationFields.length > 0) {
            for (cif = 0; cif < CandidateInformationFields.length; cif++) {
                if (CandidateInformationFields[cif].FieldName == '' || CandidateInformationFields[cif].ValueCode == '') {
                    swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
                    return;
                }
            }
        }
        //PSYCHOGRAM
        if (viewModel.HasPsychogram == true) {
            if (Psychogram.length > 0) {
                for (p = 0; p < Psychogram.length; p++) {
                    if (Psychogram[p].Title == '') {
                        swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
        }
        //NARRATIVES & GROUP NARRATIVES
        if (viewModel.HasGroupNarrative == true || viewModel.HasIQNarrative == true || viewModel.HasSubTestCuttingNarrative == true || viewModel.HasSubTestNarrative == true || viewModel.HasValidityScaleNarrative == true) {
            if (Narrative.length > 0) {
                for (n = 0; n < Narrative.length; n ++) {
                    if (Narrative[n].Title == '') {
                        swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
        }
        //STRENGTH AREA
        if (viewModel.HasStrengthArea == true) {
            if (StrengthArea.Title == '') {
                swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
                return;
            }
        }
        //DEVELOPMENT AREA
        if (viewModel.HasDevelopmentArea == true) {
            if (DevelopmentArea.Title == '') {
                swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
                return;
            }
        }

        confirmMessageAdd();
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            $.ajax({
                type: "POST",
                url: SERVICE_URL + "api/ConfigLayoutReport/Save",
                headers: { "Authorization-Token": Cookie.load() },
                data: {
                    CompanyId: CompanyId,
                    MappingReportTypeCode: MappingReportTypeCode,
                    DisplayStatus: DisplayStatus,
                    Cover: Cover,
                    Content: Content
                },
                success: function (response) {
                    if (response.Acknowledge < 1) {
                        LoadingMask.hide();
                        swal("Failed", response.Message, "warning", { closeOnClickOutside: false });
                    }
                    else {
                        LoadingMask.hide();
                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                        $('.swal-button--confirm').on('click', function () {
                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/ConfigLayoutReport/ConfigLayoutReport.html";
                        });
                    }
                },
                error: function (xhr, status, error) {
                    alert("Error");
                    LoadingMask.hide();
                }
            })
        })
    }
    else {
        //HEADER
        if (ConfigLayoutCode == '' || CompanyId == '' || MappingReportTypeCode == '') {
            swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
            return;
        }
        //COVER
        if (TitleCover == '' || Cover.Values.length == 0 || DisclaimerText == '') {
            swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
            return;
        }
        if (CoverValues.length > 0) {
            for (cv = 0; cv < CoverValues.length; cv++) {
                if (CoverValues[cv] == '' || CoverValues[cv] == []) {
                    swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
                    return;
                }
            }
        }
        //CONTENT
        if (Content.Title == '') {
            swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
            return;
        }
        //CANDIDATE INFORMATION
        if (CandidateInformation.Title == '') {
            swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
            return;
        }
        if (CandidateInformationFields.length > 0) {
            for (cif = 0; cif < CandidateInformationFields.length; cif++) {
                if (CandidateInformationFields[cif].FieldName == '' || CandidateInformationFields[cif].ValueCode == '') {
                    swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
                    return;
                }
            }
        }
        //PSYCHOGRAM
        if (viewModel.HasPsychogram == true) {
            if (Psychogram.length > 0) {
                for (p = 0; p < Psychogram.length; p++) {
                    if (Psychogram[p].Title == '') {
                        swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
        }
        //NARRATIVES & GROUP NARRATIVES
        if (viewModel.HasGroupNarrative == true || viewModel.HasIQNarrative == true || viewModel.HasSubTestCuttingNarrative == true || viewModel.HasSubTestNarrative == true || viewModel.HasValidityScaleNarrative == true) {
            if (Narrative.length > 0) {
                for (n = 0; n < Narrative.length; n++) {
                    if (Narrative[n].Title == '') {
                        swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                }
            }
        }
        //STRENGTH AREA
        if (viewModel.HasStrengthArea == true) {
            if (StrengthArea.Title == '') {
                swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
                return;
            }
        }
        //DEVELOPMENT AREA
        if (viewModel.HasDevelopmentArea == true) {
            if (DevelopmentArea.Title == '') {
                swal('Incompleted Data', 'Please Fill Mandatory Field!', 'warning', { closeOnClickOutside: false });
                return;
            }
        }

        confirmMessageAdd();
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            $.ajax({
                type: "POST",
                url: SERVICE_URL + "api/ConfigLayoutReport/Edit",
                headers: { "Authorization-Token": Cookie.load() },
                data: {
                    ConfigLayoutCode: ConfigLayoutCode,
                    CompanyId: CompanyId,
                    MappingReportTypeCode: MappingReportTypeCode,
                    DisplayStatus: DisplayStatus,
                    Cover: Cover,
                    Content: Content
                },
                success: function (response) {
                    if (response.Acknowledge < 1) {
                        LoadingMask.hide();
                        swal("Failed", response.Message, "warning", { closeOnClickOutside: false });
                    }
                    else {
                        LoadingMask.hide();
                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                        $('.swal-button--confirm').on('click', function () {
                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/ConfigLayoutReport/ConfigLayoutReport.html";
                        });
                    }
                },
                error: function (xhr, status, error) {
                    alert("Error");
                    LoadingMask.hide();
                }
            })
        })
    }
}