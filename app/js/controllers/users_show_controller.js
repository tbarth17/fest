Fest.UsersShowController = Ember.ObjectController.extend({
  needs: ['application', 'session'],
  userFollows: null,

  actions: {
    followUser: function() {
      var currentUser = this.get('controllers.session.currentUser');
      var viewedUser = this.get('model');
      currentUser.get('userFollows').addObject(viewedUser);
      currentUser.save();
    }
  },

  imgStyle: function(){
  return new Ember.Handlebars.SafeString("background-image: url('"+this.get('userImgUrl')+"')").toString();
}.property('userImgUrl')
});
