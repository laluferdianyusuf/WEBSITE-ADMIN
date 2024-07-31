import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../redux/slices/adminSlice";
import InputField from "../molecules/InputField";
import ButtonSubmit from "../atoms/ButtonSubmit";
import PropTypes from "prop-types";

export default function LoginForm({ onLoginSuccess, onLoginFailure }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.admin);

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin({ username, password }))
      .unwrap()
      .then((response) => {
        onLoginSuccess(response);
      })
      .catch((error) => {
        onLoginFailure(error);
      });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
      <InputField
        label="Username"
        type="text"
        placeholder="Input Username"
        value={username}
        onChange={handleChange}
        name="username"
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Input Password"
        value={password}
        onChange={handleChange}
        name="password"
      />
      <ButtonSubmit
        text={loading ? "Loading..." : "Login"}
        backgroundColor="bg-custom-green-2"
        onClick={handleFormSubmit}
        disabled={loading}
      />
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </form>
  );
}

LoginForm.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
  onLoginFailure: PropTypes.func.isRequired,
};
