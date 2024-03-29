const Database = require('../db/config');
//Ele está recebendo o contéudo enviado pelo formulário de método POST!
module.exports = {
    async index(req, res) {
        const db = await Database();
        //Separar nossas variáveis enviadas do formulário através da nossa rota associada a esse controller! 
        const roomId = req.params.room;
        const questionId = req.params.question;
        const action = req.params.action;
        const password = req.body.password;

        //Verificar senha
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
        if (verifyRoom.pass == password) {
            if (action == "delete") {
                await db.run(`DELETE FROM questions WHERE id  = ${questionId}`)
            }
            else if (action == "check") {
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            }
            res.redirect(`/room/${roomId}`)
        } else {
            res.render('passincorrect', { roomId: roomId })
        }
    },

    async create(req, res) {
        const db = await Database();
        const question = req.body.question;
        const roomId = req.params.room;
        const category = req.body.category;

        await db.run(`INSERT INTO questions (
           title,
           room,
           category,
           read
        ) VALUES (
            "${question}",
            ${roomId},
            "${category}",
            0
        )`)

        res.redirect(`/room/${roomId}`)

    }
}
