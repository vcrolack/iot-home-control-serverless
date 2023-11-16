/* ------ GENERAL VALIDATIONS -------- */
const isValidDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toString() !== 'Invalid Date';
};



/* ------ MODULES VALIDATIONS ------- */
const pantryValidator = (data) => {
  const errors = [];

  // NombreItem validations
  if (!data.NombreItem || data.NombreItem.trim().length === 0) {
    errors.push('Name is required');
  } else if (data.NombreItem.length < 3) {
    errors.push('Name must be at least 3 characters');
  } else if (typeof(data.NombreItem) !== 'string') {
    errors.push('Name must be a string');
  }

  // FechaCompra validations
  if (!isValidDate(data.FechaCompra)) {
    errors.push('FechaCompra must be a valid date');
  }

  // FechaCaducidad validations
  if (!isValidDate(data.FechaCaducidad)) {
    errors.push('FechaCompra must be a valid date');
  }

  // CantidadDisponible validations
  if (data.CantidadDisponible <= 0) {
    errors.push('CantidadDisponible must be greater than 0');
  } else if (typeof(data.CantidadDisponible) !== 'number') {
    errors.push('CantidadDisponible must be a number');
  }

  // UnidadesMedida validations
  if (!data.UnidadesMedida || data.UnidadesMedida.trim().length === 0) {
    errors.push('UnidadesMedida is required');
  } else if (data.UnidadesMedida.length < 1) { 
    errors.push('UnidadesMedida must be at least 1 characters');
  } else if (typeof(data.UnidadesMedida) !== 'string') {
    errors.push('UnidadesMedida must be a string');
  }

  // PropietarioID validations
  if (!data.PropietarioID) {
    errors.push('PropietarioID is required');
  } else if (typeof(data.PropietarioID) !== 'number') {
    errors.push('PropietarioID must be a number');
  };

  return errors;
};



module.exports = { 
  pantryValidator
};