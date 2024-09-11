import { Farm } from "@shared/interfaces/farm";

export const fakeFarms: Farm[] = [
  {
    id: "a1234567-89ab-4cde-b012-3456789abcde",
    name: "Farm One",
    caf: "CAF-001",
    active: true,
    admin_id: "123e4567-e89b-12d3-a456-426614174000",
    tax: 2.5,
    status: "APPROVED"
  },
  {
    id: "b2345678-90bc-5def-c123-4567890bcdef",
    name: "Farm Two",
    caf: "CAF-002",
    active: false,
    admin_id: "223e4567-e89b-12d3-a456-426614174001",
    tax: 3.0,
    status: 3
  },
  {
    id: "c3456789-01cd-6efg-d234-567890cdefgh",
    name: "Farm Three",
    caf: "CAF-003",
    active: true,
    admin_id: "323e4567-e89b-12d3-a456-426614174002",
    tax: 4.1,
    status: 7
  },
  {
    id: "d4567890-12de-7fgh-e345-678901defghi",
    name: "Farm Four",
    caf: "CAF-004",
    active: true,
    admin_id: "423e4567-e89b-12d3-a456-426614174003",
    tax: 2.9,
    status: "APPROVED"
  },
  {
    id: "e5678901-23ef-8ghi-f456-789012efghij",
    name: "Farm Five",
    caf: "CAF-005",
    active: false,
    admin_id: "523e4567-e89b-12d3-a456-426614174004",
    tax: 3.6,
    status: 4
  },
  {
    id: "f6789012-34fg-9hij-g567-890123fghijk",
    name: "Farm Six",
    caf: "CAF-006",
    active: true,
    admin_id: "623e4567-e89b-12d3-a456-426614174005",
    tax: 5.0,
    status: 9
  },
  {
    id: "g7890123-45gh-0ijk-h678-901234ghijkl",
    name: "Farm Seven",
    caf: "CAF-007",
    active: false,
    admin_id: "723e4567-e89b-12d3-a456-426614174006",
    tax: 2.8,
    status: "APPROVED"
  },
  {
    id: "h8901234-56hi-1jkl-i789-012345hijklm",
    name: "Farm Eight",
    caf: "CAF-008",
    active: true,
    admin_id: "823e4567-e89b-12d3-a456-426614174007",
    tax: 4.3,
    status: 5
  },
  {
    id: "i9012345-67ij-2klm-j890-123456ijklmn",
    name: "Farm Nine",
    caf: "CAF-009",
    active: false,
    admin_id: "923e4567-e89b-12d3-a456-426614174008",
    tax: 3.7,
    status: 2
  },
  {
    id: "j0123456-78jk-3lmn-k901-234567jklmno",
    name: "Farm Ten",
    caf: "CAF-010",
    active: true,
    admin_id: "a23e4567-e89b-12d3-a456-426614174009",
    tax: 2.4,
    status: "APPROVED"
  }
];

export const fakeFarmsDetail = [
  {
    id: "a1234567-89ab-4cde-b012-3456789abcde",
    name: "Farm One",
    caf: "CAF-001",
    active: true,
    admin_id: "123e4567-e89b-12d3-a456-426614174000",
    tax: 2.5,
    orders: {
        id: "205004",
        bag_id: "bag1",
        name: "José da Silva",
        amount: 100,
        status: "PENDING",
        created_at: new Date("2024-01-15T08:30:00Z"),
        updated_at: null,
        offer: {
          id: "offer1",
          farm_id: "a1234567-89ab-4cde-b012-3456789abcde",
          cycle_id: "cycle1",
          price: 50.0,
          amount: 100,
          description: "High-quality product A",
          created_at: new Date("2024-01-10T08:30:00Z"),
          updated_at: null,
          product: {
            id: "product1",
            name: "Produto A",
            pricing: "UNIT",
            image: "https://example.com/image1.jpg",
            created_at: new Date("2024-01-01T08:30:00Z"),
            updated_at: null,
          },
        },
      }
  },
  {
    id: "b2345678-90bc-5def-c123-4567890bcdef",
    name: "Farm Two",
    caf: "CAF-002",
    active: false,
    admin_id: "223e4567-e89b-12d3-a456-426614174001",
    tax: 3.0,
    orders: {
        id: "205004",
        bag_id: "bag3",
        amount: 200,
        status: "SEPARATED",
        name: "José da Silva",
        created_at: new Date("2024-03-20T10:00:00Z"),
        updated_at: null,
        offer: {
          id: "offer3",
          farm_id: "b2345678-90bc-5def-c123-4567890bcdef",
          cycle_id: "cycle3",
          price: 100.0,
          amount: 200,
          description: "Standard quality product C",
          created_at: new Date("2024-03-15T10:00:00Z"),
          updated_at: null,
          product: {
            id: "product3",
            name: "Produto C",
            pricing: "UNIT",
            image: "https://example.com/image3.jpg",
            created_at: new Date("2024-03-01T10:00:00Z"),
            updated_at: null,
          },
        },
      },
  },
];
