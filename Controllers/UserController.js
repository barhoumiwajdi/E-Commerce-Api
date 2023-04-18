const user = require('../Models/UserModel');

exports.getuser = async (req, res) => {
  try {
    const users = await user.find()
    res.send({ message: 'list of users', users })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.updateuser = async (req, res) => {
  try {
    await user.findByIdAndUpdate(req.params.id, req.body)
    res.send({ message: 'user updated' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.deleteuser = async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id)
    res.send({ message: 'user deleted succefully' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}