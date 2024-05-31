// data.js
export const products = [
  {
    id: 209,
    name: 'New Product',
    category: 'The god of War',
    characteristics: 'New Product Characteristics',
    brand: 'New Product Brand',
    sku: [
      {
        id: 248,
        selling_price: 54,
        max_retail_price: 44,
        quantity_in_inventory: 0,
      },
      {
        id: 247,
        selling_price: 32,
        max_retail_price: 32,
        quantity_in_inventory: 0,
      },
      {
        id: 246,
        selling_price: 23,
        max_retail_price: 21,
        quantity_in_inventory: 1,
      },
    ],
  },
  // Add more products as needed
];

export const customers = [
  {
    id: 9,
    customer: 11908,
    customer_profile: {
      id: 11908,
      name: 'Ram',
      email: 'jesus_christ@church.com',
      pincode: 'Mumbai',
      location_name: 'Mumbai, Maharashtra, India',
    },
  },
  // Add more customers as needed
];

///dummy active users data///
export const dummyData = [
  { id: 1, customer: 'John Doe', date: '2024-05-01', amount: '$100', status: 'Active' },
  { id: 2, customer: 'Jane Smith', date: '2024-05-02', amount: '$200', status: 'Active' },
];

export const dummyActiveOrderData = [
  {
    "customer_id": 11908,
    "customer_name": "Ram",
    "items": [
      {
        "sku_id": 246,
        "price": "23",
        "quantity": "1",
        "selling_rate": "23"
      }
    ],
    "status": true,
    "invoice_no": "hello123",
    "invoice_date": "01/06/2024"
  },
  {
    "customer_id": 11909,
    "customer_name": "Shyam",
    "items": [
      {
        "sku_id": 247,
        "price": "30",
        "quantity": "2",
        "selling_rate": "60"
      }
    ],
    "status": false,
    "invoice_no": "inv001",
    "invoice_date": "02/06/2024"
  },
  {
    "customer_id": 11910,
    "customer_name": "Sita",
    "items": [
      {
        "sku_id": 248,
        "price": "15",
        "quantity": "3",
        "selling_rate": "45"
      }
    ],
    "status": true,
    "invoice_no": "inv002",
    "invoice_date": "03/06/2024"
  },
  {
    "customer_id": 11911,
    "customer_name": "Gita",
    "items": [
      {
        "sku_id": 249,
        "price": "50",
        "quantity": "1",
        "selling_rate": "50"
      }
    ],
    "status": false,
    "invoice_no": "inv003",
    "invoice_date": "04/06/2024"
  },
  {
    "customer_id": 11912,
    "customer_name": "Raju",
    "items": [
      {
        "sku_id": 250,
        "price": "20",
        "quantity": "5",
        "selling_rate": "100"
      }
    ],
    "status": true,
    "invoice_no": "inv004",
    "invoice_date": "05/06/2024"
  },
  {
    "customer_id": 11913,
    "customer_name": "Mohan",
    "items": [
      {
        "sku_id": 251,
        "price": "18",
        "quantity": "4",
        "selling_rate": "72"
      }
    ],
    "status": false,
    "invoice_no": "inv005",
    "invoice_date": "06/06/2024"
  },
  {
    "customer_id": 11914,
    "customer_name": "Radha",
    "items": [
      {
        "sku_id": 252,
        "price": "25",
        "quantity": "2",
        "selling_rate": "50"
      }
    ],
    "status": true,
    "invoice_no": "inv006",
    "invoice_date": "07/06/2024"
  },
  {
    "customer_id": 11915,
    "customer_name": "Krishna",
    "items": [
      {
        "sku_id": 253,
        "price": "12",
        "quantity": "6",
        "selling_rate": "72"
      }
    ],
    "status": false,
    "invoice_no": "inv007",
    "invoice_date": "08/06/2024"
  },
  {
    "customer_id": 11916,
    "customer_name": "Lakshman",
    "items": [
      {
        "sku_id": 254,
        "price": "22",
        "quantity": "3",
        "selling_rate": "66"
      }
    ],
    "status": true,
    "invoice_no": "inv008",
    "invoice_date": "09/06/2024"
  },
  {
    "customer_id": 11917,
    "customer_name": "Bharat",
    "items": [
      {
        "sku_id": 255,
        "price": "19",
        "quantity": "4",
        "selling_rate": "76"
      }
    ],
    "status": false,
    "invoice_no": "inv009",
    "invoice_date": "10/06/2024"
  }
]
