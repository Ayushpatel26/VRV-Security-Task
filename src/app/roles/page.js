'use client';

import { useEffect, useState } from 'react';
import RoleTable from '@/app/roles/RoleTable';
import CreateRoleForm from '@/app/roles/CreateRoleForm';
import { toast } from 'react-toastify';

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [assignedRoleNames, setAssignedRoleNames] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);

  const allRoles = [
    "Admin",
    "Moderator",
    "Content Manager",
    "Editor",
    "Viewer/Analyst",
    "Developer",
    "Customer Support",
    "Finance Manager",
    "User",
  ];
  
  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/roles');
      if (!response.ok) {
        toast.error('Error fetching users.');
        return;
      }
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      toast.error('Error fetching roles.');
      console.log('Error fetching roles:', error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    setAssignedRoleNames(roles.map((role) => role.name));
  }, [roles]);

  useEffect(() => {
    setAvailableRoles(allRoles.filter((role) => !assignedRoleNames.includes(role)));
  }, [assignedRoleNames]);

  const handleAddNewRole = async (newRole) => {
    try {
      const response = await fetch('http://localhost:3001/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRole),
      });

      if (!response.ok) throw new Error('Failed to create new role');

      const savedRole = await response.json();
      setRoles([...roles, savedRole]); // updating local state

      toast.success('Role created successfully!');
    } catch (error) {
      toast.error('Error creating new role.');
      console.log('Error creating new role:', error);
    } finally {
      setIsCreateModalOpen(false);
    }
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
          onClick={() => fetchRoles()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Roles</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Role
        </button>
      </div>

      <RoleTable roles={roles} setRoles={setRoles} availableRoles={availableRoles} setAvailableRoles={setAvailableRoles} />

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <CreateRoleForm
              onCancel={() => setIsCreateModalOpen(false)}
              onSave={handleAddNewRole}
              availableRoles={availableRoles}
            />
          </div>
        </div>
      )}
    </div>
  );
}