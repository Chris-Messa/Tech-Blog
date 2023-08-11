const { Comment } = require('../models');

const commentData = [
    {
        content: 'Great post!',
        created_at: new Date(),
        user_id: 1,
        post_id: 1
    },
    {
        content: 'I learned so much from this.',
        created_at: new Date(),
        user_id: 2,
        post_id: 1
    }
];

const seedComments = async () => await Comment.bulkCreate(commentData);

module.exports = seedComments;