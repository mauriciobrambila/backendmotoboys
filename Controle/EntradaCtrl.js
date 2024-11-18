import Entrada from '../Modelo/Entrada.js'; 
import Hosp from '../Modelo/Hosp.js';
import Hospede from '../Modelo/Hospede.js';

export default class EntradaCTRL{
   
    gravar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "POST" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const data = dados.data;
            const horaEntrada = dados.horaEntrada;
            const horaSaida = dados.horaSaida;
            const hospedes = dados.hospedes;
            const listaHospedes = []
            for(const row of hospedes){
                const hospede = new Hospede(row.hospede.codigo);
                const hosp = new Hosp(hospede);
                listaHospedes.push(hosp);
            }
            
            const entrada = new Entrada(0, data, horaEntrada, horaSaida, listaHospedes);
            entrada.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Cadastrado com sucesso!!" + "\ Registro: " + entrada.registro
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe adequadamente todos os dados para a entrada conforme a documentação da API"
                });
            }
    }

    atualizar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "PUT" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const registro = dados.registro;
            const data = dados.data;
            const horaEntrada = dados.horaEntrada;
            const horaSaida = dados.horaSaida;
            const hospedes = dados.hospedes;

            if(registro && data && horaEntrada && horaSaida) {
                const entrada = new Entrada(registro, data, horaEntrada, horaSaida);
                const listaHospedes = [];
                for (const row of hospedes) {
                  const hospede = new Hospede(row.hospede.codigo);
                  const hosp = new Hosp(hospede);
                  listaHospedes.push(hosp);
                }
                entrada.listaHospedes = listaHospedes;


                entrada.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Entrada atualizada com sucesso!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });       
            }
            else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe adequadamente todos os dados para a entrada conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou entrada no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    excluir(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "DELETE" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const registro = dados.registro;
            if(registro){
                const entrada = new Entrada(registro);
                entrada.removerDoBancoDados().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Excluído com sucesso!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe o registro da entrada conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou entrada no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    consultar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "GET"){
                const entrada = new Entrada();
                entrada.consultar().then((entradas)=>{
                    resposta.status(200).json(entradas);
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }     
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido!  Consulte a documentação da API"
            });
        }
    }
}


