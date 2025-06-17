import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

type SpringModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  score: number;
  length: number | undefined;
  id: string | undefined;
};

const SpringModal = ({ isOpen, setIsOpen, score, length, id }: SpringModalProps) => {
  const isPerfect = score === length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Your Score: {score}/{length}
              </h3>
              <p className="text-center mb-6">
                {isPerfect ? "🎉 Perfect Score! Congratulations!" : "Try again to get a perfect score!"}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded text-center"
                >
                  Review Quiz
                </button>
                  <Link
                    to={`/quiz/${Number(id) + 1}`}
                    onClick={() => setIsOpen(false)}
                    className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded text-center"
                  >
                    Next Quiz
                  </Link>
                <Link
                  to="/quiz"
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded text-center"
                >
                  Go Back
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;
