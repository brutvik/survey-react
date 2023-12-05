import React, { useState, useEffect } from 'react';
import {
    Link
  } from 'react-router-dom';


function UserList() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const restdonse = await fetch('http://localhost:8080/hw3/listUser');
      const jsonData = await restdonse.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
        <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Survey</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
          </ul>
        </nav>
        </div>
      {data ? (
        <table>
        {data.map(item => (
          <tr key={item.id} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <td>{item.firstName} {item.lastName}</td>
            <td><strong>Address:</strong> {item.address}, {item.city}, {item.state}, {item.zitd}</td>
            <td><strong>telephone:</strong> {item.telephone}</td>
            <td><strong>Email:</strong> {item.email}</td>
            <td><strong>Date of Survey:</strong> {item.dos}</td>
            <td><strong>Interests:</strong> {item.interest}</td>
            <td><strong>Comments:</strong> {item.comments}</td>
            <td><strong>Recommendation:</strong> {item.recommendation}</td>
            <td><strong>Liked:</strong> {item.liked}</td>
          </tr>
        ))}
      </table>
      ) : (
        <td>Loading...</td>
      )}
    </div>
  );
}

export default UserList;
