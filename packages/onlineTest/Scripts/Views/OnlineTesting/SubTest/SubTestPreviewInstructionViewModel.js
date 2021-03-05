var viewModel = kendo.observable({
    SubTestName:"",
    title: "",
    description: "",
    disclaimer: "",
    ConfirmationTitle: "",
    ConfirmationDescription: "",
    ConfirmationDisclaimer: "",
    //Normal 
    SampleNormalTitle: "",
    SampleNormalIntroduction: "",
    NormalQuestionImage: "",
    NormalQuestion: "",
    NormalDisclaimer: "",
    NormalTextList: [],
    ScoreNormalTextList: [],
    TotalNormalAnswer: "",
    NormalExplaination: "",
    TypeAnswer: "",
    typeLayout:"",
    //End Normal
    //Verbal Memory
    VerbalMemoryTitle: "",
    VerbalMemoryStory: "",
    StoryDuration:0,
    VerbalMemoryQuestion: "", 
    VerbalMemoryDisclaimer: "",
    VerbalMemoryExplaination: "",
    TotalData:0,
    idLayout: 0,
    answerVerbalMemory: [],
    scoreVerbalMemoryList: [],
    //Working Memory
    WorkingMemoryTitle: "",
    WorkingMemoryDuration: 0,
    WorkingMemoryPreface: "",
    IntroductionMemory:"",
    WorkingMemoryPrefaceDisplay: false,
    WorkingMemoryLayout: 0,
    WorkingMemoryScore: 0,
    WorkingMemoryQuestion: "",
    WorkingMemoryExplaination: "",
    WorkingMemoryDisclaimer: "",
    WorkingMemoryText: [],
    WorkingMemoryAswer: [],
    WorkingMemoriesScore: [],
    totalDataAnswer: 0,
    totalDataMemory: 0,
    //End Working Memory
    next: function (e) {
        next(e);
    },
    next2: function (e) {
        next2(e);
    },
    next3: function (e) {
        next3(e);
    },
    next4: function (e) {
        next4(e);
    },
    prev: function (e) {
        prev(e);
    },
    prev2: function (e) {
        prev2(e);
    },
    prev3: function (e) {
        prev3(e);
    },
});

ListLayout = function () {
    
}

next = function (e) {
    //console.log(viewModel);
    $('#PreviewInstruction').attr('hidden', true);
    $('#PreviewVerbal').removeAttr('hidden');
    var QuestionCategory = localStorage.getItem('QuestionCategory');
    if (QuestionCategory == 'VERBALMEMORY') {
        var Duration = viewModel.StoryDuration;
        var time = parseInt(Duration) * 1000;
        //alert(time);
        $('.VerbalMemories').removeAttr('hidden');
        $('#prevSample').attr('hidden', true);
        $('#nextSample').attr('hidden', true);
        setTimeout(next3, time);
    }
    else if (QuestionCategory == 'WORKINGMEMORY') {
        introWorking(viewModel.IntroductionMemory);
    }
    else if (QuestionCategory == 'NORMAL') {
        $('.NormalMemories').removeAttr('hidden');
        if (viewModel.NormalQuestionImage=='a.jpg'|| viewModel.NormalQuestionImage == '' || viewModel.NormalQuestionImage == null || viewModel.NormalQuestionImage == undefined) {
            $('#NormalQuestionImage').attr('hidden', true);
        } else {
            $('#NormalQuestionImage').removeAttr('hidden');
            $('#NormalQuestionImage').attr('src', viewModel.NormalQuestionImage);
        }
    }
}
introWorking = function (intro) {
    //debugger;
    $('#PreviewInstruction').attr('hidden', true);
    $('#PreviewVerbal').attr('hidden', true);
    $('#introWorking').append('<div class="prev-box" id="PreviewInstruction">'+
        '<div class="colomup">'+
            '<span class="headup">Question &nbsp;<span>'+viewModel.SubTestName+'</span>-Preview</span>'+
        '</div>'+
        '<br />'+
    
            '<div class="prev-heder"><span data-bind="html:title" class="">'+viewModel.title+'</span></div>'+
            '<div class="prev-colom">'+
                '<span data-bind="html:description" class="">'+intro+'</span>'+
            '</div>'+
            '<div class="prev-footer">' +
                '<span data-bind="html:disclaimer" class="">'+viewModel.disclaimer+'</span>'+
            '</div>'+
            
            '<div class="topleft" id="prevSample">'+
                '<button class="k-button k-default btn-form" onclick="prev()">Back</button>' +
            '</div>'+
            '<div class="topright" id="nextSample">'+
                '<button class="k-button k-primary btn-form" onclick="nextIntro()">Next</button>' +
            '</div>' +
    
        '<br /><br /><br /><br />'+
        '<div class="colomup">'+
            '<span class="headup"></span>'+
        '</div>'+
    '</div>');
    
}
nextIntro = function () {
    $('#introWorking').empty();
    //$('#PreviewVerbal').removeAttr('hidden');
    //$('.WorkingMemories').removeAttr('hidden');
    $('#prefaceWorking').append('<div class="prev-preface" id="PreviewInstruction">' +
        '<div class="colomup">' +
            '<span class="headup">Question &nbsp;<span>' + viewModel.SubTestName + '</span>-Preview</span>' +
        '</div>' +
        '<br />'+
            '<div class="prev-colom">' +
                '<center><span style="font-size:96px;padding-top: 200px !important;position:absolute !important;right:10%;left:10%;">' + viewModel.WorkingMemoryPreface + '</span></center>' +
            '</div>' +
    '</div>');
    //$('#prevSample').attr('hidden', true);
    //$('#nextSample').attr('hidden', true);
    //$('#footer-preface').attr('hidden', true);
    //debugger;
    //$('.prev-box').css('border', '1px solid white');
    var duration = viewModel.WorkingMemoryDuration;
    var time = duration * 1000;
    if (viewModel.WorkingMemoryPrefaceDisplay == true) {
        //$('#prefaceShow').removeAttr('hidden');
        setTimeout(slideShowWorkingMemory, 1000);
    } else {
        $('#prefaceWorking').empty();
        //$('#prefaceShow').attr('hidden', true);
        setTimeout(slideShowWorkingMemory, 1000);
    }
}
next3 = function (e) {
    $('#Horizontal').empty();
    $('#Vertikal').empty();
    $('#Img3').empty();
    $('#Img2').empty();
    $('.prev-footer').removeAttr('hidden');
    $('.listButton').removeAttr('hidden');
    $('#backFooter').removeAttr('hidden');
    $('#PreviewVerbal').attr('hidden', true);
    var QuestionCategory = localStorage.getItem('QuestionCategory');
    if (QuestionCategory == 'VERBALMEMORY') {
        $('#PreviewSample').removeAttr('hidden');
        $('.verbalPrev').removeAttr('hidden');
        $('.VerbalMemoryExplaination').attr('hidden', true);
        $('.listButton').attr('hidden', true);
        var chekcLayout = viewModel.idLayout;
        var length = viewModel.TotalData;
        var nominals = parseInt(length);
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
            
            for (i = 0; i < length; i++) {
                $('#Horizontal').append('<button class="k-button k-default k-form-new" ' + style + ' nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><span class="answerList">' + viewModel.answerVerbalMemory[i] + '</span></button>&nbsp;&nbsp;&nbsp;');
                no++;
            }
        }
        else {
            $('#Vertikal').removeAttr('hidden');
            var no = 1;
            var length = viewModel.TotalData;
            for (i = 0; i < length; i++) {
                $('#Vertikal').append('<button class="k-button k-default k-form-new" ' + style + ' nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><span class="answerList" style="width:50%;">' + viewModel.answerVerbalMemory[i] + '</span></button><br/><br/>');
                no++;
            }
        }
    }
    else if (QuestionCategory == 'WORKINGMEMORY') {
        $('#PreviewWorking').attr('hidden', true);
        $('#PreviewSample').removeAttr('hidden');
        $('.workingPrev').removeAttr('hidden');
        $('.WorkingMemoryExplaination').attr('hidden', true);
        $('.listButton').attr('hidden', true);
        //$('.prev-footer').attr('hidden', true);
        //$('#backFooter').attr('hidden', true);
        //$('.colomup').css('inline', none);
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
                $('#Horizontal').append('<button class="k-button k-default k-form-new" ' + style + ' nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><span class="answerList">' + viewModel.WorkingMemoryAswer[i] + '</span></button>&nbsp;&nbsp;&nbsp;');
                no++;
            }
        }
        else {
            $('#Vertikal').removeAttr('hidden');
            var no = 1;
            var length = viewModel.totalDataAnswer;
            for (i = 0; i < lengthWork; i++) {
                $('#Vertikal').append('<button class="k-button k-default k-form-new" ' + style + ' nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><span class="answerList" style="width:50%;">' + viewModel.WorkingMemoryAswer[i] + '</span></button><br/><br/>');
                no++;
            }
        }
    }
    else if (QuestionCategory == 'NORMAL') {
        $('#PreviewSample').removeAttr('hidden');
        $('.normalPrev').removeAttr('hidden');
        $('.NormalExplaination').attr('hidden', true);
        $('.listButton').attr('hidden', true);
        var chekcLayout = viewModel.typeLayout;
        var checkTypeAnswer = viewModel.TypeAnswer;
        var length = viewModel.TotalNormalAnswer;
        var no = 1;
        var number = 4; var noms = 5;
        if (checkTypeAnswer == 'AT19000001') {
            var nominals = parseInt(length);
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
                for (i = 0; i < length; i++) {
                    $('#Horizontal').append('<button class="k-button k-default k-form-new" ' + style + ' nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><span class="answerList">' + viewModel.NormalTextList[i] + '</span></button>&nbsp;&nbsp;&nbsp;');
                    no++;
                }
            }
            else {
                $('#Vertikal').removeAttr('hidden');
                for (i = 0; i < length; i++) {
                    $('#Vertikal').append('<button class="k-button k-default k-form-new" ' + style + ' nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><span class="answerList" style="width:50%;">' + viewModel.NormalTextList[i] + '</span></button><br/><br/>');
                    no++;
                }
            }
        }
        else {
            $('#ImageAnswer').removeAttr('hidden');
            if (chekcLayout == 'AL19000003') {
                for (imgL = 0; imgL < 3; imgL++) {
                    if (viewModel.NormalTextList[imgL] == undefined || viewModel.NormalTextList[imgL] == null) {

                    } else {
                        $('#Img3').append('<button class="k-button k-default k-form-new" nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><img src="' + viewModel.NormalTextList[imgL] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    no++;
                }
                for (imgB = 3; imgB < length; imgB++) {
                    if (viewModel.NormalTextList[imgB] == undefined || viewModel.NormalTextList[imgB] == null) {

                    } else {
                        $('#Img2').append('<button class="k-button k-default k-form-new" nomor=' + number + ' onclick="BtnCheckAnswer(this)">(' + number + ')<br/><img src="' + viewModel.NormalTextList[imgB] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    number++;
                }
            }
            else if (chekcLayout == 'AL19000004') {
                for (imgL1 = 0; imgL1 < 3; imgL1++) {
                    if (viewModel.NormalTextList[imgL1] == undefined || viewModel.NormalTextList[imgL1] == null) {

                    } else {
                        $('#Img3').append('<button class="k-button k-default k-form-new" nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><img src="' + viewModel.NormalTextList[imgL1] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    no++;
                }
                for (imgB1 = 3; imgB1 < length; imgB1++) {
                    if (viewModel.NormalTextList[imgB1] == undefined || viewModel.NormalTextList[imgB1] == null) {

                    } else {
                        $('#Img2').append('<button class="k-button k-default k-form-new" nomor=' + number + ' onclick="BtnCheckAnswer(this)">(' + number + ')<br/><img src="' + viewModel.NormalTextList[imgB1] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    number++;
                }
            }
            else if (chekcLayout == 'AL19000005') {
                for (imgL2 = 0; imgL2 < 4; imgL2++) {
                    if (viewModel.NormalTextList[imgL2] == undefined || viewModel.NormalTextList[imgL2] == null) {

                    } else {
                        $('#Img3').append('<button class="k-button k-default k-form-new" nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><img src="' + viewModel.NormalTextList[imgL2] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    no++;
                }
                for (imgB2 = 4; imgB2 < length; imgB2++) {
                    if (viewModel.NormalTextList[imgB2] == undefined || viewModel.NormalTextList[imgB2] == null) {

                    } else {
                        $('#Img2').append('<button class="k-button k-default k-form-new" nomor=' + noms + ' onclick="BtnCheckAnswer(this)">(' + noms + ')<br/><img src="' + viewModel.NormalTextList[imgB2] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    noms++;
                }
            }
            else if (chekcLayout == 'AL19000006') {
                $('#Img2').empty();
                for (imgL2 = 0; imgL2 < 7; imgL2++) {
                    if (viewModel.NormalTextList[imgL2] == undefined || viewModel.NormalTextList[imgL2] == null) {

                    } else {
                        $('#Img3').append('<button class="k-button k-default k-form-new" nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><img src="' + viewModel.NormalTextList[imgL2] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    no++;
                }
            }
        }
        
    }
}
next4 = function (e) {
    $('#PreviewSample').attr('hidden', true);
    $('#PreviewConfirmation').removeAttr('hidden');
}
next2 = function (e) {
    //alert("yes");
    MessageBox.show("Info", "Yes");
}
prev = function (e) {
    var QuestionCategory = localStorage.getItem('QuestionCategory');
    if (QuestionCategory == 'WORKINGMEMORY') {
        $('#PreviewInstruction').removeAttr('hidden');
        $('#PreviewVerbal').attr('hidden', true);
        $('#introWorking').empty();
    } else {
        $('#PreviewInstruction').removeAttr('hidden');
        $('#PreviewVerbal').attr('hidden', true);

    }
}
prev2 = function (e) {
    
    $('#PreviewSample').attr('hidden', true);
    var QuestionCategory = localStorage.getItem('QuestionCategory');
    if (QuestionCategory == 'WORKINGMEMORY') {
        $('#PreviewInstruction').removeAttr('hidden');
        introWorking(viewModel.IntroductionMemory);
    } else if (QuestionCategory == 'VERBALMEMORY') {
        $('#PreviewInstruction').removeAttr('hidden');
    }
    else {
        $('#PreviewVerbal').removeAttr('hidden');
    }
}
prev3 = function (e) {
    $('#PreviewSample').removeAttr('hidden');
    $('#PreviewConfirmation').attr('hidden', true);
}
BtnCheckAnswer = function (data) {
    var QuestionCategory = localStorage.getItem('QuestionCategory');
    var no = 1;
    var number = 4; var noms = 5;
    if (QuestionCategory == 'VERBALMEMORY') {
        var CheckData = $(data).attr('nomor');
        $('#Horizontal').empty();
        $('#Vertikal').empty();
        $('#PreviewVerbal').attr('hidden', true);
        $('.verbalPrev').removeAttr('hidden');
        $('#PreviewSample').removeAttr('hidden');
        $('.VerbalMemoryExplaination').removeAttr('hidden');
        $('.listButton').removeAttr('hidden');
        var chekcLayout = viewModel.idLayout;
        var length = viewModel.TotalData;
        var nominals = parseInt(length);
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
            
            for (i = 0; i < length; i++) {
                if (viewModel.scoreVerbalMemoryList[i] == true) {
                    $('#Horizontal').append('<button class="k-button k-default k-form-new" ' + style + '>(' + no + ')<br/><span class="answerList">' + viewModel.answerVerbalMemory[i] + '</span></button>&nbsp;&nbsp;&nbsp;');
                }
                else {
                    $('#Horizontal').append('<button class="k-button k-default k-form-new" ' + style + '>(' + no + ')<br/><span class="answerList">' + viewModel.answerVerbalMemory[i] + '</span></button>&nbsp;&nbsp;&nbsp;');
                }
                no++;
            }
        }
        else {
            $('#Vertikal').removeAttr('hidden');
            //var length = viewModel.TotalData;
            for (i = 0; i < length; i++) {

                if (viewModel.scoreVerbalMemoryList[i] == true) {
                    $('#Vertikal').append('<button class="k-button k-default k-form-new" ' + style + '>(' + no + ')<br/><span class="answerList">' + viewModel.answerVerbalMemory[i] + '</span></button><br/><br/>');
                }
                else {
                    $('#Vertikal').append('<button class="k-button k-default k-form-new" ' + style + '>(' + no + ')<br/><span class="answerList">' + viewModel.answerVerbalMemory[i] + '</span></button><br/><br/>');
                } no++;
            }
        }
    }
    else if (QuestionCategory == 'WORKINGMEMORY') {
        var CheckData = $(data).attr('nomor');
        $('#Horizontal').empty();
        $('#Vertikal').empty();
        $('#PreviewVerbal').attr('hidden', true);
        $('#PreviewSample').removeAttr('hidden');
        $('.prev-footer').removeAttr('hidden');
        $('.workingPrev').removeAttr('hidden');
        $('.WorkingMemoryExplaination').removeAttr('hidden');
        $('.listButton').removeAttr('hidden');
        $('#backFooter').removeAttr('hidden');
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
            for (i = 0; i < lengthWork; i++) {
                if (viewModel.WorkingMemoriesScore[i] == true) {
                    $('#Horizontal').append('<button class="k-button k-default k-form-new" ' + style + '>(' + no + ')<br/><span class="answerList">' + viewModel.WorkingMemoryAswer[i] + '</span></button>&nbsp;&nbsp;&nbsp;');
                }
                else {
                    $('#Horizontal').append('<button class="k-button k-default k-form-new" ' + style + '>(' + no + ')<br/><span class="answerList">' + viewModel.WorkingMemoryAswer[i] + '</span></button>&nbsp;&nbsp;&nbsp;');
                }

                no++;
            }
        }
        else {
            $('#Vertikal').removeAttr('hidden');
            for (i = 0; i < lengthWork; i++) {

                if (viewModel.WorkingMemoriesScore[i] == true) {
                    $('#Vertikal').append('<button class="k-button k-default k-form-new " ' + style + '>(' + no + ')<br/><span class="answerList">' + viewModel.WorkingMemoryAswer[i] + '</span></button><br/><br/>');
                }
                else {
                    $('#Vertikal').append('<button class="k-button k-default k-form-new" ' + style + '>(' + no + ')<br/><span class="answerList">' + viewModel.WorkingMemoryAswer[i] + '</span></button><br/><br/>');
                } no++;
            }
        }
    }
    else if (QuestionCategory == 'NORMAL') {
        var CheckData = $(data).attr('nomor');
        $('#Horizontal').empty();
        $('#Vertikal').empty();
        $('#PreviewVerbal').attr('hidden', true);
        $('#PreviewSample').removeAttr('hidden');
        $('.normalPrev').removeAttr('hidden');
        $('.NormalExplaination').removeAttr('hidden');
        $('.listButton').removeAttr('hidden');
        var layout = viewModel.typeLayout;
        var lengthWork = viewModel.TotalNormalAnswer;
        var checkTypeAnswer = viewModel.TypeAnswer;
        if (checkTypeAnswer == 'AT19000001') {
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
                for (i = 0; i < lengthWork; i++) {
                    if (viewModel.ScoreNormalTextList[i] == true) {
                        $('#Horizontal').append('<button class="k-button k-default k-form-new" ' + style + '>(' + no + ')<br/><span class="answerList">' + viewModel.NormalTextList[i] + '</span></button>&nbsp;&nbsp;&nbsp;');
                    }
                    else {
                        $('#Horizontal').append('<button class="k-button k-default k-form-new" ' + style + '>(' + no + ')<br/><span class="answerList">' + viewModel.NormalTextList[i] + '</span></button>&nbsp;&nbsp;&nbsp;');
                    }
                    no++;
                }
            }
            else {
                $('#Vertikal').removeAttr('hidden');
                for (i = 0; i < lengthWork; i++) {
                    if (viewModel.ScoreNormalTextList[i] == true) {
                        $('#Vertikal').append('<button class="k-button k-default k-form-new " ' + style + '>(' + no + ')<br/><span class="answerList">' + viewModel.NormalTextList[i] + '</span></button><br/><br/>');
                    }
                    else {
                        $('#Vertikal').append('<button class="k-button k-default k-form-new" ' + style + '>(' + no + ')<br/><span class="answerList">' + viewModel.NormalTextList[i] + '</span></button><br/><br/>');
                    } no++;
                }
            }
        }
        else {
            $('#Img3').empty();
            $('#Img2').empty();
            $('#ImageAnswer').removeAttr('hidden');
            var length = viewModel.TotalNormalAnswer;
            if (layout == 'AL19000003') {
                for (imgL = 0; imgL < 3; imgL++) {
                    //if (viewModel.ScoreNormalTextList[imgL] == true) {
                        //$('#Img3').append('<button class="k-button k-default k-form-new" style="color:black;">(' + no + ')<br/><img src="' + viewModel.NormalTextList[imgL] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    //} else {
                    if (viewModel.NormalTextList[imgL] == undefined || viewModel.NormalTextList[imgL] == null) {

                    } else {
                        $('#Img3').append('<button class="k-button k-default k-form-new">(' + no + ')<br/><img src="' + viewModel.NormalTextList[imgL] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    no++;
                }
                for (imgB = 3; imgB < length; imgB++) {
                    //if (viewModel.ScoreNormalTextList[imgB] == true) {
                    //    $('#Img2').append('<button class="k-button k-default k-form-new" style="color:black;">(' + number + ')<br/><img src="' + viewModel.NormalTextList[imgB] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    //} else {
                    if (viewModel.NormalTextList[imgB] == undefined || viewModel.NormalTextList[imgB] == null) {

                    } else {
                        $('#Img2').append('<button class="k-button k-default k-form-new">(' + number + ')<br/><img src="' + viewModel.NormalTextList[imgB] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    number++;
                }

            }
            else if (layout == 'AL19000004') {
                for (imgL1 = 0; imgL1 < 3; imgL1++) {
                    //if (viewModel.ScoreNormalTextList[imgL1] == true) {
                    //    $('#Img3').append('<button class="k-button k-default k-form-new" style="color:black;">(' + no + ')<br/><img src="' + viewModel.NormalTextList[imgL1] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    //} else {
                    if (viewModel.NormalTextList[imgL1] == undefined || viewModel.NormalTextList[imgL1] == null) {

                    } else {
                        $('#Img3').append('<button class="k-button k-default k-form-new">(' + no + ')<br/><img src="' + viewModel.NormalTextList[imgL1] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    } no++;
                }
                for (imgB1 = 3; imgB1 < length; imgB1++) {
                    //if (viewModel.ScoreNormalTextList[imgB1] == true) {
                    //    $('#Img2').append('<button class="k-button k-default k-form-new" style="color:black;">(' + number + ')<br/><img src="' + viewModel.NormalTextList[imgB1] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    //} else {
                    if (viewModel.NormalTextList[imgB1] == undefined || viewModel.NormalTextList[imgB1] == null) {

                    } else {
                        $('#Img2').append('<button class="k-button k-default k-form-new">(' + number + ')<br/><img src="' + viewModel.NormalTextList[imgB1] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    } number++;
                }
            }
            else if (layout == 'AL19000005') {
                for (imgL2 = 0; imgL2 < 4; imgL2++) {
                    //if (viewModel.ScoreNormalTextList[imgL2] == true) {
                    //    $('#Img3').append('<button class="k-button k-default k-form-new" style="color:black;">(' + no + ')<br/><img src="' + viewModel.NormalTextList[imgL2] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    //} else {
                    if (viewModel.NormalTextList[imgL2] == undefined || viewModel.NormalTextList[imgL2] == null) {

                    } else {
                        $('#Img3').append('<button class="k-button k-default k-form-new">(' + no + ')<br/><img src="' + viewModel.NormalTextList[imgL2] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    } no++;
                }
                for (imgB2 = 4; imgB2 < length; imgB2++) {
                    //if (viewModel.ScoreNormalTextList[imgB2] == true) {
                    //    $('#Img2').append('<button class="k-button k-default k-form-new" style="color:black;">(' + number + ')<br/><img src="' + viewModel.NormalTextList[imgB2] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    //} else {
                    if (viewModel.NormalTextList[imgB2] == undefined || viewModel.NormalTextList[imgB2] == null) {

                    } else {
                        $('#Img2').append('<button class="k-button k-default k-form-new">(' + noms + ')<br/><img src="' + viewModel.NormalTextList[imgB2] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    } noms++;
                }
            }
            else if (layout == 'AL19000006') {
                $('#Img2').empty();
                for (imgL2 = 0; imgL2 < 7; imgL2++) {
                    if (viewModel.NormalTextList[imgL2] == undefined || viewModel.NormalTextList[imgL2] == null) {

                    } else {
                        $('#Img3').append('<button class="k-button k-default k-form-new" nomor=' + no + ' onclick="BtnCheckAnswer(this)">(' + no + ')<br/><img src="' + viewModel.NormalTextList[imgL2] + '" class="backImage" width="100%" height="100%"></button>&nbsp;&nbsp;&nbsp;');
                    }
                    no++;
                }
            
            }
        }
    }
    
}
slideShowWorkingMemory = function () {
    var duration = viewModel.WorkingMemoryDuration;
    $('#ListMemories').empty();
    //$('#titik').empty();
    var time = duration * 1000;
    $('#PreviewWorking').removeAttr('hidden');
    $('#workingPrev').removeAttr('hidden');
    //$('#PreviewVerbal').attr('hidden', true);
    $('#prefaceWorking').empty();
    var lengthMemory = viewModel.totalDataMemory;

    lengthMemory = lengthMemory * 2;

    for (ks = 0; ks < lengthMemory; ks++) {
        $('#ListMemories').append('<div style="font-size:96px;" class="MemoryData' + ks + ' HeadWorking" value=' + ks + ' >' + viewModel.WorkingMemoryText[ks] + '</div>');
    }
    //slideMemory(lengthMemory);
    slideMemoryWithBlankSpace(lengthMemory);
}

slideMemoryWithBlankSpace = function (memoryLength) {
    var i = 0;
    var duration;
    var limit = memoryLength;
    var defaultDuration = parseInt(viewModel.WorkingMemoryDuration) * 1000;
    $('#ListMemories > div:gt(0)').hide();
    function appear() {
        if (i % 2 != 0) {
            duration = parseInt(viewModel.WorkingMemoryTransition) * 1000;
        } else {
            duration = defaultDuration;
        }
        interval = setInterval(function () {
            if (i == limit) {
                clearInterval(interval);
                next3();
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
    }
    appear();

}

slideMemory = function (dataWork) {
    var duration = viewModel.WorkingMemoryDuration;
    var time = duration * 1000;
    $('#ListMemories > div:gt(0)').hide();
    var Trigger = 0;
    var check = setInterval(function () {
        //alert(Trigger);
            if (Trigger >= (dataWork - 1)) {
                clearInterval(check);
                //$('#ListMemories').stop(true, true);
                next3();
                
            } else {
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