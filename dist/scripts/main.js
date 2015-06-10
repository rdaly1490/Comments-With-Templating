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

			$(".to-comment").on("click", function(e) { //one is like on but won't add multiple event listeners, only one
				e.preventDefault();
				$(this).parent().siblings(".inactive").removeClass("inactive").addClass("active well");


				$(".submit-comment").on("click", function(e) {
					e.preventDefault();
					var newComment = new Comment({
						content: $(".enter-comment").val(),
						imgId: imgModel.get("_id")
					});
					// newComment.save();
					console.log(newComment);
				});

				commentList.on("add", function(commentModel) {
					var displayComment = commentBuilder(commentModel.attributes);
					console.log(displayComment);
					$(".history").append(displayComment);
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