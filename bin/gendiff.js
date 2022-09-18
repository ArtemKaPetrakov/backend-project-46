#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'display help for command')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format <type>',  'output format')
  .arguments('<file1> <file2>')


program.parse();