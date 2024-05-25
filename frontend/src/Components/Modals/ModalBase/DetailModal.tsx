import { FC,memo, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import IconLazy from 'Components/Icon/IconLazy';

interface DetailModalProps {
  onHide: () => void;
  children?: ReactNode;
  className?: string;
}

const DetailModal: FC<DetailModalProps> = ({ onHide, children, className }) => {
  useEffect(() => {
    const checkKey = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        onHide();
      }
    };
    window.addEventListener('keydown', checkKey);
    return () => window.removeEventListener('keydown', checkKey);
  });

  return ReactDOM.createPortal(
    <div className="modal-parent active">
      <div className={`details-modal radius__outter ${className}`}>
        <div className="details-modal__wrapper">
          <div className="details-modal__close-wrapper" onClick={() => onHide()}>
            <IconLazy nameIcon='GrClose' className='details-modal__close'/>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modals') as HTMLElement
  );
};

export default memo(DetailModal);
