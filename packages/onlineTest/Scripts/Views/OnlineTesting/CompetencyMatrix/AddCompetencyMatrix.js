$(document).ready(function () {
    LoadingMask.show();
    var CompMatrix = GetParameterByName('CompMatrix');
    loadData(CompMatrix);
    //CompanyLoad();
    //CompetencyLoad();
    kendo.bind($('body'), viewModel);
});

loadData = function (data) {
    if (data == '' || data == undefined || data == null) {
        $('input[name=Competency_input]').removeAttr('disabled');
        //location.reload();
        localStorage.setItem('statusMapping', 'add');
        viewModel.set('title', 'Add Competency Matrix');
        LoadingMask.show();
        CompanyLoad();
        CompetencyLoad();
        dropDownTestTool();
        dropDownSubTest();
    }
    else {
        localStorage.setItem('statusMapping', 'edit');
        viewModel.set('title', 'Edit Competency Matrix');
        CompanyLoad();
        CompetencyLoad();
        dropDownCompetency();
        dropDownTestTool();
        dropDownSubTest();
        LoadingMask.show();
        $.ajax({
            type: 'POST',
            url: SERVICE_URL + 'api/CompetencyMatrix/Detail',
            headers: { "Authorization-Token": Cookie.load() },
            data: {
                CompetencyMatrixCode: data
            },
            dataType: 'json',
            success: function (response) {
                if (response.Acknowledge < 1) {
                    LoadingMask.hide();
                } else {
                    LoadingMask.hide();
                    viewModel.set('createBy', response.CompetencyMatrixDetail.CreateBy);
                    viewModel.set('lastModifiedBy', response.CompetencyMatrixDetail.ModifBy);
                    viewModel.set('createOn', response.CompetencyMatrixDetail.CreatedTime);
                    viewModel.set('lastModifiedOn', response.CompetencyMatrixDetail.ModifiedTime);

                    viewModel.set('CompetencyMatrixCode', response.CompetencyMatrixDetail.CompetencyMatrixCode);
                    viewModel.set('CompetencyMatrixName', response.CompetencyMatrixDetail.CompetencyMatrixName);
                    viewModel.set('CompanyId', response.CompetencyMatrixDetail.CompanyId);
                    viewModel.set('CompanyName', response.CompetencyMatrixDetail.CompanyName);
                    $('#CompanyId').attr('disabled', true);
                    viewModel.set('DisplayStatus', response.CompetencyMatrixDetail.DisplayStatus);

                    if (viewModel.CompanyId !== '') {
                        $('#titleMatrixDetails').attr('hidden', false);
                        $('#boxMatrixDetails').attr('hidden', false);
                    }

                    var Competencies = []
                    var SubTests = []
                    var Scores = []
                    if (response.CompetencyMatrixDetail.Competencies.length > 0) {
                        for (comp = 0; comp < response.CompetencyMatrixDetail.Competencies.length; comp++) {
                            if (response.CompetencyMatrixDetail.Competencies[comp].SubTests.length > 0) {
                                if (SubTests.length > 0) {
                                    SubTests = []
                                }
                                for (sub = 0; sub < response.CompetencyMatrixDetail.Competencies[comp].SubTests.length; sub++) {
                                    if (response.CompetencyMatrixDetail.Competencies[comp].SubTests[sub].Scores.length > 0) {
                                        if (Scores.length > 0) {
                                            Scores = []
                                        }
                                        for (score = 0; score < response.CompetencyMatrixDetail.Competencies[comp].SubTests[sub].Scores.length; score++) {
                                            Scores.push(response.CompetencyMatrixDetail.Competencies[comp].SubTests[sub].Scores[score])
                                        }
                                    }
                                    SubTests.push({
                                        TestToolCode: response.CompetencyMatrixDetail.Competencies[comp].SubTests[sub].TestToolCode,
                                        TestToolName: response.CompetencyMatrixDetail.Competencies[comp].SubTests[sub].TestToolName,
                                        SubTestCode: response.CompetencyMatrixDetail.Competencies[comp].SubTests[sub].SubTestCode,
                                        SubTestName: response.CompetencyMatrixDetail.Competencies[comp].SubTests[sub].SubTestName,
                                        IsParent: response.CompetencyMatrixDetail.Competencies[comp].SubTests[sub].IsParent,
                                        Weight: response.CompetencyMatrixDetail.Competencies[comp].SubTests[sub].Weight,
                                        Scores: Scores,
                                    })
                                }
                            }
                            Competencies.push({
                                CompetencyCode: response.CompetencyMatrixDetail.Competencies[comp].CompetencyCode,
                                CompetencyName: response.CompetencyMatrixDetail.Competencies[comp].CompetencyName,
                                SubTests: SubTests
                            })
                        }
                    }
                    viewModel.set('Competencies', Competencies);
                    for (selectedCompetency = 0; selectedCompetency < viewModel.Competencies.length; selectedCompetency++) {
                        viewModel.selectedCompetencies.push(viewModel.Competencies[selectedCompetency].CompetencyCode)
                    }


                    if (viewModel.Competencies.length > 1) {
                        //multiple competencies
                        for (addComptNum = 0; addComptNum < viewModel.Competencies.length; addComptNum++) {
                            $('#Competencies' + addComptNum).length == 1 ?
                                $('#Competencies' + addComptNum).remove() : null

                            $("#Competencies").scrollLeft();
                            $('#Competencies').append(
                                '<div class="Competencies" id="Competencies' + addComptNum + '" style="overflow-X:scroll">' +
                                    '<label style="width:18.5%; padding-left:4.5%; padding-right:7px">Competency<span class="mandatory">*</span></label>' +
                                    '<input data-type="combobox" id="CompetencyName' + addComptNum + '" name="CompetencyName' + addComptNum +
                                    '" data-bind="value:Competencies[' + addComptNum + '].CompetencyCode" class= "widthTextBox" style = "width:19.7%;" />' +
                                    '<label style="padding-left:8.5%; width:13.5%;">Weight</label><input type="text" id="WeightCompetency' + addComptNum + '" name="WeightCompetency' + addComptNum + '" style="width:7%;" value=' + viewModel.WeightCompetency + ' disabled="disabled" />' +
                                    '<a id="deleteCompetency' + addComptNum + '" competencies="' + addComptNum + '" onclick="deleteCompetency(this)" style="padding-left:8%; cursor:pointer"><i class="fas fa-trash-alt"></i></a>' +
                                    '<ul class="form-content">' +
                                        '<li>' +
                                            '<div class="entered">' +
                                                '<div>' +
                                                    '<table class="tableGrid" id="tableGrid' + addComptNum + '">' +
                                                    '</table>' +
                                                '</div>' +
                                            '</div>' +
                                        '</li>' +
                                    '</ul>' +
                                '</div>' +
                                '<br/>');
                            $('#CompetencyName' + addComptNum).val(viewModel.Competencies[addComptNum].CompetencyName);

                            if (addComptNum == (viewModel.Competencies.length - 1)) {
                                $('#deleteCompetency' + addComptNum).show()
                            } else {
                                $('#deleteCompetency' + addComptNum).hide()
                            }

                            for (comptList = 0; comptList < viewModel.CompetencyList.length; comptList++) {
                                if (viewModel.Competencies[addComptNum].CompetencyCode == viewModel.CompetencyList[comptList].CompetencyCode) {
                                    for (addSubTestNum = 0; addSubTestNum < viewModel.Competencies[addComptNum].SubTests.length; addSubTestNum++) {
                                        var columns = []
                                        var scores = []
                                        var no = 1;
                                        for (scoreList = 0; scoreList < viewModel.CompetencyList[comptList].ConfigMaxLength; scoreList++) {
                                            columns.push({
                                                title: no
                                            })
                                            no++
                                            scores.push(viewModel.Competencies[addComptNum].SubTests[addSubTestNum].Scores[scoreList])
                                        }
                                        break;
                                    }
                                } else {
                                    for (addSubTestNum = 0; addSubTestNum < viewModel.Competencies[addComptNum].SubTests.length; addSubTestNum++) {
                                        var columns = []
                                        var scores = []
                                        var no = 1;
                                        for (scoreList = 0; scoreList < viewModel.Competencies[addComptNum].SubTests[0].Scores.length; scoreList++) {
                                            columns.push({
                                                title: no
                                            })
                                            no++
                                            scores.push(viewModel.Competencies[addComptNum].SubTests[addSubTestNum].Scores[scoreList])
                                        }
                                        break;
                                    }
                                }
                            }

                            //change config score title
                            $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody tr#headerSubTest' + addComptNum).length == 1 ?
                                $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody tr#headerSubTest' + addComptNum).remove() :
                                $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#headerSubTest' + addComptNum).remove();

                            $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#headerSubTest' + addComptNum).length == 0 ?
                                $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div table#tableGrid' + addComptNum).append(
                                    '<tbody id="headerSubTest' + addComptNum + '" width="100%"></tbody>') : null

                            if (viewModel.Competencies[addComptNum].SubTests.length > 1) {
                                for (addSubTestNum = 0; addSubTestNum < viewModel.Competencies[addComptNum].SubTests.length; addSubTestNum++) {
                                    $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody tr#Label' + addSubTestNum + '' + addComptNum).length == 1 ?
                                        $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody tr#Label' + addSubTestNum + '' + addComptNum).remove() :
                                        $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).remove()
                                }
                            } else {
                                var addSubTestNum = 0;
                                $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody tr#Label' + addSubTestNum + '' + addComptNum).length == 1 ?
                                    $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody tr#Label' + addSubTestNum + '' + addComptNum).remove() :
                                    $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).remove()
                            }

                            //change title
                            $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#headerSubTest' + addComptNum).append(
                                '<td style="width:68px;" class="noneBorderGrid"></td>' +
                                '<td style="width:68px;" class="noneBorderGrid"></td>'
                            );
                            for (c = 0; c < columns.length; c++) {
                                $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#headerSubTest' + addComptNum).append(
                                    '<td class="headerTable" style="width:56px">' + columns[c].title + '</td>'
                                );
                            }
                            $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#headerSubTest' + addComptNum).append(
                                '<td style="width:36px;" class="noneBorderGrid"></td>'
                            );
                            //end of change title

                            if (viewModel.Competencies[addComptNum].SubTests.length > 1) {
                                for (addSubTestNum = 0; addSubTestNum < viewModel.Competencies[addComptNum].SubTests.length; addSubTestNum++) {
                                    if (addSubTestNum == 0) {
                                        $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).length == 0 ?
                                            $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div table#tableGrid' + addComptNum).append(
                                                '<tbody id="Label' + addSubTestNum + '' + addComptNum + '"></tbody>') :
                                            $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div table#tableGrid' + addComptNum).append(
                                                '<tbody id="Label' + (addSubTestNum + 1) + '' + addComptNum + '"></tbody>')

                                        //change number of config box
                                        $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).append(
                                            '<td class="noneBorderGrid"><input id="TestToolName' + addSubTestNum + '' + addComptNum + '" name="TestToolName' + addSubTestNum + '' + addComptNum + '" data-role="combobox" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].TestToolCode" style="width:100px;" /></td>' +
                                            '<td class="noneBorderGrid"><input id="SubTestName' + addSubTestNum + '' + addComptNum + '" name="SubTestName' + addSubTestNum + '' + addComptNum + '" data-role="combobox" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].SubTestCode" style="width:100px;" /></td>'
                                        );
                                        for (c = 0; c < columns.length; c++) {
                                            $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).append(
                                                '<td><input type="number" style="width:56px" class="k-textbox formTable" name="no' + c + '' + addSubTestNum + '' + addComptNum + '" id="no' + c + '' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].Scores[' + c + ']" no="' + addSubTestNum + '" competencies="' + addComptNum + '" index="' + c + '" onChange="onChangeScore(this)" /></td>'
                                            );
                                            $('#no' + c + addSubTestNum + addComptNum).val(viewModel.Competencies[addComptNum].SubTests[addSubTestNum].Scores[c]);
                                        }
                                        $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).append(
                                            '<td class="noneBorderGrid"><input style="width:36px;" type="text" id="Weight' + addSubTestNum + '' + addComptNum + '" name="Weight' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].Weight" no="' + addSubTestNum + '" competencies="' + addComptNum + '" onChange="onChangeWeight(this)" /></td>' +
                                            '<td class="noneBorderGrid"><a style="cursor:pointer" id="addSubTest' + addSubTestNum + '' + addComptNum + '" no="' + addSubTestNum + '" competencies="' + addComptNum + '" competencyName="' + response.CompetencyMatrixDetail.Competencies[addComptNum].CompetencyName + '" onclick="addSubTest(this)"><i class="fas fa-plus"></i></a></td>'
                                        );
                                        $('#Weight' + addSubTestNum + addComptNum).val(viewModel.Competencies[addComptNum].SubTests[addSubTestNum].Weight);
                                        //end of change number of config box

                                        TestToolByCompanyCompetencyMatrixEdit(addSubTestNum, addComptNum);
                                        CompetencyLoad(addSubTestNum, addComptNum);
                                    } else if (addSubTestNum <= viewModel.Competencies[addComptNum].SubTests.length) {
                                        //cek apakah sudah ada tbodynya
                                        $('#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).length == 1 ?
                                            $('#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).remove() : null

                                        $('#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).length == 0 ?
                                            $('#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div table#tableGrid' + addComptNum).append(
                                                '<tbody id="Label' + addSubTestNum + '' + addComptNum + '"></tbody>') : null

                                        //add config box
                                        $('#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).append(
                                            '<td class="noneBorderGrid"><input id="TestToolName' + addSubTestNum + '' + addComptNum + '" name="TestToolName' + addSubTestNum + '' + addComptNum + '" data-role="combobox" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].TestToolCode" style="width:100px;" /></td>' +
                                            '<td class="noneBorderGrid"><input id="SubTestName' + addSubTestNum + '' + addComptNum + '" name="SubTestName' + addSubTestNum + '' + addComptNum + '" data-role="combobox" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].SubTestCode" style="width:100px;" /></td>'
                                        );

                                        for (c = 0; c < columns.length; c++) {
                                            $('#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).append(
                                                '<td><input type="number" style="width:56px" class="k-textbox formTable" name="no' + c + '' + addSubTestNum + '' + addComptNum + '" id="no' + c + '' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].Scores[' + c + ']" no="' + addSubTestNum + '" competencies="' + addComptNum + '" index="' + c + '" onChange="onChangeScore(this)" /></td>'
                                            );
                                            $('#no' + c + addSubTestNum + addComptNum).val(viewModel.Competencies[addComptNum].SubTests[addSubTestNum].Scores[c]);
                                        }

                                        $('#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).append(
                                            '<td class="noneBorderGrid"><input type="text" id="Weight' + addSubTestNum + '' + addComptNum + '" name="Weight' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].Weight" style="width:36px;" no="' + addSubTestNum + '" competencies="' + addComptNum + '" onChange="onChangeWeight(this)" /></td>' +
                                            '<td class="noneBorderGrid" id="deleteSubTest' + addSubTestNum + '' + addComptNum + '"><a style="cursor:pointer" id="deleteSubTest' + addSubTestNum + '' + addComptNum + '" no="' + addSubTestNum + '" competencies="' + addComptNum + '"  onclick="deleteSubTest(this)"><i class="fas fa-trash-alt"></i></a></td>'
                                        );
                                        $('#Weight' + addSubTestNum + addComptNum).val(viewModel.Competencies[addComptNum].SubTests[addSubTestNum].Weight);

                                        if (addSubTestNum == (viewModel.Competencies[addComptNum].SubTests.length - 1)) {
                                            $('#deleteSubTest' + addSubTestNum + addComptNum).show()
                                        } else {
                                            $('#deleteSubTest' + addSubTestNum + addComptNum).hide()
                                        }
                                        //end of add config box

                                        $('#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).append(
                                            '</tr>'
                                        );

                                        $('#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div table#tableGrid' + addComptNum).append(
                                            '<tbody id="Label' + (addSubTestNum + 1) + '' + addComptNum + '"></tbody>'
                                        );
                                        TestToolByCompanyCompetencyMatrixEdit(addSubTestNum, addComptNum);
                                    }
                                }
                            } else {
                                var addSubTestNum = 0;
                                $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).length == 0 ?
                                    $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div table#tableGrid' + addComptNum).append(
                                        '<tbody id="Label' + addSubTestNum + '' + addComptNum + '"></tbody>') :
                                    $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div table#tableGrid' + addComptNum).append(
                                        '<tbody id="Label' + (addSubTestNum + 1) + '' + addComptNum + '"></tbody>')

                                //change number of config box
                                $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).append(
                                    '<td class="noneBorderGrid"><input id="TestToolName' + addSubTestNum + '' + addComptNum + '" name="TestToolName' + addSubTestNum + '' + addComptNum + '" data-role="combobox" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].TestToolCode" style="width:100px;" /></td>' +
                                    '<td class="noneBorderGrid"><input id="SubTestName' + addSubTestNum + '' + addComptNum + '" name="SubTestName' + addSubTestNum + '' + addComptNum + '" data-role="combobox" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].SubTestCode" style="width:100px;" /></td>'
                                );
                                for (c = 0; c < columns.length; c++) {
                                    $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).append(
                                        '<td><input type="number" style="width:56px" class="k-textbox formTable" name="no' + c + '' + addSubTestNum + '' + addComptNum + '" id="no' + c + '' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].Scores[' + c + ']" no="' + addSubTestNum + '" competencies="' + addComptNum + '" index="' + c + '" onChange="onChangeScore(this)" /></td>'
                                    );
                                    $('#no' + c + addSubTestNum + addComptNum).val(viewModel.Competencies[addComptNum].SubTests[addSubTestNum].Scores[c]);
                                }
                                $('#Competencies > div#Competencies' + addComptNum + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + addComptNum).append(
                                    '<td class="noneBorderGrid"><input style="width:36px;" type="text" id="Weight' + addSubTestNum + '' + addComptNum + '" name="Weight' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].Weight" no="' + addSubTestNum + '" competencies="' + addComptNum + '" onChange="onChangeWeight(this)" /></td>' +
                                    '<td class="noneBorderGrid"><a style="cursor:pointer" id="addSubTest' + addSubTestNum + '' + addComptNum + '" no="' + addSubTestNum + '" competencies="' + addComptNum + '" competencyName="' + response.CompetencyMatrixDetail.Competencies[addComptNum].CompetencyName + '" onclick="addSubTest(this)"><i class="fas fa-plus"></i></a></td>'
                                );
                                $('#Weight' + addSubTestNum + addComptNum).val(viewModel.Competencies[addComptNum].SubTests[addSubTestNum].Weight);
                                //end of change number of config box

                                TestToolByCompanyCompetencyMatrixEdit(addSubTestNum, addComptNum);
                                CompetencyLoad(addSubTestNum, addComptNum);
                            }
                        }
                    }
                    else {
                        //1 competency 
                        var addSubTestNum = 0;
                        for (competencies = 0; competencies < viewModel.Competencies.length; competencies++) {
                            for (comptList = 0; comptList < viewModel.CompetencyList.length; comptList++) {
                                if (viewModel.Competencies[competencies].CompetencyCode == viewModel.CompetencyList[comptList].CompetencyCode) {
                                    for (addSubTestNum = 0; addSubTestNum < viewModel.Competencies[competencies].SubTests.length; addSubTestNum++) {
                                        var columns = []
                                        var scores = []
                                        var no = 1;
                                        for (scoreList = 0; scoreList < viewModel.CompetencyList[comptList].ConfigMaxLength; scoreList++) {
                                            columns.push({
                                                title: no
                                            })
                                            no++
                                            scores.push(viewModel.Competencies[competencies].SubTests[addSubTestNum].Scores[scoreList])
                                        }
                                        break;
                                    }
                                } else {
                                    for (addSubTestNum = 0; addSubTestNum < viewModel.Competencies[competencies].SubTests.length; addSubTestNum++) {
                                        var columns = []
                                        var scores = []
                                        var no = 1;
                                        for (scoreList = 0; scoreList < viewModel.Competencies[competencies].SubTests[0].Scores.length; scoreList++) {
                                            columns.push({
                                                title: no
                                            })
                                            no++
                                            scores.push(viewModel.Competencies[competencies].SubTests[addSubTestNum].Scores[scoreList])
                                        }
                                        break;
                                    }
                                }
                            }

                            $("#CompetencyName" + competencies).data("kendoComboBox").value(viewModel.Competencies[competencies].CompetencyName)

                            //change config score title
                            $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody tr#headerSubTest' + competencies).length == 1 ?
                                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody tr#headerSubTest' + competencies).remove() : 
                                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#headerSubTest' + competencies).remove();

                            $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody tr#Label' + addSubTestNum + '' + competencies).length == 1 ?
                                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody tr#Label' + addSubTestNum + '' + competencies).remove() :
                                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).remove()

                            $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#headerSubTest' + competencies).length == 0 ?
                                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div table#tableGrid' + competencies).append(
                                    '<tbody id="headerSubTest' + competencies + '" width="100%"></tbody>') : null

                            //change title
                            $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#headerSubTest' + competencies).append(
                                '<td style="width:68px;" class="noneBorderGrid"></td>' +
                                '<td style="width:68px;" class="noneBorderGrid"></td>'
                            );
                            for (c = 0; c < columns.length; c++) {
                                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#headerSubTest' + competencies).append(
                                    '<td class="headerTable" style="width:56px">' + columns[c].title + '</td>'
                                );
                            }
                            $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#headerSubTest' + competencies).append(
                                '<td style="width:36px;" class="noneBorderGrid"></td>'
                            );
                            //end of change title

                            $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).length == 0 ?
                                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div table#tableGrid' + competencies).append(
                                    '<tbody id="Label' + addSubTestNum + '' + competencies + '"></tbody>') :
                                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div table#tableGrid' + competencies).append(
                                    '<tbody id="Label' + (addSubTestNum + 1) + '' + competencies + '"></tbody>')

                            //change number of config box
                            $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).append(
                                '<td class="noneBorderGrid"><input id="TestToolName' + addSubTestNum + '' + competencies + '" name="TestToolName' + addSubTestNum + '' + competencies + '" data-role="combobox" data-bind="value:Competencies[' + competencies + '].SubTests[' + addSubTestNum + '].TestToolCode" style="width:100px;" /></td>' +
                                '<td class="noneBorderGrid"><input id="SubTestName' + addSubTestNum + '' + competencies + '" name="SubTestName' + addSubTestNum + '' + competencies + '" data-role="combobox" data-bind="value:Competencies[' + competencies + '].SubTests[' + addSubTestNum + '].SubTestCode" style="width:100px;" /></td>'
                            );
                            for (c = 0; c < columns.length; c++) {
                                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).append(
                                    '<td><input type="number" style="width:56px" class="k-textbox formTable" name="no' + c + '' + addSubTestNum + '' + competencies + '" id="no' + c + '' + addSubTestNum + '' + competencies + '" data-bind="value:Competencies[' + competencies + '].SubTests[' + addSubTestNum + '].Scores[' + c + ']" no="' + addSubTestNum + '" competencies="' + competencies + '" index="' + c + '" onChange="onChangeScore(this)" /></td>'
                                );
                                $('#no' + c + addSubTestNum + competencies).val(viewModel.Competencies[competencies].SubTests[addSubTestNum].Scores[c]);
                            }
                            $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).append(
                                '<td class="noneBorderGrid"><input style="width:36px;" type="text" id="Weight' + addSubTestNum + '' + competencies + '" name="Weight' + addSubTestNum + '' + competencies + '" data-bind="value:Competencies[' + competencies + '].SubTests[' + addSubTestNum + '].Weight" no="' + addSubTestNum + '" competencies="' + competencies + '" onChange="onChangeWeight(this)" /></td>' +
                                '<td class="noneBorderGrid"><a style="cursor:pointer" id="addSubTest' + addSubTestNum + '' + competencies + '" no="' + addSubTestNum + '" competencies="' + competencies + '" competencyName="' + response.CompetencyMatrixDetail.Competencies[competencies].CompetencyName + '" onclick="addSubTest(this)"><i class="fas fa-plus"></i></a></td>'
                            );
                            $('#Weight' + addSubTestNum + competencies).val(viewModel.Competencies[competencies].SubTests[addSubTestNum].Weight);
                            //end of change number of config box

                            TestToolByCompanyCompetencyMatrixEdit(addSubTestNum, competencies);
                        }
                        addSubTestNum++;

                        //multiple sub test
                        if (addSubTestNum > 0) {
                            for (compt = 0; compt < viewModel.Competencies.length; compt++) {
                                for (addSubTestNumber = 1; addSubTestNumber < viewModel.Competencies[compt].SubTests.length; addSubTestNumber++) {
                                    //cek apakah sudah ada tbodynya
                                    $('#Competencies' + compt + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNumber + '' + compt).length == 1 ?
                                        $('#Competencies' + compt + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNumber + '' + compt).remove() : null
                                            
                                    $('#Competencies' + compt + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNumber + '' + compt).length == 0 ?
                                        $('#Competencies' + compt + ' > ul.form-content > li > div.entered > div table#tableGrid' + compt).append(
                                            '<tbody id="Label' + addSubTestNumber + '' + compt + '"></tbody>') : null

                                    //add config box
                                    $('#Competencies' + compt + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNumber + '' + compt).append(
                                        '<td class="noneBorderGrid"><input id="TestToolName' + addSubTestNumber + '' + compt + '" name="TestToolName' + addSubTestNumber + '' + compt + '" data-role="combobox" data-bind="value:Competencies[' + compt + '].SubTests[' + addSubTestNumber + '].TestToolCode" style="width:100px;" /></td>' +
                                        '<td class="noneBorderGrid"><input id="SubTestName' + addSubTestNumber + '' + compt + '" name="SubTestName' + addSubTestNumber + '' + compt + '" data-role="combobox" data-bind="value:Competencies[' + compt + '].SubTests[' + addSubTestNumber + '].SubTestCode" style="width:100px;" /></td>'
                                    );

                                    for (c = 0; c < columns.length; c++) {
                                        $('#Competencies' + compt + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNumber + '' + compt).append(
                                            '<td><input type="number" style="width:56px" class="k-textbox formTable" name="no' + c + '' + addSubTestNumber + '' + compt + '" id="no' + c + '' + addSubTestNumber + '' + compt + '" data-bind="value:Competencies[' + compt + '].SubTests[' + addSubTestNumber + '].Scores[' + c + ']" no="' + addSubTestNumber + '" competencies="' + compt + '" index="' + c + '" onChange="onChangeScore(this)" /></td>'
                                        );
                                        $('#no' + c + addSubTestNumber + compt).val(viewModel.Competencies[compt].SubTests[addSubTestNumber].Scores[c]);
                                    }

                                    $('#Competencies' + compt + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNumber + '' + compt).append(
                                        '<td class="noneBorderGrid"><input type="text" id="Weight' + addSubTestNumber + '' + compt + '" name="Weight' + addSubTestNumber + '' + compt + '" data-bind="value:Competencies[' + compt + '].SubTests[' + addSubTestNumber + '].Weight" style="width:36px;" no="' + addSubTestNumber + '" competencies="' + compt + '" onChange="onChangeWeight(this)" /></td>' +
                                        '<td class="noneBorderGrid" id="deleteSubTest' + addSubTestNumber + '' + compt + '"><a style="cursor:pointer" id="deleteSubTest' + addSubTestNumber + '' + compt + '" no="' + addSubTestNumber + '" competencies="' + compt + '"  onclick="deleteSubTest(this)"><i class="fas fa-trash-alt"></i></a></td>'
                                    );
                                    $('#Weight' + addSubTestNumber + compt).val(viewModel.Competencies[compt].SubTests[addSubTestNumber].Weight);

                                    if (addSubTestNumber == (viewModel.Competencies[compt].SubTests.length - 1)) {
                                        $('#deleteSubTest' + addSubTestNumber + compt).show()
                                    } else {
                                        $('#deleteSubTest' + addSubTestNumber + compt).hide()
                                    }
                                    //end of add config box

                                    $('#Competencies' + compt + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNumber + '' + compt).append(
                                        '</tr>'
                                    );

                                    $('#Competencies' + compt + ' > ul.form-content > li > div.entered > div table#tableGrid' + compt).append(
                                        '<tbody id="Label' + (addSubTestNumber + 1) + '' + compt + '"></tbody>'
                                    );
                                    TestToolByCompanyCompetencyMatrixEdit(addSubTestNumber, compt);
                                }
                            }
                        }
                    }
                }
            },
            error: function (x, e) {
                alert('error ajax');
            }
        });

    }
}

CompanyLoad = function () {
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/Dropdown/Company",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.Data.length < 1) {
                LoadingMask.hide();
                swal("Failed!!!", "Company Not Found", "warning", { closeOnClickOutside: false });
                return;
            } else {
                viewModel.set('CompanyList', response.Data);
                if (viewModel.CompanyName !== '') {
                    viewModel.set('CompanyName', viewModel.CompanyName)
                } else {
                    viewModel.set('CompanyName', "");
                }
                LoadingMask.hide();
                dropDownCompany();
            }
        }
    });
}
dropDownCompany = function () {
    $("#CompanyId").kendoComboBox({
        autoBind: true,
        placeholder: "Select Company..",
        dataSource: viewModel.CompanyList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            $('#titleMatrixDetails').attr('hidden', false);
            $('#boxMatrixDetails').attr('hidden', false);
            var id = viewModel.CompanyList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.CompanyList.find(x => x.Value === e.item.context.innerHTML).Value;
            if (viewModel.CompanyId !== "") {
                viewModel.set('CompanyId', id);
                viewModel.set('CompanyName', name);
                if (viewModel.Competencies.length > 1) {
                    $('#Competencies > div.Competencies' ).remove();
                }
                TestToolByCompanyCompetencyMatrix();
            } else {
                viewModel.set('CompanyId', id);
                viewModel.set('CompanyName', name);
                TestToolByCompanyCompetencyMatrix();
            }
        }
    });
}

CompetencyLoad = function (count, competencies) {
    if (count == undefined || count == null || competencies == undefined || competencies == null) {
        count = 0;
        competencies = 0;
    } else {
        count = count;
        competencies = competencies;
    }
    LoadingMask.show();
    $.ajax({
        type: 'POST',
        url: SERVICE_URL + "api/CompetencyMatrix/GetCompetencies",
        headers: { "Authorization-Token": Cookie.load() },
        success: function (response) {
            if (response.CompetencyList.length < 1) {
                LoadingMask.hide();
                swal("Failed!", "Competency Not Found", "warning", { closeOnClickOutside: false });
                return;
            } else {
                viewModel.set('CompetencyList', response.CompetencyList);
                if (viewModel.Competencies[competencies].CompetencyCode !== '') {
                    viewModel.Competencies[competencies].set('CompetencyCode', viewModel.Competencies[competencies].CompetencyCode)
                    viewModel.Competencies[competencies].set('CompetencyName', viewModel.Competencies[competencies].CompetencyName)
                } else {
                    viewModel.Competencies[competencies].set('CompetencyCode', "");
                }
                LoadingMask.hide();
                dropDownCompetency(count, competencies);
            }
        }
    });
}
dropDownCompetency = function (count, competencies) {
    if(count == undefined || count == null || competencies == undefined || competencies == null) {
        count = 0;
        competencies = 0;
    } else {
        count = count;
        competencies = competencies;
    }
    $("#CompetencyName" + competencies).kendoComboBox({
        autoBind: true,
        placeholder: "Select Competency..",
        dataSource: viewModel.CompetencyList,
        dataTextField: "CompetencyName",
        dataValueField: "CompetencyCode",
        select: function (e) {
            var CompetencyCode = viewModel.CompetencyList.find(x => x.CompetencyName === e.item.context.innerHTML).CompetencyCode;
            var CompetencyName = viewModel.CompetencyList.find(x => x.CompetencyName === e.item.context.innerHTML).CompetencyName;
            var ConfigMaxLength = viewModel.CompetencyList.find(x => x.CompetencyName === e.item.context.innerHTML).ConfigMaxLength;
            
            for (a = 0; a < viewModel.Competencies.length; a++) {
                if (viewModel.Competencies[a].CompetencyCode == "") {
                    //add comp baru
                    viewModel.set('CompetencyCode' + competencies, CompetencyCode);
                    viewModel.set('CompetencyName' + competencies, CompetencyName);
                    viewModel.set('ConfigMaxLength' + competencies, ConfigMaxLength);
                    viewModel.Competencies[competencies].SubTests[count].set('TestToolCode', "");
                    viewModel.Competencies[competencies].SubTests[count].set('SubTestCode', "");
                    viewModel.Competencies[competencies].set('CompetencyCode', CompetencyCode);
                    viewModel.Competencies[competencies].set('CompetencyName', CompetencyName);
                } else {
                    //edit lalu ubah salah satu competency
                    viewModel.set('CompetencyCode' + competencies, CompetencyCode);
                    viewModel.set('CompetencyName' + competencies, CompetencyName);
                    viewModel.set('ConfigMaxLength' + competencies, ConfigMaxLength);
                    viewModel.Competencies[competencies].set('CompetencyCode', CompetencyCode);
                    viewModel.Competencies[competencies].set('CompetencyName', CompetencyName);
                }
            }

            for (b = 0; b < viewModel.Competencies.length; b++) {
                var repeatedCompetency = [];
                for (var t in viewModel.Competencies) {
                    var exists_competency_len = $.map(viewModel.Competencies, function (n, i) {
                        if (n.CompetencyCode == viewModel.Competencies[t].CompetencyCode) {
                            return i;
                        }
                    }).length;
                    if (exists_competency_len > 1) {
                        repeatedCompetency.push(viewModel.Competencies[t].CompetencyCode);
                    }
                }
            }
            if (repeatedCompetency.length > 0) {
                confirmMessageDuplicateCompetency();
                $('.swal-button--defeat').on('click', function () {
                    viewModel.set('CompetencyCode' + competencies, "");
                    viewModel.set('CompetencyName' + competencies, "");
                    viewModel.set('ConfigMaxLength' + competencies, "");
                    viewModel.Competencies[competencies].set('CompetencyCode', "");
                    viewModel.Competencies[competencies].set('CompetencyName', "");
                    $('#CompetencyName' + competencies).data("kendoComboBox").value('')
                })
            } else {
                onChangeConfigLength(e, competencies);
            }
        }
    });
}

onChangeConfigLength = function (data, count) {
    var CompetencyName = data.item.context.innerHTML;
    var CompetencyList = viewModel.CompetencyList;
    var competencies = count;
    var addSubTestNum = 0;

    for (subtest = 0; subtest < viewModel.Competencies[competencies].SubTests.length; subtest++) {
        $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody tr#Label' + subtest + '' + competencies).length == 1 ?
            $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody tr#Label' + subtest + '' + competencies).remove() :
            $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + subtest + '' + competencies).remove()
    }

    viewModel.Competencies[competencies].set('SubTests', [])
    var SubTest = {
        TestToolCode: '',
        SubTestCode: '',
        IsParent: '',
        Weight: '',
        Scores: []
    };
    viewModel.Competencies[competencies].SubTests.push(SubTest);

    $("#Competencies").scrollLeft();

    for (a = 0; a < CompetencyList.length; a++) {
        if (CompetencyName == CompetencyList[a].CompetencyName) {
            viewModel.Competencies[competencies].SubTests[addSubTestNum].Scores.length = CompetencyList[a].ConfigMaxLength;
            if (viewModel.Competencies[competencies].SubTests[addSubTestNum].Scores.length > 0) {
                var columns = [];
                var scores = [];
                var no = 1;
                for (b = 0; b < CompetencyList[a].ConfigMaxLength; b++) {
                    columns.push({
                        title: '' + no
                    })
                    no++;
                    scores.push(0);
                }
                viewModel.Competencies[competencies].SubTests[addSubTestNum].set('Scores', scores);
                
                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody tr#headerSubTest' + competencies).length == 1 ?
                    $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody tr#headerSubTest' + competencies).remove() :
                    $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#headerSubTest' + competencies).remove();

                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#headerSubTest' + competencies).length == 0 ?
                    $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div table#tableGrid' + competencies).append(
                        '<tbody id="headerSubTest' + competencies + '" width="100%"></tbody>') : null

                //change title
                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#headerSubTest' + competencies).append(
                    '<td style="width:68px;" class="noneBorderGrid"></td>' +
                    '<td style="width:68px;" class="noneBorderGrid"></td>'
                );
                for (c = 0; c < columns.length; c++) {
                    $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#headerSubTest' + competencies).append(
                        '<td class="headerTable" style="width:56px">' + columns[c].title + '</td>'
                    );
                }
                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#headerSubTest' + competencies).append(
                    '<td style="width:36px;" class="noneBorderGrid"></td>'
                );
                //end of change title

                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).length == 0 ?
                    $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div table#tableGrid' + competencies).append(
                        '<tbody id="Label' + addSubTestNum + '' + competencies + '"></tbody>') :
                    $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div table#tableGrid' + competencies).append(
                            '<tbody id="Label' + (addSubTestNum + 1) + '' + competencies + '"></tbody>')

                //change number of config box
                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).append(
                    '<td class="noneBorderGrid"><input id="TestToolName' + addSubTestNum + '' + competencies + '" name="TestToolName' + addSubTestNum + '' + competencies + '" data-role="combobox" data-bind="value:Competencies[' + competencies + '].SubTests[' + addSubTestNum + '].TestToolCode' + addSubTestNum + '' + competencies + '" style="width:100px;" /></td>' +
                    '<td class="noneBorderGrid"><input id="SubTestName' + addSubTestNum + '' + competencies + '" name="SubTestName' + addSubTestNum + '' + competencies + '" data-role="combobox" data-bind="value:Competencies[' + competencies + '].SubTests[' + addSubTestNum + '].SubTestCode' + addSubTestNum + '' + competencies + '" style="width:100px;" /></td>'
                );
                for (c = 0; c < columns.length; c++) {
                    $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).append(
                        '<td><input type="number" style="width:56px" class="k-textbox formTable" name="no' + c + '' + competencies + '" id="no' + c + '' + competencies + '" data-bind="value:Competencies[' + competencies + '].SubTests[' + addSubTestNum + '].Scores[' + c + ']" no="' + addSubTestNum + '" competencies="' + competencies + '" index="' + c + '" onChange="onChangeScore(this)" /></td>'
                    );
                }
                $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).append(
                    '<td class="noneBorderGrid"><input style="width:36px;" type="text" id="Weight' + addSubTestNum + '' + competencies + '" name="Weight' + addSubTestNum + '' + competencies + '" data-bind="value:Competencies[' + competencies + '].SubTests[' + addSubTestNum + '].Weight" no="' + addSubTestNum + '" competencies="' + competencies + '" onChange="onChangeWeight(this)" /></td>' +
                    '<td class="noneBorderGrid"><a style="cursor:pointer" id="addSubTest' + addSubTestNum + '' + competencies + '" no="' + addSubTestNum + '" competencies="' + competencies + '" competencyName="' + CompetencyName + '" onclick="addSubTest(this)"><i class="fas fa-plus"></i></a></td>'
                );
                //end of change number of config box
            } else {
                swal("Failed!!!", "Config Max Length is 0", "warning", { closeOnClickOutside: false });
            }
        }
    }

    dropDownCompetency(addSubTestNum, competencies);
    dropDownTestTool(addSubTestNum, competencies);
    dropDownSubTest(addSubTestNum, competencies);
    $(data).removeAttr('competencies');
    $(data).attr('competencies', competencies);
}

onChangeScore = function (data) {
    var competencies = parseInt($(data).attr('competencies'))
    var subTest = parseInt($(data).attr('no'))
    var score = parseInt($(data).attr('index'))
    var value = parseFloat($(data).val())

    viewModel.Competencies[competencies].SubTests[subTest].set('Scores[' + score + ']', value)
}

onChangeWeight = function (data) {
    var competencies = parseInt($(data).attr('competencies'))
    var subTest = parseInt($(data).attr('no'))
    var value = $(data).val()
    var percent = 100
    var percentageValue = (value.replace(',', '.')/percent) * 100

    //value.indexOf('.') == -1 >>>> PAKAI KOMA
    if (value.indexOf('.') == -1) {
        if (value.substring(value.indexOf(','), value.indexOf(',').length).length > 3) {
            swal("Invalid!", "Weight value must be maximum 2 decimal places", "warning", { closeOnClickOutside: false });
            return;
        } else {
            viewModel.Competencies[competencies].SubTests[subTest].set('Weight', percentageValue);
        }
    }

    //value.indexOf(',') == -1 >>>> PAKAI TITIK
    if (value.indexOf(',') == -1) {
        if (value.substring(value.indexOf('.'), value.indexOf('.').length).length > 3) {
            swal("Invalid!", "Weight value must be maximum 2 decimal places", "warning", { closeOnClickOutside: false });
            return;
        } else {
            viewModel.Competencies[competencies].SubTests[subTest].set('Weight', percentageValue);
        }
    }
}

dropDownTestTool = function (count, competencies) {
    if (count == undefined || count == null || competencies == undefined || competencies == null) {
        count = 0;
        competencies = 0;
    } else {
        count = count;
        competencies = competencies;
    }
    $("#TestToolName" + count + competencies).kendoComboBox({
        autoBind: true,
        placeholder: "Select Test Tool..",
        dataSource: viewModel.TestToolList,
        dataTextField: "Value",
        dataValueField: "Code",
        select: function (e) {
            var id = viewModel.TestToolList.find(x => x.Value === e.item.context.innerHTML).Code;
            var name = viewModel.TestToolList.find(x => x.Value === e.item.context.innerHTML).Value;
            viewModel.Competencies[competencies].SubTests[count].set('TestToolCode', id);
            SubTestMappingByTestToolCompetencyMatrix(count, competencies);
        }
    });
}

dropDownSubTest = function (count, competencies) {
    if (count == undefined || count == null || competencies == undefined || competencies == null) {
        count = 0;
        competencies = 0;
    } else {
        count = count;
        competencies = competencies
    }
    if (viewModel.SubTestList.length > 0) {
        for (a = 0; a < viewModel.SubTestList.length; a++) {
            if (viewModel.Competencies[competencies].SubTests[count].TestToolCode == viewModel.SubTestList[a].TestToolCode) {
                var datasource = viewModel.SubTestList[a].data
            }
        }
    }
    $('#SubTestName' + count + competencies).kendoComboBox({
        autoBind: true,
        placeholder: 'Select Sub Test...',
        dataSource: datasource,
        dataTextField: 'Value',
        dataValueField: '',
        select: function (e) {
            var id = datasource.find(x => x.Value === e.item.context.innerHTML).Code;
            var isParent = datasource.find(x => x.Value === e.item.context.innerHTML).IsParent;
            for (sub = 0; sub < viewModel.Competencies[competencies].SubTests.length; sub++) {
                if (id == viewModel.Competencies[competencies].SubTests[sub].SubTestCode) {
                    confirmMessageDuplicateSubTest();
                    $('.swal-button--defeat').on('click', function () {
                        $('#SubTestName' + count + competencies).data('kendoComboBox').value("");
                        viewModel.Competencies[competencies].SubTests[count].set('SubTestCode', "");
                    })
                }
            }
            viewModel.Competencies[competencies].SubTests[count].set('SubTestCode', id);
            viewModel.Competencies[competencies].SubTests[count].set('IsParent', isParent);
        }
    });
}

addCompetency = function (data) {
    if (viewModel.title == 'Edit Competency Matrix') {
        var addComptNum = viewModel.Competencies.length;
        //var addComptNum = competencies + 1;
        var addSubTestNum = 0;
    } else {
        var competencies = parseInt($(data).attr('competencies'));
        var addComptNum = competencies + 1;
        var addSubTestNum = 0;
    }

    var Competencies = viewModel.Competencies;
    var Competency = [{
        CompetencyCode: '',
        SubTests: [{
            TestToolCode: '',
            SubTestCode: '',
            IsParent: '',
            Weight: '',
            Scores: []
        }]
    }];
    Competencies.push(Competency[0]);


    $('#Competencies').append('<div class="Competencies" id="Competencies' + addComptNum + '" style="overflow-X:scroll">' +
        '<label style="width:18.5%; padding-left:4.5%; padding-right:7px">Competency<span class="mandatory">*</span></label>' +
        '<input data-type="combobox" id="CompetencyName' + addComptNum + '" name="CompetencyName' + addComptNum +
        '" data-bind="value:' + Competencies[addComptNum].CompetencyCode + '" class= "widthTextBox" style = "width:19.7%;" />' +
        '<label style="padding-left:8.5%; width:13.5%;">Weight</label><input type="text" id="WeightCompetency' + addComptNum + '" name="WeightCompetency' + addComptNum + '" style="width:7%;" value=' + viewModel.WeightCompetency + ' disabled="disabled" />' +
        '<a id="deleteCompetency' + addComptNum + '" competencies="' + addComptNum + '" onclick="deleteCompetency(this)" style="padding-left:8%; cursor:pointer"><i class="fas fa-trash-alt"></i></a>' +
        '<ul class="form-content">' +
            '<li>' +
                '<div class="entered">' +
                    '<div>' +
                        '<table class="tableGrid" id="tableGrid' + addComptNum + '">' +
                            '<tr id="headerSubTest' + addComptNum + '"  class="headerList' + addComptNum + '">' +
                                '<td style="width:68px" class="noneBorderGrid"></td>' +
                                '<td style="width:68px" class="noneBorderGrid"></td>' +
                                '<td class="headerTable">1</td>' +
                                '<td class="headerTable">2</td>' +
                                '<td class="headerTable">3</td>' +
                                '<td class="headerTable">4</td>' +
                                '<td class="headerTable">5</td>' +
                                '<td class="headerTable">6</td>' +
                                '<td class="headerTable">7</td>' +
                                '<td class="headerTable">8</td>' +
                                '<td class="headerTable">9</td>' +
                                '<td class="headerTable">10</td>' +
                                '<td style="width:36px" class="noneBorderGrid"></td>' +
                            '</tr>' +
                            '<tbody id="headerSubTest' + addComptNum + '"></tbody>' +
                            '<tr id="Label' + addSubTestNum + '' + addComptNum + '" class="SubTestLists' + addComptNum + '">' +
                                '<td class="noneBorderGrid"><input id="TestToolName' + addSubTestNum + '' + addComptNum + '" name="TestToolName' + addSubTestNum + '' + addComptNum + '" data-role="combobox" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].TestToolCode" style="width:100px;" /></td>' +
                                '<td class="noneBorderGrid"><input id="SubTestName' + addSubTestNum + '' + addComptNum + '" name="SubTestName' + addSubTestNum + '' + addComptNum + '" data-role="combobox" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].SubTestCode" style="width:100px;" /></td>' +
                                '<td><input type="number" name="no1' + addSubTestNum + '' + addComptNum + '" class="k-textbox formTable" id="no1' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].V1" /></td>' +
                                '<td><input type="number" name="no2' + addSubTestNum + '' + addComptNum + '" class="k-textbox formTable" id="no2' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].V2" /></td>' +
                                '<td><input type="number" name="no3' + addSubTestNum + '' + addComptNum + '" class="k-textbox formTable" id="no3' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].V3" /></td>' +
                                '<td><input type="number" name="no4' + addSubTestNum + '' + addComptNum + '" class="k-textbox formTable" id="no4' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].V4" /></td>' +
                                '<td><input type="number" name="no5' + addSubTestNum + '' + addComptNum + '" class="k-textbox formTable" id="no5' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].V5" /></td>' +
                                '<td><input type="number" name="no6' + addSubTestNum + '' + addComptNum + '" class="k-textbox formTable" id="no6' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].V6" /></td>' +
                                '<td><input type="number" name="no7' + addSubTestNum + '' + addComptNum + '" class="k-textbox formTable" id="no7' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].V7" /></td>' +
                                '<td><input type="number" name="no8' + addSubTestNum + '' + addComptNum + '" class="k-textbox formTable" id="no8' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].V8" /></td>' +
                                '<td><input type="number" name="no9' + addSubTestNum + '' + addComptNum + '" class="k-textbox formTable" id="no9' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].V9" /></td>' +
                                '<td><input type="number" name="no10' + addSubTestNum + '' + addComptNum + '" class="k-textbox formTable" id="no10' + addSubTestNum + '' + addComptNum + '" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].V10" /></td>' +
                                '<td class="noneBorderGrid"><input type="text" id="Weight' + addSubTestNum + '' + addComptNum + '" name="Weight' + addSubTestNum + '' + addComptNum + '" style="width:36px" data-bind="value:Competencies[' + addComptNum + '].SubTests[' + addSubTestNum + '].Weight" no="' + addSubTestNum + '" competencies="' + addComptNum + '" onChange="onChangeWeight(this)"/></td>' +
                                '<td class="noneBorderGrid"><a style="cursor:pointer" id="addSubTest' + addSubTestNum + '' + addComptNum + '" no="' + addSubTestNum + '" competencies="' + addComptNum + '" onclick="addSubTest(this)"><i class="fas fa-plus"></i></a></td>' +
                            '</tr>' +
                            '<tbody id="Label' + addSubTestNum + '' + addComptNum + '"></tbody>' +
                        '</table>' +
                    '</div>' +
                '</div>' +
            '</li>' +
        '</ul>' +
    '</div>' +
    '<br/>');

    $('#Competencies > div#Competencies' + (addComptNum - 1) + ' a#deleteCompetency' + (addComptNum-1)).hide();

    dropDownCompetency(addSubTestNum, addComptNum);
    //TestToolByCompanyCompetencyMatrix();
    dropDownTestTool(addSubTestNum, addComptNum);
    dropDownSubTest(addSubTestNum, addComptNum);
    $(data).removeAttr('competencies');
    $(data).attr('competencies', addComptNum);
}
deleteCompetency = function (data) {
    var competencies = parseInt($(data).attr('competencies'));
    var remainingCompetencies = competencies - 1;

    /*remove arrar*/
    var source = viewModel.Competencies;
    var sourceLength = source.length;
    source = source.slice(0);
    source.splice(sourceLength - 1, 1);

    viewModel.set('Competencies', source);

    $('#Competencies' + competencies).remove();
    if (remainingCompetencies !== 0) {
        $('#Competencies > div#Competencies' + remainingCompetencies + ' a#deleteCompetency' + remainingCompetencies).show();
    }
    $('#deleteCompetency' + remainingCompetencies).removeAttr('hidden');
    $('#addCompetency').removeAttr('competencies');
    $('#addCompetency').attr('competencies', remainingCompetencies);
}

addSubTest = function (data) {
    var CompetencyName = $(data).attr('competencyName'); 
    var Competencies = viewModel.Competencies;
    var CompetencyList = viewModel.CompetencyList;
    var competencies = parseInt($(data).attr('competencies'));
    if (viewModel.title == 'Edit Competency Matrix') {
        var noSubTest = viewModel.Competencies[competencies].SubTests.length - 1
    } else {
        var noSubTest = (viewModel.Competencies[competencies].SubTests.length - 1) < 0 ? viewModel.Competencies[competencies].SubTests.length : (viewModel.Competencies[competencies].SubTests.length - 1)
    }
    var addSubTestNum = noSubTest + 1;

    if (Competencies[competencies].CompetencyCode == "") {
        swal("Info", "Please choose competency!", "warning", { closeOnClickOutside: false });
    } else {
        var SubTest = {
            TestToolCode: '',
            SubTestCode: '',
            IsParent: '',
            Weight: '',
            Scores: []
        };
        Competencies[competencies].SubTests.push(SubTest);

        for (a = 0; a < CompetencyList.length; a++) {
            if (CompetencyName == CompetencyList[a].CompetencyName) {
                if (Competencies[competencies].SubTests[noSubTest].Scores.length > 0) {
                    var columns = [];
                    var scores = [];
                    var no = 1;
                    for (b = 0; b < CompetencyList[a].ConfigMaxLength; b++) {
                        columns.push({
                            title: '' + no
                        })
                        no++;
                        scores.push(0);
                    }
                    if (Competencies[competencies]) {
                        Competencies[competencies].SubTests[addSubTestNum].Scores.length = CompetencyList[a].ConfigMaxLength;
                        Competencies[competencies].SubTests[addSubTestNum].set('Scores', scores);
                    }
                }
            } else {
                if (Competencies[competencies].SubTests[noSubTest].Scores.length > 0) {
                    var columns = []
                    var scores = []
                    var no = 1;
                    for (scoreList = 0; scoreList < Competencies[competencies].SubTests[0].Scores.length; scoreList++) {
                        columns.push({
                            title: '' + no
                        })
                        no++
                        scores.push(0)
                    }
                    if (Competencies[competencies]) {
                        Competencies[competencies].SubTests[addSubTestNum].Scores.length = Competencies[competencies].SubTests[0].Scores.length;
                        Competencies[competencies].SubTests[addSubTestNum].set('Scores', scores);
                    }
                }
            }
        }

        //cek apakah sudah ada tbodynya
        $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).length == 0 ?
            $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div table#tableGrid' + competencies).append(
                '<tbody id="Label' + addSubTestNum + '' + competencies + '"></tbody>') :
            $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).remove()

        $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).length == 0 ?
            $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div table#tableGrid' + competencies).append(
                '<tbody id="Label' + addSubTestNum + '' + competencies + '"></tbody>') : null
        //$('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div table#tableGrid' + competencies).append(
        //    '<tbody id="Label' + (addSubTestNum + 1) + '' + competencies + '"></tbody>')

        //add config box
        $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).append(
            '<td class="noneBorderGrid"><input id="TestToolName' + addSubTestNum + '' + competencies + '" name="TestToolName' + addSubTestNum + '' + competencies + '" data-role="combobox" data-bind="value:Competencies[' + competencies + '].SubTests[' + addSubTestNum + '].TestToolCode" style="width:100px;" /></td>' +
            '<td class="noneBorderGrid"><input id="SubTestName' + addSubTestNum + '' + competencies + '" name="SubTestName' + addSubTestNum + '' + competencies + '" data-role="combobox" data-bind="value:Competencies[' + competencies + '].SubTests[' + addSubTestNum + '].SubTestCode" style="width:100px;" /></td>'
        );
        for (c = 0; c < columns.length; c++) {
            $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).append(
                '<td><input type="number" style="width:56px" class="k-textbox formTable" name="no' + c + '' + addSubTestNum + '' + competencies + '" id="no' + c + '' + addSubTestNum + '' + competencies + '" data-bind="value:Competencies[' + competencies + '].SubTests[' + addSubTestNum + '].Scores[' + c + ']" no="' + addSubTestNum + '" competencies="' + competencies + '" index="' + c + '" onChange="onChangeScore(this)" /></td>'
            );
        }

        $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).append(
            '<td class="noneBorderGrid"><input type="text" id="Weight' + addSubTestNum + '' + competencies + '" name="Weight' + addSubTestNum + '' + competencies + '" data-bind="value:Competencies[' + competencies + '].SubTests[' + addSubTestNum + '].Weight" style="width:36px;" no="' + addSubTestNum + '" competencies="' + competencies + '" onChange="onChangeWeight(this)" /></td>'
        );

        $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody#Label' + noSubTest + '' + competencies + ' > td a#deleteSubTest' + noSubTest + '' + competencies).hide();
        $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).append(
            '<td class="noneBorderGrid" id="deleteSubTest' + addSubTestNum + '' + competencies + '"><a style="cursor:pointer" id="deleteSubTest' + addSubTestNum + '' + competencies + '" no="' + addSubTestNum + '" competencies="' + competencies + '"  onclick="deleteSubTest(this)"><i class="fas fa-trash-alt"></i></a></td>'
        );

        //$('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).append(
        //    '<td class="noneBorderGrid"><input type="text" id="Weight' + addSubTestNum + '' + competencies + '" name="Weight' + addSubTestNum + '' + competencies + '" data-bind="value:Competencies[' + competencies + '].SubTests[' + addSubTestNum + '].Weight" style="width:36px;" no="' + addSubTestNum + '" competencies="' + competencies + '" onChange="onChangeWeight(this)" /></td>' +
        //    '<td class="noneBorderGrid"><a href="#" id="deleteSubTest' + addSubTestNum + '' + competencies + '" no="' + addSubTestNum + '" competencies="' + competencies + '"  onclick="deleteSubTest(this)"><i class="fas fa-trash-alt"></i></a></td>'
        //);
        //end of add config box

        $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid tbody#Label' + addSubTestNum + '' + competencies).append(
            '</tr>'
        );

        $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div table#tableGrid' + competencies).length == 0 ?
            $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div table#tableGrid' + competencies).append(
                '<tbody id="Label' + (addSubTestNum + 1) + '' + competencies + '"></tbody>') : null

        dropDownTestTool(addSubTestNum, competencies);
        dropDownSubTest(addSubTestNum, competencies);
        $(data).removeAttr('no');
        $(data).attr('no', addSubTestNum);
    }
}
deleteSubTest = function (data) {
    var competencies = parseInt($(data).attr('competencies'));
    var subTestNum = parseInt($(data).attr('no'));
    var count = subTestNum - 1;

    /*remove arrar*/
    var source = viewModel.Competencies[competencies].SubTests;
    var sourceLength = source.length;
    source = source.slice(0);
    source.splice(sourceLength - 1, 1);

    viewModel.Competencies[competencies].set('SubTests', source);

    $('#Label' + subTestNum + competencies).remove();
    $('#Competencies' + competencies + ' > ul.form-content > li > div.entered > div > table.tableGrid > tbody#Label' + count + '' + competencies + ' > td a#deleteSubTest' + count + '' + competencies).show();
    $('#deleteSubTest' + count + competencies).show();
    $('#addSubTest' + count + competencies).removeAttr('no');
    $('#addSubTest' + count + competencies).attr('no', count);
}