import React from "react";
import ReactMarkdown from "react-markdown";

function CollectionPage({id, title, theme, description, lastTimeUpdated,  //todo add img
                        onShow, deleteHandler}) {
  return (
      <div className="card collection bg-warning">
        <div className="card-body">
          <div className="row ">
            <h5 className="card-title col-sm-12 d-flex justify-content-between">
              <ReactMarkdown source={title}/>
              <div>
                <button className="btn btn-primary p-2 mr-2" onClick={onShow}>
                  <h4 className="fa fa-wrench p-0 m-0"/>
                </button>
                <button className="btn btn-danger p-2" onClick={() => deleteHandler(id)}>
                  <h4 className="fa fa-trash p-0 m-0"/>
                </button>
              </div>
            </h5>
            <h6 className="card-subtitle mb-2 text-muted col-sm-12"><ReactMarkdown source={theme}/></h6>
            <p className="card-text col-sm-12"><ReactMarkdown source={description}/></p>
            <small>{lastTimeUpdated}</small>
          </div>
        </div>
      </div>
  )
}


export default CollectionPage