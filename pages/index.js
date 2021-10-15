import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import ModalContainer from "../components/ModalContainer";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import UploadPhotoModal from "../components/UploadPhotoModal";

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram 2.0 Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      <ModalContainer DisplayModal={UploadPhotoModal} />

      {/* Feed */}
      <Feed />

      {/* Modal */}
    </div>
  );
}
