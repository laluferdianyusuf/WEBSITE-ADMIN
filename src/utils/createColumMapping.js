const createColumnMapping = (data, headers) => {
  // Ambil contoh objek pertama dari data untuk mendeteksi properti
  const exampleRow = data[0];

  // Gunakan nama properti di objek data sebagai key untuk mapping
  return headers.reduce((acc, header) => {
    const key =
      Object.keys(exampleRow).find((key) =>
        key.toLowerCase().includes(header.toLowerCase().replace(/ /g, "_"))
      ) || header; // Gunakan header sebagai fallback
    acc[header] = key;
    return acc;
  }, {});
};

export default createColumnMapping;