const SessionPreviewList = (props) => {
  // function dateSort(a, b) {
  //   return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  // }
  const sessions = props.sessions.map((sesh, index) => {
    if (index < 3){
      return (
        <div className="bg-white text-blue-400 border-2 border-black m-2 p-4 max-w-sm">
          <div className="flex flex-row justify-center w-64 h-16 items-center" >

            <h1>Session {index + 1}</h1>
          </div>
        </div>
      )
    }
  })

  
  return (
    <div className="text-center" >
      {sessions}
    </div>
  )
}

export default SessionPreviewList;