import React, { useState } from 'react';
import styles from './Anuncie.module.css';
import { FaWhatsapp } from 'react-icons/fa';

const Anuncie = () => {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [tipo, setTipo] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const numero = '5535998990790';

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const texto =
      `*Olá! Gostaria de anunciar meu imóvel*%0A` +
      `*Nome:* ${nome}%0A` +
      `*Local:* ${local}%0A` +
      `*Tipo de Imóvel:* ${tipo}%0A` +
      (message.trim() ? `*Mensagem:* ${message}%0A` : '');

    window.open(`https://wa.me/${numero}?text=${texto}`, '_blank');

    // Limpa os campos após envio
    setNome('');
    setLocal('');
    setTipo('');
    setMessage('');
    setLoading(false);
  };

  const dados = nome.trim() && local.trim() && tipo;

  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        <h1>Anuncie seu imóvel de um jeito mais simples</h1>

        {[1, 2, 3].map((step) => (
          <div key={step} className={styles.card}>
            <div className={styles.number}>
              <h1>{step}</h1>
            </div>
            <div className={styles.passos}>
              {step === 1 && (
                <>
                  <h3>Preencha o formulário</h3>
                  <p>Insira os dados do imóvel no formulário abaixo.</p>
                </>
              )}
              {step === 2 && (
                <>
                  <h3>Converse com a gente</h3>
                  <p>Converse com o corretor para continuar o processo.</p>
                </>
              )}
              {step === 3 && (
                <>
                  <h3>Tudo pronto!</h3>
                  <p>
                    Agora é só aguardar, pode levar até 24 horas para estar
                    disponível no site.
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Preencha os campos abaixo!</h2>

        <label htmlFor="nome" className={styles.label_address}>
          <span>Nome:</span>
          <input
            id="nome"
            type="text"
            placeholder="Qual o seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label htmlFor="local" className={styles.label_address}>
          <span>Local do imóvel:</span>
          <input
            id="local"
            type="text"
            placeholder="Cidade, bairro ou rua"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />
        </label>

        <label htmlFor="tipo" className={styles.label_address}>
          <span>Selecione o tipo do imóvel:</span>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Selecione um tipo</option>
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Terreno">Terreno</option>
            <option value="Galpão">Galpão</option>
            <option value="Sítio">Sítio</option>
            <option value="Outro">Outro</option>
          </select>
        </label>

        <label htmlFor="message" className={styles.label_address}>
          <span>Mais informações (opcional):</span>
          <textarea
            id="message"
            placeholder="Ex: Número de quartos, se está mobiliado, etc..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <button
          className={'primary_btn ' + styles.btn}
          type="submit"
          disabled={!dados || loading}
        >
          <FaWhatsapp style={{ marginRight: '8px' }} />
          {loading ? 'Abrindo WhatsApp...' : 'Continuar por WhatsApp'}
        </button>
      </form>
    </div>
  );
};

export default Anuncie;
