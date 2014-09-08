Router.map( function() {
  this.route('signin');
  this.route('signup');
  this.route('landing', {
    path:'/'
  });
});

Router.configure({
//  layoutTemplate: 'layout',
//  notFoundTemplate: 'notFound',
//  loadingTemplate: 'loading'
});
