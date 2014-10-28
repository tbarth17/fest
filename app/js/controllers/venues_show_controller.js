Fest.VenuesShowController = Ember.ObjectController.extend({
  needs: ['application'],
  currentVenue: Ember.computed.alias('model'),

  imgStyle: function(){
  return new Ember.Handlebars.SafeString("background-image: url('"+this.get('venueImgUrl')+"')").toString();
}.property('venueImgUrl')
});
