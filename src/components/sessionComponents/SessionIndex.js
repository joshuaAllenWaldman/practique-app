const SessionIndex = (props) => {
  // function dateSort(a, b) {
  //   return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  // }
  const sessions = props.sessions.map((sesh, index) => {
      return (
        <div className="card">
          <h1>Session {index + 1}: {sesh.nickName} </h1>
          <p>Notes: <span>{sesh.notes}</span> </p>
        </div>
      ) 
  })

  
  return (
    <div>
      {sessions}
    </div>
  )
}

export default SessionIndex;