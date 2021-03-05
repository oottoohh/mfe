$(document).ready(function () {
    var QC = localStorage.getItem("QuestionCategory");
    viewModel.set('QuestionCategory', QC);
    var branchProfileID = GetParameterByName('QuestionCategory');
    var QuestionCategoryLoad = GetParameterByName('QuestionAnswerCode');

    kendoEditor();
    kendoDropdownList();
    dropDownTestType();
    dropDownTestTool();
    kendoGrid();
    AnswerLayout();
    kendo.bind($("body"), viewModel);
    dropDownAnswerLayout();
    LoadData(branchProfileID, QuestionCategoryLoad);
    //kendoAnswerLayout();
});
LoadData = function (branchProfileID, QuestionCategoryLoad) {
    var QuestionAnswerCode = QuestionCategoryLoad;
    var dataInstruction = { "title": '', "description": '', "disclaimer": '' };
    $.indexedDB('LocalStore').objectStore("Instruction", { "autoIncrement": false }).add(dataInstruction, "Question").then(function (val) {
        dataInstruction.id = val;
        console.info(val);
    }, console.error);
    if (QuestionAnswerCode == '') {
        var QuestionCategory = localStorage.getItem('QuestionCategory');
        viewModel.set('QuestionCategory', QuestionCategory);
        var title = "";
        if (QuestionCategory == 'NORMAL') {
            $('.form-normal').removeAttr('hidden');
            title = "Category NORMAL";
            viewModel.set('title', title);
        } else if (QuestionCategory == 'WORKINGMEMORY') {
            $('.form-working').removeAttr('hidden');
            title = "Category WORKING MEMORY";
            viewModel.set('title', title);
            viewModels.set("Key", "AT19000001");
        } else if (QuestionCategory == 'VERBALMEMORY') {
            $('.form-verbal').removeAttr('hidden');
            title = "Category VERBAL MEMORY";
            viewModel.set('title', title);
            viewModels.set("Key", "AT19000001");
        }
    }
    else {
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + "api/Question/Detail",
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                QuestionCode: QuestionAnswerCode
            },
            success: function (response) {
                //$('#add_sample').empty();
                //$('#memory_working_page').empty();
                var data = "";
                if (response.VerbalMemoryQuestion != undefined) {
                    data = response.VerbalMemoryQuestion;
                } else if (response.WorkingMemoryQuestion != undefined) {
                    data = response.WorkingMemoryQuestion;
                } else if (response.NormalQuestion != undefined) {
                    data = response.NormalQuestion;
                }
                localStorage.setItem('QuestionCategory', data.QuestionCategory);
                var title = "Category " + data.QuestionCategory;
                viewModel.set('QnACode', data.QuestionAnswerCode);
                viewModel.set('QuestionCategory', data.QuestionCategory);
                viewModel.set('TestTypeName', "");
                viewModel.set('TestToolName', "");
                viewModel.set('SubTestName', "");
                viewModel.set('SubTestCd', "");
                //$('#mediaDisplay0').attr('src', data.QuestionImage);

                viewModel.set('DisplayStatus', data.DisplayStatus);
                viewModels.set("Key", data.AnswerTypeCode);
                viewModel.set('typeAnswer', data.AnswerTypeCode);
                viewModel.set('typeLayout', data.AnswerLayoutCode);
                AnswerLayoutChangeNormal();
                viewModels.set('TestTypeCode', "");
                viewModels.set('TestToolCode', "");
                viewModels.set("SubTestCode", "");
                //TestToolByTestType();

                if (data.QuestionCategory == 'NORMAL') {
                    var imageQuest = data.QuestionImage;
                    $('.form-normal').removeAttr('hidden');
                    viewModel.set('title', title);
                    //console.log(data);
                    viewModel.set('Normal.QuestionText', data.QuestionText);
                    viewModel.set('Normal.QuestionImage', data.QuestionImage);
                    viewModel.set('QuestionImage', data.QuestionImage);
                    var lengthNormal = data.Answers.length;
                    if (lengthNormal > 6) {
                        //$('#btnAnswerLayout').css({ "display": "none" });
                        $('#btnAnswerImage').css({ "display": "none" });
                    }
                    //$('#mediaPic0').attr('src', data.QuestionImage);
                    //$('#media0').val(data.QuestionImage);
                    //var inputImage = '<input name="media0" id="media0" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bnp, image/tif" />';
                    //var Filelist = [{
                    //    size: 18016,
                    //    type: "image/jpeg",
                    //    name: data.QuestionImage,
                    //    webkitRelativePath: "",
                    //    lastModified: 111111111,
                    //    lastModifiedDate:new Date()
                    //}];
                    //viewModel.mediaImageChange(inputImage, Filelist);
                    $("#mediaPic0".toString()).attr("src", data.QuestionImage);
                    $("#mediaDisplay0".toString()).attr("src", data.QuestionImage);
                    $($("#mediaPic0".toString()).parent().parent().children()[2]).show();
                    document.getElementById("mediaId0".toString()).value = 0;
                    if (data.AnswerTypeCode == "AT19000001") {
                        var no = 1;
                        for (nt = 0; nt <= data.Answers.length; nt++) {
                            viewModel.set('Normal.ListAnswer[' + nt + '].AnswerNormal', data.Answers[nt].Text);
                            viewModel.set('Normal.ListAnswer[' + nt + '].ScoreNormal', data.Answers[nt].AnswerScore);
                            //debugger
                            if (nt > 4) {
                                //alert(nt);
                                $('#addForm').append('<div class="addFormAnswer" id="label' + nt + '">' +
                                    '<label>Answer ' + no + '<span class="mandatory">*</span></label>' +
                                    '<a href="#" no="' + nt + '" id="nom' + nt + '" style="padding-left:65%;" hidden="hidden"><i class="fas fa-trash-alt"></i></a>' +
                                    '<div style="padding-left:140px;padding-right:120px;">' +
                                    '<textarea id="AnswerNormal' + nt + '" name="AnswerNormal' + nt + '" class="editor' + nt + '" rows="2" cols="30" style="height:140px; width:80%;" aria-label="editor" ></textarea>' +
                                    '</div><br />' +
                                    '<label>Input Score<span class="mandatory">*</span></label>' +
                                    '&nbsp;<input style="margin-left:7.5%;" type="number" name="ScoreNormal' + nt + '" id="ScoreNormal' + nt + '" class="k-textbox widths" value="' + data.Answers[nt].AnswerScore + '" /> <br />' +
                                    //'&nbsp;<input type="number" name="ScoreNormal' + nt + '" id="ScoreNormal' + nt + '" class="k-textbox widths" value="' + data.Answers[nt].AnswerScore + '" /> <br />' +
                                    '</div><br/>');
                                $(".editor" + nt).kendoEditor({
                                    value: data.Answers[nt].Text,
                                    resizable: {
                                        content: true
                                    },
                                    encoded: false
                                });
                                var checkCount = $('.addFormAnswer').length;
                                $('#btnAnswerLayout').removeAttr('nomor');
                                $('#btnAnswerLayout').attr('nomor', (checkCount) - 1);
                            }
                            no++;
                        }
                        var checkLength = $('.addFormAnswer').length;
                        var idAttr = $('#btnAnswerLayout').attr('id');
                        AnswerMemoryAttr(checkLength, idAttr);
                        //console.log(viewModel);
                    } else {
                        //kendoImageLayout();
                        var no = 1;
                        for (ilk = 0; ilk <= data.Answers.length; ilk++) {
                            viewModel.set('Normal.NormalImage[' + ilk + '].NormalAnswerImage', data.Answers[ilk].Url);
                            viewModel.set('Normal.NormalImage[' + ilk + '].NormalScoreImage', data.Answers[ilk].AnswerScore);
                            $('#mediaDisplay' + no).attr('src', data.Answers[ilk].Url);
                            //debugger
                            if (ilk > 4) {
                                $('#add_image').append('<div class="add_image" id="label' + ilk + '">' +
                                    '<label>Answer ' + no + '</label><br />' +
                                    '<a href="#" no="' + ilk + '" id="nom' + ilk + '" style="padding-left:30%;" hidden="hidden"><i class="fas fa-trash-alt"></i></a><br/>' +
                                    '<label style="padding-left:140px;padding-right:120px;">' +
                                    '<label>' +
                                    '<img id="mediaPic' + no + '" src="" hidden="hidden" />' +
                                    '<img id="mediaDisplay' + no + '" src="" class="backImage" width="100%" height="100%" />' +
                                    '<input name="media' + no + '" id="media' + no + '" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.mediaImageChange(this, this.files)" />' +
                                    '</label>' +
                                    '<input type="hidden" id="mediaId' + no + '" name="mediaId' + no + '" value="0" />' +
                                    '<a href="#" class="k-button" onclick="viewModel.mediaImageRemove(this)"><span class="fas fa-trash-alt"></span></a>' +
                                    //'<a href="#" class="k-button" style="display: none" onclick="viewModel.mediaImageRemove(this)"><span class="fas fa-trash-alt"></span></a>' +
                                    '</label>' +
                                    '<br />' +
                                    '<label style="padding-left:140px;padding-right:120px;">' +
                                    '<span>* Max file size 2Mb</span><br />' +
                                    '</label>' +
                                    '<br />' +
                                    '<label>Input Score</label>' +
                                    '&nbsp;<input style="margin-left:7.5%;" type="number" id="NormalScoreImage' + ilk + '" name="NormalScoreImage' + ilk + '" class="k-textbox widths" value="' + data.Answers[ilk].AnswerScore + '"/><br />' +
                                    //'&nbsp;<input type="number" id="NormalScoreImage' + ilk + '" name="NormalScoreImage' + ilk + '" class="k-textbox widths" value="' + data.Answers[ilk].AnswerScore + '"/><br />' +
                                    '</div><br />');
                                var checkCount = $('.add_image').length;
                                $('#btnAnswerImage').removeAttr('nomor');
                                $('#btnAnswerImage').attr('nomor', (checkCount) - 1);
                            }
                            no++;
                            $("#mediaPic" + (ilk + 1).toString()).attr("src", data.Answers[ilk].Url);
                            $("#mediaDisplay" + (ilk + 1).toString()).attr("src", data.Answers[ilk].Url);
                            $($("#mediaPic" + (ilk + 1).toString()).parent().parent().children()[2]).show();
                            document.getElementById("mediaId" + (ilk + 1).toString()).value = data.Answers[ilk].No;
                        }
                        var checkLength = $('.add_image').length;
                        var idAttr = $('#btnAnswerImage').attr('id');
                        WorkingMemoryAttr(checkLength, idAttr);
                    }
                }
                else if (data.QuestionCategory == 'WORKINGMEMORY') {
                    $('.form-working').removeAttr('hidden');
                    //alert(data.Answers.length);
                    var lengthAnswer = data.Answers.length;
                    var lengthMemory = data.Memories.length;
                    //if (lengthAnswer > 6) {
                    //    $('#btn_answer_Working').css({ "display": "none" });
                    //}
                    //if (lengthMemory > 6) {
                    //    $('#add_working_memory').css({ "display": "none" });
                    //}
                    viewModel.set('title', title);
                    viewModels.set("Key", "AT19000001");
                    viewModel.set('WorkingMemory.WorkingMemoryDuration', data.DurationPerMemory);
                    viewModel.set('WorkingMemory.WorkingMemoryDurationTransition', data.TransitionPerMemory);
                    viewModel.set('WorkingMemory.WorkingMemoryPreface', data.Preface);
                    viewModel.set('WorkingMemory.WorkingMemoryQuestion', data.QuestionText);
                    viewModel.set('WorkingMemory.WorkingMemoryLayout', data.AnswerLayoutCode);
                    var no = 1; var nomor = 1;
                    for (i = 0; i <= (data.Answers.length - 1); i++) {
                        viewModel.set('WorkingMemory. WorkingMemoriesAnswer[' + i + '].WorkingMemoryAswer', data.Answers[i].Text);
                        viewModel.set('WorkingMemory. WorkingMemoriesAnswer[' + i + '].WorkingMemoryScore', data.Answers[i].AnswerScore);
                        if (i > 4) {
                            var idAttr = $('#btn_answer_Working').attr('id');
                            var classField = idAttr == "add_working_memory" ? "memory_working_page" :
                                idAttr == "btnAnswerLayout" ? "addFormAnswer" : idAttr == "btn_answer_Working" ? "answer_working_page" : idAttr == "btnAnswerImage" ? "add_image" : "answer_verbal_page";

                            $('.' + classField + '>' + 'a#nom' + (j - 1)).attr('hidden', true);
                            $('a#nom' + (j - 1)).attr('hidden', true);
                            $('#answer_working_page').append('<div class="answer_working_page" id="label' + i + '">' +
                                '<label>Answer ' + no + '</label>' +
                                '<a href="#" no="' + i + '" id="nom' + i + '" style="padding-left:65%;" hidden="hidden" onclick="clearFields(' + i +', `btn_answer_Working`);"><i class="fas fa-trash-alt"></i></a>' +
                                '<div style="padding-left:140px;padding-right:120px;">' +
                                '<textarea id="WorkingMemoryAswer' + i + '" name="WorkingMemoryAswer' + i + '" rows="2" cols="30" class="editors' + i + '" style="height:140px;width:80%;" aria-label="editor" data-bind="value:WorkingMemory.WorkingMemoriesAnswer[' + i + '].WorkingMemoryAswer"></textarea>' +
                                '</div><br />' +
                                '<label>Input Score</label>' +
                                '&nbsp;<input style="margin-left:7.5%;" type="text" id="WorkingMemoryScore' + i + '" name="WorkingMemoryScore' + i + '" class="k-textbox" value="' + data.Answers[i].AnswerScore + '"/><br />' +
                                //'&nbsp;<input type="text" id="WorkingMemoryScore' + i + '" name="WorkingMemoryScore' + i + '" class="k-textbox" value="' + data.Answers[i].AnswerScore + '"/><br />' +
                                '</div></br>');
                            $(".editors" + i).kendoEditor({
                                value: data.Answers[i].Text,
                                resizable: {
                                    content: true
                                },
                                encoded: false
                            });
                            var check = $('.answer_working_page').length == 2 ? 3 : $('.answer_working_page').length;
                            $('#btn_answer_Working').removeAttr('nomor');
                            $('#btn_answer_Working').attr('nomor', (check) - 1);
                        }
                        no++;
                    }
                    var checkLength = $('.answer_working_page').length;
                    var idAttr = $('#btn_answer_Working').attr('id');
                    AnswerMemoryAttr(checkLength, idAttr);
                    for (j = 0; j <= (data.Memories.length - 1); j++) {
                        viewModel.set('WorkingMemory. WorkingMemories[' + j + '].WorkingMemoryText', data.Memories[j].Text);
                        if (j > 3) {
                            var idAttr = $('#add_working_memory').attr('id');
                            var classField = idAttr == "add_working_memory" ? "memory_working_page" :
                                idAttr == "btnAnswerLayout" ? "addFormAnswer" : idAttr == "btn_answer_Working" ? "answer_working_page" : idAttr == "btnAnswerImage" ? "add_image" : "answer_verbal_page";

                            $('.' + classField + '>' + 'a#nom' + (j - 1)).attr('hidden', true);
                            $('#memory_working_page').append('<div class="memory_working_page" id="label' + j + '">' +
                                '<label>Memory ' + nomor + '</label>' +
                                '<a href="#" no="' + j + '" id="nom' + j + '" style="padding-left:65%;" hidden="hidden" onclick="clearFields('+j+', `add_working_memory`);"><i class="fas fa-trash-alt"></i></a>' +
                                '<div style="padding-left:140px;padding-right:120px;">' +
                                '<textarea id="WorkingMemoryText' + j + '" name="WorkingMemoryText' + j + '" rows="2" cols="30" class="editor' + j + '" style="height:140px;width:80%;" aria-label="editor" data-bind="value:WorkingMemory.WorkingMemories[' + j + '].WorkingMemoryText"></textarea>' +
                                '</div' +
                                '</div>');
                            $(".editor" + j).kendoEditor({
                                value: data.Memories[j].Text,
                                resizable: {
                                    content: true
                                },
                                encoded: false
                            });
                            var checkLength = $('.memory_working_page').length == 0 ? 2 : $('.memory_working_page').length;
                            $('#add_working_memory').removeAttr('nomor');
                            $('#add_working_memory').attr('nomor', (checkLength) - 1);
                        }
                        nomor++;
                    }
                    var checkLengths = $('.memory_working_page').length;
                    var idAttr = $('#add_working_memory').attr('id');
                    WorkingMemoryAttr(checkLengths, idAttr);
                }
                else if (data.QuestionCategory == 'VERBALMEMORY') {
                    $('.form-verbal').removeAttr('hidden');
                    //kendoGrid();
                    viewModel.set('title', title);
                    viewModels.set("Key", "AT19000001");

                    kendoGrid();
                    var data = response.VerbalMemoryQuestion;
                    localStorage.setItem('QuestionCategory', data.QuestionCategory);
                    var title = "Category " + data.QuestionCategory;
                    var lengthVerbal = data.Answers.length;
                    //if (lengthVerbal > 6) {
                    //    $('#VerbalAsnwerBtn').css({ "display": "none" });
                    //}
                    viewModel.set('QnACode', data.QuestionAnswerCode);
                    viewModel.set('TestTypeName', data.TestTypeCode);
                    viewModel.set('TestToolName', data.TestToolCode);
                    viewModel.set('SubTestName', data.SubTestCode);
                    viewModel.set('typeAnswer', data.AnswerTypeCode);
                    viewModel.set('typeLayout', data.AnswerLayoutCode);
                    viewModel.set('DisplayStatus', data.DisplayStatus);
                    viewModel.set('Verbal.VerbalQuestion', data.QuestionText);
                    viewModel.set('Verbal.VerbalLayout', data.AnswerLayoutCode);
                    viewModel.set('Story.StoryList', data.Story.Code);
                    viewModel.set('StoryCode', data.Story.Code);
                    var no = 1; var nomor = 1;
                    for (k = 0; k <= data.Answers.length; k++) {
                        viewModel.set('Verbal. VerbalAnswers[' + k + '].VerbalAnswer', data.Answers[k].Text);
                        viewModel.set('Verbal. VerbalAnswers[' + k + '].VerbalScore', data.Answers[k].AnswerScore);
                        if (k > 4) {
                            $('#AddAswerVerbalLayout').append('<div class="answer_verbal_page" id="label' + k + '">' +
                                '<label>Answer ' + no + '</label>' +
                                '<a href="#" no="' + k + '" id="nom' + k + '" style="padding-left:65%;" hidden="hidden"><i class="fas fa-trash-alt"></i></a>' +
                                '<div style="padding-left:140px;padding-right:120px;">' +
                                '<textarea id="VerbalAnswer' + k + '" name="VerbalAnswer' + k + '" rows="2" cols="30" class="editors' + k + '" style="height:140px; width:80%;" aria-label="editor" data-bind="value: Verbal.VerbalAnswers[' + k + '].VerbalAnswer"></textarea>' +
                                '</div><br />' +
                                '<label>Input Score<span class="mandatory">*</span></label>' +
                                '&nbsp;<input style="margin-left:7.5%;" type="text" id="VerbalScore' + k + '" name="VerbalScore' + k + '" class="k-textbox" value="' + data.Answers[k].AnswerScore + '" /><br />' +
                                //'&nbsp;<input type="text" id="VerbalScore' + k + '" name="VerbalScore' + k + '" class="k-textbox" value="' + data.Answers[k].AnswerScore + '" /><br />' +
                                '</div></br>');
                            $(".editors" + k).kendoEditor({
                                value: data.Answers[k].Text,
                                resizable: {
                                    content: true
                                },
                                encoded: false
                            });
                            //viewModel.set("verbalMemory.VerbalMemories.answerVerbalMemory" + count, );
                            var check = $('.answer_verbal_page').length;
                            $('#VerbalAsnwerBtn').removeAttr('nomor');
                            $('#VerbalAsnwerBtn').attr('nomor', (check) - 1);
                        }
                        no++;
                    }
                    var checkLength = $('.answer_verbal_page').length;
                    var idAttr = $('#VerbalAsnwerBtn').attr('id');
                    WorkingMemoryAttr(checkLength, idAttr);
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
    }
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
            //console.log(e.item.context.innerHTML);
            viewModel.set('TestTypeName', e.item.context.innerHTML);
            onChangeTestType(e);
        }
    });
}
onChangeTestType = function (source) {
    var check_value = source.sender._selectedValue;
    viewModels.set('TestTypeCode', check_value);
    viewModel.set('TestTypeCode', check_value);
    TestToolByTestType();
}
dropDownTestTool = function () {
    $("#TestToolName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.TestToolList,
        dataTextField: "Value",
        dataValueField: "Code",
        //change: onChangeSubTest,
        select: function (e) {
            var id = viewModel.TestToolList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.TestToolList.find(x => x.Value === e.item.context.innerHTML).Value;
            //console.log(id);
            if (viewModel.TestToolCode !== "") {
                viewModel.set('TestToolCode', id);
                viewModel.set('TestToolName', name);
                viewModels.set('TestToolCode', id);
                SubTestByQuestion(id);
            } else {
                viewModel.set('TestToolCode', id);
                viewModel.set('TestToolName', name);
                viewModels.set('TestToolCode', id);
                SubTestByQuestion();
            }
            //console.log(e.item.context.innerHTML);
            //viewModel.set('TestToolCode', e.item.context.innerHTML);
        }
    });
}
onChangeSubTest = function (datas) {
    var x = datas.sender._selectedValue;
    SubTestByQuestion(x);
    ////console.log(datas);
    //var check_value = datas.sender._selectedValue;
    //viewModels.set('TestToolCode', check_value);
    ////SubTestByTestTool();
    //SubTestByQuestion();
}
dropDownSubTest = function () {
    $('#SubTestName').kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.SubTestList,
        dataTextField: "Value",
        dataValueField: "Code",
        change: subtest,
        select: function (e) {
            var id = viewModel.SubTestList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.SubTestList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.TestToolCode !== "") {
                viewModel.set('SubTestCd', id);
                viewModel.set('SubTestCode', id);
                viewModel.set('SubTestName', name);
            } else {
                viewModel.set('SubTestCd', id);
                viewModel.set('SubTestCode', id);
                viewModel.set('SubTestName', name);
            }
            //viewModel.set('SubTestCode', e.item.context.innerHTML);
        }
    });
}
subtest = function (e) {
    viewModel.set('SubTestCd', e.sender._selectedValue);
    viewModel.set('SubTestCode', e.sender._selectedValue);
}
kendoEditor = function () {
    $(".editor").kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });
}
kendoDropdownList = function () {
    $("#typeLayout").kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModel.AnswerLayoutList,
    });
    //console.log("Ready From Dcument!!!1");

    $("#typeAnswer").kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModels.CategoryAnswer,
        change: onChangeAnswer
    });
    function onChangeAnswer(source) {
        var check_value = source.sender._selectedValue;
        viewModels.set("Key", check_value);
        AnswerLayout();
        //console.log(source);
        var check_value = viewModel.typeAnswer;
        if (check_value == "AT19000001") {
            //alert("hai");
            dropDownAnswerLayout();
        }
        else {
            //alert("hello");
            kendoImageLayout();
        }
    }
}
dropDownAnswerLayout = function () {
    $('#addFormAnswer').empty();
    $("#typeLayout").kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModel.AnswerLayoutList,

    });
    $('#formAddLayout').removeAttr('hidden');
    $('#pageLayout').removeAttr('hidden');
    $('#formAddLayout').removeAttr('nomor');
    $('#formAddLayout').attr('nomor', 3);
    //$('#formAddLayout').css({ "display": "inline" });
    $('#formAddImage').attr('hidden', true);
    $('#pageImage').attr('hidden', true);
}
kendoImageLayout = function () {
    $('#addFormImage').empty();
    $("#typeLayout").kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModel.AnswerLayoutList
    });
    $('#formAddImage').removeAttr('hidden', 'hidden');
    $('#pageImage').removeAttr('hidden', 'hidden');
    $('#formAddImage').removeAttr('nomor');
    $('#formAddImage').attr('nomor', 3);
    //$('#formAddImage').css({ "display": "inline" });
    $('#formAddLayout').attr('hidden', true);
    $('#pageLayout').attr('hidden', true);
}
function btnAnswerLayout(dataLayout) {
    var checkCount = $('.addFormAnswer').length;
    if (checkCount >= 7) {
        //$('#btnAnswerLayout').css({ "display": "none" });
        swal("Failed", "Maximal Answers is 7", "warning", { closeOnClickOutside: false });
        return;
    } else {
        var nomor = $(dataLayout).attr('nomor');
        var count = parseInt(nomor) + 1;
        $('a#nom' + (count - 1)).attr('hidden', true);
        var no = count + 1;
        var idAttr = $('#btnAnswerLayout').attr('id');
        $('#addForm').append('<div class="addFormAnswer" id="label' + count + '">' +
            '<label>Answer ' + no + '</label>' +
            '<a href="#" no="' + count + '" id="nom' + count + '" style="padding-left:65%;" onclick="clearFields(' + count + ',`btnAnswerLayout`);"><i class="fas fa-trash-alt"></i></a>' +
            '<div style="padding-left:140px;padding-right:120px;">' +
            '<textarea id="AnswerNormal' + count + '" name="AnswerNormal' + count + '" class="editor' + count + '" rows="2" cols="30" style="height:140px; width:80%;" aria-label="editor" data-bind="value: Normal.ListAnswer[' + count + '].AnswerNormal"></textarea>' +
            '</div><br />' +
            '<label>Input Score</label>' +
            '&nbsp;<input style="margin-left:7.5%;" type="number" name="ScoreNormal' + count + '" id="ScoreNormal' + count + '" class="k-textbox widths"  data-bind="value: Normal.ListAnswer[' + count + '].ScoreNormal"/> <br />' +
            //'&nbsp;<input type="number" name="ScoreNormal' + count + '" id="ScoreNormal' + count + '" class="k-textbox widths"  data-bind="value: Normal.ListAnswer[' + count + '].ScoreNormal"/> <br />' +
            '</div></br>');
        $(".editor" + count).kendoEditor({
            resizable: {
                content: true
            },
            encoded: false
        });
        $('#btnAnswerLayout').removeAttr('nomor');
        $('#btnAnswerLayout').attr('nomor', count);
        var checkCount = $('.addFormAnswer').length;
        //clearField(count, idAttr);
    }
}
btnAnswerImage = function (dataRow) {
    var check = $('.add_image').length;
    if (check >= 7) {
        //$('#btnAnswerLayout').css({ "display": "none" });
        swal("Failed", "Maximal Answers is 7", "warning", { closeOnClickOutside: false });
        return;
    } else {
        var nomor = $(dataRow).attr('nomor');
        var count = parseInt(nomor) + 1;
        $('a#nom' + (count - 1)).attr('hidden', true);
        var no = count + 1;
        $('#add_image').append('<div class="add_image" id="label' + count + '">' +
            '<label>Answer ' + no + '</label><br />' +
            '<a href="#" no="' + count + '" id="nom' + count + '" style="float: right;position: relative;right: 60%;"  onclick="clearFields(' + count + ', `btnAnswerImage`);"><i class="fas fa-trash-alt"></i></a><br/>' +
            '<label style="padding-left:140px;padding-right:120px;">' +
            '<label>' +
            '<img id="mediaPic' + no + '" src="" hidden="hidden" />' +
            '<img id="mediaDisplay' + no + '" src="" class="backImage" width="100%" height="100%" />' +
            '<input name="media' + no + '" id="media' + no + '" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.mediaImageChange(this, this.files)" />' +
            '</label>' +

            '<input type="hidden" id="mediaId' + no + '" name="mediaId' + no + '" value="0" />' +
            //'<a href="#" class="k-button" onclick="viewModel.mediaImageRemove(this)"><span class="fas fa-trash-alt"></span></a>' +
            //'<a href="#" class="k-button" style="display: none" onclick="viewModel.mediaImageRemove(this)"><span class="fas fa-trash-alt"></span></a>' +
            '</label>' +
            '<br />' +
            '<label style="padding-left:140px;padding-right:120px;">' +
            '<span>* Max file size 2Mb</span><br />' +
            '</label>' +
            '<br />' +
            '<label>Input Score</label>' +
            '&nbsp;<input style="margin-left:7.5%;" type="number" id="NormalScoreImage' + count + '" name="NormalScoreImage' + count + '" class="k-textbox widths" data-bind="value:Normal.NormalImage[' + count + '].NormalScoreImage"/><br />' +
            //'&nbsp;<input type="number" id="NormalScoreImage' + count + '" name="NormalScoreImage' + count + '" class="k-textbox widths" data-bind="value:Normal.NormalImage[' + count + '].NormalScoreImage"/><br />' +
            '</div></br>');
        $('#btnAnswerImage').removeAttr('nomor');
        $('#btnAnswerImage').attr('nomor', count);
        var idAttr = $('#btnAnswerImage').attr('id');
        //clearFields(count, idAttr);
    }
}
addWorking = function (dataWorking) {
    var nomor = $(dataWorking).attr('nomor');
    var count = parseInt(nomor) + 1;
    $('a#nom' + (count - 1)).attr('hidden', true);
    var no = count + 1;
    var idAttr = $('#add_working_memory').attr('id');
    $('#memory_working_page').append('<div class="memory_working_page" id="label' + count + '">' +
        '<label>Memory ' + no + '</label>' +
        '<a href="#" no="' + count + '" id="nom' + count + '" style="padding-left:65%;" onclick="clearFields(' + count + ', `add_working_memory`);"><i class="fas fa-trash-alt"></i></a>' +
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
    // if (check >= 7) {
    //     $('#add_working_memory').css({ "display": "none" });
    // }

    //clearFields(count, idAttr);
}
addAnswerWorking = function (dataAnswer) {
    var nomor = $(dataAnswer).attr('nomor');
    var count = parseInt(nomor) + 1;
    $('a#nom' + (count - 1)).attr('hidden', true);
    var no = count + 1;
    $('#answer_working_page').append('<div class="answer_working_page" id="label' + count + '">' +
        '<label>Answer ' + no + '</label>' +
        '<a href="#" no="' + count + '" id="nom' + count + '" style="padding-left:65%;" onclick="clearFields(' + count + ', `btn_answer_Working`);"><i class="fas fa-trash-alt"></i></a>' +
        '<div style="padding-left:140px;padding-right:120px;">' +
        '<textarea id="WorkingMemoryAswer' + count + '" name="WorkingMemoryAswer' + count + '" rows="2" cols="30" class="editors' + count + '" style="height:140px;width:80%;" aria-label="editor" data-bind="value:WorkingMemory.WorkingMemoriesAnswer[' + count + '].WorkingMemoryAswer"></textarea>' +
        '</div><br />' +
        '<label>Input Score</label>' +
        '&nbsp;<input style="margin-left:7.5%;" type="number" id="WorkingMemoryScore' + count + '" name="WorkingMemoryScore' + count + '" class="k-textbox widths" data-bind="value:WorkingMemory.WorkingMemoriesAnswer[' + count + '].WorkingMemoryScore"/><br />' +
        //'&nbsp;<input type="number" id="WorkingMemoryScore' + count + '" name="WorkingMemoryScore' + count + '" class="k-textbox widths" data-bind="value:WorkingMemory.WorkingMemoriesAnswer[' + count + '].WorkingMemoryScore"/><br />' +
        '</div></br>');
    $(".editors" + count).kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });
    //debugger
    $('#btn_answer_Working').removeAttr('nomor');
    $('#btn_answer_Working').attr('nomor', count);
    var check = $('.answer_working_page').length;
    //if (check >= 7) {
    //    $('#btn_answer_Working').css({ "display": "none" });
    //}
    var idAttr = $('#btn_answer_Working').attr('id');
    clearField(count, idAttr);
}
addAnswerVerbal = function (dataVerbal) {
    var nomor = $(dataVerbal).attr('nomor');
    var count = parseInt(nomor) + 1;
    $('a#nom' + (count - 1)).attr('hidden', true);
    var no = count + 1;
    $('#AddAswerVerbalLayout').append('<div class="answer_verbal_page" id="label' + count + '">' +
        '<label>Answer ' + no + '</label>' +
        '<a href="#" no="' + count + '" id="nom' + count + '" style="padding-left:65%;" onclick="clearFields(' + count + ', `VerbalAsnwerBtn`);"><i class="fas fa-trash-alt"></i></a>' +
        '<div style="padding-left:140px;padding-right:120px;">' +
        '<textarea id="VerbalAnswer' + count + '" name="VerbalAnswer' + count + '" rows="2" cols="30" class="editors' + count + '" style="height:140px; width:80%;" aria-label="editor" data-bind="value: Verbal.VerbalAnswers[' + count + '].VerbalAnswer"></textarea>' +
        '</div><br />' +
        '<label>Input Score</label>' +
        '&nbsp;<input style="margin-left:7.5%;" type="number" id="VerbalScore' + count + '" name="VerbalScore' + count + '" class="k-textbox widths" data-bind="value:Verbal.VerbalAnswers[' + count + '].VerbalScore"/><br />' +
        //'&nbsp;<input type="number" id="VerbalScore' + count + '" name="VerbalScore' + count + '" class="k-textbox widths" data-bind="value:Verbal.VerbalAnswers[' + count + '].VerbalScore"/><br />' +
        '</div></br>');
    $(".editors" + count).kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });
    $('#VerbalAsnwerBtn').removeAttr('nomor');
    $('#VerbalAsnwerBtn').attr('nomor', count);
    var check = $('.answer_verbal_page').length;
    //if (check >= 7) {
    //    $('#VerbalAsnwerBtn').css({ "display": "none" });
    //}
    var idAttr = $('#VerbalAsnwerBtn').attr('id');
    //clearFields(count, idAttr);
}
AnswerMemoryAttr = function (checkLength, idAttr) {
    //debugger
    var ansLength = parseInt(checkLength) - 1;
    $('a#nom' + ansLength).removeAttr('hidden');
    //clearField(ansLength, idAttr);
}
clearField = function (count, idAttr) {
    //debugger
    //alert(count + idAttr);
    if (viewModel.QnACode == '') {
        //debugger
        $('#noms' + count).on('click', function () {
            $('#labels' + count).remove();
            $('#nom' + (count - 1)).removeAttr('hidden');
            $('#' + idAttr).removeAttr('nomor');
            $('#' + idAttr).attr('nomor', (count - 1));
            $('#' + idAttr).css({ "display": "inline" });
        });
    } else {
        $('#nom' + count).on('click', function () {
            $('#labels' + count).remove();
            $('#nom' + (count - 1)).removeAttr('hidden');
            $('#' + idAttr).removeAttr('nomor');
            $('#' + idAttr).attr('nomor', (count - 1));
            $('#' + idAttr).css({ "display": "inline" });
            AnswerMemoryAttr(count, idAttr);
        });
        //
    }
    //return;
}
WorkingMemoryAttr = function (checkLength, idAttr) {
    var ansLength = parseInt(checkLength) - 1;
    $('a#nom' + ansLength).removeAttr('hidden');
    //clearFields(ansLength, idAttr);
}
clearFields = function (count, idAttr) {
    //debugger
    if (viewModel.QnACode == '') {
        $('#nom' + count).on('click', function () {
            $('#label' + count).remove();
            $('#nom' + (count - 1)).removeAttr('hidden');
            $('#' + idAttr).removeAttr('nomor');
            $('#' + idAttr).attr('nomor', (count - 1));
            $('#' + idAttr).css({ "display": "inline" });
        });
    } else {
        $('#nom' + count).on('click', function () {
            $('#label' + count).remove();
            $('#nom' + (count - 1)).removeAttr('hidden');
            $('#' + idAttr).removeAttr('nomor');
            $('#' + idAttr).attr('nomor', (count - 1));
            $('#' + idAttr).css({ "display": "inline" });
            AnswerMemoryAttr(count, idAttr);
        });
        //
    }
    //return;
}
kendoGrid = function () {
    $("#gridStory").kendoGrid({
        width: 350,
        resizable: true,
        columns: [
            {
                field: "Code", type: "boolean", editable: "false", title: "Checkbox",
                title: "Choose", width: 45,
                template: function (dataItem) {
                    var StoryCode = viewModel.StoryCode;
                    var ID
                    ID = dataItem.Code;
                    var SubTest = dataItem.Name;
                    var SubTestCode = dataItem.Duration;
                    if (dataItem.Code == StoryCode) {
                        return "<input id='Radiobox" + ID + "' value='" + ID + "' name='RadioStory' class='checkone' type='radio' checked='true' />";
                    } else {
                        return "<input id='Radiobox" + ID + "' value='" + ID + "' name='RadioStory' class='checkone' type='radio' " + (dataItem.DisplayStatus == 'true' ? "checked" : "") + " />";
                    }
                }
            },
            {
                field: "Code", title: "Action", width: 50,
                template: function (dataAction) {
                    return "<a class='k-button k-grid-edit' style='min-width:16px' id='" + dataAction.Code + "' onclick='story(this)'><span class='k-icon k-edit'></span></a>" +
                        "<a class='k-button k-grid-erase' style='min-width:16px' id=" + dataAction.Code + " href='#' onclick='DeleteStory(this)'><span class='fas fa-trash-alt'></span></a>";

                }
            },
            { field: "Name", title: "Name", width: 200 },
            { field: "Duration", title: "Duration <p>(Second)</p>", width: 65 },
            {
                field: "Desc", title: "Story", width: 300, encoded: false,
                template: function (dataDesc) {
                    var listDesc = dataDesc.Desc;
                    var desc = listDesc.substring(0, 20);
                    return "<span>" + desc + "</span>";
                }
            },
        ],
        dataBound: function (e) {
            var gridDataView = $("#gridStory").data().kendoGrid.dataSource.view();
            for (var i = 0; i < gridDataView.length; i++) {
                var check = $.grep(viewModel.Story.StoryList, function (e) { return e == gridDataView[i].ActivityID });
                if (check.length > 0) {
                    $("#gridMember tr td input").eq(i).prop("checked", true);
                }
            }
        },
        sortable: true,
        //columnMenu: true,
        pageable: {
            refresh: true,
            pageSizes: [5, 10, 25],
            buttonCount: 5
        }
    });
}
Display = function (data) {
    $('#display_status').removeAttr('onchange');
    $('#display_status').attr('onchange', 'DisplayChecked(this)');
    viewModel.set('DisplayStatus', false);
}
DisplayChecked = function (data) {
    $('#display_status').removeAttr('onchange');
    $('#display_status').attr('onchange', 'Display(this)');
    viewModel.set('DisplayStatus', true);
}
$(document).on('click', 'input[name=RadioStory]:radio', function (e) {
    var idx = $(this).val();
    //console.log(idx);
    viewModel.set("Story.StoryList", idx);
});
function btnAnswerImage(dataImage) {
    //debugger
    //alert("ini Button Image!!!");
    var nomor = $(dataImage).attr('nomor');
    var count = parseInt(nomor) + 1;
    //alert(count);
}