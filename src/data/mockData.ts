import { Property } from '../types';

export const featuredProperties: Property[] = [
  {
    id: 1,
    title: "Rumah Mewah 3 Lantai di Pondok Indah",
    description: "Rumah mewah dengan desain modern dan fasilitas lengkap di kawasan elit Pondok Indah. Dilengkapi dengan kolam renang pribadi, taman yang asri, dan keamanan 24 jam.",
    price: 2500000000,
    type: "sale",
    category: "house",
    address: "Jl. Pondok Indah No. 123",
    city: "Jakarta Selatan",
    district: "Pondok Indah",
    bed_rooms: 4,
    bath_rooms: 3,
    land_size: 300,
    building_size: 250,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
    ],
    facilities: ["Swimming Pool", "Garage", "Garden", "Security", "Full Furniture"],
    agent: {
      id: 1,
      name: "John Doe",
      email: "john@propertyku.com",
      phone: "+62 812-3456-7890",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      agency: "PropertyKu Elite"
    },
    is_featured: true,
    created_at: "2024-01-15"
  },
  {
    id: 2,
    title: "Apartemen Modern di SCBD Sudirman",
    description: "Apartemen premium di jantung bisnis Jakarta dengan view kota yang menakjubkan. Fasilitas lengkap: gym, swimming pool, dan 24h security.",
    price: 1200000000,
    type: "sale",
    category: "apartment",
    address: "Apartment Sudirman Tower, SCBD",
    city: "Jakarta Selatan",
    district: "SCBD",
    bed_rooms: 2,
    bath_rooms: 2,
    land_size: 0,
    building_size: 75,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
    ],
    facilities: ["Gym", "Swimming Pool", "Security", "Parking", "Smart Home"],
    agent: {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@propertyku.com",
      phone: "+62 813-9876-5432",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      agency: "PropertyKu Premium"
    },
    is_featured: true,
    created_at: "2024-01-10"
  },
  {
    id: 3,
    title: "Rumah Minimalis di BSD City",
    description: "Rumah minimalis dengan desain modern dan efisien. Cocok untuk keluarga muda. Lingkungan yang nyaman dan aman.",
    price: 1800000000,
    type: "sale",
    category: "house",
    address: "Cluster Green Garden, BSD City",
    city: "Tangerang",
    district: "BSD",
    bed_rooms: 3,
    bath_rooms: 2,
    land_size: 180,
    building_size: 150,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800"
    ],
    facilities: ["Garage", "Garden", "Security", "Playground"],
    agent: {
      id: 1,
      name: "John Doe",
      email: "john@propertyku.com",
      phone: "+62 812-3456-7890",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      agency: "PropertyKu Elite"
    },
    is_featured: false,
    created_at: "2024-01-12"
  },
  {
    id: 4,
    title: "Townhouse Exclusive di Alam Sutera",
    description: "Townhouse eksklusif dengan konsep living yang nyaman. Dilengkapi dengan private garden dan carport untuk 2 mobil.",
    price: 2200000000,
    type: "sale",
    category: "house",
    address: "Townhouse Alam Sutera Residence",
    city: "Tangerang",
    district: "Alam Sutera",
    bed_rooms: 3,
    bath_rooms: 3,
    land_size: 200,
    building_size: 180,
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"
    ],
    facilities: ["Private Garden", "Carport", "Security", "Club House"],
    agent: {
      id: 3,
      name: "Mike Johnson",
      email: "mike@propertyku.com",
      phone: "+62 811-2233-4455",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      agency: "PropertyKu Signature"
    },
    is_featured: true,
    created_at: "2024-01-08"
  }
];

export const features = [
  {
    icon: '🔑',
    title: '1000+ Properti',
    description: 'Terverifikasi dan siap huni'
  },
  {
    icon: '👨‍💼',
    title: '200+ Agent',
    description: 'Professional dan berpengalaman'
  },
  {
    icon: '🛡️',
    title: 'Transaksi Aman',
    description: 'Terpercaya dan terjamin'
  },
  {
    icon: '📞',
    title: '24/7 Support',
    description: 'Customer service siap membantu'
  }
];