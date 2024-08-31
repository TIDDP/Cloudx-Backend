const Grant = require('../models/Grant');

// Add a new grant (only for alumni)
exports.addGrant = async (req, res) => {
    try {
        if (req.user.userType !== 'alumni') {
            return res.status(403).json({ message: 'Only alumni can add grants' });
        }

        const { title, description, amount, expiryDate } = req.body;

        const grant = new Grant({
            title,
            description,
            amount,
            expiryDate,
            addedBy: req.user.id
        });

        await grant.save();
        res.status(201).json({ message: 'Grant added successfully', grant });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete a grant (only for alumni)
exports.deleteGrant = async (req, res) => {
    try {
        if (req.user.userType !== 'alumni') {
            return res.status(403).json({ message: 'Only alumni can delete grants' });
        }

        const grant = await Grant.findOneAndDelete({ _id: req.params.id, addedBy: req.user.id });

        if (!grant) {
            return res.status(404).json({ message: 'Grant not found or unauthorized' });
        }

        res.status(200).json({ message: 'Grant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get all grants (viewable by students)
exports.getGrants = async (req, res) => {
    try {
        const grants = await Grant.find();
        res.status(200).json(grants);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};


