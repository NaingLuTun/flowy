import { useContext } from "react"
import backArrowIcon from "./assets/back-arrow-icon.svg"
import blackLocationPinIcon from "./assets/location-pin-svgrepo-com.svg"
import { ApiContext } from "./ApiContextProvider"

import { useState } from "react"
/* import whiteLocationPinIcon from "./assets/white-location-pin-icon.svg" */

interface SearchModalProps {
    setSearchActive: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchModal = ({setSearchActive}: SearchModalProps) => {

    const [searchValue, setSearchValue] = useState("")

    const [suggestions, setSuggestions] = useState<string[]>([])

    const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false)

    const apiInfo = {
      key: "9e9ed19497a29a4a4f52c70796e6167d",
      base: "https://api.openweathermap.org/data/2.5/",
      geoBase: "https://api.openweathermap.org/geo/1.0/"
    }

    const apiContext = useContext(ApiContext)

    if(!apiContext) {
        throw new Error("useContext must be used within a ApiContextProvider")
      }
  
      const {setMainApiValue, setForecastApiValue, setAirPollutionApiValue, darkTheme} = apiContext

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
            } else {
              console.error("Error fetching forecast data")
            }
            
          })
        }
        
      }
  
      const fetchSuggestions = (searchValue: string) => {
        if(searchValue.length > 2) {
          setLoadingSuggestions(true)
          fetch(`${apiInfo.geoBase}direct?q=${searchValue}&limit=5&appid=${apiInfo.key}`)
          .then(res => res.json())
          .then((result) => {
            const cityNames = result.map((city:any) => `${city.name}, ${city.country}`)
            setSuggestions(cityNames)
            setLoadingSuggestions(false)
          })
          .catch((error) => {
            console.error("Error fectching suggestions", error)
            setLoadingSuggestions(true)
          })
        } else {
          setSuggestions([])
        }
      }
  
  
      const handleInputChange = (inputValue: string) => {
        setSearchValue(inputValue)
        fetchSuggestions(inputValue)
      }
  

      const handleChoice = (suggestions: string) => {
        const filterSuggestionName = suggestions.slice(0, -4)
        fetchFiveDaysForecastApi(filterSuggestionName)
        fetchMainApiAndAirPollutionApi(filterSuggestionName)
        setSearchActive(false)
      }
  return (
    <div className={` ${darkTheme? "bg-black" : "bg-white"} absolute z-10 h-[100vh] w-[100%] top-0 left-0`}>
        <div className={`${darkTheme? "bg-[#171717]" : "bg-white"} p-4 flex gap-4 border-b-[1px] border-solid border-black border-opacity-50 shadow-md searchModalHeader`}>
            <img onClick={() => setSearchActive(false)} src={backArrowIcon} alt="back icon" className="w-[40px] md:w-[50px] hover:cursor-pointer bg-gray-400 rounded-full backArrowIcon" />
            <input type="text" value={searchValue} onChange={(e) => handleInputChange(e.target.value)} className="p-2 pl-4 bg-slate-200 rounded-3xl focus:outline-none flex-grow " placeholder="Search" autoFocus/>
            {loadingSuggestions && <span className="absolute right-6 top-[22px] md:top-[26px] loader"></span>} 
        </div>
        
        <div className="p-4 searchItemsContainer">

            {suggestions.length > 0 && (
              <>
                {suggestions.map((suggestions, index) => (
                <div key={index} onClick={() =>
                  handleChoice(suggestions)} className={`flex gap-1 items-center ${darkTheme? "hover:bg-[#1c1c1c]" : "hover:bg-gray-200"} hover:cursor-pointer rounded-md p-3 mt-2 mb-2 border-b-slate-800 border-b-[1px] border-opacity-50 shadow-md  individualSearchItemsContainer`}>
                    <img src={blackLocationPinIcon} alt="location icon" className="w-[30px] h-[30px] p-[2px] bg-slate-800 rounded-full md:w-[50px] locationPinIcon" />
                      <p className={`${darkTheme? "text-white":"text-black"} `}>{suggestions}</p>
                </div>
                ))}
              </>
                
            )}
            
        </div>
    </div>
  )
}

export default SearchModal