import appIcon from "./assets/flowy-icon.svg"
import appIconDarkTheme from "./assets/flowy-darkTheme-icon.svg"

import lightModeIcon from "./assets/light-mode-icon.svg"
import darkModeIcon from "./assets/dark-mode-icon.svg"
import searchIcon from "./assets/search-icon.svg"
import currentLocationIcon from "./assets/current-location-icon.svg"
import { useContext, useState } from "react"
import SearchModal from "./SearchModal"

import {useMediaQuery} from "react-responsive"

import { ApiContext } from "./ApiContextProvider"



const Header = () => {
    const [searchActive, setSearchActive] = useState(false)

    const [searchValue, setSearchValue] = useState("")

    const isBigScreen = useMediaQuery({query: "(min-width: 1024px)"})

    const apiInfo = {
      key: "9e9ed19497a29a4a4f52c70796e6167d",
      base: "https://api.openweathermap.org/data/2.5/"
    }

    const apiContext = useContext(ApiContext)

    if(!apiContext) {
      throw new Error("useContext must be used within a ApiContextProvider")
    }

    const {setMainApiValue, setForecastApiValue, setAirPollutionApiValue, darkTheme, setDarkTheme} = apiContext

    const todayDate = new Date()

    let monthToFilterFromForecastApi:string
    let dateToFilter:string

    const getMonthTofilterFromForecastApi = () => {
        if(JSON.stringify(todayDate.getMonth()).length === 1) {
            monthToFilterFromForecastApi = "0" + (todayDate.getMonth()+1)
            dateToFilter = `${JSON.stringify(todayDate.getFullYear())}-${monthToFilterFromForecastApi}-${JSON.stringify(todayDate.getDate())}`
        } else {
            monthToFilterFromForecastApi = JSON.stringify(todayDate.getMonth())
            dateToFilter = `${JSON.stringify(todayDate.getFullYear())}-${monthToFilterFromForecastApi}-${JSON.stringify(todayDate.getDate())}`
            
        }
    }

    const fetchMainApiAndAirPollutionApi = (searchValue: string) => {
      fetch(`${apiInfo.base}weather?q=${searchValue}&units=metric&APPID=${apiInfo.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setMainApiValue(result)
        const {lat, lon} = result.coord

        
        /* Air pollution api */
        fetch(`${apiInfo.base}air_pollution?lat=${lat}&lon=${lon}&APPID=${apiInfo.key}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result)
          setAirPollutionApiValue(result)
        })
      })
    }


    const fetchFiveDaysForecastApi = (searchValue: string) => {
      fetch(`${apiInfo.base}forecast?q=${searchValue}&units=metric&APPID=${apiInfo.key}`)
      .then((res) => res.json())
      .then((result) => {
        getMonthTofilterFromForecastApi()
        const getApiList = result.list

        
        const filteredTodayDateList = getApiList.filter((date:any) => !date.dt_txt.includes(dateToFilter))
        const filteredMidddayList = filteredTodayDateList.filter((midday:any) => midday.dt_txt.includes("15:00:00"))
        const lastItemFromFilteredTodayDateList = filteredTodayDateList[filteredTodayDateList.length - 1]

        const finalfilteredApiList = filteredMidddayList.concat(lastItemFromFilteredTodayDateList)
        
        
        console.log(getApiList)
        console.log(filteredTodayDateList)
        console.log(filteredMidddayList)
        console.log(finalfilteredApiList)

        setForecastApiValue(finalfilteredApiList)
      })
    }

    const handleSearch = (searchValue: string) => {
      fetchMainApiAndAirPollutionApi(searchValue)
      fetchFiveDaysForecastApi(searchValue)
    }

  return (
    <div className={`p-2 pl-4 pr-4 border-b-[1px] border-solid border-black border-opacity-50 shadow-lg flex justify-between fixed w-[100%] top-0 z-10 ${darkTheme? "bg-[#171717]" : "bg-white"} headerContainer`}>
        <div className='gap-3 items-center flex headerNameAndIcon'>
            <img src={`${darkTheme? appIconDarkTheme : appIcon}`} alt="flowy icon" className="w-[30px] md:w-[40px] hover:cursor-pointer appIcon" />
            <h1 className={`text-xl font-semibold hover:cursor-pointer headerText ${darkTheme? "text-white" : "text-black"}`}>Flowy</h1>
        </div>
        

            {isBigScreen? 
            
            <div className="gap-3  align-middle flex">

              <div className="relative searchBarContainer">
                <input type="text" className={`${darkTheme? "bg-slate-300 text-white" : "bg-slate-200"} p-2 pl-3 pr-[40px] w-[200px] rounded-full focus:outline-none`} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search location... "/>
                <img onClick={() => handleSearch(searchValue)} src={searchIcon} alt="search icon" className="w-[25px] md:w-[35px] absolute right-[2px] top-[2px] bg-blue-400 rounded-full p-1 hover:cursor-pointer searchIcon"/>
              </div>

              <div className="p-2 pl-3 font-medium text-white relative flex w-[200px] bg-[#cebdf3] rounded-full hover:cursor-pointer currentLocationContainer">
                <p>Current location</p>
                <img src={currentLocationIcon} alt="current location icon" className="w-[25px] md:w-[35px] absolute right-[2px] top-[2px] bg-[#b7a0e7] rounded-full hover:cursor-pointer currentLocationIcon" />
              </div>

              <img onClick={() => setDarkTheme(!darkTheme)} src={darkTheme? lightModeIcon : darkModeIcon} alt="theme icon" className="w-[25px] md:w-[35px] hover:cursor-pointer themeIcon"/>

            </div>
            
            : 
            
            <div className="gap-3 align-middle flex ">
            <img onClick={() => setSearchActive(true)} src={searchIcon} alt="search icon" className="w-[30px] md:w-[40px] bg-blue-400 rounded-full p-1 hover:cursor-pointer searchIcon"/>

            <img src={currentLocationIcon} alt="current location icon" className="w-[30px] md:w-[40px] bg-[#b7a0e7] rounded-full hover:cursor-pointer currentLocationIcon" />

            <img onClick={() => setDarkTheme(!darkTheme)} src={darkTheme? lightModeIcon : darkModeIcon} alt="theme icon" className="w-[30px] md:w-[40px] hover:cursor-pointer themeIcon"/>
            </div>
            }
            
        
        {searchActive && <SearchModal setSearchActive={setSearchActive}/>}

    </div>
  )
}

export default Header