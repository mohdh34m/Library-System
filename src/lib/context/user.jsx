import { ID, Permission, Role } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account, databases, storage } from "../appwrite";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);


  async function login(email, password) {
    const loggedIn = await account.createEmailPasswordSession(email, password);
    setUser(loggedIn);
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function register(email, password, name, phoneNum, stId, file) {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      
      await login(email, password);
      
      const currentUser = await account.get();

      const uploadedFile = await storage.createFile(
        import.meta.env.VITE_STORAGE_BUCKET_ID,
        ID.unique(),
        file,
        [
          Permission.read(Role.user(currentUser.$id)),
          Permission.write(Role.user(currentUser.$id)),
          Permission.delete(Role.user(currentUser.$id))
        ]
      );

      await databases.createDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_USERS_COLLECTION_ID,
        ID.unique(),
        {
          user_id: currentUser.$id,
          student_id: stId,
          status: false,
          name: name,
          id_card: uploadedFile.$id,
          email: email,
          phone_num: phoneNum,
        },
        [
          Permission.read(Role.user(currentUser.$id)),
          Permission.update(Role.user(currentUser.$id)),
          Permission.delete(Role.user(currentUser.$id))
        ]
      );

      window.location.replace("/");

    } catch (error) {
      console.error("Registration failed:", error);
      alert(`Registration failed: ${error.message}`);
    }
  }
  

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
};
