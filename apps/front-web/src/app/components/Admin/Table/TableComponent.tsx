import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

const TableComponent = ({ data, edit, del }: { data: any[], edit: Function, del: Function }) => {
    const [editingRow, setEditingRow] = useState(null);
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if(editingRow !== null) {
            setFormData(data[editingRow]);
        }
    }, [editingRow, data]);

    useEffect(() => {
        if(isSubmitting) {
            edit(formData);
            setIsSubmitting(false);
        }
    }, [isSubmitting, formData, edit]);

    const handleInputChange = (event, key) => {
        setFormData(prev => ({...prev, [key]: event.target.value}));
    };


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} : ${hours}:${minutes}`;
    };

    if (!data || data.length === 0) return null;

    const headerCells = Object.keys(data[0]).map((key, index) => (
        <TableCell key={index}>{key}</TableCell>
    ));

    const dataRows = data.map((item, index) => {
        const isEditing = index === editingRow;

        const cells = Object.keys(item).map((key, cellIndex) => {
            let value = item[key];

            const isImageUrl = typeof value === 'string' && /^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/.test(value);
            const isDate = !isNaN(Date.parse(value));

            if (isDate) {
                value = formatDate(value);
            }

            return (
                <TableCell key={cellIndex}>
                    {isEditing ? (
                        <TextField defaultValue={value} onChange={event => handleInputChange(event, key)} />
                    ) : typeof value === 'boolean' ? (
                        value.toString()
                    ) : isImageUrl ? (
                        <img src={value} alt={key} style={{ width: '50px', height: '50px' }} />
                    ) : (
                        value
                    )}
                </TableCell>
            );
        });

        cells.push(
            <TableCell key="actions">
                {isEditing ? (
                    <Button variant="contained" color="primary" onClick={() => { setEditingRow(null); edit(formData); }}>
                        Submit
                    </Button>
                ) : (
                    <>
                        <Button variant="contained" color="primary" onClick={() => setEditingRow(index)}>
                            Edit
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => del(item.id)}>
                            Delete
                        </Button>
                    </>
                )}
            </TableCell>
        );

        return (
            <TableRow key={index}>{cells}</TableRow>
        );
    });

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headerCells}
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableComponent;
