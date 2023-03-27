import React, { useState,useEffect }from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Https from '../servises/Https';
import CreateCustomerComp from "./CreateCustomerComp";
import CreateBookingComp from "./CreateBookingComp";
import ViewBookings from "./ViewBookings";
import EditCustomerComp from "./EditCustomerComp";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ExploreIcon from '@mui/icons-material/Explore';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Home() {
  const [CreateCustomerModel, setCreateCustomerModel] = useState(false);
  const [EditCustomerModel, setEditCustomerModel] = useState(false);
  const [CreateBookingModel, setCreateBookingModel] = useState(false);
  const [viewBookingModel, setViewBookingModel] = useState(false);
  
  const [customers, setCustomers] = useState([]);
  const [currCustomer, setCurrCustomer] = useState({});


  useEffect(() => {
    Https.getCustomers().then((res) => {
      setCustomers(res.data);      
    })
}, [CreateCustomerModel,EditCustomerModel,CreateBookingModel,viewBookingModel])

  return (
    <>
      <div className='mainContainer'>
        <Button className='m-3' variant="primary" onClick={() => setCreateCustomerModel(true)}>
          <AddIcon/>
          <span>Create New Customer</span>
        </Button>
        {
          CreateCustomerModel ? <CreateCustomerComp
          show={CreateCustomerModel}
          onHide={() => setCreateCustomerModel(false)}
        /> : <></>
        }
        {
          EditCustomerModel ? <EditCustomerComp
          show={EditCustomerModel}
          CustomerData={currCustomer}
          onHide={() => setEditCustomerModel(false)}
        /> : <></>
        }
        {
          CreateBookingModel ? <CreateBookingComp
          show={CreateBookingModel}
          CustomerData={currCustomer}
          onHide={() => setCreateBookingModel(false)}
        /> : <></>
        }

        {
          viewBookingModel ? <ViewBookings
          show={viewBookingModel}
          CustomerData={currCustomer}
          onHide={() => setViewBookingModel(false)}
        /> : <></>
        }

        <div className='cardsParent'>
          <h2 className='mb-5'>Customers Details</h2>
        {
          customers.length ?   <>
        <Table bordered  className='mainTable'>
        <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>location</th>
              <th>Book Shoot</th>
              <th>Bookings</th>
              <th>Edit Details</th>
            </tr>
          </thead>
       <tbody> {customers.map((val,i)=>{
            return <>
              <tr id={val._id}>
                <td>{i+1}</td>
                <td>{val.customerName}</td>
                <td>{val.email}</td>
                <td>{val.phone}</td>
                <td>{val.location}</td>
                <td className='btns'><Button variant="primary" onClick={()=>{
                  setCreateBookingModel(true);
                  setCurrCustomer(val);
                  }}> Book Shoot <ExploreIcon fontSize='small'/></Button></td>
                <td className='btns'><Button variant="success" onClick={()=>{
                  setViewBookingModel(true);
                  setCurrCustomer(val);
                }}>View <VisibilityIcon fontSize='small'/></Button></td>
                <td className='btns'><Button variant="warning" onClick={()=>{
                  setEditCustomerModel(true);
                  setCurrCustomer(val);
                }}> Edit Details  <EditIcon fontSize='small'/></Button></td>
              </tr>
            </>
          })
          }
            </tbody>
            </Table>
          </>
          :
          <>
          <h2>
            No Customers to display
          </h2>
          </>
}
        </div>
      </div>
    </>
  )
}
