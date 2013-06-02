Lines = new Meteor.Collection('lines');

Meteor.methods({
	wipeClean: function() {
		Lines.remove({});
	}
});