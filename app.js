const db = require('./db');
const { Movie, Person } = db.models;

(async () => {
  await db.sequelize.sync({ force: true });


  try {

    const movieById = await Movie.findByPk(1); //All model instances
    console.log(movieById.toJSON());

    const movie = await Movie.create({
      title: 'Hereditary',
      runtime: 126,
      releaseDate: '2018-07-08',
      isAvailableOnVHS: false,
      
    });
    console.log(movie.toJSON());

    const movie2 = await Movie.create({
      title: "",
      runtime: 104,
      releaseDate: '2017-02-24',
      isAvailableOnVHS: false,
    });
    console.log(movie2.toJSON());

    const person = await Person.create({
        firstName: 'Stella',
        lastName: 'Dilami',
      });
      console.log(person.toJSON());

    const movie3 = await Movie.build({
        title: 'Interstellar',
        runtime: 103,
        releaseDate: '2010-06-18',
        isAvailableOnVHS: false,
    });
    await movie3.save(); // save the record
    console.log(movie3.toJSON());
  

  } catch (error) {
    if (error.name === 'SequelizeValidationError') { 
        const errors = error.errors.map(err => err.message);
        console.error('Validation errors: ', errors);
    } else {
        throw error;
     } }
})();
