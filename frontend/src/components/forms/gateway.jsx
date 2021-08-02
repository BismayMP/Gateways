import React, { useState } from 'react'
import './index.scss'
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import DeviceForm from './device'
import DeviceComponent from '../device'

const GatewayForm = ({ onSubmitGateway }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [devices, setDevices] = useState([])

  const onSubmit = (data) => {
    if (devices.length) data.peripheral = devices
    onSubmitGateway(data)
  }

  const addDevice = (data) => {
    setDevices([...devices, data])
  }

  const handleRemoveDevice = (device) => {
    setDevices(devices.filter((item) => item !== device))
  }

  const handleChangeStatus = (device) => {
    setDevices(
      devices.map((item) => {
        if (item === device) {
          item.status = item.status === 'online' ? 'offline' : 'online'
        }
        return item
      }),
    )
  }

  return (
    <Grid container justifyContent={'center'} spacing={3}>
      {' '}
      <Grid item xs={12}>
        <Typography
          color="textPrimary"
          variant="h5"
          component="h3"
          align="center"
        >
          Add Gateway
        </Typography>
      </Grid>
      <Grid item md={devices.length ? 6 : 12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl component="fieldset" fullWidth>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  {...register('name', { required: true })}
                  variant="outlined"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="ipv4"
                  label="Ipv4"
                  {...register('ipv4', {
                    required: true,
                    pattern: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g,
                  })}
                  variant="outlined"
                  type="text"
                />
                {errors.ipv4 && (
                  <Typography color="secondary" variant="caption">
                    The ipv4 is not valid
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="outlined" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </form>
        {devices.length < 10 && (
          <Grid container item>
            <DeviceForm onSubmitDevice={addDevice} />
          </Grid>
        )}
      </Grid>
      <Grid container item md={6} spacing={1}>
        {devices.map((item, index) => (
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
    </Grid>
  )
}

export default GatewayForm
