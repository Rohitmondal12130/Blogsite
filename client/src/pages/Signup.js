import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';


const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("/api/users", { name, email, password });
          navigate("/login");
        } catch (error) {
          console.error("There was an error creating the user!", error);
        }
      };
    return (
        <div className='bgcon'><br/>
            <div
                className="container "
            >
                <div
                    className="row justify-content-center align-items-center g-2"
                >
                    <div className="col-md-5">
                        <form onSubmit={handleSubmit} className='bgcon'>
                            <div className="card background-container">
                                <h1 className='display-4 text-center title'><i>Signup</i></h1>
                                <div className="card-body">
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="formId1"
                                            id="formId1"
                                            placeholder=""
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <label htmlFor="formId1">Name</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="formId2"
                                            id="formId2"
                                            placeholder=""
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label htmlFor="formId1">Password</label>
                                    </div>

                                    <button type='submit' className='btn btn-primary'>Signup</button>

                                </div>
                                <center><h7 className='shahin'>Already have an account?</h7> <NavLink  to="/login">
                  Login
                </NavLink></center>
                            </div>


                        </form>

                    </div>

                </div>

            </div><br/><br/><br/>

        </div>
    )
}

export default Signup
