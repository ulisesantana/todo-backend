'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = Schema({
    title: String,
    done: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', TasksSchema);