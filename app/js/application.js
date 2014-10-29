(function(){
	'use strict';
	window.Fest = Ember.Application.create();

  Fest.ref = new Firebase("https://premature-optimization.firebaseio.com/");

	Fest.ApplicationAdapter = DS.FirebaseAdapter.extend({
	  firebase: Fest.ref
	});

	filepicker.setKey("ARZytQTzJQdG7LD1IrsCiz");
})();
