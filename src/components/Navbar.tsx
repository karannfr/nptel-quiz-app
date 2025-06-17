import { NavLink } from "react-router-dom"
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";


const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <nav className="flex flex-row justify-between text-lg text-white  rounded-2xl p-4 pl-6 pr-6 items-center z-20 fixed w-9/10 left-7 lg:left-24 md:left-18 sm:left-15 2xl:left-28">
      <div className="dm-sans-bold text-2xl">Quizify</div>
      {!isNavOpen && <div className="sm:hidden" onClick={() => setIsNavOpen((prev) => !prev)}>
        <RxHamburgerMenu/>
      </div>}
      {
        isNavOpen &&
        <div className="{isNavOpen ? '' : hidden}" onClick={() => setIsNavOpen((prev) => !prev)}>
          <RxCross1/>
          <div className="fixed right-8 flex flex-col gap-4 items-end top-20">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </div>
        </div>
      }
      <div className="flex flex-row gap-4.5 dm=sans-semibold not-sm:hidden">
        <NavLink to="/"><div className="{({isAvtive}) => isActive ? bg-[#b19eef3f] text-[#b19eef]: ''} rounded cursor-pointer hover:bg-[#b19eef3f] hover:text-[#b19eef] pl-3 pr-3 pt-1 pb-1">Home</div></NavLink>
        <NavLink to="/contact"><div className="rounded cursor-pointer hover:bg-[#b19eef3f] hover:text-[#b19eef] pl-3 pr-3 pt-1 pb-1">Contact Us</div></NavLink>
        <NavLink to="/about"><div className="rounded cursor-pointer hover:bg-[#b19eef3f] hover:text-[#b19eef] pl-3 pr-3 pt-1 pb-1">About</div></NavLink>
      </div>
    </nav>
  )
}

export default Navbar