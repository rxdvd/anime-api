const request = require('supertest');
const server = require('../server');

describe('API', () => {
    let api;

    beforeAll(() => {
        api = server.listen(8000, () => {
            console.log('Test server running on port 8000');
        });
    })
});
