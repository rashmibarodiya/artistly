'use client';
import { useEffect, useState } from 'react';
import ArtistTable from '../../../components/AdminTable';
import { ArtistFormData } from '@/types/artist'

// type Artist = {
//   id: number;
//   name: string;
//   category: string;
//   location: string;
//   priceRange: string;
//   image: string;
// };

export default function Dashboard() {
  const [artists, setArtists] = useState<ArtistFormData[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const admin = params.get('admin');
    setIsAdmin(admin === 'true');

    if (admin === 'true') {
      fetch('/data/artists.json')
        .then((res) => res.json())
        .then((data) => setArtists(data));
    }
    console.log("Artist are &&&&&&&&&&7",artists)
  }, []);

  if (!isAdmin) return <p className="p-4 text-red-600">Access Denied. Admins only.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <ArtistTable artists={artists} />
    </div>
  );
}
