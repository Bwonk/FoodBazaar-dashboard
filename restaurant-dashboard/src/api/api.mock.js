// Mock data source - Restaurant Dashboard
// Bu dosya backend hazır olana kadar kullanılacak sahte veri içerir

// KPI verileri
export const kpis = {
  totalMenus: {
    value: 120,
    percentage: 45,
    progress: 45,
    change: 0
  },
  totalOrdersToday: {
    value: 180,
    percentage: 62,
    progress: 62,
    change: 0
  },
  totalClientsToday: {
    value: 240,
    percentage: 80,
    progress: 80,
    change: 0
  },
  revenueDayRatio: {
    value: 140,
    percentage: 85,
    progress: 85,
    change: 0
  }
};

// Revenue chart verileri
export const revenue = {
  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Income',
        data: [10000, 12000, 15000, 18000, 17000, 19000, 20000],
        borderColor: '#000000',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        fill: true
      },
      {
        label: 'Expenses',
        data: [8000, 9000, 11000, 13000, 12000, 14000, 15000],
        borderColor: '#E8B4F0',
        backgroundColor: 'rgba(232, 180, 240, 0.1)',
        fill: true
      }
    ]
  },
  weekly: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Income',
        data: [2800, 3200, 3500, 3100, 3800, 4200, 3900],
        borderColor: '#000000',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        fill: true
      },
      {
        label: 'Expenses',
        data: [2100, 2400, 2600, 2300, 2800, 3100, 2900],
        borderColor: '#E8B4F0',
        backgroundColor: 'rgba(232, 180, 240, 0.1)',
        fill: true
      }
    ]
  },
  today: {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
    datasets: [
      {
        label: 'Income',
        data: [120, 180, 450, 890, 1200, 980, 650],
        borderColor: '#000000',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        fill: true
      },
      {
        label: 'Expenses',
        data: [80, 120, 320, 650, 890, 720, 480],
        borderColor: '#E8B4F0',
        backgroundColor: 'rgba(232, 180, 240, 0.1)',
        fill: true
      }
    ]
  }
};

// Orders summary chart verileri
export const ordersSummary = {
  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Completed',
        data: [12000, 15000, 13000, 14000, 16000, 18000, 17000],
        backgroundColor: '#000000'
      },
      {
        label: 'On Delivery',
        data: [8000, 10000, 9000, 11000, 12000, 13000, 12500],
        backgroundColor: '#C4B5FD'
      },
      {
        label: 'New Orders',
        data: [5000, 6000, 5500, 7000, 8000, 9000, 8500],
        backgroundColor: '#E5E7EB'
      }
    ]
  },
  weekly: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Completed',
        data: [2400, 2800, 2600, 2900, 3200, 3500, 3100],
        backgroundColor: '#000000'
      },
      {
        label: 'On Delivery',
        data: [1600, 1900, 1700, 2000, 2200, 2400, 2100],
        backgroundColor: '#C4B5FD'
      },
      {
        label: 'New Orders',
        data: [1000, 1200, 1100, 1400, 1600, 1800, 1500],
        backgroundColor: '#E5E7EB'
      }
    ]
  },
  today: {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
    datasets: [
      {
        label: 'Completed',
        data: [120, 180, 250, 420, 580, 650, 720],
        backgroundColor: '#000000'
      },
      {
        label: 'On Delivery',
        data: [80, 120, 180, 280, 380, 420, 460],
        backgroundColor: '#C4B5FD'
      },
      {
        label: 'New Orders',
        data: [40, 60, 90, 140, 190, 210, 230],
        backgroundColor: '#E5E7EB'
      }
    ]
  }
};

// Orders list verileri (minimum 6 kayıt)
export const orders = [
  {
    id: '#12345',
    no: 1,
    date: 'Jan 24th, 2020',
    customerName: 'Roberto Carlo',
    location: 'Corner Street 5th London',
    amount: 34.20,
    status: 'new'
  },
  {
    id: '#12346',
    no: 2,
    date: 'Jan 24th, 2020',
    customerName: 'Maria Garcia',
    location: 'Main Avenue 12 Manchester',
    amount: 52.80,
    status: 'on-delivery'
  },
  {
    id: '#12347',
    no: 3,
    date: 'Jan 23rd, 2020',
    customerName: 'John Smith',
    location: 'Park Lane 8 Birmingham',
    amount: 28.50,
    status: 'completed'
  },
  {
    id: '#12348',
    no: 4,
    date: 'Jan 23rd, 2020',
    customerName: 'Emma Wilson',
    location: 'High Street 45 Liverpool',
    amount: 67.90,
    status: 'completed'
  },
  {
    id: '#12349',
    no: 5,
    date: 'Jan 23rd, 2020',
    customerName: 'David Brown',
    location: 'Queen Road 23 Leeds',
    amount: 41.30,
    status: 'on-delivery'
  },
  {
    id: '#12350',
    no: 6,
    date: 'Jan 22nd, 2020',
    customerName: 'Sophie Taylor',
    location: 'King Street 67 Bristol',
    amount: 89.75,
    status: 'new'
  },
  {
    id: '#12351',
    no: 7,
    date: 'Jan 22nd, 2020',
    customerName: 'Michael Johnson',
    location: 'Church Lane 34 Newcastle',
    amount: 45.60,
    status: 'completed'
  },
  {
    id: '#12352',
    no: 8,
    date: 'Jan 22nd, 2020',
    customerName: 'Lisa Anderson',
    location: 'Market Square 19 Sheffield',
    amount: 73.20,
    status: 'on-delivery'
  },
  {
    id: '#12353',
    no: 9,
    date: 'Jan 21st, 2020',
    customerName: 'James Miller',
    location: 'Victoria Street 78 Edinburgh',
    amount: 56.40,
    status: 'new'
  },
  {
    id: '#12354',
    no: 10,
    date: 'Jan 21st, 2020',
    customerName: 'Sarah Davis',
    location: 'Oxford Road 91 Cambridge',
    amount: 38.90,
    status: 'completed'
  },
  {
    id: '#12355',
    no: 11,
    date: 'Jan 21st, 2020',
    customerName: 'Thomas White',
    location: 'Bridge Street 15 York',
    amount: 62.50,
    status: 'on-delivery'
  },
  {
    id: '#12356',
    no: 12,
    date: 'Jan 20th, 2020',
    customerName: 'Emily Clark',
    location: 'Castle Road 42 Cardiff',
    amount: 71.80,
    status: 'completed'
  },
  {
    id: '#12357',
    no: 13,
    date: 'Jan 20th, 2020',
    customerName: 'Daniel Harris',
    location: 'Station Avenue 33 Glasgow',
    amount: 49.20,
    status: 'new'
  },
  {
    id: '#12358',
    no: 14,
    date: 'Jan 20th, 2020',
    customerName: 'Olivia Martin',
    location: 'Green Lane 56 Belfast',
    amount: 84.60,
    status: 'on-delivery'
  }
];

// Kategoriler
export const categories = [
  { id: 1, name: 'Kahvaltı', icon: '🌅', order: 1 },
  { id: 2, name: 'Ana Yemekler', icon: '🍽️', order: 2 },
  { id: 3, name: 'Salatalar', icon: '🥗', order: 3 },
  { id: 4, name: 'Tatlılar', icon: '🍰', order: 4 },
  { id: 5, name: 'İçecekler', icon: '☕', order: 5 }
];

// Ürünler
export const products = [
  {
    id: 1,
    name: 'Fruity pancakes',
    description: 'Fluffy pancakes topped with fresh berries and maple syrup',
    price: 18.50,
    currency: 'TRY',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop',
    categoryId: 1,
    active: true
  },
  {
    id: 2,
    name: 'Avocado Toast',
    description: 'Whole grain bread with smashed avocado and poached egg',
    price: 22.00,
    currency: 'TRY',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=200&h=200&fit=crop',
    categoryId: 1,
    active: true
  },
  {
    id: 3,
    name: 'English Breakfast',
    description: 'Traditional breakfast with eggs, bacon, sausage, beans',
    price: 35.00,
    currency: 'TRY',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=200&h=200&fit=crop',
    categoryId: 1,
    active: true
  },
  {
    id: 4,
    name: 'Rice with wok vegetables',
    description: 'Stir-fried seasonal vegetables with jasmine rice',
    price: 42.00,
    currency: 'TRY',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop',
    categoryId: 2,
    active: true
  },
  {
    id: 5,
    name: 'Pasta carbonara',
    description: 'Classic Italian pasta with creamy sauce and bacon',
    price: 45.00,
    currency: 'TRY',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=200&h=200&fit=crop',
    categoryId: 2,
    active: true
  },
  {
    id: 6,
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce',
    price: 68.00,
    currency: 'TRY',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop',
    categoryId: 2,
    active: true
  },
  {
    id: 7,
    name: 'Beef Steak',
    description: '250g premium beef with roasted vegetables',
    price: 85.00,
    currency: 'TRY',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=200&h=200&fit=crop',
    categoryId: 2,
    active: true
  },
  {
    id: 8,
    name: 'Spring salad',
    description: 'Mixed greens with cherry tomatoes and balsamic dressing',
    price: 28.00,
    currency: 'TRY',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop',
    categoryId: 3,
    active: true
  },
  {
    id: 9,
    name: 'Caesar Salad',
    description: 'Romaine lettuce with parmesan and croutons',
    price: 32.00,
    currency: 'TRY',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200&h=200&fit=crop',
    categoryId: 3,
    active: true
  },
  {
    id: 10,
    name: 'Greek Salad',
    description: 'Fresh vegetables with feta cheese and olives',
    price: 30.00,
    currency: 'TRY',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop',
    categoryId: 3,
    active: true
  },
  {
    id: 11,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center',
    price: 25.00,
    currency: 'TRY',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=200&h=200&fit=crop',
    categoryId: 4,
    active: true
  },
  {
    id: 12,
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee and mascarpone',
    price: 28.00,
    currency: 'TRY',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&h=200&fit=crop',
    categoryId: 4,
    active: true
  },
  {
    id: 13,
    name: 'Espresso',
    description: 'Strong Italian coffee',
    price: 12.00,
    currency: 'TRY',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=200&h=200&fit=crop',
    categoryId: 5,
    active: true
  },
  {
    id: 14,
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 15.00,
    currency: 'TRY',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop',
    categoryId: 5,
    active: true
  },
  {
    id: 15,
    name: 'Smoothie Bowl',
    description: 'Mixed berry smoothie with granola topping',
    price: 24.00,
    currency: 'TRY',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=200&h=200&fit=crop',
    categoryId: 5,
    active: true
  }
];

// Ürün ID counter (yeni ürün eklerken kullanılacak)
let nextProductId = 16;

export function getNextProductId() {
  return nextProductId++;
}
