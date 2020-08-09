import React, {useState} from 'react';
import {InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {MultiSelect} from 'primereact/multiselect';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function NewVehicle() {
    const [vehiclePlate, setVehiclePlate] = useState(''); 
    const [brand, setBrand] = useState(''); 
    const [modelYear, setModelYear] = useState(''); 
    const [mileage, setMileage] = useState(''); 
    const [optional, setOptional] = useState('');

    const userId = localStorage.getItem('userId');

    const history = useHistory();

    const optionals = [
        {label: 'Ar condicionado', value: 'Ar condicionado'},
        {label: '4x4', value: '4x4'},
        {label: 'Airbag', value: 'Airbag'},
        {label: 'Direção elétrica', value: 'Direção elétrica'},
        {label: 'Freio ABS', value: 'Freio ABS'}
    ]

    async function handleNewVehicles(e) {
        e.preventDefault();

        const data = {
            vehiclePlate,
            brand, 
            modelYear,
            mileage,
            optional,
        };

        try {
          await api.post('vehicles', data, {
            headers: {
                authorization: userId,
            }
          }) 

        history.push('/profile');

        } catch (err) {
            alert('Erro ao cadastrar veículo. Tente novamente.')
        }
    }

    return (
        <div className="NewVehicle-container">
            <section>
                <form onSubmit={handleNewVehicles}>
                    <h1>Cadastrar novo veículo</h1>

                    <InputText 
                        className="margin-bottom" 
                        placeholder="Placa"
                        value={vehiclePlate}
                        onChange={e => setVehiclePlate(e.target.value)}
                    />

                    <InputText 
                        className="margin-bottom" 
                        placeholder="Marca"
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                    />

                    <InputText 
                        className="margin-bottom" 
                        placeholder="Ano do Modelo"
                        value={modelYear}
                        onChange={e => setModelYear(e.target.value)}
                    />

                    <InputText 
                        className="margin-bottom" 
                        placeholder="Quilometragem"
                        value={mileage}
                        onChange={e => setMileage(e.target.value)}
                    /> 

                    <MultiSelect 
                        className="margin-bottom" 
                        options={optionals}
                        value={optional}
                        onChange={e => setOptional(e.target.value)}
                        filter={true}
                        filterPlaceholder="Pesquisar" 
                    />

                    <Button label="Cadastrar" className="margin-top p-button-primary" />

                    <Link className="back-link" to="/profile">
                        Voltar para a Home
                    </Link>
                </form>
            </section>
        </div>
    )
}