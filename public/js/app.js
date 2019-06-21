let offOn = 0;
$(document).ready(function () {
    $.getJSON("/articles", function (data) {
        for (let i = 0; i < 10; i++) {
            console.log(data);
            let comment = JSON.stringify(data[i].comment)
            console.log(comment);
            $('#articles').append("<div class='card'><p class='articleData' data-id='" + data[i]["_id"] + "'>" + data[i].title + "<br /> <img src='" + data[i].image + "'/> <br /> <div class='card-body'><div id='article-summary'>" + data[i].summary + "</div> <br /> <div id='data-category'>Category:" + data[i].category + "</div> <br /> <div id=dataurl><a href='" + data[i].url + "'>Link</a></div></p><button type='button' class='btn btn-primary' data-id='" + comment + "'id='showComments'>Show Comments</button></div><div id='viewComments'></div><div><h2>Comment:</h2><h4>Name:</h4><input name='user' ><h4>Title:</h4><input name='title' ><h4>Comment:</h4><textarea name='commentbody'></textarea><button type='button' class='btn btn-primary submit-button' data-id='" + data[i].comment + "'>Submit</button></div></div>");
        }
    });

    $(document).on("click", "#showComments", function () {
        console.log("showing comments")
        const comment = JSON.parse($(this).attr("data-id"));
        
        console.log(comment);
        if (offOn == 0) {
            offOn++;

            $("#viewComments").append(
                `<h4 id="author">User: ${comment.author}</h4>
                <h4 id="title">Title:${comment.title}</h4>
                <br />
                <h4 id="comment">${comment.comment}</h4>`
            );

            $.ajax({
                method: "GET",
                url: "/comments" + $(this).parents('.card').find('.articleData').attr("data-id"),
            }).then(function(data) {
                console.log(data);
                for (let i = 0; i < data.length; i++){
                    $("#viewComments").append(
                        `<h4 id="author">User: ${data.author}</h4>
                        <h4 id="title">Title:${data.title}</h4>
                        <br />
                        <h4 id="comment">${data.comment}</h4>`
                    );
                }
            })
        }
        else if (offOn == 1) {
            offOn--;

            $("#viewComments").empty();
        }
        
    });

    $(document).on("click", ".submit-button", function () {
        const parent = $(this).parent();
        const title = parent.find("input[name = 'title']").val();
        const author = parent.find("input[name = 'user']").val();
        const comment = parent.find("textarea[name = 'commentbody']").val();
        // console.log(comment);
        const thisId = $(this).parents('.card').find('.articleData').attr("data-id");
        
       console.log(thisId);
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                author: author,
                title: title,
                comment: comment
            }
        }).then(function (data) {
            parent.find("input[name = 'title']").val('');
            parent.find("input[name = 'user']").val('');
            parent.find("textarea[name = 'commentbody']").val('');

            console.log(data);
        });
    });
});
