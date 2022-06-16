const { Router } = require('express')
const router = new Router()

router.get('/', (req, res) => {
  
  res.sendFile(process.cwd() + '/public/index.html')
})

router.get('/:id', (req, res) => {
  res.sendFile(process.cwd() + '/public/edit.html')
})

module.exports = router
