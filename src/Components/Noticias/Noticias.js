import React, { useState, useEffect } from "react";
import axios from "axios";
import * as N from './NoticiasStyle';
import SideBarBox from "../Sidebar/SideBarBox";
import { usePulse } from "../../context/LoadContext";
import clientsRoutes from "../Routes/Routes";

const BASE_ROUTE = process.env.REACT_APP_BASE_ROUTE;
const NEWS_URL = process.env.REACT_APP_NEWS_URL;

export default function Noticias() {
    const [newsList, setNewsList] = useState([]);

    const [loading, setLoading] = useState(true);
    const { showPulse, hidePulse } = usePulse()


    const fetchNews = async () => {
        showPulse()
        try {
            console.log(`${BASE_ROUTE}${NEWS_URL}`)
            const response = await axios.get(`${BASE_ROUTE}${NEWS_URL}`);
            setNewsList(response.data);
            setTimeout(() => {
                hidePulse()
            }, 1000);
        } catch (error) {
            setTimeout(() => {
                hidePulse()
            }, 1000);
            console.error('Erro ao buscar notícias:', error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // Função para verificar se todas as imagens foram carregadas
    const handleImageLoad = () => {
        hidePulse();
    };

    useEffect(() => {
        if (newsList.length > 0) {
            // Cria uma promessa para verificar o carregamento de todas as imagens
            const imageLoadPromises = newsList.map(news => {
                return new Promise(resolve => {
                    const img = new Image();
                    img.src = news.imageUrl;
                    img.onload = resolve;
                });
            });

            Promise.all(imageLoadPromises).then(() => {
                handleImageLoad(); // Atualiza o estado para mostrar o conteúdo
            });
        }
    }, [newsList]);


    return (

        <SideBarBox>
            <N.NewsContainer>
            <N.LoginBehind src='logo-golden.png' />
                <N.PrincipalContent>
                    <N.NoticiasTitle>
                        NOTÍCIAS
                    </N.NoticiasTitle>

                    <N.NewsBoxes>
                        {newsList.map(news => (
                            <N.NewsCard key={news.id}>
                                <N.NewsImageBox>
                                    <N.NewsImage src={news.imageUrl} alt="News Image" />
                                </N.NewsImageBox>
                                <N.NewsTitle>{news.title}</N.NewsTitle>
                                <N.NewsBody>
                                    <ExpandableText text={news.body} />
                                </N.NewsBody>
                                <N.NewsData>{news.data}</N.NewsData>
                            </N.NewsCard>
                        ))}
                    </N.NewsBoxes>
                </N.PrincipalContent>


            </N.NewsContainer>
        </SideBarBox>

    );
}

const ExpandableText = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 800);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const getTextToShow = () => {
        if (isExpanded || !isMobile) {
            return text;
        }

        return text.length > 100 ? `${text.substring(0, 100)}...` : text;
    };

    return (
        <div>
            <N.Text>{getTextToShow()}</N.Text>
            {isMobile && (
                <N.ToggleExpandButton onClick={toggleExpand}>
                    {isExpanded ? "Ver Menos" : "Ver Mais"}
                </N.ToggleExpandButton>
            )}
        </div>
    );
};
