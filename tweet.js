//One to Many Relationships Demo...

const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017/relationshipDemo");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const userSchema = new Schema({
  username: String,
  age: Number,
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeTweets = async () => {
  //   const user = new User({ username: "chickenfan99", age: 61 });
  const user = await User.findOne({ username: "chickenfan99" });
  const tweet2 = new Tweet({
    text: "bock bock bock my chicken make noise",
    likes: 1233,
  });
  tweet2.user = user;
  tweet2.save();
};

//Populating so that we can see user instead of only id...
const findTweet = async () => {
  const t = await Tweet.find({}).populate("user");
  console.log(t);
};

findTweet();

// makeTweets();
