import { useState } from 'react'

export default function Navbar() {
  const [showIntegrantes, setShowIntegrantes] = useState(false)
  const [isOpen, setIsOpen] = useState(false) // estado para menú móvil

  return (
    <>
      <nav
        className='shadow-lg barca-shadow'
        style={{
          background: 'linear-gradient(135deg, #004d98 0%, #a50044 100%)',
          backgroundColor: '#004d98' // Fallback color
        }}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo/Brand */}
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <h1
                  className='text-2xl font-bold text-white flex items-center gap-2'
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                >
                  Investigacion Operativa
                </h1>
              </div>
            </div>

            {/* Navigation Links (Desktop) */}
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                <a
                  href='#'
                  className='bg-black/40 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/50 transition-all duration-300 backdrop-blur-sm border border-white/30'
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  Metodo Gráfico
                </a>
                <a
                  href='#'
                  className='text-white/90 hover:text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300'
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                >
                  Metodo Simplex
                </a>
                <button
                  onClick={() => setShowIntegrantes(true)}
                  className='text-white/90 hover:text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300'
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                >
                  Integrantes
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className='md:hidden'>
              <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className='bg-black/40 inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-white hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/50 transition-all duration-300 border border-white/30'
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
              >
                <span className='sr-only'>Abrir menú principal</span>
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu (cuando isOpen es true) */}
        {isOpen && (
          <div className='md:hidden px-4 pb-4 space-y-2'>
            <a
              href='#'
              className='block bg-black/40 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/50 transition-all duration-300 backdrop-blur-sm border border-white/30'
            >
              Metodo Gráfico
            </a>
            <a
              href='#'
              className='block text-white/90 hover:text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300'
            >
              Metodo Simplex
            </a>
            <button
              onClick={() => {
                setShowIntegrantes(true)
                setIsOpen(false) // cierro menú al abrir modal
              }}
              className='block w-full text-left text-white/90 hover:text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300'
            >
              Integrantes
            </button>
          </div>
        )}
      </nav>

      {/* Modal de Integrantes */}
      {showIntegrantes && (
        <div className='fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-800'>
                Integrantes del Equipo
              </h2>
              <button
                onClick={() => setShowIntegrantes(false)}
                className='text-gray-500 hover:text-gray-700 text-2xl font-bold'
              >
                ×
              </button>
            </div>
            <div className='space-y-4'>
              <div className='p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500'>
                <h3 className='font-semibold text-blue-800'>
                  Jose Sebastian Torrico Severiche
                </h3>
              </div>
              <div className='p-4 bg-red-50 rounded-lg border-l-4 border-red-500'>
                <h3 className='font-semibold text-red-800'>
                  Jhon Alenxander Sanchez Rodriguez
                </h3>
              </div>
            </div>
            <div className='mt-6 flex justify-end'>
              <button
                onClick={() => setShowIntegrantes(false)}
                className='px-6 py-2 bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-lg hover:from-blue-700 hover:to-red-700 transition-all duration-300'
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
