"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const environment_1 = require("@src/util/environment");
class Application {
    constructor() {
        /**
         * @description Instance of expree
        */
        this.instance = express_1.default();
    }
    static init() {
        const app = new Application();
        const server = app.instance;
        server.listen(3000, () => {
            console.log('Server connected');
        });
    }
    /**
     * @description Load all the dependency
    */
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initMongodbConnection();
        });
    }
    /**
     * @description Mongoose Intitalization
    */
    initMongodbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose_1.set('debug', true);
            const { uri, usr, pwd } = environment_1.environment.mongodb;
            const options = {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };
            if (!environment_1.environment.isLocal) {
                options.user = usr;
                options.pass = pwd;
            }
            mongoose_1.connect(uri, options)
                .catch((err) => {
                console.error('Mongodb unable to connected', err);
                process.exit(1);
            });
            yield new Promise(mongoose_1.connection.once.bind(mongoose_1.connection, 'open'));
        });
    }
}
try {
    Application.init();
}
catch (error) {
    console.error(error);
}
