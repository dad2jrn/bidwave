import { Link } from 'react-router-dom';
import type { Listing } from '../types';
import { formatCurrency } from '../utils/format';

interface Props {
  listing: Listing;
}

function TimeRemaining({ endsAt }: { endsAt: string }) {
  const diff = new Date(endsAt).getTime() - Date.now();

  if (diff <= 0) return <span className="text-red-500 font-medium">Ended</span>;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return <span className="text-green-600 font-medium">{days}d {hours}h left</span>;
  }
  return <span className="text-orange-500 font-medium">{hours}h left</span>;
}

export function ListingCard({ listing }: Props) {
  return (
    <Link to={`/listings/${listing.id}`} className="group block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">

        {/* Image */}
        <div className="h-48 overflow-hidden bg-gray-100">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
            {listing.category}
          </span>

          <h3 className="mt-1 text-gray-900 font-semibold text-base leading-snug line-clamp-2">
            {listing.title}
          </h3>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Current bid</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(listing.currentBid)}
              </p>
            </div>
            <div className="text-right text-sm">
              <TimeRemaining endsAt={listing.endsAt} />
              <p className="text-xs text-gray-400 mt-0.5">
                {listing.bids.length} bid{listing.bids.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}