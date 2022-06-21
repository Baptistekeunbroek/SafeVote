import { useState } from 'react';
import { StepChoix } from './stepsForm/stepChoix';
import { StepConfirmation } from './stepsForm/stepConfirmation';
import { StepResultat } from './stepsForm/stepResultat';
import { StepVote } from './stepsForm/stepVote';

export function MultiStepVote({ candidats }) {
  const [stepActuel, setStepActuel] = useState(0);
  const [vote, setVote] = useState('');

  const changeState = (e) => {
    setStepActuel(e);
  };
  const changeVote = (e) => {
    setVote(candidats[e - 1]);
  };

  const steps = [
    {
      name: 'Step 1',
      component: (
        <StepChoix
          candidats={candidats}
          changeState={changeState}
          changeVote={changeVote}
        />
      ),
    },
    {
      name: 'Step 2',
      component: <StepConfirmation changeState={changeState} vote={vote} />,
    },
    {
      name: 'Step 3',
      component: <StepVote changeState={changeState} vote={vote} />,
    },
    { name: 'Step 4', component: <StepResultat /> },
  ];
  if (candidats.length === 0) {
    return <div className="multiStep"></div>;
  }
  return (
    <div className="multiStep">
      <div className="multiStepSteps">{steps[stepActuel].component}</div>
    </div>
  );
}

export default MultiStepVote;
