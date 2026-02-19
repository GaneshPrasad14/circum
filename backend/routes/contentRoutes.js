const express = require('express');
const router = express.Router();
const PageContent = require('../models/PageContent');

// Get all content for a specific page
router.get('/:page', async (req, res) => {
    try {
        const contents = await PageContent.find({ page: req.params.page });
        // Transform array to object keyed by section for easier frontend consumption
        const contentMap = contents.reduce((acc, curr) => {
            acc[curr.section] = curr.content;
            return acc;
        }, {});
        res.json(contentMap);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update content for a specific section
router.post('/:page/:section', async (req, res) => {
    try {
        const { page, section } = req.params;
        const { content } = req.body;

        const updatedContent = await PageContent.findOneAndUpdate(
            { page, section },
            {
                page,
                section,
                content,
                lastUpdated: Date.now()
            },
            { new: true, upsert: true } // Create if doesn't exist
        );

        res.json(updatedContent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
