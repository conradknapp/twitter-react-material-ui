const User = require("mongoose").model("users");
const TwitterStrategy = require("passport-twitter").Strategy;

const createNewUser = async ({ id, username }, done) => {
  const newUser = await new User({
    twitterId: id,
    username
  });
  await newUser.save().then(user => done(null, user));
};

module.exports = passport => {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "http://localhost:4000/auth/twitter/callback"
      },
      async (token, tokenSecret, profile, done) => {
        // console.log(profile);
        console.log(profile.id, profile.username);
        let existingUser;
        try {
          existingUser = await User.findOne({ twitterId: profile.id });
        } catch (err) {
          res.redirect("http://localhost:3000/");
        }

        console.log(existingUser);
        if (!existingUser) {
          createNewUser(profile, done);
        } else {
          done(null, existingUser);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    await User.findById(id).then(user => done(null, user));
  });
};
