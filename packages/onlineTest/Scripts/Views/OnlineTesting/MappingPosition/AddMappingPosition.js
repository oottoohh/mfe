$(document).ready(function () {
    LoadingMask.show();
    var branchProfileID = GetParameterByName('MapPositionCode');
    LoadData(branchProfileID);
    kendo.bind($("body"), viewModel);
    dropDownPosition();
});

LoadData = function (data) {
    if (data != '') {
        console.log("edit Data");
        //CompanyLoads();
        $.ajax({
            type: "POST",
            url: SERVICE_URL + "api/MappingPosition/Detail",
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                MappingCode: data
            },
            success: function (response) {
                //console.log(response.MappingPostion);
                viewModel.set('Company', response.MappingPostion.CompanyId);
                viewModel.set('CompanyId', response.MappingPostion.CompanyId);
                viewModel.set('createBy', response.MappingPostion.CreateBy);
                viewModel.set('lastModifiedBy', response.MappingPostion.ModifBy);
                viewModel.set('createOn', response.MappingPostion.CreatedTime);
                viewModel.set('lastModifiedOn', response.MappingPostion.ModifiedTime);
                viewModel.set('MPCode', response.MappingPostion.MapPositionCode);
                viewModel.set('Position', response.MappingPostion.PositionCode);
                viewModel.set('DisplayStatus', response.MappingPostion.DisplayStatus);
                viewModel.set('COName', response.MappingPostion.CutOffCode);
                viewModel.set('CONama', response.MappingPostion.CutOffName);
                viewModels.set('COName', response.MappingPostion.CutOffCode);
                viewModels.set('CompanyID', response.MappingPostion.CompanyId);
                viewModels.set('Position', response.MappingPostion.PositionCode);
                $("#COName").val(response.MappingPostion.CutOffName)
                if (response.MappingPostion.DisplayStatus == true) {
                    $('#displayStatus').removeAttr('onchange');
                    $('#displayStatus').attr('onchange', 'Display(this)');
                } else {
                    $('#displayStatus').removeAttr('onchange');
                    $('#displayStatus').attr('onchange', 'DisplayChecked(this)');
                }
                //PositionChange();
                CompanyLoads();
                dropDownCO();
            },
            error: function (xhr, status, error) {
                //alert("Error");
                MessageBox.show("Error", "Error");
            }
        });
    } else {
        console.log("add Data");
        CompanyLoad();
        //PositionChange();
    }

}

CompanyLoad = function () {
    var no = viewModel.Company;
    //alert(no);
    var nomor = parseInt(no);
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Company",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            LoadingMask.hide();
            if (response.Data.length < 1) {
                swal("Failed", "Company Not Found!!!", "warning", { closeOnClickOutside: false });
            }
            else {
                viewModel.set('CompanyList', response.Data);
                //viewModel.set('Company', response.Data[0].Code);
                ////viewModel.set('Company', response.Data[nomor - 1].Code);
                //var data = response.Data[0].Code;
                //var List = {
                //    sender: {
                //        _selectedValue: data,
                //    }
                //};
                dropDownCompany();
                dropDownCO();
                //onchangeCompany(List);
            }

        }
    });
}
CompanyLoads = function () {
    var no = viewModel.Company;
    var nomor = parseInt(no);
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Company",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            LoadingMask.hide();
            if (response.Data.length < 1) {
                swal("Failed", "Company Not Found!!!", "warning", { closeOnClickOutside: false });
            }
            else {
                viewModel.set('CompanyList', response.Data);
                //viewModel.set('Company', response.Data[0].Code);
                var data = response.Data[0].Code;
                var List = {
                    sender: {
                        _selectedValue: data,
                    }
                };
                onchangeCompany(List);
                dropDownCompany();
                dropDownPosition();
                onChangePosition();
                dropDownCO()
            }

        }
    });
}

dropDownCompany = function () {
    //console.log(viewModel.CompanyList);
    $("#CompanyId").kendoComboBox({
        autoBind: true,
        placeholder: "Select Company..",
        dataSource: viewModel.CompanyList,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onchangeCompany
    });
}
onchangeCompany = function (data) {
    var firstCompany = data.sender._selectedValue;
    if (viewModel.Company == firstCompany || viewModel.Company == "") {
        viewModel.set("CompanyId", firstCompany);
        viewModels.set('CompanyID', firstCompany);
    } 
}

dropDownPosition = function () {
    $("#Position").kendoComboBox({
        autoBind: true,
        placeholder: "Select Position..",
        dataSource: viewModels.CategoryPosition,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onChangePosition
        //select: function (e) {
        //    viewModel.set('PositionCode', e.item.context.innerHTML);
        //    onChangePosition()
        //}
    });
}
onChangePosition = function (data) {
    if (data !== undefined) {
        var Position = data.sender._selectedValue;
        var PositionCode = data.sender._prev;
        viewModel.set("Position", Position);
        viewModel.set("PositionCode", PositionCode);
    } else {
        Position = viewModel.Position
    }

    if (viewModel.CompanyId !== "" && viewModel.Position !== "") {
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + "api/Dropdown/CutOffByCompanyPosition",
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                CompanyId: viewModel.CompanyId,
                PositionId: Position
            },
            success: function (response) {
                LoadingMask.hide();
                if (response.Data.length == 0) {
                    swal("Failed", "Cut Off Not Found!!!", "warning", { closeOnClickOutside: false });
                    //viewModel.set('COName', '');
                    //viewModel.set('CONama', '');
                    viewModel.set('CutOffCode', '');
                    viewModel.set('CutOffList', '');
                    //PositionChange();
                    dropDownCO();
                }
                else {
                    if (viewModels.COName == '') {
                        //alert('inii');
                        viewModel.set('CutOffList', response.Data);
                        viewModel.set('COName', response.Data[0].Code);
                        //PositionChange();
                        dropDownCO();
                    } else {
                        for (jk = 0; jk < response.Data.length; jk++) {
                            if (response.Data[jk].Code == viewModels.COName) {
                                viewModel.set('CutOffList', response.Data);
                                viewModel.set('COName', response.Data[jk].Code);
                                viewModel.set('CONama', response.Data[jk].Value);
                                dropDownCO();
                                break;
                            } else {
                                viewModel.set('CutOffList', response.Data);
                                //viewModel.set('COName', '');
                                //viewModel.set('CONama', '');
                                dropDownCO();
                            }
                        }
                        //PositionChange();
                    }
                }
            }
        });

    }
}

dropDownCO = function (e) {
    $("#COName").kendoComboBox({
        autoBind: true,
        placeholder: "Select Cut Off..",
        dataSource: viewModel.CutOffList,
        dataTextField: "Value",
        dataValueField: "Code",
        change: onChangeCO
    });
}

onChangeCO = function (data) {
    var COName = data.sender._selectedValue
    var CONama = data.sender._prev
    viewModel.set("COName", COName)
    viewModel.set("CONama", CONama)
}

Display = function (data) {
    $(data).removeAttr('onchange');
    $(data).attr('onchange', 'DisplayChecked(this)');
    var nilai = false;
    viewModel.set('DisplayStatus', nilai);
}

DisplayChecked = function (data) {
    $(data).removeAttr('onchange');
    $(data).attr('onchange', 'Display(this)');
    var nilai = true;
    viewModel.set('DisplayStatus', nilai);
}
