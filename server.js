if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}


// Importing Libraies that we installed using npm
const express = require("express")
const app = express()
const bcrypt = require("bcrypt") // Importing bcrypt package
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const mysql = require("mysql")
const path = require('path')


const con = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "test"
});

initializePassport(
    passport,
    async (email,callback) => { 
        // let data = {email:"c@c",password:"w"};
        let data = undefined;
        
        await con.query(`SELECT email,type,password,name FROM jwll.user WHERE email='${email}' LIMIT 1;`, (err, result) => {
            if(!err){
                // console.log("Sus.email",result[0]);
                if(result[0]){
                    // console.log(data)
                    // console.log("ho",{email:result[0].email,password:result[0].password})
                    data = {email:result[0].email, type:result[0].type, password:result[0].password, name:result[0].name};
                    // console.log(data);
                }else{
                    // data = {email:"c@c1",password:"w"};
                }
            }else{
                // data = {email:"c@c2",password:"w"};
            }
            callback(data);
        })
    }
)



// initializePassport(
//     passport,
//     async (email) => { 
//         aa = {email:"c@c",password:"w"};
//         await con.query(`SELECT email,password FROM jwll.user WHERE email='${email}' LIMIT 1;`, (err, result) => {
//             if(!err){
//                 // console.log("Sus.email",result[0]);
//                 if(result[0]){
//                     console.log("ho",{email:result[0].email,password:result[0].password})
//                     aa= {email:result[0].email,password:result[0].password};
//                 }else{
//                     aa= {email:"f@f",password:"w"};
//                 }
//             }else{
//                 aa= {email:"d@d",password:"w"};
//             }
//         })
//         return aa;
//     }
// )

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: "dxrh4xtf4c86th4tc9t4777799h8xfj4", //process.env.SESSION_SECRET,
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize()) 
app.use(passport.session())
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, 'public')));

// Configuring the register post functionality
app.post("/login", checkNotAuthenticated,  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

// Configuring the register post functionality
app.post("/register", checkNotAuthenticated, async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await con.query(`INSERT INTO jwll.user SET email='${req.body.email}', password='${hashedPassword}', name='${req.body.name}', mob='${req.body.mob}', age='${req.body.age}', ref='${req.body.ref}';`, (err, result) => {
            if (err) {
                // throw err;
                console.log("Error: " + err)
                res.redirect("/register")
            } else {
                // console.log(users); // Display newly registered in the console
                res.redirect("/login")
            }
        });
      
        
    } catch (e) {
        console.log(e);
        res.redirect("/register")
    }
})

// Routes
app.get('/', async (req, res) => {
    if(!(req.isAuthenticated())){
        res.render("index.ejs",{loggedin:false});
    }else if(req.user.type === 'user'){





        res.render("index.ejs", {loggedin:true, name: req.user.name});





    }else if(req.user.type === 'admin'){






        let reflist = {};
        await con.query(`SELECT * FROM jwll.reflist;`, async (err, result) => {
            if(!err){
                if(result){
                    reflist = result;
                    let userdata = {};
                    await con.query(`SELECT * FROM jwll.user;`, async (err, result) => {
                        if(!err){
                            if(result){
                                userdata = result;
                                let visitdata = {};
                                await con.query(`SELECT COUNT(sl) as count, DATEDIFF(MAX(date),MIN(date)) as dayspan FROM jwll.visitinfo;`, (err, result) => {
                                    if(!err){
                                        if(result){
                                            visitdata = result;
                                            res.render("admin.ejs", {
                                                loggedin:true,
                                                reflist: reflist,
                                                userdata: userdata,
                                                visitdata: visitdata
                                            });
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })







    }
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs")
})

app.get('/register', checkNotAuthenticated, async (req, res) => {
    let dataset = {};
    await con.query(`SELECT * FROM jwll.reflist;`, (err, result) => {
        if(!err){
            if(result){
                dataset = result;
            }
        }
        // console.log(dataset);
        res.render("register.ejs", {dataset: dataset})
    })
})
// End Routes

// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
//   })

app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})

// async function userVisitEntry(req, res, next) {
//     console.log(req.body);
//     if(req.body.type === "admin"){
//         return next()
//     }else if(req.body.type === "user"){
//         await con.query(`INSERT INTO jwll.visitinfo SET email='${req.body.email}';`, (err, result) => {
//             if(!err){
//                 if(result){
//                     return next()
//                 }
//             }
//         })
//     }
// }

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}

app.listen(3000)