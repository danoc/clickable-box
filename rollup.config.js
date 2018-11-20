import babel from "rollup-plugin-babel";
import path from "path";
import fs from "fs";

const PACKAGE_ROOT_PATH = process.cwd();

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(PACKAGE_ROOT_PATH, "package.json"))
);

// Get deps and peerDeps so that rollup knows they are externals.
const dependencies = Object.keys(pkg.dependencies || {});
const peerDependencies = Object.keys(pkg.peerDependencies || {});
const external = dependencies.concat(peerDependencies);

const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, "index.jsx");
const OUTPUT_DIR = path.join(PACKAGE_ROOT_PATH, "dist");

const shared = {
  input: INPUT_FILE,
  plugins: [babel({ configFile: "../../babel.config.js" })],
  external
};

const es = {
  output: {
    file: path.join(OUTPUT_DIR, "index.es.js"),
    format: "es",
    sourcemap: true
  },
  ...shared
};

const cjs = {
  output: {
    file: path.join(OUTPUT_DIR, "index.cjs.js"),
    format: "cjs",
    sourcemap: true
  },
  ...shared
};

export default [es, cjs];
