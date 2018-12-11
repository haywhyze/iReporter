import users from './server/models/users';
import seedUsers from './server/seed/users';
import intervention from './server/models/intervention';
import seedIntervention from './server/seed/inervention';
import redflag from './server/models/red-flag';
import seedredflag from './server/seed/red-flag';

(async () => {
  await users();
  await seedUsers();
  await redflag();
  await seedredflag();
  await intervention();
  await seedIntervention();
})();
