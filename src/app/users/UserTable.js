'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';

const UserTable = ({ users, setUsers }) => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    setUsers(users.map(user => (user.id === selectedUser.id ? selectedUser : user))); // updating local state

    try {
      const response = await fetch(`http://localhost:3001/users/${selectedUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUser),
      });

      if (!response.ok) throw new Error('Failed to delete user');
      toast.success('User updated successfully!');
    } catch (error) {
      toast.error('Error updating user! Please try again later.');
      console.log('Error updating user:', error);
    }
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const handleDelete = async (id) => {
    setUsers(users.filter(user => user.id !== id)); // in frontend

    try {
      const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) throw new Error('Failed to delete user');
      toast.success('User deleted successfully!');
    } catch (error) {
      toast.error('Error deleting user! Please try again later.');
      console.log('Error deleting user:', error);
    }
  };

  return (
    <div>
      <table className="min-w-full border border-gray-200 overflow-y-scroll">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b text-center">{user.name}</td>
              <td className="py-2 px-4 border-b text-center">{user.email}</td>
              <td className="py-2 px-4 border-b text-center">{user.status}</td>
              <td className="py-2 px-4 border-b text-center">{user.role}</td>
              <td className="py-2 px-4 border-b text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-green-100 rounded mr-2"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/exymduqj.json"
                      trigger="hover"
                    >
                    </lord-icon>
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-100 rounded"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/hwjcdycb.json"
                      trigger="hover"
                    >
                    </lord-icon>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={selectedUser.name}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={selectedUser.email}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status:</label>
              <select
                name="status"
                value={selectedUser.status}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role:</label>
              <select
                name="role"
                value={selectedUser.role}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
