import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUser } from "react-icons/fa"; // Import the user icon

function Navbare() {
  return (
    <Navbar bg="white" expand="lg" sticky="top" className="shadow p-0">
      <Container>
        <Navbar.Brand
          href="/"
          className="d-flex align-items-center px-4 px-lg-5"
        >
          <h2 className="m-0 text-primary">LinkHub</h2>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarCollapse" className="me-4" />

        <Navbar.Collapse id="navbarCollapse">
          <Nav className="ms-auto p-4 p-lg-0">
            <Nav.Link href="/" className="nav-item nav-link active me-2">
              Home
            </Nav.Link>
            <Nav.Link href="/about" className="nav-item nav-link me-2">
              About
            </Nav.Link>
            <Nav.Link href="#" className="nav-item nav-link me-2">
              Courses
            </Nav.Link>
            <Nav.Link href="#" className="nav-item nav-link me-2">
              Contact
            </Nav.Link>

            {/* Profile Icon and Link */}
            <Nav.Link href="/login" className="nav-item nav-link me-2">
              <FaUser
                size={24}
                style={{ marginRight: "5px", marginBottom: "2px" }}
                color="#0175CD"
              />
            </Nav.Link>
          </Nav>

          {/* Add the search button or any other content here */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbare;
