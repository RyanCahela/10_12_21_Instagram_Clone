import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import ModalContainer from "../components/ModalContainer";
import { useRecoilState } from "recoil";
import {
  uploadPhotoModalState,
  postOptionsModalState,
} from "../atoms/modalAtom";
import UploadPhotoModal from "../components/UploadPhotoModal";
import PostOptionsModal from "../components/PostOptionsModal";

export default function Home() {
  const [isUploadPhotoModalOpen, setIsUploadPhotoModalOpen] = useRecoilState(
    uploadPhotoModalState
  );

const [isPostOptionsModalOpen, setIsPostOptionsModalOpen] = useRecoilState(
    postOptionsModalState
  );

  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram 2.0 Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      <ModalContainer
        DisplayModal={UploadPhotoModal}
        isOpen={isUploadPhotoModalOpen}
        onClose={() => setIsUploadPhotoModalOpen(false)}
      />

      <ModalContainer
        DisplayModal={PostOptionsModal}
        isOpen={isPostOptionsModalOpen.isOpen}
        //onClose={}
      />

      {/* Feed */}
      <Feed />

      {/* Modal */}
    </div>
  );
}
