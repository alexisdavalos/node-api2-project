const express = require("express");

const Posts = require("../data/db")

const router = express.Router();

//Get Routes
router.get('/', (req, res) => {
    
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

router.get('/:id/comments', (req, res) => {
    //If the post with the specified id is not found:
    Posts.findPostComments(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({ error: "The comments information could not be retrieved." });
        });
});

// Post Routes
router.post('/', (req, res) => {
    const newPost = req.body;
    console.log(newPost);
    //turnary operator to check req.body
    (newPost.title === '' || newPost.contents === '') ? 
    res.status(400).json({ error: 'Please provide title and contents for post'}) :
    // passes check, inserts newPost
    Posts.insert(newPost)
        .then(post => {
            res.status(201).json({post, content: newPost});
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error adding the hub',
            });
        });
});

// Delete Routes
router.delete('/:id', async (req, res) => {
    let selectedPost = null;
    await Posts.findById(req.params.id).then(post => {
        console.log('Post',post)
        if (post === []){
            res.status(404).json({message: 'The Post With The Specified ID Does Not Exist. Async'})
        }else{
            selectedPost = post,
            console.log(selectedPost)
        }
    }).catch(err => {
        res.status(404).json({ message: "The post with the specified ID does not exist. Async" })
    })
    console.log(selectedPost)

    if (selectedPost !== []) {
        Posts.remove(req.params.id)
            .then(count => {
                if (count > 0) {
                    res.status(200).json({ message: 'The post has been nuked', ...selectedPost });
                } else {
                    res.status(404).json({ message: 'The post with the specified ID does not exist.' });
                }
            })
            .catch(error => {
                // log error to database
                console.log(error);
                res.status(500).json({
                    message: 'Error removing the hub',
                });
            });
    }
});

// Put Routes
router.put('/:id', (req, res) => {
    const changes = req.body;
    (changes.title === '' || changes.contents === '') ? 
    res.status(400).json({message: 'Please provide title and contents for the post'}) :
    Posts.update(req.params.id, changes)
        .then(hub => {
            if (hub > 0) {
                res.status(200).json({response: true, message: 'Post Edited', ...changes});
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({ error: "The post information could not be modified." });
        });
});

module.exports = router;