import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router';
import api from '../../services/api';
import moment, { lang } from 'moment';
import './index.css';


interface IAluno {
    id: number;
    nome: string;
    ra: string;
    matriculado: boolean;
    nascimento: Date;
    updated_at: Date;
}

const Alunos: React.FC = () => {
    const [student, setStudent] = useState<IAluno[]>([])
    const history = useHistory()

    useEffect(() => {
        loadAlunos()
    }, [])


    async function loadAlunos() {
        const response = await api.get('/student')
        console.log(response);
        setStudent(response.data)
    }


    function formatDate(date: Date) {
        return moment(date).add(1, 'days').format('DD/MM/YYYY')
    }


    function newStudent() {
        history.push('/alunos_cadastro')
    }

    function editStudent(id: number) {
        history.push(`/alunos_cadastro/${id}`)
    }

    function viewStudent(id: number) {
        history.push(`/alunos/${id}`)
    }

    async function deleteStudent(id: number) {
        await api.delete(`/student/${id}`)
        return loadAlunos()
}

async function finishedStudent(id: number){
    await api.patch(`/student/${id}`)
    loadAlunos()
}




return (
    
    <div className="container">
        <br />
        <div className="aluno-header">
            <h1>Página de Alunos</h1>
            <Button variant="outline-success" onClick={newStudent}>Novo Aluno</Button>

        </div>
        <br />
        
        <Table striped bordered hover className="text-center">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Aluno</th>
                    <th>RA</th>
                    <th>Situação</th>
                    <th>Nascimento</th>
                    <th>Data de Atualização</th>
                </tr>
            </thead>
            <tbody>
                {
                    student.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.nome}</td>
                            <td>{student.ra}</td>
                            <td>{student.matriculado ? "Trancado" : "Ativo"}</td>
                            <td>{formatDate(student.nascimento)}</td>

                            <td>{moment(student.updated_at).format('DD/MM/YYYY')}</td>
                            <td>
                                <Button size="sm" variant="primary" onClick={() => editStudent(student.id)}>Editar</Button>{' '}
                                <Button size="sm" variant="success" onClick={() => finishedStudent(student.id)}>Trancar</Button>{' '}
                                <Button size="sm" variant="warning" onClick={() => viewStudent(student.id)}>Visualizar</Button>{' '}
                                <Button size="sm" variant="danger" onClick={() => deleteStudent(student.id) }>Remover</Button>{' '}
                            </td>

                        </tr>
                    ))
                }
            </tbody>
        </Table>
        
    </div>
    
);

}

export default Alunos;

