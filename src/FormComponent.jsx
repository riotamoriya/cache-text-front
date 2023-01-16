import { Container, Row, Col} from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
import './FormComponent.scss';

import { useState, useEffect } from 'react';

import axios from 'axios';


const ORIGIN = window.location.href;
console.log("This app is running on the Origin: "+ORIGIN);

const api_url = ORIGIN + "text";
console.log("Connecting API-URL: "+api_url);

export const FormComponent = () => {
  const [textArea1, set_textArea1] = useState();
  const [api_textArea1, set_api_textArea1] = useState();

  const reset_textArea1 = (e) => {
    set_textArea1("");
  };
  const save_textArea1 = (e) => {
    // if textArea1 is not latest api value
    if (textArea1 !== api_textArea1) {
      const now = Date.now();
      axios.patch(api_url, {
        text:textArea1, updated:now
      }).then(()=>{
        // update internal for repeat requests
        set_api_textArea1(textArea1);
        console.log("saved at time :"+now+"\n which is a spent from '1/1/1970 00:00:00' ");
      });
    }
  }
  // http GET at first
  useEffect(() => {
    axios.get(api_url)
      .then((res)=>{
        set_api_textArea1(res.data['text']);
        set_textArea1(res.data['text']);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(()=>{
      })
  }, []);

  return (
    <>
      <Form id='main'>
        <Container >
          <Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Cache a String</Form.Label>
              <Form.Control as="textarea" rows={10} onChange={(e)=>set_textArea1(e.target.value)} value={textArea1} />
            </Form.Group>
          </Row>
          <Row>
            <Col>
              <Button variant="primary" onClick={(e)=>reset_textArea1(e)}>
                Clear
              </Button>
            </Col>
            <Col>
              <Button variant="danger" onClick={(e)=>save_textArea1(e)}>
                Save
              </Button>
            </Col>

          </Row>
        </Container>
      </Form>

    </>
  )
}