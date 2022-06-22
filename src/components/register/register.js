import React, { useState } from 'react'
import './register.css'
import Login from '../login/login';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from './userAuthContext';
import { Alert } from 'bootstrap';

function Register() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password, confirmPassword);
      if(password == confirmPassword){
        navigate("/login")
      }
    } catch (err) {
      setError(err.message);

    }
  }


  return (
    <section>
      {error && <Alert variant="danger">{error}</Alert>}
      <form className='registerForm' >
        <div class="form-outline mb-4">
          <label class="form-label" for="form2Example1">Email</label>
          <input name="email" type="email" id="form2Example1" class="form-control" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div class="form-outline mb-4">
          <label class="form-label" for="form2Example2">Password</label>
          <input name="password" type="password" id="form2Example2" class="form-control" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div class="form-outline mb-4">
          <label class="form-label" for="form2Example2">Confirm Password</label>
          <input name="confirmPassword" type="password" id="form2Example2" class="form-control" onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>


        <button type="submit" onClick={handleSubmit} class="btn btn-primary btn-block mb-4">Sign in</button>


      </form>
    </section>

  )
}

export default Register;