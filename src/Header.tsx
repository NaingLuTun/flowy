import appIcon from "./assets/flowy-icon.svg"
import lightModeIcon from "./assets/light-mode-icon.svg"
import darkModeIcon from "./assets/dark-mode-icon.svg"
import searchIcon from "./assets/search-icon.svg"
import currentLocationIcon from "./assets/current-location-icon.svg"
import { useState } from "react"
import SearchModal from "./SearchModal"

const Header = () => {
    const [isDarkmode, setIsDarkMode] = useState(false)
    const [searchActive, setSearchActive] = useState(false)
  return (
    <div className='p-4 border-b-[1px] border-solid border-black border-opacity-50 shadow-md flex justify-between headerContainer'>
        <div className='gap-3 items-center flex headerNameAndIcon'>
            <img src={appIcon} alt="flowy icon" className="w-[40px] md:w-[50px] hover:cursor-pointer appIcon" />
            <h1 className="text-xl font-semibold hover:cursor-pointer headerText">Flowy</h1>
        </div>
        <div className="gap-3 align-middle flex ">
            <img onClick={() => setSearchActive(true)} src={searchIcon} alt="search icon" className="w-[40px] md:w-[50px] bg-blue-400 rounded-full p-1 hover:cursor-pointer searchIcon"/>

            <img src={currentLocationIcon} alt="current location icon" className="w-[40px] md:w-[50px] bg-red-500 rounded-full hover:cursor-pointer currentLocationIcon" />

            <img onClick={() => setIsDarkMode(!isDarkmode)} src={isDarkmode? lightModeIcon : darkModeIcon} alt="theme icon" className="w-[40px] md:w-[50px] hover:cursor-pointer themeIcon"/>
        </div>

        {searchActive && <SearchModal setSearchActive={setSearchActive}/>}
    </div>
  )
}

export default Header