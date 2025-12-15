import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl =
  "https://zustand-storage-mario1-default-rtdb.firebaseio.com/zustand";

const firebaseApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then(res => res.json())
      return JSON.stringify(data);
    } catch (error) {
      throw error; 
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${firebaseUrl}/${name}.json`,{
      method:'PUT',
      body:value
    }).then((res) =>res.json());
    // sessionStorage.setItem(name, value);
    return;
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log("romeItem", name);
  },
};

export const firbaseStorage = createJSONStorage(() => firebaseApi);