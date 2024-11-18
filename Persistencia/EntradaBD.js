import Entrada from '../Modelo/Entrada.js';
import Telefone from '../Modelo/Telefone.js';
import Hosp from '../Modelo/Hosp.js';
import Hospede from '../Modelo/Hospede.js';    
import Conectar from './Conexao.js';

export default class EntradaBD{

    async incluir(entrada){
        if(entrada instanceof Entrada){
            const conexao = await Conectar();
            try{
                await conexao.beginTransaction();
                const sql = "INSERT INTO entradas(data, horaEntrada, horaSaida) VALUES(?,?,?)";
                const valores = [entrada.data, entrada.horaEntrada, entrada.horaSaida];
                const resultado = await conexao.query(sql, valores);
                entrada.registro = resultado[0].insertId;
                for (const hosp of entrada.listaHospedes){
                    const sql2 = "INSERT INTO hosps(codHospede, codEntrada) VALUES (?,?)";
                    const parametros = [hosp.hospede.codigo, entrada.registro];
                    await conexao.query(sql2,parametros);
                }
            } catch (e){
                await conexao.rollback();
                throw e;
            }
            
        }
    }

    async alterar(entrada){
        if(entrada instanceof Entrada){
            const conexao = await Conectar();
            try{
              await conexao.beginTransaction();
              const sql = "UPDATE entradas SET  data=?, horaEntrada=?, horaSaida=? WHERE registro=?";
            const valores = [entrada.data, entrada.horaEntrada, entrada.horaSaida, entrada.registro];
            await conexao.query(sql, valores);

            const deleteHospSql = "DELETE FROM hosps WHERE codEntrada=?";
            const deleteHospValores = [entrada.registro];
            await conexao.query(deleteHospSql, deleteHospValores);

            for (const hosp of entrada.listaHospedes) {
              const insertHospSql = "INSERT INTO hosps(codHospede, codEntrada) VALUES (?,?)";
              const insertHospValores = [hosp.hospede.codigo, entrada.registro];
              await conexao.query(insertHospSql, insertHospValores);
            }
          } catch (e){
            await conexao.rollback();
            throw e;
          }
         
        }
    }

    async excluir(entrada){
        if (entrada instanceof Entrada) {
            try {
              const conexao = await Conectar();
              await conexao.beginTransaction();
              const deleteHospSql = "DELETE FROM hosps WHERE codEntrada=?";
              const deleteHospValores = [entrada.registro];
              await conexao.query(deleteHospSql, deleteHospValores);
              const deleteEntradaSql = "DELETE FROM entradas WHERE registro=?";
              const deleteEntradaValores = [entrada.registro];
              await conexao.query(deleteEntradaSql, deleteEntradaValores);
              await conexao.commit();
              
            } catch (error) {
              await conexao.rollback();
              console.error("Erro ao excluir entrada:", error);
              throw error;
            }
          }          
    }

    async consultar() {
        let listaEntradas = [];
        const conexao = await Conectar();
        const sql = "SELECT * FROM entradas as a INNER JOIN newHospedes as nv INNER JOIN hosps as v ON a.registro = v.codEntrada AND nv.codigo = v.codHospede ORDER BY a.data";
        const [entradas] = await conexao.query(sql);
        
      
        const registrosProcessados = new Set();
      
        for (const entrads of entradas) {
          if (!registrosProcessados.has(entrads['registro'])) {
            let entrada = new Entrada(entrads['registro'], entrads['data'], entrads['horaEntrada'], entrads['horaSaida'], []);
            const sqlHospedes = "SELECT * FROM newhospedes as nv INNER JOIN hosps as v INNER JOIN telefones as c ON nv.codigo = v.codHospede AND c.codigoTel = nv.codTelefone WHERE v.codEntrada = ?";
            const parametros = [entrada.registro];
            const [hospedesHosp] = await conexao.query(sqlHospedes, parametros);
      
            let listaHospedes = [];
            for (const hosp of hospedesHosp) {
              const telefone = new Telefone(hosp['codigoTel'], hosp['descricao']);
              const hospede = new Hospede(hosp['codigo'], hosp['nome'], hosp['cpf'], hosp['telefone'], hosp['dataCadastro'], telefone);
              listaHospedes.push(new Hosp(hospede, hosp['codEntrada']));
            }
            entrada.listaHospedes = listaHospedes;
            listaEntradas.push(entrada);
      
            registrosProcessados.add(entrads['registro']);
          }
        }
        return listaEntradas;
      }      
        
}      