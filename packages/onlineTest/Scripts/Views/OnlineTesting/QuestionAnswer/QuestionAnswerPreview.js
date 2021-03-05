$(document).ready(function () {
    getLocalStorage();
    //ListLayout();
    
    kendo.bind($("body"), viewModel);
    
});

getLocalStorage = function () {
    $.indexedDB("LocalStore").objectStore("Instruction").get("Question").then(function (value) {
        //console.log(value.QuestionCategory);
        viewModel.set('title', value.title);
        if (value.QuestionCategory == 'VERBALMEMORY') {
            viewModel.set('VerbalStroyCode', value.VerbalStroyCode);
            viewModel.set('VerbalQuestion', value.VerbalQuestion);
            viewModel.set('VerbalLayout', value.VerbalLayout);
            viewModel.set('VerbalList', value.VerbalList);
            viewModel.set('VerbalScore', value.VerbalScore);
            viewModel.set('VerbalTotal', value.VerbalTotal);
            viewModel.set('SubTestName', value.SubTestName);
            $.ajax({
                type: 'POST',
                url: SERVICE_URL + "api/Story/Detail",
                headers: { "Authorization-Token": Cookie.load() },
                data: { StoryCode: value.VerbalStroyCode },
                success: function (response) {
                    //console.log(response.Story);
                    viewModel.set("Story.VerbalName", response.Story.Name);
                    viewModel.set("Story.VerbalCode", response.Story.Code);
                    viewModel.set("Story.VerbalDuration", response.Story.Duration);
                    viewModel.set("VerbalDuration", response.Story.Duration);
                    localStorage.setItem('VerbalDuration', response.Story.Duration);
                    viewModel.set("Story.VerbalStory", response.Story.Text);
                    onloadPage();
                },
                error: function (x, e) {
                    //alert("Error");
                    MessageBox.show("Error", "Error");
                }
            });
            
        }
        else if (value.QuestionCategory == 'WORKINGMEMORY') {
            viewModel.set('WorkingMemoryDuration', value.WorkingMemoryDuration);
            viewModel.set('WorkingMemoryDurationTransition', value.WorkingMemoryDurationTransition);
            viewModel.set('WorkingMemoryPreface', value.WorkingMemoryPreface);
            viewModel.set('WorkingMemoryLayout', value.WorkingMemoryLayout);
            viewModel.set('WorkingMemoryPrefaceDisplay', value.WorkingMemoryPrefaceDisplay);
            viewModel.set('WorkingMemoryQuestion', value.WorkingMemoryQuestion);
            viewModel.set('WorkingMemoryText', value.WorkingMemoryText);
            viewModel.set('WorkingMemoryAswer', value.WorkingMemoryAswer);
            viewModel.set('WorkingMemoriesScore', value.WorkingMemoriesScore);
            viewModel.set('totalDataAnswer', value.totalDataAnswer);
            viewModel.set('totalDataMemory', value.totalDataMemory);
            viewModel.set('SubTestName', value.SubTestName);
            onloadPage();
        }
        else if (value.QuestionCategory=='NORMAL') {
            viewModel.set('title', value.QuestionCategory);
            viewModel.set('SubTestName', value.SubTestName);
            viewModel.set('QuestionText', value.QuestionText);
            viewModel.set('QuestionImage', value.QuestionImage);
            viewModel.set('AnswerNormal', value.AnswerNormal);
            viewModel.set('ScoreNormal', value.ScoreNormal);
            viewModel.set('TotalDataNormal', value.TotalDataNormal);
            viewModel.set('typeAnswer', value.typeAnswer);
            viewModel.set('typeLayout', value.typeLayout);
            onloadPage();
        }
    }, console.info);
}