"use client";

import React from "react";
interface DeleteButtonProps {
  id: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const deleteUser = async (): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error(`Failed to delete user with id ${id}`);
        }

        //  refresh
        window.location.reload();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return <button onClick={deleteUser}>🗑️</button>;
};

export default DeleteButton;
