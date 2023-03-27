import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Https from '../servises/Https';
import MyAlert from "./MyAlert";
export default function CreateCustomerComp(props) {

  const [show, setShow] = useState(false);
  const [Altdata, setAltdata] = useState([false, "", ""]);
  const initCustomerData = {
    customerName: "",
    email: "",
    phone: "",
    location: ""
  }

  const [CustomerData, setCustomerData] = useState(initCustomerData);

  function handdlechange(e) {
    const { name, value } = e.target;
    setCustomerData({
      ...CustomerData,
      [name]: value
    })
  }
  const handleClose = () => {
    setShow(false);
    props.onHide()
  }
  const submitForm = (e) => {
    e.preventDefault();
    if (CustomerData.customerName != "" && CustomerData.email != "" && CustomerData.phone != "" && CustomerData.location != "") {
      Https.createCustomer(CustomerData).then(async (res) => {
        if (res.status == 200) {
          handleClose()
          setAltdata([true, "Customer Created Successfully..!", "success"])
        }
        else {
          setAltdata([true, "Someting went wrong", "error"])
        }
      })
    }
    else {
      setAltdata([true, "Please Enter all details", "warning"])
    }
  }

  return (
    <>
      {Altdata[0] ? <MyAlert data={Altdata} /> : <></>}
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Enter Customer Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="customerName"
                placeholder="Enter Customer Name"
                autoFocus
                value={CustomerData.customerName}
                onChange={handdlechange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type='email'
                placeholder="name@example.com"
                value={CustomerData.email}
                onChange={handdlechange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phone"
                placeholder="Enter Phone Number"
                value={CustomerData.phone}
                onChange={handdlechange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Location</Form.Label>
              <Form.Control
                name="location"
                placeholder="Enter Location"
                value={CustomerData.location}
                onChange={handdlechange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitForm}>
            Create Now
          </Button>      </Modal.Footer>
      </Modal>
    </>
  );
}