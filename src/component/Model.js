import { useContext, useState } from "react";
import { contextProvider } from "../global/Context";
import Logo from "../instagramLogo.png";

const Model = () => {
  const { model, closeModel, register, login } = useContext(contextProvider);
  const [state, setState] = useState({
    register: true,
    Login: false,
  });
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const formsToggel = () => {
    setState({
      ...state,
      register: !state.register,
      Login: !state.Login,
    });
  };
  const closeForms = (e) => {
    const className = e.target.getAttribute("class");
    if (className === "model") {
      closeModel();
    }
  };
  const registerUser = (e) => {
    e.preventDefault();
    console.log(inputs);
    register(inputs);
    setInputs({ username: "", email: "", password: "" });
  };
  const userLogin = (e) => {
    e.preventDefault();
    console.log(inputs);
    login(inputs);
  };
  return (
    <>
      {model ? (
        <div className="model" onClick={closeForms}>
          <div className="model__container">
            {state.register ? (
              <div className="model__model__form">
                <form onSubmit={registerUser}>
                  <div className="model__group">
                    <img src={Logo} alt="pic is not display" />
                  </div>
                  <div className="model__group">
                    <input
                      type="text"
                      name="username"
                      className="model__input"
                      placeholder="username..."
                      onChange={handleInput}
                      value={inputs.username}
                      required
                    />
                  </div>

                  <div className="model__group">
                    <input
                      type="email"
                      name="email"
                      className="model__input"
                      placeholder="email..."
                      onChange={handleInput}
                      value={inputs.email}
                      required
                    />
                  </div>
                  <div className="model__group">
                    <input
                      type="password"
                      name="password"
                      className="model__input"
                      placeholder="create password"
                      onChange={handleInput}
                      value={inputs.password}
                      required
                    />
                  </div>
                  <div className="model__group">
                    <input
                      type="submit"
                      value="Register"
                      className="btn btn-smart"
                    />
                  </div>
                  <div className="model__group">
                    <span onClick={formsToggel}>Already have an account ?</span>
                  </div>
                </form>
              </div>
            ) : (
              <div className="model__model__form">
                <form onSubmit={userLogin}>
                  <div className="model__group">
                    <img src={Logo} alt="pic is not display" />
                  </div>

                  <div className="model__group">
                    <input
                      type="email"
                      name="email"
                      className="model__input"
                      placeholder="email..."
                      onChange={handleInput}
                      value={inputs.email}
                      required
                    />
                  </div>
                  <div className="model__group">
                    <input
                      type="password"
                      name="password"
                      className="model__input"
                      placeholder="create password"
                      onChange={handleInput}
                      value={inputs.password}
                      required
                    />
                  </div>
                  <div className="model__group">
                    <input
                      type="submit"
                      value="Login"
                      className="btn btn-smart"
                    />
                  </div>
                  <div className="model__group">
                    <span onClick={formsToggel}>Create a new account ?</span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : (
        " "
      )}
    </>
  );
};

export default Model;
