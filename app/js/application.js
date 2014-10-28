(function(){
	'use strict';
	window.Fest = Ember.Application.create();

  Fest.fireRef = new Firebase("https://premature-optimization.firebaseio.com/");

	Fest.ApplicationAdapter = DS.FirebaseAdapter.extend({
	  firebase: Fest.fireRef
	});

})();
