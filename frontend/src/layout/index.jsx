import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Container>{children}</Container>
    </>
  )
}

export default Layout
