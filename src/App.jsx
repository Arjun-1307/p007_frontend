import React, { useEffect } from 'react';
import './App.css';
import { APIURL, callApi, IMGURL } from './lib';

const App = () => {
   const [usersData, setUsersData] = React.useState([]);
   const [editingId, setEditingId] = React.useState(null);
   const [showModal, setShowModal] = React.useState(false);
   const [isCreating, setIsCreating] = React.useState(false);
   const [editData, setEditData] = React.useState({ firstName: '', lastName: '', Mobile: '', Email: '' });

   console.log("usersData state:", usersData);

    const loadUsers = (res) => {
        console.log("API Response:", res);
        console.log("Response length:", res.length)
       if (res.length > 0) {
            console.log("First user object:", res[0]);
            console.log("First user keys:", Object.keys(res[0]));
        }
        setUsersData(res);
    };

   useEffect(() => {
    console.log("useEffect running - calling API");
    callApi("GET", APIURL + "users/getallusers","", loadUsers);
    }, []);

    function handleDelete(userId) {
        if(window.confirm("Are you sure you want to delete this user?")) {
            callApi("DELETE", APIURL + "users/deleteuser/" + userId, "", (res) => {
                if(res.success) {
                    alert("User deleted successfully");
                    // Reload users
                    callApi("GET", APIURL + "users/getallusers", "", loadUsers);
                } else {
                    alert("Failed to delete user");
                }
            });
        }
    }

    function handleEdit(userId) {
        const user = usersData.find(u => u._id === userId);
        if(!user) return;

        setEditingId(userId);
        setIsCreating(false);
        setEditData({
            firstName: user.firstName,
            lastName: user.lastName,
            Mobile: user.Mobile,
            Email: user.Email
        });
        setShowModal(true);
    }

    function handleNewUser() {
        setEditingId(null);
        setIsCreating(true);
        setEditData({ firstName: '', lastName: '', Mobile: '', Email: '' });
        setShowModal(true);
    }

    function handleEditChange(e) {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    }

    function handleSaveEdit() {
        const updatedData = editData;
        const endpoint = isCreating 
            ? APIURL + "users/adduser" 
            : APIURL + "users/updateuser/" + editingId;
        const method = isCreating ? "POST" : "PUT";
        
        callApi(method, endpoint, JSON.stringify(updatedData), (res) => {
            if(res.success) {
                alert(isCreating ? "User created successfully" : "User updated successfully");
                setShowModal(false);
                setEditingId(null);
                setIsCreating(false);
                // Reload users
                callApi("GET", APIURL + "users/getallusers", "", loadUsers);
            } else {
                alert(isCreating ? "Failed to create user" : "Failed to update user");
            }
        });
    }

    function handleCancelEdit() {
        setShowModal(false);
        setEditingId(null);
        setIsCreating(false);
        setEditData({ firstName: '', lastName: '', Mobile: '', Email: '' });
    }

  return (
    <div className='app'>
       <div className='header'> User Management</div>
       <img src={IMGURL + "image.png"} alt="Add New User" style={{width: '28px', height: '28px', cursor: 'pointer', position: 'absolute', top: '11px', right: '11px'}} onClick={handleNewUser} title="Add New User" />
       <div className='section'>
           <table className='table'>
               <thead>
                   <tr>
                       <th style={{width: "50px"}}>S.NO</th>
                       <th style={{width: "150px"}}>Firstname</th>
                       <th style={{width: "150px"}}>Lastname</th>
                       <th style={{width: "150px"}}>Mobile</th>
                       <th style={{width: "200px"}}>Email</th>
                       <th style={{width: "100px"}}>Actions</th>
                   </tr>
               </thead>
               <tbody>
                   {usersData.map((user, index) => (
                       <tr key={index}>
                           <td>{index + 1}</td>
                           <td>{user.firstName}</td>
                           <td>{user.lastName}</td>
                           <td>{user.Mobile}</td>
                           <td>{user.Email}</td>
                           <td style={{textAlign: 'center'}}>
                               <img src={IMGURL + "edit.png"} alt="Edit User" style={{width: '20px', height: '20px', cursor: 'pointer', marginRight: '10px'}} onClick={() => handleEdit(user._id)} />
                               <img src={IMGURL + "bin.png"} alt="Delete User" style={{width: '20px', height: '20px', cursor: 'pointer'}} onClick={() => handleDelete(user._id)} />
                           </td>
                       </tr>
                   ))}
               </tbody>
           </table>
        </div>

        {showModal && (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    minWidth: '400px',
                    maxWidth: '500px'
                }}>
                    <h2>{isCreating ? 'Create New User' : 'Edit User'}</h2>
                    <div style={{marginBottom: '15px'}}>
                        <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>First Name:</label>
                        <input 
                            type="text" 
                            name="firstName" 
                            value={editData.firstName} 
                            onChange={handleEditChange}
                            style={{width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd'}}
                        />
                    </div>
                    <div style={{marginBottom: '15px'}}>
                        <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Last Name:</label>
                        <input 
                            type="text" 
                            name="lastName" 
                            value={editData.lastName} 
                            onChange={handleEditChange}
                            style={{width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd'}}
                        />
                    </div>
                    <div style={{marginBottom: '15px'}}>
                        <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Mobile:</label>
                        <input 
                            type="text" 
                            name="Mobile" 
                            value={editData.Mobile} 
                            onChange={handleEditChange}
                            style={{width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd'}}
                        />
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Email:</label>
                        <input 
                            type="email" 
                            name="Email" 
                            value={editData.Email} 
                            onChange={handleEditChange}
                            style={{width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd'}}
                        />
                    </div>
                    <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                        <button 
                            onClick={handleCancelEdit}
                            style={{padding: '8px 16px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSaveEdit}
                            style={{padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )}
        
        <div className='footer'> © 2026 My React App. All rights reserved.</div>
    </div>
  );
}

export default App;

