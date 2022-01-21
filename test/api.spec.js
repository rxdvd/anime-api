const request = require('supertest');
const app = require('../server');
const { isArray, isObject } = require("./testHelpers");

describe('API', () => {
    let testAnime = {
        "title": "Attack on Titan",
        "summary": "Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid beings who devour humans seemingly without reason.",
        "genres": [
            "Action",
            "Drama",
            "Fantasy",
            "Mystery"
        ],
        "episodes": 87,
        "seasons": 4,
        "year": 2013
    };

    let patchAnime = {
        "genres": [
            "Drama",
            "Sci-Fi",
            "Suspense",
            "Comedy"
        ]
    };

    it('GET / responds with status code 200', (done) => {
        request(app)
        .get('/')
        .expect(200, done);
    });

    it('undefined routes respond with status code 404', (done) => {
        request(api)
        .get('/aaaaa')
        .expect(404, done);
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
            .get('/anime')
            .expect('Content-Type', /json/, done);
        });

        it('responds with array', (done) => {
            request(app)
            .get('/anime')
            .end((err, res) => {
                if (err) { return done(err); }

                expect(isArray(res.body)).toBe(true);
                done();
            });
        });
    });

    describe('GET /anime/{id}', () => {
        it('responds with status code 200', (done) => {
            request(app)
            .get('/anime/0')
            .expect(200, done);
        });

        it('responds with status code 404 for unknown id', (done) => {
            request(app)
            .get('/anime/5000')
            .expect(404, done);
        });

        it('responds with json', (done) => {
            request(app)
            .get('/anime/0')
            .expect('Content-Type', /json/, done);
        });

        it('responds with object', (done) => {
            request(app)
            .get('/anime/0')
            .end((err, res) => {
                if (err) { return done(err); }

                expect(isObject(res.body)).toBe(true);
                done();
            });
        });

        it('responds with correct anime data', (done) => {
            request(app)
            .get('anime')
            .expect({
                "id": 0,
                "title": "Attack on Titan",
                "summary": "Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid beings who devour humans seemingly without reason.",
                "genres": [
                    "Action",
                    "Drama",
                    "Fantasy",
                    "Mystery"
                ],
                "episodes": 87,
                "seasons": 4,
                "year": 2013
            }, done);
        });
    });

    describe('POST /anime', () => {
        it('responds with status code 201', (done) => {
            request(app)
            .post('/anime')
            .send(testAnime)
            .expect(201, done);
        });

        it('responds with json', (done) => {
            request(app)
            .post('/anime')
            .send(testAnime)
            .expect('Content-Type', /json/, done);
        });

        it('responds with object', (done) => {
            request(app)
            .post('/anime')
            .send(testAnime)
            .end((err, res) => {
                if (err) { return done(err); }

                expect(isObject(res.body)).toBe(true);
                done();
            });
        });

        it('responds with the correct data', (done) => {
            request(app)
            .post('/anime')
            .send(testAnime)
            .expect({ id: 10, ...testAnime }, done);
        });
    });

    describe('PATCH /anime/{id}', () => {
        it('responds with status code 200', (done) => {
            request(app)
            .patch('/anime/3')
            .send(patchAnime)
            .expect(200, done);
        });

        it('responds with json', (done) => {
            request(app)
            .patch('/anime/3')
            .send(patchAnime)
            .expect('Content-Type', /json/, done);
        });

        it('responds with object', (done) => {
            request(app)
            .patch('/anime/3')
            .send(patchAnime)
            .end((err, res) => {
                if (err) { return done(err); }

                expect(isObject(res.body)).toBe(true);
                done();
            });
        });

        it('responds with the correct data', (done) => {
            request(app)
            .patch('/anime/3')
            .send(patchAnime)
            .expect({
                "id": 3,
                "title": "Steins;Gate",
                "summary": "A self-proclaimed mad scientist invents a microwave that can send text messages into the past.",
                "genres": [
                    "Drama",
                    "Sci-Fi",
                    "Suspense",
                    "Comedy"
                ],
                "episodes": 47,
                "seasons": 2,
                "year": 2011
            }, done);
        });
    });

    describe('DELETE /anime/{id}', () => {
        it('responds with status code 204 and deletes an entry', async (done) => {
            await request(app)
            .delete('/anime/1')
            .expect(204, done);

            const newData = await request(app).get('/anime');

            expect(newData.body.length).toBe(9);
        });
    });

    describe('DELETE /anime', () => {
        it('responds with status code 204 and deletes all data', async (done) => {
            await request(app)
            .delete('/anime')
            .expect(204, done);

            const newData = await request(app).get('/anime');

            expect(newData.body.length).toBe(0);
        });
    });
});
