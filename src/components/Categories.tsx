// import Image from 'next/image';
// import Link from 'next/link';

// const categories = [
//     { name: 'Singers', image: '/categories/singer.jpg' },
//     { name: 'Dancers', image: '/categories/dancer.jpg' },
//     { name: 'Speakers', image: '/categories/speaker.jpg' },
//     { name: 'DJs', image: '/categories/dj.jpg' }
// ];

// export default function Categories() {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
//             {categories.map((cat) => (
//                 <Link href="/artists" key={cat.name}>
//                     <div className="rounded-lg shadow hover:scale-105 transition overflow-hidden cursor-pointer">
//                         <Image
//                             src={cat.image}
//                             alt={cat.name}
//                             width={400}
//                             height={240}
//                             className="w-full h-60 object-cover"
//                         />
//                         <div className="p-4 bg-gradient-to-r  from-purple-900 via-purple-800 to-indigo-900 text-white text-center">
//                             <p className="text-lg font-semibold text-white">{cat.name}</p>
//                         </div>
//                     </div>
//                 </Link>
//             ))}
//         </div>
//     );
// }
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Singers", image: "/categories/singer.jpg", meta: "Bollywood · Pop · Classical" },
  { name: "Dancers", image: "/categories/dancer.jpg", meta: "Classical · Fusion · Hip Hop" },
  { name: "Speakers", image: "/categories/speaker.jpg", meta: "TEDx · Corporate · Motivational" },
  { name: "DJs", image: "/categories/dj.jpg", meta: "House · Hip Hop · Bollywood" },
];

export default function Categories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {categories.map((cat) => (
        <Link href="/artists" key={cat.name}>
          <div className="ticket group overflow-hidden hover:-translate-y-1.5 hover:rotate-[-1deg] hover:border-marquee-amber transition-all duration-300">
            <div className="relative h-40">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-marquee-bg/90 to-transparent" />
            </div>
            <div className="p-4 border-t border-dashed border-marquee-plum">
              <p className="font-display text-2xl tracking-wide text-marquee-cream">
                {cat.name}
              </p>
              <p className="text-[11px] uppercase tracking-widest text-marquee-plum mt-1">
                {cat.meta}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}