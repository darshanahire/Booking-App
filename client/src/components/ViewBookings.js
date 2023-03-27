import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import SingleBookingComp from "./SingleBookingComp";
import CreateBookingComp from "./CreateBookingComp";

export default function ViewBookings(props) {
  const [show, setShow] = useState(false);
  const [AllBooking, setAllBooking] = useState(props.CustomerData.bookings);
  const [CreateBookingModel, setCreateBookingModel] = useState(false);

  const handleClose = () => {
    setShow(false);
    props.onHide()
  }
  return (
    <>
      {
        CreateBookingModel ? <CreateBookingComp
          show={CreateBookingModel}
          CustomerData={props.CustomerData}
          fun={handleClose}
          onHide={() => setCreateBookingModel(false)}
        /> : <></>
      }
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Booking Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {AllBooking.length ?
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Booking Id</th>
                  <th>Location Id</th>
                  <th>Drone Shoot Id</th>
                  <th>Created At</th>
                  <th>Edit Booking</th>
                  <th>Delete Booking</th>
                </tr>
              </thead>
              <tbody>
                {
                  AllBooking.map((val, j) => {
                    return <>
                      <SingleBookingComp fun={handleClose} par={props.CustomerData._id} id={val} i={j} />
                    </>
                  })}
              </tbody>
            </Table> :
            <>
              <h2>No Bookings avilable</h2>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setCreateBookingModel(true)}>
            Book New Shoot
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}