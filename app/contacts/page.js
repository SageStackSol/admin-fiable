"use client";

import { signOut, useSession } from "next-auth/react";
import { useState,useEffect } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await fetch("/api/contact");
    const data = await res.json();
    setContacts(data);
    console.log(data)
  };

  useEffect(() => {
    fetchContacts();
  }, []);
   const updateStatus = async (id, status) => {
  
  await fetch(`/api/contact/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // ✅ REQUIRED
    },
    body: JSON.stringify({ status }),
  });

  fetchContacts();
};

  return (
    <div className="p-6">
        <table className="w-full border-l-4  border-r-gray-300 border-[#002f67] shadow">
        
        {/* ✅ TABLE HEADER */}
        <thead>
          <tr className="bg-[#002f67] text-left text-white">
            <th className="p-2">NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
            <th>SERVICE</th>
            <th>MESSAGE</th>
            <th>STATUS</th>
          </tr>
        </thead>

        {/* ✅ TABLE BODY */}
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id} className="border-b border-gray-300">
              <td className="p-2">{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone || "-"}</td>
              <td>{c.service || "-"}</td>
              <td>{c.message}</td>
{/* {console.log(c._id)} */}
              <td>
                <select
                  value={c.status}
                  onChange={(e) =>
                    updateStatus(c._id, e.target.value)
                  }
                  className="border p-1"
                >
                  <option value="new">New</option>
                  <option value="approached">Approached</option>
                  <option value="success">Success</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}