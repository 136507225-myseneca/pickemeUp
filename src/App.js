import './App.css'
import ModalPopup from './Componets/Modal/ModalPopup'
import React, { useState } from 'react'
import Map from './Pages/Map/Map'
import { Button } from 'react-bootstrap'

const App = () => {
  const [modalShow, setModalShow] = useState(true)
  const [findLocation, setFindLocation] = useState(false)

  const locate = () => {
    setFindLocation(true)
    setModalShow(false)
  }
  return (
    <>
      <ModalPopup
        show={modalShow}
        onHide={() => setModalShow(false)}
        locate={locate}
      />

      <div className='loc-btn'>
        <Button onClick={locate}> Find me</Button>
      </div>
      <Map findLocation={findLocation} />
    </>
  )
}

export default App
