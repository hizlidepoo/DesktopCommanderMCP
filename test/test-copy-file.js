import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { copyFile } from '../dist/tools/filesystem.js';

const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'dc-copy-file-'));
try {
  const source = path.join(dir, 'source.txt');
  const destination = path.join(dir, 'destination.txt');
  const content = 'copy_file keeps the source intact\n';
  await fs.writeFile(source, content, 'utf8');
  await copyFile(source, destination);
  assert.strictEqual(await fs.readFile(source, 'utf8'), content);
  assert.strictEqual(await fs.readFile(destination, 'utf8'), content);
  console.log('✓ copyFile copies content and preserves the source file');
} finally {
  await fs.rm(dir, { recursive: true, force: true });
}
