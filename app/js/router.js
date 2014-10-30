Fest.Router.map(function() {
  this.resource('bands', function(){
    this.route('show', {path: ':band_id'});
    this.route('viewAll');
  });

  this.resource('venues', function(){
    this.route('show', {path: ':venue_id'});
    this.route('viewAll');
  });

  this.route('map');
  this.route('schedule');
});

Fest.BandsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('band');
  }
});

Fest.BandsShowRoute = Ember.Route.extend({
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
  model: function() {
    return this.store.find('venue');
  }
});

Fest.VenuesShowRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('venue', params.venue_id);
  }
});

Fest.ScheduleRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('venue');
  }
});
