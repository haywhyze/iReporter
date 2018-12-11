import redflag from './server/models/red-flag';
import seedredflag from './server/seed/red-flag';

(async () => {
  await redflag();
  await seedredflag();
})();
