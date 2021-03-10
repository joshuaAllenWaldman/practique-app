import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import NewSessionFormHook from "../sessionForms/NewSessionFormHook";

function dateSort(a, b) {
  return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
}

const SessionPreviewList = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  let hasSessions = false;
  if (props.sessions.length > 0) {
    hasSessions = true;
  }

  const sortedSessions = props.sessions.sort(dateSort);
  const sessions = sortedSessions.map((sesh, index) => {
    if (index < 3) {
      return (
        <div
          key={sesh._id}
          className="bg-lightPink my-4 p-4 w-3/5 shadow-2xl hover:bg-lightBlue transform transition rounded hover:scale-110 overflow-hidden"
        >
          <Link to={`/hobbies/${sesh.hobby}/session/${sesh._id}`}>
            <div className="flex justify-center h-16 items-center">
              <h1 className="text-center text-darkBlue text-2xl">
                {sesh.nickName}
              </h1>
            </div>
          </Link>
        </div>
      );
    }
  });

  return (
    <>
      {hasSessions && (
        <>
          {sessions}
          <div className="bg-lightPink text-darkBlue px-8 py-2 hover:bg-lightBlue shadow-xl my-4 transform transition rounded hover:scale-110 overflow-hidden">
            <Link to={`/hobbies/${props.hobby._id}`}>View All Sessions</Link>
          </div>
        </>
      )}

      {!hasSessions && (
        <>
          <div className="bg-pumpkin my-4 p-4 w-2/5 shadow-2xl overflow-hidden rounded">
            <div className="flex justify-center h-16 items-center">
              <h1 className="text-center text-darkBlue text-2xl">
                No Sessions Logged Yet
              </h1>
            </div>
          </div>
          <div className="bg-lightPink cursor-pointer my-4 p-4 w-1/3 shadow-2xl hover:bg-lightBlue transform transition rounded hover:scale-110 overflow-hidden"
          onClick={() => setModalIsOpen(true)}
          >
            <div className="cursor-pointer flex justify-center h-8 items-center">
              <h1 className="text-center text-darkBlue text-2xl cursor-pointer">
                Add First Session!
              </h1>
            </div>
          </div>
        </>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            width: "600px",
            margin: "auto",
            background: "#f6d7c3",
            border: "none",
            overflow: "scroll",
            height: '80%',
            borderRadius: "25px"
          },
          overlay: {
            backgroundColor: "rgba(48, 82, 91, 0.75)",
          },
        }}
      >
        <div className="overflow-auto">
          <NewSessionFormHook
            hobby={props.hobby}
            onCreate={() => {
              setModalIsOpen(false)
              props.fetchSessionInfo()
              }}
            onCancel={() => setModalIsOpen(false)}
          />
        </div>
      </Modal>
    </>
  );
};

export default SessionPreviewList;
