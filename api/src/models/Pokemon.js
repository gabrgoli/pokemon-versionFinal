const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey:true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ataque: {
      type : DataTypes.INTEGER,
      allowNull:false
    },
    defensa: {
      type:DataTypes.INTEGER,
    },
    velocidad: {
      type: DataTypes.INTEGER,
    },
    altura: {
      type: DataTypes.INTEGER,
    },
    peso:{
      type: DataTypes.INTEGER,
    },
    imagen:{
      type: DataTypes.STRING(12345),
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};
