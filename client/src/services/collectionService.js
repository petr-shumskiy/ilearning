import axios from 'axios'

class CollectionService {
  getAllCollections = async (currentUserId) => {  //todo headers?
    const {data} = await axios.get(`/api/collection/${currentUserId}`, {
      data: currentUserId
      })
      return data.collections
  }

  getCollectionById = async (collectionId) => {
    const {data} = await axios.get(`/api/collection/${collectionId}`)
    return data.collection
  }

  createCollection = async (token, collection) => {
    const {data} = await axios.post(`/api/collection`, {
      collection
    }, {
      headers: {
        'Authorization': token
      }
    })
    return data.collection
  }

  updateCollection = async (token, collection) => {
    await axios.put(`/api/collection/${collection.id}`, {
      collection
    }, {
      headers: {
        'Authorization': token
      }
    })
  }

  deleteCollection = async (token, collectionId) => {
    await axios.delete(`/api/collection/${collectionId}`, {
      headers: {
        'Authorization': token
      }
    })
  }

}

export default CollectionService