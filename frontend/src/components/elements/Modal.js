import './Modal.css';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';

//Modal muodostetaan parentissa, ottaa sen statet jonka perusteella säädetään näkyvyyttä. Samalla elementin sisältö määritetään sen luodessa childrenin avulla.
const Modal = ({ show, setShow, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main"  style={{padding : "5%"}}>
        {children}
        <Button onClick={() => setShow(false)} variant="primary">
          Close
        </Button>
      </section>
    </div>
  );
};

export default Modal;