import {readFileSync} from 'fs';
import {join} from 'path';

const dir = process.cwd();
console.log(dir , process.env);

export const environment = ((env : 'local' | 'dev' | 'prod') => {
  const envPath = join(process.cwd(), 'environment', `${env}.json`);
  try {
    const config: any = readFileSync(envPath , {encoding: 'utf8'});
    return config;
  } catch (error) {
    console.error('>> Environment Load Error');
      console.error(error.message);
      process.exit(0);
  }
})(process.env.NODE_ENV as any);

