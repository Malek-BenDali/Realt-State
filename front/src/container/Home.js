import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import ListingForm from '../components/ListingForm'
import Listings from '../components/Listings'
import Pagination from '../components/Pagination'

function Home() {
    const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [listingsPerPage, setListingsPerPage] = useState(3)
    const [active, setActive] = useState(1)

    const indexOfLastListing = currentPage*listingsPerPage;
    const indexOfFirstListing = indexOfLastListing - listingsPerPage
    const currentListings = listings.slice(indexOfFirstListing,indexOfLastListing)

    const visitPage = page =>{
        setCurrentPage(page)
        setActive(page)
    }

    //looking for the number of the pervious page
    const previous_number =() =>{
        if (currentPage !== 1){
            setCurrentPage(currentPage-1)
            setActive(currentPage-1);
        }
    }
    //looking for the number of the next page
    const next_number =() =>{
        if (currentPage !== Math.ceil(listings.length/3)){
            setCurrentPage(currentPage+1)
            setActive(currentPage+1);
        }
    }

    return (
        <main className='home'>
            <Helmet>
                <title> Acceuil </title>
                <meta 
                    name='description'
                    content='Home Page'
                />
            </Helmet>
            <section className='home__form'>
                <ListingForm setListings={setListings} />
            </section>
            <section className='home__listings'>
                <Listings setListings={currentListings} />
            </section>
            <section className='home__pagination'>
                <div className='row'>
                    {
                        listings.length !== 0 ? (
                            <Pagination
                            itemPerPage={listingsPerPage}
                            count={listings}
                            visitPage={visitPage}
                            previous={previous_number}
                            next={next_number}
                            active={active}
                            setActive={setActive}
                            />
                        ):null
                    }
                </div>
            </section>
            
        </main>
    )
}

export default Home
