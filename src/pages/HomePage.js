import React from 'react'

import HobbyIndex from '../components/hobbyComponents/HobbyIndex'

class HomePage extends React.Component {
  render () {
  return (
    <div>
      <h1>Welcome Home ya bish</h1>
      <div className="hobbyIndex">
        <HobbyIndex />
      </div>


    </div>
  )
  }
}

export default HomePage;