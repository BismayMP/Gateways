import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import '../styles/home.scss'
import Layout from '../layout'
import ListComponent from '../components/list'
import { Fab, Modal } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import GatewayForm from '../components/forms/gateway'
import isIp from 'is-ip'

const HomePage = () => {
  const apiUrl = process.env.REACT_APP_API
  const [openModal, setOpenModal] = useState(false)
  const [gateways, setGateways] = useState([])
  const rootRef = useRef(null)

  useEffect(() => {
    axios
      .get(apiUrl + 'gateways')
      .then((res) => {
        setGateways(res.data)
      })
      .catch((error) => console.error(error))
  }, [apiUrl])

  const handleClose = () => {
    setOpenModal(false)
  }

  const handleAddGateway = (data) => {
    if (data.peripheral && data.peripheral.length > 10) {
      return alert('A gateway can have more than 10 devices')
    }
    if (!isIp.v4(data.ipv4)) {
      return alert('A gateway can have more than 10 devices')
    }
    if (gateways.find((item) => item.ipv4 === data.ipv4)) {
      return alert('A gateway with the same ipv4 already exist')
    }
    axios({
      method: 'POST',
      url: `${apiUrl}gateways/`,
      data,
    })
      .then((res) => {
        if (res.status === 200) {
          setGateways([...gateways, res.data])
          setOpenModal(false)
        }
      })
      .catch((error) => console.error(error))
  }

  return (
    <Layout>
      <div className="root">
        <h1> {gateways.length > 0 ? 'Gateways' : 'No gateways available'}</h1>
        <div>
          <ListComponent gateways={gateways} setGateways={setGateways} />
        </div>
      </div>
      <Fab
        color="primary"
        aria-label="add"
        variant="extended"
        className="add-btn"
        onClick={() => setOpenModal(true)}
      >
        <AddIcon /> Gateway
      </Fab>
      <Modal
        open={openModal}
        onClose={handleClose}
        className="modal"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        container={() => rootRef.current}
      >
        <div className="bg-white modal-child-cont">
          <GatewayForm onSubmitGateway={handleAddGateway} />
        </div>
      </Modal>
    </Layout>
  )
}

export default HomePage
