Fest.Venue = DS.Model.extend({
  venueName: DS.attr('string'),
  venueAddress: DS.attr('string'),
  venueDescription: DS.attr('string'),
  venueImgUrl: DS.attr('string'),
  venueBands: DS.hasMany('band', {async: true})
});
