import React, { useState, useEffect } from "react";
import axios from "axios";
import * as N from './NoticiasStyle';
import { Sidebar } from "../Sidebar/Sidebar";
import assets from "../../assets/assets";
import Loading from "../Loading/Loader";
import SideBarBox from "../Sidebar/SideBarBox";

export default function Noticias() {
    const [newsList, setNewsList] = useState([]);

    const [loading, setLoading] = useState(true); // Inicialmente está carregando


    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/news/getAll');
            setNewsList(response.data);
        } catch (error) {
            console.error('Erro ao buscar notícias:', error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // Função para verificar se todas as imagens foram carregadas
    const handleImageLoad = () => {
        setLoading(false); // Define como falso quando todas as imagens forem carregadas
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

    const convertDate = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    };

    return (

        <SideBarBox>
            <N.NewsContainer>

                <N.NoticiasTitle>
                    NOTÍCIAS
                </N.NoticiasTitle>
                {loading ? (
                    <Loading />
                ) : (
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
                )}
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
