var request = require("request");

describe('StackOverFlowLite API End Point Test', () => {

    beforeEach(function () {
        require("../index")
    });

    describe('GET /', () => {

        it('returns status code 200 OK ', (done) => {
            request.get('http://localhost:3000', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it('returns all questions "GET /questions"', (done) => {
            request.get('http://localhost:3000/api/v1/questions', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(typeof response.body).toBe("string")
                expect(() => {
                    JSON.parse(response.body);
                }).not.toThrow();
                done();
            });
        });

        it('returns a specific question "GET /questions/<questionId>"', (done) => {
            request.get('http://localhost:3000/api/v2/question', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(typeof response.body).toBe("string")
                expect(() => {
                    JSON.parse(response.body);
                }).not.toThrow();
                done();
            });
        });
    });

    describe('/ POST', () => {
        it('add a question "POST /questions"', (done) => {
            request.post('http://localhost:3000/api/v3/questions', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            })
        });

        it('add answer to a question "POST /questions/<questionId>/answers"', (don) => {
            request.post('http://localhost:3000/api/v4/questions/:02/answers', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});


