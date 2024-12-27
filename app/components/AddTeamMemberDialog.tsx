import { useState } from "react";
import axios from "axios";

const expertiseOptions = ["Illustrator", "UI/UX Designer", "Brand Strategist"];

export default function AddTeamMemberDialog({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TeamMemberData) => void;
}) {
  const [name, setName] = useState("");
  const [expertise, setExpertise] = useState(expertiseOptions[0]);
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !experience || !image) {
      alert("Please fill in all fields.");
      return;
    }

    const teamMemberData: TeamMemberData = {
      name,
      expertise,
      experience: parseInt(experience),
      image,
    };

    const formData = new FormData();

    // Append other form fields
    formData.append("name", name); // Name from state/input
    formData.append("expertise", expertise); // Expertise from dropdown
    formData.append("experience", experience); // Experience from state/input

    // Append the file
    formData.append("image", image); // imageFile should be the selected File object from an input field

    try {
      const res = await axios.post("/api/teamMembers", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required to process FormData
        },
      });

      if (res.status === 201) {
        alert("Team member added successfully!");
      } else {
        alert("Failed to add team member.");
      }

      console.log("Team member added successfully:", res.data);
    } catch (error) {
      console.log(
        "Error adding team member:",
        error.response?.data || error.message
      );
    }

    onSubmit(teamMemberData); // Pass the data back to the parent
    onClose(); // Close the dialog after submitting
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Add Team Member</h3>
        <form onSubmit={handleFormSubmit}>
          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-800 border border-gray-300 rounded-md p-2"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-24 w-24 object-cover rounded-full"
                />
              </div>
            )}
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full text-sm text-gray-800 border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Expertise Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Expertise
            </label>
            <select
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              className="mt-1 block w-full text-sm text-gray-800 border border-gray-300 rounded-md p-2"
              required
            >
              {expertiseOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Years of Experience */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Years of Experience
            </label>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-1 block w-full text-sm text-gray-800 border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export type TeamMemberData = {
  name: string;
  expertise: string;
  experience: number;
  image: File;
};
