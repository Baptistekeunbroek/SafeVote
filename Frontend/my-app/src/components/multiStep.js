import { useState, useEffect } from 'react';
import { StepChoix } from './stepsForm/stepChoix';
import { StepConfirmation } from './stepsForm/stepConfirmation';
import { StepResultat } from './stepsForm/stepResultat';
import { StepVote } from './stepsForm/stepVote';
import { Progression } from './stepsForm/progression';
import axios from 'axios';

export function MultiStepVote({ candidats }) {
  const [stepActuel, setStepActuel] = useState(0);
  const [vote, setVote] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/checkVote', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.vote.length > 0) {
          setStepActuel(3);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      <Progression step={stepActuel} />
      <div className="multiStepSteps">{steps[stepActuel].component}</div>
    </div>
  );
}

export default MultiStepVote;
