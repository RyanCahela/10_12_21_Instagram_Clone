import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { postOptionsModalState } from "../atoms/modalAtom";
import { Dialog } from "@headlessui/react";
import { db, storage } from "../firebase";
import { deleteDoc, doc } from "@firebase/firestore";

function PostOptionsModal() {
  const [postModalState, setPostOptionsModalState] = useRecoilState(
    postOptionsModalState
  );
  const [isLoading, setIsLoading] = useState(false);

  const deletePost = async () => {
    setIsLoading(true);
    await deleteDoc(doc(db, "posts", postModalState.postId)).then(() => {
      setIsLoading(false);
      setPostOptionsModalState({ isOpen: false, postId: null });
    });
  };
  return (
    <div>
      <div className="mt-3 text-center sm:mt-5">
        <Dialog.Title
          as="h3"
          className="text-lg leading-6 font-medium text-gray-900">
          Post Options
        </Dialog.Title>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          disabled={isLoading}
          onClick={deletePost}
          type="button"
          className="inline-flex justiry-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300">
          {isLoading ? "Deleting..." : "Delete Post"}
        </button>
      </div>
    </div>
  );
}

export default PostOptionsModal;
