"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import Badge from "@/components/ui/badge/Badge";

interface Ad {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  status: "active" | "inactive";
  createdAt: string;
}

const initialAds: Ad[] = [
  {
    id: "1",
    title: "Summer Sale 2024",
    description: "Get up to 50% off on all premium items.",
    imageUrl: "/images/user/userProfile.png", // Placeholder
    link: "https://example.com/sale",
    status: "active",
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    title: "New NFT Collection",
    description: "Exclusive drop of 1000 unique digital artworks.",
    imageUrl: "/images/user/userProfile.png", // Placeholder
    link: "https://example.com/nft",
    status: "active",
    createdAt: "2024-03-10",
  },
];

export function AdSpace() {
  const [ads, setAds] = useState<Ad[]>(initialAds);
  const [isAdding, setIsAdding] = useState(false);
  const [newAd, setNewAd] = useState({
    title: "",
    description: "",
    imageUrl: "",
    link: "",
  });

  const handleAddAd = (e: React.FormEvent) => {
    e.preventDefault();
    const ad: Ad = {
      id: Math.random().toString(36).substr(2, 9),
      ...newAd,
      imageUrl: newAd.imageUrl || "/images/user/userProfile.png",
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setAds([ad, ...ads]);
    setIsAdding(false);
    setNewAd({ title: "", description: "", imageUrl: "", link: "" });
  };

  const handleRemoveAd = (id: string) => {
    setAds(ads.filter((ad) => ad.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Ad Space Management</h2>
          <p className="text-gray-500 text-sm">Create and manage your platform advertisements.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-gray-950 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          {isAdding ? "Cancel" : "Add Advertisement"}
        </button>
      </div>

      {isAdding && (
        <div className="dashboard-card p-6 border border-white/10 bg-[#11192E]">
          <h3 className="text-lg font-medium text-white mb-4">Add New Advertisement</h3>
          <form onSubmit={handleAddAd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Title</label>
              <input
                type="text"
                required
                value={newAd.title}
                onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500"
                placeholder="Ad Title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Link</label>
              <input
                type="url"
                required
                value={newAd.link}
                onChange={(e) => setNewAd({ ...newAd, link: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500"
                placeholder="https://..."
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm text-gray-400">Description</label>
              <textarea
                required
                value={newAd.description}
                onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500 h-24"
                placeholder="Short description of the advertisement..."
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-brand-500 hover:bg-brand-600 text-gray-950 py-2 rounded-lg font-bold transition-colors"
              >
                Publish Advertisement
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <div key={ad.id} className="dashboard-card overflow-hidden border border-white/5 group bg-[#11192E]">
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={ad.imageUrl}
                alt={ad.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <Badge color={ad.status === "active" ? "success" : "light"} variant="solid" size="sm">
                  {ad.status}
                </Badge>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white">{ad.title}</h3>
                <div className="flex gap-2">
                  <a
                    href={ad.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button
                    onClick={() => handleRemoveAd(ad.id)}
                    className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-450 line-clamp-2">{ad.description}</p>
              <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs text-gray-500 font-mono">Created: {ad.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {ads.length === 0 && !isAdding && (
        <div className="flex flex-col items-center justify-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
          <p className="text-gray-500">No advertisements found. Create one to get started.</p>
        </div>
      )}
    </div>
  );
}
