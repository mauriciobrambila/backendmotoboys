import TelefoneBD from '../Persistencia/TelefoneBD.js';
export default class Telefone{

    #codigoTel;
    #descricao;
    
    constructor(codigoTel, descricao){
        this.#codigoTel = codigoTel;
        this.#descricao = descricao      
    }

    get codigoTel(){
        return this.#codigoTel
    }

    set codigoTel(novoCodigoTel){
        this.#codigoTel = novoCodigoTel
    }      
    
    get descricao(){
        return this.#descricao
    }

    set descricao(novaDescricao){
        this.#descricao = novaDescricao
    }
  
    toJSON(){
        return{
            "codigoTel"    : this.#codigoTel,
            "descricao"    : this.#descricao
          
        }
    }

    async gravar(){
        const telefoneBD = new TelefoneBD();
        this.codigo = await telefoneBD.incluir(this);
    }

    async atualizar(){
        const telefoneBD = new TelefoneBD();
        await telefoneBD.alterar(this);
    }

    async removerDoBancoDados(){
        const telefoneBD = new TelefoneBD();
        await telefoneBD.excluir(this);
    }

    async consultar(termo){
        const telefoneBD = new TelefoneBD();
        const telefones = await telefoneBD.consultar(termo);
        return telefones;
    }

    async consultarCodigo(codigoTel){
        const telefoneBD = new TelefoneBD();
        const telefones = await telefoneBD.consultarCodigo(codigoTel);
        return telefones;
    }
}   