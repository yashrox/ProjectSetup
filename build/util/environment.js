"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const dir = process.cwd();
console.log(dir, process.env);
exports.environment = ((env) => {
    const envPath = path_1.join(process.cwd(), 'environment', `${env}.json`);
    try {
        const config = fs_1.readFileSync(envPath, { encoding: 'utf8' });
        if (env === 'local')
            config.isLocal = true;
        else
            config.isLocal = true;
        return config;
    }
    catch (error) {
        console.error('>> Environment Load Error');
        console.error(error.message);
        process.exit(0);
    }
})(process.env.NODE_ENV);
