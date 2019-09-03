require('env-yaml').config({ path: './.env.yaml' })

console.log(process.env.TEST_SECRET)