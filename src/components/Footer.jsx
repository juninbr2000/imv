import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer_container}>
        <div className={styles.logo_info}>
            <svg width="82" height="36" viewBox="0 0 82 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.848 24.333V32H0.847V24.333H1.848ZM11.133 25.862C11.6024 25.862 12.0204 25.961 12.387 26.159C12.7537 26.3497 13.0434 26.6393 13.256 27.028C13.4687 27.4167 13.575 27.8897 13.575 28.447V32H12.585V28.59C12.585 27.9887 12.4347 27.5303 12.134 27.215C11.8407 26.8923 11.441 26.731 10.935 26.731C10.4144 26.731 10 26.8997 9.69203 27.237C9.38403 27.567 9.23003 28.0473 9.23003 28.678V32H8.24003V28.59C8.24003 27.9887 8.0897 27.5303 7.78903 27.215C7.4957 26.8923 7.09603 26.731 6.59003 26.731C6.06936 26.731 5.65503 26.8997 5.34703 27.237C5.03903 27.567 4.88503 28.0473 4.88503 28.678V32H3.88403V25.972H4.88503V26.841C5.08303 26.5257 5.34703 26.2837 5.67703 26.115C6.01436 25.9463 6.3847 25.862 6.78803 25.862C7.29403 25.862 7.74136 25.9757 8.13003 26.203C8.5187 26.4303 8.80836 26.764 8.99903 27.204C9.1677 26.7787 9.44636 26.4487 9.83503 26.214C10.2237 25.9793 10.6564 25.862 11.133 25.862ZM18.176 32.099C17.6114 32.099 17.098 31.9707 16.636 31.714C16.1814 31.4573 15.822 31.0943 15.558 30.625C15.3014 30.1483 15.173 29.5983 15.173 28.975C15.173 28.359 15.305 27.8163 15.569 27.347C15.8404 26.8703 16.207 26.5073 16.669 26.258C17.131 26.0013 17.648 25.873 18.22 25.873C18.792 25.873 19.309 26.0013 19.771 26.258C20.233 26.5073 20.596 26.8667 20.86 27.336C21.1314 27.8053 21.267 28.3517 21.267 28.975C21.267 29.5983 21.1277 30.1483 20.849 30.625C20.5777 31.0943 20.2074 31.4573 19.738 31.714C19.2687 31.9707 18.748 32.099 18.176 32.099ZM18.176 31.219C18.5354 31.219 18.8727 31.1347 19.188 30.966C19.5034 30.7973 19.7564 30.5443 19.947 30.207C20.145 29.8697 20.244 29.459 20.244 28.975C20.244 28.491 20.1487 28.0803 19.958 27.743C19.7674 27.4057 19.518 27.1563 19.21 26.995C18.902 26.8263 18.5684 26.742 18.209 26.742C17.8424 26.742 17.505 26.8263 17.197 26.995C16.8964 27.1563 16.6544 27.4057 16.471 27.743C16.2877 28.0803 16.196 28.491 16.196 28.975C16.196 29.4663 16.284 29.8807 16.46 30.218C16.6434 30.5553 16.8854 30.8083 17.186 30.977C17.4867 31.1383 17.8167 31.219 18.176 31.219ZM19.298 24.19L16.955 25.444V24.696L19.298 23.321V24.19ZM25.1572 31.076L27.0272 25.972H28.0942L25.7292 32H24.5632L22.1982 25.972H23.2762L25.1572 31.076ZM34.9092 28.755C34.9092 28.9457 34.8982 29.1473 34.8762 29.36H30.0582C30.0949 29.954 30.2965 30.4197 30.6632 30.757C31.0372 31.087 31.4882 31.252 32.0162 31.252C32.4489 31.252 32.8082 31.153 33.0942 30.955C33.3875 30.7497 33.5929 30.4783 33.7102 30.141H34.7882C34.6269 30.7203 34.3042 31.1933 33.8202 31.56C33.3362 31.9193 32.7349 32.099 32.0162 32.099C31.4442 32.099 30.9309 31.9707 30.4762 31.714C30.0289 31.4573 29.6769 31.0943 29.4202 30.625C29.1635 30.1483 29.0352 29.5983 29.0352 28.975C29.0352 28.3517 29.1599 27.8053 29.4092 27.336C29.6585 26.8667 30.0069 26.5073 30.4542 26.258C30.9089 26.0013 31.4295 25.873 32.0162 25.873C32.5882 25.873 33.0942 25.9977 33.5342 26.247C33.9742 26.4963 34.3115 26.841 34.5462 27.281C34.7882 27.7137 34.9092 28.205 34.9092 28.755ZM33.8752 28.546C33.8752 28.1647 33.7909 27.8383 33.6222 27.567C33.4535 27.2883 33.2225 27.0793 32.9292 26.94C32.6432 26.7933 32.3242 26.72 31.9722 26.72C31.4662 26.72 31.0335 26.8813 30.6742 27.204C30.3222 27.5267 30.1205 27.974 30.0692 28.546H33.8752ZM37.0775 24.993C36.8868 24.993 36.7255 24.927 36.5935 24.795C36.4615 24.663 36.3955 24.5017 36.3955 24.311C36.3955 24.1203 36.4615 23.959 36.5935 23.827C36.7255 23.695 36.8868 23.629 37.0775 23.629C37.2608 23.629 37.4148 23.695 37.5395 23.827C37.6715 23.959 37.7375 24.1203 37.7375 24.311C37.7375 24.5017 37.6715 24.663 37.5395 24.795C37.4148 24.927 37.2608 24.993 37.0775 24.993ZM37.5615 25.972V32H36.5605V25.972H37.5615ZM41.7315 32.099C41.2695 32.099 40.8552 32.022 40.4885 31.868C40.1218 31.7067 39.8322 31.4867 39.6195 31.208C39.4068 30.922 39.2895 30.5957 39.2675 30.229H40.3015C40.3308 30.5297 40.4702 30.7753 40.7195 30.966C40.9762 31.1567 41.3098 31.252 41.7205 31.252C42.1018 31.252 42.4025 31.1677 42.6225 30.999C42.8425 30.8303 42.9525 30.6177 42.9525 30.361C42.9525 30.097 42.8352 29.9027 42.6005 29.778C42.3658 29.646 42.0028 29.5177 41.5115 29.393C41.0642 29.2757 40.6975 29.1583 40.4115 29.041C40.1328 28.9163 39.8908 28.7367 39.6855 28.502C39.4875 28.26 39.3885 27.9447 39.3885 27.556C39.3885 27.248 39.4802 26.9657 39.6635 26.709C39.8468 26.4523 40.1072 26.2507 40.4445 26.104C40.7818 25.95 41.1668 25.873 41.5995 25.873C42.2668 25.873 42.8058 26.0417 43.2165 26.379C43.6272 26.7163 43.8472 27.1783 43.8765 27.765H42.8755C42.8535 27.4497 42.7252 27.1967 42.4905 27.006C42.2632 26.8153 41.9552 26.72 41.5665 26.72C41.2072 26.72 40.9212 26.797 40.7085 26.951C40.4958 27.105 40.3895 27.3067 40.3895 27.556C40.3895 27.754 40.4518 27.919 40.5765 28.051C40.7085 28.1757 40.8698 28.2783 41.0605 28.359C41.2585 28.4323 41.5298 28.5167 41.8745 28.612C42.3072 28.7293 42.6592 28.8467 42.9305 28.964C43.2018 29.074 43.4328 29.2427 43.6235 29.47C43.8215 29.6973 43.9242 29.9943 43.9315 30.361C43.9315 30.691 43.8398 30.988 43.6565 31.252C43.4732 31.516 43.2128 31.725 42.8755 31.879C42.5455 32.0257 42.1642 32.099 41.7315 32.099ZM54.7452 26.555C54.5325 26.1077 54.2245 25.763 53.8212 25.521C53.4179 25.2717 52.9485 25.147 52.4132 25.147C51.8779 25.147 51.3939 25.2717 50.9612 25.521C50.5359 25.763 50.1985 26.115 49.9492 26.577C49.7072 27.0317 49.5862 27.5597 49.5862 28.161C49.5862 28.7623 49.7072 29.2903 49.9492 29.745C50.1985 30.1997 50.5359 30.5517 50.9612 30.801C51.3939 31.043 51.8779 31.164 52.4132 31.164C53.1612 31.164 53.7772 30.9403 54.2612 30.493C54.7452 30.0457 55.0275 29.4407 55.1082 28.678H52.0502V27.864H56.1752V28.634C56.1165 29.2647 55.9185 29.844 55.5812 30.372C55.2439 30.8927 54.8002 31.307 54.2502 31.615C53.7002 31.9157 53.0879 32.066 52.4132 32.066C51.7019 32.066 51.0529 31.901 50.4662 31.571C49.8795 31.2337 49.4139 30.768 49.0692 30.174C48.7319 29.58 48.5632 28.909 48.5632 28.161C48.5632 27.413 48.7319 26.742 49.0692 26.148C49.4139 25.5467 49.8795 25.081 50.4662 24.751C51.0529 24.4137 51.7019 24.245 52.4132 24.245C53.2272 24.245 53.9459 24.4467 54.5692 24.85C55.1999 25.2533 55.6582 25.8217 55.9442 26.555H54.7452ZM63.3287 28.755C63.3287 28.9457 63.3177 29.1473 63.2957 29.36H58.4777C58.5144 29.954 58.7161 30.4197 59.0827 30.757C59.4567 31.087 59.9077 31.252 60.4357 31.252C60.8684 31.252 61.2277 31.153 61.5137 30.955C61.8071 30.7497 62.0124 30.4783 62.1297 30.141H63.2077C63.0464 30.7203 62.7237 31.1933 62.2397 31.56C61.7557 31.9193 61.1544 32.099 60.4357 32.099C59.8637 32.099 59.3504 31.9707 58.8957 31.714C58.4484 31.4573 58.0964 31.0943 57.8397 30.625C57.5831 30.1483 57.4547 29.5983 57.4547 28.975C57.4547 28.3517 57.5794 27.8053 57.8287 27.336C58.0781 26.8667 58.4264 26.5073 58.8737 26.258C59.3284 26.0013 59.8491 25.873 60.4357 25.873C61.0077 25.873 61.5137 25.9977 61.9537 26.247C62.3937 26.4963 62.7311 26.841 62.9657 27.281C63.2077 27.7137 63.3287 28.205 63.3287 28.755ZM62.2947 28.546C62.2947 28.1647 62.2104 27.8383 62.0417 27.567C61.8731 27.2883 61.6421 27.0793 61.3487 26.94C61.0627 26.7933 60.7437 26.72 60.3917 26.72C59.8857 26.72 59.4531 26.8813 59.0937 27.204C58.7417 27.5267 58.5401 27.974 58.4887 28.546H62.2947ZM67.917 25.862C68.6503 25.862 69.2443 26.0857 69.699 26.533C70.1537 26.973 70.381 27.611 70.381 28.447V32H69.391V28.59C69.391 27.9887 69.2407 27.5303 68.94 27.215C68.6393 26.8923 68.2287 26.731 67.708 26.731C67.18 26.731 66.7583 26.896 66.443 27.226C66.135 27.556 65.981 28.0363 65.981 28.667V32H64.98V25.972H65.981V26.83C66.179 26.522 66.4467 26.2837 66.784 26.115C67.1287 25.9463 67.5063 25.862 67.917 25.862ZM73.5671 26.797V30.35C73.5671 30.6433 73.6295 30.8523 73.7541 30.977C73.8788 31.0943 74.0951 31.153 74.4031 31.153H75.1401V32H74.2381C73.6808 32 73.2628 31.8717 72.9841 31.615C72.7055 31.3583 72.5661 30.9367 72.5661 30.35V26.797H71.7851V25.972H72.5661V24.454H73.5671V25.972H75.1401V26.797H73.5671ZM77.2 24.993C77.0093 24.993 76.848 24.927 76.716 24.795C76.584 24.663 76.518 24.5017 76.518 24.311C76.518 24.1203 76.584 23.959 76.716 23.827C76.848 23.695 77.0093 23.629 77.2 23.629C77.3833 23.629 77.5373 23.695 77.662 23.827C77.794 23.959 77.86 24.1203 77.86 24.311C77.86 24.5017 77.794 24.663 77.662 24.795C77.5373 24.927 77.3833 24.993 77.2 24.993ZM77.684 25.972V32H76.683V25.972H77.684ZM80.721 23.86V32H79.72V23.86H80.721Z" fill="#818181"/>
              <path d="M8 20L17.5 13.7818M63 20L41.5 5.92727M41.5 5.92727L35.5 2L22.5 10.5091M41.5 5.92727L47.5 2L74.5 20M17.5 13.7818V5.92727H22.5V10.5091M17.5 13.7818L22.5 10.5091" stroke="#C5AD69" strokeWidth="2"/>
            </svg>
            <div>
                <h3>Luiza Messias Gentil</h3>
                <p>Creci: MG ----- -</p>
            </div>
        </div>
        <div className={styles.contact}>
            <Link to='/contato'>Contato <FaArrowRight/></Link>
            <Link to='/sobre'>Sobre Nós <FaArrowRight/></Link>
        </div>
        <div className={styles.social}>
            <h3>Nossas Redes Sociais:</h3>
            <Link to='*'><FaFacebook/></Link>
            <Link to='*'><FaInstagram/></Link>
            <Link to='*'><FaYoutube/></Link>
        </div>
        <h4 className={styles.copy}>Imoveis-Gentil ©2024</h4>
        <div className={styles.credit}>
            <p>Feito por <Link to='https://juninbr2000.github.io/portifolio1/' target='_blanck' >&lt;Edson Junior/&gt;</Link></p>
        </div>
    </div>
  )
}

export default Footer