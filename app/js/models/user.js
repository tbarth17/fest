Fest.User = DS.Model.extend({
  userName: DS.attr('string'),
  userImgUrl: DS.attr('string'),
  email: DS.attr('string'),
  emailIsPublic: DS.attr('boolean'),
  userBio: DS.attr('string'),
  userFollows: DS.hasMany('user', {async: true}),
  userFollowedBy: DS.hasMany('user', {inverse: 'userFollows', async: true}),
  userBands: DS.hasMany('band', {async: true})
});

Fest.User.Validations = {
  userName: {
    length: { minimum: 3, messages: {tooShort: 'Please enter a user name (minumum 3 characters).'} }
  },
  email: {
    format: { with: /@/, message: 'Please enter a valid email address.'}
  },
  userImgUrl: {
    length: { minimum: 3, messages: {tooShort: 'Please add an image.'} }
  },
  userBio: {
    length: {minimum: 3, messages: {tooShort: 'Please add a personal statement.'} }
  }
};
