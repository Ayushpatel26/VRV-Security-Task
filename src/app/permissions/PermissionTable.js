'use client';

import { useState } from 'react';

const initialRoles = [
  {
    id: 1,
    name: 'Admin',
    permissions: ['Read', 'Write', 'Delete'],
  },
  {
    id: 2,
    name: 'User',
    permissions: ['Read'],
  },
];

const availablePermissions = ['Read', 'Write', 'Delete'];

export default function PermissionTable() {
  const [roles, setRoles] = useState(initialRoles); // Original roles
  const [tempRoles, setTempRoles] = useState([...initialRoles]); // Temporary changes
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

  const handleSaveChanges = () => {
    setRoles(tempRoles); // Commit changes to the original state
    setIsChanged(false); // Reset change tracker
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
