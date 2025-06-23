import OnboardForm from '@/components/ArtistForm';

export default function OnboardPage() {
  return (
    <section className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Onboard Artist</h1>
      <OnboardForm />
    </section>
  );
}











// 'use client'

// import { useForm, Controller } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import * as yup from 'yup'

// const categories = ['Singer', 'Dancer', 'Speaker', 'DJ']
// const languages = ['Hindi', 'English', 'Punjabi', 'Tamil']
// const priceOptions = ['₹5k - ₹10k', '₹10k - ₹20k', '₹20k+']

// const schema = yup.object().shape({
//   name: yup.string().required('Name is required'),
//   bio: yup.string().required('Bio is required'),
//   location: yup.string().required('Location is required'),
//   priceRange: yup.string().required('Fee range is required'),
//   categories: yup.array().min(1, 'Select at least one category'),
//   languages: yup.array().min(1, 'Select at least one language'),
//   image: yup.mixed().notRequired()
// })

// export default function OnboardPage() {
//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors }
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       categories: [],
//       languages: []
//     }
//   })

//   const onSubmit = (data: any) => {
//     console.log('Form submitted:', {
//       ...data,
//       image: data.image?.[0]?.name || ''
//     })


//     alert('Artist submitted! (Check console)')
//     reset()
//   }

//   return (
//     <section className="max-w-2xl mx-auto space-y-8">
//       <h1 className="text-3xl font-bold text-center">Onboard Artist</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border-2 rounded p-4">
//         {/* Name */}
//         <div>
//           <label className="block font-medium">Name</label>
//           <input {...register('name')} className="input" />
//           <p className="text-sm text-red-500">{errors.name?.message}</p>
//         </div>

//         {/* Bio */}
//         <div>
//           <label className="block font-medium">Bio</label>
//           <textarea {...register('bio')} className="input h-24" />
//           <p className="text-sm text-red-500">{errors.bio?.message}</p>
//         </div>

//         {/* Category Multi-select */}
//         <div>
//           <label className="block font-medium mb-1">Categories</label>
//           <div className="grid grid-cols-2 gap-2">
//             {categories.map((cat) => (
//               <label key={cat} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   value={cat}
//                   {...register('categories')}
//                 />
//                 {cat}
//               </label>
//             ))}
//           </div>
//           <p className="text-sm text-red-500">{errors.categories?.message}</p>
//         </div>

//         {/* Languages Multi-select */}
//         <div>
//           <label className="block font-medium mb-1">Languages Spoken</label>
//           <div className="grid grid-cols-2 gap-2">
//             {languages.map((lang) => (
//               <label key={lang} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   value={lang}
//                   {...register('languages')}
//                 />
//                 {lang}
//               </label>
//             ))}
//           </div>
//           <p className="text-sm text-red-500">{errors.languages?.message}</p>
//         </div>

//         {/* Price Range */}
//         <div>
//           <label className="block font-medium">Fee Range</label>
//           <select {...register('priceRange')} className="input">
//             <option value="">Select range</option>
//             {priceOptions.map((opt) => (
//               <option key={opt} value={opt}>{opt}</option>
//             ))}
//           </select>
//           <p className="text-sm text-red-500">{errors.priceRange?.message}</p>
//         </div>

//         {/* Location */}
//         <div>
//           <label className="block font-medium">Location</label>
//           <input {...register('location')} className="input" />
//           <p className="text-sm text-red-500">{errors.location?.message}</p>
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label className="block font-medium">Profile Image (Optional)</label>
//           <input type="file" {...register('image')} className="mt-1 border-1 rounded" />
//         </div>

//         {/* Submit */}
//         <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
//           Submit
//         </button>
//       </form>
//     </section>
//   )
// }

