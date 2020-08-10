// Simplified method of validator/lib/isEmail
function isEmail(string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(string);
}

export function email(value) {
  return value && !isEmail(value.trim()) ? 'Email inválido' : null;
}

function isDirty(value) {
  return value || value === 0;
}

export function required(requiredFields, values) {
  return requiredFields.reduce(
    (fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: 'Obligatorio' }),
    }),
    {},
  );
}

export function password(value) {
  return value && (value.length < 8 || value.length > 20) && 'Debe tener de 8 a 20 caracteres.';
}
