import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import {useMedia} from 'react-use';
import {InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import api from '../../services/api';

import Vehicles from '../../assets/vehicles.jpg'

export default function Login() {
    const [id, setId] = useState('');
    
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('userId', id);
            localStorage.setItem('userName', response.data.name);

            history.push('/profile');

        } catch (err) {
            alert('Não foi possível realizar o login. Tente Novamente.');
        }
    }

    const isWide = useMedia('(min-width: 1000px)');
    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="form">
                <h1>Faça seu login</h1>
               <InputText 
                    placeholder="Entre com sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
                <Button label="Entrar" className="margin-top p-button-primary" />
                <Link className="back-link" to="/register">
                    Não tenho cadastro
                </Link>

            </form>
            {isWide ? 
                <section className="img-wrapper">
                    <img src={Vehicles} alt="Veículos"/>
                </section> 
                : null
            }
        </div>
    );
}