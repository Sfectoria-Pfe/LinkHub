import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaPrint } from 'react-icons/fa';

function Footer() {
  return (
    <footer className='text-center text-white bg-light text-lg-start' // Ajout de la classe text-white pour définir la couleur du texte en blanc
      style={{
        background: "#0575E6",  /* fallback for old browsers */
        background: "-webkit-linear-gradient(to right, #021B79, #0575E6)",  /* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient(to right, #021B79, #0575E6)", 

      }}
    >
      <section className='p-4 d-flex justify-content-center justify-content-lg-between border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='/' className='me-4 text-reset'>
            <FaFacebookF />
          </a>
          <a href='/' className='me-4 text-reset'>
            <FaTwitter />
          </a>
          <a href='/' className='me-4 text-reset'>
            <FaGoogle />
          </a>
          <a href='/' className='me-4 text-reset'>
            <FaInstagram />
          </a>
          <a href='/' className='me-4 text-reset'>
            <FaLinkedin />
          </a>
          <a href='/' className='me-4 text-reset'>
            <FaGithub />
          </a>
        </div>
      </section>

      <section className=''>
        <Container className='mt-5 text-center text-md-start'>
          <Row className='mt-3'>
            <Col md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='mb-4 text-uppercase fw-bold'>
                <FaGithub className="me-3" />
                Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit.
              </p>
            </Col>

            <Col md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='mb-4 text-uppercase fw-bold'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Angular
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Vue
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Laravel
                </a>
              </p>
            </Col>

            <Col md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='mb-4 text-uppercase fw-bold'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </Col>

            <Col md="4" lg="3" xl="3" className='mx-auto mb-4 mb-md-0'>
              <h6 className='mb-4 text-uppercase fw-bold'>Contact</h6>
              <p>
                <FaGithub className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <FaEnvelope className="me-3" />
                info@example.com
              </p>
              <p>
                <FaPhone className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <FaPrint className="me-3" /> + 01 234 567 89
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div className='p-4 text-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
