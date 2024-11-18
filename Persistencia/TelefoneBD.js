import Telefone from '../Modelo/Telefone.js';
import Conectar from './Conexao.js';

export default class TelefoneBD{

    async incluir(telefone){
        if(telefone instanceof Telefone){
            const conexao = await Conectar();
            const sql = "INSERT INTO telefones(descricao) VALUES(?)";
            const valores = [telefone.descricao];
            const resultado = await conexao.query(sql, valores);
            
            return await resultado[0].insertId;
        }
    }

    async alterar(telefone){
        if(telefone instanceof Telefone){
            const conexao = await Conectar();
            const sql = "UPDATE telefones SET descricao=? WHERE codigoTel=?";
            const valores = [telefone.descricao, telefone.codigoTel];
            await conexao.query(sql, valores);
           
        }
    }

    async excluir(telefone){
        if(telefone instanceof Telefone){
            const conexao = await Conectar();
            const sql = "DELETE FROM telefones WHERE codigoTel=?";
            const valores = [telefone.codigoTel];
            await conexao.query(sql, valores);
            
        }
    }

    async consultar(termo){
        const conexao = await Conectar();
        const sql = "SELECT * FROM telefones WHERE descricao LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        
        const listaTelefones = [];
        for (const row of rows){
            const telefone = new Telefone(row['codigoTel'], row['descricao']);
            listaTelefones.push(telefone);
        }
        return listaTelefones;
    }

    async consultarCodigo(codigoTel){
        const conexao = await Conectar();
        const sql = "SELECT * FROM telefones WHERE codigoTel = ?";
        const valores = [codigoTel]
        const [rows] = await conexao.query(sql, valores);
     
        const listaTelefones = [];
        for (const row of rows){
            const telefone = new Telefone(row['codigoTel'], row['descricao']);
            listaTelefones.push(telefone);
        }
        return listaTelefones;
    }
}


