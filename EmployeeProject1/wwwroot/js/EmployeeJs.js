$(document).ready(function () {
    getEmployee();
  //  debugger;
});


///Read data
function getEmployee() {
    $.ajax({
        url: 'Employee/GetAllEmployee',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            if (!response || !response.length) {
                $("#tblBody").html('<tr><td colspan="7">Employee not available</td></tr>');
                return;
            }

            // Destroy old DataTable instance before reloading data
            if ($.fn.DataTable.isDataTable("#employeeTable")) {
                $("#employeeTable").DataTable().destroy();
            }

            var object = '';
            $.each(response, function (index, value) {
                object += `<tr>
                    <td><input type="checkbox" class="empCheckbox" value="${value.id}"></td>
                    <td>${value.name}</td>
                    <td>${value.email}</td>
                    <td>${value.address}</td>
                    <td>${value.phone}</td>
                    <td>
                        <a href="#" onclick="Edit(${value.id})">
                            <i class="bi bi-pencil"></i>
                        </a> 
                        | 
                        <a href="#" onclick="Delete(${value.id})">
                            <i class="bi bi-trash-fill text-danger"></i>
                        </a>
                    </td>
                </tr>`;
            });

            $("#tblBody").html(object);

            $("#employeeTable").DataTable({
                paging: true,      
                searching: false,   
                ordering: true,    
                info: true,         
                lengthChange: false,
                pageLength: 5       
            });


        },
        error: function () {
            alert("Error while fetching employees.");
        }
    });
}




$('#btnAdd').click(function () {
    $('#EmployeeModal').modal('show');
    $('#modalTitle').text('Add Employee')
})
// insert date 
function Insert() {
    var result = Validate();
    if (result == false) {
        return false;
    }
    var formData = new Object();
    formData.id = $('#Id').val();
    formData.name = $('#Name').val(); 
    formData.email = $('#Email').val(); 
    formData.address = $('#Address').val(); 
    formData.phone = $('#Phone').val(); 

    $.ajax({
        url: '/employee/Insert',
        data: formData, 
        type: 'POST', 
        success: function (response) {
            // Check if the response is valid
            if (response == null || response == undefined || response.length == 0) {
                alert("Unable to save the data.");
            } else {
                // Reload employee data or handle success response
                HideModel();
                getEmployee();
                alert(response); // Show the response from the server
            }
        },
        error: function () {
            alert("Unable to save data.");
        }
    });
}

function HideModel() {
    ClearData();
    $('#EmployeeModal').modal('hide');
}
function ClearData() {
    
     $('#Name').val(''); 
     $('#Email').val(''); 
    $('#Address').val(''); 
    $('#Phone').val('');
    $('Name').css('border-coler', 'lightgrey');
    $('Email').css('border-coler', 'lightgrey');
    $('Address').css('border-coler', 'lightgrey');
    $('Phone').css('border-coler', 'lightgrey');
}
function Validate() {
    var isValid = true;

    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'red');
        isValid = false;  
    }
    else {
        $('#Name').css('border-color', 'lightgrey');  
    }

  
    if ($('#Email').val().trim() == "") {
        $('#Email').css('border-color', 'red');
        isValid = false;  
    }
    else {
        $('#Email').css('border-color', 'lightgrey'); 
    }

    
    if ($('#Address').val().trim() == "") {
        $('#Address').css('border-color', 'red');
        isValid = false;  
    }
    else {
        $('#Address').css('border-color', 'lightgrey'); 
    }

    
    if ($('#Phone').val().trim() == "") {
        $('#Phone').css('border-color', 'red');
        isValid = false; 
    }
    else {
        $('#Phone').css('border-color', 'lightgrey');  
    }

    return isValid;
}

$('#Name').change(function () {
    Validate()
});
$('#Email').change(function () {
    Validate()
});
$('#Address').change(function () {
    Validate()
});
$('#Phone').change(function () {
    Validate()
});

// edit data
function Edit(id) {
    $.ajax({
        url:'employee/Edit?id='+id,
        type:'get',
        contentType:'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            if (response == null || response == undefined) {
                alert("unable to read tha data");
            } else if (response.length == 0) {
                alert("data not available with the id" + id);
            } else {
                $('#EmployeeModal').modal('show');
                $('#modalTitle').text("Update Employee");
                $('#Save').css('display', 'none');
                $('#Update').css('display', 'block');
                $('#Id').val(response.id);
                $('#Name').val(response.name);
                $('#Email').val(response.email);
                $('#Address').val(response.address);
                $('#Phone').val(response.phone);

            }
        },
        error: function () {
            alert("Unable to read the data")
        }
    })
}

// update the data
function Update() {
    var result = Validate();
    if (result == false) {
        return false;
    }
    var formData = new Object();
    formData.id = $('#Id').val(); 
    formData.name = $('#Name').val();
    formData.email = $('#Email').val(); 
    formData.address = $('#Address').val(); 
    formData.phone = $('#Phone').val(); 

    $.ajax
        ({
            url: '/employee/Update', 
            data: formData,
            type: 'POST', 
            success: function (response) {
                
                if (response == null || response == undefined || response.length == 0) {
                    alert("Unable to save the data.");
                } else {
                    
                    HideModel();
                    getEmployee();
                    alert(response); 
                }
            },
            error: function () {
                alert("Unable to save data.");
            }
        });
}

// delete Employee
var employeeToDelete = 0; 

function Delete(id) {
    employeeToDelete = id; 
    $("#deleteModal").modal("show"); 
}

$("#confirmDelete").click(function () {
    $.ajax({
        url: '/employee/Delete', 
        type: 'DELETE', 
        data: { id: employeeToDelete },
        success: function () {
            alert("Record Deleted Successfully!");
            $("#deleteModal").modal("hide"); 
            getEmployee(); 
        },
        error: function () {
            alert("Error deleting record.");
        }
    });
});


