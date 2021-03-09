import { Link } from "react-router-dom";
import moment from 'moment'

const SessionIndex = (props) => {
  let hasSessions = false;
  if (props.sessions.length > 0) {
    hasSessions = true;
  }

  function dateSort(a, b) {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  }
  const sortedSesh = props.sessions.sort(dateSort)
  const sessions = sortedSesh.map((sesh, index) => {
  const seshDate = moment(sesh.createdAt).calendar()
    return (
      <div className="bg-lightPink my-2 p-4 w-3/5 shadow-2xl hover:bg-lightBlue transform transition rounded hover:scale-110 overflow-hidden">
        <Link to={`/hobbies/${sesh.hobby}/session/${sesh._id}`}>
          <div className="flex flex-row justify-between items-center text-darkBlue">
            <h1>
              {sesh.nickName}
            </h1>
            <p>
            { seshDate }
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return ( 
    <>
    {hasSessions && (<> {sessions} </>)}

    {!hasSessions && (
        <>
          <div className="bg-lightPink my-4 p-4 w-1/3 shadow-2xl hover:bg-lightBlue transform transition rounded hover:scale-110 overflow-hidden"
          onClick={() => props.openNewSessionModal()}
          >
            <div className="flex justify-center h-8 items-center">
              <h1 className="text-center text-darkBlue text-2xl">
                Add First Session!
              </h1>
            </div>
          </div>
        </>
      )}

    </>
  )
};

export default SessionIndex;
