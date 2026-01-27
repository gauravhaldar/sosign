"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import {
    FaWallet,
    FaPlus,
    FaMinus,
    FaArrowUp,
    FaArrowDown,
    FaHistory,
    FaSpinner,
} from "react-icons/fa";

export default function WalletPage() {
    const { user, walletBalance, fetchWalletBalance } = useAuth();
    const router = useRouter();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addAmount, setAddAmount] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    // Fetch wallet data
    useEffect(() => {
        const fetchWalletData = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (!storedUser) return;

                const userData = JSON.parse(storedUser);
                if (!userData.token) return;

                const backendUrl =
                    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
                const response = await fetch(`${backendUrl}/api/wallet`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTransactions(data.transactions || []);
                }
            } catch (error) {
                console.error("Failed to fetch wallet data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchWalletData();
        }
    }, [user]);

    const handleAddMoney = async (e) => {
        e.preventDefault();
        if (!addAmount || parseFloat(addAmount) <= 0) {
            setMessage({ type: "error", text: "Please enter a valid amount" });
            return;
        }

        setIsAdding(true);
        setMessage({ type: "", text: "" });

        try {
            const storedUser = localStorage.getItem("user");
            const userData = JSON.parse(storedUser);

            const backendUrl =
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
            const response = await fetch(`${backendUrl}/api/wallet/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userData.token}`,
                },
                body: JSON.stringify({
                    amount: parseFloat(addAmount),
                    description: "Added money to wallet",
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: "Money added successfully!" });
                setAddAmount("");
                setShowAddForm(false);
                fetchWalletBalance();
                // Add the new transaction to the list
                setTransactions((prev) => [data.transaction, ...prev]);
            } else {
                setMessage({ type: "error", text: data.message || "Failed to add money" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "An error occurred. Please try again." });
        } finally {
            setIsAdding(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const quickAmounts = [100, 500, 1000, 2000];

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold text-[#302d55] mb-2">My Wallet</h1>
                    <p className="text-gray-500">Manage your wallet balance</p>
                </motion.div>

                {/* Balance Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-r from-[#F43676] to-[#e02a60] rounded-3xl p-8 mb-8 shadow-xl shadow-pink-200/50"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <FaWallet className="text-white text-2xl" />
                        </div>
                        <div>
                            <p className="text-white/80 text-sm">Available Balance</p>
                            <h2 className="text-4xl font-bold text-white">
                                ₹{walletBalance.toFixed(2)}
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="w-full bg-white text-[#F43676] font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                    >
                        <FaPlus className="text-sm" />
                        Add Money
                    </button>
                </motion.div>

                {/* Add Money Form */}
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-100"
                    >
                        <h3 className="text-lg font-semibold text-[#302d55] mb-4">
                            Add Money to Wallet
                        </h3>

                        {message.text && (
                            <div
                                className={`p-3 rounded-lg mb-4 ${message.type === "success"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {message.text}
                            </div>
                        )}

                        {/* Quick Amount Buttons */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {quickAmounts.map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => setAddAmount(amount.toString())}
                                    className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${addAmount === amount.toString()
                                            ? "border-[#F43676] bg-pink-50 text-[#F43676]"
                                            : "border-gray-200 hover:border-[#F43676] text-gray-600"
                                        }`}
                                >
                                    ₹{amount}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleAddMoney}>
                            <div className="relative mb-4">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                                    ₹
                                </span>
                                <input
                                    type="number"
                                    value={addAmount}
                                    onChange={(e) => setAddAmount(e.target.value)}
                                    placeholder="Enter amount"
                                    min="1"
                                    step="0.01"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#F43676] focus:outline-none text-lg"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isAdding}
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#F43676] to-[#e02a60] text-white font-medium hover:shadow-lg hover:shadow-pink-300/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isAdding ? (
                                        <>
                                            <FaSpinner className="animate-spin" />
                                            Adding...
                                        </>
                                    ) : (
                                        "Add Money"
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Transaction History */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <FaHistory className="text-[#F43676]" />
                        <h3 className="text-lg font-semibold text-[#302d55]">
                            Transaction History
                        </h3>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <FaSpinner className="animate-spin text-[#F43676] text-2xl" />
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaWallet className="text-gray-400 text-xl" />
                            </div>
                            <p className="text-gray-500">No transactions yet</p>
                            <p className="text-gray-400 text-sm">
                                Add money to your wallet to get started
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {transactions.map((transaction, index) => (
                                <motion.div
                                    key={transaction._id || index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === "credit"
                                                ? "bg-green-100"
                                                : "bg-red-100"
                                            }`}
                                    >
                                        {transaction.type === "credit" ? (
                                            <FaArrowDown className="text-green-600" />
                                        ) : (
                                            <FaArrowUp className="text-red-600" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-[#302d55]">
                                            {transaction.description}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {formatDate(transaction.createdAt)}
                                        </p>
                                    </div>
                                    <p
                                        className={`font-semibold ${transaction.type === "credit"
                                                ? "text-green-600"
                                                : "text-red-600"
                                            }`}
                                    >
                                        {transaction.type === "credit" ? "+" : "-"}₹
                                        {transaction.amount.toFixed(2)}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
