import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import SimpleMDE from 'simplemde';
import emptyImage from '../add-image-empty.png';

import trigger from '../util/trigger';

import util from "../util/util";
import requests from '../requests';
import constants from '../constants';

const DOMAIN = window.location.hostname;

let simplemde = null;
export default class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.product = props.product;
        this.fields = props.fields;
        this.createFields = util.notNull(this.product) ? this.product : {};
        this.state = {
            changed: {}
        }
        this.handleCreateRequest = this.handleCreateRequest.bind(this);
        this.handleOnChangeRequest = this.handleOnChangeRequest.bind(this);
        this.handleOnChangeRequestBlobStore = this.handleOnChangeRequestBlobStore.bind(this);
    }

    handleCreateRequest() {
        let editorValue = "";
        if (simplemde !== null) {
            editorValue = simplemde.value();
            this.createFields["features"] = {
                content: editorValue.split("\n")
            }
        }
        requests.postData(`/api/product`, this.createFields, constants.ACCESS_TOKEN).then(response => {
            if (response.message.insertedCount === 1) {
                window.location.href = "/products"
            } else {
                let message = response.message;
                alert(message);
            }
        });

    }

    handleOnChangeRequest(event) {
        event.preventDefault();
        const id = event.target.id;
        const val = event.target.value;
        this.createFields[id] = val;
        console.log(this.createFields);
        let objectChangeData = {};
        objectChangeData[id] = val;
        this.setState({
            changed: objectChangeData
        });
    }

    handleOnChangeRequestBlobStore(event) {
        event.preventDefault();
        const id = event.target.id;
        const val = event.target.value.split(",");
        this.createFields[id] = val;
        console.log(this.createFields);
        let objectChangeData = {};
        objectChangeData[id] = val;
        this.setState({
            changed: objectChangeData
        });
    }

    render() {
        const renderFields = this.fields.filter(field => !field.hidden)
        const selectedField = renderFields.filter(field => field.type === "selected")[0];
        if (util.notNull(this.product)) {
            return (
                <div className="container-fluid col-12 col-md-9 card shadow mt-3">
                    <div className="card-body row">

                        <Selected field={selectedField} value={this.product[selectedField.key]} onChange={this.handleOnChangeRequest} />

                        <div className="form-row m-1">
                            {
                                renderFields.map(field => {
                                    if (field.section === 'a') {
                                        if (field.type === "statistic") {
                                            if (field.auto_populate && field.auto_populate.require_key !== undefined) {
                                                return <Statistic key={field.key} field={field}
                                                    createFields={this.createFields} value={this.product[field.key]}
                                                    changeData={this.state.changed} onChange={this.handleOnChangeRequest} />
                                            } else {
                                                return <Statistic key={field.key} field={field}
                                                    createFields={this.createFields} value={this.product[field.key]}
                                                    onChange={this.handleOnChangeRequest} />
                                            }
                                        } else if (field.type === "multiSelected") {
                                            return <MultiSelected
                                                field={field} createFields={this.createFields}
                                                value={this.product[field.key]}
                                                onChange={this.handleOnChangeRequestBlobStore}
                                            />
                                        } else {
                                            return <DetechInput key={field.key} createFields={this.createFields}
                                                field={field} value={this.product[field.key]}
                                                onChange={this.handleOnChangeRequest} />
                                        }
                                    }
                                })
                            }
                            <button className="m-3 btn btn-primary" type="submit" onClick={this.handleCreateRequest}> <i className="bi bi-cloud-arrow-up"></i> Lưu Chỉnh Sửa </button>
                            <button className="m-3 btn btn-info float-right"> <a href="/products"> Hủy </a></button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container-fluid col-12 col-md-9 card shadow mt-3">
                    <div className="row">

                        <Selected field={selectedField} onChange={this.handleOnChangeRequest} />

                        <div className="form-row m-1">
                            {
                                renderFields.map(field => {
                                    if (field.section === 'a') {
                                        if (field.type === "statistic") {
                                            if (field.auto_populate && field.auto_populate.require_key !== undefined) {
                                                return <Statistic key={field.key} field={field} createFields={this.createFields} changeData={this.state.changed} onChange={this.handleOnChangeRequest} />
                                            } else {
                                                return <Statistic key={field.key} field={field} createFields={this.createFields} onChange={this.handleOnChangeRequest} />
                                            }
                                        } else if (field.type === "multiSelected") {
                                            return <MultiSelected field={field} createFields={this.createFields} onChange={this.handleOnChangeRequestBlobStore} />
                                        } else {
                                            return <DetechInput key={field.key} createFields={this.createFields} field={field} onChange={this.handleOnChangeRequest} />
                                        }
                                    }
                                })
                            }
                            <button className="m-3 btn btn-primary" type="submit" onClick={this.handleCreateRequest}> <i className="bi bi-cloud-arrow-up"></i> Đăng Sản Phẩm </button>
                            <button className="m-3 btn btn-info float-right"> <a href="/products"> Hủy </a></button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function DetechInput(props) {

    const { field, onChange, createFields, value } = props;
    if (field.type === "input") {
        return <Input field={field} value={value} onChange={onChange} />
    } else if (field.type === "textBox") {
        return <TextBox
            field={field} value={value} onChange={onChange}
        />
    } else if (field.type === "autoPopulate") {
        return <AutoPopulate field={field} value={value} createFields={createFields} onChange={onChange} />
    } else if (field.type === "editor") {
        return <Editor value={value} field={field} />
    }
    else {
        return (
            <div>
            </div>
        )
    }
}

function AutoPopulate(props) {

    const { field, createFields, onChange, value } = props;
    let data = {}
    if (value !== null && value !== undefined) {
        console.log(value);
    } else if (field.auto_populate !== null && createFields[field.key] === undefined) {
        requests.getData(field.auto_populate.url, constants.ACCESS_TOKEN).then(result => {
            console.log(field.key);
            data = result;
            trigger.triggerNativeOnChangeInput(document.getElementById(field.key), data[field.auto_populate.key]);
        });
    }
    return (
        <div key={field.key} className="col-xs-12 col-12 col-md-6 p-1">
            <Form.Label>{field.label}</Form.Label>
            <input type="input" className="form-control"
                id={field.key}
                onChange={onChange}
                value={value}
                readOnly />
        </div>
    )
}

function Statistic(props) {

    const { field, onChange, changeData, createFields, value } = props;

    let data = {}

    if (changeData !== undefined) {
        let queryParams = "";
        const require_keys = field.auto_populate.require_key;
        let status = false;
        require_keys.forEach(require_key => {
            if (changeData[require_key] !== undefined) {
                status = true;
                queryParams += `${require_key}=${changeData[require_key]}`;
            } else {
                status = false;
            }
        });
        if (status) {
            requests.getData(field.auto_populate.url + "?" + queryParams, constants.ACCESS_TOKEN).then(result => {
                data = result;
                trigger.triggerNativeOnChangeInput(document.getElementById(field.key), data[field.auto_populate.key]);
            });
        }
    }

    return (
        <div key={field.key} className="col-xs-12 col-12 col-md-6 p-1">
            <Form.Label>{field.label}</Form.Label>
            <input type="input" className="form-control"
                id={field.key}
                onChange={onChange}
                value={value}
                readOnly />
        </div>
    )

}

function TextBox(props) {

    const { field, onChange, value } = props;

    return (
        <Form.Group className="col-xs-12 col-12 col-md-12 p-1" key={field.key}>
            <Form.Label>{field.label}</Form.Label>
            <Form.Control className="border border-radius"
                id={field.key} as="textarea" rows={5}
                value={value}
                onChange={onChange}
                placeholder={field.label.toLowerCase()}
            />
        </Form.Group>
    )
}

function Input(props) {

    let onChange = props.onChange;

    const { field, value } = props;
    return (
        <div key={field.key} className="col-xs-12 col-12 col-md-6 p-1">
            <Form.Label>{field.label}</Form.Label>
            <input type="input" className="form-control radius"
                id={field.key} placeholder={field.label.toLowerCase()}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.field = this.props.field;
        let value = util.notNull(props.value) ? props.value : {};
        let content = util.notNull(value.content) ? value.content : [];
        this.state = {
            value: content.join("\n")
        }
    }

    async componentDidMount() {
        simplemde = new SimpleMDE({ element: document.getElementById(this.field.key), spellChecker: false });
        if (util.notNull(this.state.value)) {
            simplemde.value(this.state.value);
        }
    }

    async UNSAFE_componentWillMount() {
        simplemde = new SimpleMDE({ element: document.getElementById(this.field.key) });
    }

    render() {

        return simplemde === null ? (
            <div></div>
        ) :
            (
                <div className="col-xs-12 col-12 col-md-12 mt-3 p-1">
                    <textarea id={this.field.key} />
                </div>
            )
    }
}

class MultiSelected extends React.Component {
    constructor(props) {
        super(props);
        let value = util.notNull(props.value) ? props.value : []
        this.state = {
            images: value,
            filesRequest: []
        }
        this.field = this.props.field;
        this.onChange = this.props.onChange;
        this.handleChange = this.handleChange.bind(this);
        this.handleRemoveFilesRequest = this.handleRemoveFilesRequest.bind(this);
        this.handlePostBlob = this.handlePostBlob.bind(this);
    }

    async handleChange(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            let fileRequest = {};
            fileRequest.name = files[i].name;
            fileRequest.type = files[i].type;
            fileRequest.base64 = await getBase64(files[i]);
            console.log(fileRequest);

            this.setState({
                images: this.state.images.concat(URL.createObjectURL(event.target.files[i])),
                filesRequest: this.state.filesRequest.concat(fileRequest)
            });
        }
    }

    async handlePostBlob(event) {
        if (this.state.filesRequest.length !== 0) {
            let responseData = await requests.postData("/blob", { "files": this.state.filesRequest }, constants.ACCESS_TOKEN);
            if (responseData.code === "200") {
                alert("Lưu ảnh lên 'Mây của bạn' thành công");
                let key = this.field.key;
                let populateKey = this.field.auto_populate.key;
                let data = responseData.space.map(_data => _data[populateKey]);
                console.log(data);
                event.target.id = key;
                event.target.value = data;
                console.log(event);
                this.onChange(event);
            } else {
                alert("Lưu ảnh lên 'Mây của bạn' không thành công.")
            }
        }
    }

    async handleRemoveFilesRequest() {
        this.setState({
            images: [],
            filesRequest: []
        })
    }

    render() {
        return (
            <div className="col-xs-12 col-12 col-md-12 p-3 text-center" style={{ alignContent: 'center' }}>
                <div className="container">
                    <div className="row">
                        {
                            this.state.images.length !== 0 ? (
                                this.state.images.map(image => (
                                    <div key={image} className="card thumbnail col-12 col-xs-12 col-md-3 float-left bg-white" style={{ height: '15rem' }}>
                                        <img style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                            src={image.includes(DOMAIN) || image.includes("base64") ? image : `/blob/`.concat(image)}
                                        />
                                    </div>
                                ))
                            ) :
                                (
                                    <div className="card thumbnail col-12 col-xs-12 col-md-2 float-left bg-white" style={{ height: '15rem' }}>
                                        <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={emptyImage} />
                                    </div>
                                )
                        }
                    </div>
                </div>
                <div className="container">
                    <button className="btn btn-light row mt-3">
                        <label className="fileinput-new col-12 mb-3">{this.field.label}: </label>
                        <input className="col-12 col-md-8 mb-3" type="file" id="multiSelectedFile" multiple name="file" onChange={this.handleChange} />
                        <button className="btn btn-info btn-round col-12 col-md-6" onClick={this.handlePostBlob}><i className="bi bi-cloud-arrow-up"></i> Lưu Ảnh Hình Ảnh</button>
                        <button className="btn btn-danger btn-round col-12 col-md-6" onClick={this.handleRemoveFilesRequest}><i className="fa fa-times"></i> Xóa Ảnh Đã Chọn </button>
                    </button>
                </div>
            </div>
        )
    }
}

class Selected extends React.Component {
    constructor(props) {
        super(props);
        let value = util.notNull(props.value) ? props.value : "";
        console.log(value);
        this.state = {
            image: value,
            fileRequest: ""
        }
        this.field = props.field;
        this.onChange = props.onChange;
        this.handleChange = this.handleChange.bind(this);
        this.handlePostBlob = this.handlePostBlob.bind(this);
        this.handleRemoveFilesRequest = this.handleRemoveFilesRequest.bind(this);
    }

    async handleChange(event) {
        const files = event.target.files;
        let fileRequest = {};
        fileRequest.name = files[0].name;
        fileRequest.type = files[0].type;
        fileRequest.base64 = await getBase64(files[0]);
        console.log(fileRequest);

        console.log(URL.createObjectURL(event.target.files[0]));
        this.setState({
            image: URL.createObjectURL(event.target.files[0]),
            fileRequest: fileRequest
        });
    }

    async handlePostBlob(event) {
        if (this.state.filesRequest !== "") {
            let responseData = await requests.postData(`/blob`, { "files": [this.state.fileRequest] }, constants.ACCESS_TOKEN);
            if (responseData.code === "200") {
                alert(responseData.message);
                let key = this.field.key;
                let data = responseData.space[0][this.field.auto_populate.key];
                event.target.id = key;
                event.target.value = data;
                this.onChange(event);
            } else {

            }
        }
    }

    async handleRemoveFilesRequest() {
        this.setState({
            image: "",
            fileRequest: ""
        })
    }

    render() {
        let image = util.notNull(this.state.image) ? this.state.image : "";
        return (
            <div className="container text-center" style={{ alignContent: 'center' }}>
                <div className="fileinput-new thumbnail img-raised" style={{ height: '25rem' }}>
                    <img style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        src={image === "" ? emptyImage : (
                            image.includes(DOMAIN) ? image : `/blob/`.concat(image))}
                    />
                </div>
                <div>
                    <button className="btn btn-light container mt-3">
                        <label className="fileinput-new mb-3 col-12">{this.field.label}</label>
                        <input className="mb-3 col-12 col-md-8" type="file" id="selectedFile" name="file" onChange={this.handleChange} />
                        <button className="btn btn-info btn-round col-12 col-md-6" onClick={this.handlePostBlob}><i className="bi bi-cloud-arrow-up"></i> Lưu Ảnh Hình Ảnh</button>
                        <button className="btn btn-danger btn-round col-12 col-md-6" onClick={this.handleRemoveFilesRequest}><i className="fa fa-times"></i> Xóa Ảnh Đã Chọn </button>
                    </button>
                </div>
            </div>
        )
    }
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(encoded);
        };
        reader.onerror = error => reject(error);
    });
}
