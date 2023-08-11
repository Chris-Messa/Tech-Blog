const router = require('express').Router();
const { Comment } = require('../../models');


router.get('/comments', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/comments', async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        });
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/comments/:id', async (req, res) => {
    try {
        const commentData = await Comment.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        const comment = commentData.get({ plain: true });
        res.json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/comments/:id', async (req, res) => {
    try {
        const commentUpdate = await Comment.update(
            {
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        if (!commentUpdate[0]) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.json({ message: 'Comment updated successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/comments/:id', async (req, res) => {
    try {
        const commentDelete = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!commentDelete) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.json({ message: 'Comment deleted successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router