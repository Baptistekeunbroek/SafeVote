import axios from 'axios';
import { useState } from 'react';

export function Register() {
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const register = async () => {
    await axios
      .post('http://localhost:5000/register', {
        name: usernameReg,
        password: passwordReg,
      })
      .then((res) => {
        console.log({ res: res });
        setUsernameReg('');
        setPasswordReg('');
      });
  };

  return (
    <div className="register">
      <input
        type="text"
        placeholder="Username"
        value={usernameReg}
        onChange={(e) => setUsernameReg(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={passwordReg}
        onChange={(e) => setPasswordReg(e.target.value)}
      />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
