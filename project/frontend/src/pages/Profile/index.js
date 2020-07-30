import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import {Menu} from 'primereact/menu';
import {InputText} from 'primereact/inputtext';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
    const [vehicles, setVehicles] = useState([]);

    const history = useHistory();

    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setVehicles(response.data);
        })
    }, [userId]);

    async function handleDeleteVehicle(id) {
        try {
            await api.delete(`vehicles/${id}`, {
                headers: {
                    Authorization: userId,
                }
            });

        setVehicles(vehicles.filter(vehicle => vehicle.id !== id));

        } catch (err) {
            alert('Não foi possível deletar o veículo. Tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    let items = [
        {
            label: 'Opções',
            items: [{label: 'Cadastrar veículo', icon: 'pi pi-fw pi-plus',command:()=>{ window.location.pathname ="/vehicles/new"; }},
                    {label: 'Pesquisar veículo', icon: 'pi pi-fw pi-search', command:()=>{ window.location.pathname ="/profile";}}]
        },
    ]
    
    return(
        <div className="profile-container">
            <header>
                <p>Bem vindo(a), {userName}</p>

                <form className="search">
                    <InputText 
                        placeholder="Insira a placa"
                    />
                    <Button onClick={handleLogout}  label="Sair" className="margin-left  p-button-primary"/>
                </form>

            </header>
            <p>Veículos cadastrados</p>
            <div className="content">
                <Menu className="menu" model={items} />
                <table>
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Modelo</th>
                            <th>Ano do modelo</th>
                            <th>Quilometragem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(vehicle => {
                            const { id, vehiclePlate, brand, modelYear, mileage} = vehicle;
                            return (
                                <tr key={id}>
                                    <td>{vehiclePlate}</td>
                                    <td>{brand}</td>
                                    <td>{modelYear}</td>
                                    <td>{mileage}</td>
                                    <td><Button onClick={() => handleDeleteVehicle(id)}  label="Excluir" className="p-button-primary"/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}