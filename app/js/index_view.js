Fest.IndexView = Ember.View.extend({
  didInsertElement: function() {
    var self = this;
    return ! function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location) ? 'http' : 'https';
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + "://platform.twitter.com/widgets.js";
        // fjs.parentNode.insertBefore(js, fjs);
        self.get('element').appendChild(js);
      }
    }(document, "script", "twitter-wjs");

  }
});
