import { React } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

export function Progression({ step }) {
  return (
    <div className="Progression">
      <div className="Progress">
        <LinearProgress
          sx={{ width: 400 }}
          variant="determinate"
          value={((step * 1) / 3) * 100}
        />
      </div>
    </div>
  );
}

export default Progression;
