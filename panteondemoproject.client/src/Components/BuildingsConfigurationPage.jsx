//import  { useState, useEffect } from 'react';
//import { Button, Modal, Form, Col, Row, Table } from 'react-bootstrap';
//import '../assets/css/custom.css';
//import axios from 'axios';

//const BuildingsConfigurationPage = () => {
//    const [buildings, setBuildings] = useState([]);
//    const [buildingTypes, setBuildingTypes] = useState([]);
//    const [showModal, setShowModal] = useState(false);
//    const [newBuilding, setNewBuilding] = useState({
//        buildingType: '',
//        buildingCost: '',
//        constructionTime: ''
//    });

//    useEffect(() => {
//        const fetchBuildings = async () => {
//            try {
//                const response = await axios.get('https://localhost:7059/api/building');
//                setBuildings(response.data);
//            } catch (error) {
//                console.error('Error fetching buildings:', error);
//            }
//        };

//        const fetchBuildingTypes = async () => {
//            try {
//                const response = await axios.get('https://localhost:7059/api/building/types');
//                setBuildingTypes(response.data);
//            } catch (error) {
//                console.error('Error fetching building types:', error);
//            }
//        };

//        fetchBuildings();
//        fetchBuildingTypes();
//    }, []);

//    const handleShow = () => setShowModal(true);
//    const handleClose = () => setShowModal(false);

//    const handleChange = (e) => {
//        setNewBuilding({
//            ...newBuilding,
//            [e.target.name]: e.target.value
//        });
//    };

//    const handleSubmit = async (e) => {
//        e.preventDefault();
//        try {
//            await axios.post('https://localhost:7059/api/building', newBuilding);
//            setShowModal(false);
//            setNewBuilding({
//                buildingType: '',
//                buildingCost: '',
//                constructionTime: ''
//            });

//            const response = await axios.get('https://localhost:7059/api/building');
//            setBuildings(response.data);
//            const buildingTypes = await axios.get('https://localhost:7059/api/building/types');
//            setBuildingTypes(buildingTypes.data);

//        } catch (error) {
//            console.error('Error adding building:', error);
//        }
//    };

//    return (
//        <div className="container mt-4">
//            <Button variant="primary" onClick={handleShow}>
//                Add Building
//            </Button>

//            <Table striped bordered hover className="mt-3">
//                <thead>
//                    <tr>
//                        <th>Building Type</th>
//                        <th>Building Cost</th>
//                        <th>Construction Time</th>
//                    </tr>
//                </thead>
//                <tbody>
//                    {buildings.map((building) => (
//                        <tr key={building.id}>
//                            <td>{building.buildingType}</td>
//                            <td>{building.buildingCost}</td>
//                            <td>{building.constructionTime}</td>
//                            {/*<td className='operation'>*/}
//                            {/*    <button className='button'>Delete</button>*/}
//                            {/*</td>*/}

//                        </tr>
//                    ))}
//                </tbody>
//            </Table>

//            <Modal show={showModal} onHide={handleClose}>
//                <Modal.Header closeButton>
//                    <Modal.Title>Add New Building</Modal.Title>
//                </Modal.Header>
//                <Modal.Body>
//                    <Form onSubmit={handleSubmit}>
//                        <Form.Group as={Row} controlId="formBuildingType">
//                            <Form.Label column sm={4}>Building Type:</Form.Label>
//                            <Col sm={8}>
//                                <Form.Control
//                                    as="select"
//                                    name="buildingType"
//                                    value={newBuilding.buildingType}
//                                    onChange={handleChange}
//                                    required
//                                >
//                                    <option value="">Select...</option>
//                                    {['Farm', 'Academy', 'Headquarters', 'LumberMill', 'Barracks']
//                                        .filter(type => !buildingTypes.includes(type))
//                                        .map(type => (
//                                            <option key={type} value={type}>{type}</option>
//                                        ))
//                                    }
//                                </Form.Control>
//                            </Col>
//                        </Form.Group>

//                        <Form.Group as={Row} controlId="formBuildingCost">
//                            <Form.Label column sm={4}>Building Cost:</Form.Label>
//                            <Col sm={8}>
//                                <Form.Control
//                                    type="number"
//                                    name="buildingCost"
//                                    value={newBuilding.buildingCost}
//                                    onChange={handleChange}
//                                    required
//                                    min="1"
//                                />
//                            </Col>
//                        </Form.Group>

//                        <Form.Group as={Row} controlId="formConstructionTime">
//                            <Form.Label column sm={4}>Construction Time:</Form.Label>
//                            <Col sm={8}>
//                                <Form.Control
//                                    type="number"
//                                    name="constructionTime"
//                                    value={newBuilding.constructionTime}
//                                    onChange={handleChange}
//                                    required
//                                    min="30"
//                                    max="1800"
//                                />
//                            </Col>
//                        </Form.Group>

//                        <div className="mt-3">
//                            <Button variant="primary" type="submit">
//                                Add Building
//                            </Button>
//                            <Button variant="secondary" onClick={handleClose} className="ml-2">
//                                Close
//                            </Button>
//                        </div>
//                    </Form>
//                </Modal.Body>
//            </Modal>
//        </div>
//    );
//};

//export default BuildingsConfigurationPage;

import '../assets/css/custom.css';
import  { useState, useEffect } from 'react';
import {  Modal, Form, Col, Row } from 'react-bootstrap';
import '../assets/css/custom.css';
import axios from 'axios';
const BuildingsConfigurationPage = () => {
        const [buildings, setBuildings] = useState([]);
        const [buildingTypes, setBuildingTypes] = useState([]);
        const [showModal, setShowModal] = useState(false);
        const [newBuilding, setNewBuilding] = useState({
            buildingType: '',
            buildingCost: '',
            constructionTime: ''
        });

        useEffect(() => {
            const fetchBuildings = async () => {
                try {
                    const response = await axios.get('https://localhost:7059/api/building');
                    setBuildings(response.data);
                } catch (error) {
                    console.error('Error fetching buildings:', error);
                }
            };

            const fetchBuildingTypes = async () => {
                try {
                    const response = await axios.get('https://localhost:7059/api/building/types');
                    setBuildingTypes(response.data);
                } catch (error) {
                    console.error('Error fetching building types:', error);
                }
            };

            fetchBuildings();
            fetchBuildingTypes();
        }, []);

      

        const handleChange = (e) => {
            setNewBuilding({
                ...newBuilding,
                [e.target.name]: e.target.value
            });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await axios.post('https://localhost:7059/api/building', newBuilding);
                setShowModal(false);
                setNewBuilding({
                    buildingType: '',
                    buildingCost: '',
                    constructionTime: ''
                });

                const response = await axios.get('https://localhost:7059/api/building');
                setBuildings(response.data);
                const buildingTypes = await axios.get('https://localhost:7059/api/building/types');
                setBuildingTypes(buildingTypes.data);

            } catch (error) {
                console.error('Error adding building:', error);
            }
        };

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    //const handleAddBuilding = () => {
    //    if (
    //        newBuilding.buildingType &&
    //        newBuilding.buildingCost > 0 &&
    //        newBuilding.constructionTime >= 30 &&
    //        newBuilding.constructionTime <= 1800 &&
    //        !buildings.some(b => b.buildingType === newBuilding.buildingType)
    //    ) {
    //        setBuildings([...buildings, newBuilding]);
    //        setNewBuilding({ buildingType: '', buildingCost: '', constructionTime: '' });
    //        setShowModal(false);
    //    } else {
    //        alert("Please enter valid building details or check for duplicate building types.");
    //    }
    //};

    const deleteBuilding = async (id) => {
        try {
            await axios.delete(`https://localhost:7059/api/building/${id}`);
            setBuildings(buildings.filter(b => b.id !== id));
        } catch (error) {
            console.error("Error deleting building:", error);
        }
        const buildingTypes = await axios.get('https://localhost:7059/api/building/types');
        setBuildingTypes(buildingTypes.data);
    };

    return (
        <div className="table-container">
           
            <table className="building-table">
                <thead className="table-title">
                    <tr>
                        <th>Building Type</th>
                        <th>Building Cost</th>
                        <th>Construction Time (s)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {buildings.map((building) => (
                        <tr key={building.id}>
                            <td>{building.buildingType}</td>
                            <td>{building.buildingCost}</td>
                            <td>{building.constructionTime}</td>
                            <td>
                                <button onClick={() => deleteBuilding(building.id)}>Sil</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-building-button" onClick={handleShow}>
                Add Building
            </button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Building</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="formBuildingType">
                            <Form.Label column sm={4}>Building Type:</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    as="select"
                                    name="buildingType"
                                    value={newBuilding.buildingType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Building Type</option>
                                    {['Farm', 'Academy', 'Headquarters', 'LumberMill', 'Barracks']
                                        .filter(type => !buildingTypes.includes(type))
                                        .map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))
                                    }
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBuildingCost">
                            <Form.Label column sm={4}>Building Cost:</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="number"
                                    name="buildingCost"
                                    value={newBuilding.buildingCost}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formConstructionTime">
                            <Form.Label column sm={4}>Construction Time:</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="number"
                                    name="constructionTime"
                                    value={newBuilding.constructionTime}
                                    onChange={handleChange}
                                    required
                                    min="30"
                                    max="1800"
                                />
                            </Col>
                        </Form.Group>

                        <div className="mt-3 modal-button" >
                            <button className="add-building-modal-button" type="submit">
                                Add Building
                            </button>
                            
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

          
        </div>
    );
};

export default BuildingsConfigurationPage;
