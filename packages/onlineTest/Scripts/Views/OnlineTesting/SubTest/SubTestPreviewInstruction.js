$(document).ready(function () {
    getLocalStorage();
    ListLayout();
    
    kendo.bind($("body"), viewModel);
});

getLocalStorage = function () {
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
    $.indexedDB("LocalStore").objectStore("Instruction").get("VerbalMemory").then(function (value) {
       
        if (value.QuestionCategory == 'VERBALMEMORY') {
            viewModel.set('VerbalMemoryTitle', value.VerbalMemoryTitle); 
            viewModel.set('VerbalMemoryStory', value.VerbalMemoryStory);
            viewModel.set('VerbalMemoryDisclaimer', value.VerbalMemoryDisclaimer);
            viewModel.set('idLayout', value.idLayout);
            viewModel.set('answerVerbalMemory', value.answerVerbalMemory);
            viewModel.set('VerbalMemoryExplaination', value.VerbalMemoryExplaination);
            viewModel.set('TotalData', value.TotalData);
            viewModel.set('scoreVerbalMemoryList', value.scoreVerbalMemoryList);
            viewModel.set('VerbalMemoryQuestion', value.VerbalMemoryQuestion);
            viewModel.set('StoryDuration', value.StoryDuration);
        }
        else if (value.QuestionCategory == 'WORKINGMEMORY') {
            viewModel.set('WorkingMemoryTitle', value.WorkingMemoryTitle);
            viewModel.set('WorkingMemoryDuration', value.WorkingMemoryDuration);
            viewModel.set('WorkingMemoryTransition', value.WorkingMemoryTransition);
            viewModel.set('WorkingMemoryPreface', value.WorkingMemoryPreface);
            viewModel.set('WorkingMemoryDisclaimer', value.WorkingMemoryDisclaimer);
            viewModel.set('WorkingMemoryExplaination', value.WorkingMemoryExplaination);
            viewModel.set('WorkingMemoryLayout', value.WorkingMemoryLayout);
            viewModel.set('WorkingMemoryPrefaceDisplay', value.WorkingMemoryPrefaceDisplay);
            viewModel.set('WorkingMemoryQuestion', value.WorkingMemoryQuestion);
            viewModel.set('WorkingMemoryText', value.WorkingMemoryText);
            viewModel.set('WorkingMemoryAswer', value.WorkingMemoryAswer);
            viewModel.set('WorkingMemoriesScore', value.WorkingMemoriesScore);
            viewModel.set('totalDataAnswer', value.totalDataAnswer);
            viewModel.set('totalDataMemory', value.totalDataMemory);
            viewModel.set('IntroductionMemory', value.IntroductionMemory);
        }
        else if (value.QuestionCategory == 'NORMAL') {
            viewModel.set('SampleNormalTitle', value.SampleNormalTitle);
            viewModel.set('SampleNormalIntroduction', value.SampleNormalIntroduction);
            viewModel.set('NormalQuestionImage', value.NormalQuestionImage);
            viewModel.set('NormalQuestion', value.NormalQuestion);
            viewModel.set('NormalDisclaimer', value.NormalDisclaimer);
            viewModel.set('NormalTextList', value.NormalTextList);
            viewModel.set('ScoreNormalTextList', value.ScoreNormalTextList);
            viewModel.set('TotalNormalAnswer', value.TotalNormalAnswer);
            viewModel.set('NormalExplaination', value.NormalExplaination);
            viewModel.set('TypeAnswer', value.TypeAnswer);
            viewModel.set('typeLayout', value.typeLayout);
        }
    }, console.info);

    //console.log('title=' + LocalTitle + '&description=' + LocalDescription + '&disclaimer=' + LocalDisclaimer);
    //Instruksi Sub Test Word Fluency
    //Saudara akan megerjakan Sub Test Word Fluency untuk megukur perbendahraan kata.
    //Setiap soal pada bagian ini terdapat beberapa sinonim...
    //Apabila saudara telh memahami instruksi Sub Test Word Fluency, silahkan tekan tombol next...
}