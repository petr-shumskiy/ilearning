import React from "react";
import {Modal} from "react-bootstrap";
//import Dropzone from 'react-dropzone'

function CreateCollection(props) {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="bg-opacity"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>Creating new collection</h3>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
        <form className="form-signup" onSubmit={props.submitHandler}>
          <input
            type="text"
            className="form-control"
            placeholder="title"
            required={true}
            name="title"
            onChange={props.inputHandler}
          />
          <br/>
          <input
            type="text"
            className="form-control"
            placeholder="theme"
            required={true}
            name="theme"
            onChange={props.inputHandler}
          />
          <br/>
          <input
            type="text"
            className="form-control"
            placeholder="tags"
            required={true}
            name="tags"
            onChange={props.inputHandler}
          />
          <br/>
            <textarea
            rows={5}
            aria-rowspan={3}
            className="form-control"
            placeholder="description"
            required={true}
            name="description"
            onChange={props.inputHandler}
          />
          <br/>
          <div style={{height: 200}}>
          {/*<Dropzone maxSize={200}>*/}
          {/*  {({getRootProps, getInputProps}) => (*/}
          {/*    <div {...getRootProps()}>*/}
          {/*      <input {...getInputProps()} />*/}
          {/*      <p style={{height: 200, textAlign: 'center'}}>Drag n' drop some files here, or click to select files</p>*/}
          {/*    </div>*/}
          {/*  )}*/}
          {/*</Dropzone>*/}
          </div>
        </form>
        </div>
        </Modal.Body>
      <Modal.Footer>
        <button type="submit" className="btn btn-success mt-5" onClick={props.updateHandler}>save</button>
        <button type="submit" className="btn btn-success mt-5" onClick={props.submitHandler}>add</button>
        <button className="btn btn-dark mt-5" onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateCollection


