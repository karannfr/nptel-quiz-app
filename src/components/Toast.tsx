import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface ToastProps {
  message: string | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const Toast: React.FC<ToastProps> = ({ message, setErrorMessage }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setErrorMessage(null), 300); 
    }, 4000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!message || !visible) return null;

  return (
     <div className="fixed top-6 right-6 py-4 px-6 flex items-center gap-4 rounded-md shadow-lg z-[9999] bg-purple-600 text-white transition-all duration-500 ease-out transform opacity-100">
      <span>{message}</span>
      <RxCross1
        className="cursor-pointer text-lg"
        onClick={() => {
          setVisible(false);
          setTimeout(() => setErrorMessage(null), 300);
        }}
      />
    </div>
  );
};

export default Toast;
