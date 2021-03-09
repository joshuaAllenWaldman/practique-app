import React from "react";

const HobbyIndex = (props) => {
  const hobbyCards = props.hobbies.map((hob, index) => {
    return (
      <div
        key={hob._id}
        className="bg-lightPink shadow-2xl border-2 border-darkBlue h-24 my-4 p-4 max-w-sm hover:bg-lightBlue w-3/4 flex justify-center justify-items-center transform transition rounded hover:scale-110 overflow-hidden"
        onClick={() => {
          props.updateCurrentHobby(hob);
        }}
        onDoubleClick={() => props.history.push(`/hobbies/${hob._id}`)}
      >
        <div className="text-center flex justify-center">
          <div className="flex flex-nonwrap justify-center items-center">
            <h1 className="text-2xl text-darkBlue text-center"> {hob.name}</h1>
          </div>
        </div>
      </div>
    );
  });
  return <>{hobbyCards}</>;
};

export default HobbyIndex;
