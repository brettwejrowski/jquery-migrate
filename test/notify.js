
QUnit.module( "event notifications" );

QUnit.test( "jquery-migrate:warn", function( assert ) {
  assert.expect( 2 );

  var _warning = ".offset() on plain object";
  var _deprecated_method = function () {
    jQuery( { cat: "dog" } ).offset();
  }

  jQuery.migrateNotifications = true;

  expectNotification( assert, _warning, 1, function() {
    _deprecated_method();
    _deprecated_method();
  } );

  jQuery.migrateNotifications = false;

  expectNoNotification( assert, _warning, function() {
    _deprecated_method();
  } );
} );
