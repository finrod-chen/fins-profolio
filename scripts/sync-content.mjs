#!/usr/bin/env node
/**
 * sync-content.mjs
 *
 * 從 D:\DOCUMENTS\ASTRO-BLOG\SRC\CONTENT 把 markdown 內容同步到本專案的 src/content/。
 * 用法:
 *   node scripts/sync-content.mjs            # 從預設來源
 *   node scripts/sync-content.mjs --src <path>
 *
 * 設計成冪等: 只複製 .md 檔, 不動其他東西; 目標資料夾不存在會建立。
 */

import { cp, mkdir, rm, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const target = join(projectRoot, "src", "content");

// Parse args
const args = process.argv.slice(2);
const srcIdx = args.indexOf("--src");
const source = srcIdx >= 0
  ? resolve(args[srcIdx + 1])
  : "D:\\DOCUMENTS\\ASTRO-BLOG\\SRC\\CONTENT";

console.log(`[sync-content] source: ${source}`);
console.log(`[sync-content] target: ${target}`);

if (!existsSync(source)) {
  console.error(`[sync-content] ❌ 來源不存在: ${source}`);
  process.exit(1);
}

// Wipe target (keep folder), then copy
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });

// Only copy directories that contain .md (skip assets, etc.)
const entries = await readdir(source, { withFileTypes: true });
let totalFiles = 0;
const summary = [];

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  const fromDir = join(source, entry.name);
  const toDir = join(target, entry.name);
  await cp(fromDir, toDir, { recursive: true });

  // Count .md files
  const count = await countMd(toDir);
  totalFiles += count;
  summary.push(`  · ${entry.name.padEnd(20)} ${count} 篇`);
}

console.log("\n[sync-content] ✓ 同步完成:");
console.log(summary.join("\n"));
console.log(`\n  總計 ${totalFiles} 篇 markdown`);

async function countMd(dir) {
  let n = 0;
  const items = await readdir(dir, { withFileTypes: true });
  for (const it of items) {
    if (it.isFile() && it.name.toLowerCase().endsWith(".md")) n++;
    else if (it.isDirectory()) n += await countMd(join(dir, it.name));
  }
  return n;
}
