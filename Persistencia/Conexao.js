import mysql from "mysql2/promise";

export default async function conectar() {
  if (global.conexao && global.conexao.status != "disconnected") {
    return global.conexao;
  }

  const conexao = await mysql.createConnection({
    host:"localhost",
    user: "aluno45-pfsii",
    password: "WQNzWD9jcv6ac85wKLCs",
    database: "motoboys",
   });


   //LOCAL
  //const conexao = await mysql.createConnection({
       // host: "localhost",
     //   user: "root",
      //  password: "WQNzWD9jcv6ac85wKLCs",
     //   database: "motoboys"
     // });
    
      global.conexao = conexao;
      return conexao;
    }


    