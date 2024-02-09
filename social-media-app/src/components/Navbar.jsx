/* Imports */
import React from "react";
import { Navbar, Container, Image, NavDropdown, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser } from "../hooks/user.actions";
import { Link } from "react-router-dom";



/* Function navigation bar */
function NavigationBar() {
    /* Constants */
    const navigate = useNavigate();
    const user = getUser();
    

    /* Handle logout anonymous function */
    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/login/");
    }



    /* Return */
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand className="fw-bold" href="#home">
                    Postagram
                </Navbar.Brand>

                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown
                            title={
                                <Image
                                    src={user.avatar}
                                    roundedCircle
                                    width={36}
                                    height={36}
                                />
                            }
                        >                            
                            <NavDropdown.Item as={Link} to={`/profile/${user.id}/`}>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}



/* Exports */
export default NavigationBar;


