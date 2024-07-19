function callPythonFunction() {
    // Get form elements
    var age = document.getElementById('age').value;
	var educ = document.getElementById('educ').value;
	var ses = document.getElementById('ses').value;
	var mmse = document.getElementById('mmse').value;
  var cdr = document.getElementById('cdr').value;
	var cmnts = document.getElementById('etiv').value;
  var nwbv = document.getElementById('nwbv').value;

  const python = spawn('python', ['/app.py']);
    // Create data object
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
       });

       python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend)
        });
        

    // Send AJAX request to Python script
    /*
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
    }); */
}
