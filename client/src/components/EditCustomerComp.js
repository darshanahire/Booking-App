import React, { useState }from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Https from '../servises/Https';

export default function EditCustomerComp(props) {
    const [show, setShow] = useState(false);
    const [CustomerData,setCustomerData] = useState(props.CustomerData);
    const [Altdata, setAltdata] = useState([false,"",""]);

    function handdlechange(e){
      const {name ,value}=e.target;
      setCustomerData({
          ...CustomerData,
          [name]:value
      })
    }
    const handleClose = () => {
      setShow(false);
      props.onHide()
    }
    const submitForm =(e) => {
      e.preventDefault();
      if(CustomerData.customerName != "" && CustomerData.email != "" && CustomerData.phone != "" && CustomerData.location != ""){
        Https.updateCustomer(CustomerData).then(async(res)=>{
          if(res.status==200){
            handleClose()
            setAltdata([true,"Customer details updated Successfully..!","success"])
          }
          else{
            setAltdata([true,"Someting went wrong","error"])
          }
        })    
      }
      else{
        setAltdata([true,"Please Enter all details","warning"])
      }
    }
    const deleteDetails = ()=>{
      setAltdata([true,"Customer details updated Successfully..!","success"])
        Https.deleteCustomer(props.CustomerData).then(async(res)=>{
            if(res.status==200){
                handleClose()
              }
              else{
                setAltdata([true,"Someting went wrong","error"]) 
              }
        })
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Customer Details
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
            <Button variant="warning" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={submitForm}>
              Edit Details
            </Button>      
            <Button variant="danger" onClick={deleteDetails}>
                Delete Customer
            </Button>      
            </Modal.Footer>
      </Modal>
    );
  }