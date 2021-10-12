import React from "react";
import Image from "next/image";

import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";

import { HomeIcon } from "@heroicons/react/outline";

function Header() {
  return (
    <div>
      <div className="flex justify-between max-w-6xl bg-red-500 mx-5 lg:mx-auto">
        {/* Left */}
        <div className="relative hidden lg:inline-grid w-24 h-24">
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="relative inline-grid lg:hidden w-10 h-10 flex-shrink-0">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Middle */}
        <div className="">
          <div className="mt-1 relative rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-red-300 rounded-md focus:ring-black focus:border-black"
              type="text"
              name=""
              id=""
              placeholder="search"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navButton" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          <PaperAirplaneIcon className="navButton" />
          <PlusCircleIcon className="navButton" />
          <UserGroupIcon className="navButton" />
          <HeartIcon className="navButton" />

          <img
            src="https://links.papareact.com/3ke"
            alt="profile pic"
            className="h-10 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
