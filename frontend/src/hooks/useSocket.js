// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { subscribe, unsubscribe } from "../services/socket";

// export const useSocket = () => {
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const dispatch = useDispatch();
//   return {
//     subscribe: () => {
//       if (!isSubscribed) {
//         subscribe(dispatch);
//         setIsSubscribed(true);
//       }
//     },
//     unsubscribe: () => {
//       unsubscribe();
//       setIsSubscribed(false);
//     }
//   }
// }