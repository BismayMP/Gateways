import React, { useRef, useState } from 'react'
import './index.scss'
import {
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeviceComponent from '../device'
import axios from 'axios'
import DeviceForm from '../forms/device'

const CardComponent = ({ gateway, onDelete, showDetails }) => {
  const apiUrl = process.env.REACT_APP_API
  const [openModal, setOpenModal] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [item, setItem] = useState(gateway)
  const rootRef = useRef(null)

  const handleClose = () => {
    setOpenModal(false)
  }

  const handleShowDetails = () => {
    showDetails(item)
  }

  const handleSubmitDevice = (data) => {
    const peripheral = item.peripheral
    peripheral.push(data)
    axios({
      method: 'PUT',
      url: `${apiUrl}gateways/${item._id}`,
      data: {
        ...item,
        peripheral,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setItem(res.data)
          setOpenModal(false)
        }
      })
      .catch((error) => console.error(error))
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleDeleteGateway = () => {
    onDelete(gateway)
  }

  const handleChangeStatus = (device) => {
    const peripheral = item.peripheral.map((item) => {
      if (item === device) {
        item.status = device.status === 'online' ? 'offline' : 'online'
      }
      return item
    })
    axios({
      method: 'PUT',
      url: `${apiUrl}gateways/${item._id}`,
      data: {
        ...item,
        peripheral,
      },
    })
      .then((res) => {
        if (res.status === 200) setItem(res.data)
      })
      .catch((error) => console.error(error))
  }

  const handleRemoveDevice = (device) => {
    const peripheral = item.peripheral.filter((item) => item !== device)
    axios({
      method: 'PUT',
      url: `${apiUrl}gateways/${item._id}`,
      data: {
        ...item,
        peripheral,
      },
    })
      .then((res) => {
        if (res.status === 200) setItem(res.data)
      })
      .catch((error) => console.error(error))
  }

  const handleAddDevice = () => {
    setOpenModal(true)
  }

  return (
    <>
      <Card className="card-root">
        <CardContent>
          <Typography
            className="card-title"
            variant="h5"
            component="h2"
            color="textPrimary"
          >
            {item.name}
          </Typography>
          <Typography color="textSecondary" variant="body1" component="p">
            {item.ipv4 || 'No valid ipv4'}
          </Typography>
          <Typography color="textSecondary" variant="body1" component="p">
            Peripheral devices:{' '}
            {(item.peripheral && item.peripheral.length) || 0}
            {item.peripheral && item.peripheral.length ? (
              <IconButton
                className={`expand ${expanded ? 'expandOpen' : ''}`}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </Typography>
          {item.peripheral && (
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                {item.peripheral.map((device, index) => (
                  <div key={index}>
                    <Divider />
                    <DeviceComponent
                      device={device}
                      onDelete={handleRemoveDevice}
                      onStatusChange={handleChangeStatus}
                    />
                  </div>
                ))}
              </CardContent>
            </Collapse>
          )}
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                disableElevation
                onClick={handleShowDetails}
                size="small"
              >
                Go to details
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                disabled={item.peripheral && item.peripheral.length >= 10}
                disableElevation
                onClick={handleAddDevice}
                size="small"
              >
                Add device
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                disableElevation
                onClick={handleDeleteGateway}
                size="small"
              >
                Remove Gateway
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Modal
        open={openModal}
        onClose={handleClose}
        className="modal"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        container={() => rootRef.current}
      >
        <div className="bg-white modal-child-cont">
          <DeviceForm onSubmitDevice={handleSubmitDevice} />
        </div>
      </Modal>
    </>
  )
}

export default CardComponent
