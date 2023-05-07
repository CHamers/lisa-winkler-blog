const express = require("express");
const ejs = require("ejs");
// const multer = require("multer");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    "mongodb+srv://admin-christel:PhilMilLil33@cluster0.1xmekav.mongodb.net/blogDB"
  );
}

//Created Schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});
//Created model
const Post = mongoose.model("Post", postSchema);

// const posts = [];

// app.get("/", function (req, res) {
//   res.render("about", {
//     startingContent: aboutStartingContent,
//   });
// });
app.get("/", function (req, res) {
  // res.render("home", {
  //   blogPosts: posts,
  // });
  Post.find({})
    .then(function (posts) {
      res.render("home", {
        blogPosts: posts,
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});
app.get("/home", function (req, res) {
  res.render("home");
});

app.get("/blog", function (req, res) {
  // res.render("blog", {
  //   blogPosts: posts,
  // });
  Post.find({})
    .then(function (posts) {
      res.render("blog", {
        blogPosts: posts,
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/publications", function (req, res) {
  res.render("publications");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/maps", function (req, res) {
  res.render("maps");
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  console.log(req.body);
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    img: req.body.postImg,
  });
  // post.save();
  // // posts.push(post);
  // res.redirect("/blog");
  post
    .save()
    .then(function (post) {
      res.redirect("/blog");
    })
    .catch(function (err) {
      console.log(err);
    });
});

// const upload = multer({
//   // dest: "avatars",
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(new Error("Please upload an image"));
//     }
//     cb(undefined, true);
//   },
// });

// app.post("/compose", upload.single("avatar"), function (req, res) {
//   const post = {
//     title: req.body.postTitle,
//     content: req.body.postBody,
//     img: req.file.buffer,
//   };
//   posts.push(post);

//   res.redirect("/blog");
// });

// :postId is dynamic browser '_id'
app.get("/posts/:postId", function (req, res) {
  console.log(req.params);
  const requestedPostId = req.params.postId;
  Post.findOne({ _id: requestedPostId })
    .then(function (post) {
      res.render("post", {
        title: post.title,
        content: post.content,
        img: post.img,
      });
    })
    .catch(function (err) {
      console.log(err);
    });
  // posts.forEach(function (post) {
  //   const storedTitle = _.lowerCase(post.title);
  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content,
  //       img: post.img,
  //     });
  //   }
  // });
});

app.listen(port, function () {
  console.log("Server started on port 3000");
});
