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
