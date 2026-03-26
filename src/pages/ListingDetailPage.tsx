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
    const listing = listings.find((l) => l.id === id);

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

    //-----handle bid submission-----
    function handleBid(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!bidderName.trim()) {
            setError('Please enter your name.');
            return;
        }

        const amount = parseFloat(bidAmount);

        if (isNaN(amount) || amount <= 0) {
            setError('Please enter a valid bid amount.');
            return;
        }

        if (amount < minimumBid) {
            setError(`Bid must be at least ${formatCurrency(minimumBid)}.`);
            return;
        }

        const newBid: Bid = {
            id: crypto.randomUUID(),
            listingId: listing.id,
            bidderName: bidderName.trim(),
            amount,
            placedAt: new Date().toISOString(),
        };

        //-----update the listing with the new bid-----
        const updatedListing = {
            ...listing,
            currentBid: amount,
            bids: [...listing.bids, newBid],
        };

        updateListing(updatedListing);
        setSuccess(`Your bid of ${formatCurrency(amount)} was placed successfully!`);
        setBidderName('');
        setBidAmount('');
    }

    return (
        <div className="max-w-4xl mx-auto">

            {/* Back link */}
            <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800 text-sm mb-6 flex items-center gap-1">← Back to listings</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* ── Left column: image + details ── */}
                <div>
                    <div className="rounded-xl overflow-hidden bg-gray-100 mb-4">
                        <img
                            src={listing.imageUrl}
                            alt={listing.title}
                            className="w-full object-cover max-h-80"
                        />
                    </div>
                    <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">{listing.category}</span>
                    <h1 className="text-2xl font-bold text-gray-900 mt-1 mb-3">{listing.title}</h1>
                    <p className="text-gray-600 text-sm leading-relaxed">{listing.description}</p>

                    <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500 space-y-1">
                        <p><span className="font-medium text-gray-700">Seller:</span>{' '} {listing.sellerName}</p>
                        <p><span className="font-medium text-gray-700">Starting bid:</span>{' '} {formatCurrency(listing.startingBid)}</p>
                        <p><span className="font-medium text-gray-700">{isEnded ? 'Ended:' : 'Ends:'}</span>{' '} {new Date(listing.endsAt).toLocaleString()}</p>
                    </div>
                </div>

                {/* ── Right column: bid panel + history ── */}
                <div>

                    {/* Current bid panel */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
                        <p className="text-sm text-blue-600 font-medium">Current Bid</p>
                        <p className="text-4xl font-bold text-blue-800 my-1">{formatCurrency(listing.currentBid)}</p>
                        <p className="text-xs text-blue-500">{listing.bids.length} bid{listing.bids.length !== 1 ? 's' : ''} placed</p>
                    </div>

                    {/* Bid form or ended notice */}
                    {isEnded ? (
                        <div className="bg-gray-100 rounded-xl p-5 text-center text-gray-500">
                            <p className="text-2xl mb-2">🔨</p>
                            <p className="font-semibold text-gray-700">Auction Ended</p>
                            <p className="text-sm mt-1">Final price: {formatCurrency(listing.currentBid)}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleBid} className="space-y-3">
                            <h3 className="font-semibold text-gray-800">Place a Bid</h3>

                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Your Name
                                </label>
                                <input value={bidderName} onChange={(e) => setBidderName(e.target.value)} placeholder="e.g. JaneSmith" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Bid Amount (min. {formatCurrency(minimumBid)})</label>
                                <input
                                    type="number"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    placeholder={minimumBid.toString()}
                                    min={minimumBid}
                                    step="0.01"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                            {error && <p className="text-sm text-red-500">{error}</p>}
                            {success && <p className="text-sm text-green-600 font-medium">{success}</p>}

                            <button type="submit" className="w-full bg-blue-700 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition-colors">Place Bid</button>
                        </form>
                    )}

                    {/* Bid history */}
                    {sortedBids.length > 0 && (
                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-800 mb-3">Bid History</h3>
                            <div className="space-y-2">{sortedBids.map((bid, index) => (
                                <div key={bid.id} className={`flex items-center justify-between text-sm px-3 py-2 rounded-lg ${index === 0 ? 'bg-green-50 border border-green-100' : 'bg-gray-50'}`}>
                                    <div>
                                        <span className="font-medium text-gray-800">{bid.bidderName}</span>
                                        {index === 0 && (<span className="ml-2 text-xs text-green-600 font-semibold">Winning</span>)}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">{formatCurrency(bid.amount)}</p>
                                        <p className="text-xs text-gray-400"> {new Date(bid.placedAt).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
