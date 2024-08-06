import React, { useState ,useContext} from "react";
import "../CSS/Login.css";
import AlertContext from '../Context/Notes/AlertContext';

const SignUp = () => {
const context = useContext(AlertContext);
  const { setAlert } = context;
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://we-note-backend.vercel.app/auth/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res = await response.json();
      if (res.success) {
        localStorage.setItem("Token", res.msg);
        window.location.replace("/notes");
        setAlert({ type: "success", msg: "Profile created successfully" });
        setTimeout(() => {
          setAlert({});
        }, 2000);
      }
      else{
        setAlert({ type: "danger", msg: res.msg});
        setTimeout(() => {
          setAlert({});
        }, 2000);
      }
    } catch (error) {
      setAlert({ type: "danger", msg: "System Failure" });
        setTimeout(() => {
          setAlert({});
        }, 2000);
    }
    setUser({ name: "", email: "", password: "" });
  };

  return (
    <>
      <div className="container d-flex  my-5">
        <div className="w-50 p-0 m-0 text-center" >
          <img src="login.jpg" className="login-image"></img>
        </div>

        <div className="w-50 border border-dark p-0 m-0">
          <div className="p-4 fs-1 text-center">SignUp</div>
          <form className="p-4">
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label transparent">
                Name
              </label>
              <input
                type="text"
                className="form-control transparent"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="exampleInputEmail1" className="form-label transparent ">
                Email address
              </label>
              <input
                type="email"
                className="form-control transparent"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                value={user.email}
                onChange={handleChange}
              />

              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label transparent">
                Password
              </label>
              <input
                type="password"
                className="form-control transparent"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn transparent" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
