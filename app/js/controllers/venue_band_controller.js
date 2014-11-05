Fest.VenueBandController = Ember.ObjectController.extend({
  needs: ['session'],

  bandStartTime: function(){
    return moment(this.get('model.bandStartTime')).zone('+0000').format('h:mm A');
  }.property('model.bandStartTime'),

  bandEndTime: function(){
    return moment(this.get('model.bandEndTime')).zone('+0000').format('h:mm A');
  }.property('model.bandEndTime'),

  isSelected: function() {
    var currentUser = this.get('controllers.session.currentUser');
    var currentBand = this.get('model');
    if (currentBand.get('bandAttendees').contains(currentUser)){
      return true;
    } else {
      return false;
    }
  }.property('model.bandAttendees.@each', 'controllers.session.currentUser')
});
