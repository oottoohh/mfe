var modeGrid = new kendo.data.Model.define({
    id: "ApplicantionId",
    fields: {
        ApplicantionId: { type: "number" },
        ApplicationStatusName: { type: "text" },
        ApplicationStatusId: { type: "number" },
        PositionId: { type: "number" },
        PositionCode: { type: "text" },
        PositionName: { type: "text" },
        CompanySourceId: { type: "number" },
        CompanyName: { type: "text" },
        ApplicantId: { type: "number" },
        Name: { type: "text" },
        Email: { type: "text" },
        DateOfBirth: { type: "date" },
        DateOfBirthDate: { type: "date" },
        MobilePhone: { type: "text" },
        Gender: { type: "text" },
        Invited: { type: "number" },
        InvitationDate: { type: "date" },
        InvitationTime: { type: "time" },
        ExpirationDate: { type: "date" },
        CompletionDate: { type: "date" },
        University: { type: "text" },
    }
});
var viewModel = kendo.observable({
    Name:"",
    Position: "",
    PositionName:"",
    Company: "",
    Status:0,
    InvitationDate1: '',
    InvitationDate2: "",
    ExpirationDate1: "",
    ExpirationDate2: "",
    CompanyList: [],
    StatusList:[],
    PositionList: [],
    arrApplicant:[],
    TestToolGrid: new kendo.data.DataSource({
        batch: true,
        transport: {
            read: {
                type: "POST",
                url: SERVICE_URL + 'api/Schedule/Inquiry',
                headers: { "Authorization-Token": Cookie.load() }
            },
            parameterMap: function (data, operation) {
                //console.log(data);
                debugger
                var InvitationDate1 = '';
                var InvitationDate2 = '';
                var ExpirationDate1 = '';
                var ExpirationDate2 = '';
                if (viewModel.InvitationDate1 == '') {
                    InvitationDate1 = '';
                } else {
                    InvitationDate1 = kendo.toString(kendo.parseDate(new Date(viewModel.InvitationDate1)), 'yyyy-MM-dd');
                }
                if (viewModel.InvitationDate2 == '') {
                    InvitationDate2 = '';
                } else {
                    InvitationDate2 = kendo.toString(kendo.parseDate(new Date(viewModel.InvitationDate2)), 'yyyy-MM-dd');
                }
                if (viewModel.ExpirationDate1 == '') {
                    ExpirationDate1 = '';
                } else {
                    ExpirationDate1 = kendo.toString(kendo.parseDate(new Date(viewModel.ExpirationDate1)), 'yyyy-MM-dd');
                }
                if (viewModel.ExpirationDate2 == '') {
                    ExpirationDate2 = '';
                } else {
                    ExpirationDate2 = kendo.toString(kendo.parseDate(new Date(viewModel.ExpirationDate2)), 'yyyy-MM-dd');
                }
                //InvitationDate1.setMonth(+1);
                //var InvitationDate2 = kendo.toString(kendo.parseDate(new Date(viewModel.InvitationDate2)), 'yyyy-MM-dd');
                //var ExpirationDate1 = kendo.toString(kendo.parseDate(new Date(viewModel.ExpirationDate1)), 'yyyy-MM-dd');
                //var ExpirationDate2 = kendo.toString(kendo.parseDate(new Date(viewModel.ExpirationDate2)), 'yyyy-MM-dd');
                var request = new Object();
                request.IsAffco = Cookies.get("role_name") == "HO" ? false : true;
                request.PageNo = data.page;
                request.PageSize = data.pageSize;
                request.ApplicantName = viewModel.Name;
                request.PositionName = viewModel.Position;
                request.CompanyId = viewModel.Company;
                request.ApplicantStatus = viewModel.Status;
                request.StartInvDate = InvitationDate1;
                request.EndInvDate = InvitationDate2;
                request.StartExpDate = ExpirationDate1;
                request.EndExpDate = ExpirationDate2;
                request.sortInfo = data.sort;
                return request;
            }
        },
        schema: {
            data: "Data",
            model: modeGrid,
            total: "Total"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 10
    }),
    search: function (e) {
        //if (viewModel.Company == '' || viewModel.Status) {
        //    swal('Failed','Company or Status can not be empty!!','error');
        //} else {
        viewModel.set("arrApplicant", []);
            viewModel.TestToolGrid.page(1);
        //}
    },
    clear: function (e) {
        clear(e);
    },
    SendInvitation: function (e) {
        SendInvitation(e);
    },
});
clear = function () {
    var CompanyID = localStorage.getItem('CompanyID');
    viewModel.set('Name', '');
    viewModel.set('Position', '');
    viewModel.set('PositionName', '');
    viewModel.set('Company', CompanyID);
    viewModel.set('Status', 34);
    var today = kendo.toString(kendo.parseDate(new Date()), 'MM/dd/yyyy');
    viewModel.set('InvitationDate1', '');
    viewModel.set('InvitationDate2', '');
    viewModel.set('ExpirationDate1', '');
    viewModel.set('ExpirationDate2', '');
}
SendInvitation = function () {

    //console.log(viewModel.arrApplicant);
    var ApplicationIdList = viewModel.arrApplicant.length;
    debugger
    var applicant = [];
    if (ApplicationIdList > 0) {
        for (i = 0; i < ApplicationIdList; i++) {

            if (viewModel.arrApplicant[i].status == "Completed") {
                swal('Failed!', 'Candidate has been completed the test', 'warning', { closeOnClickOutside: false });
                return false;
            } else if (viewModel.arrApplicant[i].status == "Incomplete") {
                swal('Failed!', 'Candidate has been completed the test', 'warning', { closeOnClickOutside: false });
                return false;
            } else if (viewModel.arrApplicant[i].status == "Waiting Result") {
                swal('Failed!', 'Candidate still in progress', 'warning', { closeOnClickOutside: false });
                return false;
            } else {
                applicant.push(viewModel.arrApplicant[i].id);
            }

        }
        confirmMessageAdd();
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            $.ajax({
                type: "POST",
                url: SERVICE_URL + "api/Schedule/SendInvitation",
                headers: { "Authorization-Token": Cookie.load() },
                data: {
                    ApplicationIdList: applicant
                },
                success: function (response) {
                    if (response.Acknowledge == 1) {
                        LoadingMask.hide();
                        var messageResult = "Please wait, sending e-mail invitation to applicant";
                        if (response.IsError) {
                            messageResult = response.ErrorMessages.join(", ");
                            swal("Infomation", response.Message, "warning", { closeOnClickOutside: false });
                            viewModel.set("arrApplicant", []);
                            $('.swal-button--confirm').on('click', function () {
                                viewModel.TestToolGrid.page(1);
                            });
                        } else {
                            messageResult = response.Message;
                            swal("Good", response.Message, "success", { closeOnClickOutside: false });
                            viewModel.set("arrApplicant", []);
                            $('.swal-button--confirm').on('click', function () {
                                viewModel.TestToolGrid.page(1);
                            });
                        }

                    }
                    else {
                        LoadingMask.hide();
                        swal("Failed", response.Message, "error", { closeOnClickOutside: false });

                    }
                },
                error: function (xhr, status, error) {
                    //alert("Error");
                    MessageBox.show("Error", "Error");
                    LoadingMask.hide();
                }
            });
        });
    } else {
        swal('Incompleted Data', 'Applicant has not been selected', 'warning', { closeOnClickOutside: false });
    }
}