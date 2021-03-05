$(document).ready(function () {
    //LoadingMask.show();
    var ConfigLayoutCode = GetParameterByName('ConfigLayoutReport');
    var act = GetParameterByName('act')
    viewModel.set('act', act)
    loadData(ConfigLayoutCode)
    $(".editor").kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });
    //$(".draggable").draggable({
    //    connectToSortable: "#sortable",
    //    helper: "clone",
    //    revert: "invalid"
    //});
    kendo.bind($("body"), viewModel);
    $('#headerCoverBox').hide()
    $('#coverBox').hide()
    $('#headerContentBox').hide()
    $('#contentBox').hide()
});
$(function () {
    $('.draggable').sortable({
        connectWith: '.draggable',
        //revert: true
    });
    $('.draggable li').draggable({
        connectToSortable: '.draggable',
        revert: 'invalid'
    });
    $('ul, li').disableSelection();
});

loadData = function (data) {
    if (data == '' || data == undefined || data == null) {
        LoadingMask.show();
        CompanyLoad();
        MappingReportTypeLoad();
        ConfigLayoutCoverValueLoad();
    } else {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/ConfigLayoutReport/Detail',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                ConfigLayoutCode: data
            },
            dataType: 'json',
            success: function (response) {
                if (response.Acknowledge < 1) {
                    LoadingMask.hide();
                } else {
                    LoadingMask.hide();

                    //HEADER
                    $('#headerCoverBox').show()
                    $('#coverBox').show()
                    $('#headerContentBox').show()
                    $('#contentBox').show()
                    $('#CompanyId').attr('disabled', true);
                    $('#MappingReportTypeCode').attr('disabled', true);
                    viewModel.set('ConfigLayoutCode', response.Detail.ConfigLayoutCode)
                    viewModel.set('CompanyId', response.Detail.CompanyId)
                    viewModel.set('CompanyName', response.Detail.CompanyName)
                    viewModel.set('MappingReportTypeCode', response.Detail.MappingReportTypeCode)
                    viewModel.set('MappingReportTypeName', response.Detail.MappingReportTypeName)
                    viewModel.set('DisplayStatus', response.Detail.DisplayStatus)
                    CompanyLoad();
                    MappingReportTypeLoad();
                    //loadLayoutContent(response.Detail.MappingReportTypeCode)

                    //COVER
                    viewModel.set('TitleCover', response.Detail.Cover.Title)
                    viewModel.set('DisclaimerText', response.Detail.Cover.Disclaimer)
                    if (response.Detail.Cover.Values.length > 0) {
                        var Values = []

                        $('li#CoverValue > span input#ConfigLayoutCoverValueCode0').length == 1 ?
                                $('li#CoverValue > span input#ConfigLayoutCoverValueCode0').remove() : null

                        $('li#CoverValue > span').length == 1 ?
                            $('li#CoverValue > span').remove() : null

                        $('li#CoverValue > a#addCoverValue').length == 1 ?
                            $('li#CoverValue > a#addCoverValue').remove() : null

                        for (val = 0; val < response.Detail.Cover.Values.length; val++) {
                            Values.push(response.Detail.Cover.Values[val])
                            if (val == 0) {
                                $('li#CoverValue').append(
                                    '<div id="CoverValue' + val + '" style="padding-top:0.3%">' +
                                        '<label style="padding-left:0.5%"></label>' +
                                        '<input id="ConfigLayoutCoverValueCode' + val + '" name="ConfigLayoutCoverValueCode' + val + '" data-role="combobox" style="width:25%" data-bind="value: Cover.Values[' + val + ']" placeholder="Select Type..">' +
                                        '<a id="addCoverValue" class="k-button k-primary btn-form" no="0" onclick="addEditCoverValue(this)">Add</a>' +
                                    '</div>'
                                )
                                $('#ConfigLayoutCoverValueCode' + val).val(Values[val]);
                            } else {
                                $('li#CoverValue').append(
                                    '<div id="CoverValue' + val + '" style="padding-top:0.3%">' +
                                        '<label style="padding-left:0.5%"></label>' +
                                        '<input id="ConfigLayoutCoverValueCode' + val + '" name="ConfigLayoutCoverValueCode' + val + '" data-role="combobox" style="width:25%" data-bind="value: Cover.Values[' + val + ']" placeholder="Select Type..">' +
                                        '<a id="deleteCoverValue' + val + '" class="k-button" style="border-color:#fff" no="' + val + '" onclick="deleteCoverValue(this)"><i class="fas fa-trash-alt"></i></a>' +
                                    '</div>'
                                )
                                $('li#CoverValue > div#CoverValue' + (val - 1) + ' a#deleteCoverValue' + (val - 1)).hide();
                                $('#ConfigLayoutCoverValueCode' + val).val(Values[val]);
                            }
                            ConfigLayoutCoverValueLoad(val);
                        }
                        viewModel.Cover.set('Values', Values)
                    }

                    //CONTENT
                    viewModel.set('TitleContent', response.Detail.Content.Title)

                    //CANDIDATE INFORMATION
                    viewModel.set('TitleCandidateInformation', response.Detail.Content.CandidateInformation.Title)
                    viewModel.set('DisplayStatusCandidateInformation', response.Detail.Content.CandidateInformation.IsDisplay)
                    if (viewModel.DisplayStatusCandidateInformation == false) {
                        $('#DisplayStatusCandidateInformation').attr('checked', false)
                        $('#DisplayStatusCandidateInformation').attr('onchange', 'DisplayStatusCandidateInformationChecked(this)')
                    } else {
                        $('#DisplayStatusPsychogram').val(response.Detail.Content.CandidateInformation.IsDisplay)
                    }
                    if (response.CandidateInformationDropdown.length < 1) {
                        swal("Failed", response.Message, "warning", { closeOnClickOutside: false });
                        return;
                    } else {
                        viewModel.set('CandidateInformationValueList', response.CandidateInformationDropdown)
                        //dropDownCandidateInformationValue();
                    }
                    if (response.Detail.Content.CandidateInformation.Fields.length > 0) {
                        var Fields = []

                        $('#addFieldCandidateInformation').attr('onclick', 'addEditFieldCandidateInformation(this)');

                        $('li#FieldValue > input#CandidateInformationFieldName0').length == 1 ?
                                $('li#FieldValue > input#CandidateInformationFieldName0').remove() : null

                        $('li#FieldValue > span').length == 1 ?
                            $('li#FieldValue > span').remove() : null

                        for (fie = 0; fie < response.Detail.Content.CandidateInformation.Fields.length; fie++) {
                            Fields.push({
                                FieldName: response.Detail.Content.CandidateInformation.Fields[fie].FieldName,
                                ValueCode: response.Detail.Content.CandidateInformation.Fields[fie].ValueCode
                            })
                            $('li#FieldValue').append(
                                '<div id="FieldValue' + fie + '" style="padding-top:0.3%">' +
                                    '<input id="CandidateInformationFieldName' + fie +'" name="CandidateInformationFieldName' + fie +'" noField="' + fie +'" style="width:25%" data-bind="value: Fields[' + fie +'].FieldName" />' +
                                    '<input id="CandidateInformationValue' + fie + '" name="CandidateInformationValue' + fie + '" noValue="' + fie +'" data-role="combobox" style="width:25%; padding-left:0.4%" data-bind="value: Fields[' + fie +'].ValueCode" placeholder="Select Type.." />' +
                                    '<a id="deleteFieldValue' + fie + '" class="k-button" style="border-color:#fff" noField="' + fie + '" onclick="deleteFieldValue(this)"><i class="fas fa-trash-alt"></i></a>' +
                                '</div>'
                            )
                            $('li#FieldValue > div#FieldValue' + (fie - 1) + ' a#deleteFieldValue' + (fie - 1)).hide();
                            $('#CandidateInformationFieldName' + fie).val(Fields[fie].FieldName);
                            $('#CandidateInformationValue' + fie).val(response.Detail.Content.CandidateInformation.Fields[fie].ValueName);
                            dropDownCandidateInformationValue(fie)
                        }
                        viewModel.set('Fields', Fields)
                    }

                    //NARRATIVES & GROUP NARRATIVES
                    var Narrative = []
                    var NarrativeSequence = []
                    if (response.Detail.Content.Narrative.length > 0) {
                        for (nar = 0; nar < response.Detail.Content.Narrative.length; nar++) {
                            for (narseq = 0; narseq < response.Detail.Content.Narrative[nar].NarrativeSequence; narseq++) {
                                NarrativeSequence.push(response.Detail.Content.Narrative[nar].NarrativeSequence[narseq])
                            }
                            Narrative.push({
                                Title: response.Detail.Content.Narrative[nar].Title,
                                IsDisplaySubTestNarrative: response.Detail.Content.Narrative[nar].IsDisplaySubTestNarrative,
                                IsDisplayIQNarrative: response.Detail.Content.Narrative[nar].IsDisplayIQNarrative,
                                IsDisplayValidityScaleNarrative: response.Detail.Content.Narrative[nar].IsDisplayValidityScaleNarrative,
                                IsDisplayGroupNarrative: response.Detail.Content.Narrative[nar].IsDisplayGroupNarrative,
                                IsAllNarrative: response.Detail.Content.Narrative[nar].IsAllNarrative,
                                IsHighestScore: response.Detail.Content.Narrative[nar].IsHighestScore,
                                IsLowestScore: response.Detail.Content.Narrative[nar].IsLowestScore,
                                HighestScoreTotalDisplay: response.Detail.Content.Narrative[nar].HighestScoreTotalDisplay,
                                LowestScoreTotalDisplay: response.Detail.Content.Narrative[nar].LowestScoreTotalDisplay,
                                IsDisplay: response.Detail.Content.Narrative[nar].IsDisplay,
                                NarrativeSequence: NarrativeSequence
                            })
                        }
                    }

                    //PSYCHOGRAM
                    var Psychogram = []
                    if (response.Detail.Content.Psychogram.length > 0) {
                        for (psy = 0; psy < response.Detail.Content.Psychogram.length; psy++) {
                            Psychogram.push({
                                Title: response.Detail.Content.Psychogram[psy].Title,
                                IsDisplay: response.Detail.Content.Psychogram[psy].IsDisplay
                            })
                        }
                    }

                    if (response.Layout.IsPsychogramPerSubTest || response.Layout.IsPsychogramPerCompetency) {
                        viewModel.set('HasPsychogram', true);
                        if (response.Layout.IsProfiling == true) {
                            viewModel.set('IsProfiling', response.Layout.IsProfiling);
                            //viewModel.set('DisplayStatusPsychogram', false)
                            $('#panelbarPsychogram').hide()
                            $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives').length == 0 ?
                                null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives').remove()

                            $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramAbility').length == 0 ?
                                null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramAbility').remove()

                            $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramPersonality').length == 0 ?
                                null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramPersonality').remove()

                            for (tti = 0; tti < response.TestToolInfos.length; tti++) {
                                viewModel.set('TestToolInfosLength', response.TestToolInfos.length)
                                if (response.TestToolInfos.length <= 1) {
                                    for (tt = 0; tt <= response.TestToolInfos.length; tt++) {
                                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives' + tt + '').length == 0 ?
                                            null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives' + tt + '').remove()
                                    }

                                    if (response.TestToolInfos[tti].IsbyTest == true) {                                                                 // Psychogram Personality => IsByTest true 
                                        //viewModel.set('DisplayStatusPsychogramPersonality', true)
                                        viewModel.set('HasPsychogramPersonality', true)
                                        viewModel.set('TitlePsychogramPersonality', response.Detail.Content.Psychogram[tti].Title);
                                        viewModel.set('DisplayStatusPsychogramPersonality', response.Detail.Content.Psychogram[tti].IsDisplay)

                                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramPersonality').length == 0 ?
                                            $('#contentBox > ul.form-content li#contentLayout').append(
                                                '<div id="panelbarPsychogramPersonality">' +
                                                '<div id="PsychogramPersonality">Psychogram Personality' +
                                                '<ul class="form-content">' +
                                                '<li style="padding-top:2%; padding-bottom:2%">' +
                                                '<label>Title<span class="mandatory">*</span></label>' +
                                                '<input id="TitlePsychogramPersonality" name="TitlePsychogramPersonality" style="width:50%" data-bind="value: TitlePsychogramPersonality" />' +
                                                '</li>' +
                                                '</ul>' +
                                                '<span style="float:right">' +
                                                '<input type="checkbox" id="DisplayStatusPsychogramPersonality" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusPsychogramPersonality" onchange="DisplayStatusPsychogramPersonality(this)" />Display' +
                                                '</span>' +
                                                '</div>' +
                                                '</div>'
                                            ) : null

                                        $('#TitlePsychogramPersonality').val(response.Detail.Content.Psychogram[tti].Title)
                                        if (viewModel.DisplayStatusPsychogramPersonality == false) {
                                            $('#DisplayStatusPsychogramPersonality').attr('checked', false)
                                            $('#DisplayStatusPsychogramPersonality').attr('onchange', 'DisplayStatusPsychogramPersonalityChecked(this)')
                                        } else {
                                            $('#DisplayStatusPsychogramPersonality').val(response.Detail.Content.Psychogram[tti].IsDisplay)
                                        }

                                        $("#panelbarPsychogramPersonality").kendoPanelBar();
                                        var panelbarPsychogramPersonality = $("#panelbarPsychogramPersonality").data("kendoPanelBar");
                                        panelbarPsychogramPersonality.expand($("#PsychogramPersonality"));
                                        //$('#panelbarPsychogramPersonality').show()
                                        viewModel.set('DisplayStatusPsychogramAbility', false)
                                        //$('#panelbarPsychogramAbility').hide()
                                    } else {                                                                                                            // Psychogram Ability => IsByTest false 
                                        //viewModel.set('DisplayStatusPsychogramAbility', true)
                                        viewModel.set('HasPsychogramAbility', true)
                                        viewModel.set('TitlePsychogramAbility', response.Detail.Content.Psychogram[tti].Title);
                                        viewModel.set('DisplayStatusPsychogramAbility', response.Detail.Content.Psychogram[tti].IsDisplay)

                                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramAbility').length == 0 ?
                                            $('#contentBox > ul.form-content li#contentLayout').append(
                                                '<div id="panelbarPsychogramAbility">' +
                                                '<div id="PsychogramAbility">Psychogram Ability' +
                                                '<ul class="form-content">' +
                                                '<li style="padding-top:2%; padding-bottom:2%">' +
                                                '<label>Title<span class="mandatory">*</span></label>' +
                                                '<input id="TitlePsychogramAbility" name="TitlePsychogramAbility" style="width:50%" data-bind="value: TitlePsychogramAbility" />' +
                                                '</li>' +
                                                '</ul>' +
                                                '<span style="float:right">' +
                                                '<input type="checkbox" id="DisplayStatusPsychogramAbility" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusPsychogramAbility" onchange="DisplayStatusPsychogramAbility(this)" />Display' +
                                                '</span>' +
                                                '</div>' +
                                                '</div>'
                                            ) : null

                                        $('#TitlePsychogramAbility').val(response.Detail.Content.Psychogram[tti].Title)
                                        if (viewModel.DisplayStatusPsychogramAbility == false) {
                                            $('#DisplayStatusPsychogramAbility').attr('checked', false)
                                            $('#DisplayStatusPsychogramAbility').attr('onchange', 'DisplayStatusPsychogramAbilityChecked(this)')
                                        } else {
                                            $('#DisplayStatusPsychogramAbility').val(response.Detail.Content.Psychogram[tti].IsDisplay)
                                        }

                                        $("#panelbarPsychogramAbility").kendoPanelBar();
                                        var panelbarPsychogramAbility = $("#panelbarPsychogramAbility").data("kendoPanelBar");
                                        panelbarPsychogramAbility.expand($("#PsychogramAbility"));
                                        //$('#panelbarPsychogramAbility').show()
                                        viewModel.set('DisplayStatusPsychogramPersonality', false)
                                        //$('#panelbarPsychogramPersonality').hide()
                                    }

                                    $('#contentBox > ul.form-content li#contentLayout').append(
                                        '<div id="panelbarNarrativesGroupNarratives" style="width: 96.5%;">' +
                                        '<div id="NarrativesGroupNarratives">Narratives & Group Narratives' +
                                        '<ul class="form-content">' +
                                        '<li style="padding-top:2%;padding-bottom:2%">' +
                                        '<label>Title<span class="mandatory">*</span></label>' +
                                        '<input id="TitleNarrativesGroupNarratives" name="TitleNarrativesGroupNarratives" style="width:50%" data-bind="value:TitleNarrativesGroupNarratives" />' +
                                        '</li>' +
                                        '<li id="listNarratives" style="padding-top:2%;padding-bottom:2%">' +
                                        '<ul class="draggable">' +
                                        '<li id="HasSubTestNarrative" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives]]' +
                                        '<span style="float:right">' +
                                        '<input type="checkbox" id="DisplayStatusSubTestNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrative" onchange="Display(this)"/>Display' +
                                        '</span>' +
                                        '<div id="AllNarrativesSubTestNarrative">All Narratives' +
                                        '<input type="radio" name="IsAllNarrativeSubTestNarrative" id="IsAllNarrativeSubTestNarrative" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrative" onclick="AllNarrativeSubTestNarrative(this)"/>' +
                                        '<span> Yes</span>' +
                                        '<input type="radio" name="IsAllNarrativeSubTestNarrative" id="IsNotAllNarrativeSubTestNarrative" data-bind="checked: IsNotAllNarrativeSubTestNarrative" onclick="NotAllNarrativeSubTestNarrative(this)"/>' +
                                        '<span> No</span>' +
                                        '</div>' +
                                        '<div id="HighestScoreSubTestNarrative" hidden="hidden">Highest Score' +
                                        '<input type="checkbox" id="IsHighestScoreSubTestNarrative" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrative" onchange="DisplayHighestScoreSubTestNarrative(this)" />' +
                                        '<input id="HighestScoreTotalDisplaySubTestNarrative" name="HighestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                                        '</div>' +
                                        '<div id="LowestScoreSubTestNarrative" hidden="hidden">Lowest Score' +
                                        '<input type="checkbox" id="IsLowestScoreSubTestNarrative" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrative" onchange="DisplayLowestScoreSubTestNarrative(this)" />' +
                                        '<input id="LowestScoreTotalDisplaySubTestNarrative" name="LowestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                                        '</div>' +
                                        '</li>' +
                                        '<li id="IsSubTestNarrativeShort" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Short]]' +
                                        '<span style="float:right">' +
                                        '<input type="checkbox" id="DisplayStatusSubTestNarrativeShort" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeShort" onchange="DisplayStatusSubTestNarrativeShort(this)" />Display' +
                                        '</span>' +
                                        '<div id="AllNarrativesSubTestNarrativeShort">All Narratives' +
                                        '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort" id="IsAllNarrativeSubTestNarrativeShort" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeShort" onclick="AllNarrativeSubTestNarrativeShort(this)"/>' +
                                        '<span> Yes</span>' +
                                        '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort" id="IsNotAllNarrativeSubTestNarrativeShort" data-bind="checked: IsNotAllNarrativeSubTestNarrativeShort" onclick="NotAllNarrativeSubTestNarrativeShort(this)"/>' +
                                        '<span> No</span>' +
                                        '</div>' +
                                        '<div id="HighestScoreSubTestNarrativeShort" hidden="hidden">Highest Score' +
                                        '<input type="checkbox" id="IsHighestScoreSubTestNarrativeShort" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeShort" onchange="DisplayHighestScoreSubTestNarrativeShort(this)" />' +
                                        '<input id="HighestScoreTotalDisplaySubTestNarrativeShort" name="HighestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                                        '</div>' +
                                        '<div id="LowestScoreSubTestNarrativeShort" hidden="hidden">Lowest Score' +
                                        '<input type="checkbox" id="IsLowestScoreSubTestNarrativeShort" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeShort" onchange="DisplayLowestScoreSubTestNarrativeShort(this)" />' +
                                        '<input id="LowestScoreTotalDisplaySubTestNarrativeShort" name="LowestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                                        '</div>' +
                                        '</li >' +
                                        '<li id="IsSubTestNarrativeLong" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Long]]' +
                                        '<span style="float:right">' +
                                        '<input type="checkbox" id="DisplayStatusSubTestNarrativeLong" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeLong" onchange="DisplayStatusSubTestNarrativeLong(this)" />Display' +
                                        '</span>' +
                                        '<div id="AllNarrativesSubTestNarrativeLong">All Narratives' +
                                        '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong" id="IsAllNarrativeSubTestNarrativeLong" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeLong" onclick="AllNarrativeSubTestNarrativeLong(this)"/>' +
                                        '<span> Yes</span>' +
                                        '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong" id="IsNotAllNarrativeSubTestNarrativeLong" data-bind="checked: IsNotAllNarrativeSubTestNarrativeLong" onclick="NotAllNarrativeSubTestNarrativeLong(this)"/>' +
                                        '<span> No</span>' +
                                        '</div>' +
                                        '<div id="HighestScoreSubTestNarrativeLong" hidden="hidden">Highest Score' +
                                        '<input type="checkbox" id="IsHighestScoreSubTestNarrativeLong" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeLong" onchange="DisplayHighestScoreSubTestNarrativeLong(this)" />' +
                                        '<input id="HighestScoreTotalDisplaySubTestNarrativeLong" name="HighestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                                        '</div>' +
                                        '<div id="LowestScoreSubTestNarrativeLong" hidden="hidden">Lowest Score' +
                                        '<input type="checkbox" id="IsLowestScoreSubTestNarrativeLong" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeLong" onchange="DisplayLowestScoreSubTestNarrativeLong(this)" />' +
                                        '<input id="LowestScoreTotalDisplaySubTestNarrativeLong" name="LowestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                                        '</div>' +
                                        '</li >' +
                                        '<li id="HasSubTestCuttingNarrative" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives]]' +
                                        '<span style="float:right">' +
                                        '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrative" onchange="DisplayStatusSubTestCuttingNarrative(this)" />Display' +
                                        '</span>' +
                                        '<div id="AllNarrativesSubTestCuttingNarrative">All Narratives' +
                                        '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative" id="IsAllNarrativeSubTestCuttingNarrative" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrative" onclick="AllNarrativeSubTestCuttingNarrative(this)"/>' +
                                        '<span> Yes</span>' +
                                        '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative" id="IsNotAllNarrativeSubTestCuttingNarrative" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrative" onclick="NotAllNarrativeSubTestCuttingNarrative(this)"/>' +
                                        '<span> No</span>' +
                                        '</div>' +
                                        '<div id="HighestScoreSubTestCuttingNarrative" hidden="hidden">Highest Score' +
                                        '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrative" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrative" onchange="DisplayHighestScoreSubTestCuttingNarrative(this)" />' +
                                        '<input id="HighestScoreTotalDisplaySubTestCuttingNarrative" name="HighestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                                        '</div>' +
                                        '<div id="LowestScoreSubTestCuttingNarrative" hidden="hidden">Lowest Score' +
                                        '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrative" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrative" onchange="DisplayLowestScoreSubTestCuttingNarrative(this)" />' +
                                        '<input id="LowestScoreTotalDisplaySubTestCuttingNarrative" name="LowestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                                        '</div>' +
                                        '</li >' +
                                        '<li id="IsSubTestCuttingNarrativeShort" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Short]]' +
                                        '<span style="float:right">' +
                                        '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeShort" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeShort" onchange="DisplayStatusSubTestCuttingNarrativeShort(this)" />Display' +
                                        '</span>' +
                                        '<div id="AllNarrativesSubTestCuttingNarrativeShort">All Narratives' +
                                        '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort" id="IsAllNarrativeSubTestCuttingNarrativeShort" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeShort" onclick="AllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                                        '<span> Yes</span>' +
                                        '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort" id="IsNotAllNarrativeSubTestCuttingNarrativeShort" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeShort" onclick="NotAllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                                        '<span> No</span>' +
                                        '</div>' +
                                        '<div id="HighestScoreSubTestCuttingNarrativeShort" hidden="hidden">Highest Score' +
                                        '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeShort" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeShort" onchange="DisplayHighestScoreSubTestCuttingNarrativeShort(this)" />' +
                                        '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeShort" name="HighestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                                        '</div>' +
                                        '<div id="LowestScoreSubTestCuttingNarrativeShort" hidden="hidden">Lowest Score' +
                                        '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeShort" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeShort" onchange="DisplayLowestScoreSubTestCuttingNarrativeShort(this)" />' +
                                        '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeShort" name="LowestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                                        '</div>' +
                                        '</li>' +
                                        '<li id="IsSubTestCuttingNarrativeLong" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Long]]' +
                                        '<span style="float:right">' +
                                        '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeLong" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeLong" onchange="DisplayStatusSubTestCuttingNarrativeLong(this)" />Display' +
                                        '</span>' +
                                        '<div id="AllNarrativesSubTestCuttingNarrativeLong">All Narratives' +
                                        '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong" id="IsAllNarrativeSubTestCuttingNarrativeLong" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeLong" onclick="AllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                                        '<span> Yes</span>' +
                                        '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong" id="IsNotAllNarrativeSubTestCuttingNarrativeLong" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeLong" onclick="NotAllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                                        '<span> No</span>' +
                                        '</div>' +
                                        '<div id="HighestScoreSubTestCuttingNarrativeLong" hidden="hidden">Highest Score' +
                                        '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeLong" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeLong" onchange="DisplayHighestScoreSubTestCuttingNarrativeLong(this)" />' +
                                        '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeLong" name="HighestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                                        '</div>' +
                                        '<div id="LowestScoreSubTestCuttingNarrativeLong" hidden="hidden">Lowest Score' +
                                        '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeLong" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeLong" onchange="DisplayLowestScoreSubTestCuttingNarrativeLong(this)" />' +
                                        '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeLong" name="LowestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                                        '</div>' +
                                        '</li>' +
                                        '<li id="HasIQNarrative" style="border: outset; width:50%; display:block" data-type="iq">[[IQ Narratives]]' +
                                        '<span style="float:right">' +
                                        '<input type="checkbox" id="DisplayStatusIQNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusIQNarrative" onchange="DisplayStatusIQNarrative(this)" />Display' +
                                        '</span>' +
                                        '</li>' +
                                        '<li id="HasValidityScaleNarrative" style="border: outset; width:50%; display:block" data-type="vs">[[Validity Scale Narratives]]' +
                                        '<span style="float:right">' +
                                        '<input type="checkbox" id="DisplayStatusValidityScaleNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusValidityScaleNarrative" onchange="DisplayStatusValidityScaleNarrative(this)" />Display' +
                                        '</span>' +
                                        '</li>' +
                                        '<li id="HasGroupNarrative" style="border: outset; width:50%; display:block" data-type="group">[[Group Narratives]]' +
                                        '<span style="float:right">' +
                                        '<input type="checkbox" id="DisplayStatusGroupNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusGroupNarrative" onchange="DisplayStatusGroupNarrative(this)" />Display' +
                                        '</span>' +
                                        '</li>' +
                                        '</ul>' +
                                        '</li>' +
                                        '</ul>' +
                                        '<span style="float:right">' +
                                        '<input type="checkbox" id="DisplayStatusNarrativesGroupNarratives" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusNarrativesGroupNarratives" onchange="DisplayStatusNarrativesGroupNarratives(this)" />Display' +
                                        '</span>' +
                                        '</div>' +
                                        '</div>'
                                    )

                                    viewModel.set('TitleNarrativesGroupNarratives', response.Detail.Content.Narrative[0].Title);
                                    $('#TitleNarrativesGroupNarratives').val(response.Detail.Content.Narrative[0].Title)

                                    $('#HighestScoreTotalDisplaySubTestNarrative').keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestNarrative').keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#HighestScoreTotalDisplaySubTestNarrativeShort').keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestNarrativeShort').keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#HighestScoreTotalDisplaySubTestNarrativeLong').keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestNarrativeLong').keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });

                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrative').keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrative').keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort').keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort').keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong').keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong').keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });

                                    $("#panelbarNarrativesGroupNarratives").kendoPanelBar();
                                    var panelbarNarrativesGroupNarratives = $("#panelbarNarrativesGroupNarratives").data("kendoPanelBar");
                                    panelbarNarrativesGroupNarratives.expand($("#NarrativesGroupNarratives"));

                                    //NARRATIVES & GROUP NARRATIVES
                                    ////SUBTEST NARRATIVE
                                    var HasSubTestNarrative = response.Layout.HasSubTestNarrative;
                                    viewModel.set('HasSubTestNarrative', HasSubTestNarrative);
                                    if (HasSubTestNarrative == true) {
                                        if (response.Layout.IsSubTestNarrativeShort == true) {
                                            viewModel.set('HasSubTestNarrativeShort', true);
                                            viewModel.set('DisplayStatusSubTestNarrativeShort', response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                            $('#IsSubTestNarrativeShort').show()
                                            $('#AllNarrativesSubTestNarrativeShort').show()
                                            viewModel.set('DisplayStatusSubTestNarrative', false)
                                            $('#HasSubTestNarrative').hide()
                                            $('#AllNarrativesSubTestNarrative').hide()
                                            viewModel.set('DisplayStatusSubTestNarrativeLong', false)
                                            $('#IsSubTestNarrativeLong').hide()
                                            $('#AllNarrativesSubTestNarrativeLong').hide()
                                            if (response.Detail.Content.Narrative[0].IsAllNarrative == true) {
                                                viewModel.set('IsAllNarrativeSubTestNarrativeShort', true)
                                                $('#IsAllNarrativeSubTestNarrativeShort').prop('checked', true)
                                                viewModel.set('IsNotAllNarrativeSubTestNarrativeShort', false)
                                                $('#HighestScoreSubTestNarrativeShort').hide()
                                                $('#LowestScoreSubTestNarrativeShort').hide()
                                                viewModel.set('IsHighestScoreSubTestNarrativeShort', response.Detail.Content.Narrative[0].IsHighestScore)
                                                viewModel.set('IsLowestScoreSubTestNarrativeShort', response.Detail.Content.Narrative[0].IsLowestScore)
                                                if (viewModel.IsHighestScoreSubTestNarrativeShort == true) {
                                                    $('#IsHighestScoreSubTestNarrativeShort').attr('checked', true)
                                                    $('#IsHighestScoreSubTestNarrativeShort').attr('onchange', 'DisplayHighestScoreSubTestNarrativeShortChecked(this)')
                                                }
                                                if (viewModel.IsLowestScoreSubTestNarrativeShort == true) {
                                                    $('#IsLowestScoreSubTestNarrativeShort').attr('checked', true)
                                                    $('#IsLowestScoreSubTestNarrativeShort').attr('onchange', 'DisplayLowestScoreSubTestNarrativeShortChecked(this)')
                                                }
                                                $('#HighestScoreTotalDisplaySubTestNarrativeShort').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                                $('#LowestScoreTotalDisplaySubTestNarrativeShort').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                            } else {
                                                viewModel.set('IsNotAllNarrativeSubTestNarrativeShort', true)
                                                $('#IsNotAllNarrativeSubTestNarrativeShort').prop('checked', true)
                                                viewModel.set('IsAllNarrativeSubTestNarrativeShort', false)
                                                $('#HighestScoreSubTestNarrativeShort').show()
                                                $('#LowestScoreSubTestNarrativeShort').show()
                                                viewModel.set('IsHighestScoreSubTestNarrativeShort', response.Detail.Content.Narrative[0].IsHighestScore)
                                                viewModel.set('IsLowestScoreSubTestNarrativeShort', response.Detail.Content.Narrative[0].IsLowestScore)
                                                if (viewModel.IsHighestScoreSubTestNarrativeShort == true) {
                                                    $('#IsHighestScoreSubTestNarrativeShort').attr('checked', true)
                                                    $('#IsHighestScoreSubTestNarrativeShort').attr('onchange', 'DisplayHighestScoreSubTestNarrativeShortChecked(this)')
                                                }
                                                if (viewModel.IsLowestScoreSubTestNarrativeShort == true) {
                                                    $('#IsLowestScoreSubTestNarrativeShort').attr('checked', true)
                                                    $('#IsLowestScoreSubTestNarrativeShort').attr('onchange', 'DisplayLowestScoreSubTestNarrativeShortChecked(this)')
                                                }
                                                $('#HighestScoreTotalDisplaySubTestNarrativeShort').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                                $('#LowestScoreTotalDisplaySubTestNarrativeShort').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                            }
                                            viewModel.set('IsAllNarrativeSubTestNarrativeLong', false)
                                            viewModel.set('IsNotAllNarrativeSubTestNarrativeLong', false)

                                            if (viewModel.DisplayStatusSubTestNarrativeShort == false) {
                                                $('#DisplayStatusSubTestNarrativeShort').attr('checked', false)
                                                $('#DisplayStatusSubTestNarrativeShort').attr('onchange', 'DisplayStatusSubTestNarrativeShortChecked(this)')
                                            } else {
                                                $('#DisplayStatusSubTestNarrativeShort').val(response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                            }
                                        } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                            viewModel.set('HasSubTestNarrativeLong', true);
                                            viewModel.set('DisplayStatusSubTestNarrativeLong', response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                            $('#IsSubTestNarrativeLong').show()
                                            $('#AllNarrativesSubTestNarrativeLong').show()
                                            viewModel.set('DisplayStatusSubTestNarrative', false)
                                            $('#HasSubTestNarrative').hide()
                                            $('#AllNarrativesSubTestNarrative').hide()
                                            viewModel.set('DisplayStatusSubTestNarrativeShort', false)
                                            $('#IsSubTestNarrativeShort').hide()
                                            $('#AllNarrativesSubTestNarrativeShort').hide()
                                            if (response.Detail.Content.Narrative[0].IsAllNarrative == true) {
                                                viewModel.set('IsAllNarrativeSubTestNarrativeLong', true)
                                                $('#IsAllNarrativeSubTestNarrativeLong').prop('checked', true)
                                                viewModel.set('IsNotAllNarrativeSubTestNarrativeLong', false)
                                                $('#HighestScoreSubTestNarrativeLong').hide()
                                                $('#LowestScoreSubTestNarrativeLong').hide()
                                                viewModel.set('IsHighestScoreSubTestNarrativeLong', response.Detail.Content.Narrative[0].IsHighestScore)
                                                viewModel.set('IsLowestScoreSubTestNarrativeLong', response.Detail.Content.Narrative[0].IsLowestScore)
                                                if (viewModel.IsHighestScoreSubTestNarrativeLong == true) {
                                                    $('#IsHighestScoreSubTestNarrativeLong').attr('checked', true)
                                                    $('#IsHighestScoreSubTestNarrativeLong').attr('onchange', 'DisplayHighestScoreSubTestNarrativeLongChecked(this)')
                                                }
                                                if (viewModel.IsLowestScoreSubTestNarrativeLong == true) {
                                                    $('#IsLowestScoreSubTestNarrativeLong').attr('checked', true)
                                                    $('#IsLowestScoreSubTestNarrativeLong').attr('onchange', 'DisplayLowestScoreSubTestNarrativeLongChecked(this)')
                                                }
                                                $('#HighestScoreTotalDisplaySubTestNarrativeLong').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                                $('#LowestScoreTotalDisplaySubTestNarrativeLong').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                            } else {
                                                viewModel.set('IsNotAllNarrativeSubTestNarrativeLong', true)
                                                $('#IsNotAllNarrativeSubTestNarrativeLong').prop('checked', true)
                                                viewModel.set('IsAllNarrativeSubTestNarrativeLong', false)
                                                $('#HighestScoreSubTestNarrativeLong').show()
                                                $('#LowestScoreSubTestNarrativeLong').show()
                                                viewModel.set('IsHighestScoreSubTestNarrativeLong', response.Detail.Content.Narrative[0].IsHighestScore)
                                                viewModel.set('IsLowestScoreSubTestNarrativeLong', response.Detail.Content.Narrative[0].IsLowestScore)
                                                if (viewModel.IsHighestScoreSubTestNarrativeLong == true) {
                                                    $('#IsHighestScoreSubTestNarrativeLong').attr('checked', true)
                                                    $('#IsHighestScoreSubTestNarrativeLong').attr('onchange', 'DisplayHighestScoreSubTestNarrativeLongChecked(this)')
                                                }
                                                if (viewModel.IsLowestScoreSubTestNarrativeLong == true) {
                                                    $('#IsLowestScoreSubTestNarrativeLong').attr('checked', true)
                                                    $('#IsLowestScoreSubTestNarrativeLong').attr('onchange', 'DisplayLowestScoreSubTestNarrativeLongChecked(this)')
                                                }
                                                $('#HighestScoreTotalDisplaySubTestNarrativeLong').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                                $('#LowestScoreTotalDisplaySubTestNarrativeLong').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                            }
                                            viewModel.set('IsAllNarrativeSubTestNarrativeShort', false)
                                            viewModel.set('IsNotAllNarrativeSubTestNarrativeShort', false)

                                            if (viewModel.DisplayStatusSubTestNarrativeLong == false) {
                                                $('#DisplayStatusSubTestNarrativeLong').attr('checked', false)
                                                $('#DisplayStatusSubTestNarrativeLong').attr('onchange', 'DisplayStatusSubTestNarrativeLongChecked(this)')
                                            } else {
                                                $('#DisplayStatusSubTestNarrativeLong').val(response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                            }
                                        }
                                        viewModel.set('IsAllNarrativeSubTestNarrative', false)
                                        viewModel.set('IsNotAllNarrativeSubTestNarrative', false)
                                    } else {
                                        viewModel.set('DisplayStatusSubTestNarrative', false)
                                        $('#HasSubTestNarrative').hide()
                                        $('#AllNarrativesSubTestNarrative').hide()
                                        viewModel.set('DisplayStatusSubTestNarrativeShort', false)
                                        $('#IsSubTestNarrativeShort').hide()
                                        $('#AllNarrativesSubTestNarrativeShort').hide()
                                        viewModel.set('DisplayStatusSubTestNarrativeLong', false)
                                        $('#IsSubTestNarrativeLong').hide()
                                        $('#AllNarrativesSubTestNarrativeLong').hide()
                                        viewModel.set('IsAllNarrativeSubTestNarrative', false)
                                        viewModel.set('IsNotAllNarrativeSubTestNarrative', false)
                                        viewModel.set('IsAllNarrativeSubTestNarrativeShort', false)
                                        viewModel.set('IsNotAllNarrativeSubTestNarrativeShort', false)
                                        viewModel.set('IsAllNarrativeSubTestNarrativeLong', false)
                                        viewModel.set('IsNotAllNarrativeSubTestNarrativeLong', false)
                                    }
                                    ////SUBTEST CUTTING NARRATIVE
                                    var HasSubTestCuttingNarrative = response.Layout.HasSubTestCuttingNarrative;
                                    viewModel.set('HasSubTestCuttingNarrative', HasSubTestCuttingNarrative);
                                    if (HasSubTestCuttingNarrative == true) {
                                        if (response.Layout.IsSubTestNarrativeShort == true) {
                                            viewModel.set('HasSubTestCuttingNarrativeShort', true);
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                            $('#IsSubTestCuttingNarrativeShort').show()
                                            $('#AllNarrativesSubTestCuttingNarrativeShort').show()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                                            $('#HasSubTestCuttingNarrative').hide()
                                            $('#AllNarrativesSubTestCuttingNarrative').hide()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', false)
                                            $('#IsSubTestCuttingNarrativeLong').hide()
                                            $('#AllNarrativesSubTestCuttingNarrativeLong').hide()
                                            if (response.Detail.Content.Narrative[0].IsAllNarrative == true) {
                                                viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', true)
                                                $('#IsAllNarrativeSubTestCuttingNarrativeShort').prop('checked', true)
                                                viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort', false)
                                                $('#HighestScoreSubTestCuttingNarrativeShort').hide()
                                                $('#LowestScoreSubTestCuttingNarrativeShort').hide()
                                                viewModel.set('IsHighestScoreSubTestCuttingNarrativeShort', response.Detail.Content.Narrative[0].IsHighestScore)
                                                viewModel.set('IsLowestScoreSubTestCuttingNarrativeShort', response.Detail.Content.Narrative[0].IsLowestScore)
                                                if (viewModel.IsHighestScoreSubTestCuttingNarrativeShort == true) {
                                                    $('#IsHighestScoreSubTestCuttingNarrativeShort').attr('checked', true)
                                                    $('#IsHighestScoreSubTestCuttingNarrativeShort').attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeShortChecked(this)')
                                                }
                                                if (viewModel.IsLowestScoreSubTestCuttingNarrativeShort == true) {
                                                    $('#IsLowestScoreSubTestCuttingNarrativeShort').attr('checked', true)
                                                    $('#IsLowestScoreSubTestCuttingNarrativeShort').attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeShortChecked(this)')
                                                }
                                                $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                                $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                            } else {
                                                viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort', true)
                                                $('#IsNotAllNarrativeSubTestCuttingNarrativeShort').prop('checked', true)
                                                viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', false)
                                                $('#HighestScoreSubTestCuttingNarrativeShort').show()
                                                $('#LowestScoreSubTestCuttingNarrativeShort').show()
                                                viewModel.set('IsHighestScoreSubTestCuttingNarrativeShort', response.Detail.Content.Narrative[0].IsHighestScore)
                                                viewModel.set('IsLowestScoreSubTestCuttingNarrativeShort', response.Detail.Content.Narrative[0].IsLowestScore)
                                                if (viewModel.IsHighestScoreSubTestCuttingNarrativeShort == true) {
                                                    $('#IsHighestScoreSubTestCuttingNarrativeShort').attr('checked', true)
                                                    $('#IsHighestScoreSubTestCuttingNarrativeShort').attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeShortChecked(this)')
                                                }
                                                if (viewModel.IsLowestScoreSubTestCuttingNarrativeShort == true) {
                                                    $('#IsLowestScoreSubTestCuttingNarrativeShort').attr('checked', true)
                                                    $('#IsLowestScoreSubTestCuttingNarrativeShort').attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeShortChecked(this)')
                                                }
                                                $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                                $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                            }
                                            viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', false)
                                            viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong', false)

                                            if (viewModel.DisplayStatusSubTestCuttingNarrativeShort == false) {
                                                $('#DisplayStatusSubTestCuttingNarrativeShort').attr('checked', false)
                                                $('#DisplayStatusSubTestCuttingNarrativeShort').attr('onchange', 'DisplayStatusSubTestCuttingNarrativeShortChecked(this)')
                                            } else {
                                                $('#DisplayStatusSubTestCuttingNarrativeShort').val(response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                            }
                                        } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                            viewModel.set('HasSubTestCuttingNarrativeLong', true);
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                            $('#IsSubTestCuttingNarrativeLong').show()
                                            $('#AllNarrativesSubTestCuttingNarrativeLong').show()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                                            $('#HasSubTestCuttingNarrative').hide()
                                            $('#AllNarrativesSubTestCuttingNarrative').hide()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', false)
                                            $('#IsSubTestCuttingNarrativeShort').hide()
                                            $('#AllNarrativesSubTestCuttingNarrativeShort').hide()
                                            if (response.Detail.Content.Narrative[0].IsAllNarrative == true) {
                                                viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', true)
                                                $('#IsAllNarrativeSubTestCuttingNarrativeLong').prop('checked', true)
                                                viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong', false)
                                                $('#HighestScoreSubTestCuttingNarrativeLong').hide()
                                                $('#LowestScoreSubTestCuttingNarrativeLong').hide()
                                                viewModel.set('IsHighestScoreSubTestCuttingNarrativeLong', response.Detail.Content.Narrative[0].IsHighestScore)
                                                viewModel.set('IsLowestScoreSubTestCuttingNarrativeLong', response.Detail.Content.Narrative[0].IsLowestScore)
                                                if (viewModel.IsHighestScoreSubTestCuttingNarrativeLong == true) {
                                                    $('#IsHighestScoreSubTestCuttingNarrativeLong').attr('checked', true)
                                                    $('#IsHighestScoreSubTestCuttingNarrativeLong').attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeLongChecked(this)')
                                                }
                                                if (viewModel.IsLowestScoreSubTestCuttingNarrativeLong == true) {
                                                    $('#IsLowestScoreSubTestCuttingNarrativeLong').attr('checked', true)
                                                    $('#IsLowestScoreSubTestCuttingNarrativeLong').attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeLongChecked(this)')
                                                }
                                                $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                                $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                            } else {
                                                viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong', true)
                                                $('#IsNotAllNarrativeSubTestCuttingNarrativeLong').prop('checked', true)
                                                viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', false)
                                                $('#HighestScoreSubTestCuttingNarrativeLong').show()
                                                $('#LowestScoreSubTestCuttingNarrativeLong').show()
                                                viewModel.set('IsHighestScoreSubTestCuttingNarrativeLong', response.Detail.Content.Narrative[0].IsHighestScore)
                                                viewModel.set('IsLowestScoreSubTestCuttingNarrativeLong', response.Detail.Content.Narrative[0].IsLowestScore)
                                                if (viewModel.IsHighestScoreSubTestCuttingNarrativeLong == true) {
                                                    $('#IsHighestScoreSubTestCuttingNarrativeLong').attr('checked', true)
                                                    $('#IsHighestScoreSubTestCuttingNarrativeLong').attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeLongChecked(this)')
                                                }
                                                if (viewModel.IsLowestScoreSubTestCuttingNarrativeLong == true) {
                                                    $('#IsLowestScoreSubTestCuttingNarrativeLong').attr('checked', true)
                                                    $('#IsLowestScoreSubTestCuttingNarrativeLong').attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeLongChecked(this)')
                                                }
                                                $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                                $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                            }
                                            viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', false)
                                            viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort', false)

                                            if (viewModel.DisplayStatusSubTestCuttingNarrativeLong == false) {
                                                $('#DisplayStatusSubTestCuttingNarrativeLong').attr('checked', false)
                                                $('#DisplayStatusSubTestCuttingNarrativeLong').attr('onchange', 'DisplayStatusSubTestCuttingNarrativeLongChecked(this)')
                                            } else {
                                                $('#DisplayStatusSubTestCuttingNarrativeLong').val(response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                            }
                                        }
                                        viewModel.set('IsAllNarrativeSubTestCuttingNarrative', false)
                                        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrative', false)
                                    } else {
                                        viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                                        $('#HasSubTestCuttingNarrative').hide()
                                        $('#AllNarrativesSubTestCuttingNarrative').hide()
                                        viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', false)
                                        $('#IsSubTestCuttingNarrativeShort').hide()
                                        $('#AllNarrativesSubTestCuttingNarrativeShort').hide()
                                        viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', false)
                                        $('#IsSubTestCuttingNarrativeLong').hide()
                                        $('#AllNarrativesSubTestCuttingNarrativeLong').hide()
                                        viewModel.set('IsAllNarrativeSubTestCuttingNarrative', false)
                                        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrative', false)
                                        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', false)
                                        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort', false)
                                        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', false)
                                        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong', false)
                                    }
                                    ////IQ NARRATIVE
                                    var HasIQNarrative = response.Layout.HasIQNarrative;
                                    viewModel.set('HasIQNarrative', HasIQNarrative);
                                    if (HasIQNarrative == true) {
                                        if (response.TestToolInfos[tti].IsbyTest == true) {         //PERSONALITY > TIDAK ADA IQ NARRATIVE
                                            viewModel.set('DisplayStatusIQNarrative', response.Detail.Content.Narrative[0].IsDisplayIQNarrative)
                                            if (viewModel.DisplayStatusIQNarrative == false) {
                                                $('#DisplayStatusIQNarrative').attr('checked', false)
                                                $('#DisplayStatusIQNarrative').attr('onchange', 'DisplayStatusIQNarrativeChecked(this)')
                                            } else {
                                                $('#DisplayStatusIQNarrative').val(response.Detail.Content.Narrative[0].IsDisplayIQNarrative)
                                            }
                                            $('#HasIQNarrative').hide()
                                        } else {                                                
                                            viewModel.set('DisplayStatusIQNarrative', response.Detail.Content.Narrative[0].IsDisplayIQNarrative)
                                            if (viewModel.DisplayStatusIQNarrative == false) {
                                                $('#DisplayStatusIQNarrative').attr('checked', false)
                                                $('#DisplayStatusIQNarrative').attr('onchange', 'DisplayStatusIQNarrativeChecked(this)')
                                            } else {
                                                $('#DisplayStatusIQNarrative').val(response.Detail.Content.Narrative[0].IsDisplayIQNarrative)
                                            }
                                            $('#HasIQNarrative').show()
                                        }
                                    } else {
                                        viewModel.set('DisplayStatusIQNarrative', false)
                                        $('#HasIQNarrative').hide()
                                    }
                                    ////VALIDITY SCALE NARRATIVE
                                    var HasValidityScaleNarrative = response.Layout.HasValidityScaleNarrative;
                                    viewModel.set('HasValidityScaleNarrative', HasValidityScaleNarrative);
                                    if (HasValidityScaleNarrative == true) {
                                        if (response.TestToolInfos[tti].IsbyTest == false) {        //ABILITY > TIDAK ADA VALIDITY SCALE
                                            viewModel.set('DisplayStatusValidityScaleNarrative', response.Detail.Content.Narrative[0].IsDisplayValidityScaleNarrative)
                                            if (viewModel.DisplayStatusValidityScaleNarrative == false) {
                                                $('#DisplayStatusValidityScaleNarrative').attr('checked', false)
                                                $('#DisplayStatusValidityScaleNarrative').attr('onchange', 'DisplayStatusValidityScaleNarrativeChecked(this)')
                                            } else {
                                                $('#DisplayStatusValidityScaleNarrative').val(response.Detail.Content.Narrative[0].IsDisplayValidityScaleNarrative)
                                            }
                                            $('#HasValidityScaleNarrative').hide()
                                        } else {
                                            viewModel.set('DisplayStatusValidityScaleNarrative', response.Detail.Content.Narrative[0].IsDisplayValidityScaleNarrative)
                                            if (viewModel.DisplayStatusValidityScaleNarrative == false) {
                                                $('#DisplayStatusValidityScaleNarrative').attr('checked', false)
                                                $('#DisplayStatusValidityScaleNarrative').attr('onchange', 'DisplayStatusValidityScaleNarrativeChecked(this)')
                                            } else {
                                                $('#DisplayStatusValidityScaleNarrative').val(response.Detail.Content.Narrative[0].IsDisplayValidityScaleNarrative)
                                            }
                                            $('#HasValidityScaleNarrative').show()
                                        }
                                    } else {
                                        viewModel.set('DisplayStatusValidityScaleNarrative', false)
                                        $('#HasValidityScaleNarrative').hide()
                                    }
                                    ////GROUP NARRATIVE
                                    var HasGroupNarrative = response.Layout.HasGroupNarrative;
                                    viewModel.set('HasGroupNarrative', HasGroupNarrative);
                                    if (HasGroupNarrative == true) {
                                        viewModel.set('DisplayStatusGroupNarrative', response.Detail.Content.Narrative[0].IsDisplayGroupNarrative)
                                        if (viewModel.DisplayStatusGroupNarrative == false) {
                                            $('#DisplayStatusGroupNarrative').attr('checked', false)
                                            $('#DisplayStatusGroupNarrative').attr('onchange', 'DisplayStatusGroupNarrativeChecked(this)')
                                        } else {
                                            $('#DisplayStatusGroupNarrative').val(response.Detail.Content.Narrative[0].IsDisplayGroupNarrative)
                                        }
                                        $('#HasGroupNarrative').show()
                                    } else {
                                        viewModel.set('DisplayStatusGroupNarrative', false)
                                        $('#HasGroupNarrative').hide()
                                    }

                                    viewModel.set('DisplayStatusNarrativesGroupNarratives', response.Detail.Content.Narrative[0].IsDisplay)
                                    if (viewModel.DisplayStatusNarrativesGroupNarratives == false) {
                                        $('#DisplayStatusNarrativesGroupNarratives').attr('checked', false)
                                        $('#DisplayStatusNarrativesGroupNarratives').attr('onchange', 'DisplayStatusNarrativesGroupNarrativesChecked(this)')
                                    } else {
                                        $('#DisplayStatusNarrativesGroupNarratives').val(response.Detail.Content.Narrative[0].IsDisplay)
                                    }

                                    var NarrativeSequenceLength = response.Detail.Content.Narrative[0].NarrativeSequence.length
                                    var NarrativeSequence = []
                                    if (NarrativeSequenceLength > 0) {
                                        for (ns = 0; ns < NarrativeSequenceLength; ns++) {
                                            NarrativeSequence.push(response.Detail.Content.Narrative[0].NarrativeSequence[ns])
                                        }
                                    }

                                    if (NarrativeSequence.length > 0) {
                                        for (ns = (NarrativeSequence.length - 1); ns >= 0; --ns) {
                                            if (NarrativeSequence[ns] == "subtest") {
                                                if (($('#NarrativesGroupNarratives > .form-content ul').children()).length > 0) {
                                                    var ulLength = ($('#NarrativesGroupNarratives > .form-content ul').children()).length
                                                    for (ul = 0; ul < ulLength; ul++) {
                                                        if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).css('display') == "block") {
                                                            if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('data-type') == "subtest") {
                                                                var id = $($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('id')
                                                                $('#' + id).prependTo('ul.draggable')
                                                            }
                                                        }
                                                    }
                                                }
                                            } else if (NarrativeSequence[ns] == "iq") {
                                                if (($('#NarrativesGroupNarratives > .form-content ul').children()).length > 0) {
                                                    var ulLength = ($('#NarrativesGroupNarratives > .form-content ul').children()).length
                                                    for (ul = 0; ul < ulLength; ul++) {
                                                        if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).css('display') == "block") {
                                                            if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('data-type') == "iq") {
                                                                $('#HasIQNarrative').prependTo('ul.draggable')
                                                            }
                                                        }
                                                    }
                                                }
                                            } else if (NarrativeSequence[ns] == "vs") {
                                                if (($('#NarrativesGroupNarratives > .form-content ul').children()).length > 0) {
                                                    var ulLength = ($('#NarrativesGroupNarratives > .form-content ul').children()).length
                                                    for (ul = 0; ul < ulLength; ul++) {
                                                        if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).css('display') == "block") {
                                                            if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('data-type') == "vs") {
                                                                $('#HasValidityScaleNarrative').prependTo('ul.draggable')
                                                            }
                                                        }
                                                    }
                                                }
                                            } else if (NarrativeSequence[ns] == "group") {
                                                if (($('#NarrativesGroupNarratives > .form-content ul').children()).length > 0) {
                                                    var ulLength = ($('#NarrativesGroupNarratives > .form-content ul').children()).length
                                                    for (ul = 0; ul < ulLength; ul++) {
                                                        if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).css('display') == "block") {
                                                            if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('data-type') == "group") {
                                                                $('#HasGroupNarrative').prependTo('ul.draggable')
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    $('.draggable').sortable({
                                        connectWith: '.draggable',
                                        //revert: true
                                    });
                                    $('.draggable li').draggable({
                                        connectToSortable: '.draggable',
                                        revert: 'invalid'
                                    });
                                    $('ul, li').disableSelection();
                                }
                                else {
                                    $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives' + tti + '').length == 0 ?
                                        null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives' + tti + '').remove()

                                    if (response.TestToolInfos[tti].IsbyTest == true) {                                                                 
                                        // Psychogram Personality => IsByTest true 
                                        viewModel.set('HasPsychogramPersonality', true)
                                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramPersonality').length == 0 ?
                                            $('#contentBox > ul.form-content li#contentLayout').append(
                                                '<div id="panelbarPsychogramPersonality">' +
                                                '<div id="PsychogramPersonality">Psychogram Personality' +
                                                '<ul class="form-content">' +
                                                '<li style="padding-top:2%; padding-bottom:2%">' +
                                                '<label>Title<span class="mandatory">*</span></label>' +
                                                '<input id="TitlePsychogramPersonality" name="TitlePsychogramPersonality" style="width:50%" data-bind="value: TitlePsychogramPersonality" />' +
                                                '</li>' +
                                                '</ul>' +
                                                '<span style="float:right">' +
                                                '<input type="checkbox" id="DisplayStatusPsychogramPersonality" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusPsychogramPersonality" onchange="DisplayStatusPsychogramPersonality(this)" />Display' +
                                                '</span>' +
                                                '</div>' +
                                                '</div>'
                                            ) : null

                                        viewModel.set('TitlePsychogramPersonality', response.Detail.Content.Psychogram[tti].Title);
                                        $('#TitlePsychogramPersonality').val(response.Detail.Content.Psychogram[tti].Title)
                                        viewModel.set('DisplayStatusPsychogramPersonality', response.Detail.Content.Psychogram[tti].IsDisplay)
                                        if (viewModel.DisplayStatusPsychogramPersonality == false) {
                                            $('#DisplayStatusPsychogramPersonality').attr('checked', false)
                                            $('#DisplayStatusPsychogramPersonality').attr('onchange', 'DisplayStatusPsychogramPersonalityChecked(this)')
                                        } else {
                                            $('#DisplayStatusPsychogramPersonality').val(response.Detail.Content.Psychogram[tti].IsDisplay)
                                        }

                                        $("#panelbarPsychogramPersonality").kendoPanelBar();
                                        var panelbarPsychogramPersonality = $("#panelbarPsychogramPersonality").data("kendoPanelBar");
                                        panelbarPsychogramPersonality.expand($("#PsychogramPersonality"));

                                        $('#contentBox > ul.form-content li#contentLayout').append(
                                            '<div id="panelbarNarrativesGroupNarratives' + tti + '" style="width: 96.5%;">' +
                                            '<div id="NarrativesGroupNarratives' + tti + '">Narratives & Group Narratives' +
                                            '<ul class="form-content">' +
                                            '<li style="padding-top:2%;padding-bottom:2%">' +
                                            '<label>Title<span class="mandatory">*</span></label>' +
                                            '<input id="TitleNarrativesGroupNarratives' + tti + '" name="TitleNarrativesGroupNarratives" style="width:50%" data-bind="value:TitleNarrativesGroupNarratives" />' +
                                            '</li>' +
                                            '<li id="listNarratives' + tti + '" style="padding-top:2%;padding-bottom:2%">' +
                                            '<ul class="draggable">' +
                                            '<li id="HasSubTestNarrative' + tti + '" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusSubTestNarrative' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrative" onchange="Display(this)"/>Display' +
                                            '</span>' +
                                            '<div id="AllNarrativesSubTestNarrative' + tti + '">All Narratives' +
                                            '<input type="radio" name="IsAllNarrativeSubTestNarrative' + tti + '" id="IsAllNarrativeSubTestNarrative' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrative" tti="' + tti + '" onclick="AllNarrativeSubTestNarrative(this)"/>' +
                                            '<span> Yes</span>' +
                                            '<input type="radio" name="IsAllNarrativeSubTestNarrative' + tti + '" id="IsNotAllNarrativeSubTestNarrative' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestNarrative" tti="' + tti + '" onclick="NotAllNarrativeSubTestNarrative(this)"/>' +
                                            '<span> No</span>' +
                                            '</div>' +
                                            '<div id="HighestScoreSubTestNarrative' + tti + '" hidden="hidden">Highest Score' +
                                            '<input type="checkbox" id="IsHighestScoreSubTestNarrative' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrative" tti="' + tti + '" onchange="DisplayHighestScoreSubTestNarrative(this)" />' +
                                            '<input id="HighestScoreTotalDisplaySubTestNarrative' + tti + '" name="HighestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                                            '</div>' +
                                            '<div id="LowestScoreSubTestNarrative' + tti + '" hidden="hidden">Lowest Score' +
                                            '<input type="checkbox" id="IsLowestScoreSubTestNarrative' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrative" tti="' + tti + '" onchange="DisplayLowestScoreSubTestNarrative(this)" />' +
                                            '<input id="LowestScoreTotalDisplaySubTestNarrative' + tti + '" name="LowestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                                            '</div>' +
                                            '</li>' +
                                            '<li id="IsSubTestNarrativeShort' + tti + '" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Short]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusSubTestNarrativeShort' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeShort" onchange="DisplayStatusSubTestNarrativeShort(this)" />Display' +
                                            '</span>' +
                                            '<div id="AllNarrativesSubTestNarrativeShort' + tti + '">All Narratives' +
                                            '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort' + tti + '" id="IsAllNarrativeSubTestNarrativeShort' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeShort" tti="' + tti + '" onclick="AllNarrativeSubTestNarrativeShort(this)"/>' +
                                            '<span> Yes</span>' +
                                            '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort' + tti + '" id="IsNotAllNarrativeSubTestNarrativeShort' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestNarrativeShort" tti="' + tti + '" onclick="NotAllNarrativeSubTestNarrativeShort(this)"/>' +
                                            '<span> No</span>' +
                                            '</div>' +
                                            '<div id="HighestScoreSubTestNarrativeShort' + tti + '" hidden="hidden">Highest Score' +
                                            '<input type="checkbox" id="IsHighestScoreSubTestNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeShort" tti="' + tti + '" onchange="DisplayHighestScoreSubTestNarrativeShort(this)" />' +
                                            '<input id="HighestScoreTotalDisplaySubTestNarrativeShort' + tti + '" name="HighestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                                            '</div>' +
                                            '<div id="LowestScoreSubTestNarrativeShort' + tti + '" hidden="hidden">Lowest Score' +
                                            '<input type="checkbox" id="IsLowestScoreSubTestNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeShort" tti="' + tti + '" onchange="DisplayLowestScoreSubTestNarrativeShort(this)" />' +
                                            '<input id="LowestScoreTotalDisplaySubTestNarrativeShort' + tti + '" name="LowestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                                            '</div>' +
                                            '</li >' +
                                            '<li id="IsSubTestNarrativeLong' + tti + '" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Long]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusSubTestNarrativeLong' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeLong" onchange="DisplayStatusSubTestNarrativeLong(this)" />Display' +
                                            '</span>' +
                                            '<div id="AllNarrativesSubTestNarrativeLong' + tti + '">All Narratives' +
                                            '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong' + tti + '" id="IsAllNarrativeSubTestNarrativeLong' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeLong" tti="' + tti + '" onclick="AllNarrativeSubTestNarrativeLong(this)"/>' +
                                            '<span> Yes</span>' +
                                            '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong' + tti + '" id="IsNotAllNarrativeSubTestNarrativeLong' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestNarrativeLong" tti="' + tti + '" onclick="NotAllNarrativeSubTestNarrativeLong(this)"/>' +
                                            '<span> No</span>' +
                                            '</div>' +
                                            '<div id="HighestScoreSubTestNarrativeLong' + tti + '" hidden="hidden">Highest Score' +
                                            '<input type="checkbox" id="IsHighestScoreSubTestNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeLong" tti="' + tti + '" onchange="DisplayHighestScoreSubTestNarrativeLong(this)" />' +
                                            '<input id="HighestScoreTotalDisplaySubTestNarrativeLong' + tti + '" name="HighestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                                            '</div>' +
                                            '<div id="LowestScoreSubTestNarrativeLong' + tti + '" hidden="hidden">Lowest Score' +
                                            '<input type="checkbox" id="IsLowestScoreSubTestNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeLong" tti="' + tti + '" onchange="DisplayLowestScoreSubTestNarrativeLong(this)" />' +
                                            '<input id="LowestScoreTotalDisplaySubTestNarrativeLong' + tti + '" name="LowestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                                            '</div>' +
                                            '</li >' +
                                            '<li id="HasSubTestCuttingNarrative' + tti + '" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrative' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrative" onchange="DisplayStatusSubTestCuttingNarrative(this)" />Display' +
                                            '</span>' +
                                            '<div id="AllNarrativesSubTestCuttingNarrative' + tti + '">All Narratives' +
                                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative' + tti + '" id="IsAllNarrativeSubTestCuttingNarrative' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrative" tti="' + tti + '" onclick="AllNarrativeSubTestCuttingNarrative(this)"/>' +
                                            '<span> Yes</span>' +
                                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative' + tti + '" id="IsNotAllNarrativeSubTestCuttingNarrative' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrative" tti="' + tti + '" onclick="NotAllNarrativeSubTestCuttingNarrative(this)"/>' +
                                            '<span> No</span>' +
                                            '</div>' +
                                            '<div id="HighestScoreSubTestCuttingNarrative' + tti + '" hidden="hidden">Highest Score' +
                                            '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrative' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrative" tti="' + tti + '" onchange="DisplayHighestScoreSubTestCuttingNarrative(this)" />' +
                                            '<input id="HighestScoreTotalDisplaySubTestCuttingNarrative' + tti + '" name="HighestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                                            '</div>' +
                                            '<div id="LowestScoreSubTestCuttingNarrative' + tti + '" hidden="hidden">Lowest Score' +
                                            '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrative' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrative" tti="' + tti + '" onchange="DisplayLowestScoreSubTestCuttingNarrative(this)" />' +
                                            '<input id="LowestScoreTotalDisplaySubTestCuttingNarrative' + tti + '" name="LowestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                                            '</div>' +
                                            '</li >' +
                                            '<li id="IsSubTestCuttingNarrativeShort' + tti + '" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Short]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeShort' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeShort" onchange="DisplayStatusSubTestCuttingNarrativeShort(this)" />Display' +
                                            '</span>' +
                                            '<div id="AllNarrativesSubTestCuttingNarrativeShort' + tti + '">All Narratives' +
                                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort' + tti + '" id="IsAllNarrativeSubTestCuttingNarrativeShort' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeShort" tti="' + tti + '" onclick="AllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                                            '<span> Yes</span>' +
                                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort' + tti + '" id="IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeShort" tti="' + tti + '" onclick="NotAllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                                            '<span> No</span>' +
                                            '</div>' +
                                            '<div id="HighestScoreSubTestCuttingNarrativeShort' + tti + '" hidden="hidden">Highest Score' +
                                            '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeShort" tti="' + tti + '" onchange="DisplayHighestScoreSubTestCuttingNarrativeShort(this)" />' +
                                            '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti + '" name="HighestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                                            '</div>' +
                                            '<div id="LowestScoreSubTestCuttingNarrativeShort' + tti + '" hidden="hidden">Lowest Score' +
                                            '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeShort" tti="' + tti + '" onchange="DisplayLowestScoreSubTestCuttingNarrativeShort(this)" />' +
                                            '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti + '" name="LowestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                                            '</div>' +
                                            '</li>' +
                                            '<li id="IsSubTestCuttingNarrativeLong' + tti + '" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Long]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeLong' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeLong" onchange="DisplayStatusSubTestCuttingNarrativeLong(this)" />Display' +
                                            '</span>' +
                                            '<div id="AllNarrativesSubTestCuttingNarrativeLong' + tti + '">All Narratives' +
                                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong' + tti + '" id="IsAllNarrativeSubTestCuttingNarrativeLong' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeLong" tti="' + tti + '" onclick="AllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                                            '<span> Yes</span>' +
                                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong' + tti + '" id="IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeLong" tti="' + tti + '" onclick="NotAllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                                            '<span> No</span>' +
                                            '</div>' +
                                            '<div id="HighestScoreSubTestCuttingNarrativeLong' + tti + '" hidden="hidden">Highest Score' +
                                            '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeLong" tti="' + tti + '" onchange="DisplayHighestScoreSubTestCuttingNarrativeLong(this)" />' +
                                            '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti + '" name="HighestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                                            '</div>' +
                                            '<div id="LowestScoreSubTestCuttingNarrativeLong' + tti + '" hidden="hidden">Lowest Score' +
                                            '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeLong" tti="' + tti + '" onchange="DisplayLowestScoreSubTestCuttingNarrativeLong(this)" />' +
                                            '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti + '" name="LowestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                                            '</div>' +
                                            '</li>' +
                                            '<li id="HasIQNarrative' + tti + '" style="border: outset; width:50%; display:block" data-type="iq">[[IQ Narratives]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusIQNarrative' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusIQNarrative" onchange="DisplayStatusIQNarrative(this)" />Display' +
                                            '</span>' +
                                            '</li>' +
                                            '<li id="HasValidityScaleNarrative' + tti + '" style="border: outset; width:50%; display:block" data-type="vs">[[Validity Scale Narratives]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusValidityScaleNarrative' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusValidityScaleNarrative" onchange="DisplayStatusValidityScaleNarrative(this)" />Display' +
                                            '</span>' +
                                            '</li>' +
                                            '<li id="HasGroupNarrative' + tti + '" style="border: outset; width:50%; display:block" data-type="group">[[Group Narratives]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusGroupNarrative' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusGroupNarrative" onchange="DisplayStatusGroupNarrative(this)" />Display' +
                                            '</span>' +
                                            '</li>' +
                                            '</ul>' +
                                            '</li>' +
                                            '</ul>' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusNarrativesGroupNarratives' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusNarrativesGroupNarratives" onchange="DisplayStatusNarrativesGroupNarratives(this)" />Display' +
                                            '</span>' +
                                            '</div>' +
                                            '</div>'
                                        )

                                        viewModel.set('TitleNarrativesGroupNarratives' + tti, response.Detail.Content.Narrative[tti].Title);
                                        $('#TitleNarrativesGroupNarratives' + tti).val(response.Detail.Content.Narrative[tti].Title)

                                        $('#HighestScoreTotalDisplaySubTestNarrative' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#LowestScoreTotalDisplaySubTestNarrative' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#HighestScoreTotalDisplaySubTestNarrativeShort' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#LowestScoreTotalDisplaySubTestNarrativeShort' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#HighestScoreTotalDisplaySubTestNarrativeLong' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#LowestScoreTotalDisplaySubTestNarrativeLong' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });

                                        $('#HighestScoreTotalDisplaySubTestCuttingNarrative' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#LowestScoreTotalDisplaySubTestCuttingNarrative' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });

                                        $("#panelbarNarrativesGroupNarratives" + tti + "").kendoPanelBar();
                                        var panelbarNarrativesGroupNarratives = $("#panelbarNarrativesGroupNarratives" + tti + "").data("kendoPanelBar");
                                        panelbarNarrativesGroupNarratives.expand($("#NarrativesGroupNarratives"));
                                        
                                        //NARRATIVES & GROUP NARRATIVES
                                        ////SUBTEST NARRATIVE
                                        var HasSubTestNarrative = response.Layout.HasSubTestNarrative;
                                        viewModel.set('HasSubTestNarrative' + tti, HasSubTestNarrative);
                                        if (HasSubTestNarrative == true) {
                                            if (response.Layout.IsSubTestNarrativeShort == true) {
                                                viewModel.set('HasSubTestNarrativeShort' + tti, true);
                                                viewModel.set('DisplayStatusSubTestNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                $('#IsSubTestNarrativeShort' + tti).show()
                                                $('#AllNarrativesSubTestNarrativeShort' + tti).show()
                                                viewModel.set('DisplayStatusSubTestNarrative' + tti, false)
                                                $('#HasSubTestNarrative' + tti).hide()
                                                $('#AllNarrativesSubTestNarrative' + tti).hide()
                                                viewModel.set('DisplayStatusSubTestNarrativeLong' + tti, false)
                                                $('#IsSubTestNarrativeLong' + tti).hide()
                                                $('#AllNarrativesSubTestNarrativeLong' + tti).hide()
                                                if (response.Detail.Content.Narrative[tti].IsAllNarrative == true) {
                                                    viewModel.set('IsAllNarrativeSubTestNarrativeShort' + tti, true)
                                                    $('#IsAllNarrativeSubTestNarrativeShort' + tti).prop('checked', true)
                                                    viewModel.set('IsNotAllNarrativeSubTestNarrativeShort' + tti, false)
                                                    $('#HighestScoreSubTestNarrativeShort' + tti).hide()
                                                    $('#LowestScoreSubTestNarrativeShort' + tti).hide()
                                                    viewModel.set('IsHighestScoreSubTestNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestNarrativeShort' + tti) == true) {
                                                        $('#IsHighestScoreSubTestNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestNarrativeShort' + tti).attr('onchange', 'DisplayHighestScoreSubTestNarrativeShortChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestNarrativeShort' + tti) == true) {
                                                        $('#IsLowestScoreSubTestNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestNarrativeShort' + tti).attr('onchange', 'DisplayLowestScoreSubTestNarrativeShortChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                } else {
                                                    viewModel.set('IsNotAllNarrativeSubTestNarrativeShort' + tti, true)
                                                    $('#IsNotAllNarrativeSubTestNarrativeShort' + tti).prop('checked', true)
                                                    viewModel.set('IsAllNarrativeSubTestNarrativeShort' + tti, false)
                                                    $('#HighestScoreSubTestNarrativeShort' + tti).show()
                                                    $('#LowestScoreSubTestNarrativeShort' + tti).show()
                                                    viewModel.set('IsHighestScoreSubTestNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestNarrativeShort' + tti) == true) {
                                                        $('#IsHighestScoreSubTestNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestNarrativeShort' + tti).attr('onchange', 'DisplayHighestScoreSubTestNarrativeShortChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestNarrativeShort' + tti) == true) {
                                                        $('#IsLowestScoreSubTestNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestNarrativeShort' + tti).attr('onchange', 'DisplayLowestScoreSubTestNarrativeShortChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                }
                                                viewModel.set('IsAllNarrativeSubTestNarrativeLong' + tti, false)
                                                viewModel.set('IsNotAllNarrativeSubTestNarrativeLong' + tti, false)

                                                if (viewModel.get('DisplayStatusSubTestNarrativeShort' + tti) == false) {
                                                    $('#DisplayStatusSubTestNarrativeShort' + tti).attr('checked', false)
                                                    $('#DisplayStatusSubTestNarrativeShort' + tti).attr('onchange', 'DisplayStatusSubTestNarrativeShortChecked(this)')
                                                } else {
                                                    $('#DisplayStatusSubTestNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                }
                                            } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                                viewModel.set('HasSubTestNarrativeLong' + tti, true);
                                                viewModel.set('DisplayStatusSubTestNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                $('#IsSubTestNarrativeLong' + tti).show()
                                                $('#AllNarrativesSubTestNarrativeLong' + tti).show()
                                                viewModel.set('DisplayStatusSubTestNarrative' + tti, false)
                                                $('#HasSubTestNarrative' + tti).hide()
                                                $('#AllNarrativesSubTestNarrative' + tti).hide()
                                                viewModel.set('DisplayStatusSubTestNarrativeShort' + tti, false)
                                                $('#IsSubTestNarrativeShort' + tti).hide()
                                                $('#AllNarrativesSubTestNarrativeShort' + tti).hide()
                                                if (response.Detail.Content.Narrative[tti].IsAllNarrative == true) {
                                                    viewModel.set('IsAllNarrativeSubTestNarrativeLong' + tti, true)
                                                    $('#IsAllNarrativeSubTestNarrativeLong' + tti).prop('checked', true)
                                                    viewModel.set('IsNotAllNarrativeSubTestNarrativeLong' + tti, false)
                                                    $('#HighestScoreSubTestNarrativeLong' + tti).hide()
                                                    $('#LowestScoreSubTestNarrativeLong' + tti).hide()
                                                    viewModel.set('IsHighestScoreSubTestNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestNarrativeLong' + tti) == true) {
                                                        $('#IsHighestScoreSubTestNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestNarrativeLong' + tti).attr('onchange', 'DisplayHighestScoreSubTestNarrativeLongChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestNarrativeLong' + tti) == true) {
                                                        $('#IsLowestScoreSubTestNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestNarrativeLong' + tti).attr('onchange', 'DisplayLowestScoreSubTestNarrativeLongChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                } else {
                                                    viewModel.set('IsNotAllNarrativeSubTestNarrativeLong' + tti, true)
                                                    $('#IsNotAllNarrativeSubTestNarrativeLong' + tti).prop('checked', true)
                                                    viewModel.set('IsAllNarrativeSubTestNarrativeLong' + tti, false)
                                                    $('#HighestScoreSubTestNarrativeLong' + tti).show()
                                                    $('#LowestScoreSubTestNarrativeLong' + tti).show()
                                                    viewModel.set('IsHighestScoreSubTestNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestNarrativeLong' + tti) == true) {
                                                        $('#IsHighestScoreSubTestNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestNarrativeLong' + tti).attr('onchange', 'DisplayHighestScoreSubTestNarrativeLongChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestNarrativeLong' + tti) == true) {
                                                        $('#IsLowestScoreSubTestNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestNarrativeLong' + tti).attr('onchange', 'DisplayLowestScoreSubTestNarrativeLongChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                }
                                                viewModel.set('IsAllNarrativeSubTestNarrativeShort' + tti, false)
                                                viewModel.set('IsNotAllNarrativeSubTestNarrativeShort' + tti, false)

                                                if (viewModel.get('DisplayStatusSubTestNarrativeLong' + tti) == false) {
                                                    $('#DisplayStatusSubTestNarrativeLong' + tti).attr('checked', false)
                                                    $('#DisplayStatusSubTestNarrativeLong' + tti).attr('onchange', 'DisplayStatusSubTestNarrativeLongChecked(this)')
                                                } else {
                                                    $('#DisplayStatusSubTestNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                }
                                            }
                                        } else {
                                            viewModel.set('DisplayStatusSubTestNarrative' + tti, false)
                                            $('#HasSubTestNarrative' + tti).hide()
                                            $('#AllNarrativesSubTestNarrative' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestNarrativeShort' + tti, false)
                                            $('#IsSubTestNarrativeShort' + tti).hide()
                                            $('#AllNarrativesSubTestNarrativeShort' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestNarrativeLong' + tti, false)
                                            $('#IsSubTestNarrativeLong' + tti).hide()
                                            $('#AllNarrativesSubTestNarrativeLong' + tti).hide()
                                            viewModel.set('IsAllNarrativeSubTestNarrative' + tti, false)
                                            viewModel.set('IsNotAllNarrativeSubTestNarrative' + tti, false)
                                            viewModel.set('IsAllNarrativeSubTestNarrativeShort' + tti, false)
                                            viewModel.set('IsNotAllNarrativeSubTestNarrativeShort' + tti, false)
                                            viewModel.set('IsAllNarrativeSubTestNarrativeLong' + tti, false)
                                            viewModel.set('IsNotAllNarrativeSubTestNarrativeLong' + tti, false)
                                        }
                                        ////SUBTEST CUTTING NARRATIVE
                                        var HasSubTestCuttingNarrative = response.Layout.HasSubTestCuttingNarrative;
                                        viewModel.set('HasSubTestCuttingNarrative' + tti, HasSubTestCuttingNarrative);
                                        if (HasSubTestCuttingNarrative == true) {
                                            if (response.Layout.IsSubTestNarrativeShort == true) {
                                                viewModel.set('HasSubTestCuttingNarrativeShort' + tti, true);
                                                viewModel.set('DisplayStatusSubTestCuttingNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                $('#IsSubTestCuttingNarrativeShort' + tti).show()
                                                $('#AllNarrativesSubTestCuttingNarrativeShort' + tti).show()
                                                viewModel.set('DisplayStatusSubTestCuttingNarrative' + tti, false)
                                                $('#HasSubTestCuttingNarrative' + tti).hide()
                                                $('#AllNarrativesSubTestCuttingNarrative' + tti).hide()
                                                viewModel.set('DisplayStatusSubTestCuttingNarrativeLong' + tti, false)
                                                $('#IsSubTestCuttingNarrativeLong' + tti).hide()
                                                $('#AllNarrativesSubTestCuttingNarrativeLong' + tti).hide()
                                                if (response.Detail.Content.Narrative[tti].IsAllNarrative == true) {
                                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort' + tti, true)
                                                    $('#IsAllNarrativeSubTestCuttingNarrativeShort' + tti).prop('checked', true)
                                                    viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti, false)
                                                    $('#HighestScoreSubTestCuttingNarrativeShort' + tti).hide()
                                                    $('#LowestScoreSubTestCuttingNarrativeShort' + tti).hide()
                                                    viewModel.set('IsHighestScoreSubTestCuttingNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestCuttingNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestCuttingNarrativeShort' + tti) == true) {
                                                        $('#IsHighestScoreSubTestCuttingNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestCuttingNarrativeShort' + tti).attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeShortChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestCuttingNarrativeShort' + tti) == true) {
                                                        $('#IsLowestScoreSubTestCuttingNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestCuttingNarrativeShort' + tti).attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeShortChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                } else {
                                                    viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti, true)
                                                    $('#IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti).prop('checked', true)
                                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort' + tti, false)
                                                    $('#HighestScoreSubTestCuttingNarrativeShort' + tti).show()
                                                    $('#LowestScoreSubTestCuttingNarrativeShort' + tti).show()
                                                    viewModel.set('IsHighestScoreSubTestCuttingNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestCuttingNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestCuttingNarrativeShort' + tti) == true) {
                                                        $('#IsHighestScoreSubTestCuttingNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestCuttingNarrativeShort' + tti).attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeShortChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestCuttingNarrativeShort' + tti) == true) {
                                                        $('#IsLowestScoreSubTestCuttingNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestCuttingNarrativeShort' + tti).attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeShortChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                }
                                                viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong' + tti, false)
                                                viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti, false)

                                                if (viewModel.get('DisplayStatusSubTestCuttingNarrativeShort' + tti) == false) {
                                                    $('#DisplayStatusSubTestCuttingNarrativeShort' + tti).attr('checked', false)
                                                    $('#DisplayStatusSubTestCuttingNarrativeShort' + tti).attr('onchange', 'DisplayStatusSubTestCuttingNarrativeShortChecked(this)')
                                                } else {
                                                    $('#DisplayStatusSubTestCuttingNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                }
                                            } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                                viewModel.set('HasSubTestCuttingNarrativeLong' + tti, true);
                                                viewModel.set('DisplayStatusSubTestCuttingNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                $('#IsSubTestCuttingNarrativeLong' + tti).show()
                                                $('#AllNarrativesSubTestCuttingNarrativeLong' + tti).show()
                                                viewModel.set('DisplayStatusSubTestCuttingNarrative' + tti, false)
                                                $('#HasSubTestCuttingNarrative' + tti).hide()
                                                $('#AllNarrativesSubTestCuttingNarrative' + tti).hide()
                                                viewModel.set('DisplayStatusSubTestCuttingNarrativeShort' + tti, false)
                                                $('#IsSubTestCuttingNarrativeShort' + tti).hide()
                                                $('#AllNarrativesSubTestCuttingNarrativeShort' + tti).hide()
                                                if (response.Detail.Content.Narrative[tti].IsAllNarrative == true) {
                                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong' + tti, true)
                                                    $('#IsAllNarrativeSubTestCuttingNarrativeLong' + tti).prop('checked', true)
                                                    viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti, false)
                                                    $('#HighestScoreSubTestCuttingNarrativeLong' + tti).hide()
                                                    $('#LowestScoreSubTestCuttingNarrativeLong' + tti).hide()
                                                    viewModel.set('IsHighestScoreSubTestCuttingNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestCuttingNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestCuttingNarrativeLong' + tti) == true) {
                                                        $('#IsHighestScoreSubTestCuttingNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestCuttingNarrativeLong' + tti).attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeLongChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestCuttingNarrativeLong' + tti) == true) {
                                                        $('#IsLowestScoreSubTestCuttingNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestCuttingNarrativeLong' + tti).attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeLongChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                } else {
                                                    viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti, true)
                                                    $('#IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti).prop('checked', true)
                                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong' + tti, false)
                                                    $('#HighestScoreSubTestCuttingNarrativeLong' + tti).show()
                                                    $('#LowestScoreSubTestCuttingNarrativeLong' + tti).show()
                                                    viewModel.set('IsHighestScoreSubTestCuttingNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestCuttingNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestCuttingNarrativeLong' + tti) == true) {
                                                        $('#IsHighestScoreSubTestCuttingNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestCuttingNarrativeLong' + tti).attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeLongChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestCuttingNarrativeLong' + tti) == true) {
                                                        $('#IsLowestScoreSubTestCuttingNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestCuttingNarrativeLong' + tti).attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeLongChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                }
                                                viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort' + tti, false)
                                                viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti, false)

                                                if (viewModel.get('DisplayStatusSubTestCuttingNarrativeLong' + tti) == false) {
                                                    $('#DisplayStatusSubTestCuttingNarrativeLong' + tti).attr('checked', false)
                                                    $('#DisplayStatusSubTestCuttingNarrativeLong' + tti).attr('onchange', 'DisplayStatusSubTestCuttingNarrativeLongChecked(this)')
                                                } else {
                                                    $('#DisplayStatusSubTestCuttingNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                }
                                            }
                                            viewModel.set('IsAllNarrativeSubTestCuttingNarrative' + tti, false)
                                            viewModel.set('IsNotAllNarrativeSubTestCuttingNarrative' + tti, false)
                                        } else {
                                            viewModel.set('DisplayStatusSubTestCuttingNarrative' + tti, false)
                                            $('#HasSubTestCuttingNarrative' + tti).hide()
                                            $('#AllNarrativesSubTestCuttingNarrative' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeShort' + tti, false)
                                            $('#IsSubTestCuttingNarrativeShort' + tti).hide()
                                            $('#AllNarrativesSubTestCuttingNarrativeShort' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeLong' + tti, false)
                                            $('#IsSubTestCuttingNarrativeLong' + tti).hide()
                                            $('#AllNarrativesSubTestCuttingNarrativeLong' + tti).hide()
                                            viewModel.set('IsAllNarrativeSubTestCuttingNarrative' + tti, false)
                                            viewModel.set('IsNotAllNarrativeSubTestCuttingNarrative' + tti, false)
                                            viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort' + tti, false)
                                            viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti, false)
                                            viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong' + tti, false)
                                            viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti, false)
                                        }
                                        ////IQ NARRATIVE
                                        var HasIQNarrative = response.Layout.HasIQNarrative;
                                        viewModel.set('HasIQNarrative' + tti, HasIQNarrative);
                                        if (HasIQNarrative == true) {                           //PERSONALITY > TIDAK ADA IQ NARRATIVE
                                            viewModel.set('DisplayStatusIQNarrative' + tti, response.Detail.Content.Narrative[tti].IsDisplayIQNarrative)
                                            if (viewModel.get('DisplayStatusIQNarrative' + tti) == false) {
                                                $('#DisplayStatusIQNarrative' + tti).attr('checked', false)
                                                $('#DisplayStatusIQNarrative' + tti).attr('onchange', 'DisplayStatusIQNarrativeChecked(this)')
                                            } else {
                                                $('#DisplayStatusIQNarrative' + tti).val(response.Detail.Content.Narrative[tti].IsDisplayIQNarrative)
                                            }
                                            $('#HasIQNarrative' + tti).hide()
                                        } else {
                                            viewModel.set('DisplayStatusIQNarrative' + tti, false)
                                            $('#HasIQNarrative' + tti).hide()
                                        }
                                        ////VALIDITY SCALE NARRATIVE
                                        var HasValidityScaleNarrative = response.Layout.HasValidityScaleNarrative;
                                        viewModel.set('HasValidityScaleNarrative' + tti, HasValidityScaleNarrative);
                                        if (HasValidityScaleNarrative == true) {
                                            viewModel.set('DisplayStatusValidityScaleNarrative' + tti, response.Detail.Content.Narrative[tti].IsDisplayValidityScaleNarrative)
                                            if (viewModel.get('DisplayStatusValidityScaleNarrative' + tti) == false) {
                                                $('#DisplayStatusValidityScaleNarrative' + tti).attr('checked', false)
                                                $('#DisplayStatusValidityScaleNarrative' + tti).attr('onchange', 'DisplayStatusValidityScaleNarrativeChecked(this)')
                                            } else {
                                                $('#DisplayStatusValidityScaleNarrative' + tti).val(response.Detail.Content.Narrative[tti].IsDisplayValidityScaleNarrative)
                                            }
                                            $('#HasValidityScaleNarrative' + tti).show()
                                        } else {
                                            viewModel.set('DisplayStatusValidityScaleNarrative' + tti, false)
                                            $('#HasValidityScaleNarrative' + tti).hide()
                                        }
                                        ////GROUP NARRATIVE
                                        var HasGroupNarrative = response.Layout.HasGroupNarrative;
                                        viewModel.set('HasGroupNarrative' + tti, HasGroupNarrative);
                                        if (HasGroupNarrative == true) {
                                            viewModel.set('DisplayStatusGroupNarrative' + tti, response.Detail.Content.Narrative[tti].IsDisplayGroupNarrative)
                                            if (viewModel.get('DisplayStatusGroupNarrative' + tti) == false) {
                                                $('#DisplayStatusGroupNarrative' + tti).attr('checked', false)
                                                $('#DisplayStatusGroupNarrative' + tti).attr('onchange', 'DisplayStatusGroupNarrativeChecked(this)')
                                            } else {
                                                $('#DisplayStatusGroupNarrative' + tti).val(response.Detail.Content.Narrative[tti].IsDisplayGroupNarrative)
                                            }
                                            $('#HasGroupNarrative' + tti).show()
                                        } else {
                                            viewModel.set('DisplayStatusGroupNarrative' + tti, false)
                                            $('#HasGroupNarrative' + tti).hide()
                                        }

                                        viewModel.set('DisplayStatusNarrativesGroupNarratives' + tti, response.Detail.Content.Narrative[tti].IsDisplay)
                                        if (viewModel.get('DisplayStatusNarrativesGroupNarratives' + tti) == false) {
                                            $('#DisplayStatusNarrativesGroupNarratives' + tti).attr('checked', false)
                                            $('#DisplayStatusNarrativesGroupNarratives' + tti).attr('onchange', 'DisplayStatusNarrativesGroupNarrativesChecked(this)')
                                        } else {
                                            $('#DisplayStatusNarrativesGroupNarratives' + tti).val(response.Detail.Content.Narrative[tti].IsDisplay)
                                        }

                                        var NarrativeSequenceLength = response.Detail.Content.Narrative[tti].NarrativeSequence.length
                                        var NarrativeSequence = []
                                        if (NarrativeSequenceLength > 0) {
                                            for (ns = 0; ns < NarrativeSequenceLength; ns++) {
                                                NarrativeSequence.push(response.Detail.Content.Narrative[tti].NarrativeSequence[ns])
                                            }
                                        }

                                        if (NarrativeSequence.length > 0) {
                                            for (ns = (NarrativeSequence.length - 1); ns >= 0; --ns) {
                                                if (NarrativeSequence[ns] == "subtest") {
                                                    if (($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length > 0) {
                                                        var ulLength = ($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length
                                                        for (ul = 0; ul < ulLength; ul++) {
                                                            if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).css('display') == "block") {
                                                                if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).attr('data-type') == "subtest") {
                                                                    var id = $($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).attr('id')
                                                                    $('#' + id).prependTo('#NarrativesGroupNarratives' + tti + ' > .form-content ul.draggable')
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else if (NarrativeSequence[ns] == "iq") {
                                                    if (($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length > 0) {
                                                        var ulLength = ($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length
                                                        for (ul = 0; ul < ulLength; ul++) {
                                                            if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).css('display') == "block") {
                                                                if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).attr('data-type') == "iq") {
                                                                    $('#HasIQNarrative' + tti).prependTo('#NarrativesGroupNarratives' + tti + ' > .form-content ul.draggable')
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else if (NarrativeSequence[ns] == "vs") {
                                                    if (($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length > 0) {
                                                        var ulLength = ($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length
                                                        for (ul = 0; ul < ulLength; ul++) {
                                                            if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).css('display') == "block") {
                                                                if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).attr('data-type') == "vs") {
                                                                    $('#HasValidityScaleNarrative' + tti).prependTo('#NarrativesGroupNarratives' + tti + ' > .form-content ul.draggable')
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else if (NarrativeSequence[ns] == "group") {
                                                    if (($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length > 0) {
                                                        var ulLength = ($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length
                                                        for (ul = 0; ul < ulLength; ul++) {
                                                            if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).css('display') == "block") {
                                                                if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).attr('data-type') == "group") {
                                                                    $('#HasGroupNarrative' + tti).prependTo('#NarrativesGroupNarratives' + tti + ' > .form-content ul.draggable')
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        $('.draggable').sortable({
                                            connectWith: '.draggable',
                                            //revert: true
                                        });
                                        $('.draggable li').draggable({
                                            connectToSortable: '.draggable',
                                            revert: 'invalid'
                                        });
                                        $('ul, li').disableSelection();
                                    }
                                    else {                                                                                                             
                                        // Psychogram Ability => IsByTest false
                                        viewModel.set('HasPsychogramAbility', true)
                                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramAbility').length == 0 ?
                                            $('#contentBox > ul.form-content li#contentLayout').append(
                                                '<div id="panelbarPsychogramAbility">' +
                                                '<div id="PsychogramAbility">Psychogram Ability' +
                                                '<ul class="form-content">' +
                                                '<li style="padding-top:2%; padding-bottom:2%">' +
                                                '<label>Title<span class="mandatory">*</span></label>' +
                                                '<input id="TitlePsychogramAbility" name="TitlePsychogramAbility" style="width:50%" data-bind="value: TitlePsychogramAbility" />' +
                                                '</li>' +
                                                '</ul>' +
                                                '<span style="float:right">' +
                                                '<input type="checkbox" id="DisplayStatusPsychogramAbility" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusPsychogramAbility" onchange="DisplayStatusPsychogramAbility(this)" />Display' +
                                                '</span>' +
                                                '</div>' +
                                                '</div>'
                                            ) : null

                                        viewModel.set('TitlePsychogramAbility', response.Detail.Content.Psychogram[tti].Title);
                                        $('#TitlePsychogramAbility').val(response.Detail.Content.Psychogram[tti].Title)
                                        viewModel.set('DisplayStatusPsychogramAbility', response.Detail.Content.Psychogram[tti].IsDisplay)
                                        if (viewModel.DisplayStatusPsychogramAbility == false) {
                                            $('#DisplayStatusPsychogramAbility').attr('checked', false)
                                            $('#DisplayStatusPsychogramAbility').attr('onchange', 'DisplayStatusPsychogramAbilityChecked(this)')
                                        } else {
                                            $('#DisplayStatusPsychogramAbility').val(response.Detail.Content.Psychogram[tti].IsDisplay)
                                        }

                                        $("#panelbarPsychogramAbility").kendoPanelBar();
                                        var panelbarPsychogramAbility = $("#panelbarPsychogramAbility").data("kendoPanelBar");
                                        panelbarPsychogramAbility.expand($("#PsychogramAbility"));

                                        $('#contentBox > ul.form-content li#contentLayout').append(
                                            '<div id="panelbarNarrativesGroupNarratives' + tti + '" style="width: 96.5%;">' +
                                            '<div id="NarrativesGroupNarratives' + tti + '">Narratives & Group Narratives' +
                                            '<ul class="form-content">' +
                                            '<li style="padding-top:2%;padding-bottom:2%">' +
                                            '<label>Title<span class="mandatory">*</span></label>' +
                                            '<input id="TitleNarrativesGroupNarratives' + tti + '" name="TitleNarrativesGroupNarratives" style="width:50%" data-bind="value:TitleNarrativesGroupNarratives" />' +
                                            '</li>' +
                                            '<li id="listNarratives' + tti + '" style="padding-top:2%;padding-bottom:2%">' +
                                            '<ul class="draggable">' +
                                            '<li id="HasSubTestNarrative' + tti + '" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusSubTestNarrative' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrative" onchange="Display(this)"/>Display' +
                                            '</span>' +
                                            '<div id="AllNarrativesSubTestNarrative' + tti + '">All Narratives' +
                                            '<input type="radio" name="IsAllNarrativeSubTestNarrative' + tti + '" id="IsAllNarrativeSubTestNarrative' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrative" tti="' + tti + '" onclick="AllNarrativeSubTestNarrative(this)"/>' +
                                            '<span> Yes</span>' +
                                            '<input type="radio" name="IsAllNarrativeSubTestNarrative' + tti + '" id="IsNotAllNarrativeSubTestNarrative' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestNarrative" tti="' + tti + '" onclick="NotAllNarrativeSubTestNarrative(this)"/>' +
                                            '<span> No</span>' +
                                            '</div>' +
                                            '<div id="HighestScoreSubTestNarrative' + tti + '" hidden="hidden">Highest Score' +
                                            '<input type="checkbox" id="IsHighestScoreSubTestNarrative' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrative" tti="' + tti + '" onchange="DisplayHighestScoreSubTestNarrative(this)" />' +
                                            '<input id="HighestScoreTotalDisplaySubTestNarrative' + tti + '" name="HighestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                                            '</div>' +
                                            '<div id="LowestScoreSubTestNarrative' + tti + '" hidden="hidden">Lowest Score' +
                                            '<input type="checkbox" id="IsLowestScoreSubTestNarrative' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrative" tti="' + tti + '" onchange="DisplayLowestScoreSubTestNarrative(this)" />' +
                                            '<input id="LowestScoreTotalDisplaySubTestNarrative' + tti + '" name="LowestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                                            '</div>' +
                                            '</li>' +
                                            '<li id="IsSubTestNarrativeShort' + tti + '" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Short]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusSubTestNarrativeShort' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeShort" onchange="DisplayStatusSubTestNarrativeShort(this)" />Display' +
                                            '</span>' +
                                            '<div id="AllNarrativesSubTestNarrativeShort' + tti + '">All Narratives' +
                                            '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort' + tti + '" id="IsAllNarrativeSubTestNarrativeShort' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeShort" tti="' + tti + '" onclick="AllNarrativeSubTestNarrativeShort(this)"/>' +
                                            '<span> Yes</span>' +
                                            '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort' + tti + '" id="IsNotAllNarrativeSubTestNarrativeShort' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestNarrativeShort" tti="' + tti + '" onclick="NotAllNarrativeSubTestNarrativeShort(this)"/>' +
                                            '<span> No</span>' +
                                            '</div>' +
                                            '<div id="HighestScoreSubTestNarrativeShort' + tti + '" hidden="hidden">Highest Score' +
                                            '<input type="checkbox" id="IsHighestScoreSubTestNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeShort" tti="' + tti + '" onchange="DisplayHighestScoreSubTestNarrativeShort(this)" />' +
                                            '<input id="HighestScoreTotalDisplaySubTestNarrativeShort' + tti + '" name="HighestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                                            '</div>' +
                                            '<div id="LowestScoreSubTestNarrativeShort' + tti + '" hidden="hidden">Lowest Score' +
                                            '<input type="checkbox" id="IsLowestScoreSubTestNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeShort" tti="' + tti + '" onchange="DisplayLowestScoreSubTestNarrativeShort(this)" />' +
                                            '<input id="LowestScoreTotalDisplaySubTestNarrativeShort' + tti + '" name="LowestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                                            '</div>' +
                                            '</li >' +
                                            '<li id="IsSubTestNarrativeLong' + tti + '" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Long]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusSubTestNarrativeLong' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeLong" onchange="DisplayStatusSubTestNarrativeLong(this)" />Display' +
                                            '</span>' +
                                            '<div id="AllNarrativesSubTestNarrativeLong' + tti + '">All Narratives' +
                                            '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong' + tti + '" id="IsAllNarrativeSubTestNarrativeLong' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeLong" tti="' + tti + '" onclick="AllNarrativeSubTestNarrativeLong(this)"/>' +
                                            '<span> Yes</span>' +
                                            '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong' + tti + '" id="IsNotAllNarrativeSubTestNarrativeLong' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestNarrativeLong" tti="' + tti + '" onclick="NotAllNarrativeSubTestNarrativeLong(this)"/>' +
                                            '<span> No</span>' +
                                            '</div>' +
                                            '<div id="HighestScoreSubTestNarrativeLong' + tti + '" hidden="hidden">Highest Score' +
                                            '<input type="checkbox" id="IsHighestScoreSubTestNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeLong" tti="' + tti + '" onchange="DisplayHighestScoreSubTestNarrativeLong(this)" />' +
                                            '<input id="HighestScoreTotalDisplaySubTestNarrativeLong' + tti + '" name="HighestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                                            '</div>' +
                                            '<div id="LowestScoreSubTestNarrativeLong' + tti + '" hidden="hidden">Lowest Score' +
                                            '<input type="checkbox" id="IsLowestScoreSubTestNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeLong" tti="' + tti + '" onchange="DisplayLowestScoreSubTestNarrativeLong(this)" />' +
                                            '<input id="LowestScoreTotalDisplaySubTestNarrativeLong' + tti + '" name="LowestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                                            '</div>' +
                                            '</li >' +
                                            '<li id="HasSubTestCuttingNarrative' + tti + '" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrative' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrative" onchange="DisplayStatusSubTestCuttingNarrative(this)" />Display' +
                                            '</span>' +
                                            '<div id="AllNarrativesSubTestCuttingNarrative' + tti + '">All Narratives' +
                                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative' + tti + '" id="IsAllNarrativeSubTestCuttingNarrative' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrative" tti="' + tti + '" onclick="AllNarrativeSubTestCuttingNarrative(this)"/>' +
                                            '<span> Yes</span>' +
                                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative' + tti + '" id="IsNotAllNarrativeSubTestCuttingNarrative' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrative" tti="' + tti + '" onclick="NotAllNarrativeSubTestCuttingNarrative(this)"/>' +
                                            '<span> No</span>' +
                                            '</div>' +
                                            '<div id="HighestScoreSubTestCuttingNarrative' + tti + '" hidden="hidden">Highest Score' +
                                            '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrative' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrative" tti="' + tti + '" onchange="DisplayHighestScoreSubTestCuttingNarrative(this)" />' +
                                            '<input id="HighestScoreTotalDisplaySubTestCuttingNarrative' + tti + '" name="HighestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                                            '</div>' +
                                            '<div id="LowestScoreSubTestCuttingNarrative' + tti + '" hidden="hidden">Lowest Score' +
                                            '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrative' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrative" tti="' + tti + '" onchange="DisplayLowestScoreSubTestCuttingNarrative(this)" />' +
                                            '<input id="LowestScoreTotalDisplaySubTestCuttingNarrative' + tti + '" name="LowestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                                            '</div>' +
                                            '</li >' +
                                            '<li id="IsSubTestCuttingNarrativeShort' + tti + '" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Short]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeShort' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeShort" onchange="DisplayStatusSubTestCuttingNarrativeShort(this)" />Display' +
                                            '</span>' +
                                            '<div id="AllNarrativesSubTestCuttingNarrativeShort' + tti + '">All Narratives' +
                                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort' + tti + '" id="IsAllNarrativeSubTestCuttingNarrativeShort' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeShort" tti="' + tti + '" onclick="AllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                                            '<span> Yes</span>' +
                                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort' + tti + '" id="IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeShort" tti="' + tti + '" onclick="NotAllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                                            '<span> No</span>' +
                                            '</div>' +
                                            '<div id="HighestScoreSubTestCuttingNarrativeShort' + tti + '" hidden="hidden">Highest Score' +
                                            '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeShort" tti="' + tti + '" onchange="DisplayHighestScoreSubTestCuttingNarrativeShort(this)" />' +
                                            '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti + '" name="HighestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                                            '</div>' +
                                            '<div id="LowestScoreSubTestCuttingNarrativeShort' + tti + '" hidden="hidden">Lowest Score' +
                                            '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeShort" tti="' + tti + '" onchange="DisplayLowestScoreSubTestCuttingNarrativeShort(this)" />' +
                                            '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti + '" name="LowestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                                            '</div>' +
                                            '</li>' +
                                            '<li id="IsSubTestCuttingNarrativeLong' + tti + '" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Long]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeLong' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeLong" onchange="DisplayStatusSubTestCuttingNarrativeLong(this)" />Display' +
                                            '</span>' +
                                            '<div id="AllNarrativesSubTestCuttingNarrativeLong' + tti + '">All Narratives' +
                                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong' + tti + '" id="IsAllNarrativeSubTestCuttingNarrativeLong' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeLong" tti="' + tti + '" onclick="AllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                                            '<span> Yes</span>' +
                                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong' + tti + '" id="IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeLong" tti="' + tti + '" onclick="NotAllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                                            '<span> No</span>' +
                                            '</div>' +
                                            '<div id="HighestScoreSubTestCuttingNarrativeLong' + tti + '" hidden="hidden">Highest Score' +
                                            '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeLong" tti="' + tti + '" onchange="DisplayHighestScoreSubTestCuttingNarrativeLong(this)" />' +
                                            '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti + '" name="HighestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                                            '</div>' +
                                            '<div id="LowestScoreSubTestCuttingNarrativeLong' + tti + '" hidden="hidden">Lowest Score' +
                                            '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeLong" tti="' + tti + '" onchange="DisplayLowestScoreSubTestCuttingNarrativeLong(this)" />' +
                                            '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti + '" name="LowestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                                            '</div>' +
                                            '</li>' +
                                            '<li id="HasIQNarrative' + tti + '" style="border: outset; width:50%; display:block" data-type="iq">[[IQ Narratives]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusIQNarrative' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusIQNarrative" onchange="DisplayStatusIQNarrative(this)" />Display' +
                                            '</span>' +
                                            '</li>' +
                                            '<li id="HasValidityScaleNarrative' + tti + '" style="border: outset; width:50%; display:block" data-type="vs">[[Validity Scale Narratives]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusValidityScaleNarrative' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusValidityScaleNarrative" onchange="DisplayStatusValidityScaleNarrative(this)" />Display' +
                                            '</span>' +
                                            '</li>' +
                                            '<li id="HasGroupNarrative' + tti + '" style="border: outset; width:50%; display:block" data-type="group">[[Group Narratives]]' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusGroupNarrative' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusGroupNarrative" onchange="DisplayStatusGroupNarrative(this)" />Display' +
                                            '</span>' +
                                            '</li>' +
                                            '</ul>' +
                                            '</li>' +
                                            '</ul>' +
                                            '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusNarrativesGroupNarratives' + tti + '" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusNarrativesGroupNarratives" onchange="DisplayStatusNarrativesGroupNarratives(this)" />Display' +
                                            '</span>' +
                                            '</div>' +
                                            '</div>'
                                        )

                                        viewModel.set('TitleNarrativesGroupNarratives' + tti, response.Detail.Content.Narrative[tti].Title);
                                        $('#TitleNarrativesGroupNarratives' + tti).val(response.Detail.Content.Narrative[tti].Title)

                                        $('#HighestScoreTotalDisplaySubTestNarrative' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#LowestScoreTotalDisplaySubTestNarrative' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#HighestScoreTotalDisplaySubTestNarrativeShort' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#LowestScoreTotalDisplaySubTestNarrativeShort' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#HighestScoreTotalDisplaySubTestNarrativeLong' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#LowestScoreTotalDisplaySubTestNarrativeLong' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });

                                        $('#HighestScoreTotalDisplaySubTestCuttingNarrative' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#LowestScoreTotalDisplaySubTestCuttingNarrative' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });
                                        $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).keypress(function (e) {
                                            if (e.which == 46 || e.which == 44) {
                                                return false;
                                            }
                                        });

                                        $("#panelbarNarrativesGroupNarratives" + tti + "").kendoPanelBar();
                                        var panelbarNarrativesGroupNarratives = $("#panelbarNarrativesGroupNarratives" + tti + "").data("kendoPanelBar");
                                        panelbarNarrativesGroupNarratives.expand($("#NarrativesGroupNarratives"));

                                        //NARRATIVES & GROUP NARRATIVES
                                        ////SUBTEST NARRATIVE
                                        var HasSubTestNarrative = response.Layout.HasSubTestNarrative;
                                        viewModel.set('HasSubTestNarrative' + tti, HasSubTestNarrative);
                                        if (HasSubTestNarrative == true) {
                                            if (response.Layout.IsSubTestNarrativeShort == true) {
                                                viewModel.set('HasSubTestNarrativeShort' + tti, true);
                                                viewModel.set('DisplayStatusSubTestNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                $('#IsSubTestNarrativeShort' + tti).show()
                                                $('#AllNarrativesSubTestNarrativeShort' + tti).show()
                                                viewModel.set('DisplayStatusSubTestNarrative' + tti, false)
                                                $('#HasSubTestNarrative' + tti).hide()
                                                $('#AllNarrativesSubTestNarrative' + tti).hide()
                                                viewModel.set('DisplayStatusSubTestNarrativeLong' + tti, false)
                                                $('#IsSubTestNarrativeLong' + tti).hide()
                                                $('#AllNarrativesSubTestNarrativeLong' + tti).hide()
                                                if (response.Detail.Content.Narrative[tti].IsAllNarrative == true) {
                                                    viewModel.set('IsAllNarrativeSubTestNarrativeShort' + tti, true)
                                                    $('#IsAllNarrativeSubTestNarrativeShort' + tti).prop('checked', true)
                                                    viewModel.set('IsNotAllNarrativeSubTestNarrativeShort' + tti, false)
                                                    $('#HighestScoreSubTestNarrativeShort' + tti).hide()
                                                    $('#LowestScoreSubTestNarrativeShort' + tti).hide()
                                                    viewModel.set('IsHighestScoreSubTestNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestNarrativeShort' + tti) == true) {
                                                        $('#IsHighestScoreSubTestNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestNarrativeShort' + tti).attr('onchange', 'DisplayHighestScoreSubTestNarrativeShortChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestNarrativeShort' + tti) == true) {
                                                        $('#IsLowestScoreSubTestNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestNarrativeShort' + tti).attr('onchange', 'DisplayLowestScoreSubTestNarrativeShortChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                } else {
                                                    viewModel.set('IsNotAllNarrativeSubTestNarrativeShort' + tti, true)
                                                    $('#IsNotAllNarrativeSubTestNarrativeShort' + tti).prop('checked', true)
                                                    viewModel.set('IsAllNarrativeSubTestNarrativeShort' + tti, false)
                                                    $('#HighestScoreSubTestNarrativeShort' + tti).show()
                                                    $('#LowestScoreSubTestNarrativeShort' + tti).show()
                                                    viewModel.set('IsHighestScoreSubTestNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestNarrativeShort' + tti) == true) {
                                                        $('#IsHighestScoreSubTestNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestNarrativeShort' + tti).attr('onchange', 'DisplayHighestScoreSubTestNarrativeShortChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestNarrativeShort' + tti) == true) {
                                                        $('#IsLowestScoreSubTestNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestNarrativeShort' + tti).attr('onchange', 'DisplayLowestScoreSubTestNarrativeShortChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                }
                                                viewModel.set('IsAllNarrativeSubTestNarrativeLong' + tti, false)
                                                viewModel.set('IsNotAllNarrativeSubTestNarrativeLong' + tti, false)

                                                if (viewModel.get('DisplayStatusSubTestNarrativeShort' + tti) == false) {
                                                    $('#DisplayStatusSubTestNarrativeShort' + tti).attr('checked', false)
                                                    $('#DisplayStatusSubTestNarrativeShort' + tti).attr('onchange', 'DisplayStatusSubTestNarrativeShortChecked(this)')
                                                } else {
                                                    $('#DisplayStatusSubTestNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                }
                                            } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                                viewModel.set('HasSubTestNarrativeLong' + tti, true);
                                                viewModel.set('DisplayStatusSubTestNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                $('#IsSubTestNarrativeLong' + tti).show()
                                                $('#AllNarrativesSubTestNarrativeLong' + tti).show()
                                                viewModel.set('DisplayStatusSubTestNarrative' + tti, false)
                                                $('#HasSubTestNarrative' + tti).hide()
                                                $('#AllNarrativesSubTestNarrative' + tti).hide()
                                                viewModel.set('DisplayStatusSubTestNarrativeShort' + tti, false)
                                                $('#IsSubTestNarrativeShort' + tti).hide()
                                                $('#AllNarrativesSubTestNarrativeShort' + tti).hide()
                                                if (response.Detail.Content.Narrative[tti].IsAllNarrative == true) {
                                                    viewModel.set('IsAllNarrativeSubTestNarrativeLong' + tti, true)
                                                    $('#IsAllNarrativeSubTestNarrativeLong' + tti).prop('checked', true)
                                                    viewModel.set('IsNotAllNarrativeSubTestNarrativeLong' + tti, false)
                                                    $('#HighestScoreSubTestNarrativeLong' + tti).hide()
                                                    $('#LowestScoreSubTestNarrativeLong' + tti).hide()
                                                    viewModel.set('IsHighestScoreSubTestNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestNarrativeLong' + tti) == true) {
                                                        $('#IsHighestScoreSubTestNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestNarrativeLong' + tti).attr('onchange', 'DisplayHighestScoreSubTestNarrativeLongChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestNarrativeLong' + tti) == true) {
                                                        $('#IsLowestScoreSubTestNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestNarrativeLong' + tti).attr('onchange', 'DisplayLowestScoreSubTestNarrativeLongChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                } else {
                                                    viewModel.set('IsNotAllNarrativeSubTestNarrativeLong' + tti, true)
                                                    $('#IsNotAllNarrativeSubTestNarrativeLong' + tti).prop('checked', true)
                                                    viewModel.set('IsAllNarrativeSubTestNarrativeLong' + tti, false)
                                                    $('#HighestScoreSubTestNarrativeLong' + tti).show()
                                                    $('#LowestScoreSubTestNarrativeLong' + tti).show()
                                                    viewModel.set('IsHighestScoreSubTestNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestNarrativeLong' + tti) == true) {
                                                        $('#IsHighestScoreSubTestNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestNarrativeLong' + tti).attr('onchange', 'DisplayHighestScoreSubTestNarrativeLongChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestNarrativeLong' + tti) == true) {
                                                        $('#IsLowestScoreSubTestNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestNarrativeLong' + tti).attr('onchange', 'DisplayLowestScoreSubTestNarrativeLongChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                }
                                                viewModel.set('IsAllNarrativeSubTestNarrativeShort' + tti, false)
                                                viewModel.set('IsNotAllNarrativeSubTestNarrativeShort' + tti, false)

                                                if (viewModel.get('DisplayStatusSubTestNarrativeLong' + tti) == false) {
                                                    $('#DisplayStatusSubTestNarrativeLong' + tti).attr('checked', false)
                                                    $('#DisplayStatusSubTestNarrativeLong' + tti).attr('onchange', 'DisplayStatusSubTestNarrativeLongChecked(this)')
                                                } else {
                                                    $('#DisplayStatusSubTestNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                }
                                            }
                                        } else {
                                            viewModel.set('DisplayStatusSubTestNarrative' + tti, false)
                                            $('#HasSubTestNarrative' + tti).hide()
                                            $('#AllNarrativesSubTestNarrative' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestNarrativeShort' + tti, false)
                                            $('#IsSubTestNarrativeShort' + tti).hide()
                                            $('#AllNarrativesSubTestNarrativeShort' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestNarrativeLong' + tti, false)
                                            $('#IsSubTestNarrativeLong' + tti).hide()
                                            $('#AllNarrativesSubTestNarrativeLong' + tti).hide()
                                            viewModel.set('IsAllNarrativeSubTestNarrative' + tti, false)
                                            viewModel.set('IsNotAllNarrativeSubTestNarrative' + tti, false)
                                            viewModel.set('IsAllNarrativeSubTestNarrativeShort' + tti, false)
                                            viewModel.set('IsNotAllNarrativeSubTestNarrativeShort' + tti, false)
                                            viewModel.set('IsAllNarrativeSubTestNarrativeLong' + tti, false)
                                            viewModel.set('IsNotAllNarrativeSubTestNarrativeLong' + tti, false)
                                        }
                                        ////SUBTEST CUTTING NARRATIVE
                                        var HasSubTestCuttingNarrative = response.Layout.HasSubTestCuttingNarrative;
                                        viewModel.set('HasSubTestCuttingNarrative' + tti, HasSubTestCuttingNarrative);
                                        if (HasSubTestCuttingNarrative == true) {
                                            if (response.Layout.IsSubTestNarrativeShort == true) {
                                                viewModel.set('HasSubTestCuttingNarrativeShort' + tti, true);
                                                viewModel.set('DisplayStatusSubTestCuttingNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                $('#IsSubTestCuttingNarrativeShort' + tti).show()
                                                $('#AllNarrativesSubTestCuttingNarrativeShort' + tti).show()
                                                viewModel.set('DisplayStatusSubTestCuttingNarrative' + tti, false)
                                                $('#HasSubTestCuttingNarrative' + tti).hide()
                                                $('#AllNarrativesSubTestCuttingNarrative' + tti).hide()
                                                viewModel.set('DisplayStatusSubTestCuttingNarrativeLong' + tti, false)
                                                $('#IsSubTestCuttingNarrativeLong' + tti).hide()
                                                $('#AllNarrativesSubTestCuttingNarrativeLong' + tti).hide()
                                                if (response.Detail.Content.Narrative[tti].IsAllNarrative == true) {
                                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort' + tti, true)
                                                    $('#IsAllNarrativeSubTestCuttingNarrativeShort' + tti).prop('checked', true)
                                                    viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti, false)
                                                    $('#HighestScoreSubTestCuttingNarrativeShort' + tti).hide()
                                                    $('#LowestScoreSubTestCuttingNarrativeShort' + tti).hide()
                                                    viewModel.set('IsHighestScoreSubTestCuttingNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestCuttingNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestCuttingNarrativeShort' + tti) == true) {
                                                        $('#IsHighestScoreSubTestCuttingNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestCuttingNarrativeShort' + tti).attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeShortChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestCuttingNarrativeShort' + tti) == true) {
                                                        $('#IsLowestScoreSubTestCuttingNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestCuttingNarrativeShort' + tti).attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeShortChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                } else {
                                                    viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti, true)
                                                    $('#IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti).prop('checked', true)
                                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort' + tti, false)
                                                    $('#HighestScoreSubTestCuttingNarrativeShort' + tti).show()
                                                    $('#LowestScoreSubTestCuttingNarrativeShort' + tti).show()
                                                    viewModel.set('IsHighestScoreSubTestCuttingNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestCuttingNarrativeShort' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestCuttingNarrativeShort' + tti) == true) {
                                                        $('#IsHighestScoreSubTestCuttingNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestCuttingNarrativeShort' + tti).attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeShortChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestCuttingNarrativeShort' + tti) == true) {
                                                        $('#IsLowestScoreSubTestCuttingNarrativeShort' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestCuttingNarrativeShort' + tti).attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeShortChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                }
                                                viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong' + tti, false)
                                                viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti, false)

                                                if (viewModel.get('DisplayStatusSubTestCuttingNarrativeShort' + tti) == false) {
                                                    $('#DisplayStatusSubTestCuttingNarrativeShort' + tti).attr('checked', false)
                                                    $('#DisplayStatusSubTestCuttingNarrativeShort' + tti).attr('onchange', 'DisplayStatusSubTestCuttingNarrativeShortChecked(this)')
                                                } else {
                                                    $('#DisplayStatusSubTestCuttingNarrativeShort' + tti).val(response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                }
                                            } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                                viewModel.set('HasSubTestCuttingNarrativeLong' + tti, true);
                                                viewModel.set('DisplayStatusSubTestCuttingNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                $('#IsSubTestCuttingNarrativeLong' + tti).show()
                                                $('#AllNarrativesSubTestCuttingNarrativeLong' + tti).show()
                                                viewModel.set('DisplayStatusSubTestCuttingNarrative' + tti, false)
                                                $('#HasSubTestCuttingNarrative' + tti).hide()
                                                $('#AllNarrativesSubTestCuttingNarrative' + tti).hide()
                                                viewModel.set('DisplayStatusSubTestCuttingNarrativeShort' + tti, false)
                                                $('#IsSubTestCuttingNarrativeShort' + tti).hide()
                                                $('#AllNarrativesSubTestCuttingNarrativeShort' + tti).hide()
                                                if (response.Detail.Content.Narrative[tti].IsAllNarrative == true) {
                                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong' + tti, true)
                                                    $('#IsAllNarrativeSubTestCuttingNarrativeLong' + tti).prop('checked', true)
                                                    viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti, false)
                                                    $('#HighestScoreSubTestCuttingNarrativeLong' + tti).hide()
                                                    $('#LowestScoreSubTestCuttingNarrativeLong' + tti).hide()
                                                    viewModel.set('IsHighestScoreSubTestCuttingNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestCuttingNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestCuttingNarrativeLong' + tti) == true) {
                                                        $('#IsHighestScoreSubTestCuttingNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestCuttingNarrativeLong' + tti).attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeLongChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestCuttingNarrativeLong' + tti) == true) {
                                                        $('#IsLowestScoreSubTestCuttingNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestCuttingNarrativeLong' + tti).attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeLongChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                } else {
                                                    viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti, true)
                                                    $('#IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti).prop('checked', true)
                                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong' + tti, false)
                                                    $('#HighestScoreSubTestCuttingNarrativeLong' + tti).show()
                                                    $('#LowestScoreSubTestCuttingNarrativeLong' + tti).show()
                                                    viewModel.set('IsHighestScoreSubTestCuttingNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsHighestScore)
                                                    viewModel.set('IsLowestScoreSubTestCuttingNarrativeLong' + tti, response.Detail.Content.Narrative[tti].IsLowestScore)
                                                    if (viewModel.get('IsHighestScoreSubTestCuttingNarrativeLong' + tti) == true) {
                                                        $('#IsHighestScoreSubTestCuttingNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsHighestScoreSubTestCuttingNarrativeLong' + tti).attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeLongChecked(this)')
                                                    }
                                                    if (viewModel.get('IsLowestScoreSubTestCuttingNarrativeLong' + tti) == true) {
                                                        $('#IsLowestScoreSubTestCuttingNarrativeLong' + tti).attr('checked', true)
                                                        $('#IsLowestScoreSubTestCuttingNarrativeLong' + tti).attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeLongChecked(this)')
                                                    }
                                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].HighestScoreTotalDisplay)
                                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].LowestScoreTotalDisplay)
                                                }
                                                viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort' + tti, false)
                                                viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti, false)

                                                if (viewModel.get('DisplayStatusSubTestCuttingNarrativeLong' + tti) == false) {
                                                    $('#DisplayStatusSubTestCuttingNarrativeLong' + tti).attr('checked', false)
                                                    $('#DisplayStatusSubTestCuttingNarrativeLong' + tti).attr('onchange', 'DisplayStatusSubTestCuttingNarrativeLongChecked(this)')
                                                } else {
                                                    $('#DisplayStatusSubTestCuttingNarrativeLong' + tti).val(response.Detail.Content.Narrative[tti].IsDisplaySubTestNarrative)
                                                }
                                            }
                                            viewModel.set('IsAllNarrativeSubTestCuttingNarrative' + tti, false)
                                            viewModel.set('IsNotAllNarrativeSubTestCuttingNarrative' + tti, false)
                                        } else {
                                            viewModel.set('DisplayStatusSubTestCuttingNarrative' + tti, false)
                                            $('#HasSubTestCuttingNarrative' + tti).hide()
                                            $('#AllNarrativesSubTestCuttingNarrative' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeShort' + tti, false)
                                            $('#IsSubTestCuttingNarrativeShort' + tti).hide()
                                            $('#AllNarrativesSubTestCuttingNarrativeShort' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeLong' + tti, false)
                                            $('#IsSubTestCuttingNarrativeLong' + tti).hide()
                                            $('#AllNarrativesSubTestCuttingNarrativeLong' + tti).hide()
                                            viewModel.set('IsAllNarrativeSubTestCuttingNarrative' + tti, false)
                                            viewModel.set('IsNotAllNarrativeSubTestCuttingNarrative' + tti, false)
                                            viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort' + tti, false)
                                            viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti, false)
                                            viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong' + tti, false)
                                            viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti, false)
                                        }
                                        ////IQ NARRATIVE
                                        var HasIQNarrative = response.Layout.HasIQNarrative;
                                        viewModel.set('HasIQNarrative' + tti, HasIQNarrative);
                                        if (HasIQNarrative == true) {
                                            viewModel.set('DisplayStatusIQNarrative' + tti, response.Detail.Content.Narrative[tti].IsDisplayIQNarrative)
                                            if (viewModel.get('DisplayStatusIQNarrative' + tti) == false) {
                                                $('#DisplayStatusIQNarrative' + tti).attr('checked', false)
                                                $('#DisplayStatusIQNarrative' + tti).attr('onchange', 'DisplayStatusIQNarrativeChecked(this)')
                                            } else {
                                                $('#DisplayStatusIQNarrative' + tti).val(response.Detail.Content.Narrative[tti].IsDisplayIQNarrative)
                                            }
                                            $('#HasIQNarrative' + tti).show()
                                        } else {
                                            viewModel.set('DisplayStatusIQNarrative' + tti, false)
                                            $('#HasIQNarrative' + tti).hide()
                                        }
                                        ////VALIDITY SCALE NARRATIVE
                                        var HasValidityScaleNarrative = response.Layout.HasValidityScaleNarrative;
                                        viewModel.set('HasValidityScaleNarrative' + tti, HasValidityScaleNarrative);
                                        if (HasValidityScaleNarrative == true) {                                    //ABILITY > TIDAK ADA VALIDITY SCALE
                                            viewModel.set('DisplayStatusValidityScaleNarrative' + tti, response.Detail.Content.Narrative[tti].IsDisplayValidityScaleNarrative)
                                            if (viewModel.get('DisplayStatusValidityScaleNarrative' + tti) == false) {
                                                $('#DisplayStatusValidityScaleNarrative' + tti).attr('checked', false)
                                                $('#DisplayStatusValidityScaleNarrative' + tti).attr('onchange', 'DisplayStatusValidityScaleNarrativeChecked(this)')
                                            } else {
                                                $('#DisplayStatusValidityScaleNarrative' + tti).val(response.Detail.Content.Narrative[tti].IsDisplayValidityScaleNarrative)
                                            }
                                            $('#HasValidityScaleNarrative' + tti).hide()
                                        } else {
                                            viewModel.set('DisplayStatusValidityScaleNarrative' + tti, false)
                                            $('#HasValidityScaleNarrative' + tti).hide()
                                        }
                                        ////GROUP NARRATIVE
                                        var HasGroupNarrative = response.Layout.HasGroupNarrative;
                                        viewModel.set('HasGroupNarrative' + tti, HasGroupNarrative);
                                        if (HasGroupNarrative == true) {
                                            viewModel.set('DisplayStatusGroupNarrative' + tti, response.Detail.Content.Narrative[tti].IsDisplayGroupNarrative)
                                            if (viewModel.get('DisplayStatusGroupNarrative' + tti) == false) {
                                                $('#DisplayStatusGroupNarrative' + tti).attr('checked', false)
                                                $('#DisplayStatusGroupNarrative' + tti).attr('onchange', 'DisplayStatusGroupNarrativeChecked(this)')
                                            } else {
                                                $('#DisplayStatusGroupNarrative' + tti).val(response.Detail.Content.Narrative[tti].IsDisplayGroupNarrative)
                                            }
                                            $('#HasGroupNarrative' + tti).show()
                                        } else {
                                            viewModel.set('DisplayStatusGroupNarrative' + tti, false)
                                            $('#HasGroupNarrative' + tti).hide()
                                        }

                                        viewModel.set('DisplayStatusNarrativesGroupNarratives' + tti, response.Detail.Content.Narrative[tti].IsDisplay)
                                        if (viewModel.get('DisplayStatusNarrativesGroupNarratives' + tti) == false) {
                                            $('#DisplayStatusNarrativesGroupNarratives' + tti).attr('checked', false)
                                            $('#DisplayStatusNarrativesGroupNarratives' + tti).attr('onchange', 'DisplayStatusNarrativesGroupNarrativesChecked(this)')
                                        } else {
                                            $('#DisplayStatusNarrativesGroupNarratives' + tti).val(response.Detail.Content.Narrative[tti].IsDisplay)
                                        }

                                        var NarrativeSequenceLength = response.Detail.Content.Narrative[tti].NarrativeSequence.length
                                        var NarrativeSequence = []
                                        if (NarrativeSequenceLength > 0) {
                                            for (ns = 0; ns < NarrativeSequenceLength; ns++) {
                                                NarrativeSequence.push(response.Detail.Content.Narrative[tti].NarrativeSequence[ns])
                                            }
                                        }

                                        if (NarrativeSequence.length > 0) {
                                            for (ns = (NarrativeSequence.length - 1); ns >= 0; --ns) {
                                                if (NarrativeSequence[ns] == "subtest") {
                                                    if (($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length > 0) {
                                                        var ulLength = ($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length
                                                        for (ul = 0; ul < ulLength; ul++) {
                                                            if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).css('display') == "block") {
                                                                if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).attr('data-type') == "subtest") {
                                                                    var id = $($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).attr('id')
                                                                    $('#' + id).prependTo('#NarrativesGroupNarratives' + tti + ' > .form-content ul.draggable')
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else if (NarrativeSequence[ns] == "iq") {
                                                    if (($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length > 0) {
                                                        var ulLength = ($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length
                                                        for (ul = 0; ul < ulLength; ul++) {
                                                            if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).css('display') == "block") {
                                                                if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).attr('data-type') == "iq") {
                                                                    $('#HasIQNarrative' + tti).prependTo('#NarrativesGroupNarratives' + tti + ' > .form-content ul.draggable')
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else if (NarrativeSequence[ns] == "vs") {
                                                    if (($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length > 0) {
                                                        var ulLength = ($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length
                                                        for (ul = 0; ul < ulLength; ul++) {
                                                            if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).css('display') == "block") {
                                                                if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).attr('data-type') == "vs") {
                                                                    $('#HasValidityScaleNarrative' + tti).prependTo('#NarrativesGroupNarratives' + tti + ' > .form-content ul.draggable')
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else if (NarrativeSequence[ns] == "group") {
                                                    if (($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length > 0) {
                                                        var ulLength = ($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()).length
                                                        for (ul = 0; ul < ulLength; ul++) {
                                                            if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).css('display') == "block") {
                                                                if ($($('#NarrativesGroupNarratives' + tti + ' > .form-content ul').children()[ul]).attr('data-type') == "group") {
                                                                    $('#HasGroupNarrative' + tti).prependTo('#NarrativesGroupNarratives' + tti + ' > .form-content ul.draggable')
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        $('.draggable').sortable({
                                            connectWith: '.draggable',
                                            //revert: true
                                        });
                                        $('.draggable li').draggable({
                                            connectToSortable: '.draggable',
                                            revert: 'invalid'
                                        });
                                        $('ul, li').disableSelection();
                                    }
                                }
                            }

                            $('#contentBox > ul.form-content > li#contentLayout div#panelbarStrengthArea').length == 0 ?
                                null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarStrengthArea').remove()

                            $('#contentBox > ul.form-content > li#contentLayout div#panelbarDevelopmentArea').length == 0 ?
                                null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarDevelopmentArea').remove()
                        }
                        else {
                            //PSYCHOGRAM AJA
                            viewModel.set('IsProfiling', response.Layout.IsProfiling);
                            viewModel.set('TitlePsychogram', response.Detail.Content.Psychogram[0].Title);
                            $('#TitlePsychogram').val(response.Detail.Content.Psychogram[0].Title)
                            viewModel.set('DisplayStatusPsychogram', response.Detail.Content.Psychogram[0].IsDisplay)
                            if (viewModel.DisplayStatusPsychogram == false) {
                                $('#DisplayStatusPsychogram').attr('checked', false)
                                $('#DisplayStatusPsychogram').attr('onchange', 'DisplayStatusPsychogramChecked(this)')
                            } else {
                                $('#DisplayStatusPsychogram').val(response.Detail.Content.Psychogram[0].IsDisplay)
                            }

                            $('#panelbarPsychogram').show()
                            viewModel.set('DisplayStatusPsychogramAbility', false)
                            $('#panelbarPsychogramAbility').hide()
                            viewModel.set('DisplayStatusPsychogramPersonality', false)
                            $('#panelbarPsychogramPersonality').hide()

                            for (tti = 0; tti <= response.TestToolInfos.length; tti++) {
                                $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives' + tti + '').length == 0 ?
                                    null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives' + tti + '').remove()
                            }

                            $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramAbility').length == 0 ?
                                null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramAbility').remove()

                            $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramPersonality').length == 0 ?
                                null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramPersonality').remove()

                            $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives').length == 0 ?
                                $('#contentBox > ul.form-content li#contentLayout').append(
                                    '<div id="panelbarNarrativesGroupNarratives" style="width: 96.5%;">' +
                                    '<div id="NarrativesGroupNarratives">Narratives & Group Narratives' +
                                    '<ul class="form-content">' +
                                    '<li style="padding-top:2%;padding-bottom:2%">' +
                                    '<label>Title<span class="mandatory">*</span></label>' +
                                    '<input id="TitleNarrativesGroupNarratives" name="TitleNarrativesGroupNarratives" style="width:50%" data-bind="value:TitleNarrativesGroupNarratives" />' +
                                    '</li>' +
                                    '<li id="listNarratives" style="padding-top:2%;padding-bottom:2%">' +
                                    '<ul class="draggable">' +
                                    '<li id="HasSubTestNarrative" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusSubTestNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrative" onchange="Display(this)"/>Display' +
                                    '</span>' +
                                    '<div id="AllNarrativesSubTestNarrative">All Narratives' +
                                    '<input type="radio" name="IsAllNarrativeSubTestNarrative" id="IsAllNarrativeSubTestNarrative" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrative" onclick="AllNarrativeSubTestNarrative(this)"/>' +
                                    '<span> Yes</span>' +
                                    '<input type="radio" name="IsAllNarrativeSubTestNarrative" id="IsNotAllNarrativeSubTestNarrative" data-bind="checked: IsNotAllNarrativeSubTestNarrative" onclick="NotAllNarrativeSubTestNarrative(this)"/>' +
                                    '<span> No</span>' +
                                    '</div>' +
                                    '<div id="HighestScoreSubTestNarrative" hidden="hidden">Highest Score' +
                                    '<input type="checkbox" id="IsHighestScoreSubTestNarrative" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrative" onchange="DisplayHighestScoreSubTestNarrative(this)" />' +
                                    '<input id="HighestScoreTotalDisplaySubTestNarrative" name="HighestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                                    '</div>' +
                                    '<div id="LowestScoreSubTestNarrative" hidden="hidden">Lowest Score' +
                                    '<input type="checkbox" id="IsLowestScoreSubTestNarrative" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrative" onchange="DisplayLowestScoreSubTestNarrative(this)" />' +
                                    '<input id="LowestScoreTotalDisplaySubTestNarrative" name="LowestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                                    '</div>' +
                                    '</li>' +
                                    '<li id="IsSubTestNarrativeShort" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Short]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusSubTestNarrativeShort" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeShort" onchange="DisplayStatusSubTestNarrativeShort(this)" />Display' +
                                    '</span>' +
                                    '<div id="AllNarrativesSubTestNarrativeShort">All Narratives' +
                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort" id="IsAllNarrativeSubTestNarrativeShort" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeShort" onclick="AllNarrativeSubTestNarrativeShort(this)"/>' +
                                    '<span> Yes</span>' +
                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort" id="IsNotAllNarrativeSubTestNarrativeShort" data-bind="checked: IsNotAllNarrativeSubTestNarrativeShort" onclick="NotAllNarrativeSubTestNarrativeShort(this)"/>' +
                                    '<span> No</span>' +
                                    '</div>' +
                                    '<div id="HighestScoreSubTestNarrativeShort" hidden="hidden">Highest Score' +
                                    '<input type="checkbox" id="IsHighestScoreSubTestNarrativeShort" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeShort" onchange="DisplayHighestScoreSubTestNarrativeShort(this)" />' +
                                    '<input id="HighestScoreTotalDisplaySubTestNarrativeShort" name="HighestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                                    '</div>' +
                                    '<div id="LowestScoreSubTestNarrativeShort" hidden="hidden">Lowest Score' +
                                    '<input type="checkbox" id="IsLowestScoreSubTestNarrativeShort" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeShort" onchange="DisplayLowestScoreSubTestNarrativeShort(this)" />' +
                                    '<input id="LowestScoreTotalDisplaySubTestNarrativeShort" name="LowestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                                    '</div>' +
                                    '</li >' +
                                    '<li id="IsSubTestNarrativeLong" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Long]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusSubTestNarrativeLong" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeLong" onchange="DisplayStatusSubTestNarrativeLong(this)" />Display' +
                                    '</span>' +
                                    '<div id="AllNarrativesSubTestNarrativeLong">All Narratives' +
                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong" id="IsAllNarrativeSubTestNarrativeLong" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeLong" onclick="AllNarrativeSubTestNarrativeLong(this)"/>' +
                                    '<span> Yes</span>' +
                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong" id="IsNotAllNarrativeSubTestNarrativeLong" data-bind="checked: IsNotAllNarrativeSubTestNarrativeLong" onclick="NotAllNarrativeSubTestNarrativeLong(this)"/>' +
                                    '<span> No</span>' +
                                    '</div>' +
                                    '<div id="HighestScoreSubTestNarrativeLong" hidden="hidden">Highest Score' +
                                    '<input type="checkbox" id="IsHighestScoreSubTestNarrativeLong" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeLong" onchange="DisplayHighestScoreSubTestNarrativeLong(this)" />' +
                                    '<input id="HighestScoreTotalDisplaySubTestNarrativeLong" name="HighestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                                    '</div>' +
                                    '<div id="LowestScoreSubTestNarrativeLong" hidden="hidden">Lowest Score' +
                                    '<input type="checkbox" id="IsLowestScoreSubTestNarrativeLong" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeLong" onchange="DisplayLowestScoreSubTestNarrativeLong(this)" />' +
                                    '<input id="LowestScoreTotalDisplaySubTestNarrativeLong" name="LowestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                                    '</div>' +
                                    '</li >' +
                                    '<li id="HasSubTestCuttingNarrative" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrative" onchange="DisplayStatusSubTestCuttingNarrative(this)" />Display' +
                                    '</span>' +
                                    '<div id="AllNarrativesSubTestCuttingNarrative">All Narratives' +
                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative" id="IsAllNarrativeSubTestCuttingNarrative" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrative" onclick="AllNarrativeSubTestCuttingNarrative(this)"/>' +
                                    '<span> Yes</span>' +
                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative" id="IsNotAllNarrativeSubTestCuttingNarrative" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrative" onclick="NotAllNarrativeSubTestCuttingNarrative(this)"/>' +
                                    '<span> No</span>' +
                                    '</div>' +
                                    '<div id="HighestScoreSubTestCuttingNarrative" hidden="hidden">Highest Score' +
                                    '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrative" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrative" onchange="DisplayHighestScoreSubTestCuttingNarrative(this)" />' +
                                    '<input id="HighestScoreTotalDisplaySubTestCuttingNarrative" name="HighestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                                    '</div>' +
                                    '<div id="LowestScoreSubTestCuttingNarrative" hidden="hidden">Lowest Score' +
                                    '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrative" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrative" onchange="DisplayLowestScoreSubTestCuttingNarrative(this)" />' +
                                    '<input id="LowestScoreTotalDisplaySubTestCuttingNarrative" name="LowestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                                    '</div>' +
                                    '</li >' +
                                    '<li id="IsSubTestCuttingNarrativeShort" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Short]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeShort" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeShort" onchange="DisplayStatusSubTestCuttingNarrativeShort(this)" />Display' +
                                    '</span>' +
                                    '<div id="AllNarrativesSubTestCuttingNarrativeShort">All Narratives' +
                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort" id="IsAllNarrativeSubTestCuttingNarrativeShort" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeShort" onclick="AllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                                    '<span> Yes</span>' +
                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort" id="IsNotAllNarrativeSubTestCuttingNarrativeShort" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeShort" onclick="NotAllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                                    '<span> No</span>' +
                                    '</div>' +
                                    '<div id="HighestScoreSubTestCuttingNarrativeShort" hidden="hidden">Highest Score' +
                                    '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeShort" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeShort" onchange="DisplayHighestScoreSubTestCuttingNarrativeShort(this)" />' +
                                    '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeShort" name="HighestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                                    '</div>' +
                                    '<div id="LowestScoreSubTestCuttingNarrativeShort" hidden="hidden">Lowest Score' +
                                    '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeShort" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeShort" onchange="DisplayLowestScoreSubTestCuttingNarrativeShort(this)" />' +
                                    '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeShort" name="LowestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                                    '</div>' +
                                    '</li>' +
                                    '<li id="IsSubTestCuttingNarrativeLong" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Long]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeLong" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeLong" onchange="DisplayStatusSubTestCuttingNarrativeLong(this)" />Display' +
                                    '</span>' +
                                    '<div id="AllNarrativesSubTestCuttingNarrativeLong">All Narratives' +
                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong" id="IsAllNarrativeSubTestCuttingNarrativeLong" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeLong" onclick="AllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                                    '<span> Yes</span>' +
                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong" id="IsNotAllNarrativeSubTestCuttingNarrativeLong" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeLong" onclick="NotAllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                                    '<span> No</span>' +
                                    '</div>' +
                                    '<div id="HighestScoreSubTestCuttingNarrativeLong" hidden="hidden">Highest Score' +
                                    '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeLong" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeLong" onchange="DisplayHighestScoreSubTestCuttingNarrativeLong(this)" />' +
                                    '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeLong" name="HighestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                                    '</div>' +
                                    '<div id="LowestScoreSubTestCuttingNarrativeLong" hidden="hidden">Lowest Score' +
                                    '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeLong" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeLong" onchange="DisplayLowestScoreSubTestCuttingNarrativeLong(this)" />' +
                                    '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeLong" name="LowestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                                    '</div>' +
                                    '</li>' +
                                    '<li id="HasIQNarrative" style="border: outset; width:50%; display:block" data-type="iq">[[IQ Narratives]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusIQNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusIQNarrative" onchange="DisplayStatusIQNarrative(this)" />Display' +
                                    '</span>' +
                                    '</li>' +
                                    '<li id="HasValidityScaleNarrative" style="border: outset; width:50%; display:block" data-type="vs">[[Validity Scale Narratives]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusValidityScaleNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusValidityScaleNarrative" onchange="DisplayStatusValidityScaleNarrative(this)" />Display' +
                                    '</span>' +
                                    '</li>' +
                                    '<li id="HasGroupNarrative" style="border: outset; width:50%; display:block" data-type="group">[[Group Narratives]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusGroupNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusGroupNarrative" onchange="DisplayStatusGroupNarrative(this)" />Display' +
                                    '</span>' +
                                    '</li>' +
                                    '</ul>' +
                                    '</li>' +
                                    '</ul>' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusNarrativesGroupNarratives" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusNarrativesGroupNarratives" onchange="DisplayStatusNarrativesGroupNarratives(this)" />Display' +
                                    '</span>' +
                                    '</div>' +
                                    '</div>'
                                ) : null

                            viewModel.set('TitleNarrativesGroupNarratives', response.Detail.Content.Narrative[0].Title);
                            $('#TitleNarrativesGroupNarratives').val(response.Detail.Content.Narrative[0].Title)

                            $('#HighestScoreTotalDisplaySubTestNarrative').keypress(function (e) {
                                if (e.which == 46 || e.which == 44) {
                                    return false;
                                }
                            });
                            $('#LowestScoreTotalDisplaySubTestNarrative').keypress(function (e) {
                                if (e.which == 46 || e.which == 44) {
                                    return false;
                                }
                            });
                            $('#HighestScoreTotalDisplaySubTestNarrativeShort').keypress(function (e) {
                                if (e.which == 46 || e.which == 44) {
                                    return false;
                                }
                            });
                            $('#LowestScoreTotalDisplaySubTestNarrativeShort').keypress(function (e) {
                                if (e.which == 46 || e.which == 44) {
                                    return false;
                                }
                            });
                            $('#HighestScoreTotalDisplaySubTestNarrativeLong').keypress(function (e) {
                                if (e.which == 46 || e.which == 44) {
                                    return false;
                                }
                            });
                            $('#LowestScoreTotalDisplaySubTestNarrativeLong').keypress(function (e) {
                                if (e.which == 46 || e.which == 44) {
                                    return false;
                                }
                            });

                            $('#HighestScoreTotalDisplaySubTestCuttingNarrative').keypress(function (e) {
                                if (e.which == 46 || e.which == 44) {
                                    return false;
                                }
                            });
                            $('#LowestScoreTotalDisplaySubTestCuttingNarrative').keypress(function (e) {
                                if (e.which == 46 || e.which == 44) {
                                    return false;
                                }
                            });
                            $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort').keypress(function (e) {
                                if (e.which == 46 || e.which == 44) {
                                    return false;
                                }
                            });
                            $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort').keypress(function (e) {
                                if (e.which == 46 || e.which == 44) {
                                    return false;
                                }
                            });
                            $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong').keypress(function (e) {
                                if (e.which == 46 || e.which == 44) {
                                    return false;
                                }
                            });
                            $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong').keypress(function (e) {
                                if (e.which == 46 || e.which == 44) {
                                    return false;
                                }
                            });

                            $("#panelbarNarrativesGroupNarratives").kendoPanelBar();
                            var panelbarNarrativesGroupNarratives = $("#panelbarNarrativesGroupNarratives").data("kendoPanelBar");
                            panelbarNarrativesGroupNarratives.expand($("#NarrativesGroupNarratives"));

                            $('#contentBox > ul.form-content > li#contentLayout div#panelbarStrengthArea').length == 0 ?
                                null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarStrengthArea').remove()

                            $('#contentBox > ul.form-content > li#contentLayout div#panelbarDevelopmentArea').length == 0 ?
                                null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarDevelopmentArea').remove()

                            //NARRATIVES & GROUP NARRATIVES
                            ////SUBTEST NARRATIVE
                            var HasSubTestNarrative = response.Layout.HasSubTestNarrative;
                            viewModel.set('HasSubTestNarrative', HasSubTestNarrative);
                            if (HasSubTestNarrative == true) {
                                if (response.Layout.IsSubTestNarrativeShort == true) {
                                    viewModel.set('HasSubTestNarrativeShort', true);
                                    viewModel.set('DisplayStatusSubTestNarrativeShort', response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                    $('#IsSubTestNarrativeShort').show()
                                    $('#AllNarrativesSubTestNarrativeShort').show()
                                    viewModel.set('DisplayStatusSubTestNarrative', false)
                                    $('#HasSubTestNarrative').hide()
                                    $('#AllNarrativesSubTestNarrative').hide()
                                    viewModel.set('DisplayStatusSubTestNarrativeLong', false)
                                    $('#IsSubTestNarrativeLong').hide()
                                    $('#AllNarrativesSubTestNarrativeLong').hide()
                                    if (response.Detail.Content.Narrative[0].IsAllNarrative == true) {
                                        viewModel.set('IsAllNarrativeSubTestNarrativeShort', true)
                                        $('#IsAllNarrativeSubTestNarrativeShort').prop('checked', true)
                                        viewModel.set('IsNotAllNarrativeSubTestNarrativeShort', false)
                                        $('#HighestScoreSubTestNarrativeShort').hide()
                                        $('#LowestScoreSubTestNarrativeShort').hide()
                                        viewModel.set('IsHighestScoreSubTestNarrativeShort', response.Detail.Content.Narrative[0].IsHighestScore)
                                        viewModel.set('IsLowestScoreSubTestNarrativeShort', response.Detail.Content.Narrative[0].IsLowestScore)
                                        if (viewModel.IsHighestScoreSubTestNarrativeShort == true) {
                                            $('#IsHighestScoreSubTestNarrativeShort').attr('checked', true)
                                            $('#IsHighestScoreSubTestNarrativeShort').attr('onchange', 'DisplayHighestScoreSubTestNarrativeShortChecked(this)')
                                        }
                                        if (viewModel.IsLowestScoreSubTestNarrativeShort == true) {
                                            $('#IsLowestScoreSubTestNarrativeShort').attr('checked', true)
                                            $('#IsLowestScoreSubTestNarrativeShort').attr('onchange', 'DisplayLowestScoreSubTestNarrativeShortChecked(this)')
                                        }
                                        $('#HighestScoreTotalDisplaySubTestNarrativeShort').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                        $('#LowestScoreTotalDisplaySubTestNarrativeShort').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                    } else {
                                        viewModel.set('IsNotAllNarrativeSubTestNarrativeShort', true)
                                        $('#IsNotAllNarrativeSubTestNarrativeShort').prop('checked', true)
                                        viewModel.set('IsAllNarrativeSubTestNarrativeShort', false)
                                        $('#HighestScoreSubTestNarrativeShort').show()
                                        $('#LowestScoreSubTestNarrativeShort').show()
                                        viewModel.set('IsHighestScoreSubTestNarrativeShort', response.Detail.Content.Narrative[0].IsHighestScore)
                                        viewModel.set('IsLowestScoreSubTestNarrativeShort', response.Detail.Content.Narrative[0].IsLowestScore)
                                        if (viewModel.IsHighestScoreSubTestNarrativeShort == true) {
                                            $('#IsHighestScoreSubTestNarrativeShort').attr('checked', true)
                                            $('#IsHighestScoreSubTestNarrativeShort').attr('onchange', 'DisplayHighestScoreSubTestNarrativeShortChecked(this)')
                                        }
                                        if (viewModel.IsLowestScoreSubTestNarrativeShort == true) {
                                            $('#IsLowestScoreSubTestNarrativeShort').attr('checked', true)
                                            $('#IsLowestScoreSubTestNarrativeShort').attr('onchange', 'DisplayLowestScoreSubTestNarrativeShortChecked(this)')
                                        }
                                        $('#HighestScoreTotalDisplaySubTestNarrativeShort').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                        $('#LowestScoreTotalDisplaySubTestNarrativeShort').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                    }
                                    viewModel.set('IsAllNarrativeSubTestNarrativeLong', false)
                                    viewModel.set('IsNotAllNarrativeSubTestNarrativeLong', false)
                                } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                    viewModel.set('HasSubTestNarrativeLong', true);
                                    viewModel.set('DisplayStatusSubTestNarrativeLong', response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                    $('#IsSubTestNarrativeLong').show()
                                    $('#AllNarrativesSubTestNarrativeLong').show()
                                    viewModel.set('DisplayStatusSubTestNarrative', false)
                                    $('#HasSubTestNarrative').hide()
                                    $('#AllNarrativesSubTestNarrative').hide()
                                    viewModel.set('DisplayStatusSubTestNarrativeShort', false)
                                    $('#IsSubTestNarrativeShort').hide()
                                    $('#AllNarrativesSubTestNarrativeShort').hide()
                                    if (response.Detail.Content.Narrative[0].IsAllNarrative == true) {
                                        viewModel.set('IsAllNarrativeSubTestNarrativeLong', true)
                                        $('#IsAllNarrativeSubTestNarrativeLong').prop('checked', true)
                                        viewModel.set('IsNotAllNarrativeSubTestNarrativeLong', false)
                                        $('#HighestScoreSubTestNarrativeLong').hide()
                                        $('#LowestScoreSubTestNarrativeLong').hide()
                                        viewModel.set('IsHighestScoreSubTestNarrativeLong', response.Detail.Content.Narrative[0].IsHighestScore)
                                        viewModel.set('IsLowestScoreSubTestNarrativeLong', response.Detail.Content.Narrative[0].IsLowestScore)
                                        if (viewModel.IsHighestScoreSubTestNarrativeLong == true) {
                                            $('#IsHighestScoreSubTestNarrativeLong').attr('checked', true)
                                            $('#IsHighestScoreSubTestNarrativeLong').attr('onchange', 'DisplayHighestScoreSubTestNarrativeLongChecked(this)')
                                        }
                                        if (viewModel.IsLowestScoreSubTestNarrativeLong == true) {
                                            $('#IsLowestScoreSubTestNarrativeLong').attr('checked', true)
                                            $('#IsLowestScoreSubTestNarrativeLong').attr('onchange', 'DisplayLowestScoreSubTestNarrativeLongChecked(this)')
                                        }
                                        $('#HighestScoreTotalDisplaySubTestNarrativeLong').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                        $('#LowestScoreTotalDisplaySubTestNarrativeLong').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                    } else {
                                        viewModel.set('IsNotAllNarrativeSubTestNarrativeLong', true)
                                        $('#IsNotAllNarrativeSubTestNarrativeLong').prop('checked', true)
                                        viewModel.set('IsAllNarrativeSubTestNarrativeLong', false)
                                        $('#HighestScoreSubTestNarrativeLong').show()
                                        $('#LowestScoreSubTestNarrativeLong').show()
                                        viewModel.set('IsHighestScoreSubTestNarrativeLong', response.Detail.Content.Narrative[0].IsHighestScore)
                                        viewModel.set('IsLowestScoreSubTestNarrativeLong', response.Detail.Content.Narrative[0].IsLowestScore)
                                        if (viewModel.IsHighestScoreSubTestNarrativeLong == true) {
                                            $('#IsHighestScoreSubTestNarrativeLong').attr('checked', true)
                                            $('#IsHighestScoreSubTestNarrativeLong').attr('onchange', 'DisplayHighestScoreSubTestNarrativeLongChecked(this)')
                                        }
                                        if (viewModel.IsLowestScoreSubTestNarrativeLong == true) {
                                            $('#IsLowestScoreSubTestNarrativeLong').attr('checked', true)
                                            $('#IsLowestScoreSubTestNarrativeLong').attr('onchange', 'DisplayLowestScoreSubTestNarrativeLongChecked(this)')
                                        }
                                        $('#HighestScoreTotalDisplaySubTestNarrativeLong').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                        $('#LowestScoreTotalDisplaySubTestNarrativeLong').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                    }
                                    viewModel.set('IsAllNarrativeSubTestNarrativeShort', false)
                                    viewModel.set('IsNotAllNarrativeSubTestNarrativeShort', false)
                                }
                                viewModel.set('IsAllNarrativeSubTestNarrative', false)
                                viewModel.set('IsNotAllNarrativeSubTestNarrative', false)
                            } else {
                                viewModel.set('DisplayStatusSubTestNarrative', false)
                                $('#HasSubTestNarrative').hide()
                                $('#AllNarrativesSubTestNarrative').hide()
                                viewModel.set('DisplayStatusSubTestNarrativeShort', false)
                                $('#IsSubTestNarrativeShort').hide()
                                $('#AllNarrativesSubTestNarrativeShort').hide()
                                viewModel.set('DisplayStatusSubTestNarrativeLong', false)
                                $('#IsSubTestNarrativeLong').hide()
                                $('#AllNarrativesSubTestNarrativeLong').hide()
                                viewModel.set('IsAllNarrativeSubTestNarrative', false)
                                viewModel.set('IsNotAllNarrativeSubTestNarrative', false)
                                viewModel.set('IsAllNarrativeSubTestNarrativeShort', false)
                                viewModel.set('IsNotAllNarrativeSubTestNarrativeShort', false)
                                viewModel.set('IsAllNarrativeSubTestNarrativeLong', false)
                                viewModel.set('IsNotAllNarrativeSubTestNarrativeLong', false)
                            }
                            ////SUBTEST CUTTING NARRATIVE
                            var HasSubTestCuttingNarrative = response.Layout.HasSubTestCuttingNarrative;
                            viewModel.set('HasSubTestCuttingNarrative', HasSubTestCuttingNarrative);
                            if (HasSubTestCuttingNarrative == true) {
                                if (response.Layout.IsSubTestNarrativeShort == true) {
                                    viewModel.set('HasSubTestCuttingNarrativeShort', true);
                                    viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                    $('#IsSubTestCuttingNarrativeShort').show()
                                    $('#AllNarrativesSubTestCuttingNarrativeShort').show()
                                    viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                                    $('#HasSubTestCuttingNarrative').hide()
                                    $('#AllNarrativesSubTestCuttingNarrative').hide()
                                    viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', false)
                                    $('#IsSubTestCuttingNarrativeLong').hide()
                                    $('#AllNarrativesSubTestCuttingNarrativeLong').hide()
                                    if (response.Detail.Content.Narrative[0].IsAllNarrative == true) {
                                        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', true)
                                        $('#IsAllNarrativeSubTestCuttingNarrativeShort').prop('checked', true)
                                        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort', false)
                                        $('#HighestScoreSubTestCuttingNarrativeShort').hide()
                                        $('#LowestScoreSubTestCuttingNarrativeShort').hide()
                                        viewModel.set('IsHighestScoreSubTestCuttingNarrativeShort', response.Detail.Content.Narrative[0].IsHighestScore)
                                        viewModel.set('IsLowestScoreSubTestCuttingNarrativeShort', response.Detail.Content.Narrative[0].IsLowestScore)
                                        if (viewModel.IsHighestScoreSubTestCuttingNarrativeShort == true) {
                                            $('#IsHighestScoreSubTestCuttingNarrativeShort').attr('checked', true)
                                            $('#IsHighestScoreSubTestCuttingNarrativeShort').attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeShortChecked(this)')
                                        }
                                        if (viewModel.IsLowestScoreSubTestCuttingNarrativeShort == true) {
                                            $('#IsLowestScoreSubTestCuttingNarrativeShort').attr('checked', true)
                                            $('#IsLowestScoreSubTestCuttingNarrativeShort').attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeShortChecked(this)')
                                        }
                                        $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                        $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                    } else {
                                        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort', true)
                                        $('#IsNotAllNarrativeSubTestCuttingNarrativeShort').prop('checked', true)
                                        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', false)
                                        $('#HighestScoreSubTestCuttingNarrativeShort').show()
                                        $('#LowestScoreSubTestCuttingNarrativeShort').show()
                                        viewModel.set('IsHighestScoreSubTestCuttingNarrativeShort', response.Detail.Content.Narrative[0].IsHighestScore)
                                        viewModel.set('IsLowestScoreSubTestCuttingNarrativeShort', response.Detail.Content.Narrative[0].IsLowestScore)
                                        if (viewModel.IsHighestScoreSubTestCuttingNarrativeShort == true) {
                                            $('#IsHighestScoreSubTestCuttingNarrativeShort').attr('checked', true)
                                            $('#IsHighestScoreSubTestCuttingNarrativeShort').attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeShortChecked(this)')
                                        }
                                        if (viewModel.IsLowestScoreSubTestCuttingNarrativeShort == true) {
                                            $('#IsLowestScoreSubTestCuttingNarrativeShort').attr('checked', true)
                                            $('#IsLowestScoreSubTestCuttingNarrativeShort').attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeShortChecked(this)')
                                        }
                                        $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                        $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                    }
                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', false)
                                    viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong', false)
                                } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                    viewModel.set('HasSubTestCuttingNarrativeLong', true);
                                    viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                    $('#IsSubTestCuttingNarrativeLong').show()
                                    $('#AllNarrativesSubTestCuttingNarrativeLong').show()
                                    viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                                    $('#HasSubTestCuttingNarrative').hide()
                                    $('#AllNarrativesSubTestCuttingNarrative').hide()
                                    viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', false)
                                    $('#IsSubTestCuttingNarrativeShort').hide()
                                    $('#AllNarrativesSubTestCuttingNarrativeShort').hide()
                                    if (response.Detail.Content.Narrative[0].IsAllNarrative == true) {
                                        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', true)
                                        $('#IsAllNarrativeSubTestCuttingNarrativeLong').prop('checked', true)
                                        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong', false)
                                        $('#HighestScoreSubTestCuttingNarrativeLong').hide()
                                        $('#LowestScoreSubTestCuttingNarrativeLong').hide()
                                        viewModel.set('IsHighestScoreSubTestCuttingNarrativeLong', response.Detail.Content.Narrative[0].IsHighestScore)
                                        viewModel.set('IsLowestScoreSubTestCuttingNarrativeLong', response.Detail.Content.Narrative[0].IsLowestScore)
                                        if (viewModel.IsHighestScoreSubTestCuttingNarrativeLong == true) {
                                            $('#IsHighestScoreSubTestCuttingNarrativeLong').attr('checked', true)
                                            $('#IsHighestScoreSubTestCuttingNarrativeLong').attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeLongChecked(this)')
                                        }
                                        if (viewModel.IsLowestScoreSubTestCuttingNarrativeLong == true) {
                                            $('#IsLowestScoreSubTestCuttingNarrativeLong').attr('checked', true)
                                            $('#IsLowestScoreSubTestCuttingNarrativeLong').attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeLongChecked(this)')
                                        }
                                        $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                        $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                    } else {
                                        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong', true)
                                        $('#IsNotAllNarrativeSubTestCuttingNarrativeLong').prop('checked', true)
                                        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', false)
                                        $('#HighestScoreSubTestCuttingNarrativeLong').show()
                                        $('#LowestScoreSubTestCuttingNarrativeLong').show()
                                        viewModel.set('IsHighestScoreSubTestCuttingNarrativeLong', response.Detail.Content.Narrative[0].IsHighestScore)
                                        viewModel.set('IsLowestScoreSubTestCuttingNarrativeLong', response.Detail.Content.Narrative[0].IsLowestScore)
                                        if (viewModel.IsHighestScoreSubTestCuttingNarrativeLong == true) {
                                            $('#IsHighestScoreSubTestCuttingNarrativeLong').attr('checked', true)
                                            $('#IsHighestScoreSubTestCuttingNarrativeLong').attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeLongChecked(this)')
                                        }
                                        if (viewModel.IsLowestScoreSubTestCuttingNarrativeLong == true) {
                                            $('#IsLowestScoreSubTestCuttingNarrativeLong').attr('checked', true)
                                            $('#IsLowestScoreSubTestCuttingNarrativeLong').attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeLongChecked(this)')
                                        }
                                        $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong').val(response.Detail.Content.Narrative[0].HighestScoreTotalDisplay)
                                        $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong').val(response.Detail.Content.Narrative[0].LowestScoreTotalDisplay)
                                    }
                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', false)
                                    viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort', false)
                                }
                                viewModel.set('IsAllNarrativeSubTestCuttingNarrative', false)
                                viewModel.set('IsNotAllNarrativeSubTestCuttingNarrative', false)
                            } else {
                                viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                                $('#HasSubTestCuttingNarrative').hide()
                                $('#AllNarrativesSubTestCuttingNarrative').hide()
                                viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', false)
                                $('#IsSubTestCuttingNarrativeShort').hide()
                                $('#AllNarrativesSubTestCuttingNarrativeShort').hide()
                                viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', false)
                                $('#IsSubTestCuttingNarrativeLong').hide()
                                $('#AllNarrativesSubTestCuttingNarrativeLong').hide()
                                viewModel.set('IsAllNarrativeSubTestCuttingNarrative', false)
                                viewModel.set('IsNotAllNarrativeSubTestCuttingNarrative', false)
                                viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', false)
                                viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort', false)
                                viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', false)
                                viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong', false)
                            }
                            ////IQ NARRATIVE
                            var HasIQNarrative = response.Layout.HasIQNarrative;
                            viewModel.set('HasIQNarrative', HasIQNarrative);
                            if (HasIQNarrative == true) {
                                viewModel.set('DisplayStatusIQNarrative', response.Detail.Content.Narrative[0].IsDisplayIQNarrative)
                                $('#HasIQNarrative').show()
                            } else {
                                viewModel.set('DisplayStatusIQNarrative', false)
                                $('#HasIQNarrative').hide()
                            }
                            ////VALIDITY SCALE NARRATIVE
                            var HasValidityScaleNarrative = response.Layout.HasValidityScaleNarrative;
                            viewModel.set('HasValidityScaleNarrative', HasValidityScaleNarrative);
                            if (HasValidityScaleNarrative == true) {
                                viewModel.set('DisplayStatusValidityScaleNarrative', response.Detail.Content.Narrative[0].IsDisplayValidityScaleNarrative)
                                $('#HasValidityScaleNarrative').show()
                            } else {
                                viewModel.set('DisplayStatusValidityScaleNarrative', false)
                                $('#HasValidityScaleNarrative').hide()
                            }
                            ////GROUP NARRATIVE
                            var HasGroupNarrative = response.Layout.HasGroupNarrative;
                            viewModel.set('HasGroupNarrative', HasGroupNarrative);
                            if (HasGroupNarrative == true) {
                                viewModel.set('DisplayStatusGroupNarrative', response.Detail.Content.Narrative[0].IsDisplayGroupNarrative)
                                $('#HasGroupNarrative').show()
                            } else {
                                viewModel.set('DisplayStatusGroupNarrative', false)
                                $('#HasGroupNarrative').hide()
                            }

                            viewModel.set('DisplayStatusNarrativesGroupNarratives', response.Detail.Content.Narrative[0].IsDisplay)
                            if (viewModel.DisplayStatusNarrativesGroupNarratives == false) {
                                $('#DisplayStatusNarrativesGroupNarratives').attr('checked', false)
                                $('#DisplayStatusNarrativesGroupNarratives').attr('onchange', 'DisplayStatusNarrativesGroupNarrativesChecked(this)')
                            } else {
                                $('#DisplayStatusNarrativesGroupNarratives').val(response.Detail.Content.Narrative[0].IsDisplay)
                            }

                            var NarrativeSequenceLength = response.Detail.Content.Narrative[0].NarrativeSequence.length
                            var NarrativeSequence = []
                            if (NarrativeSequenceLength > 0) {
                                for (ns = 0; ns < NarrativeSequenceLength; ns++) {
                                    NarrativeSequence.push(response.Detail.Content.Narrative[0].NarrativeSequence[ns])
                                }
                            }

                            if (NarrativeSequence.length > 0) {
                                for (ns = (NarrativeSequence.length - 1); ns >= 0; --ns) {
                                    if (NarrativeSequence[ns] == "subtest") {
                                        if (($('#NarrativesGroupNarratives > .form-content ul').children()).length > 0) {
                                            var ulLength = ($('#NarrativesGroupNarratives > .form-content ul').children()).length
                                            for (ul = 0; ul < ulLength; ul++) {
                                                if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).css('display') == "block") {
                                                    if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('data-type') == "subtest") {
                                                        var id = $($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('id')
                                                        $('#' + id).prependTo('ul.draggable')
                                                    }
                                                }
                                            }
                                        }
                                    } else if (NarrativeSequence[ns] == "iq") {
                                        if (($('#NarrativesGroupNarratives > .form-content ul').children()).length > 0) {
                                            var ulLength = ($('#NarrativesGroupNarratives > .form-content ul').children()).length
                                            for (ul = 0; ul < ulLength; ul++) {
                                                if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).css('display') == "block") {
                                                    if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('data-type') == "iq") {
                                                        $('#HasIQNarrative').prependTo('ul.draggable')
                                                    }
                                                }
                                            }
                                        }
                                    } else if (NarrativeSequence[ns] == "vs") {
                                        if (($('#NarrativesGroupNarratives > .form-content ul').children()).length > 0) {
                                            var ulLength = ($('#NarrativesGroupNarratives > .form-content ul').children()).length
                                            for (ul = 0; ul < ulLength; ul++) {
                                                if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).css('display') == "block") {
                                                    if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('data-type') == "vs") {
                                                        $('#HasValidityScaleNarrative').prependTo('ul.draggable')
                                                    }
                                                }
                                            }
                                        }
                                    } else if (NarrativeSequence[ns] == "group") {
                                        if (($('#NarrativesGroupNarratives > .form-content ul').children()).length > 0) {
                                            var ulLength = ($('#NarrativesGroupNarratives > .form-content ul').children()).length
                                            for (ul = 0; ul < ulLength; ul++) {
                                                if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).css('display') == "block") {
                                                    if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('data-type') == "group") {
                                                        $('#HasGroupNarrative').prependTo('ul.draggable')
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        viewModel.set('IsProfiling', response.Layout.IsProfiling)
                        viewModel.set('HasPsychogram', false);
                        viewModel.set('DisplayStatusPsychogram', false)
                        $('#panelbarPsychogram').hide()
                        viewModel.set('DisplayStatusPsychogramAbility', false)
                        $('#panelbarPsychogramAbility').hide()
                        viewModel.set('DisplayStatusPsychogramPersonality', false)
                        $('#panelbarPsychogramPersonality').hide()

                        viewModel.set('TitleNarrativesGroupNarratives', response.Detail.Content.Narrative[0].Title);
                        $('#TitleNarrativesGroupNarratives').val(response.Detail.Content.Narrative[0].Title)

                        //NARRATIVES & GROUP NARRATIVES
                        ////SUBTEST NARRATIVE
                        var HasSubTestNarrative = response.Layout.HasSubTestNarrative;
                        viewModel.set('HasSubTestNarrative', HasSubTestNarrative);
                        if (HasSubTestNarrative == true) {
                            if (response.Layout.IsSubTestNarrativeShort == true) {
                                viewModel.set('HasSubTestNarrativeShort', true);
                                viewModel.set('DisplayStatusSubTestNarrativeShort', response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                $('#IsSubTestNarrativeShort').show()
                                $('#AllNarrativesSubTestNarrativeShort').show()
                                viewModel.set('DisplayStatusSubTestNarrative', false)
                                $('#HasSubTestNarrative').hide()
                                $('#AllNarrativesSubTestNarrative').hide()
                                viewModel.set('DisplayStatusSubTestNarrativeLong', false)
                                $('#IsSubTestNarrativeLong').hide()
                                $('#AllNarrativesSubTestNarrativeLong').hide()
                                if (response.Detail.Content.Narrative[0].IsAllNarrative == true) {
                                    viewModel.set('IsAllNarrativeSubTestNarrativeShort', true)
                                    viewModel.set('IsNotAllNarrativeSubTestNarrativeShort', false)
                                } else {
                                    viewModel.set('IsNotAllNarrativeSubTestNarrativeShort', true)
                                    viewModel.set('IsAllNarrativeSubTestNarrativeShort', false)
                                }
                                viewModel.set('IsAllNarrativeSubTestNarrativeLong', false)
                                viewModel.set('IsNotAllNarrativeSubTestNarrativeLong', false)
                            } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                viewModel.set('HasSubTestNarrativeLong', true);
                                viewModel.set('DisplayStatusSubTestNarrativeLong', response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                $('#IsSubTestNarrativeLong').show()
                                $('#AllNarrativesSubTestNarrativeLong').show()
                                viewModel.set('DisplayStatusSubTestNarrative', false)
                                $('#HasSubTestNarrative').hide()
                                $('#AllNarrativesSubTestNarrative').hide()
                                viewModel.set('DisplayStatusSubTestNarrativeShort', false)
                                $('#IsSubTestNarrativeShort').hide()
                                $('#AllNarrativesSubTestNarrativeShort').hide()
                                if (response.Detail.Content.Narrative[0].IsAllNarrative == true) {
                                    viewModel.set('IsAllNarrativeSubTestNarrativeLong', true)
                                    viewModel.set('IsNotAllNarrativeSubTestNarrativeLong', false)
                                } else {
                                    viewModel.set('IsNotAllNarrativeSubTestNarrativeLong', true)
                                    viewModel.set('IsAllNarrativeSubTestNarrativeLong', false)
                                }
                                viewModel.set('IsAllNarrativeSubTestNarrativeShort', false)
                                viewModel.set('IsNotAllNarrativeSubTestNarrativeShort', false)
                            }
                            viewModel.set('IsAllNarrativeSubTestNarrative', false)
                            viewModel.set('IsNotAllNarrativeSubTestNarrative', false)
                        } else {
                            viewModel.set('DisplayStatusSubTestNarrative', false)
                            $('#HasSubTestNarrative').hide()
                            $('#AllNarrativesSubTestNarrative').hide()
                            viewModel.set('DisplayStatusSubTestNarrativeShort', false)
                            $('#IsSubTestNarrativeShort').hide()
                            $('#AllNarrativesSubTestNarrativeShort').hide()
                            viewModel.set('DisplayStatusSubTestNarrativeLong', false)
                            $('#IsSubTestNarrativeLong').hide()
                            $('#AllNarrativesSubTestNarrativeLong').hide()
                            viewModel.set('IsAllNarrativeSubTestNarrative', false)
                            viewModel.set('IsNotAllNarrativeSubTestNarrative', false)
                            viewModel.set('IsAllNarrativeSubTestNarrativeShort', false)
                            viewModel.set('IsNotAllNarrativeSubTestNarrativeShort', false)
                            viewModel.set('IsAllNarrativeSubTestNarrativeLong', false)
                            viewModel.set('IsNotAllNarrativeSubTestNarrativeLong', false)
                        }
                        ////SUBTEST CUTTING NARRATIVE
                        var HasSubTestCuttingNarrative = response.Layout.HasSubTestCuttingNarrative;
                        viewModel.set('HasSubTestCuttingNarrative', HasSubTestCuttingNarrative);
                        if (HasSubTestCuttingNarrative == true) {
                            if (response.Layout.IsSubTestNarrativeShort == true) {
                                viewModel.set('HasSubTestCuttingNarrativeShort', true);
                                viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                $('#IsSubTestCuttingNarrativeShort').show()
                                $('#AllNarrativesSubTestCuttingNarrativeShort').show()
                                viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                                $('#HasSubTestCuttingNarrative').hide()
                                $('#AllNarrativesSubTestCuttingNarrative').hide()
                                viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', false)
                                $('#IsSubTestCuttingNarrativeLong').hide()
                                $('#AllNarrativesSubTestCuttingNarrativeLong').hide()
                                if (response.Detail.Content.Narrative[0].IsAllNarrative == true) {
                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', true)
                                    viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort', false)
                                } else {
                                    viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort', true)
                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', false)
                                }
                                viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', false)
                                viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong', false)
                            } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                viewModel.set('HasSubTestCuttingNarrativeLong', true);
                                viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', response.Detail.Content.Narrative[0].IsDisplaySubTestNarrative)
                                $('#IsSubTestCuttingNarrativeLong').show()
                                $('#AllNarrativesSubTestCuttingNarrativeLong').show()
                                viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                                $('#HasSubTestCuttingNarrative').hide()
                                $('#AllNarrativesSubTestCuttingNarrative').hide()
                                viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', false)
                                $('#IsSubTestCuttingNarrativeShort').hide()
                                $('#AllNarrativesSubTestCuttingNarrativeShort').hide()
                                if (response.Detail.Content.Narrative[0].IsAllNarrative == true) {
                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', true)
                                    viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong', false)
                                } else {
                                    viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong', true)
                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', false)
                                }
                                viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', false)
                                viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort', false)
                            }
                            viewModel.set('IsAllNarrativeSubTestCuttingNarrative', false)
                            viewModel.set('IsNotAllNarrativeSubTestCuttingNarrative', false)
                        } else {
                            viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                            $('#HasSubTestCuttingNarrative').hide()
                            $('#AllNarrativesSubTestCuttingNarrative').hide()
                            viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', false)
                            $('#IsSubTestCuttingNarrativeShort').hide()
                            $('#AllNarrativesSubTestCuttingNarrativeShort').hide()
                            viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', false)
                            $('#IsSubTestCuttingNarrativeLong').hide()
                            $('#AllNarrativesSubTestCuttingNarrativeLong').hide()
                            viewModel.set('IsAllNarrativeSubTestCuttingNarrative', false)
                            viewModel.set('IsNotAllNarrativeSubTestCuttingNarrative', false)
                            viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', false)
                            viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort', false)
                            viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', false)
                            viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong', false)
                        }
                        ////IQ NARRATIVE
                        var HasIQNarrative = response.Layout.HasIQNarrative;
                        viewModel.set('HasIQNarrative', HasIQNarrative);
                        if (HasIQNarrative == true) {
                            viewModel.set('DisplayStatusIQNarrative', response.Detail.Content.Narrative[0].IsDisplayIQNarrative)
                            $('#HasIQNarrative').show()
                        } else {
                            viewModel.set('DisplayStatusIQNarrative', false)
                            $('#HasIQNarrative').hide()
                        }
                        ////VALIDITY SCALE NARRATIVE
                        var HasValidityScaleNarrative = response.Layout.HasValidityScaleNarrative;
                        viewModel.set('HasValidityScaleNarrative', HasValidityScaleNarrative);
                        if (HasValidityScaleNarrative == true) {
                            viewModel.set('DisplayStatusValidityScaleNarrative', response.Detail.Content.Narrative[0].IsDisplayValidityScaleNarrative)
                            $('#HasValidityScaleNarrative').show()
                        } else {
                            viewModel.set('DisplayStatusValidityScaleNarrative', false)
                            $('#HasValidityScaleNarrative').hide()
                        }
                        ////GROUP NARRATIVE
                        var HasGroupNarrative = response.Layout.HasGroupNarrative;
                        viewModel.set('HasGroupNarrative', HasGroupNarrative);
                        if (HasGroupNarrative == true) {
                            viewModel.set('DisplayStatusGroupNarrative', response.Detail.Content.Narrative[0].IsDisplayGroupNarrative)
                            $('#HasGroupNarrative').show()
                        } else {
                            viewModel.set('DisplayStatusGroupNarrative', false)
                            $('#HasGroupNarrative').hide()
                        }

                        var NarrativeSequenceLength = response.Detail.Content.Narrative[0].NarrativeSequence.length
                        var NarrativeSequence = []
                        if (NarrativeSequenceLength > 0) {
                            for (ns = 0; ns < NarrativeSequenceLength; ns++) {
                                NarrativeSequence.push(response.Detail.Content.Narrative[0].NarrativeSequence[ns])
                            }
                        }

                        if (NarrativeSequence.length > 0) {
                            for (ns = (NarrativeSequence.length - 1); ns >= 0; --ns) {
                                if (NarrativeSequence[ns] == "subtest") {
                                    if (($('#NarrativesGroupNarratives > .form-content ul').children()).length > 0) {
                                        var ulLength = ($('#NarrativesGroupNarratives > .form-content ul').children()).length
                                        for (ul = 0; ul < ulLength; ul++) {
                                            if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).css('display') == "block") {
                                                if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('data-type') == "subtest") {
                                                    var id = $($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('id')
                                                    $('#' + id).prependTo('ul.draggable')
                                                }
                                            }
                                        }
                                    }
                                } else if (NarrativeSequence[ns] == "iq") {
                                    if (($('#NarrativesGroupNarratives > .form-content ul').children()).length > 0) {
                                        var ulLength = ($('#NarrativesGroupNarratives > .form-content ul').children()).length
                                        for (ul = 0; ul < ulLength; ul++) {
                                            if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).css('display') == "block") {
                                                if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('data-type') == "iq") {
                                                    $('#HasIQNarrative').prependTo('ul.draggable')
                                                }
                                            }
                                        }
                                    }
                                } else if (NarrativeSequence[ns] == "vs") {
                                    if (($('#NarrativesGroupNarratives > .form-content ul').children()).length > 0) {
                                        var ulLength = ($('#NarrativesGroupNarratives > .form-content ul').children()).length
                                        for (ul = 0; ul < ulLength; ul++) {
                                            if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).css('display') == "block") {
                                                if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('data-type') == "vs") {
                                                    $('#HasValidityScaleNarrative').prependTo('ul.draggable')
                                                }
                                            }
                                        }
                                    }
                                } else if (NarrativeSequence[ns] == "group") {
                                    if (($('#NarrativesGroupNarratives > .form-content ul').children()).length > 0) {
                                        var ulLength = ($('#NarrativesGroupNarratives > .form-content ul').children()).length
                                        for (ul = 0; ul < ulLength; ul++) {
                                            if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).css('display') == "block") {
                                                if ($($('#NarrativesGroupNarratives > .form-content ul').children()[ul]).attr('data-type') == "group") {
                                                    $('#HasGroupNarrative').prependTo('ul.draggable')
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        viewModel.set('DisplayStatusNarrativesGroupNarratives', response.Detail.Content.Narrative[0].IsDisplay)
                        if (viewModel.DisplayStatusNarrativesGroupNarratives == false) {
                            $('#DisplayStatusNarrativesGroupNarratives').attr('checked', false)
                            $('#DisplayStatusNarrativesGroupNarratives').attr('onchange', 'DisplayStatusNarrativesGroupNarrativesChecked(this)')
                        } else {
                            $('#DisplayStatusNarrativesGroupNarratives').val(response.Detail.Content.Narrative[0].IsDisplay)
                        }
                    }

                    //STRENGTH AREA
                    var HasStrengthArea = response.Layout.HasStrengthArea;
                    viewModel.set('HasStrengthArea', HasStrengthArea);
                    if (HasStrengthArea == true) {
                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarStrengthArea').length == 0 ?
                            $('#contentBox > ul.form-content li#contentLayout').append(
                                '<div id="panelbarStrengthArea">' +
                                    '<div id="StrengthArea"> Strength Area' +
                                        '<ul class="form-content">' +
                                            '<li style="padding-top:2%">' +
                                                '<label>Title<span class="mandatory">*</span></label>' +
                                                '<input id="TitleStrengthArea" name="TitleStrengthArea" style="width:50%" data-bind="value: TitleStrengthArea" />' +
                                            '</li>' +
                                            '<li style="padding-bottom:2%">' +
                                                '<label style="width:90%">Value from Sub Test Narratives - Strength</label>' +
                                            '</li>' +
                                        '</ul>' +
                                        '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusStrengthArea" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusStrengthArea" onchange="DisplayStatusStrengthArea(this)" />Display' +
                                        '</span>' +
                                    '</div>' +
                                '</div>'
                            ) : null

                        viewModel.set('TitleStrengthArea', response.Detail.Content.StrengthArea.Title)
                        $('#TitleStrengthArea').val(response.Detail.Content.StrengthArea.Title)

                        viewModel.set('DisplayStatusStrengthArea', response.Detail.Content.StrengthArea.IsDisplay)
                        if (viewModel.DisplayStatusStrengthArea == false) {
                            $('#DisplayStatusStrengthArea').attr('checked', false)
                            $('#DisplayStatusStrengthArea').attr('onchange', 'DisplayStatusStrengthAreaChecked(this)')
                        } else {
                            $('#DisplayStatusStrengthArea').val(viewModel.DisplayStatusStrengthArea)
                        }

                        $("#panelbarStrengthArea").kendoPanelBar();
                        var panelbarStrengthArea = $("#panelbarStrengthArea").data("kendoPanelBar");
                        panelbarStrengthArea.expand($("#StrengthArea"));
                    } else {
                        viewModel.set('DisplayStatusStrengthArea', false)
                        $('#panelbarStrengthArea').hide()
                    }

                    //DEVELOPMENT AREA
                    var HasDevelopmentArea = response.Layout.HasDevelopmentArea;
                    viewModel.set('HasDevelopmentArea', HasDevelopmentArea);
                    if (HasDevelopmentArea == true) {
                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarDevelopmentArea').length == 0 ?
                            $('#contentBox > ul.form-content li#contentLayout').append(
                                '<div id="panelbarDevelopmentArea">' +
                                    '<div id="DevelopmentArea">Development Area' +
                                        '<ul class="form-content">' +
                                            '<li style="padding-top:2%">' +
                                                '<label>Title<span class="mandatory">*</span></label>' +
                                                '<input id="TitleDevelopmentArea" name="TitleDevelopmentArea" style="width:50%" data-bind="value: TitleDevelopmentArea" />' +
                                            '</li>' +
                                            '<li style="padding-bottom:2%">' +
                                                '<label style="width:90%">Value from Sub Test Narratives - Development Area</label>' +
                                            '</li>' +
                                        '</ul>' +
                                        '<span style="float:right">' +
                                            '<input type="checkbox" id="DisplayStatusDevelopmentArea" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusDevelopmentArea" onchange="DisplayStatusDevelopmentArea(this)" />Display' +
                                        '</span>' +
                                    '</div>' +
                                '</div>'
                            ) : null

                        viewModel.set('TitleDevelopmentArea', response.Detail.Content.DevelopmentArea.Title)
                        $('#TitleDevelopmentArea').val(response.Detail.Content.DevelopmentArea.Title)

                        viewModel.set('DisplayStatusDevelopmentArea', response.Detail.Content.DevelopmentArea.IsDisplay)
                        if (viewModel.DisplayStatusDevelopmentArea == false) {
                            $('#DisplayStatusDevelopmentArea').attr('checked', false)
                            $('#DisplayStatusDevelopmentArea').attr('onchange', 'DisplayStatusDevelopmentAreaChecked(this)')
                        } else {
                            $('#DisplayStatusDevelopmentArea').val(viewModel.DisplayStatusDevelopmentArea)
                        }

                        $("#panelbarDevelopmentArea").kendoPanelBar();
                        var panelbarDevelopmentArea = $("#panelbarDevelopmentArea").data("kendoPanelBar");
                        panelbarDevelopmentArea.expand($("#DevelopmentArea"));
                    } else {
                        viewModel.set('DisplayStatusDevelopmentArea', false)
                        $('#panelbarDevelopmentArea').hide()
                    }
                }
            }
        })
    }
}

CompanyLoad = function () {
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Company",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Data.length < 1) {
                LoadingMask.hide();
                swal("Failed!", "Company Not Found", "warning", { closeOnClickOutside: false });
                return;
            } else {
                LoadingMask.hide();
                viewModel.set('CompanyList', response.Data);
                if (viewModel.CompanyName !== '') {
                    viewModel.set('CompanyName', viewModel.CompanyName)
                } else {
                    viewModel.set('CompanyName', "");
                }
                dropDownCompany();
            }
        }
    });
}
dropDownCompany = function () {
    $("#CompanyId").kendoComboBox({
        autoBind: true,
        placeholder: "Select Company..",
        dataSource: viewModel.CompanyList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.CompanyList.find(x => x.Value === e.item[0].innerHTML).Code;
            var name = viewModel.CompanyList.find(x => x.Value === e.item[0].innerHTML).Value;
            if (viewModel.CompanyId !== "") {
                viewModel.set('CompanyId', id);
                viewModel.set('CompanyName', name);
            } else {
                viewModel.set('CompanyId', id);
                viewModel.set('CompanyName', name);
            }
        }
    });
}

MappingReportTypeLoad = function () {
    //LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/MappingReportType",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Data.length < 1) {
                //LoadingMask.hide();
                swal("Failed!", "Mapping Report Type Not Found", "warning", { closeOnClickOutside: false });
                return;
            } else {
                //LoadingMask.hide();
                viewModel.set('MappingReportTypeList', response.Data);
                if (viewModel.MappingReportTypeName !== '') {
                    viewModel.set('MappingReportTypeName', viewModel.MappingReportTypeName)
                } else {
                    viewModel.set('MappingReportTypeName', "");
                }
                dropDownMappingReportType();
            }
        }
    });
}
dropDownMappingReportType = function () {
    $('#MappingReportTypeCode').kendoComboBox({
        placeholder: 'Select Type...',
        dataSource: viewModel.MappingReportTypeList,
        dataTextField: 'Value',
        dataValueField: 'Code',
        select: function (e) {
            var id = viewModel.MappingReportTypeList.find(x => x.Value === e.item[0].innerHTML) == undefined ?
                viewModel.MappingReportTypeList.find(x => x.Value === e.item[0].innerText).Code : viewModel.MappingReportTypeList.find(x => x.Value === e.item[0].innerHTML).Code
            var name = viewModel.MappingReportTypeList.find(x => x.Value === e.item[0].innerHTML) == undefined ?
                viewModel.MappingReportTypeList.find(x => x.Value === e.item[0].innerText).Value : viewModel.MappingReportTypeList.find(x => x.Value === e.item[0].innerHTML).Value


            if (viewModel.MappingReportTypeCode !== "") {
                viewModel.set('MappingReportTypeCode', id);
                viewModel.set('MappingReportTypeName', name);
            } else {
                viewModel.set('MappingReportTypeCode', id);
                viewModel.set('MappingReportTypeName', name);
            }
            $('#headerCoverBox').show()
            $('#coverBox').show()
            $('#headerContentBox').show()
            $('#contentBox').show()
            loadLayoutContent(id)
        }
    });
}

ConfigLayoutCoverValueLoad = function (count) {
    if (count == undefined || count == null) {
        count = 0;
    } else {
        count = count;
    }
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/ConfigLayoutCoverValue",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Data.length < 1) {
                //LoadingMask.hide();
                swal("Failed", response.Message, "warning", { closeOnClickOutside: false });
                return;
            } else {
                //LoadingMask.hide();
                viewModel.set('ConfigLayoutCoverValueList', response.Data);
                dropDownConfigLayoutCoverValue(count);
            }
        }
    });
}
dropDownConfigLayoutCoverValue = function (count) {
    if (count == undefined || count == null) {
        count = 0;
    } else {
        count = count;
    }
    $('#ConfigLayoutCoverValueCode' + count).kendoComboBox({
        placeholder: 'Select Type...',
        dataSource: viewModel.ConfigLayoutCoverValueList,
        dataTextField: 'Value',
        dataValueField: 'Code',
        select: function (e) {
            var id = viewModel.ConfigLayoutCoverValueList.find(x => x.Value === e.item[0].innerHTML).Code;
            var name = viewModel.ConfigLayoutCoverValueList.find(x => x.Value === e.item[0].innerHTML).Value;

            if (viewModel.Cover.Values.length > 0) {
                for (a = 0; a < viewModel.Cover.Values.length; a++) {
                    if (id == viewModel.Cover.Values[a]) {
                        confirmMessageDuplicateCoverValue();
                        $('.swal-button--defeat').on('click', function () {
                            $('#ConfigLayoutCoverValueCode' + count).data('kendoComboBox').value("");
                            viewModel.set('Cover.Values[' + count + ']', "");
                        })
                    } else {
                        //break
                    }
                }
                viewModel.set('Cover.Values[' + count + ']', id);
            } else {
                viewModel.Cover.Values.push(id)
            }
        }
    });
}

loadLayoutContent = function (id) {
    var MappingReportTypeCode = id
    $('#ListCompt').empty();
    LoadingMask.show()
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + 'api/ConfigLayoutReport/GetLayout',
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            MappingReportTypeCode: MappingReportTypeCode
        },
        success: function (response) {
            if (response.Acknowledge > 0) {
                //CANDIDATE INFORMATION
                if (response.CandidateInformationDropdown.length < 1) {
                    swal("Failed", response.Message, "warning", { closeOnClickOutside: false });
                    return;
                } else {
                    viewModel.set('CandidateInformationValueList', response.CandidateInformationDropdown)
                    dropDownCandidateInformationValue();
                }

                //PSYCHOGRAM
                if (response.Layout.IsPsychogramPerSubTest || response.Layout.IsPsychogramPerCompetency) {
                    viewModel.set('HasPsychogram', true);
                    if (response.Layout.IsProfiling == true) {
                        viewModel.set('IsProfiling', true);
                        viewModel.set('DisplayStatusPsychogram', false)
                        $('#panelbarPsychogram').hide()
                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives').length == 0 ?
                            null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives').remove()

                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramAbility').length == 0 ?
                            null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramAbility').remove()

                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramPersonality').length == 0 ?
                            null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramPersonality').remove()

                        for (tti = 0; tti < response.TestToolInfos.length; tti++) {
                            viewModel.set('TestToolInfosLength', response.TestToolInfos.length)
                            if (response.TestToolInfos.length <= 1) {
                                for (tt = 0; tt <= response.TestToolInfos.length; tt++) {
                                    $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives' + tt + '').length == 0 ?
                                        null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives' + tt + '').remove()
                                }

                                if (response.TestToolInfos[tti].IsbyTest == true) {
                                    // Psychogram Personality => IsByTest true
                                    viewModel.set('HasPsychogramPersonality', true)
                                    viewModel.set('DisplayStatusPsychogramPersonality', true)

                                    $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramPersonality').length == 0 ?
                                        $('#contentBox > ul.form-content li#contentLayout').append(
                                            '<div id="panelbarPsychogramPersonality">' +
                                                '<div id="PsychogramPersonality">Psychogram Personality' +
                                                    '<ul class="form-content">' +
                                                        '<li style="padding-top:2%; padding-bottom:2%">' +
                                                            '<label>Title<span class="mandatory">*</span></label>' +
                                                            '<input id="TitlePsychogramPersonality" name="TitlePsychogramPersonality" style="width:50%" data-bind="value: TitlePsychogramPersonality" />' +
                                                        '</li>' +
                                                    '</ul>' +
                                                    '<span style="float:right">' +
                                                        '<input type="checkbox" id="DisplayStatusPsychogramPersonality" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusPsychogramPersonality" onchange="DisplayStatusPsychogramPersonality(this)" />Display' +
                                                    '</span>' +
                                                '</div>' +
                                            '</div>'
                                        ) : null

                                    $("#panelbarPsychogramPersonality").kendoPanelBar();
                                    var panelbarPsychogramPersonality = $("#panelbarPsychogramPersonality").data("kendoPanelBar");
                                    panelbarPsychogramPersonality.expand($("#PsychogramPersonality"));
                                    //$('#panelbarPsychogramPersonality').show()
                                    viewModel.set('DisplayStatusPsychogramAbility', false)
                                    //$('#panelbarPsychogramAbility').hide()
                                }
                                else {
                                    // Psychogram Ability => IsByTest false
                                    viewModel.set('HasPsychogramAbility', true)
                                    viewModel.set('DisplayStatusPsychogramAbility', true)

                                    $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramAbility').length == 0 ?
                                        $('#contentBox > ul.form-content li#contentLayout').append(
                                            '<div id="panelbarPsychogramAbility">' +
                                                '<div id="PsychogramAbility">Psychogram Ability' +
                                                    '<ul class="form-content">' +
                                                        '<li style="padding-top:2%; padding-bottom:2%">' +
                                                            '<label>Title<span class="mandatory">*</span></label>' +
                                                            '<input id="TitlePsychogramAbility" name="TitlePsychogramAbility" style="width:50%" data-bind="value: TitlePsychogramAbility" />' +
                                                        '</li>' +
                                                    '</ul>' +
                                                    '<span style="float:right">' +
                                                        '<input type="checkbox" id="DisplayStatusPsychogramAbility" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusPsychogramAbility" onchange="DisplayStatusPsychogramAbility(this)" />Display' +
                                                    '</span>' +
                                                '</div>' +
                                            '</div>'
                                        ) : null

                                    $("#panelbarPsychogramAbility").kendoPanelBar();
                                    var panelbarPsychogramAbility = $("#panelbarPsychogramAbility").data("kendoPanelBar");
                                    panelbarPsychogramAbility.expand($("#PsychogramAbility"));
                                    //$('#panelbarPsychogramAbility').show()
                                    viewModel.set('DisplayStatusPsychogramPersonality', false)
                                    //$('#panelbarPsychogramPersonality').hide()
                                }

                                $('#contentBox > ul.form-content li#contentLayout').append(
                                    '<div id="panelbarNarrativesGroupNarratives" style="width: 96.5%;">' +
                                    '<div id="NarrativesGroupNarratives">Narratives & Group Narratives' +
                                    '<ul class="form-content">' +
                                    '<li style="padding-top:2%;padding-bottom:2%">' +
                                    '<label>Title<span class="mandatory">*</span></label>' +
                                    '<input id="TitleNarrativesGroupNarratives" name="TitleNarrativesGroupNarratives" style="width:50%" data-bind="value:TitleNarrativesGroupNarratives" />' +
                                    '</li>' +
                                    '<li id="listNarratives" style="padding-top:2%;padding-bottom:2%">' +
                                    '<ul class="draggable">' +
                                    '<li id="HasSubTestNarrative" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusSubTestNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrative" onchange="Display(this)"/>Display' +
                                    '</span>' +
                                    '<div id="AllNarrativesSubTestNarrative">All Narratives' +
                                    '<input type="radio" name="IsAllNarrativeSubTestNarrative" id="IsAllNarrativeSubTestNarrative" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrative" onclick="AllNarrativeSubTestNarrative(this)"/>' +
                                    '<span> Yes</span>' +
                                    '<input type="radio" name="IsAllNarrativeSubTestNarrative" id="IsNotAllNarrativeSubTestNarrative" data-bind="checked: IsNotAllNarrativeSubTestNarrative" onclick="NotAllNarrativeSubTestNarrative(this)"/>' +
                                    '<span> No</span>' +
                                    '</div>' +
                                    '<div id="HighestScoreSubTestNarrative" hidden="hidden">Highest Score' +
                                    '<input type="checkbox" id="IsHighestScoreSubTestNarrative" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrative" onchange="DisplayHighestScoreSubTestNarrative(this)" />' +
                                    '<input id="HighestScoreTotalDisplaySubTestNarrative" name="HighestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                                    '</div>' +
                                    '<div id="LowestScoreSubTestNarrative" hidden="hidden">Lowest Score' +
                                    '<input type="checkbox" id="IsLowestScoreSubTestNarrative" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrative" onchange="DisplayLowestScoreSubTestNarrative(this)" />' +
                                    '<input id="LowestScoreTotalDisplaySubTestNarrative" name="LowestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                                    '</div>' +
                                    '</li>' +
                                    '<li id="IsSubTestNarrativeShort" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Short]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusSubTestNarrativeShort" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeShort" onchange="DisplayStatusSubTestNarrativeShort(this)" />Display' +
                                    '</span>' +
                                    '<div id="AllNarrativesSubTestNarrativeShort">All Narratives' +
                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort" id="IsAllNarrativeSubTestNarrativeShort" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeShort" onclick="AllNarrativeSubTestNarrativeShort(this)"/>' +
                                    '<span> Yes</span>' +
                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort" id="IsNotAllNarrativeSubTestNarrativeShort" data-bind="checked: IsNotAllNarrativeSubTestNarrativeShort" onclick="NotAllNarrativeSubTestNarrativeShort(this)"/>' +
                                    '<span> No</span>' +
                                    '</div>' +
                                    '<div id="HighestScoreSubTestNarrativeShort" hidden="hidden">Highest Score' +
                                    '<input type="checkbox" id="IsHighestScoreSubTestNarrativeShort" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeShort" onchange="DisplayHighestScoreSubTestNarrativeShort(this)" />' +
                                    '<input id="HighestScoreTotalDisplaySubTestNarrativeShort" name="HighestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                                    '</div>' +
                                    '<div id="LowestScoreSubTestNarrativeShort" hidden="hidden">Lowest Score' +
                                    '<input type="checkbox" id="IsLowestScoreSubTestNarrativeShort" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeShort" onchange="DisplayLowestScoreSubTestNarrativeShort(this)" />' +
                                    '<input id="LowestScoreTotalDisplaySubTestNarrativeShort" name="LowestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                                    '</div>' +
                                    '</li >' +
                                    '<li id="IsSubTestNarrativeLong" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Long]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusSubTestNarrativeLong" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeLong" onchange="DisplayStatusSubTestNarrativeLong(this)" />Display' +
                                    '</span>' +
                                    '<div id="AllNarrativesSubTestNarrativeLong">All Narratives' +
                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong" id="IsAllNarrativeSubTestNarrativeLong" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeLong" onclick="AllNarrativeSubTestNarrativeLong(this)"/>' +
                                    '<span> Yes</span>' +
                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong" id="IsNotAllNarrativeSubTestNarrativeLong" data-bind="checked: IsNotAllNarrativeSubTestNarrativeLong" onclick="NotAllNarrativeSubTestNarrativeLong(this)"/>' +
                                    '<span> No</span>' +
                                    '</div>' +
                                    '<div id="HighestScoreSubTestNarrativeLong" hidden="hidden">Highest Score' +
                                    '<input type="checkbox" id="IsHighestScoreSubTestNarrativeLong" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeLong" onchange="DisplayHighestScoreSubTestNarrativeLong(this)" />' +
                                    '<input id="HighestScoreTotalDisplaySubTestNarrativeLong" name="HighestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                                    '</div>' +
                                    '<div id="LowestScoreSubTestNarrativeLong" hidden="hidden">Lowest Score' +
                                    '<input type="checkbox" id="IsLowestScoreSubTestNarrativeLong" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeLong" onchange="DisplayLowestScoreSubTestNarrativeLong(this)" />' +
                                    '<input id="LowestScoreTotalDisplaySubTestNarrativeLong" name="LowestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                                    '</div>' +
                                    '</li >' +
                                    '<li id="HasSubTestCuttingNarrative" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrative" onchange="DisplayStatusSubTestCuttingNarrative(this)" />Display' +
                                    '</span>' +
                                    '<div id="AllNarrativesSubTestCuttingNarrative">All Narratives' +
                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative" id="IsAllNarrativeSubTestCuttingNarrative" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrative" onclick="AllNarrativeSubTestCuttingNarrative(this)"/>' +
                                    '<span> Yes</span>' +
                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative" id="IsNotAllNarrativeSubTestCuttingNarrative" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrative" onclick="NotAllNarrativeSubTestCuttingNarrative(this)"/>' +
                                    '<span> No</span>' +
                                    '</div>' +
                                    '<div id="HighestScoreSubTestCuttingNarrative" hidden="hidden">Highest Score' +
                                    '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrative" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrative" onchange="DisplayHighestScoreSubTestCuttingNarrative(this)" />' +
                                    '<input id="HighestScoreTotalDisplaySubTestCuttingNarrative" name="HighestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                                    '</div>' +
                                    '<div id="LowestScoreSubTestCuttingNarrative" hidden="hidden">Lowest Score' +
                                    '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrative" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrative" onchange="DisplayLowestScoreSubTestCuttingNarrative(this)" />' +
                                    '<input id="LowestScoreTotalDisplaySubTestCuttingNarrative" name="LowestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                                    '</div>' +
                                    '</li >' +
                                    '<li id="IsSubTestCuttingNarrativeShort" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Short]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeShort" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeShort" onchange="DisplayStatusSubTestCuttingNarrativeShort(this)" />Display' +
                                    '</span>' +
                                    '<div id="AllNarrativesSubTestCuttingNarrativeShort">All Narratives' +
                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort" id="IsAllNarrativeSubTestCuttingNarrativeShort" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeShort" onclick="AllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                                    '<span> Yes</span>' +
                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort" id="IsNotAllNarrativeSubTestCuttingNarrativeShort" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeShort" onclick="NotAllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                                    '<span> No</span>' +
                                    '</div>' +
                                    '<div id="HighestScoreSubTestCuttingNarrativeShort" hidden="hidden">Highest Score' +
                                    '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeShort" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeShort" onchange="DisplayHighestScoreSubTestCuttingNarrativeShort(this)" />' +
                                    '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeShort" name="HighestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                                    '</div>' +
                                    '<div id="LowestScoreSubTestCuttingNarrativeShort" hidden="hidden">Lowest Score' +
                                    '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeShort" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeShort" onchange="DisplayLowestScoreSubTestCuttingNarrativeShort(this)" />' +
                                    '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeShort" name="LowestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                                    '</div>' +
                                    '</li>' +
                                    '<li id="IsSubTestCuttingNarrativeLong" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Long]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeLong" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeLong" onchange="DisplayStatusSubTestCuttingNarrativeLong(this)" />Display' +
                                    '</span>' +
                                    '<div id="AllNarrativesSubTestCuttingNarrativeLong">All Narratives' +
                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong" id="IsAllNarrativeSubTestCuttingNarrativeLong" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeLong" onclick="AllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                                    '<span> Yes</span>' +
                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong" id="IsNotAllNarrativeSubTestCuttingNarrativeLong" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeLong" onclick="NotAllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                                    '<span> No</span>' +
                                    '</div>' +
                                    '<div id="HighestScoreSubTestCuttingNarrativeLong" hidden="hidden">Highest Score' +
                                    '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeLong" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeLong" onchange="DisplayHighestScoreSubTestCuttingNarrativeLong(this)" />' +
                                    '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeLong" name="HighestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                                    '</div>' +
                                    '<div id="LowestScoreSubTestCuttingNarrativeLong" hidden="hidden">Lowest Score' +
                                    '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeLong" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeLong" onchange="DisplayLowestScoreSubTestCuttingNarrativeLong(this)" />' +
                                    '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeLong" name="LowestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                                    '</div>' +
                                    '</li>' +
                                    '<li id="HasIQNarrative" style="border: outset; width:50%; display:block" data-type="iq">[[IQ Narratives]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusIQNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusIQNarrative" onchange="DisplayStatusIQNarrative(this)" />Display' +
                                    '</span>' +
                                    '</li>' +
                                    '<li id="HasValidityScaleNarrative" style="border: outset; width:50%; display:block" data-type="vs">[[Validity Scale Narratives]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusValidityScaleNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusValidityScaleNarrative" onchange="DisplayStatusValidityScaleNarrative(this)" />Display' +
                                    '</span>' +
                                    '</li>' +
                                    '<li id="HasGroupNarrative" style="border: outset; width:50%; display:block" data-type="group">[[Group Narratives]]' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusGroupNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusGroupNarrative" onchange="DisplayStatusGroupNarrative(this)" />Display' +
                                    '</span>' +
                                    '</li>' +
                                    '</ul>' +
                                    '</li>' +
                                    '</ul>' +
                                    '<span style="float:right">' +
                                    '<input type="checkbox" id="DisplayStatusNarrativesGroupNarratives" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusNarrativesGroupNarratives" onchange="DisplayStatusNarrativesGroupNarratives(this)" />Display' +
                                    '</span>' +
                                    '</div>' +
                                    '</div>'
                                )

                                viewModel.set('IsAllNarrativeSubTestNarrative', true)
                                viewModel.set('IsAllNarrativeSubTestNarrativeShort', true)
                                viewModel.set('IsAllNarrativeSubTestNarrativeLong', true)
                                viewModel.set('IsAllNarrativeSubTestCuttingNarrative', true)
                                viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', true)
                                viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', true)
                                viewModel.set('DisplayStatusNarrativesGroupNarratives', true)

                                $('#HighestScoreTotalDisplaySubTestNarrative').keypress(function (e) {
                                    if (e.which == 46 || e.which == 44) {
                                        return false;
                                    }
                                });
                                $('#LowestScoreTotalDisplaySubTestNarrative').keypress(function (e) {
                                    if (e.which == 46 || e.which == 44) {
                                        return false;
                                    }
                                });
                                $('#HighestScoreTotalDisplaySubTestNarrativeShort').keypress(function (e) {
                                    if (e.which == 46 || e.which == 44) {
                                        return false;
                                    }
                                });
                                $('#LowestScoreTotalDisplaySubTestNarrativeShort').keypress(function (e) {
                                    if (e.which == 46 || e.which == 44) {
                                        return false;
                                    }
                                });
                                $('#HighestScoreTotalDisplaySubTestNarrativeLong').keypress(function (e) {
                                    if (e.which == 46 || e.which == 44) {
                                        return false;
                                    }
                                });
                                $('#LowestScoreTotalDisplaySubTestNarrativeLong').keypress(function (e) {
                                    if (e.which == 46 || e.which == 44) {
                                        return false;
                                    }
                                });

                                $('#HighestScoreTotalDisplaySubTestCuttingNarrative').keypress(function (e) {
                                    if (e.which == 46 || e.which == 44) {
                                        return false;
                                    }
                                });
                                $('#LowestScoreTotalDisplaySubTestCuttingNarrative').keypress(function (e) {
                                    if (e.which == 46 || e.which == 44) {
                                        return false;
                                    }
                                });
                                $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort').keypress(function (e) {
                                    if (e.which == 46 || e.which == 44) {
                                        return false;
                                    }
                                });
                                $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort').keypress(function (e) {
                                    if (e.which == 46 || e.which == 44) {
                                        return false;
                                    }
                                });
                                $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong').keypress(function (e) {
                                    if (e.which == 46 || e.which == 44) {
                                        return false;
                                    }
                                });
                                $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong').keypress(function (e) {
                                    if (e.which == 46 || e.which == 44) {
                                        return false;
                                    }
                                });

                                $("#panelbarNarrativesGroupNarratives").kendoPanelBar();
                                var panelbarNarrativesGroupNarratives = $("#panelbarNarrativesGroupNarratives").data("kendoPanelBar");
                                panelbarNarrativesGroupNarratives.expand($("#NarrativesGroupNarratives"));

                                //NARRATIVES & GROUP NARRATIVES
                                ////SUBTEST NARRATIVE
                                var HasSubTestNarrative = response.Layout.HasSubTestNarrative;
                                viewModel.set('HasSubTestNarrative', HasSubTestNarrative);
                                if (HasSubTestNarrative == true) {
                                    if (response.Layout.IsSubTestNarrativeShort == true) {
                                        viewModel.set('HasSubTestNarrativeShort', true);
                                        viewModel.set('DisplayStatusSubTestNarrativeShort', true)
                                        $('#IsSubTestNarrativeShort').show()
                                        $('#AllNarrativesSubTestNarrativeShort').show()
                                        viewModel.set('DisplayStatusSubTestNarrative', false)
                                        $('#HasSubTestNarrative').hide()
                                        $('#AllNarrativesSubTestNarrative').hide()
                                        viewModel.set('DisplayStatusSubTestNarrativeLong', false)
                                        $('#IsSubTestNarrativeLong').hide()
                                        $('#AllNarrativesSubTestNarrativeLong').hide()
                                    } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                        viewModel.set('HasSubTestNarrativeLong', true);
                                        viewModel.set('DisplayStatusSubTestNarrativeLong', true)
                                        $('#IsSubTestNarrativeLong').show()
                                        $('#AllNarrativesSubTestNarrativeLong').show()
                                        viewModel.set('DisplayStatusSubTestNarrative', false)
                                        $('#HasSubTestNarrative').hide()
                                        $('#AllNarrativesSubTestNarrative').hide()
                                        viewModel.set('DisplayStatusSubTestNarrativeShort', false)
                                        $('#IsSubTestNarrativeShort').hide()
                                        $('#AllNarrativesSubTestNarrativeShort').hide()
                                    }
                                } else {
                                    viewModel.set('DisplayStatusSubTestNarrative', false)
                                    $('#HasSubTestNarrative').hide()
                                    $('#AllNarrativesSubTestNarrative').hide()
                                    viewModel.set('DisplayStatusSubTestNarrativeShort', false)
                                    $('#IsSubTestNarrativeShort').hide()
                                    $('#AllNarrativesSubTestNarrativeShort').hide()
                                    viewModel.set('DisplayStatusSubTestNarrativeLong', false)
                                    $('#IsSubTestNarrativeLong').hide()
                                    $('#AllNarrativesSubTestNarrativeLong').hide()
                                }
                                ////SUBTEST CUTTING NARRATIVE
                                var HasSubTestCuttingNarrative = response.Layout.HasSubTestCuttingNarrative;
                                viewModel.set('HasSubTestCuttingNarrative', HasSubTestCuttingNarrative);
                                if (HasSubTestCuttingNarrative == true) {
                                    if (response.Layout.IsSubTestNarrativeShort == true) {
                                        viewModel.set('HasSubTestCuttingNarrativeShort', true);
                                        viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', true)
                                        $('#IsSubTestCuttingNarrativeShort').show()
                                        $('#AllNarrativesSubTestCuttingNarrativeShort').show()
                                        viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                                        $('#HasSubTestCuttingNarrative').hide()
                                        $('#AllNarrativesSubTestCuttingNarrative').hide()
                                        viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', false)
                                        $('#IsSubTestCuttingNarrativeLong').hide()
                                        $('#AllNarrativesSubTestCuttingNarrativeLong').hide()
                                    } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                        viewModel.set('HasSubTestCuttingNarrativeLong', true);
                                        viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', true)
                                        $('#IsSubTestCuttingNarrativeLong').show()
                                        $('#AllNarrativesSubTestCuttingNarrativeLong').show()
                                        viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                                        $('#HasSubTestCuttingNarrative').hide()
                                        $('#AllNarrativesSubTestCuttingNarrative').hide()
                                        viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', false)
                                        $('#IsSubTestCuttingNarrativeShort').hide()
                                        $('#AllNarrativesSubTestCuttingNarrativeShort').hide()
                                    }
                                } else {
                                    viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                                    $('#HasSubTestCuttingNarrative').hide()
                                    $('#AllNarrativesSubTestCuttingNarrative').hide()
                                    viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', false)
                                    $('#IsSubTestCuttingNarrativeShort').hide()
                                    $('#AllNarrativesSubTestCuttingNarrativeShort').hide()
                                    viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', false)
                                    $('#IsSubTestCuttingNarrativeLong').hide()
                                    $('#AllNarrativesSubTestCuttingNarrativeLong').hide()
                                }
                                ////IQ NARRATIVE
                                var HasIQNarrative = response.Layout.HasIQNarrative;
                                viewModel.set('HasIQNarrative', HasIQNarrative);
                                if (HasIQNarrative == true) {
                                    if (viewModel.DisplayStatusPsychogramAbility == false) {  //PERSONALITY > TIDAK ADA IQ NARRATIVE
                                        viewModel.set('DisplayStatusIQNarrative', false)
                                        $('#HasIQNarrative').hide()
                                    } else {
                                        viewModel.set('DisplayStatusIQNarrative', true)
                                        $('#HasIQNarrative').show()
                                    }
                                } else {
                                    viewModel.set('DisplayStatusIQNarrative', false)
                                    $('#HasIQNarrative').hide()
                                }
                                ////VALIDITY SCALE NARRATIVE
                                var HasValidityScaleNarrative = response.Layout.HasValidityScaleNarrative;
                                viewModel.set('HasValidityScaleNarrative', HasValidityScaleNarrative);
                                if (HasValidityScaleNarrative == true) {
                                    if (viewModel.DisplayStatusPsychogramPersonality == false) {  //ABILITY > TIDAK ADA VALIDITY SCALE
                                        viewModel.set('DisplayStatusValidityScaleNarrative', false)
                                        $('#HasValidityScaleNarrative').hide()
                                    } else {
                                        viewModel.set('DisplayStatusValidityScaleNarrative', true)
                                        $('#HasValidityScaleNarrative').show()
                                    }
                                } else {
                                    viewModel.set('DisplayStatusValidityScaleNarrative', false)
                                    $('#HasValidityScaleNarrative').hide()
                                }
                                ////GROUP NARRATIVE
                                var HasGroupNarrative = response.Layout.HasGroupNarrative;
                                viewModel.set('HasGroupNarrative', HasGroupNarrative);
                                if (HasGroupNarrative == true) {
                                    viewModel.set('DisplayStatusGroupNarrative', true)
                                    $('#HasGroupNarrative').show()
                                } else {
                                    viewModel.set('DisplayStatusGroupNarrative', false)
                                    $('#HasGroupNarrative').hide()
                                }

                                $('.draggable').sortable({
                                    connectWith: '.draggable',
                                    //revert: true
                                });
                                $('.draggable li').draggable({
                                    connectToSortable: '.draggable',
                                    revert: 'invalid'
                                });
                                $('ul, li').disableSelection();
                            }
                            else {
                                $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives' + tti +'').length == 0 ?
                                    null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives' + tti +'').remove()

                                if (response.TestToolInfos[tti].IsbyTest == true) {
                                    // Psychogram Personality => IsByTest true
                                    viewModel.set('HasPsychogramPersonality', true)
                                    viewModel.set('DisplayStatusPsychogramPersonality', true)
                                    //$('#panelbarPsychogramPersonality').show()
                                    $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramPersonality').length == 0 ?
                                        $('#contentBox > ul.form-content li#contentLayout').append(
                                            '<div id="panelbarPsychogramPersonality">' +
                                                '<div id="PsychogramPersonality">Psychogram Personality' +
                                                    '<ul class="form-content">'+
                                                        '<li style="padding-top:2%; padding-bottom:2%">' +
                                                            '<label>Title<span class="mandatory">*</span></label>'+
                                                            '<input id="TitlePsychogramPersonality" name="TitlePsychogramPersonality" style="width:50%" data-bind="value: TitlePsychogramPersonality" />'+
                                                        '</li>'+
                                                    '</ul>'+
                                                    '<span style="float:right">'+
                                                        '<input type="checkbox" id="DisplayStatusPsychogramPersonality" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusPsychogramPersonality" onchange="DisplayStatusPsychogramPersonality(this)" />Display'+
                                                    '</span>'+
                                                '</div>'+
                                            '</div>'
                                        ) : null

                                    $("#panelbarPsychogramPersonality").kendoPanelBar();
                                    var panelbarPsychogramPersonality = $("#panelbarPsychogramPersonality").data("kendoPanelBar");
                                    panelbarPsychogramPersonality.expand($("#PsychogramPersonality"));
                                    
                                    $('#contentBox > ul.form-content li#contentLayout').append(
                                        '<div id="panelbarNarrativesGroupNarratives' + tti +'" style="width: 96.5%;">' +
                                            '<div id="NarrativesGroupNarratives' + tti +'">Narratives & Group Narratives' +
                                                '<ul class="form-content">' +
                                                    '<li style="padding-top:2%;padding-bottom:2%">' +
                                                        '<label>Title<span class="mandatory">*</span></label>' +
                                                        '<input id="TitleNarrativesGroupNarratives' + tti +'" name="TitleNarrativesGroupNarratives" style="width:50%" data-bind="value:TitleNarrativesGroupNarratives" />' +
                                                    '</li>' +
                                                    '<li id="listNarratives' + tti +'" style="padding-top:2%;padding-bottom:2%">' +
                                                        '<ul class="draggable">' +
                                                            '<li id="HasSubTestNarrative' + tti +'" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusSubTestNarrative' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrative" onchange="Display(this)"/>Display' +
                                                                '</span>' +
                                                                '<div id="AllNarrativesSubTestNarrative' + tti +'">All Narratives' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestNarrative' + tti + '" id="IsAllNarrativeSubTestNarrative' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrative" tti="' + tti + '" onclick="AllNarrativeSubTestNarrative(this)"/>' +
                                                                    '<span> Yes</span>' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestNarrative' + tti +'" id="IsNotAllNarrativeSubTestNarrative' + tti +'" data-bind="checked: IsNotAllNarrativeSubTestNarrative" tti="' + tti + '" onclick="NotAllNarrativeSubTestNarrative(this)"/>' +
                                                                    '<span> No</span>' +
                                                                '</div>' +
                                                                '<div id="HighestScoreSubTestNarrative' + tti +'" hidden="hidden">Highest Score' +
                                                                    '<input type="checkbox" id="IsHighestScoreSubTestNarrative' + tti +'" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrative" tti="' + tti + '" onchange="DisplayHighestScoreSubTestNarrative(this)" />' +
                                                                    '<input id="HighestScoreTotalDisplaySubTestNarrative' + tti +'" name="HighestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                                                                '</div>' +
                                                                    '<div id="LowestScoreSubTestNarrative' + tti +'" hidden="hidden">Lowest Score' +
                                                                    '<input type="checkbox" id="IsLowestScoreSubTestNarrative' + tti +'" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrative" tti="' + tti + '" onchange="DisplayLowestScoreSubTestNarrative(this)" />' +
                                                                    '<input id="LowestScoreTotalDisplaySubTestNarrative' + tti +'" name="LowestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                                                                '</div>' +
                                                            '</li>' +
                                                            '<li id="IsSubTestNarrativeShort' + tti +'" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Short]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusSubTestNarrativeShort' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeShort" onchange="DisplayStatusSubTestNarrativeShort(this)" />Display' +
                                                                '</span>' +
                                                                '<div id="AllNarrativesSubTestNarrativeShort' + tti +'">All Narratives' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort' + tti +'" id="IsAllNarrativeSubTestNarrativeShort' + tti +'" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeShort" tti="' + tti + '" onclick="AllNarrativeSubTestNarrativeShort(this)"/>' +
                                                                    '<span> Yes</span>' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort' + tti + '" id="IsNotAllNarrativeSubTestNarrativeShort' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestNarrativeShort" tti="' + tti + '" onclick="NotAllNarrativeSubTestNarrativeShort(this)"/>' +
                                                                    '<span> No</span>' +
                                                                '</div>' +
                                                                '<div id="HighestScoreSubTestNarrativeShort' + tti +'" hidden="hidden">Highest Score' +
                                                                    '<input type="checkbox" id="IsHighestScoreSubTestNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeShort" tti="' + tti + '" onchange="DisplayHighestScoreSubTestNarrativeShort(this)" />' +
                                                                    '<input id="HighestScoreTotalDisplaySubTestNarrativeShort' + tti +'" name="HighestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                                                                '</div>' +
                                                                '<div id="LowestScoreSubTestNarrativeShort' + tti +'" hidden="hidden">Lowest Score' +
                                                                    '<input type="checkbox" id="IsLowestScoreSubTestNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeShort" tti="' + tti + '" onchange="DisplayLowestScoreSubTestNarrativeShort(this)" />' +
                                                                    '<input id="LowestScoreTotalDisplaySubTestNarrativeShort' + tti +'" name="LowestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                                                                '</div>' +
                                                            '</li >' +
                                                            '<li id="IsSubTestNarrativeLong' + tti +'" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Long]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusSubTestNarrativeLong' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeLong" onchange="DisplayStatusSubTestNarrativeLong(this)" />Display' +
                                                                '</span>' +
                                                                '<div id="AllNarrativesSubTestNarrativeLong' + tti +'">All Narratives' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong' + tti + '" id="IsAllNarrativeSubTestNarrativeLong' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeLong" tti="' + tti + '" onclick="AllNarrativeSubTestNarrativeLong(this)"/>' +
                                                                    '<span> Yes</span>' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong' + tti + '" id="IsNotAllNarrativeSubTestNarrativeLong' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestNarrativeLong" tti="' + tti + '" onclick="NotAllNarrativeSubTestNarrativeLong(this)"/>' +
                                                                    '<span> No</span>' +
                                                                '</div>' +
                                                                '<div id="HighestScoreSubTestNarrativeLong' + tti +'" hidden="hidden">Highest Score' +
                                                                    '<input type="checkbox" id="IsHighestScoreSubTestNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeLong" tti="' + tti + '" onchange="DisplayHighestScoreSubTestNarrativeLong(this)" />' +
                                                                    '<input id="HighestScoreTotalDisplaySubTestNarrativeLong' + tti +'" name="HighestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                                                                '</div>' +
                                                                '<div id="LowestScoreSubTestNarrativeLong' + tti +'" hidden="hidden">Lowest Score' +
                                                                    '<input type="checkbox" id="IsLowestScoreSubTestNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeLong" tti="' + tti + '" onchange="DisplayLowestScoreSubTestNarrativeLong(this)" />' +
                                                                    '<input id="LowestScoreTotalDisplaySubTestNarrativeLong' + tti +'" name="LowestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                                                                '</div>' +
                                                            '</li >' +
                                                            '<li id="HasSubTestCuttingNarrative' + tti +'" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrative' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrative" onchange="DisplayStatusSubTestCuttingNarrative(this)" />Display' +
                                                                '</span>' +
                                                                '<div id="AllNarrativesSubTestCuttingNarrative' + tti +'">All Narratives' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative' + tti + '" id="IsAllNarrativeSubTestCuttingNarrative' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrative" tti="' + tti + '" onclick="AllNarrativeSubTestCuttingNarrative(this)"/>' +
                                                                    '<span> Yes</span>' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative' + tti + '" id="IsNotAllNarrativeSubTestCuttingNarrative' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrative" tti="' + tti + '" onclick="NotAllNarrativeSubTestCuttingNarrative(this)"/>' +
                                                                    '<span> No</span>' +
                                                                '</div>' +
                                                                '<div id="HighestScoreSubTestCuttingNarrative' + tti +'" hidden="hidden">Highest Score' +
                                                                    '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrative' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrative" tti="' + tti + '" onchange="DisplayHighestScoreSubTestCuttingNarrative(this)" />' +
                                                                    '<input id="HighestScoreTotalDisplaySubTestCuttingNarrative' + tti +'" name="HighestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                                                                '</div>' +
                                                                '<div id="LowestScoreSubTestCuttingNarrative' + tti +'" hidden="hidden">Lowest Score' +
                                                                    '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrative' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrative" tti="' + tti + '" onchange="DisplayLowestScoreSubTestCuttingNarrative(this)" />' +
                                                                    '<input id="LowestScoreTotalDisplaySubTestCuttingNarrative' + tti +'" name="LowestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                                                                '</div>' +
                                                            '</li >' +
                                                            '<li id="IsSubTestCuttingNarrativeShort' + tti +'" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Short]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeShort' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeShort" onchange="DisplayStatusSubTestCuttingNarrativeShort(this)" />Display' +
                                                                '</span>' +
                                                                '<div id="AllNarrativesSubTestCuttingNarrativeShort' + tti +'">All Narratives' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort' + tti + '" id="IsAllNarrativeSubTestCuttingNarrativeShort' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeShort" tti="' + tti + '" onclick="AllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                                                                    '<span> Yes</span>' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort' + tti + '" id="IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeShort" tti="' + tti + '" onclick="NotAllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                                                                    '<span> No</span>' +
                                                                '</div>' +
                                                                '<div id="HighestScoreSubTestCuttingNarrativeShort' + tti +'" hidden="hidden">Highest Score' +
                                                                    '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeShort" tti="' + tti + '" onchange="DisplayHighestScoreSubTestCuttingNarrativeShort(this)" />' +
                                                                    '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti +'" name="HighestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                                                                '</div>' +
                                                                '<div id="LowestScoreSubTestCuttingNarrativeShort' + tti +'" hidden="hidden">Lowest Score' +
                                                                    '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeShort" tti="' + tti + '" onchange="DisplayLowestScoreSubTestCuttingNarrativeShort(this)" />' +
                                                                    '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti +'" name="LowestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                                                                '</div>' +
                                                            '</li>' +
                                                            '<li id="IsSubTestCuttingNarrativeLong' + tti +'" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Long]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeLong' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeLong" onchange="DisplayStatusSubTestCuttingNarrativeLong(this)" />Display' +
                                                                '</span>' +
                                                                '<div id="AllNarrativesSubTestCuttingNarrativeLong' + tti +'">All Narratives' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong' + tti + '" id="IsAllNarrativeSubTestCuttingNarrativeLong' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeLong" tti="' + tti + '" onclick="AllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                                                                    '<span> Yes</span>' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong' + tti + '" id="IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeLong" tti="' + tti + '" onclick="NotAllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                                                                    '<span> No</span>' +
                                                                '</div>' +
                                                                '<div id="HighestScoreSubTestCuttingNarrativeLong' + tti +'" hidden="hidden">Highest Score' +
                                                                    '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeLong" tti="' + tti + '" onchange="DisplayHighestScoreSubTestCuttingNarrativeLong(this)" />' +
                                                                    '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti +'" name="HighestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                                                                '</div>' +
                                                                '<div id="LowestScoreSubTestCuttingNarrativeLong' + tti +'" hidden="hidden">Lowest Score' +
                                                                    '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeLong" tti="' + tti + '" onchange="DisplayLowestScoreSubTestCuttingNarrativeLong(this)" />' +
                                                                    '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti +'" name="LowestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                                                                '</div>' +
                                                            '</li>' +
                                                            '<li id="HasIQNarrative' + tti +'" style="border: outset; width:50%; display:block" data-type="iq">[[IQ Narratives]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusIQNarrative' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusIQNarrative" onchange="DisplayStatusIQNarrative(this)" />Display' +
                                                                '</span>' +
                                                            '</li>' +
                                                            '<li id="HasValidityScaleNarrative' + tti +'" style="border: outset; width:50%; display:block" data-type="vs">[[Validity Scale Narratives]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusValidityScaleNarrative' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusValidityScaleNarrative" onchange="DisplayStatusValidityScaleNarrative(this)" />Display' +
                                                                '</span>' +
                                                            '</li>' +
                                                            '<li id="HasGroupNarrative' + tti +'" style="border: outset; width:50%; display:block" data-type="group">[[Group Narratives]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusGroupNarrative' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusGroupNarrative" onchange="DisplayStatusGroupNarrative(this)" />Display' +
                                                                '</span>' +
                                                            '</li>' +
                                                        '</ul>' +
                                                    '</li>' +
                                                '</ul>' +
                                                '<span style="float:right">' +
                                                    '<input type="checkbox" id="DisplayStatusNarrativesGroupNarratives' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusNarrativesGroupNarratives" onchange="DisplayStatusNarrativesGroupNarratives(this)" />Display' +
                                                '</span>' +
                                            '</div>' +
                                        '</div>'
                                    )

                                    viewModel.set('IsHighestScoreSubTestNarrative' + tti, false)
                                    viewModel.set('IsLowestScoreSubTestNarrative' + tti, false)
                                    viewModel.set('IsHighestScoreSubTestNarrativeShort' + tti, false)
                                    viewModel.set('IsLowestScoreSubTestNarrativeShort' + tti, false)
                                    viewModel.set('IsHighestScoreSubTestNarrativeLong' + tti, false)
                                    viewModel.set('IsLowestScoreSubTestNarrativeLong' + tti, false)
                                    viewModel.set('IsHighestScoreSubTestCuttingNarrative' + tti, false)
                                    viewModel.set('IsLowestScoreSubTestCuttingNarrative' + tti, false)
                                    viewModel.set('IsHighestScoreSubTestCuttingNarrativeShort' + tti, false)
                                    viewModel.set('IsLowestScoreSubTestCuttingNarrativeShort' + tti, false)
                                    viewModel.set('IsHighestScoreSubTestCuttingNarrativeLong' + tti, false)
                                    viewModel.set('IsLowestScoreSubTestCuttingNarrativeLong' + tti, false)

                                    viewModel.set('IsAllNarrativeSubTestNarrative' + tti, true)
                                    viewModel.set('IsAllNarrativeSubTestNarrativeShort' + tti, true)
                                    viewModel.set('IsAllNarrativeSubTestNarrativeLong' + tti, true)
                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrative' + tti, true)
                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort' + tti, true)
                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong' + tti, true)
                                    viewModel.set('DisplayStatusNarrativesGroupNarratives' + tti, true)

                                    $('#HighestScoreTotalDisplaySubTestNarrative' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestNarrative' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#HighestScoreTotalDisplaySubTestNarrativeShort' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestNarrativeShort' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#HighestScoreTotalDisplaySubTestNarrativeLong' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestNarrativeLong' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });

                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrative' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrative' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });

                                    $("#panelbarNarrativesGroupNarratives" + tti + "").kendoPanelBar();
                                    var panelbarNarrativesGroupNarratives = $("#panelbarNarrativesGroupNarratives" + tti + "").data("kendoPanelBar");
                                    panelbarNarrativesGroupNarratives.expand($("#NarrativesGroupNarratives"));

                                    //NARRATIVES & GROUP NARRATIVES
                                    ////SUBTEST NARRATIVE
                                    var HasSubTestNarrative = response.Layout.HasSubTestNarrative;
                                    viewModel.set('HasSubTestNarrative' + tti, HasSubTestNarrative);
                                    if (HasSubTestNarrative == true) {
                                        if (response.Layout.IsSubTestNarrativeShort == true) {
                                            viewModel.set('HasSubTestNarrativeShort' + tti, true);
                                            viewModel.set('DisplayStatusSubTestNarrativeShort' + tti, true)
                                            $('#IsSubTestNarrativeShort' + tti).show()
                                            $('#AllNarrativesSubTestNarrativeShort' + tti).show()
                                            viewModel.set('DisplayStatusSubTestNarrative' + tti, false)
                                            $('#HasSubTestNarrative' + tti).hide()
                                            $('#AllNarrativesSubTestNarrative' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestNarrativeLong' + tti, false)
                                            $('#IsSubTestNarrativeLong' + tti).hide()
                                            $('#AllNarrativesSubTestNarrativeLong' + tti).hide()
                                        } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                            viewModel.set('HasSubTestNarrativeLong' + tti, true);
                                            viewModel.set('DisplayStatusSubTestNarrativeLong' + tti, true)
                                            $('#IsSubTestNarrativeLong' + tti).show()
                                            $('#AllNarrativesSubTestNarrativeLong' + tti).show()
                                            viewModel.set('DisplayStatusSubTestNarrative' + tti, false)
                                            $('#HasSubTestNarrative' + tti).hide()
                                            $('#AllNarrativesSubTestNarrative' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestNarrativeShort' + tti, false)
                                            $('#IsSubTestNarrativeShort' + tti).hide()
                                            $('#AllNarrativesSubTestNarrativeShort' + tti).hide()
                                        }
                                    } else {
                                        viewModel.set('DisplayStatusSubTestNarrative' + tti, false)
                                        $('#HasSubTestNarrative' + tti).hide()
                                        $('#AllNarrativesSubTestNarrative' + tti).hide()
                                        viewModel.set('DisplayStatusSubTestNarrativeShort' + tti, false)
                                        $('#IsSubTestNarrativeShort' + tti).hide()
                                        $('#AllNarrativesSubTestNarrativeShort' + tti).hide()
                                        viewModel.set('DisplayStatusSubTestNarrativeLong' + tti, false)
                                        $('#IsSubTestNarrativeLong' + tti).hide()
                                        $('#AllNarrativesSubTestNarrativeLong' + tti).hide()
                                    }
                                    ////SUBTEST CUTTING NARRATIVE
                                    var HasSubTestCuttingNarrative = response.Layout.HasSubTestCuttingNarrative;
                                    viewModel.set('HasSubTestCuttingNarrative' + tti, HasSubTestCuttingNarrative);
                                    if (HasSubTestCuttingNarrative == true) {
                                        if (response.Layout.IsSubTestNarrativeShort == true) {
                                            viewModel.set('HasSubTestCuttingNarrativeShort' + tti, true);
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeShort' + tti, true)
                                            $('#IsSubTestCuttingNarrativeShort' + tti).show()
                                            $('#AllNarrativesSubTestCuttingNarrativeShort' + tti).show()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrative' + tti, false)
                                            $('#HasSubTestCuttingNarrative' + tti).hide()
                                            $('#AllNarrativesSubTestCuttingNarrative' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeLong' + tti, false)
                                            $('#IsSubTestCuttingNarrativeLong' + tti).hide()
                                            $('#AllNarrativesSubTestCuttingNarrativeLong' + tti).hide()
                                        } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                            viewModel.set('HasSubTestCuttingNarrativeLong' + tti, true);
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeLong' + tti, true)
                                            $('#IsSubTestCuttingNarrativeLong' + tti).show()
                                            $('#AllNarrativesSubTestCuttingNarrativeLong' + tti).show()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrative' + tti, false)
                                            $('#HasSubTestCuttingNarrative' + tti).hide()
                                            $('#AllNarrativesSubTestCuttingNarrative' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeShort' + tti, false)
                                            $('#IsSubTestCuttingNarrativeShort' + tti).hide()
                                            $('#AllNarrativesSubTestCuttingNarrativeShort' + tti).hide()
                                        }
                                    } else {
                                        viewModel.set('DisplayStatusSubTestCuttingNarrative' + tti, false)
                                        $('#HasSubTestCuttingNarrative' + tti).hide()
                                        $('#AllNarrativesSubTestCuttingNarrative' + tti).hide()
                                        viewModel.set('DisplayStatusSubTestCuttingNarrativeShort' + tti, false)
                                        $('#IsSubTestCuttingNarrativeShort' + tti).hide()
                                        $('#AllNarrativesSubTestCuttingNarrativeShort' + tti).hide()
                                        viewModel.set('DisplayStatusSubTestCuttingNarrativeLong' + tti, false)
                                        $('#IsSubTestCuttingNarrativeLong' + tti).hide()
                                        $('#AllNarrativesSubTestCuttingNarrativeLong' + tti).hide()
                                    }
                                    ////IQ NARRATIVE
                                    var HasIQNarrative = response.Layout.HasIQNarrative;
                                    viewModel.set('HasIQNarrative' + tti, HasIQNarrative);
                                    if (HasIQNarrative == true) {                               //PERSONALITY > TIDAK ADA IQ NARRATIVE
                                        viewModel.set('DisplayStatusIQNarrative' + tti, false)
                                        $('#HasIQNarrative' + tti).hide()
                                    } else {
                                        viewModel.set('DisplayStatusIQNarrative' + tti, false)
                                        $('#HasIQNarrative' + tti).hide()
                                    }
                                    ////VALIDITY SCALE NARRATIVE
                                    var HasValidityScaleNarrative = response.Layout.HasValidityScaleNarrative;
                                    viewModel.set('HasValidityScaleNarrative' + tti, HasValidityScaleNarrative);
                                    if (HasValidityScaleNarrative == true) {
                                        viewModel.set('DisplayStatusValidityScaleNarrative' + tti, true)
                                        $('#HasValidityScaleNarrative' + tti).show()
                                    } else {
                                        viewModel.set('DisplayStatusValidityScaleNarrative' + tti, false)
                                        $('#HasValidityScaleNarrative' + tti).hide()
                                    }
                                    ////GROUP NARRATIVE
                                    var HasGroupNarrative = response.Layout.HasGroupNarrative;
                                    viewModel.set('HasGroupNarrative' + tti, HasGroupNarrative);
                                    if (HasGroupNarrative == true) {
                                        viewModel.set('DisplayStatusGroupNarrative' + tti, true)
                                        $('#HasGroupNarrative' + tti).show()
                                    } else {
                                        viewModel.set('DisplayStatusGroupNarrative' + tti, false)
                                        $('#HasGroupNarrative' + tti).hide()
                                    }

                                    $('.draggable').sortable({
                                        connectWith: '.draggable',
                                        //revert: true
                                    });
                                    $('.draggable li').draggable({
                                        connectToSortable: '.draggable',
                                        revert: 'invalid'
                                    });
                                    $('ul, li').disableSelection();
                                }
                                else {
                                    // Psychogram Ability => IsByTest false
                                    viewModel.set('HasPsychogramAbility', true)
                                    viewModel.set('DisplayStatusPsychogramAbility', true)
                                    //$('#panelbarPsychogramAbility').show()
                                    $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramAbility').length == 0 ?
                                        $('#contentBox > ul.form-content li#contentLayout').append(
                                            '<div id="panelbarPsychogramAbility">' +
                                                '<div id="PsychogramAbility">Psychogram Ability' +
                                                    '<ul class="form-content">'+
                                                        '<li style="padding-top:2%; padding-bottom:2%">'+
                                                            '<label>Title<span class="mandatory">*</span></label>'+
                                                            '<input id="TitlePsychogramAbility" name="TitlePsychogramAbility" style="width:50%" data-bind="value: TitlePsychogramAbility" />'+
                                                        '</li>'+
                                                    '</ul>'+
                                                    '<span style="float:right">'+
                                                        '<input type="checkbox" id="DisplayStatusPsychogramAbility" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusPsychogramAbility" onchange="DisplayStatusPsychogramAbility(this)" />Display'+
                                                    '</span>'+
                                                '</div>'+
                                            '</div>'
                                        ) : null

                                    $("#panelbarPsychogramAbility").kendoPanelBar();
                                    var panelbarPsychogramAbility = $("#panelbarPsychogramAbility").data("kendoPanelBar");
                                    panelbarPsychogramAbility.expand($("#PsychogramAbility"));

                                    $('#contentBox > ul.form-content li#contentLayout').append(
                                        '<div id="panelbarNarrativesGroupNarratives' + tti +'" style="width: 96.5%;">' +
                                        '<div id="NarrativesGroupNarratives' + tti +'">Narratives & Group Narratives' +
                                                '<ul class="form-content">' +
                                                    '<li style="padding-top:2%;padding-bottom:2%">' +
                                                        '<label>Title<span class="mandatory">*</span></label>' +
                                                        '<input id="TitleNarrativesGroupNarratives' + tti +'" name="TitleNarrativesGroupNarratives" style="width:50%" data-bind="value:TitleNarrativesGroupNarratives" />' +
                                                    '</li>' +
                                                    '<li id="listNarratives' + tti +'" style="padding-top:2%;padding-bottom:2%">' +
                                                        '<ul class="draggable">' +
                                                            '<li id="HasSubTestNarrative' + tti +'" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusSubTestNarrative' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrative" onchange="Display(this)"/>Display' +
                                                                '</span>' +
                                                                '<div id="AllNarrativesSubTestNarrative' + tti +'">All Narratives' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestNarrative' + tti + '" id="IsAllNarrativeSubTestNarrative' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrative" tti="' + tti + '" onclick="AllNarrativeSubTestNarrative(this)"/>' +
                                                                    '<span> Yes</span>' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestNarrative' + tti + '" id="IsNotAllNarrativeSubTestNarrative' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestNarrative" tti="' + tti + '" onclick="NotAllNarrativeSubTestNarrative(this)"/>' +
                                                                    '<span> No</span>' +
                                                                '</div>' +
                                                                '<div id="HighestScoreSubTestNarrative' + tti +'" hidden="hidden">Highest Score' +
                                                                    '<input type="checkbox" id="IsHighestScoreSubTestNarrative' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrative" tti="' + tti + '" onchange="DisplayHighestScoreSubTestNarrative(this)" />' +
                                                                    '<input id="HighestScoreTotalDisplaySubTestNarrative' + tti +'" name="HighestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                                                                '</div>' +
                                                                '<div id="LowestScoreSubTestNarrative' + tti +'" hidden="hidden">Lowest Score' +
                                                                    '<input type="checkbox" id="IsLowestScoreSubTestNarrative' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrative" tti="' + tti + '" onchange="DisplayLowestScoreSubTestNarrative(this)" />' +
                                                                    '<input id="LowestScoreTotalDisplaySubTestNarrative' + tti +'" name="LowestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                                                                '</div>' +
                                                            '</li>' +
                                                            '<li id="IsSubTestNarrativeShort' + tti +'" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Short]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusSubTestNarrativeShort' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeShort" onchange="DisplayStatusSubTestNarrativeShort(this)" />Display' +
                                                                '</span>' +
                                                                '<div id="AllNarrativesSubTestNarrativeShort' + tti +'">All Narratives' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort' + tti + '" id="IsAllNarrativeSubTestNarrativeShort' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeShort" tti="' + tti + '" onclick="AllNarrativeSubTestNarrativeShort(this)"/>' +
                                                                    '<span> Yes</span>' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort' + tti + '" id="IsNotAllNarrativeSubTestNarrativeShort' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestNarrativeShort" tti="' + tti + '" onclick="NotAllNarrativeSubTestNarrativeShort(this)"/>' +
                                                                    '<span> No</span>' +
                                                                '</div>' +
                                                                '<div id="HighestScoreSubTestNarrativeShort' + tti +'" hidden="hidden">Highest Score' +
                                                                    '<input type="checkbox" id="IsHighestScoreSubTestNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeShort" tti="' + tti + '" onchange="DisplayHighestScoreSubTestNarrativeShort(this)" />' +
                                                                    '<input id="HighestScoreTotalDisplaySubTestNarrativeShort' + tti +'" name="HighestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                                                                '</div>' +
                                                                '<div id="LowestScoreSubTestNarrativeShort' + tti +'" hidden="hidden">Lowest Score' +
                                                                    '<input type="checkbox" id="IsLowestScoreSubTestNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeShort" tti="' + tti + '" onchange="DisplayLowestScoreSubTestNarrativeShort(this)" />' +
                                                                    '<input id="LowestScoreTotalDisplaySubTestNarrativeShort' + tti +'" name="LowestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                                                                '</div>' +
                                                            '</li >' +
                                                            '<li id="IsSubTestNarrativeLong' + tti +'" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Long]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusSubTestNarrativeLong' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeLong" onchange="DisplayStatusSubTestNarrativeLong(this)" />Display' +
                                                                '</span>' +
                                                                '<div id="AllNarrativesSubTestNarrativeLong' + tti +'">All Narratives' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong' + tti + '" id="IsAllNarrativeSubTestNarrativeLong' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeLong" tti="' + tti + '" onclick="AllNarrativeSubTestNarrativeLong(this)"/>' +
                                                                    '<span> Yes</span>' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong' + tti + '" id="IsNotAllNarrativeSubTestNarrativeLong' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestNarrativeLong" tti="' + tti + '" onclick="NotAllNarrativeSubTestNarrativeLong(this)"/>' +
                                                                    '<span> No</span>' +
                                                                '</div>' +
                                                                '<div id="HighestScoreSubTestNarrativeLong' + tti +'" hidden="hidden">Highest Score' +
                                                                    '<input type="checkbox" id="IsHighestScoreSubTestNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeLong" tti="' + tti + '" onchange="DisplayHighestScoreSubTestNarrativeLong(this)" />' +
                                                                    '<input id="HighestScoreTotalDisplaySubTestNarrativeLong' + tti +'" name="HighestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                                                                '</div>' +
                                                                '<div id="LowestScoreSubTestNarrativeLong' + tti +'" hidden="hidden">Lowest Score' +
                                                                    '<input type="checkbox" id="IsLowestScoreSubTestNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeLong" tti="' + tti + '" onchange="DisplayLowestScoreSubTestNarrativeLong(this)" />' +
                                                                    '<input id="LowestScoreTotalDisplaySubTestNarrativeLong' + tti +'" name="LowestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                                                                '</div>' +
                                                            '</li >' +
                                                            '<li id="HasSubTestCuttingNarrative' + tti +'" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrative' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrative" onchange="DisplayStatusSubTestCuttingNarrative(this)" />Display' +
                                                                '</span>' +
                                                                '<div id="AllNarrativesSubTestCuttingNarrative' + tti +'">All Narratives' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative' + tti + '" id="IsAllNarrativeSubTestCuttingNarrative' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrative" tti="' + tti + '" onclick="AllNarrativeSubTestCuttingNarrative(this)"/>' +
                                                                    '<span> Yes</span>' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative' + tti + '" id="IsNotAllNarrativeSubTestCuttingNarrative' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrative" tti="' + tti + '" onclick="NotAllNarrativeSubTestCuttingNarrative(this)"/>' +
                                                                    '<span> No</span>' +
                                                                '</div>' +
                                                                '<div id="HighestScoreSubTestCuttingNarrative' + tti +'" hidden="hidden">Highest Score' +
                                                                    '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrative' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrative" tti="' + tti + '" onchange="DisplayHighestScoreSubTestCuttingNarrative(this)" />' +
                                                                    '<input id="HighestScoreTotalDisplaySubTestCuttingNarrative' + tti +'" name="HighestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                                                                '</div>' +
                                                                '<div id="LowestScoreSubTestCuttingNarrative' + tti +'" hidden="hidden">Lowest Score' +
                                                                    '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrative' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrative" tti="' + tti + '" onchange="DisplayLowestScoreSubTestCuttingNarrative(this)" />' +
                                                                    '<input id="LowestScoreTotalDisplaySubTestCuttingNarrative' + tti +'" name="LowestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                                                                '</div>' +
                                                            '</li >' +
                                                            '<li id="IsSubTestCuttingNarrativeShort' + tti +'" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Short]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeShort' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeShort" onchange="DisplayStatusSubTestCuttingNarrativeShort(this)" />Display' +
                                                                '</span>' +
                                                                '<div id="AllNarrativesSubTestCuttingNarrativeShort' + tti +'">All Narratives' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort' + tti + '" id="IsAllNarrativeSubTestCuttingNarrativeShort' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeShort" tti="' + tti + '" onclick="AllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                                                                    '<span> Yes</span>' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort' + tti + '" id="IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeShort" tti="' + tti + '" onclick="NotAllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                                                                    '<span> No</span>' +
                                                                '</div>' +
                                                                '<div id="HighestScoreSubTestCuttingNarrativeShort' + tti +'" hidden="hidden">Highest Score' +
                                                                    '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeShort" tti="' + tti + '" onchange="DisplayHighestScoreSubTestCuttingNarrativeShort(this)" />' +
                                                                    '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti +'" name="HighestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                                                                '</div>' +
                                                                '<div id="LowestScoreSubTestCuttingNarrativeShort' + tti +'" hidden="hidden">Lowest Score' +
                                                                    '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeShort' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeShort" tti="' + tti + '" onchange="DisplayLowestScoreSubTestCuttingNarrativeShort(this)" />' +
                                                                    '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti +'" name="LowestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                                                                '</div>' +
                                                            '</li>' +
                                                            '<li id="IsSubTestCuttingNarrativeLong' + tti +'" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Long]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeLong' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeLong" onchange="DisplayStatusSubTestCuttingNarrativeLong(this)" />Display' +
                                                                '</span>' +
                                                                '<div id="AllNarrativesSubTestCuttingNarrativeLong' + tti +'">All Narratives' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong' + tti + '" id="IsAllNarrativeSubTestCuttingNarrativeLong' + tti + '" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeLong" tti="' + tti + '" onclick="AllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                                                                    '<span> Yes</span>' +
                                                                    '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong' + tti + '" id="IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti + '" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeLong" tti="' + tti + '" onclick="NotAllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                                                                    '<span> No</span>' +
                                                                '</div>' +
                                                                '<div id="HighestScoreSubTestCuttingNarrativeLong' + tti +'" hidden="hidden">Highest Score' +
                                                                    '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeLong" tti="' + tti + '" onchange="DisplayHighestScoreSubTestCuttingNarrativeLong(this)" />' +
                                                                    '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti +'" name="HighestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                                                                '</div>' +
                                                                '<div id="LowestScoreSubTestCuttingNarrativeLong' + tti +'" hidden="hidden">Lowest Score' +
                                                                    '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeLong' + tti + '" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeLong" tti="' + tti + '" onchange="DisplayLowestScoreSubTestCuttingNarrativeLong(this)" />' +
                                                                    '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti +'" name="LowestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                                                                '</div>' +
                                                            '</li>' +
                                                            '<li id="HasIQNarrative' + tti +'" style="border: outset; width:50%; display:block" data-type="iq">[[IQ Narratives]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusIQNarrative' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusIQNarrative" onchange="DisplayStatusIQNarrative(this)" />Display' +
                                                                '</span>' +
                                                            '</li>' +
                                                            '<li id="HasValidityScaleNarrative' + tti +'" style="border: outset; width:50%; display:block" data-type="vs">[[Validity Scale Narratives]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusValidityScaleNarrative' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusValidityScaleNarrative" onchange="DisplayStatusValidityScaleNarrative(this)" />Display' +
                                                                '</span>' +
                                                            '</li>' +
                                                            '<li id="HasGroupNarrative' + tti +'" style="border: outset; width:50%; display:block" data-type="group">[[Group Narratives]]' +
                                                                '<span style="float:right">' +
                                                                    '<input type="checkbox" id="DisplayStatusGroupNarrative' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusGroupNarrative" onchange="DisplayStatusGroupNarrative(this)" />Display' +
                                                                '</span>' +
                                                            '</li>' +
                                                        '</ul>' +
                                                    '</li>' +
                                                '</ul>' +
                                                '<span style="float:right">' +
                                                    '<input type="checkbox" id="DisplayStatusNarrativesGroupNarratives' + tti +'" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusNarrativesGroupNarratives" onchange="DisplayStatusNarrativesGroupNarratives(this)" />Display' +
                                                '</span>' +
                                            '</div>' +
                                        '</div>'
                                    )

                                    viewModel.set('IsHighestScoreSubTestNarrative' + tti, false)
                                    viewModel.set('IsLowestScoreSubTestNarrative' + tti, false)
                                    viewModel.set('IsHighestScoreSubTestNarrativeShort' + tti, false)
                                    viewModel.set('IsLowestScoreSubTestNarrativeShort' + tti, false)
                                    viewModel.set('IsHighestScoreSubTestNarrativeLong' + tti, false)
                                    viewModel.set('IsLowestScoreSubTestNarrativeLong' + tti, false)
                                    viewModel.set('IsHighestScoreSubTestCuttingNarrative' + tti, false)
                                    viewModel.set('IsLowestScoreSubTestCuttingNarrative' + tti, false)
                                    viewModel.set('IsHighestScoreSubTestCuttingNarrativeShort' + tti, false)
                                    viewModel.set('IsLowestScoreSubTestCuttingNarrativeShort' + tti, false)
                                    viewModel.set('IsHighestScoreSubTestCuttingNarrativeLong' + tti, false)
                                    viewModel.set('IsLowestScoreSubTestCuttingNarrativeLong' + tti, false)

                                    viewModel.set('IsAllNarrativeSubTestNarrative' + tti, true)
                                    viewModel.set('IsAllNarrativeSubTestNarrativeShort' + tti, true)
                                    viewModel.set('IsAllNarrativeSubTestNarrativeLong' + tti, true)
                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrative' + tti, true)
                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort' + tti, true)
                                    viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong' + tti, true)
                                    viewModel.set('DisplayStatusNarrativesGroupNarratives' + tti, true)

                                    $('#HighestScoreTotalDisplaySubTestNarrative' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestNarrative' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#HighestScoreTotalDisplaySubTestNarrativeShort' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestNarrativeShort' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#HighestScoreTotalDisplaySubTestNarrativeLong' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestNarrativeLong' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });

                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrative' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrative' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });
                                    $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong' + tti).keypress(function (e) {
                                        if (e.which == 46 || e.which == 44) {
                                            return false;
                                        }
                                    });

                                    $("#panelbarNarrativesGroupNarratives" + tti + "").kendoPanelBar();
                                    var panelbarNarrativesGroupNarratives = $("#panelbarNarrativesGroupNarratives" + tti +"").data("kendoPanelBar");
                                    panelbarNarrativesGroupNarratives.expand($("#NarrativesGroupNarratives"));

                                    //NARRATIVES & GROUP NARRATIVES
                                    ////SUBTEST NARRATIVE
                                    var HasSubTestNarrative = response.Layout.HasSubTestNarrative;
                                    viewModel.set('HasSubTestNarrative' + tti, HasSubTestNarrative);
                                    if (HasSubTestNarrative == true) {
                                        if (response.Layout.IsSubTestNarrativeShort == true) {
                                            viewModel.set('HasSubTestNarrativeShort' + tti, true);
                                            viewModel.set('DisplayStatusSubTestNarrativeShort' + tti, true)
                                            $('#IsSubTestNarrativeShort' + tti).show()
                                            $('#AllNarrativesSubTestNarrativeShort' + tti).show()
                                            viewModel.set('DisplayStatusSubTestNarrative' + tti, false)
                                            $('#HasSubTestNarrative' + tti).hide()
                                            $('#AllNarrativesSubTestNarrative' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestNarrativeLong' + tti, false)
                                            $('#IsSubTestNarrativeLong' + tti).hide()
                                            $('#AllNarrativesSubTestNarrativeLong' + tti).hide()
                                        } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                            viewModel.set('HasSubTestNarrativeLong' + tti, true);
                                            viewModel.set('DisplayStatusSubTestNarrativeLong' + tti, true)
                                            $('#IsSubTestNarrativeLong' + tti).show()
                                            $('#AllNarrativesSubTestNarrativeLong' + tti).show()
                                            viewModel.set('DisplayStatusSubTestNarrative' + tti, false)
                                            $('#HasSubTestNarrative' + tti).hide()
                                            $('#AllNarrativesSubTestNarrative' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestNarrativeShort' + tti, false)
                                            $('#IsSubTestNarrativeShort' + tti).hide()
                                            $('#AllNarrativesSubTestNarrativeShort' + tti).hide()
                                        }
                                    } else {
                                        viewModel.set('DisplayStatusSubTestNarrative' + tti, false)
                                        $('#HasSubTestNarrative' + tti).hide()
                                        $('#AllNarrativesSubTestNarrative' + tti).hide()
                                        viewModel.set('DisplayStatusSubTestNarrativeShort' + tti, false)
                                        $('#IsSubTestNarrativeShort' + tti).hide()
                                        $('#AllNarrativesSubTestNarrativeShort' + tti).hide()
                                        viewModel.set('DisplayStatusSubTestNarrativeLong' + tti, false)
                                        $('#IsSubTestNarrativeLong' + tti).hide()
                                        $('#AllNarrativesSubTestNarrativeLong' + tti).hide()
                                    }
                                    ////SUBTEST CUTTING NARRATIVE
                                    var HasSubTestCuttingNarrative = response.Layout.HasSubTestCuttingNarrative;
                                    viewModel.set('HasSubTestCuttingNarrative' + tti, HasSubTestCuttingNarrative);
                                    if (HasSubTestCuttingNarrative == true) {
                                        if (response.Layout.IsSubTestNarrativeShort == true) {
                                            viewModel.set('HasSubTestCuttingNarrativeShort' + tti, true);
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeShort' + tti, true)
                                            $('#IsSubTestCuttingNarrativeShort' + tti).show()
                                            $('#AllNarrativesSubTestCuttingNarrativeShort' + tti).show()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrative' + tti, false)
                                            $('#HasSubTestCuttingNarrative' + tti).hide()
                                            $('#AllNarrativesSubTestCuttingNarrative' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeLong' + tti, false)
                                            $('#IsSubTestCuttingNarrativeLong' + tti).hide()
                                            $('#AllNarrativesSubTestCuttingNarrativeLong' + tti).hide()
                                        } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                            viewModel.set('HasSubTestCuttingNarrativeLong' + tti, true);
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeLong' + tti, true)
                                            $('#IsSubTestCuttingNarrativeLong' + tti).show()
                                            $('#AllNarrativesSubTestCuttingNarrativeLong' + tti).show()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrative' + tti, false)
                                            $('#HasSubTestCuttingNarrative' + tti).hide()
                                            $('#AllNarrativesSubTestCuttingNarrative' + tti).hide()
                                            viewModel.set('DisplayStatusSubTestCuttingNarrativeShort' + tti, false)
                                            $('#IsSubTestCuttingNarrativeShort' + tti).hide()
                                            $('#AllNarrativesSubTestCuttingNarrativeShort' + tti).hide()
                                        }
                                    } else {
                                        viewModel.set('DisplayStatusSubTestCuttingNarrative' + tti, false)
                                        $('#HasSubTestCuttingNarrative' + tti).hide()
                                        $('#AllNarrativesSubTestCuttingNarrative' + tti).hide()
                                        viewModel.set('DisplayStatusSubTestCuttingNarrativeShort' + tti, false)
                                        $('#IsSubTestCuttingNarrativeShort' + tti).hide()
                                        $('#AllNarrativesSubTestCuttingNarrativeShort' + tti).hide()
                                        viewModel.set('DisplayStatusSubTestCuttingNarrativeLong' + tti, false)
                                        $('#IsSubTestCuttingNarrativeLong' + tti).hide()
                                        $('#AllNarrativesSubTestCuttingNarrativeLong' + tti).hide()
                                    }
                                    ////IQ NARRATIVE
                                    var HasIQNarrative = response.Layout.HasIQNarrative;
                                    viewModel.set('HasIQNarrative' + tti, HasIQNarrative);
                                    if (HasIQNarrative == true) {
                                        viewModel.set('DisplayStatusIQNarrative' + tti, true)
                                        $('#HasIQNarrative' + tti).show()
                                    } else {
                                        viewModel.set('DisplayStatusIQNarrative' + tti, false)
                                        $('#HasIQNarrative' + tti).hide()
                                    }
                                    ////VALIDITY SCALE NARRATIVE
                                    var HasValidityScaleNarrative = response.Layout.HasValidityScaleNarrative;
                                    viewModel.set('HasValidityScaleNarrative' + tti, HasValidityScaleNarrative);
                                    if (HasValidityScaleNarrative == true) {                                //ABILITY > TIDAK ADA VALIDITY SCALE
                                        viewModel.set('DisplayStatusValidityScaleNarrative' + tti, false)
                                        $('#HasValidityScaleNarrative' + tti).hide()
                                    } else {
                                        viewModel.set('DisplayStatusValidityScaleNarrative' + tti, false)
                                        $('#HasValidityScaleNarrative' + tti).hide()
                                    }
                                    ////GROUP NARRATIVE
                                    var HasGroupNarrative = response.Layout.HasGroupNarrative;
                                    viewModel.set('HasGroupNarrative' + tti, HasGroupNarrative);
                                    if (HasGroupNarrative == true) {
                                        viewModel.set('DisplayStatusGroupNarrative' + tti, true)
                                        $('#HasGroupNarrative' + tti).show()
                                    } else {
                                        viewModel.set('DisplayStatusGroupNarrative' + tti, false)
                                        $('#HasGroupNarrative' + tti).hide()
                                    }

                                    $('.draggable').sortable({
                                        connectWith: '.draggable',
                                        //revert: true
                                    });
                                    $('.draggable li').draggable({
                                        connectToSortable: '.draggable',
                                        revert: 'invalid'
                                    });
                                    $('ul, li').disableSelection();
                                }
                            }
                        }
                        
                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarStrengthArea').length == 0 ?
                            null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarStrengthArea').remove()

                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarDevelopmentArea').length == 0 ?
                            null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarDevelopmentArea').remove()
                    }
                    else {
                        //PSYCHOGRAM AJA
                        viewModel.set('IsProfiling', false);
                        viewModel.set('DisplayStatusPsychogram', true)
                        $('#panelbarPsychogram').show()
                        viewModel.set('DisplayStatusPsychogramAbility', false)
                        $('#panelbarPsychogramAbility').hide()
                        viewModel.set('DisplayStatusPsychogramPersonality', false)
                        $('#panelbarPsychogramPersonality').hide()

                        for (tti = 0; tti <= response.TestToolInfos.length; tti++) {
                            $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives' + tti + '').length == 0 ?
                                null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives' + tti + '').remove()
                        }

                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramAbility').length == 0 ?
                            null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramAbility').remove()

                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramPersonality').length == 0 ?
                            null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarPsychogramPersonality').remove()

                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarNarrativesGroupNarratives').length == 0 ?
                            $('#contentBox > ul.form-content li#contentLayout').append(
                            '<div id="panelbarNarrativesGroupNarratives" style="width: 96.5%;">' +
                            '<div id="NarrativesGroupNarratives">Narratives & Group Narratives' +
                            '<ul class="form-content">' +
                            '<li style="padding-top:2%;padding-bottom:2%">' +
                            '<label>Title<span class="mandatory">*</span></label>' +
                            '<input id="TitleNarrativesGroupNarratives" name="TitleNarrativesGroupNarratives" style="width:50%" data-bind="value:TitleNarrativesGroupNarratives" />' +
                            '</li>' +
                            '<li id="listNarratives" style="padding-top:2%;padding-bottom:2%">' +
                            '<ul class="draggable">' +
                            '<li id="HasSubTestNarrative" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives]]' +
                            '<span style="float:right">' +
                            '<input type="checkbox" id="DisplayStatusSubTestNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrative" onchange="Display(this)"/>Display' +
                            '</span>' +
                            '<div id="AllNarrativesSubTestNarrative">All Narratives' +
                            '<input type="radio" name="IsAllNarrativeSubTestNarrative" id="IsAllNarrativeSubTestNarrative" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrative" onclick="AllNarrativeSubTestNarrative(this)"/>' +
                            '<span> Yes</span>' +
                            '<input type="radio" name="IsAllNarrativeSubTestNarrative" id="IsNotAllNarrativeSubTestNarrative" data-bind="checked: IsNotAllNarrativeSubTestNarrative" onclick="NotAllNarrativeSubTestNarrative(this)"/>' +
                            '<span> No</span>' +
                            '</div>' +
                            '<div id="HighestScoreSubTestNarrative" hidden="hidden">Highest Score' +
                            '<input type="checkbox" id="IsHighestScoreSubTestNarrative" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrative" onchange="DisplayHighestScoreSubTestNarrative(this)" />' +
                            '<input id="HighestScoreTotalDisplaySubTestNarrative" name="HighestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                            '</div>' +
                            '<div id="LowestScoreSubTestNarrative" hidden="hidden">Lowest Score' +
                            '<input type="checkbox" id="IsLowestScoreSubTestNarrative" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrative" onchange="DisplayLowestScoreSubTestNarrative(this)" />' +
                            '<input id="LowestScoreTotalDisplaySubTestNarrative" name="LowestScoreTotalDisplaySubTestNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrative" />Sub Test' +
                            '</div>' +
                            '</li>' +
                            '<li id="IsSubTestNarrativeShort" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Short]]' +
                            '<span style="float:right">' +
                            '<input type="checkbox" id="DisplayStatusSubTestNarrativeShort" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeShort" onchange="DisplayStatusSubTestNarrativeShort(this)" />Display' +
                            '</span>' +
                            '<div id="AllNarrativesSubTestNarrativeShort">All Narratives' +
                            '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort" id="IsAllNarrativeSubTestNarrativeShort" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeShort" onclick="AllNarrativeSubTestNarrativeShort(this)"/>' +
                            '<span> Yes</span>' +
                            '<input type="radio" name="IsAllNarrativeSubTestNarrativeShort" id="IsNotAllNarrativeSubTestNarrativeShort" data-bind="checked: IsNotAllNarrativeSubTestNarrativeShort" onclick="NotAllNarrativeSubTestNarrativeShort(this)"/>' +
                            '<span> No</span>' +
                            '</div>' +
                            '<div id="HighestScoreSubTestNarrativeShort" hidden="hidden">Highest Score' +
                            '<input type="checkbox" id="IsHighestScoreSubTestNarrativeShort" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeShort" onchange="DisplayHighestScoreSubTestNarrativeShort(this)" />' +
                            '<input id="HighestScoreTotalDisplaySubTestNarrativeShort" name="HighestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                            '</div>' +
                            '<div id="LowestScoreSubTestNarrativeShort" hidden="hidden">Lowest Score' +
                            '<input type="checkbox" id="IsLowestScoreSubTestNarrativeShort" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeShort" onchange="DisplayLowestScoreSubTestNarrativeShort(this)" />' +
                            '<input id="LowestScoreTotalDisplaySubTestNarrativeShort" name="LowestScoreTotalDisplaySubTestNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeShort" />Sub Test' +
                            '</div>' +
                            '</li >' +
                            '<li id="IsSubTestNarrativeLong" style="border: outset; width:50%; display:block" data-type="subtest">[[Displayed Sub Test Narratives - Long]]' +
                            '<span style="float:right">' +
                            '<input type="checkbox" id="DisplayStatusSubTestNarrativeLong" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestNarrativeLong" onchange="DisplayStatusSubTestNarrativeLong(this)" />Display' +
                            '</span>' +
                            '<div id="AllNarrativesSubTestNarrativeLong">All Narratives' +
                            '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong" id="IsAllNarrativeSubTestNarrativeLong" checked="checked" data-bind="checked: IsAllNarrativeSubTestNarrativeLong" onclick="AllNarrativeSubTestNarrativeLong(this)"/>' +
                            '<span> Yes</span>' +
                            '<input type="radio" name="IsAllNarrativeSubTestNarrativeLong" id="IsNotAllNarrativeSubTestNarrativeLong" data-bind="checked: IsNotAllNarrativeSubTestNarrativeLong" onclick="NotAllNarrativeSubTestNarrativeLong(this)"/>' +
                            '<span> No</span>' +
                            '</div>' +
                            '<div id="HighestScoreSubTestNarrativeLong" hidden="hidden">Highest Score' +
                            '<input type="checkbox" id="IsHighestScoreSubTestNarrativeLong" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestNarrativeLong" onchange="DisplayHighestScoreSubTestNarrativeLong(this)" />' +
                            '<input id="HighestScoreTotalDisplaySubTestNarrativeLong" name="HighestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                            '</div>' +
                            '<div id="LowestScoreSubTestNarrativeLong" hidden="hidden">Lowest Score' +
                            '<input type="checkbox" id="IsLowestScoreSubTestNarrativeLong" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestNarrativeLong" onchange="DisplayLowestScoreSubTestNarrativeLong(this)" />' +
                            '<input id="LowestScoreTotalDisplaySubTestNarrativeLong" name="LowestScoreTotalDisplaySubTestNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestNarrativeLong" />Sub Test' +
                            '</div>' +
                            '</li >' +
                            '<li id="HasSubTestCuttingNarrative" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives]]' +
                            '<span style="float:right">' +
                            '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrative" onchange="DisplayStatusSubTestCuttingNarrative(this)" />Display' +
                            '</span>' +
                            '<div id="AllNarrativesSubTestCuttingNarrative">All Narratives' +
                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative" id="IsAllNarrativeSubTestCuttingNarrative" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrative" onclick="AllNarrativeSubTestCuttingNarrative(this)"/>' +
                            '<span> Yes</span>' +
                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrative" id="IsNotAllNarrativeSubTestCuttingNarrative" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrative" onclick="NotAllNarrativeSubTestCuttingNarrative(this)"/>' +
                            '<span> No</span>' +
                            '</div>' +
                            '<div id="HighestScoreSubTestCuttingNarrative" hidden="hidden">Highest Score' +
                            '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrative" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrative" onchange="DisplayHighestScoreSubTestCuttingNarrative(this)" />' +
                            '<input id="HighestScoreTotalDisplaySubTestCuttingNarrative" name="HighestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                            '</div>' +
                            '<div id="LowestScoreSubTestCuttingNarrative" hidden="hidden">Lowest Score' +
                            '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrative" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrative" onchange="DisplayLowestScoreSubTestCuttingNarrative(this)" />' +
                            '<input id="LowestScoreTotalDisplaySubTestCuttingNarrative" name="LowestScoreTotalDisplaySubTestCuttingNarrative" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrative" />Sub Test' +
                            '</div>' +
                            '</li >' +
                            '<li id="IsSubTestCuttingNarrativeShort" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Short]]' +
                            '<span style="float:right">' +
                            '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeShort" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeShort" onchange="DisplayStatusSubTestCuttingNarrativeShort(this)" />Display' +
                            '</span>' +
                            '<div id="AllNarrativesSubTestCuttingNarrativeShort">All Narratives' +
                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort" id="IsAllNarrativeSubTestCuttingNarrativeShort" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeShort" onclick="AllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                            '<span> Yes</span>' +
                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeShort" id="IsNotAllNarrativeSubTestCuttingNarrativeShort" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeShort" onclick="NotAllNarrativeSubTestCuttingNarrativeShort(this)"/>' +
                            '<span> No</span>' +
                            '</div>' +
                            '<div id="HighestScoreSubTestCuttingNarrativeShort" hidden="hidden">Highest Score' +
                            '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeShort" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeShort" onchange="DisplayHighestScoreSubTestCuttingNarrativeShort(this)" />' +
                            '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeShort" name="HighestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                            '</div>' +
                            '<div id="LowestScoreSubTestCuttingNarrativeShort" hidden="hidden">Lowest Score' +
                            '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeShort" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeShort" onchange="DisplayLowestScoreSubTestCuttingNarrativeShort(this)" />' +
                            '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeShort" name="LowestScoreTotalDisplaySubTestCuttingNarrativeShort" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeShort" />Sub Test' +
                            '</div>' +
                            '</li>' +
                            '<li id="IsSubTestCuttingNarrativeLong" style="border: outset; width:50%; display:block" data-type="subtest">[[Sub Test Cutting Narratives - Long]]' +
                            '<span style="float:right">' +
                            '<input type="checkbox" id="DisplayStatusSubTestCuttingNarrativeLong" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusSubTestCuttingNarrativeLong" onchange="DisplayStatusSubTestCuttingNarrativeLong(this)" />Display' +
                            '</span>' +
                            '<div id="AllNarrativesSubTestCuttingNarrativeLong">All Narratives' +
                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong" id="IsAllNarrativeSubTestCuttingNarrativeLong" checked="checked" data-bind="checked: IsAllNarrativeSubTestCuttingNarrativeLong" onclick="AllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                            '<span> Yes</span>' +
                            '<input type="radio" name="IsAllNarrativeSubTestCuttingNarrativeLong" id="IsNotAllNarrativeSubTestCuttingNarrativeLong" data-bind="checked: IsNotAllNarrativeSubTestCuttingNarrativeLong" onclick="NotAllNarrativeSubTestCuttingNarrativeLong(this)"/>' +
                            '<span> No</span>' +
                            '</div>' +
                            '<div id="HighestScoreSubTestCuttingNarrativeLong" hidden="hidden">Highest Score' +
                            '<input type="checkbox" id="IsHighestScoreSubTestCuttingNarrativeLong" class="k-checkbox" data-bind="checked:IsHighestScoreSubTestCuttingNarrativeLong" onchange="DisplayHighestScoreSubTestCuttingNarrativeLong(this)" />' +
                            '<input id="HighestScoreTotalDisplaySubTestCuttingNarrativeLong" name="HighestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: HighestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                            '</div>' +
                            '<div id="LowestScoreSubTestCuttingNarrativeLong" hidden="hidden">Lowest Score' +
                            '<input type="checkbox" id="IsLowestScoreSubTestCuttingNarrativeLong" class="k-checkbox" data-bind="checked:IsLowestScoreSubTestCuttingNarrativeLong" onchange="DisplayLowestScoreSubTestCuttingNarrativeLong(this)" />' +
                            '<input id="LowestScoreTotalDisplaySubTestCuttingNarrativeLong" name="LowestScoreTotalDisplaySubTestCuttingNarrativeLong" type="number" style="width:10%" data-bind="value: LowestScoreTotalDisplaySubTestCuttingNarrativeLong" />Sub Test' +
                            '</div>' +
                            '</li>' +
                            '<li id="HasIQNarrative" style="border: outset; width:50%; display:block" data-type="iq">[[IQ Narratives]]' +
                            '<span style="float:right">' +
                            '<input type="checkbox" id="DisplayStatusIQNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusIQNarrative" onchange="DisplayStatusIQNarrative(this)" />Display' +
                            '</span>' +
                            '</li>' +
                            '<li id="HasValidityScaleNarrative" style="border: outset; width:50%; display:block" data-type="vs">[[Validity Scale Narratives]]' +
                            '<span style="float:right">' +
                            '<input type="checkbox" id="DisplayStatusValidityScaleNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusValidityScaleNarrative" onchange="DisplayStatusValidityScaleNarrative(this)" />Display' +
                            '</span>' +
                            '</li>' +
                            '<li id="HasGroupNarrative" style="border: outset; width:50%; display:block" data-type="group">[[Group Narratives]]' +
                            '<span style="float:right">' +
                            '<input type="checkbox" id="DisplayStatusGroupNarrative" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusGroupNarrative" onchange="DisplayStatusGroupNarrative(this)" />Display' +
                            '</span>' +
                            '</li>' +
                            '</ul>' +
                            '</li>' +
                            '</ul>' +
                            '<span style="float:right">' +
                            '<input type="checkbox" id="display_status" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatus" onchange="Display(this)" />Display' +
                            '</span>' +
                            '</div>' +
                            '</div>'
                        ) : null

                        viewModel.set('IsAllNarrativeSubTestNarrative', true)
                        viewModel.set('IsAllNarrativeSubTestNarrativeShort', true)
                        viewModel.set('IsAllNarrativeSubTestNarrativeLong', true)
                        viewModel.set('IsAllNarrativeSubTestCuttingNarrative', true)
                        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', true)
                        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', true)
                        viewModel.set('DisplayStatusNarrativesGroupNarratives', true)

                        $('#HighestScoreTotalDisplaySubTestNarrative').keypress(function (e) {
                            if (e.which == 46 || e.which == 44) {
                                return false;
                            }
                        });
                        $('#LowestScoreTotalDisplaySubTestNarrative').keypress(function (e) {
                            if (e.which == 46 || e.which == 44) {
                                return false;
                            }
                        });
                        $('#HighestScoreTotalDisplaySubTestNarrativeShort').keypress(function (e) {
                            if (e.which == 46 || e.which == 44) {
                                return false;
                            }
                        });
                        $('#LowestScoreTotalDisplaySubTestNarrativeShort').keypress(function (e) {
                            if (e.which == 46 || e.which == 44) {
                                return false;
                            }
                        });
                        $('#HighestScoreTotalDisplaySubTestNarrativeLong').keypress(function (e) {
                            if (e.which == 46 || e.which == 44) {
                                return false;
                            }
                        });
                        $('#LowestScoreTotalDisplaySubTestNarrativeLong').keypress(function (e) {
                            if (e.which == 46 || e.which == 44) {
                                return false;
                            }
                        });

                        $('#HighestScoreTotalDisplaySubTestCuttingNarrative').keypress(function (e) {
                            if (e.which == 46 || e.which == 44) {
                                return false;
                            }
                        });
                        $('#LowestScoreTotalDisplaySubTestCuttingNarrative').keypress(function (e) {
                            if (e.which == 46 || e.which == 44) {
                                return false;
                            }
                        });
                        $('#HighestScoreTotalDisplaySubTestCuttingNarrativeShort').keypress(function (e) {
                            if (e.which == 46 || e.which == 44) {
                                return false;
                            }
                        });
                        $('#LowestScoreTotalDisplaySubTestCuttingNarrativeShort').keypress(function (e) {
                            if (e.which == 46 || e.which == 44) {
                                return false;
                            }
                        });
                        $('#HighestScoreTotalDisplaySubTestCuttingNarrativeLong').keypress(function (e) {
                            if (e.which == 46 || e.which == 44) {
                                return false;
                            }
                        });
                        $('#LowestScoreTotalDisplaySubTestCuttingNarrativeLong').keypress(function (e) {
                            if (e.which == 46 || e.which == 44) {
                                return false;
                            }
                        });

                        $("#panelbarNarrativesGroupNarratives").kendoPanelBar();
                        var panelbarNarrativesGroupNarratives = $("#panelbarNarrativesGroupNarratives").data("kendoPanelBar");
                        panelbarNarrativesGroupNarratives.expand($("#NarrativesGroupNarratives"));

                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarStrengthArea').length == 0 ?
                            null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarStrengthArea').remove()

                        $('#contentBox > ul.form-content > li#contentLayout div#panelbarDevelopmentArea').length == 0 ?
                            null : $('#contentBox > ul.form-content > li#contentLayout div#panelbarDevelopmentArea').remove()

                        //NARRATIVES & GROUP NARRATIVES
                        ////SUBTEST NARRATIVE
                        var HasSubTestNarrative = response.Layout.HasSubTestNarrative;
                        viewModel.set('HasSubTestNarrative', HasSubTestNarrative);
                        if (HasSubTestNarrative == true) {
                            if (response.Layout.IsSubTestNarrativeShort == true) {
                                viewModel.set('HasSubTestNarrativeShort', true);
                                viewModel.set('DisplayStatusSubTestNarrativeShort', true)
                                $('#IsSubTestNarrativeShort').show()
                                $('#AllNarrativesSubTestNarrativeShort').show()
                                viewModel.set('DisplayStatusSubTestNarrative', false)
                                $('#HasSubTestNarrative').hide()
                                $('#AllNarrativesSubTestNarrative').hide()
                                viewModel.set('DisplayStatusSubTestNarrativeLong', false)
                                $('#IsSubTestNarrativeLong').hide()
                                $('#AllNarrativesSubTestNarrativeLong').hide()
                            } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                viewModel.set('HasSubTestNarrativeLong', true);
                                viewModel.set('DisplayStatusSubTestNarrativeLong', true)
                                $('#IsSubTestNarrativeLong').show()
                                $('#AllNarrativesSubTestNarrativeLong').show()
                                viewModel.set('DisplayStatusSubTestNarrative', false)
                                $('#HasSubTestNarrative').hide()
                                $('#AllNarrativesSubTestNarrative').hide()
                                viewModel.set('DisplayStatusSubTestNarrativeShort', false)
                                $('#IsSubTestNarrativeShort').hide()
                                $('#AllNarrativesSubTestNarrativeShort').hide()
                            }
                        } else {
                            viewModel.set('DisplayStatusSubTestNarrative', false)
                            $('#HasSubTestNarrative').hide()
                            $('#AllNarrativesSubTestNarrative').hide()
                            viewModel.set('DisplayStatusSubTestNarrativeShort', false)
                            $('#IsSubTestNarrativeShort').hide()
                            $('#AllNarrativesSubTestNarrativeShort').hide()
                            viewModel.set('DisplayStatusSubTestNarrativeLong', false)
                            $('#IsSubTestNarrativeLong').hide()
                            $('#AllNarrativesSubTestNarrativeLong').hide()
                        }
                        ////SUBTEST CUTTING NARRATIVE
                        var HasSubTestCuttingNarrative = response.Layout.HasSubTestCuttingNarrative;
                        viewModel.set('HasSubTestCuttingNarrative', HasSubTestCuttingNarrative);
                        if (HasSubTestCuttingNarrative == true) {
                            if (response.Layout.IsSubTestNarrativeShort == true) {
                                viewModel.set('HasSubTestCuttingNarrativeShort', true);
                                viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', true)
                                $('#IsSubTestCuttingNarrativeShort').show()
                                $('#AllNarrativesSubTestCuttingNarrativeShort').show()
                                viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                                $('#HasSubTestCuttingNarrative').hide()
                                $('#AllNarrativesSubTestCuttingNarrative').hide()
                                viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', false)
                                $('#IsSubTestCuttingNarrativeLong').hide()
                                $('#AllNarrativesSubTestCuttingNarrativeLong').hide()
                            } else if (response.Layout.IsSubTestNarrativeLong == true) {
                                viewModel.set('HasSubTestCuttingNarrativeLong', true);
                                viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', true)
                                $('#IsSubTestCuttingNarrativeLong').show()
                                $('#AllNarrativesSubTestCuttingNarrativeLong').show()
                                viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                                $('#HasSubTestCuttingNarrative').hide()
                                $('#AllNarrativesSubTestCuttingNarrative').hide()
                                viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', false)
                                $('#IsSubTestCuttingNarrativeShort').hide()
                                $('#AllNarrativesSubTestCuttingNarrativeShort').hide()
                            }
                        } else {
                            viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                            $('#HasSubTestCuttingNarrative').hide()
                            $('#AllNarrativesSubTestCuttingNarrative').hide()
                            viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', false)
                            $('#IsSubTestCuttingNarrativeShort').hide()
                            $('#AllNarrativesSubTestCuttingNarrativeShort').hide()
                            viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', false)
                            $('#IsSubTestCuttingNarrativeLong').hide()
                            $('#AllNarrativesSubTestCuttingNarrativeLong').hide()
                        }
                        ////IQ NARRATIVE
                        var HasIQNarrative = response.Layout.HasIQNarrative;
                        viewModel.set('HasIQNarrative', HasIQNarrative);
                        if (HasIQNarrative == true) {
                            viewModel.set('DisplayStatusIQNarrative', true)
                            $('#HasIQNarrative').show()
                        } else {
                            viewModel.set('DisplayStatusIQNarrative', false)
                            $('#HasIQNarrative').hide()
                        }
                        ////VALIDITY SCALE NARRATIVE
                        var HasValidityScaleNarrative = response.Layout.HasValidityScaleNarrative;
                        viewModel.set('HasValidityScaleNarrative', HasValidityScaleNarrative);
                        if (HasValidityScaleNarrative == true) {
                            viewModel.set('DisplayStatusValidityScaleNarrative', true)
                            $('#HasValidityScaleNarrative').show()
                        } else {
                            viewModel.set('DisplayStatusValidityScaleNarrative', false)
                            $('#HasValidityScaleNarrative').hide()
                        }
                        ////GROUP NARRATIVE
                        var HasGroupNarrative = response.Layout.HasGroupNarrative;
                        viewModel.set('HasGroupNarrative', HasGroupNarrative);
                        if (HasGroupNarrative == true) {
                            viewModel.set('DisplayStatusGroupNarrative', true)
                            $('#HasGroupNarrative').show()
                        } else {
                            viewModel.set('DisplayStatusGroupNarrative', false)
                            $('#HasGroupNarrative').hide()
                        }
                    }
                }
                else {
                    viewModel.set('IsProfiling', response.Layout.IsProfiling)
                    viewModel.set('HasPsychogram', false);
                    viewModel.set('DisplayStatusPsychogram', false)
                    $('#panelbarPsychogram').hide()
                    viewModel.set('DisplayStatusPsychogramAbility', false)
                    $('#panelbarPsychogramAbility').hide()
                    viewModel.set('DisplayStatusPsychogramPersonality', false)
                    $('#panelbarPsychogramPersonality').hide()

                    //NARRATIVES & GROUP NARRATIVES
                    ////SUBTEST NARRATIVE
                    var HasSubTestNarrative = response.Layout.HasSubTestNarrative;
                    viewModel.set('HasSubTestNarrative', HasSubTestNarrative);
                    if (HasSubTestNarrative == true) {
                        if (response.Layout.IsSubTestNarrativeShort == true) {
                            viewModel.set('HasSubTestNarrativeShort', true);
                            viewModel.set('DisplayStatusSubTestNarrativeShort', true)
                            $('#IsSubTestNarrativeShort').show()
                            $('#AllNarrativesSubTestNarrativeShort').show()
                            viewModel.set('DisplayStatusSubTestNarrative', false)
                            $('#HasSubTestNarrative').hide()
                            $('#AllNarrativesSubTestNarrative').hide()
                            viewModel.set('DisplayStatusSubTestNarrativeLong', false)
                            $('#IsSubTestNarrativeLong').hide()
                            $('#AllNarrativesSubTestNarrativeLong').hide()
                        } else if (response.Layout.IsSubTestNarrativeLong == true) {
                            viewModel.set('HasSubTestNarrativeLong', true);
                            viewModel.set('DisplayStatusSubTestNarrativeLong', true)
                            $('#IsSubTestNarrativeLong').show()
                            $('#AllNarrativesSubTestNarrativeLong').show()
                            viewModel.set('DisplayStatusSubTestNarrative', false)
                            $('#HasSubTestNarrative').hide()
                            $('#AllNarrativesSubTestNarrative').hide()
                            viewModel.set('DisplayStatusSubTestNarrativeShort', false)
                            $('#IsSubTestNarrativeShort').hide()
                            $('#AllNarrativesSubTestNarrativeShort').hide()
                        }
                    } else {
                        viewModel.set('DisplayStatusSubTestNarrative', false)
                        $('#HasSubTestNarrative').hide()
                        $('#AllNarrativesSubTestNarrative').hide()
                        viewModel.set('DisplayStatusSubTestNarrativeShort', false)
                        $('#IsSubTestNarrativeShort').hide()
                        $('#AllNarrativesSubTestNarrativeShort').hide()
                        viewModel.set('DisplayStatusSubTestNarrativeLong', false)
                        $('#IsSubTestNarrativeLong').hide()
                        $('#AllNarrativesSubTestNarrativeLong').hide()
                    }
                    ////SUBTEST CUTTING NARRATIVE
                    var HasSubTestCuttingNarrative = response.Layout.HasSubTestCuttingNarrative;
                    viewModel.set('HasSubTestCuttingNarrative', HasSubTestCuttingNarrative);
                    if (HasSubTestCuttingNarrative == true) {
                        if (response.Layout.IsSubTestNarrativeShort == true) {
                            viewModel.set('HasSubTestCuttingNarrativeShort', true);
                            viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', true)
                            $('#IsSubTestCuttingNarrativeShort').show()
                            $('#AllNarrativesSubTestCuttingNarrativeShort').show()
                            viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                            $('#HasSubTestCuttingNarrative').hide()
                            $('#AllNarrativesSubTestCuttingNarrative').hide()
                            viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', false)
                            $('#IsSubTestCuttingNarrativeLong').hide()
                            $('#AllNarrativesSubTestCuttingNarrativeLong').hide()
                        } else if (response.Layout.IsSubTestNarrativeLong == true) {
                            viewModel.set('HasSubTestCuttingNarrativeLong', true);
                            viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', true)
                            $('#IsSubTestCuttingNarrativeLong').show()
                            $('#AllNarrativesSubTestCuttingNarrativeLong').show()
                            viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                            $('#HasSubTestCuttingNarrative').hide()
                            $('#AllNarrativesSubTestCuttingNarrative').hide()
                            viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', false)
                            $('#IsSubTestCuttingNarrativeShort').hide()
                            $('#AllNarrativesSubTestCuttingNarrativeShort').hide()
                        }
                    } else {
                        viewModel.set('DisplayStatusSubTestCuttingNarrative', false)
                        $('#HasSubTestCuttingNarrative').hide()
                        $('#AllNarrativesSubTestCuttingNarrative').hide()
                        viewModel.set('DisplayStatusSubTestCuttingNarrativeShort', false)
                        $('#IsSubTestCuttingNarrativeShort').hide()
                        $('#AllNarrativesSubTestCuttingNarrativeShort').hide()
                        viewModel.set('DisplayStatusSubTestCuttingNarrativeLong', false)
                        $('#IsSubTestCuttingNarrativeLong').hide()
                        $('#AllNarrativesSubTestCuttingNarrativeLong').hide()
                    }
                    ////IQ NARRATIVE
                    var HasIQNarrative = response.Layout.HasIQNarrative;
                    viewModel.set('HasIQNarrative', HasIQNarrative);
                    if (HasIQNarrative == true) {
                        viewModel.set('DisplayStatusIQNarrative', true)
                        $('#HasIQNarrative').show()
                    } else {
                        viewModel.set('DisplayStatusIQNarrative', false)
                        $('#HasIQNarrative').hide()
                    }
                    ////VALIDITY SCALE NARRATIVE
                    var HasValidityScaleNarrative = response.Layout.HasValidityScaleNarrative;
                    viewModel.set('HasValidityScaleNarrative', HasValidityScaleNarrative);
                    if (HasValidityScaleNarrative == true) {
                        viewModel.set('DisplayStatusValidityScaleNarrative', true)
                        $('#HasValidityScaleNarrative').show()
                    } else {
                        viewModel.set('DisplayStatusValidityScaleNarrative', false)
                        $('#HasValidityScaleNarrative').hide()
                    }
                    ////GROUP NARRATIVE
                    var HasGroupNarrative = response.Layout.HasGroupNarrative;
                    viewModel.set('HasGroupNarrative', HasGroupNarrative);
                    if (HasGroupNarrative == true) {
                        viewModel.set('DisplayStatusGroupNarrative', true)
                        $('#HasGroupNarrative').show()
                    } else {
                        viewModel.set('DisplayStatusGroupNarrative', false)
                        $('#HasGroupNarrative').hide()
                    }
                }

                //STRENGTH AREA
                var HasStrengthArea = response.Layout.HasStrengthArea;
                viewModel.set('HasStrengthArea', HasStrengthArea);
                if (HasStrengthArea == true) {
                    viewModel.set('DisplayStatusStrengthArea', true)
                    $('#contentBox > ul.form-content > li#contentLayout div#panelbarStrengthArea').length == 0 ?
                        $('#contentBox > ul.form-content li#contentLayout').append(
                            '<div id="panelbarStrengthArea">'+
                                '<div id="StrengthArea"> Strength Area' +
                                    '<ul class="form-content">' +
                                        '<li style="padding-top:2%">' +
                                            '<label>Title<span class="mandatory">*</span></label>' +
                                            '<input id="TitleStrengthArea" name="TitleStrengthArea" style="width:50%" data-bind="value: TitleStrengthArea" />' +
                                        '</li>' +
                                        '<li style="padding-bottom:2%">' +
                                            '<label style="width:90%">Value from Sub Test Narratives - Strength</label>' +
                                        '</li>' +
                                    '</ul>' +
                                    '<span style="float:right">' +
                                        '<input type="checkbox" id="DisplayStatusStrengthArea" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusStrengthArea" onchange="DisplayStatusStrengthArea(this)" />Display' +
                                    '</span>' +
                                '</div>' +
                            '</div>'
                        ) : null
                    $('#TitleStrengthArea').val(viewModel.TitleStrengthArea)
                    $('#DisplayStatusStrengthArea').val(viewModel.DisplayStatusStrengthArea)

                    $("#panelbarStrengthArea").kendoPanelBar();
                    var panelbarStrengthArea = $("#panelbarStrengthArea").data("kendoPanelBar");
                    panelbarStrengthArea.expand($("#StrengthArea"));
                    //$('#panelbarStrengthArea').show()
                } else {
                    viewModel.set('DisplayStatusStrengthArea', false)
                    $('#panelbarStrengthArea').hide()
                }

                //DEVELOPMENT AREA
                var HasDevelopmentArea = response.Layout.HasDevelopmentArea;
                viewModel.set('HasDevelopmentArea', HasDevelopmentArea);
                if (HasDevelopmentArea == true) {
                    viewModel.set('DisplayStatusDevelopmentArea', true)
                    $('#contentBox > ul.form-content > li#contentLayout div#panelbarDevelopmentArea').length == 0 ?
                        $('#contentBox > ul.form-content li#contentLayout').append(
                            '<div id="panelbarDevelopmentArea">' +
                                '<div id="DevelopmentArea">Development Area' +
                                    '<ul class="form-content">' +
                                        '<li style="padding-top:2%">' +
                                            '<label>Title<span class="mandatory">*</span></label>'+
                                            '<input id="TitleDevelopmentArea" name="TitleDevelopmentArea" style="width:50%" data-bind="value: TitleDevelopmentArea" />'+
                                        '</li>'+
                                        '<li style="padding-bottom:2%">'+
                                            '<label style="width:90%">Value from Sub Test Narratives - Development Area</label>'+
                                        '</li>'+
                                    '</ul>'+
                                    '<span style="float:right">'+
                                        '<input type="checkbox" id="DisplayStatusDevelopmentArea" class="k-checkbox" checked="checked" data-bind="checked:DisplayStatusDevelopmentArea" onchange="DisplayStatusDevelopmentArea(this)" />Display'+
                                    '</span>'+
                                '</div>'+
                            '</div >'
                        ) : null
                    $('#TitleDevelopmentArea').val(viewModel.TitleDevelopmentArea)
                    $('#DisplayStatusDevelopmentArea').val(viewModel.DisplayStatusDevelopmentArea)

                    $("#panelbarDevelopmentArea").kendoPanelBar();
                    var panelbarDevelopmentArea = $("#panelbarDevelopmentArea").data("kendoPanelBar");
                    panelbarDevelopmentArea.expand($("#DevelopmentArea"));
                    //$('#panelbarDevelopmentArea').show()
                } else {
                    viewModel.set('DisplayStatusDevelopmentArea', false)
                    $('#panelbarDevelopmentArea').hide()
                }
            }
            LoadingMask.hide()
        },
        error: function (x, e) {
            alert('error ajax');
        }
    });
}

$(function () {
    $('input:radio[id="IsNotAllNarrativeSubTestNarrativeShort"]').click(function () {
        if ($(this).is(':checked')) {
            $('#HighestScoreSubTestNarrativeShort').show()
            $('#LowestScoreSubTestNarrativeShort').show()
        }
    });
});
$(function () {
    $('input:radio[id="IsAllNarrativeSubTestNarrativeShort"]').click(function () {
        if ($(this).is(':checked')) {
            $('#HighestScoreSubTestNarrativeShort').hide()
            $('#LowestScoreSubTestNarrativeShort').hide()
        }
    });
});

dropDownCandidateInformationValue = function (count) {
    if (count == undefined || count == null) {
        count = 0;
    } else {
        count = count;
    }
    $('#CandidateInformationValue' + count).kendoComboBox({
        placeholder: 'Select Type...',
        dataSource: viewModel.CandidateInformationValueList,
        dataTextField: 'Value',
        dataValueField: 'Code',
        select: function (e) {
            var id = viewModel.CandidateInformationValueList.find(x => x.Value === e.item[0].innerHTML).Code;
            var name = viewModel.CandidateInformationValueList.find(x => x.Value === e.item[0].innerHTML).Value;

            if (viewModel.Fields.length > 0) {
                for (a = 0; a < viewModel.Fields.length; a++) {
                    if (id == viewModel.Fields[a].ValueCode) {
                        confirmMessageDuplicateCandidateInformationValue();
                        $('.swal-button--defeat').on('click', function () {
                            $('#CandidateInformationValue' + count).data('kendoComboBox').value("");
                            viewModel.set('Fields[' + count + '].ValueCode', "");
                        })
                    } else {
                        //break
                    }
                }
                viewModel.set('Fields[' + count + '].ValueCode', id);
            } else {
                viewModel.Fields.push({
                    FieldName: "",
                    ValueCode: id
                })
            }
        }
    });
}

addCoverValue = function (data) {
    var nomerValue = parseInt($(data).attr('no'));
    var nomerValueNext = nomerValue + 1;
    var Values = viewModel.Cover.Values;

    var Value = []
    Values.push(Value)

    $('#CoverValue').append('<div id="CoverValue' + nomerValueNext + '" style="padding-top:0.3%">' + 
        '<label style="padding-left:0.5%"></label>' +
        '<input id="ConfigLayoutCoverValueCode' + nomerValueNext + '" name="ConfigLayoutCoverValueCode' + nomerValueNext + '" data-role="combobox" style="width:25%" data-bind="value: ConfigLayoutCoverValueName" placeholder="Select Type.." />' +
        '<a id="deleteCoverValue' + nomerValueNext + '" class="k-button" style="border-color:#fff" no="' + nomerValueNext + '" onclick="deleteCoverValue(this)"><i class="fas fa-trash-alt"></i></a>' +
        '</div>'
    )
    $('#CoverValue > div#CoverValue' + (nomerValueNext - 1) + ' a#deleteCoverValue' + (nomerValueNext - 1)).hide();

    dropDownConfigLayoutCoverValue(nomerValueNext);
    $(data).removeAttr('no');
    $(data).attr('no', nomerValueNext);
}
addEditCoverValue = function (data) {
    var Values = viewModel.Cover.Values;
    var nomerValueNext = Values.length;

    var Value = []
    Values.push(Value)

    $('li#CoverValue').append('<div id="CoverValue' + nomerValueNext + '" style="padding-top:0.3%">' + 
        '<label style="padding-left:0.5%"></label>' +
        '<input id="ConfigLayoutCoverValueCode' + nomerValueNext + '" name="ConfigLayoutCoverValueCode' + nomerValueNext + '" data-role="combobox" style="width:25%" data-bind="value: ConfigLayoutCoverValueName" placeholder="Select Type.." />' +
        '<a id="deleteCoverValue' + nomerValueNext + '" class="k-button" style="border-color:#fff" no="' + nomerValueNext + '" onclick="deleteCoverValue(this)"><i class="fas fa-trash-alt"></i></a>' +
        '</div>'
    )
    $('li#CoverValue > div#CoverValue' + (nomerValueNext - 1) + ' a#deleteCoverValue' + (nomerValueNext - 1)).hide();

    ConfigLayoutCoverValueLoad(nomerValueNext);
    dropDownConfigLayoutCoverValue(nomerValueNext);
    $(data).removeAttr('no');
    $(data).attr('no', nomerValueNext);
}
deleteCoverValue = function (data) {
    var nomerValue = parseInt($(data).attr('no'));
    var remainingValue = nomerValue - 1;
    var Values = viewModel.Cover.Values

    /*remove member of array*/
    var valueLength = Values.length;
    Values = Values.slice(0);
    Values.splice(valueLength - 1, 1);

    viewModel.Cover.set('Values', Values);

    $('div#CoverValue' + nomerValue).remove();
    $('#CoverValue > div#CoverValue' + remainingValue + ' a#deleteCoverValue' + remainingValue).show();
    $('#deleteCoverValue' + nomerValue).removeAttr('hidden');
    $('#addCoverValue').removeAttr('no');
    $('#addCoverValue').attr('no', remainingValue);
}

addFieldCandidateInformation = function (data) {
    var nomerFieldValue = parseInt($(data).attr('noField'));
    var nomerFieldValueNext = nomerFieldValue + 1;
    var Fields = viewModel.Fields

    var Field = [{
        FieldName: "",
        ValueCode: ""
    }]
    Fields.push(Field[0])

    $('#FieldValue').append('<div id="FieldValue' + nomerFieldValueNext + '" style="padding-top:0.3%">' +
        '<input id="CandidateInformationFieldName' + nomerFieldValueNext + '" name="CandidateInformationFieldName' + nomerFieldValueNext + '" noField="' + nomerFieldValueNext + '" style="width:25%" data-bind="value: Fields[' + nomerFieldValueNext + '].FieldName" onchange="changeFieldName(this)" />' +
        '<input id="CandidateInformationValue' + nomerFieldValueNext + '" name="CandidateInformationValue' + nomerFieldValueNext + '" noValue="' + nomerFieldValueNext + '" data-role="combobox" style="width:25%; padding-left:0.4%" data-bind="value: Fields[' + nomerFieldValueNext +'].ValueCode" placeholder="Select Type.." />' +
        '<a id="deleteFieldValue' + nomerFieldValueNext + '" class="k-button" style="border-color:#fff" noField="' + nomerFieldValueNext + '" onclick="deleteFieldValue(this)"><i class="fas fa-trash-alt"></i></a>' +
        '</div>'
    )
    $('#FieldValue > div#FieldValue' + (nomerFieldValueNext - 1) + ' a#deleteFieldValue' + (nomerFieldValueNext - 1)).hide();
    
    dropDownCandidateInformationValue(nomerFieldValueNext);
    $(data).removeAttr('noField');
    $(data).attr('noField', nomerFieldValueNext);
    $(data).removeAttr('noValue');
    $(data).attr('noValue', nomerFieldValueNext);
}
addEditFieldCandidateInformation = function (data) {
    var Fields = viewModel.Fields
    var nomerFieldValueNext = Fields.length;

    var Field = [{
        FieldName: "",
        ValueCode: ""
    }]
    Fields.push(Field[0])

    $('#FieldValue').append('<div id="FieldValue' + nomerFieldValueNext + '" style="padding-top:0.3%">' +
        '<input id="CandidateInformationFieldName' + nomerFieldValueNext + '" name="CandidateInformationFieldName' + nomerFieldValueNext + '" noField="' + nomerFieldValueNext + '" style="width:25%" data-bind="value: Fields[' + nomerFieldValueNext + '].FieldName" onchange="changeFieldName(this)" />' +
        '<input id="CandidateInformationValue' + nomerFieldValueNext + '" name="CandidateInformationValue' + nomerFieldValueNext + '" noValue="' + nomerFieldValueNext + '" data-role="combobox" style="width:25%; padding-left:0.4%" data-bind="value: Fields[' + nomerFieldValueNext + '].ValueCode" placeholder="Select Type.." />' +
        '<a id="deleteFieldValue' + nomerFieldValueNext + '" class="k-button" style="border-color:#fff" noField="' + nomerFieldValueNext + '" onclick="deleteFieldValue(this)"><i class="fas fa-trash-alt"></i></a>' +
        '</div>'
    )
    $('#FieldValue > div#FieldValue' + (nomerFieldValueNext - 1) + ' a#deleteFieldValue' + (nomerFieldValueNext - 1)).hide();

    dropDownCandidateInformationValue(nomerFieldValueNext);
    $(data).removeAttr('noField');
    $(data).attr('noField', nomerFieldValueNext);
    $(data).removeAttr('noValue');
    $(data).attr('noValue', nomerFieldValueNext);
}
deleteFieldValue = function (data) {
    var nomerFieldValue = parseInt($(data).attr('noField'));
    var remainingFieldValue = nomerFieldValue - 1;
    var Fields = viewModel.Fields

    /*remove member of array*/
    var fieldValueLength = Fields.length;
    Fields = Fields.slice(0);
    Fields.splice(fieldValueLength - 1, 1);

    viewModel.set('Fields', Fields);

    $('div#FieldValue' + nomerFieldValue).remove();
    $('#FieldValue > div#FieldValue' + remainingFieldValue + ' a#deleteFieldValue' + remainingFieldValue).show();
    $('#deleteFieldValue' + nomerFieldValue).removeAttr('hidden');
    $('#addFieldCandidateInformation').removeAttr('noField');
    $('#addFieldCandidateInformation').attr('noField', remainingFieldValue);
}

changeFieldName = function (data) {
    var nomerFieldValueNext = parseInt($(data).attr('noField'))
    var Fields = viewModel.Fields
    var FieldName = $('#CandidateInformationFieldName' + nomerFieldValueNext).val()

    Fields[nomerFieldValueNext].set('FieldName', FieldName)
}

Display = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayChecked(this)')
    viewModel.set(id, false)
}
DisplayChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'Display(this)');
    viewModel.set(id, true);
}

//Display CheckBox Content
DisplayStatusCandidateInformation = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayStatusCandidateInformationChecked(this)')
    viewModel.set(id, false)
}
DisplayStatusCandidateInformationChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayStatusCandidateInformation(this)');
    viewModel.set(id, true);
}

DisplayStatusPsychogram = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayStatusPsychogramChecked(this)')
    viewModel.set(id, false)
}
DisplayStatusPsychogramChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayStatusPsychogram(this)');
    viewModel.set(id, true);
}

DisplayStatusPsychogramAbility = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayStatusPsychogramAbilityChecked(this)')
    viewModel.set(id, false)
}
DisplayStatusPsychogramAbilityChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayStatusPsychogramAbility(this)');
    viewModel.set(id, true);
}

DisplayStatusPsychogramPersonality = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayStatusPsychogramPersonalityChecked(this)')
    viewModel.set(id, false)
}
DisplayStatusPsychogramPersonalityChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayStatusPsychogramPersonality(this)');
    viewModel.set(id, true);
}

DisplayStatusNarrativesGroupNarratives = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayStatusNarrativesGroupNarrativesChecked(this)')
    viewModel.set(id, false)
}
DisplayStatusNarrativesGroupNarrativesChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayStatusNarrativesGroupNarratives(this)');
    viewModel.set(id, true);
}

DisplayStatusSubTestNarrativeShort = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayStatusSubTestNarrativeShortChecked(this)')
    viewModel.set(id, false)
}
DisplayStatusSubTestNarrativeShortChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayStatusSubTestNarrativeShort(this)');
    viewModel.set(id, true);
}

DisplayStatusSubTestNarrativeLong = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayStatusSubTestNarrativeLongChecked(this)')
    viewModel.set(id, false)
}
DisplayStatusSubTestNarrativeLongChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayStatusSubTestNarrativeLong(this)');
    viewModel.set(id, true);
}

DisplayStatusSubTestCuttingNarrative = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayStatusSubTestCuttingNarrativeChecked(this)')
    viewModel.set(id, false)
}
DisplayStatusSubTestCuttingNarrativeChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayStatusSubTestCuttingNarrative(this)');
    viewModel.set(id, true);
}

DisplayStatusSubTestCuttingNarrativeShort = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayStatusSubTestCuttingNarrativeShortChecked(this)')
    viewModel.set(id, false)
}
DisplayStatusSubTestCuttingNarrativeShortChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayStatusSubTestCuttingNarrativeShort(this)');
    viewModel.set(id, true);
}

DisplayStatusSubTestCuttingNarrativeLong = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayStatusSubTestCuttingNarrativeLongChecked(this)')
    viewModel.set(id, false)
}
DisplayStatusSubTestCuttingNarrativeLongChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayStatusSubTestCuttingNarrativeLong(this)');
    viewModel.set(id, true);
}

DisplayStatusIQNarrative = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayStatusIQNarrativeChecked(this)')
    viewModel.set(id, false)
}
DisplayStatusIQNarrativeChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayStatusIQNarrative(this)');
    viewModel.set(id, true);
}

DisplayStatusValidityScaleNarrative = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayStatusValidityScaleNarrativeChecked(this)')
    viewModel.set(id, false)
}
DisplayStatusValidityScaleNarrativeChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayStatusValidityScaleNarrative(this)');
    viewModel.set(id, true);
}

DisplayStatusGroupNarrative = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayStatusGroupNarrativeChecked(this)')
    viewModel.set(id, false)
}
DisplayStatusGroupNarrativeChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayStatusGroupNarrative(this)');
    viewModel.set(id, true);
}

DisplayStatusStrengthArea = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayStatusStrengthAreaChecked(this)')
    viewModel.set(id, false)
}
DisplayStatusStrengthAreaChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayStatusStrengthArea(this)');
    viewModel.set(id, true);
}

DisplayStatusDevelopmentArea = function (data) {
    var id = $(data).attr('id')
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayStatusDevelopmentAreaChecked(this)')
    viewModel.set(id, false)
}
DisplayStatusDevelopmentAreaChecked = function (data) {
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayStatusDevelopmentArea(this)');
    viewModel.set(id, true);
}

//All Narratives/Not
AllNarrativeSubTestNarrative = function (data) {
    var tti = parseInt($(data).attr('tti'))
    if (isNaN(tti)) {
        viewModel.set('IsAllNarrativeSubTestNarrative', true)
        viewModel.set('IsNotAllNarrativeSubTestNarrative', false)
        viewModel.set('IsHighestScoreSubTestNarrative', false)
        viewModel.set('IsLowestScoreSubTestNarrative', false)
        $('#HighestScoreSubTestNarrative').hide()
        $('#LowestScoreSubTestNarrative').hide()
    } else {
        viewModel.set('IsAllNarrativeSubTestNarrative' + tti, true)
        viewModel.set('IsNotAllNarrativeSubTestNarrative' + tti, false)
        viewModel.set('IsHighestScoreSubTestNarrative' + tti, false)
        viewModel.set('IsLowestScoreSubTestNarrative' + tti, false)
        $('#HighestScoreSubTestNarrative' + tti).hide()
        $('#LowestScoreSubTestNarrative' + tti).hide()
    }
}
NotAllNarrativeSubTestNarrative = function (data) {
    var tti = parseInt($(data).attr('tti'))
    if (isNaN(tti)) {
        viewModel.set('IsAllNarrativeSubTestNarrative', false)
        viewModel.set('IsNotAllNarrativeSubTestNarrative', true)
        $('#HighestScoreSubTestNarrative').show()
        $('#LowestScoreSubTestNarrative').show()
    } else {
        viewModel.set('IsAllNarrativeSubTestNarrative' + tti, false)
        viewModel.set('IsNotAllNarrativeSubTestNarrative' + tti, true)
        $('#HighestScoreSubTestNarrative' + tti).show()
        $('#LowestScoreSubTestNarrative' + tti).show()
    }
}

AllNarrativeSubTestNarrativeShort = function (data) {
    var tti = parseInt($(data).attr('tti'))
    if (isNaN(tti)) {
        viewModel.set('IsAllNarrativeSubTestNarrativeShort', true)
        viewModel.set('IsNotAllNarrativeSubTestNarrativeShort', false)
        viewModel.set('IsHighestScoreSubTestNarrativeShort', false)
        viewModel.set('IsLowestScoreSubTestNarrativeShort', false)
        $('#HighestScoreSubTestNarrativeShort').hide()
        $('#LowestScoreSubTestNarrativeShort').hide()
    } else {
        viewModel.set('IsAllNarrativeSubTestNarrativeShort' + tti, true)
        viewModel.set('IsNotAllNarrativeSubTestNarrativeShort' + tti, false)
        viewModel.set('IsHighestScoreSubTestNarrativeShort' + tti, false)
        viewModel.set('IsLowestScoreSubTestNarrativeShort' + tti, false)
        $('#HighestScoreSubTestNarrativeShort' + tti).hide()
        $('#LowestScoreSubTestNarrativeShort' + tti).hide()
    }
}
NotAllNarrativeSubTestNarrativeShort = function (data) {
    var tti = parseInt($(data).attr('tti'))
    if (isNaN(tti)) {
        viewModel.set('IsAllNarrativeSubTestNarrativeShort', false)
        viewModel.set('IsNotAllNarrativeSubTestNarrativeShort', true)
        $('#HighestScoreSubTestNarrativeShort').show()
        $('#LowestScoreSubTestNarrativeShort').show()
    } else {
        viewModel.set('IsAllNarrativeSubTestNarrativeShort' + tti, false)
        viewModel.set('IsNotAllNarrativeSubTestNarrativeShort' + tti, true)
        $('#HighestScoreSubTestNarrativeShort' + tti).show()
        $('#LowestScoreSubTestNarrativeShort' + tti).show()
    }
}

AllNarrativeSubTestNarrativeLong = function (data) {
    var tti = parseInt($(data).attr('tti'))
    if (isNaN(tti)) {
        viewModel.set('IsAllNarrativeSubTestNarrativeLong', true)
        viewModel.set('IsNotAllNarrativeSubTestNarrativeLong', false)
        viewModel.set('IsHighestScoreSubTestNarrativeLong', false)
        viewModel.set('IsLowestScoreSubTestNarrativeLong', false)
        $('#HighestScoreSubTestNarrativeLong').hide()
        $('#LowestScoreSubTestNarrativeLong').hide()
    } else {
        viewModel.set('IsAllNarrativeSubTestNarrativeLong' + tti, true)
        viewModel.set('IsNotAllNarrativeSubTestNarrativeLong' + tti, false)
        viewModel.set('IsHighestScoreSubTestNarrativeLong' + tti, false)
        viewModel.set('IsLowestScoreSubTestNarrativeLong' + tti, false)
        $('#HighestScoreSubTestNarrativeLong' + tti).hide()
        $('#LowestScoreSubTestNarrativeLong' + tti).hide()
    }
}
NotAllNarrativeSubTestNarrativeLong = function (data) {
    var tti = parseInt($(data).attr('tti'))
    if (isNaN(tti)) {
        viewModel.set('IsAllNarrativeSubTestNarrativeLong', false)
        viewModel.set('IsNotAllNarrativeSubTestNarrativeLong', true)
        $('#HighestScoreSubTestNarrativeLong').show()
        $('#LowestScoreSubTestNarrativeLong').show()
    } else {
        viewModel.set('IsAllNarrativeSubTestNarrativeLong' + tti, false)
        viewModel.set('IsNotAllNarrativeSubTestNarrativeLong' + tti, true)
        $('#HighestScoreSubTestNarrativeLong' + tti).show()
        $('#LowestScoreSubTestNarrativeLong' + tti).show()
    }
}

AllNarrativeSubTestCuttingNarrative = function (data) {
    var tti = parseInt($(data).attr('tti'))
    if (isNaN(tti)) {
        viewModel.set('IsAllNarrativeSubTestCuttingNarrative', true)
        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrative', false)
        viewModel.set('IsHighestScoreSubTestCuttingNarrative', false)
        viewModel.set('IsLowestScoreSubTestCuttingNarrative', false)
        $('#HighestScoreSubTestCuttingNarrative').hide()
        $('#LowestScoreSubTestCuttingNarrative').hide()
    } else {
        viewModel.set('IsAllNarrativeSubTestCuttingNarrative' + tti, true)
        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrative' + tti, false)
        viewModel.set('IsHighestScoreSubTestCuttingNarrative' + tti, false)
        viewModel.set('IsLowestScoreSubTestCuttingNarrative' + tti, false)
        $('#HighestScoreSubTestCuttingNarrative' + tti).hide()
        $('#LowestScoreSubTestCuttingNarrative' + tti).hide()
    }
}
NotAllNarrativeSubTestCuttingNarrative = function (data) {
    var tti = parseInt($(data).attr('tti'))
    if (isNaN(tti)) {
        viewModel.set('IsAllNarrativeSubTestCuttingNarrative', false)
        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrative', true)
        $('#HighestScoreSubTestCuttingNarrative').show()
        $('#LowestScoreSubTestCuttingNarrative').show()
    } else {
        viewModel.set('IsAllNarrativeSubTestCuttingNarrative' + tti, false)
        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrative' + tti, true)
        $('#HighestScoreSubTestCuttingNarrative' + tti).show()
        $('#LowestScoreSubTestCuttingNarrative' + tti).show()
    }
}

AllNarrativeSubTestCuttingNarrativeShort = function (data) {
    var tti = parseInt($(data).attr('tti'))
    if (isNaN(tti)) {
        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', true)
        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort', false)
        viewModel.set('IsHighestScoreSubTestCuttingNarrativeShort', false)
        viewModel.set('IsLowestScoreSubTestCuttingNarrativeShort', false)
        $('#HighestScoreSubTestCuttingNarrativeShort').hide()
        $('#LowestScoreSubTestCuttingNarrativeShort').hide()
    } else {
        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort' + tti, true)
        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti, false)
        viewModel.set('IsHighestScoreSubTestCuttingNarrativeShort' + tti, false)
        viewModel.set('IsLowestScoreSubTestCuttingNarrativeShort' + tti, false)
        $('#HighestScoreSubTestCuttingNarrativeShort' + tti).hide()
        $('#LowestScoreSubTestCuttingNarrativeShort' + tti).hide()
    }
}
NotAllNarrativeSubTestCuttingNarrativeShort = function (data) {
    var tti = parseInt($(data).attr('tti'))
    if (isNaN(tti)) {
        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort', false)
        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort', true)
        $('#HighestScoreSubTestCuttingNarrativeShort').show()
        $('#LowestScoreSubTestCuttingNarrativeShort').show()
    } else {
        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeShort' + tti, false)
        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeShort' + tti, true)
        $('#HighestScoreSubTestCuttingNarrativeShort' + tti).show()
        $('#LowestScoreSubTestCuttingNarrativeShort' + tti).show()
    }
}

AllNarrativeSubTestCuttingNarrativeLong = function (data) {
    var tti = parseInt($(data).attr('tti'))
    if (isNaN(tti)) {
        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', true)
        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong', false)
        viewModel.set('IsHighestScoreSubTestCuttingNarrativeLong', false)
        viewModel.set('IsLowestScoreSubTestCuttingNarrativeLong', false)
        $('#HighestScoreSubTestCuttingNarrativeLong').hide()
        $('#LowestScoreSubTestCuttingNarrativeLong').hide()
    } else {
        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong' + tti, true)
        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti, false)
        viewModel.set('IsHighestScoreSubTestCuttingNarrativeLong' + tti, false)
        viewModel.set('IsLowestScoreSubTestCuttingNarrativeLong' + tti, false)
        $('#HighestScoreSubTestCuttingNarrativeLong' + tti).hide()
        $('#LowestScoreSubTestCuttingNarrativeLong' + tti).hide()
    }
}
NotAllNarrativeSubTestCuttingNarrativeLong = function (data) {
    var tti = parseInt($(data).attr('tti'))
    if (isNaN(tti)) {
        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong', false)
        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong', true)
        $('#HighestScoreSubTestCuttingNarrativeLong').show()
        $('#LowestScoreSubTestCuttingNarrativeLong').show()
    } else {
        viewModel.set('IsAllNarrativeSubTestCuttingNarrativeLong' + tti, false)
        viewModel.set('IsNotAllNarrativeSubTestCuttingNarrativeLong' + tti, true)
        $('#HighestScoreSubTestCuttingNarrativeLong' + tti).show()
        $('#LowestScoreSubTestCuttingNarrativeLong' + tti).show()
    }
}

//Display CheckBox Highest-Lowest Score
DisplayHighestScoreSubTestNarrative = function (data) {
    var id = $(data).attr('id')
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayHighestScoreSubTestNarrativeChecked(this)')
    viewModel.set(id, true)
}
DisplayHighestScoreSubTestNarrativeChecked = function (data) {
    var id = $(data).attr('id');
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayHighestScoreSubTestNarrative(this)');
    viewModel.set(id, false);
}
DisplayLowestScoreSubTestNarrative = function (data) {
    var id = $(data).attr('id')
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayLowestScoreSubTestNarrativeChecked(this)')
    viewModel.set(id, true)
}
DisplayLowestScoreSubTestNarrativeChecked = function (data) {
    var id = $(data).attr('id');
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayLowestScoreSubTestNarrative(this)');
    viewModel.set(id, false);
}

DisplayHighestScoreSubTestNarrativeShort = function (data) {
    var id = $(data).attr('id')
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayHighestScoreSubTestNarrativeShortChecked(this)')
    viewModel.set(id, true)
}
DisplayHighestScoreSubTestNarrativeShortChecked = function (data) {
    var id = $(data).attr('id');
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayHighestScoreSubTestNarrativeShort(this)');
    viewModel.set(id, false);
}
DisplayLowestScoreSubTestNarrativeShort = function (data) {
    var id = $(data).attr('id')
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayLowestScoreSubTestNarrativeShortChecked(this)')
    viewModel.set(id, true)
}
DisplayLowestScoreSubTestNarrativeShortChecked = function (data) {
    var id = $(data).attr('id');
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayLowestScoreSubTestNarrativeShort(this)');
    viewModel.set(id, false);
}

DisplayHighestScoreSubTestNarrativeLong = function (data) {
    var id = $(data).attr('id')
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayHighestScoreSubTestNarrativeLongChecked(this)')
    viewModel.set(id, true)
}
DisplayHighestScoreSubTestNarrativeLongChecked = function (data) {
    var id = $(data).attr('id');
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayHighestScoreSubTestNarrativeLong(this)');
    viewModel.set(id, false);
}
DisplayLowestScoreSubTestNarrativeLong = function (data) {
    var id = $(data).attr('id')
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayLowestScoreSubTestNarrativeLongChecked(this)')
    viewModel.set(id, true)
}
DisplayLowestScoreSubTestNarrativeLongChecked = function (data) {
    var id = $(data).attr('id');
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayLowestScoreSubTestNarrativeLong(this)');
    viewModel.set(id, false);
}

DisplayHighestScoreSubTestCuttingNarrative = function (data) {
    var id = $(data).attr('id')
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeChecked(this)')
    viewModel.set(id, true)
}
DisplayHighestScoreSubTestCuttingNarrativeChecked = function (data) {
    var id = $(data).attr('id');
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrative(this)');
    viewModel.set(id, false);
}
DisplayLowestScoreSubTestCuttingNarrative = function (data) {
    var id = $(data).attr('id')
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeChecked(this)')
    viewModel.set(id, true)
}
DisplayLowestScoreSubTestCuttingNarrativeChecked = function (data) {
    var id = $(data).attr('id');
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrative(this)');
    viewModel.set(id, false);
}

DisplayHighestScoreSubTestCuttingNarrativeShort = function (data) {
    var id = $(data).attr('id')
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeShortChecked(this)')
    viewModel.set(id, true)
}
DisplayHighestScoreSubTestCuttingNarrativeShortChecked = function (data) {
    var id = $(data).attr('id');
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeShort(this)');
    viewModel.set(id, false);
}
DisplayLowestScoreSubTestCuttingNarrativeShort = function (data) {
    var id = $(data).attr('id')
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeShortChecked(this)')
    viewModel.set(id, true)
}
DisplayLowestScoreSubTestCuttingNarrativeShortChecked = function (data) {
    var id = $(data).attr('id');
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeShort(this)');
    viewModel.set(id, false);
}

DisplayHighestScoreSubTestCuttingNarrativeLong = function (data) {
    var id = $(data).attr('id')
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeLongChecked(this)')
    viewModel.set(id, true)
}
DisplayHighestScoreSubTestCuttingNarrativeLongChecked = function (data) {
    var id = $(data).attr('id');
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayHighestScoreSubTestCuttingNarrativeLong(this)');
    viewModel.set(id, false);
}
DisplayLowestScoreSubTestCuttingNarrativeLong = function (data) {
    var id = $(data).attr('id')
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange')
    $('#' + id).attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeLongChecked(this)')
    viewModel.set(id, true)
}
DisplayLowestScoreSubTestCuttingNarrativeLongChecked = function (data) {
    var id = $(data).attr('id');
    var tti = parseInt($(data).attr('tti'))
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayLowestScoreSubTestCuttingNarrativeLong(this)');
    viewModel.set(id, false);
}