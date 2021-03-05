var viewModel = kendo.observable({
    title: '',
    createBy: '',
    lastModifiedBy: '',
    createOn: '',
    lastModifiedOn: '',
    MapCompetencyCode: '',
    DisplayStatus: true,
    duplicate: true,
    Competency: '',
    Weight: '100%',
    SubTestLists: [{
        SubTestCode: '',
        Symbol: '',
        Weight: '100%',
        V1: null, V2: null, V3: null, V4: null, V5: null, V6: null, V7: null, V8: null, V9: null, V10: null,
    }],
    cancel: function () {
        confirmMessageCancel();
        $('.swal-button--danger').on('click', function () {
            window.location.href = DOMAIN_URL + 'Views/OnlineTesting/MappingCompetency/MappingCompetency.html';
        });
    },
    save: function () {
        save();
    }
});
save = function () {
    viewModel.set('duplicate', true);
    var SubTestLists = viewModel.SubTestLists;
    var length = $('.SubTestList').length;
    var listV = [];
    var valid = true; var mandatory = true; var moreThan = true;
    var kl = 0;
    //alert(length);
    //var VData = [];
    for (i = 0; i < length; i++) {
        var data = $('#Symbol' + (i + 1)).val();
        var datas = $('#SubTestName' + (i + 1)).val();
        var dataWeight = $('#Weight' + (i + 1)).val();
        if (data == '' || datas == '') {
            mandatory = false;
            break;
        }
        else {
            mandatory = true;
            viewModel.set('SubTestLists[' + i + '].Symbol', data);
            viewModel.set('SubTestLists[' + i + '].SubTestCode', datas);
            viewModel.set('SubTestLists[' + i + '].Weight', dataWeight);
            for (k = 1; k <= 10; k++) {
                var dataV = $('#no' + k + '' + (i + 1)).val();

                if (dataV < 0 || dataV > 5) {
                    valid = false;
                    break;
                }
                else if (dataV == '') {
                    valid = false;
                    break;
                }
                else {
                    viewModel.set('SubTestLists[' + i + '].V' + k + '', dataV);
                }

            }
        }
        //var V1 = $('#no1' + (i + 1)).val();
        //viewModel.set('SubTestLists[' + i + '].V1', V1);
        //var V10 = $('#no1' + (i + 1)).val();
        //viewModel.set('SubTestLists[' + i + '].V10', V10);

    }
    //alert(mandatory);
    //console.log(VData);
    var ListOfAll = [];
    //console.log(viewModel.SubTestLists);
    var Sym = true;
    var lengthSubTest = viewModel.SubTestLists.length;
    for (j = 0; j < lengthSubTest; j++) {
        if (viewModel.SubTestLists[j].Symbol.length > 3) {
            Sym = false;
            break;
        }
        else if (viewModel.SubTestLists[j].Symbol != '' || viewModel.SubTestLists[j].SubTestCode != '') {
            Sym = true;
            ListOfAll.push({
                SubTestCode: viewModel.SubTestLists[j].SubTestCode,
                Symbol: viewModel.SubTestLists[j].Symbol,
                //Weight: viewModel.SubTestLists[j].Weight,
                V1: parseInt(viewModel.SubTestLists[j].V1),
                V2: parseInt(viewModel.SubTestLists[j].V2),
                V3: parseInt(viewModel.SubTestLists[j].V3),
                V4: parseInt(viewModel.SubTestLists[j].V4),
                V5: parseInt(viewModel.SubTestLists[j].V5),
                V6: parseInt(viewModel.SubTestLists[j].V6),
                V7: parseInt(viewModel.SubTestLists[j].V7),
                V8: parseInt(viewModel.SubTestLists[j].V8),
                V9: parseInt(viewModel.SubTestLists[j].V9),
                V10: parseInt(viewModel.SubTestLists[j].V10),
            });
        }
    }
    // check duplicate data atau value lebih besar dari nilai value sesudahnya.
    for (ll = 0; ll < ListOfAll.length; ll++) {
        if (ListOfAll[ll].V1 > ListOfAll[ll].V2 || ListOfAll[ll].V2 > ListOfAll[ll].V3 || ListOfAll[ll].V3 > ListOfAll[ll].V4 || ListOfAll[ll].V4 > ListOfAll[ll].V5 || ListOfAll[ll].V5 > ListOfAll[ll].V6 || ListOfAll[ll].V6 > ListOfAll[ll].V7 || ListOfAll[ll].V7 > ListOfAll[ll].V8 || ListOfAll[ll].V8 > ListOfAll[ll].V9 || ListOfAll[ll].V9 > ListOfAll[ll].V10) {
            moreThan = false;
            break;
        }
        else {
            moreThan = true;
        }
    }
    var duplicate = true;
    var duplicate = true;
    for (ik = 0; ik < ListOfAll.length; ik++) {
        for (ij = ik; ij < ListOfAll.length; ij++) {
            if (ik != ij) {
                if (ListOfAll[ik].SubTestCode == ListOfAll[ij].SubTestCode) {
                    viewModel.set('duplicate', false);
                    break;
                }
            }
        }
    }
    //alert(viewModel.duplicate);
    //console.log(ListOfAll);
    if (viewModel.duplicate == false) {
        swal('Failed', 'Subtest are duplicated !!!', 'warning', { closeOnClickOutside: false });
    } else {
        if (valid == false || Sym == false || moreThan == false) {

            if (!valid) {
                swal('Failed', 'Config value must be range 1 to 5 !', 'warning', { closeOnClickOutside: false });
                return;
            }

            if (!Sym) {
                swal('Failed', 'Symbol more than 3 Words!', 'warning', { closeOnClickOutside: false });
                return;
            }

            if (!moreThan) {
                swal('Failed', 'Config value must be more than the previous value!', 'warning', { closeOnClickOutside: false });
                return;
            }
        } else {
            if (viewModel.Competency == '' || mandatory == false) {
                swal('Failed', 'Please fill mandatory field!!!', 'warning', { closeOnClickOutside: false });
            } else {
                if (ListOfAll.length < 2) {
                    swal('Failed', 'Mapping competency must be more than 2 datas!!!', 'warning', { closeOnClickOutside: false });
                    return false;
                }
                if (viewModel.MapCompetencyCode == '') {
                    confirmMessageAdd();
                    $('.swal-button--defeat').on('click', function () {
                        LoadingMask.show();
                        $.ajax({
                            type: "POST",
                            url: SERVICE_URL + "api/ReportMapCompetency/Add",
                            headers: { "Authorization-Token": Cookie.load() },
                            data: {
                                CompCode: viewModel.Competency,
                                DisplayStatus: viewModel.DisplayStatus,
                                SubTestMapping: ListOfAll
                            },
                            success: function (response) {
                                //console.log(response);
                                if (response.Acknowledge < 1) {
                                    LoadingMask.hide();
                                    swal("Failed", response.Message, "warning", { closeOnClickOutside: false });
                                }
                                else {
                                    LoadingMask.hide();
                                    swal("Good", "Record Has Been Saved", "success", { closeOnClickOutside: false });
                                    $('.swal-button--confirm').on('click', function () {
                                        window.location.href = DOMAIN_URL + "Views/OnlineTesting/MappingCompetency/MappingCompetency.html";
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
                    confirmMessageAdd();
                    $('.swal-button--defeat').on('click', function () {
                        LoadingMask.show();
                        $.ajax({
                            type: "POST",
                            url: SERVICE_URL + "api/ReportMapCompetency/Edit",
                            headers: { "Authorization-Token": Cookie.load() },
                            data: {
                                MappingCode: viewModel.MapCompetencyCode,
                                CompCode: viewModel.Competency,
                                DisplayStatus: viewModel.DisplayStatus,
                                SubTestMapping: ListOfAll
                            },
                            success: function (response) {
                                //console.log(response);
                                if (response.Acknowledge < 1) {
                                    LoadingMask.hide();
                                    swal("Failed", response.Message, "warning", { closeOnClickOutside: false });
                                }
                                else {
                                    LoadingMask.hide();
                                    swal("Good", "Record Has Been Edited", "success", { closeOnClickOutside: false });
                                    $('.swal-button--confirm').on('click', function () {
                                        window.location.href = DOMAIN_URL + "Views/OnlineTesting/MappingCompetency/MappingCompetency.html";
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
    }
}