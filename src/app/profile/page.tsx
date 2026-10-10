"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface ExtendedUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  createdAt?: Date;
  phone?: string;
  dob?: string;
  location?: string;
}

const Profilepage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const extendedUser = user as ExtendedUser | undefined;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    location: "",
  });

  const handleEditClick = () => {
    setFormData({
      name: user?.name || "",
      phone: extendedUser?.phone || "",
      dob: extendedUser?.dob || "",
      location: extendedUser?.location || "",
    });
    setIsEditing(true);
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await authClient.updateUser({
        name: formData.name,
        fetchOptions: {
          body: {
            phone: formData.phone,
            dob: formData.dob,
            location: formData.location,
          },
        },
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Not Authenticated
          </h2>
          <button
            onClick={() => router.push("/signIn")}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="h-32 bg-linier-to-r from-blue-500 to-indigo-600 sm:h-48"></div>

          <div className="px-4 pb-8 sm:px-8">
            <div className="relative -mt-16 sm:-mt-24 flex justify-between items-end">
              <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
                {user.image ? (
                  <Image
                    alt={user.name || "User Avatar"}
                    src={user.image}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-4xl font-bold text-gray-500">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>

              <div className="mb-2 sm:mb-4 flex gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="rounded-lg bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleEditClick}
                      className="rounded-lg bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-sm font-medium text-gray-500 mt-1">
                {user.email}
              </p>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8">
              <h2 className="text-lg font-semibold text-gray-900">About</h2>
              <p className="mt-2 text-sm text-gray-600">
                Hello! I am {user.name}. Welcome to my profile. I am currently
                exploring and building awesome web applications.
              </p>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8">
              <h2 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h2>

              <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      user.name
                    )}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      extendedUser?.phone || "Not provided"
                    )}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of birth
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {isEditing ? (
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      extendedUser?.dob || "Not provided"
                    )}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Location
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      extendedUser?.location || "Not provided"
                    )}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Member since
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "Recently joined"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
