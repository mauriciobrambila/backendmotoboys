import { Router} from "express";
import EntradaCTRL from "../Controle/EntradaCtrl.js";

const rotaEntrada = new Router();
const entradaCtrl = new EntradaCTRL();

rotaEntrada.post('/',entradaCtrl.gravar)
.put('/',entradaCtrl.atualizar)
.delete('/',entradaCtrl.excluir)
.get('/',entradaCtrl.consultar)


export default rotaEntrada;