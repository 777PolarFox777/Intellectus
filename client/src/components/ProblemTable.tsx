import * as React from 'react';
import { toDataURL } from '../helpers';

export interface ProblemTableProps {
  problemFields: (string | null)[];
  rightAnswer?: string | false;
}

export const ProblemTable = (props: ProblemTableProps): React.ReactElement => {
  const { problemFields, rightAnswer = false } = props;

  return (
    <>
      {problemFields.map((item, index) => {
        if (item) {
          return (
            <img
              className="problem-cell"
              src={item ? toDataURL(item) : undefined}
              key={index.toString()}
            />
          ); // img без src отображает заглушку, поэтому используем div
        }

        if (rightAnswer === false) {
          return <div className="problem-cell" key={index.toString()} />;
        }

        return (
          <img
            className="problem-cell right-answer"
            src={toDataURL(rightAnswer)}
            key={index.toString()}
          />
        );
      })}
    </>
  );
};
