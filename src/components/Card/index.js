import React, { useState, useEffect } from 'react'
import BASE_URL from '../../services/api'

export default function Card(props) {
  const { id, state_id, state_description } = props.order
  let name = state_id === 1 || state_id === 2 ? props.states[state_id].description : ""
  const [buttonName, setButtonName] = useState(name)
  const [renderButton, setRenderButton] = useState(true)

  useEffect(() => {
    switch (state_id) {
      case 1:
        setButtonName(props.states[1].description)
        break
      case 2:
        setButtonName(props.states[2].description)
        break
      default:
        setRenderButton(false)
    }
  }, [])

  const handleToProgress = () => {
    const fetchStates = async () => {
      const url = `${BASE_URL}/${id}`;
      const resource = await fetch(url, { method: 'PATCH' });
      const json = await resource.json();
      const newStateId = json.order[0].state_id

      switch (newStateId) {
        case 1:
          setButtonName(props.states[1].description)
          break
        case 2:
          setButtonName(props.states[2].description)
          break
        default:
          setRenderButton(false)
      }
    };

    fetchStates();
  }

  return (
    <>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Order Control Number: {id}</h5>
          <p className="card-text">State: {state_description}</p>
          <div className="d-flex justify-content-end">
            {renderButton ?
              <input className="btn btn-primary" type="button" onClick={handleToProgress} value={buttonName} />
              :
              ""
            }
          </div>
        </div>
      </div>
    </>
  )
}
