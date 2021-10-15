import React, { useState, useRef, Fragment } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "@firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { db, storage } from "../firebase";
import { CameraIcon } from "@heroicons/react/outline";
import { Dialog } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { uploadPhotoModalState } from "../atoms/modalAtom";

function UploadPhotoModal() {
  const { data: session } = useSession();
  const setUploadPhotoModalIsOpen = useSetRecoilState(uploadPhotoModalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const filePickerRef = useRef();
  const captionRef = useRef();

  const addImageToPost = (e) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }

    fileReader.onload = (e) => {
      console.log("fileReader.onload event", e.target.result);
      setSelectedFile(e.target.result);
    };
  };

  const uploadPost = async (e) => {
    if (isLoading) return;
    setIsLoading(true);

    //Create a post and add to firestore 'posts' collection.
    const postRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });
    //get the post id for the newly created post.
    console.log("new Doc with Id", postRef.id);

    //upload the image to firebase storage with the post ID
    const imageRef = ref(storage, `posts/${postRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        //get a download URL from firebase storage and upload to original post in firestore 'posts' collection
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, `posts`, postRef.id), {
          image: downloadUrl,
        });
      }
    );
    setUploadPhotoModalIsOpen(false);
    setIsLoading(false);
    setSelectedFile(null);
  };

  return (
    <div>
      <div>
        {selectedFile ? (
          <img
            className="w-full object-contain cursor-pointer"
            src={selectedFile}
            onClick={() => setSelectedFile(null)}
            alt=""
          />
        ) : (
          <div
            onClick={() => filePickerRef.current.click()}
            className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer">
            {/* Upload A file */}
            <CameraIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
        )}
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-lg leading-6 font-medium text-gray-900">
            Upload a photo
          </Dialog.Title>
        </div>

        {/* File Input */}
        <div>
          <input
            ref={filePickerRef}
            type="file"
            hidden
            onChange={addImageToPost}
          />
        </div>

        {/* Caption Input */}
        <div className="mt-2">
          <input
            className="border-none focus:ring-0 w-full text-center"
            type="text"
            ref={captionRef}
            placeholder="Please enter a caption..."
          />
        </div>
      </div>

      {/* button */}
      <div className="mt-5 sm:mt-6">
        <button
          disabled={!selectedFile}
          onClick={uploadPost}
          type="button"
          className="inline-flex justiry-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300">
          {isLoading ? "Uploading..." : "Upload Post"}
        </button>
      </div>
    </div>
  );
}

export default UploadPhotoModal;
