Fest.User = DS.Model.extend({
  userName: DS.attr('string'),
  userImgUrl: DS.attr('string'),
  email: DS.attr('string'),
  userBio: DS.attr('string'),
  userFollows: DS.hasMany('user', {async: true}),
  userBands: DS.hasMany('band', {async: true})
});
