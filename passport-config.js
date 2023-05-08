const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const mysql = require("mysql")


const con = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "test"
});

async function initialize(passport, getUserByEmail){
    // Function to authenticate users
    const authenticateUsers = async (email, password, done) => {
        // Get users by email
        await getUserByEmail(email, async (user)=>{
            console.log("here",user);
            if (user == null){
                return done(null, false, {message: "No user found with that email"})
            }
            try {
                if(await bcrypt.compare(password, user.password)){
                    if(user.type === "admin"){
                        return done(null, user)
                    }else if(user.type === "user"){
                        await con.query(`INSERT INTO jwll.visitinfo SET email='${user.email}';`, (err, result) => {
                            if(!err){
                                if(result){
                                    return done(null, user)
                                }
                            }
                        })
                    }
                } else{
                    return done (null, false, {message: "Password Incorrect"})
                }
            } catch (e) {
                console.log(e);
                return done(e)
            }
        })
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUsers))
    passport.serializeUser((user, done) => done(null, user.email))
    passport.deserializeUser((email, done) => {
        getUserByEmail(email, (user) => {
            return done(null, user)
        })
    })
}

module.exports = initialize