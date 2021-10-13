import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

export default function Home() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram 2.0 Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />

      {/* Feed */}
      <Feed />

      {/* Modal */}
      <Modal />
    </div>
  );
}
