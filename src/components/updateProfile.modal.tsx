"use client";

import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { X } from "lucide-react";
import { API_URL, IMAGE_URL } from "@/config";
import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const UpdateProfileModal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  const user = useAppSelector((state) => state.auth.user);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  if (!isVisible) return null;

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Get the cookie value
      const token = getCookie("access_token") as string;

      await axios.patch(
        `${API_URL}/api/auth/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the cookie value in the request
          },
        }
      );

      alert("Upload Profile Image Success");

      onClose();
    } catch (err) {
      alert("Error uploading image");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex backdrop-filter backdrop-brightness-75 backdrop-blur-md justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button
          className="text-red-600 bg-black rounded-md text-lg place-self-end"
          onClick={() => onClose()}
        >
          <X />
        </button>
        <div className="flex flex-col gap-4 bg-white p-4 w-[600px] h-[275px] rounded-xl text-black border-2 border-black">
          <h2 className="text-2xl font-bold text-[#112D4E]">
            Update Profile Picture
          </h2>
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="selected-picture"
              className="border-black border-solid border-1 rounded-sm"
              width={100}
              height={100}
            />
          ) : (
            <Image
              src={IMAGE_URL + user.profile_picture}
              alt="profile-picture"
              className="border-black border-solid border-1 rounded-sm"
              width={100}
              height={100}
            />
          )}
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedFile(file);
                setPreviewUrl(URL.createObjectURL(file));
              } else {
                setSelectedFile(null);
                setPreviewUrl("");
              }
            }}
            className="file:bg-[#112D4E] file:w-[125px] file:py-1 file:px-3 file:mr-4 file:rounded-md hover:file:bg-amber-300 file:text-white"
          />
          <button
            className="text-white bg-yellow-400 w-[125px] rounded-md text-lg hover:bg-red-500"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
