const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500;
const verifytoken = require('./middleware/verifytoken.js')
const mongoose = require('mongoose')
const dbconnection = require('./config/databaseConnect.js');
const { connect } = require('http2');

//connect to mongoDB
dbconnection()
// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

app.use(cookieParser())

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));

app.use('/register', require('./routes/api/register.js'));
app.use('/login', require('./routes/api/loging.js'));
app.use('/refres', require('./routes/api/refreshtoken.js'))
app.use('/logout', require('./routes/api/logout.js'))

app.use(verifytoken)
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);


mongoose.connection.once("open", () =>
    {console.log('mongodb connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
)

