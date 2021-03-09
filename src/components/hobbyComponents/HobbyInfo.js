import moment from "moment";
const HobbyInfo = (props) => {
  let durationSum = 0;
  props.sessions.forEach((sesh) => {
    durationSum += sesh.duration;
  });
  console.log(props.hobby);
  const startDate = moment(props.hobby.createdAt).format("dddd, MMMM do YYYY");
  const skillLevel = props.hobby.skillLevel;

  const longTermGoals = props.hobby.longTermGoals.map((goal) => {
    return <li>{goal}</li>
  })

  return (
    <div className="capitalize text-darkBlue text-xl flex flex-col justify-center items-center m-2 border-pumpkin">
      <p className="m-4">Date Started: {startDate}</p>
      <p className="m-4">Starting Skill Level: {skillLevel} </p>
      <div className="">
        <p className="m-4 underline">Long Term Goals:</p>
        <ul>
          {longTermGoals}
        </ul>
      </div>
      <p className="m-4">Number of sessions: {props.sessions.length}</p>
      <p className="m-4">
        Total Practice Time: <strong>{durationSum} Minutes</strong>
      </p>
    </div>
  );
};

export default HobbyInfo;
