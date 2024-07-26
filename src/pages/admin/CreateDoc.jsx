import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Form.module.css';

import { useInsertDocument } from '../../hooks/useInsertDocuments';

const CreateDoc = () => {
  const [imagens, setImagens] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState('');
  const [local, setLocal] = useState('');
  const [endereco, setEndereco] = useState('');
  const [quartos, setQuartos] = useState(0);
  const [banheiros, setBanheiros] = useState(0);
  const [garagem, setGaragem] = useState(false);
  const [piscina, setPiscina] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [formError, setFormError] = useState('');
  const [venda, setVenda] = useState(true);
  const [aluguel, setAluguel] = useState(false);
  const [mtsqdd, setMtsqdd] = useState('');

  const { insertDocument, response } = useInsertDocument('venda');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImagens(selectedImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (titulo === '') {
      setFormError('O título precisa ser preenchido');
      return;
    } else if (titulo.length <= 5) {
      setFormError('O título é muito curto');
      return;
    }

    if (valor < 10) {
      setFormError('O valor está preenchido de forma errada');
      return;
    }

    if (local === '') {
      setFormError('O local precisa ser preenchido');
      return;
    }

    if (mtsqdd !== '' && Number.isNaN(parseFloat(mtsqdd))) {
      setFormError('Área foi preenchida de forma incorreta');
      return;
    }

    const area = mtsqdd === '' ? 0 : parseFloat(mtsqdd);
    const preco = parseFloat(valor);

    insertDocument({
      titulo,
      valor: preco,
      local,
      endereco,
      quartos,
      banheiros,
      garagem,
      piscina,
      descricao,
      venda,
      aluguel,
      area,
    }, imagens);

    navigate('/dashboard');
  };

  if (formError !== '') {
    setTimeout(() => {
      setFormError('');
    }, 10000);
  }

  return (
    <div className={styles.form_container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label_input}>
          <span>Título:*</span>
          <input type="text" name='titulo' value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder='O lugar e/ou tipo de imóvel' />
        </label>
        <label className={styles.label_input}>
          <span>Valor:*</span>
          <input type="number" name='valor' value={valor} onChange={(e) => setValor(e.target.value)} placeholder='Valor do imóvel (,00 não precisa ser inserido)' />
        </label>
        <div className={styles.campos_adicionais}>
          <label>
            <input type="checkbox" checked={aluguel} onChange={(e) => {
              setAluguel(e.target.checked);
              setVenda(!e.target.checked);
            }} />
            <span> mês / aluguel:</span>
          </label>
          <label className={styles.label_input}>
            <span>Área: </span>
            <input type="text" value={mtsqdd} onChange={(e) => setMtsqdd(e.target.value)} placeholder='Área total' />
          </label>
        </div>
        <label className={styles.label_input}>
          <span>Local:</span>
          <input type="text" name='local' value={local} onChange={(e) => setLocal(e.target.value)} placeholder='Apenas o bairro ou área do imóvel (usado para o filtro de pesquisa)' />
        </label>
        <label className={styles.label_input}>
          <span>Endereço:</span>
          <input type="text" name='endereco' value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder='O endereço completo do imóvel' />
        </label>
        
        <div className={styles.adicionais}>
          <div className={styles.adicional_input}>
            <label className={styles.label_input}>
              <span>Quartos:</span>
              <input type="number" name='quartos' value={quartos} onChange={(e) => setQuartos(e.target.value)} placeholder='Número de Quartos' />
            </label>
            <label className={styles.label_input}>
              <span>Banheiros:</span>
              <input type="number" name='banheiros' value={banheiros} onChange={(e) => setBanheiros(e.target.value)} placeholder='Número de Banheiros' />
            </label>
          </div>

          <div className={styles.radio}>
            <label htmlFor="garagem">Garagem: </label>
            <div>
              <input type="radio" name='garagem' onChange={() => setGaragem(true)} checked={garagem} /> Sim
              <input type="radio" name='garagem' onChange={() => setGaragem(false)} checked={!garagem} /> Não
            </div>
            <label htmlFor="piscina">Piscina: </label>
            <div>
              <input type="radio" name='piscina' onChange={() => setPiscina(true)} checked={piscina} /> Sim
              <input type="radio" name='piscina' onChange={() => setPiscina(false)} checked={!piscina} /> Não
            </div>
          </div>
        </div>
        <label className={styles.text_area}>
          <span>Descrição:</span>
          <textarea value={descricao} name='descricao' onChange={(e) => setDescricao(e.target.value)} placeholder='Descreva o imóvel' ></textarea>
        </label>
        <label className={styles.image_inp}>
          <span>Imagens: <p className={styles.erro}>As imagens não poderão ser alteradas após o envio</p></span>
          <input type="file" name='imagens' accept='image/*' multiple onChange={handleImageChange} />
        </label>
        <div className={styles.imageGrid}>
          {imagens.map((imagem, index) => <img key={index} src={URL.createObjectURL(imagem)} alt={`imagem ${index}`} />)}
        </div>
        {formError === '' ? (
          <button type='submit' className='primary_btn'>Adicionar Imóvel</button>
        ) : (
          <div>
            <p className='error'>{formError}</p>
            <button type='submit' className='primary_btn' disabled>Adicionar Imóvel</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateDoc;
