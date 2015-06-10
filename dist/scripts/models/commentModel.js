var Comment= Backbone.Model.extend ({
	defaults: {
		content: null,
		imgId: null,
	},
	urlRoot:"http://tiny-pizza-server.herokuapp.com/collections/robdcomments",
	idAttribute: "_id"
});