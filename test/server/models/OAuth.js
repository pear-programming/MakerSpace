import {expect} from 'chai';
import request from 'supertest-as-promised';
import db from '../../../server/db';

console.log(  "************************************\n"
            + "************************************\n"
            + "**                                **\n"
            + "**     Running OAuth endpoint     **\n"
            + "**                                **\n"
            + "**                                **\n"
            + "**                                **\n"
            + "**                                **\n"
            + "************************************\n"
            + "************************************\n" )

console.log('########## ~ Testing reservation.js models ~~~~~~~~~~~~~...')

var app = require('../../../server/server.js')

describe('', function() {

  describe('Reservations:', function(){
    this.timeout(15000);
    var client = null

    beforeEach(function(){
      client = request.agent(app)
    });

    it('Test 1 direct browser to this route to start the OAuth dance', function(){
      return client
        .get('/auth/makerpass')
        .expect(302)//found!! Yay!
    })

    it('Test 2 Successful authentication', function(){
      return client
        .get('/auth/makerpass/callback')
        .expect(302)//found!! Yay!
    })
    //
    it('Test 3 Serve JS Assets', function(){
      return client
        .get('/app-bundle.js')
        .expect(200)
    })

  })

});
