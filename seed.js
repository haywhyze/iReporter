import dotenv from 'dotenv';
import redflag from './server/models/red-flag';
import seedredflag from './server/seed/red-flag';
import intervention from './server/models/intervention';
import seedintervention from './server/seed/inervention';
import users from './server/models/users';
import seedusers from './server/seed/users';

dotenv.config();

(async () => {
  await users();
  await redflag();
  await intervention();

  await seedusers();
  await seedredflag();
  await seedintervention();
})();
