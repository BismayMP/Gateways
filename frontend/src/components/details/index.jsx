import React from 'react'
import './index.scss'
import { Card, Grid, Typography, CardContent } from '@material-ui/core'
import DeviceComponent from '../device'

const GatewaysDetails = ({ gateway, onDelete, statusChange }) => {
  const handleChangeStatus = (device) => {
    statusChange(device)
  }

  const handleRemoveDevice = (device) => {
    onDelete(device)
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
          {gateway.name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          color="textPrimary"
          variant="h5"
          component="h3"
          align="center"
        >
          ipv4: {gateway.ipv4}
        </Typography>
      </Grid>
      {gateway.peripheral &&
        gateway.peripheral.map((item, index) => (
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
