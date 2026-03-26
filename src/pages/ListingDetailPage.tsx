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