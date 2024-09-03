import backArrowIcon from "./assets/back-arrow-icon.svg"
import blackLocationPinIcon from "./assets/black-location-pin-icon.svg"
/* import whiteLocationPinIcon from "./assets/white-location-pin-icon.svg" */

interface SearchModalProps {
    setSearchActive: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchModal = ({setSearchActive}: SearchModalProps) => {
  return (
    <div className='bg-white absolute h-[100%] w-[100%] top-0 left-0'>
        <div className='p-4 flex gap-4 border-b-[1px] border-solid border-black border-opacity-50 shadow-md searchModalHeader'>
            <img onClick={() => setSearchActive(false)} src={backArrowIcon} alt="back icon" className="w-[40px] md:w-[50px] hover:cursor-pointer bg-gray-400 rounded-full backArrowIcon" />
            <input type="text" className="p-2 focus:outline-none flex-grow" placeholder="Search" autoFocus/>
        </div>
        
        <div className="p-4 searchItemsContainer">
            <div className=" flex gap-1 items-center hover:bg-gray-200 hover:cursor-pointer rounded-md pt-3 pb-3 individualSearchItemsContainer">
                <img src={blackLocationPinIcon} alt="location icon" className="w-[30px] md:w-[50px] locationPinIcon" />
                <p>New York</p>
            </div>
            <div className=" flex gap-1 items-center hover:bg-gray-200 hover:cursor-pointer rounded-md pt-3 pb-3  individualSearchItemsContainer">
                <img src={blackLocationPinIcon} alt="location icon" className="w-[30px] md:w-[50px] locationPinIcon" />
                <p>Las Vegas</p>
            </div>
            <div className=" flex gap-1 items-center hover:bg-gray-200 hover:cursor-pointer rounded-md pt-3 pb-3  individualSearchItemsContainer">
                <img src={blackLocationPinIcon} alt="location icon" className="w-[30px] md:w-[50px] locationPinIcon" />
                <p>Texas</p>
            </div>
            
        </div>
    </div>
  )
}

export default SearchModal