import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Https from '../servises/Https';
import MyAlert from "./MyAlert";

export default function CreateBookingComp(props) {
  const [show, setShow] = useState(false);
  const [Altdata, setAltdata] = useState([false, "", ""]);

  const initBookingData = {
    bookingId: "",
    bookedBy: props.CustomerData.customerName,
    loctionId: "",
    droneShotId: "",
    droneHandlerName: "",
    eventTime: "",
    createdTime: new Date()
  }

  const [BookingData, setBookigData] = useState(initBookingData);

  function handdlechange(e) {
    const { name, value } = e.target;
    setBookigData({
      ...BookingData,
      [name]: value
    })
  }
  const handleClose = () => {
    setShow(false);
    props.onHide()
    props.fun?.();
  }
  const submitForm = (e) => {
    e.preventDefault();
    if (BookingData.bookingId != "" && BookingData.loctionId != "" && BookingData.droneShotId != "") {
      BookingData.bookedBy = props.CustomerData.customerName;
      Https.createBooking(BookingData).then(async (res) => {
        if (res.status == 200) {
          handleClose()
          setAltdata([true, "Booking Created Successfully..!", "success"])
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
            Enter Booking Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                name="customerName"
                value={initBookingData.bookedBy}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Booking Id</Form.Label>
              <Form.Control
                name="bookingId"
                placeholder="Enter Booking Id"
                value={BookingData.bookingId}
                onChange={handdlechange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Location Id</Form.Label>
              <Form.Control
                name="loctionId"
                placeholder="Enter Location Id"
                value={BookingData.loctionId}
                onChange={handdlechange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Drone Shoot Id</Form.Label>
              <Form.Control
                name="droneShotId"
                placeholder="Enter Drone Shoot Id"
                value={BookingData.droneShotId}
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
            Book Shoot
          </Button>      </Modal.Footer>
      </Modal>
    </>
  );
}