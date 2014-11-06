Fest.UsersViewAllController = Ember.ArrayController.extend({
  sortAscending: true,
  sortProperties: ['userName'],
  filter: '',

  filteredContent: function() {
    var regexp = new RegExp(this.get('filter').toLowerCase());

    return this.get('arrangedContent').filter(function(item) {
      return regexp.test(item.get('userName').toLowerCase());
    });

  }.property('filter', 'model.userName')
});

Fest.UserItemController = Ember.ObjectController.extend({
  imgStyle: function(){
    return new Ember.Handlebars.SafeString("background-image: url('"+this.get('userImgUrl')+"')").toString();
  }.property('userImgUrl')
});
