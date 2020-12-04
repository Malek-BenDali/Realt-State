import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

function Addlistings() {

    const [realtors, setRealtors] = useState([]);
    const [formData, setFormData] = useState({
        slug: "",
        title: "",
        adress: "",
        city: "",
        state: "",
        zipcode: "",
        description: "",
        sale_type: "A vendre",
        price: null,
        bedrooms : null,
        bathrooms : null,
        home_type : null,
        sqft : null,
        open_house : true,
        photo_main : null,
        photo_1 : null,
        photo_2 : null,
        photo_3 : null,
        photo_4: null,
        is_published : false,
        realtor : 1
    });


    useEffect(() => {
        window.scrollTo(0, 0);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const getRealtors = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/realtors/`, config);
                setRealtors(res.data);
            }
            catch (err) {

            }
        };

        getRealtors();
    }, []);
    

    const { 
        title, 
        adress, 
        city, 
        state,
        zipcode,
        description,
        sale_type,
        price,
        bedrooms,
        sqft,
        bathrooms,
        open_house,
        photo_main,
        photo_1,
        photo_2 ,
        photo_3 ,
        photo_4,
        home_type,
        is_published ,
        realtor 
    } = formData;

    const [loading, setLoading] = useState(false);

    const createSlug = str => str = str.replace(/\s+/g, '-');

    const onChange = e => {
        // if (e.target.name === "price")
        //     setFormData({ ...formData, [e.target.name]: formatter.format(e.target.value) });
        //  if (e.target.name === "adress")
        //     setFormData({ 
        //         ...formData, 
        //         [e.target.name]: e.target.value,
        //         slug : createSlug(e.target.value)
        //    });
            if (e.target.name === "realtor"){
                console.log(e.target.value);
                const result = realtors.filter( choice => choice.name === e.target.value );
                console.log(result[0].id)
            setFormData({ 
                ...formData, 
                [e.target.name]: e.target.value,
            });}
            if (e.target.name === "is_published"){
                console.log(e.target.value)
                setFormData({ ...formData, [e.target.name]: e.target.value });
            }
        else
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
    }

    const onSubmit = e => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        setLoading(true);
        axios.post(`http://127.0.0.1:8000/api/listings/create/`, { slug : createSlug(formData.adress) ,title, 
        adress, 
        city, 
        state,
        zipcode,
        description,
        sale_type,
        price,
        bedrooms,
        sqft,
        bathrooms,
        open_house,
        photo_main,
        photo_1,
        photo_2 ,
        photo_3 ,
        photo_4,
        home_type,
        is_published ,
        realtor }, config)
        .then(res => {
            setAlert('Message Sent', 'success');
            setLoading(false);
            window.scrollTo(0, 0);
        })
        .catch(err => {
            console.log(err)
            setAlert('Error with Sending Message', 'error');
            setLoading(false);
            window.scrollTo(0, 0);
        })
        setFormData({
            ...formData,

        })
    };


    return (
        <div className='contact'>
            <Helmet>
                <title>Contact</title>
                <meta
                    name='description'
                    content='Contact us'
                />
            </Helmet>
            <form className='contact__form' onSubmit={e => onSubmit(e)}>
                <label className='contact__form__label' htmlFor='title'>Titre*</label>
                <input 
                    className='contact__form__input' 
                    id="title"
                    name='title' 
                    type='text' 
                    placeholder="Tire de l'article" 
                    onChange={e => onChange(e)} 
                    value={title} 
                    required 
                />
                <label className='contact__form__label' htmlFor='adress'>adress*</label>
                <input 
                    className='contact__form__input' 
                    id="adress"
                    name='adress' 
                    type='text' 
                    placeholder='Rue abdellah baidaoui' 
                    onChange={e => onChange(e)} 
                    value={adress} 
                    required 
                />
                <label className='contact__form__label' htmlFor='city'>Ville*</label>
                <input 
                    className='contact__form__input' 
                    id="city"
                    name='city' 
                    type='text' 
                    placeholder='Sousse' 
                    onChange={e => onChange(e)} 
                    value={city} 
                    required 
                />
                <label className='contact__form__label' htmlFor='state'>Pays*</label>
                <input 
                    className='contact__form__input' 
                    id="state"
                    name='state' 
                    type='text' 
                    placeholder='Tunisie' 
                    onChange={e => onChange(e)} 
                    value={state} 
                    required 
                />
                <label className='contact__form__label' htmlFor='zipcode'>zipcode*</label>
                <input 
                    className='contact__form__input' 
                    id="zipcode"
                    name='zipcode' 
                    type='number' 
                    placeholder='1234' 
                    onChange={e => onChange(e)} 
                    value={zipcode} 
                    required 
                />
                <label className='contact__form__label' htmlFor='price'>Prix*</label>
                <input 
                    id="price"
                    className='contact__form__input' 
                    name='price' 
                    type='number' 
                    placeholder='$10,000' 
                    onChange={e => onChange(e)} 
                    value={price} 
                    required 
                />
                <label className='contact__form__label' htmlFor='bedrooms'>Chambres*</label>
                <input 
                    className='contact__form__input' 
                    id="bedrooms"
                    name='bedrooms' 
                    type='number' 
                    placeholder='Sousse' 
                    onChange={e => onChange(e)} 
                    value={bedrooms} 
                    required 
                />
                <label className='contact__form__label' htmlFor='bathrooms'>Toilette*</label>
                <input 
                    id="bathrooms"
                    className='contact__form__input' 
                    name='bathrooms' 
                    type='number' 
                    placeholder='Sousse' 
                    onChange={e => onChange(e)} 
                    value={bathrooms} 
                    required 
                />
                <label className='contact__form__label' htmlFor='sqft'>surface*</label>
                <input 
                    className='contact__form__input' 
                    id="sqft"
                    name='sqft' 
                    type='number' 
                    placeholder='Sousse' 
                    onChange={e => onChange(e)} 
                    value={sqft} 
                    required 
                />
                <label className='contact__form__label' htmlFor='open_house'>Maison Ouverte*</label>
                <input 
                    id="open_house"
                    name='open_house' 
                    type='checkbox'  
                    onChange={e => onChange(e)} 
                    value={open_house} 
                    required 
                />
                <label className='contact__form__label' htmlFor='photo_main'>Image d'exposition*</label>
                <input 
                    id="photo_main"
                    name='photo_main' 
                    type='file' 
                    onChange={e => onChange(e)} 
                    value={photo_main} 
                    required 
                />
                <label className='contact__form__label' htmlFor='photo_1'>Image</label>
                <input 
                    id="photo_1"
                    name='photo_1' 
                    type='file' 
                    onChange={e => onChange(e)} 
                    value={photo_1} 
                     
                />
                <label className='contact__form__label' htmlFor='photo_2'>Image</label>
                <input 
                    id="photo_2"
                    name='photo_2' 
                    type='file' 
                    onChange={e => onChange(e)} 
                    value={photo_2} 
                     
                />
                <label className='contact__form__label' htmlFor='photo_3'>Image</label>
                <input 
                    id="photo_3"
                    name='photo_3' 
                    type='file' 
                    onChange={e => onChange(e)} 
                    value={photo_3} 
                     
                />
                <label className='contact__form__label' htmlFor='photo_4'>Image</label>
                <input 
                    id="photo_4"
                    name='photo_4' 
                    type='file' 
                    onChange={e => onChange(e)} 
                    value={photo_4} 
                     
                />
                <label className='contact__form__label' htmlFor='is_published'>Publier*</label>
                <input 
                    id="is_published"
                    name='is_published' 
                    type='checkbox' 
                    placeholder='Sousse' 
                    onChange={e => onChange(e)} 
                    value={is_published} 
                    required 
                />
                <div className='contact__form__label' style={{marginTop : "1rem"}}>
                    <select className='listingform__select' name='realtor' onChange={e => onChange(e)} value={realtor}>
                            {realtors.map( choice => (
                                <>
                                <option> {choice.name} </option>
                                </>
                            ))}
                    </select>
                </div>
                <select className='listingform__select' name='sale_type' onChange={e => onChange(e)} value={sale_type}> Vendez ou Louez
                        <option>A Vendre</option>
                        <option>A Louer</option>
                </select>
                <select className='listingform__select' name='home_type' onChange={e => onChange(e)} value={home_type}> Type d'immobilier
                        <option>Maison</option>
                        <option>Appartement</option>
                        <option>Villa</option>
                </select>
                <label className='contact__form__label' htmlFor='description'>Description</label>
                <textarea 
                    className='contact__form__textarea'
                    id="description"
                    name='description'
                    cols='30'
                    rows='10'
                    placeholder='descriptnio'
                    onChange={e => onChange(e)} 
                    value={description} 
                />
                {loading ?
                    <div className='contact__form__loader'>
                        <Loader
                            type="Oval"
                            color="#424242"
                            height={50}
                            width={50}
                        />
                    </div> :
                    <button className='contact__form__button' htmltype='submit'>Send</button>
                }
            </form>
        </div>
    )
}
Addlistings.propTypes = {
    setAlert: PropTypes.func.isRequired
};

export default connect(null,{ setAlert }) (Addlistings)
