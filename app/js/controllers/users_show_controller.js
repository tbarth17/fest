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
