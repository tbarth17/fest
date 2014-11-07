Fest.LoginController = Ember.Controller.extend(Ember.Validations.Mixin, {
  needs: ['session'],
  validations: Fest.User.Validations,
  flash: {},

  actions: {
    createUser: function(){
      var self = this;
      this.validate().then(function(){
        var credentials = self.getProperties('email', 'password');
        Fest.ref.createUser(credentials, function(error){
          if (! error){
            self.get('controllers.session').authenticate(credentials).then(function(user){
              user.setProperties({
                userName: self.get('userName'),
                email: credentials.email,
                userImgUrl: self.get('userImgUrl'),
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
      })
      // validation was not successful
      .catch(function(){
      var errors = self.get('errors');
      var messages = [];
      Object.keys(errors).forEach(function(prop){
        if (errors[prop].length) {
          messages.push(errors[prop][0])
        }
      })
      self.set('flash.errors', messages)

      });

    },

    addPhoto: function() {
        var self = this;
        filepicker.pickAndStore({mimetype:"image/*"},{},
        function(InkBlobs){
          var url = InkBlobs[0].url;
          self.set('userImgUrl', url);
        });
      },

    logIn: function() {
      var self = this;
      var credentials = this.getProperties('email', 'password');
      this.get('controllers.session').authenticate(credentials).then(function(user){
        self.transitionToRoute('user');
      })
      .catch(function(error) {
        alert(error);
      });
    }
  }
});
