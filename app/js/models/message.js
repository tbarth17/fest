Fest.Message = DS.Model.extend({
  messageText: DS.attr('string'),
  postingUser: DS.belongsTo('user', {async: true}),
  postedTo: DS.belongsTo('user', {async: true}),
  messageTime: DS.attr('date')
});
