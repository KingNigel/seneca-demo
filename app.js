// var express = require('express');
// var bodyParser = require('body-parser');
// var seneca=require('seneca')();
//  seneca.add('cmd:run', (msg, done) => {
//     return done(null, {tag: 'rejector'})
//   })
//  seneca.act('cmd:abc', {use:{
//    prefix:'/api',
//    pin:{'cmd':'run'},
//    map:{
//      keke:{GET:true}
//    }
//  }})
// var app = express();



// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(seneca.export('web') );

// app.listen(3000);
// // module.exports = app;


var Seneca  = require("seneca");
var Express = require("express");
var Web     = require("seneca-web");

var seneca = Seneca();
var server = Express();

var config = {
    routes:{
        prefix : "/my-api",
        pin: "role:api,cmd:*",
        map:{
            bazinga: {
                GET: true
            }
        }
    }
};

//seneca.use(Web, { adapter: "express", context: server })
seneca.use(Web, {
  context: server,
  adapter: require('seneca-web-adapter-express')
})
seneca.act("role:web", config);
seneca.add("role:api,cmd:bazinga", bazinga);

server.listen(3000);


function bazinga(args, done){
    console.log(args);
    done(null, {
        bar: "Bazinga!"
    });
}