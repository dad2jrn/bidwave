import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { BrowsePage } from './pages/BrowsePage';
import { CreateListingPage } from './pages/CreateListingPage';
import { ListingDetailPage } from './pages/ListingDetailPage';

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