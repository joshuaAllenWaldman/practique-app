import { Link } from 'react-router-dom';

const SessionIndex = (props) => {
  // function dateSort(a, b) {
  //   return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  // }
  const sessions = props.sessions.map((sesh, index) => {
      return (
        <div className="card">
          <Link to={`/hobbies/${sesh.hobby}/session/${sesh._id}`} >
            <h1>Session {index + 1}: {sesh.nickName} </h1>
            <p>Notes: <span>{sesh.notes}</span> </p>
          </Link>
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