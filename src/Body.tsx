import Header from "./Header"

import calendarIcon from "./assets/calender-svgrepo-com.svg"
import locationIcon from "./assets/location-pin-svgrepo-com.svg"
import moonIcon from "./assets/moon-svgrepo-com.svg"
import sunIcon from "./assets/sun-svgrepo-com.svg"

import humidityIcon from "./assets/humidity-svgrepo-com.svg"
import pressureIcon from "./assets/pressure-svgrepo-com.svg"
import visibilityIcon from "./assets/visibility-svgrepo-com.svg"
import temperatureIcon from "./assets/temperature-svgrepo-com.svg"

import openweathermapApiIcon from "./assets/openweathermap-api-logo.png"
import openweathermapApiLightModeIcon from "./assets/openweather-api-light-mode-icon.svg"

import windyIcon from "./assets/wind-svgrepo-com.svg"

import "./Global.css"
import { useContext } from "react"
import { ApiContext } from "./ApiContextProvider"
const Body = () => {

    const fiveDaysArr: Array<number> = [1,2,3,4,5]

    const apiContext = useContext(ApiContext)
    if(!apiContext) {
        throw new Error("problem with context")
    }

    const {mainApiValue, forecastApiValue, airPollutionApiValue, darkTheme, loadingApi} = apiContext

    const todayDate = new Date()

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


    const dayName = days[todayDate.getDay()]
        const day = todayDate.getDate()
        let monthName: string

    const addDays = (date: Date, daysToAdd: number) => {
        /* console.log(date) */
        const result = new Date(date)
        /* console.log(result) */
        result.setDate(result.getDate() + daysToAdd)
        /* console.log(result) */
        return result
    }

    let nextDate
    let nextDayNames
    const nextFiveDaysNames: string[] = []

    fiveDaysArr.map(numberOfDays => {
        nextDate = addDays(todayDate, numberOfDays)
        nextDayNames = days[nextDate.getDay()]
        monthName = months[nextDate.getMonth()]
        nextFiveDaysNames.push(nextDayNames)
    })

    

        let mainWeatherIcon: string;
        let mainIconUrl:string

        let sunriseTimeStamp:number
        let sunsetTimeStamp:number
        let timezoneOffset:number

        let sunriseTime;
        let sunsetTime;
    
    if(mainApiValue && mainApiValue.weather && mainApiValue.weather[0]) {
        mainWeatherIcon = mainApiValue?.weather[0].icon
        mainIconUrl = `http://openweathermap.org/img/wn/${mainWeatherIcon}@2x.png`
        sunriseTimeStamp = mainApiValue?.sys?.sunrise
        sunsetTimeStamp = mainApiValue?.sys?.sunset
        timezoneOffset = mainApiValue?.timezone
        sunriseTime = new Date((sunriseTimeStamp + timezoneOffset) * 1000).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' })
        sunsetTime = new Date((sunsetTimeStamp + timezoneOffset) * 1000).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' })
    }

    
  return (
    <>
        <Header />
        {/* Marked */}
        {mainApiValue && airPollutionApiValue && forecastApiValue && !loadingApi ? 
        <div className={`w-[100%] h-[100%] flex flex-col bodyContainer`}>
            <div className={`p-4 pt-[70px] flex-col flex-1 gap-4 lg:flex lg:flex-row w-[100%] h-fit  ${darkTheme? "bg-black" : "bg-white"} mainContent`}>
                {/* <button onClick={handleConsoleLog} className="bg-slate-800">CONSOLE LOG</button> */}
                <div className="w-[100%] h-fit  currentContionAndFiveDaysForecastContainer"> 
                    <div className={`${darkTheme? "bg-[#171717]" : "bg-slate-200"} rounded-xl pr-4 pl-4 pt-2 pb-2 mb-4 currentConditionContainer`}>
                        <h2 className={`${darkTheme? "text-white" : "text-black"} text-xl font-medium mb-4 currentConditionHeader`}>Now</h2>

                        <div className="flex justify-between items-center  degreeAndWeatherCondition">
                            <p className={`${darkTheme? "text-white" : "text-black"} relative h-full text-5xl`}>{Math.round(mainApiValue?.main?.temp)}<span className="absolute top-0 text-2xl degreeSymbol">°c</span></p>
                            
                            {/* Replace with icons provided from open weather map api */}
                            <img src={mainIconUrl!} alt="weather condition" className="w-[100px] bg-slate-800 rounded-full" />
                        </div>

                        <h2 className={`${darkTheme? "text-white" : "text-black"} text-xl font-medium airCondition`}>{mainApiValue?.weather[0]?.description}</h2>

                        <hr className="bg-black mt-4 mb-4 lg:h-[2px]"/>
                        
                        <div className="dateAndLocationContainer">
                            <div className="flex items-center gap-2 mb-2 dateContainer">
                                <img src={calendarIcon} alt="calendar icon" className="w-10 h-10 p-1 rounded-full bg-slate-800" />

                                {/* make the day display dynamically either by api or man */}
                                <p className={`text-[20px] ${darkTheme? "text-white" : "text-black"} opacity-80 dateText`}>{`${dayName} ${day}, ${monthName!}`}</p>
                            </div>

                            <div className="flex gap-2 locationContainer">
                                <img src={locationIcon} alt="location icon" className="w-10 h-10 p-[2px] rounded-full bg-slate-800" />
                                <p className={`text-[20px] ${darkTheme? "text-white" : "text-black"} opacity-80 locationText`}>{mainApiValue?.name}, {mainApiValue?.sys?.country}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${darkTheme? "bg-[#171717]" : "bg-slate-200"} rounded-xl pr-4 pl-4 pt-4 pb-4 mb-4  fiveDaysForecastContainer`}>
                        <p className={`${darkTheme? "text-white" : "text-black"} text-xl font-medium mb-4 fiveDaysForecastHeader`}>5 days forecast</p>

                        {nextFiveDaysNames.map((dayNames, index) => (
                            <div key={index} className="flex items-center justify-between pt-[10px] pb-[10px]">
                                <div className=" w-[100px] flex gap-2 degreeIconAndDegreeContainer">
                                    {/* Replace with icons provided from open weather map api */}
                                    {forecastApiValue && <img src={`http://openweathermap.org/img/wn/${forecastApiValue[index]?.weather[0]?.icon}@2x.png`} alt="degree icon" className="w-10 rounded-full bg-slate-800"/>}
                                    <p className={`text-[20px] ${darkTheme? "text-white" : "text-black"} font-medium forecastDegree`}>{Math.round(forecastApiValue[index]?.main?.feels_like)}°</p>
                                </div>


                                {/* make the days display dynamically either by api or man */}

                                <p className={`${darkTheme? "text-white" : "text-black"} w-[100px]  text-base text-left opacity-80 forcastDate`}> {day + index + 1} {monthName}</p>

                                <p className={`${darkTheme? "text-white" : "text-black"} w-[100px] text-base text-left opacity-80 forecastDay`}>{dayNames}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Marked */}
                <div className="w-[100%] h-fit todayHighlightsAndTodayTimesContainer">
                    <div className={`${darkTheme? "bg-[#171717]" : "bg-slate-200"} rounded-xl pr-4 pl-4 pt-2 pb-2 mb-4 todayHighlightsContainer`}>

                        <h2 className={`${darkTheme? "text-white" : "text-black"} text-xl font-medium mb-4 todayHighlightsHeader`}>Today Highlights</h2>

                        <div className={`${darkTheme? "bg-[#0f0f0f]" : "bg-slate-300"} rounded-xl pr-4 pl-4 pt-4 pb-4 mb-4 airQualityIndexContainer`}>

                            <h3 className={`${darkTheme? "text-white" : "text-black"} text-[20px] opacity-80 mb-4 airQualityIndexHeader`}>
                                Air Quality Index 
                                    <span className={`ml-2 p-1 pl-3 pr-3 rounded-2xl text-nowrap text-white ${airPollutionApiValue?.list[0]?.main?.aqi === 1? "bg-green-400" : airPollutionApiValue?.list[0]?.main?.aqi === 2? "bg-yellow-400" : airPollutionApiValue?.list[0]?.main?.aqi === 3? "bg-orange-400": airPollutionApiValue?.list[0]?.main?.aqi === 4? "bg-[#e8572e]": "bg-red-500"}`}>
                                        {airPollutionApiValue?.list[0]?.main?.aqi === 1? "Good": airPollutionApiValue?.list[0]?.main?.aqi === 2? "Fair": airPollutionApiValue?.list[0]?.main?.aqi === 3? "Moderate" : airPollutionApiValue?.list[0]?.main?.aqi === 4? "Poor": "Very Poor" } 
                                    </span>
                            </h3>

                            <div className="flex w-[100%] justify-between items-center md:gap-3 airQualityContentContainer">
                                <img src={windyIcon} alt="air quality icon" className="w-[50px] lg:w-[78px] p-1 bg-slate-800 rounded-full airQualityIcon" />

                                <div className="grid grid-cols-2 gap-4  md:flex md:gap-0 airQualityInfoContainer">

                                    <div className="flex items-center gap-1 md:flex-col-reverse md:mr-8 individualAirQualityInfoContainer">
                                        <p className={`${darkTheme? "text-white" : "text-black"} text-xl font-medium PM25value`}>
                                            {airPollutionApiValue?.list[0]?.components?.pm2_5}
                                        </p>
                                        
                                        <span className={`${darkTheme? "text-white" : "text-black"} text-[20px] opacity-80 PM25`}>
                                            PM25
                                        </span>
                                        
                                    </div>

                                    <div className="flex items-center gap-1 md:flex-col-reverse md:mr-8 individualAirQualityInfoContainer">
                                        <p className={`${darkTheme? "text-white" : "text-black"} text-xl font-medium SO2value`}>
                                            {airPollutionApiValue?.list[0]?.components?.so2}
                                            
                                        </p>
                                        <span className={`${darkTheme? "text-white" : "text-black"} text-[20px] opacity-80 SO2`}>
                                            SO2
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-1 md:flex-col-reverse md:mr-8 individualAirQualityInfoContainer">
                                    <p className={`${darkTheme? "text-white" : "text-black"} text-xl font-medium NO2value`}>
                                        {airPollutionApiValue?.list[0]?.components?.no2}
                                    </p>
                                    
                                    <span className={`${darkTheme? "text-white" : "text-black"} text-[20px] opacity-80 NO2`}>
                                            NO2
                                    </span>
                                    
                                    </div>
                                    
                                    <div className="flex items-center gap-1 md:flex-col-reverse individualAirQualityInfoContainer">
                                        <p className={`${darkTheme? "text-white" : "text-black"} text-xl font-medium O3value`}>
                                            {airPollutionApiValue?.list[0]?.components?.o3}
                                        </p>
                                        <span className={`${darkTheme? "text-white" : "text-black"} text-[20px] opacity-80 O3`}>
                                            O3
                                        </span>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div className={`${darkTheme? "bg-[#0f0f0f]" : "bg-slate-300"} rounded-xl pr-4 pl-4 pt-4 pb-4 mb-4 sunriseAndSunSetContainer`}>
                            <h3 className={`${darkTheme? "text-white" : "text-black"} text-[20px] opacity-80 mb-4 sunriseAndSunsetHeader`} >Sunrise & Sunset</h3>
                            <div className="flex w-[100%] gap-10 sunriseAndSunsetContentContainer">
                                <div className="flex flex-col md:flex-row md:items-center md:gap-4 sunriseContainer">

                                    {/* Replace with icon provided from api if possible */}
                                    <img src={sunIcon} alt="sun icon" className="w-[50px] lg:w-[70px] p-1 rounded-full bg-slate-800 sunriseIcon"/>
                                    
                                    <div className="sunriseInfoContainer">
                                        <p className={`${darkTheme? "text-white" : "text-black"} text-base opacity-80 sunriseText`}>Sunrise</p>

                                        {/* Replace with the time provided from the api */}
                                        <p className={`${darkTheme? "text-white" : "text-black"} text-nowrap text-xl font-medium sunriseTime`}>{sunriseTime}</p>
                                    </div>
                                    
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center md:gap-4 sunsetContainer">
                                    {/* Replace with icon provided from api if possible */}
                                    <img src={moonIcon} alt="moon icon" className="w-[50px] lg:w-[70px] p-1 rounded-full bg-slate-800 sunsetIcon"/>

                                    <div className="sunsetInfoContiner">
                                        <p className={`${darkTheme? "text-white" : "text-black"} text-base opacity-80 sunsetText`}>Sunset</p>

                                        {/* Replace with the time provided from the api */}
                                        <p className={`${darkTheme? "text-white" : "text-black"} text-nowrap text-xl font-medium sunsetText`}>{sunsetTime}</p>
                                    </div>
                                    
                                </div>  
                            </div>    
                        </div>


                        <div className="flex w-[100%] flex-col md:flex-row md:gap-4 humidityAndPressureContainer">
                            <div className={`${darkTheme? "bg-[#0f0f0f]" : "bg-slate-300"} rounded-xl pr-4 pl-4 pt-4 pb-4 mb-4 w-[100%] humidityContainer`}>

                                <h3 className={`${darkTheme? "text-white" : "text-black"} text-[20px] opacity-80 mb-4 humidityHeader`}>Humidity</h3>

                                <div className="flex w-[100%] justify-between items-center humidityContentContainer">
                                    
                                    {/* Replace with icon provided from the api */}
                                    <img src={humidityIcon} alt="humidity icon" className="w-10 lg:w-[60px] p-1 bg-slate-800 rounded-full humidityIcon" />

                                    {/* Replace with the humidity  provided from the api */}
                                    <p className={`${darkTheme? "text-white" : "text-black"} text-xl font-medium humidityPercent`}>{mainApiValue?.main?.humidity}<span className="text-[20px] percent">%</span></p>
                                </div>
                            </div>

                            <div className={`${darkTheme? "bg-[#0f0f0f]" : "bg-slate-300"} rounded-xl pr-4 pl-4 pt-4 pb-4 mb-4 w-[100%] pressureContainer`}>

                                <h3 className={`${darkTheme? "text-white" : "text-black"} text-[20px] opacity-80 mb-4 pressureHeader`}>Pressure</h3>

                                <div className="flex w-[100%] justify-between items-center pressureContentContainer">

                                    {/* Replace with icon provided from the api */}
                                    <img src={pressureIcon} alt="pressure icon" className="w-10 lg:w-[60px] p-1 bg-slate-800 rounded-full pressureIcon" />

                                    {/* Replace with the pressure provided from the api */}
                                    <p className={`${darkTheme? "text-white" : "text-black"} text-xl font-medium pressure`}>{mainApiValue?.main?.pressure}<span className="text-[20px] pressureUnit">hPa</span></p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex w-[100%] flex-col md:flex-row md:gap-4 visibilityAndFeelsLikeContainer">
                            <div className={`${darkTheme? "bg-[#0f0f0f]" : "bg-slate-300"} rounded-xl pr-4 pl-4 pt-4 pb-4 mb-4 w-[100%] visibilityContainer`}>

                                <h3 className={`${darkTheme? "text-white" : "text-black"} text-[20px] opacity-80 mb-4 visibilityHeader`}>Visibility</h3>

                                <div className="flex w-[100%] justify-between items-center visibilityContentContainer">

                                    {/* Replace with icon provided from the api */}
                                    <img src={visibilityIcon} alt="visibility icon" className="w-10 lg:w-[60px] p-1 bg-slate-800 rounded-full visibilityIcon" />

                                    {/* Replace with the visibility provided from the api */}
                                    <p className={`${darkTheme? "text-white" : "text-black"} text-xl font-medium visibility`}>{mainApiValue?.visibility / 1000}<span className="text-[20px] visibilityUnit">km</span></p>
                                </div>
                            </div>

                            <div className={`${darkTheme? "bg-[#0f0f0f]" : "bg-slate-300"} rounded-xl pr-4 pl-4 pt-4 pb-4 mb-4 w-[100%] feelsLikeContainer`}>

                                <h3 className={`${darkTheme? "text-white" : "text-black"} text-[20px] opacity-80 mb-4 feelsLinkHeader`}>Feels Like</h3>

                                <div className="flex w-[100%] justify-between items-center feelsLikeContentContainer">

                                    {/* Replace with icon provided from the api */}
                                    <img src={temperatureIcon} alt="feelsLike icon" className="w-10 lg:w-[60px] p-1 bg-slate-800 rounded-full feelsLikeIcon" />

                                    {/* Replace with the feelsLike provided from the api */}
                                    <p className={`${darkTheme? "text-white" : "text-black"} text-xl pr-[15px] font-medium relative feelsLike `}>{Math.round(mainApiValue?.main?.feels_like)}<span className="text-[15px] absolute top-0 feelsLikeUnit">°c</span></p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        
                </div>
                
            </div>
            <footer className={`${darkTheme? "bg-black text-white" : "bg-white text-black"} pb-5 flex flex-col justify-center items-center`}>
                    <p className={` text-[20px] text-center`}>Copyright 2024 Naing Lu Tun, All Rights Reserved</p>

                    <div className="flex items-center justify-center w-[100%] gap-4 poweredByContainer">
                    <p className="text-[20px]">Powered by </p>
                    <img src={darkTheme? openweathermapApiIcon:openweathermapApiLightModeIcon} alt="openweathermap api icon" className="w-[100px]" />
                    </div>
                    
            </footer>
        </div>
            
        :   
            <div className={`w-[100%] h-[100%] flex justify-center items-center ${darkTheme? "bg-black": "bg-white" }`}>
                <div className="mainLoader"></div>
            </div>
            
        }
        
    </>

  )
}

export default Body