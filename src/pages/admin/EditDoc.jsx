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
  const [quartos, setQuartos] = useState(0);
  const [banheiros, setBanheiros] = useState(0);
  const [garagem, setGaragem] = useState(false);
  const [piscina, setPiscina] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [formError, setFormError] = useState('');
  const [venda, setVenda] = useState(true);
  const [aluguel, setAluguel] = useState(false);
  const [mtsqdd, setMtsqdd] = useState('');
  const [tipo, setTipo] = useState('')
  const { updateDocument } = useUpdateDocument('venda');
  const navigate = useNavigate();

  useEffect(() => {
    if (casa) {
      setTitulo(casa.titulo);
      setValor(casa.valor);
      setLocal(casa.local);
      setEndereco(casa.endereco);
      setQuartos(casa.quartos);
      setBanheiros(casa.banheiros);
      setGaragem(casa.garagem);
      setPiscina(casa.piscina);
      setDescricao(casa.descricao);
      setVenda(casa.venda);
      setAluguel(casa.aluguel);
      setMtsqdd(casa.area);
      setImagens(casa.imagens || []);
      setTipo(casa.tipo)
    }
  }, [casa]);

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImagens((prevImages) => [...prevImages, ...selectedImages]);
  };

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

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
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

    const area = mtsqdd === '' ? 0 : parseFloat(mtsqdd);
    const preco = parseFloat(valor);

    const uploadImage = async (image) => {
      const imageRef = ref(storageService, `imagens/${image.name}`);
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
      quartos,
      banheiros,
      garagem,
      piscina,
      descricao,
      venda,
      aluguel,
      area,
      tipo,
      imagens: [...existingImageUrls, ...newImageUrls],
    });

    navigate('/dashboard');
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
              <input
                type="number"
                name="valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Valor do imóvel (,00 não precisa ser inserido)"
              />
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
            <h2>Características do Imóvel</h2>
            <div className={styles.adicionais}>
              <label className={styles.label_input}>
                <span>Quartos:</span>
                <input
                  type="number"
                  name="quartos"
                  value={quartos}
                  onChange={(e) => setQuartos(e.target.value)}
                  placeholder="Número de Quartos"
                />
              </label>
              <label className={styles.label_input}>
                <span>Banheiros:</span>
                <input
                  type="number"
                  name="banheiros"
                  value={banheiros}
                  onChange={(e) => setBanheiros(e.target.value)}
                  placeholder="Número de Banheiros"
                />
              </label>
              <div className={styles.radio}>
                <label htmlFor="garagem">Garagem: </label>
                <div>
                  <input type="radio" name="garagem" onChange={() => setGaragem(true)} checked={garagem} /> Sim
                  <input type="radio" name="garagem" onChange={() => setGaragem(false)} checked={!garagem} /> Não
                </div>
                <label htmlFor="piscina">Piscina: </label>
                <div>
                  <input type="radio" name="piscina" onChange={() => setPiscina(true)} checked={piscina} /> Sim
                  <input type="radio" name="piscina" onChange={() => setPiscina(false)} checked={!piscina} /> Não
                </div>
              </div>
            </div>
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
              <button type="submit" className="primary_btn">
                Salvar
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditDoc;
