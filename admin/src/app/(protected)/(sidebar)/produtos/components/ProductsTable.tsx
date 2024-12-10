'use client'

import Image from 'next/image'

import { FiEdit2, FiTrash2 } from 'react-icons/fi'

interface Product {
  image: string
  name: string
  category: string
  unit: string
  perishable: string
}

const products: Product[] = [
  {
    image: '/placeholder.svg?height=40&width=40',
    name: 'Abacate',
    category: 'Frutas',
    unit: 'kilo',
    perishable: 'Sim'
  },
  {
    image: '/placeholder.svg?height=40&width=40',
    name: 'Abacaxi',
    category: 'Frutas',
    unit: 'kilo',
    perishable: 'Sim'
  },
  {
    image: '/placeholder.svg?height=40&width=40',
    name: 'Abóbora Cabotiá',
    category: 'Hortaliças e Legumes',
    unit: 'kilo',
    perishable: 'Sim'
  },
  {
    image: '/placeholder.svg?height=40&width=40',
    name: 'Abóbora Cabotiá',
    category: 'Hortaliças e Legumes',
    unit: 'unidade',
    perishable: 'Sim'
  },
  {
    image: '/placeholder.svg?height=40&width=40',
    name: 'Abóbora Japonesa',
    category: 'Hortaliças e Legumes',
    unit: 'kilo',
    perishable: 'Sim'
  },
  {
    image: '/placeholder.svg?height=40&width=40',
    name: 'Abóbora Japonesa',
    category: 'Hortaliças e Legumes',
    unit: 'unidade',
    perishable: 'Sim'
  },
  {
    image: '/placeholder.svg?height=40&width=40',
    name: 'Abóbora Moranga',
    category: 'Hortaliças e Legumes',
    unit: 'kilo',
    perishable: 'Sim'
  },
  {
    image: '/placeholder.svg?height=40&width=40',
    name: 'Abóbora Moranga',
    category: 'Hortaliças e Legumes',
    unit: 'unidade',
    perishable: 'Sim'
  },
  {
    image: '/placeholder.svg?height=40&width=40',
    name: 'Abóbora Paulista',
    category: 'Hortaliças e Legumes',
    unit: 'kilo',
    perishable: 'Sim'
  },
  {
    image: '/placeholder.svg?height=40&width=40',
    name: 'Abóbora Paulista',
    category: 'Hortaliças e Legumes',
    unit: 'unidade',
    perishable: 'Sim'
  }
]

export default function ProductsTable() {
  const thHeaderStyle = 'py-3 px-4 text-left font-semibold'
  const tdContentStyle = 'py-2 px-4 text-theme-primary'

  return (
    <div className="overflow-y-auto bg-white">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className='border-b border-steel-blue-gray text-theme-primary'>
            <th className={thHeaderStyle}>Imagem</th>
            <th className={thHeaderStyle}>Nome</th>
            <th className={thHeaderStyle}>Categoria</th>
            <th className={thHeaderStyle}>Unidade</th>
            <th className={thHeaderStyle}>Perecível</th>
            <th className={thHeaderStyle}></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b border-steel-blue-gray hover:bg-gray-50 transition-colors duration-150">
              <td className="py-2 px-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </td>
              <td className={tdContentStyle}>{product.name}</td>
              <td className={tdContentStyle}>{product.category}</td>
              <td className={tdContentStyle}>{product.unit}</td>
              <td className={tdContentStyle}>{product.perishable}</td>
              <td className="py-2 px-4">
                <div className="flex gap-6">
                  <button 
                    aria-label="Editar"
                  >
                    <FiEdit2 className='text-theme-primary' size={24} />
                  </button>
                  <button 
                    aria-label="Excluir"
                  >
                    <FiTrash2 className='text-theme-primary' size={24} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}