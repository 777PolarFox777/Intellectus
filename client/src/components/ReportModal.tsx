import * as React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { OptionTable } from './OptionTable';
import { ProblemTable } from './ProblemTable';
import { MainState } from '../pages/Main/initialState';
import { State } from '../store';
import { Modal, ModalProps } from './Modal';
import { ReportForm, DefaultReportData } from './forms/ReportForm';
import { Loader } from './Loader';
import { FinishFormState } from '../commonTypes';

export interface ReportModalProps {
  isShowing: ModalProps['isShowing'];
  toggleModal: ModalProps['toggleModal'];
}

const defaultFinishFormState: FinishFormState<DefaultReportData> = {
  isFinish: false,
  error: false,
  oldData: {},
};

export const ReportModal = (props: ReportModalProps): React.ReactElement => {
  const { isShowing, toggleModal } = props;
  const [finishState, setFinishState] = React.useState<
    FinishFormState<DefaultReportData>>(defaultFinishFormState);
  const {
    questions, stepIndex, solutions, token,
  } = useSelector<
    State,
    MainState
  >(state => state.main);
  const [isLoading, setIsLoading] = React.useState(false);

  const currentOptions = questions ? questions[stepIndex].options : [];
  const rightAnswerIndex = solutions ? solutions[stepIndex] : 0;

  /*
   * TODO По сути эта логика очень похожа во всех наших формах,
   * надо бы вынести её в отдельный компонент FormContainer
   */
  const onReportSubmit = (formData: DefaultReportData): void => {
    setIsLoading(true);
    let error: false | string = false;
    const data = {
      ...formData,
      numberOfQuestion: stepIndex + 1,
      token,
    };

    axios('/reports', { method: 'post', data })
      .catch((err: Error) => {
        error = 'Something went wrong';

        throw err;
      })
      .finally(() => {
        setFinishState({
          oldData: data,
          isFinish: true,
          error,
        });

        setIsLoading(false);
      });
  };

  const tryToSendFormAgain = (): void => setFinishState({
    ...defaultFinishFormState,
    oldData: finishState.oldData,
  });

  if (isLoading) {
    return (
      <Modal isShowing={isShowing} toggleModal={() => toggleModal()}>
        <div className="contact-results padding-for-modal">
          <Loader />
        </div>
      </Modal>
    );
  }

  if (finishState.isFinish) {
    return (
      <Modal isShowing={isShowing} toggleModal={() => toggleModal()}>
        <div className="contact-results padding-for-modal">
          {finishState.error !== false ? (
            <>
              <div className="error">{finishState.error}</div>
              <div className="button" onClick={tryToSendFormAgain}>
                    Try again
              </div>
            </>
          ) : (
            <>
              <div className="success">We got your feedback</div>
            </>
          )}
        </div>
      </Modal>
    );
  }

  return (
    <Modal isShowing={isShowing} toggleModal={() => toggleModal()}>
      <div className="test-view-content">
        <div className="test-view-header">
          <h1 className="problem-title">Problem:</h1>
          <h1 className="problem-title options">Options:</h1>
        </div>
        <div className="test-view-body">
          <div className="problem-wrapper">
            <ProblemTable rightAnswer={currentOptions[rightAnswerIndex]} />
          </div>
          <div className="test-view-separator" />
          <div className="option-wrapper">
            <OptionTable rightAnswerIndex={rightAnswerIndex} />
          </div>
        </div>
      </div>
      <ReportForm
        reportFormSubmit={onReportSubmit}
        data={finishState.oldData}
        cancelForm={() => toggleModal()}
      />
    </Modal>
  );
};
