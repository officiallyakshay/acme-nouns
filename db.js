const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_nouns')

const Thing = conn.define('thing', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    // unique: true,
    allowNull: false,
    notEmpty: false
  },
  name: STRING
});

const Person = conn.define('person', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    // unique: true,
    allowNull: false,
    notEmpty: false
  },
  name: STRING
});

const Place = conn.define('place', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    // unique: true,
    allowNull: false,
    notEmpty: false
  },
  name: STRING
});

Thing.belongsTo(Person);
Person.hasMany(Thing);

Person.belongsTo(Place);
Place.hasMany(Person);

const sync = async () => {
  await conn.sync({ force: true });

  const things = [
    { name: 'plant' },
    { name: 'pencil' },
    { name: 'stapler' }
  ];
  await Promise.all(things.map( thi => Thing.create(thi)));

  const person = [
    { name: 'moe' },
    { name: 'larry' },
    { name: 'curly' }
  ];
  await Promise.all(person.map( per => Person.create(per)));

  const place = [
    { name: 'boston' },
    { name: 'la' },
    { name: 'slo' }
  ];
  await Promise.all(place.map( pla => Place.create(pla)));

};

module.exports = {
  sync,
  models: {
    Thing,
    Person,
    Place
  }
}
