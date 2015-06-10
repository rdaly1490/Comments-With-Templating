var Img= Backbone.Model.extend ({
	defaults: {
		imgUrl: null,
		caption: null,
	},
	validate: function(attr, options) {
		if(attr.imgUrl.length === 0) {
			return "Image URL cannot be left blank!";
		}
		else if(!(validator.contains(attr.imgUrl, "http"))) {
			return "Invalid URL format"
		}
		else if (attr.caption.length === 0) {
			return "Caption cannot be left blank!"
		}
		else {
			return false;
		}
	},
	urlRoot:"http://tiny-pizza-server.herokuapp.com/collections/robdaly",
	idAttribute: "_id"
});