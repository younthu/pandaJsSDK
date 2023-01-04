#! /usr/bin/env node --inspect
import repl from 'repl'
import Client from './src/index.js'

// both Client and client work in console.
global.client = Client;
Client.Configure('http://localhost:3000')
repl.start()