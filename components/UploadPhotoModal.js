import React, { useState, useRef, Fragment } from "react";
import { addDoc } from "@firebase/firestore";
import { CameraIcon } from "@heroicons/react/outline";
import { Dialog } from "@headlessui/react";

function UploadPhotoModal() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const filePickerRef = useRef();
  const captionRef = useRef();

  return (
    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
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
            //onChange={addImageToPost}
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
          //onClick={uploadPost}
          type="button"
          className="inline-flex justiry-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300">
          {isLoading ? "Uploading..." : "Upload Post"}
        </button>
      </div>
    </div>
  );
}

export default UploadPhotoModal;
