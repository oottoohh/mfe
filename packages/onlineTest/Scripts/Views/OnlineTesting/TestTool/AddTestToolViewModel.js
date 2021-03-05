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
    MaxLength:"",
    TestToolName: "",
    configIQ: false,
    isDisplay: true,
    description: "",
    Instruction: {
        InstructionTitle: "",
        InstructionDesc: "",
        InstructionDisclaimer: "",
    },
    CategoryDataSource: new kendo.data.DataSource({
        transport: {
            read: {
                type: "GET",
                //headers: { "Authorization-Token": Cookie.load() },
                url:
                function () {
                    return SERVICE_URL + 'api/TestType/Data'
                },
                dataType: 'json'
            },
            parameterMap: function (data, operation) {
                //console.log(data);
                var request = new Object();

                request.UserLogin = Cookie.getUser();

                return request;
            }
        },
        schema: {
            model: {
                id: "TestTypeCode",
                field: "TestTypeName"
            },
            data: "TestTypes"
        }
    }),
    addTestType: function (e) {
        addTestType(e);
    },
    hideForm: function (e) {
        hideForm(e);
    },
    showForm: function (e) {
        showForm(e);
    },
    save: function (e) {
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
    var NumberCheck = /^[0-9]+$/;
    var Instruction = viewModel.Instruction;
    var isValidate = true;

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
    var MaxLg = MaxLength.length;
    var configIQ = viewModel.configIQ;

    var InstructionTitle = Instruction.InstructionTitle;
    var InstructionDesc = Instruction.InstructionDesc;
    var InstructionDisclaimer = Instruction.InstructionDisclaimer;
    var InstructionCheck = InstructionTitle == '' || InstructionDesc == '' || InstructionDisclaimer == '';

    if (NumberCheck.exec(MaxLength) && MaxLg <= 3) {
        //console.log('Test Type Name=' + TestTypeName + '&Display Status=' + isDisplay + '&Description=' + description + '&configIQt=' + configIQ);
        if (TestToolName == '' || TestTypeName == '' || MaxLength == '' || InstructionTitle == '' || InstructionDesc == '' || InstructionDisclaimer == '') {
            //LoadingMask.hide();
            swal('Incompleted Data', 'Please Fill Mandatory Field!!!', 'warning', { closeOnClickOutside: false });
        } else {
            confirmMessageAdd();
            $('.swal-button--defeat').on('click', function () {
                LoadingMask.show();
                $.ajax({
                    type: "POST",
                    url: SERVICE_URL + "api/TestTool/Save",
                    headers: { "Authorization-Token": Cookie.load() },
                    data: {
                        TestTypeCode: TestTypeName,
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
    } else {
        swal('Failed', 'Max Length Invalid!!!', 'warning', { closeOnClickOutside: false });
    }
}