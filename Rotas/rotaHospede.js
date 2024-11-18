import { Router} from "express";
import HospedeCTRL from "../Controle/HospedeCtrl.js";

const rotaHospede = new Router();
const hospedeCtrl = new HospedeCTRL();

rotaHospede.post('/',hospedeCtrl.gravar)
.put('/',hospedeCtrl.atualizar)
.delete('/',hospedeCtrl.excluir)
.get('/',hospedeCtrl.consultar)


export default rotaHospede;   