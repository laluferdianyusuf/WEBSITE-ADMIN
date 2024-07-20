import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPasswords = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form action="" className="mt-3 w-[90%]">
        <div className="mb-6 w-full">
          <input
            type="email"
            placeholder="Input Username"
            className="input input-bordered w-full my-4"
          />
          <span className="flex relative w-full mb-4">
            <input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Input Password"
              className="input input-bordered w-full"
            />
            <button
              onClick={handleShowPasswords}
              type="button"
              className="bg-transparent px-2 rounded-lg absolute right-0 bottom-0 top-0"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </span>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Remember me</span>
              <input type="checkbox" defaultChecked className="checkbox" />
            </label>
          </div>
          <div>
            <button
              className="w-full bg-[#292D32] py-3 rounded-lg mb-3 text-white"
              type="submit"
            >
              Login
            </button>
            <Link to="dashboard">Go to Dashboard</Link>
          </div>
        </div>
      </form>
    </>
  );
}
