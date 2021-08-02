import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/home.scss'
import Layout from '../layout'
import ListComponent from '../components/list'

const HomePage = () => {
  const apiUrl = process.env.REACT_APP_API
  const [gateways, setGateways] = useState([])

  useEffect(() => {
    axios
      .get(apiUrl + 'gateways')
      .then((res) => {
        setGateways(res.data)
      })
      .catch((error) => console.error(error))
  }, [apiUrl])

  return (
    <Layout>
      <div className="root">
        <h1> {gateways.length > 0 ? 'Gateways' : 'No gateways available'}</h1>
        <div>
          <ListComponent gateways={gateways} setGateways={setGateways} />
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
