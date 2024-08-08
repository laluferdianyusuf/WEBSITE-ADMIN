import { useState, useEffect } from "react";
import InputNotaField from "./InputNotaField";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiMinusCircle } from "react-icons/fi";
import Button from "../atoms/Button";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { addBills, listBills } from "../../redux/slices/billSlice";
import { getHotels } from "../../redux/slices/hotelSlice";
import { getProducts } from "../../redux/slices/productSlice";
import Select from "react-select";
import SuccessNotification from "../atoms/SuccessNotification";

export default function InputProduct({
  closeModal,
  isOpen,
  initialData,
  isEdit,
}) {
  const dispatch = useDispatch();
  const { hotels } = useSelector((state) => state.hotel);
  const { products } = useSelector((state) => state.product);
  const [inputs, setInputs] = useState([
    { item: null, quantity: "", harga_unit: "", total_harga: "" },
  ]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [totalHarga, setTotalHarga] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    dispatch(getHotels());
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddInput = (event) => {
    event.preventDefault();
    setInputs([
      ...inputs,
      { item: null, quantity: "", harga_unit: "", total_harga: "" },
    ]);
  };

  const handleBatal = () => {
    closeModal();
    setInputs([{ item: null, quantity: "", harga_unit: "", total_harga: "" }]);
    setSelectedHotel(null);
    setSelectedDate(new Date().toISOString().split("T")[0]);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleRemoveInput = (index, event) => {
    event.preventDefault();
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const extractNumericValue = (input) => {
    const match = input.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    const { name, value } = event.target;
    newInputs[index][name] = value;
    if (name === "quantity" || name === "harga_unit") {
      const quantity = extractNumericValue(newInputs[index].quantity);
      const unitPrice = parseFloat(newInputs[index].harga_unit) || 0;
      newInputs[index].total_harga = (quantity * unitPrice).toString();
    }
    setInputs(newInputs);
  };

  const handleProductChange = (index, selectedOption) => {
    const newInputs = [...inputs];
    newInputs[index].item = selectedOption || null;
    setInputs(newInputs);

    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`item-${index}`];
      return newErrors;
    });
  };

  const handleHotelChange = (selectedOption) => {
    setSelectedHotel(selectedOption);

    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.selectedHotel;
      return newErrors;
    });
  };

  useEffect(() => {
    const calculateTotalHarga = () => {
      const total = inputs.reduce((acc, input) => {
        const totalHargaBarang = parseInt(input.total_harga, 10) || 0;
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

  const validateForm = () => {
    const errors = {};
    if (!selectedHotel) {
      errors.selectedHotel = "Please select a hotel.";
    }

    inputs.forEach((input, index) => {
      if (!input.item) {
        errors[`item-${index}`] = "Please select a product.";
      }
      if (!input.quantity) {
        errors[`quantity-${index}`] = "Quantity is required.";
      }
      if (!input.harga_unit) {
        errors[`harga_unit-${index}`] = "Price per unit is required.";
      }
      if (!input.total_harga) {
        errors[`total_harga-${index}`] = "Total price is required.";
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const products = inputs.map((input) => ({
      productName: input.item?.label || "",
      quantity: input.quantity,
      productPrice: parseFloat(input.harga_unit),
      total: parseFloat(input.total_harga),
    }));

    const billData = {
      hotelId: selectedHotel.value,
      billData: products,
    };

    try {
      await dispatch(addBills(billData))
        .unwrap()
        .then(() => {
          setIsSuccess(true);
          dispatch(listBills());
          setTimeout(() => {
            setIsSuccess(false);
            closeModal();
          }, 3000);
          setInputs([
            { item: "", quantity: "", harga_unit: "", total_harga: "" },
          ]);
          setSelectedHotel(null);
          setSelectedDate(new Date().toISOString().split("T")[0]);
        })
        .catch((error) => validateForm());
    } catch (error) {
      console.error("Error creating bill:", error);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "0px 0px",
      border: state.isFocused ? "1px solid #48bb78" : "1px solid #94A3B8",
      borderRadius: "0.5rem",
      boxShadow: state.isFocused ? "0 0 0 2px #48bb78" : null,
      "&:hover": {
        borderColor: "#48bb78",
      },
      fontSize: window.matchMedia("(min-width: 1024px)").matches
        ? "12px"
        : "10px",
      color: "#0f172a",
      fontWeight: "500",
      minHeight: "38px",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      maxHeight: "200px",
      overflowY: "auto",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#48bb78" : provided.backgroundColor,
      color: state.isSelected ? "#fff" : "#48bb78",
      fontSize: window.matchMedia("(min-width: 1024px)").matches
        ? "12px"
        : "10px",
      lineHeight: "1rem",
    }),
  };

  const hotelArray = Array.isArray(hotels.hotel) ? hotels.hotel : [];
  const handleSelectHotel = hotelArray
    ? hotelArray.map((hotel) => ({ value: hotel.id, label: hotel.hotelName }))
    : [];

  const productArray = Array.isArray(products.product) ? products.product : [];
  const handleSelectProduct = productArray
    ? productArray.map((product) => ({
        value: product.id,
        label: product.name,
      }))
    : [];

  return isOpen ? (
    <div
      className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
      onClick={handleClickOutside}
    >
      <div className="bg-custom-white-1 rounded-lg flex flex-col gap-5 py-6 px-14 relative w-11/12 lg:w-3/4 max-h-[90vh] overflow-y-auto">
        <div className="font-semibold text-center">
          <h4 className="text-slate-300 text-[10px] mb-1">
            UD TIMUR JAYA RAYA
          </h4>
          <h3 className="text-slate-900 text-lg">
            {isEdit ? "Edit Nota" : "Buat Nota Baru"}
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-11/12 mb-3 flex gap-3">
            <div className="w-1/2">
              <label className="block mb-2 text-[10px] lg:text-xs font-medium text-slate-900">
                Nama Hotel
              </label>
              <Select
                options={handleSelectHotel}
                value={selectedHotel}
                onChange={handleHotelChange}
                placeholder="Masukkan Nama Hotel"
                isClearable
                styles={customStyles}
              />
              {validationErrors.selectedHotel && (
                <span className="text-red-500 text-xs">
                  {validationErrors.selectedHotel}
                </span>
              )}
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-[10px] lg:text-xs font-medium text-slate-900">
                Tanggal
              </label>
              <input
                type="date"
                className="px-[10px] py-[7px] border rounded-lg border-slate-400 focus:outline-none focus:ring-2 focus:ring-custom-green-1 text-slate-400 font-medium w-full h-9 text-xs"
                max={new Date().toISOString().split("T")[0]}
                value={selectedDate}
                onChange={handleDateChange}
                required
              />
              {validationErrors.tanggalNota && (
                <span className="text-red-500 text-xs">
                  {validationErrors.tanggalNota}
                </span>
              )}
            </div>
          </div>
          {inputs.map((input, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-3 mb-3 items-center relative w-11/12"
            >
              <div className="col-span-1">
                <label className="block text-[10px] lg:text-xs font-medium text-slate-900 mb-[0.5px]">
                  Nama Produk
                </label>
                <Select
                  options={handleSelectProduct}
                  value={input.item}
                  onChange={(selectedOption) =>
                    handleProductChange(index, selectedOption)
                  }
                  placeholder="Pilih Produk"
                  isClearable
                  styles={customStyles}
                />
                {validationErrors[`item-${index}`] && (
                  <span className="text-red-500 text-xs">
                    {validationErrors[`item-${index}`]}
                  </span>
                )}
              </div>
              <InputNotaField
                label="Quantity"
                name="quantity"
                type="text"
                placeholder="Jumlah"
                value={input.quantity}
                onChange={(e) => handleInputChange(index, e)}
                isModal={true}
              />
              {validationErrors[`quantity-${index}`] && (
                <span className="text-red-500 text-xs">
                  {validationErrors[`quantity-${index}`]}
                </span>
              )}
              <InputNotaField
                label="Harga / Unit"
                name="harga_unit"
                type="number"
                placeholder="Harga"
                value={input.harga_unit}
                onChange={(e) => handleInputChange(index, e)}
                isModal={true}
              />
              {validationErrors[`harga_unit-${index}`] && (
                <span className="text-red-500 text-xs">
                  {validationErrors[`harga_unit-${index}`]}
                </span>
              )}
              <InputNotaField
                label="Total Harga Barang"
                name="total_harga"
                type="number"
                placeholder="Total Harga"
                isReadOnly={true}
                value={input.total_harga}
                onChange={(e) => handleInputChange(index, e)}
                isModal={true}
              />
              {validationErrors[`total_harga-${index}`] && (
                <span className="text-red-500 text-xs">
                  {validationErrors[`total_harga-${index}`]}
                </span>
              )}
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
          <div className="flex justify-center mt-6 mb-6 relative w-11/12">
            <div className="border-b border-slate-400 absolute left-0 top-6 w-[45%]"></div>
            <div className="border-b border-slate-400 absolute right-0 top-6 w-[45%]"></div>
            <button
              className="text-custom-green-1 p-2 rounded z-30"
              onClick={handleAddInput}
            >
              <IoMdAddCircleOutline size={32} />
            </button>
          </div>
          <p className="text-xs text-slate-900">
            Total tagihan: {totalHarga.toLocaleString()}
          </p>
          <div className="mt-[18px] flex gap-[18px]">
            <Button onClick={handleBatal} text="Batal" />
            <Button
              backgroundColor="bg-custom-green-1"
              type="submit"
              text={isEdit ? "Simpan Perubahan" : "Buat Nota Baru"}
            />
          </div>
        </form>
      </div>
      {isSuccess && <SuccessNotification text="Nota Berhasil Dibuat" />}
    </div>
  ) : null;
}

InputProduct.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  initialData: PropTypes.object,
  isEdit: PropTypes.bool,
};
