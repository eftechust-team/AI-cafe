// Mock customer database with recognition and order history
export interface CustomerOrder {
  date: string;
  category: 'tea' | 'coffee' | 'snack';
  productName: string;
  notes: string;
}

export interface Customer {
  id: string;
  faceId: string; // Mock face identifier
  name: string;
  orderHistory: CustomerOrder[];
  lastOrder?: CustomerOrder;
  totalOrders: number;
}

// Mock database of existing customers
const mockCustomerDatabase: Customer[] = [
  {
    id: '1',
    faceId: 'face_1_demo',
    name: 'Alice',
    orderHistory: [
      {
        date: '2026-05-15',
        category: 'tea',
        productName: 'Chamomile Relax',
        notes: 'Preferred for evening relaxation',
      },
      {
        date: '2026-05-10',
        category: 'snack',
        productName: 'High Protein Energy Bar',
        notes: 'Morning energy boost',
      },
    ],
    lastOrder: {
      date: '2026-05-15',
      category: 'tea',
      productName: 'Chamomile Relax',
      notes: 'Evening tea',
    },
    totalOrders: 2,
  },
  {
    id: '2',
    faceId: 'face_2_demo',
    name: 'Bob',
    orderHistory: [
      {
        date: '2026-05-14',
        category: 'coffee',
        productName: 'Double Shot Espresso',
        notes: 'Strong coffee for morning focus',
      },
    ],
    lastOrder: {
      date: '2026-05-14',
      category: 'coffee',
      productName: 'Double Shot Espresso',
      notes: 'Morning coffee',
    },
    totalOrders: 1,
  },
];

// Mock face recognition - in production, would use actual face recognition API
export const recognizeCustomer = (): Customer | null => {
  // Randomly select a customer or return null (simulating new customer)
  const random = Math.random();

  if (random < 0.6) {
    // 60% chance of returning customer
    return mockCustomerDatabase[Math.floor(Math.random() * mockCustomerDatabase.length)];
  }

  // 40% chance of new customer
  return null;
};

// Add new order to customer history
export const addOrderToCustomer = (
  customerId: string,
  order: CustomerOrder
): Customer | null => {
  const customer = mockCustomerDatabase.find((c) => c.id === customerId);
  if (customer) {
    customer.orderHistory.push(order);
    customer.lastOrder = order;
    customer.totalOrders += 1;
    return customer;
  }
  return null;
};

// Create new customer
export const createNewCustomer = (name: string, firstOrder: CustomerOrder): Customer => {
  const newCustomer: Customer = {
    id: `customer_${Date.now()}`,
    faceId: `face_${Date.now()}`,
    name,
    orderHistory: [firstOrder],
    lastOrder: firstOrder,
    totalOrders: 1,
  };
  mockCustomerDatabase.push(newCustomer);
  return newCustomer;
};

export const getAllCustomers = (): Customer[] => {
  return mockCustomerDatabase;
};
