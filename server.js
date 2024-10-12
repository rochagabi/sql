import express from 'express'; // rota
import mysql from 'mysql2'; // banco
import cors from 'cors'; // requisições seguras

const app = express();
const port = 3000;

// Habilita CORS para permitir requisições do front-end
app.use(cors());
app.use(express.json()); // Para parsear JSON no corpo das requisições

// Cria a conexão com o MySQL
const connection = mysql.createConnection({
    host: 'srv1197.hstgr.io',
    user: 'u605516882_admin',
    password: '@Redware@2024',
    database: 'u605516882_redpass'
});

// Conecta ao banco de dados
connection.connect((error) => {
    if (error) {
        console.log('Conexão com o banco de dados falhou:', error.sqlMessage);
    } else {
        console.log('Banco de dados conectado com sucesso');
    }
});

// Rota para obter os dados da fruta com base no ID
app.get('/frutas/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM frutas WHERE id = ?'; // Usa query parametrizada para evitar SQL injection
    try {
        connection.query(sql, [id], (error, results) => {
            if (error) {
                console.log('erro ', error) 
                return res.status(500).send({ error: error.sqlMessage });
            }
            if (results.length === 0) {
                return res.status(404).send({ error: "Fruta não encontrada" });
            }
            res.status(200).send(results[0]);
        });
    } catch (erro) {
        res.status(500).send({ error: "Ocorreu um erro inesperado" });
    }
});

// Rota para criar uma nova fruta
app.post('/frutas', (req, res) => {
    const { id, nome, cor, peso_medio } = req.body;
    const sql = 'INSERT INTO frutas (nome, cor, peso_medio) VALUES (?, ?, ?)';
    try {
        connection.query(sql, [id, nome, cor, peso_medio], (error, results) => {

            console.error('results executar query:', results);
            if (error) {
                console.error('Erro ao executar query:', error);
                console.error('results executar query:', results);
                return res.status(500).send({ error: error.sqlMessage });
            }
            res.status(201).send({ message: 'Fruta criada com sucesso', fruta: { id, nome, cor, peso_medio } });
        });
    } catch (error) {
        res.status(500).send({ error: "Ocorreu um erro inesperado ao criar a fruta" });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
