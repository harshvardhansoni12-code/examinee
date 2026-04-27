"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const UserButton = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Show loading state
  if (status === "loading") {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }

  if (!session || !session.user) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          {/* User Icon */}
          <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-100 text-blue-600 flex items-center justify-center font-semibold border-2 border-white shadow-md">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          {/* Dropdown Arrow */}
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <>
            {/* Overlay to close on click outside */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsDropdownOpen(false)}
            ></div>

            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
              {/* Sign Up */}
              <button
                onClick={() => {
                  router.push("/authpage");
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2 font-semibold"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  const { name, email, image } = session.user;

  // Get first letter of name or email
  const getInitial = () => {
    if (name && name.length > 0) {
      return name.charAt(0).toUpperCase();
    }
    if (email && email.length > 0) {
      return email.charAt(0).toUpperCase();
    }
    return "U";
  };

  // Get display name
  const getDisplayName = () => {
    return name || email || "User";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {/* Profile Image or Initial */}
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 text-black flex items-center justify-center font-semibold border-2 border-white shadow-md">
          {image ? (
            <img
              src={image}
              alt={getDisplayName()}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg">{getInitial()}</span>
          )}
        </div>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <>
          {/* Overlay to close on click outside */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          ></div>

          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-800">
                {getDisplayName()}
              </p>
              <p className="text-xs text-gray-500 truncate">{email}</p>
            </div>

            {/* Menu Items */}
            <a
              href="/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Dashboard
            </a>

            {/* Divider */}
            <div className="border-t border-gray-100 my-2"></div>

            {/* Sign Out */}
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
                setIsDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};
