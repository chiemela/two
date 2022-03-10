import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./AddEdit.css";
import { toast } from 'react-toastify';
import axios from 'axios';

const port = process.env.PORT || 5000;

const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    comments: "",
};

const AddEdit = () => {

    const [state, setState] = useState(initialState);

    const { first_name, last_name, email, phone, comments } = state;

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios
        .get(`http://localhost:${port}/api/get/${id}`)
        .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!first_name || !last_name || !email || !phone || !comments) {

            toast.error("Please provide a value for each input field");

        } else {

            if (!id) {
                
                axios
                    .post(`http://localhost:${port}/api/post`, {
                        first_name,
                        last_name,
                        email,
                        phone,
                        comments
                    }).then(() => {
                        setState({
                            first_name: "",
                            last_name: "",
                            email: "",
                            phone: "",
                            comments: ""
                        });
                    }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Added Successfully");

            } else {
                
                axios
                    .put(`http://localhost:${ port }/api/update/${ id }`, {
                        first_name,
                        last_name,
                        email,
                        phone,
                        comments
                    }).then(() => {
                        setState({
                            first_name: "",
                            last_name: "",
                            email: "",
                            phone: "",
                            comments: ""
                        });
                    }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Updated Successfully");

            }

            setTimeout(() => navigate('/'), 500);
        }

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

  return (
    <div style = {{ marginTop: "100px" }}>
        <form 
            style = {{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center",
            }}
            onSubmit = { handleSubmit }
        >
            <label htmlFor="first_name">First Name</label>
            <input
                type = "text"
                id = "first_name"
                name = "first_name"
                placeholder = "Your First Name ..."
                value = { first_name || "" }
                onChange = { handleInputChange }
            />
            <label htmlFor="last_name">Last Name</label>
            <input
                type = "text"
                id = "last_name"
                name = "last_name"
                placeholder = "Your Last Name ..."
                value = { last_name || "" }
                onChange = { handleInputChange }
            />
            <label htmlFor="email">Email</label>
            <input
                type = "email"
                id = "email"
                name = "email"
                placeholder = "Your Email ..."
                value = { email || "" }
                onChange = { handleInputChange }
            />
            <label htmlFor="phone">Phone</label>
            <input
                type = "number"
                id = "phone"
                name = "phone"
                placeholder = "Your Phone ..."
                value = { phone || "" }
                onChange = { handleInputChange }
            />
            <label htmlFor="comments">Comments</label>
            <input
                type = "text"
                id = "comments"
                name = "comments"
                placeholder = "Your Comments ..."
                value = { comments || "" }
                onChange={ handleInputChange }
            />
            <input type="submit" value={ id ? "Update" : "Save" } />
            <Link to="/">
                <input type="button" value="Go Back" />
            </Link>
        </form>
    </div>
  );
};

export default AddEdit;