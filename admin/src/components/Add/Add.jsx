import React, { useState } from 'react'
import './Add.css'

const Add = ({isVisible, onClose, url }) => {
    const [image, setImage] = useState(false);
    const [title_category, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleclose = (e) => {
        e.preventDefault();
        onClose();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title_category', title_category);
    
        try {
          const res = await fetch(`${url}/api/category/addCategory`, {
            method: 'POST',
            body: formData,
          });
    
          const data = await res.json();
    
          if (data.success) {
            setMessage('Data inserted successfully!');
            setImage(false);
            setTitle('');
          } else {
            setMessage('Error inserting data: ' + data.message);
          }
        } catch (error) {
          console.error(error);
          setMessage('Error inserting data');
        }
      };
    

  if(isVisible){
    return (
        <div className="container">
            <div className="container2">
                <div className="main">
                    <p className="close" onClick={handleclose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-x">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </p>
        
                    <h2 className="h2">Add Category</h2>
                    <form action="" onSubmit={handleSubmit} id="form">
                    
                        <div>
                            <input type="file"  onChange={(e)=>setImage(e.target.files[0])} 
                                className="fileInput" id="fileInput" name="image" required />
                        </div>
                    
                        <div className="title-input">
                            <input type="text" placeholder="Title" value={title_category} onChange={(e) => setTitle(e.target.value)} 
                                className="title" name="title_category" required/>
                        </div>
        
                        <button type="submit" name="add-category" className="btnAdd">Add</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
      );
  }else {
    return <></>;
  }
}

export default Add
