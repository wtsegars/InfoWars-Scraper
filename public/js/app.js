$(document).ready(function() {
    $.getJSON("/articles", function(data) {
        for (let i = 0; i < 10; i++) {
            console.log(data)
            $('#articles').append("<p id='articleData' data-id='" + data[i]["_id"]+ "'>" + data[i].title + "<br /> <img src='" + data[i].image + "'/> <br /> <div id= article-summary>" + data[i].summary + "</div> <br /> <div id=data-category>Category:" + data[i].category + "</div> <br /> <div id=dataurl><a href='" + data[i].url + "'>Link</a></div></p><div><button data-id=" + data[i].comment + "'id='showComments'>Show Comments</button></div><h2>Comment:</h2><h4>Name:</h4><input id='userId' name='user' ><h4>Title:</h4><input id='commentTitle' name='title' ><h4>Comment:</h4><textarea id='bodyinput' name='commentbody'></textarea><button data-id='" + data[i]["_id"] + "' id='saveComment'>Submit</button>");
        }
    });
    
    $(document).on("click", "#showComments", function() {
        const thisId = $(this).attr("data-id")
        $.ajax({
            method: "POST",
            url: "/comment/" + thisId,
            data: {
                author: $("#author").val(),
                title: $("#title").val(),
                comment: $("#comment").val()
            }
        }).then(function(data) {
            for (let i = 0; i < data.length; i++){
                $('#showComments').append('<h3 id="author"></h3><br /><h3 id="title"></h3><br /><h3 id="comment></h3>');
            }

            console.log(data);
        });
    });
    
    $(document).on("click", "#saveComment", function() {
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
            $("#userId").val('');
            $("#commentTitle").val('');
            $("#bodyinput").val('');

            console.log(data);
        });
    });
});
