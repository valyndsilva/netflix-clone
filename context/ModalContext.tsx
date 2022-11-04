import React, { createContext, useState } from "react";
import { MovieItem, SeriesItem } from "../types/typings";
interface ModalProviderProps {
  children: React.ReactNode;
}
interface Modal {
  // modalData?: MovieItem | SeriesItem;
  modalData?: any;
  setModalData: (item: MovieItem | SeriesItem) => void;
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
}

export const ModalContext = createContext<Modal>({} as Modal);

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalData, setModalData] = useState<MovieItem | SeriesItem>();
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{ modalData, setModalData, isModal, setIsModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}
