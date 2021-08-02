import React, { useState } from 'react'
import './index.scss'
import { Card, Grid, Typography, CardContent } from '@material-ui/core'
import DeviceComponent from '../device'
import axios from 'axios'

const GatewaysDetails = ({ gateway, onDelete }) => {
  const [item, setItem] = useState(gateway)
  const apiUrl = process.env.REACT_APP_API

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

  return (
    <Grid container justifyContent={'center'} alignItems={'center'} spacing={2}>
      <Grid item xs={12}>
        <Typography
          color="textPrimary"
          variant="h5"
          component="h3"
          align="center"
        >
          {item.name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          color="textPrimary"
          variant="h5"
          component="h3"
          align="center"
        >
          ipv4: {item.ipv4}
        </Typography>
      </Grid>
      {item.peripheral.map((item, index) => (
        <Grid item key={index}>
          <Card className="devices-detail">
            <CardContent>
              <DeviceComponent
                device={item}
                onDelete={handleRemoveDevice}
                onStatusChange={handleChangeStatus}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default GatewaysDetails
