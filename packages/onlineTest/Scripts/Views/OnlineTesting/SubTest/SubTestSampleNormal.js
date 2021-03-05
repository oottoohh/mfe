$(document).ready(function () {
    LoadingMask.show();
    var branchProfileID = GetParameterByName('SubTestCode');
    var QuestionCategoryLoad = GetParameterByName('QuestionCategory');
    dropDownTestTool();
    dropDownTestType();
    kendoDropdownList();
    dropDownAnswerLayout();
    //AnswerLayout();
    LoadingMask.show();
    LoadData(branchProfileID, QuestionCategoryLoad);
    kendoTab();
    kendoEditor();
    kendoLayoutWorking();
    kendo.bind($("body"), viewModel);
    //kendo.bind($("body"), viewModels);
    
    CreateLocalStore();
    $('.memory_working_page' + ' div').each(function () {
        $('.memory_working_page div > table > tbody > tr > td.k-editable-area').children('table:first').remove();
    });
    $('.answer_working_page' + ' div').each(function () {
        $('.answer_working_page div > table > tbody > tr > td.k-editable-area').children('table:first').remove();
    });
    LoadingMask.hide();
});
 
LoadData = function (branchProfileID, QuestionCategoryLoad) {
    LoadingMask.show();
    //alert(QuestionCategoryLoad);
    var SubTestCode = branchProfileID;
    var QuestionCategoryLoad = QuestionCategoryLoad;
    var nameForm = localStorage.getItem("QuestionCategory") == "NORMAL" ? "SampleNormal" : localStorage.getItem("QuestionCategory") == "WORKINGMEMORY" ? "WorkingMemory" : "VerbalMemory";
    //console.log(SubTestCode);
    //console.log(QuestionCategoryLoad);
    if (SubTestCode == '') {
        ConfigFieldForm()
        //console.log("add Data");
        AnswerLayout();
        //$(`#typeAnswer`).data("kendoComboBox").select(0);
        var url = $(location).attr('search');
        var checkURL = localStorage.getItem('QuestionCategory');
        $(`#typeLayout`).data("kendoComboBox").select("");
        //console.log(checkURL);
        if (checkURL == 'NORMAL') {
            $('#box_working_memory').attr('hidden', true);
            $('#box_verbal_memory').attr('hidden', true);
        }
        else if (checkURL == 'WORKINGMEMORY') {
            $('#box_sample_normal').attr('hidden', true);
            $('#box_verbal_memory').attr('hidden', true);
            viewModels.set("Key", "AT19000001");
            AnswerLayout();
        }
        else {
            $('#box_working_memory').attr('hidden', true);
            $('#box_sample_normal').attr('hidden', true);
            viewModels.set("Key", "AT19000001");
            AnswerLayout();
        }
    }
    else {
        $('#Description').attr('disabled', true);
        $('#Description').removeClass('k-textbox');
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + "api/subtest/Detail",
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                SubTestCode: SubTestCode
            },
            success: function (response) {

                //console.log(response);
                $('#add_sample').empty();
                $('#memory_working_page').empty();
                //console.log(response.SubTest.Sample.AnswerTypeCode);
                var data = response.SubTest;
                var MoreForm = data.Sample.MoreForm;
                debugger
                localStorage.setItem('QuestionCategory', data.Sample.QuestionCategoryCode);
                viewModel.set('SubTestCode', response.SubTest.SubTestCode);
                viewModel.set('SubTestName', data.SubTestName);
                viewModel.set('Description', data.SubTestDesc);
                viewModel.set('TestTypeName', data.TestTypeCode);
                viewModel.set('TestToolName', data.TestToolCode);
                viewModel.set('Duration', data.Duration);
                viewModel.set('DurationSecond', data.DurationSecond);
                viewModel.set('isDisplay', data.DisplayStatus);
                viewModel.set('Instruction.SubTestTitle', data.Instruction.Title);
                viewModel.set('Instruction.DescriptionInstruction', data.Instruction.Desc);
                viewModel.set('Instruction.DisclaimerInstruction', data.Instruction.Disclaimer);
                viewModel.set('Confirmation.ConfirmationTitle', data.Confirmation.Title);
                viewModel.set('Confirmation.ConfirmationDescription', data.Confirmation.Desc);
                viewModel.set('Confirmation.ConfirmationDisclaimer', data.Confirmation.Disclaimer);
                viewModels.set('TestTypeCode', data.TestTypeCode);
                viewModels.set('TestToolCode', data.TestToolCode);
                viewModels.set("Key", data.Sample.AnswerTypeCode);
                viewModels.set("MoreForm", MoreForm);
                //AnswerLayout();
                if (data.Sample.QuestionCategoryCode == 'NORMAL') {
                    var lengthNormal = data.Sample.Answers.length;
                    if (lengthNormal > 6) {
                        $('#btn_image').css({ "display": "none" });
                        $('#btn_answer').css({ "display": "none" });
                    }
                    viewModel.set('SampleNormal.SampleNormalTitle', data.Sample.Title);
                    viewModel.set('SampleNormal.SampleNormalIntroduction', data.Sample.Introduction);
                    viewModel.set('SampleNormal.NormalQuestonImage', data.Sample.QuestionImage);
                    //$('#mediaDisplay0').attr('src', data.Sample.QuestionImage);
                    $("#mediaPic0".toString()).attr("src", data.Sample.QuestionImage);
                    $("#mediaDisplay0".toString()).attr("src", data.Sample.QuestionImage);
                    $($("#mediaPic0".toString()).parent().parent().children()[2]).show();
                    document.getElementById("mediaId0".toString()).value = 0;
                    viewModel.set('SampleNormal.NormalQuestion', data.Sample.QuestionText);
                    viewModel.set('SampleNormal.NormalExplaination', data.Sample.Explaination);

                    viewModels.set("Key", data.Sample.AnswerTypeCode);
                    viewModel.set('typeAnswer', data.Sample.AnswerTypeCode);
                    viewModel.set('typeLayout', data.Sample.AnswerLayoutCode);
                    AnswerLayoutChangeNormal();

                    viewModel.set('SampleNormal.NormalDisclaimer', data.Sample.Desclaimer);
                    if (response.SubTest.Sample.AnswerTypeCode == 'AT19000002') {
                        // ;
                        var tott = data.Sample.Answers.length;
                        var nobtn = tott - 1;
                        $('#btn_image').removeAttr('nomor');
                        $('#btn_image').attr('nomor', nobtn);
                        var no = 1; var nomor = 1;
                        for (kl = 0; kl < data.Sample.Answers.length; kl++) {
                            //$('#mediaDisplay' + no).attr('src', data.Sample.Answers[kl].Url);
                            viewModel.set('SampleNormal. NormalImage[' + kl + '].NormalAnswerImage', data.Sample.Answers[kl].Url);
                            viewModel.set('SampleNormal. NormalImage[' + kl + '].NormalScoreImage', data.Sample.Answers[kl].IsCorrect);
                            if (data.Sample.Answers[kl].IsCorrect == true) {
                                var noms = kl;
                                viewModel.set('SampleNormal.NormalScoreImage', noms);
                            }
                            if (kl >= 2) {
                                if (data.Sample.Answers[kl].IsCorrect == true) {
                                    $('#add_image').append('<div class="add_image" id="label' + kl + '">' +
                                        '<label>Answer ' + no + '</label><br />' +
                                        '<a href="#" no="' + kl + '" id="nom' + kl + '" style="padding-left:30%;" hidden="hidden"><i class="fas fa-trash-alt"></i></a><br/>' +
                                        '<label style="padding-left:140px;padding-right:120px;">' +
                                        '<label>' +
                                        '<img id="mediaPic' + no + '" src="" hidden="hidden" />' +
                                        '<img id="mediaDisplay' + no + '" src="" class="backImage" width="100%" height="100%" />' +
                                        '<input name="media' + no + '" id="media' + no + '" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.mediaImageChange(this, this.files)" />' +
                                        '</label>' +
                                        '<input type="hidden" id="mediaId' + no + '" name="mediaId' + no + '" value="0" />' +
                                        '<a href="#" class="k-button" style="display: none" onclick="viewModel.mediaImageRemove(this)"><span class="fas fa-trash-alt"></span></a>' +
                                        '</label>' +
                                        '<br />' +
                                        '<label style="padding-left:140px;padding-right:120px;">' +
                                        '<span>* Max file size 2Mb</span><br />' +
                                        '</label>' +
                                        '<br />' +
                                        '<label>Correct Answer</label>' +
                                        '<input type="radio" id="NormalScoreImage' + kl + '" name="NormalScoreImage" checked="checked" class="k-checkbox" data-bind="checked:SampleNormal.NormalScoreImage" value="' + kl + '"/><br />' +
                                        '</div></br>');
                                } else {
                                    $('#add_image').append('<div class="add_image" id="label' + kl + '">' +
                                        '<label>Answer ' + no + '</label><br />' +
                                        '<a href="#" no="' + kl + '" id="nom' + kl + '" style="padding-left:30%;" hidden="hidden"><i class="fas fa-trash-alt"></i></a><br/>' +
                                        '<label style="padding-left:140px;padding-right:120px;">' +
                                        '<label>' +
                                        '<img id="mediaPic' + no + '" src="" hidden="hidden" />' +
                                        '<img id="mediaDisplay' + no + '" src="" class="backImage" width="100%" height="100%" />' +
                                        '<input name="media' + no + '" id="media' + no + '" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.mediaImageChange(this, this.files)" />' +
                                        '</label>' +
                                        '<input type="hidden" id="mediaId' + no + '" name="mediaId' + no + '" value="0" />' +
                                        '<a href="#" class="k-button" style="display: none" onclick="viewModel.mediaImageRemove(this)"><span class="fas fa-trash-alt"></span></a>' +
                                        '</label>' +
                                        '<br />' +
                                        '<label style="padding-left:140px;padding-right:120px;">' +
                                        '<span>* Max file size 2Mb</span><br />' +
                                        '</label>' +
                                        '<br />' +
                                        '<label>Correct Answer</label>' +
                                        '<input type="radio" id="NormalScoreImage' + kl + '" name="NormalScoreImage" class="k-checkbox" data-bind="checked:SampleNormal.NormalScoreImage" value="' + kl + '"/><br />' +
                                        '</div></br>');
                                }
                                var check = $('.add_image').length;
                                //var tott = viewModel.Sample.Answers.length;
                                //$('#btn_image').removeAttr('nomor');
                                //$('#btn_image').attr('nomor', tott);
                            }
                            no++;
                            $("#mediaPic" + (kl + 1).toString()).attr("src", data.Sample.Answers[kl].Url);
                            $("#mediaDisplay" + (kl + 1).toString()).attr("src", data.Sample.Answers[kl].Url);
                            $($("#mediaPic" + (kl + 1).toString()).parent().parent().children()[2]).show();
                            document.getElementById("mediaId" + (kl + 1).toString()).value = data.Sample.Answers[kl].Url.No;
                        }
                        var checkLength = $('.add_image').length;
                        var idAttr = $('#btn_image').attr('id');
                        var label = 'label';
                        var nom = 'nom';
                        clearLabel(checkLength, idAttr, label, nom);
                        //kendoImageLayout();
                    }
                    else {
                        //dropDownAnswerLayout();
                        //console.log(data.Sample.Answers);
                        var tot = data.Sample.Answers.length;
                        var nobtns = tot - 1;
                        $('#btn_answer').removeAttr('nomor');
                        $('#btn_answer').attr('nomor', nobtns);
                        var no = 1;
                        for (ilp = 0; ilp < data.Sample.Answers.length; ilp++) {
                            viewModel.set('SampleNormal.NormalText[' + ilp + '].NormalAnswerText', data.Sample.Answers[ilp].Text);
                            viewModel.set('SampleNormal.NormalText[' + ilp + '].NormalScoreText', data.Sample.Answers[ilp].IsCorrect);
                            if (data.Sample.Answers[ilp].IsCorrect == true) {
                                var noms = ilp;
                                viewModel.set('SampleNormal.NormalScoreText', noms);
                                //$('#WorkingMemoryScore' + i).prop('checked', true);
                                //$('input.radio[name=WorkingMemoryScore][id=WorkingMemoryScore' + i + ']').prop('checked', true).trigger('change');
                            }
                            if (ilp >= 2) {
                                if (data.Sample.Answers[ilp].IsCorrect == true) {
                                    $('#add_sample').append('<div class="add_sample" id="labels' + ilp + '">' +
                                        '<label>Answer ' + no + '<span class="mandatory">*</span></label>' +
                                        '<a href="#" no="' + ilp + '" id="noms' + ilp + '" style="padding-left:65%;" hidden="hidden"><i class="fas fa-trash-alt"></i></a>' +
                                        '<div style="padding-left:140px;padding-right:120px;">' +
                                        '<textarea id="NormalAnswerText' + ilp + '" class="editor' + ilp + '" name="NormalAnswerText' + ilp + '" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" data-bind="value:SampleNormal.NormalText[' + ilp + '].NormalAnswerText"></textarea>' +
                                        '</div>' +
                                        '<br />' +
                                        '<label>Correct Answer</label>' +
                                        '<input type="radio" id="NormalScoreText' + ilp + '" name="NormalScoreText" checked="checked" class="k-checkbox" data-bind="checked:SampleNormal.NormalScoreText" value="' + ilp + '"/><br />' +
                                        '</div></br>');
                                } else {
                                    $('#add_sample').append('<div class="add_sample" id="labels' + ilp + '">' +
                                        '<label>Answer ' + no + '<span class="mandatory">*</span></label>' +
                                        '<a href="#" no="' + ilp + '" id="noms' + ilp + '" style="padding-left:65%;" hidden="hidden"><i class="fas fa-trash-alt"></i></a>' +
                                        '<div style="padding-left:140px;padding-right:120px;">' +
                                        '<textarea id="NormalAnswerText' + ilp + '" class="editor' + ilp + '" name="NormalAnswerText' + ilp + '" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" data-bind="value:SampleNormal.NormalText[' + ilp + '].NormalAnswerText"></textarea>' +
                                        '</div>' +
                                        '<br />' +
                                        '<label>Correct Answer</label>' +
                                        '<input type="radio" id="NormalScoreText' + ilp + '" name="NormalScoreText" class="k-checkbox" data-bind="checked:SampleNormal.NormalScoreText" value="' + ilp + '"/><br />' +
                                        '</div></br>');
                                }
                                $(".editor" + ilp).kendoEditor({
                                    resizable: {
                                        content: true
                                    },
                                    encoded: false,
                                    value: data.Sample.Answers[ilp].Text
                                });
                                var checkLength = $('.add_sample').length;
                                var nomlength = parseInt(checkLength);
                                //var tot = viewModel.Sample.Answers.length;
                                ////var tots = tot - 1;
                                //$('#btn_answer').removeAttr('nomor');
                                //$('#btn_answer').attr('nomor', tot);
                            }
                            no++;
                        }
                        var checkLength = $('.add_sample').length;
                        var idAttr = $('#btn_answer').attr('id');
                        var label = 'labels';
                        var nom = 'noms';
                        clearLabel(checkLength, idAttr, label, nom);
                    }
                    //console.log(viewModel);
                    $('#box_working_memory').attr('hidden', true);
                    $('#box_verbal_memory').attr('hidden', true);

                }
                else if (data.Sample.QuestionCategoryCode == 'WORKINGMEMORY') {
                    var lengthWorking = data.Sample.Answers.length;
                    var lengthMemory = data.Sample.Memory.length;
                    if (lengthWorking > 6) {
                        $('#btn_answer_Working').css({ "display": "none" });
                    }
                    if (lengthMemory > 6) {
                        $('#add_working_memory').css({ "display": "none" });
                    }
                    viewModel.set('WorkingMemory.WorkingMemoryTitle', data.Sample.Title);
                    viewModel.set('WorkingMemory.WorkingMemoryPreface', data.Sample.Preface);
                    viewModel.set('WorkingMemory.WorkingMemoryPrefaceDisplay', data.Sample.IsPreface);
                    viewModel.set('WorkingMemory.NormalQuestonImage', data.Sample.QuestionImage);
                    viewModel.set('WorkingMemory.WorkingMemoryQuestion', data.Sample.QuestionText);
                    viewModel.set('WorkingMemory.WorkingMemoryExplaination', data.Sample.Explaination);
                    viewModel.set('WorkingMemory.WorkingMemoryDuration', data.Sample.DurationPerMemory);
                    viewModel.set('WorkingMemory.IntroductionMemory', data.Sample.Introduction);
                    viewModel.set('typeAnswer', data.Sample.AnswerTypeCode);
                    viewModel.set('WorkingMemory.WorkingMemoryLayout', data.Sample.AnswerLayoutCode);
                    viewModel.set('WorkingMemory.WorkingMemoryDisclaimer', data.Sample.Desclaimer);
                    viewModel.set('WorkingMemory.WorkingMemoryTransition', data.Sample.TransitionPerMemory)
                    var no = 1; var nomor = 1;
                    for (i = 0; i < data.Sample.Answers.length; i++) {
                        viewModel.set('WorkingMemory. WorkingMemoriesAnswer[' + i + '].WorkingMemoryAswer', data.Sample.Answers[i].Text);
                        viewModel.set('WorkingMemory. WorkingMemoriesAnswer[' + i + '].WorkingMemoriesScore', data.Sample.Answers[i].IsCorrect);
                        if (data.Sample.Answers[i].IsCorrect == true) {
                            var nom = i;
                            viewModel.set('WorkingMemory.WorkingMemoryScore', nom);
                        }
                        if (i >= 2) {
                            if (data.Sample.Answers[i].IsCorrect == true) {
                                $('#answer_working_page').append('<div class="answer_working_page" id="label' + i + '">' +
                                    '<label>Answer ' + no + '</label>' +
                                    '<a href="#" no="' + i + '" id="nom' + i + '" style="padding-left:65%;" hidden="hidden"><i class="fas fa-trash-alt"></i></a>' +
                                    '<div style="padding-left:140px;padding-right:120px;">' +
                                    '<textarea id="WorkingMemoryAswer' + i + '" name="WorkingMemoryAswer' + i + '" rows="2" cols="30" class="editors' + i + '" style="height:140px;width:80%;" aria-label="editor"  data-bind="value:WorkingMemory.WorkingMemoriesAnswer[' + i + '].WorkingMemoryAswer"></textarea>' +
                                    '</div><br />' +
                                    '<label>Correct Answer</label>' +
                                    '<input type="radio" id="WorkingMemoryScore' + i + '" name="WorkingMemoryScore" class="k-checkbox" checked="checked" data-bind="checked:WorkingMemory.WorkingMemoryScore" value="' + i + '"/><br />' +
                                    '</div></br>');
                            } else {
                                $('#answer_working_page').append('<div class="answer_working_page" id="label' + i + '">' +
                                    '<label>Answer ' + no + '</label>' +
                                    '<a href="#" no="' + i + '" id="nom' + i + '" style="padding-left:65%;" hidden="hidden"><i class="fas fa-trash-alt"></i></a>' +
                                    '<div style="padding-left:140px;padding-right:120px;">' +
                                    '<textarea id="WorkingMemoryAswer' + i + '" name="WorkingMemoryAswer' + i + '" rows="2" cols="30" class="editors' + i + '" style="height:140px;width:80%;" aria-label="editor"  data-bind="value:WorkingMemory.WorkingMemoriesAnswer[' + i + '].WorkingMemoryAswer"></textarea>' +
                                    '</div><br />' +
                                    '<label>Correct Answer</label>' +
                                    '<input type="radio" id="WorkingMemoryScore' + i + '" name="WorkingMemoryScore" class="k-checkbox" data-bind="checked:WorkingMemory.WorkingMemoryScore" value="' + i + '"/><br />' +
                                    '</div></br>');
                            }
                            $(".editors" + i).kendoEditor({
                                resizable: {
                                    content: true
                                },
                                encoded: false,
                                value: data.Sample.Answers[i].Text
                            });
                            $('#btn_answer_Working').removeAttr('nomor');
                            $('#btn_answer_Working').attr('nomor', (data.Sample.Answers.length) - 1);
                        }

                        no++;
                    }
                    var checkLength = $('.answer_working_page').length;
                    var idAttr = $('#btn_answer_Working').attr('id');
                    var label = 'label';
                    var nom = 'nom';
                    clearLabel(checkLength, idAttr, label, nom);
                    for (j = 0; j < data.Sample.Memory.length; j++) {
                        viewModel.set('WorkingMemory. WorkingMemories[' + j + '].WorkingMemoryText', data.Sample.Memory[j].Text);
                        if (j >= 3) {
                            $('#memory_working_page').append('<div class="memory_working_page" id="labels' + j + '">' +
                                '<label>Memory ' + nomor + '</label>' +
                                '<a href="#" no="' + j + '" id="noms' + j + '" style="padding-left:65%;" hidden="hidden"><i class="fas fa-trash-alt"></i></a>' +
                                '<div style="padding-left:140px;padding-right:120px;">' +
                                '<textarea id="WorkingMemoryText' + j + '" name="WorkingMemoryText' + j + '" rows="2" cols="30" class="editor' + j + '" style="height:140px;width:80%;" aria-label="editor" data-bind="value:WorkingMemory.WorkingMemories[' + j + '].WorkingMemoryText"></textarea>' +
                                '</div' +
                                '</div>');
                            $(".editor" + j).kendoEditor({
                                resizable: {
                                    content: true
                                },
                                encoded: false,
                                value: data.Sample.Memory[j].Text
                            });
                            var checkLength = $('.memory_working_page').length;
                            $('#add_working_memory').removeAttr('nomor');
                            $('#add_working_memory').attr('nomor', (checkLength) - 1);
                        }

                        nomor++;
                    }
                    var checkLengths = $('.memory_working_page').length;
                    var idAttrs = $('#add_working_memory').attr('id');
                    var labels = 'labels';
                    var noms = 'noms';
                    clearLabels(checkLengths, idAttrs, labels, noms);
                    //console.log(viewModel);
                    $('#box_sample_normal').attr('hidden', true);
                    $('#box_verbal_memory').attr('hidden', true);
                    viewModels.set("Key", "AT19000001");
                    AnswerLayout();
                }
                else if (data.Sample.QuestionCategoryCode == 'VERBALMEMORY') {
                    var lengthVerbal = data.Sample.Answers.length;
                    if (lengthVerbal > 6) {
                        $('#btnAddVerbal').css({ "display": "none" });
                    }
                    viewModel.set('verbalMemory.VerbalMemoryTitle', data.Sample.Title);
                    viewModel.set('verbalMemory.VerbalMemoryStory', data.Sample.Introduction);
                    viewModel.set('verbalMemory.VerbalMemoryQuestion', data.Sample.QuestionText);
                    viewModel.set('verbalMemory.VerbalMemoryExplaination', data.Sample.Explaination);
                    viewModel.set('verbalMemory.StoryDuration', data.Sample.DurationPerMemory);
                    viewModel.set('typeAnswer', data.Sample.AnswerTypeCode);
                    viewModel.set('verbalMemory.idLayout', data.Sample.AnswerLayoutCode);
                    viewModel.set('verbalMemory.VerbalMemoryDisclaimer', data.Sample.Desclaimer);
                    var no = 1; var nomor = 1;
                    for (k = 0; k < data.Sample.Answers.length; k++) {
                        viewModel.set('verbalMemory. VerbalMemories[' + k + '].answerVerbalMemory', data.Sample.Answers[k].Text);
                        viewModel.set('verbalMemory. VerbalMemories[' + k + '].scoreVerbalMemory', data.Sample.Answers[k].IsCorrect);
                        if (data.Sample.Answers[k].IsCorrect == true) {
                            var noms = k;
                            viewModel.set('verbalMemory.scoreVerbalMemory', noms);
                        }
                        if (k >= 2) {
                            if (data.Sample.Answers[k].IsCorrect == true) {
                                var noms = k;
                                $('#answer_verbal_page').append('<div class="answer_verbal_page" id="label' + k + '"><label>' +
                                    'Answer ' + no + '<span class="mandatory">*</span>' +
                                    '</label><a href="#" no="' + k + '" id="nom' + k + '" style="padding-left:65%;" hidden="hidden"><i class="fas fa-trash-alt"></i></a>' +
                                    '<div style="padding-left:140px;padding-right:120px;">' +
                                    '<textarea id="answerVerbalMemory' + k + '" name="answerVerbalMemory' + k + '" rows="2" cols="20" class="editor' + k + '" style="height:140px;width:80%;" aria-label="editor" data-bind="value:verbalMemory.VerbalMemories[' + k + '].answerVerbalMemory"></textarea>' +
                                    '</div><br />' +
                                    '<label>Correct Answer</label>' +
                                    '<input type="radio" id="scoreVerbalMemory' + k + '" name="scoreVerbalMemory" checked="checked"  data-bind="checked:verbalMemory.scoreVerbalMemory" value="' + k + '" /><br /></div></br>'
                                );
                            } else {
                                $('#answer_verbal_page').append('<div class="answer_verbal_page" id="label' + k + '"><label>' +
                                    'Answer ' + no + '<span class="mandatory">*</span>' +
                                    '</label><a href="#" no="' + k + '" id="nom' + k + '" style="padding-left:65%;" hidden="hidden"><i class="fas fa-trash-alt"></i></a>' +
                                    '<div style="padding-left:140px;padding-right:120px;">' +
                                    '<textarea id="answerVerbalMemory' + k + '" name="answerVerbalMemory' + k + '" rows="2" cols="20" class="editor' + k + '" style="height:140px;width:80%;" aria-label="editor" data-bind="value:verbalMemory.VerbalMemories[' + k + '].answerVerbalMemory"></textarea>' +
                                    '</div><br />' +
                                    '<label>Correct Answer</label>' +
                                    '<input type="radio" id="scoreVerbalMemory' + k + '" name="scoreVerbalMemory"  data-bind="checked:verbalMemory.scoreVerbalMemory" value="' + k + '" /><br /></div></br>'
                                );
                            }
                            $(".editor" + k).kendoEditor({
                                resizable: {
                                    content: true
                                },
                                encoded: false,
                                value: data.Sample.Answers[k].Text
                            });
                            //viewModel.set("verbalMemory.VerbalMemories.answerVerbalMemory" + count, );
                            var check = $('.answer_verbal_page').length;
                            $('#btnAddVerbal').removeAttr('nomor');
                            $('#btnAddVerbal').attr('nomor', (check) - 1);
                        }
                        no++;
                    }
                    var checkLength = $('.answer_verbal_page').length;
                    var idAttr = $('#btnAddVerbal').attr('id');
                    var label = 'label';
                    var nom = 'nom';
                    clearLabel(checkLength, idAttr, label, nom);

                    $('#box_working_memory').attr('hidden', true);
                    $('#box_sample_normal').attr('hidden', true);
                    viewModels.set("Key", "AT19000001");
                    AnswerLayout();

                }
                CheckTestType(data.TestTypeCode);
                TestToolBySubLast();
                var typeForm = data.Sample.QuestionCategoryCode == "NORMAL" ? "SampleNormal" : data.Sample.QuestionCategoryCode == "WORKINGMEMORY" ? "WorkingMemory" : "VerbalMemory";
                if (MoreForm !== undefined && MoreForm !== 0) {
                    for (z = 0; z < MoreForm.length; z++) {
                        
                        AddForm();
                        if (data.Sample.QuestionCategoryCode == 'NORMAL') {
                            NMFormDetails(z, typeForm);
                        } else if (data.Sample.QuestionCategoryCode == 'WORKINGMEMORY') {
                            WMFormDetails(z, typeForm);
                        } else if (data.Sample.QuestionCategoryCode == 'VERBALMEMORY') {
                            VMFormDetails(z, typeForm);
                        } else {
                            console.log("Error: Question Category not found");
                        }
                    }                 
                }
                //viewModel.set('createBy', data.CreateBy);
                //viewModel.set('lastModifiedBy', data.ModifBy);
                //viewModel.set('createOn', data.CreatedTime);
                //viewModel.set('lastModifiedOn', data.ModifiedTime);                
            },
            error: function (x, e) {
                //alert(x + '||' + e);
                MessageBox.show("Error", x + '||' + e);
            }
        });
        $('.memory_working_page' + ' div').each(function () {
            $('.memory_working_page div > table > tbody > tr > td.k-editable-area').children('table:first').remove();
        });
        $('.answer_working_page' + ' div').each(function () {
            $('.answer_working_page div > table > tbody > tr > td.k-editable-area').children('table:first').remove();
        });
    }
    LoadingMask.hide();
}

function NMFormDetails(i, typeForm) {
    console.log("NMFormDetails DATA ->", viewModels.MoreForm);
    var dt = viewModels.MoreForm[i];
    
    var index = i + 2;
    var nameField = dt.AnswerTypeCode == "AT19000001" ? ".add_sample" + index : ".add_image" + index;

    $('#' + typeForm + 'Title' + index).val(dt.Title);
    $('#' + typeForm + 'Introduction' + index).data('kendoEditor').value(dt.Introduction);
    $('.media' + (index - 1) + '-QuestionImage' + index).attr('src', dt.QuestionImage);
    $('input#media' +(index - 1)+ '-QuestionImage' + index).attr('src', dt.QuestionImage);
    if (dt.QuestionImage != 0 || dt.QuestionImage !== undefined) {
        $('a#media' + (index - 1) + '-QuestionImage' + index).css("display", "block");
    }
    $('#typeAnswer' + index).data("kendoComboBox").value(dt.AnswerTypeCode);
    getListdropdownAnswer(dt.AnswerTypeCode, index);
    var typeLayoutVal = $.grep(viewModel.AnswerLayoutListMultiple[index], function (e) { return e.Code == dt.AnswerLayoutCode; });
    $('#typeLayout' + index).data("kendoComboBox").value(typeLayoutVal[0].Value);
    $('#' + typeForm + 'Explaination' + index).data('kendoEditor').value(dt.Explaination);
    $('#' + typeForm + 'Disclaimer' + index).data('kendoEditor').value(dt.Desclaimer);
    $('#' + typeForm + 'Question' + index).data('kendoEditor').value(dt.QuestionText);
    for (i = 0; i < dt.Answers.length; i++) {
        var totalFieldMemory = $(nameField).size();
        if (dt.Answers.length > totalFieldMemory) {
            var idField = '#btn_answer' + index;
            add_answerMultiple(idField, dt.AnswerTypeCode)
        } 
    }
    if (dt.AnswerTypeCode == "AT19000001") {
        for (j = 0; j < dt.Answers.length; j++) {
            $('#NormalAnswerText' + j + '-form' + index + '-NM').data('kendoEditor').value(dt.Answers[j].Text);
            $(`#NormalScoreText` + j + '-form' + index + '-NM').prop("checked", dt.Answers[j].IsCorrect);
        }
    } else {
        for (k = 0; k < dt.Answers.length; k++) {
            $(`#NormalScoreImage` + k + '-form' + index + '-NM').prop("checked", dt.Answers[k].IsCorrect);
            $('img.media' + (k + 1) + '-form' + (index)).attr('src', dt.Answers[k].Url);
            $('input#media' + (k + 1) + '-form' + (index)).attr('src', dt.Answers[k].Url);
        }
    }
}
function WMFormDetails(i, typeForm) {
    
    console.log("WMFormDetails DATA ->", viewModels.MoreForm);
    var index = i + 2;
    var dt = viewModels.MoreForm[i];
    var selectElementWmy = '.memory_working_page' + index;
    var selectElementAns = '.answer_working_page' + index;
    $('#' + typeForm + 'Title' + index).val(dt.Title);
    $('#WorkingMemoryTransition' + index).val(dt.TransitionPerMemory);
    $('#IntroductionWorkingMemory' + index).data('kendoEditor').value(dt.Introduction);
    $(`input#WorkingMemoryPrefaceDisplay` + index).prop("checked", dt.IsPreface);
    $('#WorkingMemoryPreface' + index).data('kendoEditor').value(dt.Preface);
    $('#WorkingMemoryExplaination' + index).data('kendoEditor').value(dt.Explaination);
    $('#WorkingMemoryDisclaimer' + index).data('kendoEditor').value(dt.Desclaimer);
    $('#WorkingMemoryQuestion' + index).data('kendoEditor').value(dt.QuestionText);
    $('#WorkingMemoryDuration' + index).val(dt.DurationPerMemory);
    getListdropdownAnswer(dt.AnswerTypeCode, index);
    var layoutList = viewModel.AnswerLayoutListMultiple.length != 0 ? viewModel.AnswerLayoutListMultiple[index] : viewModel.AnswerLayoutList
    var typeLayoutVal = $.grep(layoutList, function (e) { return e.Code == dt.AnswerLayoutCode; });
    var idxSelect;
    layoutList.some(function (elem, i) {
        return elem.Code === typeLayoutVal[0].Code ? (idxSelect = i, true) : false;
    });
    console.log("idxSelect ->", idxSelect) 
    console.log("TypeLayout ->", typeLayoutVal)
    $('#WorkingMemoryLayout' + index).kendoComboBox({
        dataSource: layoutList,
        dataTextField: "Value",
        dataValueField: "Code",
        value: typeLayoutVal[0].Value
    });
    //$('#WorkingMemoryLayout' + index).data("kendoComboBox").value(typeLayoutVal[0].Value)
    //$('#WorkingMemoryLayout' + index).data("kendoComboBox").select(typeLayoutVal[0].Value);
    for (i = 0; i < dt.Memory.length; i++) {
        var totalFieldMemory = $(selectElementWmy).size();
        if (totalFieldMemory < dt.Memory.length) {
            var idField = '#add_working_memory' + index;
            add_workingMultiple(idField)
        }
    }
    for (y = 0; y < dt.Memory.length; y++) {
        $('#WorkingMemoryText' + y + '-form' + index).data('kendoEditor').value(dt.Memory[y].Text);
    }

    for (j = 0; j < dt.Answers.length; j++) {
        var totalFieldAnswer = $(selectElementAns).size();
        if (totalFieldAnswer < dt.Answers.length) {
            var idField = '#btn_answer_Working' + index;
            add_answerWorkingMultiple(idField)
        }
    }
    for (x = 0; x < dt.Answers.length; x++) {
        $('#WorkingMemoryAnswer' + x + '-form' + index).data('kendoEditor').value(dt.Answers[x].Text);
        $(`#WorkingMemoryScore` + x + '-form' + index).prop("checked", dt.Answers[x].IsCorrect);
    }

}
function VMFormDetails(i, typeForm) {
    console.log("VMFormDetails DATA ->", viewModels.MoreForm)
    var index = i + 2;
    var dt = viewModels.MoreForm[i];
    var inputName = `scoreVerbalMemory`;

    $('#' + typeForm + 'Title' + index).val(dt.Title);
    //$('#VerbalMemoryStory' + index).data('kendoEditor').value(dt.Introduction)
    $('#VerbalMemoryExplaination' + index).data('kendoEditor').value(dt.Explaination);
    $('#VerbalMemoryDisclaimer' + index).data('kendoEditor').value(dt.Desclaimer);
    $('#VerbalMemoryQuestion' + index).data('kendoEditor').value(dt.QuestionText);

    getListdropdownAnswer(dt.AnswerTypeCode, index);
    var layoutList = viewModel.AnswerLayoutListMultiple.length != 0 ? viewModel.AnswerLayoutListMultiple[index] : viewModel.AnswerLayoutList
    var typeLayoutVal = $.grep(layoutList, function (e) { return e.Code == dt.AnswerLayoutCode; });
    //layoutList.some(function (elem, i) {
    //    return elem.Code === typeLayoutVal[0].Code ? (idxSelect = i, true) : false;
    //});

    $('#VerbalMemoryLayout' + index).kendoComboBox({
        dataSource: layoutList,
        dataTextField: "Value",
        dataValueField: "Code",
        value: typeLayoutVal[0].Value
    });

    $('#VerbalMemoryLayout' + index).data("kendoComboBox").value(typeLayoutVal[0].Value);
    $(`#VerbalMemoryLayout` + index + ``).data("kendoComboBox").select(typeLayoutVal[0]);
    $('#StoryDuration' + index).val(dt.DurationPerMemory);

    for (i = 0; i < dt.Answers.length; i++) {
        var totalFieldAnswer = $('.answer_verbal_page' + index).size();
        if (totalFieldAnswer < dt.Answers.length) {
            var idField = '#add_verbal_memory' + index;
            add_verbalMultiple(idField)
        }
    }

    for (i = 0; i < dt.Answers.length; i++) {
        
        $('#VerbalMemoryText' + i + '-form' + index).data('kendoEditor').value(dt.Answers[i].Text);
        $(`#` + inputName + i + '-form' + index + '-VM').prop("checked", dt.Answers[i].IsCorrect);
    };
}

// Dropdown Master
CreateLocalStore = function () {
    var dataInstruction = { "title": '', "description": '', "disclaimer": '' };
    var dataConfirmation = { "ConfirmationTitle": '', "ConfirmationDescription": '', "ConfirmationDisclaimer": '' };

    $.indexedDB('LocalStore').objectStore("Instruction", { "autoIncrement": false }).add(dataInstruction, "Instruksi").then(function (val) {
        dataInstruction.id = val;
        //dataConfirmation.id = val;
        console.info(val);
    }, console.error);
    $.indexedDB('LocalStore').objectStore("Instruction", { "autoIncrement": false }).add(dataConfirmation, "Confirmation").then(function (val) {
        dataConfirmation.id = val;
        //dataConfirmation.id = val;
        console.info(val);
    }, console.error);
}
dropDownTestType = function () {
    //console.log(viewModels.CategoryDataSource);
    $("#TestTypeName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModels.CategoryDataSource,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onChangeTestType,
        select: function (e) {
            viewModels.set('TestToolCode', '');
        }
    });
}

onChangeTestType = function (source) {
    var check_value = source.sender._selectedValue;
    viewModels.set('TestTypeCode', check_value);
    CheckTestType(check_value);
    //console.log(viewModel);

}

dropDownTestTool = function () {
    //console.log(viewModel.TestToolList);
    $("#TestToolName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolList,
        dataTextField: "Value",
        dataValueField: "Code"
    });
}
//end Dropdown Master
//Check URL
$(function () {

});
// End Check URL
CheckTestType = function (data) {
    var id = data;
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/TestType/Detail",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestTypeCode: id },
        success: function (response) {
            LoadingMask.hide();
            //console.log(response);
            if (response.Acknowledge > 0) {
                if (response.TestTypeDetail.IsByTest == true) {
                    $('#Duration').attr('disabled', true);
                    $('#Duration').removeClass('k-textbox');
                    viewModel.set('Duration', 0.00);
                    viewModel.set('checkDuration', false);

                    $('#DurationSecond').attr('disabled', true);
                    $('#DurationSecond').removeClass('k-textbox');
                    viewModel.set('DurationSecond', 0.00);

                } else {
                    $('#Duration').removeAttr('disabled');
                    $('#Duration').addClass('k-textbox');
                    viewModel.set('checkDuration', true);

                    $('#DurationSecond').removeAttr('disabled');
                    $('#DurationSecond').addClass('k-textbox');
                }
                TestToolBySubLast();
            } else {
                swal('Failed', 'Testtype wrong!!!', 'error', { closeOnClickOutside: false });
            }

        },
        error: function (x, e) {
            swal('Failed', 'Request Time Out, Please Reload Page', 'error', { closeOnClickOutside: false });
        }
    });
}
kendoLayoutWorking = function () {
    $("#layout_working").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: viewModel.SampleNormalAnswerLayout
        //index: 0,
        //change: onChangeAnswer
    });

}

kendoDropdownList = function () {
    $("#typeLayout").kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModel.AnswerLayoutList,
    });
    $("#typeAnswer").kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModels.CategoryAnswer,
        change: onChangeAnswer
    });
    $("#typeAnswer-wm").kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModels.CategoryAnswer,
        change: onChangeAnswer
    });
    $("#typeLayout-wm").kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModel.AnswerLayoutList,
    });
    function onChangeAnswer(source) {
        var check_value = source.sender._selectedValue;
        viewModels.set("Key", check_value);
        AnswerLayout();
        var check_value = viewModel.typeAnswer;
        if (check_value == "AT19000001") {

            dropDownAnswerLayout();
        }
        else {
            kendoImageLayout();
        }
    }
}

dropDownAnswerLayout = function () {
    $('#add_image').attr('hidden', true);
    $('#add_sample').removeAttr('hidden', 'hidden');
    $("#typeLayout").kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModel.AnswerLayoutList,
    });
    $('.button_answer').removeAttr('hidden', 'hidden');
    //$('#btn_answer').removeAttr('nomor');
    //$('#btn_answer').attr('nomor', 1);
    $('#btn_answer').css({ "display": "inline" });
    $('.button_image').attr('hidden', true);
}

kendoImageLayout = function () {
    $('#add_sample').attr('hidden', true);
    $('#add_image').removeAttr('hidden', 'hidden');
    $("#typeLayout").kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModel.AnswerLayoutList
    });
    $('.button_image').removeAttr('hidden', 'hidden');
    //$('#btn_image').removeAttr('nomor');
    //$('#btn_image').attr('nomor', 1);
    $('#btn_image').css({ "display": "inline" });
    $('.button_answer').attr('hidden', true);
}

kendoEditor = function () {
    $(".editor").kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });
}

kendoTab = function () {

    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });
}
function add_answer(id) {
    var nomor = $(id).attr('nomor');
    var count = parseInt(nomor) + 1;
    $('#noms' + (count - 1)).attr('hidden', true);
    var no = count + 1;
    $('#add_sample').append('<div class="add_sample" id="labels' + count + '">' +
        '<label>Answer ' + no + /*'<span class="mandatory">*</span>*/'</label>' +
        '<a href="#" no="' + count + '" id="noms' + count + '" style="padding-left:65%;"><i class="fas fa-trash-alt"></i></a>' +
        '<div style="padding-left:140px;padding-right:120px;">' +
        '<textarea id="NormalAnswerText' + count + '" class="editor' + count + '" name="NormalAnswerText' + count + '" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" data-bind="value:SampleNormal.NormalText[' + count + '].NormalAnswerText"></textarea>' +
        '</div>' +
        '<br />' +
        '<label>Correct Answer</label>' +
        '<input type="radio" id="NormalScoreText' + count + '" name="NormalScoreText" class="k-checkbox" data-bind="checked:SampleNormal.NormalScoreText" value="' + count + '"/><br />' +
        '</div></br>');
    $("#labels" + count + " textarea.editor" + count).kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });

    $('#btn_answer').removeAttr('nomor');
    $('#btn_answer').attr('nomor', count);
    var check = $('.add_sample').length;
    if (check >= 7) {
        $('#btn_answer').css({ "display": "none" });
    }
    var idAttr = $('#btn_answer').attr('id');
    var label = 'labels';
    var nom = 'noms';
    clearField(count, idAttr, label, nom);
}
function add_image(dataRow) {

    var nomor = $(dataRow).attr('nomor');
    var count = parseInt(nomor) + 1;
    $('#nom' + (count - 1)).attr('hidden', true);
    var no = count + 1;
    $('#add_image').append('<div class="add_image" id="label' + count + '">' +
        '<label>Answer ' + no + '</label><br />' +
        '<a href="#" no="' + count + '" id="nom' + count + '" style="padding-left:30%;"><i class="fas fa-trash-alt"></i></a><br/>' +
        '<label style="padding-left:140px;padding-right:120px;">' +
        '<label>' +
        '<img id="mediaPic' + no + '" src="" hidden="hidden" />' +
        '<img id="mediaDisplay' + no + '" src="" class="backImage" width="100%" height="100%" />' +
        '<input name="media' + no + '" id="media' + no + '" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.mediaImageChange(this, this.files)" />' +
        '</label>' +
        '<input type="hidden" id="mediaId' + no + '" name="mediaId' + no + '" value="0" />' +
        '<a href="#" class="k-button" style="display: none" onclick="viewModel.mediaImageRemove(this)"><span class="fas fa-trash-alt"></span></a>' +
        '</label>' +
        '<br />' +
        '<label style="padding-left:140px;padding-right:120px;">' +
        '<span>* Max file size 2Mb</span><br />' +
        '</label>' +
        '<br />' +
        '<label>Correct Answer</label>' +
        '<input type="radio" id="NormalScoreImage' + count + '" name="NormalScoreImage" class="k-checkbox" data-bind="checked:SampleNormal.NormalScoreImage" value="' + count + '"/><br />' +
        '</div></br>');
    $('#btn_image').removeAttr('nomor');
    $('#btn_image').attr('nomor', count);
    var check = $('.add_image').length;
    if (check >= 7) {
        $('#btn_image').css({ "display": "none" });
    }
    var idAttr = $('#btn_image').attr('id');
    var label = 'label';
    var nom = 'nom';
    clearField(count, idAttr, label, nom);
}

addWorking = function (dataWorking) {
    var nomor = $(dataWorking).attr('nomor');
    var count = parseInt(nomor) + 1;
    $('#noms' + (count - 1)).attr('hidden', true);
    var no = count + 1;
    $('#memory_working_page').append('<div class="memory_working_page" id="labels' + count + '">' +
        '<label>Memory ' + no + '</label>' +
        '<a href="#" no="' + count + '" id="noms' + count + '" style="padding-left:65%;"><i class="fas fa-trash-alt"></i></a>' +
        '<div style="padding-left:140px;padding-right:120px;">' +
        '<textarea id="WorkingMemoryText' + count + '" name="WorkingMemoryText' + count + '" rows="2" cols="30" class="editor' + count + '" style="height:140px;width:80%;" aria-label="editor" data-bind="value:WorkingMemory.WorkingMemories[' + count + '].WorkingMemoryText"></textarea>' +
        '</div' +
        '</div>');
    $(".editor" + count).kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });
    $('#add_working_memory').removeAttr('nomor');
    $('#add_working_memory').attr('nomor', count);
    var check = $('.memory_working_page').length;
    //if (check >= 7) {
    //    $('#add_working_memory').css({ "display": "none" });
    //}
    var idAttr = $('#add_working_memory').attr('id');
    var label = 'labels';
    var nom = 'noms';
    clearFields(count, idAttr, label, nom);
}

addAnswerWorking = function (dataAnswer) {
    var nomor = $(dataAnswer).attr('nomor');
    var count = parseInt(nomor) + 1;
    $('#nom' + (count - 1)).attr('hidden', true);
    var no = count + 1
    $('#answer_working_page').append('<div class="answer_working_page" id="label' + count + '">' +
        '<label>Answer ' + no + '</label>' +
        '<a href="#" no="' + count + '" id="nom' + count + '" style="padding-left:65%;"><i class="fas fa-trash-alt"></i></a>' +
        '<div style="padding-left:140px;padding-right:120px;">' +
        '<textarea id="WorkingMemoryAswer' + count + '" name="WorkingMemoryAswer' + count + '" rows="2" cols="30" class="editors' + count + '" style="height:140px;width:80%;" aria-label="editor" data-bind="value:WorkingMemory.WorkingMemoriesAnswer[' + count + '].WorkingMemoryAswer"></textarea>' +
        '</div><br />' +
        '<label>Correct Answer</label>' +
        '<input type="radio" id="WorkingMemoryScore-form' + count + '" name="WorkingMemoryScore" class="k-checkbox" data-bind="checked:WorkingMemory.WorkingMemoryScore" value="' + count + '"/><br />' +
        '</div></br>');
    $(".editors" + count).kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });
    $('#btn_answer_Working').removeAttr('nomor');
    $('#btn_answer_Working').attr('nomor', count);
    var check = $('.answer_working_page').length;
    if (check >= 7) {
        $('#btn_answer_Working').css({ "display": "none" });
    }
    var idAttr = $('#btn_answer_Working').attr('id');
    var label = 'label';
    var nom = 'nom';
    clearField(count, idAttr, label, nom);
}
// Add Answer Verbal Memory
addAnswerVerbal = function (dataVerbal) {
    var nomor = $(dataVerbal).attr('nomor');
    var count = parseInt(nomor) + 1;
    $('#nom' + (count - 1)).attr('hidden', true);
    var no = count + 1;
    $('#answer_verbal_page').append('<div class="answer_verbal_page" id="label' + count + '"><label>' +
        'Answer ' + no /*+ '<span class="mandatory">*</span>'*/ +
        '</label>' +
        '<a href="#" no="' + count + '" id="nom' + count + '" style="padding-left:65%;"><i class="fas fa-trash-alt"></i></a>' +
        '<div style="padding-left:140px;padding-right:120px;">' +
        '<textarea id="answerVerbalMemory' + count + '" name="answerVerbalMemory' + count + '" rows="2" cols="20" class="editor' + count + '" style="height:140px;width:80%;" aria-label="editor" data-bind="value:verbalMemory.VerbalMemories[' + count + '].answerVerbalMemory"></textarea>' +
        '</div><br />' +
        '<label>Correct Answer</label>' +
        '<input type="radio" id="scoreVerbalMemory' + count + '" name="scoreVerbalMemory"  data-bind="checked:verbalMemory.scoreVerbalMemory" value="' + count + '" /><br /></div></br>'
    );
    $(".editor" + count).kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });
    $('#btnAddVerbal').removeAttr('nomor');
    $('#btnAddVerbal').attr('nomor', count);
    var check = $('.answer_verbal_page').length;
    if (check >= 7) {
        $('#btnAddVerbal').css({ "display": "none" });
    }
    var idAttr = $('#btnAddVerbal').attr('id');
    var label = 'label';
    var nom = 'nom';
    clearField(count, idAttr, label, nom);
}
//End Add Answer Verbal Memory
clearLabel = function (checkLength, idAttr, label, nom) {
    var ansLength = parseInt(checkLength) - 1;
    $('#' + nom + '' + ansLength).removeAttr('hidden');
    clearField(ansLength, idAttr, label, nom);
}
clearField = function (count, idAttr, label, nom) {
    if (viewModel.SubTestCode == '') {
        $('#' + nom + '' + count).on('click', function () {
            $('#' + label + '' + count).remove();
            $('#' + nom + '' + (count - 1)).removeAttr('hidden');
            $('#' + idAttr).removeAttr('nomor');
            $('#' + idAttr).attr('nomor', (count - 1));
            $('#' + idAttr).css({ "display": "inline" });
        });
    } else {
        $('#' + nom + '' + count).on('click', function () {
            $('#' + label + '' + count).remove();
            $('#' + nom + '' + (count - 1)).removeAttr('hidden');
            $('#' + idAttr).removeAttr('nomor');
            $('#' + idAttr).attr('nomor', (count - 1));
            $('#' + idAttr).css({ "display": "inline" });
            clearLabel(count, idAttr, label, nom);
        });
        //
    }
    //return;
}
clearLabels = function (checkLength, idAttr, label, nom) {
    var ansLength = parseInt(checkLength) - 1;
    $('#' + nom + ansLength).removeAttr('hidden');
    clearFields(ansLength, idAttr, label, nom);
}
clearFields = function (count, idAttr, label, nom) {
    if (viewModel.SubTestCode == '') {
        $('#' + nom + count).on('click', function () {
            $('#' + label + count).remove();
            $('#' + nom + (count - 1)).removeAttr('hidden');
            $('#' + idAttr).removeAttr('nomor');
            $('#' + idAttr).attr('nomor', (count - 1));
            $('#' + idAttr).css({ "display": "inline" });
        });
    } else {
        $('#' + nom + count).on('click', function () {
            $('#' + label + count).remove();
            $('#' + nom + (count - 1)).removeAttr('hidden');
            $('#' + idAttr).removeAttr('nomor');
            $('#' + idAttr).attr('nomor', (count - 1));
            $('#' + idAttr).css({ "display": "inline" });
            clearLabels(count, idAttr, label, nom);
        });
        //
    }
    //return;
}
function saveWorking() {
    //click: openDialog
    confirmMessageAdd();

    $('.swal-button--cancel').on('click', function () {
        //alert("cancel");
        MessageBox.show("Info", "cancel");
    });

    $('.swal-button--defeat').on('click', function () {
        //alert("Ok!!");
        MessageBox.show("Info", "Ok!!");
    });

    //var confirm = ;
    //if (confirm("Are you sure to save this data?")) {
    //    alert("ok!!");
    //}
    //else {
    //    alert("check!!");
    //}
}

saveInstruction = function (e) {
    var SubTestCode = viewModel.SubTestCode;
    var TestTypeName = viewModel.TestTypeName;
    var TestToolName = viewModel.TestToolName;
    var SubTestName = viewModel.SubTestName;
    var Description = viewModel.Description;
    var Duration = viewModel.Duration;
    var isDisplay = viewModel.isDisplay;
    var SubTestTitle = viewModel.Instruction.SubTestTitle;
    var DescriptionInstruction = viewModel.Instruction.DescriptionInstruction;
    var DisclaimerInstruction = viewModel.Instruction.DisclaimerInstruction;
    //console.log(viewModel.Instruction);
    // console.log('SubTestTitle=' + SubTestTitle + '&DescriptionInstruction=' + DescriptionInstruction + '&DisclaimerInstruction=' + DisclaimerInstruction);
    if (SubTestName == '' || Description == '' || TestToolName == '' || TestTypeName == '' || Duration == '' || SubTestTitle == '' || DescriptionInstruction == '' || DisclaimerInstruction == '') {
        swal("Inclompleted Data", "Pleaase Fill Mandatory", "warning", { closeOnClickOutside: false });
    } else {
        confirmMessageAdd();
        $('.swal-button--cancel').on('click', function () {
            //alert("cancel");
            MessageBox.show("Info", "cancel");
        });

        $('.swal-button--defeat').on('click', function () {
            //alert("Ok!!");
            MessageBox.show("Info", "cancel");
        });
    }

}

cancelInstruction = function () {
    confirmMessageCancel();

    $('.swal-button--cancel').on('click', function () {
        //alert("cancel plus");
        MessageBox.show("Info", "cancel plus");
    });

    $('.swal-button--danger').on('click', function () {
        //alert("Ok Cancel!!");
        MessageBox.show("Info", "Ok Cancel!!");
    });
}
function openDialog(e) {
    $('#popUpConfirmSave').data("kendoDialog").open();
}
Display = function (data) {
    $('#displayStatus').removeAttr('onchange');
    $('#displayStatus').attr('onchange', 'DisplayChecked(this)');
    viewModel.set('isDisplay', false);
}
DisplayChecked = function (data) {
    $('#displayStatus').removeAttr('onchange');
    $('#displayStatus').attr('onchange', 'Display(this)');
    viewModel.set('isDisplay', true);
}

function btnAnswerImage(dataImage) {
    //alert("ini Button Image!!!");
    var nomor = $(dataImage).attr('nomor');
    var count = parseInt(nomor) + 1;
    //alert(count);
}

function ConfigFieldForm() {
    var nameForm = localStorage.getItem("QuestionCategory");
    LoadingMask.show();
    if (nameForm == "NORMAL") {
        var id = ["#btn_answer", "#btn_image"]
        var sizeDefault = 5;
        var addfieldSample = sizeDefault - $(".add_sample").size();
        var addfieldSampleImg = sizeDefault - $(".add_image").size();
        for (i = 0; i < addfieldSample; i++) {
            add_answer(id[0]);
        }
        for (i = 0; i < addfieldSampleImg; i++) {
            add_image(id[1]);
        }
        LoadingMask.hide();
    } else if (nameForm == "WORKINGMEMORY") {
        var id = ["#btn_answer_Working", "#add_working_memory"]
        var sizeDefault = 5;
        var sizeDefaultMemory = 4;
        var addfieldAnswer = sizeDefault - $(".answer_working_page").size();
        var addfieldMemory = sizeDefaultMemory - $(".memory_working_page").size();
        for (i = 0; i < addfieldAnswer; i++) {
            addAnswerWorking(id[0]);
        }
        for (i = 0; i < addfieldMemory; i++) {
            addWorking(id[1]);
        }
        LoadingMask.hide();
    } else {
        var id = "#btnAddVerbal";
        var sizeDefault = 5;
        var addfieldAnswer = sizeDefault - $(".answer_verbal_page").size();
        for (i = 0; i < addfieldAnswer; i++) {
            addAnswerVerbal(id);
        }
        LoadingMask.hide();
    }

}

function ConfigFieldFormMultiple(NumForm) {
    var nameForm = localStorage.getItem("QuestionCategory");
    LoadingMask.show();
    if (nameForm == "NORMAL") {
        var id = ["#btn_answer", "#btn_image"]
        var sizeDefault = 5;
        var addfieldSample = sizeDefault - $(".add_sample" + NumForm).size();
        var addfieldSampleImg = sizeDefault - $(".add_image" + NumForm).size();
        for (i = 0; i < addfieldSample; i++) {
            add_answerMultiple(id[0] + NumForm);
        }
        for (i = 0; i < addfieldSampleImg; i++) {
            add_answerMultiple(id[1] + NumForm);
        }
        LoadingMask.hide();
    } else if (nameForm == "WORKINGMEMORY") {
        var id = ["#btn_answer_Working", "#add_working_memory"]
        var sizeDefault = 5;
        var sizeDefaultMemory = 4;
        var addfieldAnswer = sizeDefault - $(".answer_working_page" + NumForm).size();
        var addfieldMemory = sizeDefaultMemory - $(".memory_working_page" + NumForm).size();
        for (i = 0; i < addfieldAnswer; i++) {
            add_answerWorkingMultiple(id[0] + NumForm);
        }
        for (i = 0; i < addfieldMemory; i++) {
            add_workingMultiple(id[1] + NumForm);
        }
        LoadingMask.hide();
    } else {
        var id = "#btnAddVerbal";
        var sizeDefault = 5;
        var addfieldAnswer = sizeDefault - $(".answer_verbal_page" + + NumForm).size();
        for (i = 0; i < addfieldAnswer; i++) {
            add_verbalMultiple(id + NumForm);
        }
        LoadingMask.hide();
    }

}