const router = require('express').Router();

const { Post } = require('../../models');

router.get('/posts', async (req, res) => {
    try {
        const postData = await Post.findAll();
    
        const posts = postData.map((post) => post.get({ plain: true }));
    
        res.json(posts);
      } catch (err) {
        res.status(500).json(err);
      }
})

router.post('/posts', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
        });
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        const post = postData.get({ plain: true });
        res.json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/posts/:id', async (req, res) => {
    try {
        const postUpdate = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        if (!postUpdate[0]) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.json({ message: 'Post updated successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/posts/:id', async (req, res) => {
    try {
        const postDelete = await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!postDelete) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.json({ message: 'Post deleted successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router
