const { User } = require('../models');

const userData = [
    {
        username: 'john_doe',
        password: 'password123'  // Ensure you hash this before saving to DB in production
    },
    {
        username: 'jane_doe',
        password: 'password456'  // Ensure you hash this before saving to DB in production
    }
];

const seedUsers = async () => await User.bulkCreate(userData);

module.exports = seedUsers;