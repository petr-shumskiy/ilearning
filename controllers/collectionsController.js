const errorHandler = require('../utils/errorHandler')
const Collection = require('../models/Collection')

const getAllCollections = async (req, res) => {

  const owner_id = req.params.id
  console.log(owner_id)
  try {
    const collections = await Collection.findAll({where: {
      owner_id

      }
      })
    res.status(200).json({collections})
  } catch (error) {
    errorHandler(res,
      400,
      'failed get collections',
      error)
  }
}

const getCollectionById = async (req, res) => {
  try {
    const {id} = req.params
    const collection = await Collection.findByPk(id)
    if (collection) {
      res.status(200).json({collection})
    } else {
      errorHandler(res,
        404,
        'collection not found')
    }
  } catch (error) {
    errorHandler(res,
      400,
      'failed get collection',
      erro)
  }
}

const createCollection = async (req, res) => {
  try {
    const {collection} = req.body
    const owner_id = req.user.id
    console.log('OWNER', owner_id)
    await Collection.create({
       ...collection,
      owner_id
    })
    res.status(201).json({})

  } catch (error) {
    errorHandler(res,
      400,
      'failed create collection',
      error)
  }
}

const updateCollection = async (req, res) => {
  try {
    const {collection} = req.body
    await Collection.update(collection, {where: {
      id: collection.id
      }})
    res.status(201).json({})
  } catch (error) {
    errorHandler(res,
      400,
      'failed update collection',
      error)
  }
}

const deleteCollection = async (req, res) => {
  try {
    console.log(req.params)
    const {id} = req.params
    console.log(id)
    await Collection.destroy({where: {
      id
      }})
    res.status(204).json({})
  } catch (error) {
    errorHandler(res,
      400,
      'failed delete collection',
      error)
  }
}

module.exports = {
  getAllCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection
}