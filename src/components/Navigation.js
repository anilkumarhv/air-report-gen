import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assests/logo.png'

function Navigation() {
    return (
        <>
            <Navbar expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/pirep">
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        PitteGo
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/pirep">HOME</Nav.Link>
                            <Nav.Link href="/pirep">PIREP</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}

// export default BrandExample;

export default Navigation;