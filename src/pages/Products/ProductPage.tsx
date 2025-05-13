import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Products } from '@/components/Products'
import React from 'react'

const ProductPage = () => {
  return (
    <section>
        <div>
            <Navbar />
        </div>

        <div>
            <Products />
        </div>

        <div>
            <Footer />
        </div>
    </section>
  )
}

export default ProductPage