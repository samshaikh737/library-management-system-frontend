import React from 'react'
import { redirect } from 'next/navigation'

function Index() {
    redirect('/books')

    return (
        <div>Index</div>
    )
}

export default Index