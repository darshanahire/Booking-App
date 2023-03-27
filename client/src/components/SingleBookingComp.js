import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Https from '../servises/Https';
import EditBookingComp from "./EditBookingComp";
import MyAlert from "./MyAlert";


export default function SingleBookingComp(props) {

    const [currBooking, setcurrBooking] = useState({});
    const [EditBookingModel, setEditBookingModel] = useState(false);
    const [pageReload, setPagereload] = useState(false);
    const [Altdata, setAltdata] = useState([false, "", ""]);
    const Reload = () => {
        setPagereload(true);
    }

    const delBooking = () => {
        setAltdata([true, "Customer Deleted Successfully..!", "success"])
        Https.deleteBooking(props.par, props.id).then(async (res) => {
            props.fun()
        })
    }
    useEffect(() => {
        Https.readBooking(props.id).then(async (res) => {
            setcurrBooking(res.data);
            setPagereload(false)
        })
    }, [pageReload])

    return (
        <>
            {Altdata[0] ? <MyAlert data={Altdata} /> : <></>}
            {
                EditBookingModel ? <EditBookingComp
                    fun={Reload}
                    show={EditBookingModel}
                    BookingData={currBooking}
                    onHide={() => setEditBookingModel(false)}
                /> : <></>

            }
            <tr>
                <td>{props.i + 1}</td>
                <td>{currBooking.bookingId}</td>
                <td>{currBooking.loctionId}</td>
                <td>{currBooking.droneShotId}</td>
                <td>{currBooking.createdTime}</td>
                <td><Button variant="warning" onClick={() => {
                    setcurrBooking(currBooking);
                    setEditBookingModel(true);
                }}>Edit</Button></td>
                <td><Button variant="danger" onClick={() => {
                    delBooking()
                    setcurrBooking(currBooking);
                }}>Delete</Button></td>
            </tr>
        </>
    )
}