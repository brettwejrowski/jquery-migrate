/* exported expectWarning, expectNoWarning */

// Don't spew on in the console window when we build
if ( navigator.userAgent.indexOf( "PhantomJS" ) >= 0 ) {
	jQuery.migrateMute = true;
}

function validateMessages( assert, messages, name, expected ) {
	// Special-case for 0 warnings expected
	if ( expected === 0 ) {
		assert.deepEqual( messages, [], name + ": did not warn" );

	// Simple numeric equality assertion for warnings matching an explicit count
	} else if ( expected && messages.length === expected ) {
		assert.equal( messages.length, expected, name + ": warned" );

	// Simple ok assertion when we saw at least one warning and weren't looking for an explict count
	} else if ( !expected && messages.length ) {
		assert.ok( true, name + ": warned" );

	// Failure; use deepEqual to show the warnings that *were* generated and the expectation
	} else {
		assert.deepEqual( messages,
			"<warnings: " + ( expected || "1+" ) + ">", name + ": warned"
		);
	}
}

function expectWarning( assert, name, expected, fn ) {
	if ( !fn ) {
		fn = expected;
		expected = null;
	}
	jQuery.migrateReset();
	fn();

	validateMessages( assert, jQuery.migrateWarnings, name, expected );
}

function expectNoWarning( assert, name, expected, fn ) {
	// Expected is present only for signature compatibility with expectWarning
	return expectWarning( assert, name, 0, fn || expected );
}


function expectNotification( assert, name, expected, fn ) {
	if ( !fn ) {
		fn = expected;
		expected = null;
	}

	var _messages = [];
	var _callback = function ( _e, msg) {
		_messages.push( msg );
	}

	jQuery.migrateReset();
	jQuery(window).on("jquery-migrate:warn", _callback);
	fn();

	validateMessages( assert, _messages, name, expected );
}

function expectNoNotification( assert, name, expected, fn ) {
	// Expected is present only for signature compatibility with expectNotification
	return expectNotification( assert, name, 0, fn || expected );
}
