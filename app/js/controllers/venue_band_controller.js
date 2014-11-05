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
  }.property('model.bandAttendees.@each', 'controllers.session.currentUser'),

  timeSlotStyle: function() {
    var start = this.get('model.bandStartTime');
    var end = this.get('model.bandEndTime');
    var timeSlot = Math.abs(end - start);
    var ratio = timeSlot/30000;
    return new Ember.Handlebars.SafeString("width:" +ratio+ "px").toString();
  }.property('model.bandStartTime', 'model.bandEndTime')
});
