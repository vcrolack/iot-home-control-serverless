/* ------ GENERAL VALIDATIONS -------- */
const isValidDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toString() !== 'Invalid Date';
};

const validateSchema = (data, validProperties) => {
  const errors = [];
  const dataProperties = Object.keys(data);

  dataProperties.forEach(prop => {
      if (!validProperties.includes(prop)) {
          errors.push(`Property ${prop} is not valid`);
      }
  });

  return errors; 
}


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


const userValidator = (data) => {
  const validProperties = ['NombreUsuario', 'CorreoElectronico', 'Ubicacion', 'ConfiguracionNotificacion', 'Contrasena'];
  let errors = [];

  const schemaErrors =  validateSchema(data, validProperties);
  if (schemaErrors.length > 0) return schemaErrors;


  // NombreUsuario validations
  if (!data.NombreUsuario || data.NombreUsuario.trim().length === 0) {
    errors.push('Name is required');
  } else if (data.NombreUsuario.length < 1) {
    errors.push('Name must be at least 3 characters');
  } else if (typeof(data.NombreUsuario) !== 'string') {
    errors.push('Name must be a string');
  } else if (data.NombreUsuario.length > 40) {
    errors.push('Name must be less than 40 characters');
  }

  // CorreoElectronico validations
  if (!data.CorreoElectronico) {
    errors.push('CorreoElectronico is required');    
  } else if (!data.CorreoElectronico.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    errors.push('CorreoElectronico must be a valid email');
  }

  // Contrasena validations
  if (!data.Contrasena){
    errors.push('Contrasena is required');
  } else if (!data.Contrasena.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
    errors.push('Contrasena must be a valid password');
  }

  // Ubicacion validations (OPTIONAL)
  if(data.Ubicacion) {
    if (data.Ubicacion.trim().length === 0) {
      errors.push('Ubicacion can not be empty');
    } else if (typeof(data.Ubicacion) !== 'string') {
      errors.push('Ubicacion must be a string');
    } else if (data.Ubicacion.length > 40) {
      errors.push('Ubicacion must be less than 40 characters');
    } else if (data.Ubicacion.length < 3) {
      errors.push('Ubicacion must be at least 3 characters');
    }
  }

  // ConfiguracionNotificacion validations (OPTIONAL)
  if(data.ConfiguracionNotificacion) {
    if (data.ConfiguracionNotificacion.trim().length === 0) {
      errors.push('ConfiguracionNotificacion can not be empty');
    } else if (typeof(data.ConfiguracionNotificacion) !== 'string') {
      errors.push('ConfiguracionNotificacion must be a string');
    } else if (data.ConfiguracionNotificacion.length > 40) {
      errors.push('ConfiguracionNotificacion must be less than 40 characters');
    } else if (data.ConfiguracionNotificacion.length < 3) {
      errors.push('ConfiguracionNotificacion must be at least 3 characters');
    }
  }

  return errors;

}



module.exports = { 
  pantryValidator,
  userValidator
};