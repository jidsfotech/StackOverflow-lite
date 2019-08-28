var request = require("request");

describe('StackOverFlowLite API End Point Test', () => {

    beforeEach(function () {
        require("../index")
    });

    it('returns status code 200 OK ', (done) => {
        request.get('http://localhost:3000', (error, response, body) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    
    //  GET /questions---Fetch all questions API test
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

    //GET /questions/<questionId> ---Fetch a specific question API test
    it('returns a specific question "GET /questions/<questionId>"', (done) => {
        request.get('http://localhost:3000/api/v2/questions/: 2', (error, response, body) => {
            expect(response.statusCode).toBe(200);
            expect(typeof response.body).toBe("string")
            expect(() => {
                JSON.parse(response.body);
            }).not.toThrow();
            done();
        });
    });

    //POST /questions --Add a question API test
    it('add a question "POST /questions"', (done) => {
        request.post('http://localhost:3000/api/v3/questions', (error, response, body) => {
            expect(response.statusCode).toBe(400);
            done();
        })
    });

    //POST /questions/<questionId>/answers --Add an answer API test
    it('add answer to a question "POST /questions/<questionId>/answers"', (don) => {
        request.post('http://localhost:3000/api/v4/questions/:02/answers', (error, response, body) => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });
});


