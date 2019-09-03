require('env-yaml').config({ path: './.env.yaml' })

exports.myFunction = (req, res) => {
  const cors = require('cors')()

  cors(req, res, () => {
    myFunction(req, res)
  })
}

const myFunction = async (req, res) => {
    res.send(process.env.TEST_SECRET)
}