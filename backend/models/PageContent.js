const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
        index: true
    },
    section: {
        type: String,
        required: true
    },
    content: {
        type: mongoose.Schema.Types.Mixed, // Allow any structure (objects, arrays, etc.)
        default: {}
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

// Compound index to ensure unique content per section of a page
pageContentSchema.index({ page: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('PageContent', pageContentSchema);
