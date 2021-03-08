import { Link } from 'react-router-dom';

const SessionPreviewList = (props) => {
  // function dateSort(a, b) {
  //   return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  // }
  const sessions = props.sessions.map((sesh, index) => {
    if (index < 3){
      return (
        <div className="bg-white border-2 border-black my-2 p-4 w-3/5 shadow-2xl hover:bg-red-400">
        <Link to={`/hobbies/${sesh.hobby}/session/${sesh._id}`} >
            <div className="flex justify-center h-16 items-center" >
              <h1 className="text-center text-2xl">Session {index + 1}</h1>
            </div>
        </Link>
          </div>
      )
    }
  })

  
  return (
    <>
      {sessions}
    </>
  )
}

export default SessionPreviewList;