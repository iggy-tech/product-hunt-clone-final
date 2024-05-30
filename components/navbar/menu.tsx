"use client";

import { useState } from "react";
import LaunchesMenu from "./menus/launches-menu";
import Link from "next/link";
import CommunityMenu from "./menus/community-menu";
import AboutMenu from "./menus/about-menu";

const Menu = () => {
  const [showLaunchesMenu, setShowLaunchesMenu] = useState(false);
  const [showCommunityMenu, setShowCommunityMenu] = useState(false);
  const [showAboutMenu, setShowAboutMenu] = useState(false);

  return (
    <div className="hidden lg:flex items-center relative">
      <div className="space-x-6 text-gray-600 text-sm flex items-center cursor-pointer">
        <div
          onMouseEnter={() => setShowLaunchesMenu(true)}
          onMouseLeave={() => setShowLaunchesMenu(false)}
          className="hover:text-[#ff6154] py-4"
        >
          Launches {showLaunchesMenu && <LaunchesMenu />}
        </div>

        <Link href={"/categories"} className="hover:text-[#ff6154]">
          Categories
        </Link>

        <div
        onMouseEnter={() => setShowCommunityMenu(true)}
        onMouseLeave={() => setShowCommunityMenu(false)}
        className="hover:text-[#ff6154] py-4"
        
        >
            Community {showCommunityMenu && <CommunityMenu />}
        </div>

        <div className="hover:text-[#ff6154] py-4">Advertise</div>

        <div
        onMouseEnter={() => setShowAboutMenu(true)}
        onMouseLeave={() => setShowAboutMenu(false)}
        className="hover:text-[#ff6154] py-4"
        
        >
            About {showAboutMenu && <AboutMenu />}
        </div>
      </div>
    </div>
  );
};

export default Menu;
