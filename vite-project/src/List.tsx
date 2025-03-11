import { useState } from "react";

interface User {
  id: number;
  isim: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]); // Kullanıcılar listesi
  const [newUser, setNewUser] = useState<string>(""); // Yeni kullanıcı adı

  const addUser = () => {
    if (newUser) {
      const newUserObj = {
        id: Date.now(),
        isim: newUser,
      };
      setUsers([...users, newUserObj]);
      setNewUser("");
    }
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = (id: number, newName: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, isim: newName } : user
      )
    );
  };

  return (
    <div>
      <h2>Kullanıcılar Listesi</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.isim}{" "}
            <button onClick={() => deleteUser(user.id)}>Sil</button>
            <button
              onClick={() => {
                const name = prompt("Yeni isim girin", user.isim);
                if (name) updateUser(user.id, name);
              }}
            >
              Güncelle
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="Yeni kullanıcı adı"
      />
      <button onClick={addUser}>Ekle</button>
    </div>
  );
}

export default UserList;
