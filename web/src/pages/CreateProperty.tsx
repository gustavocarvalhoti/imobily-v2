import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Map, Marker, TileLayer} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import {FiPlus} from "react-icons/fi";
import '../styles/pages/create-property.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import {useHistory} from "react-router-dom";

export default function CreateOrphanage() {

    const history = useHistory();

    const [position, setPosition] = useState({latitude: 0, longitude: 0});
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [instructions, setInstructions] = useState('');
    const [opening_hours, setOpeningHours] = useState('');
    const [open_on_weekends, setOpenOnWeekends] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [cep, setCEP] = useState('');
    const [currentPosition, setCurrentPosition] = useState({latitude: 0, longitude: 0});

    function handleMapClick(event: LeafletMouseEvent) {
        const {lat, lng} = event.latlng;
        setPosition({
            latitude: lat,
            longitude: lng
        });
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setCurrentPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        });
    }, []);


    function cepMask(valor: string) {
        return valor
            .replace(/[\s]/, "")
            .replace(/[(a-zA-Z)+(\!\@\#\$\%\^\&\*\(\))+]/, "")
            .replace(/T/g, "")
            .replace(/(\d{5})(\d{2})/, "\$1-\$2");
    }

    function handleChangeCEP(e: ChangeEvent<HTMLInputElement>) {
        setCEP(cepMask(e.target.value))
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const {latitude, longitude} = position;

        /* Equal the Multipart of the Insomnia */
        const data = new FormData();
        data.append('name', name);
        data.append('about', about);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('instructions', instructions);
        data.append('open_on_weekends', String(open_on_weekends));
        data.append('opening_hours', opening_hours);
        images.forEach(image => {
            data.append('images', image);
        })

        await api.post('orphanages', data);

        alert('Cadastro realizado com sucesso!');
        history.push('/app');
    }

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

        const selectedImages = Array.from(event.target.files);

        setImages(selectedImages);

        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image);
        });
        setPreviewImages(selectedImagesPreview);
    }

    return (
        <div id="page-create-orphanage">
            <Sidebar/>
            <main>
                <form className="create-orphanage-form" onSubmit={handleSubmit} autoComplete="off">
                    <fieldset>
                        <legend>Cadastro de Imóvel</legend>
                        <div className="input-block">
                            <div className="button-select">
                                <button
                                    type="button"
                                    className={open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(true)}
                                >
                                    Alugar
                                </button>
                                <button
                                    type="button"
                                    className={!open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(false)}
                                >
                                    Vender
                                </button>
                            </div>
                        </div>
                        <div className="input-block">
                            <label htmlFor="name">Categoria</label>
                            <input
                                id="name"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="about">Descrição <span>Máximo de 300 caracteres</span></label>
                            <textarea
                                id="about"
                                maxLength={300}
                                value={about}
                                onChange={event => setAbout(event.target.value)}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="name">Valor</label>
                            <input
                                id="price"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="images">Fotos</label>
                            <div className="images-container">
                                {previewImages.map((image, index) => {
                                    return <img key={index} src={image} alt={name}/>
                                })}
                                <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6"/>
                                </label>
                            </div>
                            <input
                                id="image[]"
                                type="file"
                                multiple
                                onChange={handleSelectImages}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Endereço</legend>
                        <div className="input-block input-block-address">
                            <div>
                                <label htmlFor="address">Endereço</label>
                                <input id="address" value={address} onChange={event => setAddress(event.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="number">N°</label>
                                <input id="number" value={number} onChange={event => setNumber(event.target.value)}/>
                            </div>
                        </div>
                        <div className="input-block input-block-address">
                            <div>
                                <label htmlFor="city">Cidade</label>
                                <input id="city" value={city} onChange={event => setCity(event.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="state">Estado</label>
                                <input id="state" value={state} onChange={event => setState(event.target.value)}/>
                            </div>
                        </div>
                        <div className="input-block">
                            <label htmlFor="cep">CEP</label>
                            <input
                                id="cep"
                                type="text"
                                value={cep}
                                onChange={event => handleChangeCEP(event)}
                                maxLength={9}
                            />
                        </div>
                        <br/>
                        <Map
                            center={[currentPosition.latitude, currentPosition.longitude]}
                            style={{width: '100%', height: 280}}
                            zoom={15}
                            onClick={handleMapClick}
                        >
                            <TileLayer
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                            />
                            {position.latitude !== 0 && (
                                <Marker
                                    interactive={false}
                                    icon={mapIcon}
                                    position={[position.latitude, position.longitude]}
                                />
                            )}
                        </Map>
                    </fieldset>
                    <fieldset>
                        <legend>Imobiliárias</legend>
                        <div className="input-block input-block-address">
                            <div>
                                <label htmlFor="address">Imobiliária</label>
                                <input id="address" value={address} onChange={event => setAddress(event.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="number">Valor</label>
                                <input id="number" value={number} onChange={event => setNumber(event.target.value)}/>
                            </div>
                        </div>
                        <div className="input-block">
                            <label htmlFor="name">Link</label>
                            <input
                                id="price"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </div>
                    </fieldset>
                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    );
}