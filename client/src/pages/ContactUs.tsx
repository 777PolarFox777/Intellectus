import * as React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Footer, ContactUsForm, DefaultContactData } from '../components';
import { Loader } from '../components/Loader';
import { API, URLS } from '../constants';
import { FinishFormState } from '../commonTypes';

const defaultFinishState: FinishFormState<DefaultContactData> = {
  isFinish: false,
  error: undefined,
  oldData: {},
};

export const ContactUs = (): React.ReactElement | null => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [finishState, setFinishState] = React.useState<FinishFormState<DefaultContactData>>(
    defaultFinishState,
  );

  const feedbackFormSubmit = (data: DefaultContactData): void => {
    setIsLoading(true);
    let error: string;

    axios(API.feedback, { method: 'post', data })
      .catch((err: Error) => {
        error = 'Something went wrong';

        throw err; // на самом деле это просто реджектит промис, а не крашит приложение
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
    ...defaultFinishState,
    oldData: finishState.oldData,
  });

  if (isLoading) return <Loader />;

  if (finishState.isFinish) {
    return (
      <>
        <main className="main-container">
          <div className="contact-results">
            {finishState.error ? (
              <>
                <div className="error">{finishState.error}</div>
                <div className="button" onClick={tryToSendFormAgain}>
                  Try again
                </div>
              </>
            ) : (
              <>
                <div className="success">We got your feedback</div>
                <NavLink to={URLS.main} type="button" className="button">
                  Go to main page
                </NavLink>
              </>
            )}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="main-container">
        <ContactUsForm
          feedbackFormSubmit={feedbackFormSubmit}
          data={finishState.oldData}
        />
      </main>
      <Footer />
    </>
  );
};
