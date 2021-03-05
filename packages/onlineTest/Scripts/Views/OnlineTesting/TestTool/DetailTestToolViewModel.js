var modelTestTypeGrid = new kendo.data.Model.define({
    id: "TestTypeCode",
    fields: {
        TestTypeName: { type: "string", editable: false },
        TestTypeDesc: { type: "string", editable: false },
        field: { type: "boolean", editable: false }
    },
});

var viewModel = kendo.observable({
    createBy: "",
    lastModifiedBy: "",
    createOn: "",
    lastModifiedOn: "",
    TestTypeName: "",
    TestToolCode: "",
    MaxLength: 0,
    TestToolName: "",
    IsByTest:false,
    description: "",
    Instruction: {
        InstructionTitle: "",
        InstructionDesc: "",
        InstructionDisclaimer: "",
    },
    hideForm: function (e) {
        hideForm(e);
    },
    showForm: function (e) {
        showForm(e);
    },
    edit: function (e) {
        save(e);
    },
    cancel: function (e) {
        confirmMessageCancel();
        $('.swal-button--cancel').on('click', function () {
        });
        $('.swal-button--danger').on('click', function () {
            //window.location.reload(true);
            window.location.href = DOMAIN_URL + "Views/OnlineTesting/TestTool/TestTool.html";
        });
    }
});

hideForm = function (e) {
    $('.box1').attr('hidden', true);
    //document.getElementById('boox').style.transitionDelay = "4s";
    $('.arrow2').removeAttr('hidden', 'hidden');
    $('.arrow1').attr('hidden', true);
}

showForm = function (e) {
    $('.box1').removeAttr('hidden', 'hidden');
    $('.arrow2').attr('hidden', true);
    $('.arrow1').removeAttr('hidden', 'hidden');
}

save = function (e) {
    //LoadingMask.show();
    var isValidate = true;
    var Instruction = viewModel.Instruction;

    var createBy = viewModel.createBy;
    var lastModifiedBy = viewModel.lastModifiedBy;
    var createOn = viewModel.createOn;
    var lastModifiedOn = viewModel.lastModifiedOn;

    var TestTypeCode = viewModel.TestTypeCode;
    var TestTypeName = viewModel.TestTypeName;
    var TestToolCode = viewModel.TestToolCode;
    var TestToolName = viewModel.TestToolName;
    var description = viewModel.description;
    var isDisplay = viewModel.isDisplay;
    var MaxLength = viewModel.MaxLength;
    var configIQ = viewModel.configIQ;

    var InstructionTitle = Instruction.InstructionTitle;
    var InstructionDesc = Instruction.InstructionDesc;
    var InstructionDisclaimer = Instruction.InstructionDisclaimer;
    var InstructionCheck = InstructionTitle == '' || InstructionDesc == '' || InstructionDisclaimer == '';

    //console.log(viewModel);
    //console.log('Test Type Name=' + TestTypeName + '&Display Status=' + Checked + '&Description=' + description + '&By Sub Test=' + bySubTest + '&By Test=' + byTest);
    if (TestToolCode == '' || TestToolName == '' || TestTypeName == '' || MaxLength == '' || InstructionTitle == '' || InstructionDesc == '' || InstructionDisclaimer == '') {
        LoadingMask.hide();
        swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
    } else {
        confirmMessageAdd();
        //alert(MaxLength);
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            $.ajax({
                type: "POST",
                url: SERVICE_URL + "api/TestTool/Edit",
                headers: { "Authorization-Token": Cookie.load() },
                data: {
                    TestTypeCode: TestTypeName,
                    TestToolCode:TestToolCode,
                    TestToolName: TestToolName,
                    TestToolDesc: description,
                    NormScoreLength: MaxLength,
                    IsConfigIQ: configIQ,
                    DisplayStatus: isDisplay,
                    InstructionTitle: InstructionTitle,
                    InstructionDesc: InstructionDesc,
                    InstructionDisclaimer: InstructionDisclaimer
                },
                success: function (response) {
                    if (response.Acknowledge < 1) {
                        LoadingMask.hide();
                        swal('Failed!!!', response.Message, 'warning', { closeOnClickOutside: false });
                    } else {
                        LoadingMask.hide();
                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                        $('.swal-button--confirm').on('click', function () {
                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/TestTool/TestTool.html";
                        });
                    }
                },
                error: function (xhr, status, error) {
                    //alert("Error");
                    MessageBox.show("Error", "Error");
                    LoadingMask.hide();
                }
            });
        });
        //LoadingMask.hide();
    }
}

getURL = function () {
    var url = $(location).attr('search');
    var isDisplay = viewModel.isDisplay;
    var chek = document.getElementById('displayStatus');
    //console.log(isDisplay);
    //console.log(url);
    
    //?act=edit&TestToolCode=TTY19000001
    var check = url.substring(23, 100);
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/TestTool/Detail",
        headers: { "Authorization-Token": Cookie.load() },
        data: { TestToolCode: check },
        success: function (response) {
            //console.log(response);
            var data = response.TestTool;
            viewModel.set("createBy", data.CreateBy);
            viewModel.set("lastModifiedBy", data.ModifBy);
            viewModel.set("createOn", data.CreatedTime);
            viewModel.set("lastModifiedOn", data.ModifiedTime);
            viewModel.set("TestTypeName", data.TestTypeCode);
            viewModel.set("TestTypeCode", data.TestTypeCode);
            viewModel.set("TestToolCode", data.TestToolCode);
            viewModel.set("TestToolName", data.TestToolName);
            viewModel.set("description", data.TestToolDesc);
            viewModel.set("configIQ", data.IsConfigIQ);
            viewModel.set("isDisplay", data.DisplayStatus);
            viewModel.set("MaxLength", data.NormScoreLength);
            viewModel.Instruction.set("InstructionTitle", data.Instruction.Title);
            viewModel.Instruction.set("InstructionDesc", data.Instruction.Desc);
            viewModel.Instruction.set("InstructionDisclaimer", data.Instruction.Disclaimer);
            LoadingMask.hide();
        }
    });
    //alert(check);
}