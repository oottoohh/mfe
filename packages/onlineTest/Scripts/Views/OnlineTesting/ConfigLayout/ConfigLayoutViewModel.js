var viewModel = kendo.observable({
    ListsField: [{
        Value: '',
        Code: ''
    }],
    Psychogram: [{
        SeqNbr: 1,
        CompetencyCode: '',
        CompetencyName: ''
    }],
    GroupNarrative: [{
        SeqNbr: 1,
        TypeReport: '',
        TypeReportDesc: '',
        GroupNarrativeCode: '',
        GroupNarrativeName: ''
    }],
    candidate: [],
    save: function () {
        save();
    },
    cancel: function () {
        loadCandidate();
        loadPage();
    }
});
save = function () {
    var valid = true;
    //Array data candidate
    var length = $('.listsOfValue').length;
    var arrCandidate = []; var noms = 1;

    var fieldkey=[];
    $.each($("[name='field[]']"), function () {
        fieldkey.push($(this).val());
    });

    var valuekey = [];
    $.each($("[name='Value[]']"), function () {
        valuekey.push($(this).val());
    });

    var fieldIndex = 1;
    for (hk = 0; hk < fieldkey.length; hk++) {
        arrCandidate.push({
            SeqNbr: fieldIndex,
            FieldName: fieldkey[hk],
            FieldValue: valuekey[hk]
        });

        fieldIndex++;
    }
    
    /*
    for (h = 0; h < length; h++) {
        var dataField = $('#field' + (h + 1)).val();
        var dataValue = $('#Value' + (h + 1)).val();
        viewModel.set('ListsField[' + h + '].Value', dataField);
        viewModel.set('ListsField[' + h + '].Code', dataValue);
        arrCandidate.push({
            SeqNbr: noms,
            FieldName: $('#field' + (h + 1)).val(),
            FieldValue: $('#Value' + (h + 1)).val()
        });
        noms++;
    }*/
    //console.log(arrCandidate);
    //Array data Competency
    var items = document.getElementById('ListCompt');
    var lists = items.getElementsByTagName('li');
    //console.log(lists);
    var arrListsCompt = []; var no = 1;
    for (i = 0; i < lists.length; i++) {
        arrListsCompt.push({
            SeqNbr: no,
            CompetencyName: lists[i].innerText,
            CompetencyCode: $(lists[i].outerHTML).attr('value')
        });
        no++;
    }
    //console.log(arrListsCompt);
    //Array data Group Narrative data Competency
    var itemCompetency = document.getElementById('dataCompetency');
    var listsCompetency = itemCompetency.getElementsByTagName('li');
    var arrMapCompetency = []; var nom = 1;
    for (j = 0; j < listsCompetency.length; j++) {
        arrMapCompetency.push({
            SeqNbr: nom,
            TypeReport: $(listsCompetency[j].outerHTML).attr('type'),
            TypeReportDesc: $(listsCompetency[j].outerHTML).attr('desc'),
            GroupNarrativeCode: $(listsCompetency[j].outerHTML).attr('value'),
            GroupNarrativeName: listsCompetency[j].innerText
        });
        nom++;
    }
    //console.log(arrMapCompetency);
    //Array data group narrative data ability
    var itemAbility = document.getElementById('dataAbility');
    var listsAbility = itemAbility.getElementsByTagName('li');
    var arrAbility = []; var nomor = 1;
    for (k = 0; k < listsAbility.length; k++) {
        arrAbility.push({
            SeqNbr: nomor,
            TypeReport: $(listsAbility[k].outerHTML).attr('type'),
            TypeReportDesc: $(listsAbility[k].outerHTML).attr('desc'),
            GroupNarrativeCode: $(listsAbility[k].outerHTML).attr('value'),
            GroupNarrativeName: listsAbility[k].innerText
        });
        nomor++;
        arrMapCompetency.push(arrAbility[k]);
    }
    //console.log(arrMapCompetency);
    //Check Mandatory pada candidate
    for (l = 0; l < arrCandidate.length; l++) {
        if (arrCandidate[l].Field == '' || arrCandidate[l].Value == '') {
            valid = false;
            break;
        } else {
            valid = true;
        }
    }
    if (arrCandidate.length < 1 || valid == false) {
        swal('Failed', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
    } else {
        confirmMessageAdd();
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            $.ajax({
                type: 'POST',
                data: {
                    CandidateInfo: arrCandidate,
                    Psychogram: arrListsCompt,
                    GroupNarrative: arrMapCompetency,
                },
                url: SERVICE_URL + 'api/ConfigLayout/Save',
                headers: { "Authorization-Token": Cookie.load() },
                dataType: 'json',
                success: function (response) {
                    if (response.Acknowledge < 1) {
                        LoadingMask.hide();
                        swal('Failed', 'Please Fill Mandatory!!!', 'warning', { closeOnClickOutside: false });
                    } else {
                        LoadingMask.hide();
                        swal('Good', 'Record has been Saved', 'success', { closeOnClickOutside: false });
                        $('.swal-button--confirm').on('click', function () {
                            window.location.href = DOMAIN_URL + 'Views/OnlineTesting/ConfigLayout/ConfigLayout.html';
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







//$('#ListCompt li').each(function (i) {
//    var index = $(this).index();
//    var text = $(this).text();
//    var value = $(this).attr('value');
//    //var data = [];
//    //    data = [{
//    //    SeqNbr:index+1,
//    //    CompetencyCode: value,
//    //    CompetencyName:text
//    //    }];
//    //    console.log(data);
//});