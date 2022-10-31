export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }
  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}
const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];
const mensajeDeError = {
  nombre: {
    valueMissing: "Este campo no puede estar vacio",
  },
  email: {
    valueMissing: "Este campo correo no puede estar vacio",
    typeMismatch: "El correo no es valido",
  },
  password: {
    valueMissing: "El campo contraseña no puede estar vacío",
    patternMismatch:
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "Este campo fecha no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad",
  },
  numero: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
  },
  ciudad: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres.",
  },
  estado: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El estado debe contener entre 10 a 40 caracteres.",
  },
};
const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};
function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajeDeError[tipoDeInput][error]);
      mensaje = mensajeDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}
function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }
  input.setCustomValidity(mensaje);
}
function mayorEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
