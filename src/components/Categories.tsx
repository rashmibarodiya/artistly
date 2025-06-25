import Image from 'next/image';
import Link from 'next/link';

const categories = [
    { name: 'Singers', image: '/categories/singer.jpg' },
    { name: 'Dancers', image: '/categories/dancer.jpg' },
    { name: 'Speakers', image: '/categories/speaker.jpg' },
    { name: 'DJs', image: '/categories/dj.jpg' }
];

export default function Categories() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
            {categories.map((cat) => (
                <Link href="/artists" key={cat.name}>
                    <div className="rounded-lg shadow hover:scale-105 transition overflow-hidden cursor-pointer">
                        <Image
                            src={cat.image}
                            alt={cat.name}
                            width={400}
                            height={240}
                            className="w-full h-60 object-cover"
                        />
                        <div className="p-4 bg-gray-100 text-center">
                            <p className="text-lg font-semibold text-black">{cat.name}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
