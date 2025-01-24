
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/users/login", { email,  password });
      navigate("/home");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="bgcon"><br/><br/><br/>
      <div
                className="container "
            >
                <div
                    className="row justify-content-center align-items-center g-2"
                >
                    <div className="col-md-5">
                        <form  action="post">
                            <div className="card background-container">
                                <h1 className='display-4 text-center title'><i>Login</i></h1>
                                <div className="card-body">
                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="formId1"
                                            id="formId1"
                                            placeholder=""
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="formId1">Email</label>
                                    </div>

                                    
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="formId3"
                                            id="formId3"
                                            placeholder=""
                                            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
                                        />
                                        <label htmlFor="formId1">Password</label>
                                    </div>
                                    {error && <p>{error}</p>}

                                    <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Login</button>

                                </div>
                                <center><h7 className="shahin">Already have an account?</h7> <NavLink  to="/signup">
                                signup
                </NavLink></center>
                            </div>


                        </form>

                    </div>

                </div>

            </div><br/><br/><br/><br/>
    </div>
  );
};

export default Login;
