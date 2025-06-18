import { NavLink } from "react-router-dom"
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";


const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <nav className="flex flex-row justify-between items-center text-lg text-white max-w-6xl mx-auto sticky sm:top-8 z-[9999] px-8 rounded-4xl sm:border border-[#392e4e] sm:bg-black/50 shadow-lg ring-1 ring-black/5 backdrop-blur-sm py-4">
      <NavLink to='/'><div className="dm-sans-bold text-2xl cursor-pointer"><span className="text-purple-500">Quiz</span>telify</div></NavLink>
      {!isNavOpen && <div className="sm:hidden" onClick={() => setIsNavOpen((prev) => !prev)}>
        <RxHamburgerMenu/>
      </div>}
      {
        isNavOpen &&
        <div className="fixed right-0 flex flex-col gap-4 items-end top-20 bg-[#060010] sm:hidden z-[9999] w-screen h-screen pr-6 -mt-4" onClick={() => setIsNavOpen((prev) => !prev)}>
          <RxCross1 className="sm:hidden"/> {/* Moved RxCross1 inside the click handler div */}
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </div>
      }
      <div className="flex flex-row gap-4.5 dm-sans-semibold not-sm:hidden">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `rounded cursor-pointer pl-3 pr-3 pt-1 pb-1 ${isActive ? 'bg-[#b19eef3f] text-[#b19eef]' : 'hover:bg-[#b19eef] hover:text-black'}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `rounded cursor-pointer pl-3 pr-3 pt-1 pb-1 ${isActive ? 'bg-[#b19eef3f] text-[#b19eef]' : 'hover:bg-[#b19eef] hover:text-black'}`
          }
        >
          Contact Us
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `rounded cursor-pointer pl-3 pr-3 pt-1 pb-1 ${isActive ? 'bg-[#b19eef3f] text-[#b19eef]' : 'hover:bg-[#b19eef] hover:text-black'}`
          }
        >
          About
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
