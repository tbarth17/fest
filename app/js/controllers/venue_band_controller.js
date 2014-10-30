Fest.VenueBandController = Ember.ObjectController.extend({
  // needs: ['session'],
  bandStartTime: function(){
    return moment(this.get('model.bandStartTime')).zone('+0000').format('h:mm A');
  }.property('model.bandStartTime'),

  bandEndTime: function(){
    return moment(this.get('model.bandEndTime')).zone('+0000').format('h:mm A');
  }.property('model.bandEndTime'),

  // isSelected: function(){
  //   if(this.get('controllers.session.currentUser')){
  //     return this.get('controllers.session.currentUser.bands').contains(this.get('model'));
  //   }
  // }.property('controllers.session.currentUser.bands.@each')
});
