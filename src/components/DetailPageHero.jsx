import React from 'react';
import '../App.css'; 
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DetailHero = () => {
  const backgroundImageStyle = {
    backgroundImage: `url('../src/assets/detailhero.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '40vh', 
    width: '100vw', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff', 
    textAlign: 'left',
  };
  const textContainerStyle = {
    marginLeft: '20px',
    marginRight: '20px',
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={6} style={backgroundImageStyle}>
          <div className='detailhero-container' style={textContainerStyle}>
            <h1 className='detailhero-titles'>Framtidens teknik hittar du här!</h1>
            <h2 className='detailhero-title'>
              Upplev vår senaste högteknologiska enheter med banbrytande funktioner och oöverträffad prestanda
            </h2>
            <Link to='/' >
            <button className='btn btn-primary detailhero-btn mt-3'>Shoppa nu</button>
            </Link>
          </div>
        </Col>
        <Col lg={6}></Col>
      </Row>
    </Container>
  );
}

export default DetailHero;
