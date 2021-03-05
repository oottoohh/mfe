var ModelApplicant = kendo.data.Model.define({
    id: "Code",
    fields: {
        Code: { type: "string", editable: false },
        Name: { type: "string", editable: false },
        Desc: { type: "string", editable: false },
        Duration: { type: "number", editable: false },
    }
});
var viewModel = kendo.observable({
    domain: DOMAIN_URL + 'Views/OnlineTesting/QuestionAnswer/QuestionAnswerPreview.html',
    QnACode: "",
    QuestionCategory: "",
    TestTypeName: "",
    TestTypeCode: "",
    TestToolCode: "",
    TestToolName: "",
    SubTestName: "",
    SubTestCode: "",
    SubTestCd: "",
    DisplayStatus: true,
    typeAnswer: "AT19000001",
    typeLayout: "AL19000001",
    TestToolList: [],
    SubTestList: [],
    AnswerLayoutList: [],
    title: "",
    QuestionImage: '',
    Normal: {
        QuestionText: "",
        QuestionImage: "",
        imageUrl: [],
        ListAnswer: [{
            AnswerNormal: "",
            ScoreNormal: "",
        }, {
            AnswerNormal: "",
            ScoreNormal: "",
        }, {
            AnswerNormal: "",
            ScoreNormal: "",
        }, {
            AnswerNormal: "",
            ScoreNormal: "",
        }, {
            AnswerNormal: "",
            ScoreNormal: "",
        }, {
            AnswerNormal: "",
            ScoreNormal: "",
        }, {
            AnswerNormal: "",
            ScoreNormal: "",
        }],
        NormalImage: [{
            NormalAnswerImage: "",
            NormalScoreImage: "",
        }, {
            NormalAnswerImage: "",
            NormalScoreImage: "",
        }, {
            NormalAnswerImage: "",
            NormalScoreImage: "",
        }, {
            NormalAnswerImage: "",
            NormalScoreImage: "",
        }, {
            NormalAnswerImage: "",
            NormalScoreImage: "",
        }, {
            NormalAnswerImage: "",
            NormalScoreImage: "",
        }, {
            NormalAnswerImage: "",
            NormalScoreImage: "",
        }, {
            NormalAnswerImage: "",
            NormalScoreImage: "",
        }],
    },
    WorkingMemory: {
        WorkingMemoryDuration: "",
        WorkingMemoryDurationTransition: "",
        WorkingMemoryPreface: "",
        WorkingMemoryPrefaceDisplay: true,
        WorkingMemoryQuestion: "",
        WorkingMemoryLayout: "AL19000001",
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
            WorkingMemoryScore: "",
        }, {
            WorkingMemoryAswer: "",
            WorkingMemoryScore: "",
        }, {
            WorkingMemoryAswer: "",
            WorkingMemoryScore: "",
        }, {
            WorkingMemoryAswer: "",
            WorkingMemoryScore: "",
        }, {
            WorkingMemoryAswer: "",
            WorkingMemoryScore: "",
        }, {
            WorkingMemoryAswer: "",
            WorkingMemoryScore: "",
        }, {
            WorkingMemoryAswer: "",
            WorkingMemoryScore: "",
        },],
    },
    StoryCode: '',
    Story: {
        VerbalName: "",
        VerbalCode: "",
        VerbalDuration: "",
        VerbalStory: "",
        StoryList: "",
    },
    Verbal: {
        VerbalQuestion: "",
        VerbalLayout: "AL19000001",
        VerbalAnswers: [{
            VerbalAnswer: "",
            VerbalScore: "",
        }, {
            VerbalAnswer: "",
            VerbalScore: "",
        }, {
            VerbalAnswer: "",
            VerbalScore: "",
        }, {
            VerbalAnswer: "",
            VerbalScore: "",
        }, {
            VerbalAnswer: "",
            VerbalScore: "",
        }, {
            VerbalAnswer: "",
            VerbalScore: "",
        }, {
            VerbalAnswer: "",
            VerbalScore: "",
        },]
    },
    VerbalStoryList: new kendo.data.DataSource ({
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + "api/Story/Inquiry",
                headers: { "Authorization-Token": Cookie.load() },
            },
            parameterMap: function (data, operation) {
                var request = new Object();
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                return request;
            }
        },
        schema: {
            data: "QuestionStories",
            model: ModelApplicant,
            total: "Total"
        },
        serverPaging: true,
        serverFiltering: true,
        pageSize: 5
    }),
    companyLogoChange: function (el, files) {
        $('#companyLogoPic').attr('src', "");
        if (files.length) {
            if (files[0].size <= 2048000) {
                el.parentElement.firstElementChild.src = window.URL.createObjectURL(files[0]);  //original
                el.parentElement.children[1].src = window.URL.createObjectURL(files[0]);    //display
                $(el.parentElement.parentElement.lastElementChild).show();
            }
            else {
                MessageBox.show("Error", "Max image size (2 MB) is exceeded");
            }
        }
    },
    companyLogoRemove: function (el) {
        var companyLogoPicID = el.parentElement.firstElementChild.firstElementChild.id;   //original
        var companyLogoPic = el.parentElement.firstElementChild.children[1].id;  //display
        var companyLogoId = el.parentElement.firstElementChild.lastElementChild.id;

        $(el.parentElement.firstElementChild).remove();
        $(el.parentElement).prepend(
            '<li>' +
            '<label style="padding-left:140px;padding-right:120px;">' +
            '<img id="' + companyLogoPicID + '" src="" hidden="hidden" />' +
            '<img id="' + companyLogoPic + '" src="" class="backImage" width="100%" height="100%" />' +
            '<input name="' + companyLogoId + '" id="companyLogo" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.companyLogoChange(this.files)" />' +
            '</label>' +
            '<input type="hidden" id="companyLogoId1" name="companyLogoId1" value="0" />' +
            '<a href="#" class="k-button" style="display: none" onclick="viewModel.companyLogoRemove(this)"><span class="k-icon k-delete"></span></a>' +
            '</li>');
        $(el).hide();
    },
    mediaImageChange: function (el, files) {
        if (files.length) {
            if (files[0].size <= 2048000) {
                el.parentElement.firstElementChild.src = window.URL.createObjectURL(files[0]);  //original
                el.parentElement.children[1].src = window.URL.createObjectURL(files[0]);    //display
                $(el.parentElement.parentElement.lastElementChild).show();
                var media = $(el).attr('id');
                var valueMedia = media.substring(5);
                var imageUrl = new FormData();
                imageUrl.append('files[0]', $('#' + media)[0].files[0]);
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
                        MessageBox.show("Error", "error" + x);
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
            $(el).hide();
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
    cancel: function (e) {
        cancel(e);
    },
    save: function (e) {
        save(e);
    },
    preview: function (e) {
        preview(e);
    },
    story: function (e) {
        story(e);
    }
});
Back = function () {
    //alert("Yaa!!");
    viewModel.set('Story.VerbalName', '');
    viewModel.set('Story.VerbalDuration', '');
    viewModel.set('Story.VerbalStory', '');
    var dialog = $('#dialog').data('kendoWindow');
    dialog.close();
}
story = function (e) {
    //console.log(e);
    var idStory = $(e).attr('id');
    if (idStory != undefined) {
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + "api/Story/Detail",
            headers: { "Authorization-Token": Cookie.load() },
            data: { StoryCode: idStory },
            success: function (response) {
                //console.log(response.Story);
                viewModel.set("Story.VerbalName", response.Story.Name);
                viewModel.set("Story.VerbalCode", response.Story.Code);
                viewModel.set("Story.VerbalDuration", response.Story.Duration);
                viewModel.set("Story.VerbalStory", response.Story.Text);
            },
            error: function (x, e) {
                //alert("Error");
                MessageBox.show("Error", "Error");
            }
        });
    }
    $("#dialog").fadeIn();
    var dialog = $("#dialog");
    dialog.kendoWindow({
        minWidth: "330px",
        height: 375,
        top: 192.3,
        title: "Add Story",
        visible: false,
        actions: [
            "Minimize",
            "Maximize",
            "Close"
        ],
        open: onOpen,
        close: onClose

    });
    var dialogs = dialog.data("kendoWindow").open();
    dialogs.center();
    $('.list-data').removeAttr('hidden');


}
function onClose() {
    $("#dialog").fadeIn();
    //window.location.reload();
}
function onOpen() {
    $("#dialog").fadeIn();
}
cancel = function (e) {
    confirmMessageCancel();
    $('.swal-button--cancel').on('click', function () {

    });

    $('.swal-button--danger').on('click', function () {
        //window.location.reload(true);
        window.location.href = DOMAIN_URL + "Views/OnlineTesting/QuestionAnswer/QuestionAnswer.html";
    });
}
Simpan = function () {
    var Name = viewModel.Story.VerbalName;
    var Duration = viewModel.Story.VerbalDuration;
    var Story = viewModel.Story.VerbalStory;
    var Code = viewModel.Story.VerbalCode;
    if (Name == '' || Name == undefined || Duration == '' || Duration == undefined || Story == '' || Story == undefined) {
        swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
    }
    else {
        //$('#dialog').fadeOut();
        confirmMessageAdd();
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            if (Code == '' || Code == undefined) {
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/Story/Save",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        StoryName: Name,
                        StoryDesc: Story,
                        Duration: Duration,
                    },
                    success: function (response) {
                        if (response.Acknowledge == 1) {
                            swal("Good", response.Message, "success", { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                viewModel.VerbalStoryList.page(1);
                                var dialog = $('#dialog').data('kendoWindow');
                                dialog.close();
                                //window.location.href = DOMAIN_URL + "Views/OnlineTesting/QuestionAnswer/QuestionAnswerCategory.html";
                            });
                            LoadingMask.hide();
                        } else {
                            swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                            LoadingMask.hide();
                        }

                    },
                    error: function (xhr, status, error) {
                        MessageBox.show("Error", "Error");
                        LoadingMask.hide();
                    }
                });
            }
            else {
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/Story/Edit",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        StoryCode: Code,
                        StoryName: Name,
                        StoryDesc: Story,
                        Duration: Duration,
                    },
                    success: function (response) {
                        if (response.Acknowledge == 1) {
                            swal("Good", response.Message, "success", { closeOnClickOutside: false });
                            $('.swal-button--confirm').on('click', function () {
                                window.location.href = DOMAIN_URL + "Views/OnlineTesting/QuestionAnswer/QuestionAnswerCategory.html";
                            });
                            LoadingMask.hide();
                        }
                        else {
                            swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                            LoadingMask.hide();
                        }
                    },
                    error: function (xhr, status, error) {
                        MessageBox.show("Error", "Error");
                        LoadingMask.hide();
                    }
                });
            }
        });
    }
}
save = function (e) {
    var Image = $('#companyLogoPic').attr('src');
    viewModel.set('Normal.QuestionImage', Image);
    var QC = localStorage.getItem("QuestionCategory");
    var QuestionCategory = viewModel.QuestionCategory;
    var QuestionCode = viewModel.QnACode;
    var typeAnswer = viewModel.typeAnswer;
    var SubTestCode = viewModel.SubTestName;
    var SubTestCd = viewModel.SubTestCd;
    var TestTypeCode = viewModel.TestTypeCode;
    var TestToolCode = viewModel.TestToolCode;
    var TestTypeName = viewModel.TestTypeName;
    var TestToolName = viewModel.TestToolName;
    var DisplayStatus = viewModel.DisplayStatus;
    var HeaderCheck = SubTestCode == '' || SubTestCode == undefined || TestTypeName == '' || TestTypeName == undefined || TestToolName == '' || TestToolName == undefined;
    var AnswerTypeCode = "AT19000001";

    if (QC == 'NORMAL') {
        var TotalDataNormal = $('.addFormAnswer').length;
        var TotalDataImage = $('.add_image').length;
        var dataNormal = viewModel.Normal.ListAnswer;
        var dataNormalImage = viewModel.Normal.NormalImage;
        var QuestionText = viewModel.Normal.QuestionText;
        var typeLayout = viewModel.typeLayout;
        //var QuestionImage = viewModel.QuestionImage;
        var checkImage = $('#mediaDisplay0').attr('src');
        var checkImages = $('#mediaDisplay1').attr('src');
        if ((checkImage == 'a.jpg' || checkImage == null || checkImage == '') && (checkImages == null || checkImages == '')) {
            for (i = 0; i < TotalDataNormal; i++) {
                var datass = $('#AnswerNormal' + i).val();
                var dataScore = $('#ScoreNormal' + i).val();
                viewModel.set("Normal.ListAnswer[" + i + "].AnswerNormal", datass);
                viewModel.set("Normal.ListAnswer[" + i + "].ScoreNormal", dataScore);
            }
            var AnswerNormal = []; var nomorAnswer = 1;
            for (s = 0; s < TotalDataNormal; s++) {
                AnswerNormal[s] = {
                    No: nomorAnswer,
                    Text: dataNormal[s].AnswerNormal,
                    AnswerScore: dataNormal[s].ScoreNormal,
                    Url: "a.jpg"
                };
                nomorAnswer++;
            }
            var lengthNormalText = AnswerNormal.length;
            var valid = true;
            for (kll = 0; kll < lengthNormalText; kll++) {
                if (kll < 2) {
                    if (AnswerNormal[kll].Text == "" || AnswerNormal[kll].AnswerScore == null || AnswerNormal[kll].AnswerScore < 0) {
                        valid = false;
                        break;
                    } else {
                        valid = true;
                    }
                } else {
                    valid = true;
                }
            }
            if (valid == false) {
                swal("Incompleted Data", "Cannot fill less than 0 / Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
            } else {
                if (HeaderCheck || typeLayout == '' || viewModel.typeAnswer == '' || QuestionText == '') {
                    swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
                } else {
                    confirmMessageAdd();
                    $('.swal-button--defeat').on('click', function () {
                        LoadingMask.show();
                        $.ajax({
                            type: "POST",
                            url: SERVICE_URL + "api/Question/SaveQuestionNormal",
                            headers: { "Authorization-Token": Cookie.load() },
                            data: {
                                TestTypeCode: TestTypeCode,
                                TestToolCode: TestToolCode,
                                SubTestCode: SubTestCd,
                                DisplayStatus: DisplayStatus,
                                QuestionText: QuestionText,
                                QuestionImage: "a.jpg",
                                AnswerTypeCode: viewModel.typeAnswer,
                                AnswerLayoutCode: typeLayout,
                                QuestionCategory: QC,
                                Answer: AnswerNormal,
                            },
                            success: function (response) {
                                if (response.Acknowledge == 1) {
                                    swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                    $('.swal-button--confirm').on('click', function () {
                                        window.location.href = DOMAIN_URL + "Views/OnlineTesting/QuestionAnswer/QuestionAnswer.html";
                                    });
                                    LoadingMask.hide();
                                }
                                else {
                                    swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                                    LoadingMask.hide();
                                }
                            },
                            error: function (xhr, status, error) {
                                MessageBox.show("Error", "Error");
                                LoadingMask.hide();
                            }
                        });
                    });
                }
            }
        }
        else {
            var check = $('#mediaDisplay0').attr('src');
            var imageQuestion = '';
            if (check == null || check == 'a.jpg' || check == undefined) {
                imageQuestion = 'a.jpg';
            } else {
                imageQuestion = check;
            }
            if (viewModel.typeAnswer == 'AT19000001') {
                var TotalDataNormal = $('.addFormAnswer').length;
                for (i = 0; i < TotalDataNormal; i++) {
                    var datass = $('#AnswerNormal' + i).val();
                    var dataScore = $('#ScoreNormal' + i).val();
                    if (datass != "" && dataScore != "") {
                        viewModel.set("Normal.ListAnswer[" + i + "].AnswerNormal", datass);
                        viewModel.set("Normal.ListAnswer[" + i + "].ScoreNormal", dataScore);
                    }
                }
                var AnswerNormal = []; var nomorAnswer = 1;
                for (s = 0; s < TotalDataNormal; s++) {
                    if (dataNormal[s].AnswerNormal != "" && dataNormal[s].ScoreNormal != "") {
                        AnswerNormal[s] = {
                            No: nomorAnswer,
                            Text: dataNormal[s].AnswerNormal,
                            AnswerScore: dataNormal[s].ScoreNormal,
                            Url: "a.jpg"
                        };
                        nomorAnswer++;
                    }
                }
                var lengthNormalText = AnswerNormal.length;
                var valid = true;
                for (kll = 0; kll < lengthNormalText; kll++) {
                    if (kll < 2) {
                        if (AnswerNormal[kll].Text == "" || AnswerNormal[kll].AnswerScore == null || AnswerNormal[kll].AnswerScore < 0) {
                            valid = false;
                            break;
                        } else {
                            valid = true;
                        }
                    } else {
                        valid = true;
                    }
                }
            } else {
                var data = [];
                var lengthImage = $('.add_image').length;
                for (gg = 0; gg < lengthImage; gg++) {
                    var dataScore = $('#NormalScoreImage' + gg).val();
                    viewModel.set("Normal.NormalImage[" + gg + "].NormalScoreImage", dataScore);
                }
                for (i = 0; i <= lengthImage; i++) {
                    data[i] = $('#mediaDisplay' + (i + 1)).attr('src');
                    viewModel.set('Normal.NormalImage[' + i + '].NormalAnswerImage', data[i])
                }
                var AnswerNormal = []; var nomorAnswer = 1;
                var valid = true;
                for (s = 0; s < lengthImage; s++) {
                    if (viewModel.Normal.NormalImage[s].NormalScoreImage < 0 || viewModel.Normal.NormalImage[s].NormalScoreImage == '') {
                        valid = false;
                        break;
                    } else {
                        valid = true;
                        AnswerNormal[s] = {
                            No: nomorAnswer,
                            Text: '',
                            AnswerScore: viewModel.Normal.NormalImage[s].NormalScoreImage,
                            Url: viewModel.Normal.NormalImage[s].NormalAnswerImage
                        };
                        nomorAnswer++;
                    }
                }
            }
            if (valid == false) {
                swal("Incompleted Data", "Cannot fill less than 0 / Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
            } else {
                if (HeaderCheck || typeLayout == '' || viewModel.typeAnswer == '' || QuestionText == '') {
                    swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
                } else {
                    confirmMessageAdd();
                    $('.swal-button--defeat').on('click', function () {
                        LoadingMask.show();
                        $.ajax({
                            type: "POST",
                            url: SERVICE_URL + "api/Question/SaveQuestionNormal",
                            headers: { "Authorization-Token": Cookie.load() },
                            data: {
                                TestTypeCode: TestTypeCode,
                                TestToolCode: TestToolCode,
                                SubTestCode: SubTestCd,
                                DisplayStatus: DisplayStatus,
                                QuestionText: QuestionText,
                                QuestionImage: imageQuestion,
                                AnswerTypeCode: viewModel.typeAnswer,
                                AnswerLayoutCode: typeLayout,
                                QuestionCategory: QC,
                                Answer: AnswerNormal,
                            },
                            success: function (response) {
                                if (response.Acknowledge == 1) {
                                    swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                    $('.swal-button--confirm').on('click', function () {
                                        window.location.href = DOMAIN_URL + "Views/OnlineTesting/QuestionAnswer/QuestionAnswer.html";
                                    });
                                    LoadingMask.hide();
                                }
                                else {
                                    swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                                    LoadingMask.hide();
                                }
                            },
                            error: function (xhr, status, error) {
                                MessageBox.show("Error", "Error");
                                LoadingMask.hide();
                            }
                        });
                    });
                }
            }
        }
    }
    else if (QC == 'WORKINGMEMORY') {
        for (k = 2; k < 7; k++) {
            var dataWorkingAnswer = $('#WorkingMemoryAswer' + k).val();
            var WorkingMemoryScores = $('#WorkingMemoryScore' + k).val();
            var dataWorking = $('#WorkingMemoryText' + k).val();
            viewModel.set("WorkingMemory.WorkingMemories[" + k + "].WorkingMemoryText", dataWorking);
            viewModel.set("WorkingMemory.WorkingMemoriesAnswer[" + k + "].WorkingMemoryAswer", dataWorkingAnswer);
            viewModel.set("WorkingMemory.WorkingMemoriesAnswer[" + k + "].WorkingMemoryScore", WorkingMemoryScores);
        }
        var totalDataMemory = $('.memory_working_page').length;
        var totalDataAnswer = $('.answer_working_page').length;
        var dataWorkings = viewModel.WorkingMemory.WorkingMemories;
        var dataWorkingAnswers = viewModel.WorkingMemory.WorkingMemoriesAnswer;
        var WorkingMemoriList = []; var nomor = 1; var nomorAnswer = 1; var MemoryList = [];
        for (r = 0; r < totalDataAnswer; r++) {
            WorkingMemoriList[r] = {
                No: nomor,
                Text: dataWorkingAnswers[r].WorkingMemoryAswer,
                AnswerScore: dataWorkingAnswers[r].WorkingMemoryScore,
                Url: "",
            };
            nomor++;
        }
        for (mem = 0; mem < totalDataMemory; mem++) {
            MemoryList[mem] = {
                No: nomorAnswer,
                Text: dataWorkings[mem].WorkingMemoryText,
                AnswerScore: mem + 1
            };
            nomorAnswer++;
        }
        var dataWorking = viewModel.WorkingMemory;
        var WorkingMemoryDuration = dataWorking.WorkingMemoryDuration;
        var WorkingMemoryDurationTransition = dataWorking.WorkingMemoryDurationTransition;
        var WorkingMemoryPreface = dataWorking.WorkingMemoryPreface;
        var WorkingMemoryQuestion = dataWorking.WorkingMemoryQuestion;
        var WorkingMemoryLayout = dataWorking.WorkingMemoryLayout;
        var WorkingMemoryPrefaceDisplay = dataWorking.WorkingMemoryPrefaceDisplay;
        if (WorkingMemoryPrefaceDisplay == true) {
            if ($('#WorkingMemoryPrefaceDisplay').checked) {
                viewModel.set("WorkingMemory.WorkingMemoryPrefaceDisplay", false);
            }
        } else {
            if ($('#WorkingMemoryPrefaceDisplay').checked) {
                viewModel.set("WorkingMemory.WorkingMemoryPrefaceDisplay", true);
            }
        }
        var lengthWorking = WorkingMemoriList.length;
        var lengthMemory = MemoryList.length;
        var Valid = true; var ValidMemory = true;
        for (kll = 0; kll < lengthWorking; kll++) {
            if (kll < 2) {
                if (WorkingMemoriList[kll].Text == "" || WorkingMemoriList[kll].AnswerScore == null || WorkingMemoriList[kll].AnswerScore < 0) {
                        valid = false;
                        break;
                    } else {
                        valid = true;
                    }
                } else {
                    valid = true;
                }
        }
        for (sll = 0; sll < lengthMemory; sll++) {
            if (sll < 2) {
                if (MemoryList[sll].Text == "") {
                    ValidMemory = false;
                    break;
                } else {
                    ValidMemory = true;
                }
            } else {
                ValidMemory = true;
            }            
        }

        if (Valid == false) {
            swal("Incompleted Data", "Cannot fill less than 0 / Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
        } else {
            if (SubTestCode == '' || SubTestCode == undefined ||
                TestTypeName == '' || TestTypeName == undefined ||
                TestToolName == '' || TestToolName == undefined ||
                WorkingMemoryDuration == undefined || WorkingMemoryDurationTransition == undefined ||
                WorkingMemoryQuestion == '' || WorkingMemoryPreface == '' || MemoryList == '' || ValidMemory == false) {
                swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
            } else if (WorkingMemoryDuration == '' || WorkingMemoryDurationTransition == '') {
                if (WorkingMemoryDuration <= 0) {
                    swal("Invalid!", "Duration Per Memory value must be more than 0", "warning", { closeOnClickOutside: false });
                } else if (WorkingMemoryDurationTransition < 0) {
                    swal("Invalid!", "Duration Transition value cannot be less than 0", "warning", { closeOnClickOutside: false });
                } else {
                    if (Number.isInteger(WorkingMemoryDuration) == false || Number.isInteger(WorkingMemoryDurationTransition) == false) {
                        swal("Invalid!", "Duration value cannot be decimal", "warning", { closeOnClickOutside: false });
                    }
                }
            }

            if (Number.isInteger(WorkingMemoryDuration) == false || Number.isInteger(WorkingMemoryDurationTransition) == false) {
                swal("Invalid!", "Duration value cannot be decimal", "warning", { closeOnClickOutside: false });
            } else {
                confirmMessageAdd();
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: "POST",
                        url: SERVICE_URL + "api/Question/SaveQuestionWorkMemory",
                        headers: { "Authorization-Token": Cookie.load() },
                        data: {
                            TestTypeCode: TestTypeCode,
                            TestToolCode: TestToolCode,
                            SubTestCode: SubTestCd,
                            DisplayStatus: DisplayStatus,
                            Introduction: WorkingMemoryPreface,
                            QuestionText: WorkingMemoryQuestion,
                            QuestionImage: "test.jpg",
                            AnswerTypeCode: AnswerTypeCode,
                            AnswerLayoutCode: WorkingMemoryLayout,
                            QuestionCategory: QuestionCategory,
                            DurationPerMemory: WorkingMemoryDuration,
                            TransitionPerMemory: WorkingMemoryDurationTransition,
                            Answer: WorkingMemoriList,
                            Memories: MemoryList,
                            IsPreface: WorkingMemoryPrefaceDisplay,
                            Preface: WorkingMemoryPreface
                        },
                        success: function (response) {
                            if (response.Acknowledge == 1) {
                                swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + "Views/OnlineTesting/QuestionAnswer/QuestionAnswer.html";
                                });
                                LoadingMask.hide();
                            }
                            else {
                                swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                                LoadingMask.hide();
                            }
                        },
                        error: function (xhr, status, error) {
                            MessageBox.show("Error", "Error");
                            LoadingMask.hide();
                        }
                    });
                });
            }
        }
    }
    else {
        var totalDataVerbal = $('.answer_verbal_page').length;
        for (ver = 0; ver < totalDataVerbal; ver++) {
            var dataVerbalAnswer = $('#VerbalAnswer' + ver).val();
            var dataVerbalScores = $('#VerbalScore' + ver).val();
            viewModel.set("Verbal.VerbalAnswers[" + ver + "].VerbalAnswer", dataVerbalAnswer);
            viewModel.set("Verbal.VerbalAnswers[" + ver + "].VerbalScore", dataVerbalScores);
        }
        var dataVerbals = viewModel.Verbal.VerbalAnswers;
        var VerbalLists = []; var nomor = 1;
        for (verb = 0; verb < totalDataVerbal; verb++) {
            VerbalLists[verb] = {
                No: nomor,
                Text: dataVerbals[verb].VerbalAnswer,
                AnswerScore: dataVerbals[verb].VerbalScore,
                Url: "",
            };
            nomor++;
        }
        var dataVerbal = viewModel.Verbal;
        var VerbalQuestion = dataVerbal.VerbalQuestion;
        var VerbalLayout = dataVerbal.VerbalLayout;
        var arr = viewModel.Story.StoryList;
        var lengthVerbal = VerbalLists.length;
        var Valid = true;
        for (kll = 0; kll < lengthVerbal; kll++) {
            if (kll < 2) {
                if (VerbalLists[kll].Text == "" || VerbalLists[kll].AnswerScore == null || VerbalLists[kll].AnswerScore < 0) {
                    valid = false;
                    break;
                } else {
                    valid = true;
                }
            } else {
                valid = true;
            }            
        }

        if (Valid == false) {
            swal("Incompleted Data", "Cannot fill less than 0 / Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
        } else {
            if (HeaderCheck || VerbalQuestion == '' || VerbalLayout == "" || VerbalLayout == undefined) {
                swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
            }
            else {
                confirmMessageAdd();
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: "POST",
                        url: SERVICE_URL + "api/Question/SaveQuestionVerbalMemory",
                        headers: { "Authorization-Token": Cookie.load() },
                        data: {
                            TestTypeCode: TestTypeCode,
                            TestToolCode: TestToolCode,
                            SubTestCode: SubTestCd,
                            DisplayStatus: DisplayStatus,
                            QuestionText: VerbalQuestion,
                            QuestionImage: "test.jpg",
                            AnswerTypeCode: AnswerTypeCode,
                            AnswerLayoutCode: VerbalLayout,
                            QuestionCategory: QC,
                            StoryCode: viewModel.Story.StoryList,
                            Answer: VerbalLists
                        },
                        success: function (response) {
                            if (response.Acknowledge == 1) {
                                swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + "Views/OnlineTesting/QuestionAnswer/QuestionAnswer.html";
                                });
                                LoadingMask.hide();
                            }
                            else {
                                swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                                LoadingMask.hide();
                            }
                        },
                        error: function (xhr, status, error) {
                            MessageBox.show("Error", "Error");
                            LoadingMask.hide();
                        }
                    });
                });
            }
        }
    }
}
saveImage = function (data) {
    var checkImage = $('#mediaDisplay0').attr('src');
    var nChek = viewModel.QuestionImage;
    var xChek = $('#media0')[0].files[0];
    var yChek = $('#media1')[0].files[0];
    var Image = '';
    if (checkImage == 'a.jpg' || checkImage == undefined || checkImage == null || checkImage == '') {
        Image = 'a.jpg';
    }
    else if (nChek != 'a.jpg' && xChek == undefined) {
        Image = viewModel.QuestionImage;
    }
    else {
        Image = data[0].Url;
    }
    viewModel.set('Normal.QuestionImage', Image);
    var QC = localStorage.getItem("QuestionCategory");
    var QuestionCategory = viewModel.QuestionCategory;
    var TotalDataImage = $('.add_image').length;
    var TotalDataNormal = $('.addFormAnswer').length;
    var dataNormal = viewModel.Normal.ListAnswer;
    var dataNormalImage = viewModel.Normal.NormalImage;
    var QuestionImage = viewModel.QuestionImage;
    if (data.length < 2) {
        if (viewModel.typeAnswer == 'AT19000001') {
            for (i = 0; i < TotalDataNormal; i++) {
                var datass = $('#AnswerNormal' + i).val();
                var dataScore = $('#ScoreNormal' + i).val();
                viewModel.set("Normal.ListAnswer[" + i + "].AnswerNormal", datass);
                viewModel.set("Normal.ListAnswer[" + i + "].ScoreNormal", dataScore);
            }
            var AnswerNormal = []; var nomorAnswer = 1;
            for (s = 0; s < TotalDataNormal; s++) {
                AnswerNormal[s] = {
                    No: nomorAnswer,
                    Text: dataNormal[s].AnswerNormal,
                    AnswerScore: dataNormal[s].ScoreNormal,
                    Url: "a.jpg"
                };
                nomorAnswer++;
            }
        }
        else {
            if (xChek != undefined && yChek == undefined) {
                for (i = 0; i < TotalDataImage; i++) {
                    var dataScore = $('#NormalScoreImage' + i).val();
                    viewModel.set("Normal.NormalImage[" + i + "].NormalScoreImage", dataScore);
                }
                var AnswerNormal = []; var nomorAnswer = 1;
                //console.log(viewModel.Normal.NormalImage);
                for (s = 0; s < TotalDataImage; s++) {
                    AnswerNormal[s] = {
                        No: nomorAnswer,
                        Text: "aa",
                        AnswerScore: dataNormalImage[s].NormalScoreImage,
                        Url: dataNormalImage[s].NormalAnswerImage
                    };
                    nomorAnswer++;
                }
            }
        }

    } else if (checkImage == 'a.jpg' || checkImage == null || checkImage == undefined || checkImage == '') {
        for (i = 0; i < TotalDataImage; i++) {
            var dataScore = $('#NormalScoreImage' + i).val();
            viewModel.set("Normal.NormalImage[" + i + "].NormalScoreImage", dataScore);
        }
        var AnswerNormal = []; var nomorAnswer = 1;
        for (s = 0; s < TotalDataImage; s++) {
            AnswerNormal[s] = {
                No: nomorAnswer,
                Text: "aa",
                AnswerScore: dataNormalImage[s].NormalScoreImage,
                Url: data[s].Url
            };
            nomorAnswer++;
        }
    }
    else {
        for (i = 0; i < TotalDataImage; i++) {
            var dataScore = $('#NormalScoreImage' + i).val();
            viewModel.set("Normal.NormalImage[" + i + "].NormalScoreImage", dataScore);
        }
        var AnswerNormal = []; var nomorAnswer = 1;
        if (nChek != 'a.jpg' && xChek == undefined && yChek != undefined) {
            for (s = 0; s < TotalDataImage; s++) {
                AnswerNormal[s] = {
                    No: nomorAnswer,
                    Text: "aa",
                    AnswerScore: dataNormalImage[s].NormalScoreImage,
                    Url: data[s].Url
                };
                nomorAnswer++;
            }
        } else {
            for (s = 0; s < TotalDataImage; s++) {
                AnswerNormal[s] = {
                    No: nomorAnswer,
                    Text: "aa",
                    AnswerScore: dataNormalImage[s].NormalScoreImage,
                    Url: data[s + 1].Url
                };
                nomorAnswer++;
            }
        }
    }
    var Valid = true;
    var lengthNormal = AnswerNormal.length;
    for (li = 0; li < lengthNormal; li++) {
        if (AnswerNormal[li].Text == '' || AnswerNormal[li].AnswerScore == null || AnswerNormal[li].AnswerScore < 0 || AnswerNormal[li].AnswerScore == '') {
            Valid = false;
            break
        }
    }

    if (viewModel.QnACode == '') {
        if (Valid == false) {
            swal("Incompleted Data", "Cannot fill less than 0 / Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
        } else {
            if (viewModel.Normal.QuestionText == '' || viewModel.typeAnswer == '' || viewModel.typeLayout == '' || viewModel.TestTypeName == '' || viewModel.TestToolName == '' || viewModel.SubTestCd == '') {
                swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
            } else {
                confirmMessageAdd();
                $('.swal-button--defeat').on('click', function () {
                    LoadingMask.show();
                    $.ajax({
                        type: "POST",
                        url: SERVICE_URL + "api/Question/SaveQuestionNormal",
                        headers: { "Authorization-Token": Cookie.load() },
                        data: {
                            TestTypeCode: viewModel.TestTypeCode,
                            TestToolCode: viewModel.TestToolCode,
                            SubTestCode: viewModel.SubTestCd,
                            DisplayStatus: viewModel.DisplayStatus,
                            QuestionText: viewModel.Normal.QuestionText,
                            QuestionImage: Image,
                            AnswerTypeCode: viewModel.typeAnswer,
                            AnswerLayoutCode: viewModel.typeLayout,
                            QuestionCategory: QC,
                            Answer: AnswerNormal
                        },
                        success: function (response) {
                            //console.log(response);
                            if (response.Acknowledge == 1) {
                                swal("Good", response.Message, "success", { closeOnClickOutside: false });
                                $('.swal-button--confirm').on('click', function () {
                                    window.location.href = DOMAIN_URL + "Views/OnlineTesting/QuestionAnswer/QuestionAnswer.html";
                                });
                                LoadingMask.hide();
                            } else {
                                swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                                LoadingMask.hide();
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
    } else {
        if (Valid == false) {
            swal("Incompleted Data", "Cannot fill less than 0 / Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
        } else {
            if (viewModel.Normal.QuestionText == '' || viewModel.typeAnswer == '' || viewModel.typeLayout == '' || viewModel.TestTypeName == '' || viewModel.TestToolName == '' || viewModel.SubTestCd == '') {
                swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
            } 
        }
    }

}
preview = function (e) {
    var Image = $('#mediaDisplay0').attr('src');
    viewModel.set('QuestionImage', Image);
    var request = indexedDB.open('LocalStore');
    request.onsuccess = function (event) {
        var db = request.result;
        var transaction = db.transaction(["Instruction"], "readwrite");
        transaction.oncomplete = function (event) {
        };
        transaction.onerror = function (event) {
        };
        var objectStore = transaction.objectStore('Instruction');
        var objectStoreRequest = objectStore.delete('Question');
        objectStoreRequest.onsuccess = function () {
        }
        request.onerror = function (event) {
            console.info, console.error
        }
    }
    //Check Preview
    var QuestionCategory = viewModel.QuestionCategory;
    var typeAnswer = viewModel.typeAnswer;
    var SubTestName = viewModel.SubTestCode;
    if (QuestionCategory == 'NORMAL') {
        var TotalDataNormal = $('.addFormAnswer').length;
        var TotalDataImage = $('.add_image').length;
        var dataNormal = viewModel.Normal.ListAnswer;
        var dataNormalImage = viewModel.Normal.NormalImage;
        var QuestionText = viewModel.Normal.QuestionText;
        var typeLayout = viewModel.typeLayout;
        var QuestionImage = viewModel.QuestionImage;
        if (typeAnswer == 'AT19000001') {
            for (i = 0; i < TotalDataNormal; i++) {
                var datass = $('#AnswerNormal' + i).val();
                var dataScore = $('#ScoreNormal' + i).val();
                viewModel.set("Normal.ListAnswer[" + i + "].AnswerNormal", datass);
                viewModel.set("Normal.ListAnswer[" + i + "].ScoreNormal", dataScore);
            }
            var AnswerNormal = [];
            var ScoreNormal = [];
            for (s = 0; s < TotalDataNormal; s++) {
                AnswerNormal[s] = dataNormal[s].AnswerNormal;
                ScoreNormal[s] = dataNormal[s].ScoreNormal;
            }
            var DataNormalText = {
                "title": 'NORMAL',
                "QuestionText": QuestionText,
                "AnswerNormal": AnswerNormal,
                "ScoreNormal": ScoreNormal,
                "typeAnswer": typeAnswer,
                "typeLayout": typeLayout,
                "TotalDataNormal": TotalDataNormal,
                "QuestionImage": Image,
                "QuestionCategory": QuestionCategory,
                "SubTestName": SubTestName
            };
            $.indexedDB('LocalStore').objectStore("Instruction", { "autoIncrement": false }).add(DataNormalText, "Question").then(function (val) {
                DataNormalText.id = val;
                console.info(val);
            }, console.error);
        }
        else {
            for (il = 0; il < TotalDataImage; il++) {
                var listLoad = il + 1;
                var dataImage = $("#mediaDisplay" + listLoad).attr('src');
                var scoreImage = $("#NormalScoreImage" + il).val();
                viewModel.set("Normal.NormalImage[" + il + "].NormalAnswerImage", dataImage);
                viewModel.set("Normal.NormalImage[" + il + "].NormalScoreImage", scoreImage);
            }
            var AnswerNormal = [];
            var ScoreNormal = [];
            for (s = 0; s < TotalDataImage; s++) {
                AnswerNormal[s] = dataNormalImage[s].NormalAnswerImage;
                ScoreNormal[s] = dataNormalImage[s].NormalScoreImage;
            }
            var DataNormalImage = {
                "title": 'NORMAL',
                "QuestionText": QuestionText,
                "AnswerNormal": AnswerNormal,
                "ScoreNormal": ScoreNormal,
                "typeAnswer": typeAnswer,
                "typeLayout": typeLayout,
                "TotalDataNormal": TotalDataImage,
                "QuestionImage": Image,
                "QuestionCategory": QuestionCategory,
                "SubTestName": SubTestName
            };
            $.indexedDB('LocalStore').objectStore("Instruction", { "autoIncrement": false }).add(DataNormalImage, "Question").then(function (val) {
                DataNormalImage.id = val;
                console.info(val);
            }, console.error);
        }
    }
    else if (QuestionCategory == 'WORKINGMEMORY') {
        var WorkingMemory = viewModel.WorkingMemory;
        var totalDataMemory = $('.memory_working_page').length;
        var totalDataAnswer = $('.answer_working_page').length;

        /*for memories*/
        for (k = 0; k < totalDataMemory; k++) {
            var dataWorking = $('#WorkingMemoryText' + k).val();
            viewModel.set("WorkingMemory.WorkingMemories[" + k + "].WorkingMemoryText", dataWorking);
        }

        /*for question answers*/
        for (k = 0; k < totalDataAnswer; k++) {
            var dataWorkingAnswer = $('#WorkingMemoryAswer' + k).val();
            var WorkingMemoryScores = $('#WorkingMemoryScore' + k).val();
            viewModel.set("WorkingMemory.WorkingMemoriesAnswer[" + k + "].WorkingMemoryAswer", dataWorkingAnswer);
            viewModel.set("WorkingMemory.WorkingMemoriesAnswer[" + k + "].WorkingMemoriesScore", WorkingMemoryScores);
        }

        var dataWorking = viewModel.WorkingMemory.WorkingMemories;
        var dataWorkingAnswer = viewModel.WorkingMemory.WorkingMemoriesAnswer;
        var WorkingMemoryText = [];
        var WorkingMemoryAswer = [];
        var WorkingMemoriesScore = [];

        /*for memories*/
        var rplus = 0;
        for (r = 0; r < totalDataMemory; r++) {
            WorkingMemoryText[rplus] = dataWorking[r].WorkingMemoryText;
            WorkingMemoryText[rplus + 1] = '';
            rplus = rplus + 2;
        }

        /*for question answers*/
        for (r = 0; r < totalDataAnswer; r++) {
            WorkingMemoryAswer[r] = dataWorkingAnswer[r].WorkingMemoryAswer;
            WorkingMemoriesScore[r] = dataWorkingAnswer[r].WorkingMemoriesScore;
        }
        var WorkingMemoryPrefaceDisplay = WorkingMemory.WorkingMemoryPrefaceDisplay;
        if (WorkingMemoryPrefaceDisplay == true) {
            if ($('#WorkingMemoryPrefaceDisplay').checked) {
                viewModel.set("WorkingMemory.WorkingMemoryPrefaceDisplay", false);
            }
        } else {
            if ($('#WorkingMemoryPrefaceDisplay').checked) {
                viewModel.set("WorkingMemory.WorkingMemoryPrefaceDisplay", true);
            }
        }
        //Data Master Working Memory
        var WorkingMemoryDuration = WorkingMemory.WorkingMemoryDuration;
        var WorkingMemoryDurationTransition = WorkingMemory.WorkingMemoryDurationTransition;
        var WorkingMemoryPreface = WorkingMemory.WorkingMemoryPreface;
        var WorkingMemoryLayout = WorkingMemory.WorkingMemoryLayout;
        var WorkingMemoryScore = WorkingMemory.WorkingMemoryScore;
        var WorkingMemoryQuestion = WorkingMemory.WorkingMemoryQuestion;

        var dataWorking = {
            "title": 'WORKING MEMORY',
            "WorkingMemoryDuration": WorkingMemoryDuration,
            "WorkingMemoryDurationTransition": WorkingMemoryDurationTransition,
            "WorkingMemoryPreface": WorkingMemoryPreface,
            "WorkingMemoryPrefaceDisplay": WorkingMemoryPrefaceDisplay,
            "WorkingMemoryLayout": WorkingMemoryLayout,
            "WorkingMemoryScore": WorkingMemoryScore,
            "WorkingMemoryQuestion": WorkingMemoryQuestion,
            "WorkingMemoryText": WorkingMemoryText,
            "WorkingMemoryAswer": WorkingMemoryAswer,
            "WorkingMemoriesScore": WorkingMemoriesScore,
            "totalDataMemory": totalDataMemory,
            "totalDataAnswer": totalDataAnswer,
            "QuestionCategory": QuestionCategory,
            "SubTestName": SubTestName,
        };
        $.indexedDB('LocalStore').objectStore("Instruction", { "autoIncrement": false }).add(dataWorking, "Question").then(function (val) {
            dataWorking.id = val;
            console.info(val);
        }, console.error);
        //end Data Master Working Memory
    }
    else {
        var totalDataVerbal = $('.answer_verbal_page').length;
        for (ver = 0; ver < totalDataVerbal; ver++) {
            var dataVerbalAnswer = $('#VerbalAnswer' + ver).val();
            var dataVerbalScores = $('#VerbalScore' + ver).val();
            viewModel.set("Verbal.VerbalAnswers[" + ver + "].VerbalAnswer", dataVerbalAnswer);
            viewModel.set("Verbal.VerbalAnswers[" + ver + "].VerbalScore", dataVerbalScores);
        }
        var dataVerbals = viewModel.Verbal.VerbalAnswers;
        var VerbalLists = []; var nomor = 1; var VerbalScoreLists = [];
        for (verb = 0; verb < totalDataVerbal; verb++) {
            VerbalLists[verb] = dataVerbals[verb].VerbalAnswer;
            VerbalScoreLists[verb] = dataVerbals[verb].VerbalScore;
        }
        var dataVerbal = viewModel.Verbal;
        var VerbalQuestion = dataVerbal.VerbalQuestion;
        var VerbalLayout = dataVerbal.VerbalLayout;
        var arr = viewModel.Story.StoryList;
        var dataVerbalPrev = {
            "title": 'VERBAL MEMORY',
            "VerbalStroyCode": arr,
            "VerbalQuestion": VerbalQuestion,
            "VerbalLayout": VerbalLayout,
            "VerbalList": VerbalLists,
            "VerbalScore": VerbalScoreLists,
            "VerbalTotal": totalDataVerbal,
            "QuestionCategory": QuestionCategory,
            "SubTestName": SubTestName
        };
        $.indexedDB('LocalStore').objectStore("Instruction", { "autoIncrement": false }).add(dataVerbalPrev, "Question").then(function (val) {
            dataVerbalPrev.id = val;
            console.info(val);
        }, console.error);
    }
    //End Check Preview
    $('#PreviewQuestion').attr("href", viewModel.domain);
}
DeleteStory = function (dataStory) {
    var ids = $(dataStory).attr('id');
    confirmMessageDelete();
    $('.swal-button--defeat').on('click', function () {
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/Story/Delete',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                StoryCode: ids
            },
            success: function (response) {
                if (response.Acknowledge == 1) {
                    swal("Good", response.Message, "success", { closeOnClickOutside: false });
                    viewModel.VerbalStoryList.page(1);
                }
                else {
                    swal("Failed!!!", response.Message, "warning", { closeOnClickOutside: false });
                }
                LoadingMask.hide();
            },
            error: function (xhr, status, error) {
                MessageBox.show("Error", error);
                LoadingMask.hide();
            }
        });
    });
}