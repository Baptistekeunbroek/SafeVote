import { useState } from 'react';
import { StepChoix } from './stepsForm/stepChoix';
import { StepConfirmation } from './stepsForm/stepConfirmation';
import { StepResultat } from './stepsForm/stepResultat';
import { StepVote } from './stepsForm/stepVote';

export function MultiStepVote({ candidats }) {
  const [stepActuel, setStepActuel] = useState(0);
  // const [vote, setVote] = useState('');

  const changeState = (e) => {
    setStepActuel(e);
    console.log(stepActuel);
  };

  const steps = [
    {
      name: 'Step 1',
      component: <StepChoix candidats={candidats} changeState={changeState} />,
    },
    {
      name: 'Step 2',
      component: (
        <StepConfirmation candidats={candidats} changeState={changeState} />
      ),
    },
    { name: 'Step 3', component: <StepVote /> },
    { name: 'Step 4', component: <StepResultat /> },
  ];
  if (candidats.length === 0) {
    return <div className="multiStep"></div>;
  }
  return (
    <div className="multiStep">
      <div className="multiStep__steps">{steps[stepActuel].component}</div>
    </div>
  );
}

export default MultiStepVote;
