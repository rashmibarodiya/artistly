'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArtistFormData } from '../types/artist';
import { artistSchema } from '../types/artist';
import { submitArtist } from '../api/addArtist';
import { SubmitHandler } from 'react-hook-form';

const categories = ['Singer', 'Dancer', 'Speaker', 'DJ'];
const languages = ['Hindi', 'English', 'Punjabi', 'Tamil'];
const priceOptions = ['₹5k - ₹10k', '₹10k - ₹20k', '₹20k+'];

export default function OnboardForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ArtistFormData>({
    resolver: yupResolver(artistSchema) as any, // only for now  
    defaultValues: {
      name: '',
      bio: '',
      location: '',
      priceRange: '',
      categories: [],
      languages: [],
        // image:undefined,
    },
  });

  const onSubmit: SubmitHandler<ArtistFormData> = async (data) => {
    await submitArtist(data);
    alert('Artist submitted!');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border-2 rounded p-6">
        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input {...register('name')} className="input" />
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        </div>

        {/* Bio */}
        <div>
          <label className="block font-medium">Bio</label>
          <textarea {...register('bio')} className="input h-24" />
          <p className="text-sm text-red-500">{errors.bio?.message}</p>
        </div>

        {/* Category Multi-select */}
        <div>
          <label className="block font-medium mb-1">Categories</label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={cat}
                  {...register('categories')}
                />
                {cat}
              </label>
            ))}
          </div>
          <p className="text-sm text-red-500">{errors.categories?.message}</p>
        </div>

        {/* Languages Multi-select */}
        <div>
          <label className="block font-medium mb-1">Languages Spoken</label>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <label key={lang} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={lang}
                  {...register('languages')}
                />
                {lang}
              </label>
            ))}
          </div>
          <p className="text-sm text-red-500">{errors.languages?.message}</p>
        </div>

        {/* Price Range */}
        <div>
          <label className="block font-medium">Fee Range</label>
          <select {...register('priceRange')} className="input">
            <option value="">Select range</option>
            {priceOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <p className="text-sm text-red-500">{errors.priceRange?.message}</p>
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium">Location</label>
          <input {...register('location')} className="input" />
          <p className="text-sm text-red-500">{errors.location?.message}</p>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Profile Image (Optional)</label>
          <input type="file" {...register('image')} className="mt-1 border-1 rounded" />
        </div>

        {/* Submit */}
        <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
          Submit
        </button>
    </form>
  );
}
