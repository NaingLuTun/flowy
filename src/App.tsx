import Body from "./Body"

import ApiContextProvider from "./ApiContextProvider"

function App() {

  return (
    <>
      <ApiContextProvider>
        <Body />
      </ApiContextProvider>
      
    </>
  )
}

export default App
