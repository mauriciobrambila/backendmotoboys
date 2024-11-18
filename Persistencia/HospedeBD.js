import Hospede from '../Modelo/Hospede.js';
import Telefone from '../Modelo/Telefone.js';
import Conectar from './Conexao.js';

export default class HospedeBD{

    async incluir(hospede){
        if(hospede instanceof Hospede){
            const conexao = await Conectar();
            const sql = "INSERT INTO newhospedes(nome, endereco, cpf, fone, dataCadastro, codTelefone) VALUES(?,?,?,?,?,?)";
            const valores = [hospede.nome, 
                             hospede.endereco,
                             hospede.cpf,              
                             hospede.fone, 
                             hospede.dataCadastro, 
                             hospede.codTelefone];
            const resultado = await conexao.query(sql, valores);
            
            return await resultado[0].insertId;
        }
    }

    async alterar(hospede){
        if(hospede instanceof Hospede){
            const conexao = await Conectar();
            const sql = "UPDATE newhospedes SET nome=?, endereco=?, cpf=?, fone=?, dataCadastro=?, codTelefone=? WHERE codigo=?";
            const valores = [hospede.nome, 
                             hospede.endereco,
                             hospede.cpf,            
                             hospede.fone, 
                             hospede.dataCadastro, 
                             hospede.codTelefone,  
                             hospede.codigo];
            await conexao.query(sql, valores);
            
        }
    }

    async excluir(hospede){
        if(hospede instanceof Hospede){
            const conexao = await Conectar();
            const sql = "DELETE FROM newhospedes WHERE codigo=?";
            const valores = [hospede.codigo];
            await conexao.query(sql, valores);
            
        }
    }

    async consultar(termo){
        const conexao = await Conectar();
        const sql = "SELECT nv.*, c.descricao AS telefone_nome, c.codigoTel AS telefone_codigo FROM newHospedes as nv INNER JOIN telefones as c ON nv.codTelefone = c.codigoTel WHERE nv.nome LIKE ?";
        const valores = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql, valores);
       
        const listaHospedes = [];
        for (const row of rows){
            const telefone = new Telefone(row['telefone_codigo'], row['telefone_nome']);
            const hospede = new Hospede(row['codigo'], row['nome'], row['endereco'], row['cpf'], row['fone'], row['dataCadastro'], telefone);
            listaHospedes.push(hospede);
        }
        return listaHospedes;
    }
}    