"use client";
import Container from "@/components/container";
import { arapey, inter, openSans } from "@/lib/fonts";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/app/config";
import { AUTH_TOKEN_KEY, clearAuthStorage } from "@/lib/authGate";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiPackage,
  FiMapPin,
  FiHeart,
  FiLogOut,
  FiSettings,
  FiBox,
  FiChevronRight,
  FiX,
  FiMail,
  FiPhone,
  FiCalendar,
  FiTruck,
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiMapPin as FiMapPinAlt,
} from "react-icons/fi";

function ProfileSkeleton() {
  return (
    <>
      <div className="relative z-10 bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-4xl p-7 md:p-9 mb-8 overflow-hidden animate-pulse">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col sm:flex-row items-start gap-6 flex-1">
            <div className="w-28 h-28 rounded-full bg-emerald-100" />
            <div className="flex-1 space-y-3">
              <div className="h-3 w-24 bg-emerald-100 rounded" />
              <div className="h-10 w-56 bg-emerald-100 rounded" />
              <div className="h-4 w-64 bg-emerald-100 rounded" />
              <div className="h-4 w-48 bg-emerald-100 rounded" />
              <div className="flex flex-wrap gap-2">
                <div className="h-7 w-28 bg-emerald-100 rounded-full" />
                <div className="h-7 w-32 bg-emerald-100 rounded-full" />
                <div className="h-7 w-36 bg-emerald-100 rounded-full" />
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="h-9 w-28 bg-emerald-100 rounded-full" />
                <div className="h-9 w-32 bg-emerald-100 rounded-full" />
                <div className="h-9 w-36 bg-emerald-100 rounded-full" />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[320px]">
            <div className="rounded-2xl border border-emerald-100 bg-white/90 p-4">
              <div className="h-3 w-20 bg-emerald-100 rounded" />
              <div className="grid grid-cols-3 gap-3 mt-3">
                <div className="h-20 bg-emerald-100 rounded-xl" />
                <div className="h-20 bg-emerald-100 rounded-xl" />
                <div className="h-20 bg-emerald-100 rounded-xl" />
              </div>
              <div className="h-10 bg-emerald-100 rounded-xl mt-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 animate-pulse">
        <div className="w-full lg:w-1/4">
          <div className="bg-white/85 backdrop-blur-sm border border-emerald-100 rounded-2xl p-3">
            <div className="h-6 w-24 bg-emerald-100 rounded mx-3 my-2" />
            <div className="space-y-2 p-2">
              <div className="h-10 bg-emerald-100 rounded-xl" />
              <div className="h-10 bg-emerald-100 rounded-xl" />
              <div className="h-10 bg-emerald-100 rounded-xl" />
              <div className="h-10 bg-emerald-100 rounded-xl" />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-28 bg-white/90 border border-emerald-100 rounded-2xl" />
            <div className="h-28 bg-white/90 border border-emerald-100 rounded-2xl" />
            <div className="h-28 bg-white/90 border border-emerald-100 rounded-2xl" />
          </div>
          <div className="h-72 bg-white/90 border border-emerald-100 rounded-2xl" />
        </div>
      </div>
    </>
  );
}

function OrderDetailsModal({ isOpen, order, onClose }) {
  if (!isOpen || !order) return null;

  const statusLabel =
    order.status.charAt(0).toUpperCase() + order.status.slice(1);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#102017]/45 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl border border-emerald-100 bg-white shadow-[0_30px_80px_-40px_rgba(17,42,28,0.65)] overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-50 bg-[linear-gradient(140deg,#f5fcf7_0%,#edf7ef_100%)]">
          <div>
            <p className="text-xs tracking-[0.14em] uppercase text-[#4c6a5b] font-semibold">
              Order Details
            </p>
            <h3 className={`${inter.className} text-xl text-[#1b2b22] mt-1`}>
              {order.id}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full border border-emerald-200 text-[#2a5a43] hover:bg-emerald-50 transition-colors flex items-center justify-center"
            aria-label="Close order details"
          >
            <FiX size={17} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-emerald-100 bg-[#f9fcfa] p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-[#6f7f77]">
                Date
              </p>
              <p className="text-[#1d2e25] font-semibold mt-1">{order.date}</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-[#f9fcfa] p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-[#6f7f77]">
                Total
              </p>
              <p className="text-[#1d2e25] font-semibold mt-1">
                ৳{order.total}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-[#f9fcfa] p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-[#6f7f77]">
              Status
            </p>
            <p className="text-[#1d2e25] font-semibold mt-1">{statusLabel}</p>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-[#f9fcfa] p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-[#6f7f77]">
              Note
            </p>
            <p className="text-sm text-[#5f6f67] mt-1">
              Detailed item-level breakdown will appear here when the order
              details endpoint is connected.
            </p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-[#00be62] text-white py-3 font-medium hover:bg-[#00a757] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function AddAddressModal({
  isOpen,
  form,
  isSubmitting,
  error,
  onClose,
  onChange,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#102017]/45 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl border border-emerald-100 bg-white shadow-[0_30px_80px_-40px_rgba(17,42,28,0.65)] overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-50 bg-[linear-gradient(140deg,#f5fcf7_0%,#edf7ef_100%)]">
          <div>
            <p className="text-xs tracking-[0.14em] uppercase text-[#4c6a5b] font-semibold">
              Add Address
            </p>
            <h3 className={`${inter.className} text-xl text-[#1b2b22] mt-1`}>
              New Delivery Address
            </h3>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full border border-emerald-200 text-[#2a5a43] hover:bg-emerald-50 transition-colors flex items-center justify-center"
            aria-label="Close add address modal"
          >
            <FiX size={17} />
          </button>
        </div>

        <form className="p-6 space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="address_type"
              value={form.address_type}
              onChange={onChange}
              placeholder="Address Type (Home, Office)"
              className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#00be62]/20"
              required
            />
            <input
              name="city"
              value={form.city}
              onChange={onChange}
              placeholder="City"
              className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#00be62]/20"
              required
            />
            <input
              name="state"
              value={form.state}
              onChange={onChange}
              placeholder="State"
              className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#00be62]/20"
              required
            />
            <input
              name="postal_code"
              value={form.postal_code}
              onChange={onChange}
              placeholder="Postal Code"
              className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#00be62]/20"
              required
            />
            <input
              name="country"
              value={form.country}
              onChange={onChange}
              placeholder="Country"
              className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#00be62]/20 md:col-span-2"
              required
            />
            <textarea
              name="street"
              value={form.street}
              onChange={onChange}
              placeholder="Street Address"
              className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#00be62]/20 md:col-span-2 min-h-24"
              required
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-[#44574e]">
            <input
              type="checkbox"
              name="is_default"
              checked={form.is_default}
              onChange={onChange}
              className="h-4 w-4 accent-[#00be62]"
            />
            Set as default address
          </label>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-emerald-200 text-[#2b5f46] font-medium hover:bg-emerald-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#00be62] text-white font-semibold hover:bg-[#00a757] transition-colors"
            >
              {isSubmitting ? "Saving..." : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditAddressModal({
  isOpen,
  form,
  isSubmitting,
  error,
  onClose,
  onChange,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#102017]/45 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl border border-emerald-100 bg-white shadow-[0_30px_80px_-40px_rgba(17,42,28,0.65)] overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-50 bg-[linear-gradient(140deg,#f5fcf7_0%,#edf7ef_100%)]">
          <div>
            <p className="text-xs tracking-[0.14em] uppercase text-[#4c6a5b] font-semibold">
              Edit Address
            </p>
            <h3 className={`${inter.className} text-xl text-[#1b2b22] mt-1`}>
              Update Delivery Address
            </h3>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full border border-emerald-200 text-[#2a5a43] hover:bg-emerald-50 transition-colors flex items-center justify-center"
            aria-label="Close edit address modal"
          >
            <FiX size={17} />
          </button>
        </div>

        <form className="p-6 space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="address_type"
              value={form.address_type}
              onChange={onChange}
              placeholder="Address Type"
              className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#00be62]/20"
              required
            />
            <input
              name="city"
              value={form.city}
              onChange={onChange}
              placeholder="City"
              className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#00be62]/20"
              required
            />
            <input
              name="state"
              value={form.state}
              onChange={onChange}
              placeholder="State"
              className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#00be62]/20"
              required
            />
            <input
              name="postal_code"
              value={form.postal_code}
              onChange={onChange}
              placeholder="Postal Code"
              className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#00be62]/20"
              required
            />
            <input
              name="country"
              value={form.country}
              onChange={onChange}
              placeholder="Country"
              className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#00be62]/20 md:col-span-2"
              required
            />
            <textarea
              name="street"
              value={form.street}
              onChange={onChange}
              placeholder="Street Address"
              className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#00be62]/20 md:col-span-2 min-h-24"
              required
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-[#44574e]">
            <input
              type="checkbox"
              name="is_default"
              checked={form.is_default}
              onChange={onChange}
              className="h-4 w-4 accent-[#00be62]"
            />
            Set as default address
          </label>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-emerald-200 text-[#2b5f46] font-medium hover:bg-emerald-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#00be62] text-white font-semibold hover:bg-[#00a757] transition-colors"
            >
              {isSubmitting ? "Updating..." : "Update Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isRecentOrdersLoading, setIsRecentOrdersLoading] = useState(true);
  const [isAllOrdersLoading, setIsAllOrdersLoading] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [ordersError, setOrdersError] = useState("");
  const [profileUser, setProfileUser] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [profileUpdateError, setProfileUpdateError] = useState("");
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState("");
  const [addresses, setAddresses] = useState([
    {
      address_type: "Home",
      phone: "",
      street: "House 12, Road 5, Block B",
      city: "Mirpur 12",
      state: "Dhaka",
      postal_code: "1216",
      country: "Bangladesh",
      is_default: true,
    },
  ]);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isAddressSubmitting, setIsAddressSubmitting] = useState(false);
  const [deletingAddressId, setDeletingAddressId] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [isAddressUpdating, setIsAddressUpdating] = useState(false);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [editAddressError, setEditAddressError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [addressForm, setAddressForm] = useState({
    address_type: "Home",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    country: "Bangladesh",
    is_default: true,
  });
  const [editAddressForm, setEditAddressForm] = useState({
    address_type: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    is_default: false,
  });

  const handleLogout = () => {
    clearAuthStorage();
    router.push("/");
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  const resetAddressForm = () => {
    setAddressForm({
      address_type: "Home",
      street: "",
      city: "",
      state: "",
      postal_code: "",
      country: "Bangladesh",
      is_default: true,
    });
  };

  const openAddAddressModal = () => {
    setAddressError("");
    setIsAddAddressModalOpen(true);
  };

  const closeAddAddressModal = () => {
    setIsAddAddressModalOpen(false);
    setAddressError("");
  };

  const openEditAddressModal = (address) => {
    setEditAddressError("");
    setEditingAddressId(address?.id ?? null);
    setEditAddressForm({
      address_type: address?.address_type || "",
      street: address?.street || "",
      city: address?.city || "",
      state: address?.state || "",
      postal_code: address?.postal_code || "",
      country: address?.country || "",
      is_default: Boolean(address?.is_default),
    });
    setIsEditAddressModalOpen(true);
  };

  const closeEditAddressModal = () => {
    setIsEditAddressModalOpen(false);
    setEditAddressError("");
    setEditingAddressId(null);
  };

  const handleAddressInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (addressError) setAddressError("");
  };

  const handleEditAddressInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (editAddressError) setEditAddressError("");
  };

  const fetchAddresses = async (token) => {
    const response = await fetch(`${API_BASE_URL}/addresses`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await response.text();
    let data = [];

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = [];
      }
    }

    if (!response.ok) {
      setAddresses([]);
      return;
    }

    const rows = Array.isArray(data)
      ? data
      : Array.isArray(data?.addresses)
        ? data.addresses
        : [];

    setAddresses(rows);
  };

  const handleAddAddress = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      setAddressError("Please sign in to add an address.");
      return;
    }

    try {
      setIsAddressSubmitting(true);
      setAddressError("");

      const payload = {
        address_type: addressForm.address_type.trim(),
        street: addressForm.street.trim(),
        city: addressForm.city.trim(),
        state: addressForm.state.trim(),
        postal_code: addressForm.postal_code.trim(),
        country: addressForm.country.trim(),
        is_default: Boolean(addressForm.is_default),
      };

      const response = await fetch(`${API_BASE_URL}/addresses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let data = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            `Address add failed (${response.status})`,
        );
      }

      const createdAddress = data?.address || data?.data || payload;
      setAddresses((prev) => {
        const next = payload.is_default
          ? prev.map((item) => ({ ...item, is_default: false }))
          : prev;
        return [createdAddress, ...next];
      });

      await fetchAddresses(token);

      resetAddressForm();
      setIsAddAddressModalOpen(false);
    } catch (error) {
      setAddressError(error?.message || "Unable to add address.");
    } finally {
      setIsAddressSubmitting(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      setAddressError("Please sign in to delete an address.");
      return;
    }

    if (!addressId) {
      setAddressError("Invalid address id.");
      return;
    }

    try {
      setDeletingAddressId(addressId);
      setAddressError("");

      const response = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await response.text();
      let data = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || `Delete failed (${response.status})`,
        );
      }

      setAddresses((prev) => prev.filter((item) => item.id !== addressId));
      await fetchAddresses(token);
    } catch (error) {
      setAddressError(error?.message || "Unable to delete address.");
    } finally {
      setDeletingAddressId(null);
    }
  };

  const handleEditAddress = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      setEditAddressError("Please sign in to edit an address.");
      return;
    }

    if (!editingAddressId) {
      setEditAddressError("Invalid address id.");
      return;
    }

    try {
      setIsAddressUpdating(true);
      setEditAddressError("");

      const payload = {
        address_type: editAddressForm.address_type.trim(),
        street: editAddressForm.street.trim(),
        city: editAddressForm.city.trim(),
        state: editAddressForm.state.trim(),
        postal_code: editAddressForm.postal_code.trim(),
        country: editAddressForm.country.trim(),
        is_default: Boolean(editAddressForm.is_default),
      };

      const response = await fetch(
        `${API_BASE_URL}/addresses/${editingAddressId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const text = await response.text();
      let data = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || `Update failed (${response.status})`,
        );
      }

      await fetchAddresses(token);
      closeEditAddressModal();
    } catch (error) {
      setEditAddressError(error?.message || "Unable to update address.");
    } finally {
      setIsAddressUpdating(false);
    }
  };

  const handleProfileInputChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
    if (profileUpdateError) setProfileUpdateError("");
    if (profileUpdateSuccess) setProfileUpdateSuccess("");
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      setProfileUpdateError("Please sign in to update your profile.");
      return;
    }

    try {
      setIsProfileUpdating(true);
      setProfileUpdateError("");
      setProfileUpdateSuccess("");

      const payload = {
        name: profileForm.name.trim(),
        email: profileForm.email.trim(),
        phone: profileForm.phone.trim(),
      };

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let data = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || `Update failed (${response.status})`,
        );
      }

      const updated = data?.user || data?.data || data || {};
      setProfileUser((prev) => ({
        ...prev,
        name: updated?.name ?? payload.name,
        email: updated?.email ?? payload.email,
        phone: updated?.phone ?? payload.phone,
      }));

      setProfileUpdateSuccess("Profile updated successfully.");
    } catch (error) {
      setProfileUpdateError(error?.message || "Unable to update profile.");
    } finally {
      setIsProfileUpdating(false);
    }
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeOrderDetails();
      }
    };

    if (selectedOrder) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedOrder]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        setProfileError("Please sign in to view your profile.");
        setIsProfileLoading(false);
        setIsRecentOrdersLoading(false);
        setIsAllOrdersLoading(false);
        return;
      }

      try {
        setIsProfileLoading(true);
        setIsRecentOrdersLoading(true);
        setIsAllOrdersLoading(true);
        setProfileError("");
        setOrdersError("");

        const profileResponse = await fetch(`${API_BASE_URL}/users/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profileText = await profileResponse.text();
        let profileData = {};

        if (profileText) {
          try {
            profileData = JSON.parse(profileText);
          } catch {
            profileData = {};
          }
        }

        if (!profileResponse.ok) {
          const message =
            profileData?.message ||
            profileData?.error ||
            `Failed to load profile (${profileResponse.status})`;
          throw new Error(message);
        }

        setProfileUser(profileData);

        await fetchAddresses(token);

        const recentOrdersResponse = await fetch(
          `${API_BASE_URL}/users/orders`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const allOrdersResponse = await fetch(
          `${API_BASE_URL}/users/all_orders`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const recentOrdersText = await recentOrdersResponse.text();
        let recentOrdersData = {};

        if (recentOrdersText) {
          try {
            recentOrdersData = JSON.parse(recentOrdersText);
          } catch {
            recentOrdersData = {};
          }
        }

        if (!recentOrdersResponse.ok) {
          setRecentOrders([]);
        } else {
          setRecentOrders(
            Array.isArray(recentOrdersData?.recent_orders)
              ? recentOrdersData.recent_orders
              : [],
          );
        }

        const allOrdersText = await allOrdersResponse.text();
        let allOrdersData = {};

        if (allOrdersText) {
          try {
            allOrdersData = JSON.parse(allOrdersText);
          } catch {
            allOrdersData = {};
          }
        }

        if (!allOrdersResponse.ok) {
          const ordersMessage =
            allOrdersData?.message ||
            allOrdersData?.error ||
            `Failed to load orders (${allOrdersResponse.status})`;
          setOrdersError(ordersMessage);
          setAllOrders([]);
        } else {
          setAllOrders(
            Array.isArray(allOrdersData?.recent_orders)
              ? allOrdersData.recent_orders
              : [],
          );
        }
      } catch (error) {
        setProfileError(error?.message || "Unable to load profile.");
        setAddresses([]);
        setRecentOrders([]);
        setAllOrders([]);
      } finally {
        setIsProfileLoading(false);
        setIsRecentOrdersLoading(false);
        setIsAllOrdersLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const user = useMemo(() => {
    const createdAt = profileUser?.created_at
      ? new Date(profileUser.created_at).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "N/A";

    return {
      id: profileUser?.id ?? null,
      name: profileUser?.name || "Guest User",
      email: profileUser?.email || "",
      phone: profileUser?.phone || "",
      role: profileUser?.role || "Customer",
      totalOrder: Number(profileUser?.total_order ?? 0),
      pending: Number(profileUser?.pending ?? 0),
      wishlist: Number(profileUser?.wishlist ?? 0),
      avatar: "/boy.jpg",
      joinDate: createdAt,
    };
  }, [profileUser]);

  useEffect(() => {
    setProfileForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  }, [user.name, user.email, user.phone]);

  const userInitial = (user.name || "U").trim().charAt(0).toUpperCase() || "U";

  const recentOrderRows = useMemo(() => {
    return recentOrders.map((order) => {
      const normalizedStatus = String(order?.status || "pending").toLowerCase();
      const createdAtMs = Number(order?.created_at || 0) * 1000;

      return {
        id: `#ORD-${order?.order_id ?? "N/A"}`,
        date: createdAtMs
          ? new Date(createdAtMs).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })
          : "N/A",
        total: Number(order?.total_amount ?? 0),
        status: normalizedStatus,
      };
    });
  }, [recentOrders]);

  const allOrderRows = useMemo(() => {
    return allOrders.map((order) => {
      const normalizedStatus = String(order?.status || "pending").toLowerCase();
      const createdAtMs = Number(order?.created_at || 0) * 1000;

      return {
        id: `#ORD-${order?.order_id ?? "N/A"}`,
        date: createdAtMs
          ? new Date(createdAtMs).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })
          : "N/A",
        total: Number(order?.total_amount ?? 0),
        status: normalizedStatus,
      };
    });
  }, [allOrders]);

  const navigation = [
    { key: "dashboard", label: "Dashboard", icon: FiUser },
    { key: "orders", label: "Orders", icon: FiPackage },
    { key: "address", label: "Addresses", icon: FiMapPin },
    { key: "account", label: "Account Details", icon: FiSettings },
  ];

  const statusClasses = {
    delivered: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    processing: "bg-amber-100 text-amber-700 border border-amber-200",
    pending: "bg-amber-100 text-amber-700 border border-amber-200",
    cancelled: "bg-rose-100 text-rose-700 border border-rose-200",
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[linear-gradient(140deg,#f5fcf7_0%,#edf7ef_100%)] p-6 rounded-2xl border border-emerald-100 flex items-center gap-4 shadow-[0_12px_30px_-24px_rgba(0,190,98,0.45)]">
                <div className="bg-emerald-100 p-3 rounded-xl text-[#00be62]">
                  <FiBox size={24} />
                </div>
                <div>
                  <h3
                    className={`${inter.className} text-2xl font-bold text-[#17261f]`}
                  >
                    {user.totalOrder}
                  </h3>
                  <p className="text-sm text-[#66756d]">Total Orders</p>
                </div>
              </div>

              <div className="bg-[linear-gradient(140deg,#fff9f1_0%,#fff4e6_100%)] p-6 rounded-2xl border border-amber-100 flex items-center gap-4 shadow-[0_12px_30px_-24px_rgba(245,158,11,0.35)]">
                <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
                  <FiPackage size={24} />
                </div>
                <div>
                  <h3
                    className={`${inter.className} text-2xl font-bold text-[#17261f]`}
                  >
                    {user.pending}
                  </h3>
                  <p className="text-sm text-[#66756d]">Pending</p>
                </div>
              </div>

              <div className="bg-[linear-gradient(140deg,#fff4f6_0%,#ffedf1_100%)] p-6 rounded-2xl border border-rose-100 flex items-center gap-4 shadow-[0_12px_30px_-24px_rgba(244,63,94,0.35)]">
                <div className="bg-rose-100 p-3 rounded-xl text-rose-600">
                  <FiHeart size={24} />
                </div>
                <div>
                  <h3
                    className={`${inter.className} text-2xl font-bold text-[#17261f]`}
                  >
                    {user.wishlist}
                  </h3>
                  <p className="text-sm text-[#66756d]">Wishlist</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-[0_18px_50px_-36px_rgba(17,42,28,0.45)]">
              <h3
                className={`${inter.className} text-lg font-bold text-[#1b2b22] mb-4`}
              >
                Recent Orders
              </h3>
              <div className="overflow-x-auto">
                {isRecentOrdersLoading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-10 bg-[#f7fbf8] rounded-xl" />
                    <div className="h-11 bg-[#f9fcfa] rounded-lg" />
                    <div className="h-11 bg-[#f9fcfa] rounded-lg" />
                    <div className="h-11 bg-[#f9fcfa] rounded-lg" />
                  </div>
                ) : recentOrderRows.length === 0 ? (
                  <div className="rounded-2xl border border-emerald-100 bg-[#f9fcfa] p-6 text-center">
                    <p className="text-sm text-[#5f6f66]">
                      No orders yet. Start exploring our freshest plants.
                    </p>
                    <Link
                      href="/shop"
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-[#00be62] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00a757]"
                    >
                      Browse plants
                    </Link>
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-[#f7fbf8] text-[#6e7c74] text-xs uppercase tracking-[0.15em]">
                      <tr>
                        <th className="px-4 py-3 rounded-l-xl">Order ID</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 rounded-r-xl">Total</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#55645c] text-sm">
                      {recentOrderRows.map((order, i) => (
                        <tr
                          key={i}
                          className="border-b border-emerald-50 last:border-0 hover:bg-[#f9fcfa] transition-colors"
                        >
                          <td className="px-4 py-3 font-medium text-[#00be62]">
                            {order.id}
                          </td>
                          <td className="px-4 py-3">{order.date}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                                statusClasses[order.status] ||
                                statusClasses.pending
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3">৳{order.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        );
      case "orders":
        return (
          <div className="bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-[0_18px_50px_-36px_rgba(17,42,28,0.45)]">
            <h3
              className={`${inter.className} text-lg font-bold text-[#1b2b22] mb-6`}
            >
              My Orders
            </h3>
            {isAllOrdersLoading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-24 rounded-xl bg-[#f9fcfa] border border-emerald-100" />
                <div className="h-24 rounded-xl bg-[#f9fcfa] border border-emerald-100" />
                <div className="h-24 rounded-xl bg-[#f9fcfa] border border-emerald-100" />
              </div>
            ) : allOrderRows.length === 0 ? (
              <div className="rounded-2xl border border-emerald-100 bg-[#f9fcfa] p-6 text-center">
                <p className="text-sm text-[#5f6f66]">
                  You have not placed any orders yet.
                </p>
                <Link
                  href="/shop"
                  className="mt-4 inline-flex items-center justify-center rounded-full border border-emerald-200 px-5 py-2.5 text-sm font-semibold text-[#1f6a43] transition hover:bg-emerald-50"
                >
                  Shop now
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {allOrderRows.map((order, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-emerald-100 rounded-xl hover:shadow-sm transition-shadow bg-[#fafdfa]"
                  >
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-[#1e2f26]">
                          {order.id}
                        </span>
                        <span className="text-[#7d8b84] text-sm">
                          • {order.date}
                        </span>
                      </div>
                      <p className="text-sm text-[#6b7a72]">
                        Total amount{" "}
                        <span className="text-[#1e2f26] font-medium">
                          ৳{order.total}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex-1 md:flex-none text-center ${
                          statusClasses[order.status] || statusClasses.pending
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                      <button
                        onClick={() => {
                          setTrackingOrder(order);
                          setActiveTab("tracking");
                        }}
                        className="px-4 py-2 border border-[#00be62] text-[#00be62] rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors"
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "address":
        return (
          <div className="bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-[0_18px_50px_-36px_rgba(17,42,28,0.45)]">
            <div className="flex justify-between items-center mb-6">
              <h3
                className={`${inter.className} text-lg font-bold text-[#1b2b22]`}
              >
                My Addresses
              </h3>
              <button
                onClick={openAddAddressModal}
                className="text-sm bg-[#00be62] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#00a757]"
              >
                Add New
              </button>
            </div>

            {addressError ? (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {addressError}
              </div>
            ) : null}

            {addresses.length === 0 ? (
              <div className="rounded-2xl border border-emerald-100 bg-[#f9fcfa] p-6 text-center">
                <p className="text-sm text-[#5f6f66]">
                  No saved addresses yet. Add one to speed up checkout.
                </p>
                <button
                  type="button"
                  onClick={openAddAddressModal}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-[#00be62] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00a757]"
                >
                  Add an address
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address, index) => (
                  <div
                    key={address.id ?? `${address.address_type}-${index}`}
                    className="border border-emerald-200 bg-emerald-50/60 p-6 rounded-xl relative"
                  >
                    {address.is_default ? (
                      <span className="absolute top-4 right-4 bg-[#00be62] text-white text-xs px-2 py-1 rounded">
                        Default
                      </span>
                    ) : null}
                    <h4 className="font-bold text-[#1f3128] mb-2">
                      {address.address_type}
                    </h4>
                    <p className="text-[#5f6f66] text-sm leading-relaxed mb-4">
                      {address.street} <br />
                      {address.city}, {address.state} {address.postal_code}{" "}
                      <br />
                      {address.country}
                    </p>
                    <p className="text-xs text-[#5f6f66] mb-3">
                      {address.phone || "N/A"}
                    </p>
                    <div className="flex gap-3 text-sm font-medium">
                      <button
                        onClick={() => openEditAddressModal(address)}
                        disabled={
                          isAddressUpdating || deletingAddressId === address.id
                        }
                        className="text-[#00be62] hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        disabled={deletingAddressId === address.id}
                        className="text-red-500 hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {deletingAddressId === address.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "account":
        return (
          <div className="bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-[0_18px_50px_-36px_rgba(17,42,28,0.45)] overflow-hidden relative">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-100/60 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-6">
              <div>
                <h3 className={`${inter.className} text-2xl text-[#1b2b22]`}>
                  Account Settings
                </h3>
                <p className="text-sm text-[#63746c] mt-1">
                  Manage your profile information and account security.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full md:w-auto md:min-w-[320px]">
                <div className="rounded-xl border border-emerald-100 bg-[#f7fcf9] px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#7a8882]">
                    Member Since
                  </p>
                  <p className="text-sm font-semibold text-[#1f3027] mt-1">
                    {user.joinDate}
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-[#f7fcf9] px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#7a8882]">
                    Role
                  </p>
                  <p className="text-sm font-semibold text-[#1f3027] mt-1">
                    {user.role || "Customer"}
                  </p>
                </div>
              </div>
            </div>

            <form
              className="relative z-10 space-y-6"
              onSubmit={handleProfileUpdate}
            >
              <div className="rounded-2xl border border-emerald-100 bg-[#fbfefc] p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-[#7a8882] mb-4">
                  Profile Information
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-[0.14em] text-[#6a7971] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileInputChange}
                      className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white text-[#1d2e25] placeholder:text-[#9aa7a1] focus:ring-2 focus:ring-[#00be62]/20 focus:border-[#00be62]/50 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] text-[#6a7971] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileForm.email}
                      onChange={handleProfileInputChange}
                      className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white text-[#1d2e25] placeholder:text-[#9aa7a1] focus:ring-2 focus:ring-[#00be62]/20 focus:border-[#00be62]/50 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] text-[#6a7971] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileForm.phone}
                      onChange={handleProfileInputChange}
                      className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white text-[#1d2e25] placeholder:text-[#9aa7a1] focus:ring-2 focus:ring-[#00be62]/20 focus:border-[#00be62]/50 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {profileUpdateError ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {profileUpdateError}
                </div>
              ) : null}

              {profileUpdateSuccess ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {profileUpdateSuccess}
                </div>
              ) : null}

              <div className="rounded-2xl border border-emerald-100 bg-[#fbfefc] p-5 md:p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-[#7a8882]">
                      Security
                    </p>
                    <h4 className="font-semibold text-[#1d2e25] mt-1">
                      Password Change
                    </h4>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-100 text-[#1c6b43] font-medium">
                    Recommended
                  </span>
                </div>

                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white text-[#1d2e25] placeholder:text-[#9aa7a1] focus:ring-2 focus:ring-[#00be62]/20 focus:border-[#00be62]/50 outline-none transition"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white text-[#1d2e25] placeholder:text-[#9aa7a1] focus:ring-2 focus:ring-[#00be62]/20 focus:border-[#00be62]/50 outline-none transition"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white text-[#1d2e25] placeholder:text-[#9aa7a1] focus:ring-2 focus:ring-[#00be62]/20 focus:border-[#00be62]/50 outline-none transition"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setProfileForm({
                      name: user.name || "",
                      email: user.email || "",
                      phone: user.phone || "",
                    });
                    setProfileUpdateError("");
                    setProfileUpdateSuccess("");
                  }}
                  className="px-5 py-3 rounded-xl border border-emerald-200 text-[#2b5f46] font-medium hover:bg-emerald-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProfileUpdating}
                  className="px-6 py-3 rounded-xl bg-[#00be62] text-white font-semibold shadow-[0_14px_30px_-18px_rgba(0,190,98,0.8)] hover:bg-[#00a757] transition-colors"
                >
                  {isProfileUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        );
      case "tracking":
        if (!trackingOrder) {
          setActiveTab("orders");
          return null;
        }
        {
          const statusLabel =
            trackingOrder.status.charAt(0).toUpperCase() +
            trackingOrder.status.slice(1);

          const steps = [
            { key: "pending", label: "Order Placed", icon: FiCheckCircle },
            { key: "confirmed", label: "Confirmed", icon: FiCheckCircle },
            { key: "processing", label: "Processing", icon: FiPackage },
            { key: "delivered", label: "Delivered", icon: FiTruck },
          ];

          const statusOrder = [
            "pending",
            "confirmed",
            "processing",
            "delivered",
          ];
          const currentIdx = statusOrder.indexOf(trackingOrder.status);
          const isCancelled = trackingOrder.status === "cancelled";

          return (
            <div className="space-y-6">
              {/* Back button + header */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setTrackingOrder(null);
                    setActiveTab("orders");
                  }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-200 text-[#3f6b54] transition hover:bg-emerald-50"
                >
                  <FiArrowLeft size={18} />
                </button>
                <div>
                  <p
                    className={`${openSans.className} text-xs uppercase tracking-[0.16em] text-[#6f7f77]`}
                  >
                    Order Tracking
                  </p>
                  <h3
                    className={`${inter.className} text-xl text-[#1b2b22] mt-0.5`}
                  >
                    {trackingOrder.id}
                  </h3>
                </div>
                <span
                  className={`ml-auto rounded-full px-3 py-1 text-xs font-semibold ${
                    isCancelled
                      ? "bg-rose-100 text-rose-700 border border-rose-200"
                      : trackingOrder.status === "delivered"
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : trackingOrder.status === "processing"
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "bg-amber-100 text-amber-700 border border-amber-200"
                  }`}
                >
                  {statusLabel}
                </span>
              </div>

              {/* Main tracking card */}
              <div className="bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-3xl overflow-hidden shadow-[0_18px_50px_-36px_rgba(17,42,28,0.45)]">
                {/* Status timeline */}
                <div className="bg-gradient-to-br from-[#f5fcf7] to-[#edf7ef] px-6 py-7 border-b border-emerald-100">
                  <p
                    className={`${openSans.className} text-[10px] uppercase tracking-[0.16em] text-[#6f7f77] mb-5 font-semibold`}
                  >
                    Tracking Progress
                  </p>

                  {isCancelled ? (
                    <div className="flex items-center gap-3 rounded-2xl bg-rose-50 border border-rose-100 px-5 py-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                        <FiX size={20} />
                      </div>
                      <div>
                        <p
                          className={`${inter.className} text-sm font-semibold text-rose-700`}
                        >
                          Order Cancelled
                        </p>
                        <p
                          className={`${openSans.className} text-xs text-rose-500 mt-0.5`}
                        >
                          This order has been cancelled.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      {steps.map((step, idx) => {
                        const Icon = step.icon;
                        const isCompleted = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;
                        const isLast = idx === steps.length - 1;

                        return (
                          <React.Fragment key={step.key}>
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all ${
                                  isCurrent
                                    ? "border-[#00be62] bg-[#00be62] text-white shadow-[0_0_18px_-4px_rgba(0,190,98,0.6)]"
                                    : isCompleted
                                      ? "border-[#00be62] bg-emerald-50 text-[#00be62]"
                                      : "border-emerald-200 bg-white text-[#c4cec8]"
                                }`}
                              >
                                <Icon size={18} />
                                {isCurrent && (
                                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00be62] opacity-40" />
                                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#00be62] border-2 border-white" />
                                  </span>
                                )}
                              </div>
                              <span
                                className={`text-[10px] font-semibold text-center whitespace-nowrap ${
                                  isCurrent
                                    ? "text-[#00be62]"
                                    : isCompleted
                                      ? "text-[#3d6b52]"
                                      : "text-[#b0bcb5]"
                                }`}
                              >
                                {step.label}
                              </span>
                            </div>
                            {!isLast && (
                              <div
                                className={`flex-1 h-0.5 mx-1 rounded-full mt-[-20px] ${
                                  idx < currentIdx
                                    ? "bg-[#00be62]"
                                    : "bg-emerald-100"
                                }`}
                              />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Delivery info row (From / To) */}
                <div className="px-6 py-5 border-b border-emerald-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-emerald-100 bg-[#f9fcfa] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[#00be62]">
                          <FiBox size={13} />
                        </div>
                        <p
                          className={`${openSans.className} text-[10px] uppercase tracking-[0.14em] text-[#6f7f77] font-semibold`}
                        >
                          From
                        </p>
                      </div>
                      <p
                        className={`${inter.className} text-sm font-semibold text-[#1b2b22]`}
                      >
                        Gachpala Store
                      </p>
                      <p
                        className={`${openSans.className} text-xs text-[#6b7c73] mt-0.5`}
                      >
                        Dhaka, Bangladesh
                      </p>
                    </div>
                    <div className="rounded-2xl border border-emerald-100 bg-[#f9fcfa] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                          <FiMapPin size={13} />
                        </div>
                        <p
                          className={`${openSans.className} text-[10px] uppercase tracking-[0.14em] text-[#6f7f77] font-semibold`}
                        >
                          To
                        </p>
                      </div>
                      <p
                        className={`${inter.className} text-sm font-semibold text-[#1b2b22]`}
                      >
                        {user.name}
                      </p>
                      <p
                        className={`${openSans.className} text-xs text-[#6b7c73] mt-0.5`}
                      >
                        {addresses.length > 0
                          ? `${addresses[0].city || ""}, ${addresses[0].state || addresses[0].country || ""}`
                          : "Address not set"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order details row */}
                <div className="px-6 py-5 border-b border-emerald-50">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p
                        className={`${openSans.className} text-[10px] uppercase tracking-[0.12em] text-[#6f7f77] font-semibold`}
                      >
                        Customer
                      </p>
                      <p
                        className={`${inter.className} text-sm font-semibold text-[#1b2b22] mt-1`}
                      >
                        {user.name}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`${openSans.className} text-[10px] uppercase tracking-[0.12em] text-[#6f7f77] font-semibold`}
                      >
                        Date
                      </p>
                      <p
                        className={`${inter.className} text-sm font-semibold text-[#1b2b22] mt-1`}
                      >
                        {trackingOrder.date}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`${openSans.className} text-[10px] uppercase tracking-[0.12em] text-[#6f7f77] font-semibold`}
                      >
                        Amount
                      </p>
                      <p
                        className={`${inter.className} text-sm font-semibold text-[#1b2b22] mt-1`}
                      >
                        ৳{trackingOrder.total}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`${openSans.className} text-[10px] uppercase tracking-[0.12em] text-[#6f7f77] font-semibold`}
                      >
                        Phone
                      </p>
                      <p
                        className={`${inter.className} text-sm font-semibold text-[#1b2b22] mt-1`}
                      >
                        {user.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tracking number + action */}
                <div className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p
                      className={`${openSans.className} text-[10px] uppercase tracking-[0.12em] text-[#6f7f77] font-semibold`}
                    >
                      Tracking ID
                    </p>
                    <p
                      className={`${inter.className} text-2xl font-bold text-[#1b2b22] mt-1 tracking-wide`}
                    >
                      {trackingOrder.id.replace("#", "")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setTrackingOrder(null);
                      setActiveTab("orders");
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#00be62] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(0,190,98,0.8)] transition hover:bg-[#00a757]"
                  >
                    <FiPackage size={16} />
                    View All Orders
                    <FiChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        }
      default:
        return null;
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fbf6_0%,#edf3e9_100%)] py-10 md:py-14">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-[#00be62]/12 blur-3xl" />
        <div className="absolute -right-20 bottom-16 h-96 w-96 rounded-full bg-emerald-200/35 blur-3xl" />
      </div>

      <Container>
        {isProfileLoading ? (
          <div className="relative z-10 mb-5 rounded-xl border border-emerald-100 bg-white/80 px-4 py-3 text-sm text-[#557266]">
            Loading profile...
          </div>
        ) : null}

        {profileError ? (
          <div className="relative z-10 mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {profileError}
          </div>
        ) : null}

        {!profileError && ordersError ? (
          <div className="relative z-10 mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {ordersError}
          </div>
        ) : null}

        {isProfileLoading || (!profileUser && !profileError) ? (
          <ProfileSkeleton />
        ) : (
          <>
            <div className="relative z-10 bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-4xl p-7 md:p-9 shadow-[0_28px_70px_-40px_rgba(17,42,28,0.45)] mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#eaf7ef_0%,transparent_58%)] opacity-70" />
              <div className="absolute top-0 right-0 h-48 w-48 rounded-full border border-emerald-200/50 -translate-y-1/2 translate-x-1/3" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] gap-8">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg bg-[linear-gradient(145deg,#def5e7_0%,#bceacb_100%)] flex items-center justify-center">
                      <span
                        className={`${inter.className} text-4xl text-[#0f6b3d]`}
                      >
                        {userInitial}
                      </span>
                    </div>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#2d7d53] shadow-sm border border-emerald-100">
                      Active
                    </span>
                  </div>

                  <div className="flex-1">
                    <p
                      className={`${openSans.className} text-xs uppercase tracking-[0.2em] text-[#2d7d53]`}
                    >
                      Profile Overview
                    </p>
                    <h1
                      className={`${arapey.className} text-5xl leading-tight text-[#16261f] mt-2`}
                    >
                      {user.name}
                    </h1>
                    <p className={`${openSans.className} text-[#617169] mt-1`}>
                      {user.email || "Add your email"}
                    </p>
                    <p
                      className={`${openSans.className} text-sm text-[#7c8a84] mt-1`}
                    >
                      {user.role || "Customer"} • ID: {user.id ?? "N/A"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#4c5f55]">
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 px-3 py-1.5">
                        <FiMail size={13} className="text-[#00be62]" />
                        {user.email || "No email on file"}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 px-3 py-1.5">
                        <FiPhone size={13} className="text-[#00be62]" />
                        {user.phone || "Add phone number"}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 px-3 py-1.5">
                        <FiCalendar size={13} className="text-[#00be62]" />
                        Member since {user.joinDate}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveTab("account")}
                        className="inline-flex items-center justify-center rounded-full bg-[#00be62] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00a757]"
                      >
                        Edit Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("orders")}
                        className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-5 py-2.5 text-sm font-semibold text-[#1f6a43] transition hover:bg-emerald-50"
                      >
                        View Orders
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("address")}
                        className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-5 py-2.5 text-sm font-semibold text-[#1f6a43] transition hover:bg-emerald-50"
                      >
                        Manage Addresses
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="rounded-2xl border border-emerald-100 bg-white/80 p-5 shadow-[0_18px_40px_-30px_rgba(17,42,28,0.35)]">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#6f7f77] font-semibold">
                      Activity
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                      <div className="rounded-xl border border-emerald-100 bg-[#f4fbf6] p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-emerald-100 text-[#00be62] flex items-center justify-center">
                            <FiBox size={16} />
                          </div>
                          <div>
                            <p
                              className={`${inter.className} text-lg text-[#1b2b22]`}
                            >
                              {user.totalOrder}
                            </p>
                            <p className="text-[11px] uppercase tracking-[0.12em] text-[#72827a]">
                              Orders
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-xl border border-amber-100 bg-[#fff8ee] p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                            <FiPackage size={16} />
                          </div>
                          <div>
                            <p
                              className={`${inter.className} text-lg text-[#1b2b22]`}
                            >
                              {user.pending}
                            </p>
                            <p className="text-[11px] uppercase tracking-[0.12em] text-[#72827a]">
                              Pending
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-xl border border-rose-100 bg-[#fff4f6] p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                            <FiHeart size={16} />
                          </div>
                          <div>
                            <p
                              className={`${inter.className} text-lg text-[#1b2b22]`}
                            >
                              {user.wishlist}
                            </p>
                            <p className="text-[11px] uppercase tracking-[0.12em] text-[#72827a]">
                              Wishlist
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/4">
                <div className="bg-white/85 backdrop-blur-sm border border-emerald-100 rounded-2xl p-3 lg:sticky lg:top-24 shadow-[0_18px_50px_-36px_rgba(17,42,28,0.45)]">
                  <div className="flex items-center justify-between px-3 pt-2 pb-3 border-b border-emerald-50">
                    <span className="text-xs font-bold text-[#7d8b84] uppercase tracking-[0.16em]">
                      Account Menu
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#9aa7a1] lg:hidden">
                      Swipe
                    </span>
                  </div>
                  <nav className="flex lg:flex-col gap-2 p-2 mt-2 overflow-x-auto lg:overflow-visible">
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      const active = activeTab === item.key;
                      return (
                        <button
                          key={item.key}
                          onClick={() => setActiveTab(item.key)}
                          className={`flex items-center justify-between gap-3 px-3 py-3 rounded-xl text-sm font-medium transition min-w-[160px] lg:min-w-0 whitespace-nowrap ${
                            active
                              ? "bg-[#00be62]/10 text-[#0a7f42] shadow-sm"
                              : "text-[#5f6f67] hover:bg-emerald-50"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <Icon size={17} /> {item.label}
                          </span>
                          <FiChevronRight
                            size={14}
                            className={`hidden lg:block ${
                              active ? "opacity-100" : "opacity-40"
                            }`}
                          />
                        </button>
                      );
                    })}

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition mt-1 min-w-[160px] lg:min-w-0 whitespace-nowrap"
                    >
                      <FiLogOut size={17} /> Logout
                    </button>
                  </nav>

                  {/* Current Orders section */}
                  <div className="hidden lg:block mt-3 border-t border-emerald-50 pt-3 px-1">
                    <div className="flex items-center justify-between px-2 mb-2.5">
                      <span
                        className={`${openSans.className} text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a9790]`}
                      >
                        Current Orders
                      </span>
                      {(() => {
                        const active = recentOrderRows.filter((o) => {
                          const s = o.status;
                          return (
                            s === "pending" ||
                            s === "processing" ||
                            s === "confirmed"
                          );
                        });
                        return active.length > 0 ? (
                          <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#00be62] px-1.5 text-[10px] font-bold text-white">
                            {active.length}
                          </span>
                        ) : null;
                      })()}
                    </div>

                    {isRecentOrdersLoading ? (
                      <div className="space-y-2 px-1">
                        {[1, 2].map((i) => (
                          <div
                            key={i}
                            className="animate-pulse rounded-xl bg-[#f5f9f6] p-3"
                          >
                            <div className="flex items-center justify-between">
                              <div className="h-3 w-20 rounded bg-emerald-100" />
                              <div className="h-3 w-12 rounded bg-emerald-100" />
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="h-2.5 w-14 rounded bg-emerald-50" />
                              <div className="h-4 w-14 rounded-full bg-emerald-50" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      (() => {
                        const activeItems = recentOrderRows
                          .filter((o) => {
                            const s = o.status;
                            return (
                              s === "pending" ||
                              s === "processing" ||
                              s === "confirmed"
                            );
                          })
                          .slice(0, 3);

                        if (activeItems.length === 0) {
                          return (
                            <div className="rounded-xl bg-[#f8fbf8] px-3 py-4 text-center mx-1">
                              <FiPackage
                                className="mx-auto mb-1.5 text-[#c4cec8]"
                                size={18}
                              />
                              <p
                                className={`${openSans.className} text-[11px] text-[#8a9790]`}
                              >
                                No active orders
                              </p>
                            </div>
                          );
                        }

                        return (
                          <div className="space-y-1.5 px-1">
                            {activeItems.map((order, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  setTrackingOrder(order);
                                  setActiveTab("tracking");
                                }}
                                className="group flex w-full items-center gap-2.5 rounded-xl bg-[#f8fbf8] px-3 py-2.5 text-left transition-colors hover:bg-[#edf7ef]"
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                                  <FiPackage size={14} />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between">
                                    <p
                                      className={`${inter.className} text-[11px] font-semibold text-[#1b2b22]`}
                                    >
                                      {order.id}
                                    </p>
                                    <p
                                      className={`${openSans.className} text-[10px] font-medium text-[#1b2b22]`}
                                    >
                                      ৳{order.total}
                                    </p>
                                  </div>
                                  <div className="mt-0.5 flex items-center justify-between">
                                    <span
                                      className={`${openSans.className} text-[9px] text-[#8a9790]`}
                                    >
                                      {order.date}
                                    </span>
                                    <span
                                      className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                                        order.status === "processing"
                                          ? "bg-blue-50 text-blue-600"
                                          : order.status === "confirmed"
                                            ? "bg-emerald-50 text-emerald-600"
                                            : "bg-amber-50 text-amber-600"
                                      }`}
                                    >
                                      {order.status.charAt(0).toUpperCase() +
                                        order.status.slice(1)}
                                    </span>
                                  </div>
                                </div>
                              </button>
                            ))}

                            <button
                              type="button"
                              onClick={() => setActiveTab("orders")}
                              className={`${openSans.className} w-full rounded-xl bg-emerald-50/70 py-2 text-center text-[10px] font-semibold text-[#1f7a4d] transition hover:bg-emerald-100 mt-1`}
                            >
                              View all orders →
                            </button>
                          </div>
                        );
                      })()
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-3/4">{renderContent()}</div>
            </div>
          </>
        )}

        <OrderDetailsModal
          isOpen={Boolean(selectedOrder)}
          order={selectedOrder}
          onClose={closeOrderDetails}
        />

        <AddAddressModal
          isOpen={isAddAddressModalOpen}
          form={addressForm}
          isSubmitting={isAddressSubmitting}
          error={addressError}
          onClose={closeAddAddressModal}
          onChange={handleAddressInputChange}
          onSubmit={handleAddAddress}
        />

        <EditAddressModal
          isOpen={isEditAddressModalOpen}
          form={editAddressForm}
          isSubmitting={isAddressUpdating}
          error={editAddressError}
          onClose={closeEditAddressModal}
          onChange={handleEditAddressInputChange}
          onSubmit={handleEditAddress}
        />
      </Container>
    </section>
  );
}
