Fest.UserBandsController = Ember.ObjectController.extend({
  bandStartTime: function(){
    return moment(this.get('model.bandStartTime')).zone('+0000').format('h:mm A');
  }.property('model.bandStartTime'),
});
