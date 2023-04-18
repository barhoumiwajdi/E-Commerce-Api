const product = require('../Models/ProductModel')
const category = require('../Models/CatgeoryModel')

exports.getProduct = async (req, res) => {
  try {
    const products = await product.find()
    res.send({ message: 'list of products', products })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.getbyIDProduct = async (req, res) => {
  try {
    const product = await product.findById(req.params.id)
    res.send({
      message: 'the desired product', product
    })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.addProduct = async (req, res) => {
  try {
    const found = await product.findOne({ Name: req.body.Name })
    if (found) {
      res.status(400).send({ message: 'Product name already exist please use different name' })
    }
    else {
      const idCategory = await category.findOne({ Name: req.body.Category })
      if (idCategory) {
        const newProduct = await product.create(req.body)
        res.status(200).send({ message: 'product added succefully' })
        await category.findByIdAndUpdate(idCategory, { $push: { Products: newProduct._id } })

      }
      else {
        res.status(400).send({ message: 'Category name is not found , please verify the category of the product' })
      }
    }
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.updateProduct = async (req, res) => {
  try {
    await product.findByIdAndUpdate(req.params.id, req.body)
    res.send({ message: 'product updated' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.deleteProduct = async (req, res) => {
  try {
    await product.findByIdAndDelete(req.params.id)
    res.send({ message: 'product deleted' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.getProductPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.body
    const products = await product.find({ Price: { $gte: minPrice, $lte: maxPrice } })
    if (products.length === 0) {
      return res.status(404).send({ message: `Aucun produit trouvé dans l'intervalle de prix ${minPrice} - ${maxPrice}` })
    }
    else {
      res.status(200).send({ message: `${products.length} produits compris entre ${minPrice} et ${maxPrice}`, products })
    }
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}