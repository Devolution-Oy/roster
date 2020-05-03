import React from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

const Modal = props => (
  <div className="modal" >
    <header className="modal__header">
      <h1 className='modal__title'>{props.title}</h1>
    </header>
    <section className="modal__content">
      {props.children}
    </section>
    <section className="modal__actions">
      <button className="btn_accept" disabled={props.disabled} onClick={props.onAccept} >{props.accept}</button>
      <button className="btn_cancel" onClick={props.onCancel} >Cancel</button>
    </section>
  </div>
);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  accept: PropTypes.string,
  disabled: PropTypes.bool
};

export default Modal;