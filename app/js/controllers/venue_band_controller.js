Fest.VenueBandController = Ember.ObjectController.extend({
  bandStartTime: function(){
    return moment(this.get('model.bandStartTime')).zone('+0000').format('lll');
  }.property('model.bandStartTime')
});
