const axios = require("axios");
const pkg = require('./package.json')
const fs = require('fs/promises')

async function main() {
  const catalogueReq = await axios(
    "https://catalogue.nodered.org/catalogue.json"
  );

  const modules = catalogueReq.data.modules;
  pkg.dependencies = {}
  modules.forEach(module => {
      pkg.dependencies[module.id] = module.version
  })

  await fs.writeFile('package.json', JSON.stringify(pkg, null, 2))
  console.log('Done... All node-red packages have been written to package.json')
  console.log('You should not try to run npm install on it')
  console.log('Might take hours!')
}

main();
