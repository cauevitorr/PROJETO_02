import express from 'express';
import { getProdutos, addProduto, updateProduto, deleteProduto } from '../controllers/produtos.js';

const router = express.Router();

router.get("/", getProdutos);

router.post("/", addProduto);

router.put("/put/:id", updateProduto);

router.delete("/delete/:id", deleteProduto);

export default router;
