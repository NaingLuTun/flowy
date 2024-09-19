import { createContext,ReactNode, useState } from "react"

interface ApiContextProps {
    children: ReactNode
}

interface ApiType {
  mainApiValue: any | undefined,
  setMainApiValue: React.Dispatch<any | undefined>
  forecastApiValue: any | undefined
  setForecastApiValue: React.Dispatch<any | undefined>
  airPollutionApiValue: any | undefined
  setAirPollutionApiValue: React.Dispatch<any | undefined>
  temperatureAtHoursApiValue: any | undefined
  setTemperatureAtHoursApiValue: React.Dispatch<any | undefined>
  darkTheme: boolean
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>
  loadingApi: boolean
  setLoadingApi: React.Dispatch<React.SetStateAction<boolean>>
}

export const ApiContext = createContext<ApiType | undefined>(undefined)

const ApiContextProvider = ({children}: ApiContextProps) => {

  const [mainApiValue, setMainApiValue] = useState<any | undefined>(undefined)
  const [forecastApiValue, setForecastApiValue] = useState<any | undefined>(undefined)
  const [airPollutionApiValue, setAirPollutionApiValue] = useState<any | undefined>(undefined)
  const [temperatureAtHoursApiValue, setTemperatureAtHoursApiValue] = useState<any | undefined>(undefined)
  const [darkTheme, setDarkTheme] = useState<boolean>(false)
  const [loadingApi, setLoadingApi] = useState<boolean>(false)
  return (
    <ApiContext.Provider value={{mainApiValue, setMainApiValue, forecastApiValue, setForecastApiValue, airPollutionApiValue, setAirPollutionApiValue, temperatureAtHoursApiValue, setTemperatureAtHoursApiValue, darkTheme, setDarkTheme, loadingApi, setLoadingApi}}>
      {children}
    </ApiContext.Provider>
  )
}

export default ApiContextProvider