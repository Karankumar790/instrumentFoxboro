import React from 'react'
import { Box } from '@mui/material'
import Header from '../Header'
import Footer from '../Footer/Footer'

 function PageContainer({ children, ...props }) {

   
  return (
    <Box display='flex' flexDirection='column' height='99.98vh'>
     {props?.showheader && <Header />}
        <Box sx={{ flex: 1, overflowY: 'auto' }} {...props} >
          {children}
        </Box>
      { props?.showfooter && <Footer /> }
    </Box>
  )
}

export default PageContainer
