import React from 'react'
import axios from 'axios'
import CardComponent from '../card'

const ListComponent = ({ gateways, setGateways }) => {
  const apiUrl = process.env.REACT_APP_API

  const onDelete = (gateway) => {
    const list = gateways.filter((gtw) => gtw !== gateway)
    axios
      .delete(`${apiUrl}gateways/${gateway._id}`)
      .then((res) => {
        if (res.status === 200) setGateways(list)
      })
      .catch((error) => console.error(error))
  }

  return (
    <div>
      {gateways.map((item, index) => (
        <div key={index}>
          <CardComponent gateway={item} onDelete={onDelete} />
        </div>
      ))}
    </div>
  )
}

export default ListComponent
