import React, { useState, useEffect } from 'react';
import { Button, Alert, Container, } from 'react-bootstrap';
import { useHistory } from 'react-router';



const Home: React.FC = () => {
  const [show, setShow] = useState(true);
  const history = useHistory();
  function redirect() {
    history.push('/alunos')
  }

  return (
    <>
      <Container style={{ textAlign: 'center', paddingTop: '150pt', backgroundColor: 'transparent' }}>
        <Alert style={{ backgroundColor: '#EDF05F5 ' }} >
          <Alert.Heading style={{ backgroundColor: 'transparent', fontSize: '30px' }}>Seja bem vindo!</Alert.Heading>
          <p style={{ backgroundColor: 'transparent', fontSize: '20px' }}>
            Abaixo está o link de redirecionamento a listagem de alunos cadastrados em nosso site. <p style={{ backgroundColor: 'transparent' }}>Venha conhecer um pouco mais do nosso projeto!</p>
          </p>
          <hr />
          <div style={{ backgroundColor: 'transparent' }} className="d-flex justify-content-center">
            <Button onClick={redirect} variant="outline-success">
              Clique para ser redirecionado!
            </Button>
          </div>
        </Alert>
      </Container>
    </>
  );
}
export default Home;