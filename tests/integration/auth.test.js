const request = require('supertest');
const {
    Users
} = require('../../models/users');
const {
    Order
} = require('../../models/order');
let server;

describe('auth middleware', () => {
    beforeEach(() => {
        server = require('../../index');
        token = new Users().generateAuthToken();
    }); //測試前
    afterEach(async () => { //測試後
        await Order.remove({}); //每次清空order
        server.close();
    });

    let token;

    const exec = () => {
        return request(server)
            .post('/api/order')
            .set('x-auth-token', token)
            .send({
                name: 'armand1'
            });
    };

    it('should return 401 if token is provided', async () => {
        token = '';
        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        token = '1234';
        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 401 if token is valid', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });


});