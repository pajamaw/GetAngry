// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sass
//= require angular
//= require angular-resource
//= require angular-devise
//= require angular-ui-router
//= require angular-rails-templates
//= require_tree ./templates
//= require_tree

////using simple jquery for now, will change to
///angular component later
$(document).on('click', 'nav', function(){
  console.log($(location.hash.replace('/','')==="profile" ))
  console.log( '/profile' === location.href.replace(`${location.origin+'/#'}`, '') )
  if('/profile' === location.href.replace(`${location.origin+'/#'}`, '')){
    $('a#profile-search').replaceWith('<a id="profile-search" ui-sref="home" href="/#">Search</a> ')
  }
  else{
    $('a#profile-search').replaceWith('<a id="profile-search" ui-sref="profile" href="/#profile">Profile</a> ')
  }
})

$(document).on('click','.navbar-collapse.in',function(e) {
  console.log($(document.location))

    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});
