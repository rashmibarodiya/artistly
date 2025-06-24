import SelectFilter from './SelectFilter'
import { ArtistFilters } from '@/types/FilterTypes'
type FilterProps = {
  filters: ArtistFilters
  setFilters: React.Dispatch<React.SetStateAction<ArtistFilters>>
}

const categoryOptions = ['Singer', 'Dancer', 'Speaker', 'DJ']
const locationOptions = ['Delhi', 'Mumbai', 'Bangalore', 'Pune']
const priceOptions = ['₹5k - ₹10k', '₹10k - ₹20k', '₹15k - ₹25k']

export default function Filter({ filters, setFilters }: FilterProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-screen-lg mx-auto px-4">
      <SelectFilter
        label="Category"
        value={filters.category}
        options={categoryOptions}
        onChange={(val) => setFilters((prev) => ({ ...prev, category: val }))}
      />
      <SelectFilter
        label="Location"
        value={filters.location}
        options={locationOptions}
        onChange={(val) => setFilters((prev) => ({ ...prev, location: val }))}
      />
      <SelectFilter
        label="Price"
        value={filters.priceRange}
        options={priceOptions}
        onChange={(val) => setFilters((prev) => ({ ...prev, priceRange: val }))}
      />
    </div>
  )
}