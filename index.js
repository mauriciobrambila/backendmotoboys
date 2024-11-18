import express from "express";
import cors from "cors";
import rotaHospede from "./Rotas/rotaHospede.js";
import rotaEntrada from "./Rotas/rotaEntrada.js";
import rotaTelefone from "./Rotas/rotaTelefone.js";

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use('/hospedes', rotaHospede);
app.use('/entrada', rotaEntrada);
app.use('/telefones', rotaTelefone);

app.listen(3000, "localhost", ()=>{
    console.log("Rodando em http://localhost:3000/hospedes")
})
