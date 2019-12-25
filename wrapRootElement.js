import React from "react"
import MainLayout from'./src/components/layouts/main/main'

/**
 * Component to be used by the Gatsby api to wrap project root element
 * this component will be exported to be used in 'gatsby-browser.js' 
 * and 'gatsby-ssr.js' files 
 */
const wrapRootElement = ({ element, props }) => {
  return (
    <MainLayout {...props}>{element}</MainLayout>
  )
}


export default wrapRootElement