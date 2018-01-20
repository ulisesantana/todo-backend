'use strict';

let Task = require('./tasks.model'); //no .js

function handler(err, task, res){
    if (err) {
        res.status(500).send({
            message: 'Error al devolver la tarea',
            err: err.message
        });
    } else if (!task) {
        res.status(404).send({
            message: 'No hay existe la tarea'
        });
    } else {
        res.status(200).send({
            task //task:task
        });
    }
}

function getTask(req, res) {
    let TaskId = req.params.id;
    //Task.findById(TaskId, handler(err, task, res)); NO

    Task.findById(TaskId, function(err, task){
        if (err) {
            res.status(500).send({
                message: 'Error al devolver la tarea',
                err: err.message
            });
        } else if (!task) {
            res.status(404).send({
                message: 'No hay existe la tarea'
            });
        } else {
            res.status(200).send({
                task //task:task
            });
        }
    });
}

function getTasks(req, res) {
    Task.find({}).sort('_id').exec((err, tasks) => {
        if (err) {
            res.status(500).send({
                message: 'Error al devolver las tareas',
                err: err.message
            });
        } else if (!tasks) {
            res.status(404).send({
                message: 'No hay tareas'
            });
        } else {
            res.status(200).send({
                tasks
            });
        }
    });
}

function getTasksWithStatus(req, res, status = false) {
    Task.find({done:status}).sort('_id').exec((err, tasks) => {
        if (err) {
            res.status(500).send({
                message: 'Error al devolver las tareas',
                err: err.message
            });
        } else if (!tasks) {
            res.status(404).send({
                message: 'No hay tareas'
            });
        } else {
            res.status(200).send({
                tasks
            });
        }
    });
}

function saveTask(req, res) {
    let Task = new Task();
    let params = req.body;

    Task.title = params.title;

    Task.save((err, taskStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar la tarea',
                err: err.message
            });
        } else {
            res.status(200).send({
                Task: taskStored
            });
        }
    });
}

function deleteTask(req, res) {
    let taskId = req.params.id;

    Task.findById(taskId, (err, task) => {
        if (err) {
            res.status(500).send({
                message: 'Error al devolver la tarea',
                err: err.message
            });
        }
        else {
            if(!task) {
                res.status(404).send({
                    message: 'No hay tareas'
                });
            } else{
                Task.remove(err => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error al borrar la tarea',
                            err: err.message
                        });
                    } else {
                        res.status(200).send({
                            message: 'La tarea se ha borrado correctamente'
                        });
                    }
                });
            }
        }
    });
}

function updateTask(req, res) {
    let taskId = req.params.id;
    let update = req.body;

    Task.findByIdAndUpdate(taskId, update, (err, taskUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar la tarea',
                err: err.message
            });
        } else {
            res.status(200).send({task: taskUpdated});
        }
    });
}

module.exports = {
    getTask,
    getTasks,
    saveTask,
    deleteTask,
    updateTask
}
