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

Fest.Router.map(function() {
  this.resource('bands', function(){
    this.route('show', {path: ':band_id'});
    this.route('viewAll');
  });

  this.resource('venues', function(){
    this.route('show', {path: ':venue_id'});
    this.route('viewAll');
  });

  this.resource('users', function(){
    this.route('viewAll');
    this.route('show', {path: ':user_id'});
  });

  this.route('user');
  this.route('login');
  this.route('schedule');

});

Fest.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
  var user = this.controllerFor('session').get('currentUser');
    if (! user) {
    this.transitionTo('login');
    }
  },

  model: function(){
    var id = this.controllerFor('session').get('currentUser');
    return this.store.find('user');
  }
});

Fest.UserRoute = Ember.Route.extend({
  beforeModel: function() {
  var user = this.controllerFor('session').get('currentUser');
    if (! user) {
    this.transitionTo('login');
    }
  },

  model: function(){
    var id = this.controllerFor('session').get('currentUser.id');
    return this.store.find('user', id);
  }
});

Fest.UsersRoute = Ember.Route.extend({
  beforeModel: function() {
  var user = this.controllerFor('session').get('currentUser');
    if (! user) {
    this.transitionTo('login');
    }
  },
  model: function() {
    return this.store.find('user');
  }
});

Fest.UsersShowRoute = Ember.Route.extend({
  redirect: function(model){
    if (model === this.controllerFor('session').get('currentUser')){
      this.transitionTo('user');
    }
  },

  beforeModel: function() {
  var user = this.controllerFor('session').get('currentUser');
    if (! user) {
    this.transitionTo('login');
    }
  },
  model: function(params) {
    return this.store.find('user', params.user_id);
  }
});

Fest.BandsRoute = Ember.Route.extend({
  beforeModel: function() {
  var user = this.controllerFor('session').get('currentUser');
    if (! user) {
    this.transitionTo('login');
    }
  },

  model: function() {
    return this.store.find('band');
  }
});

Fest.BandsShowRoute = Ember.Route.extend({
  beforeModel: function() {
  var user = this.controllerFor('session').get('currentUser');
    if (! user) {
    this.transitionTo('login');
    }
  },
  model: function(params) {
    return this.store.find('band', params.band_id);
  }
});

Fest.BandcampEmbedComponent = Ember.Component.extend({
    attributeBindings: ['style', 'src', 'seamless'],
    tagName: 'iframe',
    style: "border: 0; width: 100%; height: 42px;",
    seamless: true
});

Fest.MapEmbedComponent = Ember.Component.extend({
    attributeBindings: ['height', 'style', 'frameborder', 'width', 'src', 'seamless'],
    tagName: 'iframe',
    height: "400",
    width: "75%",
    frameborder: "0",
    style: "border:0",
    seamless: true
});

Fest.VenuesRoute = Ember.Route.extend({
  beforeModel: function() {
  var user = this.controllerFor('session').get('currentUser');
    if (! user) {
    this.transitionTo('login');
    }
  },
  model: function() {
    return this.store.find('venue');
  }
});

Fest.VenuesShowRoute = Ember.Route.extend({
  beforeModel: function() {
  var user = this.controllerFor('session').get('currentUser');
    if (! user) {
    this.transitionTo('login');
    }
  },

  model: function(params) {
    return this.store.find('venue', params.venue_id);
  }
});

Fest.ScheduleRoute = Ember.Route.extend({
  beforeModel: function() {
  var user = this.controllerFor('session').get('currentUser');
    if (! user) {
    this.transitionTo('login');
    }
  },

  model: function() {
    return this.store.find('venue');
  }
});

Fest.IndexView = Ember.View.extend({
  didInsertElement: function() {
    var self = this;
    return ! function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location) ? 'http' : 'https';
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + "://platform.twitter.com/widgets.js";
        // fjs.parentNode.insertBefore(js, fjs);
        self.get('element').appendChild(js);
      }
    }(document, "script", "twitter-wjs");

  }
});

Fest.UserView = Ember.View.extend({
  didInsertElement: function() {
    var self = this;
    return ! function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location) ? 'http' : 'https';
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + "://platform.twitter.com/widgets.js";
        // fjs.parentNode.insertBefore(js, fjs);
        self.get('element').appendChild(js);
      }
    }(document, "script", "twitter-wjs");

  }
});

Fest.Band = DS.Model.extend({
  bandName: DS.attr('string'),
  bandBio: DS.attr('string'),
  bandImgUrl: DS.attr('string'),
  bandBreak: DS.attr('number'),
  bandStartTime: DS.attr('date'),
  bandEndTime: DS.attr('date'),
  bandEmbedUrl: DS.attr('string'),
  bandLinkUrl: DS.attr('string'),
  bandText: DS.attr('string'),
  bandVenue: DS.belongsTo('venue', {async: true}),
  bandAttendees: DS.hasMany('user', {inverse: 'userBands', async: true})
});

Fest.Venue = DS.Model.extend({
  venueName: DS.attr('string'),
  venueAddress: DS.attr('string'),
  venueDescription: DS.attr('string'),
  venueImgUrl: DS.attr('string'),
  venueBands: DS.hasMany('band', {async: true}),
  venueEmbedAddress: DS.attr('string')
});

Fest.User = DS.Model.extend({
  userName: DS.attr('string'),
  userImgUrl: DS.attr('string'),
  email: DS.attr('string'),
  emailIsPublic: DS.attr('boolean'),
  userBio: DS.attr('string'),
  userFollows: DS.hasMany('user', {async: true}),
  userFollowedBy: DS.hasMany('user', {inverse: 'userFollows', async: true}),
  userBands: DS.hasMany('band', {async: true}),
  userPostedMessages: DS.hasMany('message', {async: true, inverse: 'postingUser'}),
  userReceivedMessages: DS.hasMany('message', {async: true, inverse: 'postedTo'}),
  sortedReceivedMessages: Ember.computed.sort('userReceivedMessages', 'messagesSorting'),
  messagesSorting: ['messageTime:desc']
});

Fest.User.Validations = {
  userName: {
    length: { minimum: 3, messages: {tooShort: 'Please enter a user name (minimum 3 characters).'} }
  },
  email: {
    format: { with: /@/, message: 'Please enter a valid email address.'}
  },
  userImgUrl: {
    length: { minimum: 3, messages: {tooShort: 'Please add an image.'} }
  },
  userBio: {
    length: {minimum: 3, messages: {tooShort: 'Please add a personal statement.'} }
  }
};

Fest.Message = DS.Model.extend({
  messageText: DS.attr('string'),
  postingUser: DS.belongsTo('user', {async: true}),
  postedTo: DS.belongsTo('user', {async: true}),
  messageTime: DS.attr('date')
});

Fest.BandsViewAllController = Ember.ArrayController.extend({
  sortAscending: true,
  sortProperties: ['bandName'],
  filter: '',
  
  filteredContent: function() {
    var regexp = new RegExp(this.get('filter').toLowerCase());

    return this.get('arrangedContent').filter(function(item) {
      return regexp.test(item.get('bandName').toLowerCase());
    });

  }.property('filter', 'model.bandName')
});

Fest.BandItemController = Ember.ObjectController.extend({
  imgStyle: function(){
    return new Ember.Handlebars.SafeString("background-image: url('"+this.get('bandImgUrl')+"')").toString();
  }.property('bandImgUrl')
});

Fest.UsersViewAllController = Ember.ArrayController.extend({
  sortAscending: true,
  sortProperties: ['userName'],
  filter: '',

  filteredContent: function() {
    var regexp = new RegExp(this.get('filter').toLowerCase());

    return this.get('arrangedContent').filter(function(item) {
      return regexp.test(item.get('userName').toLowerCase());
    });

  }.property('filter', 'model.userName')
});

Fest.UserItemController = Ember.ObjectController.extend({
  imgStyle: function(){
    return new Ember.Handlebars.SafeString("background-image: url('"+this.get('userImgUrl')+"')").toString();
  }.property('userImgUrl')
});

Fest.UserBandsController = Ember.ObjectController.extend({
  bandStartTime: function(){
    return moment(this.get('model.bandStartTime')).zone('+0000').format('h:mm A');
  }.property('model.bandStartTime'),
});

Fest.BandsShowController = Ember.ObjectController.extend({
  needs: ['application', 'session'],
  currentBand: Ember.computed.alias('model'),

  actions: {
    followBand: function() {
      var currentUser = this.get('controllers.session.currentUser');
      var viewedBand = this.get('model');
      currentUser.get('userBands').addObject(viewedBand);
      currentUser.save();
      viewedBand.get('bandAttendees').addObject(currentUser);
      viewedBand.save();
    },

    unfollowBand: function() {
      var currentUser = this.get('controllers.session.currentUser');
      var viewedBand = this.get ('model');
      currentUser.get('userBands').removeObject(viewedBand);
      viewedBand.get('bandAttendees').removeObject(currentUser);
      currentUser.save();
      viewedBand.save();
    }
  },

  followed: function() {
    var currentUser = this.get('controllers.session.currentUser');
    var viewedBand = this.get('model');
    return currentUser.get('userBands').contains(viewedBand);
  }.property('model', 'controllers.session.currentUser.userBands.@each'),

  friendFollowed: Ember.computed.intersect('model.bandAttendees', 'controllers.session.currentUser.userFollows'),

  imgStyle: function(){
    return new Ember.Handlebars.SafeString("background-image: url('"+this.get('bandImgUrl')+"')").toString();
}.property('bandImgUrl'),

  bandStartTime: function(){
    return moment(this.get('currentBand.bandStartTime')).zone('+0000').format('lll');
  }.property('currentBand.bandStartTime')
});

Fest.VenuesShowController = Ember.ObjectController.extend({
  needs: ['application'],
  currentVenue: Ember.computed.alias('model'),

  imgStyle: function(){
  return new Ember.Handlebars.SafeString("background-image: url('"+this.get('venueImgUrl')+"')").toString();
}.property('venueImgUrl')
});

Fest.VenueBandController = Ember.ObjectController.extend({
  needs: ['session'],

  bandStartTime: function(){
    return moment(this.get('model.bandStartTime')).zone('+0000').format('h:mm A');
  }.property('model.bandStartTime'),

  bandEndTime: function(){
    return moment(this.get('model.bandEndTime')).zone('+0000').format('h:mm A');
  }.property('model.bandEndTime'),
});

Fest.ScheduleBandController = Ember.ObjectController.extend({
  needs: ['session'],

  bandStartTime: function(){
    return moment(this.get('model.bandStartTime')).zone('+0000').format('h:mm A');
  }.property('model.bandStartTime'),

  bandEndTime: function(){
    return moment(this.get('model.bandEndTime')).zone('+0000').format('h:mm A');
  }.property('model.bandEndTime'),

  isSelected: function() {
    var currentUser = this.get('controllers.session.currentUser');
    var currentBand = this.get('model');
    if (currentBand.get('bandAttendees').contains(currentUser)){
      return true;
    } else {
      return false;
    }
  }.property('model.bandAttendees.@each', 'controllers.session.currentUser'),

  timeSlotStyle: function() {
    var start = this.get('model.bandStartTime');
    var end = this.get('model.bandEndTime');
    var bandBreak = this.get('model.bandBreak');
    var timeSlot = Math.abs(end - start);
    var ratio = timeSlot/30000;
    var margin = bandBreak * 2;
    return new Ember.Handlebars.SafeString("width:" +ratio+ "px; margin-left:" +margin+ "px;").toString();
  }.property('model.bandStartTime', 'model.bandEndTime', 'model.bandBreak')
});

Fest.LoginController = Ember.Controller.extend(Ember.Validations.Mixin, {
  needs: ['session'],
  validations: Fest.User.Validations,
  flash: {},

  imgStyle: function(){
  return new Ember.Handlebars.SafeString("background-image: url('"+this.get('userImgUrl')+"')").toString();
}.property('userImgUrl'),

  actions: {
    createUser: function(){
      var self = this;
      this.validate().then(function(){
        var credentials = self.getProperties('email', 'password');
        Fest.ref.createUser(credentials, function(error){
          if (! error){
            self.get('controllers.session').authenticate(credentials).then(function(user){
              user.setProperties({
                userName: self.get('userName'),
                email: credentials.email,
                userImgUrl: self.get('userImgUrl'),
                userBio: self.get('userBio'),
                emailIsPublic: self.get('emailIsPublic')
              });
              user.save().then(function(){
                self.transitionToRoute('user');
              })
              .catch(function(error){
                console.error(error);
              });
            });
          }
        });
      })
      // validation was not successful
      .catch(function(){
      var errors = self.get('errors');
      var messages = [];
      Object.keys(errors).forEach(function(prop){
        if (errors[prop].length) {
          messages.push(errors[prop][0]);
        }
      });
      self.set('flash.errors', messages);

      });

    },

    addPhoto: function() {
        var self = this;
        filepicker.pickAndStore({mimetype:"image/*"},{},
        function(InkBlobs){
          var url = InkBlobs[0].url;
          var convertUrl = (url + '/convert?rotate=exif');
          console.log(convertUrl);
          self.set('userImgUrl', convertUrl);
        });
      },

    logIn: function() {
      var self = this;
      var credentials = this.getProperties('email', 'password');
      this.get('controllers.session').authenticate(credentials).then(function(user){
        self.transitionToRoute('user');
      })
      .catch(function(error) {
        alert(error);
      });
    }
  }
});

Fest.IndexController = Ember.Controller.extend({
  needs: ['session'],

  actions: {
    logOut: function(){
      localStorage.removeItem('fest-firebase-token');
      Fest.ref.unauth();
      this.transitionToRoute('login');
    }
  }
});

Fest.SessionController = Ember.Controller.extend({
  needs: ['application'],
  currentUser: null,
  authenticate: function(credentials) {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Fest.ref.authWithPassword(credentials, function(error, authData) {
        self.configureSession(authData).then(resolve, reject);
      });
    });
  },

  configureSession: function(authData) {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject){
      localStorage.setItem('fest-firebase-token', authData.token);
      self.store.find('user', authData.uid).then(function(user){
        self.set('currentUser', user);
        resolve(user);
      }, function(error){
        var user = self.store.recordForId('user', authData.uid);
        user.loadedData();
        self.set('currentUser', user);
        resolve(user);
      });
    });
  },

  authWithToken: function(token) {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Fest.ref.authWithCustomToken(token, function(error, authData) {
        self.configureSession(authData).then(resolve, reject);
      });
    });
  },

});

Fest.ApplicationController = Ember.Controller.extend({
  needs: ['session'],
  currentUser: Ember.computed.alias('model')
});

Fest.UserController = Ember.ObjectController.extend({
  needs: ['application', 'session'],

  actions: {
    addMessage: function() {
      var currentUser = this.get('controllers.session.currentUser');
      var viewedUser = this.get('model');
      var message = this.store.createRecord('message', {
        messageText: this.get('messageText'),
        messageTime: new Date(),
        postingUser: currentUser,
        postedTo: viewedUser
      });
      currentUser.get('userPostedMessages').addObject(message);
      viewedUser.get('userReceivedMessages').addObject(message);
      message.save();
      currentUser.save();
      viewedUser.save();
      this.set('messageText', '');
    }
  },

  imgStyle: function(){
  return new Ember.Handlebars.SafeString("background-image: url('"+this.get('userImgUrl')+"')").toString();
}.property('userImgUrl'),

});

Fest.UsersShowController = Ember.ObjectController.extend({
  needs: ['application', 'session'],
  userFollows: null,

  actions: {
    followUser: function() {
      var currentUser = this.get('controllers.session.currentUser');
      var viewedUser = this.get('model');
      currentUser.get('userFollows').addObject(viewedUser);
      currentUser.save();
      viewedUser.get('userFollowedBy').addObject(currentUser);
      viewedUser.save();
    },

    unfollowUser: function() {
      var currentUser = this.get('controllers.session.currentUser');
      var viewedUser = this.get('model');
      currentUser.get('userFollows').removeObject(viewedUser);
      viewedUser.get('userFollowedBy').removeObject(currentUser);
      currentUser.save();
      viewedUser.save();
    },

    addMessage: function() {
      var currentUser = this.get('controllers.session.currentUser');
      var viewedUser = this.get('model');
      var message = this.store.createRecord('message', {
        messageText: this.get('messageText'),
        messageTime: new Date(),
        postingUser: currentUser,
        postedTo: viewedUser
      });
      currentUser.get('userPostedMessages').addObject(message);
      viewedUser.get('userReceivedMessages').addObject(message);
      message.save();
      currentUser.save();
      viewedUser.save();
      this.set('messageText', '');
    }
  },

  followed: function() {
    var currentUser = this.get('controllers.session.currentUser');
    var viewedUser = this.get('model');
    return currentUser.get('userFollows').contains(viewedUser);
  }.property('model', 'controllers.session.currentUser.userFollows.@each'),

  bandsInCommon: Ember.computed.intersect('model.userBands', 'controllers.session.currentUser.userBands'),

  friendsInCommon: Ember.computed.intersect('model.userFollows', 'controllers.session.currentUser.userFollows'),

  imgStyle: function(){
  return new Ember.Handlebars.SafeString("background-image: url('"+this.get('userImgUrl')+"')").toString();
}.property('userImgUrl')
});

Fest.MessageController = Ember.ObjectController.extend({
  sortAscending: false,
  sortProperties: ['messageTime'],

  imgStyle: function(){
  return new Ember.Handlebars.SafeString("background-image: url('"+this.get('postingUser.userImgUrl')+"')").toString();
}.property('postingUser.userImgUrl'),

  postTime: function(){
    return moment(this.get('model.messageTime')).zone('-0500').format('MMM Do h:mm A');
  }.property('model.messageTime'),

});

Fest.FollowingController = Ember.Controller.extend({
  needs: ['application', 'session']
});

LiquidFire.map(function() {
  //user
  this.transition(
    this.fromRoute('user'),
    this.toRoute('users.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('user'),
    this.toRoute('users.viewAll'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('user'),
    this.toRoute('bands.viewAll'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('user'),
    this.toRoute('schedule'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('user'),
    this.toRoute('venues.viewAll'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('user'),
    this.toRoute('users.show'),
    this.use('toLeft'),
    this.reverse('toLeft')
  );

  this.transition(
    this.fromRoute('user'),
    this.toRoute('index'),
    this.use('toRight'),
    this.reverse('toLeft')
  );

  //users viewAll

  this.transition(
    this.fromRoute('users.viewAll'),
    this.toRoute('bands.viewAll'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('users.viewAll'),
    this.toRoute('users.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('users.viewAll'),
    this.toRoute('bands.viewAll'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('users.viewAll'),
    this.toRoute('venues.viewAll'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('users.viewAll'),
    this.toRoute('schedule'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('users.viewAll'),
    this.toRoute('users.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('users.viewAll'),
    this.toRoute('index'),
    this.use('toRight'),
    this.reverse('toLeft')
  );

  //bands.viewAll

  this.transition(
    this.fromRoute('bands.viewAll'),
    this.toRoute('venues.viewAll'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('bands.viewAll'),
    this.toRoute('schedule'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('bands.viewAll'),
    this.toRoute('bands.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('bands.viewAll'),
    this.toRoute('index'),
    this.use('toRight'),
    this.reverse('toLeft')
  );

  //venues.viewAll

  this.transition(
    this.fromRoute('venues.viewAll'),
    this.toRoute('schedule'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('venues.viewAll'),
    this.toRoute('venues.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('venues.viewAll'),
    this.toRoute('index'),
    this.use('toRight'),
    this.reverse('toLeft')
  );

  //venues.show

  this.transition(
    this.fromRoute('venues.show'),
    this.toRoute('venues.viewAll'),
    this.use('toRight'),
    this.reverse('toLeft')
  );

  this.transition(
    this.fromRoute('venues.show'),
    this.toRoute('bands.viewAll'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('venues.show'),
    this.toRoute('schedule'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('venues.show'),
    this.toRoute('index'),
    this.use('toRight'),
    this.reverse('toLeft')
  );

  //users.show

  this.transition(
    this.fromRoute('users.show'),
    this.toRoute('bands.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('users.show'),
    this.toRoute('venues.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('users.show'),
    this.toRoute('bands.viewAll'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('users.show'),
    this.toRoute('venues.viewAll'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('users.show'),
    this.toRoute('schedule'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('users.show'),
    this.toRoute('index'),
    this.use('toRight'),
    this.reverse('toLeft')
  );

  //bands.show

  this.transition(
    this.fromRoute('bands.show'),
    this.toRoute('venues.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('bands.show'),
    this.toRoute('users.viewAll'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('bands.show'),
    this.toRoute('venues.viewAll'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('bands.show'),
    this.toRoute('schedule'),
    this.use('toRight'),
    this.reverse('toLeft')
  );

  this.transition(
    this.fromRoute('bands.show'),
    this.toRoute('user'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('bands.show'),
    this.toRoute('index'),
    this.use('toRight'),
    this.reverse('toLeft')
  );

  //schedule

  this.transition(
    this.fromRoute('schedule'),
    this.toRoute('bands.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('schedule'),
    this.toRoute('index'),
    this.use('toRight'),
    this.reverse('toLeft')
  );

  //login/signup

  this.transition(
    this.fromRoute('login'),
    this.toRoute('user'),
    this.use('toLeft')
  );

  this.transition(
    this.fromRoute('index'),
    this.toRoute('login'),
    this.use('toLeft')
  );
});
