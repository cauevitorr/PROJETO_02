import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FormContainer, Label, Input, Button } from "../styles/Form";
import axios from "axios";

const Form = ( {update, setUpdate, getProdutos} ) => {
  const ref = useRef();

  useEffect(() => {
    if(update){
      const produtos = ref.current;

      produtos.nome.value = update.nome;
      produtos.preco.value = update.preco;
      produtos.descricao.value = update.descricao;
      produtos.quantidade.value = update.quantidade;
    }
  }, [update])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const produtos = ref.current;
  
    if (!produtos.nome.value || !produtos.preco.value || !produtos.descricao.value || !produtos.quantidade.value) {
      return toast.warn("Preencha todos os campos do formulário!");
    }

    if (update) {
      await axios
        .put(`http://localhost:4444/${update.id}`, {
          nome: produtos.nome.value,
          preco: produtos.preco.value,
          descricao: produtos.descricao.value,
          quantidade: produtos.quantidade.value,
        })
        .then(() => toast.success("Produto Atualizado com sucesso!"));
    } else {
      await axios
        .post(`http://localhost:4444/`, {
          nome: produtos.nome.value,
          preco: produtos.preco.value,
          descricao: produtos.descricao.value,
          quantidade: produtos.quantidade.value,
        })
        .then(() => toast.success("Cadastrado com sucesso!"))
        .catch(() => toast.error("Não foi possível cadastrar!"));
    }

    produtos.nome.value = "";
    produtos.preco.value = "";
    produtos.descricao.value = "";
    produtos.quantidade.value = "";

    setUpdate(null)
    getProdutos()
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <Label>Nome</Label>
      <Input name="nome" />
      <Label>Preco(a)</Label>
      <Input name="preco" />
      <Label>Descricao</Label>
      <Input name="descricao" />
      <Label>Quantidade</Label>
      <Input name="quantidade" />
      <Button type="submit">ADICIONAR</Button>
    </FormContainer>
  );
};

export default Form;
