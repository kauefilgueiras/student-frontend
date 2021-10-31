import { type } from 'os';
import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const Header: React.FC = () => {
    return(
        <Navbar style={{backgroundColor: '#3b5998'}}>
        <Container>
          <Navbar.Brand href="/">
            <div className="home" style={{fontSize: '30px'}}>
              <ul>
                <li style={{listStyleType:'none', color: 'white', fontFamily:'Arial'}}>Cadastro de alunos</li>
              </ul>
              </div>{' '}
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
}

 
export default Header;