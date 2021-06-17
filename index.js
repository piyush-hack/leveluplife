const nodemailer = require('nodemailer');
const express = require("express");
const app = express();
const port = 8000;
const fs = require("fs");
// const port = 8000;
// .
// require('cloud').example
// Add a start command to package.json
// Listen on process.env.PORT
const path = require("path");
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

app.use(cookieParser());



// mongoose.connect('mongodb://localhost/testsiteloginform', { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {

//     console.log("connected to mongooose");

// });
// const loginschema = new mongoose.Schema({

//     name: String,
//     psd: String,
//     idconf: String,
//     email: String
// });

// loginschema.methods.speak = function () {//this is used in case you wanna have have method callback
//     const greeting = "data feeded of " + this.name
//     console.log(greeting);
// }


// const logindata = mongoose.model('logindata', loginschema);
//reqiurement for mmailtrap when you are using
// var transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//         user: "2a12329b837667",
//         pass: "8b48e8ddf45977"
//     }
// });


app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

setTimeout(function () {
    var fsjson = fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        // console.log(data);
        data = JSON.parse(data);
        data0 = (data[0]);
        for (x in data) {
            data[x]["today_distance"] = 0;
            console.log(data[x]["today_distance"], x);
            console.log(data);
            data4 = JSON.stringify(data);
            const data3 = fs.writeFileSync('users.json', data4);

        }
    });
}, 86400000);

app.get('/listUsers', function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})



app.get("/signup", (req, res) => {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        if (err) console.log(err);
        alldata = JSON.parse(data);
        var str = "";
        for (x in alldata) {
            str += x;
        }
        const params = { 'allnames': str };
        console.log(params);
        res.status(200).render('index', params);
    });
    
});


app.post("/signup", (req, res) => {
    console.log(req.body);

    name = req.body.name;
    psd = req.body.psd;
    email = req.body.email;

    async_function(name, psd, email, res);
});

app.get("/confmail", (req, res) => {
    console.log(req.query);
    const getidconf = req.query.idconf;
    var fsjson = fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        // console.log(data);
        data = JSON.parse(data);
        idconf = getidconf;
        for(x in data){
            if(data[x]["id"] == idconf){
                var cookiedata = data[x];
                const params = { "logindata": cookiedata, "display": "none" };
                console.log("my cookie data", cookiedata);
                res.cookie("userData", cookiedata, {maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
                res.status(200).render('confmail', params);
                break;
            }
            else{
                console.log("not found")
            }
        }

    });
   

});

app.get("/logout", (req, res) => {

    res.clearCookie("userData");
    const params = {};
    res.status(200).render('logout');


});

app.get("/grind", (req, res) => {

    console.log(req.cookies.userData);
    // if(req.cookies.userData){
    //     var userdata = req.cookies.userData;
    //     const params = {"userdata" : userdata};
    //     res.status(200).render('grind');
    // }else{
    //     res.status(200).render('logout');
    // }

    var userdata = req.cookies.userData;
    const params = { "userdata": userdata };
    res.status(200).render('grind', params);


});

app.post("/grind", (req, res) => {

    console.log(req.body.username);
    var fsjson = fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        // console.log(data);
        data = JSON.parse(data);
        usedname = req.body.username;
        data0 = parseFloat(data[usedname]["distCovered"]);
        data_td = parseFloat(data[usedname]["today_distance"]);
        ndata = parseFloat(req.body.n);
        data[usedname]["distCovered"] = (data0 + ndata);
        data[usedname]["today_distance"] = data_td + ndata;
        console.log("updated json", data[usedname]["distCovered"], data[usedname]["today_distance"]);
        data2 = JSON.stringify(data);
        const data3 = fs.writeFileSync('users.json', data2);
        res.clearCookie("userData");
        


    });


});

app.get("/", (req, res) => {

    var user = req.cookies.userData;
    console.log(user);
    var userd = {"name":"ERROR","distCovered":27330.07915004194,"profession":"teacher","today_distance":0} ;
    if(user){
        userd = user["name"];
    }
    var fsjson = fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        // console.log(data);
        data = JSON.parse(data);
        im = userd;
        var display = "block";
        var welcome = "none";
        var loop = 0;
        var inelse = 0;
        for(x in data){
            if(data[x]["name"] == im){
                display = "none";
                welcome = "block";
                var userdata = data[x];
                const params = { "userdata": userdata, "display": display, "welcome": welcome };
                res.status(200).render('mainindex', params);
                console.log("found")
                break;
            }else{

                // var userData = {"name":"piyush","distCovered":27330.07915004194,"profession":"teacher","today_distance":0}
                console.log("not found")
                inelse++;
            }
            loop++;
        }
        if(loop == inelse){
            res.status(200).render('logout');
        }

    });
    

});

app.get("/raisestats", (req , res)=> {

    var user = req.cookies.userData;
    console.log(user);
    var userd = {"name":"ERROR","distCovered":27330.07915004194,"profession":"teacher","today_distance":0} ;
    var display = "block";
    var welcome = "none";
    if(user){
        userd = user["name"];
        display = "none";
        welcome = "block";
    }
    const raisestatsdata = fs.readFileSync('./raisestats.json',
            {encoding:'utf8', flag:'r'});
    
    // const raise = JSON.stringify(raisestatsdata);
    // console.log(raisestatsdata);
    const params = { "userdata": userd, "display": display, "welcome": welcome, "raisestatsdata" : raisestatsdata };
    res.status('200').render("raisestats" , params);
    

});

function sendmail(mail, text) {
    var string = "G-Mail Sent";
    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'piyushpuniya2001@gmail.com',
            pass: 'frvgerygbdwgdprk'
        }
    });

    const message = {
        from: 'piyushpuniya2001@gamil.com',
        to: `${mail}`,
        subject: 'Sending Email using Node.js',
        text: `${text}`,
        attachments: [
            { // Use a URL as an attachment
                filename: 'your-attachment.png',
                path: 'https://media.gettyimages.com/photos/view-of-tesla-model-s-in-barcelona-spain-on-september-10-2018-picture-id1032050330?s=2048x2048'
            }
        ]
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
            string = "Some err occured plz try after some time";
        } else {
            console.log(info);
            string = "Email Sent! Check Now.";
        }
    });
    return string;
}


function savemongo(name, psd, email) {

    var d = new Date();
    var de = `${d}`;
    var date = de.replace(/\s/g, '');
    var date = date.replace('+', '');
    var id = `${name}` + date;
    const mydata = new logindata({ idconf: id, name: `${name}`, psd: `${psd}`, email: `${email}` });
    console.log("Going to feed data of user :", mydata.name);

    mydata.save(function (err, mydata) {// will create a plural of your mongoose saved model as kitten and save it as a document in your conected db i.i. kart
        if (err) return console.error(err);
        mydata.speak();
    });


    logindata.find({ name: `${name}` }, function (err, k) {
        if (err) return console.error(err);
        console.log("finding :", k);
    })
}

function save_api(name, psd, email) {
    var d = new Date();
    var de = `${d}`;
    var date = de.replace(/\s/g, '');
    var date = date.replace('+', '');
    var date = date.replace(' ', '');
    var ids = `${name}` + date;
    var id = ids.replace(' ', '');
    var user = {
        "name" : {
            "name": name,
            "password": psd,
            "profession": "teacher",
            "id": id,
            "email": email,
            "distCovered": 0,
            "today_distance": 0
        }
    }
    console.log("new user should be",user);
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data[name] = user["name"];
        console.log("new user info :", data[name]);
        console.log(data);
        data2 = JSON.stringify(data);
        const data3 = fs.writeFileSync('users.json', data2);
    });
}

// var first_function = function (name, psd, email) {
//     console.log("Entered first function");
//     return new Promise(resolve => {
//         setTimeout(function () {
//             resolve(savemongo(name, psd, email));
//             console.log("Returned first promise");
//         }, 2000);
//     });
// };
var first_function = function (name, psd, email) {
    console.log("Entered first function");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve(save_api(name, psd, email));
            console.log("Returned first promise");
        }, 2000);
    });
};


var second_function = function (myname, res) {
    console.log("Entered second function");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve(fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
                // console.log(data);
                data = JSON.parse(data);
                usedname = myname;
                data0 = data[usedname];
                uname = data[usedname]["name"];
                pasd = data[usedname]["password"];
                idconf = data[usedname]["id"];
                console.log("updated json", data[usedname]["distCovered"], data[usedname]["today_distance"]);
                data2 = JSON.stringify(data);
                const data3 = fs.writeFileSync('users.json', data2);
                let outtowrite = `You are ${uname}, and your pass is ${psd}, 
                                    and you have just submitted a form created by burn_chat using nodejs click this link to conf your mail
                                    http://127.0.0.1:8000/confmail?idconf=` + idconf;
                console.log(outtowrite);
                // var check = 'check';
                var check = sendmail(email, outtowrite);
                const params = { 'title': 'submitted successfully!', 'message': 'Your form submitted successfuly!', 'style': 'none', 'check': `${check}` }
                res.status(200).render('index', params);


            }));
            console.log("Returned second promise");
        }, 4000)
    });
};

var async_function = async function (name, psd, email, res) {
    console.log('async function called');

    const first_promise = await first_function(name, psd, email);
    console.log("After awaiting for 2 seconds," +
        "the promise returned from first function is:");
    console.log(first_promise);

    const second_promise = await second_function(name, res);
    console.log("After awaiting for 4 seconds, the" +
        "promise returned from second function is:");
    console.log(second_promise);
}




app.listen(port, () => {
    console.log(`connection started at port http://127.0.0.1:${port}/`)
});