import { MultiStepVote } from './multiStep';

export function Voter({ candidats }) {
  if (candidats.length === 0) {
    return (
      <div className="loading">
        <h1>Chargement...</h1>
      </div>
    );
  }

  return (
    <div className="voter">
      <h1 className="h1Voter">Voter</h1>
      <MultiStepVote candidats={candidats} />
    </div>
  );
}

export default Voter;
