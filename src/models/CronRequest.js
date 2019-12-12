const mongoose = require('mongoose');

const CronRequest = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: mongoose.Schema.Types.Date, default: new Date(), required: true },
    isDeleted: { type: mongoose.Schema.Types.Boolean, default: false },
    item: { type: mongoose.Schema.Types.String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: mongoose.Schema.Types.String, required: true }
});

module.exports = mongoose.model('CronRequest', CronRequest);