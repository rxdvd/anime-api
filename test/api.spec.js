const request = require('supertest');
const app = require('../server');

describe('API', () => {
    it('GET / responds with status code 200', (done) => {
        request(app)
        .get('/')
        .expect(200, done);
    });

    it('POST / responds with status code 405', (done) => {
        request(app)
        .post('/')
        .expect(405, done);
    });

    describe('GET /anime', () => {
        it('responds with status code 200', (done) => {
            request(app)
            .get('/anime')
            .expect(200, done);
        });

        it('responds with json', (done) => {
            request(app)
            .get('anime')
            .expect('Content-Type', /json/, done);
        });

        // it('responds with json', (done) => {
        //     request(app)
        //     .get('anime')
        //     .expect('Content-Type', /json/, done);
        // });
    })
});
