import HospedeBD from '../Persistencia/HospedeBD.js';
export default class Hospede{

    #codigo;
    #nome;
    #endereco;
    #cpf;
    #fone;
    #dataCadastro;
    #codTelefone;

    constructor(codigo, nome, endereco, cpf, fone, dataCadastro, codTelefone){
        this.#codigo = codigo;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#cpf = cpf;
        this.#fone = fone;
        this.#dataCadastro = dataCadastro;
        this.#codTelefone = codTelefone
    }

    get codigo(){
        return this.#codigo
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo
    }
    
    get nome(){
        return this.#nome
    }

    set nome(novoNome){
        this.#nome = novoNome
    }

    get endereco(){
        return this.#endereco
    }

    set endereco(novoEndereco){
        this.#endereco = novoEndereco
    }

    get cpf(){
        return this.#cpf
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf
    }

   

    get fone(){
        return this.#fone
    }

    set fone(novoFone){
        this.#fone = novoFone
    }

    get dataCadastro(){
        return this.#dataCadastro
    }

    set dataCadastro(novaDataCadastro){
        this.#dataCadastro = novaDataCadastro
    }

    get codTelefone(){
        return this.#codTelefone
    }

    set codTelefone(novoCodTelefone){
        this.#codTelefone = novoCodTelefone
    }

    toJSON(){
        return{
            "codigo"        : this.#codigo,
            "nome"          : this.#nome,
            "endereco"      : this.#endereco,
            "cpf"           : this.#cpf,  
            "fone"          : this.#fone,
            "dataCadastro"  : this.#dataCadastro,
            "codTelefone"   : this.#codTelefone
        }
    }

    async gravar(){
        const  hospedeBD = new HospedeBD();
        this.#codigo = await hospedeBD.incluir(this);
    }

    async atualizar(){
        const  hospedeBD = new HospedeBD();
        await  hospedeBD.alterar(this);
    }

    async removerDoBancoDados(){
        const  hospedeBD = new HospedeBD();    
        await  hospedeBD.excluir(this);
    }

    async consultar(termo){
        const  hospedeBD = new HospedeBD();
        const  hospedes = await  hospedeBD.consultar(termo);
        return  hospedes;
    }
}    