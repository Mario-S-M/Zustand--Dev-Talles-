import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { firbaseStorage } from "../../storages/firebase.storage";
import { logger } from "../middleware/logger.middleware";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}
type PersonStore = PersonState & Actions;

const storeApi: StateCreator<
  PersonStore,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (value: string) =>
    set(({ firstName: value }), false, "setFirstName"),
  setLastName: (value: string) =>
    set(({ lastName: value }), false, "setLastName"),
});

export const userPersonStore = create<PersonStore>()(
  logger (devtools(
    persist(storeApi, {
      name: "person-storage",
      // storage: customSessionStorage,
      storage: firbaseStorage,
    })
  ))
);
