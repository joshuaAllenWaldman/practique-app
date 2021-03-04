import React from 'react';
import SessionPreviewList from './SessionPreviewList'

class SessionPreview extends React.Component  {
  state ={
    sessions: [],
    hobby: {}
  }

  componentDidUpdate (prevProps) {
    if (this.props.hobby !== prevProps.hobby){
      const hobbyId = this.props.hobby._id
      this.setState({hobby: this.props.hobby}, () => {
        fetch(`http://localhost:4000/api/v1/hobbies/${hobbyId}/sessions`, {
        credentials: 'include'
        })
          .then((res) => res.json())
          .then((jsonData) => this.setState({sessions: jsonData}))
      })     
    } 
  }
  

  render () {
    return (
      <div>
        <h4>Latest Sessions:</h4>
        <SessionPreviewList sessions={this.state.sessions} />
      </div>
    )
  }
}


export default SessionPreview;