import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core'

const DeviceForm = ({ onSubmitDevice }) => {
  const { register, handleSubmit, control } = useForm()

  const onSubmit = (data) => {
    onSubmitDevice(data)
  }

  return (
    <Grid container justifyContent={'center'} alignItems={'center'} spacing={3}>
      {' '}
      <Grid item xs={12}>
        <Typography
          color="textPrimary"
          variant="h5"
          component="h3"
          align="center"
        >
          Add Device
        </Typography>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl component="fieldset" fullWidth>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="uid"
                  label="UID"
                  {...register('uid', { required: true })}
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="vendor"
                  label="Vendor"
                  {...register('vendor', { required: true })}
                  variant="outlined"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend">Status</FormLabel>
                <Controller
                  name="status"
                  control={control}
                  defaultValue="online"
                  render={({ field }) => (
                    <RadioGroup aria-label="gender" name="status" {...field}>
                      <div>
                        <FormControlLabel
                          value="online"
                          control={<Radio />}
                          label="online"
                        />
                        <FormControlLabel
                          value="offline"
                          control={<Radio />}
                          label="offline"
                        />
                      </div>
                    </RadioGroup>
                  )}
                />
              </Grid>
              <Grid container item xs={12} spacing={2}>
                <Button type="submit" variant="outlined" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}

export default DeviceForm
