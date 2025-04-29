import ReactDom from 'react-dom';

const Modal = ({ children, handleCloseModal }) => {
  const modalJSX = (
    <div className='modal-container'>
      <button className='modal-underlay' onClick={handleCloseModal} />
      <div className='modal-content'>{children}</div>
    </div>
  );

  return ReactDom.createPortal(modalJSX, document.getElementById('portal'));
};

export default Modal;
