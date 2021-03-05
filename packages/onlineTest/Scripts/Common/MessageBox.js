function confirmMessageCancel() {
    swal({
        title: "Confirmation",
        text: "Are you sure to cancel?",
        icon: "warning",
        buttons: {
            cancel: true,
            danger: {
                text: "Yes",
                value: "check",
            },
        },
    });
}

function confirmMessageAdd() {
    swal({
        title: "Confirmation",
        text: "Are you sure to save this data?",
        icon: "warning",
        buttons: {
            cancel: true,
            defeat: {
                text: "Yes",
                value: "check",
            },
        },
    });
}

function confirmDuplicateConfScore(msg) {
    swal({
        title: "Confirmation",
        text: msg,
        icon: "warning",
        buttons: {
            cancel: true,
            defeat: {
                text: "Yes",
                value: "check",
            },
        },
    });
}

function confirmMessageEdit() {
    swal({
        title: "Confirmation",
        text: "Are you sure to edit this data?",
        icon: "warning",
        buttons: {
            cancel: true,
            defeat: {
                text: "Yes",
                value: "check",
            },
        },
    });
}

function confirmMessageDelete() {
    swal({
        title: "Confirmation",
        text: "Are you sure to delete this data?",
        icon: "warning",
        buttons: {
            cancel: true,
            defeat: {
                text: "Yes",
                value: "check",
            },
        },
    })
}

function confirmMessageDeleteMapSubTest() {
    swal({
        title: "Confirmation",
        text: "This action will delete the selected data. You cannot undo after proceeding. Are you sure to delete this data?",
        icon: "warning",
        buttons: {
            cancel: true,
            defeat: {
                text: "Yes",
                value: "check",
            },
        },
    })
}

function confirmMessageNormScore() {
    swal({
        title: "Warning!",
        text: "This record already exists in database. If you wish to proceed further, the previous record will automatically marked as inactive. Do you wish to continue?",
        icon: "warning",
        buttons: {
            cancel: true,
            defeat: {
                text: "Yes",
                value: "check",
            },
        },
    })
}

function confirmMessageEditNewIQ() {
    swal({
        title: "Warning!", 
        text: "This record is already used for a scoring candidate. If you wish to proceed further, the system will process it as a new data. Do you wish to continue?",
        icon: "warning",
        buttons: {
            cancel: true,
            defeat: {
                text: "Yes",
                value: "check",
            },
        },
    })
}

function confirmMessageDuplicateCompetency() {
    swal({
        title: "Warning!", 
        text: "Competency has been selected. Please choose another competency!",
        icon: "warning",
        buttons: {
            //cancel: true,
            defeat: {
                text: "OK",
                value: "check",
            },
        },
    })
}

function confirmMessageDuplicateSubTest() {
    swal({
        title: "Warning!", 
        text: "Sub Test has been selected. Please choose another Sub Test!",
        icon: "warning",
        buttons: {
            //cancel: true,
            defeat: {
                text: "OK",
                value: "check",
            },
        },
    })
}

function confirmMessageDuplicateCoverValue() {
    swal({
        title: "Warning!",
        text: "Cover value has been selected. Please choose another value!",
        icon: "warning",
        buttons: {
            //cancel: true,
            defeat: {
                text: "OK",
                value: "check",
            },
        },
    })
}

function confirmMessageDuplicateCandidateInformationValue() {
    swal({
        title: "Warning!",
        text: "Candidate information value has been selected. Please choose another value!",
        icon: "warning",
        buttons: {
            //cancel: true,
            defeat: {
                text: "OK",
                value: "check",
            },
        },
    })
}