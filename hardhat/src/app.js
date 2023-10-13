const express = require('express');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

class App {
    constructor(controllers, port) {
        this.express = express();
        this.port = port;

        this.initMiddleware();
        this.initControllers(controllers);
    }

    initMiddleware() {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    initControllers(controllers) {
        controllers.forEach(controller => {
            this.express.use('/api', controller.router);
        });
    }

    listen() {
        this.express.listen(this.port, () => {
            console.log(`Node server is listening on port ${this.port}`);
        })
    }


}

module.exports = App;