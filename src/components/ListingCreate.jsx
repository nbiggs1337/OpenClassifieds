import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { createData, storeImg } from "../firebase/routes";
import { ensureUpload } from '../Utility/ensureUpload';

function ListingCreate() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false)
    
    const nav = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let obj = {
            title: title,
            price: price,
            description: description,
            location: location,
            image: []
        }
        console.log(obj)
        
        //start uploading image: 
        if (image) {
            storeImg(image, obj)
                .then( async url => {
                    console.log(url, "uploaded")
                    // console.log(uploading)
                    // await createData(obj, url);
                })
        }
        
        
        // ensureUpload(uploading )
        // Send the listing data to firebase
        
        //testing img store
        // console.log(image)
        // storeImg(image);
        nav("/home")
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
    <br />
            <label htmlFor="price">Price:</label>
            <input
                type="number"
                id="price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
            />
<br />
            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
<br />
            <label htmlFor="location">Location:</label>
            <input
                type="text"
                id="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
            />
<br />
            <label htmlFor="image">Image:</label>
            <input
                type="file"
                id="image"
                onChange={(event) => setImage(event.target.files[0])}
            />
<br />
            <button type="submit">Create Listing</button>
        </form>
    );
}

export default ListingCreate