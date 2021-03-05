$(document).ready(function () {
    kendo.bind($("body"), viewModel);
});
Display = function (data) {
    //$(data).val("false");
    var id = $(data).attr('id');
    //alert(id);
    $('#'+id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'DisplayChecked(this)');
    //var nilai = $(data).val();
    viewModel.set('isDisplay', false);
}

DisplayChecked = function (data) {
    //$(data).val("true");
    var id = $(data).attr('id');
    $('#' + id).removeAttr('onchange');
    $('#' + id).attr('onchange', 'Display(this)');
    //var nilai = $(data).val();
    viewModel.set('isDisplay', true);
}