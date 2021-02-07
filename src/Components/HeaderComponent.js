import React, { useEffect, useState } from 'react';
import Api from './../axios/axios';
import {NavLink} from 'react-router-dom';


function HeaderComponent() {

    const [initData, setInitData] = useState([]);

    const [menuItems, setMenuItems] = useState([]);
    useEffect(() => {
        let isMounted = true;
        Api.get(`/`)
            .then(response => {
                if(isMounted){
                    let data = response.data;
                    setInitData(data);
                }
            return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted   
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        let isMounted = true;
        Api.get(`/menus/v1/menus/primary-menu`)
            .then(response => {
                if(isMounted){
                    let data = response.data.items;
                    setMenuItems(data)
                } 
            })
            .catch(err => console.log(err))
        return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
    
    }, []);

    return (
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <NavLink className="navbar-brand" to="/">{initData.name}</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        {
                            menuItems.map(menu => {
                                if(menu.post_name === 'home'){
                                    menu.slug = '';
                                }
                                return (
                                    <li key={menu.ID} className="nav-item">
                                        <NavLink className="nav-link" exact to={`/${menu.slug}`}>{menu.title}</NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default HeaderComponent;