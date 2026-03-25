// -----Bid Interface-----
export interface Bid {
    id: string;
    amount: number;
    bidderName: string;
    listingId: string;
    placedAt: string; // ISO date string
}

// -----Listing Interface-----
export interface Listing {
    id: string;
    title: string;
    description: string;
    category: Category; // used for the type defined below
    imageUrl: string;
    startingBid: number;
    currentBid: number;
    sellerName: string;
    endsAt: string; // ISO date string
    createdAt: string; // ISO date string
    bids: Bid[];
}

// -----Category-----
export const CATEGORIES = [
    'Electronics',
    'Collectibles',
    'Clothing',
    'Home & Garden',
    'Toys & Hobbies',
    'Sports & Outdoors',
    'Automotive',
] as const;

export type Category = typeof CATAGORIES[number]; // This creates a type that can only be one of the values in the CATAGORIES array