$(document).ready(function () {
    var idx = $.urlParam('id');  
    getLocalStorage(idx);
    kendo.bind($("body"), viewModel);
});
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
}
getLocalStorage = function (idx) {
    var i = idx - 2; //get index 
    $.indexedDB("LocalStore").objectStore("Instruction").get("Instruksi").then(function (value) {
        viewModel.set('title', value.title);
        viewModel.set('description', value.description);
        viewModel.set('disclaimer', value.disclaimer);
        viewModel.set('SubTestName', value.SubTestName);

    }, console.info);
    $.indexedDB("LocalStore").objectStore("Instruction").get("Confirmation").then(function (value) {
        viewModel.set('ConfirmationTitle', value.ConfirmationTitle);
        viewModel.set('ConfirmationDescription', value.ConfirmationDescription);
        viewModel.set('ConfirmationDisclaimer', value.ConfirmationDisclaimer); 

    }, console.info);
    var nameForm = localStorage.getItem("QuestionCategory");
    var getLocalStorage = nameForm == "NORMAL" ? "SampleNormal" : nameForm == "WORKINGMEMORY" ? "SampleWorkingMemory" : "SampleVerbalMemory";
    var value = localStorage.getItem(getLocalStorage);
    var parseJson = JSON.parse(value);
    var data = parseJson[i];
    var TextList = $.map(data.Answers, function (obj) {
        return data.AnswerTypeCode == "AT19000002" ? obj.Url : obj.Text
    });
    var ScoreTextList = $.map(data.Answers, function (obj) {
        return obj.IsCorrect
    });
    
    if (nameForm == 'VERBALMEMORY') {
        viewModel.set('VerbalMemoryTitle', data.Title);
        viewModel.set('VerbalMemoryStory', data.Introduction);
        viewModel.set('Desclaimer', data.Desclaimer);
        viewModel.set('idLayout', data.AnswerLayoutCode);
        viewModel.set('answerVerbalMemory', TextList);
        viewModel.set('VerbalMemoryExplaination', data.Explaination);
        viewModel.set('TotalData', data.Answers.length);
        viewModel.set('scoreVerbalMemoryList', ScoreTextList);
        viewModel.set('VerbalMemoryQuestion', data.QuestionText);
        viewModel.set('StoryDuration', data.StoryDuration);
    }
    else if (nameForm == 'WORKINGMEMORY') {
        var ScoreMemoryWorking = $.map(data.Answers, function (obj) {
            return obj.IsCorrect
        });
        var WorkingMemoryText = $.map(data.Memory, function (obj) {
            let container = [obj.Text, ""];                
            return container;
        });
        viewModel.set('WorkingMemoryTitle', data.Title);
        viewModel.set('WorkingMemoryDuration', data.DurationPerMemory);
        viewModel.set('WorkingMemoryTransition', data.TransitionPerMemory);
        viewModel.set('WorkingMemoryPreface', data.Preface);
        viewModel.set('WorkingMemoryDisclaimer', data.Desclaimer);
        viewModel.set('WorkingMemoryExplaination', data.Explaination);
        viewModel.set('WorkingMemoryLayout', data.AnswerLayoutCode);
        viewModel.set('WorkingMemoryPrefaceDisplay', data.IsPreface);
        viewModel.set('WorkingMemoryQuestion', data.QuestionText);
        viewModel.set('WorkingMemoryText', WorkingMemoryText);
        viewModel.set('WorkingMemoryAswer', TextList);
        viewModel.set('WorkingMemoriesScore', ScoreMemoryWorking);
        viewModel.set('totalDataAnswer', data.Answers.length);
        viewModel.set('totalDataMemory', data.Memory.length);
        viewModel.set('IntroductionMemory', data.Introduction);
    }
    else if (nameForm == 'NORMAL') {
        viewModel.set('SampleNormalTitle', data.Title);
        viewModel.set('SampleNormalIntroduction', data.Introduction);
        viewModel.set('NormalQuestionImage', data.QuestionImage);
        viewModel.set('NormalQuestion', data.QuestionText);
        viewModel.set('NormalDisclaimer', data.Desclaimer);
        viewModel.set('NormalTextList', TextList);
        viewModel.set('ScoreNormalTextList', ScoreTextList);
        viewModel.set('TotalNormalAnswer', data.Answers.length);
        viewModel.set('NormalExplaination', data.Explaination);
        viewModel.set('TypeAnswer', data.AnswerTypeCode);
        viewModel.set('typeLayout', data.AnswerLayoutCode);
    }
    //console.log('title=' + LocalTitle + '&description=' + LocalDescription + '&disclaimer=' + LocalDisclaimer);
    //Instruksi Sub Test Word Fluency
    //Saudara akan megerjakan Sub Test Word Fluency untuk megukur perbendahraan kata.
    //Setiap soal pada bagian ini terdapat beberapa sinonim...
    //Apabila saudara telh memahami instruksi Sub Test Word Fluency, silahkan tekan tombol next...
}