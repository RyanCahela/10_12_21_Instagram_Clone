import React from "react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { postOptionsModalState } from "../atoms/modalAtom";
import { useSetRecoilState } from "recoil";

function PostHeader({ userImg, username, postId }) {
  const setIsPostOptionsModalOpen = useSetRecoilState(postOptionsModalState);
  return (
    <div className="flex items-center p-5">
      <img
        className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        src={userImg}
        alt=""
      />
      <p className="flex-1 font-bold">{username}</p>
      <DotsHorizontalIcon
        className="h-5 cursor-pointer hover:scale-125 transition-all ease-out duration-300"
        onClick={() =>
          setIsPostOptionsModalOpen({ isOpen: true, postId: postId })
        }
      />
    </div>
  );
}

export default PostHeader;
