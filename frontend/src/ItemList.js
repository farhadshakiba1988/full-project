import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/items/');
            setItems(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching items. Please try again later.');
            setLoading(false);
            console.error("Error details:", err);
        }
    };

    if (loading) {
        return (
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Items List</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Created At</th>
                </tr>
                </thead>
                <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>${item.price}</td>
                        {/*<td>{new Date(item.created_at).toLocaleDateString()}</td>*/}
                        <td>{item.created_at}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ItemList;