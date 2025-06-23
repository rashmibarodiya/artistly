import * as yup from 'yup';

import { InferType } from 'yup';


export interface ArtistFormData {
  name: string;
  bio: string;
  location: string;
  priceRange: string;
  categories: string[];
  languages: string[];
  image?: FileList; //optional
}

export const artistSchema = yup.object().shape({
   name: yup.string().required('Name is required'),
  bio: yup.string().required('Bio is required'),
  location: yup.string().required('Location is required'),
  priceRange: yup.string().required('Fee range is required'),
  categories: yup.array().of(yup.string()).min(1, 'Select at least one category').required(),
  languages: yup.array().of(yup.string()).min(1, 'Select at least one language').required(),
image: yup
  .mixed<FileList>()
  .optional()
  .test('fileSize', 'Image must be smaller than 5MB', (value) =>
    !value?.length ? true : value[0].size < 5 * 1024 * 1024
  ),


});

//export type ArtistFormData = InferType<typeof artistSchema>;
