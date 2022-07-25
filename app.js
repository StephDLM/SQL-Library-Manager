const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'movies.db'
}); //holds Sequelize instance you can intact with 
// async IIFE
(async () => { //defines an asynchronous function. 
    try {
        await sequelize.authenticate();
        console.log('Connection to the database successful!');
    } catch (error) {
      console.log('Error connecting to database', error);
    }
})();

// Movie model
class Movie extends Sequelize.Model {}

(async () => {
  
})();