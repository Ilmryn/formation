const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const router = require('./Router')

const port = 8080


exports.init = (contactService) => {


    app.use(express.static('./public'));

    app.use(bodyParser.json());
    app.use(morgan('dev', {
        //skip: function(req, res) { return req.url.indexOf('/socket.io') !== -1 }
    }));

    app.set('etag', false)
    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-store')
        next()
    })
      

    router.routes(app, io, contactService);

    server.listen(port, () => {
        console.log(`ZenContacts app listening at http://15.237.128.5:${port}`);
    })
    

}