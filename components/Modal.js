import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Modal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  return <div>{isOpen && <p>The Modal is Open</p>}</div>;
}

export default Modal;
