Fest.Router.map(function() {
  this.resource('bands', function(){
    this.route('show', {path: ':band_id'});
    this.route('viewAll');
  });
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
