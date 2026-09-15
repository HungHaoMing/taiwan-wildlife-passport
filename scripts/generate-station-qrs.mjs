import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import QRCode from 'qrcode';
import { eventConfig } from '../src/config/eventConfig.js';
import { stationUrl } from '../src/stationUrl.js';

const [baseUrl, outputArgument = 'qr-output'] = process.argv.slice(2);

if (!baseUrl) {
  console.error('Usage: npm run generate:qrs -- <deployed-base-url> [output-directory]');
  process.exitCode = 1;
} else {
  let parsedBase;
  try {
    parsedBase = new URL(baseUrl);
  } catch {
    console.error('The deployed base URL must be a complete http:// or https:// URL.');
    process.exitCode = 1;
  }

  if (parsedBase && !['http:', 'https:'].includes(parsedBase.protocol)) {
    console.error('The deployed base URL must use http:// or https://.');
    process.exitCode = 1;
  } else if (parsedBase) {
    const outputDirectory = path.resolve(outputArgument);
    await mkdir(outputDirectory, { recursive: true });
    const links = [];
    for (const animal of eventConfig.animals) {
      const url = stationUrl(parsedBase, animal);
      const filename = `qr-${animal.id}.png`;
      await QRCode.toFile(path.join(outputDirectory, filename), url, {
        width: 1040,
        margin: 2,
        errorCorrectionLevel: 'M',
        color: { dark: '#102e27', light: '#ffffff' },
      });
      links.push(`${animal.id}\t${url}\t${filename}`);
    }
    await writeFile(path.join(outputDirectory, 'station-links.tsv'), `${links.join('\n')}\n`, 'utf8');
    console.log(`Generated ${links.length} station QR codes in ${outputDirectory}`);
  }
}
