import { execSync } from "child_process";
import * as path from "path";

const PACKAGES: [string, string[]][] = [
  ["./shared", ["npm install"]],
];

function runAt(packages: [string, string[]][]): void {
  packages.forEach(([folder, commands]) => {
    const fullPath = path.resolve(__dirname, folder);
    try {
      process.chdir(fullPath);

      commands.forEach((command) => {
        execSync(command, { stdio: "inherit" });
      });

      console.log(`Ran ${commands} in ${folder}`);
    } catch (err) {
      console.error(`Error running commands in ${folder}: ${err}`);
    }
  });
}

runAt(PACKAGES);
