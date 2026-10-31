
const productos = [
  { codigo: "ME001", categoria: "antibioticos", nombre: "Amoxibay 250mg", descripcion: "Amoxicilina — Blíster de 10 comprimidos. Para perro y gato. Stock disponible: 45 unidades.", precio: 4200, stock: 45, stockCritico: 10 },
  { codigo: "ME002", categoria: "antibioticos", nombre: "Enrox 50mg", descripcion: "Enrofloxacino — Blíster de 10 comprimidos. Para perro y gato. Stock disponible: 30 unidades.", precio: 6800, stock: 30, stockCritico: 8 },
  { codigo: "ME003", categoria: "antibioticos", nombre: "Metrobay 250mg", descripcion: "Metronidazol — Blíster de 10 comprimidos. Para perro y gato. Stock disponible: 28 unidades.", precio: 3900, stock: 28, stockCritico: 8 },

  { codigo: "ME004", categoria: "antiparasitarios", nombre: "Nexgard", descripcion: "Afoxolaner — Masticable, 1 unidad. Para perro. Stock disponible: 60 unidades.", precio: 9500, stock: 60, stockCritico: 15 },
  { codigo: "ME005", categoria: "antiparasitarios", nombre: "Bravecto", descripcion: "Fluralaner — Masticable, 1 unidad. Para perro. Stock disponible: 40 unidades.", precio: 18900, stock: 4, stockCritico: 10 },
  { codigo: "ME006", categoria: "antiparasitarios", nombre: "Revolution Plus", descripcion: "Selamectina + Sarolaner — Pipeta, 1 unidad. Para gato. Stock disponible: 35 unidades.", precio: 14500, stock: 35, stockCritico: 8 },
  { codigo: "ME007", categoria: "antiparasitarios", nombre: "Drontal Plus", descripcion: "Praziquantel + Pamoato — Comprimido, 1 unidad. Para perro. Stock disponible: 80 unidades.", precio: 3200, stock: 80, stockCritico: 15 },
  { codigo: "ME008", categoria: "antiparasitarios", nombre: "Milbemax Gato", descripcion: "Milbemicina + Praziquantel — Comprimido, 2 unidades. Para gato. Stock disponible: 50 unidades.", precio: 6800, stock: 50, stockCritico: 10 },

  { codigo: "ME009", categoria: "antiinflamatorios", nombre: "Meloxicam 1mg", descripcion: "Meloxicam — Blíster de 10 comprimidos. Para perro y gato. Stock disponible: 55 unidades.", precio: 4500, stock: 55, stockCritico: 12 },
  { codigo: "ME010", categoria: "antiinflamatorios", nombre: "Carprofen 50mg", descripcion: "Carprofeno — Blíster de 10 comprimidos. Para perro. Stock disponible: 30 unidades.", precio: 9800, stock: 30, stockCritico: 8 },

  { codigo: "ME011", categoria: "dermatologia", nombre: "Clorhexidina shampoo", descripcion: "Clorhexidina 2% — Frasco de 250ml. Para perro y gato. Stock disponible: 25 unidades.", precio: 8900, stock: 25, stockCritico: 6 },
  { codigo: "ME012", categoria: "dermatologia", nombre: "Malaseb shampoo", descripcion: "Miconazol + Clorhexidina — Frasco de 250ml. Para perro y gato. Stock disponible: 20 unidades.", precio: 12500, stock: 20, stockCritico: 5 },
  { codigo: "ME013", categoria: "dermatologia", nombre: "Apoquel 16mg", descripcion: "Oclacitinib — Blíster de 10 comprimidos. Para perro. Stock disponible: 18 unidades.", precio: 22000, stock: 18, stockCritico: 5 },

  { codigo: "ME014", categoria: "digestivo", nombre: "Probifor", descripcion: "Bacillus clausii — Sobres de 5ml, caja de 10. Para perro y gato. Stock disponible: 40 unidades.", precio: 5600, stock: 40, stockCritico: 10 },
  { codigo: "ME015", categoria: "digestivo", nombre: "Omeprazol 10mg vet", descripcion: "Omeprazol — Blíster de 10 comprimidos. Para perro y gato. Stock disponible: 35 unidades.", precio: 3800, stock: 35, stockCritico: 8 },

  { codigo: "ME016", categoria: "cardiaco", nombre: "Vetmedin 2.5mg", descripcion: "Pimobendan — Blíster de 10 comprimidos. Para perro. Stock disponible: 15 unidades.", precio: 28000, stock: 15, stockCritico: 5 },

  { codigo: "ME017", categoria: "analgesicos", nombre: "Tramadol 50mg vet", descripcion: "Tramadol — Blíster de 10 comprimidos. Para perro. Stock disponible: 22 unidades.", precio: 5200, stock: 22, stockCritico: 6 },

  { codigo: "ME018", categoria: "vacunas", nombre: "Nobivac DHPPi", descripcion: "Vacuna polivalente — Vial, 1 dosis. Para perro. Stock disponible: 48 unidades.", precio: 8500, stock: 48, stockCritico: 10 },
  { codigo: "ME019", categoria: "vacunas", nombre: "Nobivac Rabies", descripcion: "Vacuna antirrábica — Vial, 1 dosis. Para perro y gato. Stock disponible: 60 unidades.", precio: 5800, stock: 6, stockCritico: 15 },
  { codigo: "ME020", categoria: "vacunas", nombre: "Felocell CVR", descripcion: "Vacuna triple felina — Vial, 1 dosis. Para gato. Stock disponible: 36 unidades.", precio: 7200, stock: 36, stockCritico: 8 },

  { codigo: "ME021", categoria: "suplementos", nombre: "Omega vet 3-6-9", descripcion: "Ácidos grasos omega — Frasco de 100ml. Para perro y gato. Stock disponible: 30 unidades.", precio: 9900, stock: 3, stockCritico: 8 },
  { codigo: "ME022", categoria: "suplementos", nombre: "Condrovet forte", descripcion: "Condroitina + Glucosamina — Blíster de 30 comprimidos. Para perro. Stock disponible: 25 unidades.", precio: 14500, stock: 25, stockCritico: 6 },
];
