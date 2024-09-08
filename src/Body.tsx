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
        {/* Marked */}
        <div className="p-4 mt-[55px] flex-col md:flex md:flex-row md:gap-5 mainContent">
            
            <div className="md:w-[38%] md:fixed md:top-18  currentContionAndFiveDaysForecastContainer"> 
                <div className='bg-slate-200 rounded-xl pr-4 pl-4 pt-2 pb-2 mb-4 currentConditionContainer'>

                    <h2 className='text-xl font-medium currentConditionHeader'>Now</h2>

                    <div className="flex justify-between items-center h-auto degreeAndWeatherCondition">
                        <p className="relative h-full text-5xl">20<span className="absolute top-0 text-2xl degreeSymbol">°c</span></p>
                        
                        {/* Replace with icons provided from open weather map api */}
                        <img src={windyIcon} alt="weather condition" className="w-[45px] h-fit" />
                    </div>

                    <h2 className="text-xl font-medium airCondition">Windy</h2>

                    <hr className="bg-black mt-3 mb-3 lg:h-[2px]"/>
                    
                    <div className="dateAndLocationContainer">
                        <div className="flex gap-2 dateContainer">
                            <img src={blackCalender} alt="calender icon" className="w-6" />

                            {/* make the day display dynamically either by api or man */}
                            <p className="text-[20px] opacity-80 dateText">Thursday 5, Sept</p>
                        </div>

                        <div className="flex gap-2 locationContainer">
                            <img src={blackLocationPinIcon} alt="location icon" className="w-6" />
                            <p className="text-[20px] opacity-80 locationText">New York</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-200 rounded-xl pr-4 pl-4 pt-2 pb-2 mb-4 fiveDaysForecastContainer">
                    <p className="text-xl font-medium mb-4 fiveDaysForecastHeader">5 days forecast</p>

                    {fiveDaysArr.map((_, index) => (
                        <div key={index} className="flex items-center justify-between pt-[6px] pb-[6px]">
                            <div className=" flex gap-2 degreeIconAndDegreeContainer">
                                {/* Replace with icons provided from open weather map api */}
                                <img src={moonIcon} alt="degree icon" className="w-8"/>
                                <p className="text-[20px] font-medium forecastDegree">25°</p>
                            </div>


                            {/* make the days display dynamically either by api or man */}

                            <p className="text-base opacity-80 forcastDate">2 Sept</p>

                            <p className="text-base opacity-80 forecastDay">Thursday</p>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Marked */}
            <div className="md:w-[58%] md:ml-[42%] todayHighlightsAndTodayTimesContainer">
                <div className="bg-slate-200 rounded-xl pr-4 pl-4 pt-2 pb-2 mb-4 todayHighlightsContainer">

                    <h2 className="text-xl font-medium mb-4 todayHighlightsHeader">Today Highlights</h2>

                    <div className="bg-slate-300 rounded-xl pr-4 pl-4 pt-4 pb-4 mb-4 airQualityIndexContainer">

                        <h3 className="text-[20px] opacity-80 mb-6 airQualityIndexHeader">
                            Air Quality Index 
                                <span className="ml-2 p-1 pl-3 pr-3 rounded-2xl text-nowrap  bg-red-300">
                                    Very Poor    
                                </span>
                        </h3>

                        <div className="flex w-[100%] justify-between items-center md:gap-3 airQualityContentContainer">
                            <img src={windyIcon} alt="air quality icon" className="w-[40px] md:w-[50px] airQualityIcon" />

                            <div className="grid grid-cols-2 gap-4  md:flex md:gap-0 airQualityInfoContainer">

                                <div className="flex items-center gap-1 md:flex-col-reverse md:mr-8 individualAirQualityInfoContainer">
                                    <p className="text-xl font-medium PM25value">
                                        117
                                    </p>
                                    
                                    <span className="text-[20px] opacity-80 PM25">
                                        PM25
                                    </span>
                                    
                                </div>

                                <div className="flex items-center gap-1 md:flex-col-reverse md:mr-8 individualAirQualityInfoContainer">
                                    <p className="text-xl font-medium SO2value">
                                        29.8
                                        
                                    </p>
                                    <span className="text-[20px] opacity-80 SO2">
                                        SO2
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-1 md:flex-col-reverse md:mr-8 individualAirQualityInfoContainer">
                                <p className="text-xl font-medium NO2value">
                                    43.2
                                </p>
                                
                                <span className="text-[20px] opacity-80 NO2">
                                        NO2
                                </span>
                                
                                </div>
                                
                                <div className="flex items-center gap-1 md:flex-col-reverse individualAirQualityInfoContainer">
                                    <p className="text-xl font-medium O3value">
                                        0.150
                                    </p>
                                    <span className="text-[20px] opacity-80 O3">
                                        O3
                                    </span>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-300 rounded-xl pr-4 pl-4 pt-4 pb-4 mb-4 sunriseAndSunSetContainer">
                        <h3 className="text-[20px] opacity-80 mb-6 sunriseAndSunsetHeader" >Sunrise & Sunset</h3>
                        <div className="flex w-[100%] gap-10 sunriseAndSunsetContentContainer">
                            <div className="flex flex-col md:flex-row md:items-center md:gap-4 sunriseContainer">

                                {/* Replace with icon provided from api if possible */}
                                <img src={sunIcon} alt="sun icon" className="w-[40px] md:w-[50px] sunriseIcon"/>
                                
                                <div className="sunriseInfoContainer">
                                    <p className="text-base opacity-80 sunriseText">Sunrise</p>

                                    {/* Replace with the time provided from the api */}
                                    <p className="text-xl font-medium sunriseTime">6:46 AM</p>
                                </div>
                                
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center md:gap-4 sunsetContainer">
                                {/* Replace with icon provided from api if possible */}
                                <img src={moonIcon} alt="moon icon" className="w-[40px] md:w-[50px] sunsetIcon"/>

                                <div className="sunsetInfoContiner">
                                    <p className="text-base opacity-80 sunsetText">Sunset</p>

                                    {/* Replace with the time provided from the api */}
                                    <p className="text-xl font-medium sunsetText">6:21 PM</p>
                                </div>
                                
                            </div>  
                        </div>    
                    </div>


                    <div className="flex w-[100%] flex-col md:flex-row md:gap-4 humidityAndPressureContainer">
                        <div className="bg-slate-300 rounded-xl pr-4 pl-4 pt-4 pb-4 mb-4 w-[100%] humidityContainer">

                            <h3 className="text-[20px] opacity-80 mb-6 humidityHeader">Humidity</h3>

                            <div className="flex w-[100%] justify-between humidityContentContainer">
                                
                                {/* Replace with icon provided from the api */}
                                <img src={windyIcon} alt="humidity icon" className="w-8 humidityIcon" />

                                {/* Replace with the humidity  provided from the api */}
                                <p className="text-xl font-medium humidityPercent">73<span className="text-[20px] percent">%</span></p>
                            </div>
                        </div>

                        <div className="bg-slate-300 rounded-xl pr-4 pl-4 pt-4 pb-4 mb-4 w-[100%] pressureContainer">

                            <h3 className="text-[20px] opacity-80 mb-6 pressureHeader">Pressure</h3>

                            <div className="flex w-[100%] justify-between pressureContentContainer">

                                {/* Replace with icon provided from the api */}
                                <img src={windyIcon} alt="pressure icon" className="w-8 pressureIcon" />

                                {/* Replace with the pressure provided from the api */}
                                <p className="text-xl font-medium pressure">1019<span className="text-[20px] pressureUnit">hPa</span></p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex w-[100%] flex-col md:flex-row md:gap-4 visibilityAndFeelsLikeContainer">
                        <div className="bg-slate-300 rounded-xl pr-4 pl-4 pt-4 pb-4 mb-4 w-[100%] visibilityContainer">

                            <h3 className="text-[20px] opacity-80 mb-6 visibilityHeader">Visibility</h3>

                            <div className="flex w-[100%] justify-between visibilityContentContainer">

                                {/* Replace with icon provided from the api */}
                                <img src={windyIcon} alt="visibility icon" className="w-8 visibilityIcon" />

                                {/* Replace with the visibility provided from the api */}
                                <p className="text-xl font-medium visibility">2.5<span className="text-[20px] visibilityUnit">km</span></p>
                            </div>
                        </div>

                        <div className="bg-slate-300 rounded-xl pr-4 pl-4 pt-4 pb-4 mb-4 w-[100%] feelsLikeContainer">

                            <h3 className="text-[20px] opacity-80 mb-6 feelsLinkHeader">Feels Like</h3>

                            <div className="flex w-[100%] justify-between feelsLikeContentContainer">

                                {/* Replace with icon provided from the api */}
                                <img src={windyIcon} alt="feelsLike icon" className="w-8 feelsLikeIcon" />

                                {/* Replace with the feelsLike provided from the api */}
                                <p className="text-xl pr-[15px] font-medium relative feelsLike ">20<span className="text-[15px] absolute top-0 feelsLikeUnit">°c</span></p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mb-8 mt-10 todayTimesContainer">
                    <h2 className="text-xl font-medium mb-4  todayTimesHeader">Today at</h2>

                    <div className="overflow-x-auto w-[100%] grid grid-cols-[repeat(8,minmax(84px,1fr))] gap-3 todayTimesContentContainer">
                        {todayTimesArr.map((time, index) => (
                            <div className="bg-slate-300 rounded-xl flex flex-col w-[84px] pt-2 pb-2 items-center individualTimeContainer" key={index}>
                                <p className="text-base font-medium timeText">{time}</p>
                                <img src={moonIcon} alt="times icon" className="w-[40px] md:w-[50px] timesIcon" />
                                <p className="text-base font-medium timesTemperature">
                                    25°
                                </p>
                            </div>
                        ))}
                        {todayTimesArr.map((time, index) => (
                            <div className="bg-slate-300 rounded-xl flex flex-col w-[84px] pt-2 pb-2 items-center individualTimeContainer" key={index}>
                                <p className="text-base font-medium timeText">{time}</p>
                                <img src={moonIcon} alt="times icon" className="w-[40px] md:w-[50px] timesIcon" />
                                <p className="text-base font-medium timesWindSpeed">
                                    11 km/h
                                </p>
                            </div>
                        ))}
                    </div>
                    <footer>
                        <p className="text-[20px] mt-8 text-center">Copyright 2024 Naing Lu Tun, All Rights Reserved</p>
                     </footer>
                </div>
            </div>

            
        </div>
    </>

  )
}

export default Body