import express from 'express';
import cors from 'cors';
import { login, register } from '../resources/users/user.controller';
import { load, save } from '../resources/lists/lists.controller';


const server = express();

server.use(cors());

// use the express.json() middleware to parse the URL-encoded data from the request
server.use(express.urlencoded({ extended: true }));

// use the express.json() middleware to parse the request body
server.use(express.json());
server.post('/login', login);
server.post('/register', register);
// server.post('/resetPassword', resetPassword)
server.get('/load', load);
server.post('/save', save);



export default server
