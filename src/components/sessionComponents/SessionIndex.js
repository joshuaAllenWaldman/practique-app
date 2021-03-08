import { Link } from "react-router-dom";

const SessionIndex = (props) => {
  // function dateSort(a, b) {
  //   return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  // }
  console.log(props)
  const sessions = props.sessions.map((sesh, index) => {
    return (
      <div className="bg-white border-2 border-black m-2 p-4 max-w-sm hover:bg-red-400">
        <Link to={`/hobbies/${sesh.hobby}/session/${sesh._id}`}>
          <div className="flex flex-row justify-around w-64 h-16 items-center">
            <h1>
              Session {index + 1}: {sesh.nickName}{" "}
            </h1>
            <p>
            {sesh.createdAt}
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <>{sessions}</>;
};

export default SessionIndex;
