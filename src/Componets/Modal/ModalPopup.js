import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import './ModalPopup.css'
const ModalPopup = (props) => {
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Location Tracker
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='modal-body'>
          <div className='body-text'>
            Click the botton bellow to see your location on the map
          </div>
          <Button variant='outline-primary' onClick={() => props.locate()}>
            {' '}
            Find me
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalPopup
