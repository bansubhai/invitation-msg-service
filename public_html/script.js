/**
 * Created by pawan on 31/1/17.
 */

$(function () {
    var inputNumbersList = $('#inputNumbersList')
    var addToListBtn = $('#addToListBtn');
    var selectedContactsList = $('#selectedContactsList');
    var sendBtn = $('#sendBtn');
    var msgBox = $('#msgBox');
    var gif = $('#gif')

    function refreshList(data) {
        var listData = "";

        data.forEach(function (val) {
            listData += "<li>" + val + "</li>"
        })

        selectedContactsList.html(listData);
        // console.log(data);
    }

    addToListBtn.on('click', function () {
        if(inputNumbersList.val() != "") {
            $.get("/addNums?nums=" + inputNumbersList.val(), refreshList);
        }
        inputNumbersList.val("");
        inputNumbersList.focus();
    })

    function sent(data) {
        gif.css('display', 'none');
        console.log("inside sent");
        alert(data);
    }

    sendBtn.click(function () {
        if(selectedContactsList.children().length != 0) {
            gif.css('display', 'table');
            $.get('/send?msg=' + JSON.stringify(msgBox.val()), sent);
        }
    })


    $.get("/fetchContacts", refreshList);

})
