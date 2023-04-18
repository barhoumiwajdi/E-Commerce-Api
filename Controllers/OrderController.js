const order = require('../Models/OrderModel')
const User = require('../Models/UserModel')
exports.addOrder = async (req, res) => {
  try {
    await order.create(req.body)
    res.send({ message: 'order added succefully', neworder })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.OrderList = async (req, res) => {
  try {
    const Orders = await order.find()
    res.send({ message: 'list of order', Orders })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.OrderById = async (req, res) => {
  try {
    const Order = await order.findById(req.params.id).populate('OrderItems', 'Products')
    res.send({
      message: 'your order wanted ', Order
    })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.updateOrder = async (req, res) => {
  try {
    await order.findByIdAndUpdate(req.params.id, req.body)
    res.send({ message: 'Order updated' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.deleteOrder = async (req, res) => {
  try {
    await order.findByIdAndDelete(req.params.id)
    res.send({ message: 'order deleted' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}