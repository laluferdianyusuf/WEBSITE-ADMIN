import { useState } from "react";
import LoginForm from "../organism/LoginForm";
import ModalConfirmation from "../molecules/ModalConfirmation";
import PropTypes from "prop-types";

export default function Login({ onLogin }) {
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const handleLoginSuccess = (response) => {
    onLogin(response);
  };

  const handleLoginFailure = () => {
    setIsLoginFailed(true);
  };

  const handleCloseModal = () => {
    setIsLoginFailed(false);
  };

  return (
    <div className="overflow-auto px-9 py-6 h-[93vh] bg-custom-white-1 mt-5 mr-5 ml-5 rounded-lg flex flex-col items-center justify-center">
      <div className="w-1/2 flex flex-col gap-16 mb-10">
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-slate-900 text-[26px] font-semibold">
            Halo Admin UD Timur Jaya Raya
          </h3>
          <p className="text-slate-400 text-xs">
            Silahkan login untuk mengakses database anda
          </p>
        </div>
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onLoginFailure={handleLoginFailure}
        />
      </div>
      <ModalConfirmation
        headText="Login Gagal"
        title="Periksa Username / Password Anda"
        textOk="Coba Lagi"
        functionOk={handleCloseModal}
        isOpen={isLoginFailed}
      />
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
