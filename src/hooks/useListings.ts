import { useState, useEffect } from "react";
import type { Listing } from "../types";
import { seedListings } from "../data/seed";

const STORAGE_KEY = "bidwave_listings";

// ----Helpers-----
function loadFromStorage(): Listing[] {
  const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        // Frist ever load - write seed data and return it
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedListings));
        return seedListings;
    }
    return JSON.parse(raw) as Listing[];
}

function saveToStorage(listings: Listing[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}

// ----Custom Hook-----
export function useListings() {
    const [listings, setListings] = useState<Listing[]>([]);

    // Load listings from localStorage on mount
    useEffect(() => {
        const storedListings = loadFromStorage();
        setListings(storedListings);
    }, []); // Empty dependency array means this runs once on mount

    // Add a new listing
    const addListing = (listing: Listing): void => {
        const updated = [...listings, listing];
        setListings(updated);
        saveToStorage(updated);
    };

    // Replace an existing listing (used later for placing bids)
  const updateListing = (updated: Listing): void => {
    const newList = listings.map((l) =>
      l.id === updated.id ? updated : l
    );
    setListings(newList);
    saveToStorage(newList);
  };

  return { listings, addListing, updateListing };
}