Fest.UserController = Ember.ObjectController.extend({
  needs: ['application'],

  imgStyle: function(){
  return new Ember.Handlebars.SafeString("background-image: url('"+this.get('userImgUrl')+"')").toString();
}.property('userImgUrl')
});
