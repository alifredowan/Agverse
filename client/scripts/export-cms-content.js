import { writeFileSync } from 'node:fs';
import { defaultPage, defaultSettings } from '../src/data/cmsDefaults.js';

const file = new URL('../../backend/database/seeders/cms-content.json', import.meta.url);
writeFileSync(file, JSON.stringify({ home: defaultPage, site: defaultSettings }, null, 2) + '\n');

