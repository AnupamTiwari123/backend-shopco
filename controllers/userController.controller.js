const User = require('../models/user.model');

exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        // console.log("chal rha hun me", user)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { name, contact, addresses } = req.body;
        user.name = name || user.name;
        user.contact = contact || user.contact;
        user.addresses = addresses || user.addresses;

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
