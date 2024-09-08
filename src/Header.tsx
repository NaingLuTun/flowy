import appIcon from "./assets/flowy-icon.svg"
import lightModeIcon from "./assets/light-mode-icon.svg"
import darkModeIcon from "./assets/dark-mode-icon.svg"
import searchIcon from "./assets/search-icon.svg"
import currentLocationIcon from "./assets/current-location-icon.svg"
import { useState } from "react"
import SearchModal from "./SearchModal"

import {useMediaQuery} from "react-responsive"



const Header = () => {
    const [isDarkmode, setIsDarkMode] = useState(false)
    const [searchActive, setSearchActive] = useState(false)

    const isBigScreen = useMediaQuery({query: "(min-width: 1024px)"})
  return (
    <div className='p-2 border-b-[1px] border-solid border-black border-opacity-50 shadow-md flex justify-between fixed w-[100%] top-0 z-10 bg-white headerContainer'>
        <div className='gap-3 items-center flex headerNameAndIcon'>
            <img src={appIcon} alt="flowy icon" className="w-[30px] md:w-[40px] hover:cursor-pointer appIcon" />
            <h1 className="text-xl font-semibold hover:cursor-pointer headerText">Flowy</h1>
        </div>
        <div className="gap-3 align-middle flex ">
            <img onClick={() => setSearchActive(true)} src={searchIcon} alt="search icon" className="w-[30px] md:w-[40px] bg-blue-400 rounded-full p-1 hover:cursor-pointer searchIcon"/>

            <img src={currentLocationIcon} alt="current location icon" className="w-[30px] md:w-[40px] bg-[#b7a0e7] rounded-full hover:cursor-pointer currentLocationIcon" />

            <img onClick={() => setIsDarkMode(!isDarkmode)} src={isDarkmode? lightModeIcon : darkModeIcon} alt="theme icon" className="w-[30px] md:w-[40px] hover:cursor-pointer themeIcon"/>
        </div>

        {searchActive && <SearchModal setSearchActive={setSearchActive}/>}

    </div>
  )
}

export default Header