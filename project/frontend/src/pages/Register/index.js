import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {useMedia} from 'react-use';
import {InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';

import api from '../../services/api';
import './styles.css'

import Vehicles from '../../assets/vehicles.jpg'

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const isWide = useMedia('(min-width: 1000px)');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            city,
            uf,
        };

        try {
            const response = await api.post('users', data);

            history.push('/');

            alert(`Cadastro realizado com sucesso! Seu ID de acesso é: ${response.data.id}.`);
        } catch (err) {
            alert('Erro no cadastro. Tente novamente.');
        }
    }

    return (
        <div className="register-container">
                <section>
                    <form onSubmit={handleRegister}>
                        <h1>Faça seu cadastro</h1>

                        <InputText 
                            className="margin-bottom" 
                            placeholder="Nome"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <InputText 
                            className="margin-bottom" 
                            type="email" 
                            placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <InputText 
                            className="margin-bottom" 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <InputText 
                            className="margin-bottom" 
                            placeholder="Estado"
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        /> 

                        <Button label="Cadastrar" className="margin-top p-button-primary" />

                        <Link className="back-link" to="/">
                            Já tenho cadastro
                        </Link>
                    </form>
                    {isWide ? 
                        <section className="img-wrapper">
                            <img src={Vehicles} alt="Veículos"/>
                        </section> 
                        : null
                    }    
                </section>
        </div>
    )
}