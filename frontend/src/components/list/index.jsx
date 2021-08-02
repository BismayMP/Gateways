import React, { useState, useRef } from 'react'
import axios from 'axios'
import CardComponent from '../card'
import { Modal } from '@material-ui/core'
import GatewaysDetails from '../details'

const ListComponent = ({ gateways, setGateways }) => {
  const apiUrl = process.env.REACT_APP_API
  const [open, setOpen] = useState(false)
  const [detailedView, setDetailedView] = useState(null)
  const rootRef = useRef(null)

  const onDelete = (gateway) => {
    const list = gateways.filter((gtw) => gtw !== gateway)
    axios
      .delete(`${apiUrl}gateways/${gateway._id}`)
      .then((res) => {
        if (res.status === 200) setGateways(list)
      })
      .catch((error) => console.error(error))
  }

  const showDetails = (item) => {
    setDetailedView(item)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      {gateways.map((item, index) => (
        <div key={index}>
          <CardComponent
            gateway={item}
            onDelete={onDelete}
            showDetails={showDetails}
          />
        </div>
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        className="modal"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        container={() => rootRef.current}
      >
        <div className="bg-white modal-child-cont">
          <GatewaysDetails gateway={detailedView} onDelete={onDelete} />
        </div>
      </Modal>
    </div>
  )
}

export default ListComponent
