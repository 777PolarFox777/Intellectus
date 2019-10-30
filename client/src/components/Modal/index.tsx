import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, State } from '../../store';

export interface ModalProps {
  children?: React.ReactNode;
}

export const Modal = (props: ModalProps): React.ReactElement | null => {
  const dispatch: Dispatch = useDispatch();
  const { children } = props;
  const isModalOpen = useSelector<State, boolean>(state => state.modal);

  return isModalOpen
    ? ReactDOM.createPortal(
      <div className="modal">
        <div className="modal-bg" onClick={() => dispatch.modal.hideModal()} />
        <div className="modal-body">{children}</div>
      </div>,
      document.body,
    )
    : null;
};
