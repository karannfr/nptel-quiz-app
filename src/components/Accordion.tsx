import FAQ from "./FAQ";

const faqList = [
  {
    question: "What is the purpose of the NPTEL Quiz website?",
    answer:
      "The website allows students to access, attempt, and review quizzes from various NPTEL courses in an interactive format.",
  },
  {
    question: "Are the quizzes official NPTEL content?",
    answer:
      "Yes, the questions are sourced directly from NPTEL courses but reformatted for better accessibility and engagement.",
  },
  {
    question: "Can I track my progress on different quizzes?",
    answer:
      "Currently, progress tracking is local to your session. We are working on persistent user profiles in upcoming updates.",
  },
  {
    question: "Is the website free to use?",
    answer:
      "Absolutely! This platform is completely free and open to all learners.",
  },
  {
    question: "Are there solutions or explanations provided?",
    answer:
      "Yes, after submitting a quiz, you will receive correct answers along with brief explanations for better understanding.",
  },
  {
    question: "How often are new quizzes added?",
    answer:
      "We update the quiz bank weekly with new courses and questions as they become available from NPTEL.",
  },
];

const Accordion = () => {
  return (
    <div className="z-9999 text-white w-full max-w-6xl flex flex-col gap-8 xl:mx-auto lg:mx-24 md:mx-16 mx-8 items-center my-32">
      <h1 className="font-bold text-3xl text-center">Frequently Asked Questions</h1>
      {faqList.map((faq, index) => (
        <FAQ key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default Accordion;
