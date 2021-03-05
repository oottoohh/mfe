var viewModel = kendo.observable({
    title: "",
    SubTestName: "",
    //Data Normal
    QuestionText: "",
    QuestionImage: "",
    AnswerNormal: [],
    ScoreNormal: [],
    TotalDataNormal: 0,
    typeAnswer: "",
    typeLayout: "",
    //End Data Normal
    //Data Working Memory
    WorkingMemoryDuration: 0,
    WorkingMemoryPreface: "",
    WorkingMemoryPrefaceDisplay: false,
    WorkingMemoryLayout: 0,
    WorkingMemoryScore: 0,
    WorkingMemoryQuestion: "",
    WorkingMemoryText: [],
    WorkingMemoryAswer: [],
    WorkingMemoriesScore: [],
    totalDataAnswer: 0,
    totalDataMemory: 0,
    //End Data Working Memory
    //Data VerbalMemory
    VerbalStroyCode: "",
    VerbalQuestion: "",
    VerbalLayout: "",
    VerbalList: [],
    VerbalScore: [],
    VerbalTotal: "",
    VerbalDuration:0,
    QuestionCategory: "",
    Story: {
        VerbalName: "",
        VerbalCode: "",
        VerbalDuration: 0,
        VerbalStory:"",
    }
    //End Data Verbl Memory

});

onloadPage = function () {
    //console.log(viewModel);
    $('#Horizontal').empty();
    $('#Vertikal').empty();
    $('#Img3').empty();
    $('#Img2').empty();
    var QuestionCategory = localStorage.getItem('QuestionCategory');
    if (QuestionCategory == 'VERBALMEMORY') {
        $('#VerbalPreface').removeAttr('hidden');
        $('#PreviewSample').attr('hidden', true);
        var durationStrory = localStorage.getItem("VerbalDuration");
        //console.log(durationStrory);
        var time = parseInt(durationStrory) * 1000;
        setTimeout(StoryQuestion, time);
    }
    else if (QuestionCategory == 'NORMAL') {
        $('#PreviewSample').removeAttr('hidden');
        $('.normalPrev').removeAttr('hidden');
        var chekcLayout = viewModel.typeLayout;
        var checkTypeAnswer = viewModel.typeAnswer;
        var QuestionImage = viewModel.QuestionImage;
        var no = 1;
        var number = 4;
        var noms = 5;
        if (QuestionImage == '' || QuestionImage == 'a.jpg' || QuestionImage == null || QuestionImage == undefined) {
            $('#ImageSoal').attr('hidden', true);
        } else {
            $('#ImageSoal').removeAttr('hidden');
            $('#ImageSoal').attr('src', QuestionImage);
        }
        var length = viewModel.TotalDataNormal;
        var nominals = parseInt(length);
        if (checkTypeAnswer == 'AT19000001') {
            var style = '';
            for (st = 1; st <= 7; st++) {
                if (chekcLayout == "AL19000001") {
                    if (st == nominals) {
                        var nomorStyle = (100 / nominals) - 1.2;
                        style = 'style="width:' + nomorStyle + '%";';
                        break;
                    }
                } else {
                    style = 'style="width:100%";';
                    break;
                }
            }
            if (chekcLayout == "AL19000001") {
                $('#Horizontal').removeAttr('hidden');
                
                //if (length == 2) {
                //    style = 'style="width:49%";';
                //} else if (length == 3) {
                //    style = 'style="width:32%";';
                //}
                //else if (length == 4) {
                //    style = 'style="width:23.3%";';
                //}
                //else if (length == 5) {
                //    style = 'style="width:18.7%";';
                //}
                //else if (length == 6) {
                //    style = 'style="width:15.5%";';
                //}
                //else if (length == 7) {
                //    style = 'style="width:13%"; ';
                //}
                for (i = 0; i < length; i++) {
                    $('#Horizontal').append('<button class="k-button k-default k-form-new" '  + style + '  nomor=' + no + ' >(' + no + ')<br/><span class="answerList listSpan">' + viewModel.AnswerNormal[i] + '</span></button>&nbsp;&nbsp;&nbsp;');
                    no++;
                }
            }
            else {
                //style = 'style="width:100%"';
                $('#Vertikal').removeAttr('hidden');
                for (i = 0; i < length; i++) {

                    $('#Vertikal').append('<button class="k-button k-default k-form-new" ' + style + ' nomor=' + no + '>(' + no + ')<br/><span class="answerList" style="width:50%;">' + viewModel.AnswerNormal[i] + '</span></button><br/><br/>');
                    no++;
                }
            }
        }
        else {
            $('#ImageAnswer').removeAttr('hidden');
            if (chekcLayout == 'AL19000003') {
                for (imgL = 0; imgL < 3; imgL++) {
                    if (viewModel.AnswerNormal[imgL] == undefined || viewModel.AnswerNormal[imgL] == null) {

                    } else {
                        $('#Img3').append('<button class="k-button k-default k-form-new" nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><img src="' + viewModel.AnswerNormal[imgL] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    no++;
                }
                for (imgB = 3; imgB < length; imgB++) {
                    if (viewModel.AnswerNormal[imgB] == undefined || viewModel.AnswerNormal[imgB] == null) {

                    } else {
                        $('#Img2').append('<button class="k-button k-default k-form-new" nomor=' + number + ' onclick="BtnCheckAnswer(this)">(' + number + ')<br/><img src="' + viewModel.AnswerNormal[imgB] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    number++;
                }

            }
            else if (chekcLayout == 'AL19000004') {
                for (imgL1 = 0; imgL1 < 3; imgL1++) {
                    if (viewModel.AnswerNormal[imgL1] == undefined || viewModel.AnswerNormal[imgL1] == null) {

                    } else {
                        $('#Img3').append('<button class="k-button k-default k-form-new" nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><img src="' + viewModel.AnswerNormal[imgL1] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    no++;
                }
                for (imgB1 = 3; imgB1 < length; imgB1++) {
                    if (viewModel.AnswerNormal[imgB1] == undefined || viewModel.AnswerNormal[imgB1] == null) {

                    } else {
                        $('#Img2').append('<button class="k-button k-default k-form-new" nomor=' + number + ' onclick="BtnCheckAnswer(this)">(' + number + ')<br/><img src="' + viewModel.AnswerNormal[imgB1] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    number++;
                }
            }
            else if (chekcLayout == 'AL19000005') {
                for (imgL2 = 0; imgL2 < 4; imgL2++) {
                    if (viewModel.AnswerNormal[imgL2] == undefined || viewModel.AnswerNormal[imgL2] == null) {

                    } else {
                        $('#Img3').append('<button class="k-button k-default k-form-new" nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><img src="' + viewModel.AnswerNormal[imgL2] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    no++;
                }
                for (imgB2 = 4; imgB2 < length; imgB2++) {
                    if (viewModel.AnswerNormal[imgB2] == undefined || viewModel.AnswerNormal[imgB2] == null) {

                    } else {
                        $('#Img2').append('<button class="k-button k-default k-form-new" nomor=' + noms + ' onclick="BtnCheckAnswer(this)">(' + noms + ')<br/><img src="' + viewModel.AnswerNormal[imgB2] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    noms++;
                }
            }
            else if (chekcLayout == 'AL19000006') {
                $('#Img2').empty();
                for (imgL2 = 0; imgL2 < 7; imgL2++) {
                    if (viewModel.AnswerNormal[imgL2] == undefined || viewModel.AnswerNormal[imgL2] == null) {

                    } else {
                        $('#Img3').append('<button class="k-button k-default k-form-new" nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><img src="' + viewModel.AnswerNormal[imgL2] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    no++;
                }
            }
        }
    }
    else if (QuestionCategory == 'WORKINGMEMORY') {
        $('#PreviewSample').attr('hidden', true);
        $('#WorkingMemory').removeAttr('hidden');
        var duration = viewModel.WorkingMemoryDuration;
        var time = duration * 1000;
        //alert(time);
        if (viewModel.WorkingMemoryPrefaceDisplay == true) {
            $('#prefaceShow').removeAttr('hidden');
            setTimeout(slideShowWorkingMemory, 1000);
        } else {
            $('#prefaceShow').attr('hidden', true);
            setTimeout(slideShowWorkingMemory, 1000);
        }
    }
}

slideShowWorkingMemory = function () {
    var duration = viewModel.WorkingMemoryDuration;
    var time = duration * 1000;
    $('#ListMemories').empty();
    $('#PreviewWorking').removeAttr('hidden');
    $('#WorkingMemory').attr('hidden', true);
    var lengthMemory = viewModel.totalDataMemory;

    lengthMemory = lengthMemory * 2;

    for (ks = 0; ks < lengthMemory; ks++) {
        $('#ListMemories').append('<div style="font-size:96px;" class="MemoryData' + ks + ' HeadWorking" value=' + ks + ' >' + viewModel.WorkingMemoryText[ks] + '</div>');
    }
    var Trigger = 0;
    //slideMemory(lengthMemory, Trigger);
    slideMemoryWithBlankSpace(lengthMemory, Trigger);
}

slideMemoryWithBlankSpace = function (lengthMemory,seqNbr) {
    var i = 0;
    var duration;
    var limit = lengthMemory;
    var defaultDuration = parseInt(viewModel.WorkingMemoryDuration) * 1000;
    $('#ListMemories > div:gt(' + seqNbr + ')').hide();
    function appear() {
        if (i % 2 != 0) {
            duration = parseInt(viewModel.WorkingMemoryDurationTransition) * 1000;
        } else {
            duration = defaultDuration;
        }
        interval = setInterval(function () {
            if (i == limit) {
                clearInterval(interval);
                SoalWorking();
            } else {
                $('#ListMemories > div:first').fadeOut(0).next().fadeIn(0).end().appendTo('#ListMemories');
                clearInterval(interval);
                if (i < limit) {
                    appear();
                } else {
                    i = 0;
                }
            }
        }, duration);
        i++;
        seqNbr++;
    }
    appear();

}

slideMemory = function (dataWork, Trigger) {
    //console.log(Trigger+'genap');
    var duration = viewModel.WorkingMemoryDuration;
    var time = duration * 1000;
    $('#ListMemories > div:gt('+Trigger+')').hide();
    //var Trigger = Trigger;
    var check = setInterval(function () {
        //alert(Trigger);
        if (Trigger >= (dataWork - 1)) {
            clearInterval(check);
            SoalWorking();

        }
        else{
            $('#ListMemories > div:first')
            .fadeOut(0)
            .next()
            .fadeIn(0)
            .end()
            .appendTo('#ListMemories');
            Trigger++;
            
        }
    }, time);
}

SoalWorking = function (e) {
    $('#Horizontal').empty();
    $('#Vertikal').empty();
    $('#PreviewWorking').attr('hidden', true);
    $('#PreviewSample').removeAttr('hidden');
    $('.workingPrev').removeAttr('hidden');
    $('.WorkingMemoryExplaination').attr('hidden', true);
    $('.listButton').attr('hidden', true);
    var layout = viewModel.WorkingMemoryLayout;
    var lengthWork = viewModel.totalDataAnswer;
    var nominals = parseInt(lengthWork);
    var style = '';
    for (st = 1; st <= 7; st++) {
        if (layout == "AL19000001") {
            if (st == nominals) {
                var nomorStyle = (100 / nominals) - 1.2;
                style = 'style="width:' + nomorStyle + '%";';
                break;
            }
        } else {
            style = 'style="width:100%";';
            break;
        }
    }
    if (layout == "AL19000001") {
        $('#Horizontal').removeAttr('hidden');
        var no = 1;

        for (i = 0; i < lengthWork; i++) {
            $('#Horizontal').append('<button class="k-button k-default k-form-new" ' + style + ' nomor=' + no + ' >(' + no + ')<br/><span class="answerList">' + viewModel.WorkingMemoryAswer[i] + '</span></button>&nbsp;&nbsp;&nbsp;');
            no++;
        }
    }
    else {
        $('#Vertikal').removeAttr('hidden');
        var no = 1;
        for (i = 0; i < lengthWork; i++) {

            $('#Vertikal').append('<button class="k-button k-default k-form-new" ' + style + ' nomor=' + no + ' >(' + no + ')<br/><span class="answerList" style="width:50%;">' + viewModel.WorkingMemoryAswer[i] + '</span></button><br/><br/>');
            no++;
        }
    }
}
StoryQuestion = function () {
    $('#VerbalPreface').attr('hidden',true);
    $('#PreviewSample').removeAttr('hidden');
    $('.verbalPrev').removeAttr('hidden');
    var chekcLayout = viewModel.VerbalLayout;
    var VerbalLength = viewModel.VerbalTotal;
    var nominals = parseInt(VerbalLength);
    var style = '';
    for (st = 1; st <= 7; st++) {
        if (chekcLayout == "AL19000001") {
            if (st == nominals) {
                var nomorStyle = (100 / nominals) - 1.2;
                style = 'style="width:' + nomorStyle + '%";';
                break;
            }
        } else {
            style = 'style="width:100%";';
            break;
        }
    }
    if (chekcLayout == "AL19000001") {
        $('#Horizontal').removeAttr('hidden');
        var no = 1;
        for (i = 0; i < VerbalLength; i++) {
            $('#Horizontal').append('<button class="k-button k-default k-form-new" ' + style + ' nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><span class="answerList">' + viewModel.VerbalList[i] + '</span></button>&nbsp;&nbsp;&nbsp;');
            no++;
        }
    }
    else {
        $('#Vertikal').removeAttr('hidden');
        var no = 1;
        for (i = 0; i < VerbalLength; i++) {

            $('#Vertikal').append('<button class="k-button k-default k-form-new" ' + style + ' nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><span class="answerList" style="width:50%;">' + viewModel.VerbalList[i] + '</span></button><br/><br/>');
            no++;
        }
    }
}