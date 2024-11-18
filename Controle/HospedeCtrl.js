import Telefone from '../Modelo/Telefone.js';
import Hospede from '../Modelo/Hospede.js'; 
export default class HospedeCTRL{

    gravar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "POST" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const cpf = dados.cpf; 
            const fone = dados.fone;
            const dataCadastro = dados.dataCadastro;
            const codTelefone = dados.codTelefone;
            const telefone = new Telefone(0,"").consultarCodigo(codTelefone).then((telefone)=>{
                if(telefone){
                    const hospede = new Hospede(0, nome, endereco, cpf, fone, dataCadastro, codTelefone);
                    hospede.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        Código: hospede.codigo,
                        mensagem: "Hospede gravado com sucesso!!"
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
                    mensagem:"Telefone não encontrado!"
                });
            }})
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou telefone no formato JSON não fornecido! Consulte a documentação da API"
            });
            }
    }
    
    atualizar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "PUT" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const cpf = dados.cpf;
            const fone = dados.fone;
            const dataCadastro = dados.dataCadastro;
            const codTelefone = dados.codTelefone;
            const telefone = new Telefone(0,"").consultar(codTelefone).then((telefone)=>{
                if(telefone){
                    const hospede = new Hospede(codigo, nome, endereco, cpf, fone, dataCadastro, codTelefone);
                    hospede.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        Código: hospede.codigo,
                        mensagem: "Hospede atualizado com sucesso!!"
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
                    mensagem:"Telefone não encontrado!"
                });
            }})
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou hospede no formato JSON não fornecido! Consulte a documentação da API"
            });
            }
    }

    excluir(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "DELETE" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const codigo = dados.codigo;
            if(codigo){
                const hospede = new Hospede(codigo);
                hospede.removerDoBancoDados().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Hospede excluído com sucesso!!"
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
                    mensagem:"Informe codigo do Hospede conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou hospede no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    consultar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "GET"){
                const hospede = new Hospede();
                hospede.consultar('').then((hospedes)=>{
                    resposta.status(200).json(hospedes);
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