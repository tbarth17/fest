Fest.BandsViewAllController = Ember.ArrayController.extend({
  sortAscending: true,
  sortProperties: ['bandName'],
  filter: '',
  
  filteredContent: function() {
    var regexp = new RegExp(this.get('filter').toLowerCase());

    return this.get('arrangedContent').filter(function(item) {
      return regexp.test(item.get('bandName').toLowerCase());
    });

  }.property('filter', 'model.bandName')
});

Fest.BandItemController = Ember.ObjectController.extend({
  imgStyle: function(){
    return new Ember.Handlebars.SafeString("background-image: url('"+this.get('bandImgUrl')+"')").toString();
  }.property('bandImgUrl')
});
