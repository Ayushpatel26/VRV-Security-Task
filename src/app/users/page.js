'use client';
import { useEffect, useState } from 'react';

import CreateUserForm from '@/app/users/CreateUserForm';
import UserTable from '@/app/users/UserTable.js';
import { toast } from 'react-toastify';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/users');
      // if (!response.ok) throw new Error('Failed to fetch users');
      if (!response.ok) toast.error('Error fetching users.');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error('Error fetching users.');
      console.log('Error fetching users:', error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = () => {
    setIsCreateModalOpen(true);
  };

  const handleSaveNewUser = async (newUser) => {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error('Failed to save new user');

      const savedUser = await response.json();
      setUsers([...users, savedUser]); // Updating local state

      toast.success('User created successfully!');
      setIsCreateModalOpen(false);
    } catch (error) {
      toast.error('Error saving new user.');
      // console.log('Error saving new user:', error);
    }
    setIsCreateModalOpen(false);
  };

  if (loading) return (
    <div className="flex justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
    </div>
  );

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Failed to fetch data from server.
        </h2>
        <p className="mb-4">Please check your connection or JSON server.</p>
        <button
          onClick={() => fetchUsers()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-1 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Users</h2>
        <button
          onClick={handleCreateUser}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create User
        </button>
      </div>

      {users ? <UserTable users={users} setUsers={setUsers} /> : (
        <div className="flex flex-col justify-center items-center h-screen text-center">
        <h2 className="text-2xl font-semibold mb-4">No Users Found</h2>
        <p className="mb-4">It looks like there are no users in the system.</p>
      </div>
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <CreateUserForm
              onCancel={() => setIsCreateModalOpen(false)}
              onSave={handleSaveNewUser}
            />
          </div>
        </div>
      )}
    </div>
  );
}