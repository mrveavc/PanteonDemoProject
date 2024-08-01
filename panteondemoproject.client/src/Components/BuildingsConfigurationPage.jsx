

import '../assets/css/custom.css';
import  { useState, useEffect } from 'react';
import {  Modal, Form, Col, Row } from 'react-bootstrap';
import '../assets/css/custom.css';
import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
const BuildingsConfigurationPage = () => {
        const [buildings, setBuildings] = useState([]);
        const [buildingTypes, setBuildingTypes] = useState([]);
        const [showModal, setShowModal] = useState(false);
        const [newBuilding, setNewBuilding] = useState({
            buildingType: '',
            buildingCost: '',
            constructionTime: ''
        });
        const navigate = useNavigate();

        useEffect(() => {
            const fetchBuildings = async () => {
                try {
                    const response = await axiosInstance.get('/building');
                    setBuildings(response.data);
                } catch (error) {
                    console.error('Error fetching buildings:', error);
                }
            };

            const fetchBuildingTypes = async () => {
                try {
                    const response = await axiosInstance.get('/building/types');

                    setBuildingTypes(response.data);
                } catch (error) {
                    console.error('Error fetching building types:', error);
                }
            };

            fetchBuildings();
            fetchBuildingTypes();
        }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

        const handleChange = (e) => {
            setNewBuilding({
                ...newBuilding,
                [e.target.name]: e.target.value
            });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await axiosInstance.post('/building', newBuilding);

                setShowModal(false);
                setNewBuilding({
                    buildingType: '',
                    buildingCost: '',
                    constructionTime: ''
                });

               
                const response = await axiosInstance.get('/building');
                setBuildings(response.data);
                const buildingTypes = await axiosInstance.get('/building/types');
                setBuildingTypes(buildingTypes.data);

            } catch (error) {
                console.error('Error adding building:', error);
            }
        };

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
  


    const deleteBuilding = async (id) => {
       
        try {
            await axiosInstance.delete(`/building/${id}`);
            setBuildings(buildings.filter(b => b.id !== id));
        } catch (error) {
            console.error("Error deleting building:", error);
        }
        const buildingTypes = await axiosInstance.get('/building/types');
        setBuildingTypes(buildingTypes.data);
       
    };

    return (
        <div className="table-container">
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
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
