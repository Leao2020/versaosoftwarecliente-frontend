import React, { useState, useEffect } from 'react';
import api from './api';

function App() {

  const [lista, setLista] = useState([]); //imutabilidade

  useEffect(() => {
      api.get('/softwares').then((response) => {
        const itens = response.data;
        setLista(itens);
    })
}, [])


    return (
        <table>
            {lista.map(item => (
                <tr key={Item.id}>
                    <td>{item.id}</td>
                    <td>{item.cliente}</td>
                    <td>{item.versao}</td>
                    <td>{item.versao}</td>
                </tr>
            ))}
        </table>
    );
}    

export default App;
