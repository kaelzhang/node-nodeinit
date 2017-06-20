#!/usr/bin/env node

'use strict'

var gu = require('githuburl')
var Scaffold = require('scaffold-generator')
var node_path = require('path')
var mkdirp = require('mkdirp')
var fs = require('fs')
var mustache = require('mustache')


var spawns = require('spawns')
var ini = require('ini')

var argv = require('minimist')(process.argv.slice(2))

var repo = argv._.pop()

function fail (message, code) {
  process.stderr.write(message + '\n')
  process.exit(code || 1)
}

function log (message) {
  process.stdout.write(message + '\n')
}


var Usage = [
  'Usage: nodeinit <git-clone-url> [options]',
  'options:',
  '  --email <email>',
  '  --npm_user <npm-user>',
  '  --user <user>'

].join('\n')


if (!repo) {
  fail(Usage)
}

var parsed = gu(repo)
var basename = parsed.repo
var name = parsed.repo.replace(/^node-/i, '')
var js_name = name.replace(/^\d+/, '').replace(/-/g, '_')

var home = require('home-dir')()
var config_file = node_path.join(home, '.nodeinit')

var config_exists = fs.existsSync(config_file)
var config = config_exists
  ? ini.parse( fs.readFileSync(config_file).toString() )
  : {}

var email = argv.email || config.email

if (!email) {
  fail(
    'email is not configured, `--email` option should be specified:\n' +
    '\n' +
    '   nodeinit ' + repo + ' --email <email>'
  )
}

if (!config.email && argv.email) {
  fs.writeFileSync(config_file, ini.stringify(argv))
}

var data = {
  basename: basename,
  name: name,
  js_name: js_name,
  user: argv.user || config.user || parsed.user,
  email: email,
  npm_user: argv.npm_user || config.npm_user || parsed.user,
  ignore_file: '.gitignore',
  npm_ignore_file: '.npmignore'
}

var cwd = argv.cwd || process.cwd()
var dir = node_path.join(cwd, name)

// Yeah, I used a lot of sync fs here which is not a good practice.
// But nodeinit is not a project that concerns high performance.
// So, just make it simple
if ( fs.existsSync(dir) ) {
  fail('Directory "' + name + '" already exists')
} else {
  mkdirp.sync(dir)
}

var template_root = node_path.join(__dirname, '..', 'root')

new Scaffold({
  data: data,
  override: argv.force,
  render: mustache.render

}).copy(template_root, dir)
.then(() => {
  spawns([
    'git init',
    'git add -A',
    'git commit -a -m "first commit"',
    'git remote add origin ' + repo,
    // 'git push origin master'

  ], {
    stdio: 'inherit',
    cwd: dir

  }, function (code, signal) {
    process.exit(code)
  })
})
.catch(err => {
  fail(err.stack)
})
