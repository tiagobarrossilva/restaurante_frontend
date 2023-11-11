import styles from "../../components/pages/styles.css"
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import BannerImage from "../../assets/img/home-banner-image.png"
import BannerBackground from "../../assets/img/about-background-image.png"
import foto from "../../assets/img/file1.png"

function Home(){
    return(
        <div>
            <div className="home-banner-container">
                <div>
                    <h1 className="primary-heading">
                        SioRest: O Paladar da Experiência
                    </h1>
                    <p className="primary-text">
                        Bem-vindo ao SioRest, um lugar onde a culinária encontra a excelência, 
                        e cada refeição é uma experiência única e inesquecível. 
                    </p>
                </div>
                <div>
                    <img src={BannerImage} alt="" width="500px"/>
                </div>
            </div>

            <section id="key-benefits">
                <h2>O que você vai Ver:</h2>
                <div class="benefits">
                    <div class="benefit">
                        <h3>Culinária de Vanguarda</h3>
                        <img id="benefit-1" class="benefit-img"/>
                        <p>
                            Nossa cozinha é uma fusão de tradição e inovação. Os nossos chefs altamente 
                            qualificados dominam a arte de transformar ingredientes frescos e locais 
                            em pratos verdadeiramente inspiradores. Cada prato no nosso cardápio é uma 
                            celebração da diversidade culinária, oferecendo uma ampla variedade de sabores 
                            e opções para atender a todos os paladares.
                        </p>
                    </div>

                    <div class="benefit">
                        <h3>Ambiente Aconchegante</h3>
                        <img id="benefit-2" class="benefit-img"/>
                        <p>
                            Você será envolvido por uma atmosfera única e acolhedora. 
                            A decoração elegante, a iluminação suave e a música ambiente criam o cenário 
                            perfeito para uma refeição memorável. Seja para um jantar romântico, uma 
                            comemoração especial ou uma reunião de negócios, nosso restaurante oferece o 
                            ambiente ideal.
                        </p>
                    </div>

                    <div class="benefit">
                        <h3>Atendimento Impecável</h3>
                        <img id="benefit-3" class="benefit-img"/>
                        <p>
                            A satisfação do cliente é nossa prioridade. Nossa equipe treinada e 
                            dedicada está à disposição para atender às suas necessidades e tornar sua experiência 
                            gastronômica ainda mais especial. Desde o momento em que você entra até o momento em 
                            que sai, nossa equipe está comprometida em garantir que você se sinta valorizado e 
                            bem cuidado.
                        </p>
                    </div>
                </div>
            </section>


        </div>
    );
}

export default Home

