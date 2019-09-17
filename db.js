const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_nouns')

const Place = conn.define('place', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    // unique: true,
    allowNull: false,
    // notEmpty: false
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
    // notEmpty: false
  },
  name: STRING
});

const Thing = conn.define('thing', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    // unique: true,
    allowNull: false,
    // notEmpty: false
  },
  name: STRING
});

Thing.belongsTo(Person);
Person.hasMany(Thing);
Person.belongsTo(Place);
Place.hasMany(Person);

const sync = async () => {
  await conn.sync({ force: true });

  const place = [
    { name: 'boston' },
    { name: 'la' },
    { name: 'slo' }
  ];
  const [ boston, la, slo ] = await Promise.all(place.map( pla => Place.create(pla)));

  const person = [
    { name: 'moe' },
    { name: 'larry' },
    { name: 'curly' }
  ];
  const [ moe, larry, curly ] = await Promise.all(person.map( per => Person.create(per)));
  await Promise.all([ moe.update({ placeId : boston.id }) ])
  await Promise.all([ larry.update({ placeId : la.id }) ])
  await Promise.all([ curly.update({ placeId : slo.id }) ])

  const things = [
    { name: 'plant' },
    { name: 'pencil' },
    { name: 'stapler' }
  ];
  const [ plant, pencil, stapler ] = await Promise.all(things.map( thi => Thing.create(thi)));
  await Promise.all([ plant.update({ personId : moe.id }) ])
  await Promise.all([ pencil.update({ personId : larry.id }) ])
  await Promise.all([ stapler.update({ personId : curly.id }) ])
};

module.exports = {
  sync,
  models: {
    Place,
    Person,
    Thing
  }
}
