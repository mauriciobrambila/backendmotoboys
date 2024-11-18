export default class Hosp{
    #hospede

    constructor(hospede){
        this.#hospede = hospede
    }

    get hospede(){
        return this.#hospede
    }

    set hospede(novoHospede){
        this.#hospede = novoHospede
    }

    toJSON(){
        return {
            "hospede": this.#hospede
        }
    }
}