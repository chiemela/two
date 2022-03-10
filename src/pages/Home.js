import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import { toast } from 'react-toastify';
import axios from 'axios';

const port = process.env.PORT || 5000;

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get(`http://localhost:${port}/api/get`);
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id) => {

    if (window.confirm("Are you sure you want to delete this contact?")) {

      axios.delete(`http://localhost:${port}/api/remove/${id}`);
      toast.success("Contact Deleted Successfully");
      setTimeout(() => loadData(), 500);

    }

  }
  
  return (
    <div style={{ marginTop: "150px" }}>
      <Link to="/addContact">
        <button className='btn btn-outline-dark'>Add Contact</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th>#</th>
            <th>first_name</th>
            <th>last_name</th>
            <th>email</th>
            <th>phone</th>
            <th>comments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return(
              <tr key={item.id}>
                <th scope="row">{index+1}</th>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.comments}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className='btn btn-primary'>Edit</button>
                  </Link>
                  <button className='btn btn-danger' onClick={() => deleteContact(item.id)}>Delete</button>
                  <Link to={`/view/${item.id}`}>
                    <button className='btn btn-secondary'>View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;