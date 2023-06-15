var file_iteration_date = [0];
function iteration_manager() {
    var iteration_filename = [];
    var html = "";
    $.ajax({
        url: "user_form_control.php",
        data: {
            page_id: current_page_id,
            option: "get_file_iteration"
        },
        cache: false,
        async: false,
        type: "POST",

        success: function (response) {
            iteration_filename = response.split(",");
        },
        error: function (xhr) {}
    });
    var iter_length = iteration_filename.length;
  
    file_iteration_date = [0];
    for (var x = iter_length - 1; x > -1; x--) {
       // alert(iteration_filename[x]);
        var curr_iteration_date = iteration_filename[x].split("|")[1];
        curr_iteration_date = curr_iteration_date.replace(" ",", ");
        file_iteration_date.push(curr_iteration_date);
        var iter_index = x;
        iter_index++;

        html += '<a href="#" class="list-group-item list-group-item-actioncontainer-fluid" onclick="read_current_iteration(' + iter_index + ')">'+
                '<div class="row  justify-content-between "><div class="col-auto">ATTENDANCE &nbsp; &nbsp;' + iter_index + '</div><div class="col-auto">'+curr_iteration_date+'</div></div></a>';
    }
    
    $("#iteration_list").empty();
    $("#iteration_list").append(html);
    $("#latest_iteration").html(iter_length);
    $("#attendant_iter_val").html(current_iteration);


}

function get_current_pg_iteration(){
    $.ajax({
        url: "user_form_control.php",
        data: {
            page_id: current_page_id,
            option: "get_file_iteration"
        },
        cache: false,
        async: false,
        type: "POST",

        success: function (response) {
            current_iteration = response;
        },
        error: function (xhr) {}
    });
    
}

function read_current_iteration(curr_iteration) {

    $('#nav-tab a:first').tab('show');

    current_iteration = curr_iteration;
   $("#attendant_iter_val_date").html(file_iteration_date[current_iteration]);
    showresult();

}

function confirmNewIteration() {
    $("#confirm_new_iteration").modal("show");
}

function close_prompt_iteration() {
    $("#confirm_new_iteration").modal("hide");
}

function close_prompt_iteration_success() {
    $("#confirm_new_iteration_success").modal("hide");
}


function new_iteration() {
    // new_iteration
    close_prompt_iteration();
    $.ajax({
        url: "user_form_control.php",
        data: {
            page_id: current_page_id,
            option: "new_iteration"
        },
        cache: false,
        async: false,
        type: "POST",

        success: function (response) {
            current_iteration = response;
            $("#confirm_new_iteration_success").modal("show");
            $("#latest_iteration").html(current_iteration);
            $("#iteration_value").html(current_iteration);
        },
        error: function (xhr) {}
    });
    saveData();
    close_prompt_iteration_success();
    iteration_manager();

}
