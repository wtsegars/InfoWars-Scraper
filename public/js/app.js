$(document).ready(function() {
    $.getJSON("/articles", function(data) {
        for (let i = 0; i < 10; i++) {
            console.log(data)
            $('#articles').append("<p id='articleData' data-id='" + data[i]._id + "'>" + data[i].title + "<br /> <img src='" + data[i].image + "'/> <br /> <div id= article-summary>" + data[i].summary + "</div> <br /> <div id=data-category>Category:" + data[i].category + "</div> <br /> <div id=dataurl><a href='" + data[i].url + "'>Link</a></div></p><h2>Comment:</h2><h4>Name:</h4><input id='userId' name='user' ><h4>Title:</h4><input id='commentTitle' name='title' ><h4>Comment:</h4><textarea id='bodyinput' name='commentbody'></textarea><button data-id='" + data._id + "' id='saveComment'>Submit</button>");
        }
    });
    
    // $("#saveComment").on("click", function() {
    //     $("userId").empty();
    //     $("commentTitle").empty();
    //     $("bodyInput").empty();
    
    //     const thisId = $(this).attr("#data-id");
    
    //     $.ajax({
    //         method: "GET",
    //         url: "/articles/" + thisId
    //     }).then(function(data) {
    //         console.log(data);
    
    //         if (data.comment) {
    //             $("#userId").val(data.comment.user);
    //             $("#commentTitle").val(data.comment.title);
    //             $("#bodyinput").val(data.comment.body);
    //         }
    //     });
    // });
    
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
            console.log(data);
            
            $("#userId").empty();
            $("#commentTitle").empty();
            $("#bodyinput").empty();
        });
    });
});
