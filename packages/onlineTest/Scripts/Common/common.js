/*--------------------------------------------------*/
/*                  Ajax Setup                      */
/*--------------------------------------------------*/
$.support.cors = true;
$.ajaxSetup({
    dataType: "json"
});
 
/*--------------------------------------------------*/
/*                  MessageBox                      */
/*--------------------------------------------------*/
// Show Message box Popup with onClose function 
MessageBox = {
    show: function (title, message, onClose, listButton) {
        if ($("body").find("#messageBox").length >= 1) {
            $("#messageBox").data("kendoWindow").destroy();
            $("body").find("#messageBox").remove();
        }

        message = message.replace("\n", "<br />");
        var button = "";
        if (listButton != null || listButton != undefined) {
            for (var i = 0; i < listButton.length; i++) {
                button += "<button class='k-button' style='width: 80px; margin: 0px 5px 0 5px;' onclick='" + listButton[i].event.toString() + "'>" + listButton[i].text + "</button>";
            }
        }
        else {
            button = "<button class='k-button' style='width: 80px;' onclick='MessageBox.hide(this)'>OK</button>";
        }

        $("body").append("<div id='messageBox'>" +
            "<div class='message-text'><span>" + message + "</span></div>" +
            "<div class='message-button'>" + button + "</div>" +
            "</div>");

        if ((listButton != null || listButton != undefined) && listButton.length > 1) {
            $(document.getElementsByClassName("message-text")).css("text-align", "left");
            $("#messageBox").kendoWindow({
                actions: [],
                width: "400px",
                minHeight: "100px",
                title: title,
                resizable: false,
                modal: true
            });
        }
        else {
            $("#messageBox").kendoWindow({
                width: "400px",
                minHeight: "100px",
                title: title,
                resizable: false,
                modal: true,
                close: onClose
            });
        }

        $("#messageBox").data("kendoWindow").center().open();
        $("#messageBox").focus();
    },
    hide: function () {
        $("#messageBox").data("kendoWindow").close();
    }
}

/*--------------------------------------------------*/
/*                 Loading Mask                     */
/*--------------------------------------------------*/
LoadingMask = {
    show: function () {
        if ($("body").find("#loadingMask").length < 1) {
            $("body").append("<div id='loadingMask'><table width='100%' height='100%'><tr style='height:80%; text-align:center'><td><center><div class='loading'></div><br /><span>Loading...</span></center></td></tr></table></div>");
            $("#loadingMask").kendoWindow({
                width: "200px",
                height: "150px",
                title: false,
                resizable: false,
                modal: true
            });
        }

        $("#loadingMask").data("kendoWindow").center().open();
    },
    hide: function () {
        if ($("body").find("#loadingMask").length >= 1) {
            $("#loadingMask").data("kendoWindow").close();
        }
    }
}

/*--------------------------------------------------*/
/*                      Cookie                      */
/*--------------------------------------------------*/
Cookie = {
    save: function (token, company, menuName) {
        var expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() + 1);
        var ctoken_value = escape(token) + "; expires=" + expiredDate.toUTCString() + "; path=/";
        var ccompany_value = escape(company) + "; expires=" + expiredDate.toUTCString() + "; path=/";
        document.cookie = "ahs_id=" + ctoken_value;
        document.cookie = "Company=" + ccompany_value;

        window.location.href = menuName;
    },
    load: function () {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" ahs_id=");

        if (c_start == -1) {
            c_start = c_value.indexOf("ahs_id=");
        }
        if (c_start == -1) {
            c_value = null;
            //alert("Your Session has expired. Please relogin");
            MessageBox.show("Error","Your Session has expired. Please relogin");
            if (parent) {
                parent.window.location.href = LOGIN_PAGE;//DOMAIN_URL + "/Views/Default/Login.html";
            }
            else {
                window.location.href = LOGIN_PAGE;//DOMAIN_URL + "/Views/Default/Login.html";
            }
        }
        else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = c_value.length;
            }

            c_value = unescape(c_value.substring(c_start, c_end));
        }

        return c_value;
    },
    remove: function () {
        var expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() - 1);
        var ctoken_value = "; expires=" + expiredDate.toUTCString() + "; path=/";
        document.cookie = "ahs_id=" + ctoken_value;
    },
    getUser: function () {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" ahs_id=");

        if (c_start == -1) {
            c_start = c_value.indexOf("ahs_id=");
        }
        if (c_start == -1) {
            c_value = null;
            //alert("Your Session has expired. Please relogin");
            MessageBox.show("Error","Your Session has expired. Please relogin");
            if (parent) {
                parent.window.location.href = DOMAIN_URL + "/Views/Default/Login.html";
            }
            else {
                window.location.href = DOMAIN_URL + "/Views/Default/Login.html";
            }
        }
        else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = c_value.length;
            }

            c_value = unescape(c_value.substring(c_start, c_end));
        }

        return c_value;
    },
    getWithoutExpired: function (param) {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + param + "=");

        if (c_start == -1) {
            c_start = c_value.indexOf(param + "=");
        }
        if (c_start == -1) {
            c_value = null;
        }
        else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = c_value.length;
            }

            c_value = unescape(c_value.substring(c_start, c_end));
        }

        return c_value;
    }
}

// Check User Agent Mobile
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    iOSChrome: function () {
        return navigator.userAgent.match(/CriOS/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.iOSChrome() || isMobile.Opera() || isMobile.Windows());
    }
}

// Get query string from url
GetParameterByName = function (name) {
    var url = document.URL.replace("#", ""),
        url_query = url.split("?").length > 1 ? url.split("?")[1] : "",
        count = url_query.indexOf(name);

    if (count > -1) {
        var sub = url_query.substring(count);
        var amper = sub.indexOf("&");

        if (amper == "-1") {
            var param = sub.split("=");
            return param[1];
        } else {
            var param = sub.substr(0, amper).split("=");
            return param[1];
        }
    }
    else {
        return "";
    }
}

// Get Base 64 string from image
GetBase64Image = function (image) {
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    var ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0);

    var dataUrl = canvas.toDataURL();
    //var result = dataUrl.replace("data:image/(png|jpg);base64,","");

    return dataUrl;
}

// Initialize Attachment Files
InitializeFiles = function (initialFiles, downloadUrl) {
    if (initialFiles.length > 0) {
        var htmlappend = "";
        $(document.getElementsByClassName("k-upload")).removeClass("k-upload-empty");
        $(document.getElementsByClassName("k-upload")).append("<ul class='k-upload-files k-reset'></ul>");
        for (var i = 0; i < initialFiles.length; i++) {
            htmlappend = "<li class='k-file k-file-success'>" +
                "<span class='k-progress' style='width: 100%;'></span>" +
                "<span class='k-icon k-i-" + initialFiles[i].extension.replace(".", "") + "'></span>" +
                "<span class='k-filename' title='" + initialFiles[i].name + "'><a href='" + downloadUrl + "&file=" + initialFiles[i].name + "'>" + initialFiles[i].name + "</a></span>" +
                "</li>";
            $(document.getElementsByClassName("k-upload-files")).append(htmlappend);
        }
    }
}

post_to_url = function (path, params, method) {
    method = method || "post";

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        if (params.hasOwnProperty(key) && params[key] != null) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

/*--------------------------------------------------*/
/*             Popup Filter Detail                  */
/*--------------------------------------------------*/
FilterHandler = function () {
    $("#filterDetail").data("kendoWindow").bind("open", function () {
        $("html").click(function (e) {
            if (e.target.id != "filterDetail" && e.target.id != "searchOption" && $(e.target).parents("#filterDetail").length == 0) {
                $('#filterDetail').data('kendoWindow').close();
            }
        });
    });
    $("#filterDetail").data("kendoWindow").bind("close", function () {
        $("html").off("click");
        viewModel.set("isFilterDetailOpen", false);
    });
}

var MasterStatus = [{
    StatusId: 0,
    StatusName: "Waiting Interview"
}, {
    StatusId: 1,
    StatusName: "Waiting Scheduling"
}, {
    StatusId: 2,
    StatusName: "Cancel by Candidate"
}, {
    StatusId: 3,
    StatusName: "Interview Passed"
}, {
    StatusId: 4,
    StatusName: "Interview Failed"
}, {
    StatusId: 5,
    StatusName: "Reject (Back to HO)"
}, {
    StatusId: 5,
    StatusName: "Force Call"
}];

var MasterStatusMCU = [{
    StatusId: 0,
    StatusName: "Waiting MCU"
}, {
    StatusId: 1,
    StatusName: "Waiting MCU Result"
}, {
    StatusId: 2,
    StatusName: "Failed MCU"
}, {
    StatusId: 3,
    StatusName: "Passed MCU"
}, {
    StatusId: 4,
    StatusName: "Cancel by Candidate MCU"
}];


var MasterStatusPsychoTest = [{
    StatusId: 0,
    StatusName: "Failed Psycho Test"
}, {
    StatusId: 1,
    StatusName: "Cancel by Candidate Psycho Test"
}, {
    StatusId: 2,
    StatusName: "Prescreen"
}];

var MasterManPowerStatus = [{
    StatusId: 0,
    StatusName: "Assigned"
}, {
    StatusId: 1,
    StatusName: "Inprogress"
}, {
    StatusId: 2,
    StatusName: "Completed"
}];

var MasterGender = [{
    GenderId: 0,
    GenderName: "Pria"
}, {
    GenderId: 1,
    GenderName: "Wanita"
}];

var MasterSimpleStatus = [{
    StatusId: 0,
    StatusName: "Pass"
}, {
    StatusId: 1,
    StatusName: "Failed"
}, {
    StatusId: 2,
    StatusName: "Cancel by Candidate Psycho Test"
}, {
    StatusId: 3,
    StatusName: "Prescreen"
}, {
    StatusId: 4,
    StatusName: "Failed Psycho Test"
}];


CallPopUp = function (path, width, height) {
    var windowElement = $("#window").kendoWindow({
        iframe: true,
        resizable: true,
        draggable: true,
        width: width + "%",
        height: height + "%",
        content: path
    });

    var iframeDomElement = windowElement.children("iframe")[0];
    var iframeWindowObject = iframeDomElement.contentWindow;
    var iframeDocumentObject = iframeDomElement.contentDocument;
    // which is equivalent to
    // var iframeDocumentObject = iframeWindowObject.document;
    var iframejQuery = iframeWindowObject.$; // if jQuery is registered inside the iframe page, of course    

    var win = $("#window").data("kendoWindow");

    win.center();
    win.open();
}

GetQueryString = function () {
    var result = {}, queryString = location.search.slice(1),
        re = /([^&=]+)=([^&]*)/g, m;

    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = (decodeURIComponent(m[2]) == "null") ? "" : decodeURIComponent(m[2]);

    }

    if (result == 'null') { result = ""; }
    return result;
}

DoValidate = function (variables) {
    var errMsg = "";
    for (var i = 0; i < variables.length; i++) {
        if (variables[i] == "" || variables[i] == undefined) {
            errMsg = "Please Fill All Mandatory Fields";
        }
    }

    return errMsg;
}
ValidateCheckBox = function (variables, text) {
    if (text == "" || text == undefined) {
        text = "Option";
    }
    var errMsg = "";
    for (var i = 0; i < variables.length; i++) {
        if ((variables[i].length > 0) == false) {
            errMsg = "Please Choose At Least 1 " + text;
        }
    }

    return errMsg;
}

GetCompanySource = function () {

    if (Cookie.getWithoutExpired("Company") != null) {
        return Cookie.getWithoutExpired("Company");
    }
    else {
        return Cookie.getWithoutExpired("cso_id");
    }
}

SetCompanyID = function (id) {
    if (id != 3) {
        localStorage.setItem("isHSO", true);
    } else {
        localStorage.setItem("isHSO", false);
    }
    localStorage.setItem("CompanyID", id);
}

GetCompanyID = function () {
    return localStorage.getItem("CompanyID");
}

/*--------------------------------------------------*/
/*          Variable/Object Type Utilities          */
/*--------------------------------------------------*/
var CheckObj = (function () {
    return {
        /* To check whether a supplied object/variable is an 'Boolea' object or not.
         * Will return 'True' or 'False' as output
         */
        isBoolean: function (obj) { return Object.prototype.toString.call(obj) === '[object Boolean]'; },
        /* To check whether a supplied object/variable is an 'Array' object or not.
         * Will return 'True' or 'False' as output
         */
        isArray: function (obj) { return Object.prototype.toString.call(obj) === '[object Array]'; },
        /* To check whether a supplied object/variable is an 'Empty String' object or not.
         * Will return 'True' or 'False' as output
         */
        isEmpty: function (obj) { if (this.isString(obj)) { return obj.replace(/\s+/g, '') === ''; } return false; },
        /* To check whether a supplied object/variable is a 'String' object or not.
         * Will return 'True' or 'False' as output
         */
        isString: function (obj) { return Object.prototype.toString.call(obj) === '[object String]'; },
        /* To check whether a supplied object/variable is a 'Number' object or not.
         * Will return 'True' or 'False' as output
         */
        isNumber: function (obj) { return Object.prototype.toString.call(obj) === '[object Number]'; },
        /* To check whether a supplied object/variable is a 'Null' object or not.
        * Will return 'True' or 'False' as output
        */
        isNull: function (obj) { return Object.prototype.toString.call(obj) === '[object Null]'; },
        /* To check whether a supplied object/variable is a 'Object' object or not.
         * Will return 'True' or 'False' as output
         */
        isObject: function (obj) { return Object.prototype.toString.call(obj) === '[object Object]'; },
        /* To check whether a supplied object/variable is an 'Undefined' object or not.
         * Will return 'True' or 'False' as output
         */
        isUndefined: function (obj) { return typeof obj === 'undefined'; },

        /* Composite Function */
        /* To check whether a supplied object/variable is an 'Empty String' or 'Null' or 'Undefined' object or not.
         * Will return 'True' or 'False' as output
         */
        isEmptyNullOrUndefined: function (obj) { if (this.isUndefined(obj) || this.isNull(obj) || this.isEmpty(obj)) { return true; } return false; }
    };
})(CheckObj || {});

GetQueryString = function () {
    var result = {}, queryString = location.search.slice(1),
        re = /([^&=]+)=([^&]*)/g, m;

    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = (decodeURIComponent(m[2]) == "null") ? "" : decodeURIComponent(m[2]);

    }

    if (typeof result.ActivityName === 'undefined') { result.ActivityName = "" }
    return result;
}

toTitleCase = function (str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
}


/*--------------------------------------------------*/
/*           Mapping Value to ViewModel             */
/*--------------------------------------------------*/
// Set and Get viewmodel 
ViewModelData = {
    reset: function (viewModel, arrInclude) {
        for (var i in viewModel) {
            if ($.inArray(i, arrInclude) !== -1) {
                viewModel.set(i, "");
            }
        }
    },
    set: function (viewModel, arrValue, excludes) {
        for (var i in viewModel) {
            if ($.inArray(i, excludes) == -1) {
                viewModel[i] = arrValue[i];
            }
        }
    },
    get: function (viewModel, includes, excludes) {
        var resp = new Object();

        if (CheckObj.isEmptyNullOrUndefined(viewModel)) { console.log('%cViewModelData.get(viewModel, includes, excludes), viewModel in first param cannot null', 'color:blue'); return; }

        if (CheckObj.isEmptyNullOrUndefined(includes) && CheckObj.isEmptyNullOrUndefined(excludes)) {
            for (var i in viewModel) {
                resp[i] = viewModel.get(i);
            }
            return resp;
        }

        if (!CheckObj.isEmptyNullOrUndefined(excludes)) {
            for (var i in viewModel) {
                if ($.inArray(i, excludes) == -1) {
                    resp[i] = viewModel.get(i);
                }
            }
        }

        if (!CheckObj.isEmptyNullOrUndefined(includes)) {
            for (var i in viewModel) {
                if ($.inArray(i, includes) != -1) {
                    resp[i] = viewModel.get(i);
                }
            }
        }

        return resp;
    }
}


/*--------------------------------------------------*/
/*                 All about Kendo                  */
/*--------------------------------------------------*/
/* Function to disable kendo Component */
function toogleKendoNumericTextbox(elems, state) {
    if (state) {
        if (CheckObj.isArray(elems)) {
            $.each(elems, function (index, value) {
                console.log(value);
                $('#' + value).data('kendoNumericTextBox').enable(!state);
                $('#' + value).siblings().css('background-color', '#e6e6e6');
            });
        }
        else {
            $('#' + elems).data('kendoNumericTextBox').enable(!state);
            $('#' + elems).siblings().css('background-color', '#e6e6e6');
        }
    }
    else {
        if (CheckObj.isArray(elems)) {
            $.each(elems, function (index, value) {
                $('#' + value).data('kendoNumericTextBox').enable(!state);
                $('#' + value).siblings().css('background-color', 'transparent');
            });
        }
        else {
            $('#' + elems).data('kendoNumericTextBox').enable(!state);
            $('#' + elems).siblings().css('background-color', 'transparent');
        }
    }
}

function toogleLookupControl(elems, state) {
    if (state) {
        if (CheckObj.isArray(elems)) {
            $.each(elems, function (index, value) {
                $('#' + value).parent().css('background-color', '#e6e6e6');
                $('#' + value).attr('readonly', true);
                $('#' + value).toggleClass('ahs-readonly', true);
            });
        }
        else {
            $('#' + elems).parent().css('background-color', '#e6e6e6');
            $('#' + elems).attr('readonly', true);
            $('#' + elems).toggleClass('ahs-readonly', true);
        }
    }
    else {
        if (CheckObj.isArray(elems)) {
            $.each(elems, function (index, value) {
                $('#' + value).parent().css('background-color', '#fafafa');
                $('#' + value).attr('readonly', false);
                $('#' + value).toggleClass('ahs-readonly', false);
            });
        }
        else {
            $('#' + elems).parent().css('background-color', '#fafafa');
            $('#' + elems).attr('readonly', false);
            $('#' + elems).toggleClass('ahs-readonly', false);
        }
    }
}

function togglekendoMultiSelect(elems, state) {

    if (state) {
        if (CheckObj.isArray(elems)) {
            $.each(elems, function (index, value) {
                $('#' + value).data('kendoMultiSelect').enable(!state);
                $('#' + value).siblings().css('background-color', '#e6e6e6');
                $('#' + value + '_taglist').siblings().css('background-color', '#e6e6e6');
                $('input[name=' + value + '_input]').css('background-color', '#e6e6e6');
            });
        }
        else {
            $('#' + elems).data('kendoMultiSelect').enable(!state);
            $('#' + elems).siblings().css('background-color', '#e6e6e6');
            $('#' + elems + '_taglist').siblings().css('background-color', '#e6e6e6');
            $('input[name=' + elems + '_input]').css('background-color', '#e6e6e6');
        }
    }
    else {
        if (CheckObj.isArray(elems)) {
            $.each(elems, function (index, value) {
                $('#' + value).data('kendoMultiSelect').enable(!state);
                $('#' + value).siblings().css('background-color', '#fafafa');
                $('#' + value + '_taglist').siblings().css('background-color', 'transparent');
                $('input[name=' + value + '_input]').css('background-color', '#ffffff');
            });
        }
        else {
            $('#' + elems).data('kendoMultiSelect').enable(!state);
            $('#' + elems).siblings().css('background-color', '#fafafa');
            $('#' + elems + '_taglist').siblings().css('background-color', 'transparent');
            $('input[name=' + elems + '_input]').css('background-color', '#ffffff');
        }
    }
}

function toggleKendoCheckBox(elem, state) {

    if (state) {
        $('#' + elem).attr('disabled', true);
    }
    else {
        $('#' + elem).attr('disabled', false);
    }
}

function setReadOnly(elems, state) {

    if (state) {
        if (CheckObj.isArray(elems)) {
            $.each(elems, function (index, value) {
                $('#' + value).attr('disabled', true);
                $('#' + value).toggleClass('ahs-readonly', true);
                $('#' + value).css('background-color', '#e6e6e6');
            });
        }
        else {
            $('#' + elems).attr('disabled', true);
            $('#' + elems).toggleClass('ahs-readonly', true);
            $('#' + elems).css('background-color', '#fafafa');
        }
    } else {
        if (CheckObj.isArray(elems)) {
            $.each(elems, function (index, value) {
                $('#' + value).attr('disabled', false);
                $('#' + value).toggleClass('ahs-readonly', false);
                $('#' + value).css('background-color', '#e6e6e6');
            });
        }
        else {
            $('#' + elems).attr('disabled', false);
            $('#' + elems).toggleClass('ahs-readonly', false);
            $('#' + elems).css('background-color', '#fafafa');
        }
    }
    return;
}

function toggleKendoDatePicker(eLems, state) {
    //console.log(elem);
    if (CheckObj.isArray(eLems)) {
        $.each(eLems, function (index, value) {
            if (state) {
                $('#' + value).data('kendoDatePicker').enable(!state);
                $('#' + value).css('background-color', '#e6e6e6');
            }
            else {
                $('#' + value).data('kendoDatePicker').enable(!state);
                $('#' + value).css('background-color', '#fafafa');
            }
        });
    } else {
        if (state) {
            $('#' + eLems).data('kendoDatePicker').enable(!state);
            $('#' + eLems).css('background-color', '#e6e6e6');
        }
        else {
            $('#' + eLems).data('kendoDatePicker').enable(!state);
            $('#' + eLems).css('background-color', '#fafafa');
        }
    }
}

function toggleKendoComboBox(eLems, state) {
    if (CheckObj.isArray(eLems)) {
        $.each(eLems, function (index, value) {
            if (state) {
                $('#' + value).data('kendoComboBox').enable(!state);
                $('input[name=' + value + '_input]').css('background-color', '#e6e6e6');
                $('#' + value).siblings().css('background-color', '#e6e6e6');
            }
            else {
                $('#' + value).data('kendoComboBox').enable(!state);
                $('#' + value).siblings().css('background-color', '#fafafa');
                $('input[name=' + value + '_input]').css('background-color', '#ffffff');
            }
        });
    } else {
        if (state) {
            $('#' + eLems).data('kendoComboBox').enable(!state);
            $('input[name=' + eLems + '_input]').css('background-color', '#e6e6e6');
            $('#' + eLems).siblings().css('background-color', '#e6e6e6');
        }
        else {
            $('#' + eLems).data('kendoComboBox').enable(!state);
            $('#' + eLems).siblings().css('background-color', '#fafafa');
            $('input[name=' + eLems + '_input]').css('background-color', '#ffffff');
        }
    }
}
/* end */

/* agrnurul6493 function to reset all input */
function toggleKendoPanel(ul, elem, state) {
    var panelBar = $('#' + ul + '').data('kendoPanelBar');
    if (state) {
        if (CheckObj.isArray(elem)) {
            $.each(elem, function (index, value) {
                panelBar.collapse($('#' + value));
            });
        }
        else {
            panelBar.collapse($('#' + elem));
        }
    } else {
        if (CheckObj.isArray(elem)) {
            $.each(elem, function (index, value) {
                panelBar.expand($('#' + value));
            });
        }
        else {
            panelBar.expand($('#' + elem));
        }
    }
}

function resetKendoComboBox(eLems) {
    if (CheckObj.isArray(eLems)) {
        $.each(eLems, function (index, value) {
            $('#' + value).data('kendoComboBox').value('');
        });
    } else {
        $('#' + value).data('kendoComboBox').value('');
    }
}

function resetKendoTextBox(eLems) {
    if (CheckObj.isArray(eLems)) {
        $.each(eLems, function (index, value) {
            $('#' + value).val('');
        });
    } else {
        $('#' + value).val('');
    }
}

function selectAllKendoCheckBox(eLems) {
    if (CheckObj.isArray(eLems)) {
        $.each(eLems, function (index, value) {
            document.getElementById(value).checked = true;
        });
    } else {
        document.getElementById(value).checked = true;
    }
}

function unselectAllKendoCheckBox(eLems) {
    if (CheckObj.isArray(eLems)) {
        $.each(eLems, function (index, value) {
            document.getElementById(value).checked = false;
        });
    } else {
        document.getElementById(value).checked = false;
    }
}

/*--------------------------------------------------*/
/*             Filter Special Characters            */
/*--------------------------------------------------*/

HasSpecialChar = function (pattern, value) {

    return pattern.test(value);
}
/* end */