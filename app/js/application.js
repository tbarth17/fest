(function(){
	'use strict';
	window.Fest = Ember.Application.create();

  Fest.ref = new Firebase("https://premature-optimization.firebaseio.com"); //https://premature-optimization.firebaseio.com/     https://fest2.firebaseio.com/

	Fest.ApplicationAdapter = DS.FirebaseAdapter.extend({
	  firebase: Fest.ref
	});

	filepicker.setKey("ARZytQTzJQdG7LD1IrsCiz");

	Ember.Application.initializer({
		name: 'firebase-session',

		initialize: function(container, application){
			application.deferReadiness();
			var token = localStorage.getItem('fest-firebase-token');
			if (token) {
				var session = container.lookup('controller:session');
				session.authWithToken(token).then(function(){
					application.advanceReadiness();
					});
			} else {application.advanceReadiness();}
		}
	});
})();
