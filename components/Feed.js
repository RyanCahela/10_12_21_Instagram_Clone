import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();
  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${
        !session && "!grid-cols-1 !max-w-3xl"
      }`}>
      {/* Section Left */}
      <section className={`col-span-2 ${!session && "!col-span-1"}`}>
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>

      <section className="hidden xl:inline-grid md:col-span-1">
        {/* Section Right */}
        {session ? (
          <div className="fixed">
            {/* Mini Profile */}

            <MiniProfile />
            {/* Suggestions */}
            <Suggestions />
          </div>
        ) : (
          <div></div>
        )}
      </section>
    </main>
  );
}

export default Feed;
