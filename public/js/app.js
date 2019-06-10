$.getJSON("/articles", function(data) {
    for (let i = 0; i < data.lenth; i++) {
        $('#articles').append("<p id=articleData data-id='" + data[i]._id + "'>" + data[i].title + "<br /> <img src='" + data[i].image + "'/> <br /> <div id= article-summary>" + data[i].summary + "</div> <br /> <div id=data-category>Category:" + data[i].category + "</div> <br /> <div id=dataurl><a href='" + data[i].url + "'>Link</a></div></p>")
    }
});

$(document).on("click", "p", function() {
    $("").empty();

    const thisId = $(this).attr("#data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    }).then(function(data) {
        console.log(data);
        $("#articleData").append("<h2>Comment:</h2>");
        $("#articleData").append("<h4>Name:</h4>");
        $("#articleData").append("<input id='userId' name='user' >");
        $("#articleData").append("<h4>Title:</h4>");
        $("#articleData").append("<input id='commentTitle' name='title' >");
        $("#articleData").append("<h4>Comment:</h4>");
        $("#articleData").append("<textarea id='bodyinput' name='commentbody'></textarea>");
        $("#articleData").append("<button data-id='" + data._id + "' id='savecomment'></button>");

        if (data.comment) {
            $("#userId").val(data.comment.user);
            $("#bodyinput").val(data.comment.body);
        }
    });
});

$(document).on("click", "#savecomment", function() {
    const thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            author: $("#userId").val(),
            title: $("#commentTitle").val(),
            comment: $("#bodyinput").val()
        }
    }).then(function(data) {
        console.log(data);
        
        $("#userId").empty();
        $("#commentTitle").empty();
        $("#bodyinput").empty();
    });
});