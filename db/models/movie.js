const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Movie extends Sequelize.Model {}
    Movie.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, //intructs Sequelize to generate the primary key column using the property name defined in the model
        autoIncrement: true
        },
      title: Sequelize.STRING,
      runtime: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "runtime"',
          },
        isAfter: { //checks that a date string holds a date value that is after (or equal to) a given date
            args: '1895-12-27',
            msg: 'Please provide a value on or after "1895-12-28" for "releaseDate"',

        },
          min: { 
            args: 1,
            msg: 'Please provide a value greater than "0" for "runtime"',
  
          },
      },
        allowNull: false, // disallow null
        validate: { 
            notEmpty: {
                msg: 'Please provide a value for "title"', //custom error message
            },
         },

       },
      releaseDate: { 
        type: Sequelize.DATEONLY,
        allowNull: false, // disallow null
        validate: { 
            notEmpty: {
                msg: 'Please provide a value for "title"', //custom error message
            },
         },


       },
      isAvailableOnVHS: { 
        type: Sequelize.BOOLEAN,
        allowNull: false, // disallow null
        defaultValue: false, // set default value
        validate: { 
            notEmpty: {
          msg: 'Please provide a value for "title"', //custom error message
            }
         },


       },
    }, { sequelize });
  
    return Movie;
  };