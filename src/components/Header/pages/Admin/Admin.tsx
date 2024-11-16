import { useState, useEffect } from 'react';
import './Admin.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { postTodo, editTodo, setProd, setName, setCategory, setPrice, setCurrentTodoId, setDescreption } from '../../../../redux/Slices/TodoSlices';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';

const Admin = () => {
    const dispatch = useAppDispatch();
    const { prod, name, category, descreption, price, currentTodoId } = useAppSelector((state) => state.Todo);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setIsEditing(!!currentTodoId);
    }, [currentTodoId]);

    function addTodo() {
        if (prod.trim() && name.trim() && category.trim() && descreption.trim() && price.trim()) {
            const obj = { prod, name, category, descreption, price: parseFloat(price) };
            if (isEditing) {
                dispatch(editTodo({ ...obj, _id: currentTodoId }));
            } else {
                dispatch(postTodo(obj));
            }
            resetForm();
        } else {
            alert('Ошибка: все поля должны быть заполнены');
        }
    }

    function resetForm() {
        dispatch(setProd(''));
        dispatch(setName(''));
        dispatch(setCategory(''));
        dispatch(setDescreption(''));
        dispatch(setPrice(''));
        dispatch(setCurrentTodoId(null)); 
    }

    return (
        <section id='admin'>
            <div className="container">
                <div className="admin">
                    <h1 className='adminH1'>Admin</h1>
                    <div className="inputs">
                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                            <TextField
                                onChange={(e) => dispatch(setProd(e.target.value))}
                                value={prod}
                                fullWidth
                                label="Product"
                                id="fullWidth"
                            />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                            <TextField
                                onChange={(e) => dispatch(setName(e.target.value))}
                                value={name}
                                fullWidth
                                label="Name"
                                id="fullWidth"
                            />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                            <TextField
                                onChange={(e) => dispatch(setDescreption(e.target.value))}
                                value={descreption}
                                fullWidth
                                label="Description"
                                id="fullWidth"
                            />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                            <TextField
                                onChange={(e) => dispatch(setCategory(e.target.value))}
                                value={category}
                                fullWidth
                                label="Category"
                                id="fullWidth"
                            />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                            <TextField
                                onChange={(e) => dispatch(setPrice(e.target.value))}
                                value={price}
                                fullWidth
                                label="Price"
                                id="fullWidth"
                            />
                        </Box>

                        <Button onClick={addTodo} variant="contained" color="primary" sx={{ mt: 2 }}>
                            {isEditing ? 'Edit Product' : 'Add Product'}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Admin;
