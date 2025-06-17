import React, { useState } from 'react'
import { TfiWrite } from "react-icons/tfi";
import { SiTestcafe } from "react-icons/si";

type SwitcherPorps = {
  isChecked: boolean;
  setIsChecked : React.Dispatch<React.SetStateAction<boolean>>;
}
const Switcher11 = ({isChecked,setIsChecked} : SwitcherPorps) => {
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <>
      <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-purple-500/50 p-1 mt-8 text-white'>
        <input
          type='checkbox'
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            !isChecked ? 'text-primary bg-white text-black' : 'text-body-color'
          }`}
        >
          <TfiWrite className='mr-3'/>
          Practise Mode
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            isChecked ? 'text-primary bg-white text-black' : 'text-body-color'
          }`}
        >
          <SiTestcafe className='mr-3'/>
          Test Mode
        </span>
      </label>
    </>
  )
}

export default Switcher11
