"use client";
import { forwardRef } from "react";
import Link from "next/link";
import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Edit, Verified } from "@mui/icons-material";

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img className="w-32 h-auto" src="/logos/1.png" alt="company logo" />
        </picture>
      </div>

      <div className="flex flex-col">
        <Link href="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div>
              <p>Presales Dashboard</p>
            </div>
          </div>
        </Link>
        <Link href="/submittedcoins">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/create"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div>
              <p className="text-sm">Submitted Presales</p>
            </div>
          </div>
        </Link>

        <Link href="/submittedlisting">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/create"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div>
              <p className="text-sm">Submitted Listing</p>
            </div>
          </div>
        </Link>

        <Link href="/approvedlistings">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/orders"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div>
              <p className="text-sm">Approved Listing</p>
            </div>
          </div>
        </Link>

        <Link href="/approvedcoins">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/orders"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div>
              <p className="text-sm">Approved Presales</p>
            </div>
          </div>
        </Link>

        <Link href="/editcoins">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/orders"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div>
              <p className="text-sm">Edit Presales</p>
            </div>
          </div>
        </Link>
        <Link href="/createmeetup">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/createmeetup"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div>
              <p className="text-sm">Create Meetup</p>
            </div>
          </div>
        </Link>

        <Link href="/createnews">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/createnews"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div>
              <p className="text-sm">Create News</p>
            </div>
          </div>
        </Link>

        <Link href="/advertbanners">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/advertbanners"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div>
              <p className="text-sm">Add Advert Banners</p>
            </div>
          </div>
        </Link>

        <Link href="/tokenrequests">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/tokenrequests"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div>
              <p className="text-sm">Token Requests</p>
            </div>
          </div>
        </Link>

        <Link href="/edittokens">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/edittokens"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div>
              <p className="text-sm">Edit Tokens</p>
            </div>
          </div>
        </Link>
        <Link href="/cexbanners">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/cexbanners"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div>
              <p className="text-sm">CEX GATE Banners</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
