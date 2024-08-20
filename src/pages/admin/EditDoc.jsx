import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import styles from './Form.module.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storageService } from '../../firebase/config';

const EditDoc = () => {
  const { id } = useParams();
  const { document: casa } = useFetchDocument('venda', id);
  const [step, setStep] = useState(1);
  const [imagens, setImagens] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState(0);
  const [local, setLocal] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [formError, setFormError] = useState('');
  const [venda, setVenda] = useState(true);
  const [aluguel, setAluguel] = useState(false);
  const [mtsqdd, setMtsqdd] = useState('');
  const [tipo, setTipo] = useState('');
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [real, setReal] = useState('')
  const { updateDocument } = useUpdateDocument('venda');
  const navigate = useNavigate();

  useEffect(() => {
    if (casa) {
      setTitulo(casa.titulo);
      setValor(casa.valor);
      setLocal(casa.local);
      setEndereco(casa.endereco);
      setDescricao(casa.descricao);
      setVenda(casa.venda);
      setAluguel(casa.aluguel);
      setMtsqdd(casa.area);
      setImagens(casa.imagens || []);
      setTipo(casa.tipo);
      setReal('R$ ' + casa.valor + ',00')
      setCaracteristicas(casa.caracteristicas || [
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
      ]);
    }
  }, [casa]);

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImagens((prevImages) => [...prevImages, ...selectedImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (titulo === '') {
      setFormError('O título precisa ser preenchido');
      return;
    } else if (titulo.length <= 4) {
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

    const uploadImage = async (image) => {
      const timeStamp = Date.now()
      const imageRef = ref(storageService, `imagens/${timeStamp}-${image.name}`);
      await uploadBytes(imageRef, image);
      return await getDownloadURL(imageRef);
    };

    const newImageUrls = await Promise.all(
      imagens.filter((image) => image instanceof File).map((image) => uploadImage(image))
    );

    const existingImageUrls = imagens.filter((image) => typeof image === 'string');

    await updateDocument(id, {
      titulo,
      valor: preco,
      local,
      endereco,
      descricao,
      venda,
      aluguel,
      area,
      tipo,
      caracteristicas,
      imagens: [...existingImageUrls, ...newImageUrls],
    });

    navigate('/dashboard');
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
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
            <h2>Informações Básicas</h2>
            <label className={styles.label_input}>
              <span>Título:*</span>
              <input
                type="text"
                name="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="O lugar e/ou tipo de imóvel"
              />
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
            <label className={styles.label_input}>
              <span>Valor:*</span>
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
            <div className={styles.buttons}>
              <button type="button" onClick={handleNextStep} className={styles.nextStep}>
                Continuar &gt;
              </button>
            </div>
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
            <h2>Detalhes do Imóvel</h2>
            <label className={styles.label_input}>
              <span>Local:</span>
              <input
                type="text"
                name="local"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder="Apenas o bairro ou área do imóvel (usado para o filtro de pesquisa)"
              />
            </label>
            <label className={styles.label_input}>
              <span>Endereço:</span>
              <input
                type="text"
                name="endereco"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="O endereço completo do imóvel"
              />
            </label>
            <label className={styles.label_input}>
              <span>Area:</span>
              <input
                type="number"
                name="area"
                value={mtsqdd}
                onChange={(e) => setMtsqdd(e.target.value)}
                placeholder="area total do imovel"
              />
            </label>
            <div className={styles.buttons}>
              <button type="button" onClick={handlePrevStep} className={styles.prevStep}>
                &lt; Voltar
              </button>
              <button type="button" onClick={handleNextStep} className={styles.nextStep}>
                Continuar &gt;
              </button>
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
            <h2>Imagens e Descrição</h2>
            <label className={styles.text_area}>
              <span>Descrição:</span>
              <textarea
                value={descricao}
                name="descricao"
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva o imóvel"
              ></textarea>
            </label>
            <label className={styles.label_input}>
              <span>Imagens:</span>
              <input type="file" name="imagens" accept="image/*" multiple onChange={handleImageChange} />
            </label>
            <div className={styles.imageGrid}>
              {imagens.map((imagem, index) => (
                <div key={index} className={styles.imageWrapper}>
                  {typeof imagem === 'string' ? (
                    <img src={imagem} alt={`Imagem ${index + 1}`} className={styles.image} />
                  ) : (
                    <img src={URL.createObjectURL(imagem)} alt={`Imagem ${index + 1}`} className={styles.image} />
                  )}
                </div>
              ))}
            </div>
            {formError && <p className={styles.error}>{formError}</p>}
            <div className={styles.buttons}>
              <button type="button" onClick={handlePrevStep} className={styles.prevStep}>
                &lt; Voltar
              </button>
              <button type="submit" className='primary_btn'>
                Enviar
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditDoc;
