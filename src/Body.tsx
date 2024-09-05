import Header from "./Header"
import blackCalender from "./assets/black-calender-icon.svg"
import blackLocationPinIcon from "./assets/black-location-pin-icon.svg"
import moonIcon from "./assets/dark-mode-icon.svg"
import sunIcon from "./assets/light-mode-icon.svg"

import windyIcon from "./assets/black-wind-icon.svg"

import "./Global.css"
const Body = () => {
    const fiveDaysArr: Array<number> = [1,2,3,4,5]
    const todayTimesArr: Array<string> = ["2 AM", "5 AM", "8 AM", "11 AM", "2 PM", "5 PM", "8 PM", "11 PM"]
  return (
    <>
        <Header />
        <div className="p-4 mt-[85px] flex-col mainContent">
            <div className="currentContionAndFiveDaysForecastContainer">
                <div className='bg-slate-200 rounded-xl pr-8 pl-8 pt-4 pb-4 mb-4 currentConditionContainer'>

                    <h2 className='text-xl font-medium currentConditionHeader'>Now</h2>

                    <div className="flex justify-between degreeAndWeatherCondition">
                        <p className="relative text-[70px]">20<span className="absolute top-[10px] text-3xl degreeSymbol">°c</span></p>
                        
                        {/* Replace with icons provided from open weather map api */}
                        <img src={windyIcon} alt="weather condition" className="w-[70px]" />
                    </div>

                    <h2 className="text-xl font-medium airCondition">Windy</h2>

                    <hr className="bg-black mt-4 mb-4"/>
                    
                    <div className="dateAndLocationContainer">
                        <div className="flex gap-2 dateContainer">
                            <img src={blackCalender} alt="calender icon" className="w-6" />
                            <p className="text-[20px] opacity-80 dateText">Thursday 5, Sept</p>
                        </div>

                        <div className="flex gap-2 locationContainer">
                            <img src={blackLocationPinIcon} alt="location icon" className="w-6" />
                            <p className="text-[20px] opacity-80 locationText">New York</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-200 rounded-xl pr-8 pl-8 pt-4 pb-4 mb-4 fiveDaysForecastContainer">
                    <p className="text-xl font-medium mb-4 fiveDaysForecastHeader">5 days forecast</p>

                    {fiveDaysArr.map((_, index) => (
                        <div key={index} className="flex items-center justify-between mt-3 mb-3">
                            <div className=" flex gap-2 degreeIconAndDegreeContainer">
                                {/* Replace with icons provided from open weather map api */}
                                <img src={moonIcon} alt="degree icon" className="w-8"/>
                                <p className="text-[20px] font-medium forecastDegree">25°</p>
                            </div>

                            <p className="text-base opacity-80 forcastDate">2 Sept</p>

                            <p className="text-base opacity-80 forecastDay">Thursday</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="todayHighlightsAndTodayTimesContainer">
                <div className="bg-slate-200 rounded-xl pr-8 pl-8 pt-4 pb-4 mb-4 todayHighlightsContainer">

                    <h2 className="text-xl font-medium mb-4 todayHighlightsHeader">Today Highlights</h2>

                    <div className="bg-slate-300 rounded-xl pr-8 pl-8 pt-4 pb-4 mb-4 airQualityIndexContainer">

                        <h3 className="text-[20px] opacity-80 mb-6 airQualityIndexHeader">
                            Air Quality Index 
                                <span className="ml-2 p-1 pl-3 pr-3 rounded-2xl text-nowrap  bg-red-300">
                                    Very Poor    
                                </span>
                        </h3>

                        <div className="flex w-[100%] justify-between airQualityContentContainer">
                            <img src={windyIcon} alt="air quality icon" className="w-8 airQualityIcon" />

                            <div className="grid grid-cols-2 airQualityInfoContainer">
                                <p className="text-xl font-medium m-2 mt-0 PM25value">
                                    117
                                    <span className="text-[20px] opacity-80 ml-1 PM25">
                                            PM25
                                    </span>
                                </p>

                                <p className="text-xl font-medium m-2 mt-0 SO2value">
                                    29.8
                                    <span className="text-[20px] opacity-80 ml-1 SO2">
                                        SO2
                                    </span>
                                </p>

                                <p className="text-xl font-medium m-2 mt-0 NO2value">
                                    43.2
                                    <span className="text-[20px] opacity-80 ml-1 NO2">
                                        NO2
                                    </span>
                                </p>

                                <p className="text-xl font-medium m-2 mt-0 O3value">
                                    0.150
                                    <span className="text-[20px] opacity-80 ml-1 O3">
                                        O3
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-300 rounded-xl pr-8 pl-8 pt-4 pb-4 mb-4 sunriseAndSunSetContainer">
                        <h3 className="text-[20px] opacity-80 mb-6 sunriseAndSunsetHeader" >Sunrise & Sunset</h3>
                        <div className="flex w-[100%] gap-10 sunriseAndSunsetContentContainer">
                            <div className="sunriseContainer">

                                {/* Replace with icon provided from api if possible */}
                                <img src={sunIcon} alt="sun icon" className="w-8 sunriseIcon"/>
                                <p className="text-base opacity-80 sunriseText">Sunrise</p>

                                {/* Replace with the time provided from the api */}
                                <p className="text-xl font-medium sunriseTime">6:46 AM</p>
                            </div>

                            <div className="sunsetContainer">
                                {/* Replace with icon provided from api if possible */}
                                <img src={moonIcon} alt="moon icon" className="w-8 sunsetIcon"/>
                                <p className="text-base opacity-80 sunriseText">Sunset</p>

                                {/* Replace with the time provided from the api */}
                                <p className="text-xl font-medium sunriseTime">6:21 pM</p>
                            </div>  
                        </div>    
                    </div>

                    <div className="bg-slate-300 rounded-xl pr-8 pl-8 pt-4 pb-4 mb-4 humidityContainer">

                        <h3 className="text-[20px] opacity-80 mb-6 humidityHeader">Humidity</h3>

                        <div className="flex w-[100%] justify-between humidityContentContainer">
                            
                            {/* Replace with icon provided from the api */}
                            <img src={windyIcon} alt="humidity icon" className="w-8 humidityIcon" />

                            {/* Replace with the humidity  provided from the api */}
                            <p className="text-xl font-medium humidityPercent">73<span className="text-[20px] percent">%</span></p>
                        </div>
                    </div>

                    <div className="bg-slate-300 rounded-xl pr-8 pl-8 pt-4 pb-4 mb-4 pressureContainer">

                        <h3 className="text-[20px] opacity-80 mb-6 pressureHeader">Pressure</h3>

                        <div className="flex w-[100%] justify-between pressureContentContainer">

                            {/* Replace with icon provided from the api */}
                            <img src={windyIcon} alt="pressure icon" className="w-8 pressureIcon" />

                            {/* Replace with the pressure provided from the api */}
                            <p className="text-xl font-medium pressure">1019<span className="text-[20px] pressureUnit">hPa</span></p>
                        </div>
                    </div>

                    <div className="bg-slate-300 rounded-xl pr-8 pl-8 pt-4 pb-4 mb-4 visibilityContainer">

                        <h3 className="text-[20px] opacity-80 mb-6 visibilityHeader">Visibility</h3>

                        <div className="flex w-[100%] justify-between visibilityContentContainer">

                            {/* Replace with icon provided from the api */}
                            <img src={windyIcon} alt="visibility icon" className="w-8 visibilityIcon" />

                            {/* Replace with the visibility provided from the api */}
                            <p className="text-xl font-medium visibility">2.5<span className="text-[20px] visibilityUnit">km</span></p>
                        </div>
                    </div>

                    <div className="bg-slate-300 rounded-xl pr-8 pl-8 pt-4 pb-4 mb-4 feelsLikeContainer">

                        <h3 className="text-[20px] opacity-80 mb-6 feelsLinkHeader">Feels Like</h3>

                        <div className="flex w-[100%] justify-between feelsLikeContentContainer">

                            {/* Replace with icon provided from the api */}
                            <img src={windyIcon} alt="feelsLike icon" className="w-8 feelsLikeIcon" />

                            {/* Replace with the feelsLike provided from the api */}
                            <p className="text-xl font-medium relative feelsLike ">20<span className="text-[20px] absolute top-0 feelsLikeUnit">°c</span></p>
                        </div>
                    </div>

                </div>

                <div className="mb-8 todayTimesContainer">
                    <h2 className="text-xl font-medium mb-4  todayTimesHeader">Today at</h2>

                    <div className="overflow-x-auto w-[100%] grid grid-cols-[repeat(8,minmax(110px,1fr))] gap-4 todayTimesContentContainer">
                        {todayTimesArr.map((time, index) => (
                            <div className="bg-slate-300 rounded-xl flex flex-col w-[110px] pt-4 pb-4 items-center individualTimeContainer" key={index}>
                                <p className="text-xl font-medium timeText">{time}</p>
                                <img src={moonIcon} alt="times icon" className="w-[40px] md:w-[50px] timesIcon" />
                                <p className="text-xl font-medium timesTemperature">
                                    25°
                                </p>
                            </div>
                        ))}
                        {todayTimesArr.map((time, index) => (
                            <div className="bg-slate-300 rounded-xl flex flex-col w-[110px] pt-4 pb-4 items-center individualTimeContainer" key={index}>
                                <p className="text-xl font-medium timeText">{time}</p>
                                <img src={moonIcon} alt="times icon" className="w-[40px] md:w-[50px] timesIcon" />
                                <p className="text-xl font-medium timesWindSpeed">
                                    11 km/h
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <footer>
                <p className="text-[20px] text-center">Copyright 2024 Naing Lu Tun, All Rights Reserved</p>
            </footer>
        </div>
    </>

  )
}

export default Body