import FAQ from "./FAQ";

const faqList = [
  {
    question: "How can I practice quizzes for NPTEL courses?",
    answer:
      "You can upload NPTEL course PDFs or choose from a selection of weekly quizzes. Both practice and test modes are available."
  },
  {
    question: "Are the quizzes based on real NPTEL course content?",
    answer:
      "Yes, the quizzes are generated from official NPTEL course material and reformatted for easier practice."
  },
  {
    question: "Can I upload my own NPTEL PDFs to generate quizzes?",
    answer:
      "Yes, uploading your own course PDFs allows the platform to parse and generate interactive quizzes from them."
  },
  {
    question: "Is my quiz progress saved?",
    answer:
      "Progress is stored locally during your session. Support for user accounts and saved history is planned in future updates."
  },
  {
    question: "Are answers or explanations shown after submitting a quiz?",
    answer:
      "No, the platform only reveals whether your selected answers are correct. Detailed solutions are not currently provided."
  },
  {
    question: "How often are quizzes updated?",
    answer:
      "New quizzes and course material are added regularly, typically every week, based on the latest NPTEL content."
  }
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
