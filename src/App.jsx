
import { useState } from 'react'
import BookingRoom from './components/BookingRoom'
// import DoubleMonthView from './components/DoubleMonthView'


function App() {
  const [isModalOpen, setModalOpen] = useState(false)
  
  return (
    <div className=" bg-slate-400 h-screen">
      {isModalOpen && <BookingRoom isModalOpen={isModalOpen} setModalOpen={setModalOpen} />}

      <button type="button" onClick={() => setModalOpen(!isModalOpen)}>
        確認按鈕
      </button>
      {/* <DoubleMonthView/> */}
    </div>
  )
}

export default App
