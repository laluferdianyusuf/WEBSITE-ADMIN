import { useState } from "react";
import InputField from "../molecules/InputField";
import ButtonSubmit from "../atoms/ButtonSubmit";
import PropTypes from "prop-types";

export default function LoginForm({handleSubmit}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <form className="flex flex-col gap-4">
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
        text="Login"
        backgroundColor="bg-custom-green-2"
        onClick={handleSubmit}
      />
    </form>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func
}