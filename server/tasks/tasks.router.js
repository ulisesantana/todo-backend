'use strict';

const express = require('express');
const TaskController = require('./tasks.controller');
const api = express.Router();

api.get('/tareas/:id', TaskController.getTask);
api.get('/tareas', TaskController.getTasks);
//api.get('/tareas/pendientes', TaskController.getTasksWithStatus);
api.post('/tareas', TaskController.saveTask);
api.put('/tareas/:id', TaskController.updateTask);
api.delete('/tareas/:id', TaskController.deleteTask);

module.exports = api;