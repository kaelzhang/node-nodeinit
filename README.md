# nodeinit

Creates a most frequent scaffold of your node.js project for the first commit.

## Why ?

I was awefully insane about creating new node.js projects, creating new github repo, cloning, `npm init`, .gitignore, travis-ci config, `git init` ............

We might as well: 

```bash
nodeinit https://github.com/kaelzhang/nodeinit.git # and done!
```

## Installation

```bash
$ npm install -g nodeinit
```

## Usage

```bash
$ nodeinit <repo> [--email <email>] [--npm_user <npm-user>]
```

`nodeinit` can not analysis your email and npm user name from the repo, so you must pass them to `nodeinit` for the first time you run the command.

After this, the configuration will be saved into `~/.nodeinit`.

Also, you could edit the file as you wish.

### ~/.nodeinit

Usually, you can config your `~/.nodeinit` file like this:

```ini
email = i@kael.me

; will be saved as `package.author` in package.json
npm_user = kael

; if not specified, nodeinit will parse the user name from the clone URL.
user = kael
```