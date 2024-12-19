const odbc = require('odbc');

async function connectToDatabase() {
  try {
    const connection = await odbc.connect(`Driver={ODBC Driver 17 for SQL Server};Server=localhost\\MSSQLSERVER03;Database=Estudos;Trusted_Connection=yes;`);
    console.log('Conexão bem-sucedida com o banco de dados');
    return connection;
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados', err);
    throw err;
  }
}

module.exports = { connectToDatabase };  // Exportando a função corretamente
