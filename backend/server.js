const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); 
const { connectToDatabase } = require('./db');  

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:4200',  // URL do front-end
  methods: 'GET,POST',              // Métodos permitidos
  allowedHeaders: 'Content-Type',   // Cabeçalhos permitidos
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json());

app.get('/test-db-connection', async (req, res) => {
  try {
    const connection = await connectToDatabase();  
    connection.close(); 
    res.status(200).send('Conexão com o banco de dados bem-sucedida!');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados', err);
    res.status(500).send('Erro ao conectar ao banco de dados.');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email e senha são obrigatórios.');
  }

  try {
    const connection = await connectToDatabase();

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.query(`
      INSERT INTO usuarios (email, senha)
      VALUES ('${email}', '${hashedPassword}')
    `);

    connection.close(); 
    res.status(200).send('Usuário registrado com sucesso');
  } catch (err) {
    console.error('Erro ao inserir no banco de dados', err);
    res.status(500).send('Erro ao registrar o usuário.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
