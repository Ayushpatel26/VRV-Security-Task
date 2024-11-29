'use client';

import { useEffect, useState } from 'react';
import PermissionTable from './PermissionTable';
import { toast } from 'react-toastify';

export default function PermissionsPage() {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [roles, setRoles] = useState([]);
  
  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/roles');
      if (!response.ok) {
        toast.error('Error fetching permissions.');
        return;
      }
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      toast.error('Error fetching permissions.');
      console.log('Error fetching permissions:', error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

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
      <h2 className="text-2xl font-semibold mb-4">Manage Permissions</h2>
      <PermissionTable roles={roles} setRoles={setRoles} />
    </div>
  );
}