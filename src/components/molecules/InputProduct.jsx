import { useState, useEffect } from "react";
import InputNotaField from "./InputNotaField";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiMinusCircle } from "react-icons/fi";
import InputField from "./InputField";
import Button from "../atoms/Button";
import PropTypes from "prop-types";

export default function InputProduct({ closeModal, isOpen, initialData, isEdit }) {
  const [inputs, setInputs] = useState(initialData?.pesanan || [
    { item: "", quantity: "", harga_unit: "", total_harga: "" },
  ]);
  const [namaHotel, setNamaHotel] = useState(initialData?.namaHotel || "");
  const [totalHarga, setTotalHarga] = useState(0);

  const handleAddInput = (event) => {
    event.preventDefault();
    setInputs([
      ...inputs,
      { item: "", quantity: "", harga_unit: "", total_harga: "" },
    ]);
  };

  const handleRemoveInput = (index, event) => {
    event.preventDefault();
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    const { name, value } = event.target;
    newInputs[index][name] = value;
    setInputs(newInputs);
  };

  const handleNamaHotel = (event) => {
    setNamaHotel(event.target.value);
  };

  useEffect(() => {
    const calculateTotalHarga = () => {
      const total = inputs.reduce((acc, input) => {
        const totalHargaBarang = parseInt(input.total_harga) || 0;
        return acc + totalHargaBarang;
      }, 0);
      setTotalHarga(total);
    };

    calculateTotalHarga();
  }, [inputs]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, closeModal]);

  const handleClickOutside = (event) => {
    if (event.target.classList.contains("modal-backdrop")) {
      closeModal();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      namaHotel,
      pesanan: inputs,
      totalHarga,
    };
    console.log("Submitted data:", data);
    closeModal();
  };

  return isOpen ? (
    <div
      className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
      onClick={handleClickOutside}
    >
      <div className="bg-custom-white-1 rounded-lg flex flex-col gap-5 py-6 px-14 relative w-3/4 max-h-[90vh] overflow-y-auto">
        <div className="font-semibold text-center">
          <h4 className="text-slate-300 text-[10px] mb-1">
            UD TIMUR JAYA RAYA
          </h4>
          <h3 className="text-slate-900 text-lg">
            {isEdit ? "Edit Nota" : "Buat Nota Baru"}
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-11/12 mb-3">
            <InputField
              label="Nama Hotel"
              placeholder="Masukkan nama hotel"
              name="nama_hotel"
              onChange={handleNamaHotel}
              isModal={true}
              value={namaHotel}
              type="text"
            />
          </div>
          {inputs.map((input, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-3 mb-3 items-center relative w-11/12"
            >
              <InputNotaField
                label="Nama Item"
                name="item"
                type="text"
                placeholder="Masukkan nama produk"
                value={input.item}
                onChange={(e) => handleInputChange(index, e)}
                isModal={true}
              />
              <InputNotaField
                label="Quantity"
                name="quantity"
                type="text"
                placeholder="Jumlah"
                value={input.quantity}
                onChange={(e) => handleInputChange(index, e)}
                isModal={true}
              />
              <InputNotaField
                label="Harga / Unit"
                name="harga_unit"
                type="number"
                placeholder="Harga"
                value={input.harga_unit}
                onChange={(e) => handleInputChange(index, e)}
                isModal={true}
              />
              <InputNotaField
                label="Total Harga Barang"
                name="total_harga"
                type="number"
                placeholder="Total Harga"
                value={input.total_harga}
                onChange={(e) => handleInputChange(index, e)}
                isModal={true}
              />
              <div className="absolute right-[-3rem] top-[10px] flex justify-center items-center h-full">
                {inputs.length > 1 && (
                  <button
                    className="text-custom-green-1 p-2"
                    onClick={(event) => handleRemoveInput(index, event)}
                  >
                    <FiMinusCircle size={32} />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-6 mb-6">
            <button
              className="text-custom-green-1 p-2 rounded"
              onClick={handleAddInput}
            >
              <IoMdAddCircleOutline size={32} />
            </button>
          </div>
          <p className="text-xs text-slate-900">
            Total tagihan: {totalHarga.toLocaleString()}
          </p>
          <div className="mt-[18px] flex gap-[18px]">
            <Button onClick={closeModal} text="Batal" />
            <Button
              backgroundColor="bg-custom-green-1"
              type="submit"
              text={isEdit ? "Simpan Perubahan" : "Buat Nota Baru"}
            />
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

InputProduct.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  initialData: PropTypes.object,
  isEdit: PropTypes.bool,
};
