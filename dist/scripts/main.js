$(document).ready(function() {

	var imgList = new ImgCollection();
	var commentList = new CommentCollection();

	imgList.fetch();

	var imgPostBuilder = _.template($("#post-template").html());

	var commentBuilder = _.template($("#comment-template").html());

	$("#submit-img").on("click", function(e){
		e.preventDefault();

		var newImg = new Img({
			imgUrl: $("#url").val(),
			caption: $("#img-caption").val()
		});

		if(newImg.isValid()) {
			imgList.add(newImg);
			newImg.save();
			$("#collapseExample").removeClass("in");
		}
		else {
			alert(newImg.validationError);
		}
	});

	imgList.on("add", function(imgModel) {
		var displayPost = imgPostBuilder(imgModel.attributes);
		$("#pics-container").append(displayPost);

			$(".to-comment").on("click", function(e) {
				e.preventDefault();
				$(this).parent().siblings(".inactive").removeClass("inactive").addClass("active well");
				$(this).parent().siblings(".active").children("form").children(".submit-comment").attr("id", "extra");


				$("#extra").on("click", function(e) {
					e.preventDefault();
					// console.log("good");

					var newComment = new Comment({
						content: $(this).siblings(".enter-comment").val(),
						imgId: imgModel.get("_id")
					});

					// console.log(newComment);
					toAppend = $(this).siblings(".enter-comment").val();
					console.log(toAppend);
					cutUp = toAppend.substring(0, toAppend.length);
					// console.log(cutUp);
					
					$(".history").append(cutUp);
					newComment.save();

				});
					commentList.on("add", function(commentModel) {
						console.log(commentModel);
						var displayComment = commentBuilder(commentModel.attributes);
						console.log(displayComment);
						(".history").append(displayComment);
				});


			});

			$(".cancel-comment").on("click", function(e) {
				e.preventDefault();
				$(".active").removeClass("active well").addClass("inactive");
			})



			
	});

	$("#cancel").on("click", function(e) {
		e.preventDefault();
		$("#collapseExample").removeClass("in");
	});

});

// imgList.fetch({
// 	success: function(imageObj) {
// 		imageObj.forEach(function(model)) {
// 			$("#pics-container").append(imgPostBuilder(imgModel.attributes))
// 		});
// 		imageObj.on("add", function(e) {
// 			$("#pics-container").prepend(imgPostBuilder(imgModel.attributes))
// 		});
// 	}
// });