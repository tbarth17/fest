Fest.ScheduleController = Ember.ObjectController.extend({
  needs: ['application'],

  timeSlotStyle: function() {
    var start = 'model.bandStartTime';
    var end = 'model.bandEndTime';
    var timeSlot = Math.abs(end - start);
    var ratio = timeSlot / 30000;
  }
});
