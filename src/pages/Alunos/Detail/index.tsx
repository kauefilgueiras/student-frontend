import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../services/api';
import './index.css';
import moment from 'moment';

interface IAluno {
    id: number;
    nome: string;
    ra: string;
    matriculado: boolean;
    nascimento: Date;
    updated_at: Date;
}

const Detail: React.FC = () => {

    const history = useHistory()
    const { id } = useParams<{id: string} >()
    const [student, setStudent] = useState <IAluno>()

    async function findStudent() {
        const response = await api.get(`/student/${id}`)
                console.log(response)
                setStudent(response.data)
    }
useEffect (() => {
    findStudent ()
}, [id])

function back() {
    history.push('/alunos')
}

function formatDate(date: Date) {
    return moment(date).add(1,'days').format('DD/MM/YYYY')
}

    return (
        <div className="container">
            <br />
            <div className="student-header">
                <h1>Detalhes do Aluno</h1>
                
            </div>
            <br />
            
            <Card style={{ width: '18rem' }}>
            <Button variant="outline-success" size="sm" onClick={back}>Voltar</Button>
                <Card.Body>
                    <Card.Title>{ student?.nome}</Card.Title>
                    <Card.Text><strong>R.A: </strong>  {student?.ra}
                    <br/>
                         <strong>Situação: </strong>   {student?.matriculado ? "Trancado" : "Ativo"}
                    <br />
                    <strong>Data de Nascimento: </strong>{moment(student?.nascimento).add(1,'days').format('DD/MM/YYYY')}
                    
                    <br />
                    <strong>Data de Cadastro: </strong> {moment(student?.updated_at).format('DD/MM/YYYY')}
                    
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    
    );
}
 
export default Detail;