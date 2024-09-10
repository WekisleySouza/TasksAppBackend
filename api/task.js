const moment = require('moment')

module.exports = app => {
    const getTasks = (req, res) => {
        const date = req.query.date
            ? req.query.date
            : moment().endOf('day').toDate()

        app.db('tasks')
            .where({ userId: req.user.id })
            .where('toDoDate', '<=', date)
            .orderBy('toDoDate')
            .then(tasks => {
                return res.json(tasks)
            })
            .catch(err => res.status(500).json(err))
    }

    const save = (req, res) => {
        req.body.userId = req.user.id

        app.db('tasks')
            .insert(req.body)
            .returning('id')
            .then(ids => {
                res.status(200).json(ids[0])
            })
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('tasks')
           .where({ id: req.params.id, userId: req.user.id })
           .del()
           .then(rowsDeleted => {
                if(rowsDeleted> 0) {
                    res.status(204).send()
                } else {
                    const msg = 'Task not exists!'
                    res.status(400).send(msg)
                }
           })
           .catch(err => res.status(400).json(err))
    }

    const updateTaskDoneDate = (req, res, doneDate) => {
        app.db('tasks')
           .where({ id: req.params.id, userId: req.user.id })
           .update({ doneDate })
           .then(_ => res.status(200).send())
           .catch(err => res.status(400).json(err))
    }

    const toggleTask = (req, res) => {
        app.db('tasks')
           .where({ id: req.params.id, userId: req.user.id })
           .first()
           .then(task => {
                if(!task) {
                    const msg = 'Task not found!'
                    return res.status(400).send(msg)
                }
                const taskDoneDate = task.doneDate ? null : new Date()
                updateTaskDoneDate(req, res, taskDoneDate)
           })
           .catch(err => res.status(400).json(err))
    }

    const updateTask = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .first()
            .update(req.body)
            .then(() => res.status(200).send())
            .catch(err => res.status(400).json(err))
    }

    return {
        getTasks,
        save,
        remove,
        toggleTask,
        updateTask
    }
}