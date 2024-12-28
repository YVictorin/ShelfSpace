import { Strategy as LocalStrategy } from 'passport-local';  //in order to persist a user across multiple requests is why passport is being used 
import bcrypt from 'bcrypt';


function init(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if(!user) {
            //params are server error, user found, message
            return done(null, false, {message: 'No user found with chosen email'})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorrect password, try again'} )
            }

        } catch(e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id))  //serializes our user id into the session
    passport.deserializeUser((id, done) => done(null, getUserById(id)))

}

export default init;