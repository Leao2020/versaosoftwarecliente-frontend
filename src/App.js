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
    const [ cliente, setCliente ] = useState('');
    const [ aplicativo, setAplicativo ] = useState('');
    const [ versao, setVersao ] = useState('');

    function loadData() { 
            api.get('/softwares').then((response) => {          
            const itens = response.data;
            setLista(itens);
        });
    }

    useEffect(() => loadData(), [])

    const openModal = () => setOpen(true);

    // function closeModal() { setOpen(false); }
    const closeModal = () => setOpen(false);

    function addTarefa() {                                                  // Aqui que não funciona. Apenas lê e atualiza apenas nome
         const client = cliente;                                               // Eu preciso enviar para a tabela softwares: cliente, software e versao                               
         const ap = aplicativo;                                               // Eu preciso enviar para a tabela softwares: cliente, software e versao                               
         const ver = versao;                                               // Eu preciso enviar para a tabela softwares: cliente, software e versao                               
        
            api.post('/softwares', { cliente: client, app: ap, versao: ver }).then((response) => {
            setCliente('');
            setAplicativo('');
            setVersao('');
            setOpen(false);
            loadData();
        })
     }

     function deleteTarefa(id) {                                            
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
                    id="cliente"
                    label="Digite o cliente"
                    type="text"
                    fullWidth
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}           // Aqui faz a leitura do Dialog. Só lê uma informação. Eu preciso ler 3 informações.
                />
                <TextField
                    margin="dense"
                    id="app"
                    label="Digite o aplicativo"
                    type="text"
                    fullWidth
                    value={aplicativo}
                    onChange={e => setAplicativo(e.target.value)}           // Aqui faz a leitura do Dialog. Só lê uma informação. Eu preciso ler 3 informações.
                />
                <TextField
                    margin="dense"
                    id="versao"
                    label="Digite a versão"
                    type="text"
                    fullWidth
                    value={versao}
                    onChange={e => setVersao(e.target.value)}           // Aqui faz a leitura do Dialog. Só lê uma informação. Eu preciso ler 3 informações.
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
