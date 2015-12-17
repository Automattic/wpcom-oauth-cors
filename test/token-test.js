var chai = require( 'chai' );
var expect = require( 'chai' ).expect;
var sinon = require( 'sinon' );
var sinonChai = require( 'sinon-chai' );
chai.use( sinonChai );

var wpOAuth = require( '../index' );

describe( 'wpOAuth.clean()', function() {

	it( 'deletes any saved token from localStorage', function() {
		sinon.spy( wpOAuth, 'setLocalStorageValue' );
		var auth = wpOAuth( 'foobar' );
		auth.clean();
		expect( wpOAuth.setLocalStorageValue ).to.have.been.calledWith( 'wp_oauth', null );
		wpOAuth.setLocalStorageValue.restore();
	} );

} );

describe( 'wpOAuth.reset()', function() {

	it( 'calls clean and request', function() {
		sinon.spy( wpOAuth, 'clean' );
		sinon.spy( wpOAuth, 'request' );
		var auth = wpOAuth( 'foobar' );
		auth.reset();
		expect( wpOAuth.clean ).to.have.been.calledBefore( wpOAuth.request );
		expect( wpOAuth.request ).to.have.been.calledAfter( wpOAuth.clean );
		wpOAuth.clean.restore();
		wpOAuth.request.restore();
	} );

} );

describe( 'wpOAuth.token()', function() {

	beforeEach( function() {
		wpOAuth.clean();
	} );

	it( 'returns null if no token is saved', function() {
		var auth = wpOAuth( 'foobar' );
		expect( auth.token() ).to.not.be.ok;
	} );

	it( 'returns the auth token if it is saved', function() {
		sinon.stub( wpOAuth, 'getLocalStorageValue', function() {
			return '{ "key": "foobar" }';
		} );
		var auth = wpOAuth( 'foobar' );
		expect( auth.token() ).to.eql( { key: 'foobar' } );
		wpOAuth.getLocalStorageValue.restore();
	} );

} );

describe( 'wpOAuth.get()', function() {

	beforeEach( function() {
		wpOAuth.clean();
	} );

	it( 'saves the token to localStorage, if present in the hash of the current URL', function() {
		sinon.stub( wpOAuth, 'getCurrentUrl', function() {
			return 'http://testurl/testpath#access_token=foobartoken';
		} );
		sinon.spy( wpOAuth, 'setLocalStorageValue' );
		var auth = wpOAuth( 'foobar' );
		auth.get();
		expect( wpOAuth.setLocalStorageValue ).to.have.been.calledWith( 'wp_oauth', '{"access_token":"foobartoken"}' );
		wpOAuth.setLocalStorageValue.restore();
		wpOAuth.getCurrentUrl.restore();
	} );

	it( 'removes the hash from the current URL, if present', function() {
		sinon.stub( wpOAuth, 'getCurrentUrl', function() {
			return 'http://testurl/testpath#access_token=foobartoken';
		} );
		sinon.spy( wpOAuth, 'setCurrentUrl' );
		var auth = wpOAuth( 'foobar' );
		auth.get();
		expect( wpOAuth.setCurrentUrl ).to.have.been.calledWith( 'http://testurl/testpath' );
		wpOAuth.setCurrentUrl.restore();
		wpOAuth.getCurrentUrl.restore();
	} );

	it( 'calls request if no token is present in the current URL', function() {
		sinon.stub( wpOAuth, 'getCurrentUrl', function() {
			return 'http://testurl/testpath';
		} );
		sinon.spy( wpOAuth, 'request' );
		var auth = wpOAuth( 'foobar' );
		auth.get();
		expect( wpOAuth.request ).to.have.been.called;
		wpOAuth.request.restore();
		wpOAuth.getCurrentUrl.restore();
	} );

	it( 'does not call request if a token is present in the current URL', function() {
		sinon.stub( wpOAuth, 'getCurrentUrl', function() {
			return 'http://testurl/testpath#access_token=foobartoken';
		} );
		sinon.spy( wpOAuth, 'request' );
		var auth = wpOAuth( 'foobar' );
		auth.get();
		expect( wpOAuth.request ).to.not.have.been.called;
		wpOAuth.request.restore();
		wpOAuth.getCurrentUrl.restore();
	} );

	it( 'does not call the provided callback if no token is present in the current URL', function() {
		sinon.stub( wpOAuth, 'getCurrentUrl', function() {
			return 'http://testurl/testpath';
		} );
		var callback = sinon.spy();
		var auth = wpOAuth( 'foobar' );
		auth.get();
		expect( callback ).to.not.have.been.called;
		wpOAuth.getCurrentUrl.restore();
	} );

	it( 'calls the provided callback with the token, if present in the hash of the current URL', function() {
		sinon.stub( wpOAuth, 'getCurrentUrl', function() {
			return 'http://testurl/testpath#access_token=foobartoken';
		} );
		var callback = sinon.spy();
		var auth = wpOAuth( 'foobar' );
		auth.get( callback );
		expect( callback ).to.have.been.calledWith( { access_token: 'foobartoken' } );
		wpOAuth.getCurrentUrl.restore();
	});

	it( 'calls the provided callback with the token, if present in localStorage and not present in the hash of the current URL', function() {
		sinon.stub( wpOAuth, 'getLocalStorageValue', function() {
			return '{"access_token":"foobartoken"}';
		} );
		sinon.stub( wpOAuth, 'getCurrentUrl', function() {
			return 'http://testurl/testpath';
		} );
		var callback = sinon.spy();
		var auth = wpOAuth( 'foobar' );
		auth.get( callback );
		expect( callback ).to.have.been.calledWith( { access_token: 'foobartoken' } );
		wpOAuth.getCurrentUrl.restore();
		wpOAuth.getLocalStorageValue.restore();
	} );

} );
