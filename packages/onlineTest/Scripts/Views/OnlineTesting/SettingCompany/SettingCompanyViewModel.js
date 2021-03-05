var viewModel = kendo.observable({
    Company: "",
    CoName: "",
    LastModifiedBy: "",
    LastModifiedOn: "",
    ExpirationTime:0,
    CompanyList: [],
    srcImage:[],
    url: "",
    companyLogoChange: function (el, files, url) {
        //console.log(window.URL.createObjectURL(files[0]));
        //$('#companyLogoPic').attr('src', "");
        //console.log(el);
        //console.log(files);
        //debugger;
        if (files.length) {
            if (files[0].size <= 2048000) {
                //debugger;
                el.parentElement.firstElementChild.src = window.URL.createObjectURL(files[0]);  //original
                el.parentElement.children[1].src = window.URL.createObjectURL(files[0]);    //display
                $(el.parentElement.parentElement.lastElementChild).show();
                //console.log(el.parentElement.firstElementChild.src);
            }
            else {
                MessageBox.show("Error", "Max image size (2 MB) is exceeded");
            }
        } else if (files.length == undefined) {
            //$("#companyLogoPicID".toString()).attr("src", url);
            //$("#companyLogoPic".toString()).attr("src", url);
            //$($("#companyLogo")).show();
            //document.getElementById("companyLogoId1".toString()).value = 0;
        }
    },
    companyLogoRemove: function (el) {
        var companyLogoPicID = el.parentElement.firstElementChild.firstElementChild.id;   //original
        var companyLogoPic = el.parentElement.firstElementChild.children[1].id;  //display
        var companyLogoId = el.parentElement.firstElementChild.lastElementChild.id;

        $(el.parentElement.firstElementChild).remove();
        $(el.parentElement).prepend(
            '<label style="padding-left:140px;padding-right:120px;">' +
                '<img id="' + companyLogoPicID + '" src="" hidden="hidden" />' +
                '<img id="' + companyLogoPic + '" src="" style="background: no-repeat url(../../../Images/add-picture.jpg) center; border: thin" class="backImage" width="100%" />' +
                '<input name="' + companyLogoId + '" id="companyLogo" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.companyLogoChange(this.files)" />' +
            '</label>' +
                '<input type="hidden" id="companyLogoId1" name="companyLogoId1" value="0" />' +
                '<a href="#" class="k-button" style="display: none" onclick="viewModel.companyLogoRemove(this)"><span class="k-icon k-delete"></span></a>');
        $(el).hide();
    },
    save: function (e) {
        save(e);
    },
    cancel: function (e) {
        cancel(e);
    },
});

save = function () {
    var data = new FormData();
    var companyId = viewModel.Company;
    var ExperiedTime = viewModel.ExpirationTime;
    var checkImage = $('#companyLogo')[0].files[0];
    //console.log(checkImage);
    //console.log(viewModel.srcImage);
    if (checkImage == undefined) {
        //alert("undefined!!!");
        data.append('logo', viewModel.srcImage[0]);
        data.append('url', viewModel.url);
        data.append('companyId', companyId);
        data.append('ExperiedTime', ExperiedTime);
    } else {
        data.append('logo', $('#companyLogo')[0].files[0]);
        data.append('companyId', companyId);
        data.append('ExperiedTime', ExperiedTime);
        data.append('url', "");
        //console.log(checkImage);
    }
    //}
    if (ExperiedTime == 0 || ExperiedTime == '' || ExperiedTime == null || ExperiedTime == undefined) {
        swal("Incompleted Data", "Please Fill Mandatory Field", "warning", { closeOnClickOutside: false });
    } else {
        confirmMessageAdd();
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            $.ajax({
                type: 'POST',
                url: SERVICE_URL + "api/SettingCompany/Save",
                headers: { "Authorization-Token": Cookie.load() },
                data: data,
                processData: false,
                contentType: false,
                success: function (response) {
                    //console.log(response);
                    if (response.Acknowledge < 1) {
                        LoadingMask.hide();
                        swal("Error", "Data Not Been Saved", "warning", { closeOnClickOutside: false });
                    } else {
                        LoadingMask.hide();
                        swal("Succes", "Data has been saved", "success", { closeOnClickOutside: false });
                        $('.swal-button--confirm').on('click', function ()
                        {
                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/SettingCompany/SettingCompany.html";
                        });
                    }
                },
                error: function (x,e) {
                    //alert("error"+x);
                    MessageBox.show("Error", "Error"+x);
                }
            });
        });
    }
    
}
cancel = function () {
    window.location.reload();
}
