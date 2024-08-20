import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storageService } from '../../firebase/config';
import styles from './CreateDoc.module.css';
import { useInsertDocument } from '../../hooks/useInsertDocuments';


const CreateDoc = () => {
  const [imagens, setImagens] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState('');
  const [local, setLocal] = useState('');
  const [endereco, setEndereco] = useState('');
  // const [quartos, setQuartos] = useState(0);
  // const [banheiros, setBanheiros] = useState(0);
  // const [garagem, setGaragem] = useState(false);
  // const [piscina, setPiscina] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [formError, setFormError] = useState('');
  const [venda, setVenda] = useState(true);
  const [aluguel, setAluguel] = useState(false);
  const [real, setReal] = useState('')
  const [mtsqdd, setMtsqdd] = useState('');
  const [tipo, setTipo] = useState('');
  const [step, setStep] = useState(1);
  const [caracteristicas, setCaracteristicas] = useState([
    {id: 1, name: 'Quartos', quantidade: 0, ativado: 'false', icon: 'FaBed'},
    {id: 2, name: 'Garagem', ativado: 'false', icon: 'FaCar' },
    {id: 3, name: 'Piscina', ativado: 'false', icon: 'FaWater'},
    {id: 4, name: 'Banheiros', quantidade: 0, ativado: 'false', icon: 'FaShower'},
    {id: 5, name: 'Suite', quantidade: 0, ativado: 'false', icon: 'FaBed'},
    {id: 6, name: 'Sala de Estar', quantidade: 0, ativado: 'false', icon: 'FaTv'},
    {id: 7, name: 'Sala de Jantar', quantidade: 0, ativado: 'false', icon: 'FaGlassMartini'},
    {id: 8, name: 'Cozinha', quantidade: 0, ativado: 'false', icon: 'FaUtensils'},
    {id: 9, name: 'Area de Lazer', ativado: 'false', icon: 'FaUmbrellaBeach'},
    {id: 10, name: 'Area de Serviço', ativado: 'false', icon: 'BiSolidWasher'},
    {id: 11, name: 'Mobiliada', ativado: 'false', icon: 'FaCouch'},
    {id: 12, name: 'Jardim', ativado: 'false', icon: 'FaTree'},
  ])

  const { insertDocument, response } = useInsertDocument('venda') 
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImagens(selectedImages);
  };

  const handleSubmit = async (e) => {
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

    setStep(5)

    const area = mtsqdd === '' ? 0 : parseFloat(mtsqdd);

    const uploadImage = async (image) => {
      const timeStamp = Date.now()
      const imageRef = ref(storageService, `imagens/${timeStamp}-${image.name}`);
      await uploadBytes(imageRef, image);
      return await getDownloadURL(imageRef);
    };

    const imageUrls = await Promise.all(imagens.map(image => uploadImage(image)));

    insertDocument({
      titulo,
      valor,
      local,
      endereco,
      // quartos,
      // banheiros,
      // garagem,
      // piscina,
      descricao,
      venda,
      aluguel,
      area,
      tipo,
      caracteristicas
    }, imagens);

    navigate('/dashboard');
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className={styles.form_container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {step === 1 && (
          <div className={styles.steps}>
            <div className={styles.formStep}>
              <span className={styles.active}></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h2>Vamos adcionar um Imovel</h2>
            <div className={styles.camp_form}>
              <div className={styles.imageGrid}>
                {imagens.map((imagem, index) => <img key={index} src={URL.createObjectURL(imagem)} alt={`imagem ${index}`} />)}
              </div>
              <label className={styles.label_input}>
                <span>Imagens:</span>
                <input type="file" name='imagens' accept='image/*' multiple onChange={handleImageChange} />
              </label>
              <label className={styles.label_input}>
                <span>Título:*</span>
                <input type="text" name='titulo' value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder='O lugar e/ou tipo de imóvel' />
              </label>
              <label className={styles.label_input}>
                <span>Tipo de Imóvel:</span>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                  <option value="">Selecione</option>
                  <option value="Residencia">Residência</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Terreno">Terreno</option>
                  <option value="Galpao">Galpão</option>
                  <option value="Fazenda">Fazenda</option>
                  <option value="Sitio">Sítio</option>
                </select>
              </label>
            </div>
            <button type="button" onClick={handleNextStep} className={styles.nextStep}>Continuar &gt;</button>
          </div>
        )}
        {step === 2 && (
          <div className={styles.steps}>
            <div className={styles.formStep}>
              <span className={styles.complete}></span>
              <span className={styles.active}></span>
              <span></span>
              <span></span>
            </div>
            <h2>Agora informe o Valor e o Local</h2>
            <div className={styles.camp_form}>
              <label className={styles.label_input}>
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
                <label>
                  <input type="radio" name='transacao' onChange={() => {
                    setVenda(true);
                    setAluguel(false);
                  }} checked={venda} /> Venda
                </label>
                <label>
                  <input type="radio" name='transacao' onChange={() => {
                    setVenda(false);
                    setAluguel(true);
                  }} checked={aluguel} /> Aluguel
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
            </div>
            <div className={styles.buttons}>
              <button type="button" onClick={handlePrevStep} className={styles.prevStep}>&lt; Voltar</button>
              <button type="button" onClick={handleNextStep} className={styles.nextStep}>Continuar &gt;</button>
            </div>
          </div>
        )}
        {step === 3 && (
  <div className={styles.steps}>
    <div className={styles.formStep}>
      <span className={styles.complete}></span>
      <span className={styles.complete}></span>
      <span className={styles.active}></span>
      <span></span>
    </div>
    <h2>Agora informe os Detalhes</h2>
    <div className={styles.camp_form}>
      <div className={styles.cont_inp}>
        {caracteristicas.map((caracteristica, index) => (
          <div key={caracteristica.id} className={styles.caracteristicaItem}>
            <label>
              <input
                type="checkbox"
                checked={caracteristica.ativado === 'true'}
                onChange={(e) => {
                  const newCaracteristicas = [...caracteristicas];
                  newCaracteristicas[index].ativado = e.target.checked ? 'true' : 'false';
                  setCaracteristicas(newCaracteristicas);
                }}
              />
              {caracteristica.name}
            </label>
            {caracteristica.quantidade !== undefined && caracteristica.ativado === 'true' && (
              <input
                type="number"
                value={caracteristica.quantidade}
                min="0"
                onChange={(e) => {
                  const newCaracteristicas = [...caracteristicas];
                  newCaracteristicas[index].quantidade = e.target.value;
                  setCaracteristicas(newCaracteristicas);
                }}
                className={styles.quantidadeInput}
              />
            )}
          </div>
        ))}
      </div>
    </div>
    <div className={styles.buttons}>
      <button type="button" onClick={handlePrevStep} className={styles.prevStep}>&lt; Voltar</button>
      <button type="button" onClick={handleNextStep} className={styles.nextStep}>Continuar &gt;</button>
    </div>
  </div>
)}

        {step === 4 && (
          <div className={styles.steps}>
            <div className={styles.formStep}>
              <span className={styles.complete}></span>
              <span className={styles.complete}></span>
              <span className={styles.complete}></span>
              <span className={styles.active}></span>
            </div>
            <h2>Finalize com a Descrição e Área</h2>
            <div className={styles.camp_form}>
              <label className={styles.label_input}>
                <span>Área: </span>
                <input type="text" value={mtsqdd} onChange={(e) => setMtsqdd(e.target.value)} placeholder='Área total' />
              </label>
              <label className={styles.text_area}>
                <span>Descrição:</span>
                <textarea value={descricao} name='descricao' onChange={(e) => setDescricao(e.target.value)} placeholder='Descreva o imóvel' ></textarea>
              </label>
            </div>
            <div className={styles.buttons}>
              <button type="button" onClick={handlePrevStep} className={styles.prevStep}>&lt; Voltar</button>
              <button type="submit" className={styles.nextStep}>Adicionar Imóvel</button>
            </div>
          </div>
        )}
        {formError && <p className='error'>{formError}</p>}
        {step === 5 && (
          <div className={styles.steps}>
            <div className={styles.formStep}>
              <span className={styles.complete}></span>
              <span className={styles.complete}></span>
              <span className={styles.complete}></span>
              <span className={styles.complete}></span>
            </div>
            <h2>Aguarde enquanto os dados são enviados...</h2>
            <p>você será redirecionado automaticamente após o envio</p>
          </div>

        )}
      </form>
    </div>
  );
};

export default CreateDoc;
