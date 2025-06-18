const About = () => {
  return (
    <div className="w-full max-w-6xl text-white flex flex-col gap-12 xl:mx-auto lg:mx-24 md:mx-16 mx-8 my-16">
      <h1 className="text-3xl font-bold text-center">About</h1>
      {/* About the Website */}
      
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-purple-500">About the Website</h2>
        <p className="text-sm md:text-base lg:text-lg text-purple-100">
          This website is designed to make NPTEL quizzes more interactive and accessible. You can start by selecting from two main options on the home page:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base lg:text-lg text-purple-100 pl-4">
          <li><strong>Upload a PDF</strong> – Upload your own NPTEL course quiz PDF to auto-generate a quiz from its contents.</li>
          <li><strong>Choose from Preloaded Quizzes</strong> – Select one of the available courses and proceed to quiz selection.</li>
        </ul>
        <p className="text-sm md:text-base lg:text-lg text-purple-100">
          Once a course is chosen, you can select a specific week and start the quiz in one of two modes:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base lg:text-lg text-purple-100 pl-4">
          <li><strong>Practice Mode</strong> – Answers are revealed immediately upon selection to help with learning.</li>
          <li><strong>Test Mode</strong> – Select all answers first, then submit to view your score at the end.</li>
        </ul>
        <p className="text-sm md:text-base lg:text-lg text-purple-100">
          The platform is designed to be lightweight, easy to use, and completely free for all learners.
        </p>
      </div>

      {/* About the Creator */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-purple-500">About the Creator</h2>
        <p className="text-sm md:text-base lg:text-lg text-purple-100">
          [Coming soon...]
        </p>
      </div>
    </div>
  );
};

export default About