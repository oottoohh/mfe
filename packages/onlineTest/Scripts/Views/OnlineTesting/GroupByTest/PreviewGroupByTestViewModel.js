var viewModel = kendo.observable({
    Question:[],
});

LoadQuestion = function () {
    var AnswerTypeCode = viewModel.Question.AnswerTypeCode;
    var AnswerLayoutCode = viewModel.Question.AnswerLayoutCode;
    var length = viewModel.Question.length;
    var no = 1;
    var number = 1;
    var QuestionCategory = viewModel.Question.QuestionCategory;
    if (viewModel.Question.QuestionImage == 'a.jpg' || viewModel.Question.QuestionImage == '' || viewModel.Question.QuestionImage == null || viewModel.Question.QuestionImage == undefined) {
        $('#QuestionImage').attr('hidden', true);
    }
    else {
        $('#QuestionImage').removeAttr('hidden');
        $('#QuestionImage').attr('src', viewModel.Question.QuestionImage);
    }
    if (QuestionCategory == 'NORMAL') {
        if (AnswerTypeCode == "AT19000001") {
            if (AnswerLayoutCode == "AL19000001") {
                //Horizontal
                for (i = 0; i < viewModel.Question.Answers.length; i++) {
                    $('.ListQuestion').append('<button class="k-button k-default k-form-new">(' + no + ')<br/><span class="answerList">' + viewModel.Question.Answers[i].Text + '</span></button>&nbsp;&nbsp;&nbsp;');
                    no++;
                }
            } else {
                //Vertikal
                for (i = 0; i < viewModel.Question.Answers.length; i++) {
                    $('.ListQuestion').append('<button class="k-button k-default k-form-new">(' + no + ')<br/><span class="answerList">' + viewModel.Question.Answers[i].Text + '</span></button><br/><br/>');
                    no++;
                }
            }
        } else {
            if (AnswerLayoutCode == "AL19000003") {
                //3-2
                for (imgL = 0; imgL < 3; imgL++) {
                    $('#Img3').append('<button class="k-button k-default k-form-new" >(' + no + ')<br/><img src="' + viewModel.Question.Answers[imgL].Url + '" style="background: no-repeat url(../../../Images/add-picture.jpg) center; border: thin" width="120" height="125"></button>&nbsp;&nbsp;&nbsp;');
                    no++;
                }
                for (imgB = 3; imgB < viewModel.Question.Answers.length; imgB++) {
                    $('#Img2').append('<button class="k-button k-default k-form-new">(' + number + ')<br/><img src="' + viewModel.Question.Answers[imgB].Url + '" style="background: no-repeat url(../../../Images/add-picture.jpg) center; border: thin" width="120" height="125"></button>&nbsp;&nbsp;&nbsp;');
                    number++;
                }
            } else if (AnswerLayoutCode == "AL19000004") {
                //3-3
                for (imgL = 0; imgL < 3; imgL++) {
                    $('#Img3').append('<button class="k-button k-default k-form-new" >(' + no + ')<br/><img src="' + viewModel.Question.Answers[imgL].Url + '" style="background: no-repeat url(../../../Images/add-picture.jpg) center; border: thin" width="120" height="125"></button>&nbsp;&nbsp;&nbsp;');
                    no++;
                }
                for (imgB = 3; imgB < viewModel.Question.Answers.length; imgB++) {
                    $('#Img2').append('<button class="k-button k-default k-form-new">(' + number + ')<br/><img src="' + viewModel.Question.Answers[imgB].Url + '" style="background: no-repeat url(../../../Images/add-picture.jpg) center; border: thin" width="120" height="125"></button>&nbsp;&nbsp;&nbsp;');
                    number++;
                }
            } else {
                //4-3
                for (imgL = 0; imgL < 4; imgL++) {
                    $('#Img3').append('<button class="k-button k-default k-form-new" >(' + no + ')<br/><img src="' + viewModel.Question.Answers[imgL].Url + '" style="background: no-repeat url(../../../Images/add-picture.jpg) center; border: thin" width="120" height="125"></button>&nbsp;&nbsp;&nbsp;');
                    no++;
                }
                for (imgB = 4; imgB < viewModel.Question.Answers.length; imgB++) {
                    $('#Img2').append('<button class="k-button k-default k-form-new">(' + number + ')<br/><img src="' + viewModel.Question.Answers[imgB].Url + '" style="background: no-repeat url(../../../Images/add-picture.jpg) center; border: thin" width="120" height="125"></button>&nbsp;&nbsp;&nbsp;');
                    number++;
                }
            }
        }
    } else if (QuestionCategory == 'WORKINGMEMORY') {
        if (AnswerLayoutCode == "AL19000001") {
            //Horizontal
            for (i = 0; i < viewModel.Question.Answers.length; i++) {
                $('.ListQuestion').append('<button class="k-button k-default k-form-new">(' + no + ')<br/><span class="answerList">' + viewModel.Question.Answers[i].Text + '</span></button>&nbsp;&nbsp;&nbsp;');
                no++;
            }
        } else {
            //Vertikal
            for (i = 0; i < viewModel.Question.Answers.length; i++) {
                $('.ListQuestion').append('<button class="k-button k-default k-form-new">(' + no + ')<br/><span class="answerList">' + viewModel.Question.Answers[i].Text + '</span></button><br/><br/>');
                no++;
            }
        }

    } else {
        if (AnswerLayoutCode == "AL19000001") {
            //Horizontal
            for (i = 0; i < viewModel.Question.Answers.length; i++) {
                $('.ListQuestion').append('<button class="k-button k-default k-form-new">(' + no + ')<br/><span class="answerList">' + viewModel.Question.Answers[i].Text + '</span></button>&nbsp;&nbsp;&nbsp;');
                no++;
            }
        } else {
            //Vertikal
            for (i = 0; i < viewModel.Question.Answers.length; i++) {
                $('.ListQuestion').append('<button class="k-button k-default k-form-new">(' + no + ')<br/><span class="answerList">' + viewModel.Question.Answers[i].Text + '</span></button><br/><br/>');
                no++;
            }
        }
    }
}