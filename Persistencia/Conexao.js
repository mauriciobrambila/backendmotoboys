import mysql from "mysql2/promise";

export default async function conectar() {
  if (global.conexao && global.conexao.status != "disconnected") {
    return global.conexao;
  }
   
  const conexao = await mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "aluno45-pfsii",
     database: "hotel"
     });
    
      global.conexao = conexao;
      return conexao;
    }


    