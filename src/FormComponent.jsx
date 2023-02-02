import { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Row, Col} from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import './FormComponent.scss';

// const path = require('path');

// use origin path
const ORIGIN = window.location.href;
const APIURL = ORIGIN + "texts";
const ID = "3";

console.log("This app is running on the Origin: "+ORIGIN);


export const FormComponent = () => {
  const [textArea1, set_textArea1] = useState();
  const [api_textArea1, set_api_textArea1] = useState();
  const [saved, setSaved] = useState(false);
  const saved_alert =
    <Alert key={'success'} variant={'success'} onClose={() => setSaved(false)} dismissible>
      Saved Text
    </Alert>


  const update_text_area1 = () => {
    // processing model side
    const asis = api_textArea1;
    const tobe = textArea1
    if (asis === tobe) {
      return 0
    }
    else{
      const now = Date.now();
      axios.patch(APIURL+'/'+ID, {text_string:textArea1, updated_at:now})
      .then((res)=>{
        set_api_textArea1(textArea1);
        setSaved(true)
      })
      .catch(error => {
        alert("Update Failed (check the error on console)")
        console.log(error);;
      })
    }
    // processing view side
    // no process

    
  }

  const delete_text_area1 = () => {
    set_textArea1("");
  };

  // http GET at first
  useEffect(() => {
    let api_data;
    axios.get(APIURL+'?id='+ID)
      .then((res)=>{
        console.log("check the res: ")
        console.log(res);
        api_data = res['data'];
        const json_data =
          process.env.REACT_APP_DEV_FLG === "0" ? api_data['text_string'] : api_data[0]['text_string']

        set_api_textArea1(json_data);
        set_textArea1(json_data);
      })
      .catch(error => {
        set_textArea1("Failure reading data from api. please check about the error on console.");
        console.log(error);
      })
      .finally(()=>{
      })
  }, []);

  return (
    <>
      {saved ? saved_alert : null}
      <Form id='main'>
        <Container >
          <Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Cache String</Form.Label>
              <Form.Control as="textarea" rows={10} onChange={(e)=>set_textArea1(e.target.value)} value={textArea1} />
            </Form.Group>
          </Row>
          <Row>
            <Col>
              <Button variant="primary" onClick={()=>delete_text_area1()}>
                Clear
              </Button>
            </Col>
            <Col>
              <Button variant="danger" onClick={()=>update_text_area1()}>
                Save
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  )
}