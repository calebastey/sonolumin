
var submitForm = function(e) {
    e.preventDefault();
    var form = $("#report-body");

    console.log(getFormData(form));

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/api/report",
        data: getFormData(form),
        dataType: "json",
        success: function() {
            alert ("succes");
        }
    });

};


window.addEventListener('DOMContentLoaded', function () {
    $("#sourceUrl").val("");
    $("#text").val("");
    $("#reportedBy").val("");

    var submit = document.getElementById('submit');
    submit.addEventListener('click', submitForm);

    var id = getUrlParameter("id");
    console.log("ID ", id);

    if (id) {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/partial/" + id,
            dataType: 'json',
            success: function(result) {
                console.log(result);
                $("#sourceUrl").val(result.url);
                $("#text").val(result.text);
                $("#reportedBy").val(result.reportedBy);
            }
        })
    }
});

function getFormData(form){
    var unindexed_array = form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};