import React, { useEffect, useState } from 'react'
import styles from '../pages/Casa.module.css'
import { FaArrowLeft, FaArrowRight, FaImage, FaVideoSlash, FaVideo, FaExpand, FaCompress } from 'react-icons/fa'

function MidiaControl({imagens, video}) {

    const [currentIndex, setCurrentIndex] = useState(0)
    const [videoSelected, setVideoSelected] = useState(false)
    const [embedUrl, setEmbedUrl] = useState('')
    const [full, setFull] = useState(false)

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagens.length)
    }
    
    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? imagens.length - 1 : prevIndex - 1
        )
    }

    useEffect(() => {
        setCurrentIndex(0)
        setVideoSelected(false)
        if(video){  
            setEmbedUrl(getEmbedUrl(video))
        }
    }, [])

    const getEmbedUrl = (url) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };

    return (
        <div className={styles.imagens_container}>
            {imagens !== undefined && !videoSelected ?
                <img src={imagens[currentIndex]} alt="" className={styles.image} />
                :
                <div className={styles.noPic}>
                    <iframe width="560" height="315"
                        src={`${embedUrl}?autoplay=1&mute=1&rel=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen>
                    </iframe>
                </div>
            }
            <div className={styles.change_image}>
                {imagens !== undefined && !videoSelected && imagens.map((imagem, index) => <label className={styles.image_label} key={index}>
                    <input type='radio' name='images' value={index} checked={index === currentIndex} onChange={() => setCurrentIndex(index)} />
                    <span></span>
                </label>)}
                {imagens !== undefined && !videoSelected && <div className={styles.control}>
                    <button onClick={() => prevImage()}><FaArrowLeft /></button>
                    <button onClick={() => nextImage()}><FaArrowRight /></button>
                </div>}
                {video ? <div className={styles.midiaControl}>
                    <button onClick={() => setVideoSelected(false)} className={styles.btnImageVideo}><FaImage />{imagens.length} Fotos</button>
                    <button onClick={() => setVideoSelected(true)} className={styles.btnImageVideo}><FaVideo /> Video</button>
                </div>
                    :
                    <div className={styles.midiaControl}>
                        <button onClick={() => setVideoSelected(false)} className={styles.btnImageVideo}><FaImage /> {imagens.length} Fotos</button>
                        <button className={styles.btnImageVideo} disabled><FaVideoSlash /> Video</button>
                    </div>
                }
                {imagens !== undefined && !videoSelected &&
                    <button className={styles.full} onClick={()=> {setFull(!full)}}><FaExpand /></button>
                }
            </div>

            {full === true && <div className={styles.modal_img} onClick={() => setFull(false)}>
                <img src={imagens[currentIndex]} alt="" onClick={(e) => e.stopPropagation()}/>
                <div className={styles.controlFull}>
                    <button onClick={(e) => {e.stopPropagation(); prevImage()}}><FaArrowLeft /></button>
                    <button onClick={(e) => {e.stopPropagation(); nextImage()}}><FaArrowRight /></button>
                </div>
                <button className={styles.close} onClick={()=> {setFull(!full)}}><FaCompress /></button>
            </div>}
        </div>
    )
}

export default MidiaControl