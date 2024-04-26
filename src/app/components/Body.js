"use client"

import { useEffect, useState } from 'react';
import styles from '../styles/Body.module.css';

export default function Body() {
    const [cardName, setCardName] = useState("");
    const [urlImage, setUrlImage] = useState("");
    const [descricao, setDescricao] = useState("");
    const [listCards, setListCards] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("listCards")) {
            localStorage.setItem("listCards", JSON.stringify([]));
        }
        setListCards(JSON.parse(localStorage.getItem("listCards")))
    }, []);

    const createCard = () => {
        const listCards = JSON.parse(localStorage.getItem("listCards"))
        localStorage.setItem("listCards", JSON.stringify([...listCards, 
            { 
                id: listCards.length, 
                name: cardName, 
                image: urlImage, 
                desc: descricao
            }
        ]));
        setListCards(JSON.parse(localStorage.getItem("listCards")))
    }

    const deleteCard = (id) => {
        const listCards = JSON.parse(localStorage.getItem("listCards"));
        const newList = listCards.filter((element) => Number(element.id) != Number(id));
        localStorage.setItem("listCards", JSON.stringify(newList));
        setListCards(JSON.parse(localStorage.getItem("listCards")))
    }

    return (
        <>
            <div className={styles.DivContainerBody}>
                <div className={ styles.DivInfoCardBody }>
                    <div>
                        <input onChange={({target}) => setCardName(target.value)} type="text" placeholder="Nome do card" />
                        <input onChange={({target}) => setUrlImage(target.value)} type="text" placeholder="Url da imagem" />
                        <input onChange={({target}) => setDescricao(target.value)} type="text" placeholder="Descrição" />
                    </div>
                </div>
                <div className={ styles.DivCardBody }>
                    <div className={styles.TitleCard}>
                        <p>{cardName}</p>
                    </div>
                    <div className={styles.DivImageCard}>
                        {
                            urlImage.length > 0 ?
                                <img src={urlImage} />
                            :
                                <p>Adicione uma imagem pelo campo de url</p>
                        }
                        
                    </div>
                    <div className={ styles.DivDescriptionCard }>
                        <p>Descrição:</p>
                        <p>{descricao}</p>
                    </div>
                    <div className={styles.DivButtonCreate}>
                        <button onClick={createCard} type="button">Criar</button>
                    </div>
                </div>
            </div>
            <div className={ styles.DivCardSave }>
                {
                    listCards && listCards.map(({ id, name, image, desc }) => (
                        <div className={ styles.DivCardBody }>
                            <div className={styles.TitleCard}>
                                <p>{name}</p>
                            </div>
                            <div className={styles.DivImageCard}>
                                <img src={image} />
                                <p>Adicione uma imagem pelo campo de url</p>
                            </div>
                            <div className={ styles.DivDescriptionCard }>
                                <p>Descrição:</p>
                                <p>{desc}</p>
                            </div>
                            <div className={styles.DivButtonDelete}>
                                <button onClick={() => deleteCard(id)} type="button">Excluir</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}