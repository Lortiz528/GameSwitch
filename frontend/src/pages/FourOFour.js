import { Link } from 'react-router-dom';
import { React, Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class FourOFour extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }
  handleShow = () => this.setState({ show: true });
  handleClose = (fromModal) => {
    this.setState({
      show: false,
    });
  };
  componentDidMount() {
    this.setState({
      show: true,
    });
  }
  render() {
    return (
      <>
        {this.state.show ? (
          <div>
            <Modal className="error"
              show={this.state.show}
              onHide={() => this.handleClose({ msg: 'Cross Icon Clicked!' })}
            >
              <Modal.Header closeButton>404</Modal.Header>
              <Modal.Body>
                <h1 style={{ color: 'red', fontSize: 20 }}>Error</h1>
                <h3>Please enter a valid search!</h3>
                <img className="error-photo" src="data:image/png;base64,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" alt=""/>
                <p className='home' style={{ fontSize: 15 }}>
                  <Link style={{ color: 'black' }} to='/'>
                    Home
                  </Link>
                 
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant='danger'
                  onClick={() => this.handleClose({ msg: 'Modal Closed!' })}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : null}
      </>
    );
  }
}
export default FourOFour;