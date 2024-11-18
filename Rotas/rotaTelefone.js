import { Router} from "express";
import TelefoneCTRL from "../Controle/TelefoneCtrl.js";

const rotaTelefone = new Router();
const telefoneCtrl = new TelefoneCTRL();

rotaTelefone.post('/',telefoneCtrl.gravar)
.put('/',telefoneCtrl.atualizar)
.delete('/',telefoneCtrl.excluir)
.get('/',telefoneCtrl.consultar)


export default rotaTelefone;    