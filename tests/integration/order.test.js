const request = require('supertest');
const mongoose = require('mongoose');
const {Users} = require('../../models/users');
const {
    Order
} = require('../../models/order');
let server;

describe('/api/order', () => {
    beforeEach(() => {
        server = require('../../index');
        console.log('order.test open server');
    }); //測試前
    afterEach(async () => { //測試後
        server.close();
        console.log('order.test close server');
        await Order.remove({}); //每次清空order 
    });

    describe('GET /', () => {
        it('should return all order', async () => {
            await Order.collection.insertMany([ //insert 2 筆資料
                {
                    name: 'armand1'
                },
                {
                    name: 'armand2'
                },
            ]);

            const res = await request(server).get('/api/order');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'armand1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'armand2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return order obj if input right id', async () => {
            const orderObj = {
                _id: mongoose.Types.ObjectId(),
                name: 'armand1'
            };
            const order = new Order(orderObj);
            await order.save();

            const res = await request(server)
                .get('/api/order/' + orderObj._id)
                .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU0NDg4NGRmNDUyMDZjM2M2ODA5NmEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTIwMzI4NjV9.cO5wZqXGzkqEwIv3zr-xYzsM7_3qMYnGc9T-qLKnYM0');
            console.log('res=====>', res.body);
            expect(res.status).toBe(200);
            orderObj._id = orderObj._id.toHexString();
            expect(res.body).toMatchObject(orderObj);
        });
        
        it('should return 404 status if cant find the order', async () => {
            const fakeId = 1;
            const res = await request(server)
            .get('/api/order/' + fakeId)
            .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU0NDg4NGRmNDUyMDZjM2M2ODA5NmEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTIwMzI4NjV9.cO5wZqXGzkqEwIv3zr-xYzsM7_3qMYnGc9T-qLKnYM0');
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {
        //重構：先定義正常測試，然後再每個測試中，將變數一個個
        //更改成我們需要的數值做測試
        let token;
        let name;

        const exec = async()=>{
            return await request(server)
            .post('/api/order') 
            .set('x-auth-token',token)
            .send({name});
        };

        beforeEach(()=>{
            token =  new Users().generateAuthToken();
            name = 'armand1'; 
        });

        it('should return 401 if client is not logged in', async() => {
            token = '';
            const res = await exec(); 

            expect(res.status).toBe(401);
        });
        it('should return 400 if order is less then 5 char', async() => {
            name = '1234';
            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 if order is more then 50 char', async() => {
            name = new Array(52).join('a');
            const res = await exec();
 
            expect(res.status).toBe(400);
        });
        it('should save if it is valid', async() => {
            const res = await exec();

            const order = await Order.find({name:'armand1'});
            // console.log(order);
            // console.log(res.body);
            expect(order).not.toBeNull();//無法判斷空物件
        });

        it('should RETURN if it is valid', async() => {
            const res = await exec();

            // console.log(order);
            // console.log(res.body);

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name');

            server.close();
        });
    });
});

