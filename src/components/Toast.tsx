import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { RxCross1 } from "react-icons/rx";

interface ToastProps {
  message: string | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}
const Toast: React.FC<ToastProps> = ({ message,setErrorMessage }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast"
           transition={{  
              type: "tween",  
              duration: 0.5  
            }}  
            variants={{  
              initialState: {  
                opacity: 0  
              },  
              animateState: {  
                opacity: 1  
              },  
              exitState: {  
                opacity: 0  
              }  
            }}  
          initial="initial"
          animate="enter"
          exit="exit"
          className="fixed top-20 right-4 bg-white text-purple-800 px-8 py-4 rounded z-50 text-lg w-1/5 flex flex-row justify-between items-center"
        >
          <div>{message}</div>
          <div className="cursor-pointer" onClick={()=>{setErrorMessage(null)}}><RxCross1/></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
