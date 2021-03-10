
const GlobalStatBar = (props) => {

  let seshTimeCounter = 0
  props.sessions.map((sesh) => {
    seshTimeCounter += sesh.duration
  })


  return (
    <div className="w-screen bg-lightBlue h-24 min-h-full mt-2 flex justify-around" >
          <div className="totalHobbies">
            <h1>Total Hobbies</h1>
          </div>
          <div className="totalSessionsLogged">
            <h1>Total Sessions Logged</h1>
          </div>
          <div className="totalTimeLogged">
            <h1>Total Time Logged</h1>
            <p>{seshTimeCounter}</p>
          </div>
        </div>
  )
}

export default GlobalStatBar