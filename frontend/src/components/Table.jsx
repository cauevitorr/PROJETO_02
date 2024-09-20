import axios from 'axios'
import React, {useRef} from 'react'
import { toast } from 'react-toastify'
import { TableContainer, Th, Thead, Tr, Td, Tbody } from '../styles/Table'

const Table = ({produtos, setUpdate, setProdutos}) => {

  const deleteRow = async (id) => {
    await axios.delete(`http://localhost:4444/${id}`)
    .then(({data}) => {
        const novoArray = produtos.filter((produto) => produto.id !== id)
        setProdutos(novoArray)
        toast.success(data)
    })
    .catch(() => toast.error("Não foi possível excluir o registro!"))
  }

  const handleUpdate = (item) => {
    setUpdate(item)
  }

  return (
    <TableContainer>
        <Thead>
            <Tr>
                <Th>Nome</Th>
                <Th>Preço</Th>
                <Th>Descrição</Th>
                <Th>Quantidade</Th>
            </Tr>
        </Thead>
        <Tbody>
          {
            produtos.map((item, i) => (
              <Tr key={i}>
                <Td>{item.nome}</Td>
                <Td>{item.preco}</Td>
                <Td>{item.descricao}</Td>
                <Td>{item.quantidade}</Td>
                <Td><button onClick={() => deleteRow(item.id)}>Excluir</button></Td>
                <Td><button onClick={() => handleUpdate(item)}>Editar</button></Td>
              </Tr>
            ))
          }
        </Tbody>
    </TableContainer>
  )
}

export default Table
