import React from 'react'
import './index.scss'
import { Button, Chip, IconButton, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const DeviceComponent = ({ device, onStatusChange, onDelete }) => {
  const formatDate = (str) => {
    const date = new Date(str)
    return date.toDateString()
  }
  const handleChangeStatus = () => {
    onStatusChange(device)
  }

  const handleRemoveDevice = () => {
    onDelete(device)
  }

  return (
    <div className="device">
      {device.uid !== undefined && (
        <Typography color="textSecondary" variant="body1" component="p">
          UID: {device.uid}
        </Typography>
      )}
      <Typography color="textSecondary" variant="body1" component="p">
        name: {device.vendor}
      </Typography>
      <Typography color="textSecondary" variant="body1" component="p">
        Created at: {formatDate(device.date)}
      </Typography>
      <div>
        {device.status && (
          <Chip
            label={device.status}
            color={device.status === 'online' ? 'primary' : 'secondary'}
          />
        )}
      </div>
      <div className="device-btns">
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={handleChangeStatus}
          size="small"
        >
          Change status
        </Button>
        <IconButton
          className="remove-device-btn"
          onClick={handleRemoveDevice}
          size="small"
          aria-label="delete"
        >
          <DeleteIcon fontSize="small" color="secondary" />
        </IconButton>
      </div>
    </div>
  )
}

export default DeviceComponent
