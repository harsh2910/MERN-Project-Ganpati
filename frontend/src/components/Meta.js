import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Welcome To Ganpati',
    description: 'Ganpati is a platform for buying authentic sarees',
    keywords: 'sarees, silk, banarasi, handloom'
}

export default Meta