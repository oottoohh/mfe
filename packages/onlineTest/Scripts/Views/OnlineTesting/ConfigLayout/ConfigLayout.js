$(document).ready(function () {
    //loadLayout();
    loadCandidate();
    //dropDownValue();
    loadPage();
    kendo.bind($("body"), viewModel);
});
$(function () {
    $('.draggable').sortable({
        connectWith: '.draggable',
        revert: true
    });
    $('.draggable li').draggable({
        connectToSortable: '.draggable',
        revert:'invalid'
    });
    $('ul, li').disableSelection();
});
loadCandidate = function () {
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + 'api/ConfigLayout/GetCandidateInfo',
        headers: { "Authorization-Token": Cookie.load() },
        dataType: 'json',
        success: function (response) {
            if (response.Acknowledge < 1) {
                swal('Failed', 'Candidate not found!!!', 'warning', { closeOnClickOutside: false });
            } else {
                viewModel.set('candidate', response.Datas);
                //var candidate = [];
                for (i = 0; i < response.Datas.length; i++) {
                    //candidate.push(response.Datas[i].Value);
                    $('#Value1').append('<option value="' + response.Datas[i].Code + '">' + response.Datas[i].Value + '</option>');
                }
                //dropDownValue(candidate);
            }
        },
        error: function (x, e) {
            alert('error ajax');
        }
    });
}
//dropDownValue = function () {
//    $('#Value1').kendoComboBox({
//        placeholder: 'Select Value...',
//        dataSource: viewModels.CategoryCandidate,
//        dataTextField: 'Value',
//        dataValueField:'Code'
//    });
//}
ICandidate = function (data) {
    var TypeBtn = $(data).attr('id');
    var status = $(data).attr('status');
    $('#ICandidate').removeClass('btn-full');
    $('#PCompetency').removeClass('btn-full');
    $('#GNarratives').removeClass('btn-full');
    $('#ICandidate').addClass('btn-layout');
    $('#PCompetency').addClass('btn-layout');
    $('#GNarratives').addClass('btn-layout');
    if (TypeBtn == 'ICandidate') {
        $('#ListsOfInformation').fadeIn('slow');
        $('#ListsOfCompetency').fadeOut('slow');
        $('#ListsOfNarratives').fadeOut('slow');
    } else if (TypeBtn == 'PCompetency') {
        $('#ListsOfCompetency').fadeIn('slow');
        $('#ListsOfInformation').fadeOut('slow');
        $('#ListsOfNarratives').fadeOut('slow');
    } else {
        $('#ListsOfNarratives').fadeIn('slow');
        $('#ListsOfInformation').fadeOut('slow');
        $('#ListsOfCompetency').fadeOut('slow');
    }
}
addField = function (data) {
    var no = $(data).attr('no');
    var count = parseInt(no) + 1;
    var ListsFields = viewModel.ListsField;
    var ListsField = [{
        Value: '',
        Code: ''
    }];
    ListsFields.push(ListsField[0]);
    $('#listsOfValue').append('<tr class="listsOfValue" id="Label'+count+'">' +
                        '<td>'+
                            '<input id="field' + count + '" name="field[]" class="k-textbox widthTextBox" data-bind="value:ListsField[' + count + '].Field" />' +
                        '</td>'+
                        '<td>' +
                        '<select id="Value' + count + '" name="Value[]" class="k-textbox widthTextBox">' +
                            '</select>'+
                            //'<input id="Value' + count + '" name="Value' + count + '" data-role="combobox" class="widthTextBox" data-bind="value:ListsField[' + count + '].Value" />' +
                        '</td>'+
                        '<td>'+
                            '<a href="#" id="delete' + count + '" class="k-button" no="' + count + '" onclick="DeleteCandidate(this)"><span class="fas fa-trash-alt"></span></a>' +
                        '</td>'+
                    '</tr>');

    dropDownCount(count);
    $(data).removeAttr('no');
    $(data).attr('no', count);
}
dropDownCount = function (count) {
    for (i = 0; i < viewModel.candidate.length; i++) {
        $('#Value' + count).append('<option value="' + viewModel.candidate[i].Code + '">' + viewModel.candidate[i].Value + '</option>');
    }
    //$('#Value' + count).kendoComboBox({
    //    placeholder: 'Select Value...',
    //    dataSource: viewModels.CategoryCandidate,
    //    dataTextField: 'Value',
    //    dataValueField: 'Code'
    //});
}
DeleteCandidate = function (data) {
    var no = $(data).attr('no');
    var nomor = parseInt(no);
    //$('#Label' + nomor).remove();
    //$('#addField').removeAttr('no');

    console.log(document.getElementById('Label' + no));
    document.getElementById('Label' + no).remove();
    

    console.log(data);

    //$('#addField').attr('no', nomor-1);
}
loadPage = function () {
    $('#listsOfValue').empty();
    $('#ListCompt').empty();
    $('#dataAbility').empty();
    $('#dataCompetency').empty();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + 'api/ConfigLayout/Detail',
        headers: { "Authorization-Token": Cookie.load() },
        dataType: 'json',
        success: function (response) {
            //console.log(response);
            if (response.Acknowledge > 0) {
                var dataCandidate = response.Datas;
                var dataGroupNarrative = response.GroupNarrative;
                var dataCompetency = response.Psychogram;
                viewModel.set('ListsField', dataCandidate);
                viewModel.set('Psychogram', dataCompetency);
                viewModel.set('GroupNarrative', dataGroupNarrative);
                for (h = 0; h < dataCandidate.length; h++) {
                    var count = h + 1;
                    $('#listsOfValue').append('<tr class="listsOfValue" id="Label' + count + '">' +
                        '<td>' +
                            '<input id="field' + count + '" name="field[]" class="k-textbox widthTextBox" value="'+dataCandidate[h].Value+'" />' +
                        '</td>' +
                        '<td>' +
                        '<select id="Value' + count + '" name="Value[]" class="k-textbox widthTextBox">' +
                        '<option style="background-color:blue;color:white;" hidden="hidden">' + dataCandidate[h].Code + '</option>' +
                            '</select>' +
                            //'<input id="Value' + count + '" name="Value' + count + '" data-role="combobox" class="widthTextBox" data-bind="value:ListsField[' + count + '].Value" />' +
                        '</td>' +
                        '<td>' +
                            '<a href="#" id="delete' + count + '" class="k-button" no="' + count + '" onclick="DeleteCandidate(this)"><span class="fas fa-trash-alt"></span></a>' +
                        '</td>' +
                    '</tr>');
                    dropDownCount(count);
                }
                $('#addField').removeAttr('no');
                var no = dataCandidate.length + 1;
                $('#addField').attr('no', no);
                for (i = 0; i < dataCompetency.length; i++) {
                    $('#ListCompt').append('<li value=' + dataCompetency[i].CompetencyCode + '><span>' + dataCompetency[i].CompetencyName + '<i class="fas fa-list-alt"></i><span></li>');
                }
                for (k = 0; k < dataGroupNarrative.length; k++) {
                    if (dataGroupNarrative[k].TypeReport == 'RO19000003') {
                        $('#dataAbility').append('<li value=' + dataGroupNarrative[k].GroupNarrativeCode + ' type="' + dataGroupNarrative[k].TypeReport + '" desc="' + dataGroupNarrative[k].TypeReportDesc + '"><span>' + dataGroupNarrative[k].GroupNarrativeName + '<i class="fas fa-list-alt"></i><span></li>');
                    } else {
                        $('#dataCompetency').append('<li value=' + dataGroupNarrative[k].GroupNarrativeCode + ' type="' + dataGroupNarrative[k].TypeReport + '" desc="' + dataGroupNarrative[k].TypeReportDesc + '"><span>' + dataGroupNarrative[k].GroupNarrativeName + '<i class="fas fa-list-alt"></i><span></li>');
                    }
                }
            }
        },
        error: function (x, e) {
            alert('error ajax');
        }
    });
    //var data = {
    //    CandidateInfo: [
	//	{
	//	    SeqNbr: 1,
	//	    FieldName: "Applicant Id",
	//	    FieldValue: "applicationid"
	//	},
    //    {
    //        SeqNbr: 2,
    //        FieldName: "Applicant Id",
    //        FieldValue: "applicationid"
    //    }
    //    ],
    //    Psychogram: [
    //        {
    //            SeqNbr: 1,
    //            CompetencyCode: "CO19000001",
    //            CompetencyName: "Skill"
    //        },
    //        {
    //            SeqNbr: 2,
    //            CompetencyCode: "CO19000002",
    //            CompetencyName: "Jujur"
    //        },
    //        {
    //            SeqNbr: 3,
    //            CompetencyCode: "CO19000003",
    //            CompetencyName: "Profesional"
    //        }
    //    ],
    //    GroupNarrative: [
    //        {
    //            SeqNbr: 1,
    //            TypeReport: "RO19000001",
    //            TypeReportDesc: "Competency",
    //            GroupNarrativeCode: "GON19000001",
    //            GroupNarrativeName: "Data Satu"
    //        },
    //        {
    //            SeqNbr: 2,
    //            TypeReport: "RO19000001",
    //            TypeReportDesc: "Competency",
    //            GroupNarrativeCode: "GON19000002",
    //            GroupNarrativeName: "Data Dua"
    //        },
    //        {
    //            SeqNbr: 1,
    //            TypeReport: "RO19000002",
    //            TypeReportDesc: "Ability",
    //            GroupNarrativeCode: "GON19000003",
    //            GroupNarrativeName: "Data Tiga"
    //        },
    //        {
    //            SeqNbr: 2,
    //            TypeReport: "RO19000002",
    //            TypeReportDesc: "Ability",
    //            GroupNarrativeCode: "GON19000004",
    //            GroupNarrativeName: "Data Empat"
    //        },
    //        {
    //            SeqNbr: 3,
    //            TypeReport: "RO19000002",
    //            TypeReportDesc: "Ability",
    //            GroupNarrativeCode: "GON19000005",
    //            GroupNarrativeName: "Data Lima"
    //        }
    //    ]
    //}
    //viewModel.set('Psychogram', data.Psychogram);
    //for (i = 0; i < data.Psychogram.length; i++) {
    //    $('#ListCompt').append('<li value=' + data.Psychogram[i].CompetencyCode + '><span>' + data.Psychogram[i].CompetencyName + '<i class="fas fa-list-alt"></i><span></li>');
    //}
    //for (k = 0; k < data.GroupNarrative.length; k++) {
    //    if (data.GroupNarrative[k].TypeReport == 'RO19000002') {
    //        $('#dataAbility').append('<li value=' + data.GroupNarrative[k].GroupNarrativeCode + ' type="' + data.GroupNarrative[k].TypeReport + '" desc="' + data.GroupNarrative[k].TypeReportDesc + '"><span>' + data.GroupNarrative[k].GroupNarrativeName + '<i class="fas fa-list-alt"></i><span></li>');
    //    } else {
    //        $('#dataCompetency').append('<li value=' + data.GroupNarrative[k].GroupNarrativeCode + ' type="' + data.GroupNarrative[k].TypeReport + '" desc="' + data.GroupNarrative[k].TypeReportDesc + '"><span>' + data.GroupNarrative[k].GroupNarrativeName + '<i class="fas fa-list-alt"></i><span></li>');
    //    }
    //}
}
//loadLayout = function () {
//    $.ajax({
//        type: 'POST',
//        url: DOMAIN_URL + '',
//        dataType: 'json',
//        success: function (respon) {

//        }, error: function (x, e) {

//        }
//    });
//}
//if (status == 'false') {
//    $('#ListsOfInformation').fadeIn('slow');
//    $('#ListsOfCompetency').fadeOut('slow');
//    $('#ListsOfNarratives').fadeOut('slow');
//    $('#' + TypeBtn).removeAttr('status');
//    $('#' + TypeBtn).attr('status', true);
//}
//else {
//    $('#ListsOfInformation').fadeOut('slow');
//    $('#' + TypeBtn).removeAttr('status');
//    $('#' + TypeBtn).attr('status', true);
//}