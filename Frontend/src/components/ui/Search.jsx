import { Container, Card, Col, Row } from "react-bootstrap";
import "../../App.css";

function Search() {
  return (
    <section className="search-section">
      <Container fluid>
        <Row className="justify-content-start">
          <Col xs={12} md={10} lg={9}>
            <Card className="card search-card h-50 h-md-75 h-lg-100">
              <h2>Search Component</h2>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Search;
