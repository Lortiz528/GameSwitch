import './About.css';
import { Card, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import github from './GitHub_Logo.png';
import linkedIn from './linked.png';

function About() {
  return (
    <Container className="about">
      <br></br>
      <h1>Meet The GameSwitch Team</h1>
      <Row style={{ display: 'flex', flexDirection: 'row' }}>
        <Card className='biocard' style={{ flex: 1 }}>
          <Card.Img
            variant="top"
            src="https://i.imgur.com/N3cjPZK_d.jpg?maxwidth=520&shape=thumb&fidelity=high"
          />
          <Card.Body>
            <Card.Title>Luis Ortiz</Card.Title>
            <Card.Text>
              I am a full stack engineer based in NYC with a background in
              Logistics/transportation. I have a passion for wildlife, space
              exploration, and baseball. In my spare time, I am dabbling in electronics repair/ customization and watching/playing Baseball.
            </Card.Text>
            <Card.Footer>
            <a href="https://github.com/Lortiz528">
              <Card.Img
                alt="GitHub"
                title="GitHub"
                src={github}
                style={{ width: '100px' }}
              />
            </a>
            <a href="https://www.linkedin.com/in/lortiz528/">
              <Card.Img
                alt="LinkedIn"
                title="LinkedIn"
                src={linkedIn}
                style={{ width: '100px' }}
              />
            </a>
            </Card.Footer>
          </Card.Body>
        </Card>
        <Card className='biocard' style={{ flex: 1 }}>
          <Card.Img
            variant="top"
            src="https://i.imgur.com/mFmfhHL_d.jpg?maxwidth=520&shape=thumb&fidelity=high"
          />
          <Card.Body>
            <Card.Title>Li Li Wu</Card.Title>
            <Card.Text>
              I am fullstack software engineer in NYC with a Bachelor of
              Business Administration in Marketing. I have a background in logistics/ importing. I like to code and create
              websites. When I am not coding, I like to binge on series and try new foods!
            </Card.Text>
            <Card.Footer>
            <a href="https://github.com/liliwu8">
              <Card.Img
                alt="GitHub"
                title="GitHub"
                src={github}
                style={{ width: '100px' }}
              />
            </a>
            <a href="https://www.linkedin.com/in/li-li-w-83831984/">
              <Card.Img
                alt="LinkedIn"
                title="LinkedIn"
                src={linkedIn}
                style={{ width: '100px' }}
              />
            </a>
            </Card.Footer>
          </Card.Body>
        </Card>
        <Card className='biocard' style={{ flex: 1 }}>
          <Card.Img
            variant="top"
            src="https://i.imgur.com/L1kzkMq_d.jpg?maxwidth=520&shape=thumb&fidelity=high"
          />
          <Card.Body>
            <Card.Title>JuHao Chen</Card.Title>
            <Card.Text>
              As an aspiring software engineer, I love to
              code and solve challenging problems. I'm currently perfecting my
              skills and am training to become a software engineer to solve
              real-world problems. When I'm not coding, I enjoy drawing and
              listening to music.
            </Card.Text>
            <Card.Footer>
            <a href="https://github.com/JuHaoChen1997">
              <Card.Img
                alt="GitHub"
                title="GitHub"
                src={github}
                style={{ width: '100px' }}
              />
            </a>
            <a href="https://www.linkedin.com/in/juhao-chen-4aa1231a2/">
              <Card.Img
                alt="LinkedIn"
                title="LinkedIn"
                src={linkedIn}
                style={{ width: '100px' }}
              />
            </a>
            </Card.Footer>
          </Card.Body>
        </Card>
        <Card className='biocard' style={{ flex: 1 }}>
          <Card.Img
            variant="top"
            src="https://i.imgur.com/QlqZd24_d.jpg?maxwidth=520&shape=thumb&fidelity=high"
          />
          <Card.Body>
            <Card.Title>Pratima Roy</Card.Title>
            <Card.Text>
              God above all! I am a Software Engineer with a background in
              Computer Engineering Technology from The New York City College of
              Technology. When I'm not coding, I
              enjoy spending time with my family, playing games, and watching
              different series.
            </Card.Text>
            <Card.Footer>
            <a href="https://github.com/PratimaRoy">
              <Card.Img
                alt="GitHub"
                title="GitHub"
                src={github}
                style={{ width: '100px' }}
              />
            </a>
            <a href="https://www.linkedin.com/in/pratimaroy/">
              <Card.Img
                alt="LinkedIn"
                title="LinkedIn"
                src={linkedIn}
                style={{ width: '100px' }}
              />
            </a>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Row>

    </Container>
  );
}

export default About;
