import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { createData, getADoc, getPostsParam, updateData } from "../firebase/routes";

function ListingUpdate() {
    const [listing, setListing] = useState({
        title: "",
        price: 0,
        description: "",
        location: ""
    });
    
    const nav = useNavigate();
    const { _id } = useParams();
    
    const getPost = async (_id) => {
        await getADoc(_id)
            .then(data => {
                setListing(data);
                console.log(data)
            })
    }
    
    useEffect(() => {
        console.log(_id)
        getPost( _id)
    },[])
    
    const handleChange = (e) => {
        setListing({
            ...listing,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Send the listing data to firebase to update
        updateData(listing, "example")
        nav("/home")
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Update a Listing</h3>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                value={listing.title}
                onChange={(event) => handleChange(event)}
            />
    <br />
            <label htmlFor="price">Price:</label>
            <input
                type="number"
                id="price"
                value={listing.price}
                onChange={(event) => handleChange(event)}
            />
<br />
            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                value={listing.description}
                onChange={(event) => handleChange(event)}
            />
<br />
            <label htmlFor="location">Location:</label>
            <input
                type="text"
                id="location"
                value={listing.location}
                onChange={(event) => handleChange(event)}
            />
<br />
            <label htmlFor="image">Image:</label>
            <input
                type="file"
                id="image"
                // onChange={(event) => setImage(event.target.files[0])}
            />
<br />
            <button type="submit">Create Listing</button>
        </form>
    );
}

export default ListingUpdate;