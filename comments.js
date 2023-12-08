// Create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');

// Create a new comment
router.post('/:id', function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      res.send(err);
    } else {
      var comment = new Comment(req.body);
      comment.save(function(err) {
        if (err) {
          res.send(err);
        } else {
          post.comments.push(comment);
          post.save(function(err) {
            if (err) {
              res.send(err);
            } else {
              res.json(comment);
            }
          });
        }
      });
    }
  });
});

// Get all comments
router.get('/', function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      res.send(err);
    } else {
      res.json(comments);
    }
  });
});

// Get a comment by id
router.get('/:id', function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      res.send(err);
    } else {
      res.json(comment);
    }
  });
});

// Update a comment
router.put('/:id', function(req, res) {
  Comment.findByIdAndUpdate(req.params.id, req.body, function(err, comment) {
    if (err) {
      res.send(err);
    } else {
      res.json(comment);
    }
  });
});

// Delete a comment
router.delete('/:id', function(req, res) {
  Comment.findByIdAndRemove(req.params.id, function(err, comment) {
    if (err) {
      res.send(err);
    } else {
      res.json(comment);
    }
  });
});

module.exports = router;