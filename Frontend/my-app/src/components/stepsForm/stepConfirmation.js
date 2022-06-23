export function StepConfirmation({ changeState, vote }) {
  return (
    <div className="StepConfirmation">
      <p>Vous avez voté pour : </p>
      <div className="flexRow">
        <p className="mr10">{vote.prenomC} </p>
        <p>{vote.nomC}</p>
      </div>
      <button className="button-31" onClick={() => changeState(0)}>
        Changer de vote
      </button>
      <button className="button-31" onClick={() => changeState(2)}>
        Confirmer
      </button>
    </div>
  );
}

export default StepConfirmation;
