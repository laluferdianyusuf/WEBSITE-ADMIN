import Button from "../components/atoms/Button";
import ActionButton from "../components/atoms/ActionButton";
import { FaEdit, FaTrash } from "react-icons/fa";
import LoginForm from "../components/organism/LoginForm";
export default function Slicing() {
  return (
    <div className="p-16 flex flex-col gap-10">
      <div className="w-1/2 grid grid-cols-2">
        <Button text="Kembali" />
        <Button text="Logout" backgroundColor="bg-custom-green-1" />
      </div>
      <div className="w-1/2 grid grid-cols-2">
        <ActionButton onClick={() => alert("Update button clicked")}>
          <FaEdit className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Update</p>
        </ActionButton>
        <ActionButton onClick={() => alert("Delete button clicked")}>
          <FaTrash className="mr-[6px]" size={16} />
          <p className="text-slate-900 font-semibold text-xs">Delete</p>
        </ActionButton>
      </div>
      <div className="w-1/2">
        <LoginForm />
      </div>
    </div>
  );
}
