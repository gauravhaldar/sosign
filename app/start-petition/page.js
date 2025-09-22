"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaYoutube, FaPlus } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function StartPetitionPage() {
  const { user, loading: authLoading, clearUser } = useAuth();
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

  // Handle authentication loading and redirect
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/start-petition");
    }
  }, [user, authLoading, router]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Validation functions for each step
  const isStep1Valid = () => {
    return formData.title.trim() !== "";
  };

  const isStep2Valid = () => {
    // At least one recipient with name and valid email (must contain @)
    return recipients.some(
      (recipient) =>
        recipient.name.trim() !== "" && 
        recipient.email.trim() !== "" &&
        recipient.email.includes("@")
    );
  };

  const isStep3Valid = () => {
    return formData.problem.trim() !== "" && formData.solution.trim() !== "";
  };

  const isStep4Valid = () => {
    const { name, age, email, mobile, location, aadharNumber } =
      formData.starter;
    return (
      name.trim() !== "" &&
      age.trim() !== "" &&
      email.trim() !== "" &&
      mobile.trim() !== "" &&
      location.trim() !== "" &&
      aadharNumber.trim() !== ""
    );
  };

  // Function to check if current step is valid
  const isCurrentStepValid = () => {
    switch (step) {
      case 1:
        return isStep1Valid();
      case 2:
        return isStep2Valid();
      case 3:
        return isStep3Valid();
      case 4:
        return isStep4Valid();
      default:
        return false;
    }
  };

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
        starter: { ...prev.starter, [starterField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("country", formData.country);

      const validRecipients = recipients.filter((r) => r.name && r.email);
      submitData.append("decisionMakers", JSON.stringify(validRecipients));

      const petitionDetails = {
        problem: formData.problem,
        solution: formData.solution,
        videoUrl: formData.videoUrl,
      };
      submitData.append("petitionDetails", JSON.stringify(petitionDetails));
      submitData.append("petitionStarter", JSON.stringify(formData.starter));

      if (selectedImage) {
        submitData.append("image", selectedImage);
      }

      // Check if user and token are available
      if (!user || !user.token) {
        setIsSubmitting(false);
        alert("User not authenticated. Please log in to create a petition.");
        router.push("/login?redirect=/start-petition");
        return;
      }

      // Make the request with Authorization header
      const response = await fetch("/api/petitions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to the my-petition page after successful creation
        router.push("/my-petition");
      } else {
        // Handle authentication errors specifically
        if (response.status === 401) {
          // Token is invalid or expired
          alert("Your session has expired. Please log in again.");
          // Clear user data and redirect to login
          clearUser();
          router.push("/login?redirect=/start-petition");
          return;
        }
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
            <label className="block mb-2 font-medium">
              Petition Title <span className="text-red-500">*</span>
            </label>
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
              Add email address of decision makers{" "}
              <span className="text-red-500">
                (At least one recipient with name and valid email is required)
              </span>
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
                    placeholder="Name *"
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
                    className={`w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 ${
                      recipient.email && !recipient.email.includes("@") 
                        ? "border-red-500 bg-red-50" 
                        : ""
                    }`}
                    placeholder="Email *"
                  />
                  {recipient.email && !recipient.email.includes("@") && (
                    <p className="text-red-500 text-sm mt-1">
                      Email is required
                    </p>
                  )}
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
                className="text-[#3650AD] font-semibold hover:underline"
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
              Describe the People Involved and the Problem They Are Facing:{" "}
              <span className="text-red-500">*</span>
            </h3>
            <textarea
              value={formData.problem}
              onChange={(e) => handleInputChange("problem", e.target.value)}
              className="w-full border p-3 rounded-lg shadow-sm mb-4"
              rows="3"
              placeholder="Describe the problem in detail..."
            />
            <h3 className="font-semibold mb-2">
              Describe the Solution: <span className="text-red-500">*</span>
            </h3>
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
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
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
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age <span className="text-red-500">*</span>
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
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
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
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number <span className="text-red-500">*</span>
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
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location <span className="text-red-500">*</span>
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
              whileHover={
                isStep4Valid() && !isSubmitting ? { scale: 1.05 } : {}
              }
              whileTap={isStep4Valid() && !isSubmitting ? { scale: 0.95 } : {}}
              onClick={handleSubmit}
              disabled={isSubmitting || !isStep4Valid()}
              className={`mt-6 px-6 py-3 font-bold rounded-lg w-full shadow-lg transition-all duration-200 ${
                isSubmitting || !isStep4Valid()
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Petition"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

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
            whileHover={isCurrentStepValid() ? { scale: 1.05 } : {}}
            whileTap={isCurrentStepValid() ? { scale: 0.95 } : {}}
            onClick={nextStep}
            disabled={!isCurrentStepValid()}
            className={`px-6 py-2 rounded-lg shadow-md transition-all duration-200 ${
              isCurrentStepValid()
                ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next
          </motion.button>
        )}
      </div>
    </div>
  );
}
