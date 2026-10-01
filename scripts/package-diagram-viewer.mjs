import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

// Explicit allowlist: never bundle repository files, environment or credentials.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'Demonstração do Diagrama');
const files = ['index.html', 'viewer.css', 'viewer.js', 'diagrama.svg', 'favicon.svg', 'LEIA-ME.txt'];
for (const name of files) if (!fs.existsSync(path.join(dir, name))) throw new Error(`Missing ${name}`);
execFileSync('python3', ['-c', `
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import re, sys
folder = Path(sys.argv[1])
files = sys.argv[2:]
with ZipFile(folder / 'coremotiom-diagrama.zip', 'w', ZIP_DEFLATED) as z:
    for name in files:
        data = (folder / name).read_bytes()
        if name == 'index.html':
            # Downloading the source package must not recursively embed itself.
            data = re.sub(r'<a class="text-button package".*?</a>', '', data.decode(), flags=re.S).encode()
        z.writestr(name, data)
print('Pacote criado: coremotiom-diagrama.zip')
`, dir, ...files], { stdio: 'inherit' });
