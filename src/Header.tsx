import appIcon from "./assets/flowy-icon.svg"
import appIconDarkTheme from "./assets/flowy-darkTheme-icon.svg"

import lightModeIcon from "./assets/light-mode-icon.svg"
import darkModeIcon from "./assets/dark-mode-icon.svg"
import searchIcon from "./assets/search-icon.svg"
import currentLocationIcon from "./assets/current-location-icon.svg"
import { useContext, useEffect, useState } from "react"
import SearchModal from "./SearchModal"

import {useMediaQuery} from "react-responsive"

import { ApiContext } from "./ApiContextProvider"



const Header = () => {
    const [searchActive, setSearchActive] = useState(false)

    const [searchValue, setSearchValue] = useState("")

    const [suggestions, setSuggestions] = useState<string[]>([])

    const isBigScreen = useMediaQuery({query: "(min-width: 1024px)"})

    const apiInfo = {
      key: "9e9ed19497a29a4a4f52c70796e6167d",
      base: "https://api.openweathermap.org/data/2.5/",
      geoBase: "https://api.openweathermap.org/geo/1.0/"
    }

    const apiContext = useContext(ApiContext)

    if(!apiContext) {
      throw new Error("useContext must be used within a ApiContextProvider")
    }

    const {setMainApiValue, setForecastApiValue, setAirPollutionApiValue, darkTheme, setDarkTheme, setLoadingApi} = apiContext

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
      if(searchValue === "") {
        return
      } else {
          setLoadingApi(true)
          fetch(`${apiInfo.base}weather?q=${searchValue}&units=metric&APPID=${apiInfo.key}`)
          .then((res) => res.json())
          .then((result) => {
            if (result.coord) {  // Ensure result.coord exists
              console.log(result)
              setMainApiValue(result)
              const { lat, lon } = result.coord
      
              // Air pollution API
              fetch(`${apiInfo.base}air_pollution?lat=${lat}&lon=${lon}&APPID=${apiInfo.key}`)
                .then((res) => res.json())
                .then((result) => {
                  console.log(result)
                  setAirPollutionApiValue(result)
                })
              setLoadingApi(false)
            } else {
              console.error("Invalid response from weather API:", result)
            }
          })
      }
      
    }


    const fetchFiveDaysForecastApi = (searchValue: string) => {
      if(searchValue === "") {
        return
      } else {
        setLoadingApi(true)
        fetch(`${apiInfo.base}forecast?q=${searchValue}&units=metric&APPID=${apiInfo.key}`)
        .then((res) => res.json())
        .then((result) => {
          getMonthTofilterFromForecastApi()
          if(result.list) {
            const getApiList = result.list
  
          
            const filteredTodayDateList = getApiList.filter((date:any) => !date.dt_txt.includes(dateToFilter))
            const filteredMidddayList = filteredTodayDateList.filter((midday:any) => midday.dt_txt.includes("15:00:00"))
            const lastItemFromFilteredTodayDateList = filteredTodayDateList[filteredTodayDateList.length - 1]
  
            const finalfilteredApiList = filteredMidddayList.concat(lastItemFromFilteredTodayDateList)
            setForecastApiValue(finalfilteredApiList)
            setLoadingApi(false)
          } else {
            console.error("Error fetching forecast data")
          }
          
        })
      }
      
    }

    const fetchSuggestions = (searchValue: string) => {
      if(searchValue.length > 2) {
        fetch(`${apiInfo.geoBase}direct?q=${searchValue}&limit=5&appid=${apiInfo.key}`)
        .then(res => res.json())
        .then((result) => {
          const cityNames = result.map((city:any) => `${city.name}, ${city.country}`)
          setSuggestions(cityNames)
        })
        .catch((error) => {
          console.error("Error fectching suggestions", error)
        })
      } else {
        setSuggestions([])
      }
    }

    const handleGetLocation = () => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
      }
    }

    const showPosition = (position: GeolocationPosition) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      fetchCurrentWeather(latitude, longitude)
    }

    const fetchCurrentWeather =  (latitude: number, longitude: number) => {
      try {
        fetch(`${apiInfo.base}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiInfo.key}`)
        .then((res) => res.json())
        .then((result) => {
          if(result.name) {
            fetchMainApiAndAirPollutionApi(result.name)
            fetchFiveDaysForecastApi(result.name)
          }
        })
        
      }
      catch(error) {
        console.error('Error fetching weather data:', error)
      }
    }


    const handleSearch = (searchValue: string) => {
      fetchMainApiAndAirPollutionApi(searchValue)
      fetchFiveDaysForecastApi(searchValue)
    }

    const handleInputChange = (inputValue: string) => {
      setSearchValue(inputValue)
      fetchSuggestions(inputValue)
    }

    const handleEnterKeyDown = (event:React.KeyboardEvent<HTMLInputElement>) => {
      if(event.key === "Enter" ) {
        fetchMainApiAndAirPollutionApi(event.currentTarget.value)
        fetchFiveDaysForecastApi(event.currentTarget.value)
      }
    }

    const handleChoice = (suggestions: string) => {
      const filterSuggestionName = suggestions.slice(0, -4)
      console.log(filterSuggestionName)
      fetchFiveDaysForecastApi(filterSuggestionName)
      fetchMainApiAndAirPollutionApi(filterSuggestionName)
      setSuggestions([])
    }

    const handleCloseSuggestions = () => {
      setTimeout(() => {
        setSuggestions([])
      }, 200)
    }


    const randomCities = ["london", "new york", "tokyo", "paris"]

    useEffect(() => {
      const getRandomCity = randomCities[Math.floor(Math.random() * randomCities.length)]
      fetchMainApiAndAirPollutionApi(getRandomCity)
      fetchFiveDaysForecastApi(getRandomCity)
    },[])

  return (
    <div className={`p-2 pl-4 pr-4 border-b-[1px] border-solid border-black border-opacity-50 shadow-lg flex justify-between fixed w-[100%] top-0 z-10 ${darkTheme? "bg-[#171717]" : "bg-white"} headerContainer`}>
        <div className='gap-3 items-center flex headerNameAndIcon'>
            <img src={`${darkTheme? appIconDarkTheme : appIcon}`} alt="flowy icon" className="w-[30px] md:w-[40px] hover:cursor-pointer appIcon" />
            <h1 className={`text-xl font-semibold hover:cursor-pointer headerText ${darkTheme? "text-white" : "text-black"}`}>Flowy</h1>
        </div>

            {isBigScreen? 
            
            <div className="gap-3  align-middle flex">

              <div className="relative searchBarContainer">
                <input type="text" className={`${darkTheme? "bg-slate-300" : "bg-slate-200"} p-2 pl-4 pr-[40px] w-[200px] rounded-full focus:outline-none`} value={searchValue} onChange={(e) => handleInputChange(e.target.value)} onKeyDown={handleEnterKeyDown} onBlur={handleCloseSuggestions} placeholder="Search location... "/>
                <img onClick={() => handleSearch(searchValue)} src={searchIcon} alt="search icon" className="w-[25px] md:w-[35px] absolute right-[2px] top-[2px] bg-blue-400 rounded-full p-1 hover:cursor-pointer searchIcon"/>
                {suggestions.length > 0 &&
                (
                  <ul className={`absolute ${darkTheme? "bg-[#171717]" : "bg-white"} z-20 w-[200px] rounded-md top-[44px]`} >
                    {suggestions.map((suggestions, index) => (
                      <li onClick={() => handleChoice(suggestions)} className={`${darkTheme? "text-white hover:bg-[#1c1c1c]" : "text-black hover:bg-gray-200"} hover:cursor-pointer p-3 border-b-[1px] border-b-slate-400 border-opacity-30 suggestionsListElement`} key={index}>
                        {suggestions}
                      </li>
                    ))}
                  </ul>
                )
                }
              </div>

              <div className="p-2 pl-4 font-medium text-white relative flex w-[200px] bg-[#cebdf3] rounded-full hover:cursor-pointer currentLocationContainer" onClick={handleGetLocation}>
                <p>Current location</p>
                <img src={currentLocationIcon} alt="current location icon" className="w-[25px] md:w-[35px] absolute right-[2px] top-[2px] bg-[#b7a0e7] rounded-full hover:cursor-pointer currentLocationIcon" />
              </div>

              <img onClick={() => setDarkTheme(!darkTheme)} src={darkTheme? lightModeIcon : darkModeIcon} alt="theme icon" className="w-[25px] md:w-[35px] hover:cursor-pointer themeIcon"/>

            </div>
            
            : 
            
            <div className="gap-3 align-middle flex ">
            <img onClick={() => setSearchActive(true)} src={searchIcon} alt="search icon" className="w-[30px] md:w-[40px] bg-blue-400 rounded-full p-1 hover:cursor-pointer searchIcon"/>

            <img src={currentLocationIcon} alt="current location icon" onClick={handleGetLocation} className="w-[30px] md:w-[40px] bg-[#b7a0e7] rounded-full hover:cursor-pointer currentLocationIcon" />

            <img onClick={() => setDarkTheme(!darkTheme)} src={darkTheme? lightModeIcon : darkModeIcon} alt="theme icon" className="w-[30px] md:w-[40px] hover:cursor-pointer themeIcon"/>
            </div>
            }
            
        
        {searchActive && <SearchModal setSearchActive={setSearchActive}/>}

    </div>
  )
}

export default Header