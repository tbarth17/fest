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
