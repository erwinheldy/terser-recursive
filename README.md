# terser-recursive
Run terser on a folder recursively, auto minify the results into .min.js file.

## Installation
`npm i terser-recursive -g`

## Example
`terser-recursive --input=dist/js --verbose`

## Options
- `--input=[dir]`             Input directory
- `--config=[config.json]`    Terser configuration file. Using `terser-recursive.config.js` if exist
- `--verbose`                 Enable verbose
