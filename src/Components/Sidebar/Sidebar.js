import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as S from './SidebarStyles';
import assets from "../../assets/assets";
import { UserContext } from '../../context/UserContext';
import { AuthContext } from "../../context/AuthContext";
import ProfilePage from "../UserPage/UserPage";


export const Sidebar = ({ isOpen }) => {

    const { userData } = useContext(AuthContext);
    const [fotoPerfil, setFotoPerfil] = useState(assets.user3)
    const [profilePage, setProfilePage] = useState(false);

    useEffect(() => {
        if (userData && userData.CONTEMFOTOPERFIL) {
            setFotoPerfil(userData.URLFOTOPERFIL);
        }
    }, [userData])


    return (
        <>

            {profilePage && (
                <ProfilePage setProfilePage={setProfilePage} />
            )}

            <S.Container className={isOpen ? "open" : "closed"}>
                <S.LogoBox>
                    <img src={assets.pulseImage} alt="Diamond Icon" />
                    <span>GOLDEN BRASIL</span>
                </S.LogoBox>
                <S.Mapper>
                    <Link to="/dashboard">
                        <S.NavItem>
                            <S.NavLink>HOME</S.NavLink>

                        </S.NavItem>
                    </Link>

                    <Link to="/novacompra">
                        <S.NavItem>
                            <S.NavLink>NOVA COMPRA</S.NavLink>
                        </S.NavItem>
                    </Link>
                    <Link to="/saque">
                        <S.NavItem>
                            <S.NavLink>SAQUES</S.NavLink>
                        </S.NavItem>
                    </Link>
                    <Link to="/noticias">
                        <S.NavItem>
                            <S.NavLink>NOTÍCIAS</S.NavLink>
                        </S.NavItem>
                    </Link>
                    <Link to="/extrato">
                        <S.NavItem>
                            <S.NavLink>EXTRATO</S.NavLink>
                        </S.NavItem>
                    </Link>
                    <Link to="/validacao">
                        <S.NavItem>
                            <S.NavLink>VALIDAR CONTA</S.NavLink>
                        </S.NavItem>
                    </Link>

                </S.Mapper>


                <S.Footer onClick={() => { setProfilePage(true) }}>
                    <span>
                        <img src={fotoPerfil} />
                    </span>
                    <p>{userData && userData.USERNAME}</p>
                </S.Footer>
            </S.Container>
        </>

    );
};
