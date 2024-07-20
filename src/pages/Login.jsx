import LoginForm from "../components/forms/LoginForm";

export default function Login() {
  return (
    <>
      <div className=" bg-[#e2e2e2] h-screen flex justify-center">
        <div className="shadow-lg shadow-[#d6d9da] md:h-[95%] self-center justify-center rounded-[20px] bg-[#ffffff] md:flex gap-3 w-[30%]">
          <div className=" flex flex-col items-center justify-center md w-full px-8">
            <p className="text-5xl text-[#292D32] font-extrabold text-center leading-[3rem] md:leading-[4rem] ">
              Logo
            </p>
            <p className="font-bold text-[#292D32] px-4 text-center mt-3 pb-3 md:pb-0">
              UD
            </p>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
