import {ArtistFormData} from "../app/types/artist"

export async function submitArtist(data: ArtistFormData) {
  console.log('Form submitted:', {
    ...data,
    // image: data.image?.[0]?.name || '',
  });

  // In real app: send to backend
  // this data would be used to send a real a post request to backend using fetch or axios
}
