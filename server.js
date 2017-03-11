/**
 * Created by pawan on 31/1/17.
 */

const express = require('express');
const bodyParser = require('body-parser');
const plivo = require('plivo');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const p = plivo.RestAPI({
    authId: 'MAYWIWMZMWY2Y5ZGY3MD',
    authToken: 'M2MzZjUwMWJlMjJiNDBhMzYyY2JmZDU0NmRkMWE1'
});


var params = {
    'src': '+91455247', // Sender's phone number with country code
    'dst': '', // Receiver's phone Number with country code
    'text': "",
    // 'url' : "http://example.com/report/", // The URL to which with the status of the message is sent
    // 'method' : "GET" // The method used to call the url
};

let selectedNumbers = [];

app.get('/fetchContacts', function (req, res) {
    res.send(selectedNumbers);
})

app.get('/addNums', function (req, res) {
    let arr = req.query.nums.split(',');
    for (let i = 0; i < arr.length; i++) {
        selectedNumbers.push(arr[i]);
    }
    res.send(selectedNumbers);
    // console.log(selectedNumbers);
})

app.get('/send', function (req, res) {
    console.log(req.query.msg);
    console.log(JSON.parse(req.query.msg));

    params.text = JSON.parse(req.query.msg);

    selectedNumbers[0] = "+91" + selectedNumbers[0];
    params.dst = selectedNumbers.join("<+91");

    console.log(params);
    // Prints the complete response
    p.send_message(params, function (status, response) {
        console.log('Status: ', status);
        console.log('API Response:\n', response);
        console.log('Message UUID:\n', response['message_uuid']);
        console.log('Api ID:\n', response['api_id']);

        if(response.error) {
            res.send("Error: " + response.error);
        }
        else{
            res.send(response.message);
        }
    });

})

app.post('/contactUpload', function (req, res) {
    console.log(req.body);
    res.send("trfg");
})

app.use('/', express.static(__dirname + '/public_html'));

app.listen(1234, function () {
    console.log('server started at 1234');
})

