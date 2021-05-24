import express from 'express';
import {MongoError} from 'mongodb';
import {connect, connection, set, ConnectionOptions} from 'mongoose';
import {environment} from '@src/util/environment';

class Application {
  
  static init() {
    const app = new Application();
    const server = app.instance;
    server.listen(3000 , () => {
      console.log('Server connected');
    });
  }

  /** 
   * @description Instance of exprees
  */
  instance = express();

  /** 
   * @description Load all the dependency
  */
  async load() {
   await this.initMongodbConnection();
  }
  /** 
   * @description Mongoose Intitalization
  */
 async initMongodbConnection(): Promise<void> {
  set('debug', true);
  const {uri , usr, pwd} = environment.mongodb;
  const options: ConnectionOptions = {
    useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
  };
  if (!environment.isLocal) {
    options.user = usr;
    options.pass = pwd;
  } 
  connect(uri , options)
  .catch((err: MongoError) => {
    console.error('Mongodb unable to connected', err);
    process.exit(1);
  });
  await new Promise(connection.once.bind(connection, 'open'));
 }

}

try {
  Application.init();
} catch (error) {
  console.error(error);
}