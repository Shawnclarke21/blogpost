const path = require('path');
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const sessionConfig = {
    secret: process.env.DB_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs.create({ helpers }).engine);
app.set('view engine', 'handlebars');
app.use(session(sessionConfig));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});