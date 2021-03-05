
$(document).ready(function () {

    LoadingMask.show();
    //if (document.referrer !== document.location.href) {
    //    setTimeout(function () {
    //        document.location.reload()
    //    }, 1000);
    //}
    var getItem = function (target) {
        var itemIndexes = target.val().split(/[.,]/),
            rootItem = panelBar.element.children("li").eq(itemIndexes[0]);

        return itemIndexes.length > 1 ?
            rootItem.find(".k-group > .k-item").eq(itemIndexes[1]) :
            rootItem;
    },
        select = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                panelBar.select(getItem($("#selectIndex")));
        },
        append = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                panelBar.append({
                    text: $("#appendText").val() 
                }, panelBar.select());
        },
        before = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                panelBar.insertBefore({
                    text: $("#beforeText").val()
                }, panelBar.select());
        },
        after = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                panelBar.insertAfter({
                    text: $("#afterText").val()
                }, panelBar.select());
        };

    $(".selectItem").click(select);
    $("#selectIndex").keypress(select);

    $(".appendItem").click(append);
    $("#appendText").keypress(append);

    $(".beforeItem").click(before);
    $("#beforeText").keypress(before);

    $(".afterItem").click(after);
    $("#afterText").keypress(after);

    $(".toggleItem").click(function (e) {
        var item = panelBar.select();
        panelBar.enable(item, item.hasClass("k-state-disabled"));
    });

    $(".triggerItem").click(function (e) {
        var item = panelBar.select();

        if (item.hasClass("k-state-active")) {
            panelBar.collapse(item);
        } else {
            panelBar.expand(item);
        }
    });

    $(".removeItem").click(function (e) {
        panelBar.remove(panelBar.select());
    });
    $('.memory_working_page' + ' div').each(function () {
        $('.memory_working_page div > table > tbody > tr > td.k-editable-area').children('table:first').remove();
    });
    $('.answer_working_page' + ' div').each(function () {
        $('.answer_working_page div > table > tbody > tr > td.k-editable-area').children('table:first').remove();
    });
    LoadingMask.hide();
});
var TypeForm = localStorage.getItem("QuestionCategory") == "NORMAL" ? "SampleNormal" : localStorage.getItem("QuestionCategory") == "WORKINGMEMORY" ? "WorkingMemory" : "VerbalMemory";
switch (TypeForm) {
    case "SampleNormal":
        var formName = "#panelbar";
        break;
    case "WorkingMemory":
        var formName = "#panelbar2";
        break;
    case "VerbalMemory":
        var formName = "#panelbar3";
        break;
    default:
        text = "No value found";
}
var panelBar = $(formName).kendoPanelBar().data("kendoPanelBar");
function AddForm() {
    var nameForm = localStorage.getItem("QuestionCategory") == "NORMAL" ? "SampleNormal" : localStorage.getItem("QuestionCategory") == "WORKINGMEMORY" ? "WorkingMemory" : "VerbalMemory";
    
    switch (nameForm) {
        case "SampleNormal":
            var count = parseInt($("#btn_addSampleForm").attr('data-sample')) + 1;
            var classForm = localStorage.getItem("QuestionCategory") + '-Form' + count;
            var strForm = `<li aria-expanded="false" class="sampleform-nm k-item k-last k-state-default" id="sample-` + count + `" role="menuitem" aria-hidden="true" aria-selected="true"><span class="k-link k-header">
        Sample Form <span id="number-form-`+ nameForm + `">` + count + `</span>
            <div class="btn-groub-action">
                <button class="k-button k-primary btn-form btn_delete" id="showdelete`+ count + `" onclick="DeleteForm(` + count + `);" hidden="hidden">Delete <i class="fa fa-times-circle" aria-hidden="true"></i></button><br />
                <button class="k-button k-primary btn-form btn_preview" id="showpreview`+ count + `" onclick="ConfirmationPreviewMultiple(` + count + `);" hidden="hidden">Preview <i class="fa fa-window-restore" aria-hidden="true"></i></button><br />    
            </div>
        <span class="k-icon k-i-arrow-n k-panelbar-collapse"></span></span><ul class="k-group k-panel" role="group" aria-hidden="true" style="display: none; height: auto; overflow: visible;">
            <li class="k-item k-state-default k-last" role="menuitem" style="margin:40px;">
                <div class="`+ classForm + `">

                </div>
            </li>
        </ul>
    </li>`;
            $('#panelbar').append(strForm);
            break;
        case "WorkingMemory":
            var count = parseInt($("#btn_addWorkingForm").attr('data-sample')) + 1;
            var classForm = localStorage.getItem("QuestionCategory") + '-Form' + count;
            var strForm = `<li aria-expanded="false" class="sampleform-wm k-item k-last k-state-default" id="sample-` + count + `" role="menuitem" aria-hidden="true" aria-selected="true"><span class="k-link k-header">
        Sample Form <span id="number-form-`+ nameForm + `">` + count + `</span>
        <div class="btn-groub-action">
            <button class="k-button k-primary btn-form btn_delete" id="showdelete`+ count + `" onclick="DeleteForm(` + count + `);" hidden="hidden">Delete <i class="fa fa-times-circle" aria-hidden="true"></i></button><br />
            <button class="k-button k-primary btn-form btn_preview" id="showpreview`+ count + `" onclick="ConfirmationPreviewMultiple(` + count + `);" hidden="hidden">Preview <i class="fa fa-window-restore" aria-hidden="true"></i></button><br />            
        </div>
        <span class="k-icon k-i-arrow-n k-panelbar-collapse"></span></span><ul class="k-group k-panel" role="group" aria-hidden="true" style="display: none; height: auto; overflow: visible;">
            <li class="k-item k-state-default k-last" role="menuitem" style="margin:40px;">
                <div class="`+ classForm + `">

                </div>
            </li>
        </ul>
    </li>`;
            $('#panelbar2').append(strForm);
            break;
        case "VerbalMemory":
            var count = parseInt($("#btn_addVerbalForm").attr('data-sample')) + 1;
            var classForm = localStorage.getItem("QuestionCategory") + '-Form' + count;
            var strForm = `<li aria-expanded="false" class="sampleform-vm k-item k-last k-state-default" id="sample-` + count + `" role="menuitem" aria-hidden="true" aria-selected="true"><span class="k-link k-header">
        Sample Form <span id="number-form-`+ nameForm + `">` + count + `</span>
        <div class="btn-groub-action">
            <button class="k-button k-primary btn-form btn_delete" id="showdelete`+ count + `" onclick="DeleteForm(` + count + `);" hidden="hidden">Delete <i class="fa fa-times-circle" aria-hidden="true"></i></button><br />
            <button class="k-button k-primary btn-form btn_preview" id="showpreview`+ count + `" onclick="ConfirmationPreviewMultiple(` + count + `);" hidden="hidden">Preview <i class="fa fa-window-restore" aria-hidden="true"></i></button><br />        
        </div>
        <span class="k-icon k-i-arrow-n k-panelbar-collapse"></span></span><ul class="k-group k-panel" role="group" aria-hidden="true" style="display: none; height: auto; overflow: visible;">
            <li class="k-item k-state-default k-last" role="menuitem" style="margin:40px;">
                <div class="`+ classForm + `">

                </div>
            </li>
        </ul>
    </li>`;
            $('#panelbar3').append(strForm);
            break;
        default:
            console.log("No value found");
    }
    var updateAdd = $("span#number-form-" + nameForm).length;
    var hidebtn = $("span#number-form-" + nameForm).length - 1;
    $('#showdelete' + hidebtn).hide();
    if (nameForm == "SampleNormal") {
        $('#btn_addSampleForm').attr('data-sample', updateAdd);        
        CreateViewFormNormal(count, classForm)
    } else if (nameForm == "WorkingMemory") {
        $('#btn_addWorkingForm').attr('data-sample', updateAdd); 
        //var id = ["#btn_answer_Working", "#add_working_memory"]        
        CreateViewFormWorkingMemory(count, classForm)  
    } else if (nameForm == "VerbalMemory") {
        $('#btn_addVerbalForm').attr('data-sample', updateAdd);        
        CreateViewFormVerbalMemory(count, classForm)   
    } else {
        console.log("Type Form Not Found")
    }
}
function DeleteForm(id) {
    var nameForm = localStorage.getItem("QuestionCategory") == "NORMAL" ? "SampleNormal" : localStorage.getItem("QuestionCategory") == "WORKINGMEMORY" ? "WorkingMemory" : "VerbalMemory";
    var aktifPanel = nameForm == "SampleNormal" ? "panelbar" : nameForm == "WorkingMemory" ? "panelbar2" : "panelbar3"
    var typeform = aktifPanel == "panelbar" ? ".sampleform-nm" : aktifPanel == "panelbar2" ? ".sampleform-wm" : ".sampleform-vm";
    $('li#sample-' + id).remove();
    var button = nameForm == "SampleNormal" ? "btn_addSampleForm" : nameForm == "WorkingMemory" ? "btn_addWorkingForm" : "btn_addVerbalForm";
    var updateAdd = $('ul#' + aktifPanel + ' > ' + typeform + '').length;
    if (updateAdd != 0) {
        $('#showdelete' + (updateAdd)).show();
        $('#' + button).attr('data-sample', updateAdd);
    } else {
        $('#' + button).attr('data-sample', 1);
    }
}
function CreateViewFormNormal(NumForm, classForm) {
    var num = NumForm - 2;
    var QuestionNum = NumForm - 1;
    var nameForm = localStorage.getItem("QuestionCategory") == "NORMAL" ? "SampleNormal" : localStorage.getItem("QuestionCategory") == "WORKINGMEMORY" ? "WorkingMemory" : "VerbalMemory";
    $('.' + classForm).append(`<label>Title<span class="mandatory">*</span></label><input id="` + nameForm + `Title` + NumForm + `" type="text" name="` + nameForm + `Title` + NumForm + `" class="k-textbox ` + nameForm + `Title" style="width: 60%; margin-left:150px;" placeholder="Input Title Sample" data-bind="value:` + nameForm + `.MoreForm[` + num + `].` + nameForm + `.SampleNormalTitle" />`)
    $('.' + classForm).append('<div>' +
        '<label>Introduction<span class="mandatory">*</span></label>' +
        '<div style="padding-left:180px;padding-right:120px;">' +
        '<textarea id="' + nameForm + 'Introduction' + NumForm + '" class="editor' + NumForm + '-nm-default" name="' + nameForm + 'Introduction' + NumForm + '" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor"></textarea>' +
        '</div>' +
        '<br />' +
        '</div></br>');

    $('.' + classForm).append(`<div class="q-image-media` + QuestionNum + `-QuestionImage` + NumForm + `"><label>Question Image</label><label style="margin-left:85px;margin-right:120px;">
                                                        <img id="mediaPic`+ QuestionNum + `" src="" hidden="hidden" />
                                                        <img id="mediaDisplay`+ QuestionNum + `" src="" width="100" height="100" class="backImage media` + QuestionNum + `-QuestionImage` + NumForm + `" />
                                                        <input name="media`+ QuestionNum + `" id="media` + QuestionNum + `-QuestionImage` + NumForm + `" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.mediaImageChange(this, this.files)" />
                                                    </label>
                                                    <input type="hidden" id="mediaId`+ QuestionNum + `" name="mediaId` + QuestionNum + `" value="0" />
                                                    <a href="#" id="media` + QuestionNum + `-QuestionImage` + NumForm + `" class="k-button" style="display: none;width:30px; float:right;margin-right:25%;" onclick="viewModel.removeQuestionImgMultiple(this, ` + QuestionNum + `)"><span class="fas fa-trash-alt"></span></a></div>`);
    $('.' + classForm).append('<div>' +
        '<label>Question Text<span class="mandatory">*</span></label>' +
        '<div style="padding-left:180px;padding-right:120px;">' +
        '<textarea id="' + nameForm + 'Question' + NumForm + '" class="editor' + NumForm + '-nm-default" name="' + nameForm + 'Question' + NumForm + '" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" data-bind="value:' + nameForm + '.MoreForm[' + num + '].' + nameForm + '.NormalAnswerText"></textarea>' +
        '</div>' +
        '<br />' +
        '</div></br>');
    $('.' + classForm).append(`<div style="padding-left:185px;padding-right:120px;" class="button_answer` + NumForm + `">
                                                <button class="k-button k-primary btn-form btn_answer" data-Noform="`+ NumForm + `" nomor="3" id="btn_answer` + NumForm + `" onclick="add_answerMultiple(this)">Add Answer</button><br />
                                                <span>*Max. 7 Answer</span>
                                            </div>`);
    $('.' + classForm).append(`<label>Answer Type</label>
                                             <div style="margin-left:180px;">                                                    
                                                    <input type="text" NumType=`+ NumForm + ` id="typeAnswer` + NumForm + `" name="typeAnswer` + NumForm + `" data-type="combobox" data-bind="value:typeAnswer" />
                                                    <span style="padding-left:5%;"> Answer Layout</span>
                                                    <input type="text" id="typeLayout` + NumForm + `" name="typeLayout` + NumForm + `" data-type="combobox" data-bind="value:typeLayout" />
                                            </div>`);
    $('.' + classForm).append(`<div class="button_image` + NumForm + `" hidden="hidden" id="answerimage">
                                                <div class="add_image`+ NumForm + `">
                                                    <label>Answer 1 <span class="mandatory">*</span></label><br />
                                                    <label style="padding-left:180px;padding-right:120px;">
                                                        <label>
                                                            <img id="mediaPic1" src="" hidden="hidden" />
                                                            <img id="mediaDisplay1" src="" class="backImage media1-form`+ NumForm + `" width="100%" height="100%" />
                                                            <input name="media1" id="media1-form`+ NumForm + `" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.mediaImageChange(this, this.files)" />
                                                        </label>
                                                        <input type="hidden" id="mediaId1" name="mediaId1" value="0" />
                                                        <a href="#" class="k-button" style="display: none" onclick="viewModel.mediaImageRemove(this)"><span class="fas fa-trash-alt"></span></a>
                                                    </label>
                                                    <br />
                                                    <label style="padding-left:180px;padding-right:120px;">
                                                        <span>* Max file size 2Mb</span><br />
                                                    </label>
                                                    <br />
                                                    <label>Correct Answer</label>
                                                    <input type="radio" id="NormalScoreImage0-form` + NumForm + `-NM" name="NormalScoreImage`+ NumForm + `" class="k-checkbox form-check" data-bind="checked:SampleNormal.NormalScoreImage" value="0" /><br />
                                                </div><br />
                                                <div class="add_image`+ NumForm + `">
                                                    <label>Answer 2 <span class="mandatory">*</span></label><br />
                                                    <label style="padding-left:180px;padding-right:120px;">
                                                        <label>
                                                            <img id="mediaPic2" src="" hidden="hidden" />
                                                            <img id="mediaDisplay2" src="" class="backImage media2-form`+ NumForm + `" width="100%" height="100%" />
                                                            <input name="media2" id="media2-form`+ NumForm + `" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.mediaImageChange(this, this.files)" />
                                                        </label>
                                                        <input type="hidden" id="mediaId2" name="mediaId2" value="0" />
                                                        <a href="#" class="k-button" style="display: none" onclick="viewModel.mediaImageRemove(this)"><span class="fas fa-trash-alt"></span></a>
                                                    </label>
                                                    <br />
                                                    <label style="padding-left:180px;padding-right:120px;">
                                                        <span>* Max file size 2Mb</span><br />
                                                    </label>
                                                    <br />
                                                    <label>Correct Answer</label>
                                                    <input type="radio" id="NormalScoreImage1-form` + NumForm + `-NM" name="NormalScoreImage`+ NumForm + `" class="k-checkbox form-check" value="1" /><br />
                                                </div><br />
                                                <div id="add_image`+ NumForm + `">
                                                    <div class="add_image`+NumForm+`" id="label2form` + NumForm + `NM">
                                                    <label>Answer 3</label><br />
                                                    <a href="#" no="2" idDelete = "NM" id="nom2" style="padding-left: 30%; display: none;" onclick="clearFieldMultiFormImg(2, ` + NumForm + `, this);" ><i class="fas fa-trash-alt"></i></a><br/>
                                                    <label style="padding-left:180px;padding-right:120px;">
                                                    <label>
                                                    <img id="mediaPic3" src="" hidden="hidden" />
                                                    <img id="mediaDisplay3" src="" class="backImage media3-form` + NumForm + `" width="100%" height="100%" />
                                                    <input name="media3" id="media3-form` + NumForm + `" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.mediaImageChange(this, this.files)" />
                                                    </label>
                                                    <input type="hidden" id="mediaId3" name="mediaId' + no + '" value="0" />
                                                    <a href="#" class="k-button" style="display: none" onclick="viewModel.mediaImageRemove(this)"><span class="fas fa-trash-alt"></span></a>
                                                    </label>
                                                    <br />
                                                    <label style="padding-left:180px;padding-right:120px;">
                                                    <span>* Max file size 2Mb</span><br />
                                                    </label>
                                                    <br />
                                                    <label>Correct Answer</label>
                                                    <input type="radio" id="NormalScoreImage2-form` + NumForm + `-NM" name="NormalScoreImage` + NumForm + `" class="k-checkbox form-check" /><br />
                                                    </div><br/>
                                                    <div class="add_image`+ NumForm + `" id="label3form` + NumForm + `NM">
                                                    <label>Answer 4</label><br />
                                                    <a href="#" no="3" idDelete = "NM" id="nom3" style="padding-left:30%;display: none;" onclick="clearFieldMultiFormImg(3, ` + NumForm + `, this);" ><i class="fas fa-trash-alt"></i></a><br/>
                                                    <label style="padding-left:180px;padding-right:120px;">
                                                    <label>
                                                    <img id="mediaPic4" src="" hidden="hidden" />
                                                    <img id="mediaDisplay4" src="" class="backImage media4-form` + NumForm + `" width="100%" height="100%" />
                                                    <input name="media4" id="media4-form` + NumForm + `" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.mediaImageChange(this, this.files)" />
                                                    </label>
                                                    <input type="hidden" id="mediaId4" name="mediaId4" value="0" />
                                                    <a href="#" class="k-button" style="display: none" onclick="viewModel.mediaImageRemove(this)"><span class="fas fa-trash-alt"></span></a>
                                                    </label>
                                                    <br />
                                                    <label style="padding-left:180px;padding-right:120px;">
                                                    <span>* Max file size 2Mb</span><br />
                                                    </label>
                                                    <br />
                                                    <label>Correct Answer</label>
                                                    <input type="radio" id="NormalScoreImage3-form` + NumForm + `-NM" name="NormalScoreImage` + NumForm + `" class="k-checkbox form-check" /><br />
                                                    </div><br/>
                                                    <div class="add_image`+ NumForm + `" id="label4form` + NumForm + `NM">
                                                    <label>Answer 5</label><br />
                                                    <a href="#" no="4" idDelete = "NM" id="nom4" style="padding-left:30%;" onclick="clearFieldMultiFormImg(4, ` + NumForm + `, this);" ><i class="fas fa-trash-alt"></i></a><br/>
                                                    <label style="padding-left:180px;padding-right:120px;">
                                                    <label>
                                                    <img id="mediaPic5" src="" hidden="hidden" />
                                                    <img id="mediaDisplay5" src="" class="backImage media5-form` + NumForm + `" width="100%" height="100%" />
                                                    <input name="media5" id="media5-form` + NumForm + `" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.mediaImageChange(this, this.files)" />
                                                    </label>
                                                    <input type="hidden" id="mediaId5" name="mediaId5" value="0" />
                                                    <a href="#" class="k-button" style="display: none" onclick="viewModel.mediaImageRemove(this)"><span class="fas fa-trash-alt"></span></a>
                                                    </label>
                                                    <br />
                                                    <label style="padding-left:180px;padding-right:120px;">
                                                    <span>* Max file size 2Mb</span><br />
                                                    </label>
                                                    <br />
                                                    <label>Correct Answer</label>
                                                    <input type="radio" id="NormalScoreImage4-form` + NumForm + `-NM" name="NormalScoreImage` + NumForm + `" class="k-checkbox form-check" /><br />
                                                    </div><br/>                                                    
                                                </div>
                                            </div>`);
    $('.' + classForm).append(`<li class="answer_list">
                                            <div class="button_answer`+ NumForm + `" id="answertext">
                                                <div class="add_sample`+ NumForm + `">
                                                    <label>Answer 1<span class="mandatory">*</span></label>
                                                    <div style="padding-left:180px;padding-right:120px;">
                                                        <textarea id="NormalAnswerText0-form`+ NumForm + `-NM" class="editor` + NumForm + `-nm-default" name="NormalAnswerText0" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor"></textarea>
                                                    </div>
                                                    <br />
                                                    <label>Correct Answer</label>
                                                    <input type="radio" id="NormalScoreText0-form` + NumForm + `-NM" name="NormalScoreText`+ NumForm + `" class="k-checkbox form-check" value="0" /><br />
                                                </div><br />
                                                <div class="add_sample`+ NumForm + `">
                                                    <label>Answer 2<span class="mandatory">*</span></label>
                                                    <div style="padding-left:180px;padding-right:120px;">
                                                        <textarea id="NormalAnswerText1-form` + NumForm + `-NM" class="editor` + NumForm + `-nm-default" name="NormalAnswerText1" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor"></textarea>
                                                    </div>
                                                    <br />
                                                    <label>Correct Answer</label>
                                                    <input type="radio" id="NormalScoreText1-form` + NumForm + `-NM" name="NormalScoreText`+ NumForm + `" class="k-checkbox form-check"  value="1" /><br />
                                                </div><br />                                                
                                                <div id="add_sample`+ NumForm + `">
                                                    <div class="add_sample`+ NumForm + `" id="label2form` + NumForm +`NM">
                                                        <label>Answer 3</label>
                                                        <a href="#" no="2" idDelete = "NM" id="noms2" style="padding-left: 65%;display: none;" onclick="clearFieldMultiForm(2, `+ NumForm +`, this);"><i class="fas fa-trash-alt"></i></a>
                                                        <div style="padding-left:180px;padding-right:120px;">
                                                        <textarea id="NormalAnswerText2-form`+ NumForm +`-NM" class="editor2-NM" name="NormalAnswerText2" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" ></textarea>
                                                        </div>
                                                        <br />
                                                        <label>Correct Answer</label>
                                                        <input type="radio" id="NormalScoreText2-form`+ NumForm+`-NM" name="NormalScoreText`+ NumForm +`" class="k-checkbox form-check"/><br />
                                                    </div>
                                                    </br>
                                                    <div class="add_sample`+ NumForm + `" id="label3form` + NumForm + `NM">
                                                        <label>Answer 4</label>
                                                        <a href="#" no="3" idDelete = "NM" id="noms3" style="padding-left: 65%;display: none;" onclick="clearFieldMultiForm(3, `+ NumForm + `, this);"><i class="fas fa-trash-alt"></i></a>
                                                        <div style="padding-left:180px;padding-right:120px;">
                                                        <textarea id="NormalAnswerText3-form`+ NumForm + `-NM" class="editor3-NM" name="NormalAnswerText3" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" ></textarea>
                                                        </div>
                                                        <br />
                                                        <label>Correct Answer</label>
                                                        <input type="radio" id="NormalScoreText3-form`+ NumForm + `-NM" name="NormalScoreText` + NumForm + `" class="k-checkbox form-check"/><br />
                                                    </div>
                                                    </br>                                                    
                                                    <div class="add_sample`+ NumForm + `" id="label4form` + NumForm + `NM">
                                                        <label>Answer 5</label>
                                                        <a href="#" no="4" idDelete = "NM" id="noms4" style="padding-left: 65%;" onclick="clearFieldMultiForm(4, `+ NumForm + `, this);"><i class="fas fa-trash-alt"></i></a>
                                                        <div style="padding-left:180px;padding-right:120px;">
                                                        <textarea id="NormalAnswerText4-form`+ NumForm + `-NM" class="editor4-NM" name="NormalAnswerText3" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" ></textarea>
                                                        </div>
                                                        <br />
                                                        <label>Correct Answer</label>
                                                        <input type="radio" id="NormalScoreText4-form`+ NumForm + `-NM" name="NormalScoreText` + NumForm +`" class="k-checkbox form-check"/><br />
                                                    </div>
                                                    </br>
                                                </div>                                                    
                                                </div>
                                            </div>
                                        </li>`);
    $('.' + classForm).append('<div>' +
        '<label>Explanation<span class="mandatory">*</span></label>' +
        '<div style="padding-left:180px;padding-right:120px;">' +
        '<textarea id="' + nameForm + 'Explaination' + NumForm + '" class="editor' + NumForm + '-nm-default" name="' + nameForm + 'Explaination' + NumForm + '" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" data-bind="value:' + nameForm + '.MoreForm[' + num + '].' + nameForm + '.' + nameForm + 'Explaination"></textarea>' +
        '</div>' +
        '<br />' +
        '</div></br>');
    $('.' + classForm).append('<div>' +
        '<label>Disclaimer<span class="mandatory">*</span></label>' +
        '<div style="padding-left:180px;padding-right:120px;">' +
        '<textarea id="' + nameForm + 'Disclaimer' + NumForm + '" class="editor' + NumForm + '-nm-default" name="' + nameForm + 'Disclaimer' + NumForm + '" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" data-bind="value:' + nameForm + '.MoreForm[' + num + '].' + nameForm + '.' + nameForm + 'Disclaimer"></textarea>' +
        '</div>' +
        '<br />' +
        '</div></br>');

    $(`#typeAnswer` + NumForm + ``).kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModels.CategoryAnswer,
        change: ChangeAnswerType
    });
    $(`#typeLayout` + NumForm + ``).kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        
        dataSource: $("span#number-form").length <= 2 ? viewModel.AnswerLayoutList : viewModel.AnswerLayoutListMultiple[NumForm] == undefined ? viewModel.AnswerLayoutListMultiple[NumForm - 1] : viewModel.AnswerLayoutListMultiple[NumForm],
    });
    var layoutList = viewModel.AnswerLayoutListMultiple.length < 1 ? viewModel.AnswerLayoutList : viewModel.AnswerLayoutListMultiple[NumForm] == undefined ? viewModel.AnswerLayoutListMultiple[NumForm - 1] : viewModel.AnswerLayoutListMultiple[NumForm]
    
    if (layoutList !== undefined && layoutList.length !== 0) {
         
        if (layoutList[0].Code == "AL19000001" && layoutList.length !== 0) {
            $(`#typeAnswer` + NumForm + ``).data("kendoComboBox").select(0);
            $('.button_answer' + NumForm).show();
            $('.button_image' + NumForm).hide();
        } else {
            $(`#typeAnswer` + NumForm + ``).data("kendoComboBox").select(1);
            $('.button_answer' + NumForm).hide();
            $('.button_image' + NumForm).show();
        }
    }
    var combobox = $("#typeLayout" + NumForm).data("kendoComboBox");
    combobox.select(0);
    combobox.trigger("change");
    $(".editor" + NumForm + '-nm-default').kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });
    renderDefaultForm(NumForm);
}
function CreateViewFormWorkingMemory(NumForm, classForm) {
    var num = NumForm - 2;
    var QuestionNum = NumForm - 1;
    var nameForm = "WorkingMemory";
    $('.' + classForm).append(`<label>Title<span class="mandatory">*</span></label><input id="` + nameForm + `Title` + NumForm + `" type="text" name="` + nameForm + `Title` + NumForm + `" class="k-textbox ` + nameForm + `Title" style="width: 60%; margin-left:10%;" placeholder="Input Title Sample" />`)
    $('.' + classForm).append(`<div><label> Duration per<br />Memory<span class="mandatory"> *</span></label><input oninput="this.value = Math.abs(this.value)" id="` + nameForm + `Duration` + NumForm + `" type="number" name="` + nameForm + `Duration" class="k-textbox duration_memory" style="width: 5%;margin-left:8%;" placeholder="Ex. 5" value="0"/><span> second</span></div>`);
    $('.' + classForm).append(` <br /><div><label style="margin-top:20px;">Transition<span class="mandatory"> *</span></label><input value="0" oninput="this.value = Math.abs(this.value)" id="` + nameForm + `Transition` + NumForm + `" type="number" name="` + nameForm + `Transition" class="k-textbox duration_memory" style="width: 5%;margin-left:7%;" placeholder="Ex. 5" /><span> second</span></div>`);
    $('.' + classForm).append(`<label>Introduction</label><div style="padding-left:140px;padding-right:120px;"><textarea id="Introduction` + nameForm + `` + NumForm + `" name="Introduction` + nameForm + `` + NumForm + `" rows="2" cols="30" class="editor` + NumForm + `-wm-default" style="height:140px;width:80%;" aria-label="editor"></textarea></div>`);
    $('.' + classForm).append(`<label><input type="checkbox" id="` + nameForm + `PrefaceDisplay` + NumForm + `" name="` + nameForm + `PrefaceDisplay` + NumForm + `" onchange="DisplayPreface(this)" />
                                        Preface</label><div style="padding-left:140px;padding-right:120px;"><textarea id="` + nameForm + `Preface` + NumForm + `" name="` + nameForm + `Preface` + NumForm + `" rows="2" cols="30" class="editor` + NumForm + `-wm-default" style="height:140px;width:80%;" aria-label="editor"></textarea></div>`);
    $('.' + classForm).append(`<div style="padding-left:130px;padding-right:120px;margin:10px;" class="button_answer` + NumForm + `"><button class="k-button k-primary btn-form btn_answer" data-Noform="` + NumForm + `" nomor="3" id="add_working_memory` + NumForm + `" onclick="add_workingMultiple(this)">Add Memory</button><br /></div>`);
    $('.' + classForm).append(`<div class="memory_working_page` + NumForm + `">
                                    <label>Memory 1 <span class="mandatory">*</span></label>
                                    <div style="padding-left:140px;padding-right:120px;">
                                        <textarea id="`+ nameForm + `Text0-form` + NumForm + `" name="` + nameForm + `Text0-form` + NumForm + `" rows="2" cols="30" class="editor` + NumForm + `-wm-default" style="height:140px;width:80%;" aria-label="editor"></textarea>
                                    </div>
                                </div>
                                <div class="memory_working_page`+ NumForm + `">
                                    <label>Memory 2 <span class="mandatory">*</span></label>
                                    <div style="padding-left:140px;padding-right:120px;">
                                        <textarea id="`+ nameForm + `Text1-form` + NumForm + `" name="` + nameForm + `Text1-form` + NumForm + `" rows="2" cols="30" class="editor` + NumForm + `-wm-default" style="height:140px;width:80%;" aria-label="editor"></textarea>
                                    </div>
                                </div>
                                <div id="memory_working_page`+ NumForm + `">
                                <div class= "memory_working_page` + NumForm + `" id = "label2form` + NumForm + `AWM" > 
                                        <label>Memory 3</label>
                                        <a href="#" idDelete = "AWM" no="2" id="noms2" style="padding-left:65%;display: none;" onclick="clearFieldMultiFormWM(2, ` + NumForm + `, this);"><i class="fas fa-trash-alt"></i></a>
                                        <div style="padding-left:140px;padding-right:120px;">
                                        <textarea id="` + nameForm + `Text2-form` + NumForm + `" class="editor2-AWM" name="` + nameForm + `Text2-form` + NumForm + `" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" ></textarea>
                                        </div>
                                        <br />
                                        </div></br>
                                <div class= "memory_working_page` + NumForm + `" id = "label3form` + NumForm + `AWM" > 
                                        <label>Memory 4</label>
                                        <a href="#" idDelete = "AWM" no="3" id="noms3" style="padding-left:65%;" onclick="clearFieldMultiFormWM(3, ` + NumForm + `, this);"><i class="fas fa-trash-alt"></i></a>
                                        <div style="padding-left:140px;padding-right:120px;">
                                        <textarea id="` + nameForm + `Text3-form` + NumForm + `" class="editor3-AWM" name="` + nameForm + `Text3-form` + NumForm + `" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" ></textarea>
                                        </div>
                                        <br />
                                        </div></br>
                                </div>`);
    $('.' + classForm).append(`<label>Question<span class="mandatory">*</span></label><div style="padding-left:140px;padding-right:120px;"><textarea id="` + nameForm + `Question` + NumForm + `" name="` + nameForm + `Question` + NumForm + `" rows="2" cols="30" class="editor` + NumForm + `-wm-default" style="height:140px;width:80%;" aria-label="editor"></textarea></div>`);
    $('.' + classForm).append(`<div style="padding-left:140px;padding-right:120px;margin-top:5px;" class="button_answer` + NumForm + `"><button class="k-button k-primary btn-form btn_answer" data-Noform="` + NumForm + `" nomor="3" id="btn_answer_Working` + NumForm + `" onclick="add_answerWorkingMultiple(this)">Add Answer</button><br /><span>*Max. 7 Answer</span></div>`);
    $('.' + classForm).append(`<label> Answer Layout</label><input type="text" id="` + nameForm + `Layout` + NumForm + `" name="` + nameForm + `Layout` + NumForm + `" class="` + nameForm + `Layout" style="width:15%;" data-role="combobox" data-text-field="Value" data-value-field="Value" data-placeholder="Select Type..." data-bind="source:AnswerLayoutList , value:WorkingMemory.WorkingMemoryLayout" />`);
    $('.' + classForm).append(`<div class="answer_working_page` + NumForm + `">
                                    <label style="margin-right:50px;">Answer 1 <span class="mandatory">*</span></label>
                                    <div style="padding-left:140px;padding-right:120px;">
                                        <textarea id="`+ nameForm + `Answer0-form` + NumForm + `" name="` + nameForm + `Answer0-form` + NumForm + `" rows="2" cols="30" class="editor` + NumForm + `-wm-default" style="height:140px;width:80%;" aria-label="editor"></textarea>
                                    </div><br />
                                    <label>Correct Answer</label>
                                    <input type="radio" id="`+ nameForm + `Score0-form` + NumForm + `" name="` + nameForm + `Score-form` + NumForm + `" class="k-checkbox form-checkWM" /><br />
                                </div><br />
                                <div class="answer_working_page` + NumForm + `">
                                    <label>Answer 2 <span class="mandatory">*</span></label>
                                    <div style="padding-left:140px;padding-right:120px;">
                                        <textarea id="`+ nameForm + `Answer1-form` + NumForm + `" name="` + nameForm + `Answer1-form` + NumForm + `" rows="2" cols="30" class="editor` + NumForm + `-wm-default" style="height:140px;width:80%;" aria-label="editor"></textarea>
                                    </div><br />
                                    <label>Correct Answer</label>
                                    <input type="radio" id="`+ nameForm + `Score1-form` + NumForm + `" name="` + nameForm + `Score-form` + NumForm + `" class="k-checkbox form-checkWM"/><br />
                                </div><br />                                
                                <div id="answer_working_page` + NumForm + `">
                                    <div class= "answer_working_page` + NumForm + `" id = "label2form` + NumForm + `QWM" > 
                                    <label>Answer 3</label>
                                    <a href="#" idDelete = "QWM" no="2" id="noms2" style="padding-left: 65%; display: none;" onclick="clearFieldMultiFormWM(2, ` + NumForm + `, this);"><i class="fas fa-trash-alt"></i></a>
                                    <div style="padding-left:140px;padding-right:120px;">
                                    <textarea id="`+nameForm+`Answer2-form` + NumForm + `" class="editor2-QWM" name="` + nameForm + `Text2-form` + NumForm + `" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" ></textarea>
                                    </div>
                                    <br />
                                    <label>Correct Answer</label>
                                    <input type="radio" id="`+ nameForm + `Score2-form` + NumForm + `" name="` + nameForm + `Score-form` + NumForm + `" class="k-checkbox form-checkWM" /><br />
                                    </div></br>
                                <div class= "answer_working_page` + NumForm + `" id = "label3form` + NumForm + `QWM" > 
                                    <label>Answer 4</label>
                                    <a href="#" idDelete = "QWM" no="3" id="noms3" style="padding-left: 65%; display: none;" onclick="clearFieldMultiFormWM(3, ` + NumForm + `, this);"><i class="fas fa-trash-alt"></i></a>
                                    <div style="padding-left:140px;padding-right:120px;">
                                    <textarea id="`+ nameForm + `Answer3-form` + NumForm + `" class="editor3-QWM" name="` + nameForm + `Text3-form` + NumForm + `" rows="3" cols="30" style="height:140px;width:80%;" aria-label="editor" ></textarea>
                                    </div>
                                    <br />
                                    <label>Correct Answer</label>
                                    <input type="radio" id="`+ nameForm + `Score3-form` + NumForm + `" name="` + nameForm + `Score-form` + NumForm + `" class="k-checkbox form-checkWM" /><br />
                                    </div></br>
                                <div class= "answer_working_page` + NumForm + `" id = "label4form` + NumForm + `QWM" > 
                                    <label>Answer 5</label>
                                    <a href="#" idDelete = "QWM" no="4" id="noms4" style="padding-left: 65%;" onclick="clearFieldMultiFormWM(4, ` + NumForm + `, this);"><i class="fas fa-trash-alt"></i></a>
                                    <div style="padding-left:140px;padding-right:120px;">
                                    <textarea id="`+ nameForm + `Answer4-form` + NumForm + `" class="editor4-QWM" name="` + nameForm + `Text4-form` + NumForm + `" rows="3" cols="30" style="height:140px;width:80%;" aria-label="editor" ></textarea>
                                    </div>
                                    <br />
                                    <label>Correct Answer</label>
                                    <input type="radio" id="`+ nameForm + `Score4-form` + NumForm + `" name="` + nameForm + `Score-form` + NumForm + `" class="k-checkbox form-checkWM" /><br />
                                    </div></br>
                                </div>`);
    $('.' + classForm).append('<div>' +
        '<label>Explanation<span class="mandatory">*</span></label>' +
        '<div style="padding-left:140px;padding-right:120px;">' +
        '<textarea id="' + nameForm + 'Explaination' + NumForm + '" class="editor' + NumForm + '-wm-default" name="' + nameForm + 'Explaination' + NumForm + '" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor"></textarea>' +
        '</div>' +
        '<br />' +
        '</div></br>');
    $('.' + classForm).append(`<label>Disclaimer<span class="mandatory">*</span></label><div style="padding-left:140px;padding-right:120px;"><textarea id="` + nameForm + `Disclaimer` + NumForm + `" name="` + nameForm + `Disclaimer` + NumForm + `" rows="2" cols="30" class="editor` + NumForm + `-wm-default" style="height:140px;width:80%;" aria-label="editor"></textarea></div>`);
    $(`#` + nameForm + `Layout` + NumForm + ``).kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModels.CategoryAnswer,
        change: ChangeAnswerType
    });
    $(`#` + nameForm + `Layout` + NumForm + ``).kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: $("span#number-form").length <= 2 ? viewModel.AnswerLayoutList : viewModel.AnswerLayoutListMultiple[NumForm] == undefined ? viewModel.AnswerLayoutListMultiple[NumForm - 1] : viewModel.AnswerLayoutListMultiple[NumForm],
    });
    $(".editor" + NumForm + '-wm-default').kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });
    renderDefaultForm(NumForm);
}
function CreateViewFormVerbalMemory(NumForm, classForm) {
    var num = NumForm - 2;
    var QuestionNum = NumForm - 1;
    var nameForm = "VerbalMemory";
    $('.' + classForm).append(`<label>Title<span class="mandatory">*</span></label><input id="` + nameForm + `Title` + NumForm + `" type="text" name="` + nameForm + `Title` + NumForm + `" class="k-textbox ` + nameForm + `Title" style="width: 60%; margin-left:10%;" placeholder="Input Title Sample Verbal Memory"/>`)
    //$('.' + classForm).append(`<div><label>Story<span class="mandatory">*</span></label><div style="padding-left:140px;padding-right:120px;margin-bottom:5px;"><textarea id="` + nameForm + `Story` + NumForm + `" name="` + nameForm + `Story" rows="2" cols="30" class="editor` + NumForm + `-vm-default" style="height:140px;width:80%;" aria-label="editor" data-bind="value:verbalMemory.VerbalMemoryStory"></textarea></div></div>`);
    $('.' + classForm).append(`<div style="margin-top:15px;margin-botom:15px;">
                                        <label>Story Duration<span class="mandatory">*</span></label><input id="StoryDuration` + NumForm + `" type="number" min="0" oninput="this.value = Math.abs(this.value)" name="StoryDuration" class="k-textbox" style="width: 5%;margin-left:50px;" placeholder="30" data-bind="value:verbalMemory.StoryDuration" /><span> Second</span></div>`);
    $('.' + classForm).append(`<label>Question<span class="mandatory">*</span></label>
                                        <div style="padding-left:140px;padding-right:120px;"><textarea id="` + nameForm + `Question` + NumForm + `" name="` + nameForm + `Question" rows="2" cols="30" class="editor` + NumForm + `-vm-default" style="height:140px;width:80%;" aria-label="editor" data-bind="value:verbalMemory.VerbalMemoryQuestion"></textarea></div>`);
    $('.' + classForm).append(`<div style="padding-left:140px;padding-right:120px;margin:20px 0 20px 0;" class="button_answer` + NumForm + `"><button class="k-button k-primary btn-form btn_answer" data-Noform="` + NumForm + `" nomor="4" id="add_verbal_memory` + NumForm + `" onclick="add_verbalMultiple(this)" style="margin:'10px;'">Add Answer</button><br /><span>*Max. 7 Answer</span></div>`);
    $('.' + classForm).append(`<label style="margin-right:55px;"> Answer Layout</label><input type="text" id="` + nameForm + `Layout` + NumForm + `" name="` + nameForm + `Layout" class="` + nameForm + `Layout" style="width:15%;" data-role="combobox" data-text-field="Value" data-value-field="Value" data-placeholder="Select Type..." />`);
    $('.' + classForm).append(`<div class="answer_verbal_page` + NumForm + `">
                                        <label>Answer 1 <span class="mandatory">*</span></label><div style="padding-left:140px;padding-right:120px;">
                                        <textarea id="`+ nameForm + `Text0-form` + NumForm + `" name="` + nameForm + `Text0" rows="2" cols="30" class="editor` + NumForm + `-vm-default" style="height:140px;width:80%;" aria-label="editor"></textarea>
                                       </div><br />
                                        <label>Correct Answer</label>
                                            <input type="radio" id="score` + nameForm + `0-form` + NumForm + `-VM" name="score` + nameForm + NumForm + `" value="0" "class="k-checkbox form-checkVM"/><br />
                                        </div>
                                       <div class="answer_verbal_page` + NumForm + `">
                                        <label>Answer 2 <span class="mandatory">*</span></label>
                                        <div style="padding-left:140px;padding-right:120px;">
                                        <textarea id="`+ nameForm + `Text1-form` + NumForm + `" name="` + nameForm + `Text1-form` + NumForm + `" rows="2" cols="30" class="editor` + NumForm + `-vm-default" style="height:140px;width:80%;" aria-label="editor"></textarea>
                                        </div><br />
                                           <label>Correct Answer</label>
                                           <input type="radio" id="score` + nameForm + `1-form` + NumForm + `-VM" name="score` + nameForm + NumForm + `" value="1" "class="k-checkbox form-checkVM"/><br />
                                        </div>                                                                             
                                        <div id="answer_verbal_page` + NumForm + `">
                                            <div class= "answer_verbal_page` + NumForm + `" id = "label2form` + NumForm + `VM" > 
                                            <label>Answer 3</label>
                                            <a href="#" idDelete = "VM" no="2" id="noms2" style="padding-left:65%; display: none;" onclick="clearFieldMultiForm(2, ` + NumForm + `, this);"><i class="fas fa-trash-alt"></i></a>
                                            <div style="padding-left:140px;padding-right:120px;">
                                            <textarea id="` + nameForm + `Text2-form` + NumForm + `" class="editor2-VM" name="` + nameForm + `Text2-form` + NumForm + `" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" ></textarea>
                                            </div>
                                            <br />
                                            <label>Correct Answer</label>
                                            <input type="radio" id="score` + nameForm + `2-form` + NumForm + `-VM" name="score`+ nameForm + NumForm + `" class="k-checkbox form-checkVM" /><br />
                                            </div></br>
                                        <div class= "answer_verbal_page` + NumForm + `" id = "label3form` + NumForm + `VM" > 
                                            <label>Answer 4</label>
                                            <a href="#" idDelete = "VM" no="3" id="noms3" style="padding-left:65%; display: none;" onclick="clearFieldMultiForm(3, ` + NumForm + `, this);"><i class="fas fa-trash-alt"></i></a>
                                            <div style="padding-left:140px;padding-right:120px;">
                                            <textarea id="` + nameForm + `Text3-form` + NumForm + `" class="editor3-VM" name="` + nameForm + `Text3-form` + NumForm + `" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" ></textarea>
                                            </div>
                                            <br />
                                            <label>Correct Answer</label>
                                            <input type="radio" id="score` + nameForm + `3-form` + NumForm + `-VM" name="score` + nameForm + NumForm + `" class="k-checkbox form-checkVM" /><br />
                                            </div></br>
                                        <div class= "answer_verbal_page` + NumForm + `" id = "label4form` + NumForm + `VM" > 
                                            <label>Answer 5</label>
                                            <a href="#" idDelete = "VM" no="4" id="noms4" style="padding-left:65%;" onclick="clearFieldMultiForm(4, ` + NumForm + `, this);"><i class="fas fa-trash-alt"></i></a>
                                            <div style="padding-left:140px;padding-right:120px;">
                                            <textarea id="` + nameForm + `Text4-form` + NumForm + `" class="editor4-VM" name="` + nameForm + `Text4-form` + NumForm + `" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" ></textarea>
                                            </div>
                                            <br />
                                            <label>Correct Answer</label>
                                            <input type="radio" id="score` + nameForm + `4-form` + NumForm + `-VM" name="score` + nameForm + NumForm + `" class="k-checkbox form-checkVM" /><br />
                                            </div></br>
                                        </div>`);
    $('.' + classForm).append('<div>' +
        '<label>Explanation<span class="mandatory">*</span></label>' +
        '<div style="padding-left:140px;padding-right:120px;">' +
        '<textarea id="' + nameForm + 'Explaination' + NumForm + '" class="editor' + NumForm + '-vm-default" name="' + nameForm + 'Explaination' + NumForm + '" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" data-bind="value:' + nameForm + '.MoreForm[' + num + '].' + nameForm + '.' + nameForm + 'Explaination"></textarea>' +
        '</div>' +
        '<br />' +
        '</div></br>');
    $('.' + classForm).append(`<label>Disclaimer<span class="mandatory">*</span></label><div style="padding-left:140px;padding-right:120px;"><textarea id="` + nameForm + `Disclaimer` + NumForm + `" name="` + nameForm + `Disclaimer" rows="2" cols="30" class="editor` + NumForm + `-vm-default" style="height:140px;width:80%;" aria-label="editor" data-bind="value: WorkingMemory.WorkingMemoryDisclaimer"></textarea></div>`);
    $(`#` + nameForm + `Layout` + NumForm + ``).kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: viewModels.CategoryAnswer,
        change: ChangeAnswerType
    });
    $(`#` + nameForm + `Layout` + NumForm + ``).kendoComboBox({
        dataTextField: "Value",
        dataValueField: "Code",
        dataSource: $("span#number-form").length <= 2 ? viewModel.AnswerLayoutList : viewModel.AnswerLayoutListMultiple[NumForm] == undefined ? viewModel.AnswerLayoutListMultiple[NumForm - 1] : viewModel.AnswerLayoutListMultiple[NumForm],
    });
    $(".editor" + NumForm + '-vm-default').kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });
    renderDefaultForm(NumForm);
}

function onSelect(e) {
    var dataItem = e.dataItem;
    console.log("event :: select (" + dataItem.text + " : " + dataItem.value + ")");
};
function ChangeAnswerType(source) {
    var NumForm = source.sender.element[0].attributes[1].value;
    var value = source.sender._selectedValue;
    var check_value = source == undefined ? "" : source.sender._selectedValue;
    getListdropdownAnswer(value, NumForm);
    var layoutList = check_value == "AT19000002" ? viewModel.AnswerLayoutListMultiple[NumForm] : viewModel.AnswerLayoutList
    console.log("LAYOUT LIST INDEX 0", layoutList[0])
    $('#typeLayout' + NumForm).data("kendoComboBox").value(layoutList[0].value);
    var combobox = $("#typeLayout" + NumForm).data("kendoComboBox");
    combobox.select(0);
    combobox.trigger("change");

}

function getListdropdownAnswer(value, NumForm) {
    LoadingMask.show();
    var x = value;
    var Key = value == undefined ? viewModels.Key : x;
    $.ajax({
        type: 'POST',
        async: false,
        url: SERVICE_URL + "api/Dropdown/AnswerLayout",
        headers: { "Authorization-Token": Cookie.load() },
        data: { Key: Key },
        success: function (response) {
            LoadingMask.hide();
            viewModel.set(`AnswerLayoutListMultiple`, []);
            if (x == undefined) {
                var dtlayout = {};
                dtlayout[1] = response.Data;
                viewModel.set(`AnswerLayoutListMultiple`, dtlayout);
                //viewModel.set("typeLayout", response.Data[0].Code);
            } else {
                var dtlayout = {};
                var dtType = {};
                dtType[NumForm] = response.Data[0].Code;
                dtlayout[NumForm] = response.Data;
                viewModel.set(`AnswerLayoutListMultiple`, dtlayout);
                //viewModel.set("typeLayout", response.Data[0].Code);
                //viewModel.set(`typeLayoutListMultiple`, dtType);

            }
            if (Key == "AT19000001") {
                $('.button_answer' + NumForm).removeAttr('hidden', 'hidden');
                $(`.add_sample` + NumForm + ``).show();
                $(`.add_image` + NumForm + ``).hide();
                $(`#add_sample` + NumForm + ``).show();
                $(`#add_image` + NumForm + ``).hide();
                $(`#typeLayout` + NumForm + ``).kendoComboBox({
                    dataTextField: "Value",
                    dataValueField: "Code",
                    dataSource: NumForm == undefined ? viewModel.AnswerLayoutListMultiple[1] : viewModel.AnswerLayoutListMultiple[NumForm]

                });
                if (NumForm == undefined) {
                    $(`.button_image`).attr('hidden', true);
                    //$('#btn_answer').removeAttr('nomor');
                    //$('#btn_answer').attr('nomor', 1);
                    $(`#btn_image`).css({ "display": "inline" });
                    $(`.button_answer`).attr('hidden', true);
                } else {
                    //$(`.button_image` + NumForm + ``).attr('hidden', true);
                    $(`.button_image` + NumForm + ``).attr('hidden', true);
                    //$('#btn_answer').removeAttr('nomor');
                    //$('#btn_answer').attr('nomor', 1);
                    $(`#btn_image` + NumForm + ``).css({ "display": "inline" });
                    //$(`.button_answer` + NumForm + ``).attr('hidden', true);
                    $('.button_answer' + NumForm).show();
                }
                var checkNum = $(`.add_sample` + `` + NumForm + ``).length;
                $('#btn_answer' + NumForm).removeAttr('nomor');
                $('#btn_answer' + NumForm).attr('nomor', checkNum-1);
            }
            else {
                //$('.button_answer' + NumForm).attr('hidden', true);
                $(`.add_sample` + NumForm + ``).hide();
                $(`.add_image` + NumForm + ``).show();
                $(`#add_sample` + NumForm + ``).hide();
                $(`#add_image` + NumForm + ``).show();
                $(`#typeLayout` + NumForm + ``).kendoComboBox({
                    dataTextField: "Value",
                    dataValueField: "Code",
                    dataSource: viewModel.AnswerLayoutListMultiple[NumForm]
                });
                //$(`.button_image` + NumForm + ``).removeAttr('hidden', 'hidden');
                $(`.button_image` + NumForm + ``).show();
                var checkNum = $(`.add_image` + `` + NumForm + ``).length;
                $('#btn_answer' + NumForm).removeAttr('nomor');
                $('#btn_answer' + NumForm).attr('nomor', checkNum-1);
                $(`#btn_image` + NumForm + ``).css({ "display": "inline" });
                //$(`.button_answer` + NumForm + ``).attr('hidden', true);
            }
        },
        fail: function (xhr, textStatus, errorThrown) {
            LoadingMask.hide();
            console.log('request failed');
            console.log(xhr);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

}

function add_answerMultiple(id, editAnswerCode) {
    var nomor = $(id).attr('nomor');
    var NumForm = $(id).attr('data-Noform');
    var idAttr = $(`#btn_answer` + NumForm + ``).attr('id');
    var count = parseInt(nomor) + 1;
    var no = count + 1;
    var typeAnswer = editAnswerCode == undefined ? $('#typeAnswer' + NumForm).val() : editAnswerCode
    var nameForm = localStorage.getItem("QuestionCategory") == "NORMAL" ? "SampleNormal" : localStorage.getItem("QuestionCategory") == "WORKINGMEMORY" ? "WorkingMemory" : "VerbalMemory";
    if (typeAnswer == "AT19000001") {
        $(`#add_sample` + NumForm + ``).append('<div class="add_sample' + NumForm + '" id="label' + count + 'form' + NumForm + 'NM">' +
            '<label>Answer ' + no + '</label>' +
            '<a href="#" no="' + count + '" idDelete = "NM" id="noms' + count + '" style="padding-left:65%;" onclick="clearFieldMultiForm(' + count + ', ' + NumForm + ', this);"><i class="fas fa-trash-alt"></i></a>' +
            '<div style="padding-left:140px;padding-right:120px;">' +
            '<textarea id="NormalAnswerText' + count + '-form' + NumForm + '-NM" class="editor' + count + '-NM" name="NormalAnswerText' + count + '" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" data-bind="value:' + nameForm + '.NormalText[' + count + '].NormalAnswerText"></textarea>' +
            '</div>' +
            '<br />' +
            '<label>Correct Answer</label>' +
            '<input type="radio" id="NormalScoreText'+count+'-form' + NumForm + '-NM" name="NormalScoreText' + NumForm + '" class="k-checkbox form-check"/><br />' +
            '</div></br>');
        $("#label" + count + "form" + NumForm + "NM textarea.editor" + count + '-NM').kendoEditor({
            resizable: {
                content: true
            },
            encoded: false
        });
        checkField("btn_answer", NumForm, count)
    } else {
        $('.button_image' + NumForm + ' > #add_image' + NumForm).append('<div class="add_image'+NumForm+'" id="label' + count + 'form' + NumForm + 'NM">' +
            '<label>Answer ' + no + '</label><br />' +
            '<a href="#" no="' + count + '" idDelete = "NM" id="nom' + count + '" style="padding-left:30%;" onclick="clearFieldMultiFormImg(' + count + ', ' + NumForm + ', this);" ><i class="fas fa-trash-alt"></i></a><br/>' +
            '<label style="padding-left:180px;padding-right:120px;">' +
            '<label>' +
            '<img id="mediaPic' + no + '" src="" hidden="hidden" />' +
            '<img id="mediaDisplay' + no + '" src="" class="backImage media' + no + '-form' + NumForm + '" width="100%" height="100%" />' +
            '<input name="media' + no + '" id="media' + no + '-form' + NumForm + '" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.mediaImageChange(this, this.files)" />' +
            '</label>' +
            '<input type="hidden" id="mediaId' + no + '" name="mediaId' + no + '" value="0" />' +
            '<a href="#" class="k-button" style="display: none" onclick="viewModel.mediaImageRemove(this)" style="margin-right:25%;float:right;"><span class="fas fa-trash-alt"></span></a>' +
            '</label>' +
            '<br />' +
            '<label style="padding-left:180px;padding-right:120px;">' +
            '<span>* Max file size 2Mb</span><br />' +
            '</label>' +
            '<br />' +
            '<label>Correct Answer</label>' +
            '<input type="radio" id="NormalScoreImage' + count + '-form' + NumForm + '-NM" name="NormalScoreImage' + NumForm + '" class="k-checkbox form-check" data-bind="checked:' + nameForm + '.NormalScoreImage" value="' + count + '"/><br />' +
            '</div></br>');
        checkFieldNormalimage("btn_answer", NumForm, count)
    }
}
function add_workingMultiple(id) {
    var nomor = $(id).attr('nomor');
    var NumForm = $(id).attr('data-Noform');
    var idAttr = $(`#btn_answer` + NumForm + ``).attr('id');
    var count = parseInt(nomor) + 1;
    var no = count + 1;
    var typeAnswer = $('#typeAnswer' + NumForm).val();
    var nameForm = localStorage.getItem("QuestionCategory") == "NORMAL" ? "SampleNormal" : localStorage.getItem("QuestionCategory") == "WORKINGMEMORY" ? "WorkingMemory" : "VerbalMemory";
    $('#memory_working_page' + NumForm).append('<div class= "memory_working_page' + NumForm + '" id = "label' + count + 'form' + NumForm + 'AWM" > ' +
        '<label>Memory ' + no + '</label>' +
        '<a href="#" idDelete = "AWM" no="' + count + '" id="noms' + count + '" style="padding-left:65%;" onclick="clearFieldMultiFormWM(' + count + ', ' + NumForm + ', this);"><i class="fas fa-trash-alt"></i></a>' +
        '<div style="padding-left:140px;padding-right:120px;">' +
        '<textarea id="' + nameForm + 'Text' + count + '-form' + NumForm + '" class="editor' + count + '-AWM" name="' + nameForm + 'Text' + count + '-form' + NumForm + '" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" ></textarea>' +
        '</div>' +
        '<br />' +
        '</div></br>');
    $("#label" + count + "form" + NumForm + "AWM textarea.editor" + count + '-AWM').kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });
    checkField("add_working_memory", NumForm, count)
}
function add_answerWorkingMultiple(id) {
    var nomor = $(id).attr('nomor');
    var NumForm = $(id).attr('data-Noform');
    var idAttr = $(`#btn_answer` + NumForm + ``).attr('id');
    var count = parseInt(nomor) + 2;
    var no = count + 1;
    var typeAnswer = $('#typeAnswer' + NumForm).val();
    var nameForm = "WorkingMemoryAnswer";
    var nameCheck = "WorkingMemoryScore";
    $('#answer_working_page' + NumForm).append('<div class= "answer_working_page' + NumForm + '" id = "label' + count + 'form' + NumForm + 'QWM" > ' +
        '<label>Answer ' + no + '</label>' +
        '<a href="#" idDelete = "QWM" no="' + count + '" id="noms' + count + '" style="padding-left:65%;" onclick="clearFieldMultiFormWM(' + count + ', ' + NumForm + ', this);"><i class="fas fa-trash-alt"></i></a>' +
        '<div style="padding-left:140px;padding-right:120px;">' +
        '<textarea id="' + nameForm + count + '-form' + NumForm + '" class="editor' + count + '-QWM" name="' + nameForm + 'Text' + count + '-form' + NumForm + '" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" ></textarea>' +
        '</div>' +
        '<br />' +
        '<label>Correct Answer</label>' +
        '<input type="radio" id="' + nameCheck + count + '-form' + NumForm + '" name="' + nameCheck + '-form' + NumForm + '" class="k-checkbox form-checkWM" /><br />' +
        '</div></br>');
    $("#label" + count + "form" + NumForm + "QWM textarea.editor" + count + '-QWM').kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });
    checkField("btn_answer_Working", NumForm, count)
}
function add_verbalMultiple(id) {
    var nomor = $(id).attr('nomor');
    var NumForm = $(id).attr('data-Noform');
    var count = parseInt(nomor) + 1;
    var no = count + 1;
    var nameForm = localStorage.getItem("QuestionCategory") == "NORMAL" ? "SampleNormal" : localStorage.getItem("QuestionCategory") == "WORKINGMEMORY" ? "WorkingMemory" : "VerbalMemory";
    $('#answer_verbal_page' + NumForm).append('<div class= "answer_verbal_page' + NumForm + '" id = "label' + count + 'form' + NumForm + 'VM" > ' +
        '<label>Answer ' + no + '</label>' +
        '<a href="#" idDelete = "VM" no="' + count + '" id="noms' + count + '" style="padding-left:65%;" onclick="clearFieldMultiForm(' + count + ', ' + NumForm + ', this);"><i class="fas fa-trash-alt"></i></a>' +
        '<div style="padding-left:140px;padding-right:120px;">' +
        '<textarea id="' + nameForm + 'Text' + count + '-form' + NumForm + '" class="editor' + count + '-VM" name="' + nameForm + 'Text' + count + '-form' + NumForm + '" rows="2" cols="30" style="height:140px;width:80%;" aria-label="editor" ></textarea>' +
        '</div>' +
        '<br />' +
        '<label>Correct Answer</label>' +
        '<input type="radio" id="score' + nameForm + count + '-form' + NumForm + '-VM" name="score' + nameForm + NumForm + '" class="k-checkbox form-checkVM" /><br />' +
        '</div></br>');
    $("#label" + count + "form" + NumForm + "VM textarea.editor" + count + '-VM').kendoEditor({
        resizable: {
            content: true
        },
        encoded: false
    });
    checkField("add_verbal_memory", NumForm, count)
}
function checkField(type, NumForm, count) {
    var nameField = localStorage.getItem("QuestionCategory") == "NORMAL" ? "add_sample" : localStorage.getItem("QuestionCategory") == "VERBALMEMORY" ? 'answer_verbal_page' : localStorage.getItem("QuestionCategory") == "WORKINGMEMORY" && type == "add_working_memory" ? "memory_working_page" : "answer_working_page"
    if (nameField == "memory_working_page" || nameField == "answer_working_page") {
        var id = nameField == "memory_working_page" ? "AWM" : "QWM";
    } else {
        var id = localStorage.getItem("QuestionCategory") == "NORMAL" ? "NM" : "VM";
    }
    
    $(`#` + type + `` + NumForm + ``).removeAttr('nomor');
    $(`#` + type + `` + NumForm + ``).attr('nomor', nameField == "answer_working_page" ? (count - 1) : count);
    var check = $(`.` + nameField + `` + NumForm + ``).length;
    if (check > 3) {
        $('#' + nameField + NumForm + ' > #label' + '' + (count == 2 ? count : (count - 1)) + 'form' + NumForm + id + ' > #noms' + '' + (count == 2 ? count : (count - 1))).hide();
    }
    var addbtn = id == "NM" ? "btn_answer" : id == "QWM" ? "btn_answer_Working" : "";
    if (check > 6 && nameField !== "memory_working_page") {
        $('#' + addbtn + NumForm).hide();
    }
}
function checkFieldNormalimage(type, NumForm, count) {
    var nameField = localStorage.getItem("QuestionCategory") == "NORMAL" ? "add_image" : localStorage.getItem("QuestionCategory") == "VERBALMEMORY" ? 'answer_verbal_page' : localStorage.getItem("QuestionCategory") == "WORKINGMEMORY" && type == "add_working_memory" ? "memory_working_page" : "answer_working_page"
    if (nameField == "memory_working_page" || nameField == "answer_working_page") {
        var id = nameField == "memory_working_page" ? "AWM" : "QWM";
    } else {
        var id = localStorage.getItem("QuestionCategory") == "NORMAL" ? "NM" : "VM";
    }
    $(`#` + type + `` + NumForm + ``).removeAttr('nomor');
    var totalField = $(`.` + nameField + `` + NumForm + ``).length;
    $(`#` + type + `` + NumForm + ``).attr('nomor', (totalField-1));
    if (totalField > 3) {
        $('#' + nameField + NumForm + ' > #label' + '' + (count == 2 ? count : (count - 1)) + 'form' + NumForm + id + ' > #nom' + '' + (count == 2 ? count : (count - 1))).hide();
    }    
    var addbtn = id == "NM" ? "btn_answer" : id == "QWM" ? "btn_answer_Working" : "add_verbal_memory";

    if (totalField > 7 && nameField !== "memory_working_page") {
        $('#' + addbtn + NumForm).hide();
    }
}
function clearFieldMultiForm(count, NumForm, id) {
    var id = $(id).attr('idDelete');
    var idDelete = id == "NM" ? "btn_answer" : "add_verbal_memory"
    var idForm = id == "NM" ? "add_sample" : "answer_verbal_page"
    var idAttr = $(`#` + idDelete + `` + NumForm + ``).attr('id');
    var label = 'label';
    var nom = 'noms';
    $('#' + idForm + NumForm + ' > #' + label + '' + count + 'form' + NumForm + id).remove();
    $('#' + idForm + NumForm + ' > #' + label + '' + (count == 2 ? count : (count - 1)) + 'form' + NumForm + id + ' > #' + nom + '' + (count == 2 ? count : (count - 1))).show();
    $('#' + idAttr).removeAttr('nomor');
    $('#' + idAttr).attr('nomor', (count - 1));
    $('#' + idAttr).css({ "display": "inline" });
    var totalField = $(`.` + idForm + `` + NumForm + ``).length;
    if (totalField < 7) {
        $('#' + idDelete + NumForm).show();
    }
    //return;
}
function clearFieldMultiFormWM(count, NumForm, id) {
    var id = $(id).attr('idDelete');
    var idDelete = id == "QWM" ? "btn_answer_Working" : id == "AWM" ? "add_working_memory" : null
    var idForm = id == "QWM" ? "answer_working_page" : id == "AWM" ? "memory_working_page" : null
    var idAttr = $(`#` + idDelete + `` + NumForm + ``).attr('id');
    var label = 'label';
    var nom = 'noms';
    $('#' + idForm + NumForm + ' > #' + label + '' + count + 'form' + NumForm + id).remove();
    $('#' + idForm + NumForm + ' > #' + label + '' + (count == 2 ? count : (count - 1)) + 'form' + NumForm + id + ' > #' + nom + '' + (count == 2 ? count : (count - 1))).show();
    $('#' + idAttr).removeAttr('nomor');
    $('#' + idAttr).attr('nomor', id == "AWM" ? (count - 1) : (count - 2));
    $('#' + idAttr).css({ "display": "inline" });
    var addbtn = id == "QWM" ? "btn_answer_Working" : "";
    var field = id == "QWM" ? "answer_working_page" : "";
    var totalField = $(`.` + field + `` + NumForm + ``).length;
    if (totalField < 7) {
        $('#' + addbtn + NumForm).show();
    }
    //return;
}
function clearFieldMultiFormImg(count, NumForm) {
    var idAttr = $(`#btn_answer` + NumForm + ``).attr('id');
    var label = 'label';
    var nom = 'nom';
    var codeForm = localStorage.getItem("QuestionCategory") == "NORMAL" ? "NM" : localStorage.getItem("QuestionCategory") == "WORKINGMEMORY" ? "WM" : "VM";
    $('#add_image' + NumForm + ' > #' + label + '' + count + 'form' + NumForm + codeForm).remove();
    $('#add_image' + NumForm + ' > #' + label + '' + (count == 2 ? count : (count - 1)) + 'form' + NumForm + 'NM > #' + nom + '' + (count == 2 ? count : (count - 1))).show();
    $('#' + idAttr).removeAttr('nomor');
    $('#' + idAttr).attr('nomor', (count - 1));
    $('#' + idAttr).css({ "display": "inline" });
    var addbtn = `#btn_answer` + NumForm;
    var totalField = $(`.add_image` + NumForm).length;
    if (totalField < 6) {
        $('#' + addbtn).show();
    }
    //return;
}
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return results[1] || 0;
    }
}
function renderDefaultForm(NumForm) {
    var nameForm = localStorage.getItem("QuestionCategory")
    if (nameForm == "NORMAL") {
       for (i = 2; i < 7; i++) {
            $("#label" + i + "form" + NumForm + "NM textarea.editor" + i + '-NM').kendoEditor({
                resizable: {
                    content: true
                },
                encoded: false
            });
        }
    } else if (nameForm == "WORKINGMEMORY") {
        for (i = 2; i < 4; i++) {
            $("#label" + i + "form" + NumForm + "AWM textarea.editor" + i + '-AWM').kendoEditor({
                resizable: {
                    content: true
                },
                encoded: false
            });
        }        
        for (i = 2; i < 7; i++) {
            $("#label" + i + "form" + NumForm + "QWM textarea.editor" + i + '-QWM').kendoEditor({
                resizable: {
                    content: true
                },
                encoded: false
            });
        }   
    } else {
        for (i = 2; i < 7; i++) {
            $("#label" + i + "form" + NumForm + "VM textarea.editor" + i + '-VM').kendoEditor({
                resizable: {
                    content: true
                },
                encoded: false
            });
        }        
    }
}