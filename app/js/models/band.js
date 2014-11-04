Fest.Band = DS.Model.extend({
  bandName: DS.attr('string'),
  bandBio: DS.attr('string'),
  bandImgUrl: DS.attr('string'),
  bandStartTime: DS.attr('date'),
  bandEndTime: DS.attr('date'),
  bandEmbedUrl: DS.attr('string'),
  bandLinkUrl: DS.attr('string'),
  bandText: DS.attr('string'),
  bandVenue: DS.belongsTo('venue', {async: true}),
  bandAttendees: DS.hasMany('user', {inverse: 'userBands'})
});
