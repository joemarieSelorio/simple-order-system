import { runSeeders } from 'typeorm-extension';
import { connectionSource } from '../../ormconfig';
import * as dotenv from 'dotenv';
dotenv.config();

(async () => {
  connectionSource.initialize().then(async () => {
    await runSeeders(connectionSource);
    process.exit();
  });
})();
