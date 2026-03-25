import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListings } from '../hooks/useListings';
import { CATEGORIES } from '../types';
import type { Category, Listing } from '../types';

// -----Form Shape-----
interface ListingForm {
    title: string;
    description: string;
    category: Category;
    imageUrl: string;
    startingBid: string; // Using string because inputs always return strings
    sellerName: string;
    durationDays: string; // Using string for the same reason as above
}

const EMPTY_FORM: ListingForm = {
    title: '',
    description: '',
    category: 'Electronics',
    imageUrl: '',
    startingBid: '',
    sellerName: '',
    durationDays: '7',
};

// -----Component-----
export function CreateListingPage() {
  const { addListing } = useListings();
  const navigate = useNavigate();

  const [form, setForm] = useState<ListingForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<ListingForm>>({});

    // -----Field updater-----
    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error on change
    }

    // -----Validation-----
    function validate(): boolean {
        const newErrors: Partial<ListingForm> = {};
        if (!form.title.trim()) newErrors.title = 'Title is required';
        if (!form.description.trim()) newErrors.description = 'Description is required';
        if (!form.sellerName.trim()) newErrors.sellerName = 'Seller name is required';

        const bid = parseFloat(form.startingBid);
        if (isNaN(bid) || bid <= 0) newErrors.startingBid = 'Starting bid must be a positive number';

        const days = parseInt(form.durationDays);
        if (isNaN(days) || days <= 1 || days > 30) {
            newErrors.durationDays = 'Duration must be between 1 and 30';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // -----Submit Handler-----
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // same as FastAPI that prevents default browseer behavior
        if (!validate()) return;

        const bid = parseFloat(form.startingBid);
        const days = parseInt(form.durationDays);
        const newListing: Listing = {
            id: crypto.randomUUID(),
            title: form.title.trim(),
            description: form.description.trim(),
            category: form.category,
            imageUrl: form.imageUrl.trim() || 'https://via.placeholder.com/300', // Default image
            startingBid: bid,
            currentBid: bid,
            sellerName: form.sellerName.trim(),
            endsAt: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString(),
            bids: [],
        };

        addListing(newListing);
        navigate('/');
    }

    // -----Render-----
    return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">List an Item</h1>
      <p className="text-gray-500 mb-8">Fill in the details to start your auction.</p>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <Field label="Title" error={errors.title}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="What are you selling?"
            className={inputClass(!!errors.title)}
          />
        </Field>

        {/* Description */}
        <Field label="Description" error={errors.description}>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the item — condition, history, what's included..."
            className={inputClass(!!errors.description)}
          />
        </Field>

        {/* Category */}
        <Field label="Category">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass(false)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </Field>

        {/* Image URL */}
        <Field label="Image URL (optional)" error={errors.imageUrl}>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://... (leave blank for a default image)"
            className={inputClass(!!errors.imageUrl)}
          />
        </Field>

        {/* Starting bid + duration — side by side */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Starting Bid ($)" error={errors.startingBid}>
            <input
              name="startingBid"
              value={form.startingBid}
              onChange={handleChange}
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              className={inputClass(!!errors.startingBid)}
            />
          </Field>

          <Field label="Duration (days)" error={errors.durationDays}>
            <input
              name="durationDays"
              value={form.durationDays}
              onChange={handleChange}
              type="number"
              min="1"
              max="30"
              className={inputClass(!!errors.durationDays)}
            />
          </Field>
        </div>

        {/* Seller name */}
        <Field label="Your Seller Name" error={errors.sellerName}>
          <input
            name="sellerName"
            value={form.sellerName}
            onChange={handleChange}
            placeholder="e.g. RetroFinds"
            className={inputClass(!!errors.sellerName)}
          />
        </Field>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-700 text-white py-2.5 rounded-lg font-semibold
                       hover:bg-blue-800 transition-colors"
          >
            Start Auction
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-600
                       hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}

// -----Helper Components & Functions-----
interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode; // <- accepts any JSX as children
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none
    focus:ring-2 focus:ring-blue-500 transition
    ${hasError ? 'border-red-400 bg-red-50' : 'border-gray-300'}`;
}