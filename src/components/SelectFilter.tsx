'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

type SelectFilterProps = {
    label: string
    value: string
    options: string[]
    onChange: (value: string) => void
}

const SelectFilter: React.FC<SelectFilterProps> = ({ label, value, options, onChange }) => {
    return (
        <div className="w-full">
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <Select value={value || undefined} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={`All ${label}`} />
                </SelectTrigger>
                <SelectContent className="z-50">
                    {options.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                            {opt}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

        </div>
    )
}

export default SelectFilter
