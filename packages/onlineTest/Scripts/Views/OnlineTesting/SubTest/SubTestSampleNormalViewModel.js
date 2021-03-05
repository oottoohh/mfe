var viewModel = kendo.observable({
    domain: DOMAIN_URL + 'Views/OnlineTesting/SubTest/SubTestPreviewInstruction.html',
    domainPreviewForm: DOMAIN_URL + 'Views/OnlineTesting/SubTest/SubTestPreviewForm.html',
    dynamicField: "",
    SubTestCode: "",
    TestTypeName: "", //f
    TestToolName: "",
    TestToolCode: '',
    TestTool: '',
    SubTestName: "",
    Description: "",
    Memoriii: [],
    Duration: 0.00,
    DurationSecond: 0,
    typeAnswer: "AT19000001",
    typeLayout: "AL19000001",
    TestToolList: [],
    AnswerLayoutList: [],
    isDisplay: true,
    checkDuration: true,
    Instruction: {
        SubTestTitle: "",
        DescriptionInstruction: "",
        DisclaimerInstruction: "",
    },
    SampleNormalAnswerLayout: [
        { text: "Vertical", value: 0 },
        { text: "Horizontal", value: 1 }
    ],
    AnswerTypeList: [],
    AnswerLayoutListMultiple: [],
    SampleNormal: {
        SampleNormalTitle: "",
        SampleNormalIntroduction: "",
        NormalQuestonImage: "",
        NormalQuestion: "",
        NormalScoreText: 0,
        NormalScoreImage: 0,
        NormalDisclaimer: "",
        NormalExplaination: "",
        listImage: [],
        imageUrl: [],
        NormalText: [{
            NormalAnswerText: "",
            NormalScoreText: false,
        }, {
            NormalAnswerText: "",
            NormalScoreText: false,
        }, {
            NormalAnswerText: "",
            NormalScoreText: false,
        }, {
            NormalAnswerText: "",
            NormalScoreText: false,
        }, {
            NormalAnswerText: "",
            NormalScoreText: false,
        }, {
            NormalAnswerText: "",
            NormalScoreText: false,
        }, {
            NormalAnswerText: "",
            NormalScoreText: false,
        }],
        NormalImage: [{
            NormalAnswerImage: "",
            NormalScoreImage: false,
        }, {
            NormalAnswerImage: "",
            NormalScoreImage: false,
        }, {
            NormalAnswerImage: "",
            NormalScoreImage: false,
        }, {
            NormalAnswerImage: "",
            NormalScoreImage: false,
        }, {
            NormalAnswerImage: "",
            NormalScoreImage: false,
        }, {
            NormalAnswerImage: "",
            NormalScoreImage: false,
        }, {
            NormalAnswerImage: "",
            NormalScoreImage: false,
        }, {
            NormalAnswerImage: "",
            NormalScoreImage: false,
        },],
        MoreForm: []
    },
    WorkingMemory: {
        WorkingMemoryTitle: "",
        WorkingMemoryDuration: 0,
        WorkingMemoryTransition: 0,
        WorkingMemoryPreface: "",
        IntroductionMemory: "",
        WorkingMemoryPrefaceDisplay: true,
        WorkingMemoryLayout: "AL19000001",
        WorkingMemoryScore: 0,
        WorkingMemoryQuestion: "",
        WorkingMemoryExplaination: "",
        WorkingMemoryDisclaimer: "",
        WorkingMemories: [{
            WorkingMemoryText: "",
        }, {
            WorkingMemoryText: "",
        }, {
            WorkingMemoryText: "",
        }, {
            WorkingMemoryText: "",
        }, {
            WorkingMemoryText: "",
        }, {
            WorkingMemoryText: "",
        }, {
            WorkingMemoryText: "",
        }],
        WorkingMemoriesAnswer: [{
            WorkingMemoryAswer: "",
            WorkingMemoriesScore: false,
        }, {
            WorkingMemoryAswer: "",
            WorkingMemoriesScore: false,
        }, {
            WorkingMemoryAswer: "",
            WorkingMemoriesScore: false,
        }, {
            WorkingMemoryAswer: "",
            WorkingMemoriesScore: false,
        }, {
            WorkingMemoryAswer: "",
            WorkingMemoriesScore: false,
        }, {
            WorkingMemoryAswer: "",
            WorkingMemoriesScore: false,
        }, {
            WorkingMemoryAswer: "",
            WorkingMemoriesScore: false,
        }],
        MoreForm: [],
    },
    verbalMemory: {
        VerbalMemoryTitle: "",
        VerbalMemoryStory: "",
        VerbalMemoryQuestion: "",
        VerbalMemoryExplaination: "",
        StoryDuration: "0",
        VerbalMemoryDisclaimer: "",
        idLayout: "AL19000001",
        scoreVerbalMemory: 0,
        VerbalMemories: [{
            No: "",
            answerVerbalMemory: "",
            scoreVerbalMemory: false,
        }, {
            No: "",
            answerVerbalMemory: "",
            scoreVerbalMemory: false,
        }, {
            No: "",
            answerVerbalMemory: "",
            scoreVerbalMemory: false,
        }, {
            No: "",
            answerVerbalMemory: "",
            scoreVerbalMemory: false,
        }, {
            No: "",
            answerVerbalMemory: "",
            scoreVerbalMemory: false,
        }, {
            No: "",
            answerVerbalMemory: "",
            scoreVerbalMemory: false,
        }, {
            No: "",
            answerVerbalMemory: "",
            scoreVerbalMemory: false
        }]
    },
    Confirmation: {
        ConfirmationTitle: "",
        ConfirmationDescription: "",
        ConfirmationDisclaimer: "",
    },
    ConfirmationSave: function (e) {
        ConfirmationSave(e);
    },
    ConfirmationCancel: function (e) {
        confirmMessageCancel();
        $('.swal-button--cancel').on('click', function () {

        });

        $('.swal-button--danger').on('click', function () {
            //window.location.reload(true);
            window.location.href = DOMAIN_URL + "Views/OnlineTesting/SubTest/SubTest.html";
        });
    },
    ConfirmationPreview: function (e) {
        ConfirmationPreview(e);
    },
    mediaImageChange: function (el, files) {
        
        //console.log(el);AddForm(this)
        //console.log(files);
         
        if (files.length) {
            if (files[0].size <= 2048000) {
                el.parentElement.firstElementChild.src = window.URL.createObjectURL(files[0]);  //original
                el.parentElement.children[1].src = window.URL.createObjectURL(files[0]);    //display
                //el.parentElement.children[1].width = '';
                //el.parentElement.children[1].height = '';
                $(el.parentElement.parentElement.lastElementChild).show();
                $("a" + el.id).show;
                var media = $(el).attr('id');
                var valueMedia = media.substring(5);
                var imageUrl = new FormData();
                imageUrl.append('files[0]', files[0]);
                //imageUrl.append('files[0]', $('#' + media)[0].files[0]);
                LoadingMask.show();
                $.ajax({
                    type: 'POST',
                    url: SERVICE_URL + "api/Question/UploadImage",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: imageUrl,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        if (response.Acknowledge < 1) {
                            LoadingMask.hide();
                            swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                        } else {
                            LoadingMask.hide();
                            var Url = response.Images[0].Url;
                            $("#" + media.toString()).attr("src", Url);
                            $("#mediaDisplay" + valueMedia.toString()).attr("src", Url);
                            $($("#mediaPic" + valueMedia.toString()).parent().parent().children()[2]).show();
                        }
                    },
                    error: function (x, e) {
                        //alert("error" + x);
                        MessageBox.show("Error", "Error" + x);
                    }
                });
            }
            else {
                MessageBox.show("Error", "Max image size (2 MB) is exceeded");
            }
        }
    },
    mediaImageRemove: function (el) {
        var mediaPicId = el.parentElement.firstElementChild.firstElementChild.id;   //original
        var mediaPicDisplayId = el.parentElement.firstElementChild.children[1].id;  //display
        var mediaId = el.parentElement.firstElementChild.lastElementChild.id;
        console.log(mediaPicId);
        $(el.parentElement.firstElementChild).remove();
        if (mediaPicId == 'mediaPic0') {
            $(el.parentElement).prepend(
                '<label style="padding-left:140px;padding-right:120px;">' +
                '<img id="' + mediaPicId + '" src="" hidden="hidden" />' +
                '<img id="' + mediaPicDisplayId + '" src="" class="backImage" width="100%" height="100%" />' +
                '<input name="' + mediaId + '" id="' + mediaId + '" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.mediaImageChange(this, this.files)" />' +
                '</label>' +
                '<input type="hidden" id="mediaId3" name="mediaId3" value="0" />');
            //'<a href="#" class="k-button" style="display: none" onclick="viewModel.mediaImageRemove(this)"><span class="k-icon k-delete"></span></a>');
            
        } else {
            $(el.parentElement).prepend(
                '<label>' +
                '<img id="' + mediaPicId + '" src="" hidden="hidden" />' +
                '<img id="' + mediaPicDisplayId + '" src="" class="backImage" width="100%" height="100%" />' +
                '<input name="' + mediaId + '" id="' + mediaId + '" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.mediaImageChange(this, this.files)" />' +
                '</label>' +
                '<input type="hidden" id="mediaId3" name="mediaId3" value="0" />');
            //'<a href="#" class="k-button" style="display: none" onclick="viewModel.mediaImageRemove(this)"><span class="k-icon k-delete"></span></a>');
            $(el).hide();
        }
    },
    removeQuestionImgMultiple: function (val, QuestionNum) {
        var NumForm = QuestionNum + 1;
        $('.q-image-' + val.id).children('label').eq(1).remove();
        $('.q-image-' + val.id).append(`<label style="margin-left:140px;margin-right:120px;">
                                                        <img id="mediaPic`+ QuestionNum + `" src="" hidden="hidden" />
                                                        <img id="mediaDisplay`+ QuestionNum + `" src="" width="100" height="100" class="backImage media` + QuestionNum + `-QuestionImage` + NumForm + `" />
                                                        <input name="media`+ QuestionNum + `" id="media` + QuestionNum + `-QuestionImage` + NumForm + `" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.mediaImageChange(this, this.files)" />
                                                    </label>
                                                    <input type="hidden" id="mediaId`+ QuestionNum + `" name="mediaId` + QuestionNum + `" value="0" />`);
    }
});

ConfirmationSave = function (e) {

    var NumberCheck = /^[0-9]+$/;    
    var MultipleForm;
    var QuestionCategory = localStorage.getItem('QuestionCategory');
    var Confirmation = viewModel.Confirmation;
    var Instruction = viewModel.Instruction;
    var SubTestCode = viewModel.SubTestCode;
    //Data Sub Test
    var SubTestName = viewModel.SubTestName;
    var SubTestDescription = viewModel.Description.replace(/\s/g, '');
    var TestTypeName = viewModel.TestTypeName;
    var TestToolName = viewModel.TestToolName;
    var SubTestDuration = viewModel.Duration; var checkDurationAll = true;
    if (viewModel.Duration == 0) {
        if (viewModel.checkDuration == true) {
            checkDurationAll = false;
            //return false;
        } else if (viewModel.checkDuration == false) {
            checkDurationAll = true;
            //return false;
        }
    }
    //alert(SubTestDuration);
    var isDisplay = viewModel.isDisplay;
    var SubTestCheck = SubTestName == '' || SubTestDescription == '' || TestTypeName == '' || TestToolName == '' || checkDurationAll == false;
    //End Data Sub Test
    //Data instruksi 
    var SubTestTitle = Instruction.SubTestTitle;
    var DescriptionInstruction = Instruction.DescriptionInstruction;
    var DisclaimerInstruction = Instruction.DisclaimerInstruction;
    var InstructionCheck = SubTestTitle == '' || DescriptionInstruction == '' || DisclaimerInstruction == '';
    //End Data Instruction

    //Add data confirmation
    var ConfirmationTitle = Confirmation.ConfirmationTitle;
    var ConfirmationDescription = Confirmation.ConfirmationDescription;
    var ConfirmationDisclaimer = Confirmation.ConfirmationDisclaimer;
    var ConfirmationCheck = ConfirmationTitle == '' || ConfirmationDescription == '' || ConfirmationDisclaimer == '';

    var DurationSecondValue = viewModel.DurationSecond;


    if ($(".sampleform-nm").length > 1 || $(".sampleform-wm").length > 1 || $(".sampleform-vm").length > 1) {
        MultipleForm = assignValueForm();
        var checkMultipleForm = validateMultiForm(MultipleForm)
        //check duration memory is not decimal
        var checknotDecimalInDuration;
        var checknotDecimalInTransition;
        var ListcorrectAnswerIsEmpty = [];
        $.each(MultipleForm, function (index, val) {
            $.map(val.Answers, function(obj){
                if(obj.IsCorrect == true){
                    ListcorrectAnswerIsEmpty.push(true);
                }
            })
        });
        
        if (ListcorrectAnswerIsEmpty.length !== MultipleForm.length) {
            swal("Invalid", "Choose at least 1 Correct Answer at your form", "warning", { closeOnClickOutside: false });
            return;
        }
        if (QuestionCategory == "WORKINGMEMORY" || QuestionCategory == "VERBALMEMORY") {
            checknotDecimalInDuration = $.map(MultipleForm, function (val, index) {
                return !val.DurationPerMemory.toString().includes(".");
            });
            checknotDecimalInTransition = QuestionCategory == "WORKINGMEMORY" ? $.map(MultipleForm, function (val, index) {
                return !val.TransitionPerMemory.toString().includes(".")
            }) : [true];
            checkZeroValueDuration = $.map(MultipleForm, function (val, index) {
                return val.DurationPerMemory <= 0 ? false : true
            });
            
            if (!checkZeroValueDuration.some(x => x === false) == false) {
                swal("Invalid", "Duration value cannot be less than 1", "warning", { closeOnClickOutside: false });
                return;
            }
        } else {
            checknotDecimalInDuration = [true];
            checknotDecimalInTransition = [true];
        }
         
        if (checkMultipleForm == false) {
            swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
            return;
        }
        if (!checknotDecimalInDuration.some(x => x === false) == false) {
            swal("Invalid", "Duration value cannot be decimal", "warning", { closeOnClickOutside: false });
            return;
        }
        if (!checknotDecimalInTransition.some(x => x === false) == false) {
            swal("Invalid", "Transition value cannot be decimal", "warning", { closeOnClickOutside: false });
            return;
        }
        
        var nameForm = localStorage.getItem("QuestionCategory");
        var getLocalStorage = nameForm == "NORMAL" ? "SampleNormal" : nameForm == "WORKINGMEMORY" ? "SampleWorkingMemory" : "SampleVerbalMemory";
        localStorage.removeItem(getLocalStorage);
        //console.log("MULTIPLE FORM ->", MultipleForm)
    }

    if (NumberCheck.exec(DurationSecondValue) && (DurationSecondValue > 59)) {
        swal('Failed', 'Max. Second is 59 second !!!', 'warning', { closeOnClickOutside: false });
        return;
    }

    if (SubTestDescription.length > 4) {
        swal('Failed', 'Max. Initial Sub Test Code is 4 characters !!!', 'warning', { closeOnClickOutside: false });
        return;
    }

    if (NumberCheck.exec(SubTestDuration) && NumberCheck.exec(DurationSecondValue)) {

        if (QuestionCategory == 'VERBALMEMORY') {
            var dataVerbal = viewModel.verbalMemory;
            var dataAnswer = viewModel.verbalMemory.VerbalMemories;
            var lengthVerbal = $('.answer_verbal_page').length;
            var no = 1;
            for (i = 0; i < lengthVerbal; i++) {
                if (i >= 2) {
                    var datass = $('#answerVerbalMemory' + i).val();
                    viewModel.set("verbalMemory.VerbalMemories[" + i + "].answerVerbalMemory", datass);
                    viewModel.set("verbalMemory.VerbalMemories[" + i + "].No", no);
                }

                no++;
            }
            for (m = 0; m < 7; m++) {
                viewModel.set("verbalMemory.VerbalMemories[" + m + "].scoreVerbalMemory", false);
            }
            var radio = $("input[name='scoreVerbalMemory']:checked").val();
            if (radio == undefined) {
                swal('Failed', 'Please Check, There is empty correct answer on your form', 'warning', { closeOnClickOutside: false });
                return;
            }
            //console.log('radio=' + radio);
            viewModel.set("verbalMemory.scoreVerbalMemory", radio);
            viewModel.set("verbalMemory.VerbalMemories[" + radio + "].scoreVerbalMemory", true);
            //End Perulangan Value Verbal Memory

            //Data Sample
            var VerbalMemoryTitle = dataVerbal.VerbalMemoryTitle;
            var VerbalMemoryStory = dataVerbal.VerbalMemoryStory;
            var VerbalMemoryQuestion = dataVerbal.VerbalMemoryQuestion;
            var idLayout = dataVerbal.idLayout;
            var AnswerTypeCode = viewModels.Key;
            var scoreVerbalMemory = dataVerbal.scoreVerbalMemory;
            //alert(idLayout);
            var VerbalMemoryExplaination = dataVerbal.VerbalMemoryExplaination;
            var VerbalMemoryDisclaimer = dataVerbal.VerbalMemoryDisclaimer;
            var scoreVerbalMemoryList = [];
            var answerVerbalMemory = [];
            var VerbalMemoriList = [];
            var No = [];
            var nomor = 1;
            var totalData = $('.answer_verbal_page').length;
            for (s = 0; s < totalData; s++) {
                answerVerbalMemory[s] = dataAnswer[s].answerVerbalMemory;
                scoreVerbalMemoryList[s] = dataAnswer[s].scoreVerbalMemory;
                No[s] = dataAnswer[s].No;

                VerbalMemoriList[s] = {
                    No: nomor,
                    Text: dataAnswer[s].answerVerbalMemory,
                    IsCorrect: dataAnswer[s].scoreVerbalMemory,
                    Url: "",
                };
                nomor++;
            }
            var lengthVerbal = VerbalMemoriList.length;
            var Valid = true;
            for (kcl = 0; kcl < lengthVerbal; kcl++) {
                if (VerbalMemoriList[kcl].Text == '') {
                    Valid = false;
                    break;
                }
            }
            //End Data Sample

            var SampleCheck = viewModel.verbalMemory.StoryDuration == '' || viewModel.verbalMemory.StoryDuration == 0 || VerbalMemoryTitle == '' || VerbalMemoryStory == '' || VerbalMemoryQuestion == '' || VerbalMemoryExplaination == '' || VerbalMemoryDisclaimer == '' || idLayout == null;

            if (SubTestCode == '') {
                if (SubTestCheck || InstructionCheck || ConfirmationCheck || SampleCheck || scoreVerbalMemory == null || Valid == false) {
                    swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
                }
                else {
                    const IsNumeric = (num) => num.toString().includes(".");
                    if (IsNumeric(viewModel.verbalMemory.StoryDuration)) {
                        swal("Invalid", "Story Duration cannot be decimal", "warning", { closeOnClickOutside: false });
                    } else if (viewModel.verbalMemory.StoryDuration <= 0) {
                        swal("Invalid", "Story Duration cannot be less than 1", "warning", { closeOnClickOutside: false });
                    } else {
                        confirmMessageAdd();
                        $('.swal-button--defeat').on('click', function () {
                            LoadingMask.show();
                            $.ajax({
                                type: "POST",
                                url: SERVICE_URL + "api/subtest/Save",
                                headers: { "Authorization-Token": Cookie.load() },
                                data: {
                                    SubTestName: SubTestName,
                                    SubTestDesc: SubTestDescription,
                                    TestTypeCode: TestTypeName,
                                    TestToolCode: TestToolName,
                                    Duration: SubTestDuration,
                                    DurationSecond: DurationSecondValue,
                                    DisplayStatus: isDisplay,
                                    InstructionTitle: SubTestTitle,
                                    InstructionDesc: DescriptionInstruction,
                                    InstructionDisclaimer: DisclaimerInstruction,
                                    ConfirmTitle: ConfirmationTitle,
                                    ConfirmDesc: ConfirmationDescription,
                                    ConfirmDisclaimer: ConfirmationDisclaimer,
                                    Sample: {
                                        Title: VerbalMemoryTitle,
                                        Introduction: VerbalMemoryStory,
                                        IsPreface: false,
                                        Preface: "Verbal",
                                        Explaination: VerbalMemoryExplaination,
                                        Desclaimer: VerbalMemoryDisclaimer,
                                        QuestionText: VerbalMemoryQuestion,
                                        QuestionImage: "",
                                        QuestionCategoryCode: QuestionCategory,
                                        AnswerTypeCode: AnswerTypeCode,
                                        AnswerLayoutCode: idLayout,
                                        SubTestCode: "",
                                        DurationPerMemory: viewModel.verbalMemory.StoryDuration,
                                        Answers: VerbalMemoriList,
                                        MoreForm: MultipleForm
                                    },
                                },
                                success: function (response) {
                                    if (response.Acknowledge == 1) {
                                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                        $('.swal-button--confirm').on('click', function () {
                                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/SubTest/SubTest.html";
                                        });
                                        LoadingMask.hide();
                                    } else {
                                        LoadingMask.hide();
                                        swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                                    }
                                },
                                error: function (xhr, status, error) {
                                    //alert("Error");
                                    MessageBox.show("Error", "Error");
                                    LoadingMask.hide();
                                }
                            });
                        });
                    }
                    
                    //console.log('answer3=' + answerVerbalMemory3 + '&score3=' + scoreVerbalMemory3 + '&answer4=' + answerVerbalMemory4 + '&score4=' + scoreVerbalMemory4 + '&answer5=' + answerVerbalMemory5 + '&score5=' + scoreVerbalMemory5);
                    
                }
            }
            else {
                if (SubTestCheck || InstructionCheck || ConfirmationCheck || SampleCheck || scoreVerbalMemory == null) {
                    swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
                    //if (answerVerbalMemory4 == undefined || answerVerbalMemory5 == undefined || answerVerbalMemory6 == undefined || answerVerbalMemory7 == undefined)
                }
                else {
                    const IsNumeric = (num) => num.toString().includes(".");
                    if (IsNumeric(viewModel.verbalMemory.StoryDuration)) {
                        swal("Invalid", "Story Duration cannot be decimal", "warning", { closeOnClickOutside: false });
                    } else if (viewModel.verbalMemory.StoryDuration <= 0) {
                        swal("Invalid", "Story Duration cannot be less than 1", "warning", { closeOnClickOutside: false });
                    } else {
                        confirmMessageAdd();
                        $('.swal-button--defeat').on('click', function () {
                            LoadingMask.show();
                            $.ajax({
                                type: "POST",
                                url: SERVICE_URL + "api/subtest/Edit",
                                headers: { "Authorization-Token": Cookie.load() },
                                data: {
                                    SubTestCode: SubTestCode,
                                    SubTestName: SubTestName,
                                    SubTestDesc: SubTestDescription,
                                    TestTypeCode: TestTypeName,
                                    TestToolCode: TestToolName,
                                    Duration: SubTestDuration,
                                    DurationSecond: DurationSecondValue,
                                    DisplayStatus: isDisplay,
                                    InstructionTitle: SubTestTitle,
                                    InstructionDesc: DescriptionInstruction,
                                    InstructionDisclaimer: DisclaimerInstruction,
                                    ConfirmTitle: ConfirmationTitle,
                                    ConfirmDesc: ConfirmationDescription,
                                    ConfirmDisclaimer: ConfirmationDisclaimer,
                                    Sample: {
                                        Title: VerbalMemoryTitle,
                                        Introduction: VerbalMemoryStory,
                                        IsPreface: false,
                                        Preface: "Verbal",
                                        Explaination: VerbalMemoryExplaination,
                                        Desclaimer: VerbalMemoryDisclaimer,
                                        QuestionText: VerbalMemoryQuestion,
                                        QuestionImage: "",
                                        QuestionCategoryCode: QuestionCategory,
                                        AnswerTypeCode: AnswerTypeCode,
                                        AnswerLayoutCode: idLayout,
                                        SubTestCode: "",
                                        DurationPerMemory: viewModel.verbalMemory.StoryDuration,

                                        Answers: VerbalMemoriList,
                                        MoreForm: MultipleForm
                                    },
                                },
                                success: function (response) {
                                    if (response.Acknowledge == 1) {
                                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                        $('.swal-button--confirm').on('click', function () {
                                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/SubTest/SubTest.html";
                                        });
                                        LoadingMask.hide();
                                    } else {
                                        LoadingMask.hide();
                                        swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                                    }
                                },
                                error: function (xhr, status, error) {
                                    //alert("Error");
                                    MessageBox.show("Error", "Error");
                                    LoadingMask.hide();
                                }
                            });
                        });
                    }                    
                    //console.log('answer3=' + answerVerbalMemory3 + '&score3=' + scoreVerbalMemory3 + '&answer4=' + answerVerbalMemory4 + '&score4=' + scoreVerbalMemory4 + '&answer5=' + answerVerbalMemory5 + '&score5=' + scoreVerbalMemory5);
                    
                }
            }
        }
        else if (QuestionCategory == 'WORKINGMEMORY') {
            var WorkingMemory = viewModel.WorkingMemory;
            var WorkingMemories = viewModel.WorkingMemory.WorkingMemories;
            var WorkingMemoriesAnswer = viewModel.WorkingMemory.WorkingMemoriesAnswer;
            var totalDataMemory = $('.memory_working_page').length;
            var totalDataAnswer = $('.answer_working_page').length;
            //Data Sample Working Memory
            for (j = 2; j < totalDataMemory; j++) {
                var dataWorking = $('#WorkingMemoryText' + j).val();
                console.log(datass);
                viewModel.set("WorkingMemory.WorkingMemories[" + j + "].WorkingMemoryText", dataWorking);
            }
            for (k = 2; k < totalDataAnswer; k++) {
                var dataWorkingAnswer = $('#WorkingMemoryAswer' + k).val();
                console.log(datass);
                viewModel.set("WorkingMemory.WorkingMemoriesAnswer[" + k + "].WorkingMemoryAswer", dataWorkingAnswer);
            }
            for (ms = 0; ms < 7; ms++) {
                viewModel.set("WorkingMemory.WorkingMemoriesAnswer[" + ms + "].WorkingMemoriesScore", false);
            }
            var radioWorking = $("input[name='WorkingMemoryScore']:checked").val();
            //console.log('radio=' + radioWorking);
            viewModel.set("WorkingMemory.WorkingMemoryScore", radioWorking);
            viewModel.set("WorkingMemory.WorkingMemoriesAnswer[" + radioWorking + "].WorkingMemoriesScore", true);

            var dataWorking = viewModel.WorkingMemory.WorkingMemories;
            var dataWorkingAnswer = viewModel.WorkingMemory.WorkingMemoriesAnswer;
            var WorkingMemoryText = [];
            var WorkingMemoryAswer = [];
            var WorkingMemoriesScore = [];
            var WorkingMemoriList = []; var nomor = 1; var nomorAnswer = 1; var MemoryList = [];
            for (r = 0; r < totalDataAnswer; r++) {
                WorkingMemoryText[r] = dataWorking[r].WorkingMemoryText;
                WorkingMemoryAswer[r] = dataWorkingAnswer[r].WorkingMemoryAswer;
                WorkingMemoriList[r] = {
                    No: nomor,
                    Text: dataWorkingAnswer[r].WorkingMemoryAswer,
                    IsCorrect: dataWorkingAnswer[r].WorkingMemoriesScore,
                    Url: "",
                };

                nomor++;
            }
            for (mem = 0; mem < totalDataMemory; mem++) {
                MemoryList[mem] = {
                    No: nomorAnswer,
                    Text: dataWorking[mem].WorkingMemoryText,
                };
                nomorAnswer++;
            }
            var lengthWorking = WorkingMemoriList.length;
            var lengthMemory = MemoryList.length;
            var Valid = true; var ValidMemory = true;
            for (kll = 0; kll < lengthWorking; kll++) {
                if (WorkingMemoriList[kll].Text == "") {
                    Valid = false;
                    break;
                } else {
                    Valid = true;
                }
            }
            for (sll = 0; sll < lengthMemory; sll++) {

                if (MemoryList[sll].Text == "") {
                    ValidMemory = false;
                    break;
                } else {
                    ValidMemory = true;
                }
            }
            //Data Master Working Memory
            var WorkingMemoryTitle = WorkingMemory.WorkingMemoryTitle;
            var WorkingMemoryDuration = WorkingMemory.WorkingMemoryDuration;
            var WorkingMemoryTransition = WorkingMemory.WorkingMemoryTransition;
            var WorkingMemoryPreface = WorkingMemory.WorkingMemoryPreface;
            var WorkingMemoryPrefaceDisplay = WorkingMemory.WorkingMemoryPrefaceDisplay;
            var WorkingMemoryLayout = WorkingMemory.WorkingMemoryLayout;
            var WorkingMemoryScore = WorkingMemory.WorkingMemoryScore;
            var WorkingMemoryQuestion = WorkingMemory.WorkingMemoryQuestion;
            var WorkingMemoryExplaination = WorkingMemory.WorkingMemoryExplaination;
            var WorkingMemoryDisclaimer = WorkingMemory.WorkingMemoryDisclaimer; var AnswerTypeCodes = viewModels.Key;
            //end Data Master Working Memory
            //alert(viewModel.WorkingMemory.WorkingMemoryDuration);
            var WorkingMemoryCheck = WorkingMemoryTitle == '' || WorkingMemoryQuestion == '' || WorkingMemoryExplaination == '' || WorkingMemoryDisclaimer == '' || WorkingMemoryDuration == '' || WorkingMemoryPreface == '';
            //Data 
            const IsNumeric = (num) => num.toString().includes(".");
            if (IsNumeric(WorkingMemoryTransition) || IsNumeric(WorkingMemoryDuration)) {
                swal("Invalid", "Duration or Transition value cannot be decimal", "warning", { closeOnClickOutside: false });
                return;
            }
            if (WorkingMemoryDuration <= 0) {
                swal("Invalid", "Duration value cannot be less than 1", "warning", { closeOnClickOutside: false });
            } else {
                if (SubTestCode == '') {
                    if (SubTestCheck || InstructionCheck || ConfirmationCheck || WorkingMemoryCheck || Valid == false || ValidMemory == false) {
                        swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
                        //if (answerVerbalMemory4 == undefined || answerVerbalMemory5 == undefined || answerVerbalMemory6 == undefined || answerVerbalMemory7 == undefined)
                    }
                    else {
                        //End Data Sample Working Memory
                        confirmMessageAdd();
                        $('.swal-button--defeat').on('click', function () {
                            LoadingMask.show();
                            $.ajax({
                                type: "POST",
                                url: SERVICE_URL + "api/subtest/Save",
                                headers: { "Authorization-Token": Cookie.load() },
                                data: {
                                    SubTestName: SubTestName,
                                    SubTestDesc: SubTestDescription,
                                    TestTypeCode: TestTypeName,
                                    TestToolCode: TestToolName,
                                    Duration: SubTestDuration,
                                    DurationSecond: DurationSecondValue,
                                    DisplayStatus: isDisplay,
                                    InstructionTitle: SubTestTitle,
                                    InstructionDesc: DescriptionInstruction,
                                    InstructionDisclaimer: DisclaimerInstruction,
                                    ConfirmTitle: ConfirmationTitle,
                                    ConfirmDesc: ConfirmationDescription,
                                    ConfirmDisclaimer: ConfirmationDisclaimer,
                                    Sample: {
                                        Title: WorkingMemoryTitle,
                                        Introduction: viewModel.WorkingMemory.IntroductionMemory,
                                        IsPreface: WorkingMemoryPrefaceDisplay,
                                        Preface: WorkingMemoryPreface,
                                        Explaination: WorkingMemoryExplaination,
                                        Desclaimer: WorkingMemoryDisclaimer,
                                        QuestionText: WorkingMemoryQuestion,
                                        QuestionImage: "",
                                        QuestionCategoryCode: QuestionCategory,
                                        AnswerTypeCode: AnswerTypeCodes,
                                        AnswerLayoutCode: WorkingMemoryLayout,
                                        SubTestCode: "",
                                        DurationPerMemory: WorkingMemoryDuration,
                                        TransitionPerMemory: WorkingMemoryTransition,
                                        Answers: WorkingMemoriList,
                                        Memory: MemoryList,
                                        MoreForm: MultipleForm
                                    },
                                },
                                success: function (response) {
                                    if (response.Acknowledge == 1) {
                                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                        $('.swal-button--confirm').on('click', function () {
                                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/SubTest/SubTest.html";
                                        });
                                        LoadingMask.hide();
                                    } else {
                                        LoadingMask.hide();
                                        swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                                    }
                                },
                                error: function (xhr, status, error) {
                                    //alert("Error");
                                    LoadingMask.hide();
                                    MessageBox.show("Error", "Error");
                                }
                            });
                        });
                    }
                } else {
                    if (SubTestCheck || InstructionCheck || ConfirmationCheck || WorkingMemoryCheck || Valid == false || ValidMemory == false) {
                        swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
                    }
                    else {
                        //End Data Sample Working Memory
                        confirmMessageAdd();
                        $('.swal-button--defeat').on('click', function () {
                            LoadingMask.show();
                            $.ajax({
                                type: "POST",
                                url: SERVICE_URL + "api/subtest/Edit",
                                headers: { "Authorization-Token": Cookie.load() },
                                data: {
                                    SubTestCode: SubTestCode,
                                    SubTestName: SubTestName,
                                    SubTestDesc: SubTestDescription,
                                    TestTypeCode: TestTypeName,
                                    TestToolCode: TestToolName,
                                    Duration: SubTestDuration,
                                    DurationSecond: DurationSecondValue,
                                    DisplayStatus: isDisplay,
                                    InstructionTitle: SubTestTitle,
                                    InstructionDesc: DescriptionInstruction,
                                    InstructionDisclaimer: DisclaimerInstruction,
                                    ConfirmTitle: ConfirmationTitle,
                                    ConfirmDesc: ConfirmationDescription,
                                    ConfirmDisclaimer: ConfirmationDisclaimer,
                                    Sample: {
                                        Title: WorkingMemoryTitle,
                                        Introduction: viewModel.WorkingMemory.IntroductionMemory,
                                        IsPreface: WorkingMemoryPrefaceDisplay,
                                        Preface: WorkingMemoryPreface,
                                        Explaination: WorkingMemoryExplaination,
                                        Desclaimer: WorkingMemoryDisclaimer,
                                        QuestionText: WorkingMemoryQuestion,
                                        QuestionImage: "",
                                        QuestionCategoryCode: QuestionCategory,
                                        AnswerTypeCode: AnswerTypeCodes,
                                        AnswerLayoutCode: WorkingMemoryLayout,
                                        SubTestCode: "",
                                        DurationPerMemory: WorkingMemoryDuration,
                                        TransitionPerMemory: WorkingMemoryTransition,
                                        Answers: WorkingMemoriList,
                                        Memory: MemoryList,
                                        MoreForm: MultipleForm
                                    },
                                },
                                success: function (response) {
                                    if (response.Acknowledge == 1) {
                                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                        $('.swal-button--confirm').on('click', function () {
                                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/SubTest/SubTest.html";
                                        });
                                        LoadingMask.hide();
                                    } else {
                                        LoadingMask.hide();
                                        swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                                    }
                                },
                                error: function (xhr, status, error) {
                                    //alert("Error");
                                    MessageBox.show("Error", "Error");
                                    LoadingMask.hide();
                                }
                            });
                        });
                    }
                }
            }
            
        }
        else {
            //alert("Ini save Data Normal Image");
            // ;
            // ;
            var dataNormal = viewModel.SampleNormal;
            var SampleNormalTitle = dataNormal.SampleNormalTitle; var SampleNormalIntroduction = dataNormal.SampleNormalIntroduction; var NormalQuestion = dataNormal.NormalQuestion; var NormalScoreText = dataNormal.NormalScoreText; var NormalScoreImage = dataNormal.NormalScoreImage; var NormalDisclaimer = dataNormal.NormalDisclaimer; var NormalExplaination = dataNormal.NormalExplaination;
            var lengthText = $('.add_sample').length; var checkImage = $('#mediaDisplay0').attr('src');
            var checkImages = $('#mediaDisplay1').attr('src');
            var NormalCheck = (SampleNormalTitle == '' || SampleNormalIntroduction == '' || NormalQuestion == '' || NormalScoreText == null || NormalDisclaimer == '' || NormalExplaination == '');
            if ((checkImage == 'a.jpg' || checkImage == null || checkImage == '') && (checkImages == null || checkImages == '') && viewModel.typeAnswer == 'AT19000001') {
                if (SubTestCheck || InstructionCheck || ConfirmationCheck || NormalCheck) {
                    swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
                }
                else {
                    savenoImage();
                }

            } else {
                var check = $('#mediaDisplay0').attr('src');
                var imageQuestion = '';
                if (check == null || check == 'a.jpg' || check == undefined) {
                    imageQuestion = 'a.jpg';
                } else {
                    imageQuestion = check;
                }
                if (viewModel.typeAnswer == 'AT19000001') {
                    var questiontext = viewModel.SampleNormal.NormalQuestion
                    var QuestionCategory = localStorage.getItem('QuestionCategory');
                    var lengthText = $('.add_sample').length;
                    for (kg = 2; kg < lengthText; kg++) {
                        var dataNormalText = $('#NormalAnswerText' + kg).val();
                        viewModel.set("SampleNormal.NormalText[" + kg + "].NormalAnswerText", dataNormalText);
                    }
                    for (normalscore = 0; normalscore < 7; normalscore++) {
                        viewModel.set("SampleNormal.NormalText[" + normalscore + "].NormalScoreText", false);
                    }
                    var radioNormalText = $("input[name='NormalScoreText']:checked").val();
                    console.log('radio=' + radioNormalText);
                    viewModel.set("SampleNormal.NormalScoreText", radioNormalText);
                    viewModel.set("SampleNormal.NormalText[" + radioNormalText + "].NormalScoreText", true);
                    // ; 
                    var NormalList = [];
                    var nomor = 1;
                    for (sk = 0; sk < lengthText; sk++) {
                        NormalList[sk] = {
                            No: nomor,
                            Text: viewModel.SampleNormal.NormalText[sk].NormalAnswerText,
                            IsCorrect: viewModel.SampleNormal.NormalText[sk].NormalScoreText,
                            Url: "a.jpg",
                        };
                        nomor++;
                    }
                    var lengthNorm = NormalList.length;
                    var Valid = true;
                    for (kcl = 0; kcl < lengthNorm; kcl++) {
                        if (NormalList[kcl].Text == '') {
                            Valid = false;
                            break;
                        }
                    }
                }
                else {
                    var data = [];
                    var lengthImage = $('.add_image').length;
                    for (normalscore = 0; normalscore < 7; normalscore++) {
                        viewModel.set("SampleNormal.NormalImage[" + normalscore + "].NormalScoreImage", false);
                    }
                    var radioNormalText = $("input[name='NormalScoreImage']:checked").val();
                    console.log('radio=' + radioNormalText);
                    viewModel.set("SampleNormal.NormalScoreImage", radioNormalText);
                    viewModel.set("SampleNormal.NormalImage[" + radioNormalText + "].NormalScoreImage", true);
                    for (i = 0; i <= lengthImage; i++) {
                        data[i] = $('#mediaDisplay' + (i + 1)).attr('src');
                        viewModel.set('SampleNormal.NormalImage[' + i + '].NormalAnswerImage', data[i])
                    }
                    var NormalList = []; var nomorAnswer = 1;
                    var valid = true;
                    for (s = 0; s < lengthImage; s++) {
                        if (viewModel.SampleNormal.NormalImage[s].NormalAnswerImage == '') {
                            valid = false;
                            break;
                        } else {
                            valid = true;
                            NormalList[s] = {
                                No: nomorAnswer,
                                Text: '',
                                IsCorrect: viewModel.SampleNormal.NormalImage[s].NormalScoreImage,
                                Url: viewModel.SampleNormal.NormalImage[s].NormalAnswerImage
                            };
                            nomorAnswer++;
                        }
                    }
                }
                //console.log(NormalList);
                if (SubTestCheck || InstructionCheck || ConfirmationCheck || NormalCheck || valid == false) {
                    swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
                }
                else {
                    if (viewModel.SubTestCode == '') {
                        //add

                        confirmMessageAdd();
                        $('.swal-button--defeat').on('click', function () {
                            LoadingMask.show();
                            $.ajax({
                                type: "POST",
                                url: SERVICE_URL + "api/subtest/Save",
                                headers: { "Authorization-Token": Cookie.load() },
                                data: {
                                    SubTestName: viewModel.SubTestName,
                                    SubTestDesc: viewModel.Description.replace(/\s/g, '');,
                                    TestTypeCode: viewModel.TestTypeName,
                                    TestToolCode: viewModel.TestToolName,
                                    Duration: viewModel.Duration,
                                    DurationSecond: viewModel.DurationSecond,
                                    DisplayStatus: viewModel.isDisplay,
                                    InstructionTitle: viewModel.Instruction.SubTestTitle,
                                    InstructionDesc: viewModel.Instruction.DescriptionInstruction,
                                    InstructionDisclaimer: viewModel.Instruction.DisclaimerInstruction,
                                    ConfirmTitle: viewModel.Confirmation.ConfirmationTitle,
                                    ConfirmDesc: viewModel.Confirmation.ConfirmationDescription,
                                    ConfirmDisclaimer: viewModel.Confirmation.ConfirmationDisclaimer,
                                    Sample: {
                                        Title: viewModel.SampleNormal.SampleNormalTitle,
                                        Introduction: viewModel.SampleNormal.SampleNormalIntroduction,
                                        IsPreface: false,
                                        Preface: "Normal",
                                        Explaination: viewModel.SampleNormal.NormalExplaination,
                                        Desclaimer: viewModel.SampleNormal.NormalDisclaimer,
                                        QuestionText: viewModel.SampleNormal.NormalQuestion,
                                        QuestionImage: imageQuestion,
                                        QuestionCategoryCode: QuestionCategory,
                                        AnswerTypeCode: viewModel.typeAnswer,
                                        AnswerLayoutCode: viewModel.typeLayout,
                                        SubTestCode: viewModel.SubTestCode,
                                        DurationPerMemory: 0,
                                        Answers: NormalList,
                                        Memory: [],
                                        MoreForm: MultipleForm
                                    },
                                },
                                success: function (response) {
                                    if (response.Acknowledge > 0) {
                                        LoadingMask.hide();
                                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                        $('.swal-button--confirm').on('click', function () {
                                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/SubTest/SubTest.html";
                                        });
                                    } else {
                                        LoadingMask.hide();
                                        swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                                    }
                                },
                                error: function (xhr, status, error) {
                                    //alert("Error");
                                    MessageBox.show("Error", "Error");
                                    LoadingMask.hide();
                                }
                            });
                        });
                    } else {
                        //edit
                        confirmMessageAdd();
                        $('.swal-button--defeat').on('click', function () {
                            LoadingMask.show();
                            $.ajax({
                                type: "POST",
                                url: SERVICE_URL + "api/subtest/Edit",
                                headers: { "Authorization-Token": Cookie.load() },
                                data: {
                                    SubTestCode: viewModel.SubTestCode,
                                    SubTestName: viewModel.SubTestName,
                                    SubTestDesc: viewModel.Description.replace(/\s/g, '');,
                                    TestTypeCode: viewModel.TestTypeName,
                                    TestToolCode: viewModel.TestToolName,
                                    Duration: viewModel.Duration,
                                    DurationSecond: viewModel.DurationSecond,
                                    DisplayStatus: viewModel.isDisplay,
                                    InstructionTitle: viewModel.Instruction.SubTestTitle,
                                    InstructionDesc: viewModel.Instruction.DescriptionInstruction,
                                    InstructionDisclaimer: viewModel.Instruction.DisclaimerInstruction,
                                    ConfirmTitle: viewModel.Confirmation.ConfirmationTitle,
                                    ConfirmDesc: viewModel.Confirmation.ConfirmationDescription,
                                    ConfirmDisclaimer: viewModel.Confirmation.ConfirmationDisclaimer,
                                    Sample: {
                                        Title: viewModel.SampleNormal.SampleNormalTitle,
                                        Introduction: viewModel.SampleNormal.SampleNormalIntroduction,
                                        IsPreface: false,
                                        Preface: "Normal",
                                        Explaination: viewModel.SampleNormal.NormalExplaination,
                                        Desclaimer: viewModel.SampleNormal.NormalDisclaimer,
                                        QuestionText: viewModel.SampleNormal.NormalQuestion,
                                        QuestionImage: imageQuestion,
                                        QuestionCategoryCode: QuestionCategory,
                                        AnswerTypeCode: viewModel.typeAnswer,
                                        AnswerLayoutCode: viewModel.typeLayout,
                                        SubTestCode: viewModel.SubTestCode,
                                        DurationPerMemory: 0,
                                        Answers: NormalList,
                                        Memory: [],
                                        MoreForm: MultipleForm
                                    },
                                },
                                success: function (response) {
                                    if (response.Acknowledge > 0) {
                                        LoadingMask.hide();
                                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                        $('.swal-button--confirm').on('click', function () {
                                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/SubTest/SubTest.html";
                                        });
                                    } else {
                                        LoadingMask.hide();
                                        swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                                    }
                                },
                                error: function (xhr, status, error) {
                                    //alert("Error");
                                    MessageBox.show("Error", "Error");
                                    LoadingMask.hide();
                                }
                            });
                        });
                    }
                }
            }
        }
    } else {
        swal('Failed', 'Duration for Sub Test invalid!!!', 'warning', { closeOnClickOutside: false });
    }
}

saveImage = function (data) {
    var checkImage = $('#mediaDisplay0').attr('src');
    var QuestionCategory = localStorage.getItem('QuestionCategory');
    var MultipleForm;
    if ($(".sampleform-nm").length > 1 || $(".sampleform-wm").length > 1 || $(".sampleform-vm").length > 1) {
        MultipleForm = assignValueForm();
        var nameForm = localStorage.getItem("QuestionCategory");
        var getLocalStorage = nameForm == "NORMAL" ? "SampleNormal" : nameForm == "WORKINGMEMORY" ? "SampleWorkingMemory" : "SampleVerbalMemory";
        localStorage.removeItem(getLocalStorage);
        //console.log("MULTIPLE FORM ->", MultipleForm)
    }
    var QuestionImage = '';
    var TotalDataImage = $('.add_image').length;
    var radioNormal = $("input[name='NormalScoreImage']:checked").val();
    console.log('radio=' + radioNormal);
    viewModel.set("SampleNormal.NormalScoreImage", radioNormal);
    viewModel.set("SampleNormal.NormalImage[" + radioNormal + "].NormalScoreImage", true);
    var AnswerNormal = []; var nomorAnswer = 1;
    var Valid = true; var xChek = $('#media0')[0].files[0]; var yChek = $('#media1')[0].files[0];
    if (data.length < 2) {
        if (viewModel.typeAnswer == 'AT19000001') {
            QuestionImage = data[0].Url;
            var lengthText = $('.add_sample').length;
            for (kg = 2; kg < lengthText; kg++) {
                var dataNormalText = $('#NormalAnswerText' + kg).val();
                viewModel.set("SampleNormal.NormalText[" + kg + "].NormalAnswerText", dataNormalText);
            }
            for (normalscore = 0; normalscore < 7; normalscore++) {
                viewModel.set("SampleNormal.NormalText[" + normalscore + "].NormalScoreText", false);
            }
            var radioNormalText = $("input[name='NormalScoreText']:checked").val();
            console.log('radio=' + radioNormalText);
            viewModel.set("SampleNormal.NormalScoreText", radioNormalText);
            viewModel.set("SampleNormal.NormalText[" + radioNormalText + "].NormalScoreText", true);
            for (sk = 0; sk < lengthText; sk++) {
                AnswerNormal[sk] = {
                    No: nomorAnswer,
                    Text: viewModel.SampleNormal.NormalText[sk].NormalAnswerText,
                    IsCorrect: viewModel.SampleNormal.NormalText[sk].NormalScoreText,
                    Url: "a.jpg",
                };
                nomorAnswer++;
            }
            var lengthNorText = AnswerNormal.length;
            for (ks = 0; ks < lengthNorText; ks++) {
                if (AnswerNormal[ks].Text == '') {
                    Valid = false;
                    break
                }
                else {
                    Valid = true;
                }
            }
        } else if (xChek != undefined && yChek == undefined) {
            QuestionImage = data[0].Url;
            for (s = 0; s < TotalDataImage; s++) {
                AnswerNormal[s] = {
                    No: nomorAnswer,
                    Text: "a",
                    Url: viewModel.SampleNormal.NormalImage[s].NormalAnswerImage,
                    IsCorrect: viewModel.SampleNormal.NormalImage[s].NormalScoreImage
                };
                nomorAnswer++;
            }
            //console.log(viewModel.SampleNormal.NormalImage);
        }
    } else {
        for (normalscore = 0; normalscore < 7; normalscore++) {
            viewModel.set("SampleNormal.NormalImage[" + normalscore + "].NormalScoreImage", false);
        }
        var radioNormalText = $("input[name='NormalScoreImage']:checked").val();
        console.log('radio=' + radioNormalText);
        viewModel.set("SampleNormal.NormalScoreImage", radioNormalText);
        viewModel.set("SampleNormal.NormalImage[" + radioNormalText + "].NormalScoreImage", true);
        if (checkImage == 'a.jpg' || checkImage == null || checkImage == undefined || checkImage == '') {
            QuestionImage = 'a.jpg';
            for (s = 0; s < TotalDataImage; s++) {
                AnswerNormal[s] = {
                    No: nomorAnswer,
                    Text: "a",
                    Url: data[s].Url,
                    IsCorrect: viewModel.SampleNormal.NormalImage[s].NormalScoreImage
                };
                nomorAnswer++;
            }
        }
        else if (xChek == undefined && yChek != undefined) {
            QuestionImage = viewModel.SampleNormal.NormalQuestonImage;
            for (s = 0; s < TotalDataImage; s++) {
                AnswerNormal[s] = {
                    No: nomorAnswer,
                    Text: "a",
                    Url: data[s].Url,
                    IsCorrect: viewModel.SampleNormal.NormalImage[s].NormalScoreImage
                };
                nomorAnswer++;
            }
        }
        else {
            QuestionImage = data[0].Url;
            for (s = 0; s < TotalDataImage; s++) {
                AnswerNormal[s] = {
                    No: nomorAnswer,
                    Text: "a",
                    Url: data[s + 1].Url,
                    IsCorrect: viewModel.SampleNormal.NormalImage[s].NormalScoreImage

                };
                nomorAnswer++;
            }
        }
        var lengthNorText = AnswerNormal.length;
        for (ks = 0; ks < lengthNorText; ks++) {
            if (AnswerNormal[ks].Url == '') {
                Valid = false;
                break
            }
            else {
                Valid = true;
            }
        }
    }
    if (Valid == false) {
        swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
    } else {
        if (viewModel.SubTestCode == '') {
            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/subtest/Save",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        SubTestName: viewModel.SubTestName,
                        SubTestDesc: viewModel.Description.replace(/\s/g, '');,
                        TestTypeCode: viewModel.TestTypeName,
                        TestToolCode: viewModel.TestToolName,
                        Duration: viewModel.Duration,
                        DurationSecond: viewModel.DurationSecond,
                        DisplayStatus: viewModel.isDisplay,
                        InstructionTitle: viewModel.Instruction.SubTestTitle,
                        InstructionDesc: viewModel.Instruction.DescriptionInstruction,
                        InstructionDisclaimer: viewModel.Instruction.DisclaimerInstruction,
                        ConfirmTitle: viewModel.Confirmation.ConfirmationTitle,
                        ConfirmDesc: viewModel.Confirmation.ConfirmationDescription,
                        ConfirmDisclaimer: viewModel.Confirmation.ConfirmationDisclaimer,
                        Sample: {
                            Title: viewModel.SampleNormal.SampleNormalTitle,
                            Introduction: viewModel.SampleNormal.SampleNormalIntroduction,
                            IsPreface: false,
                            Preface: "Normal",
                            Explaination: viewModel.SampleNormal.NormalExplaination,
                            Desclaimer: viewModel.SampleNormal.NormalDisclaimer,
                            QuestionText: viewModel.SampleNormal.NormalQuestion,
                            QuestionImage: QuestionImage,
                            QuestionCategoryCode: QuestionCategory,
                            AnswerTypeCode: viewModel.typeAnswer,
                            AnswerLayoutCode: viewModel.typeLayout,
                            SubTestCode: "a",
                            DurationPerMemory: 0,
                            Answers: AnswerNormal,
                            Memory: [],
                            MoreForm: MultipleForm
                        },
                    },
                    success: function (response) {
                        if (response.Acknowledge == 1) {
                            LoadingMask.hide();
                            swal("Good", response.Message, "success", { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + "Views/OnlineTesting/SubTest/SubTest.html";
                            });
                        } else {
                            LoadingMask.hide();
                            swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                        }
                    },
                    error: function (xhr, status, error) {
                        //alert("Error");
                        MessageBox.show("Error", "Error");
                        LoadingMask.hide();
                    }
                });
            });
        }
        else {
            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/subtest/Edit",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        SubTestCode: viewModel.SubTestCode,
                        SubTestName: viewModel.SubTestName,
                        SubTestDesc: viewModel.Description.replace(/\s/g, '');,
                        TestTypeCode: viewModel.TestTypeName,
                        TestToolCode: viewModel.TestToolName,
                        Duration: viewModel.Duration,
                        DurationSecond: viewModel.DurationSecond,
                        DisplayStatus: viewModel.isDisplay,
                        InstructionTitle: viewModel.Instruction.SubTestTitle,
                        InstructionDesc: viewModel.Instruction.DescriptionInstruction,
                        InstructionDisclaimer: viewModel.Instruction.DisclaimerInstruction,
                        ConfirmTitle: viewModel.Confirmation.ConfirmationTitle,
                        ConfirmDesc: viewModel.Confirmation.ConfirmationDescription,
                        ConfirmDisclaimer: viewModel.Confirmation.ConfirmationDisclaimer,
                        Sample: {
                            Title: viewModel.SampleNormal.SampleNormalTitle,
                            Introduction: viewModel.SampleNormal.SampleNormalIntroduction,
                            IsPreface: false,
                            Preface: "Normal",
                            Explaination: viewModel.SampleNormal.NormalExplaination,
                            Desclaimer: viewModel.SampleNormal.NormalDisclaimer,
                            QuestionText: viewModel.SampleNormal.NormalQuestion,
                            QuestionImage: QuestionImage,
                            QuestionCategoryCode: QuestionCategory,
                            AnswerTypeCode: viewModel.typeAnswer,
                            AnswerLayoutCode: viewModel.typeLayout,
                            SubTestCode: "a",
                            DurationPerMemory: 0,
                            Answers: AnswerNormal,
                            Memory: [],
                            MoreForm: MultipleForm
                        },
                    },
                    success: function (response) {
                        if (response.Acknowledge == 1) {
                            LoadingMask.hide();
                            swal("Good", response.Message, "success", { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + "Views/OnlineTesting/SubTest/SubTest.html";
                            });
                        } else {
                            LoadingMask.hide();
                            swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                        }
                    },
                    error: function (xhr, status, error) {
                        //alert("Error");
                        MessageBox.show("Error", "Error");
                        LoadingMask.hide();
                    }
                });
            });
        }
    }
}

savenoImage = function () {
    var questiontext = viewModel.SampleNormal.NormalQuestion
    var MultipleForm;
    if ($(".sampleform-nm").length > 1 || $(".sampleform-wm").length > 1 || $(".sampleform-vm").length > 1) {
        MultipleForm = assignValueForm();
        var nameForm = localStorage.getItem("QuestionCategory");
        var getLocalStorage = nameForm == "NORMAL" ? "SampleNormal" : nameForm == "WORKINGMEMORY" ? "SampleWorkingMemory" : "SampleVerbalMemory";
        localStorage.removeItem(getLocalStorage);
        //console.log("MULTIPLE FORM ->", MultipleForm)
    }
    var QuestionCategory = localStorage.getItem('QuestionCategory');
    var lengthText = $('.add_sample').length;
    for (kg = 2; kg < lengthText; kg++) {
        var dataNormalText = $('#NormalAnswerText' + kg).val();
        viewModel.set("SampleNormal.NormalText[" + kg + "].NormalAnswerText", dataNormalText);
    }
    for (normalscore = 0; normalscore < 7; normalscore++) {
        viewModel.set("SampleNormal.NormalText[" + normalscore + "].NormalScoreText", false);
    }
    var radioNormalText = $("input[name='NormalScoreText']:checked").val();
    console.log('radio=' + radioNormalText);
    viewModel.set("SampleNormal.NormalScoreText", radioNormalText);
    viewModel.set("SampleNormal.NormalText[" + radioNormalText + "].NormalScoreText", true);
    // ; 
    var NormalList = [];
    var nomor = 1;
    for (sk = 0; sk < lengthText; sk++) {
        NormalList[sk] = {
            No: nomor,
            Text: viewModel.SampleNormal.NormalText[sk].NormalAnswerText,
            IsCorrect: viewModel.SampleNormal.NormalText[sk].NormalScoreText,
            Url: "a.jpg",
        };
        nomor++;
    }
    var lengthNorm = NormalList.length;
    var Valid = true;
    for (kcl = 0; kcl < lengthNorm; kcl++) {
        if (NormalList[kcl].Text == '') {
            Valid = false;
            break;
        }
    }
    if (Valid == false) {
        swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
    } else {
        if (viewModel.SubTestCode == '') {
            //console.log(viewModel);
            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/subtest/Save",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        SubTestName: viewModel.SubTestName,
                        SubTestDesc: viewModel.Description.replace(/\s/g, '');,
                        TestTypeCode: viewModel.TestTypeName,
                        TestToolCode: viewModel.TestToolName,
                        Duration: viewModel.Duration,
                        DurationSecond: viewModel.DurationSecond,
                        DisplayStatus: viewModel.isDisplay,
                        InstructionTitle: viewModel.Instruction.SubTestTitle,
                        InstructionDesc: viewModel.Instruction.DescriptionInstruction,
                        InstructionDisclaimer: viewModel.Instruction.DisclaimerInstruction,
                        ConfirmTitle: viewModel.Confirmation.ConfirmationTitle,
                        ConfirmDesc: viewModel.Confirmation.ConfirmationDescription,
                        ConfirmDisclaimer: viewModel.Confirmation.ConfirmationDisclaimer,
                        Sample: {
                            Title: viewModel.SampleNormal.SampleNormalTitle,
                            Introduction: viewModel.SampleNormal.SampleNormalIntroduction,
                            IsPreface: false,
                            Preface: "Normal",
                            Explaination: viewModel.SampleNormal.NormalExplaination,
                            Desclaimer: viewModel.SampleNormal.NormalDisclaimer,
                            QuestionText: viewModel.SampleNormal.NormalQuestion,
                            QuestionImage: 'a.jpg',
                            QuestionCategoryCode: QuestionCategory,
                            AnswerTypeCode: viewModel.typeAnswer,
                            AnswerLayoutCode: viewModel.typeLayout,
                            SubTestCode: viewModel.SubTestCode,
                            DurationPerMemory: 0,
                            Answers: NormalList,
                            Memory: [],
                            MoreForm: MultipleForm
                        },
                    },
                    success: function (response) {
                        if (response.Acknowledge == 1) {
                            LoadingMask.hide();
                            swal("Good", response.Message, "success", { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + "Views/OnlineTesting/SubTest/SubTest.html";
                            });
                        } else {
                            LoadingMask.hide();
                            swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                        }
                    },
                    error: function (xhr, status, error) {
                        //alert("Error");
                        MessageBox.show("Error", "Error");
                        LoadingMask.hide();
                    }
                });
            });
        } else {
            //console.log(viewModel);
            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/subtest/Edit",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        SubTestCode: viewModel.SubTestCode,
                        SubTestName: viewModel.SubTestName,
                        SubTestDesc: viewModel.Description.replace(/\s/g, '');,
                        TestTypeCode: viewModel.TestTypeName,
                        TestToolCode: viewModel.TestToolName,
                        Duration: viewModel.Duration,
                        DurationSecond: viewModel.DurationSecond,
                        DisplayStatus: viewModel.isDisplay,
                        InstructionTitle: viewModel.Instruction.SubTestTitle,
                        InstructionDesc: viewModel.Instruction.DescriptionInstruction,
                        InstructionDisclaimer: viewModel.Instruction.DisclaimerInstruction,
                        ConfirmTitle: viewModel.Confirmation.ConfirmationTitle,
                        ConfirmDesc: viewModel.Confirmation.ConfirmationDescription,
                        ConfirmDisclaimer: viewModel.Confirmation.ConfirmationDisclaimer,
                        Sample: {
                            Title: viewModel.SampleNormal.SampleNormalTitle,
                            Introduction: viewModel.SampleNormal.SampleNormalIntroduction,
                            IsPreface: false,
                            Preface: "Normal",
                            Explaination: viewModel.SampleNormal.NormalExplaination,
                            Desclaimer: viewModel.SampleNormal.NormalDisclaimer,
                            QuestionText: viewModel.SampleNormal.NormalQuestion,
                            QuestionImage: 'a.jpg',
                            QuestionCategoryCode: QuestionCategory,
                            AnswerTypeCode: viewModel.typeAnswer,
                            AnswerLayoutCode: viewModel.typeLayout,
                            SubTestCode: viewModel.SubTestCode,
                            DurationPerMemory: 0,
                            Answers: NormalList,
                            Memory: [],
                            MoreForm: MultipleForm
                        },
                    },
                    success: function (response) {
                        if (response.Acknowledge == 1) {
                            LoadingMask.hide();
                            swal("Good", response.Message, "success", { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + "Views/OnlineTesting/SubTest/SubTest.html";
                            });
                        } else {
                            LoadingMask.hide();
                            swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                        }
                    },
                    error: function (xhr, status, error) {
                        //alert("Error");
                        MessageBox.show("Error", "Error");
                        LoadingMask.hide();
                    }
                });
            });
        }
    }
}

function ConfirmationPreviewMultiple(id) {
    var result = assignValueForm();
    var nameForm = localStorage.getItem("QuestionCategory");
    var setLocalStorage = nameForm == "NORMAL" ? "SampleNormal" : nameForm == "WORKINGMEMORY" ? "SampleWorkingMemory" : "SampleVerbalMemory";
    if (nameForm == "NORMAL") {
        localStorage.removeItem("SampleVerbalMemory");
        localStorage.removeItem("SampleWorkingMemory");
    } else if (nameForm == "WORKINGMEMORY") {
        localStorage.removeItem("SampleVerbalMemory");
        localStorage.removeItem("SampleNormalMemory");
    } else {
        localStorage.removeItem("SampleWorkingMemory");
        localStorage.removeItem("SampleNormalMemory");
    }
    localStorage.setItem(setLocalStorage, JSON.stringify(result))
    window.open(viewModel.domainPreviewForm + `?id=` + id + ``);
}

ConfirmationPreview = function (e) {
    //var Type = "Confirmation";
    var request = indexedDB.open('LocalStore');
    //var request = indexedDB;
    //console.log(request);
    request.onsuccess = function (event) {
        var db = request.result;
        var transaction = db.transaction(["Instruction"], "readwrite");
        transaction.oncomplete = function (event) {
            console.log("Sukses");
        };
        transaction.onerror = function (event) {
            console.log("Error" + transaction.error);
        };
        var objectStore = transaction.objectStore('Instruction');
        var objectStoreRequest = objectStore.delete('Instruksi');
        var objectStoreConfirm = objectStore.delete('Confirmation');
        var objectStoreVerbalMemory = objectStore.delete('VerbalMemory');
        objectStoreRequest.onsuccess = function () {
            console.log("Istruksi Berhasil...");
        }
        objectStoreConfirm.onsuccess = function () {
            console.log("Confirm Done...");
        }
        objectStoreVerbalMemory.onsuccess = function () {
            console.log("Verbal Done....");
        }
        request.onerror = function (event) {
            console.info, console.error
        }
    }
    var SubTestName = viewModel.SubTestName;
    var QuestionCategory = localStorage.getItem('QuestionCategory');
    var Confirmation = viewModel.Confirmation;
    var Instruction = viewModel.Instruction;
    var SubTestTitle = Instruction.SubTestTitle;
    var DescriptionInstruction = Instruction.DescriptionInstruction;
    var DisclaimerInstruction = Instruction.DisclaimerInstruction;

    var ConfirmationTitle = Confirmation.ConfirmationTitle;
    var ConfirmationDescription = Confirmation.ConfirmationDescription;
    var ConfirmationDisclaimer = Confirmation.ConfirmationDisclaimer;

    var dataInstruction = { "SubTestName": SubTestName, "title": SubTestTitle, "description": DescriptionInstruction, "disclaimer": DisclaimerInstruction };
    var dataConfirmation = { "ConfirmationTitle": ConfirmationTitle, "ConfirmationDescription": ConfirmationDescription, "ConfirmationDisclaimer": ConfirmationDisclaimer };
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


    var QuestionCategory = localStorage.getItem('QuestionCategory');
    if (QuestionCategory == 'VERBALMEMORY') {
        var dataVerbal = viewModel.verbalMemory;
        var dataAnswer = viewModel.verbalMemory.VerbalMemories;
        for (i = 2; i < 7; i++) {
            //viewModel.set("verbalMemory.VerbalMemories[" + i + "].scoreVerbalMemory", false);
            var datass = $('#answerVerbalMemory' + i).val();
            //console.log(datass);
            viewModel.set("verbalMemory.VerbalMemories[" + i + "].answerVerbalMemory", datass);
        }
        for (m = 0; m < 7; m++) {
            viewModel.set("verbalMemory.VerbalMemories[" + m + "].scoreVerbalMemory", false);
        }
        var radio = $("input[name='scoreVerbalMemory']:checked").val();
        console.log('radio=' + radio);
        viewModel.set("verbalMemory.scoreVerbalMemory", radio);
        viewModel.set("verbalMemory.VerbalMemories[" + radio + "].scoreVerbalMemory", true);
        //Data Sample
        var totalData = $('.answer_verbal_page').length;
        var scoreVerbalMemory = viewModel.verbalMemory.scoreVerbalMemory;
        var scoreVerbalMemoryList = [];
        var answerVerbalMemory = [];
        for (s = 0; s < totalData; s++) {
            answerVerbalMemory[s] = dataAnswer[s].answerVerbalMemory;
            scoreVerbalMemoryList[s] = dataAnswer[s].scoreVerbalMemory;
        }
        var dataVerbal = {
            "VerbalMemoryTitle": viewModel.verbalMemory.VerbalMemoryTitle,
            "VerbalMemoryStory": viewModel.verbalMemory.VerbalMemoryStory,
            "VerbalMemoryQuestion": viewModel.verbalMemory.VerbalMemoryQuestion,
            "idLayout": viewModel.verbalMemory.idLayout,
            "VerbalMemoryExplaination": viewModel.verbalMemory.VerbalMemoryExplaination,
            "VerbalMemoryDisclaimer": viewModel.verbalMemory.VerbalMemoryDisclaimer,
            "answerVerbalMemory": answerVerbalMemory,
            "scoreVerbalMemory": scoreVerbalMemory,
            "scoreVerbalMemoryList": scoreVerbalMemoryList,
            "TotalData": totalData,
            "QuestionCategory": QuestionCategory,
            "StoryDuration": viewModel.verbalMemory.StoryDuration
        }
        $.indexedDB('LocalStore').objectStore("Instruction", { "autoIncrement": false }).add(dataVerbal, "VerbalMemory").then(function (val) {
            dataVerbal.id = val;
            //dataConfirmation.id = val;
            console.info(val);
        }, console.error);
    }
    else if (QuestionCategory == 'WORKINGMEMORY') {
        var WorkingMemory = viewModel.WorkingMemory;
        var lengthMemory = $('.memory_working_page').length;
        var lengthAnswer = $('.answer_working_page').length;
        //Data Sample Working Memory
        for (j = 2; j < lengthMemory; j++) {
            var dataWorking = $('#WorkingMemoryText' + j).val();
            console.log(datass);
            viewModel.set("WorkingMemory.WorkingMemories[" + j + "].WorkingMemoryText", dataWorking);
        }
        for (k = 0; k < lengthAnswer; k++) {
            viewModel.set("WorkingMemory.WorkingMemoriesAnswer[" + k + "].WorkingMemoriesScore", false);
            if (k >= 2) {
                var dataWorkingAnswer = $('#WorkingMemoryAswer' + k).val();
                console.log(datass);
                viewModel.set("WorkingMemory.WorkingMemoriesAnswer[" + k + "].WorkingMemoryAswer", dataWorkingAnswer);
            }
        }
        var radioWorking = $("input[name='WorkingMemoryScore']:checked").val();
        console.log('radio=' + radioWorking);
        viewModel.set("WorkingMemory.WorkingMemoryScore", radioWorking);
        viewModel.set("WorkingMemory.WorkingMemoriesAnswer[" + radioWorking + "].WorkingMemoriesScore", true);

        var dataWorking = viewModel.WorkingMemory.WorkingMemories;
        var dataWorkingAnswer = viewModel.WorkingMemory.WorkingMemoriesAnswer;
        var WorkingMemoryText = [];
        var WorkingMemoryAswer = [];
        var WorkingMemoriesScore = [];

        var rplus = 0;
        for (r = 0; r < lengthMemory; r++) {
            WorkingMemoryText[rplus] = dataWorking[r].WorkingMemoryText;
            WorkingMemoryText[rplus + 1] = '';
            rplus = rplus + 2;
        }

        for (jk = 0; jk < lengthAnswer; jk++) {
            WorkingMemoryAswer[jk] = dataWorkingAnswer[jk].WorkingMemoryAswer;
            WorkingMemoriesScore[jk] = dataWorkingAnswer[jk].WorkingMemoriesScore;
        }
        //Data Master Working Memory
        var WorkingMemoryTitle = WorkingMemory.WorkingMemoryTitle;
        var WorkingMemoryDuration = WorkingMemory.WorkingMemoryDuration;
        var WorkingMemoryTransition = WorkingMemory.WorkingMemoryTransition
        var WorkingMemoryPreface = WorkingMemory.WorkingMemoryPreface;
        var WorkingMemoryPrefaceDisplay = WorkingMemory.WorkingMemoryPrefaceDisplay;
        var WorkingMemoryLayout = WorkingMemory.WorkingMemoryLayout;
        var WorkingMemoryScore = WorkingMemory.WorkingMemoryScore;
        var WorkingMemoryQuestion = WorkingMemory.WorkingMemoryQuestion;
        var WorkingMemoryExplaination = WorkingMemory.WorkingMemoryExplaination;
        var WorkingMemoryDisclaimer = WorkingMemory.WorkingMemoryDisclaimer;
        var totalDataMemory = $('.memory_working_page').length;
        var totalDataAnswer = $('.answer_working_page').length;
        var dataWorking = {
            "WorkingMemoryTitle": WorkingMemoryTitle,
            "WorkingMemoryDuration": WorkingMemoryDuration,
            "WorkingMemoryTransition": WorkingMemoryTransition,
            "WorkingMemoryPreface": WorkingMemoryPreface,
            "WorkingMemoryPrefaceDisplay": WorkingMemoryPrefaceDisplay,
            "IntroductionMemory": WorkingMemory.IntroductionMemory,
            "WorkingMemoryLayout": WorkingMemoryLayout,
            "WorkingMemoryScore": WorkingMemoryScore,
            "WorkingMemoryQuestion": WorkingMemoryQuestion,
            "WorkingMemoryExplaination": WorkingMemoryExplaination,
            "WorkingMemoryDisclaimer": WorkingMemoryDisclaimer,
            "WorkingMemoryText": WorkingMemoryText,
            "WorkingMemoryAswer": WorkingMemoryAswer,
            "WorkingMemoriesScore": WorkingMemoriesScore,
            "totalDataMemory": totalDataMemory,
            "totalDataAnswer": totalDataAnswer,
            "QuestionCategory": QuestionCategory
        };
        $.indexedDB('LocalStore').objectStore("Instruction", { "autoIncrement": false }).add(dataWorking, "VerbalMemory").then(function (val) {
            dataWorking.id = val;
            console.info(val);
        }, console.error);
        //end Data Master Working Memory
    }
    else {
        var Image = $('#mediaDisplay0').attr('src');
        viewModel.set('SampleNormal.NormalQuestionImage', Image);
        var TypeAnswer = viewModel.typeAnswer;
        var typeLayout = viewModel.typeLayout;
        var SampleNormalTitle = viewModel.SampleNormal.SampleNormalTitle;
        var SampleNormalIntroduction = viewModel.SampleNormal.SampleNormalIntroduction;
        var NormalQuestionImage = Image;
        var NormalQuestion = viewModel.SampleNormal.NormalQuestion;
        var NormalScoreText = viewModel.SampleNormal.NormalScoreText;
        var NormalDisclaimer = viewModel.SampleNormal.NormalDisclaimer;
        var NormalExplaination = viewModel.SampleNormal.NormalExplaination;
        console.log(viewModel);
        if (TypeAnswer == "AT19000001") {
            for (kl = 0; kl < 7; kl++) {
                var dataNormalText = $('#NormalAnswerText' + kl).val();
                viewModel.set("SampleNormal.NormalText[" + kl + "].NormalAnswerText", dataNormalText);
                viewModel.set("SampleNormal.NormalText[" + kl + "].NormalScoreText", false);
            }
            var radioNormalText = $("input[name='NormalScoreText']:checked").val();
            console.log('radio=' + radioNormalText);
            viewModel.set("SampleNormal.NormalScoreText", radioNormalText);
            viewModel.set("SampleNormal.NormalText[" + radioNormalText + "].NormalScoreText", true);
            var TotalNormalAnswer = $('.add_sample').length;
            var NormalTextList = [];
            var ScoreNormalTextList = [];
            for (le = 0; le < TotalNormalAnswer; le++) {
                NormalTextList[le] = viewModel.SampleNormal.NormalText[le].NormalAnswerText;
                ScoreNormalTextList[le] = viewModel.SampleNormal.NormalText[le].NormalScoreText;
            }
            var dataNormalText = {
                "QuestionCategory": QuestionCategory,
                "TypeAnswer": TypeAnswer,
                "SampleNormalTitle": SampleNormalTitle,
                "SampleNormalIntroduction": SampleNormalIntroduction,
                "NormalQuestionImage": NormalQuestionImage,
                "NormalQuestion": NormalQuestion,
                "NormalDisclaimer": NormalDisclaimer,
                "NormalTextList": NormalTextList,
                "ScoreNormalTextList": ScoreNormalTextList,
                "TotalNormalAnswer": TotalNormalAnswer,
                "NormalExplaination": NormalExplaination,
                "typeLayout": typeLayout
            };
            $.indexedDB('LocalStore').objectStore("Instruction", { "autoIncrement": false }).add(dataNormalText, "VerbalMemory").then(function (val) {
                dataNormalText.id = val;
                console.info(val);
            }, console.error);
        }
        else {
            var TotalImageURL = $('.add_image').length;
            for (img = 0; img < TotalImageURL; img++) {
                var no = img + 1;
                var dataNormalText = $('#mediaDisplay' + no).attr('src');
                viewModel.set("SampleNormal.NormalImage[" + img + "].NormalAnswerImage", dataNormalText);
                viewModel.set("SampleNormal.NormalImage[" + img + "].NormalScoreImage", false);
            }
            var radioNormalImage = $("input[name='NormalScoreImage']:checked").val();
            console.log('radio=' + radioNormalImage);
            viewModel.set("SampleNormal.NormalScoreImage", radioNormalImage);
            viewModel.set("SampleNormal.NormalImage[" + radioNormalImage + "].NormalScoreImage", true);
            var ImageURL = [];
            var ImageScore = [];
            for (url = 0; url < TotalImageURL; url++) {
                ImageURL[url] = viewModel.SampleNormal.NormalImage[url].NormalAnswerImage;
                ImageScore[url] = viewModel.SampleNormal.NormalImage[url].NormalScoreImage;
            }
            var dataNormalImage = {
                "QuestionCategory": QuestionCategory,
                "TypeAnswer": TypeAnswer,
                "SampleNormalTitle": SampleNormalTitle,
                "SampleNormalIntroduction": SampleNormalIntroduction,
                "NormalQuestionImage": Image,
                "NormalQuestion": NormalQuestion,
                "NormalDisclaimer": NormalDisclaimer,
                "NormalTextList": ImageURL,
                "ScoreNormalTextList": ImageScore,
                "TotalNormalAnswer": TotalImageURL,
                "NormalExplaination": NormalExplaination,
                "typeLayout": typeLayout
            };
            $.indexedDB('LocalStore').objectStore("Instruction", { "autoIncrement": false }).add(dataNormalImage, "VerbalMemory").then(function (val) {
                dataNormalImage.id = val;
                console.info(val);
            }, console.error);
        }
    }
    window.open(viewModel.domain);
    //location.href = viewModel.domain;
    //$('#ConfirmationPreviewBtn').attr("href", viewModel.domain);
}

function assignValueForm() {
    var nameForm = localStorage.getItem("QuestionCategory");
    var newObj;
    var tempFormData = []
    if (nameForm == "NORMAL") {
        $(".sampleform-nm").each(function (i, element) {
            if (i !== ($(".sampleform-nm").size() - 1)) {
                var start = 2;
                var index = start + i;
                var typeAnswer = $('#typeAnswer' + index).val();
                var typeLayout = $('#typeLayout' + index).val();
                console.log("typeAnswer ->", typeAnswer)
                console.log("temptypeLayout ->", typeAnswer)
                var dataAnswer = [];
                var dataText1 = []; var dataText2 = [];
                var nameField = "add_sample";
                if (typeAnswer == "AT19000001") {
                    var inputName = `NormalScoreText`;
                    var textareaName = `NormalAnswerText`;
                    $('.' + nameField + '' + index).each(function (numField, element) {
                        if (numField > 1) { return false } else {
                            var tempdata = {
                                No: numField,
                                Text: $('.' + nameField + '' + index + ' textarea#' + textareaName + numField + '-form' + index + '-NM').val(),
                                IsCorrect: $(`#` + inputName + numField + `-form` + index + `-NM`).prop("checked"),
                                Url: "",
                            };
                            dataText1.push(tempdata);
                        }
                    })
                    if ($('#' + nameField + '' + index + " >" + ' .' + nameField + '' + index).size() > 0) {
                        $('#' + nameField + '' + index + " >" + ' .' + nameField + '' + index).each(function (numField, element) {
                            if (numField == ($('#' + nameField + '' + index + " >" + ' .' + nameField + '' + index).size())) { return false } else {
                                var tempdata = {
                                    No: (numField + 2),
                                    Text: $('#' + nameField + '' + index + ' textarea#' + textareaName + (numField + 2) + '-form' + index + '-NM').val(),
                                    IsCorrect: $(`#` + inputName + (numField + 2) + `-form` + index + `-NM`).prop("checked"),
                                    Url: "",
                                };
                                dataText2.push(tempdata);
                            }
                        })
                    }
                    dataAnswer = $.merge(dataText1, dataText2);
                } else {
                    var inputName = `NormalScoreImage`;
                    $('.add_image' + index).each(function (numField, element) {
                        var tempdata = {
                            No: numField,
                            Text: '',
                            IsCorrect: $(`#` + inputName + numField + `-form` + index + `-NM`).prop("checked"),
                            Url: $('input#media' + (numField + 1) + '-form' + (index)).attr('src')
                        };
                        dataAnswer.push(tempdata);
                    })
                }

                var typeForm = nameForm == "NORMAL" ? `SampleNormal` : nameForm == "WORKINGMEMORY" ? "WorkingMemory" : "VerbalMemory";
                console.log('DATA ANSWER ->', dataAnswer)
                newObj = {
                    Title: $('#' + typeForm + 'Title' + index).val(),
                    Introduction: $('#' + typeForm + 'Introduction' + index).val(),
                    IsPreface: false,
                    Explaination: $('#' + typeForm + 'Explaination' + index).val(),
                    Desclaimer: $('#' + typeForm + 'Disclaimer' + index).val(),
                    QuestionText: $('#' + typeForm + 'Question' + index).val(),
                    QuestionImage: $('#media' + (index - 1) + '-QuestionImage' + index).attr('src'),
                    //QuestionCategoryCode: "",
                    AnswerTypeCode: typeAnswer,
                    AnswerLayoutCode: typeLayout,
                    //SubTestCode: "",
                    DurationPerMemory: 0,
                    Answers: dataAnswer,
                }
                console.log("newObj ->", newObj);
                tempFormData.push(newObj);
            } else {
                return false
            }
        });
    } else if (nameForm == "WORKINGMEMORY") {
        $(".sampleform-wm").each(function (i, element) {
            if (i !== ($(".sampleform-wm").size() - 1)) {
                var start = 2;
                var index = start + i;
                var temptypeLayout = $('#WorkingMemoryLayout' + index).val();
                var layoutList = viewModel.AnswerLayoutList
                var typeLayout = $.grep(layoutList, function (e) { return e.Code == temptypeLayout || e.Value == temptypeLayout; });
                var dataAnswer = [];
                var dataMemory = [];
                $('.memory_working_page' + '' + index).each(function (numField, element) {
                    var textareaName = `WorkingMemoryText`;
                    var nameText = numField < 3 ? '.memory_working_page' + '' + index + ' textarea#' + textareaName + numField + '-form' + index : '#memory_working_page' + index + ' > .memory_working_page' + '' + index + ' textarea#' + textareaName + numField + '-form' + index
                    var tempdata = {
                        No: numField,
                        Text: $(nameText).val(),
                        //IsCorrect: $(`input#` + inputName + numField + `[type=radio][name=NormalScoreText` + index + `]:checked`).val() == undefined ? false : true,
                    };
                    dataMemory.push(tempdata);
                })
                $('.answer_working_page' + '' + index).each(function (numField, element) {
                    var inputName = `WorkingMemoryScore`;
                    var textareaName = `WorkingMemoryAnswer`;
                    var nameText = numField < 2 ? '.answer_working_page' + '' + index + ' textarea#' + textareaName + numField + '-form' + index : '#answer_working_page' + index + ' > .answer_working_page' + '' + index + ' textarea#' + textareaName + numField + '-form' + index
                    var tempdata = {
                        No: numField,
                        Text: $(nameText).val(),
                        IsCorrect: $(`input#` + inputName + numField + '-form' + index + `[type=radio][name=WorkingMemoryScore-form` + index + `]:checked`).val() == "on" ? true : false,
                    };
                    dataAnswer.push(tempdata);
                })

                var typeForm = nameForm == "NORMAL" ? `SampleNormal` : nameForm == "WORKINGMEMORY" ? "WorkingMemory" : "VerbalMemory";
                console.log('DATA ANSWER ->', dataAnswer)
                console.log('DATA ANSWER ->', dataMemory)
                newObj = {
                    Title: $('#' + typeForm + 'Title' + index).val(),
                    Introduction: $('#IntroductionWorkingMemory' + index).val(),
                    IsPreface: $(`input#WorkingMemoryPrefaceDisplay` + index + `[type=checkbox][name=WorkingMemoryPrefaceDisplay` + index + `]:checked`).val() == "on" ? true : false,
                    Preface: $('#WorkingMemoryPreface' + index).val(),
                    Explaination: $('#WorkingMemoryExplaination' + index).val(),
                    Desclaimer: $('#WorkingMemoryDisclaimer' + index).val(),
                    QuestionText: $('#WorkingMemoryQuestion' + index).val(),
                    //QuestionImage: "",
                    //QuestionCategoryCode: nameForm,
                    AnswerTypeCode: viewModels.Key,
                    AnswerLayoutCode: typeLayout.length == 0 ? "" : typeLayout[0].Code,
                    //SubTestCode: "",
                    DurationPerMemory: $('#WorkingMemoryDuration' + index).val(),
                    TransitionPerMemory: $('#WorkingMemoryTransition' + index).val(),
                    Answers: dataAnswer,
                    Memory: dataMemory
                }
                console.log("newObj ->", newObj);
                tempFormData.push(newObj);
            } else {
                return false
            }
        });
    } else if (nameForm == "VERBALMEMORY") {
        $(".sampleform-vm").each(function (i, element) {
            if (i !== ($(".sampleform-vm").size() - 1)) {
                var start = 2;
                var index = start + i;
                var temptypeLayout = $('#VerbalMemoryLayout' + index).val();
                var layoutList = viewModel.AnswerLayoutList
                var typeLayout = $.grep(layoutList, function (e) { return e.Code == temptypeLayout || e.Value == temptypeLayout; });
                var dataAnswer = [];
                var dataMemory = [];
                $('.answer_verbal_page' + '' + index).each(function (numField, element) {
                    var inputName = `scoreVerbalMemory`;
                    var textareaName = `VerbalMemoryText`;
                    var nameText = numField <= 2 ? '.answer_verbal_page' + '' + index + ' textarea#' + textareaName + numField + '-form' + index : '#answer_verbal_page' + index + ' > .answer_verbal_page' + '' + index + ' textarea#' + textareaName + numField + '-form' + index
                    var tempdata = {
                        No: numField,
                        Text: $(nameText).val(),
                        IsCorrect: $(`#` + inputName + numField + '-form' + index + '-VM').prop("checked"),
                    };
                    dataAnswer.push(tempdata);
                })

                var typeForm = nameForm == "NORMAL" ? `SampleNormal` : nameForm == "WORKINGMEMORY" ? "WorkingMemory" : "VerbalMemory";
                console.log('DATA ANSWER ->', dataAnswer)
                console.log('DATA ANSWER ->', dataMemory)
                newObj = {
                    Title: $('#' + typeForm + 'Title' + index).val(),
                    //Introduction: $('#VerbalMemoryStory' + index).val(),
                    IsPreface: false,
                    Preface: "Verbal",
                    Explaination: $('#VerbalMemoryExplaination' + index).val(),
                    Desclaimer: $('#VerbalMemoryDisclaimer' + index).val(),
                    QuestionText: $('#VerbalMemoryQuestion' + index).val(),
                    //QuestionImage: "",
                    //QuestionCategoryCode: nameForm,
                    AnswerTypeCode: viewModels.Key,
                    AnswerLayoutCode: typeLayout[0].Code,
                    //SubTestCode: "",
                    DurationPerMemory: $('#StoryDuration' + index).val(),
                    Answers: dataAnswer,
                }
                console.log("newObj ->", newObj);
                localStorage.setItem('SampleVerbal', JSON.stringify(newObj))
                tempFormData.push(newObj);
            } else {
                return false
            }
        });
    } else {
        console.log("err : Form Type not found");
    }
    return tempFormData
}
validateMultiForm = function (data) {
    var nameForm = localStorage.getItem("QuestionCategory");
    var validChecker = true;    
    if (nameForm == "NORMAL") {
        for (i = 0; i < data.length; i++) {
            var type = data[i].AnswerTypeCode;
            $.each(data[i], function (index, val) {
                if (index == "IsPreface") {
                    validChecker = val !== undefined ? true : false;
                }
                else if (val == undefined || val == "") {
                    if (index == "QuestionImage") {
                        validChecker = true;
                    } else {
                        if(index == "Introduction" || index == "Id" || index == "Title" || index == "Explaination" || index == "Desclaimer" || index =="QuestionText" && val != undefined)
                        {
                            validChecker = false;
                            return false
                        }
                    }
                } else {
                    validChecker = true;
                }
            });
            if (validChecker) {
                $.each(data[i].Answers, function (index, val) {
                    if (type == "AT19000001" && index < 2) {
                        if (val.Text == undefined || val.Text == "" || val.IsCorrect == undefined) {
                            validChecker = false;
                            return false
                        } else {
                            validChecker = true;
                        }
                    } else if (type == "AT19000002" && index < 2) {
                        if (val.Url == undefined || val.Url == "" || val.IsCorrect == undefined) {
                            validChecker = false;
                            return false
                        } else {
                            validChecker = true;
                        }
                    } else {
                        validChecker = true;
                    }
                    return validChecker == false ? validChecker : true;
                });
            }
            if (validChecker) { continue } else { break; }
        }
    } else if (nameForm == "WORKINGMEMORY") {
        for (i = 0; i < data.length; i++) {
            $.map(data[i], function (val, index) {
                if (index == "IsPreface" && validChecker) {
                    validChecker = val !== undefined ? true : false;
                }
                else if (val == undefined && validChecker || val == "" && validChecker) {
                    if (index == "QuestionImage" || index == "TransitionPerMemory" && val === "0") {
                        validChecker = true;
                    } else {
                        if(index == "DurationPerMemory" || index == "Introduction" || index == "Id" || index == "Title" || index == "Explaination" || index == "Desclaimer" || index =="QuestionText" && val != undefined)
                        {
                            validChecker = false;
                            return false
                        }
                    }
                } else if (index == "Answers" && validChecker) {
                    var c = 0
                    $.each(data[i].Answers, function (index, val) {
                        if (c < 2) {
                            if (val.Text == undefined || val.Text == "" || val.IsCorrect == undefined) {
                                validChecker = false;
                                return false
                            } else {
                                validChecker = true;
                            }
                        } else {
                            validChecker = true;
                        }
                        c++;
                    });
                    return validChecker == false ? validChecker : true;
                }
                else if (index == "Memory" && validChecker) {
                    var d = 0
                    $.each(data[i].Memory, function (index, val) {
                        if (index < 2) {
                            if (val.Text == undefined || val.Text == "") {
                                validChecker = false;
                                return false
                            } else {
                                validChecker = true;
                            }
                        } else {
                            validChecker = true;
                        }
                        d++;
                    });
                    return validChecker == false ? validChecker : true;
                }
                else {
                    if (validChecker) { return validChecker } else { return false; }
                }
                if (validChecker) { return validChecker } else { return false; }
            });
            if (validChecker) { return validChecker } else { return false; }
        }
    } else if (nameForm == "VERBALMEMORY") {
        for (i = 0; i < data.length; i++) {
            $.map(data[i], function (val, index) {
                if (index == "IsPreface" && validChecker) {
                    validChecker = val !== undefined ? true : false;
                }
                else if (val == undefined && validChecker || val == "" && validChecker) {
                    if (index == "QuestionImage") {
                        validChecker = true;
                    } else {
                        if(index == "DurationPerMemory" || index == "Introduction" || index == "Id" || index == "Title" || index == "Explaination" || index == "Desclaimer" || index =="QuestionText" && val != undefined)
                        {
                            validChecker = false;
                            return false
                        }
                    }
                } else if (index == "Answers" && validChecker) {
                    var c = 0
                    $.each(data[i].Answers, function (index, val) {
                        if (c < 2) {
                            if (val.Text == undefined || val.Text == "" || val.IsCorrect == undefined) {
                                validChecker = false;
                                return false
                            } else {
                                validChecker = true;
                            }
                        } else {
                            validChecker = true;
                        }
                        c++;
                    });
                    return validChecker == false ? validChecker : true;
                }
                else {
                    if (validChecker) { return validChecker } else { return false; }
                }
                if (validChecker) { return validChecker } else { return false; }
            });
            if (validChecker) { return validChecker } else { return false; }
        }
    } else {
        console.log("Err: Category Subtest Form not Found")
    }
    
    
    return validChecker;
};
