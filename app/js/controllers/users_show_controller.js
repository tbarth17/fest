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
  imgStyle: function(){
  return new Ember.Handlebars.SafeString("background-image: url('"+this.get('postingUser.userImgUrl')+"')").toString();
}.property('postingUser.userImgUrl'),

  postTime: function(){
    return moment(this.get('model.messageTime')).zone('+0000').format('MMM Do h:mm A');
  }.property('model.messageTime'),

})
