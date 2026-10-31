
const servicios = [
  {codigo: "SV001", categoria: "consulta", nombre: "Consulta General", especie: "Perro / Gato", duracion: 30, precio: 15000, observaciones: ""},
  {codigo: "SV002", categoria: "consulta", nombre: "Consulta urgencia", especie: "Perro / Gato", duracion: 30, precio: 25000, observaciones: "Fuera de horario +$10.000"},
  {codigo: "SV003", categoria: "consulta", nombre: "Control postoperatorio", especie: "Perro / Gato", duracion: 20, precio: 10000, observaciones: ""},
  {codigo: "SV004", categoria: "consulta", nombre: "Consulta ave / conejo", especie: "Ave / Conejo", duracion: 30, precio: 18000, observaciones: ""},
  {codigo: "SV005", categoria: "consulta", nombre: "Segunda opinión médica", especie: "Todas", duracion: 40, precio: 20000, observaciones: "Requiere ficha previa"},

  {codigo: "VA001", categoria: "vacunacion", nombre: "Vacuna antirrábica canina", especie: "Perro", duracion: 10, precio: 12000, observaciones: "Obligatoria por ley"},
  {codigo: "VA002", categoria: "vacunacion", nombre: "Vacuna sextuple canina", especie: "Perro", duracion: 10, precio: 18000, observaciones: "Refuerzo anual"},
  {codigo: "VA003", categoria: "vacunacion", nombre: "Vacuna bivalente felina", especie: "Gato", duracion: 10, precio: 15000, observaciones: "Refuerzo anual"},
  {codigo: "VA004", categoria: "vacunacion", nombre: "Vacuna triple felina", especie: "Gato", duracion: 10, precio: 17000, observaciones: "Refuerzo anual"},
  {codigo: "VA005", categoria: "vacunacion", nombre: "Vacuna Bordetella canina", especie: "Perro", duracion: 10, precio: 14000, observaciones: "Tos de las perreras"},
  {codigo: "VA006", categoria: "vacunacion", nombre: "Vacuna antirrábica felina", especie: "Gato", duracion: 10, precio: 12000, observaciones: ""},

  {codigo: "CI001", categoria: "cirugia", nombre: "Esterilización hembra canina", especie: "Perra", duracion: 90, precio: 80000, observaciones: "Incluye anestesia y hospitalización 24h"},
  {codigo: "CI002", categoria: "cirugia", nombre: "Esterilización macho canino", especie: "Perro", duracion: 60, precio: 60000, observaciones: "Incluye anestesia"},
  {codigo: "CI003", categoria: "cirugia", nombre: "Esterilización hembra felina", especie: "Gata", duracion: 60, precio: 65000, observaciones: "Incluye anestesia y hospitalización 12h"},
  {codigo: "CI004", categoria: "cirugia", nombre: "Esterilización macho felino", especie: "Gato", duracion: 45, precio: 50000, observaciones: "Incluye anestesia"},
  {codigo: "CI005", categoria: "cirugia", nombre: "Extirpación de tumor cutáneo", especie: "Perro / Gato", duracion: 60, precio: 120000, observaciones: "Precio referencial; varía según tamaño"},
  {codigo: "CI006", categoria: "cirugia", nombre: "Cesárea de urgencia", especie: "Perra / Gata", duracion: 120, precio: 180000, observaciones: ""},

  {codigo: "DE001", categoria: "desparacitacion", nombre: "Desparasitación interna pequeños (<10 kg)", especie: "Perro", duracion: 5, precio: 8000, observaciones: ""},
  {codigo: "DE002", categoria: "desparacitacion", nombre: "Desparasitación interna medianos (10-25 kg)", especie: "Perro", duracion: 5, precio: 9500, observaciones: ""},
  {codigo: "DE003", categoria: "desparacitacion", nombre: "Desparasitación interna grandes (>25 kg)", especie: "Perro", duracion: 5, precio: 11000, observaciones: ""},
  {codigo: "DE004", categoria: "desparacitacion", nombre: "Desparasitación interna felina", especie: "Gato", duracion: 5, precio: 8000, observaciones: ""},
  {codigo: "DE005", categoria: "desparacitacion", nombre: "Antiparasitario externo (pipeta)", especie: "Perro / Gato", duracion: 5, precio: 7500, observaciones: "Incluye aplicación"},

  {codigo: "EX001", categoria: "examenes", nombre: "Hemograma completo", especie: "Perro / Gato", duracion: 30, precio: 22000, observaciones: "Resultado en 24-48 h"},
  {codigo: "EX002", categoria: "examenes", nombre: "Perfil bioquímico completo", especie: "Perro / Gato", duracion: 30, precio: 35000, observaciones: "Resultado en 24-48 h"},
  {codigo: "EX003", categoria: "examenes", nombre: "Radiografía (1 proyección)", especie: "Perro / Gato", duracion: 20, precio: 28000, observaciones: ""},
  {codigo: "EX004", categoria: "examenes", nombre: "Ecografía abdominal", especie: "Perro / Gato", duracion: 30, precio: 45000, observaciones: ""},
  {codigo: "EX005", categoria: "examenes", nombre: "Test de leishmaniasis", especie: "Perro", duracion: 20, precio: 5000, observaciones: ""},

  {codigo: "OT001", categoria: "otros", nombre: "Corte de uñas", especie: "Perro / Gato", duracion: 15, precio: 5000, observaciones: ""},
  {codigo: "OT002", categoria: "otros", nombre: "Limpieza dental", especie: "Perro / Gato", duracion: 45, precio: 55000, observaciones: "Requiere anestesia"},
  {codigo: "OT003", categoria: "otros", nombre: "Microchip identificación", especie: "Perro / Gato", duracion: 10, precio: 15000, observaciones: "Incluye registro"},
  {codigo: "OT004", categoria: "otros", nombre: "Hospitalización (por día)", especie: "Perro / Gato", duracion: 1440, precio: 30000, observaciones: "Incluye monitoreo y alimentación básica"},
];
