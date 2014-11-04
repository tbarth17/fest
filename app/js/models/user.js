Fest.User = DS.Model.extend({
  userName: DS.attr('string'),
  userImgUrl: DS.attr('string'),
  email: DS.attr('string'),
  userBio: DS.attr('string'),
  userFollows: DS.hasMany('user', {async: true}),
  userFollowedBy: DS.hasMany('user', {inverse: 'userFollows'}),
  userBands: DS.hasMany('band', {async: true})
});
