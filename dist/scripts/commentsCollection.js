var CommentCollection = Backbone.Collection.extend({
	model: Comment,
	url:"http://tiny-pizza-server.herokuapp.com/collections/robdcomments"
});