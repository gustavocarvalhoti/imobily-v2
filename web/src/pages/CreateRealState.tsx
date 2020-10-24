import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Map, Marker, TileLayer} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import {FiPlus} from "react-icons/fi";
import '../styles/pages/create-real-state.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import {useHistory} from "react-router-dom";

export default function CreateRealState() {

    const history = useHistory();

    const [position, setPosition] = useState({latitude: 0, longitude: 0});
    const [currentPosition, setCurrentPosition] = useState({latitude: 0, longitude: 0});
    const [name, setName] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [creci, setCreci] = useState('');
    const [email, setEmail] = useState('');
    const [url, setUrl] = useState('');
    const [cep, setCEP] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

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

    async function handleSubmit(event: FormEvent) {
        console.log(currentPosition);
        event.preventDefault();
        const {latitude, longitude} = position;

        const data = new FormData();
        data.append('name', name);
        data.append('cnpj', cnpj);
        data.append('creci', creci);
        data.append('email', email);
        data.append('url', url);
        data.append('cep', cep);
        data.append('address', address);
        data.append('number', number);
        data.append('city', city);
        data.append('state', state);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        images.forEach(image => {
            data.append('images', image);
        })

        await api.post('real-state', data);

        alert('Imobiliária cadastrada com sucesso!');
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

    function cpfMask(value: string) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }

    function cnpjMask(valor: string) {
        return valor
            .replace(/[\s]/, "")
            .replace(/[(a-zA-Z)+(\!\@\#\$\%\^\&\*\(\))+]/, "")
            .replace(/T/g, "")
            .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }

    function cepMask(valor: string) {
        return valor
            .replace(/[\s]/, "")
            .replace(/[(a-zA-Z)+(\!\@\#\$\%\^\&\*\(\))+]/, "")
            .replace(/T/g, "")
            .replace(/(\d{5})(\d{2})/, "\$1-\$2");
    }

    function handleChangeCNPJ(e: ChangeEvent<HTMLInputElement>) {
        setCNPJ(cnpjMask(e.target.value))
    }

    function handleChangeCEP(e: ChangeEvent<HTMLInputElement>) {
        setCEP(cepMask(e.target.value))
    }

    return (
        <div id="page-create-orphanage">
            <Sidebar/>
            <main>
                <form className="create-orphanage-form" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Cadastro de Imobiliária</legend>
                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={event => setName(event.target.value)}
                                maxLength={150}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="cnpj">CNPJ</label>
                            <input
                                id="cnpj"
                                type="text"
                                value={cnpj}
                                onChange={event => handleChangeCNPJ(event)}
                                maxLength={18}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="creci">Creci</label>
                            <input id="creci" value={creci} onChange={event => setCreci(event.target.value)}/>
                        </div>
                        <div className="input-block">
                            <label htmlFor="email">Email</label>
                            <input id="email" value={email} onChange={event => setEmail(event.target.value)}/>
                        </div>
                        <div className="input-block">
                            <label htmlFor="site">Site</label>
                            <input id="site" value={url} onChange={event => setUrl(event.target.value)}/>
                        </div>
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
                        <legend>Fotos da Imobiliária</legend>
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
                    <span className="warning">* Preencha todos os campos acima para continuar.</span>
                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    );
}