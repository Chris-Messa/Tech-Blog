const { Post } = require('../models');

const postData = [
    {
        title: 'Why AI is the Future',
        content: 'Lorem ipsum...',
        created_at: new Date(),
        user_id: 1
    },
    {
        title: 'The Rise of Quantum Computing',
        content: 'Lorem ipsum...',
        created_at: new Date(),
        user_id: 1
    }
];

const seedPosts = async () => await Post.bulkCreate(postData);

module.exports = seedPosts;