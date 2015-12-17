var chai = require( 'chai' );
var expect = require( 'chai' ).expect;
var sinon = require( 'sinon' );
var sinonChai = require( 'sinon-chai' );
chai.use( sinonChai );

var wpOAuth = require( '../index' );

describe( 'wpOAuth()', function() {

	it( 'throws an exception if client_id is not set', function() {
		expect( wpOAuth ).to.throw( /client_id/ );
	} );

	it( 'sets params.client_id to client_id', function() {
		var auth = wpOAuth( 'foobar' );
		expect( auth.params.client_id ).to.equal( 'foobar' );
	} );

	it( 'sets params.response_type to options.response_type if set', function() {
		var auth = wpOAuth( 'foobar', { response_type: 'bar' } );
		expect( auth.params.response_type ).to.equal( 'bar' );
	} );

	it( 'sets params.response_type to "token" if not set in options', function() {
		var auth = wpOAuth( 'foobar' );
		expect( auth.params.response_type ).to.equal( 'token' );
	} );

	it( 'sets params.redirect_uri to options.redirect if set in options', function() {
		var auth = wpOAuth( 'foobar', { redirect: 'barfoo' } );
		expect( auth.params.redirect_uri ).to.equal( 'barfoo' );
	} );

	it( 'sets params.redirect_uri to current URL without hash if not set in options', function() {
		sinon.stub( wpOAuth, 'getCurrentUrl', function() {
			return 'http://testurl/testpath#testhash';
		} );
		var auth = wpOAuth( 'foobar' );
		expect( auth.params.redirect_uri ).to.equal( 'http://testurl/testpath' );
		wpOAuth.getCurrentUrl.restore();
	} );

	it( 'sets params.scope to options.scope if set in options', function() {
		var auth = wpOAuth( 'foobar', { scope: 'barfoo' } );
		expect( auth.params.scope ).to.equal( 'barfoo' );
	} );

} );

describe( 'wpOAuth.request()', function() {

	beforeEach( function() {
		sinon.spy( wpOAuth, 'setCurrentUrl' );
	} );

	afterEach( function() {
		wpOAuth.setCurrentUrl.restore();
	} );

	it ( 'redirects the browser to the wpcom oauth endpoint', function() {
		var auth = wpOAuth( 'foobar' );
		auth.request();
		expect( wpOAuth.setCurrentUrl ).to.have.been.calledWithMatch( /^https:\/\/public-api\.wordpress\.com\/oauth2\/authorize/ );
	} );

	it ( 'includes the redirect_uri in the redirect URL query string', function() {
		var auth = wpOAuth( 'foobar', { redirect: 'foobarredirect' } );
		auth.request();
		expect( wpOAuth.setCurrentUrl ).to.have.been.calledWithMatch( /\?.*?redirect_uri=foobarredirect/ );
	} );

	it ( 'includes the response_type in the redirect URL query string', function() {
		var auth = wpOAuth( 'foobar', { response_type: 'barfootype' } );
		auth.request();
		expect( wpOAuth.setCurrentUrl ).to.have.been.calledWithMatch( /\?.*?response_type=barfootype/ );
	} );

	it ( 'includes the scope in the redirect URL query string', function() {
		var auth = wpOAuth( 'foobar', { scope: 'barfoo' } );
		auth.request();
		expect( wpOAuth.setCurrentUrl ).to.have.been.calledWithMatch( /\?.*?scope=barfoo/ );
	} );

	it ( 'includes the client_id in the redirect URL query string', function() {
		var auth = wpOAuth( 'foobar' );
		auth.request();
		expect( wpOAuth.setCurrentUrl ).to.have.been.calledWithMatch( /\?.*?client_id=foobar/ );
	} );

} );
