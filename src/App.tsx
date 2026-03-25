import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { BrowsePage } from './pages/BrowsePage';

// We'll create these pages in the next lesson
// For now, placeholder components so the app compiles
function CreateListingPage() {
  return <p className="text-gray-500">Create listing page coming soon...</p>;
}
function ListingDetailPage() {
  return <p className="text-gray-500">Detail page coming soon...</p>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<BrowsePage />} />
            <Route path="/listings/:id" element={<ListingDetailPage />} />
            <Route path="/sell" element={<CreateListingPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}