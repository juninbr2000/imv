import React, { useEffect } from 'react'
import styles from './DestaquePage.module.css'
import { BiArea } from 'react-icons/bi'
import { TfiLightBulb } from 'react-icons/tfi'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { BsShield } from 'react-icons/bs'
import { TbDiamond } from 'react-icons/tb'
import { PiCompass } from 'react-icons/pi'
import { GoChecklist } from 'react-icons/go'


const DestaquePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)

        document.title = `JS Residencial | Luiza M. Gentil & Edson Gentil Corretores de Imóveis`
        const MetaDescription = document.querySelector('meta[name="description"]')
        if(MetaDescription) {
          MetaDescription.setAttribute('content', `Conheça o JS Residencial, o primeiro condomínio fechado de Lambari. Lotes de 304 m² a 814 m² com lazer premium e localização privilegiada. Entre em contato para mais informações.`)
        }
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.mainTitle}>Js Residencial</h1>
                <p>O primeiro condominio fechado de Lambari</p>
            </div>
            <div className={styles.map}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3699.7659423898413!2d-45.34846983524349!3d-21.981944394607968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1762963710760!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <p>Localizado a menos de 5 minutos do centro de Lambari</p>
            </div>

            <div className={styles.cardsContainer}>
                <div className={styles.card}>
                    <BsShield />
                    <p className={styles.text}>Condominio fechado de Alto Padrão</p>
                </div>
                <div className={styles.card}>
                    <BiArea />
                    <p className={styles.text}>Lotes de <br /> <span className={styles.destaque}>304 m² a 814 m²</span></p>
                </div>
                <div className={styles.card}>
                    <TbDiamond />
                    <p className={styles.text}>Lazer Premium</p>
                </div>
                <div className={styles.card}>
                    <PiCompass />
                    <p className={styles.text}>Localização Privilegiada</p>
                </div>
                <div className={styles.card}>
                    <TfiLightBulb />
                    <p className={styles.text}>Iluminação publica em Led</p>
                </div>
                <div className={styles.card}>
                    <GoChecklist />
                    <p className={styles.text}>até <span className={styles.destaque}>120</span> Parcelas</p>
                </div>
            </div>

            <div className={styles.imagesContainer}>
                <h2 className={styles.title}>Galeria de Fotos</h2>
                <div className={styles.imagesGrid}>
                    <img src={'/public/jsresidencial/portaria.png'} alt="Portaria js residencial" />
                    <img src={"/public/jsresidencial/Deck.png"} alt="deck seco" />
                    <img src={"/public/jsresidencial/area-gourmet.png"} alt="area gourmet" />
                    <img src={"/public/jsresidencial/academia.png"} alt="academia" />
                    <img src={"/public/jsresidencial/quadra-de-areia.png"} alt="quadra de areia" />
                    <img src={"/public/jsresidencial/piscina.png"} alt="piscina" />
                </div>
            </div>

            <section className={styles.contactSection}>
                <h2 className={`${styles.title} ${styles.white}`}>Entre em Contato</h2>
                <div className={styles.contactContainer}>
                    <div className={styles.contactInfo}>
                        <p>
                            Estamos prontos para tirar suas dúvidas sobre o <strong>JS Residencial</strong>.
                            Entre em contato e descubra como garantir seu lote.
                        </p>
                        <ul>
                            <li><FiPhone /> (35) 9 9899-0790 <br/> (35) 9 9168-1045</li>
                            <li><FiMail /> imoveisgentil@gmail.com</li>
                            <li><FiMapPin /> R. Américo Werneck, nº 6, sala 2, Centro, Lambari - MG</li>
                        </ul>
                        <a
                            href="https://wa.me/5535998990790?text=Olá!+Gostaria+de+saber+mais+sobre+o+JS+Residencial."
                            className={styles.whatsappButton}
                            target="_blank"
                        >
                            Atendimento Exclusivo via WhatsApp
                        </a>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default DestaquePage