import { db } from "../db.js"
import { z } from "zod"

const produtosSchema = z.object({
 nome: z.string().trim().min(1, { message: 'Escreva o nome do Produto.' }),
 preco: z.number().min(1, { message: 'Escreva o preço do preco.' }),
 descricao: z.string(),
 quantidade: z.number().min(1, { message: 'Escreva o quantidade' })
})

export const getProdutos = (request, response) => {

 const query = "SELECT * FROM estoque"

 db.query(query, (error, data) => {
  if (error) {
   return response.json(error)
  }
  return response.status(200).json(data)
 })
}

export const addProduto = (request, response) => {

 const validation = produtosSchema.safeParse(request.body)

 if (!validation.success) {
  return response.status(400).json({message: 'Escreva corretamente nos respectivos campos'})
 }

 const query = "INSERT INTO estoque(`nome`, `preco`, `descricao`, `quantidade`) VALUES (?)"

 const values = [
  validation.data.nome,
  validation.data.preco,
  validation.data.descricao,
  validation.data.quantidade
 ]

 db.query(query, [values], (error) => {
  if (error) {
   return response.json(error)
  }

  return response.status(200).json("Produto cadastrado com sucesso!")
 })
}

export const updateProduto = (request, response) => {

 const validation = produtosSchema.safeParse(request.body)
 if (!validation.success) {
  return response.status(400).json(validation.success.issues)
 }

 const query = "UPDATE estoque SET `nome` = ?, `preco` = ?, `descricao` = ?, `quantidade` = ? WHERE `id` = ?";

 const values = [
  validation.data.nome,
  validation.data.preco,
  validation.data.descricao,
  validation.data.quantidade
 ]

 db.query(query, [...values, request.params.id], (error) => {
  if (error) {
   return response.json(error)
  }

  response.status(200).json("Produto atualizado com sucesso!")
 })

}

export const deleteProduto = (request, response) => {

 const query = "DELETE from estoque WHERE `id`= ?";

 db.query(query, [request.params.id], (error) => {
  if (error) {
   return response.status(500).json(error)
  }

  return response.status(200).json("Registro deletado com sucesso!")
 })

}
