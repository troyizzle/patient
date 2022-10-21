import { ToastContainer } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { useToast } from "../../context/ToastContext";

export default function ToastComponent() {
  const { show, setShow, toast } = useToast();

  return (
    <Row>
      <Col xs={6}>
        <ToastContainer className="p-3" position="top-end">
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header className="bg-success">
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto"></strong>
            </Toast.Header>
            <Toast.Body>
            {toast}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
}
