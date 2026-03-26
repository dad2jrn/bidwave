import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useListings } from '../hooks/useListings';
import { formatCurrency } from '../utils/format';
import type { Bid } from '../types';

export function ListingDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { listings, updateListing } = useListings();

    //----- Find the listing by ID-----
    const listing = listings.find((1) => l.id === id);

    //----- State for new bid input-----
    const [bidderName, setBidderName] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    //----sort by highest bids
    const sortedBids = useMemo(() => {
        if (!listing) return [];
        return [...listing.bids].sort((a, b) => b.amount - a.amount);
    }, [listing]);

    //-----load the state of the listing-----
    if (listings.length === 0) {
        return (
            <div className="text-center py-20 text-gray-400">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    // ----handle case where listing is not found-----
    if (!listing) {
        return (
            <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <h2 className="text-xl font-semibold text-gray-700">Listing not found</h2>
                <p className="text-gray-400 mt-2 mb-6">It may have been removed or the link is incorrect.</p>
                <Link to="/" className="bg-blue-700 text-white px-6 py-2.5 rounded-lg hover:bg-blue-800 transition-colors">Back to Browse</Link>
            </div>
        );
    }

    //-----auction status helpers-----
    const isEnded = new Date(listing.endsAt) <= new Date();
    const minimumBid = listing.currentBid + 1;

    