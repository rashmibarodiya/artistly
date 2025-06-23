import {ArtistFormData} from "../types/artist"

export async function submitArtist(data: ArtistFormData) {
  console.log('Form submitted:', {
    ...data,
    // image: data.image?.[0]?.name || '',
  });

  // In real app: send to backend
  // await fetch('/api/artist', { method: 'POST', body: ... })
}
