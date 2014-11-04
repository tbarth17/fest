Fest.ApplicationController = Ember.Controller.extend({
  needs: ['session'],
  currentUser: Ember.computed.alias('model')
});
