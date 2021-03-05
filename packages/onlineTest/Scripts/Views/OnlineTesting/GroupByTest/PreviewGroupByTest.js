$(document).ready(function () {
    var QuestionCode = GetParameterByName('QuestionCode');
    loadPage(QuestionCode);
    kendo.bind($("body"), viewModel);
});
loadPage = function (data) {
    //console.log(data);
    if (data == '' || data == null || data == undefined) {
        swal('Failed!!!', 'Error Load Page', 'warning', { closeOnClickOutside: false });
    } else {
        LoadingMask.show();
        $.ajax({
            type: "POST",
            url: SERVICE_URL + "api/Question/Detail",
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                QuestionCode:data
            },
            success: function (response) {
                //console.log(response);
                if (response.Acknowledge < 1) {
                    LoadingMask.hide();
                    swal('Failed!!!', 'Error Load Data', 'warning', { closeOnClickOutside: false });
                } else {
                    LoadingMask.hide();
                    var data = '';
                    if (response.NormalQuestion != undefined) {
                        data = response.NormalQuestion;
                    } else if (response.WorkingMemoryQuestion != undefined) {
                        data = response.WorkingMemoryQuestion;
                    } else if (response.VerbalMemoryQuestion != undefined) {
                        data = response.VerbalMemoryQuestion;
                    }
                    viewModel.set('Question', data);
                    LoadQuestion();
                }
                
            },
            error: function (xhr, status, error) {
                alert("Error");
                LoadingMask.hide();
            }
        });
    }
}