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
