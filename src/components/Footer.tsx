import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto flex justify-between items-start flex-wrap p-8 text-white pt-16 pb-16 border-t border-t-purple-400/50 z-9999">
      <div className="flex flex-col gap-1 z-9999">
        <Link to='/'><div className="text-xl font-semibold"><span className="text-purple-500">Quiz</span>telify</div></Link>
        <div className="text-sm">
          Made with 💜 by {' '}
          <a
            href="https://github.com/karannfr"
            className="text-[#A744F5] hover:-scale-50 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            this guy
          </a>
        </div>
      </div>
      <div className="flex items-center gap-4 text-2xl mt-4 sm:mt-0 z-9999">
        <a
          href="https://github.com/karannfr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub className="hover:text-[#A744F5] transition-colors" />
        </a>
        <a
          href="https://www.linkedin.com/in/karan-dugar-680b81237/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="hover:text-[#A744F5] transition-colors" />
        </a>
        <a
          href="mailto:karandugar27@gmail.com"
          aria-label="Email"
        >
          <AiOutlineMail className="hover:text-[#A744F5] transition-colors" />
        </a>
        {/* <a
          href="https://www.instagram.com/karanxm__/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram className="hover:text-[#A744F5] transition-colors" />
        </a> */}
      </div>
    </div>
  );
};

export default Footer;
