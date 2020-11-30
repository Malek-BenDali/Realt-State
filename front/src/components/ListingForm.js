import React, {useState} from 'react'
import axios from 'axios' 
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types';

function ListingForm(props) {
    const [formData, setFormData] = useState({
        sale_type : "A vendre",
        price : "$0+",
        bedrooms : "0+",
        bathrooms : "0+",
        home_type : "Maison",
        sqft : "1000+",
        days_listed : "1 or less",
        has_photos : "1+",
        open_house : "false",
        keywords : ""
    })

    const { sale_type, price, bedrooms, home_type, bathrooms, sqft, days_listed, has_photos, open_house, keywords}= formData

    const [loading, setLoading] = useState(false);
    const onChange = e => setFormData({
        ...formData,
        [e.target.name] : [e.target.value]
    })

    const onSubmit = e => {
        e.preventDefault();

        axios.defaults.headers = {
            "Content-Type" : "Application/json"
        }

        setLoading(true);

        axios.post("", {sale_type, price, bedrooms, home_type, bathrooms, sqft, days_listed, has_photos, open_house, keywords})
        .then(res => {
            setLoading(false);
            props.setListings(res.data);
            window.scrollTo(0, 0)
        })
        .catch(err => {
            setLoading(false);
            window.scrollTo(0,0)
        })

    }

    return (
        <form className='listingform' onSubmit = {e => onSubmit(e)}>
            <div className='row' >
                <div className='col-1-of-6'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='sale_type'> Louez ou Achetez </label>
                        <select 
                        className='listingform__select' 
                        name='sale_type' 
                        onChange={e=>onChange(e) }
                        value={sale_type}>
                            <option>A vendre</option>
                            <option>A louer</option>
                        </select>
                    </div>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='sqft'> Surface en m² </label>
                        <select 
                        className='listingform__select' 
                        name='sqft' 
                        onChange={e=>onChange(e) }
                        value={sqft}>
                            <option>1000+</option>
                            <option>1200+</option>
                            <option>1500+</option>
                            <option>2000+</option>
                            <option>Any</option>
                        </select>
                    </div>
                </div> 
                 
                <div className='col-1-of-6'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='days_listed'> Jour du post </label>
                        <select 
                        className='listingform__select' 
                        name='days_listed' 
                        onChange={e=>onChange(e) }
                        value={days_listed}>
                            <option>1 or less</option>
                            <option>2 or less</option>
                            <option>5 or less</option>
                            <option>10 or less</option>
                            <option>20 or less</option>
                            <option>Any</option>
                           
                            <option>Any</option>
                        </select>
                    </div>
                </div> 


                <div className='col-1-of-6'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='price'> Prix miniamel </label>
                        <select 
                        className='listingform__select' 
                        name='price' 
                        onChange={e=>onChange(e) }
                        value={price}>
                            <option>$0+</option>
                            <option>$200,000+</option>
                            <option>$400,000+</option>
                            <option>$600,000+</option>
                            <option>$800,000+</option>
                            <option>$1,000,000+</option>
                            <option>$1,200,000+</option>
                            <option>$1,500,000+</option>
                            <option>Any</option>
                        </select>
                    </div>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='bedrooms'> Chambres </label>
                        <select 
                        className='listingform__select' 
                        name='bedrooms' 
                        onChange={e=>onChange(e) }
                        value={bedrooms}>
                            <option>0+</option>
                            <option>1+</option>
                            <option>2+</option>
                            <option>3+</option>
                            <option>4+</option>
                            <option>5+</option>
                        </select>
                    </div>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='has_photos'> Images </label>
                        <select 
                        className='listingform__select' 
                        name='has_photos' 
                        onChange={e=>onChange(e) }
                        value={has_photos}>
                            <option>0+</option>
                            <option>1+</option>
                            <option>2+</option>
                            <option>3+</option>
                            <option>4+</option>
                        </select>
                    </div>
                </div>

                <div className='col-1-of-6'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='home_type'> Type de logement </label>
                        <select 
                        className='listingform__select' 
                        name='home_type' 
                        onChange={e=>onChange(e) }
                        value={home_type}>
                            <option>Maison</option>
                            <option>Appartement</option>
                            <option>Villa</option>
                        </select>
                    </div>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='keywords'> Mote clé </label>
                        <input className='listingform__input'
                            name='keywords'
                            type='text'
                            onChange = {e => onChange(e)}
                            value={keywords} />
                    </div>
                </div>

                <div className='col-1-of-6'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='bathrooms'> Toilette </label>
                        <select 
                            className='listingform__select' 
                            name='bathrooms' 
                            onChange={e=>onChange(e) }
                            value={bathrooms}>
                            <option>0+</option>
                            <option>1+</option>
                            <option>2+</option>
                            <option>3+</option>
                            <option>4+</option>
                        </select>
                    </div>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='open_house'> Maison Ouverte </label>
                        <input 
                            lassName='listingform__checkBox' 
                            name='open_house'
                            type='checkbox' 
                            onChange={e => onChange(e)}
                            value={open_house}/>  
                    </div>
                </div>

                <div className='col-1-of-6'>
                    {loading ?
                        <div className='listingform_loader'>
                            <Loader
                                type='Oval'
                                color="424242"
                                height={50}
                                width={50}
                            />
                        </div> :
                        <button className='listingform__button listingform__buton--primary'>
                            Recherche
                        </button>
                        
                    }
                </div>
            </div>
        </form>
    )
}

ListingForm.protoTypes = {
    setListings : PropTypes.func.isRequired
}

export default ListingForm
