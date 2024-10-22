import * as fs from "fs";
import * as path from "path";

const EXCLUDED_FOLDERS: string[] = ["node_modules"]; // Add folder names to exclude here

const PATHS: [string, string][] = [
  ["../shared/src", "./.shared/src/"],
  ["../shared/tailwind.config.ts", "./tailwind.config.ts"],
  ["../shared/globals.css", "./src/app/globals.css"],
];

function copyFilesOrDirectories(sourceDestDirs: [string, string][]): void {
  sourceDestDirs.forEach(([source, destination]) => {
    try {
      const sourceStats = fs.statSync(source);

      if (sourceStats.isFile()) {
        const destinationDir = path.dirname(destination);
        if (!fs.existsSync(destinationDir)) {
          fs.mkdirSync(destinationDir, { recursive: true });
        }
        const destinationPath = path.join(
          destinationDir,
          path.basename(source)
        );
        let needsCopy = false;
        if (!fs.existsSync(destinationPath)) {
          needsCopy = true;
        } else {
          needsCopy = !isFileContentEqual(source, destinationPath);
        }

        if (needsCopy) {
          if (fs.existsSync(destinationPath)) {
            fs.chmodSync(destinationPath, 0o644);
          }

          fs.copyFileSync(source, destinationPath);
          console.log(`Copied: ${path.basename(source)}`);
          fs.chmodSync(destinationPath, 0o444);
        }
      } else if (sourceStats.isDirectory()) {
        if (!EXCLUDED_FOLDERS.includes(path.basename(source))) {
          if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
          }
          const contents = fs.readdirSync(source);
          const nestedDirs = contents.map((file) => [
            path.join(source, file),
            path.join(destination, file),
          ]);
          copyFilesOrDirectories(nestedDirs as any);
        }
      }
    } catch (err) {
      console.error(`Error copying ${source}: ${err}`);
    }
  });
}

function isFileContentEqual(file1: string, file2: string): boolean {
  const content1 = fs.readFileSync(file1);
  const content2 = fs.readFileSync(file2);
  return Buffer.compare(content1, content2) === 0;
}

copyFilesOrDirectories(PATHS);
