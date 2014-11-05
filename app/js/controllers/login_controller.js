Fest.LoginController = Ember.Controller.extend({
  needs: ['session'],
  // userName: '',
  actions: {
    createUser: function(){
      var credentials = this.getProperties('email', 'password');
      var self = this;
      Fest.ref.createUser(credentials, function(error){
        if (! error){
          self.get('controllers.session').authenticate(credentials).then(function(user){
            console.log(user);
            user.setProperties({
              userName: self.get('userName'),
              email: credentials.email,
              userImgUrl: self.get('url'),
              userBio: self.get('userBio')
            });
            user.save().then(function(){
              self.transitionToRoute('user');
            })
            .catch(function(error){
              console.error(error);
            });
          });
        }
      });
    },

    addPhoto: function() {
        var self = this;
        filepicker.pickAndStore({mimetype:"image/*"},{},
        function(InkBlobs){
          var url = InkBlobs[0].url;
          self.set('url', url);
        });
      },

    logIn: function() {
      var self = this;
      var credentials = this.getProperties('email', 'password');
      this.get('controllers.session').authenticate(credentials).then(function(user){
        self.transitionToRoute('user');
      });
    }
  }
});
