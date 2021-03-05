$(document).ready(function () {

    var MapCode = GetParameterByName('MapCode');
    loadData(MapCode);
    kendo.bind($('body'), viewModel);
});

loadData = function (data) {
    if (data == '' || data == undefined || data == null) {
        $('input[name=Competency_input]').removeAttr('disabled');
        $('#Competency').removeAttr('disabled');
        //location.reload();
        viewModel.set('title', 'Add Mapping');
        dropDownSubTest();
        dropDownCompetency();
        localStorage.setItem('statusMapping', 'add');
    } else {
        $('#Competency').attr('disabled', true);
        dropDownSubTest();
        localStorage.setItem('statusMapping', 'edit');
        viewModel.set('title', 'Edit Mapping');
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/ReportMapCompetency/Detail',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                MapCompCode: data
            },
            dataType: 'json',
            success: function (response) {
                if (response.Acknowledge < 1) {
                    LoadingMask.hide();
                } else {
                    LoadingMask.hide();
                    viewModel.set('createBy', response.MappingCompetencyDetail.CreateBy);
                    viewModel.set('lastModifiedBy', response.MappingCompetencyDetail.ModifBy);
                    viewModel.set('createOn', response.MappingCompetencyDetail.CreatedTime);
                    viewModel.set('lastModifiedOn', response.MappingCompetencyDetail.ModifiedTime);
                    viewModel.set('MapCompetencyCode', response.MappingCompetencyDetail.MapCompetencyCode);
                    viewModel.set('DisplayStatus', response.MappingCompetencyDetail.DisplayStatus);
                    viewModel.set('Competency', response.MappingCompetencyDetail.CompetencyCode);
                    viewModel.set('SubTestLists', []);

                    viewModel.set('SubTestLists', response.MappingCompetencyDetail.SubTestMappings);
                    if (response.MappingCompetencyDetail.DisplayStatus == true) {
                        $('#DisplayStatus').removeAttr('onchange');
                        $('#DisplayStatus').attr('onchange', 'Display(this)');
                    }
                    else {
                        $('#DisplayStatus').removeAttr('onchange');
                        $('#DisplayStatus').attr('onchange', 'DisplayChecked(this)');
                    }
                    var data = response.MappingCompetencyDetail.SubTestMappings;
                    var length = response.MappingCompetencyDetail.SubTestMappings.length;
                    var tot = 100 / length;
                    var weightNom = tot;
                    var check = weightNom.toString();
                    if (check.length > 4) {
                        weightNom = check.substring(0, 4);
                        viewModel.set('SubTestLists[0].Weight', weightNom + '%');
                        $('#Weight1').val(weightNom + '%');
                    } else {
                        $('#Weight1').val(weightNom + '%');
                        viewModel.set('SubTestLists[0].Weight', weightNom + '%');
                    }
                    for (i = 0; i < response.MappingCompetencyDetail.SubTestMappings.length; i++) {
                        if (i >= 1) {
                            $('#clearSubTest1').attr('hidden', true);
                            var count = i + 1;
                            $('#SubTestLists').append('<tr id="Label' + count + '" class="SubTestList">' +
                                '<td class="noneBorderGrid"><input id="SubTestName' + count + '" name="SubTestName' + count + '" data-role="combobox" value="' + data[count - 1].SubTestCode + '" style="width:100%;"/></td>' +
                                '<td class="noneBorderGrid"><input type="text" id="Symbol' + count + '" placeholder="SYM" name="Symbol' + count + '"  class="k-textbox" value="' + data[count - 1].Symbol + '" style="width:100%;"/></td>' +
                                '<td><input type="number" name="no1' + count + '" class="k-textbox formTable" id="no1' + count + '" value="' + data[count - 1].V1 + '"/></td>' +
                                '<td><input type="number" name="no2' + count + '" class="k-textbox formTable" id="no2' + count + '" value="' + data[count - 1].V2 + '"/></td>' +
                                '<td><input type="number" name="no3' + count + '" class="k-textbox formTable" id="no3' + count + '" value="' + data[count - 1].V3 + '"/></td>' +
                                '<td><input type="number" name="no4' + count + '" class="k-textbox formTable" id="no4' + count + '" value="' + data[count - 1].V4 + '"/></td>' +
                                '<td><input type="number" name="no5' + count + '" class="k-textbox formTable" id="no5' + count + '" value="' + data[count - 1].V5 + '"/></td>' +
                                '<td><input type="number" name="no6' + count + '" class="k-textbox formTable" id="no6' + count + '" value="' + data[count - 1].V6 + '"/></td>' +
                                '<td><input type="number" name="no7' + count + '" class="k-textbox formTable" id="no7' + count + '" value="' + data[count - 1].V7 + '"/></td>' +
                                '<td><input type="number" name="no8' + count + '" class="k-textbox formTable" id="no8' + count + '" value="' + data[count - 1].V8 + '"/></td>' +
                                '<td><input type="number" name="no9' + count + '" class="k-textbox formTable" id="no9' + count + '" value="' + data[count - 1].V9 + '"/></td>' +
                                '<td><input type="number" name="no10' + count + '" class="k-textbox formTable" id="no10' + count + '" value="' + data[count - 1].V10 + '"/></td>' +
                                '<td class="noneBorderGrid"><input type="text" id="Weight' + count + '" name="Weight' + count + '" style="width:100%;" value="' + weightNom + '%" disabled="disabled"/></td>' +
                                '<td class="noneBorderGrid"><a href="#" id="clearSubTest' + count + '" no="' + count + '" onclick="clearSubTest(this)" hidden="hidden"><i class="fas fa-trash-alt"></i></a></td>' +
                                '</tr>');
                            onloadDropDownSubTest(count);
                        }
                    }
                    var length = $('.SubTestList').length;
                    var no = parseInt(length);
                    $('#addSubTest').removeAttr('no');
                    $('#addSubTest').attr('no', no);
                    if (no > 1) {
                        $('#clearSubTest' + length).removeAttr('hidden');
                    }

                    dropDownCompetency();

                }
            },
            error: function (x, e) {
                alert('error ajax');
            }
        });
    }
}
dropDownCompetency = function () {
    var status = localStorage.getItem('statusMapping');
    if (status == 'edit') {
        $('#Competency').kendoComboBox({
            placeholder: 'Select Competency...',
            dataSource: viewModels.CategoryMapCompetency,
            dataTextField: 'Value',
            dataValueField: 'Code',
            enable: false
        });
    } else {
        $('#Competency').kendoComboBox({
            placeholder: 'Select Competency...',
            dataSource: viewModels.CategoryMapCompetency,
            dataTextField: 'Value',
            dataValueField: 'Code'
        });
    }
}
dropDownSubTest = function () {
    $('#SubTestName1').kendoComboBox({
        placeholder: 'Select SubTest...',
        dataSource: viewModels.CategoryDataSubTest,
        dataTextField: 'Value',
        dataValueField: 'Code'
    });
}
addSubTest = function (data) {
    var nomor = $(data).attr('no');
    var count = parseInt(nomor) + 1;
    $('#clearSubTest' + nomor).attr('hidden', true);
    var SubTestLists = viewModel.SubTestLists;
    var SubTest = [{ SubTestCode: '', Symbol: '', V1: null, V2: null, V3: null, V4: null, V5: null, V6: null, V7: null, V8: null, V9: null, V10: null, }];
    SubTestLists.push(SubTest[0]);
    var weight = 100;
    if (count > 1) {
        for (i = 1; i < count; i++) {
            weight = 100 / count;
            var check = weight.toString();
            if (check.length > 4) {
                weight = check.substring(0, 4);
                $('#Weight' + i).val(weight + '%');
                viewModel.set('SubTestLists[0].Weight', weight + '%');
            } else {
                $('#Weight' + i).val(check + '%');
                viewModel.set('SubTestLists[0].Weight', weight + '%');
            }
        }
    }
    $('#SubTestLists').append('<tr id="Label' + count + '" class="SubTestList">' +
        '<td class="noneBorderGrid"><input id="SubTestName' + count + '" name="SubTestName' + count + '" data-role="combobox" data-bind="value:SubTestLists[' + (count - 1) + '].SubTestCode" style="width:100%;"/></td>' +
        '<td class="noneBorderGrid"><input type="text" id="Symbol' + count + '" placeholder="SYM" name="Symbol' + count + '"  class="k-textbox" data-bind="value:SubTestLists[' + (count - 1) + '].Symbol" style="width:100%;"/></td>' +
        '<td><input type="number" name="no1' + count + '" class="k-textbox formTable" id="no1' + count + '" data-bind="value:SubTestLists[' + (count - 1) + '].V1"/></td>' +
        '<td><input type="number" name="no2' + count + '" class="k-textbox formTable" id="no2' + count + '" data-bind="value:SubTestLists[' + (count - 1) + '].V2"/></td>' +
        '<td><input type="number" name="no3' + count + '" class="k-textbox formTable" id="no3' + count + '" data-bind="value:SubTestLists[' + (count - 1) + '].V3"/></td>' +
        '<td><input type="number" name="no4' + count + '" class="k-textbox formTable" id="no4' + count + '" data-bind="value:SubTestLists[' + (count - 1) + '].V4"/></td>' +
        '<td><input type="number" name="no5' + count + '" class="k-textbox formTable" id="no5' + count + '" data-bind="value:SubTestLists[' + (count - 1) + '].V5"/></td>' +
        '<td><input type="number" name="no6' + count + '" class="k-textbox formTable" id="no6' + count + '" data-bind="value:SubTestLists[' + (count - 1) + '].V6"/></td>' +
        '<td><input type="number" name="no7' + count + '" class="k-textbox formTable" id="no7' + count + '" data-bind="value:SubTestLists[' + (count - 1) + '].V7"/></td>' +
        '<td><input type="number" name="no8' + count + '" class="k-textbox formTable" id="no8' + count + '" data-bind="value:SubTestLists[' + (count - 1) + '].V8"/></td>' +
        '<td><input type="number" name="no9' + count + '" class="k-textbox formTable" id="no9' + count + '" data-bind="value:SubTestLists[' + (count - 1) + '].V9"/></td>' +
        '<td><input type="number" name="no10' + count + '" class="k-textbox formTable" id="no10' + count + '" data-bind="value:SubTestLists[' + (count - 1) + '].V10"/></td>' +
        '<td class="noneBorderGrid"><input type="text" id="Weight' + count + '" name="Weight' + count + '" style="width:100%;" value="' + weight + '%" disabled="disabled"/></td>' +
        '<td class="noneBorderGrid"><a href="#" id="clearSubTest' + count + '" no="' + count + '" onclick="clearSubTest(this)"><i class="fas fa-trash-alt"></i></a></td>' +
        '</tr>');
    onloadDropDownSubTest(count);
    $(data).removeAttr('no');
    $(data).attr('no', count);
}
onloadDropDownSubTest = function (count) {
    $('#SubTestName' + count).kendoComboBox({
        placeholder: 'Select SubTest...',
        dataSource: viewModels.CategoryDataSubTest,
        dataTextField: 'Value',
        dataValueField: 'Code'
    });
}
clearSubTest = function (data) {
    var nomor = $(data).attr('no');
    var no = parseInt(nomor);
    var count = no - 1;

    /*remove arrar*/
    var source = viewModel.SubTestLists;
    var sourceLength = source.length;
    source = source.slice(0);
    source.splice(sourceLength - 1, 1);

    viewModel.set('SubTestLists', source);

    $('#Label' + no).remove();
    $('#clearSubTest' + count).removeAttr('hidden');
    $('#addSubTest').removeAttr('no');
    $('#addSubTest').attr('no', count);
    var dataCount = $('.SubTestList').length;
    if (dataCount > 1) {
        for (i = 1; i <= dataCount; i++) {
            weight = 100 / count;
            var check = weight.toString();
            if (check.length > 4) {
                weight = check.substring(0, 4);
                $('#Weight' + i).val(weight + '%');
            } else {
                $('#Weight' + i).val(check + '%');
            }
        }
    } else {
        $('#Weight1').val('100%');
    }
}
