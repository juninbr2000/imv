import React, { useEffect, useState } from 'react';
import styles from './Anuncie.module.css'

import { FaWhatsapp } from 'react-icons/fa';

const Anuncie = () => {

    const [city, setCity] = useState('')
    const [valor, setValor] = useState('');
    const [real, setReal] = useState('R$');
    const [address, setAddress] = useState('')
    const [numb, setNumb] = useState('');
    const [tipo, setTipo] = useState('');
    const [exclusivo, setExclusivo] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [formError,  setFormError] = useState('')
    const [text, setText] = useState('')
    const [disabled, setDisabled] = useState(true)
    
    const formSubmit = (e) => {
        e.preventDefault()
        if(city === ''){
            setFormError('Preencha a cidade')
            return
        }
        if(address === ''){
            setFormError('Preencha o enderesso')
            return
        }
        if(tipo === ''){
            setFormError('selecione o tipo de imovel')
            return
        }
        if(name === ''){
            setFormError('Digite seu nome')
            return
        }
        if(email === ''){
            setFormError('Digite seu email')
            return
        }

        console.log(city, address, numb, tipo, real, exclusivo, email, name)
        
        setText(`*Olá! Gostaria de anunciar meu imóvel*%0A*Cidade:* ${city}%0A*Endereço:* ${address}%0A*Número:* ${numb}%0A*Tipo de Imóvel:* ${tipo}%0A*Valor:* ${real}%0A*Exclusivo:* ${exclusivo ? 'Sim' : 'Não'}%0A*Nome:* ${name}%0A*Email:* ${email}`.replace( / /g , '%20'));

    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if(text){
        window.location.href = `https://wa.me/5535998990790?text=${text}`
        } 
    }, [text])
    
  return (
    <div className={styles.container}>
        
        <div className={styles.steps}>
            <h1>Anuncie seu imóvel de um jeito mais simples</h1>

            <div className={styles.card} onClick={() => window.scrollTo(0, 600)}>
                <div className={styles.number}>
                    <h1>1</h1>
                </div>
                <div className={styles.passos}>
                    <h3>Preencha o formulário</h3>
                    <p>Insira os dados do imóvel no formulário a baixo.</p>
                </div>
            </div>

            <div className={styles.card}>
                <div className={styles.number}>
                    <h1>2</h1>
                </div>
                <div className={styles.passos}>
                    <h3>Converse com a gente</h3>
                    <p>Converse com o corretor para continuar o processo.</p>
                </div>
            </div>

            <div className={styles.card}>
                <div className={styles.number}>
                    <h1>3</h1>
                </div>
                <div className={styles.passos}>
                    <h3>Tudo pronto!</h3>
                    <p>Agora é só aguardar, pode levar até 24 horas para estar disponivel no site.</p>
                </div>
            </div>
        </div>

        <form className={styles.form} onSubmit={formSubmit}>
            <h2>preencha os campos abaixo</h2>

            <div className={styles.address}>
                <label className={styles.label_address}>
                    <span>Cidade:</span>
                    <input type="text" onChange={(e) => setCity(e.target.value)} className={formError !== '' && city === '' ? styles.styleError : '' } placeholder='cidade onde o imovel esta localizado' id='cityField'/>
                </label>
                <div className={styles.label_local}>
                    <label className={styles.label_address}>
                        <span>Endereço:</span>
                        <input type="text" onChange={(e) => setAddress(e.target.value)} className={formError !== '' && address === '' ? styles.styleError : '' } placeholder='endereço do imovel'/>
                    </label>
                    <label className={styles.label_address}>
                        <span>Número:</span>
                        <input type="number" onChange={(e) => setNumb(e.target.value)} placeholder='Ex: 125'/>
                    </label>
                </div>
            </div>
            <label className={styles.label_address}>
                <span>Tipo de Imóvel:</span>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={formError !== '' && tipo === '' ? styles.styleError : '' }>
                  <option value="">Selecione</option>
                  <option value="Residencia">Residência</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Terreno">Terreno</option>
                  <option value="Galpao">Galpão</option>
                  <option value="Fazenda">Fazenda</option>
                  <option value="Sitio">Sítio</option>
                  <option value="Ponto Comercial">Ponto Comercial</option>
                </select>
            </label>
            <label className={styles.label_address}>
                <span>Valor:* </span>
                <input type="text" name='valor' value={real} onChange={(e) => {
                  let value = e.target.value
                  value = value.replace(/\D/g, '')
                  const numberValue = parseFloat(value)/100;
                  const formatValue = numberValue.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
                  setValor(numberValue)
                  setReal(formatValue)
                  }}
                  placeholder='Valor do imóvel' />
            </label>
            <div className={styles.radio}>
                <span>Anunciou em outra imobiliaria ou pretende anunciar?</span>
                <div className={styles.radio_container}>
                    <div>
                        <input type="radio" name="excusivo" checked={exclusivo} onChange={() => setExclusivo(true)}/>
                        <label htmlFor="exclusivo">Não</label>
                    </div>
                    <div>
                        <input type="radio" name="excusivo" checked={!exclusivo} onChange={() => setExclusivo(false)}/>
                        <label htmlFor="exclusivo">Sim</label>
                    </div>
                </div>
            </div>

            <label className={styles.label_address}>
                <span>Nome:</span>
                <input type="text" placeholder='digite seu nome' onChange={(e) => setName(e.target.value)} className={formError !== '' && name === '' ? styles.styleError : '' }/>
            </label>
            <label className={styles.label_address}>
                <span>Email de contato:</span>
                <input type="email" placeholder='digite seu email' onChange={(e) => setEmail(e.target.value)} className={formError !== '' && email === '' ? styles.styleError : '' }/>
            </label>
            <label className={styles.label_address}>
                <span>Termos e condições</span>
                <textarea name="terms" id="" readOnly resize='false' value={`Termos e Condições para Anunciar o Imóvel\n\n
----------------------------
1. **Autorização de Divulgação:**\n
   O anunciante autoriza a veiculação das informações fornecidas neste formulário para fins de divulgação e comercialização do imóvel nos canais da nossa imobiliária, incluindo site, redes sociais e outros meios de publicidade.\n\n
2. **Veracidade das Informações:**\n
   É de responsabilidade do anunciante garantir que todas as informações fornecidas sejam precisas e verdadeiras. Caso seja identificada alguma informação incorreta ou enganosa, a imobiliária reserva-se o direito de remover o anúncio sem aviso prévio.\n\n
3. **Comissão:**\n
   Em caso de venda ou aluguel do imóvel por intermédio da nossa imobiliária, será cobrada uma comissão de 5% sobre o valor total negociado. O pagamento desta comissão será realizado no momento da conclusão do contrato de compra, venda ou locação.\n\n
4. **Exclusividade:**\n
   Caso o anunciante opte por anunciar exclusivamente com nossa imobiliária, oferecemos condições diferenciadas em serviços de divulgação e suporte. A exclusividade deve ser informada no momento do anúncio.\n\n
5. **Prazo de Publicação:**\n
   O imóvel será analisado e publicado em até 24 horas após o envio deste formulário, desde que todas as informações estejam corretas e completas.\n\n
6. **Remoção do Anúncio:**\n
   O anunciante pode solicitar a remoção do anúncio a qualquer momento, entrando em contato pelos nossos canais de atendimento.\n\n
7. **Responsabilidade sobre Negociações:**\n
   A imobiliária atua como intermediária nas negociações. As condições finais de compra, venda ou aluguel são de responsabilidade do anunciante e do interessado, sob supervisão da imobiliária.\n\n
8. **Dados Pessoais:**\n
   Os dados pessoais fornecidos serão utilizados exclusivamente para contato relacionado ao anúncio do imóvel e não serão compartilhados com terceiros sem autorização prévia.\n\n
Ao marcar a opção "Li e concordo com os termos e condições," o anunciante declara ter lido e concordado com todas as cláusulas acima.`}></textarea>
            </label>

            <label className={styles.check}>
                <input type="checkbox" name="concorde" checked={!disabled} onChange={() => disabled ? setDisabled(false) : setDisabled(true)}/>
                <span>Li e concordo com os termos e condições</span>
            </label>
            {formError !== '' && <p className={styles.error}>{formError}</p>}

            {disabled ? <button className={'primary_btn ' + styles.btn} type='submit' disabled>Continue pelo whatsapp <FaWhatsapp/></button> : <button className={'primary_btn ' + styles.btn} type='submit'>Continue pelo whatsapp <FaWhatsapp/></button>}

        </form>
    </div>
  )
}

export default Anuncie