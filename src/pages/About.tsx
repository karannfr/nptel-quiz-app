import { Carousel } from "../components/Carousel";

const About = () => {
  const slideData = [
    {
      title: "Upload & Convert",
      button: "Try PDF Upload",
      src: "https://quiztelify.vercel.app/image3.png",
    },
    {
      title: "Quiz from Library",
      button: "Browse Quizzes",
      src: "https://quiztelify.vercel.app/image3.png",
    },
    {
      title: "Practice or Test",
      button: "Choose a Mode",
      src: "https://quiztelify.vercel.app/image3.png",
    },
    {
      title: "Track Your Progress",
      button: "Coming Soon",
      src: "https://quiztelify.vercel.app/Opengraph.png",
    },
  ];
  return (

    <div className="relative overflow-hidden w-full h-full py-20 flex flex-col items-center">
      <Carousel slides={slideData} />
    </div>
  );
};

export default About

