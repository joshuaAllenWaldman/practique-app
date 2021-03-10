import React from "react";
import SessionPreviewList from "./SessionPreviewList";

class SessionPreview extends React.Component {
  constructor (props) {
    super(props)
    this.fetchSessionInfo = this.fetchSessionInfo.bind(this)
  }
  state = {
    sessions: [],
  };

  fetchSessionInfo() {
    const hobbyId = this.props.hobby._id;
    fetch(`http://localhost:4000/api/v1/hobbies/${hobbyId}/sessions`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((jsonData) => this.setState({ sessions: jsonData }));
  }
  componentDidMount () {
    this.fetchSessionInfo()
  }

  componentDidUpdate(prevProps) {
    if (this.props.hobby._id !== prevProps.hobby._id) {
      this.fetchSessionInfo()
    }
  }

  render() {
    return (
      <>
        <SessionPreviewList
          hobby={this.props.hobby}
          sessions={this.state.sessions}
          fetchSessionInfo={this.fetchSessionInfo}
        />
      </>
    );
  }
}

export default SessionPreview;
