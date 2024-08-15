import React, { useEffect, useState } from 'react';
import './UpdateCategory.css';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCategory = ({ url }) => {
    const [category, setCategory] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [title_category, setTitle_category] = useState('');

    const getCategory = async () => {
        await fetch(`${url}/api/category/getCategoryId/${id}`)
            .then(res => res.json())
            .then(data => {
                setCategory(data.data);
                setTitle_category(data.data.title_category);
            })
            .catch(err => console.log(err));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const res = await fetch(`${url}/api/category/updateCategory/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title_category,
            })
        });
        const data = await res.json();
        if (data.success) {
            alert('Category updated successfully');
            navigate('/category');
        } else {
            alert('Something went wrong');
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <div>
            <div className="category-container">
                <h1>Update Category</h1>
                {category ? (
                    <div className="food-content">
                        <form action="" className="form" onSubmit={handleUpdate}>
                            <input
                                type="text"
                                value={title_category}
                                onChange={(e) => setTitle_category(e.target.value)}
                                name="title_category"
                                id=""
                            />
                            <button className="btnUpdate" type="submit">
                                Update
                            </button>
                        </form>
                    </div>
                ) : (
                    <h1>No Category Found</h1>
                )}
            </div>
        </div>
    );
};

export default UpdateCategory;
