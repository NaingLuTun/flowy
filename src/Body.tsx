import Header from "./Header"
import blackCalender from "./assets/black-calender-icon.svg"
import blackLocationPinIcon from "./assets/black-location-pin-icon.svg"
import moonIcon from "./assets/dark-mode-icon.svg"
import windyIcon from "./assets/black-wind-icon.svg"
const Body = () => {
    const fiveDaysArr: Array<number> = [1,2,3,4,5]
  return (
    <>
        <Header />
        <div className="p-4 mt-[85px] mainContent">
            <div className="currentContionAndFiveDaysForecastContainer">
                <div className='bg-slate-200 rounded-xl pr-8 pl-8 pt-4 pb-4 mb-4 currentConditionContainer'>
                    <p className='text-xl font-medium nowText'>Now</p>
                    <div className="flex justify-between degreeAndWeatherCondition">
                        <p className="relative text-[70px]">20<span className="absolute top-[5px] text-3xl degreeSymbol">°c</span></p>
                        
                        {/* Replace with icons provided from open weather map api */}
                        <img src={windyIcon} alt="weather condition" className="w-[70px]" />
                    </div>

                    <p className="text-xl font-medium airCondition">Windy</p>

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
                    <p className="text-xl font-medium fiveDaysForecastContainer">5 days forecast</p>

                    {fiveDaysArr.map((_, index) => (
                        <div key={index} className="flex items-center justify-between mt-2 mb-2">
                            <div className=" flex gap-1 degreeIconAndDegreeContainer">
                                {/* Replace with icons provided from open weather map api */}
                                <img src={moonIcon} alt="degree icon" className="w-6"/>
                                <p className="text-[20px] forecastDegree">25°</p>
                            </div>

                            <p className="text-base opacity-80 forcastDate">2 Sept</p>

                            <p className="text-base opacity-80 forecastDay">Thursday</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>

  )
}

export default Body