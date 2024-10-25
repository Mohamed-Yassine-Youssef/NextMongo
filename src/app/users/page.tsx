import DeleteButton from "@/components/DeleteButton";
import Link from "next/link";

// export const dynamic = "force-dynamic";
export const metadata = {
  title: "NextMongo",
  description: "this is users page",
};
export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  _id: string;
}

export async function loadUsers(): Promise<User[]> {
  const response = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  });
  const users: User[] = await response.json();
  return users;
}

export default async function HomePage() {
  const users = await loadUsers();

  return (
    <div className="container h-[100vh] flex justify-center flex-col">
      <h1 className="text-center text-5xl text-orange-600 pb-6">
        Liste des utilisateurs
      </h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              First name
            </th>
            <th scope="col" className="px-6 py-3">
              Last name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>

            <th scope="col" className="px-6 py-3">
              Edit
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: User, index: number) => (
            <tr
              key={index}
              className="odd:bg-white  odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="px-6 py-3">{user.firstname}</td>
              <td className="px-6 py-3">{user.lastname}</td>
              <td className="px-6 py-3">{user.email}</td>

              <td className="px-6 py-3 text-2xl cursor-pointer">
                <Link href={`/users/${user._id}`}>✎</Link>
              </td>
              <td className="px-6 py-3 cursor-pointer">
                <DeleteButton id={user._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
