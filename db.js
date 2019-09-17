const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-nouns')

const Thing = conn.define('thing', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    unique: true,
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
    unique: true,
    allowNull: false,
    notEmpty: false
  },
  name: STRING
});

const sync = async () => {
  await conn.sync({ force: true });
  const things = [

  ];
  await Promise.all(products.map( product => Product.create(product)));
};

sync();