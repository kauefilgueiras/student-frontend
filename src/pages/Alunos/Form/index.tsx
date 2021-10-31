import moment from 'moment';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../services/api';
import './index.css';


interface IAluno {
    nome: string;
    ra: string;
    nascimento: Date;
    matriculado: boolean;
    updated_at: Date;
}
const Alunos: React.FC = () => {
    const history = useHistory()
    const { id } = useParams<{ id: string }>()


    const [model, setModel] = useState<IAluno>({
        nome: '',
        ra: '',
        matriculado: Boolean(),
        nascimento: new Date(),
        updated_at: new Date()
    })

const d: Date = new Date();



    useEffect(() => {
        console.log(id)
        if (id != undefined) {
            findStudent(id)
        }

    }, [id])

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if (id != undefined) {
            const response = await api.put(`/student/${id}`, model)
        } else {
            const response = await api.post('/student', model)
            console.log(response)
        }
        back()
    }
    function formatDate(date: Date) {
        moment.locale();
        return moment(date).format('  lll')
    }

    function back() {
        history.push('/alunos')
    }

    async function findStudent(id: string) {
        const response = await api.get(`student/${id}`)
        console.log(response)
        setModel({
            nome: response.data.nome,
            ra: response.data.ra,
            nascimento: response.data.nascimento,
            matriculado: response.data.matriculado,
            updated_at: response.data.updated_at
        })
    }


    return (

        <div className="container">
            <br />
            <div className="aluno-header">
                <h1>Novo Aluno</h1>
                <Button variant="outline-danger" style={{ marginLeft: "76%" }} onClick={back}>Voltar</Button>
                <br />
            </div>
            <br />

            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            name="nome"
                            value={model.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                    </Form.Group>
                    <br />
                </Form>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>R.A</Form.Label>
                        <Form.Control
                            type="text"
                            name="ra"
                            value={model.ra}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                    </Form.Group>
                </Form>
                <br />
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Nascimento</Form.Label>
                        <Form.Control
                            type="date"
                            name="nascimento"
                            value={model.nascimento}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                    </Form.Group>
                    <br />
                </Form>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Data de Atualização </Form.Label>
                        <br />
                        <Form.Control
                            disabled={true}
                            readOnly={true}
                            custom={true}
                            name="Data-criação"
                            value={formatDate(model.updated_at)} style={{ fontFamily: 'arial' }} />
                    </Form.Group>
                    <br />
                    <Button variant="success" type="submit">
                        Salvar
                    </Button>
                </Form>
            </div>

        </div>

    );

}
export default Alunos;
