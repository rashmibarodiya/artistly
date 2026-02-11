import { ArtistFormData } from '@/app/types/artist'


type Props = {
  artists: ArtistFormData[];
};

export default function ArtistTable({ artists }: Props) {

    console.log("artists are ******************************",artists)
  return (
    <table className="min-w-full text-sm border">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">City</th>
          <th className="p-2 border">Fee</th>
          <th className="p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {artists.map((artist) => (
          <tr key={artist.id}>
            <td className="p-2 border">{artist.name}</td>
            <td className="p-2 border">{artist.categories.join(', ')}</td>

            <td className="p-2 border">{artist.location}</td>
            <td className="p-2 border">{artist.priceRange}</td>
            <td className="p-2 border">
              <button className="text-blue-600 hover:underline">Not implemented yet</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
