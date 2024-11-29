'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

const availablePermissions = ['Read', 'Write', 'Delete'];

export default function PermissionTable({ roles, setRoles }) {
  const [tempRoles, setTempRoles] = useState([...roles]); // Temporary changes
  const [isChanged, setIsChanged] = useState(false); // Track unsaved changes

  const handlePermissionChange = (roleId, permission) => {
    setTempRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId
          ? {
            ...role,
            permissions: role.permissions.includes(permission)
              ? role.permissions.filter((perm) => perm !== permission)
              : [...role.permissions, permission],
          }
          : role
      )
    );
    setIsChanged(true); // Mark changes as unsaved
  };

  const handleSaveChanges = async () => {
    try {
      await Promise.all(
        tempRoles.map(async (role) => {
          const response = await fetch(`http://localhost:3001/roles/${role.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ permissions: role.permissions }),
          });
  
          if (!response.ok) {
            toast.error(`Failed to update permission of ${role.name}`);
            throw new Error(`Failed to update permission of: ${role.name}`);
          }
        })
      );

      toast.success('Permissions updated successfully!');
      setRoles(tempRoles);
    } catch (error) {
      toast.error('Failed to saved permissions!');
      setTempRoles([...roles]);
      console.log('Failed to saved permissions', error);
    } finally {
      setIsChanged(false);
    }
  };

  const handleCancelChanges = () => {
    setTempRoles([...roles]); // Revert to the original state
    setIsChanged(false); // Reset change tracker
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Role</th>
            {availablePermissions.map((permission) => (
              <th key={permission} className="py-2 px-4 border-b">
                {permission}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tempRoles.map((role) => (
            <tr key={role.id}>
              <td className="py-2 px-4 border-b">{role.name}</td>
              {availablePermissions.map((permission) => (
                <td key={permission} className="py-2 px-4 border-b text-center">
                  <input
                    type="checkbox"
                    checked={role.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(role.id, permission)}
                    className="cursor-pointer"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Save and Cancel Buttons */}
      {isChanged && (
        <div className="flex gap-4">
          <button
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancelChanges}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
