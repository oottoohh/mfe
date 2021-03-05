$(document).ready(function () {
    CompanyLoad();
    kendo.bind($("body"), viewModel);

});

CompanyLoad = function () {
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Company",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            //console.log(response);
            if (response.Data.length < 1) {
                swal("Failed", "Company Not Found!!!", "warning", { closeOnClickOutside: false });
            }
            else {
                //console.log(response.Data);
                viewModel.set('CompanyList', response.Data);
                //viewModel.set('Company', response.Data[0].Code);
                //var data = response.Data[0].Code;
                //var List = {
                //    sender: {
                //        _selectedValue: data,
                //    }
                //};
                dropDownCompany();
                //onChangeCompany(List);
            }

        }
    });
}
dropDownCompany = function () {
    //console.log(viewModel.CompanyList);
    $("#CompanyName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Type..",
        dataSource: viewModel.CompanyList,
        dataTextField: "Value",
        dataValueField: "Code",
        change:onChangeCompany
    });
}
onChangeCompany = function (data) {
    var check = data.sender._selectedValue;
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/SettingCompany/Detail",
        headers: { "Authorization-Token": Cookie.load() },
        data:{CompanyId:check},
        success: function (response) {
            //console.log(response);
            if (response.Acknowledge < 1) {
                viewModel.set("LastModifiedBy", "");
                viewModel.set("LastModifiedOn", "");
                viewModel.set("ExpirationTime", "");
                $('#companyLogoPic').attr('src', "");
            }
            else {
                viewModel.set("LastModifiedBy", response.Detail.ModifBy);
                viewModel.set("LastModifiedOn", response.Detail.ModifiedTime);
                viewModel.set("ExpirationTime", response.Detail.ExpiredTime);
                viewModel.set("url", response.Detail.Logo);
                //UrltoData(nameImage, function (dataUrl) {
                //    console.log(dataUrl);
                //});
                var blob = new File(['FileList'], null, { type: 'image/jpeg' });
                var listImage = [];
                listImage[0]=blob;
                //var htmlInput = '<input name="companyLogo" id="companyLogo" type="file" accept="image/gif, image/jpg, image/png, image/jpeg, image/bmp, image/tif" hidden="hidden" onchange="viewModel.companyLogoChange(this, this.files)"/>';
                viewModel.set('srcImage', listImage);
                //viewModel.companyLogoChange(htmlInput, listImage, response.Detail.Logo);
                $("#companyLogoPicID".toString()).attr("src", response.Detail.Logo);
                $("#companyLogoPic".toString()).attr("src", response.Detail.Logo);
                $($("#companyLogo".toString()).parent().parent().children()[2]).show();
                document.getElementById("companyLogoId1".toString()).value = 0;
                //$('#companyLogoPic').attr('src', response.Detail.Logo);
            }

        }
    });
}

//function UrltoData(url, callback) {
//    var httpRequest = new XMLHttpRequest();
//    httpRequest.onload = function () {
//        var fileReader = new FileReader();
//        fileReader.onloadend = function () {
//            callback(fileReader.result);
//        }
//        fileReader.readAsDataURL(httpRequest.response);
//    }
//    debugger;
//    httpRequest.open('GET', url);
//    httpRequest.responseType = 'blob';
//    console.log(httpRequest);
//    httpRequest.send();
//}