import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import styles from './Form.module.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storageService } from '../../firebase/config';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
  const [exclusive, setExclusive] = useState(false)
  const [mtsqdd, setMtsqdd] = useState('');
  const [tipo, setTipo] = useState('');
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [real, setReal] = useState('')
  const [city, setCity] = useState('Lambari')
  const [video, setVideo] = useState('')
  const { updateDocument } = useUpdateDocument('venda');
  const navigate = useNavigate();

  useEffect(() => {
    if (casa) {
      setTitulo(casa.titulo);
      setValor(casa.valor);
      setLocal(casa.local);
      setExclusive(casa.exclusive || false)
      setEndereco(casa.endereco);
      setDescricao(casa.descricao);
      setVenda(casa.venda);
      setAluguel(casa.aluguel);
      setMtsqdd(casa.area);
      setImagens(casa.imagens || []);
      setTipo(casa.tipo);
      setReal('R$ ' + casa.valor + ',00')
      setCity(casa.city || 'Lambari')
      setVideo(casa.video || '')
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

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newImages = Array.from(imagens);
    const [removed] = newImages.splice(result.source.index, 1);
    newImages.splice(result.destination.index, 0, removed);
    setImagens(newImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...imagens];
    newImages.splice(index, 1);
    setImagens(newImages);
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImagens((prevImages) => [...prevImages, ...selectedImages]);
  };

  const validateYouTubeUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}$/;
    return regex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStep(5)

    if (titulo === '') {
      setFormError('O título precisa ser preenchido');
      setStep(4)
      return;
    } else if (titulo.length <= 4) {
      setFormError('O título é muito curto');
      setStep(4)
      return;
    }
    
    if (valor < 10) {
      setFormError('O valor está preenchido de forma errada');
      setStep(4)
      return;
    }

    if(!validateYouTubeUrl(video) && video !== ''){
      setFormError('O link do Video esta incorreto')
      return
    }
    
    if (mtsqdd !== '' && Number.isNaN(parseFloat(mtsqdd))) {
      setFormError('Área foi preenchida de forma incorreta');
      setStep(4)
      return;
    }

    if(city === ''){
      setFormError('Selecione a cidade onde o imovel esta localizado')
      setStep(4)
      return
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
      city,
      venda,
      aluguel,
      area,
      tipo,
      video,
      caracteristicas,
      exclusive,
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
                <option value="Ponto Comercial">Ponto Comercial</option>
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
            <label className={styles.checkbox}>
                <span>Exclusivo:</span>
                <input type="checkbox" checked={exclusive} onChange={(e) => setExclusive(e.target.checked)} />
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
                <span>Cidade:</span>
                <input type="text"  value={city} onChange={(e) => setCity(e.target.value)}/>
              </label>
              <label className={styles.label_input}>
                <span>Bairro:</span>
                {city === 'Lambari'  ? 
                <select value={local} onChange={(e) => setLocal(e.target.value)}>
                  <optgroup label='Outros'>
                      <option value="Lambari MG">Lambari MG</option>
                      <option value="Centro">Centro</option>
                      <option value="Zona Rural">Zona Rural</option>
                  </optgroup>
                  <optgroup label="ZONA SUL">
                      <option value="Volta do Lago">Volta do Lago</option>
                      <option value="Santana">Santana</option>
                      <option value="Nova Lambari">Nova Lambari</option>
                      <option value="Corte de Pedra">Corte de Pedra</option>
                      <option value="Jardim do Lago">Jardim do Lago</option>
                      <option value="Lake City">Lake City</option>
                      <option value="Lake City II">Lake City II</option>
                      <option value="Galo Branco">Galo Branco</option>
                      <option value="Floresta">Floresta</option>
                      <option value="Galo de Ouro">Galo de Ouro</option>
                      <option value="Vale do Sol">Vale do Sol</option>
                      <option value="Pinhão Roxo">Pinhão Roxo</option>
                  </optgroup>
                  <optgroup label="ZONA LESTE">
                      <option value="Volta do Ó">Volta do Ó</option>
                      <option value="Vila Campos">Vila Campos</option>
                      <option value="Novo Horizonte">Novo Horizonte</option>
                      <option value="Campo Belo">Campo Belo</option>
                      <option value="Bairro Colina">Bairro Colina</option>
                      <option value="Vila Brasil">Vila Brasil</option>
                      <option value="Matadouro">Matadouro</option>
                  </optgroup>
                  <optgroup label="ZONA NORTE">
                      <option value="Campinho">Campinho</option>
                      <option value="Recanto da Serra">Recanto da Serra</option>
                      <option value="Pitangueiras">Pitangueiras</option>
                      <option value="Jardim Primavera">Jardim Primavera</option>
                      <option value="Buriti">Buriti</option>
                      <option value="Lot. Melo">Lot. Melo</option>
                      <option value="Vila Nova">Vila Nova</option>
                      <option value="Silvestrini">Silvestrini</option>
                      <option value="Alberto Franco">Alberto Franco</option>
                      <option value="Cerâmica">Cerâmica</option>
                      <option value="Alto da Boa Vista">Alto da Boa Vista</option>
                      <option value="Corredor">Corredor</option>
                      <option value="Vista Verde I">Vista Verde I</option>
                      <option value="Vista Verde II">Vista Verde II</option>
                  </optgroup>
                  <optgroup label="ZONA OESTE">
                      <option value="Sertãozinho">Sertãozinho</option>
                      <option value="Alvorada I">Alvorada I</option>
                      <option value="Alvorada II">Alvorada II</option>
                  </optgroup>
                  <optgroup label="ZONA RURAL">
                      <option value="Paiolinho">Paiolinho</option>
                      <option value="Campos">Campos</option>
                      <option value="Capelinha do Embirizal">Capelinha do Embirizal</option>
                      <option value="Cachoeirinha">Cachoeirinha</option>
                      <option value="Posses">Posses</option>
                      <option value="Congonhal">Congonhal</option>
                      <option value="Garcias">Garcias</option>
                      <option value="Piripau">Piripau</option>
                      <option value="São Bartolomeu">São Bartolomeu</option>
                      <option value="São João">São João</option>
                      <option value="Santa Quitéria">Santa Quitéria</option>
                      <option value="Nova Baden">Nova Baden</option>
                      <option value="Serrinha">Serrinha</option>
                      <option value="Serrote">Serrote</option>
                      <option value="Jardim Floresta">Jardim Floresta</option>
                      <option value="Zona Rural">Outro</option>
                  </optgroup>
                </select>
                 :
                  <input type='text' value={local} onChange={(e) => setLocal(e.target.value)}></input> 
                }
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
              <span>Video:</span>
              <input
                type="text"
                name="video"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                placeholder="Coloque o link para o video"
              />
            </label>
            <label className={styles.label_input}>
              <span>Imagens:</span>
              <input type="file" name="imagens" accept="image/*" multiple onChange={handleImageChange} />
            </label>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="imagens">
                {(provided) => (
                  <div className={styles.imageGrid} {...provided.droppableProps} ref={provided.innerRef}>
                    {imagens.map((imagem, index) => (
                      <Draggable key={index} draggableId={`imagem-${index}`} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={styles.imageWrapper}
                          >
                            {imagem instanceof File ? (
                              <img src={URL.createObjectURL(imagem)} alt={`imagem ${index}`} />
                            ) : (
                              <img src={imagem} alt={`imagem ${index}`} />
                            )}
                            <button type="button" onClick={() => handleRemoveImage(index)}>
                              Remover
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
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
        {step === 5 && (
          <div>
            <h2>Aguarde em quanto os dados sao carregados</h2>
            <p>você sera redirecionado automaticamente</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditDoc;
