# linagora.esn.calendar.map
Map module for OpenPaaS calendar

This repository contains source code of calendar map module for OpenPaaS ESN.

## Install

The current module is not enabled by default in the OpenPaaS ESN repository :
You need to add `linagora.esn.calendar.map` in the file `config/Default.json`.

Doing an `npm install` from there will install and enable the office module in OpenPaaS.

## Develop

### 1. Clone linagora.esn.calendar.map

```
git clone git+https://github.com/linagora/linagora.esn.calendar.map.git
cd linagora.esn.calendar.map
```

### 2. Install dependencies and link in OpenPaaS

*Note: The following instructions assumes that you have already installed OpenPaaS ESN in the path referenced by $ESN below.*

In order to develop, you will have to run several commands from your favorite terminal:
  1. In the current repository, install dependencies with `npm install`
  2. In the current repository, use `npm link` to symlink packages
  3. In your OpenPaaS ESN repository, link the calendar map module
```
cd $ESN
npm link linagora.esn.calendar.map
```