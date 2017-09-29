<h1 align="center">
  <a href="http://www.pinkbean.xyz/"><img src="http://www.pinkbean.xyz/image/pinkbean.png" width="256px" alt="Pink Bean"></a>
  <br />
  Pink Bean
  <br />
</h1>
<h4 align="center">A multi-purpose bot for MapleStory.</h4>
<p align="center">
  <a href="https://discord.gg/wBUKQhN" target="_blank"><img src="https://discordapp.com/api/guilds/275541650024169472/embed.png" alt="Discord"></a>
  <a href="https://david-dm.org/telunc/pinkbean" title="dependencies status"><img src="https://david-dm.org/telunc/pinkbean/status.svg"/></a>
  <a href="https://travis-ci.org/telunc/pinkbean" target="_blank"><img src="https://travis-ci.org/telunc/pinkbean.svg?branch=master"></a>
</p>

## Contributing Guideline
1. Fork the repo. To preserve quality commits and for safety, only Pink Bean team members may commit directly to our repository. To contribute an update or otherwise commit that resolves an Issue, you will need to first fork a copy to your own account. For more information about creating a fork, [click here](https://help.github.com/articles/fork-a-repo/).
2. Create a unique branch name. To prevent possible branch conflicts, we recommend using a unique name such as "fixes-item-bug" or your github username. For more information on creating a branch, [click here](https://help.github.com/articles/creating-and-deleting-branches-within-your-repository/).
3. Push your commit. After you've created your branch, commit the changes you've made and make sure to merge it.
4. Create a pull request. To properly submit your changes to this repository, you will need to create a pull request and then compare your branch to our master branch. For more information on creating pull requests from a remote branch, [click here](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)

## Installation Instruction
#### Native
1. Install MySQL Database
2. Install Redis
3. Install <a href="https://nodejs.org/en/">NodeJS and NPM</a>
4. For Linux, please have `build-essential` and `python 2.7` installed
5. Clone the directory. `git clone https://github.com/telunc/pinkbean-discord.git`
6. Install dependencies with `npm install`
7. Create production.json in /config folder. Please refer to default.json.
8. Launch MySQL and Redis servers
9. Start Pink Bean with `npm start`

#### Docker
1. Install MySQL Database
2. Install Redis
3. Install <a href="https://www.docker.com/">Docker</a>
4. Clone the directory. `git clone https://github.com/telunc/pinkbean-discord.git`
5. Create production.json in /config folder. Please refer to default.json.
6. Launch MySQL and Redis servers
7. Start Pink Bean with `sh build.sh`
