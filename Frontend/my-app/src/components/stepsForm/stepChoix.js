import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export function StepChoix({ candidats, changeState }) {
  const formSchema = Yup.object().shape({
    Vote: Yup.string().required('Le vote est requis'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
  });
  console.log(errors);
  function onSubmit(dataForm) {
    changeState(1);
  }

  if (candidats.length === 0) {
    return <div className="multiStep"></div>;
  }

  return (
    <div className="multiStep">
      <p>Pour qui voulez vous voter ?</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select
          className="selectVoter"
          {...register('Vote', { required: true })}
        >
          {candidats.map((candidat) => (
            <option key={candidat.idCandidat} value={candidat.idCandidat}>
              {candidat.nomC}
            </option>
          ))}
        </select>
        <button className="button-31" type="Submit">
          Voter
        </button>
      </form>
    </div>
  );
}

export default StepChoix;
