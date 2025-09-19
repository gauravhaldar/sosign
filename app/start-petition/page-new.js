"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaYoutube, FaPlus } from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function StartPetitionPage() {
  const user = useAuthRedirect();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [recipients, setRecipients] = useState([
    { name: "", organization: "", email: "", phone: "" },
  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 4;

  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    country: "India",
    petitionDescription: "",
    problem: "",
    solution: "",
    videoUrl: "",
    starter: {
      name: "",
      age: "",
      email: "",
      mobile: "",
      location: "",
      comment: "",
      aadharNumber: "",
      panNumber: "",
      voterNumber: "",
      pincode: "",
      mpConstituencyNumber: "",
      mlaConstituencyNumber: "",
    },
  });

  // If user is not logged in, the hook will redirect, so we don't render anything
  if (user === null) {
    return null;
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const addRecipient = () => {
    setRecipients([
      ...recipients,
      { name: "", organization: "", email: "", phone: "" },
    ]);
  };

  const updateRecipient = (index, field, value) => {
    const updatedRecipients = recipients.map((recipient, i) =>
      i === index ? { ...recipient, [field]: value } : recipient
    );
    setRecipients(updatedRecipients);
  };

  const handleInputChange = (field, value) => {
    if (field.startsWith("starter.")) {
      const starterField = field.replace("starter.", "");
      setFormData((prev) => ({
        ...prev,
        starter: {
          ...prev.starter,
          [starterField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Prepare form data for submission
      const submitData = new FormData();

      // Add basic petition data
      submitData.append("title", formData.title);
      submitData.append("country", formData.country);

      // Add decision makers
      const validRecipients = recipients.filter((r) => r.name && r.email);
      submitData.append("decisionMakers", JSON.stringify(validRecipients));

      // Add petition details
      const petitionDetails = {
        problem: formData.problem,
        solution: formData.solution,
        videoUrl: formData.videoUrl,
      };
      submitData.append("petitionDetails", JSON.stringify(petitionDetails));

      // Add petition starter info
      submitData.append("petitionStarter", JSON.stringify(formData.starter));

      // Add image if selected
      if (selectedImage) {
        submitData.append("image", selectedImage);
      }

      // Submit to backend
      const response = await fetch("/api/petitions", {
        method: "POST",
        credentials: "include",
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to success page with petition ID
        router.push(`/petition-success?id=${result.petition._id}`);
      } else {
        throw new Error(result.message || "Failed to create petition");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit petition. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 50, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -50, scale: 0.95 },
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <motion.div
        className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(step / totalSteps) * 100}%` }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </motion.div>

      {/* Animate Steps */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-extrabold mb-2 text-gray-700">
              Create a Powerful Online Petition in Minutes!
            </h1>
            <p className="mb-6 text-gray-600">
              Start by filling out this form, and in a few minutes you will be
              ready to collect thousands of signatures.
            </p>
            <label className="block mb-2 font-medium">Petition Title</label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "#0ea5e9" }}
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full border p-3 rounded-lg shadow-sm mb-4 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter petition title"
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Who can make it happen?
            </h2>
            <p className="mb-4 font-medium text-gray-600">
              Add email address of decision makers
            </p>
            <div className="space-y-3">
              {recipients.map((recipient, recipientIdx) => (
                <div key={recipientIdx} className="space-y-3">
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: "#0ea5e9" }}
                    type="text"
                    value={recipient.name}
                    onChange={(e) =>
                      updateRecipient(recipientIdx, "name", e.target.value)
                    }
                    className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="Name"
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: "#0ea5e9" }}
                    type="text"
                    value={recipient.organization}
                    onChange={(e) =>
                      updateRecipient(
                        recipientIdx,
                        "organization",
                        e.target.value
                      )
                    }
                    className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="Office title or organization"
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: "#0ea5e9" }}
                    type="email"
                    value={recipient.email}
                    onChange={(e) =>
                      updateRecipient(recipientIdx, "email", e.target.value)
                    }
                    className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="Email"
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: "#0ea5e9" }}
                    type="tel"
                    value={recipient.phone}
                    onChange={(e) =>
                      updateRecipient(recipientIdx, "phone", e.target.value)
                    }
                    className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="Phone number"
                  />
                </div>
              ))}
              <button
                onClick={addRecipient}
                className="text-blue-600 font-semibold hover:underline"
              >
                + Add another recipient
              </button>
              <div>
                <label className="block font-medium mb-2">
                  Country or Region
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="w-full border p-3 rounded-lg shadow-sm"
                >
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Petition Details
            </h2>
            <h3 className="font-semibold mb-2">
              Describe the People Involved and the Problem They Are Facing:
            </h3>
            <textarea
              value={formData.problem}
              onChange={(e) => handleInputChange("problem", e.target.value)}
              className="w-full border p-3 rounded-lg shadow-sm mb-4"
              rows="3"
              placeholder="Describe the problem in detail..."
            />
            <h3 className="font-semibold mb-2">Describe the Solution:</h3>
            <textarea
              value={formData.solution}
              onChange={(e) => handleInputChange("solution", e.target.value)}
              className="w-full border p-3 rounded-lg shadow-sm mb-4"
              rows="3"
              placeholder="What solution do you propose?"
            />
            <label className="block font-medium mb-2">
              Upload Image (optional)
            </label>
            <div
              className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer mb-4 relative"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              {selectedImage ? (
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="w-full h-full object-cover rounded-lg"
                  width={500}
                  height={300}
                />
              ) : (
                <FaPlus className="text-gray-400 text-5xl" />
              )}
              <input
                id="imageUpload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </div>
            <div className="relative mb-4">
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                className="w-full border p-3 rounded-lg shadow-sm pl-10"
                placeholder="Add YouTube video link (optional)"
              />
              <FaYoutube className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 text-xl" />
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Signing Form Configuration
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {/* Full name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.starter.name}
                  onChange={(e) =>
                    handleInputChange("starter.name", e.target.value)
                  }
                  className="w-full border p-3 rounded-lg shadow-sm"
                  placeholder="Full name"
                />
              </div>
              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.starter.age}
                  onChange={(e) =>
                    handleInputChange("starter.age", e.target.value)
                  }
                  className="w-full border p-3 rounded-lg shadow-sm"
                  placeholder="Age"
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.starter.email}
                  onChange={(e) =>
                    handleInputChange("starter.email", e.target.value)
                  }
                  className="w-full border p-3 rounded-lg shadow-sm"
                  placeholder="Email"
                />
              </div>
              {/* Mobile number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={formData.starter.mobile}
                  onChange={(e) =>
                    handleInputChange("starter.mobile", e.target.value)
                  }
                  className="w-full border p-3 rounded-lg shadow-sm"
                  placeholder="Mobile number"
                />
              </div>
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.starter.location}
                  onChange={(e) =>
                    handleInputChange("starter.location", e.target.value)
                  }
                  className="w-full border p-3 rounded-lg shadow-sm"
                  placeholder="Location"
                />
              </div>
              {/* Comment/Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Comment/Notes
                </label>
                <textarea
                  value={formData.starter.comment}
                  onChange={(e) =>
                    handleInputChange("starter.comment", e.target.value)
                  }
                  className="w-full border p-3 rounded-lg shadow-sm"
                  placeholder="Comment/Notes"
                  rows="3"
                />
              </div>
              {/* Aadhar Card */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Aadhar Card <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.starter.aadharNumber}
                    onChange={(e) =>
                      handleInputChange("starter.aadharNumber", e.target.value)
                    }
                    className="w-full border p-3 rounded-lg shadow-sm"
                    placeholder="Enter Aadhar number"
                    required
                  />
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    Send OTP
                  </button>
                </div>
                <div className="flex space-x-2 mt-2">
                  <input
                    type="text"
                    disabled
                    className="w-full border p-3 rounded-lg shadow-sm bg-gray-100"
                    placeholder="Enter OTP"
                  />
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
              {/* PAN Card */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PAN Card
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.starter.panNumber}
                    onChange={(e) =>
                      handleInputChange("starter.panNumber", e.target.value)
                    }
                    className="w-full border p-3 rounded-lg shadow-sm"
                    placeholder="Enter PAN number"
                  />
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    Send OTP
                  </button>
                </div>
                <div className="flex space-x-2 mt-2">
                  <input
                    type="text"
                    disabled
                    className="w-full border p-3 rounded-lg shadow-sm bg-gray-100"
                    placeholder="Enter OTP"
                  />
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
              {/* Voter ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Voter ID
                </label>
                <input
                  type="text"
                  value={formData.starter.voterNumber}
                  onChange={(e) =>
                    handleInputChange("starter.voterNumber", e.target.value)
                  }
                  className="w-full border p-3 rounded-lg shadow-sm"
                  placeholder="Voter ID (optional)"
                />
              </div>
              {/* Pincode */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pincode
                </label>
                <input
                  type="text"
                  value={formData.starter.pincode}
                  onChange={(e) =>
                    handleInputChange("starter.pincode", e.target.value)
                  }
                  className="w-full border p-3 rounded-lg shadow-sm"
                  placeholder="Pincode"
                />
              </div>
              {/* MP Constituency Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  MP Constituency Number
                </label>
                <input
                  type="text"
                  value={formData.starter.mpConstituencyNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "starter.mpConstituencyNumber",
                      e.target.value
                    )
                  }
                  className="w-full border p-3 rounded-lg shadow-sm"
                  placeholder="MP Constituency Number"
                />
              </div>
              {/* MLA Constituency Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  MLA Constituency Number
                </label>
                <input
                  type="text"
                  value={formData.starter.mlaConstituencyNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "starter.mlaConstituencyNumber",
                      e.target.value
                    )
                  }
                  className="w-full border p-3 rounded-lg shadow-sm"
                  placeholder="MLA Constituency Number"
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`mt-6 px-6 py-3 font-bold rounded-lg w-full shadow-lg ${
                isSubmitting
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Petition"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {step > 1 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevStep}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg shadow-md"
          >
            Previous
          </motion.button>
        )}
        {step < totalSteps && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextStep}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg shadow-md"
          >
            Next
          </motion.button>
        )}
      </div>
    </div>
  );
}
