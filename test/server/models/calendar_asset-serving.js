import {expect} from 'chai';
import request from 'supertest-as-promised';
import db from '../../../server/db';

console.log(  "************************************\n"
            + "************************************\n"
            + "**                                **\n"
            + "**  Running Calendar's endpoint   **\n"
            + "**                                **\n"
            + "**                                **\n"
            + "**  Brought to you by broCoder    **\n"
            + "**                                **\n"
            + "************************************\n"
            + "************************************\n" )

console.log('########## ~ Testing reservation.js models ~~~~~~~~~~~~~...')

var app = require('../../../server/server.js')

describe('', function() {

  describe('Calendar:', function(){
    this.timeout(15000);
    var client = null

    beforeEach(function(){
      client = request.agent(app)
    });


    it('Test 1 Calendar', function(){
       this.timeout(15000);
      return client
        .get('/lib/jquery.min.js')
        .expect(200)
        setTimeout(done, 15000);
    })
    //
    it('Test 2 Calendar', function(){
      return client
        .get('/lib/moment.min.js')
        .expect(200)
    })
    //
    it('Test 3 Calendar', function(){
      return client
        .get('/fullcalendar/fullcalendar.js')
        .expect(200)
    })

    it('Test 4 Calendar'  , function(){
      return client
        .get('/fullcalendar/fullcalendar.css')
        .expect(200)
    })

    it('Test 5 Calendar', function(){//this works
      return client
        .get('/*')
        .expect(200)
    })

    // it('Test 6 Calendar get timeSlots', function(){//this works
    //   return client
    //     .get('/timeSlots')
    //     .expect(200)
    // })


  })

});
