Fest.IndexController = Ember.Controller.extend({
  needs: ['session'],

  actions: {
    logOut: function(){
      localStorage.removeItem('fest-firebase-token');
      Fest.ref.unauth();
      this.transitionToRoute('login');
    }
  }
});
