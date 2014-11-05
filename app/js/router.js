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
