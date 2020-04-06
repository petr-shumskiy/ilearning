import React, {useEffect, useState} from "react";
import CollectionPage from "../../../dumb/CollectionPage";
import withServices from "../../../hoc/withServices";
import {bindActionCreators} from "redux";
import {getCollections} from "../../../../actions/actions";
import {connect} from "react-redux";
import CreateCollection from "./CreateCollection";
import formatDate from "../../../../utils/formatDate";
function CollectionPageContainer({token, collectionService, collectionList, getCollections, currentUserId}) {   //todo structure of page (navbar, body: list with collections)

  const [isShow, setShow] = useState(false)
  const [collection, setCollection] = useState({})
  const [currentCollectionId, setId] = useState(null)

  useEffect(() => {
     getCollections(currentUserId)
  }, [getCollections])

  const inputHandler = (event) => {
    setCollection({...collection, [event.target.name]: event.target.value})
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    //todo tostify success and failure messages
    console.log('COLLECTION', collection)
    try {
      await collectionService.createCollection(token, collection)
      await getCollections(currentUserId)
      setCollection({})
      setShow(false)

    } catch (e) {
      console.log(e) //todo catch error
      setCollection({})
      setShow(false)
      getCollections(currentUserId)
    }
  }

  const updateHandler = (token) => async () => {
    console.log('update')
    try {
      await collectionService.updateCollection(token, {id: currentCollectionId, ...collection})
      getCollections(currentUserId)
      setShow(false)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteHandler = (token) => async (id) => {
    try {
      console.log(currentCollectionId)
      await collectionService.deleteCollection(token, id)
      getCollections(currentUserId)
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div className="container">
        <div className="row mt-5">
        {collectionList.map((collection) => {
          return (
            <div className="col-sm-4 mb-4">
              <CollectionPage
                id={collection.id}
                title={collection.title}
                theme={collection.theme}
                description={collection.description}
                img={collection.img}
                lastTimeUpdated={formatDate(collection.updatedAt)}
                onHide={() => setShow(false)}
                onShow={() => {setShow(true); setId(collection.id)}}
                updateHandler={updateHandler(token)}
                deleteHandler={deleteHandler(token)}
              />
            </div>
              )})}
            <div className="col-sm-4 mb-4" onClick={() => setShow(true)}>
              <div className="card plus">
                <div className="card-body">
                  <h4 className="align-self-center align-content-center"><span className="fa fa-plus"/><p>add new collection</p></h4>
                </div>
              </div>
            </div>
        <CreateCollection
          backdrop={'static'}
          show={isShow}
          onHide={() => setShow(false)}
          inputHandler={inputHandler}
          submitHandler={submitHandler}
          updateHandler={updateHandler(token)}
        />
      </div>
    </div>
      )
}

const mapStateToProps = (state) => {
  return {
    collectionList: state.collectionList,
    currentUserId: state.currentUserId,
    token: state.token
  }
}

const mapDispatchToProps = (dispatch, {collectionService}) => {
  return bindActionCreators({
    getCollections: getCollections(collectionService)
  }, dispatch)
}

export default withServices(connect(mapStateToProps, mapDispatchToProps)(CollectionPageContainer))