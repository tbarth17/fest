LiquidFire.map(function(){
  //user
  this.transition(
  this.fromRoute('user'),
  this.toRoute('users.show'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('user'),
  this.toRoute('users.viewAll'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('user'),
  this.toRoute('bands.viewAll'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('user'),
  this.toRoute('schedule'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('user'),
  this.toRoute('venues.viewAll'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('user'),
  this.toRoute('users.show'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('user'),
  this.toRoute('index'),
  this.use('toRight'),
  this.reverse('toLeft')
);

//users viewAll

  this.transition(
  this.fromRoute('users.viewAll'),
  this.toRoute('bands.viewAll'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('users.viewAll'),
  this.toRoute('users.show'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('users.viewAll'),
  this.toRoute('bands.viewAll'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('users.viewAll'),
  this.toRoute('venues.viewAll'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('users.viewAll'),
  this.toRoute('schedule'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('users.viewAll'),
  this.toRoute('users.show'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('users.viewAll'),
  this.toRoute('index'),
  this.use('toRight'),
  this.reverse('toLeft')
);

  //bands.viewAll

  this.transition(
  this.fromRoute('bands.viewAll'),
  this.toRoute('venues.viewAll'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('bands.viewAll'),
  this.toRoute('schedule'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('bands.viewAll'),
  this.toRoute('bands.show'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('bands.viewAll'),
  this.toRoute('index'),
  this.use('toRight'),
  this.reverse('toLeft')
);

  //venues.viewAll

  this.transition(
  this.fromRoute('venues.viewAll'),
  this.toRoute('schedule'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('venues.viewAll'),
  this.toRoute('venues.show'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('venues.viewAll'),
  this.toRoute('index'),
  this.use('toRight'),
  this.reverse('toLeft')
);

  //venues.show

  this.transition(
  this.fromRoute('venues.show'),
  this.toRoute('venues.viewAll'),
  this.use('toRight'),
  this.reverse('toLeft')
);

  this.transition(
  this.fromRoute('venues.show'),
  this.toRoute('bands.viewAll'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('venues.show'),
  this.toRoute('schedule'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('venues.show'),
  this.toRoute('index'),
  this.use('toRight'),
  this.reverse('toLeft')
);

  //users.show

  this.transition(
  this.fromRoute('users.show'),
  this.toRoute('bands.show'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('users.show'),
  this.toRoute('venues.show'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('users.show'),
  this.toRoute('bands.viewAll'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('users.show'),
  this.toRoute('venues.viewAll'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('users.show'),
  this.toRoute('schedule'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('users.show'),
  this.toRoute('index'),
  this.use('toRight'),
  this.reverse('toLeft')
);

  //bands.show

  this.transition(
  this.fromRoute('bands.show'),
  this.toRoute('venues.show'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('bands.show'),
  this.toRoute('users.viewAll'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('bands.show'),
  this.toRoute('venues.viewAll'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('bands.show'),
  this.toRoute('schedule'),
  this.use('toRight'),
  this.reverse('toLeft')
);

  this.transition(
  this.fromRoute('bands.show'),
  this.toRoute('user'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('bands.show'),
  this.toRoute('index'),
  this.use('toRight'),
  this.reverse('toLeft')
);

  //schedule

  this.transition(
  this.fromRoute('schedule'),
  this.toRoute('bands.show'),
  this.use('toLeft'),
  this.reverse('toRight')
);

  this.transition(
  this.fromRoute('schedule'),
  this.toRoute('index'),
  this.use('toRight'),
  this.reverse('toLeft')
);

  //buggy

  this.transition(
  this.fromRoute('users.show'),
  this.toRoute('users.show'),
  this.use('crossFade'),
  this.reverse('crossFade')
);
});

// Fest.Router.map(function() {
//   this.resource('bands', function(){
//     this.route('show', {path: ':band_id'});
//     this.route('viewAll');
//   });
//
//   this.resource('venues', function(){
//     this.route('show', {path: ':venue_id'});
//     this.route('viewAll');
//   });
//
//   this.resource('users', function(){
//     this.route('viewAll');
//     this.route('show', {path: ':user_id'});
//   });
//
//   this.route('user');
//   this.route('login');
//   this.route('schedule');
//
// });
