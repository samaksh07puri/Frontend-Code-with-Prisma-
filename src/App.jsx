import { useEffect, useState } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from './api';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(''); // Added age state
  const [editId, setEditId] = useState(null);

  // Fetch all users from backend
  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form submission (add/update user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateUser(editId, { name, email, age }); // Include age
      setEditId(null);
    } else {
      await addUser({ name, email, age }); // Include age
    }
    setName('');
    setEmail('');
    setAge('');
    fetchUsers();
  };

  // Edit user
  const handleEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age || ''); // Populate age for editing
  };

  // Delete user
  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          {editId ? 'Update User' : 'Add User'}
        </button>
      </form>

      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center border p-3 rounded bg-white shadow-sm"
          >
            <span>
              {user.name} - {user.email} - {user.age}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
