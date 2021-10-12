import React from "react";
import Stories from "./Stories";

function Feed() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-col-3 xl:max-w-6xl mx-auto">
      {/* Section Left */}
      <section className="cols-span-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}
      </section>

      <section>
        {/* Section Right */}
        {/* Mini Profile */}
        {/* Suggestions */}
      </section>
    </main>
  );
}

export default Feed;
