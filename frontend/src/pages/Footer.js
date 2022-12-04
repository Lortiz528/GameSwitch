import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import logo from '../components/logo.png';
import { Link } from 'react-router-dom';

//we can remove this MDB package and style it how we like** turn links into cool buttons

export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section>
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow>
            <MDBCol>
            <Link to="/">
                <img style={{ width: '175px' }} src={logo} alt="logo" />
              </Link>
            </MDBCol>
            <MDBCol  className="mx-auto mb-4 text-center">
                
              <Link to="/about" className="text-uppercase fw-bold mb-4">
                About
              </Link>
              <br></br>
              <br></br>
              <Link to="/tutorial" className="text-uppercase fw-bold mb-4">
                How it Works
              </Link>
              <br></br>
              <br></br>
              <a
                href="https://github.com/Lortiz528/GameSwitch"
                className="text-uppercase fw-bold mb-4"
              >
                Project source Code
              </a>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
      >
        2022
      </div>
    </MDBFooter>
  );
}
