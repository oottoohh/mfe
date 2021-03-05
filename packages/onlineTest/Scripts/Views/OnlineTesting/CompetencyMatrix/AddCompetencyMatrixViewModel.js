var viewModel = kendo.observable({
    title: '',
    createBy: '',
    lastModifiedBy: '',
    createOn: '',
    lastModifiedOn: '',

    CompetencyMatrixCode: '',
    CompetencyMatrixName: '',
    CompanyList: [],
    CompanyId: '',
    CompanyName: '',
    CompetencyList: [],
    CompetencyCode: '',
    CompetencyName: '',
    selectedCompetencies: [],
    checkSelectedValue: false,
    ConfigMaxLength: '',
    WeightCompetency: '100%',
    TestToolList: [],
    TestToolCode: '',
    TestToolName: '',
    SubTestList: [],
    SubTestCode: '',
    SubTestName: '',
    DisplayStatus: true,

    duplicate: true,

    Competencies: [{
        CompetencyCode: '',
        SubTests: [{
            TestToolCode: '',
            SubTestCode: '',
            IsParent: '',
            Weight: '',
            Scores: []
        }]
    }],

    //SubTestLists: [{
    //    TestToolCode: '',
    //    SubTestCode: '',
    //    IsParent: '',
    //    Weight: '',
    //    V1: null, V2: null, V3: null, V4: null, V5: null, V6: null, V7: null, V8: null, V9: null, V10: null,
    //}],

    cancel: function () {
        confirmMessageCancel();
        $('.swal-button--danger').on('click', function () {
            window.location.href = DOMAIN_URL + 'Views/OnlineTesting/CompetencyMatrix/CompetencyMatrix.html';
        });
    },
    save: function () {
        save();
    }
});

save = function () {
    var CompanyId = viewModel.CompanyId
    var CompanyName = viewModel.CompanyName
    var CompetencyMatrixCode = viewModel.CompetencyMatrixCode
    var CompetencyMatrixName = viewModel.CompetencyMatrixName
    var DisplayStatus = viewModel.DisplayStatus
    var Competencies = []
    var SubTests = []
    var Scores = []
    var weights = []
    var totalWeight = 0
    var percent = 100

    if (viewModel.Competencies.length > 0) {
        for (comp = 0; comp < viewModel.Competencies.length; comp++) {
            if (viewModel.Competencies[comp].SubTests.length > 0) {
                if (SubTests.length > 0) {
                    SubTests = []
                }
                for (sub = 0; sub < viewModel.Competencies[comp].SubTests.length; sub++) {
                    if (viewModel.Competencies[comp].SubTests[sub].Scores.length > 0) {
                        if (Scores.length > 0) {
                            Scores = []
                        }
                        for (score = 0; score < viewModel.Competencies[comp].SubTests[sub].Scores.length; score++) {
                            Scores.push(viewModel.Competencies[comp].SubTests[sub].Scores[score])
                        }
                    }
                    SubTests.push({
                        TestToolCode: viewModel.Competencies[comp].SubTests[sub].TestToolCode,
                        SubTestCode: viewModel.Competencies[comp].SubTests[sub].SubTestCode,
                        IsParent: viewModel.Competencies[comp].SubTests[sub].IsParent,
                        Weight: viewModel.Competencies[comp].SubTests[sub].Weight,
                        Scores: Scores,
                    })
                }
            }
            Competencies.push({
                CompetencyCode: viewModel.Competencies[comp].CompetencyCode,
                SubTests: SubTests
            })
        }
    }

    //add
    if (CompetencyMatrixCode == '') {
        //check mandatory
        if (CompetencyMatrixName == '' || CompanyName == '') {
            swal('Invalid!', 'Please fill mandatory field!!!', 'warning', { closeOnClickOutside: false });
            return;
        }
        if (Competencies.length > 0) {
            for (a = 0; a < Competencies.length; a++) {
                if (weights.length > 0) {
                    weights = []
                }
                //check mandatory Competency
                if (Competencies[a].CompetencyCode == '') {
                    swal('Invalid!', 'Please choose Competency!', 'warning', { closeOnClickOutside: false });
                    return;
                }
                //check mandatory TestTool & SubTest
                for (b = 0; b < Competencies[a].SubTests.length; b++) {
                    if (Competencies[a].SubTests[b].TestToolCode == '' || Competencies[a].SubTests[b].SubTestCode == '') {
                        swal('Invalid!', 'Please choose Test Tool and Sub Test!', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    for (c = 0; c < Competencies[a].SubTests[b].Scores.length; c++) {
                        if (Competencies[a].SubTests[b].Scores[c] == 0) {
                            swal('Invalid!', 'Score value cannot be 0 or empty!', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                        if (isNaN(Competencies[a].SubTests[b].Scores[c])) {
                            swal('Invalid!', 'Score value cannot be 0 or empty!', 'warning', { closeOnClickOutside: false });
                            return;
                        }

                        //check score is integer
                        if (Number.isInteger(Competencies[a].SubTests[b].Scores[c]) == false) {
                            swal('Invalid!', 'Norm score value cannot be decimal', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                    }

                    //check weight isn't 0/empty
                    //if (Competencies[a].SubTests[b].Weight == "" || Competencies[a].SubTests[b].Weight == 0) {
                    //    swal('Invalid!', 'Weight value cannot be 0 or empty!', 'warning', { closeOnClickOutside: false });
                    //    return;
                    //}

                    weights.push(Competencies[a].SubTests[b].Weight)
                    for (w = 0; w < weights.length; w++) {
                        if (isNaN(weights[w]) || weights[w] == 0) {
                            swal('Invalid!', 'Weight value cannot be 0 or empty!', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                    }
                }

                //check total weight 100% dalam 1 competency
                for (w = 0; w < weights.length; w++) {
                    totalWeight += weights[w]
                }
                if (totalWeight < 100 || totalWeight > 100) {
                    swal('Invalid!', 'The total weight of a Competency should equal 100%', 'warning', { closeOnClickOutside: false });
                    return;
                } else {
                    totalWeight = 0
                }
            }
        }

        confirmMessageAdd();
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            $.ajax({
                type: "POST",
                url: SERVICE_URL + "api/CompetencyMatrix/Save",
                headers: { "Authorization-Token": Cookie.load() },
                data: {
                    CompanyId: CompanyId,
                    CompetencyMatrixName: CompetencyMatrixName,
                    DisplayStatus: DisplayStatus,
                    Competencies: Competencies
                },
                success: function (response) {
                    if (response.Acknowledge < 1) {
                        LoadingMask.hide();
                        swal("Failed", response.Message, "warning", { closeOnClickOutside: false });
                    }
                    else {
                        LoadingMask.hide();
                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                        $('.swal-button--confirm').on('click', function () {
                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/CompetencyMatrix/CompetencyMatrix.html";
                        });
                    }
                },
                error: function (xhr, status, error) {
                    alert("Error");
                    LoadingMask.hide();
                }
            });
        });
    }
    //edit
    else {
        //check mandatory
        if (CompetencyMatrixCode == '' || CompetencyMatrixName == '' || CompanyName == '') {
            swal('Invalid!', 'Please fill mandatory field!!!', 'warning', { closeOnClickOutside: false });
            return;
        }
        if (Competencies.length > 0) {
            for (a = 0; a < Competencies.length; a++) {
                if (weights.length > 0) {
                    weights = []
                }
                //check mandatory Competency
                if (Competencies[a].CompetencyCode == '') {
                    swal('Invalid!', 'Please choose Competency!', 'warning', { closeOnClickOutside: false });
                    return;
                }
                //check mandatory TestTool & SubTest
                for (b = 0; b < Competencies[a].SubTests.length; b++) {
                    if (Competencies[a].SubTests[b].TestToolCode == '' || Competencies[a].SubTests[b].SubTestCode == '') {
                        swal('Invalid!', 'Please choose Test Tool and Sub Test!', 'warning', { closeOnClickOutside: false });
                        return;
                    }
                    for (c = 0; c < Competencies[a].SubTests[b].Scores.length; c++) {
                        if (Competencies[a].SubTests[b].Scores[c] == 0) {
                            swal('Invalid!', 'Score value cannot be 0 or empty!', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                        if (isNaN(Competencies[a].SubTests[b].Scores[c])) {
                            swal('Invalid!', 'Score value cannot be 0 or empty!', 'warning', { closeOnClickOutside: false });
                            return;
                        }

                        //check score is integer
                        if (Number.isInteger(Competencies[a].SubTests[b].Scores[c]) == false) {
                            swal('Invalid!', 'Norm score value cannot be decimal', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                    }
                    weights.push(Competencies[a].SubTests[b].Weight)
                    for (w = 0; w < weights.length; w++) {
                        if (isNaN(weights[w]) || weights[w] == 0) {
                            swal('Invalid!', 'Weight value cannot be 0 or empty!', 'warning', { closeOnClickOutside: false });
                            return;
                        }
                    }
                }

                //check total weight 100% dalam 1 competency
                for (w = 0; w < weights.length; w++) {
                    totalWeight += weights[w]
                }
                if (totalWeight < 100 || totalWeight > 100) {
                    swal('Invalid!', 'The total weight of a Competency should equal 100%', 'warning', { closeOnClickOutside: false });
                    return;
                } else {
                    totalWeight = 0
                }
            }
        }

        confirmMessageAdd();
        $('.swal-button--defeat').on('click', function () {
            LoadingMask.show();
            $.ajax({
                type: "POST",
                url: SERVICE_URL + "api/CompetencyMatrix/Edit",
                headers: { "Authorization-Token": Cookie.load() },
                data: {
                    CompetencyMatrixCode: CompetencyMatrixCode,
                    CompanyId: CompanyId,
                    CompetencyMatrixName: CompetencyMatrixName,
                    DisplayStatus: DisplayStatus,
                    Competencies: Competencies
                },
                success: function (response) {
                    if (response.Acknowledge < 1) {
                        LoadingMask.hide();
                        swal("Failed", response.Message, "warning", { closeOnClickOutside: false });
                    }
                    else {
                        LoadingMask.hide();
                        swal("Good", response.Message, "success", { closeOnClickOutside: false });
                        $('.swal-button--confirm').on('click', function () {
                            window.location.href = DOMAIN_URL + "Views/OnlineTesting/CompetencyMatrix/CompetencyMatrix.html";
                        });
                    }
                },
                error: function (xhr, status, error) {
                    alert("Error");
                    LoadingMask.hide();
                }
            });
        });
    }
}