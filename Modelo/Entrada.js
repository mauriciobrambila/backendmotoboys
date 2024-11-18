import EntradaBD from '../Persistencia/EntradaBD.js';
export default class Entrada{

    #registro;
    #data;
    #horaEntrada;
    #horaSaida;
    #listaHospedes;   

    constructor(registro, data, horaEntrada, horaSaida, listaHospedes){
        this.#registro = registro;
        this.#data = data;
        this.#horaEntrada = horaEntrada;
        this.#horaSaida = horaSaida;
        this.#listaHospedes = listaHospedes
    }

    get registro(){
        return this.#registro
    }

    set registro(novoRegistro){
        this.#registro = novoRegistro
    }

    get horaEntrada(){
        return this.#horaEntrada
    }

    set horaEntrada(novaHoraEntrada){
        this.#horaEntrada = novaHoraEntrada
    }

    get horaSaida(){
        return this.#horaSaida
    }

    set horaSaida(novaHoraSaida){
        this.#horaSaida = novaHoraSaida
    }

    get data(){
        return this.#data
    }

    set data(novaData){
        this.#data = novaData
    }

    get listaHospedes(){
        return this.#listaHospedes
    }

    set listaHospedes(novaListaHospedes){
        this.#listaHospedes = novaListaHospedes
    }

    
    toJSON(){
        return{
            "registro"       : this.#registro,
            "data"           : this.#data,
            "horaEntrada"    : this.#horaEntrada,
            "horaSaida"      : this.#horaSaida,
            "hospedes"       : this.#listaHospedes
        }
    }

    async gravar(){
        const entradaBD = new EntradaBD();
        await entradaBD.incluir(this);
    }

    async atualizar(){
        const entradaBD = new EntradaBD();
        await entradaBD.alterar(this);
    }

    async removerDoBancoDados(){
        const entradaBD = new EntradaBD();
        await entradaBD.excluir(this);
    }

    async consultar(){
        const entradaBD = new EntradaBD();
        const entradas = await entradaBD.consultar();
        return entradas;
    }
   
}   