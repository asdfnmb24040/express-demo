
const config =require('config');
const {Users} = require('../../../models/users');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const payload = {
            //產生字串id(Return the ObjectID id as a 24 byte hex string representation)
            _id:mongoose.Types.ObjectId().toHexString(),
            isAdmin:true,
        };
        const user = new Users(payload);
        const token = user.generateAuthToken();
        // console.log('token=======>',token);
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        // console.log('decoded=======>',decoded); 
        expect(decoded).toMatchObject(payload);//比較結果
    });
});  