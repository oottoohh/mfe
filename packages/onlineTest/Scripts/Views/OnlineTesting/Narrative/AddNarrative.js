$(document).ready(function () {
    var data = {
        NarrativeCode: GetParameterByName('NarrativeCode'),
        NarrativeType: GetParameterByName('Type')
    }    
    dropdown(data.NarrativeType);
    loadData(data);
    if (data.NarrativeType == "subtest" || data.NarrativeType == "SUBTEST") {
        $("#gridDataMappingSubtest").kendoGrid();
    } else if (data.NarrativeType == "iq" || data.NarrativeType == "IQ") {
        $("#gridDataMappingIQ").kendoGrid();
    } else {
        $("#gridDataMappingSubtest").hide();
        $("#gridDataMappingIQ").hide();
    }
    kendo.bind($('body'), viewModel);
});
dropdown = function (NarrativeType) {
    $("#TestToolNarrative").kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModels.TestToolList,
        change: onChangeTestTool,
    });
    $("#TypeNarrative").kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModels.CategoryDataNarrType,
    });
    if (NarrativeType == "subtest" || NarrativeType == "SUBTEST") {
        $("#MappingReport").kendoMultiSelect({
            dataTextField: "Value",
            dataValueField: "Code",
            dataSource: viewModels.CategoryMappingReportList,
        });
    } else if (NarrativeType == "iq" || NarrativeType == "IQ") {
        $("#MappingReport").kendoMultiSelect({
            dataTextField: "Value",
            dataValueField: "Code",
            dataSource: viewModel.CategoryMappingReportListIQ,
        });
    } else {
        $("#MappingReport").kendoMultiSelect({
            dataTextField: "Value",
            dataValueField: "Code",
            dataSource: viewModel.CategoryMappingReportListValidityScale,
        });
    }
}
onChangeTestTool = function (e) {
    debugger
    var valTestTool = e.sender._selectedValue;
    viewModel.set("TestToolCode", valTestTool);
    $('#SubTestName').data('kendoComboBox').setDataSource([]);
    $('#TypeNarrative').data('kendoComboBox').setDataSource([]);
    SubTestByTestTool();
    
}
displayFieldForm = function (type) {
    if (type == "subtest" || type == "SUBTEST") {
        $('#subtest-column').show();
        $('#iqvalidity-column').hide();
        $('#subtest-field').show();
        $('#IQ-field').hide();
        $('#validityScale-field').hide();
        $('.input-testtool').show();
        $('.input-mappingreport').hide();
        $('.subtest-dropdownList').show();
        $('#subtestTable').show();
        $('#iqTable').hide();
    } else if (type == "IQ") {
        $('#subtest-column').hide();
        $('#iqvalidity-column').show();
        $('#subtest-field').hide();
        $('#IQ-field').show();
        $('#validityScale-field').hide();
        $('.input-testtool').hide();
        $('.input-mappingreport').show();
        $('.subtest-dropdownList').hide();
        $('#iqTable').show();
        $('#subtestTable').hide();
    } else if (type == "VALIDITYSCALE") {
        $('#subtest-column').hide();
        $('#iqvalidity-column').show();
        $('#subtest-field').hide();
        $('#IQ-field').hide();
        $('#validityScale-field').show();
        $('#AddScore').hide();
        $('.input-testtool').hide();
        $('.input-mappingreport').show();
        $('.subtest-dropdownList').hide();        
    } else {
        swal('Info', 'Narrative type not found', 'info', { closeOnClickOutside: false });
    }
}
loadData = function (data) {
    if (data.NarrativeCode == '' || data.NarrativeCode == undefined || data.NarrativeCode == null) {
        viewModel.set('title', 'Add Narrative');
        $('#SubTestName').removeAttr('readonly');
        dropDownSubTest();
        var dtType = viewModels.CategoryDataNarrType._data.indexOf(viewModels.CategoryDataNarrType._data.filter(function (item) {
            return item.Code == data.NarrativeType.toUpperCase()
        })[0]);

        $('#TypeNarrative').data("kendoComboBox").select(dtType);
        viewModel.set("TypeNarrative", viewModels.CategoryDataNarrType._data[dtType].Value);
        $("#TypeNarrative").kendoComboBox({ enable: false });
        displayFieldForm(data.NarrativeType);
    } else {

        var dtType = viewModels.CategoryDataNarrType._data.indexOf(viewModels.CategoryDataNarrType._data.filter(function (item) {
            return item.Code == data.NarrativeType.toUpperCase()
        })[0]);

        $('#TypeNarrative').data("kendoComboBox").select(dtType);
        viewModel.set("TypeNarrative", viewModels.CategoryDataNarrType._data[dtType].Value);
        $("#TypeNarrative").kendoComboBox({ enable: false });
        displayFieldForm(data.NarrativeType);
        viewModel.set('title', 'Edit Narrative');
        var typeNarr = GetParameterByName('TypeEdit');
        
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/Narrative/Detail',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                NarrativeCode: data.NarrativeCode
            },
            dataType: 'json',
            success: function (response) {
                if (response.Acknowledge < 1) {
                    LoadingMask.hide();
                } else {
                    LoadingMask.hide();                    
                    viewModel.set('createBy', response.Detail.CreateBy);
                    viewModel.set('lastModifiedBy', response.Detail.ModifBy);
                    viewModel.set('createOn', response.Detail.CreatedTime);
                    viewModel.set('lastModifiedOn', response.Detail.ModifiedTime);
                    viewModel.set('Code', response.Detail.NarrativeCode);
                    viewModel.set('SubTestName', response.Detail.SubTestName);
                    viewModel.set('DisplayStatus', response.Detail.DisplayStatus);
                    viewModel.set('NarrativeTitle', response.Detail.Title);
                                     
                    $("#MappingReport").data("kendoMultiSelect").value(response.Detail.MappingReportTypes);
                    viewModel.set('MappingReport', response.Detail.MappingReportTypes);
                    $('#TypeNarrative').attr('readonly', false);
                    var TypeNarrative = response.Detail.NarrativeTypeCode;
                    var lengthNarrativeType = TypeNarrative == "SUBTEST" ? response.Detail.ListNarrativeSubTest.length : TypeNarrative == "IQ" ? response.Detail.ListNarrativeIQ.length : TypeNarrative == "VALIDITYSCALE" ? response.Detail.ListNarrativeValidityScale.length : ""
                    for (i = 0; i < lengthNarrativeType; i++) {
                        var no = i + 1;                        
                        if (TypeNarrative == "SUBTEST") {
                            viewModel.set('ListNarrativeSubTest', response.Detail.ListNarrativeSubTest); 
                            var testTooldt = {
                                Code: response.Detail.TestToolCode,
                                Value: response.Detail.TestToolName
                            }
                            $('#TestToolNarrative').data("kendoComboBox").value(response.Detail.TestToolName);
                            viewModel.set('TestToolNarrative', testTooldt);
                            SubTestByTestTool(true);
                            var rows = `<tr id="${response.Detail.ListNarrativeSubTest[i].Score}">
                                            <td class="narrativeText" style="width:6%;">${response.Detail.ListNarrativeSubTest[i].Score}</td>
                                            <td class="narrativeText">${response.Detail.ListNarrativeSubTest[i].LongNarrative}</td>
                                            <td class="narrativeText">${response.Detail.ListNarrativeSubTest[i].ShortNarrative}</td>
                                            <td class="narrativeText">${response.Detail.ListNarrativeSubTest[i].StrengthNarrative}</td>
                                            <td class="narrativeText">${response.Detail.ListNarrativeSubTest[i].DevelopmentAreaNarrative}</td>
                                            <td style="text-align:center;">
                                                <button id="btnedit`+ response.Detail.ListNarrativeSubTest[i].Score + `" class="k-button btn-form k-primary" onclick="editRow(${response.Detail.ListNarrativeSubTest[i].Score})" style="width:10px;"><i class="fas fa fa-edit"></i></button>
                                                <button id="btndelete`+ response.Detail.ListNarrativeSubTest[i].Score + `" class="k-button btn-form k-danger" onclick="deleteRow(${response.Detail.ListNarrativeSubTest[i].Score})" style="width:10px;"><i class="fas fa fa-trash"></i></button>                        
                                            </td>
                                        </tr>`;
                            $("#gridDataMappingSubtest tbody").append(rows);
                            $('#btndelete' + (no - 1)).hide();
                            //$('#btnedit' + (no - 1)).hide();
                        } else if (TypeNarrative == "IQ") {
                            viewModel.set('ListNarrativeSubTest', response.Detail.ListNarrativeIQ);
                            var rows = `<tr id="${response.Detail.ListNarrativeIQ[i].Score}">
                                            <td class="narrativeText" style="width:6%;">${response.Detail.ListNarrativeIQ[i].Score}</td>
                                            <td class="narrativeText">${response.Detail.ListNarrativeIQ[i].Narrative}</td>
                                            <td style="text-align:center;">
                                                <button id="btnedit`+ response.Detail.ListNarrativeIQ[i].Score + `" class="k-button btn-form k-primary" onclick="editRow(${response.Detail.ListNarrativeIQ[i].Score})" style="width:10px;"><i class="fas fa fa-edit"></i></button>
                                                <button id="btndelete`+ response.Detail.ListNarrativeIQ[i].Score + `" class="k-button btn-form k-danger" onclick="deleteRow(${response.Detail.ListNarrativeIQ[i].Score})" style="width:10px;"><i class="fas fa fa-trash"></i></button>                        
                                            </td>
                                        </tr>`;
                            $("#gridDataMappingIQ tbody").append(rows);
                            $('#btndelete' + (no - 1)).hide();
                            //$('#btnedit' + (no - 1)).hide();
                        } else if (TypeNarrative == "VALIDITYSCALE") {
                            viewModel.set('ListNarrativeSubTest', response.Detail.ListNarrativeValidityScale);
                            $('#NarrativeValidityScale' + no).val(response.Detail.ListNarrativeValidityScale[i].Narrative);
                        } else {
                            alert("Type Narrative not Found")
                        }
                    }
                    var length = TypeNarrative == "SUBTEST" ? $('.NarrativeField').length : TypeNarrative == "IQ" ? $('.NarrativeField-IQ').length : TypeNarrative == "VALIDITYSCALE" ? $('.NarrativeValidityScale').length : ""
                    $('#AddScore').removeAttr('no');
                    $('#AddScore').attr('no', length);

                    //$('#clearNarrative' + length).removeAttr('hidden');                    
                }
            },
            error: function (x, e) {
                alert('error ajax');
            }
        });
    }
}
dropDownSubTest = function (value) {
    $('#SubTestName').kendoComboBox({
        autoBind: true,
        placeholder: 'Select Type',
        dataSource: viewModel.SubTestList,
        dataTextField: 'Value',
        dataValueField: 'Code'
    });
    debugger
    if (viewModel.SubTestName == undefined) {
        $('#SubTestName').data("kendoComboBox").value("");
    } else {
        $('#SubTestName').data("kendoComboBox").select(viewModel.SubTestName);
    }
}
AddScore = function (data) {

    var typeNarrative = GetParameterByName('Type');
    var no = $(data).attr('no') == undefined ? data : $(data).attr('no');
    var nomor = parseInt(no) + 1;
    $('#clearNarrative' + (nomor - 1)).attr('hidden', true);
    var str = getStringForm(typeNarrative, nomor);    
    $('#Scores').append(str);
    $(data).removeAttr('no');
    $(data).attr('no', nomor);
}
clearNarrative = function (data) {
    var nomor = $(data).attr('no');
    nomor = parseInt(nomor);
    $('#label' + nomor).remove();
    $('#clearNarrative' + (nomor - 1)).removeAttr('hidden');
    $('#AddScore').removeAttr('no');
    $('#AddScore').attr('no', nomor - 1);
}

function getStringForm(typeNarrative, nomor) {
    var str;
    if (typeNarrative == "subtest" || typeNarrative == "SUBTEST") {
        str = `<div class="row NarrativeField" id="label` + nomor + `" style="text-align:center;margin-top:15px;">
                <div class="col-xs-2">
                    <input type="number" class="k-textbox" id="Score`+ nomor + `" name="Score` + nomor + `" value="` + nomor + `" style="width:40%" readonly="readonly" />
                </div>
                <div class="col-xs-2">
                    <textarea id="NarrativeLong`+ nomor + ` char-textarea` + nomor + `" class="k-textbox" maxlength="2000" name="NarrativeLong` + nomor + `" data-bind="value:Narrative[` + nomor + `].NarrativeLong` + nomor + `" style="width:70%"></textarea>
                    Remaining chars: <span id="remainingChars`+ nomor + `" style="font-size:8pt; font-weight:bold;"></span>                
                </div>
                <div class="col-xs-2">
                    <textarea id="NarrativeShort`+ nomor + `" class="k-textbox char-textarea" maxlength="2000" name="NarrativeShort` + nomor + `" data-bind="value:Narrative[` + nomor + `].NarrativeShort` + nomor + `" style="width:70%"></textarea>
                    Remaining chars: <span class="remainingChars" style="font-size:8pt; font-weight:bold;"></span>
                </div>
                <div class="col-xs-2">
                    <textarea id="NarrativeStrength`+ nomor + `" class="k-textbox char-textarea" maxlength="2000" name="NarrativeStrength` + nomor + `" data-bind="value:Narrative[` + nomor + `].NarrativeStrength` + nomor + `" style="width:70%"></textarea>
                    Remaining chars: <span class="remainingChars" style="font-size:8pt; font-weight:bold;"></span>
                </div>
                <div class="col-xs-2">
                    <textarea id="NarrativeDevArea`+ nomor + `" class="k-textbox char-textarea" maxlength="2000" name="Narrative1DevArea` + nomor + `" data-bind="value:Narrative[` + nomor + `].Narrative1DevArea` + nomor + `" style="width:70%"></textarea>
                    Remaining chars: <span class="remainingChars" style="font-size:8pt; font-weight:bold;"></span>
                </div>
                <a href="#" id="clearNarrative` + nomor + `" no="` + nomor + `" style="padding-left:4px;" onclick="clearNarrative(this)"><i class="fas fa-trash-alt"></i></a>    
                </div>`;
    } else if (typeNarrative == "IQ") {
        str = `<div class="row NarrativeField-IQ" id="label` + nomor + `" style="text-align:center;margin-top:15px;">
               <div class="col-xs-2">
                <input type="number" class="k-textbox char-textarea" maxlength="2000" id="Score`+ nomor + `" name="Score` + nomor + `" value="` + nomor + `" style="width:40%" readonly="readonly" />
                    Remaining chars: <span class="remainingChars" style="font-size:8pt; font-weight:bold;"></span>
                </div>
               <div class="col-xs-8">
                <textarea id="NarrativeIQ`+ nomor + `" class="k-textbox char-textarea" maxlength="2000" name="NarrativeIQ` + nomor + `" style="width:70%"></textarea>
                    Remaining chars: <span class="remainingChars" style="font-size:8pt; font-weight:bold;"></span>
                </div>
               <a href="#" id="clearNarrative` + nomor + `" no="` + nomor + `" style="padding-left:4px;" onclick="clearNarrative(this)"><i class="fas fa-trash-alt"></i></a>    
               </div>`;
    } else {
        str = "";
    }
    return str;
}
function addListNarrative(e) {
    $('#btnSave').prop('disabled', false);
    $('#btnSave').css('background', '#367fbd');
    $('#btnSave').css('border-color', '#367fbd');
    var ListNarrativeSubTest = viewModel.ListNarrativeSubTest;
    var NarrLong = $('#NarrativeLong1').val();
    var NarrShort = $('#NarrativeShort1').val();
    var StrengthNarr = $('#NarrativeStrength1').val();
    var DevNarr = $('#NarrativeDevArea1').val()
    var NarrativeTitle = viewModel.NarrativeTitle;
    var TypeNarrative = $.grep(viewModels.CategoryDataNarrType._data, function (element, index) {
        return element.Value == viewModel.TypeNarrative;
    });
    var Score = $("#Score1").val() == "" ? viewModel.ListNarrativeSubTest.toJSON().slice(-1).pop() == undefined ? 1 : viewModel.ListNarrativeSubTest.toJSON().slice(-1).pop().Score + 1 : parseInt($("#Score1").val());
    if (TypeNarrative[0].Code == "SUBTEST") {        
        if (NarrLong != 0 && NarrShort != 0) {
            var tempData = {
                "Score": Score,
                "LongNarrative": NarrLong,
                "ShortNarrative": NarrShort,
                "StrengthNarrative": StrengthNarr,
                "DevelopmentAreaNarrative": DevNarr
            }
            ListNarrativeSubTest.push(tempData);
            var dt = viewModel.ListNarrativeSubTest.toJSON().sort(function (a, b) {
                return parseFloat(a.Score) - parseFloat(b.Score);
            });
            viewModel.set('ListNarrativeSubTest', dt);
            var rows = `<tr id="${Score}">
                    <td class="narrativeText" style="width: 6%;">${Score}</td>
                    <td class="narrativeText">${NarrLong}</td>
                    <td class="narrativeText">${NarrShort}</td>
                    <td class="narrativeText">${StrengthNarr}</td>
                    <td class="narrativeText">${DevNarr}</td>
                    <td style="text-align:center;">
                        <button id="btnedit`+ Score + `" class="k-button btn-form k-primary" onclick="editRow(${Score})" style="width:10px;"><i class="fas fa fa-edit"></i></button>
                        <button id="btndelete`+ Score + `" class="k-button btn-form k-danger" onclick="deleteRow(${Score})" style="width:10px;"><i class="fas fa fa-trash"></i></button>                        
                    </td>
                </tr>`;
           
            $("#gridDataMappingSubtest tbody").append(rows);
            var selectBtnDelete = $("#Score1").val() == "" ? (Score - 1) : $("#Score1").val();
            if (viewModel.ListNarrativeSubTest.toJSON().slice(-1).pop().Score !== parseInt(selectBtnDelete)) {
                $('#btndelete' + selectBtnDelete).hide();
            }        
            //$('#btnedit' + (Score - 1)).hide();
            $('#NarrativeLong1').val("");
            $('#NarrativeShort1').val("");
            $('#NarrativeStrength1').val("");
            $('#NarrativeDevArea1').val("");
            $("#Score1").val("");
        } else {
            swal("Invalid", "Narrative long or short is empty", "info", { closeOnClickOutside: false });
        }
        
    } else {
        var NarrTxt = TypeNarrative[0].Code == "IQ" ? $('#NarrativeIQ1').val() : $('#NarrativeValidityScale1').val();
        if (NarrTxt != 0) {
            var tempData = {
                "Score": Score,
                "Narrative": NarrTxt,
            }
            ListNarrativeSubTest.push(tempData);
            var dt = viewModel.ListNarrativeSubTest.toJSON().sort(function (a, b) {
                return parseFloat(a.Score) - parseFloat(b.Score);
            });
            viewModel.set('ListNarrativeSubTest', dt);
            var rows = `<tr id="${Score}">
                    <td class="narrativeText" style="width: 6%;">${Score}</td>
                    <td class="narrativeText">${$('#NarrativeIQ1').val()}</td>
                    <td style="text-align:center;">
                        <button id="btnedit`+ Score + `" class="k-button btn-form k-primary" onclick="editRow(${Score})" style="width:10px;"><i class="fas fa fa-edit"></i></button>
                        <button id="btndelete`+ Score + `" class="k-button btn-form k-danger" onclick="deleteRow(${Score})" style="width:10px;"><i class="fas fa fa-trash"></i></button>                        
                    </td>
                </tr>`;
            $("#gridDataMappingIQ tbody").append(rows);
            var selectBtnDelete = $("#Score1").val() == "" ? (Score - 1) : $("#Score1").val();            
            if (viewModel.ListNarrativeSubTest.toJSON().slice(-1).pop().Score !== parseInt(selectBtnDelete)) {
                $('#btndelete' + selectBtnDelete).hide();
            }    
            //$('#btnedit' + (Score - 1)).hide();
            $('#NarrativeIQ1').val("");
            $("#Score1").val("");
        } else {
            swal("Invalid", "Narrative is empty", "info", { closeOnClickOutside: false });
        }
    }
}

SubTestByTestTool = function (fromDetail) {
    var TestToolCode = viewModel.TestToolNarrative.Code;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/SubTestMappingByTestTool",
        headers: { "Authorization-Token": Cookie.load() },
        data: {
            TestToolCode: TestToolCode
        },
        success: function (response) {
            if (response.Data.length == 0) {
                swal("Failed", "Sub Test Not Found!!!", "warning", { closeOnClickOutside: false });
                viewModel.set('SubTestList', null);
                //viewModel.set('TestTypeName', ''); viewModel.set('TestTypeCode', '');
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTestName', '');
            } else if (TestToolCode == '') {
                //swal("Failed", "Sub Test Not Found!!!", "warning");
                viewModel.set('SubTestList', null);
                viewModel.set('TestToolName', '');
                viewModel.set('TestToolCode', '');
                viewModel.set('SubTestCode', '');
                viewModel.set('SubTestName', '');
            } else {
                for (jk = 0; jk < response.Data.length; jk++) {
                    viewModel.set('SubTestList', response.Data);                    
                    dropDownSubTest();
                }
            }

            if (!fromDetail) {
                $('#SubTestName').data('kendoComboBox').value("");
            }
        }
    });
}
function editRow(Code) {
    $('#btnSave').prop('disabled', true);
    $('#btnSave').css('background', '#1716164a');
    $('#btnSave').css('border-color', '#1716164a');

    var type = GetParameterByName('Type');    
    $('#' + Code).remove();
    var getItem = jQuery.grep(viewModel.ListNarrativeSubTest, function (value) {
        return value.Score == Code;
    });
    var updateArr = jQuery.grep(viewModel.ListNarrativeSubTest, function (value) {
        return value.Score != Code;
    });
    if (type == "SUBTEST" || type == "subtest") {
    $("#Score1").val(getItem[0].Score);
    $('#NarrativeLong1').val(getItem[0].LongNarrative);
    $('#NarrativeShort1').val(getItem[0].ShortNarrative);
    $('#NarrativeStrength1').val(getItem[0].StrengthNarrative);
    $('#NarrativeDevArea1').val(getItem[0].DevelopmentAreaNarrative);
    $('#btndelete' + (getItem[0].Score - 1)).hide();
    } else if (type == "IQ") {
        $("#Score1").val(getItem[0].Score);
        $('#NarrativeIQ1').val(getItem[0].Narrative);
        $('#btndelete' + (getItem[0].Score - 1)).hide();
    } else {
        $('#NarrativeValidityScale1').val(getItem[0].Score);
    }    
    viewModel.set('ListNarrativeSubTest', updateArr);
}

function deleteRow(Code) {
    $('#' + Code).remove();
    $('#btndelete' + (Code - 1)).show();
    //$('#btnedit' + (viewModel.ListNarrativeSubTest.length - 1)).show();
    var updateArr = jQuery.grep(viewModel.ListNarrativeSubTest, function (value) {
        return value.Score != Code;
    });
    viewModel.set('ListNarrativeSubTest', updateArr);  
}
