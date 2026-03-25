import { useState } from 'react';
import { useListings } from '../hooks/useListings';
import { ListingCard } from '../components/ListingCard';
import { CATEGORIES } from '../types';
import type { Category } from '../types';

export function BrowsePage() {
  const { listings } = useListings();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  // ── Derived filtered results ─────────────────────────────────────────────
  const filtered = listings.filter((listing) => {
    const matchesQuery =
      query === '' ||
      listing.title.toLowerCase().includes(query.toLowerCase()) ||
      listing.description.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      activeCategory === 'All' || listing.category === activeCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      {/* ── Header ── */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Live Auctions</h1>
        <p className="text-gray-500 mt-1">{listings.length} items up for bid</p>
      </div>

      {/* ── Search bar ── */}
      <input
        type="text"
        placeholder="Search auctions..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      {/* ── Category filters ── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {(['All', ...CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
              ${activeCategory === cat
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Listing grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-medium">No auctions found</p>
          <p className="text-sm mt-1">Try a different search or category</p>
        </div>
      )}
    </div>
  );
}