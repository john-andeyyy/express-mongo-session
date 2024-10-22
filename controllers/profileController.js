const Profile = require('../models/Profile');

// Create Profile
exports.createProfile = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newProfile = new Profile({ name, email, age });
        await newProfile.save();
        req.session.profileId = newProfile._id; // Store profile ID in session
        res.status(201).json({ message: 'Profile created', profile: newProfile });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Profile (for logged in session)
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.session.profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
