import React, { useState, useEffect } from 'react'
import BASE_URL from '../../services/api'
import Card from '../Card';

export default function Seach() {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [controlNumber, setControlNumber] = useState("");
  const [state, setState] = useState(0);
  const [states, setStates] = useState([]);
  const [message, setMessage] = useState("No orders found.")

  const handleControlNumber = (e) => {
    setControlNumber(e.target.value)
  }

  useEffect(() => {
    const fetchStates = async () => {
      const url = `${BASE_URL}/states/`;
      const resource = await fetch(url, { method: 'GET' });
      const json = await resource.json();
      setStates(json.states)
    };

    fetchStates();
  }, [])

  useEffect(() => {
    const verifyControlNumber = controlNumber ? controlNumber : 0

    const fetchOrders = async () => {
      const url = `${BASE_URL}/${verifyControlNumber}?state_id=${state}`;
      const resource = await fetch(url, { method: 'GET' });
      const json = await resource.json();
      setFilteredOrders(json.orders)
    };

    fetchOrders();
  }, [controlNumber, state])

  useEffect(() => {
    if (filteredOrders === 0) {
      setMessage("No orders found.")
    }
  }, [filteredOrders])

  const handleState = (e) => {
    setState(e.target.value)
  }

  const handleCreate = () => {
    const fetchOrders = async () => {
      const url = `${BASE_URL}`;
      const resource = await fetch(url, { method: 'POST' });
      const json = await resource.json();
      setFilteredOrders([])
      setMessage(`Order whith control number ${json.order.id} created.`)
    };

    fetchOrders();
  }

  return (
    <>
      <div className="row">
        <div className="col-12 d-flex justify-content-end my-3">
          <input type="button" onClick={handleCreate} className="btn btn-secondary" value="Create New Order" />
        </div>
        <div className="col-12 col-md-7">
          <input id="control-number" type="number" className="form-control" value={controlNumber} onChange={handleControlNumber} placeholder="Control Number" />
        </div>
        <div className="col-12 col-md-5 mt-2 mt-md-0">
          <select id="state" className="form-control" value={state} onChange={handleState}>
            <option key={0} value={0}>Select a state</option>)
          {
              states.map(({ id, description }) => {
                return (<option key={id} value={id}>{description}</option>)
              })
            }
          </select>
        </div>
      </div>

      <div className="row">
        {filteredOrders.length > 0 ?
          filteredOrders.map(order => {
            return (
              <div key={order.id} className="col-6 my-2">
                <Card order={order} states={states} />
              </div>
            )
          })
          :
          <div className="col-12 mt-5">
            <p className="border rounded p-3">{message}</p>
          </div>
        }
      </div>


    </>
  )
}
