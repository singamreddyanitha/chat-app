import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({message}) => {

  const {authUser} = useAuthContext();

  const {selectedConversation} = useConversation();

  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleColor = fromMe ? "bg-blue-500" : "";
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : ""; 

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={
              profilePic
            }
            alt="Tailwind CSS chat bubble component"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleColor} ${shakeClass} pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-white flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;




//STARTER CODE SNIPPET
// const Message = () => {

//   return (
//     <div className="chat chat-end">
//       <div className="chat-image avatar">
//         <div className="w-10 rounded-full">
//           <img
//             src={
//               "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
//             }
//             alt="Tailwind CSS chat bubble component"
//           />
//         </div>
//       </div>
//       <div className={`chat-bubble text-white bg-blue-500`}>
//         Hi! what is upp?
//       </div>
//       <div className="chat-footer opacity-50 text-white flex gap-1 items-center">
//         12:42
//       </div>
//     </div>
//   );
// };

// export default Message;
