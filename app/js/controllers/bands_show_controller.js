Fest.BandsShowController = Ember.ObjectController.extend({
  needs: ['application'],
  currentBand: Ember.computed.alias('model'),

  imgStyle: function(){
    return new Ember.Handlebars.SafeString("background-image: url('"+this.get('bandImgUrl')+"')").toString();
}.property('bandImgUrl'),

  bandStartTime: function(){
    return moment(this.get('currentBand.bandStartTime')).zone('+0000').format('lll');
  }.property('currentBand.bandStartTime')
});
