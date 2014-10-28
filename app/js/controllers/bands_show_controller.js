Fest.BandsShowController = Ember.ObjectController.extend({
  needs: ['application'],
  currentBand: Ember.computed.alias('model'),

  imgStyle: function(){
  return new Ember.Handlebars.SafeString("background-image: url('"+this.get('bandImgUrl')+"')").toString();
}.property('bandImgUrl')
});
