import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from './api';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function App() {

  const [ lista, setLista ] = useState([]); //imutabilidade
  const [ loading, setLoading ] = useState(true);

  // executa para obter informações exernas  (construtor)
  // "executado uma única vez"
  useEffect(() => {
      api.get('/softwares').then((response) => {
        const itens = response.data;
        setLista(itens);
        setLoading(false);
    })
}, [])


    return (
        <div style={{marginTop: '80px'}}>
{ loading ? <span>Carregando dados...</span> : <div/> }
        <Table>
            <TableBody>
            {lista.map(item => (
                <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.cliente}</TableCell>
                    <TableCell>{item.versao}</TableCell>                    
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <br/>
        {/*<Link to="/create">Adicionar</Link> */}
        <Button variant="contained" color="primary">
             Primary
        </Button>     
        </div>
    );
}    

export default App;
