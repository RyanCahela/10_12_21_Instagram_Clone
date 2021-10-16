import { atom } from "recoil";

export const uploadPhotoModalState = atom({
  key: "uploadPhotoModalState",
  default: false,
});

export const postOptionsModalState = atom({
  key: "postOptionsModalState",
  default: {
    isOpen: false,
    postId: null
  },
});

//3:51:38
