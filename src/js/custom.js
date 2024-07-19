function callPythonFunction() {
    // Get form elements
    var age = document.getElementById('age').value;
	var educ = document.getElementById('educ').value;
	var ses = document.getElementById('ses').value;
	var mmse = document.getElementById('mmse').value;
  var cdr = document.getElementById('cdr').value;
	var cmnts = document.getElementById('etiv').value;
  var nwbv = document.getElementById('nwbv').value;


    // Create data object
    var data = {
        age: age,
        educ: educ,
        ses: ses,
        mmse: mmse,
        cdr: cdr,
        nwbv: nwbv,
    };

    // Send AJAX request to Python script
    fetch('/app.py', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}



// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// nice select
// $(document).ready(function () {
//     $('select').niceSelect();
// });

document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.querySelector('select'); // Adjust the selector as needed
    $(selectElement).niceSelect(); // Initialize niceSelect
});

// date picker
$(function () {
    $("#inputDate").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());
});

// owl carousel slider js
$('.team_carousel').owlCarousel({
    loop: true,
    margin: 15,
    dots: true,
    autoplay: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1,
            margin: 0
        },
        576: {
            items: 2,
        },
        992: {
            items: 3
        }
    }
})
