import { useState, useEffect } from "react";
import InputNotaField from "./InputNotaField";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiMinusCircle } from "react-icons/fi";
import InputField from "./InputField";
import Button from "../atoms/Button";

export default function InputProduct() {
  const [inputs, setInputs] = useState([
    { item: "", quantity: "", harga_unit: "", total_harga: "" },
  ]);
  const [namaHotel, setNamaHotel] = useState("");
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

  return (
    <div className="bg-custom-white-1 rounded-lg flex flex-col gap-5 w-fit py-6 px-14">
      <div className="font-semibold text-center">
        <h4 className="text-slate-300 text-[10px] mb-1">UD TIMUR JAYA RAYA</h4>
        <h3 className="text-slate-900 text-lg">Buat Nota Baru</h3>
      </div>
      <form action="">
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
              type="number"
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
          <Button text="Cancel" backgroundColor="white"/>
          <Button
            text="Buat nota"
            type={"submit"}
            backgroundColor="custom-green-1"
          />
        </div>
      </form>
    </div>
  );
}
