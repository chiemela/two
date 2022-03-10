import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./View.css";
import axios from 'axios';

const port = process.env.PORT || 5000;

const View = () => {

    const [user, setUser] = useState({});

    const { id } = useParams();

    useEffect(() => {
        axios
        .get(`http://localhost:${port}/api/get/${id}`)
        .then((resp) => setUser({ ...resp.data[0] }));
    }, [id]);

  return (
    <div style={{ marginTop: "150px" }}>
        <div className='card'>
            <div className='card-header'>
                <p>User Contact Details</p>
            </div>
            <div className='container'>
                <strong>ID: </strong>
                <span>{ id }</span>
                <br />
                <br />
                <strong>First Name: </strong>
                <span>{ user.first_name }</span>
                <br />
                <br />
                <strong>Last Name: </strong>
                <span>{ user.last_name }</span>
                <br />
                <br />
                <strong>Email: </strong>
                <span>{ user.email }</span>
                <br />
                <br />
                <strong>Phone: </strong>
                <span>{ user.phone }</span>
                <br />
                <br />
                <strong>Comment: </strong>
                <span>{ user.comments }</span>
                <br />
                <br />
                <Link to="/">
                    <div className='btn btn-primary'>Go Back</div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default View;