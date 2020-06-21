import React, { useState, useEffect } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableRow, 
    TableCell, 
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    DialogActions} from '@material-ui/core';
import './style.css';

function App() {

    const [ lista, setLista ] = useState([]); // imutabilidade
    const [ open, setOpen ] = useState(false);
    const [ tarefa, setTarefa ] = useState('');

    function loadData() { 
            api.get('/softwares').then((response) => {         // OK  
            const itens = response.data;
            setLista(itens);
        });
    }

    useEffect(() => loadData(), [])

    const openModal = () => setOpen(true);

    // function closeModal() { setOpen(false); }
    const closeModal = () => setOpen(false);

    function addTarefa() { 
         const name = tarefa;
        
            api.post('/softwares', { name: name }).then((response) => {
            setTarefa('');
            setOpen(false);
            loadData();
        })
     }

     function deleteTarefa(id) {                                           //OK  
         api.delete(`/softwares/${id}`).then((response) => { 
            loadData()
         })
     }
    

    return (
        <>
        <Header />
        <Container maxWidth="lg" className="container"> 
            <Table>
                {lista.map(item => (
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.cliente}</TableCell>
                        <TableCell>{item.app}</TableCell>
                        <TableCell>{item.versao}</TableCell>
                        <TableCell>
                            <Button variant="outlined" size="small" color="secondary" onClick={() => deleteTarefa(item.id)}>Apagar</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>
        </Container>
        <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Novo Cadastro</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Informe o Cliente, Software e Versão que deseja inserir.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Digite as informações"
                    type="email"
                    fullWidth
                    value={tarefa}
                    onChange={e => setTarefa(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    Cancelar
                </Button>
                <Button onClick={addTarefa} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default App;
