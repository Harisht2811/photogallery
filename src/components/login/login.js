import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../register/userAuthContext';
import './login.css';
import { Alert } from 'bootstrap';



function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { logIn } = useUserAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
    
      navigate("/uploadImages");
    } catch (err) {
      setError(err.message);

    }
  }

  function signUp(){
    navigate("/");
  }
  return (
    <section>
    {error && <Alert variant="danger">{error}</Alert>}

    <form className='loginForm'>
      <div class="form-outline mb-4">
        <label class="form-label" for="form2Example1">Email</label>
        <input name="email" type="email" id="form2Example1" class="form-control" onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div class="form-outline mb-4">
        <label class="form-label" for="form2Example2">Password</label>
        <input name="password" type="password" id="form2Example2" class="form-control" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="button" onClick={handleSubmit} class="btn btn-primary btn-block mb-4">Log in</button>
      <p>Dont have account<a href="" onClick={signUp} >Create Account ?</a></p>


    </form>
    </section>
  )
}

export default Login;