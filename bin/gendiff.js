#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'display help for command')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<file1> <file2>')
  .action((file1, file2) => {
    const diff = genDiff(file1, file2, program.option);
    console.log(diff);
  });

program.parse();
